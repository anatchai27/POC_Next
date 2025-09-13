import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useApp } from '../context/AppContext'

const NavBar: React.FC = () => {
  const { pathname } = useRouter()
  const isActive = (path: string) => pathname === path

  const { theme, toggleTheme, user } = useApp()

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className={`nav-brand ${isActive('/') ? 'active' : ''}`}>Todo POC</Link>
      </div>
      <div className="nav-links">
        <Link href="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
        <Link href="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>History</Link>
        <button onClick={toggleTheme} className="nav-link toggle-btn" aria-label="Toggle theme">{theme === 'dark' ? '🌙' : '☀️'}</button>
        <div className="nav-user">{user ? user.name : 'Guest'}</div>
      </div>
    </nav>
  )
}

export default NavBar
