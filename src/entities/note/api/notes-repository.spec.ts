import { beforeEach, describe, expect, it } from "vitest";

import { SCHEMA_VERSION, STORAGE_KEYS } from "@shared/config/storage-keys";

import { createNote } from "../model/factory";
import { NotesRepository } from "./notes-repository";

describe("NotesRepository", () => {
  let repo: NotesRepository;

  beforeEach(() => {
    localStorage.clear();
    repo = new NotesRepository();
  });

  it("saveAll кладёт конверт с версией схемы", () => {
    const note = createNote();
    repo.saveAll([note]);

    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes)!);
    expect(raw.version).toBe(SCHEMA_VERSION);
    expect(raw.notes).toHaveLength(1);
    expect(raw.notes[0].id).toBe(note.id);
  });

  it("getAll на пустом хранилище возвращает []", () => {
    expect(repo.getAll()).toEqual([]);
  });

  it("getAll на повреждённом JSON возвращает [] и не падает", () => {
    localStorage.setItem(STORAGE_KEYS.notes, "{ broken");
    expect(repo.getAll()).toEqual([]);
  });

  it("getById находит и не находит", () => {
    const note = createNote();
    repo.saveAll([note]);
    expect(repo.getById(note.id)?.id).toBe(note.id);
    expect(repo.getById("nope")).toBeNull();
  });

  it("черновик: save → get → clear", () => {
    const note = createNote();
    repo.saveDraft({ noteId: note.id, note, savedAt: 123 });

    expect(repo.getDraft()?.noteId).toBe(note.id);

    repo.clearDraft();
    expect(repo.getDraft()).toBeNull();
  });

  it("getDraft игнорирует чужую версию схемы", () => {
    localStorage.setItem(
      STORAGE_KEYS.draft,
      JSON.stringify({ version: 999, noteId: "x", note: createNote(), savedAt: 1 })
    );
    expect(repo.getDraft()).toBeNull();
  });
});
