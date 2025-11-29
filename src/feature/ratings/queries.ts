import type { TitleRating } from "@/types/ratings"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchTitleRating = async(tconst: string): Promise<TitleRating> => {
  const response = await axios.get(`${BASE_URL}/ratings/${tconst}`)
  return response.data
}

export const useTitleRatingQuery = (tconst: string) => {
  return useQuery({
    queryKey: ['titleRating', tconst],
    queryFn: () => fetchTitleRating(tconst),
  })
}
