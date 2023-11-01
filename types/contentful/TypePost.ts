import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeAuthorFields } from "./TypeAuthor";

export interface TypePostFields {
  fields: {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    content: EntryFields.RichText;
    excerpt: EntryFields.Symbol;
    coverImage: Asset;
    date: EntryFields.Date;
    author: Entry<TypeAuthorFields>;
  };
  contentTypeId: string;
}

export type TypePost = Entry<TypePostFields>;
