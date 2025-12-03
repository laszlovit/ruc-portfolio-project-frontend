const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const fetchTMDBPersonId = async (imdbId: string): Promise<number | null> => {
  if (!TMDB_API_KEY) {
    console.warn('TMDB API key not configured')
    return null
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/find/${imdbId}?external_source=imdb_id&api_key=${TMDB_API_KEY}`
    )
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    return data.person_results?.[0]?.id || null
  } catch (error) {
    console.error('Error fetching TMDB person ID:', error)
    return null
  }
}

export const fetchTMDBPersonImages = async (tmdbId: number): Promise<string[]> => {
  if (!TMDB_API_KEY) {
    return []
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/person/${tmdbId}/images?api_key=${TMDB_API_KEY}`
    )
    if (!response.ok) {
      return []
    }
    const data = await response.json()
    return data.profiles?.map((profile: { file_path: string }) => 
      `${TMDB_IMAGE_BASE_URL}${profile.file_path}`
    ) || []
  } catch (error) {
    console.error('Error fetching TMDB person images:', error)
    return []
  }
}

export const fetchTMDBPersonImage = async (nconst: string): Promise<string | null> => {
  const tmdbId = await fetchTMDBPersonId(nconst)
  if (!tmdbId) {
    return null
  }
  
  const images = await fetchTMDBPersonImages(tmdbId)
  return images.length > 0 ? images[0] : null
}

