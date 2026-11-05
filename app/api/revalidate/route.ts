import { revalidatePath } from "next/cache";

/**
 * Called by the Contentful publish webhook. Same contract as the previous Pages Router
 * endpoint: POST with the shared secret in the `x-vercel-reval-key` header.
 * The site is small, so we revalidate every page rather than tracking per-entry dependencies.
 */
export async function POST(request: Request) {
  const key = request.headers.get("x-vercel-reval-key");
  if (!key) return Response.json({ message: "x-vercel-reval-key header not defined" }, { status: 401 });
  if (key !== process.env.CONTENTFUL_REVALIDATE_SECRET) return Response.json({ message: "Invalid token" }, { status: 401 });

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, now: Date.now() });
}
