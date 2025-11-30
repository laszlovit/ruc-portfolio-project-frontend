import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import * as z from 'zod'
import { FormRootError } from '../components/FormRootError'
import { Logo } from '../components/ui/logo'

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-12 space-y-1.5">
        <Logo size="lg" />
        <p className="text-center font-semibold text-text-light">Ride the wave of cinema</p>
      </div>
      <div className="w-full max-w-sm space-y-6">
        <h1 className="mb-2 text-center text-3xl font-bold">Welcome Back!</h1>
        <h4 className="mb-6 text-center text-xl font-semibold">Log in</h4>
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
            </div>

            <div className="relative my-6 flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-primary focus:ring-primary"
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <Button type="submit" className="w-full bg-primary">
              Log in
            </Button>
          </form>
          <div className="flex justify-center gap-1">
            <p>Don't have an account?</p>
            <Link className="text-primary" to={'/signup'}>
              Sign Up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
