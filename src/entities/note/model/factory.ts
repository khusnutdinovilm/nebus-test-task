import type { INote } from "./types";

export function createNote(): INote {
  return {
    id: crypto.randomUUID(),
    title: "",
    todos: [],
    updatedAt: Date.now(),
  };
}
