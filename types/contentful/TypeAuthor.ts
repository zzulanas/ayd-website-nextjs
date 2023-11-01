import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeAuthorFields {
    name: EntryFields.Symbol;
    picture: Asset;
}

export type TypeAuthor = Entry<TypeAuthorFields>;
