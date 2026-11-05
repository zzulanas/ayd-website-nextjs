import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/contentful";
import { localize } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
  url: `${SITE_URL}${localize("en", path)}`,
  priority,
  alternates: { languages: { en: `${SITE_URL}${localize("en", path)}`, es: `${SITE_URL}${localize("es", path)}` } },
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects("en");
  return [
    entry("/", 1),
    entry("/work", 0.9),
    entry("/about", 0.8),
    ...projects.map((p) => entry(`/projects/${p.slug}`, 0.7)),
  ];
}
