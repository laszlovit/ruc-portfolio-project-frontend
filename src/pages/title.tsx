import { Container } from '@/components/container'
import { useTitleRatingQuery } from '@/feature/ratings/queries'
import { useTitleQuery } from '@/feature/titles/queries'
import { formatRuntime } from '@/lib/utils'
import { Bookmark, Star } from 'lucide-react'
import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import { Link, useNavigate, useParams } from 'react-router'

// TODO: User rating and bookmarking needs to be implemented once auth flow is ready

export default function Title() {
  const { titleId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('details')
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [isRateHovered, setIsRateHovered] = useState(false)

  const titleQuery = useTitleQuery(titleId!)
  const titleRatingQuery = useTitleRatingQuery(titleId!)

  const handleCloseModal = () => {
    setShowRatingModal(false)
    setHoveredRating(null)
  }

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating)
  }

  const handleRateSubmit = () => {
    // TODO: Implement rating submission
    console.log('Rating submitted:', selectedRating)
    handleCloseModal()
  }

  if (titleQuery.isLoading) {
    return <div>Loading...</div>
  }

  const title = titleQuery.data

  if (!title) {
    navigate('/not-found')
    return
  }

  const placeholderPosterUrl = `https://placehold.co/400x600?text=${encodeURIComponent(title.primaryTitle)}`

  const runtime = title.runtimeMin ? formatRuntime(title.runtimeMin) : 'N/A'
  const titleRatingAvg = titleRatingQuery.data?.avgRating || 'N/A'
  const titleRatingNumVotes = titleRatingQuery.data?.numVotes || 'N/A'

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
                      onClick={() => setShowRatingModal(true)}
                      onMouseEnter={() => setIsRateHovered(true)}
                      onMouseLeave={() => setIsRateHovered(false)}
                    >
                      <Star
                        style={{
                          fill: isRateHovered ? '#ffc107' : 'none',
                          stroke: '#ffc107',
                          strokeWidth: 2,
                          transition: 'fill 0.2s ease',
                        }}
                      />
                      <span>Rate</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    <Bookmark className="me-2" style={{ width: '1rem', height: '1rem' }} />
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
                          bg="secondary"
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
            <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'details')} className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="details">Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="related">Related Items</Nav.Link>
              </Nav.Item>
            </Nav>

            {activeTab === 'details' && (
              <div className="row g-3">
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
            )}

            {activeTab === 'related' && <p className="text-muted">Related items will be displayed here.</p>}
          </div>
        </Container>
      </div>

      <Modal show={showRatingModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate this title</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="d-flex justify-content-center align-items-center mb-4" style={{ gap: 0 }}>
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
            <p className="text-muted mb-0">
              You selected {selectedRating} star{selectedRating !== 1 ? 's' : ''}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRateSubmit} disabled={selectedRating === null}>
            Rate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
