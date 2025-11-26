import { Link } from 'react-router'
import { Container } from './container'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 mt-16">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MovieSurf. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

