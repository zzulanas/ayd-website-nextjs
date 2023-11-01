import type { Entry, EntryFields } from "contentful";

export interface TypeFooterFields {
    address?: EntryFields.Symbol;
    phoneNumber?: EntryFields.Symbol;
    infoEmail?: EntryFields.Symbol;
    certifications?: EntryFields.Symbol[];
}

export type TypeFooter = Entry<TypeFooterFields>;
