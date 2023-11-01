import type { Entry, EntryFields } from "contentful";

export interface TypeProjectTypeFields {
    type: EntryFields.Symbol;
}

export type TypeProjectType = Entry<TypeProjectTypeFields>;
