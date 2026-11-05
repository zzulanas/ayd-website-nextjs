import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { heroName, ProjectCard } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { RichText } from "@/components/rich-text";
import { getAllProjectSlugs, getProject, getRelatedProjects } from "@/lib/contentful";
import { LANGS, alternates, dict, isLang, localize } from "@/lib/i18n";

export const revalidate = 3600;

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return LANGS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const project = await getProject(slug, lang);
  if (!project) return {};
  const og = new URLSearchParams({ title: project.title });
  if (project.category) og.set("category", dict(lang).categories[project.category]);
  if (project.cover) og.set("imageUrl", project.cover.url);
  return {
    title: project.title,
    description: project.tagline ?? `${project.title}${project.location ? `, ${project.location}` : ""} — Arq Y Di.`,
    alternates: alternates(lang, `/projects/${slug}`),
    openGraph: { images: `/api/og?${og}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const project = await getProject(slug, lang);
  if (!project) notFound();
  const related = await getRelatedProjects(project, lang);
  const d = dict(lang);
  const workHref = localize(lang, "/work");

  const facts = [
    [d.project.location, project.location],
    [d.project.collaborators, project.collaborators],
    [d.project.year, project.year],
    [d.project.typology, project.categories.map((c) => d.categories[c]).join(", ") || null],
  ].filter((f): f is [string, string] => !!f[1]);

  return (
    <article>
      <header className="shell pt-10 md:pt-16">
        <Link href={project.category ? `${workHref}?type=${project.category}` : workHref} className="rise text-sm text-muted hover:text-ink">
          ← {project.category ? d.categories[project.category] : d.project.back}
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <h1 className="rise text-display font-light md:col-span-8" style={{ "--d": "60ms" } as React.CSSProperties}>{project.title}</h1>
          <dl className="rise grid grid-cols-3 gap-4 text-sm md:col-span-4 md:grid-cols-1 md:gap-3" style={{ "--d": "160ms" } as React.CSSProperties}>
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-rule pt-2 md:flex md:justify-between md:gap-6">
                <dt className="text-faint">{k}</dt>
                <dd className="mt-1 md:mt-0 md:text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {project.cover && (
        <figure className="shell mt-12 md:mt-16">
          <ViewTransition name={heroName(project.slug)}>
            <div className="relative aspect-[4/3] overflow-hidden bg-rule/40 md:aspect-[16/9]">
              <Image
                src={project.cover.url}
                alt={project.cover.alt}
                fill
                sizes="(min-width: 1600px) 1500px, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </ViewTransition>
          {project.cover.caption && <figcaption className="mt-2 text-xs text-faint">{project.cover.caption}</figcaption>}
        </figure>
      )}

      {(project.tagline || project.body) && (
        <section className="shell mt-20 grid gap-10 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow md:sticky md:top-28">{d.project.about}</p>
          </div>
          <div className="reveal md:col-span-7 md:col-start-6">
            {d.contentNotice && <p className="mb-8 border-l border-rule pl-4 text-sm text-faint">{d.contentNotice}</p>}
            {project.tagline && <p className="mb-10 text-lede">{project.tagline}</p>}
            {project.body && <RichText content={project.body} />}
          </div>
        </section>
      )}

      {project.images.length > 0 && (
        <section aria-label={project.title} className="shell mt-20 md:mt-32">
          <ProjectGallery images={project.images} title={project.title} lang={lang} />
        </section>
      )}

      {related.length > 0 && (
        <section className="shell mt-32">
          <div className="mb-8 flex items-baseline justify-between border-t border-rule pt-4">
            <h2 className="eyebrow">{d.project.more}</h2>
            <Link href={project.category ? `${workHref}?type=${project.category}` : workHref} className="text-sm text-muted hover:text-ink">
              {d.project.viewAll} →
            </Link>
          </div>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
            {related.map((p) => <ProjectCard key={p.slug} project={p} lang={lang} sizes="(min-width: 768px) 33vw, 100vw" />)}
          </div>
        </section>
      )}
    </article>
  );
}
