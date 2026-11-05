import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { LANGS, dict, isLang } from "@/lib/i18n";
import "../globals.css";

const inter = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-inter-tight", display: "swap" });

const GA_ID = "G-191BELE417";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: "Arq Y Di — Arquitectura y Diseño", template: `%s — ${SITE_NAME}` },
    description: lang === "es" ? dict("es").home_.lede : SITE_DESCRIPTION,
    openGraph: { type: "website", siteName: SITE_NAME, images: "/api/og", locale: lang === "es" ? "es_US" : "en_US" },
    twitter: { card: "summary_large_image" },
    icons: {
      icon: [
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export const viewport: Viewport = { themeColor: "#f7f6f2" };

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = dict(lang);
  const { isEnabled: preview } = await draftMode();

  return (
    <html lang={lang} className={inter.variable}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          {d.skip}
        </a>
        {preview && (
          <div className="bg-ink py-2 text-center text-sm text-paper">
            {d.preview.text} <a href="/api/exit-preview" className="underline underline-offset-4">{d.preview.exit}</a>
          </div>
        )}
        <SiteHeader lang={lang} />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter lang={lang} />
        <Analytics />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
