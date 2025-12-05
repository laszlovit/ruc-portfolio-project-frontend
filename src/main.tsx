import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { ToastContainerComponent } from './components/toast'
import { AuthProvider } from './contexts/auth-context'
import { ToastProvider } from './contexts/toast-context'
import './custom.scss'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <App />
          <ToastContainerComponent />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
)
