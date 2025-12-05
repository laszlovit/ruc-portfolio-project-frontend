import { Container } from '@/components/container'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-1">404</h1>
      <p className="mb-4">Page not found</p>
      <Link to="/" className="btn btn-primary text-white">
        Back to homepage
      </Link>
    </Container>
  )
}
