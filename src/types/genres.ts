export type Genre = {
    genreId: string
    genreName: string
}

export type Genres = {
    items: Genre[]
    total: number
    page: number
    pageSize: number
    totalPages: number
    nextPage?: string
    previousPage?: string
}