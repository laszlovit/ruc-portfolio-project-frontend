import { Search } from 'lucide-react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Container } from './container'

export default function HomeHero() {
  return (
    <section className="py-5">
      <Container>
        <div className="bg-light p-lg-5 rounded p-4">
          <div className="mx-auto text-center" style={{ maxWidth: '48rem' }}>
            <h1 className="display-4 fw-bold mb-4">Discover Your Next Obsession</h1>
            <p className="mx-auto mb-4 text-muted" style={{ maxWidth: '32rem' }}>
              Explore a vast library of movies and actors. Find ratings, reviews, and personalized recommendations.
            </p>
            <div className="d-flex flex-column flex-sm-row align-items-center mb-4 gap-3">
              <div className="w-100 flex-grow-1">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control placeholder="Search movies, actors, or genres..." />
                  <Button variant="primary">Search</Button>
                </InputGroup>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Accordion defaultActiveKey="null" style={{ maxWidth: '28rem', width: '100%' }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Advanced Search</Accordion.Header>
                  <Accordion.Body>
                    <p className="small mb-0 text-muted">
                      Advanced search options will be available here (filters, date ranges, etc.)
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
