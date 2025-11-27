import { Container } from './container'
import { Card, CardHeader, CardTitle } from './ui/card'
import { useGenresQuery } from '@/feature/genres/queries';
import type { Genre } from '@/types/genres';
import { Skeleton } from './ui/skeleton';

function SkeletonGenreCard() {
  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className=""><Skeleton className="h-4 w-24" /></CardTitle>
      </CardHeader>
    </Card>
  )
}

function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle>{genre.genreName}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default function ExploreGenres() {
  const query = useGenresQuery();
  const genres = query.data?.items || [];

  if (query.isFetching){
    return (
      <section className="py-8">
      <Container>
        <h2 className="text-2xl font-semibold mb-6">Explore by Genre</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonGenreCard />
          <SkeletonGenreCard /> 
          <SkeletonGenreCard />
        </div>
      </Container>
    </section>
    )
  }
  if (query.isError){
    return <div>Error: {query.error.message}</div>
  }

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

