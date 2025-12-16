import { Container as CustomContainer } from '@/components/container'
import LoadingSpinner from '@/components/loading-spinner'
import { useToast } from '@/contexts/toast-context'
import { useStringSearchTitles } from '@/feature/searches/queries'
import type { StringSearchQueryParams } from '@/feature/shared/query-params'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Pagination from 'react-bootstrap/Pagination'
import { Link, useSearchParams } from 'react-router'

export default function TitlesSearch() {
  const { showToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get('query') || ''
  const [searchText, setSearchText] = useState<string>(() => {
    const query = searchParams.get('query')
    return query ? decodeURIComponent(query) : ''
  })

  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const params: StringSearchQueryParams = useMemo(
    () => ({
      query: searchQuery,
      page: currentPage - 1, // backend uses 0-based
      pageSize: 20,
    }),
    [searchQuery, currentPage]
  )

  const { data: titles, isLoading, error } = useStringSearchTitles(params)

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (searchText?.trim()) {
      setSearchParams({ query: searchText.trim(), page: '1' })
    } else {
      showToast('Search input should not be empty to search', 'error')
    }
  }

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchQuery, page: String(page) })
  }

  const totalPages = titles?.totalPages || 1

  return (
    <div className="py-5">
      <CustomContainer>
        <div className="mx-auto" style={{ maxWidth: '48rem' }}>
          <div className="mb-5">
            <Form onSubmit={handleSearchSubmit}>
              <InputGroup>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search movies, actors, or genres..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button type="submit" variant="primary" className="text-white">
                  Search
                </Button>
              </InputGroup>
            </Form>
          </div>

          {isLoading && <LoadingSpinner />}

          {error && (
            <Card className="border-danger">
              <Card.Body className="py-5 text-center">
                <p className="mb-0 text-danger">Error loading search results: {error.message}</p>
              </Card.Body>
            </Card>
          )}

          {!isLoading && !error && (
            <>
              {searchQuery && (
                <div className="mb-4 text-center">
                  <h2 className="mb-2 h4 fw-semibold">Search Results</h2>
                  <p className="mb-0 text-muted">
                    {titles?.total
                      ? `Found ${titles.total} result${titles.total !== 1 ? 's' : ''}`
                      : 'No results found'}
                  </p>
                </div>
              )}

              {titles && titles.items.length > 0 ? (
                <>
                  <Card className="mb-3">
                    <ListGroup variant="flush">
                      {titles.items.map((title) => (
                        <ListGroup.Item key={title.tconst} action as={Link} to={`/titles/${title.tconst}`}>
                          {title.primaryTitle}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>

                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                      <Pagination>
                        <Pagination.First disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
                        <Pagination.Prev
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                        />

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum
                          if (totalPages <= 5) {
                            pageNum = i + 1
                          } else if (currentPage <= 3) {
                            pageNum = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = currentPage - 2 + i
                          }
                          return (
                            <Pagination.Item
                              key={pageNum}
                              active={pageNum === currentPage}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </Pagination.Item>
                          )
                        })}

                        <Pagination.Next
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                        />
                        <Pagination.Last
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(totalPages)}
                        />
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                searchQuery && (
                  <Card>
                    <Card.Body className="py-5 text-center">
                      <p className="mb-0 text-muted">
                        No titles found for &quot;{decodeURIComponent(searchQuery)}&quot;
                      </p>
                    </Card.Body>
                  </Card>
                )
              )}
            </>
          )}
        </div>
      </CustomContainer>
    </div>
  )
}
