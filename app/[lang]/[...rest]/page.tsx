import { notFound } from "next/navigation";

/** Catch-all so unknown URLs render the localized, styled 404 inside the [lang] layout. */
export default function CatchAll() {
  notFound();
}
