import * as React from 'react'
import { Star } from 'lucide-react'
import { Container } from './container'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

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
      <CardHeader className="p-0">
      <div className="relative md:aspect-[2/3] w-full overflow-hidden aspect-[2.5/3] bg-muted">
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{movie.title}</CardTitle>
        <CardDescription>{movie.genre}</CardDescription>
      </CardContent>
      <CardFooter>
      <div className="flex items-center gap-1">
          <Star className="size-4 fill-foreground" />
          <span className="text-sm font-medium">{movie.rating}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function PopularPicks() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="py-8">
      <Container>
        <h2 className="text-2xl font-semibold mb-6">Popular Picks for You</h2>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {popularMovies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-full md:basis-1/2 lg:basis-1/5"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="md:-left-12 left-2" />
          <CarouselNext className="md:-right-12 right-2" />
          <div className="flex justify-center gap-2 mt-6">
            {popularMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`
                  h-2 rounded-full transition-all
                  ${current === index ? 'w-8 bg-foreground' : 'w-2 bg-muted-foreground/50'}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </Container>
    </section>
  )
}

