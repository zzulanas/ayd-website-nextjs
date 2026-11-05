import type { NextConfig } from "next";

const CATEGORY = "residential|cultural|commercial|previous-work";

const config: NextConfig = {
  // Pin the workspace root; otherwise a stray lockfile in $HOME gets picked up.
  turbopack: { root: import.meta.dirname },
  images: {
    // Contentful's Images API does the resizing/format conversion at the CDN edge,
    // so we skip the Next.js optimizer entirely (no Vercel image-optimization cost).
    loader: "custom",
    loaderFile: "./lib/contentful/image-loader.ts",
  },
  async redirects() {
    return [
      // English is canonical at unprefixed URLs.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      // Old per-category pages → unified /work index (keeps existing links + search results working).
      { source: `/:category(${CATEGORY})`, destination: "/work?type=:category", permanent: true },
      { source: `/es/:category(${CATEGORY})`, destination: "/es/work?type=:category", permanent: true },
    ];
  },
  async rewrites() {
    return {
      // Serve unprefixed URLs from the [lang]=en tree without exposing /en.
      beforeFiles: [
        { source: "/", destination: "/en" },
        {
          source: "/:path((?!es(?:/|$)|en(?:/|$)|api/|_next/|_vercel/|favicon/|sitemap\\.xml$|robots\\.txt$).+)",
          destination: "/en/:path",
        },
      ],
    };
  },
};

export default config;
