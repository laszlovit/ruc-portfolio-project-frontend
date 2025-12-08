export type User = {
  username: string
  password: string
}

export type TitleBookmark = {
  tconst: string
  primaryTitle: string
  bookmarkDate: Date
}

export type TitleBookmarkList = {
  items: TitleBookmark[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  nextPage?: string
  previousPage?: string
}

export type TitleRating = {
  tconst: string
  primaryTitle: string
  rating: number
  ratingDate: Date
}

export type TitleRatingList = {
  items: TitleRating[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  nextPage?: string
  previousPage?: string
}
