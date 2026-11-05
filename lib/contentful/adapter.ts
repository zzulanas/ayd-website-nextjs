/**
 * Maps the *current* Contentful content model onto the domain types in lib/types.ts.
 *
 * The current model encodes layout/ordering in metadata tags:
 *   - categoryResidential | categoryCultural | categoryCommercial | categoryPreviousWork | categoryHomepage
 *   - homesort<N>, residentialSort<N>, culturalSort<N>, ...   → ordering
 *   - homepageImage (on an asset)                             → crop used only on the homepage
 *   - size500x1000 (on an asset)                              → tall "portrait" lead image
 *
 * When the content model is cleaned up, this is the only file that should need to change.
 */
import type { Document } from "@contentful/rich-text-types";
import { CATEGORIES, CATEGORY_SLUGS } from "../site";
import type { Img, Project, ProjectSummary, RichText, SiteInfo, TeamMember } from "../types";

export interface RawTag { id: string }
export interface RawAsset {
  sys?: { id: string };
  url: string | null;
  width: number | null;
  height: number | null;
  title: string | null;
  description: string | null;
  contentfulMetadata?: { tags: RawTag[] };
}
export interface RawRichText {
  json: Document;
  links?: { assets?: { block?: (RawAsset | null)[] } };
}
export interface RawProject {
  slug: string;
  title: string;
  projectLocation: string | null;
  projectSubtitle?: string | null;
  projectTagline?: string | null;
  dateCreated?: string | null;
  bannerImage: RawAsset | null;
  content?: RawRichText | null;
  projectImagesCollection?: { items: (RawAsset | null)[] };
  contentfulMetadata: { tags: RawTag[] };
}

const hasTag = (tags: RawTag[] | undefined, id: string) => !!tags?.some((t) => t.id === id);

/** Parses `<prefix><N>` tags, e.g. homesort3 → 3. Untagged items sort last. */
export function sortIndex(tags: RawTag[], prefix: string): number {
  const tag = tags.find((t) => t.id.startsWith(prefix));
  const n = tag ? Number.parseInt(tag.id.slice(prefix.length), 10) : Number.NaN;
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

export function sortByTag<T extends { contentfulMetadata: { tags: RawTag[] } }>(items: T[], prefix: string): T[] {
  return [...items].sort((a, b) => sortIndex(a.contentfulMetadata.tags, prefix) - sortIndex(b.contentfulMetadata.tags, prefix));
}

export function toImg(raw: RawAsset | null | undefined, fallbackAlt = ""): Img | null {
  if (!raw?.url) return null;
  return {
    // Contentful returns protocol-relative or https URLs depending on API; normalise.
    url: raw.url.startsWith("//") ? `https:${raw.url}` : raw.url,
    // Asset descriptions on this space are photo credits, so they're captions, not alt text.
    alt: fallbackAlt || raw.title || "",
    caption: raw.description?.trim() || null,
    width: raw.width ?? 1600,
    height: raw.height ?? 1067,
  };
}

export function toSummary(raw: RawProject): ProjectSummary {
  const tags = raw.contentfulMetadata.tags;
  const categories = CATEGORY_SLUGS.filter((c) => hasTag(tags, CATEGORIES[c].tag));
  const order: ProjectSummary["order"] = {};
  for (const c of categories) order[c] = sortIndex(tags, CATEGORIES[c].sortTag);
  const place = raw.projectLocation?.trim() || null;
  const isCredit = !!place && /^with\s/i.test(place);
  return {
    slug: raw.slug,
    title: raw.title,
    location: isCredit ? null : place,
    collaborators: isCredit ? place!.replace(/^with\s+/i, "") : null,
    cover: toImg(raw.bannerImage, raw.title),
    category: categories[0] ?? null,
    categories,
    order,
  };
}

function toRichText(raw: RawRichText | null | undefined): RichText | null {
  if (!raw?.json) return null;
  const assets: Record<string, Img> = {};
  for (const a of raw.links?.assets?.block ?? []) {
    const img = toImg(a);
    if (a?.sys?.id && img) assets[a.sys.id] = img;
  }
  return { json: raw.json, assets };
}
export { toRichText };

export function toProject(raw: RawProject): Project {
  const all = (raw.projectImagesCollection?.items ?? []).filter((a): a is RawAsset => !!a?.url);
  const gallery = all.filter((a) => !hasTag(a.contentfulMetadata?.tags, "homepageImage"));
  // Lead with the tall portrait image (old layout's "size500x1000" slot), then the rest in CMS order.
  const portrait = gallery.find((a) => hasTag(a.contentfulMetadata?.tags, "size500x1000"));
  const ordered = portrait ? [portrait, ...gallery.filter((a) => a !== portrait)] : gallery;
  const cover = toImg(raw.bannerImage, raw.title);
  const images = ordered.map((a) => toImg(a, raw.title)).filter((i): i is Img => !!i);
  // Banner is shown as the hero; don't repeat it if it's also in the image list.
  const dedup = cover ? images.filter((i) => i.url !== cover.url) : images;

  return {
    ...toSummary(raw),
    // Old site: subtitle replaced the date; whitespace subtitles were used to hide it.
    year:
      raw.projectSubtitle == null
        ? raw.dateCreated ? String(new Date(raw.dateCreated).getUTCFullYear()) : null
        : raw.projectSubtitle.trim() || null,
    tagline: raw.projectTagline?.trim() || null,
    body: toRichText(raw.content),
    images: dedup,
  };
}

export function toTeamMember(raw: { memberName: string; memberRole: string | null; memberPicture: RawAsset | null }): TeamMember {
  return { name: raw.memberName, role: raw.memberRole, photo: toImg(raw.memberPicture, raw.memberName) };
}

export function toSiteInfo(raw: { address: string | null; phoneNumber: string | null; infoEmail: string | null; certifications: string[] | null } | undefined): SiteInfo {
  return {
    email: raw?.infoEmail ?? null,
    phone: raw?.phoneNumber ?? null,
    address: raw?.address ?? null,
    certifications: raw?.certifications ?? [],
  };
}
