import { useAuth } from '@/contexts/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FormRootError } from './form-root-error'

const formSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
})

interface UpdateUsernameFormProps {
    onSuccess?: () => void;
}

export function UpdateUsernameForm({ onSuccess }: UpdateUsernameFormProps) {
    const { user, token, login } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user || '',
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            console.log(data)
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/update-username`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Update failed' }))
                form.setError('root', { message: errorData.message || 'Failed to update username' })
                return
            }

            const result = await response.json()
            console.log("i am result", result)
            login(result.username, token!, true)
            form.reset({ username: result.username })
            onSuccess?.() // Close modal on success
        } catch (err) {
            console.error('Network error', err)
            form.setError('root', { message: 'A network error occurred' })
        }
    }

    return (
        <Form id="update-username-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormRootError form={form} />

            <Form.Group className="mb-3">
                <Form.Label>New Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter new username"
                    {...form.register('username')}
                    isInvalid={!!form.formState.errors.username}
                />
                <Form.Control.Feedback type="invalid">
                    {form.formState.errors.username?.message}
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    )
}
