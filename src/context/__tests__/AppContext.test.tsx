import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProvider, useApp } from '../AppContext'

const Consumer: React.FC = () => {
  const { theme, toggleTheme, user, setUser } = useApp()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
      <span data-testid="user">{user ? user.name : 'none'}</span>
      <button onClick={() => setUser({ name: 'Tester' })}>set</button>
    </div>
  )
}

describe('AppContext', () => {
  it('provides default user and toggles theme', async () => {
    render(
      <AppProvider>
        <Consumer />
      </AppProvider>
    )

    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(screen.getByTestId('user').textContent).toBe('Developer')

    await userEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('theme').textContent).toBe('light')

    await userEvent.click(screen.getByText('set'))
    expect(screen.getByTestId('user').textContent).toBe('Tester')
  })
})
