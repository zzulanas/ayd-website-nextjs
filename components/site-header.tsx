import Link from "next/link";
import { dict, localize, type Lang } from "@/lib/i18n";
import { LangSwitch, MobileMenu, NavLinks } from "./nav-client";

export function SiteHeader({ lang }: { lang: Lang }) {
  const d = dict(lang);
  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/95">
      <div className="shell flex h-16 items-center justify-between sm:h-20">
        <Link href={localize(lang, "/")} className="group flex items-baseline gap-3" aria-label={d.home}>
          <span className="text-2xl font-semibold tracking-[-0.04em]">AyD</span>
          <span className="hidden text-sm text-muted transition-colors group-hover:text-ink md:inline">{d.tagline}</span>
        </Link>
        <div className="hidden items-center gap-10 md:flex">
          <nav aria-label="Primary">
            <NavLinks lang={lang} />
          </nav>
          <LangSwitch lang={lang} className="group border-l border-rule pl-6 text-xs tracking-[0.12em]" />
        </div>
        <MobileMenu lang={lang} />
      </div>
    </header>
  );
}
