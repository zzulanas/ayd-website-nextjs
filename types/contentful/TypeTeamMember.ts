import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeTeamMemberFields {
    memberName: EntryFields.Symbol;
    memberRole: EntryFields.Symbol;
    memberPicture: Asset;
}

export type TypeTeamMember = Entry<TypeTeamMemberFields>;
