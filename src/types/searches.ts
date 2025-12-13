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
