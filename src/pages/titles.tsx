import { Container as CustomContainer } from '@/components/container'
import { useGenresQuery } from '@/feature/genres/queries'
import { useTitlesQuery } from '@/feature/titles/queries'
import type { Title } from '@/types/titles'
import { Bookmark, Filter, Search, Star, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Pagination from 'react-bootstrap/Pagination'
import Row from 'react-bootstrap/Row'
import { Link, useSearchParams } from 'react-router'

function TitleCard({ title }: { title: Title }) {
  const imageUrl = title.posterUrl || `https://placehold.co/300x450?text=${encodeURIComponent(title.primaryTitle)}`

  return (
    <Card
      as={Link}
      to={`/titles/${title.tconst}`}
      className="d-flex flex-column pt-0 h-100 overflow-hidden text-decoration-none"
    >
      <div className="p-0">
        <div className="position-relative bg-secondary w-100 overflow-hidden ratio" style={{ aspectRatio: '2/3' }}>
          <img src={imageUrl} alt={title.primaryTitle} className="w-100 h-100" style={{ objectFit: 'cover' }} />
          {title.isBookmarked && (
            <div
              className="top-0 position-absolute m-2 end-0"
              style={{
                backgroundColor: 'rgba(99, 106, 232, 0.9)',
                borderRadius: '50%',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bookmark style={{ width: '1rem', height: '1rem', fill: 'white', color: 'white' }} />
            </div>
          )}
        </div>
      </div>
      <Card.Body className="d-flex flex-grow-1 flex-column">
        <Card.Title className="mb-2 h6">{title.primaryTitle}</Card.Title>
        <Card.Text className="mb-2 text-muted small">
          {title.genres && title.genres.length > 0 ? title.genres.join(', ') : 'N/A'}
        </Card.Text>
        {title.startYear && <Card.Text className="mb-0 text-muted small">{title.startYear}</Card.Text>}
      </Card.Body>
      <Card.Footer className="bg-transparent border-top-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-1">
            <Star style={{ width: '1rem', height: '1rem', fill: 'currentColor' }} className="text-warning" />
            <span className="small fw-medium">{title.userRating || 'N/A'}</span>
          </div>
          {title.type && <span className="text-muted small">{title.type}</span>}
        </div>
      </Card.Footer>
    </Card>
  )
}

function SkeletonTitleCard() {
  return (
    <Card className="pt-0 h-100 overflow-hidden">
      <div className="p-0">
        <div className="position-relative bg-secondary w-100 overflow-hidden ratio" style={{ aspectRatio: '2/3' }} />
      </div>
      <Card.Body>
        <div className="placeholder-glow">
          <span className="mb-2 placeholder col-8"></span>
          <span className="placeholder col-6"></span>
        </div>
      </Card.Body>
      <Card.Footer className="bg-transparent">
        <div className="placeholder-glow">
          <span className="placeholder col-4"></span>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default function Titles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const searchQuery = searchParams.get('search') || ''
  const selectedGenre = searchParams.get('genreName') || ''
  const selectedType = searchParams.get('titleType') || ''
  const selectedYear = searchParams.get('year') || ''
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10)

  // Update URL search params when filters change
  const updateSearchParams = (updates: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 0) {
        newParams.delete(key)
      } else {
        newParams.set(key, String(value))
      }
    })

    // Always reset to page 1 when filters change (except when updating page itself)
    if (
      !updates.page &&
      (updates.search !== undefined ||
        updates.genreName !== undefined ||
        updates.titleType !== undefined ||
        updates.year !== undefined)
    ) {
      newParams.set('page', '1')
    }

    setSearchParams(newParams, { replace: true })
  }

  const handleSearchChange = (value: string) => {
    updateSearchParams({ search: value })
  }

  const handleGenreChange = (value: string) => {
    updateSearchParams({ genreName: value })
  }

  const handleTypeChange = (value: string) => {
    updateSearchParams({ titleType: value })
  }

  const handleYearChange = (value: string) => {
    updateSearchParams({ year: value })
  }

  const handlePageChange = (page: number) => {
    updateSearchParams({ page })
  }

  const handlePageSizeChange = (size: number) => {
    updateSearchParams({ pageSize: size, page: 1 })
  }

  // Build query params for API endpoint
  const params = useMemo(
    () => ({
      page: currentPage,
      pageSize: pageSize,
      ...(searchQuery && { search: searchQuery }),
      ...(selectedGenre && { genreName: selectedGenre }),
      ...(selectedType && { titleType: selectedType }),
      ...(selectedYear && { year: selectedYear }),
    }),
    [currentPage, pageSize, searchQuery, selectedGenre, selectedType, selectedYear]
  )

  const titlesQuery = useTitlesQuery(params)
  const genresQuery = useGenresQuery()

  const titles = titlesQuery.data?.items || []
  const totalPages = titlesQuery.data?.totalPages || 1
  const total = titlesQuery.data?.total || 0
  const genres = genresQuery.data?.items || []

  const handleClearFilters = () => {
    setSearchParams({}, { replace: true })
  }

  const hasActiveFilters = searchQuery || selectedGenre || selectedType || selectedYear

  return (
    <div className="py-5">
      <CustomContainer>
        <div className="mb-4">
          <h1 className="mb-4 fw-bold">Browse Titles</h1>

          <div className="mb-4">
            <Row className="g-3">
              <Col md={showFilters ? 8 : 12}>
                <InputGroup>
                  <InputGroup.Text>
                    <Search style={{ width: '1rem', height: '1rem' }} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search titles..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  {hasActiveFilters && (
                    <Button variant="outline-secondary" onClick={handleClearFilters}>
                      <X style={{ width: '1rem', height: '1rem' }} />
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={showFilters ? 4 : 12}>
                <Button
                  variant={showFilters ? 'primary' : 'outline-primary'}
                  className="w-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter style={{ width: '1rem', height: '1rem' }} className="me-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </Col>
            </Row>
          </div>

          {showFilters && (
            <Card className="mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6} lg={3}>
                    <Form.Label className="fw-semibold">Genre</Form.Label>
                    <Form.Select value={selectedGenre} onChange={(e) => handleGenreChange(e.target.value)}>
                      <option value="">All Genres</option>
                      {genres.map((genre) => (
                        <option key={genre.genreId} value={genre.genreName.toLowerCase()}>
                          {genre.genreName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Label className="fw-semibold">Type</Form.Label>
                    <Form.Select value={selectedType} onChange={(e) => handleTypeChange(e.target.value)}>
                      <option value="">All Types</option>
                      <option value="movie">Movie</option>
                      <option value="short">Short</option>
                      <option value="tvEpisode">TV Episode</option>
                      <option value="tvMiniSeries">TV Mini Series</option>
                      <option value="tvMovie">TV Movie</option>
                      <option value="tvSeries">TV Series</option>
                      <option value="tvShort">TV Short</option>
                      <option value="tvSpecial">TV Special</option>
                      <option value="video">Video</option>
                      <option value="videoGame">Video Game</option>
                    </Form.Select>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Label className="fw-semibold">Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Year"
                      value={selectedYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Label className="fw-semibold">Items per Page</Form.Label>
                    <Form.Select value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </Form.Select>
                  </Col>
                  <Col md={6} lg={3} className="d-flex align-items-end">
                    <Button variant="outline-secondary" className="w-100" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {!titlesQuery.isLoading && (
            <div className="mb-3">
              <p className="mb-0 text-muted">
                Showing {titles.length} of {total} titles
              </p>
            </div>
          )}
        </div>

        {titlesQuery.isLoading && (
          <div>
            <div className="popular-picks-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonTitleCard key={i} />
              ))}
            </div>
          </div>
        )}

        {titlesQuery.error && (
          <Card className="border-danger">
            <Card.Body className="py-5 text-center">
              <p className="mb-0 text-danger">Error loading titles: {titlesQuery.error.message}</p>
            </Card.Body>
          </Card>
        )}

        {!titlesQuery.isLoading && !titlesQuery.error && (
          <>
            {titles.length > 0 ? (
              <>
                <div className="popular-picks-grid mb-4">
                  {titles.map((title) => (
                    <TitleCard key={title.tconst} title={title} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center">
                    <Pagination>
                      <Pagination.First disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
                      <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
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
              <Card>
                <Card.Body className="py-5 text-center">
                  <p className="mb-0 text-muted">No titles found. Try adjusting your filters.</p>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </CustomContainer>
    </div>
  )
}
