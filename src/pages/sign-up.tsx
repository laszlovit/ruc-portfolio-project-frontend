import { useAuth } from '@/contexts/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import * as z from 'zod'
import { FormRootError } from '../components/form-root-error'
import { Logo } from '../components/Logo'

const formSchema = z
  .object({
    username: z.string().min(1, 'Please enter a username'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Please enter a password'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export function SignUpPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) {
        console.error('Signup failed', await response.text())
        const errorData = await response.json().catch(() => ({ message: 'Sign up failed' }))
        form.setError('root', { message: errorData.message || 'An unexpected error occurred' })
        return
      }

      const result = await response.json()
      console.log('Signed up:', result)
      console.log('Logged in:', result)
      signup(result.username, result.token)
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
        <h1 className="mb-2 fw-bold text-center">Welcome!</h1>
        <h4 className="mb-4 fw-semibold text-center">Create an account</h4>

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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="your@email.com"
              {...form.register('email')}
              isInvalid={!!form.formState.errors.email}
            />
            <Form.Control.Feedback type="invalid">{form.formState.errors.email?.message}</Form.Control.Feedback>
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
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              {...form.register('confirmPassword')}
              isInvalid={!!form.formState.errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {form.formState.errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mb-3 text-white">
            Sign Up
          </Button>

          <div className="text-center">
            <span>Already one of us? </span>
            <Link to="/login" className="text-decoration-none">
              Log in
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  )
}
