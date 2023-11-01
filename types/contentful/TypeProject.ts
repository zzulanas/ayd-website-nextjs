import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeProjectFields {
  fields: {
    title: EntryFields.Symbol;
    projectSubtitle?: EntryFields.Symbol;
    projectLocation: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    bannerImage: Asset;
    projectImages: Asset[];
    dateCreated: EntryFields.Date;
    projectTagline: EntryFields.Symbol;
    content: EntryFields.RichText;
  };
  contentTypeId: string;
}

export type TypeProject = Entry<TypeProjectFields>;
