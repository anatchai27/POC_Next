import React, { useState } from 'react'
import { useTodos } from '@/lib/TodoContext'

export const AddTodoForm: React.FC = () => {
  const { add } = useTodos()
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    add(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form" className="add-form">
      <input
        className="input"
        aria-label="todo-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add todo"
      />
      <button className="btn" type="submit" disabled={!title.trim()}>
        Add
      </button>
    </form>
  )
}
