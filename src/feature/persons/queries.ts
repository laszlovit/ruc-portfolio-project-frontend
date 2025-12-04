import type { PersonFull, Persons } from "@/types/persons"
import { useEffect, useState } from "react"
import type { QueryParams } from "../shared/query-params"
import { buildQueryString } from "../shared/query-params"
import { fetchTMDBPersonId, fetchTMDBPersonImages, fetchTMDBPersonImage } from "./tmdb-images"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchPersons = async (params?: QueryParams): Promise<Persons> => {
  const queryString = params ? buildQueryString(params) : ''
  const response = await fetch(`${BASE_URL}/persons${queryString}`)
  if (!response.ok){
    throw new Error(`Failed to fetch persons: ${response.statusText}`)
  }
  return response.json()
}

const fetchPerson = async (nconst: string): Promise<PersonFull> => {
  const response = await fetch(`${BASE_URL}/persons/${nconst}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch person: ${response.statusText}`)
  }
  return response.json()
}

export const usePersonsQuery = (params?: QueryParams) => {
  const [data, setData] = useState<Persons | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [personImages, setPersonImages] = useState<Record<string, string>>({})
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadPersons = async () => {
      setIsLoading(true)
      setError(null)

      try {
        if (!cancelled) {
          const result = await fetchPersons(params)
          setData(result)

          if (result.items && result.items.length > 0) {
            setIsLoadingImages(true)
            
            const imagePromises = result.items.map(async (person) => {
              const image = await fetchTMDBPersonImage(person.nconst)
              return { nconst: person.nconst, image }
            })

            const imageResults = await Promise.all(imagePromises)
            
            if (!cancelled) {
              const imagesMap: Record<string, string> = {}
              imageResults.forEach(({ nconst, image }) => {
                if (image) {
                  imagesMap[nconst] = image
                }
              })
              setPersonImages(imagesMap)
            }
            
            if (!cancelled) {
              setIsLoadingImages(false)
            }
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unknown error"))
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadPersons()

    return () => {
      cancelled = true
    }
  }, [params])

  return {
    data,
    isLoading,
    error,
    personImages,
    isLoadingImages,
  }
}

export const usePersonQuery = (nconst: string) => {
  const [data, setData] = useState<PersonFull | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [profileImages, setProfileImages] = useState<string[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  useEffect(() => {
    let cancelled = false

    const loadPerson = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const result = await fetchPerson(nconst)
        if (!cancelled) {
          setData(result)
          
          setIsLoadingImages(true)
          const tmdbId = await fetchTMDBPersonId(nconst)
          if (tmdbId && !cancelled) {
            const images = await fetchTMDBPersonImages(tmdbId)
            if (!cancelled) {
              setProfileImages(images)
            }
          }
          if (!cancelled) {
            setIsLoadingImages(false)
          }
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

    loadPerson()

    return () => {
      cancelled = true
    }
  }, [nconst])

  return {
    data,
    isLoading,
    error,
    profileImages,
    isLoadingImages,
  }
}