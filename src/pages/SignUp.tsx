import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/ui/logo'
import { useAuth } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import * as z from 'zod'
import { FormRootError } from '../components/FormRootError'

const formSchema = z
  .object({
    username: z.string().min(1, 'Please enter a username'),
    email: z.email('Invalid email address'),
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-12 space-y-1.5">
        <Logo size="lg" />
        <p className="text-center font-semibold text-text-light">Ride the wave of cinema</p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <h1 className="mb-2 text-center text-3xl font-bold">Welcome!</h1>
        <h4 className="mb-6 text-center text-xl font-semibold">Create an account</h4>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormRootError />
            <div className="space-y-10">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-primary">
              Sign Up
            </Button>
          </form>
          <div className="flex justify-center gap-1">
            <p>Already one of us?</p>
            <Link className="text-primary" to={'/login'}>
              Log in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
