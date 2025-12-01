import Card from 'react-bootstrap/Card'
import { Container } from './container'

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
]

function TalentCard({ talent }: { talent: Talent }) {
  const imageUrl = talent.imageUrl || `https://placehold.co/300x300?text=${encodeURIComponent(talent.name)}`

  return (
    <Card className="overflow-hidden pt-0 text-center">
      <div className="p-0">
        <div className="position-relative ratio ratio-1x1 w-100 overflow-hidden bg-secondary">
          <img src={imageUrl} alt={talent.name} className="h-100 w-100" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <Card.Body>
        <Card.Title className="h6">{talent.name}</Card.Title>
        <Card.Text className="text-muted">{talent.role}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default function MeetTalent() {
  return (
    <section className="py-5">
      <Container>
        <h2 className="h3 fw-semibold mb-4">Meet the Talent</h2>
        <div className="row g-3">
          {talents.map((talent) => (
            <div key={talent.id} className="col-md-4 col-lg-2 col-6">
              <TalentCard talent={talent} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
