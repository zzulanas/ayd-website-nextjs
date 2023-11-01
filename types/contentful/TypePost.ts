import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeAuthorFields } from "./TypeAuthor";

export interface TypePostFields {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    content: EntryFields.RichText;
    excerpt: EntryFields.Symbol;
    coverImage: Asset;
    date: EntryFields.Date;
    author: Entry<TypeAuthorFields>;
}

export type TypePost = Entry<TypePostFields>;
