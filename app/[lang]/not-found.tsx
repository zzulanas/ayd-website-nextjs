"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dict, localize } from "@/lib/i18n";

export default function NotFound() {
  const lang = usePathname().startsWith("/es") ? "es" : "en";
  const d = dict(lang);
  return (
    <div className="shell py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-display font-light">{d.notFound.title}</h1>
      <p className="mt-8 text-lede text-muted">
        {d.notFound.body}{" "}
        <Link href={localize(lang, "/")} className="text-ink underline underline-offset-4">{d.notFound.home}</Link>.
      </p>
    </div>
  );
}
