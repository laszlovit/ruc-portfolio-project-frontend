import {
  type PersonBookmarkList,
  type SearchHistory,
  type SearchHistoryList,
  type TitleBookmarkList,
  type TitleRatingList,
  type User,
} from '@/types/users'
import { useEffect, useState } from 'react'
import { buildPaginationQueryString, type PaginationQueryParams } from '../shared/query-params'

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

const fetchBookmarkedTitles = async (params?: PaginationQueryParams): Promise<TitleBookmarkList> => {
  const queryString = params ? buildPaginationQueryString(params) : ''
  const response = await fetch(`${BASE_URL}/bookmark-title${queryString}`, {
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

const fetchRatedTitles = async (params?: PaginationQueryParams): Promise<TitleRatingList> => {
  const queryString = params ? buildPaginationQueryString(params) : ''
  const response = await fetch(`${BASE_URL}/rate-title${queryString}`, {
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

const fetchBookmarkedPeople = async (params?: PaginationQueryParams): Promise<PersonBookmarkList> => {
  const queryString = params ? buildPaginationQueryString(params) : ''
  const response = await fetch(`${BASE_URL}/bookmark-person${queryString}`, {
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

const fetchSearchHistory = async (params?: PaginationQueryParams): Promise<SearchHistoryList> => {
  const queryString = params ? buildPaginationQueryString(params) : ''
  const response = await fetch(`${BASE_URL}/search-history${queryString}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch search history: ${response.statusText}`)
  }

  return response.json()
}

const deleteSearchHistory = async () => {
  const response = await fetch(`${BASE_URL}/search-history`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete search history: ${response.statusText}`)
  }

  return response.status
}

export const useUserQueries = () => {
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

  const handleDeleteSearchHistory = async () => {
    try {
      return await deleteSearchHistory()
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
    deleteSearchHistory: handleDeleteSearchHistory,
  }
}

export const useBookmarkedTitlesQuery = (params?: PaginationQueryParams) => {
  const [data, setData] = useState<TitleBookmarkList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchBookmarkedTitles(params)
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
  }, [params, refetch])

  return {
    data,
    isLoading,
    error,
    setRefetch,
  }
}

export const useRatedTitlesQuery = (params?: PaginationQueryParams) => {
  const [data, setData] = useState<TitleRatingList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchRatedTitles(params)
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
  }, [params, refetch])

  return {
    data,
    isLoading,
    error,
    setRefetch,
  }
}

export const useBookmarkedPeopleQuery = (params?: PaginationQueryParams) => {
  const [data, setData] = useState<PersonBookmarkList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchBookmarkedPeople(params)
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
  }, [params, refetch])

  return {
    data,
    isLoading,
    error,
    setRefetch,
  }
}

export const useSearchHistoryQuery = (params?: PaginationQueryParams) => {
  const [data, setData] = useState<SearchHistoryList | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [searchHistory, setSearchHistory] = useState<SearchHistory[] | null>(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadSearchHistory = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchSearchHistory(params)
          setData(result)
          setSearchHistory(result.items)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unkown error'))
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadSearchHistory()

    return () => {
      cancelled = true
    }
  }, [params, refetch])

  return {
    data,
    isLoading,
    error,
    searchHistory,
    setSearchHistory,
    setRefetch,
  }
}
