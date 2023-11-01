import type { Entry, EntryFields } from "contentful";

export interface TypeProjectTypeFields {
  fields: {
    type: EntryFields.Symbol;
  };
  contentTypeId: string;
}

export type TypeProjectType = Entry<TypeProjectTypeFields>;
