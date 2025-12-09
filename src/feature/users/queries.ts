import { useAuth } from '@/contexts/auth-context'
import type {
  PersonBookmark,
  PersonBookmarkList,
  TitleBookmark,
  TitleBookmarkList,
  TitleRating,
  TitleRatingList,
  User,
} from '@/types/users'
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

const fetchBookmarkedTitles = async (): Promise<TitleBookmarkList> => {
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

const fetchRatedTitles = async (): Promise<TitleRatingList> => {
  const response = await fetch(`${BASE_URL}/rate-title`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch rated titles: ${response.statusText}`)
  }

  return response.json()
}

const createTitleRating = async (tconst: string, rating: number) => {
  const response = await fetch(`${BASE_URL}/rate-title`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ tconst: tconst, rating: rating }),
  })

  if (!response.ok) {
    throw new Error(`Error creating title rating: ${response.statusText}`)
  }

  return response.status
}

const deleteTitleRating = async (tconst: string) => {
  const response = await fetch(`${BASE_URL}/rate-title`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ tconst: tconst }),
  })

  if (!response.ok) {
    throw new Error(`Failed to delete title rating: ${response.statusText}`)
  }

  return response.status
}

const fetchBookmarkedPeople = async (): Promise<PersonBookmarkList> => {
  const response = await fetch(`${BASE_URL}/bookmark-person`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to load bookmarked people: ${response.statusText}`)
  }

  return response.json()
}

const createPersonBookmark = async (nconst: string) => {
  const response = await fetch(`${BASE_URL}/bookmark-person`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nconst: nconst }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create person bookmark: ${response.statusText}`)
  }

  return response.status
}

const deletePersonBookmark = async (nconst: string) => {
  const response = await fetch(`${BASE_URL}/bookmark-person`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nconst: nconst }),
  })

  if (!response.ok) {
    throw new Error(`Failed to delete person bookmark: ${response.statusText}`)
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

  const handleCreateTitleRating = async (tconst: string, rating: number) => {
    try {
      return await createTitleRating(tconst, rating)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleDeleteTitleRating = async (tconst: string) => {
    try {
      return await deleteTitleRating(tconst)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleCreatePersonBookmark = async (nconst: string) => {
    try {
      return await createPersonBookmark(nconst)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleDeletePersonBookmark = async (nconst: string) => {
    try {
      return await deletePersonBookmark(nconst)
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
    createTitleRating: handleCreateTitleRating,
    deleteTitleRating: handleDeleteTitleRating,
    createPersonBookmark: handleCreatePersonBookmark,
    deletePersonBookmark: handleDeletePersonBookmark,
  }
}

export const useBookmarkedTitlesQuery = () => {
  const [data, setData] = useState<TitleBookmarkList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [bookmarkedTitles, setBookmarkedTitles] = useState<TitleBookmark[] | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchBookmarkedTitles()
          setData(result)
          setBookmarkedTitles(result.items)
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
    bookmarkedTitles,
    setBookmarkedTitles,
  }
}

export const useRatedTitlesQuery = () => {
  const [data, setData] = useState<TitleRatingList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [ratedTitles, setRatedTitles] = useState<TitleRating[] | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchRatedTitles()
          setData(result)
          setRatedTitles(result.items)
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
    ratedTitles,
    setRatedTitles,
  }
}

export const useBookmarkedPeopleQuery = () => {
  const [data, setData] = useState<PersonBookmarkList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [bookmarkedPeople, setBookmarkedPeople] = useState<PersonBookmark[] | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchBookmarkedPeople()
          setData(result)
          setBookmarkedPeople(result.items)
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
    bookmarkedPeople,
    setBookmarkedPeople,
  }
}
