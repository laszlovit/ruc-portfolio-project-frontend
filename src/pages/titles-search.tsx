import { Container as CustomContainer } from '@/components/container'
import LoadingSpinner from '@/components/loading-spinner'
import { useToast } from '@/contexts/toast-context'
import { useStringSearchTitles } from '@/feature/searches/queries'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useSearchParams } from 'react-router'

export default function TitlesSearch() {
  const { showToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = useMemo(() => searchParams.get('query') || '', [searchParams])
  const [searchText, setSearchText] = useState<string>(() => {
    const query = searchParams.get('query')
    return query ? decodeURIComponent(query) : ''
  })

  const { data: titles, isLoading, error } = useStringSearchTitles(searchQuery)

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (searchText?.trim()) {
      setSearchParams({ query: searchText.trim() })
    } else {
      showToast('Search input should not be empty to search', 'error')
    }
  }

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
                <Card>
                  <ListGroup variant="flush">
                    {titles.items.map((title) => (
                      <ListGroup.Item key={title.tconst} action as={Link} to={`/titles/${title.tconst}`}>
                        {title.primaryTitle}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
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

              {!searchQuery && (
                <Card>
                  <Card.Body className="py-5 text-center">
                    <p className="mb-0 text-muted">Enter a search query to find titles</p>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </div>
      </CustomContainer>
    </div>
  )
}
