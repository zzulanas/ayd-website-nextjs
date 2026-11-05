import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RichText } from "@/components/rich-text";
import { getAbout } from "@/lib/contentful";
import { alternates, dict, isLang } from "@/lib/i18n";

export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = dict(lang);
  return {
    title: d.about.title,
    description: d.about.metaDescription,
    alternates: alternates(lang, "/about"),
    openGraph: { images: `/api/og?title=${encodeURIComponent(d.about.title)}` },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = dict(lang);
  const { body, team } = await getAbout(lang);

  return (
    <div className="shell pt-12 md:pt-20">
      <header className="border-b border-rule pb-10">
        <p className="eyebrow rise">{d.about.eyebrow}</p>
        <h1 className="rise mt-4 text-display font-light" style={{ "--d": "80ms" } as React.CSSProperties}>{d.about.title}</h1>
      </header>

      {body && (
        <section className="grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <p className="eyebrow md:col-span-4">{d.about.who}</p>
          <div className="md:col-span-7 md:col-start-6">
            {d.contentNotice && <p className="mb-8 border-l border-rule pl-4 text-sm text-faint">{d.contentNotice}</p>}
            <RichText content={body} className="prose-ayd [&>p:first-child]:text-lede [&>p:first-child]:text-ink" />
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="border-t border-rule pt-4">
          <h2 className="eyebrow mb-10">{d.about.team}</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="reveal">
                <div className="unveil relative aspect-[4/5] overflow-hidden bg-rule/40">
                  {m.photo && (
                    <Image src={m.photo.url} alt={m.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover" />
                  )}
                </div>
                <p className="mt-3">{m.name}</p>
                {m.role && <p className="text-sm text-muted">{m.role}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
