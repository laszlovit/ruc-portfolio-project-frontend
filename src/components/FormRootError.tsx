import { Alert } from 'react-bootstrap'
import type { UseFormReturn } from 'react-hook-form'

export function FormRootError({ form }: { form: UseFormReturn<any> }) {
  const rootError = form.formState.errors.root

  if (!rootError) return null

  return (
    <Alert variant="danger" className="mb-3">
      {rootError.message}
    </Alert>
  )
}
