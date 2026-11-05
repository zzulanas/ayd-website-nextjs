"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { dict, localize, unlocalize, type Lang } from "@/lib/i18n";
import { navItems } from "@/lib/nav";

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`) || (href.endsWith("/work") && pathname.includes("/projects/"));
}

export function NavLinks({ lang }: { lang: Lang }) {
  const isActive = useIsActive();
  return (
    <ul className="flex items-center gap-8 text-[15px]">
      {navItems(lang).map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className="relative py-2 text-muted transition-colors hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-out-soft hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LangSwitchInner({ lang, className }: { lang: Lang; className?: string }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const other: Lang = lang === "en" ? "es" : "en";
  const href = localize(other, unlocalize(pathname)) + (search ? `?${search}` : "");
  const d = dict(lang);
  return (
    <Link href={href} hrefLang={other} lang={other} className={className} aria-label={d.langSwitch.other} scroll={false}>
      <span className="text-ink">{lang.toUpperCase()}</span>
      <span aria-hidden className="text-faint"> / </span>
      <span className="text-muted transition-colors group-hover:text-ink">{d.langSwitch.otherShort}</span>
    </Link>
  );
}

export function LangSwitch(props: { lang: Lang; className?: string }) {
  // useSearchParams needs a Suspense boundary on statically rendered pages.
  return (
    <Suspense fallback={<span className={props.className}>{props.lang.toUpperCase()}</span>}>
      <LangSwitchInner {...props} />
    </Suspense>
  );
}

export function MobileMenu({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = useIsActive();
  const d = dict(lang);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 -mr-2 flex h-10 items-center gap-2 px-2 text-sm"
      >
        {open ? d.close : d.menu}
        <span aria-hidden className="relative block h-3 w-5">
          <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
          <span className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
        </span>
      </button>
      <div id="mobile-menu" hidden={!open} className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-10 pt-24 sm:px-8">
        <nav aria-label="Mobile">
          <ul className="border-t border-rule">
            {navItems(lang).map(({ href, label }, i) => (
              <li key={href} className="border-b border-rule">
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  style={{ "--d": `${80 + i * 70}ms` } as React.CSSProperties}
                  className={`flex items-center justify-between py-5 text-display font-light aria-[current=page]:text-muted ${open ? "rise" : ""}`}
                >
                  {label}
                  <span aria-hidden className="text-lg text-faint">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LangSwitch lang={lang} className="group mt-auto text-sm tracking-[0.1em]" />
      </div>
    </div>
  );
}
