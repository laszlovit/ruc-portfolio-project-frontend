import {
  Film,
  Laugh,
  Heart,
  Rocket,
  Sparkles,
  Ghost,
} from 'lucide-react'
import { Container } from './container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

type Genre = {
  id: number
  name: string
  tagline: string
  icon: React.ComponentType<{ className?: string }>
}

const genres: Genre[] = [
  {
    id: 1,
    name: 'Action',
    tagline: 'High Octane',
    icon: Film,
  },
  {
    id: 2,
    name: 'Comedy',
    tagline: 'Laugh Out Loud',
    icon: Laugh,
  },
  {
    id: 3,
    name: 'Drama',
    tagline: 'Emotionally Charged',
    icon: Heart,
  },
  {
    id: 4,
    name: 'Sci-Fi',
    tagline: 'Future Worlds',
    icon: Rocket,
  },
  {
    id: 5,
    name: 'Fantasy',
    tagline: 'Enchanted Realms',
    icon: Sparkles,
  },
  {
    id: 6,
    name: 'Horror',
    tagline: 'Spine-Chilling',
    icon: Ghost,
  },
]

function GenreCard({ genre }: { genre: Genre }) {
  const Icon = genre.icon

  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors">
      <CardHeader className="flex flex-col items-center text-center pb-2">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="size-8" />
        </div>
        <CardTitle>{genre.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-center">{genre.tagline}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function ExploreGenres() {
  return (
    <section className="py-8">
      <Container>
        <h2 className="text-2xl font-semibold mb-6">Explore by Genre</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </Container>
    </section>
  )
}

