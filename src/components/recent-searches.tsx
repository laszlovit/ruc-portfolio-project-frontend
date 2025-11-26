import { Link } from 'react-router'
import { Container } from './container'
import { Badge } from './ui/badge'

const recentSearches = [
  'Sci-Fi Thrillers',
  'Historical Dramas',
  'Leonardo DiCaprio films',
  'Action Movies 2023',
  'Independent Films',
]

export default function RecentSearches() {
  return (
    <section className="py-8">
      <Container>
        <h2 className="text-2xl font-semibold mb-4">Your Recent Searches</h2>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors"
              asChild
            >
              <Link to="#">
                {search}
              </Link>  
            </Badge>
          ))}
        </div>
      </Container>
    </section>
  )
}

