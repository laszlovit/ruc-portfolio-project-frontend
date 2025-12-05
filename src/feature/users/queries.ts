import { useAuth } from '@/contexts/auth-context'
import type { User } from '@/types/users'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`

const updateUserName = async (username: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/update-username`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username: username }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`)
  }

  return response.json()
}

const deleteUser = async (): Promise<number> => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.statusText}`)
  }

  return response.status
}

export const useUserQueries = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    throw new Error('User not authenticated')
  }

  const handleUpdate = async (username: string) => {
    try {
      return await updateUserName(username)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleDelete = async () => {
    try {
      return await deleteUser()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { updateUserName: handleUpdate, deleteUser: handleDelete }
}
