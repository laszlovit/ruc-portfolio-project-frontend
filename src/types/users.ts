export type User = {
  username: string
  password: string
}

export type BookmarkTitle = {
  tconst: string
  primaryTitle: string
  bookmarkDate: Date
}

export type BookmarkTitleList = {
  items: BookmarkTitle[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  nextPage?: string
  previousPage?: string
}
