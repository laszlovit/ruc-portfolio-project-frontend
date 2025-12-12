import { useToast } from '@/contexts/toast-context'
import { Search } from 'lucide-react'
import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useNavigate } from 'react-router'
import { Container } from './container'

export default function HomeHero() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [searchText, setSearchText] = useState<string>()

  const handleSearchSubmit = () => {
    let searchQuery

    if (searchText?.trim()) {
      searchQuery = encodeURIComponent(searchText.trim())
      navigate(`/titles/search?query=${searchQuery}`)
      return null
    }

    showToast('Search input should not be empty to search', 'error')
  }

  return (
    <section className="py-5">
      <Container>
        <div className="p-4 p-lg-5 rounded">
          <div className="mx-auto text-center" style={{ maxWidth: '48rem' }}>
            <h1 className="mb-4 display-4 fw-bold">Discover Your Next Obsession</h1>
            <p className="mx-auto mb-4 text-muted" style={{ maxWidth: '32rem' }}>
              Explore a vast library of movies and actors. Find ratings, reviews, and personalized recommendations.
            </p>
            <div className="d-flex flex-column flex-sm-row align-items-center gap-3 mb-4">
              <div className="flex-grow-1 w-100">
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search movies, actors, or genres..."
                    value={searchText}
                    required
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button type="submit" onClick={handleSearchSubmit} variant="primary" className="text-white">
                    Search
                  </Button>
                </InputGroup>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Accordion defaultActiveKey="null" style={{ maxWidth: '28rem', width: '100%' }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Advanced Search</Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-0 text-muted small">
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
