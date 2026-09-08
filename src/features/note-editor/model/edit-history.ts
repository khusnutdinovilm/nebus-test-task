import type { EditableNote } from "@entities/note";
import type { ITodo } from "@entities/todo";

import { applyOp, type EditOp, revertOp } from "./operations";

const HISTORY_LIMIT = 50;

export class EditHistory {
  private undoStack: EditOp[] = [];
  private redoStack: EditOp[] = [];
  private pendingKey: string | null = null;

  constructor(private readonly state: EditableNote) {}

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }
  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  private push(op: EditOp, coalesceKey: string | null): void {
    applyOp(this.state, op);
    this.redoStack = [];

    const last = this.undoStack.at(-1);
    if (coalesceKey !== null && coalesceKey === this.pendingKey && last) {
      mergeAfter(last, op);
    } else {
      this.undoStack.push(op);
      if (this.undoStack.length > HISTORY_LIMIT) this.undoStack.shift();
    }
    this.pendingKey = coalesceKey;
  }

  seal(): void {
    this.pendingKey = null;
  }

  setTitle(after: string): void {
    if (this.state.title === after) return;
    this.push({ type: "set-title", before: this.state.title, after }, "title");
  }

  editTodoText(id: string, after: string): void {
    const todo = this.state.todos.find((t) => t.id === id);
    if (!todo || todo.text === after) return;
    this.push({ type: "edit-todo-text", id, before: todo.text, after }, `todo:${id}:text`);
  }

  toggleTodo(id: string): void {
    const todo = this.state.todos.find((t) => t.id === id);
    if (!todo) return;
    this.push({ type: "toggle-todo", id, before: todo.done, after: !todo.done }, null);
  }

  addTodo(todo: ITodo, index = this.state.todos.length): void {
    this.push({ type: "add-todo", todo, index }, null);
  }

  removeTodo(id: string): void {
    const index = this.state.todos.findIndex((t) => t.id === id);
    const todo = this.state.todos[index];
    if (!todo) return;
    this.push({ type: "remove-todo", todo: structuredClone(todo), index }, null);
  }

  undo(): void {
    const op = this.undoStack.pop();
    if (!op) return;
    revertOp(this.state, op);
    this.redoStack.push(op);
    this.pendingKey = null;
  }

  redo(): void {
    const op = this.redoStack.pop();
    if (!op) return;
    applyOp(this.state, op);
    this.undoStack.push(op);
    this.pendingKey = null;
  }

  reset(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.pendingKey = null;
  }
}

function mergeAfter(last: EditOp, next: EditOp): void {
  if (last.type === "set-title" && next.type === "set-title") {
    last.after = next.after;
  } else if (last.type === "edit-todo-text" && next.type === "edit-todo-text") {
    last.after = next.after;
  }
}
