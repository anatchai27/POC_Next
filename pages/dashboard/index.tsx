import React from 'react';
import { TodoProvider } from '@/lib/TodoContext';
import { TodoList } from '@/components/TodoList';
import { AddTodoForm } from '@/components/AddTodoForm';
import { useTodos } from '@/lib/TodoContext';

function DashboardInner() {
  const { todos } = useTodos();
  const completed = todos.filter(t => t.completed).length;
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h1>Dashboard</h1>
      <p>Total: {todos.length} | Completed: {completed}</p>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <TodoProvider>
      <DashboardInner />
    </TodoProvider>
  );
}
