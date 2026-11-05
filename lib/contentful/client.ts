import "server-only";

const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

/** All Contentful fetches share this tag so the webhook can bust everything at once. */
export const CACHE_TAG = "contentful";

interface GqlResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export async function gql<T>(
  query: string,
  variables: Record<string, unknown>,
  { preview = false }: { preview?: boolean } = {},
): Promise<T> {
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query, variables: { ...variables, preview } }),
    ...(preview
      ? { cache: "no-store" as const }
      : { next: { revalidate: 3600, tags: [CACHE_TAG] } }),
  });

  const json = (await res.json()) as GqlResponse<T>;
  const detail = json.errors?.map((e) => e.message).join("; ");
  if (!res.ok || !json.data) {
    throw new Error(`Contentful GraphQL error (${res.status}): ${detail ?? res.statusText}`);
  }
  // Partial errors (e.g. UNRESOLVABLE_LINK for an unpublished image) come back alongside
  // valid data; render what we have rather than failing the whole page.
  if (detail) console.warn(`Contentful GraphQL partial error: ${detail}`);
  return json.data;
}
