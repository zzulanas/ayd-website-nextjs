import type { Entry, EntryFields } from "contentful";

export interface TypeAboutPageFields {
  fields: {
    content?: EntryFields.RichText;
  };
  contentTypeId?: string;
}

export type TypeAboutPage = Entry<TypeAboutPageFields>;
