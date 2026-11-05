import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getProject } from "@/lib/contentful";

/** Contentful preview URL: /api/preview?secret=<CONTENTFUL_PREVIEW_SECRET>&slug={entry.fields.slug} */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!process.env.CONTENTFUL_PREVIEW_SECRET || secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  const project = await getProject(slug, "en", true);
  if (!project) return Response.json({ message: "Invalid slug" }, { status: 401 });
  (await draftMode()).enable();
  // Redirect to the CMS-resolved slug, not the query param, to avoid open redirects.
  redirect(`/projects/${project.slug}`);
}
