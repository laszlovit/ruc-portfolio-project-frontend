import { Container } from '@/components/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTitleRatingQuery } from '@/feature/ratings/queries'
import { useTitleQuery } from '@/feature/titles/queries'
import { formatRuntime } from '@/lib/utils'
import { Bookmark, Star } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'

// TODO: User rating and bookmarking needs to be implemented once auth flow is ready

export default function Title() {
  const { titleId } = useParams()
  const navigate = useNavigate()

  const titleQuery = useTitleQuery(titleId!)
  const titleRatingQuery = useTitleRatingQuery(titleId!)

  if (titleQuery.isLoading) {
    return <div>Loading...</div>
  }

  const title = titleQuery.data

  if (!title) {
    navigate('/not-found')
    return
  }

  const placeholderPosterUrl = `https://placehold.co/400x600?text=${encodeURIComponent(title.primaryTitle)}`

  const runtime = title.runtimeMin ? formatRuntime(title.runtimeMin) : 'N/A'
  const titleRatingAvg = titleRatingQuery.data?.avgRating || 'N/A'
  const titleRatingNumVotes = titleRatingQuery.data?.numVotes || 'N/A'

  return (
    <>
      <div className="min-h-screen bg-background">
        <Container className="py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={title.posterUrl ?? placeholderPosterUrl}
                  alt={title.primaryTitle}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Type: </span>
                  <span>{title.type}</span>
                </div>
                <div>
                  <span className="font-medium">Year: </span>
                  <span>{title.startYear}</span>
                </div>
                <div>
                  <span className="font-medium">Duration: </span>
                  <span>{runtime || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold">{title.primaryTitle}</h1>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className={`${titleRatingAvg ? 'fill-foreground' : 'stroke-foreground'}`} />
                  <span>{titleRatingAvg}</span>
                  <span className="text-sm text-muted-foreground">({titleRatingNumVotes} Reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Your Rating:</span>
                  <div className="group flex items-center gap-1 hover:cursor-pointer">
                    <Star className="group-hover:fill-foreground group-hover:transition-colors" />
                    <span>Rate</span>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 size-4" />
                  Bookmark
                </Button>
              </div>

              {title.plot && (
                <div>
                  <h2 className="mb-2 text-xl font-semibold">Description</h2>
                  <p className="text-muted-foreground">{title.plot}</p>
                </div>
              )}

              {title.people.length > 0 && (
                <div>
                  <h2 className="mb-3 text-xl font-semibold">Cast & Contributors</h2>
                  <div className="flex flex-wrap gap-2">
                    {title.people.map((person) => (
                      <Badge key={person.nconst} variant="secondary" asChild className="px-3 py-1.5 text-sm">
                        <Link to={`/people/${person.nconst}`}>
                          {person.fullName}
                          {person.characterName && ` (${person.characterName})`}
                        </Link>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="related">Related Items</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Original Title:</span>
                    <span className="ml-2 text-muted-foreground">{title.originalTitle || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Rated:</span>
                    <span className="ml-2 text-muted-foreground">{title.rated || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Genres:</span>
                    <span className="ml-2 text-muted-foreground">{title.genres.join(', ') || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Countries:</span>
                    <span className="ml-2 text-muted-foreground">{title.countries.join(', ') || 'N/A'}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="related" className="space-y-4">
                <p className="text-muted-foreground">Related items will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </div>
    </>
  )
}
