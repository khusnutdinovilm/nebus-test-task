import { defineStore } from "pinia";

import { STORAGE_KEYS } from "@shared/config/storage-keys";
import { debounce } from "@shared/lib/debounce";

import { notesRepository } from "../api/notes-repository";
import type { INote } from "./types";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<INote[]>([]);
  const isHydrated = ref(false);

  const persist = debounce(() => notesRepository.saveAll(notes.value), 400);

  function hydrate() {
    if (isHydrated.value) return;
    notes.value = notesRepository.getAll();
    isHydrated.value = true;
  }

  const getById = (id: string): INote | null => notes.value.find((n) => n.id === id) ?? null;

  function upsert(note: INote) {
    const next: INote = { ...structuredClone(note), updatedAt: Date.now() };
    const idx = notes.value.findIndex((n) => n.id === note.id);
    if (idx === -1) notes.value.unshift(next);
    else notes.value[idx] = next;
    persist();
  }

  function remove(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id);
    persist();
  }

  function initCrossTabSync() {
    if (import.meta.server) return;
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEYS.notes) notes.value = notesRepository.getAll();
    });
    window.addEventListener("beforeunload", () => persist.flush());
  }

  return { notes, isHydrated, hydrate, getById, upsert, remove, initCrossTabSync };
});
