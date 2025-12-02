import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AuthContext } from '../types/auth'

const AuthContext = createContext<AuthContext | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('User context erorr')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUsername = localStorage.getItem('username')

    if (savedToken && savedUsername) {
      setUser(savedUsername)
      setToken(savedToken)
    }
  }, [])

  const login = (username: string, token: string, rememberMe: boolean) => {
    setUser(username)
    setToken(token)
    if (rememberMe) {
      localStorage.setItem('username', username)
      localStorage.setItem('token', token)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  const signup = (username: string, token: string) => {
    setUser(username)
    setToken(token)
    localStorage.setItem('username', username)
    localStorage.setItem('token', token)
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
