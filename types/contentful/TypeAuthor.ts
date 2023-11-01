import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeAuthorFields {
  fields: {
    name: EntryFields.Symbol;
    picture: Asset;
  };
  contentTypeId: string;
}

export type TypeAuthor = Entry<TypeAuthorFields>;
