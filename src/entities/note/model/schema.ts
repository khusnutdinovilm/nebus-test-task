import type { INote } from "./types";

export interface NotesEnvelope {
  version: number;
  notes: INote[];
}

export interface DraftEnvelope {
  version: number;
  noteId: string;
  note: INote;
  savedAt: number;
}
