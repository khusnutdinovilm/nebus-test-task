import { SCHEMA_VERSION, STORAGE_KEYS } from "@shared/config/storage-keys";
import { readJson, removeItem, writeJson } from "@shared/lib/storage";

import type { DraftEnvelope, NotesEnvelope } from "../model/schema";
import type { INote } from "../model/types";

export class NotesRepository {
  getAll(): INote[] {
    const env = readJson<NotesEnvelope>(STORAGE_KEYS.notes);
    return env && Array.isArray(env.notes) ? env.notes : [];
  }

  saveAll(notes: INote[]): void {
    const env: NotesEnvelope = { version: SCHEMA_VERSION, notes };
    writeJson(STORAGE_KEYS.notes, env);
  }

  getById(id: string): INote | null {
    return this.getAll().find((note) => note.id === id) ?? null;
  }

  saveDraft(draft: Omit<DraftEnvelope, "version">): void {
    writeJson(STORAGE_KEYS.draft, { version: SCHEMA_VERSION, ...draft });
  }

  getDraft(): DraftEnvelope | null {
    const draft = readJson<DraftEnvelope>(STORAGE_KEYS.draft);
    return draft?.version === SCHEMA_VERSION ? draft : null;
  }

  clearDraft(): void {
    removeItem(STORAGE_KEYS.draft);
  }
}

export const notesRepository = new NotesRepository();
