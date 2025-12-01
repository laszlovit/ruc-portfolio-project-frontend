import { Star } from 'lucide-react'
import Card from 'react-bootstrap/Card'
import { Container } from './container'

type Movie = {
  id: number
  title: string
  genre: string
  rating: number
  imageUrl?: string
}

const popularMovies: Movie[] = [
  {
    id: 1,
    title: 'Neon Horizon',
    genre: 'Action, Sci-Fi',
    rating: 8.5,
  },
  {
    id: 2,
    title: 'Whispering Pines',
    genre: 'Drama, Mystery',
    rating: 7.9,
  },
  {
    id: 3,
    title: 'The Elder Scroll',
    genre: 'Fantasy, Adventure',
    rating: 9.1,
  },
  {
    id: 4,
    title: 'Love in the Rain',
    genre: 'Romance, Comedy',
    rating: 7.2,
  },
  {
    id: 5,
    title: 'Forgotten Expeditions',
    genre: 'Documentary',
    rating: 8.8,
  },
  {
    id: 6,
    title: 'Midnight Shadows',
    genre: 'Thriller, Crime',
    rating: 8.3,
  },
  {
    id: 7,
    title: 'Cosmic Dreams',
    genre: 'Sci-Fi, Drama',
    rating: 7.6,
  },
]

function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = movie.imageUrl || `https://placehold.co/300x450?text=${encodeURIComponent(movie.title)}`

  return (
    <Card className="overflow-hidden pt-0">
      <div className="p-0">
        <div className="position-relative w-100 overflow-hidden bg-secondary ratio" style={{ aspectRatio: '2/3' }}>
          <img src={imageUrl} alt={movie.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <Card.Body>
        <Card.Title className="h6">{movie.title}</Card.Title>
        <Card.Text className="text-muted">{movie.genre}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex align-items-center gap-1">
          <Star style={{ width: '1rem', height: '1rem', fill: 'currentColor' }} />
          <span className="small fw-medium">{movie.rating}</span>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default function PopularPicks() {
  // Show only the first 5 movies
  const displayedMovies = popularMovies.slice(0, 5)

  return (
    <section className="py-5">
      <Container>
        <h2 className="mb-4 h3 fw-semibold">Popular Picks for You</h2>
        <div className="row g-3">
          {displayedMovies.map((movie) => (
            <div key={movie.id} className="col-6 col-md-4 col-lg">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

