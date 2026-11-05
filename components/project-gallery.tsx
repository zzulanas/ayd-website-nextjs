"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { Img } from "@/lib/types";
import { dict, type Lang } from "@/lib/i18n";

type Row = { kind: "wide"; items: [number] } | { kind: "pair"; items: [number, number] } | { kind: "single"; items: [number] };

const isLandscape = (img: Img) => img.width / img.height >= 1.15;

/** Landscape images get a full row; portraits/squares are paired side by side. */
function layout(images: Img[]): Row[] {
  const rows: Row[] = [];
  let pending: number | null = null;
  images.forEach((img, i) => {
    if (isLandscape(img)) {
      if (pending !== null) { rows.push({ kind: "single", items: [pending] }); pending = null; }
      rows.push({ kind: "wide", items: [i] });
    } else if (pending === null) {
      pending = i;
    } else {
      rows.push({ kind: "pair", items: [pending, i] });
      pending = null;
    }
  });
  if (pending !== null) rows.push({ kind: "single", items: [pending] });
  return rows;
}

export function ProjectGallery({ images, title, lang }: { images: Img[]; title: string; lang: Lang }) {
  const d = dict(lang);
  const [index, setIndex] = useState(-1);
  const rows = layout(images);

  const figure = (i: number, sizes: string, className = "") => {
    const img = images[i];
    return (
      <figure key={`img-${i}`} className={`reveal ${className}`}>
        <button
          type="button"
          onClick={() => setIndex(i)}
          className="group block w-full cursor-zoom-in overflow-hidden bg-rule/40"
          aria-label={d.project.openImage(i + 1, images.length)}
        >
          <Image
            src={img.url}
            alt={d.project.image(title, i + 1)}
            width={img.width}
            height={img.height}
            sizes={sizes}
            className="h-auto w-full transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.015]"
          />
        </button>
        {img.caption && <figcaption className="mt-2 text-xs text-faint">{img.caption}</figcaption>}
      </figure>
    );
  };

  return (
    <>
      <div className="space-y-6 md:space-y-10">
        {rows.map((row) => {
          const key = row.items.join("-");
          if (row.kind === "wide") return figure(row.items[0], "(min-width: 1600px) 1500px, 100vw");
          if (row.kind === "single")
            return (
              <div key={key} className="md:grid md:grid-cols-12">
                {figure(row.items[0], "(min-width: 768px) 50vw, 100vw", "md:col-span-6 md:col-start-4")}
              </div>
            );
          return (
            <div key={key} className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
              {figure(row.items[0], "(min-width: 768px) 50vw, 100vw")}
              {figure(row.items[1], "(min-width: 768px) 50vw, 100vw")}
            </div>
          );
        })}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "center" }}
        styles={{ container: { backgroundColor: "rgba(20,20,19,0.96)" } }}
        slides={images.map((img) => ({
          src: `${img.url}?w=2400&q=80&fm=avif`,
          alt: img.alt,
          width: img.width,
          height: img.height,
          description: img.caption ?? undefined,
        }))}
      />
    </>
  );
}
