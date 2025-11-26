import { Search } from 'lucide-react'
import { Container } from './container'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function HomeHero() {
  return (
    <section className="py-8">
      <Container>
        <div className="rounded-lg py-16 bg-gray-50 px-6 lg:px-0">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-balance mb-4 lg:text-5xl">
              Discover Your Next Obsession
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore a vast library of movies and actors. Find ratings, reviews, and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center">
              <div className="relative flex-1 bg-white">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search movies, actors, or genres..."
                  className="pl-10 h-10 text-base"
                />
              </div>
              <Button size="lg">
                Search
              </Button>
            </div>
            <div className="flex justify-center">
              <Accordion type="single" collapsible className="w-full max-w-md">
                <AccordionItem value="advanced-search" className="border-none">
                  <AccordionTrigger className="justify-center py-2 text-sm text-muted-foreground hover:text-foreground">
                    Advanced Search
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 border rounded-lg bg-card text-left">
                      <p className="text-sm text-muted-foreground">
                        Advanced search options will be available here (filters, date ranges, etc.)
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
