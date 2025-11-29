import type { Person } from "./persons"

export type Title = {
    tconst: string
    primaryTitle: string
    originalTitle: string | null
    type: string | null
    startYear: number | null
    endYear: number | null
    runtimeMin: number | null
    rated: string | null
    plot: string | null
    posterUrl: string | null,
    award: string | null,
    genres: string[]
    countries: string[]
    people: Person[]
}

export type Titles = {
    items: Title[]
    total: number
    page: number
    pageSize: number
    totalPages: number
    nextPage?: string
    previousPage?: string
}