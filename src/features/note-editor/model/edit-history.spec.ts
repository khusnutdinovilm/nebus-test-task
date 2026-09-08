import { beforeEach, describe, expect, it } from "vitest";

import type { EditableNote } from "@entities/note";
import { createTodo } from "@entities/todo";

import { EditHistory } from "./edit-history";

describe("EditHistory", () => {
  let state: EditableNote;

  beforeEach(() => {
    state = { title: "", todos: [] };
  });

  it("непрерывный ввод в одно поле = одна запись", () => {
    const h = new EditHistory(state);
    h.setTitle("a");
    h.setTitle("ab");
    h.setTitle("abc");

    expect(state.title).toBe("abc");
    h.undo();
    expect(state.title).toBe("");
    expect(h.canUndo).toBe(false);
    expect(h.canRedo).toBe(true);
  });

  it("seal разделяет серии ввода", () => {
    const h = new EditHistory(state);
    h.setTitle("a");
    h.seal();
    h.setTitle("ab");

    h.undo();
    expect(state.title).toBe("a");
    h.undo();
    expect(state.title).toBe("");
  });

  it("правка текста разных пунктов не сливается", () => {
    const a = createTodo("a");
    const b = createTodo("b");
    state.todos = [a, b];
    const h = new EditHistory(state);

    h.editTodoText(a.id, "a1");
    h.editTodoText(b.id, "b1");

    h.undo();
    expect(state.todos[1]!.text).toBe("b");
    expect(state.todos[0]!.text).toBe("a1");
  });

  it("чекбокс / добавление / удаление — атомарные записи", () => {
    const todo = createTodo("x");
    state.todos = [todo];
    const h = new EditHistory(state);

    h.toggleTodo(todo.id);
    expect(state.todos[0]!.done).toBe(true);
    h.undo();
    expect(state.todos[0]!.done).toBe(false);

    h.addTodo(createTodo("y"));
    expect(state.todos).toHaveLength(2);
    h.undo();
    expect(state.todos).toHaveLength(1);
  });

  it("удаление пункта восстанавливается на прежнюю позицию", () => {
    const a = createTodo("a");
    const b = createTodo("b");
    const c = createTodo("c");
    state.todos = [a, b, c];
    const h = new EditHistory(state);

    h.removeTodo(b.id);
    expect(state.todos.map((t) => t.text)).toEqual(["a", "c"]);

    h.undo();
    expect(state.todos.map((t) => t.text)).toEqual(["a", "b", "c"]);
  });

  it("атомарная операция прерывает серию ввода", () => {
    const todo = createTodo("x");
    state.todos = [todo];
    const h = new EditHistory(state);

    h.setTitle("a");
    h.toggleTodo(todo.id);
    h.setTitle("ab");

    h.undo();
    expect(state.title).toBe("a");
    h.undo();
    expect(state.todos[0]!.done).toBe(false);
    h.undo();
    expect(state.title).toBe("");
  });

  it("новое действие после undo очищает redo-ветку", () => {
    const h = new EditHistory(state);
    h.setTitle("a");
    h.seal();
    h.setTitle("ab");
    h.undo();
    expect(h.canRedo).toBe(true);

    h.setTitle("z");
    expect(h.canRedo).toBe(false);
  });

  it("redo повторяет отменённое действие", () => {
    const h = new EditHistory(state);
    h.setTitle("a");
    h.seal();
    h.undo();
    expect(state.title).toBe("");
    h.redo();
    expect(state.title).toBe("a");
  });

  it("лимит 50: старые записи вытесняются", () => {
    const h = new EditHistory(state);
    for (let i = 1; i <= 60; i++) {
      h.setTitle(String(i));
      h.seal();
    }

    let count = 0;
    while (h.canUndo) {
      h.undo();
      count++;
    }
    expect(count).toBe(50);
    expect(state.title).toBe("10");
  });

  it("reset очищает обе ветки", () => {
    const h = new EditHistory(state);
    h.setTitle("a");
    h.seal();
    h.undo();
    h.reset();
    expect(h.canUndo).toBe(false);
    expect(h.canRedo).toBe(false);
  });
});
