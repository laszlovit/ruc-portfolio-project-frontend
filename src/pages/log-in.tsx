import { useAuth } from '@/contexts/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import * as z from 'zod'
import { FormRootError } from '../components/form-root-error'
import { Logo } from '../components/logo'

const formSchema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
})

export function LoginPage() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await login({
        username: data.username,
        password: data.password
      })

      navigate('/')
    } catch (err) {
      console.error('Login error', err)
      form.setError('root', { message: 'Invalid username or password' })
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="mb-5 text-center">
        <Logo size="lg" />
        <p className="mt-2 fw-semibold">Ride the wave of cinema</p>
      </div>

      <Container style={{ maxWidth: '400px' }}>
        <h1 className="mb-2 text-center fw-bold">Welcome Back!</h1>
        <h4 className="mb-4 text-center fw-semibold">Log in</h4>

        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <FormRootError form={form} />

          <Form.Group className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="your username"
              {...form.register('username')}
              isInvalid={!!form.formState.errors.username}
              disabled={form.formState.isSubmitting}
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
              disabled={form.formState.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{form.formState.errors.password?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mb-3 w-100 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Logging in...
              </>
            ) : (
              'Log in'
            )}
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
