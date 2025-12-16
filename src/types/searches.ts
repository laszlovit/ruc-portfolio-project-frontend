export type StringSearchTitle = {
  tconst: string
  primaryTitle: string
}

export type StringSearchTitles = {
  items: StringSearchTitle[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  nextPage?: string
  previousPage?: string
}

export type PersonSearchResult = {
  nconst: string
  fullName: string
  birthYear: number | null
  deathYear: number | null
}

export type PersonSearchResults = {
  items: PersonSearchResult[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  nextPage?: string
  previousPage?: string
}
