import Image from "next/image";
import { documentToReactComponents, type Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { RichText as RichTextData } from "@/lib/types";

export function RichText({ content, className = "prose-ayd" }: { content: RichTextData; className?: string }) {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const img = content.assets[node.data.target?.sys?.id];
        if (!img) return null;
        return (
          <figure className="my-10">
            <Image src={img.url} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
            {img.caption && <figcaption className="mt-2 text-xs text-faint">{img.caption}</figcaption>}
          </figure>
        );
      },
    },
  };
  return <div className={className}>{documentToReactComponents(content.json, options)}</div>;
}
