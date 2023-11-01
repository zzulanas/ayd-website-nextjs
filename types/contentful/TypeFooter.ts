import type { Entry, EntryFields } from "contentful";

export interface TypeFooterFields {
  fields: {
    address?: EntryFields.Symbol;
    phoneNumber?: EntryFields.Symbol;
    infoEmail?: EntryFields.Symbol;
    certifications?: EntryFields.Symbol[];
  };
  contentTypeId: string;
}

export type TypeFooter = Entry<TypeFooterFields>;
