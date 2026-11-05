export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const isLang = (s: string): s is Lang => (LANGS as readonly string[]).includes(s);

/** Contentful locale per site language. es-US falls back to en-US per field in the space config. */
export const CONTENTFUL_LOCALE: Record<Lang, string> = { en: "en-US", es: "es-US" };

/** English lives at unprefixed URLs (keeps every existing URL); Spanish under /es. */
export function localize(lang: Lang, path: string) {
  if (lang === DEFAULT_LANG) return path;
  return path === "/" ? "/es" : `/es${path}`;
}

/** Strip a leading /es so we can rebuild the same path in another language. */
export function unlocalize(pathname: string) {
  const stripped = pathname.replace(/^\/es(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

const en = {
  skip: "Skip to content",
  menu: "Menu",
  close: "Close",
  home: "Arq Y Di — home",
  tagline: "arquitectura y diseño",
  nav: { work: "Work", about: "About" },
  langSwitch: { label: "Language", other: "Español", otherShort: "ES" },
  preview: { text: "Preview mode — showing draft content.", exit: "Exit preview" },
  contentNotice: null as string | null,
  home_: {
    eyebrow: "Architecture & Design — Los Angeles",
    lede: "AyD is an architecture and design studio based in Los Angeles. We believe architecture is a catalyst of change for individuals, communities, and the planet.",
    selected: "Selected work",
    all: "All projects",
    typologies: "Typologies",
  },
  work: {
    title: "Work",
    eyebrow: "Projects",
    all: "All",
    grid: "Grid",
    list: "List",
    view: "View",
    filter: "Filter by typology",
    count: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
    empty: "New work coming soon.",
    search: "Search projects",
    searchPlaceholder: "Search by name, place, collaborator…",
    clear: "Clear search",
    noMatch: (q: string) => `No projects match “${q}”.`,
    reset: "Show all projects",
    metaDescription: "Residential, cultural and commercial projects by Arq Y Di, an architecture and design studio in Los Angeles.",
  },
  project: {
    back: "All work",
    location: "Location",
    year: "Year",
    typology: "Typology",
    collaborators: "In collaboration with",
    with: "with",
    about: "About the project",
    more: "More work",
    viewAll: "View all",
    openImage: (i: number, n: number) => `Open image ${i} of ${n} full screen`,
    image: (title: string, i: number) => `${title} — image ${i}`,
  },
  about: {
    eyebrow: "Studio",
    title: "About AyD",
    who: "Who we are",
    team: "Team",
    metaDescription: "Arq Y Di | Arquitectura y Diseño is a full-service architecture and design firm based in Los Angeles, CA.",
  },
  footer: { contact: "Contact", studio: "Studio", spoken: "se habla inglés" },
  notFound: { title: "Page not found", body: "The page you’re looking for doesn’t exist or has moved.", home: "Return home" },
  categories: { residential: "Residential", cultural: "Cultural", commercial: "Commercial", "previous-work": "Previous Work" },
};

export type Dict = typeof en;

const es: Dict = {
  skip: "Ir al contenido",
  menu: "Menú",
  close: "Cerrar",
  home: "Arq Y Di — inicio",
  tagline: "arquitectura y diseño",
  nav: { work: "Obra", about: "Estudio" },
  langSwitch: { label: "Idioma", other: "English", otherShort: "EN" },
  preview: { text: "Modo de vista previa — mostrando borradores.", exit: "Salir" },
  contentNotice: "Algunas descripciones de proyectos aún están disponibles solo en inglés.",
  home_: {
    eyebrow: "Arquitectura y Diseño — Los Ángeles",
    lede: "AyD es un estudio de arquitectura y diseño con sede en Los Ángeles. Creemos que la arquitectura es un catalizador de cambio para las personas, las comunidades y el planeta.",
    selected: "Obra seleccionada",
    all: "Todos los proyectos",
    typologies: "Tipologías",
  },
  work: {
    title: "Obra",
    eyebrow: "Proyectos",
    all: "Todos",
    grid: "Cuadrícula",
    list: "Lista",
    view: "Vista",
    filter: "Filtrar por tipología",
    count: (n: number) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`,
    empty: "Nuevos proyectos muy pronto.",
    search: "Buscar proyectos",
    searchPlaceholder: "Buscar por nombre, lugar, colaborador…",
    clear: "Borrar búsqueda",
    noMatch: (q: string) => `Ningún proyecto coincide con “${q}”.`,
    reset: "Ver todos los proyectos",
    metaDescription: "Proyectos residenciales, culturales y comerciales de Arq Y Di, estudio de arquitectura y diseño en Los Ángeles.",
  },
  project: {
    back: "Toda la obra",
    location: "Ubicación",
    year: "Año",
    typology: "Tipología",
    collaborators: "En colaboración con",
    with: "con",
    about: "Sobre el proyecto",
    more: "Más proyectos",
    viewAll: "Ver todo",
    openImage: (i: number, n: number) => `Abrir imagen ${i} de ${n} en pantalla completa`,
    image: (title: string, i: number) => `${title} — imagen ${i}`,
  },
  about: {
    eyebrow: "Estudio",
    title: "Sobre AyD",
    who: "Quiénes somos",
    team: "Equipo",
    metaDescription: "Arq Y Di | Arquitectura y Diseño es un estudio de arquitectura y diseño integral con sede en Los Ángeles, CA.",
  },
  footer: { contact: "Contacto", studio: "Estudio", spoken: "se habla inglés" },
  notFound: { title: "Página no encontrada", body: "La página que buscas no existe o se ha movido.", home: "Volver al inicio" },
  categories: { residential: "Residencial", cultural: "Cultural", commercial: "Comercial", "previous-work": "Obra anterior" },
};

export const DICTS: Record<Lang, Dict> = { en, es };
export const dict = (lang: Lang) => DICTS[lang];

/** hreflang alternates + canonical for a language-neutral path like "/work". */
export function alternates(lang: Lang, path: string) {
  return {
    canonical: localize(lang, path),
    languages: { en: localize("en", path), es: localize("es", path), "x-default": localize("en", path) },
  };
}
