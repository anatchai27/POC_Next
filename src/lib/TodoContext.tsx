import React, { createContext, useCallback, useContext, useState } from 'react'
import { Todo } from '@/types/todo'
import { addTodo, listTodos, toggleTodo, deleteTodo, updateTodo, getTodo } from '@/lib/todoStore'
import { useApp } from '../context/AppContext'

type TodoContextValue = {
  todos: Todo[]
  add: (title: string) => void
  toggle: (id: string) => void
  remove: (id: string) => void
  update: (id: string, title: string) => void
  refresh: () => void
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined)

export const TodoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => listTodos())

  const refresh = useCallback(() => setTodos(listTodos()), [])
  const { addHistory } = useApp()

  const add = useCallback((title: string) => {
    if (!title.trim()) return
    const todo = addTodo({ title })
    addHistory({ type: 'add', todoId: todo.id, title: todo.title, completed: todo.completed })
    refresh()
  }, [refresh, addHistory])

  const toggle = useCallback((id: string) => {
    const updated = toggleTodo(id)
    if (updated) {
      addHistory({ type: 'toggle', todoId: id, title: updated.title, completed: updated.completed })
    }
    refresh()
  }, [refresh, addHistory])

  const remove = useCallback((id: string) => {
    const t = getTodo(id)
    deleteTodo(id)
    addHistory({ type: 'delete', todoId: id, title: t?.title })
    refresh()
  }, [refresh, addHistory])

  const update = useCallback((id: string, title: string) => {
    const updated = updateTodo({ id, title })
    if (updated) addHistory({ type: 'update', todoId: id, title: updated.title, completed: updated.completed })
    refresh()
  }, [refresh, addHistory])

  return <TodoContext.Provider value={{ todos, add, toggle, remove, update, refresh }}>{children}</TodoContext.Provider>
}

export const useTodos = (): TodoContextValue => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within TodoProvider')
  return ctx
}
