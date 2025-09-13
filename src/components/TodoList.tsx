import React from 'react'
import { useTodos } from '@/lib/TodoContext'
import { TodoItem } from './TodoItem'

export const TodoList: React.FC = () => {
  const { todos } = useTodos()
  if (!todos.length) return <p aria-label="empty" className="empty">No todos</p>
  return (
    <ul aria-label="todo-list" className="todo-list">
      {todos.map(t => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  )
}
