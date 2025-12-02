import { useTitlesQuery } from '@/feature/titles/queries'
import type { Title } from '@/types/titles'
import { Star } from 'lucide-react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router'
import { Container } from './container'

function TitleCard({ title }: { title: Title }) {
  const imageUrl = title.posterUrl || `https://placehold.co/300x450?text=${encodeURIComponent(title.primaryTitle)}`

  return (
    <Card as={Link} to={`/titles/${title.tconst}`} className="pt-0 overflow-hidden">
      <div className="p-0">
        <div className="position-relative bg-secondary w-100 overflow-hidden ratio" style={{ aspectRatio: '2/3' }}>
          <img src={imageUrl} alt={title.primaryTitle} className="w-100 h-100" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <Card.Body>
        <Card.Title className="h6">{title.primaryTitle}</Card.Title>
        <Card.Text className="text-muted">{title.genres}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex align-items-center gap-1">
          <Star style={{ width: '1rem', height: '1rem', fill: 'currentColor' }} />
          <span className="small fw-medium">{10}</span>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default function PopularPicks() {
  const titlesQuery = useTitlesQuery()
  const titles = titlesQuery.data?.items || []

  return (
    <section className="py-5">
      <Container>
        <h2 className="mb-4 h3 fw-semibold">Popular Picks for You</h2>
        <div className="row g-3">
          {titles.map((title) => (
            <div key={title.tconst} className="col-6 col-md-4 col-lg">
              <TitleCard title={title} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
