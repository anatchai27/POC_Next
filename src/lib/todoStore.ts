import { Todo } from '@/types/todo';
import { generateId } from '@/utils/id';

// In-memory store (per server instance / per test environment)
let store: Todo[] = [];

export interface CreateTodoInput { title: string }
export interface UpdateTodoInput { id: string; title?: string; completed?: boolean }

const nowIso = (): string => new Date().toISOString();

export const listTodos = (): Todo[] => [...store].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

export const getTodo = (id: string): Todo | undefined => store.find(t => t.id === id);

export const addTodo = (input: CreateTodoInput): Todo => {
  const now = nowIso();
  const todo: Todo = { id: generateId(), title: input.title.trim(), completed: false, createdAt: now, updatedAt: now };
  store.push(todo);
  return todo;
};

export const updateTodo = (input: UpdateTodoInput): Todo | undefined => {
  const i = store.findIndex(t => t.id === input.id);
  if (i === -1) return undefined;
  const current = store[i];
  const updated: Todo = {
    ...current,
    title: input.title !== undefined ? input.title.trim() : current.title,
    completed: input.completed !== undefined ? input.completed : current.completed,
    updatedAt: nowIso()
  };
  store[i] = updated;
  return updated;
};

export const toggleTodo = (id: string): Todo | undefined => {
  const todo = getTodo(id);
  if (!todo) return undefined;
  return updateTodo({ id, completed: !todo.completed });
};

export const deleteTodo = (id: string): boolean => {
  const before = store.length;
  store = store.filter(t => t.id !== id);
  return store.length < before;
};

export const clearTodos = (): void => { store = [] };
