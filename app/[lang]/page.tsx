import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects, getAnnouncement, getHomeProjects } from "@/lib/contentful";
import { alternates, dict, isLang, localize } from "@/lib/i18n";
import { CATEGORY_SLUGS } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? { alternates: alternates(lang, "/") } : {};
}

/**
 * Editorial rhythm that repeats every 5 tiles and works for any number of projects:
 *   [ wide ] / [ 7 | 5 ] / [ 5 | 7 ]
 */
const RHYTHM = [
  { span: "md:col-span-12", aspect: "aspect-[4/3] md:aspect-[21/9]", sizes: "100vw" },
  { span: "md:col-span-7", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
  { span: "md:col-span-5 md:mt-32", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { span: "md:col-span-7 md:mt-32", aspect: "aspect-[4/3]", sizes: "(min-width: 768px) 58vw, 100vw" },
];

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = dict(lang);
  const [featured, all, announcement] = await Promise.all([getHomeProjects(lang), getAllProjects(lang), getAnnouncement(lang)]);
  const typologies = CATEGORY_SLUGS.map((c) => ({ c, n: all.filter((p) => p.categories.includes(c)).length })).filter((t) => t.n > 0);

  return (
    <>
      <section className="shell pb-16 pt-16 md:pb-28 md:pt-28">
        <p className="eyebrow rise">{d.home_.eyebrow}</p>
        <h1 className="mt-6 text-display font-light">
          <span className="rise block" style={{ "--d": "80ms" } as React.CSSProperties}>Arquitectura</span>
          <span className="rise block pl-[0.6em] md:pl-[2.2em]" style={{ "--d": "180ms" } as React.CSSProperties}>
            <span className="text-faint">y</span> Diseño
          </span>
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <p className="rise text-lede text-muted md:col-span-6 md:col-start-7" style={{ "--d": "320ms" } as React.CSSProperties}>
            {d.home_.lede}
          </p>
          {announcement && (
            <a
              href={announcement.href}
              style={{ "--d": "420ms" } as React.CSSProperties}
              className="rise group inline-flex items-center gap-3 self-start justify-self-start border border-ink px-5 py-3 text-sm uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper md:col-span-6 md:col-start-7"
            >
              {announcement.text}
              <span aria-hidden className="transition-transform duration-500 ease-out-soft group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>
      </section>

      <section aria-labelledby="selected" className="shell">
        <div className="mb-8 flex items-baseline justify-between border-t border-rule pt-4">
          <h2 id="selected" className="eyebrow">{d.home_.selected}</h2>
          <Link href={localize(lang, "/work")} className="text-sm text-muted hover:text-ink">{d.home_.all} →</Link>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-12 md:gap-y-20">
          {featured.map((p, i) => {
            const r = RHYTHM[i % RHYTHM.length];
            return <ProjectCard key={p.slug} project={p} lang={lang} aspect={r.aspect} sizes={r.sizes} priority={i === 0} className={r.span} />;
          })}
        </div>
      </section>

      <section aria-labelledby="typologies" className="shell mt-32 md:mt-48">
        <div className="grid gap-10 border-t border-rule pt-4 md:grid-cols-12">
          <h2 id="typologies" className="eyebrow md:col-span-4">{d.home_.typologies}</h2>
          <ul className="md:col-span-8">
            {typologies.map(({ c, n }) => (
              <li key={c} className="reveal border-b border-rule first:border-t md:first:border-t-0">
                <Link href={`${localize(lang, "/work")}?type=${c}`} className="group flex items-baseline justify-between gap-6 py-5 md:py-7">
                  <span className="text-headline font-light transition-transform duration-700 ease-out-soft group-hover:translate-x-3">
                    {d.categories[c]}
                  </span>
                  <span className="flex items-baseline gap-4 text-sm text-muted">
                    <span className="tabular-nums">{String(n).padStart(2, "0")}</span>
                    <span aria-hidden className="transition-transform duration-500 ease-out-soft group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
