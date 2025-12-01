import { useAuth } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import * as z from 'zod'
import { FormRootError } from '../components/FormRootError'
import { Logo } from '../components/Logo'

const formSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
})

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }))

        if (response.status === 401) {
          form.setError('root', { message: errorData.message || 'Invalid username or password' })
        } else {
          form.setError('root', { message: 'An unexpected error occurred' })
        }
        return
      }

      const result = await response.json()
      console.log('Logged in:', result)
      login(result.username, result.token, rememberMe)
      navigate('/')
    } catch (err) {
      console.error('Network error', err)
      form.setError('root', { message: 'A network error occured' })
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="mb-5 text-center">
        <Logo size="lg" />
        <p className="fw-semibold mt-2">Ride the wave of cinema</p>
      </div>

      <Container style={{ maxWidth: '400px' }}>
        <h1 className="mb-2 fw-bold text-center">Welcome Back!</h1>
        <h4 className="mb-4 fw-semibold text-center">Log in</h4>

        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <FormRootError form={form} />

          <Form.Group className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="your username"
              {...form.register('username')}
              isInvalid={!!form.formState.errors.username}
            />
            <Form.Control.Feedback type="invalid">{form.formState.errors.username?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              {...form.register('password')}
              isInvalid={!!form.formState.errors.password}
            />
            <Form.Control.Feedback type="invalid">{form.formState.errors.password?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              id="remember"
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3 text-white">
            Log in
          </Button>

          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-decoration-none">
              Sign Up
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}
