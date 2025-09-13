import { describe, it, expect, beforeEach } from 'vitest';
import { addTodo, listTodos, getTodo, updateTodo, toggleTodo, deleteTodo, clearTodos } from '../todoStore';

describe('todoStore (AAA)', () => {
  beforeEach(() => {
    clearTodos();
  });

  it('adds a todo and returns the created todo with trimmed title', () => {
    // Arrange
    const title = '  My Task  ';

    // Act
    const todo = addTodo({ title });

    // Assert
    expect(todo.id).toBeDefined();
    expect(todo.title).toBe('My Task');
    expect(todo.completed).toBe(false);
    expect(todo.createdAt).toBeDefined();
    expect(todo.updatedAt).toBeDefined();
  });

  it('lists todos in created order', () => {
    // Arrange
    const a = addTodo({ title: 'First' });
    const b = addTodo({ title: 'Second' });

    // Act
    const items = listTodos();

    // Assert
    expect(items.length).toBe(2);
    expect(items[0].id).toBe(a.id);
    expect(items[1].id).toBe(b.id);
  });

  it('gets a todo by id', () => {
    // Arrange
    const t = addTodo({ title: 'Lookup' });

    // Act
    const found = getTodo(t.id);

    // Assert
    expect(found).toBeDefined();
    expect(found!.id).toBe(t.id);
  });

  it('updates a todo title and returns updated todo', () => {
    // Arrange
    const t = addTodo({ title: 'Old' });
    const oldUpdated = t.updatedAt;

    // Act
    const updated = updateTodo({ id: t.id, title: 'New Title' });

    // Assert
  expect(updated).toBeDefined();
  expect(updated!.title).toBe('New Title');
  // updatedAt may be equal if timing is identical in tests; assert it's a valid ISO and not earlier
  expect(Date.parse(updated!.updatedAt)).toBeGreaterThanOrEqual(Date.parse(oldUpdated));
  });

  it('returns undefined when updating unknown id', () => {
    // Act
    const r = updateTodo({ id: 'nope', title: 'x' });

    // Assert
    expect(r).toBeUndefined();
  });

  it('toggles a todo completed state', () => {
    // Arrange
    const t = addTodo({ title: 'ToggleMe' });
    expect(t.completed).toBe(false);

    // Act
    const toggled = toggleTodo(t.id);

    // Assert
    expect(toggled).toBeDefined();
    expect(toggled!.completed).toBe(true);
  });

  it('returns undefined when toggling unknown id', () => {
    // Act
    const r = toggleTodo('missing');

    // Assert
    expect(r).toBeUndefined();
  });

  it('deletes a todo and returns true', () => {
    // Arrange
    const t = addTodo({ title: 'DeleteMe' });

    // Act
    const removed = deleteTodo(t.id);
    const found = getTodo(t.id);

    // Assert
    expect(removed).toBe(true);
    expect(found).toBeUndefined();
  });

  it('returns false when deleting unknown id', () => {
    // Act
    const r = deleteTodo('not-existing');

    // Assert
    expect(r).toBe(false);
  });

  it('clears all todos', () => {
    // Arrange
    addTodo({ title: 'A' });
    addTodo({ title: 'B' });

    // Act
    clearTodos();
    const items = listTodos();

    // Assert
    expect(items.length).toBe(0);
  });
});

beforeEach(() => clearTodos());

describe('todoStore', () => {
  test('add & list', () => {
    // Arrange
    // (store cleared)
    // Act
    addTodo({ title: 'A' });
    addTodo({ title: 'B' });
    const list = listTodos();
    // Assert
    expect(list.map(t => t.title)).toEqual(['A', 'B']);
  });

  test('toggle', () => {
    // Arrange
    const todo = addTodo({ title: 'Toggle' });
    // Act
    toggleTodo(todo.id);
    const updated = listTodos().find(t => t.id === todo.id)!;
    // Assert
    expect(updated.completed).toBe(true);
  });

  test('update title', () => {
    // Arrange
    const todo = addTodo({ title: 'Old' });
    // Act
    updateTodo({ id: todo.id, title: 'New' });
    // Assert
    expect(listTodos().find(t => t.id === todo.id)!.title).toBe('New');
  });

  test('delete', () => {
    // Arrange
    const todo = addTodo({ title: 'Temp' });
    // Act
    const deleted = deleteTodo(todo.id);
    // Assert
    expect(deleted).toBe(true);
    expect(listTodos().length).toBe(0);
  });
});
