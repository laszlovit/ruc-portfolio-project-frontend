import { usePersonsQuery } from '@/feature/persons/queries'
import type { PersonList } from '@/types/persons'
import { useMemo } from 'react'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import { Link } from 'react-router'
import { Container } from './container'

function TalentCard({ talent, imageUrl }: { talent: PersonList; imageUrl?: string }) {
  const professionsText = talent.professions && talent.professions.length > 0 ? talent.professions.join(', ') : 'N/A'
  const defaultImageUrl = `https://placehold.co/300x300?text=${encodeURIComponent(talent.fullName)}`
  const finalImageUrl = imageUrl || defaultImageUrl

  return (
    <Card
      as={Link}
      to={`/people/${talent.nconst}`}
      className="overflow-hidden pt-0 text-center text-decoration-none h-100 d-flex flex-column"
    >
      <div className="p-0">
        <div className="position-relative ratio ratio-1x1 w-100 overflow-hidden bg-secondary">
          <img src={finalImageUrl} alt={talent.fullName} className="h-100 w-100" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <Card.Body className="d-flex flex-column flex-grow-1">
        <Card.Title className="h6">{talent.fullName}</Card.Title>
        <Card.Text className="text-muted">{professionsText}</Card.Text>
      </Card.Body>
    </Card>
  )
}

function SkeletonTalentCard() {
  return (
    <Card className="overflow-hidden pt-0 text-center">
      <div className="p-0">
        <div className="position-relative ratio ratio-1x1 w-100 overflow-hidden bg-secondary">
          <Placeholder animation="glow" className="w-100 h-100" />
        </div>
      </div>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  )
}

export default function MeetTalent() {
  const params = useMemo(() => ({ page: 1, pageSize: 5 }), [])
  const personsQuery = usePersonsQuery(params)
  const { personImages } = personsQuery

  if (personsQuery.isLoading) {
    return (
      <section className="py-5">
        <Container>
          <h2 className="h3 fw-semibold mb-4">Meet the Talent</h2>
          <div className="talent-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonTalentCard key={i} />
            ))}
          </div>
        </Container>
      </section>
    )
  }

  if (personsQuery.error) {
    return (
      <section className="py-5">
        <Container>
          <h2 className="h3 fw-semibold mb-4">Meet the Talent</h2>
          <p className="text-muted">Error loading talent: {personsQuery.error.message}</p>
        </Container>
      </section>
    )
  }

  const persons = personsQuery.data?.items || []

  if (persons.length === 0) {
    return (
      <section className="py-5">
        <Container>
          <h2 className="h3 fw-semibold mb-4">Meet the Talent</h2>
          <p className="text-muted">No talent available at the moment.</p>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-5">
      <Container>
        <h2 className="h3 fw-semibold mb-4">Meet the Talent</h2>
        <div className="talent-grid">
          {persons.map((talent) => (
            <TalentCard key={talent.nconst} talent={talent} imageUrl={personImages[talent.nconst]} />
          ))}
        </div>
      </Container>
    </section>
  )
}
