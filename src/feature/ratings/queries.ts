import type { TitleRating } from '@/types/ratings'
import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchTitleRating = async (tconst: string): Promise<TitleRating> => {
  const response = await fetch(`${BASE_URL}/ratings/${tconst}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch title rating: ${response.statusText}`)
  }
  return response.json()
}

export const useTitleRatingQuery = (tconst: string) => {
  const [data, setData] = useState<TitleRating | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadTitleRating = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchTitleRating(tconst)
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('unknown error'))
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadTitleRating()

    return () => {
      cancelled = true
    }
  }, [tconst, refetch])

  return {
    data,
    isLoading,
    error,
    setRefetch,
  }
}
