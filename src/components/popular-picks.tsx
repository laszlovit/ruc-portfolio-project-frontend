import { useTitlesQuery } from '@/feature/titles/queries'
import type { Title } from '@/types/titles'
import { Star } from 'lucide-react'
import { useMemo } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router'
import { Container } from './container'

function TitleCard({ title }: { title: Title }) {
  const imageUrl = title.posterUrl || `https://placehold.co/300x450?text=${encodeURIComponent(title.primaryTitle)}`

  return (
    <Card
      as={Link}
      to={`/titles/${title.tconst}`}
      className="pt-0 overflow-hidden h-100 d-flex flex-column text-decoration-none"
    >
      <div className="p-0">
        <div className="position-relative bg-secondary w-100 overflow-hidden ratio" style={{ aspectRatio: '2/3' }}>
          <img src={imageUrl} alt={title.primaryTitle} className="w-100 h-100" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <Card.Body className="d-flex flex-column flex-grow-1">
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
  const params = useMemo(() => ({ page: 1, pageSize: 5 }), [])
  const titlesQuery = useTitlesQuery(params)
  const titles = titlesQuery.data?.items || []

  return (
    <section className="py-5">
      <Container>
        <h2 className="mb-4 h3 fw-semibold">Popular Picks for You</h2>
        <div className="popular-picks-grid">
          {titles.map((title) => (
            <TitleCard key={title.tconst} title={title} />
          ))}
        </div>
      </Container>
    </section>
  )
}
