import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router'
import { Container } from './container'

const recentSearches = [
  'Sci-Fi Thrillers',
  'Historical Dramas',
  'Leonardo DiCaprio films',
  'Action Movies 2023',
  'Independent Films',
]

export default function RecentSearches() {
  return (
    <section className="py-5">
      <Container>
        <h2 className="mb-4 h3 fw-semibold">Your Recent Searches</h2>
        <div className="d-flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <Badge
              key={index}
              bg="background-gray"
              as={Link}
              to="#"
              style={{ cursor: 'pointer' }}
              className="text-decoration-none"
            >
              {search}
            </Badge>
          ))}
        </div>
      </Container>
    </section>
  )
}
