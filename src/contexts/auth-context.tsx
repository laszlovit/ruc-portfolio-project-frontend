import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AuthContext, AuthResponse, LoginRequest, SignUpRequest } from '../types/auth'

const AuthContext = createContext<AuthContext | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5082/users/me', {
          credentials: 'include'
        })

        if (response.ok && !cancelled) {
          const userData = await response.json()
          setUser(userData)
        } else if (!cancelled) {
          setUser(null)
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        if (!cancelled) {
          setUser(null)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    checkAuth()

    return () => {
      cancelled = true
    }
  }, [])

  const login = async (data: LoginRequest) => {
    const response = await fetch('http://localhost:5082/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: data.username, password: data.password })
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const userData = await response.json()
    setUser(userData)
  }

  const signup = async (data: SignUpRequest) => {
    const response = await fetch('http://localhost:5082/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Signup failed')
    }

    const userData = await response.json()
    setUser(userData)
  }

  const logout = async () => {
    try {
      await fetch('http://localhost:5082/users/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
    }
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
