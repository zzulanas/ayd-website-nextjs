import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeTeamMemberFields {
  fields: {
    memberName: EntryFields.Symbol;
    memberRole: EntryFields.Symbol;
    memberPicture: Asset;
  };
  contentTypeId: string;
}

export type TypeTeamMember = Entry<TypeTeamMemberFields>;
