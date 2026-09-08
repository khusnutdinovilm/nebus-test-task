import type { EditableNote } from "@entities/note";
import type { ITodo } from "@entities/todo";

export type EditOp =
  | { type: "set-title"; before: string; after: string }
  | { type: "toggle-todo"; id: string; before: boolean; after: boolean }
  | { type: "edit-todo-text"; id: string; before: string; after: string }
  | { type: "add-todo"; todo: ITodo; index: number }
  | { type: "remove-todo"; todo: ITodo; index: number };

const findTodo = (state: EditableNote, id: string): ITodo | undefined =>
  state.todos.find((todo) => todo.id === id);

export function applyOp(state: EditableNote, op: EditOp): void {
  switch (op.type) {
    case "set-title":
      state.title = op.after;
      break;
    case "toggle-todo": {
      const todo = findTodo(state, op.id);
      if (todo) todo.done = op.after;
      break;
    }
    case "edit-todo-text": {
      const todo = findTodo(state, op.id);
      if (todo) todo.text = op.after;
      break;
    }
    case "add-todo":
      state.todos.splice(op.index, 0, structuredClone(op.todo));
      break;
    case "remove-todo":
      state.todos.splice(op.index, 1);
      break;
  }
}

export function revertOp(state: EditableNote, op: EditOp): void {
  switch (op.type) {
    case "set-title":
      state.title = op.before;
      break;
    case "toggle-todo": {
      const todo = findTodo(state, op.id);
      if (todo) todo.done = op.before;
      break;
    }
    case "edit-todo-text": {
      const todo = findTodo(state, op.id);
      if (todo) todo.text = op.before;
      break;
    }
    case "add-todo":
      state.todos.splice(op.index, 1);
      break;
    case "remove-todo":
      state.todos.splice(op.index, 0, structuredClone(op.todo));
      break;
  }
}
