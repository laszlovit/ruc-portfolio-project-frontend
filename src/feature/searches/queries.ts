import type { StringSearchTitles } from '@/types/searches'
import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchStringSearchTitles = async (query?: string): Promise<StringSearchTitles> => {
  const queryParam = query ? `?query=${query}` : ''

  const response = await fetch(`${BASE_URL}/search/string-search${queryParam}`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch string search titles: ${response.statusText}`)
  }

  return response.json()
}

export const useStringSearchTitles = (query?: string) => {
  const [data, setData] = useState<StringSearchTitles | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadStringSearchTitles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchStringSearchTitles(query)
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

    loadStringSearchTitles()

    return () => {
      cancelled = true
    }
  }, [query])

  return {
    data,
    isLoading,
    error,
  }
}
