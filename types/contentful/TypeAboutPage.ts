import type { Entry, EntryFields } from "contentful";

export interface TypeAboutPageFields {
    content?: EntryFields.RichText;
}

export type TypeAboutPage = Entry<TypeAboutPageFields>;
