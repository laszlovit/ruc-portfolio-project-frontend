import { Container } from '@/components/container'
import LoadingSpinner from '@/components/loading-spinner'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/contexts/toast-context'
import { useTitleRatingQuery } from '@/feature/ratings/queries'
import { useTitleQuery, useSimilarTitlesQuery } from '@/feature/titles/queries'
import { useUserQueries } from '@/feature/users/queries'
import { formatRuntime } from '@/lib/utils'
import { Bookmark, RefreshCw, Star } from 'lucide-react'
import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link, useNavigate, useParams } from 'react-router'

function SimilarTitles({ tconst }: { tconst: string }) {
  const [page, setPage] = useState(0)
  const { data, isLoading } = useSimilarTitlesQuery(tconst, page, 5)

  if (isLoading) return <LoadingSpinner />
  if (!data || data.items.length === 0) return <p className="text-muted">No similar titles found.</p>

  return (
    <div>
      <div className="row g-3">
        {data.items.map((item) => (
          <div key={item.tconst} className="col-12">
            <div className="d-flex align-items-center gap-3 p-3 border rounded">
              <div className="flex-grow-1">
                <Link to={`/titles/${item.tconst}`} className="h6 text-decoration-none mb-1 d-block">
                  {item.primaryTitle}
                </Link>
                <div className="d-flex gap-3 text-muted small">
                  <span>Rating: {item.avgRating}</span>
                  <span>Votes: {item.numVotes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="align-self-center">
            Page {page + 1} of {data.totalPages}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={page >= data.totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Title() {
  const { tconst } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [isRateHovered, setIsRateHovered] = useState(false)

  const { data: title, isLoading, isBookmarked, setIsBookmarked, userRating, setUserRating } = useTitleQuery(tconst!)
  const { data: titleRating, setRefetch: refetchTitleRating } = useTitleRatingQuery(tconst!)
  const { showToast } = useToast()

  const { createTitleBookmark, deleteTitleBookmark, createTitleRating } = useUserQueries()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!title) {
    navigate('/not-found')
    return null
  }

  const handleCloseModal = () => {
    setShowRatingModal(false)
    setHoveredRating(null)
  }

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating)
  }

  const handleRateSubmit = async (tconst: string) => {
    if (selectedRating) {
      try {
        await createTitleRating(tconst, selectedRating)
        refetchTitleRating((prev) => !prev)
        showToast('Succesfully rated title', 'success')
        setUserRating(selectedRating)
      } catch (error) {
        showToast(`Error rating title: ${error}`, 'error')
      } finally {
        handleCloseModal()
      }
    }
  }

  const handleToggleBookmark = async (tconst: string) => {
    if (!isAuthenticated) {
      showToast('Login to bookmark title', 'warning')
      return
    }

    if (isBookmarked) {
      await deleteTitleBookmark(tconst)
      showToast('Bookmark removed successfully', 'success')
    } else {
      await createTitleBookmark(tconst)
      showToast('Bookmark added successfully', 'success')
    }

    setIsBookmarked(!isBookmarked)
  }

  const placeholderPosterUrl = `https://placehold.co/400x600?text=${encodeURIComponent(title.primaryTitle)}`

  const runtime = title.runtimeMin ? formatRuntime(title.runtimeMin) : 'N/A'
  const titleRatingAvg = titleRating?.avgRating || 'N/A'
  const titleRatingNumVotes = titleRating?.numVotes || 'N/A'

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <Container className="py-5">
          <div className="row g-4">
            <div className="col-lg-3 col-12">
              <div className="d-flex flex-column gap-3">
                <div
                  className="position-relative bg-secondary rounded w-100 overflow-hidden"
                  style={{ aspectRatio: '2/3' }}
                >
                  <img
                    src={title.posterUrl ?? placeholderPosterUrl}
                    onError={(e) => (e.currentTarget.src = placeholderPosterUrl)}
                    alt={title.primaryTitle}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="d-flex flex-column gap-2 small">
                  <div>
                    <span className="fw-medium">Type: </span>
                    <span>{title.type}</span>
                  </div>
                  <div>
                    <span className="fw-medium">Year: </span>
                    <span>{title.startYear}</span>
                  </div>
                  <div>
                    <span className="fw-medium">Duration: </span>
                    <span>{runtime || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-12">
              <div className="d-flex flex-column gap-4">
                <h1 className="display-4 fw-bold">{title.primaryTitle}</h1>

                <div className="d-flex flex-wrap align-items-center gap-4">
                  <div className="d-flex align-items-center gap-2">
                    <Star style={{ fill: titleRatingAvg ? 'currentColor' : 'none' }} />
                    <span>{titleRatingAvg}</span>
                    <span className="text-muted small">({titleRatingNumVotes} Reviews)</span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span className="small fw-medium">Your Rating:</span>
                    <div
                      className="d-flex align-items-center gap-1"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        isAuthenticated ? setShowRatingModal(true) : showToast('Login to rate title', 'warning')
                      }
                      onMouseEnter={() => setIsRateHovered(true)}
                      onMouseLeave={() => setIsRateHovered(false)}
                    >
                      <Star
                        style={{
                          fill: userRating || isRateHovered ? '#ffc107' : 'none',
                          stroke: '#ffc107',
                          strokeWidth: 2,
                          transition: 'fill 0.2s ease',
                        }}
                      />
                      <span>{userRating}</span>
                      {userRating ? (
                        <div>
                          <RefreshCw />
                        </div>
                      ) : (
                        <span>Rate title</span>
                      )}
                    </div>
                  </div>

                  <Button onClick={() => handleToggleBookmark(title.tconst)} variant="outline" size="sm">
                    <Bookmark className="me-2" style={{ fill: isBookmarked ? '#636AE8' : 'none' }} />
                    Bookmark
                  </Button>
                </div>

                {title.plot && (
                  <div>
                    <h2 className="mb-2 h5 fw-semibold">Description</h2>
                    <p className="text-muted">{title.plot}</p>
                  </div>
                )}

                {title.people.length > 0 && (
                  <div>
                    <h2 className="mb-3 h5 fw-semibold">Cast & Contributors</h2>
                    <div className="d-flex flex-wrap gap-2">
                      {title.people.map((person) => (
                        <Badge
                          key={`${person.nconst}-${person.category}-${person.characterName ?? ''}`}
                          bg="background-gray"
                          className="px-3 py-2"
                        >
                          <Link to={`/people/${person.nconst}`} className="text-white text-decoration-none">
                            {person.fullName}
                            {person.characterName && ` (${person.characterName})`}
                          </Link>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="mb-4 h4 fw-bold">Details</h2>
            <div className="row g-3 mb-5">
              <div className="col-md-6 col-12">
                <span className="fw-medium">Original Title:</span>
                <span className="ms-2 text-muted">{title.originalTitle || 'N/A'}</span>
              </div>
              <div className="col-md-6 col-12">
                <span className="fw-medium">Rated:</span>
                <span className="ms-2 text-muted">{title.rated || 'N/A'}</span>
              </div>
              <div className="col-md-6 col-12">
                <span className="fw-medium">Genres:</span>
                <span className="ms-2 text-muted">{title.genres.join(', ') || 'N/A'}</span>
              </div>
              <div className="col-md-6 col-12">
                <span className="fw-medium">Countries:</span>
                <span className="ms-2 text-muted">{title.countries.join(', ') || 'N/A'}</span>
              </div>
            </div>

            <h2 className="mb-4 h4 fw-bold">Related Titles</h2>
            <SimilarTitles tconst={tconst!} />
          </div>
        </Container>
      </div>

      <Modal show={showRatingModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate this title</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-flex align-items-center justify-content-center mb-4" style={{ gap: 0 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
              const isFilled = hoveredRating ? star <= hoveredRating : selectedRating !== null && star <= selectedRating

              return (
                <div
                  key={star}
                  style={{
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                  onClick={() => handleStarClick(star)}
                >
                  <Star
                    style={{
                      width: '2rem',
                      height: '2rem',
                      fill: isFilled ? '#ffc107' : 'none',
                      stroke: '#ffc107',
                      strokeWidth: 2,
                      transition: 'fill 0.2s ease',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              )
            })}
          </div>
          {selectedRating && (
            <p className="mb-0 text-muted">
              You selected {selectedRating} star{selectedRating !== 1 ? 's' : ''}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleRateSubmit(title.tconst)}
            disabled={selectedRating === null}
            className="text-white"
          >
            Rate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
