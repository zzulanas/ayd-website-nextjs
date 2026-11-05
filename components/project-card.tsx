import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { dict, localize, type Lang } from "@/lib/i18n";
import type { ProjectSummary } from "@/lib/types";

/** Shared-element name: the card image morphs into the project hero on navigation. */
export const heroName = (slug: string) => `project-${slug}`;

export function ProjectCard({
  project,
  lang,
  index,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  project: ProjectSummary;
  lang: Lang;
  index?: number;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const d = dict(lang);
  return (
    <Link href={localize(lang, `/projects/${project.slug}`)} className={`group block ${className}`}>
      <ViewTransition name={heroName(project.slug)}>
        <div className={`unveil relative overflow-hidden bg-rule/40 ${aspect}`}>
          {project.cover && (
            <Image
              src={project.cover.url}
              alt={project.cover.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.03]"
            />
          )}
        </div>
      </ViewTransition>
      <div className="mt-3 flex items-baseline gap-4 border-t border-rule pt-3">
        {index !== undefined && (
          <span className="w-6 shrink-0 text-sm tabular-nums text-faint">{String(index + 1).padStart(2, "0")}</span>
        )}
        <h3 className="flex-1 text-lg leading-snug decoration-1 underline-offset-4 group-hover:underline">{project.title}</h3>
        <p className="text-right text-sm text-muted">
          {project.location ?? (project.collaborators ? `${d.project.with} ${project.collaborators}` : null)}
        </p>
      </div>
    </Link>
  );
}
