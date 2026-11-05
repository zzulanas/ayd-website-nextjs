import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WorkIndex } from "@/components/work-index";
import { getAllProjects } from "@/lib/contentful";
import { alternates, dict, isLang } from "@/lib/i18n";

export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = dict(lang);
  return {
    title: d.work.title,
    description: d.work.metaDescription,
    alternates: alternates(lang, "/work"),
    openGraph: { images: `/api/og?title=${encodeURIComponent(d.work.title)}` },
  };
}

export default async function WorkPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = dict(lang);
  const projects = await getAllProjects(lang);

  return (
    <div className="shell pt-12 md:pt-20">
      <header className="pb-10">
        <p className="eyebrow rise">{d.work.eyebrow}</p>
        <h1 className="rise mt-4 text-display font-light" style={{ "--d": "80ms" } as React.CSSProperties}>{d.work.title}</h1>
      </header>
      {/* The filter reads ?type= on the client so the page itself stays fully static. */}
      <Suspense fallback={<div className="h-[70vh]" />}>
        <WorkIndex projects={projects} lang={lang} />
      </Suspense>
    </div>
  );
}
