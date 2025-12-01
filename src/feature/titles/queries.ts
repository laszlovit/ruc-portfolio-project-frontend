import type { Title } from "@/types/titles"
import { useEffect, useState } from "react"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchTitle = async (tconst: string): Promise<Title> => {
  const response = await fetch(`${BASE_URL}/titles/${tconst}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch title: ${response.statusText}`)
  }
  return response.json()
}

export const useTitleQuery = (tconst: string) => {
  const [data, setData] = useState<Title | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadTitle = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const result = await fetchTitle(tconst)
        if (!cancelled) {
          setData(result)
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
  }
}