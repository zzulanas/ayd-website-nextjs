export const SITE_URL = "https://www.arq-y-di.com";
export const SITE_NAME = "Arq Y Di";
export const SITE_DESCRIPTION =
  "AyD is an architecture and design studio based in Los Angeles. We believe architecture is a catalyst of change for individuals, communities, and the planet.";

/** Display order of filters on /work. Labels live in lib/i18n.ts. */
export const CATEGORIES = {
  residential: { tag: "categoryResidential", sortTag: "residentialSort" },
  cultural: { tag: "categoryCultural", sortTag: "culturalSort" },
  commercial: { tag: "categoryCommercial", sortTag: "commercialSort" },
  "previous-work": { tag: "categoryPreviousWork", sortTag: "previousWorkSort" },
} as const;

export type Category = keyof typeof CATEGORIES;
export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as Category[];
export const isCategory = (c: string | null | undefined): c is Category => !!c && c in CATEGORIES;
