import React from 'react';
import { TodoProvider } from '@/lib/TodoContext';
import { AddTodoForm } from '@/components/AddTodoForm';
import { TodoList } from '@/components/TodoList';

export default function HomePage() {
  return (
    <TodoProvider>
      <main className="container">
        <div className="card">
          <header className="header">
            <div>
              <h1 className="title">Todo List</h1>
              <p className="subtitle">A small, fast in-memory todo app</p>
            </div>
          </header>

          <AddTodoForm />
          <TodoList />
        </div>
      </main>
    </TodoProvider>
  );
}
