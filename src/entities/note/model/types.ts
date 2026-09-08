import type { ITodo } from "@entities/todo";

export interface INote {
  id: string;
  title: string;
  todos: ITodo[];
  updatedAt: number;
}

export type EditableNote = Pick<INote, "title" | "todos">;
