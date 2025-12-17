import { Container as CustomContainer } from '@/components/container'
import LoadingSpinner from '@/components/loading-spinner'
import { useToast } from '@/contexts/toast-context'
import { useCombinedSearch } from '@/feature/searches/queries'
import type { StringSearchQueryParams } from '@/feature/shared/query-params'
import { Film, Search, User } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'
import Pagination from 'react-bootstrap/Pagination'
import { Link, useSearchParams } from 'react-router'

type SearchTab = 'titles' | 'persons'

export default function TitlesSearch() {
  const { showToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<SearchTab>('titles')

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

  const { titlesData, personsData, isLoading, error } = useCombinedSearch(params)

  // Auto-switch to persons tab if no titles found but people found
  useEffect(() => {
    if (!isLoading && titlesData && personsData) {
      if (titlesData.items.length === 0 && personsData.items.length > 0) {
        setActiveTab('persons')
      }
    }
  }, [isLoading, titlesData, personsData])

  // Sort persons to prioritize those with birth year information
  const sortedPersons = useMemo(() => {
    if (!personsData?.items) return []
    return [...personsData.items].sort((a, b) => {
      // Prioritize persons with birthYear
      if (a.birthYear && !b.birthYear) return -1
      if (!a.birthYear && b.birthYear) return 1
      return 0
    })
  }, [personsData])

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

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab)
    setSearchParams({ query: searchQuery, page: '1' })
  }

  const currentData = activeTab === 'titles' ? titlesData : personsData
  const totalPages = currentData?.totalPages || 1
  const totalResults = (titlesData?.total || 0) + (personsData?.total || 0)

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
                  placeholder="Search movies, TV shows, or people..."
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

          {!isLoading && !error && searchQuery && (
            <>
              <div className="mb-4 text-center">
                <h2 className="mb-2 h4 fw-semibold">Search Results</h2>
                <p className="mb-0 text-muted">
                  {totalResults
                    ? `Found ${totalResults} result${totalResults !== 1 ? 's' : ''}`
                    : 'No results found'}
                </p>
              </div>
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'titles'}
                    onClick={() => handleTabChange('titles')}
                    style={{ cursor: 'pointer' }}
                  >
                    <Film size={16} className="me-2" />
                    Titles
                    {titlesData?.total !== undefined && (
                      <Badge bg="secondary" className="ms-2">
                        {titlesData.total}
                      </Badge>
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'persons'}
                    onClick={() => handleTabChange('persons')}
                    style={{ cursor: 'pointer' }}
                  >
                    <User size={16} className="me-2" />
                    People
                    {personsData?.total !== undefined && (
                      <Badge bg="secondary" className="ms-2">
                        {personsData.total}
                      </Badge>
                    )}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              {activeTab === 'titles' && (
                <>
                  {titlesData && titlesData.items.length > 0 ? (
                    <Card className="mb-3">
                      <ListGroup variant="flush">
                        {titlesData.items.map((title) => (
                          <ListGroup.Item key={title.tconst} action as={Link} to={`/titles/${title.tconst}`}>
                            <div className="d-flex align-items-center">
                              <Film size={16} className="me-2 text-muted" />
                              {title.primaryTitle}
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card>
                  ) : (
                    <Card>
                      <Card.Body className="py-5 text-center">
                        <p className="mb-0 text-muted">
                          No titles found for &quot;{decodeURIComponent(searchQuery)}&quot;
                        </p>
                      </Card.Body>
                    </Card>
                  )}
                </>
              )}
              {activeTab === 'persons' && (
                <>
                  {sortedPersons.length > 0 ? (
                    <Card className="mb-3">
                      <ListGroup variant="flush">
                        {sortedPersons.map((person) => (
                          <ListGroup.Item key={person.nconst} action as={Link} to={`/people/${person.nconst}`}>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <User size={16} className="me-2 text-muted" />
                                {person.fullName}
                              </div>
                              {(person.birthYear || person.deathYear) && (
                                <small className="text-muted">
                                  {person.birthYear && `${person.birthYear}`}
                                  {person.birthYear && person.deathYear && ' - '}
                                  {person.deathYear && `${person.deathYear}`}
                                </small>
                              )}
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card>
                  ) : (
                    <Card>
                      <Card.Body className="py-5 text-center">
                        <p className="mb-0 text-muted">
                          No people found for &quot;{decodeURIComponent(searchQuery)}&quot;
                        </p>
                      </Card.Body>
                    </Card>
                  )}
                </>
              )}
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
          )}
        </div>
      </CustomContainer>
    </div>
  )
}
