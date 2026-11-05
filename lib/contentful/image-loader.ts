"use client";

import type { ImageLoaderProps } from "next/image";

/** Resize + format-convert via Contentful's Images API (https://www.contentful.com/developers/docs/references/images-api/). */
export default function contentfulLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  url.searchParams.set("fm", "avif");
  return url.toString();
}
