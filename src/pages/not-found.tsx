import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'
import { Container } from '@/components/container'

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1">404</h1>
      <p className="mb-4">Page not found</p>
      <Button as={Link} to="/" variant="primary">
        Back to homepage
      </Button>
    </Container>
  )
}
