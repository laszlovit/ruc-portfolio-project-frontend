import type { Genres } from '@/types/genres'
import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchGenres = async(): Promise<Genres> => {
  const response = await fetch(`${BASE_URL}/genres`)
  if (!response.ok){
    throw new Error("Failed to fetch genres")
  }

  return response.json()
}

export const useGenresQuery = () => {
  const [data, setData] = useState<Genres | null> (null)
  const [isLoading, setIsloading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    let cancelled = false

    const loadGenres = async () => {
      setIsloading(true)
      setError(null)

      try {
        if(!cancelled){
          const result = await fetchGenres()
          setData(result)
        }
      } catch (err) {
        if (!cancelled){
          setError(err instanceof Error ? err : new Error("Unknown error"))
        }
      }
      finally {
        if (!cancelled){
          setIsloading(false)
        }
      }
    }

    loadGenres()

    return () => {
      cancelled = true
    }

  })

  return {
    data,
    isLoading,
    error
  }
}