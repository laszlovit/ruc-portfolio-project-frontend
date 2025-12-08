import { useAuth } from '@/contexts/auth-context'
import type { BookmarkTitleList, User } from '@/types/users'
import { useEffect, useState } from 'react'

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

const fetchBookmarkedTitles = async (): Promise<BookmarkTitleList> => {
  const response = await fetch(`${BASE_URL}/bookmark-title`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to load bookmarked titles: ${response.statusText}`)
  }

  return response.json()
}

const createTitleBookmark = async (tconst: string) => {
  const response = await fetch(`${BASE_URL}/bookmark-title`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ tconst: tconst }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create title bookmark: ${response.statusText}`)
  }

  return response.status
}

const deleteTitleBookmark = async (tconst: string) => {
  const response = await fetch(`${BASE_URL}/bookmark-title`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ tconst: tconst }),
  })

  if (!response.ok) {
    throw new Error(`Failed to delete title bookmark: ${response.statusText}`)
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

  const handleCreateTitleBookmark = async (tconst: string) => {
    try {
      return await createTitleBookmark(tconst)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleDeleteTitleBookmark = async (tconst: string) => {
    try {
      return await deleteTitleBookmark(tconst)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    updateUserName: handleUpdate,
    deleteUser: handleDelete,
    createTitleBookmark: handleCreateTitleBookmark,
    deleteTitleBookmark: handleDeleteTitleBookmark,
  }
}

export const useBookmarkedTitlesQuery = () => {
  const [data, setData] = useState<BookmarkTitleList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchBookmarkedTitles()
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unkown error'))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTitles()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    data,
    isLoading,
    error,
  }
}
