"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ViewTransition, startTransition, useDeferredValue, useEffect, useRef, useState } from "react";
import { DICTS, dict, localize, type Lang } from "@/lib/i18n";
import { CATEGORY_SLUGS, isCategory, type Category } from "@/lib/site";
import type { ProjectSummary } from "@/lib/types";
import { ProjectCard } from "./project-card";

type View = "grid" | "list";

/** Lowercase and strip accents so "mexico" finds "México" and "jardin" finds "Jardín". */
const fold = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/** Everything a visitor might type: name, place, collaborator, and typology in both languages. */
const haystack = (p: ProjectSummary) =>
  fold(
    [p.title, p.location, p.collaborators, ...p.categories.flatMap((c) => Object.values(DICTS).map((d) => d.categories[c]))]
      .filter(Boolean)
      .join(" "),
  );

function filterAndSort(projects: ProjectSummary[], type: Category | null, query: string) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  let out = type ? projects.filter((p) => p.categories.includes(type)) : projects;
  if (terms.length) out = out.filter((p) => terms.every((t) => haystack(p).includes(t)));
  return type ? [...out].sort((a, b) => (a.order[type] ?? Infinity) - (b.order[type] ?? Infinity)) : out;
}

function buildHref(pathname: string, type: Category | null, q: string) {
  const sp = new URLSearchParams();
  if (type) sp.set("type", type);
  if (q.trim()) sp.set("q", q.trim());
  const qs = sp.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function WorkIndex({ projects, lang }: { projects: ProjectSummary[]; lang: Lang }) {
  const d = dict(lang);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const param = params.get("type");
  const type = isCategory(param) ? param : null;
  const [view, setView] = useState<View>("grid");
  // Search text is local state (so typing never waits on the router) mirrored into ?q= for sharing.
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const deferredQuery = useDeferredValue(query);
  const input = useRef<HTMLInputElement>(null);

  const available = CATEGORY_SLUGS.filter((c) => projects.some((p) => p.categories.includes(c)));
  const visible = filterAndSort(projects, type, deferredQuery);

  const setType = (next: Category | null, q = query) => {
    // URL is the source of truth so filtered views are shareable; the router update runs
    // inside a transition, which lets <ViewTransition> animate cards into their new positions.
    startTransition(() => router.replace(buildHref(pathname, next, q), { scroll: false }));
  };

  const onSearch = (next: string) => {
    setQuery(next);
    // Native history updates sync with useSearchParams without an RSC round-trip.
    window.history.replaceState(null, "", buildHref(pathname, type, next));
  };

  // "/" jumps to search, as on most index sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const chip = "rounded-full border px-4 py-1.5 text-sm transition-colors";
  const chipOn = "border-ink bg-ink text-paper";
  const chipOff = "border-rule text-muted hover:border-ink hover:text-ink";

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 flex flex-wrap items-center justify-between gap-4 border-b border-rule bg-paper/95 px-5 py-4 sm:top-20 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div role="group" aria-label={d.work.filter} className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={!type} onClick={() => setType(null)} className={`${chip} ${!type ? chipOn : chipOff}`}>
            {d.work.all}
          </button>
          {available.map((c) => (
            <button key={c} type="button" aria-pressed={type === c} onClick={() => setType(c)} className={`${chip} ${type === c ? chipOn : chipOff}`}>
              {d.categories[c]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm max-sm:w-full">
          <label className="relative flex items-center max-sm:flex-1">
            <span className="sr-only">{d.work.search}</span>
            <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute left-3 size-3.5 fill-none stroke-current text-faint" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4.75" />
              <path d="m10.5 10.5 3.75 3.75" strokeLinecap="round" />
            </svg>
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && (onSearch(""), e.currentTarget.blur())}
              placeholder={d.work.searchPlaceholder}
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-full border border-rule bg-transparent py-1.5 pl-8 pr-8 text-ink outline-none transition-[border-color,width] duration-300 ease-out-soft placeholder:text-faint focus:border-ink sm:w-52 sm:focus:w-72 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => (onSearch(""), input.current?.focus())} aria-label={d.work.clear} className="absolute right-2 grid size-5 place-items-center rounded-full text-muted hover:text-ink">
                ×
              </button>
            )}
            {!query && (
              <kbd aria-hidden className="pointer-events-none absolute right-3 font-sans text-xs text-faint max-md:hidden">/</kbd>
            )}
          </label>
          <span className="tabular-nums text-faint" aria-live="polite">{d.work.count(visible.length)}</span>
          <div role="group" aria-label={d.work.view} className="flex overflow-hidden rounded-full border border-rule">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => startTransition(() => setView(v))}
                className={`px-3 py-1.5 transition-colors ${view === v ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
              >
                {v === "grid" ? d.work.grid : d.work.list}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        deferredQuery.trim() ? (
          <div className="py-24">
            <p className="text-lede text-muted">{d.work.noMatch(deferredQuery.trim())}</p>
            <button type="button" onClick={() => { setQuery(""); setType(null, ""); }} className="mt-6 text-sm underline underline-offset-4 hover:text-muted">
              {d.work.reset}
            </button>
          </div>
        ) : (
          <p className="py-24 text-lede text-muted">{d.work.empty}</p>
        )
      ) : view === "grid" ? (
        <div className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p, i) => (
            <ViewTransition key={p.slug} name={`card-${p.slug}`}>
              <div>
                <ProjectCard project={p} lang={lang} index={i} priority={i < 3} />
              </div>
            </ViewTransition>
          ))}
        </div>
      ) : (
        <ProjectList projects={visible} lang={lang} />
      )}
    </>
  );
}

/** Text index. On hover-capable devices a preview image follows the cursor. */
function ProjectList({ projects, lang }: { projects: ProjectSummary[]; lang: Lang }) {
  const d = dict(lang);
  const [active, setActive] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !preview.current) return;
    // Write the transform directly so cursor-follow never re-renders React.
    preview.current.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 140}px, 0)`;
  };

  return (
    <div className="mt-6" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ul>
        {projects.map((p, i) => (
          <ViewTransition key={p.slug} name={`card-${p.slug}`}>
            <li className="border-b border-rule">
              <Link
                href={localize(lang, `/projects/${p.slug}`)}
                onPointerEnter={() => setActive(p.slug)}
                onFocus={() => setActive(null)}
                className="group grid grid-cols-[3.5rem_1fr] items-center gap-x-4 py-4 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,4fr)_minmax(0,2fr)] md:py-5"
              >
                <span className="text-sm tabular-nums text-faint max-md:hidden">{String(i + 1).padStart(2, "0")}</span>
                {/* Thumbnail on touch/small screens where there's no hover preview. */}
                <span className="relative aspect-square w-14 overflow-hidden bg-rule/40 md:hidden">
                  {p.cover && <Image src={p.cover.url} alt="" fill sizes="56px" className="object-cover" />}
                </span>
                <span>
                  <span className="block text-xl leading-tight transition-transform duration-500 ease-out-soft group-hover:translate-x-2 md:text-2xl">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted md:hidden">{p.location ?? (p.collaborators ? `${d.project.with} ${p.collaborators}` : null)}</span>
                </span>
                <span className="text-muted max-md:hidden">{p.location ?? (p.collaborators ? `${d.project.with} ${p.collaborators}` : null)}</span>
                <span className="text-right text-sm text-faint max-md:hidden">
                  {p.categories.map((c) => d.categories[c]).join(" · ")}
                </span>
              </Link>
            </li>
          </ViewTransition>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[22rem] [@media(hover:hover)]:md:block"
      >
        {projects.map((p) =>
          p.cover ? (
            <div
              key={p.slug}
              className={`absolute inset-x-0 top-0 aspect-[4/3] overflow-hidden transition-[opacity,scale] duration-500 ease-out-soft ${
                active === p.slug ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <Image src={p.cover.url} alt="" fill sizes="352px" className="object-cover" />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
