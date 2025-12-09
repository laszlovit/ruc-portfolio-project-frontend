import type { Title, Titles } from '@/types/titles'
import { useEffect, useState } from 'react'
import type { QueryParams } from '../shared/query-params'
import { buildQueryString } from '../shared/query-params'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchTitles = async (params?: QueryParams): Promise<Titles> => {
  const queryString = params ? buildQueryString(params) : ''
  const response = await fetch(`${BASE_URL}/titles${queryString}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch titles: ${response.statusText}`)
  }
  return response.json()
}

const fetchTitle = async (tconst: string): Promise<Title> => {
  const response = await fetch(`${BASE_URL}/titles/${tconst}`, {
    credentials: 'include',
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch title: ${response.statusText}`)
  }
  return response.json()
}

export const useTitlesQuery = (params?: QueryParams) => {
  const [data, setData] = useState<Titles | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchTitles(params)
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
  }, [params])

  return {
    data,
    isLoading,
    error,
  }
}

export const useTitleQuery = (tconst: string) => {
  const [data, setData] = useState<Title | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isBookmarked, setIsBookmarked] = useState<boolean>()
  const [userRating, setUserRating] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadTitle = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchTitle(tconst)
        if (!cancelled) {
          setData(result)
          setIsBookmarked(result.isBookmarked)
          setUserRating(result.userRating)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadTitle()

    return () => {
      cancelled = true
    }
  }, [tconst])

  return {
    data,
    isLoading,
    error,
    isBookmarked,
    setIsBookmarked,
    userRating,
    setUserRating,
  }
}
