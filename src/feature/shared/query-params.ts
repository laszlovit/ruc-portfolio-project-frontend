export interface QueryParams {
  page?: number
  pageSize?: number
}

export const buildQueryString = (params: QueryParams): string => {
  const searchParams = new URLSearchParams()
  
  if (params.page !== undefined) {
    searchParams.append('page', params.page.toString())
  }
  
  if (params.pageSize !== undefined) {
    searchParams.append('pageSize', params.pageSize.toString())
  }
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

