import type { ToastMessage, ToastVariant } from '@/components/toast'
import { createContext, type ReactNode, useContext, useState } from 'react'

interface ToastContextType {
  showToast: (message: string, variant: ToastVariant, duration?: number) => void
  toasts: ToastMessage[]
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (message: string, variant: ToastVariant, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastMessage = {
      id,
      message,
      variant,
      duration,
    }
    setToasts((prev) => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return <ToastContext.Provider value={{ showToast, toasts, removeToast }}>{children}</ToastContext.Provider>
}

/* eslint-disable react-refresh/only-export-components */
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
