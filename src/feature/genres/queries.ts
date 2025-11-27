import { useQuery} from '@tanstack/react-query'
import axios from 'axios'
import type { Genres } from '@/types/genres'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchGenres = async(): Promise<Genres> => {
  const response = await axios.get(`${BASE_URL}/genres`)
  return response.data
}

export const useGenresQuery = () =>
  useQuery({
    queryKey: ['genres'],
    queryFn: () => fetchGenres()
  })