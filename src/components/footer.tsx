import { Link } from 'react-router'
import { Container } from './container'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-top py-4 mt-5">
      <Container>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <p className="small text-muted mb-0">
            © {currentYear} MovieSurf. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

