import Link from "next/link";
import { getSiteInfo } from "@/lib/contentful";
import { dict, localize, type Lang } from "@/lib/i18n";
import { navItems } from "@/lib/nav";

export async function SiteFooter({ lang }: { lang: Lang }) {
  const info = await getSiteInfo(lang);
  const d = dict(lang);
  const mapsHref = info.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`
    : null;

  return (
    <footer className="mt-32 border-t border-rule">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-6">
          <Link href={localize(lang, "/")} className="text-headline font-light">arquitectura y diseño</Link>
          <p className="mt-3 text-lg text-muted">roberto sheinberg</p>
          <p className="mt-1 text-sm text-faint">{d.footer.spoken}</p>
        </div>

        <address className="space-y-2 not-italic md:col-span-3">
          <p className="eyebrow mb-4">{d.footer.contact}</p>
          {info.email && (
            <a href={`mailto:${info.email}`} className="block text-lg underline decoration-rule underline-offset-4 hover:decoration-ink">
              {info.email}
            </a>
          )}
          {info.phone && (
            <a href={`tel:${info.phone.replace(/[^\d+]/g, "")}`} className="block text-muted hover:text-ink">{info.phone}</a>
          )}
          {info.address && mapsHref && (
            <a href={mapsHref} target="_blank" rel="noreferrer" className="block max-w-[22ch] pt-2 text-muted hover:text-ink">
              {info.address}
            </a>
          )}
        </address>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4">{d.footer.studio}</p>
          <ul className="space-y-2">
            {navItems(lang).map(({ href, label }) => (
              <li key={href}><Link href={href} className="text-muted hover:text-ink">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-rule py-6 text-sm text-faint md:flex-row md:items-center md:justify-between">
        {info.certifications.length > 0 ? (
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {info.certifications.map((c) => <li key={c}>{c}</li>)}
          </ul>
        ) : <span />}
        <p>© {new Date().getFullYear()} Arq Y Di</p>
      </div>
    </footer>
  );
}
