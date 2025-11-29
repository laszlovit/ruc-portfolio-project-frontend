import type { Title } from "@/types/titles"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchTitle = async(id: string): Promise<Title> => {
  const response = await axios.get(`${BASE_URL}/titles/${id}`)
  return response.data
}

export const useTitleQuery = (tconst: string) => {
    return useQuery({
        queryKey: ['title', tconst],
        queryFn: () => fetchTitle(tconst),
        retry: false,
    })  
}