import React, { useState } from 'react'
import { Todo } from '@/types/todo'
import { useTodos } from '@/lib/TodoContext'

type Props = { todo: Todo }

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggle, remove, update } = useTodos()
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const handleSave = () => {
    update(todo.id, title)
    setEditing(false)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        aria-label={`toggle-${todo.id}`}
        checked={todo.completed}
        onChange={() => toggle(todo.id)}
      />

      {editing ? (
        <div style={{ display: 'flex', gap: 8, flex: 1 }}>
          <input className="input" aria-label={`edit-${todo.id}`} value={title} onChange={e => setTitle(e.target.value)} />
          <button className="btn" onClick={handleSave} aria-label={`save-${todo.id}`}>
            Save
          </button>
        </div>
      ) : (
        <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
      )}

      <div className="actions">
        {!editing && (
          <button className="icon-btn" onClick={() => setEditing(true)} aria-label={`edit-btn-${todo.id}`}>
            Edit
          </button>
        )}
        <button className="icon-btn" onClick={() => remove(todo.id)} aria-label={`delete-${todo.id}`}>
          Delete
        </button>
      </div>
    </li>
  )
}
