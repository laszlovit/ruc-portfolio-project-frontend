import { useFormContext } from 'react-hook-form'

export function FormRootError() {
  const { formState } = useFormContext()

  if (!formState.errors.root) return null

  return <p className="text-sm font-medium text-destructive">{formState.errors.root.message}</p>
}
