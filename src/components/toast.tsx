import { useToast } from '@/contexts/toast-context'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

interface ToastItemProps {
  toast: ToastMessage
  onClose: (id: string) => void
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const duration = toast.duration ?? 5000
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(() => onClose(toast.id), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onClose])

  const handleClose = () => {
    setShow(false)
    setTimeout(() => onClose(toast.id), 300)
  }

  const getVariantStyles = () => {
    switch (toast.variant) {
      case 'success':
        return {
          bgColor: '#198754',
          textColor: '#ffffff',
          icon: <CheckCircle style={{ width: '1.25rem', height: '1.25rem' }} />,
        }
      case 'error':
        return {
          bgColor: '#dc3545',
          textColor: '#ffffff',
          icon: <AlertCircle style={{ width: '1.25rem', height: '1.25rem' }} />,
        }
      case 'warning':
        return {
          bgColor: '#ffc107',
          textColor: '#000000',
          icon: <AlertCircle style={{ width: '1.25rem', height: '1.25rem' }} />,
        }
      case 'info':
        return {
          bgColor: '#0dcaf0',
          textColor: '#ffffff',
          icon: <Info style={{ width: '1.25rem', height: '1.25rem' }} />,
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <Toast show={show} onClose={handleClose} autohide={false}>
      <Toast.Header
        style={{ backgroundColor: styles.bgColor, color: styles.textColor }}
        closeButton
        closeVariant="white"
        className="border-0"
      >
        <div className="d-flex align-items-center gap-2 me-auto">
          {styles.icon}
          <strong className="me-auto">Notification</strong>
        </div>
      </Toast.Header>
      <Toast.Body style={{ backgroundColor: styles.bgColor, color: styles.textColor }}>
        <div className="d-flex align-items-center gap-2">
          <span>{toast.message}</span>
        </div>
      </Toast.Body>
    </Toast>
  )
}

export function ToastContainerComponent() {
  const { toasts, removeToast } = useToast()

  return (
    <ToastContainer position="top-end" className="p-3" style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </ToastContainer>
  )
}
