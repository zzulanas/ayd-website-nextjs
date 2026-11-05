import { dict, localize, type Lang } from "./i18n";

export function navItems(lang: Lang) {
  const d = dict(lang);
  return [
    { href: localize(lang, "/work"), label: d.nav.work },
    { href: localize(lang, "/about"), label: d.nav.about },
  ];
}
