import { Container } from '@/components/container'
import LoadingSpinner from '@/components/loading-spinner'
import { usePersonQuery } from '@/feature/persons/queries'
import { Star } from 'lucide-react'
import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import { useNavigate, useParams } from 'react-router'

export default function Person() {
  const { nconst } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('details')

  const personQuery = usePersonQuery(nconst!)

  if (personQuery.isLoading) {
    return <LoadingSpinner />
  }

  if (personQuery.error) {
    return <div>Error: {personQuery.error.message}</div>
  }

  const person = personQuery.data

  if (!person) {
    navigate('/not-found')
    return null
  }

  const placeholderImageUrl = `https://placehold.co/400x600?text=${encodeURIComponent(person.fullName)}`
  const primaryImage = personQuery.profileImages[0] || placeholderImageUrl

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
                    src={primaryImage}
                    alt={person.fullName}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="d-flex flex-column gap-2 small">
                  {person.birthYear && (
                    <div>
                      <span className="fw-medium">Born: </span>
                      <span>{person.birthYear}</span>
                    </div>
                  )}
                  {person.deathYear && (
                    <div>
                      <span className="fw-medium">Died: </span>
                      <span>{person.deathYear}</span>
                    </div>
                  )}
                  {person.birthYear && person.deathYear && (
                    <div>
                      <span className="fw-medium">Age: </span>
                      <span>{person.deathYear - person.birthYear} years</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-12">
              <div className="d-flex flex-column gap-4">
                <h1 className="display-4 fw-bold">{person.fullName}</h1>

                {person.derivedRating !== null && (
                  <div className="d-flex align-items-center gap-2">
                    <Star style={{ fill: 'currentColor' }} />
                    <span className="fw-medium">{person.derivedRating.toFixed(1)}</span>
                    <span className="text-muted small">Average Rating</span>
                  </div>
                )}

                {person.professions.length > 0 && (
                  <div>
                    <h2 className="mb-3 h5 fw-semibold">Professions</h2>
                    <div className="d-flex flex-wrap gap-2">
                      {person.professions.map((proffession, index) => (
                        <Badge key={index} bg="primary" className="px-3 py-2">
                          {proffession.professionName}
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
                <Nav.Link eventKey="filmography">Filmography</Nav.Link>
              </Nav.Item>
            </Nav>

            {activeTab === 'details' && (
              <div className="row g-3">
                <div className="col-md-6 col-12">
                  <span className="fw-medium">IMDB ID:</span>
                  <span className="ms-2 text-muted">{person.nconst}</span>
                </div>
                {person.birthYear && (
                  <div className="col-md-6 col-12">
                    <span className="fw-medium">Birth Year:</span>
                    <span className="ms-2 text-muted">{person.birthYear}</span>
                  </div>
                )}
                {person.deathYear && (
                  <div className="col-md-6 col-12">
                    <span className="fw-medium">Death Year:</span>
                    <span className="ms-2 text-muted">{person.deathYear}</span>
                  </div>
                )}
                {person.derivedRating !== null && (
                  <div className="col-md-6 col-12">
                    <span className="fw-medium">Average Rating:</span>
                    <span className="ms-2 text-muted">{person.derivedRating.toFixed(1)}</span>
                  </div>
                )}
                {person.professions.length > 0 && (
                  <div className="col-12">
                    <span className="fw-medium">Professions:</span>
                    <span className="ms-2 text-muted">
                      {person.professions.map((profession) => profession.professionName).join(', ') || 'N/A'}
                    </span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'filmography' && <p className="text-muted">Filmography will be displayed here.</p>}
          </div>

          {personQuery.profileImages.length > 1 && (
            <div className="mt-5">
              <h2 className="mb-3 h5 fw-semibold">Photos</h2>
              <div className="row g-3">
                {personQuery.profileImages.slice(1, 7).map((imageUrl, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-2">
                    <div
                      className="position-relative bg-secondary rounded w-100 overflow-hidden"
                      style={{ aspectRatio: '2/3' }}
                    >
                      <img
                        src={imageUrl}
                        alt={`${person.fullName} - Photo ${index + 2}`}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}
