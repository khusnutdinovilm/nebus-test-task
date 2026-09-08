import type { ITodo } from "./types";

export function createTodo(text = ""): ITodo {
  return {
    id: crypto.randomUUID(),
    text,
    done: false,
  };
}
