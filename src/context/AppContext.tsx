import React, { createContext, useContext, useState, useCallback } from 'react'

type HistoryEvent = {
  id: string
  type: 'add' | 'update' | 'toggle' | 'delete'
  todoId: string
  title?: string
  completed?: boolean
  timestamp: string
}

type AppContextValue = {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  user: { name: string } | null
  setUser: (user: { name: string } | null) => void
  history: HistoryEvent[]
  addHistory: (ev: Omit<HistoryEvent, 'id' | 'timestamp'>) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [user, setUser] = useState<{ name: string } | null>({ name: 'Developer' })
  const [history, setHistory] = useState<HistoryEvent[]>([])

  const toggleTheme = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])

  const addHistory = useCallback((ev: Omit<HistoryEvent, 'id' | 'timestamp'>) => {
    setHistory(h => {
      const next = [
        { ...ev, id: String(Date.now()) + Math.random().toString(36).slice(2), timestamp: new Date().toISOString() },
        ...h,
      ]
      // keep recent 200 events
      return next.slice(0, 200)
    })
  }, [])

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser, history, addHistory }}>
      <div data-theme={theme}>{children}</div>
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export default AppContext
