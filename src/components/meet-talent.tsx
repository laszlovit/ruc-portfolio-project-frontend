import * as React from 'react'
import { Container } from './container'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

type Talent = {
  id: number
  name: string
  role: string
  imageUrl?: string
}

const talents: Talent[] = [
  {
    id: 1,
    name: 'Eleanor Vance',
    role: 'Acclaimed Actress',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'Versatile Actor',
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Visionary Director',
  },
  {
    id: 4,
    name: 'Leo Maxwell',
    role: 'Rising Star',
  },
  {
    id: 5,
    name: 'Victor Sterling',
    role: 'Veteran Performer',
  },
  {
    id: 6,
    name: 'Chloe Park',
    role: 'Dynamic Actress',
  },
  {
    id: 7,
    name: 'Isabella Cruz',
    role: 'Talented Performer',
  },
  {
    id: 8,
    name: 'James Morrison',
    role: 'Character Actor',
  },
]

function TalentCard({ talent }: { talent: Talent }) {
  const imageUrl =
    talent.imageUrl ||
    `https://placehold.co/300x300?text=${encodeURIComponent(talent.name)}`

  return (
    <Card className="overflow-hidden pt-0 text-center gap-2">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={talent.name}
            className="h-full w-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">{talent.name}</CardTitle>
        <CardDescription>{talent.role}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default function MeetTalent() {
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
        <h2 className="text-2xl font-semibold mb-6">Meet the Talent</h2>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {talents.map((talent) => (
              <CarouselItem
                key={talent.id}
                className="basis-full md:basis-1/2 lg:basis-1/6"
              >
                <TalentCard talent={talent} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="md:-left-12 left-2" />
          <CarouselNext className="md:-right-12 right-2" />
          <div className="flex justify-center gap-2 mt-6">
            {talents.map((_, index) => (
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

