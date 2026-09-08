import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { notesRepository } from "../api/notes-repository";
import { createNote } from "./factory";
import { useNotesStore } from "./store";

describe("useNotesStore", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("hydrate читает заметки из репозитория", () => {
    const note = createNote();
    notesRepository.saveAll([note]);

    const store = useNotesStore();
    store.hydrate();

    expect(store.notes).toHaveLength(1);
    expect(store.notes[0]!.id).toBe(note.id);
  });

  it("hydrate идемпотентен", () => {
    const store = useNotesStore();
    store.hydrate();
    notesRepository.saveAll([createNote()]);
    store.hydrate();
    expect(store.notes).toHaveLength(0);
  });

  it("upsert добавляет новую и обновляет updatedAt", () => {
    const store = useNotesStore();
    const note = { ...createNote(), updatedAt: 0 };

    store.upsert(note);

    expect(store.notes).toHaveLength(1);
    expect(store.notes[0]!.updatedAt).toBeGreaterThan(0);
  });

  it("upsert обновляет существующую (не плодит дубли)", () => {
    const store = useNotesStore();
    const note = createNote();
    store.upsert(note);
    store.upsert({ ...note, title: "изменено" });

    expect(store.notes).toHaveLength(1);
    expect(store.notes[0]!.title).toBe("изменено");
  });

  it("remove удаляет по id", () => {
    const store = useNotesStore();
    const note = createNote();
    store.upsert(note);
    store.remove(note.id);
    expect(store.notes).toHaveLength(0);
  });

  it("персист дебаунсится: серия мутаций → один saveAll", () => {
    vi.useFakeTimers();
    const saveAll = vi.spyOn(notesRepository, "saveAll");

    const store = useNotesStore();
    store.upsert(createNote());
    store.upsert(createNote());
    store.upsert(createNote());

    expect(saveAll).not.toHaveBeenCalled();
    vi.advanceTimersByTime(400);
    expect(saveAll).toHaveBeenCalledTimes(1);
  });
});
