import React, { createContext, useCallback, useContext, useState } from 'react'
import { Todo } from '@/types/todo'
import { addTodo, listTodos, toggleTodo, deleteTodo, updateTodo } from '@/lib/todoStore'

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

  const add = useCallback((title: string) => {
    if (!title.trim()) return
    addTodo({ title })
    refresh()
  }, [refresh])

  const toggle = useCallback((id: string) => {
    toggleTodo(id)
    refresh()
  }, [refresh])

  const remove = useCallback((id: string) => {
    deleteTodo(id)
    refresh()
  }, [refresh])

  const update = useCallback((id: string, title: string) => {
    updateTodo({ id, title })
    refresh()
  }, [refresh])

  return <TodoContext.Provider value={{ todos, add, toggle, remove, update, refresh }}>{children}</TodoContext.Provider>
}

export const useTodos = (): TodoContextValue => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within TodoProvider')
  return ctx
}
