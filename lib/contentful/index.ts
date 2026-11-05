import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import { CATEGORIES, CATEGORY_SLUGS } from "../site";
import { CONTENTFUL_LOCALE, type Lang } from "../i18n";
import type { Announcement, Project, ProjectSummary, RichText, SiteInfo, TeamMember } from "../types";
import { gql as rawGql } from "./client";
import {
  sortByTag, toProject, toRichText, toSiteInfo, toSummary, toTeamMember,
  type RawAsset, type RawProject, type RawRichText,
} from "./adapter";

// Fixed entry ids from the current space (single-entry content types).
const ABOUT_PAGE_ID = "1McYxPdQtfa7XHQTgOYGvK";
const ACTION_ITEM_ID = "iDmccI5NTqAJz8um5PJlw";

const ASSET = `url width height title description`;
const SUMMARY_FIELDS = `
  slug title projectLocation
  bannerImage { ${ASSET} }
  contentfulMetadata { tags { id } }
`;

async function isPreview() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // Called outside a request (e.g. generateStaticParams / sitemap at build time).
    return false;
  }
}

/** Every query declares `$preview: Boolean` and `$locale: String`. */
async function gql<T>(query: string, vars: Record<string, unknown>, lang: Lang, preview?: boolean) {
  return rawGql<T>(query, { ...vars, locale: CONTENTFUL_LOCALE[lang] }, { preview: preview ?? (await isPreview()) });
}

const CATEGORY_TAGS = CATEGORY_SLUGS.map((c) => CATEGORIES[c].tag);

/** Every project that belongs to a public typology, in curated order (typology order, then per-typology sort tag). */
export const getAllProjects = cache(async (lang: Lang): Promise<ProjectSummary[]> => {
  const data = await gql<{ projectCollection: { items: RawProject[] } }>(
    `query($tags: [String], $preview: Boolean, $locale: String) {
      projectCollection(preview: $preview, locale: $locale, limit: 200, where: { contentfulMetadata: { tags: { id_contains_some: $tags } } }) {
        items { ${SUMMARY_FIELDS} }
      }
    }`,
    { tags: CATEGORY_TAGS },
    lang,
  );
  const rank = (p: ProjectSummary) => {
    const c = p.category ? CATEGORY_SLUGS.indexOf(p.category) : CATEGORY_SLUGS.length;
    return [c, p.category ? p.order[p.category] ?? Infinity : Infinity] as const;
  };
  return data.projectCollection.items.map(toSummary).sort((a, b) => {
    const [ca, oa] = rank(a);
    const [cb, ob] = rank(b);
    return ca - cb || oa - ob;
  });
});

export const getHomeProjects = cache(async (lang: Lang): Promise<ProjectSummary[]> => {
  const data = await gql<{ projectCollection: { items: RawProject[] } }>(
    `query($preview: Boolean, $locale: String) {
      projectCollection(preview: $preview, locale: $locale, limit: 50, where: { contentfulMetadata: { tags: { id_contains_some: ["categoryHomepage"] } } }) {
        items { ${SUMMARY_FIELDS} }
      }
    }`,
    {},
    lang,
  );
  return sortByTag(data.projectCollection.items, "homesort").map(toSummary).filter((p) => p.cover);
});

export const getProject = cache(async (slug: string, lang: Lang, preview?: boolean): Promise<Project | null> => {
  const data = await gql<{ projectCollection: { items: RawProject[] } }>(
    `query($slug: String!, $preview: Boolean, $locale: String) {
      projectCollection(preview: $preview, locale: $locale, limit: 1, where: { slug: $slug }) {
        items {
          ${SUMMARY_FIELDS}
          projectSubtitle projectTagline dateCreated
          content { json links { assets { block { sys { id } ${ASSET} } } } }
          projectImagesCollection(limit: 60) { items { ${ASSET} contentfulMetadata { tags { id } } } }
        }
      }
    }`,
    { slug },
    lang,
    preview,
  );
  const raw = data.projectCollection.items[0];
  return raw ? toProject(raw) : null;
});

export async function getRelatedProjects(project: Project, lang: Lang, limit = 3): Promise<ProjectSummary[]> {
  if (!project.category) return [];
  const cat = project.category;
  const all = await getAllProjects(lang);
  return all
    .filter((p) => p.slug !== project.slug && p.categories.includes(cat))
    .sort((a, b) => (a.order[cat] ?? Infinity) - (b.order[cat] ?? Infinity))
    .slice(0, limit);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const data = await gql<{ projectCollection: { items: { slug: string | null }[] } }>(
    `query($preview: Boolean, $locale: String) {
      projectCollection(preview: $preview, locale: $locale, limit: 500, where: { slug_exists: true }) { items { slug } }
    }`,
    {},
    "en",
    false,
  );
  return data.projectCollection.items.map((p) => p.slug).filter((s): s is string => !!s);
}

export const getAbout = cache(async (lang: Lang): Promise<{ body: RichText | null; team: TeamMember[] }> => {
  const data = await gql<{
    aboutPage: { content: RawRichText | null } | null;
    teamMemberCollection: { items: { memberName: string; memberRole: string | null; memberPicture: RawAsset | null }[] };
  }>(
    `query($id: String!, $preview: Boolean, $locale: String) {
      aboutPage(id: $id, preview: $preview, locale: $locale) {
        content { json links { assets { block { sys { id } ${ASSET} } } } }
      }
      teamMemberCollection(preview: $preview, locale: $locale, limit: 50) {
        items { memberName memberRole memberPicture { ${ASSET} } }
      }
    }`,
    { id: ABOUT_PAGE_ID },
    lang,
  );
  return {
    body: toRichText(data.aboutPage?.content),
    team: data.teamMemberCollection.items.map(toTeamMember),
  };
});

export const getSiteInfo = cache(async (lang: Lang): Promise<SiteInfo> => {
  const data = await gql<{ footerCollection: { items: Parameters<typeof toSiteInfo>[0][] } }>(
    `query($preview: Boolean, $locale: String) {
      footerCollection(preview: $preview, locale: $locale, limit: 1) { items { address phoneNumber infoEmail certifications } }
    }`,
    {},
    lang,
  );
  return toSiteInfo(data.footerCollection.items[0]);
});

export const getAnnouncement = cache(async (lang: Lang): Promise<Announcement | null> => {
  const data = await gql<{
    mainPageActionItemCollection: { items: { displayText: string | null; link: string | null }[] };
  }>(
    `query($id: String!, $preview: Boolean, $locale: String) {
      mainPageActionItemCollection(preview: $preview, locale: $locale, limit: 1, where: { sys: { id: $id } }) {
        items { displayText link }
      }
    }`,
    { id: ACTION_ITEM_ID },
    lang,
  );
  const item = data.mainPageActionItemCollection.items[0];
  return item?.displayText && item.link ? { text: item.displayText, href: item.link } : null;
});
