import { useGenresQuery } from '@/feature/genres/queries'
import type { Genre } from '@/types/genres'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import { Link } from 'react-router'
import { Container } from './container'

function SkeletonGenreCard() {
  return (
    <Card>
      <Card.Body className="d-flex flex-column align-items-center text-center">
        <Placeholder as="p" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  )
}

function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Card as={Link} to={`/titles?genre=${genre.genreName.toLowerCase()}`}>
      <Card.Body className="d-flex flex-column align-items-center text-center">
        <Card.Title className="mb-0">{genre.genreName}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default function ExploreGenres() {
  const query = useGenresQuery()
  const genres = query.data?.items || []

  if (query.isLoading) {
    return (
      <section className="py-5">
        <Container>
          <h2 className="mb-4 h3 fw-semibold">Explore by Genre</h2>
          <div className="row g-3">
            <div className="col-md-6 col-lg-4 col-12">
              <SkeletonGenreCard />
            </div>
            <div className="col-md-6 col-lg-4 col-12">
              <SkeletonGenreCard />
            </div>
            <div className="col-md-6 col-lg-4 col-12">
              <SkeletonGenreCard />
            </div>
          </div>
        </Container>
      </section>
    )
  }
  if (query.error) {
    return <div>Error: {query.error.message}</div>
  }

  return (
    <section className="py-5">
      <Container>
        <h2 className="mb-4 h3 fw-semibold">Explore by Genre</h2>
        <div className="row g-3">
          {genres.map((genre) => (
            <div key={genre.genreId} className="col-md-6 col-lg-4 col-12">
              <GenreCard genre={genre} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
