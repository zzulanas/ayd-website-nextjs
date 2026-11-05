import type { Document } from "@contentful/rich-text-types";
import type { Category } from "./site";

/** Domain types the UI depends on. Nothing outside lib/contentful knows about Contentful's shape. */

export interface Img {
  url: string;
  alt: string;
  /** Usually the photographer credit — must stay visible. */
  caption: string | null;
  width: number;
  height: number;
}

export interface RichText {
  json: Document;
  /** Embedded assets keyed by asset id. */
  assets: Record<string, Img>;
}

export interface ProjectSummary {
  slug: string;
  title: string;
  location: string | null;
  /** "with X Architects" credits — stored in the location field in the current model. */
  collaborators: string | null;
  cover: Img | null;
  /** Primary typology (first matching category tag). */
  category: Category | null;
  categories: Category[];
  /** Position within each category's curated order (lower first). */
  order: Partial<Record<Category, number>>;
}

export interface Project extends ProjectSummary {
  /** Display year/phase. The current model hides the year with a whitespace subtitle, so null = don't show. */
  year: string | null;
  tagline: string | null;
  body: RichText | null;
  /** Project imagery in display order, excluding homepage-only crops. */
  images: Img[];
}

export interface TeamMember {
  name: string;
  role: string | null;
  photo: Img | null;
}

export interface SiteInfo {
  email: string | null;
  phone: string | null;
  address: string | null;
  certifications: string[];
}

export interface Announcement {
  text: string;
  href: string;
}
