export interface QueryParams {
  page?: number
  pageSize?: number
  genreName?: string
  titleType?: string
  year?: string
}

export interface StringSearchQueryParams {
  page?: number
  pageSize?: number
  query?: string
}

export const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams()

  if (params.year !== undefined) {
    searchParams.append('year', params.year.toString())
  }

  if (params.titleType !== undefined) {
    searchParams.append('titleType', params.titleType.toString())
  }

  if (params.genreName !== undefined) {
    searchParams.append('genreName', params.genreName.toString())
  }

  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString())
  }

  if (params.pageSize !== undefined) {
    searchParams.append('pageSize', params.pageSize.toString())
  }

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

export const buildStringSearchQueryString = (params: StringSearchQueryParams): string => {
  const searchParams = new URLSearchParams()

  if (params.query !== undefined) {
    searchParams.append('query', params.query)
  }

  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString())
  }

  if (params.pageSize !== undefined) {
    searchParams.append('pageSize', params.pageSize.toString())
  }

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}
