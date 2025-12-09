export type Persons = {
  items: PersonList[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  nextPage?: string
  previousPage?: string
}

export type PersonList = {
  nconst: string
  fullName: string
  professions: string[]
}

export type PersonFull = {
  nconst: string
  fullName: string
  birthYear: number | null
  deathYear: number | null
  derivedRating: number | null
  professions: Proffession[]
  isBookmarked: boolean
}

export type TitlePerson = {
  nconst: string
  fullName: string
  category: string | null
  characterName: string | null
}

export type Proffession = {
  professionId: string
  professionName: string
}
