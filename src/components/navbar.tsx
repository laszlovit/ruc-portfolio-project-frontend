import { Film, Menu, Tv, User, Users } from 'lucide-react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link, NavLink } from 'react-router'
import { Container } from './container'
import { Logo } from './logo'

// Hardcoded auth state - will be replaced with real auth later
const IS_LOGGED_IN = true
const USER_NAME = 'John Doe'
const USER_AVATAR = 'https://placehold.co/40x40?text=JD'

const navLinks = [
  { href: '#', label: 'Movies', icon: Film },
  { href: '#', label: 'TV Shows', icon: Tv },
  { href: '#', label: 'Celebs', icon: Users },
]

function Avatar({ src, alt, fallback }: { src?: string; alt: string; fallback: string }) {
  return (
    <div
      className="rounded-circle overflow-hidden bg-secondary d-flex align-items-center justify-content-center"
      style={{ width: '2.5rem', height: '2.5rem' }}
    >
      {src ? (
        <img src={src} alt={alt} className="w-100 h-100" style={{ objectFit: 'cover' }} />
      ) : (
        <span className="small fw-medium">{fallback}</span>
      )}
    </div>
  )
}

export default function Navbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  const handleClose = () => setShowOffcanvas(false)
  const handleShow = () => setShowOffcanvas(true)

  return (
    <nav className="border-bottom">
      <Container>
        <div className="d-flex align-items-center justify-content-between" style={{ height: '4rem' }}>
          <Link to="/" className="text-decoration-none">
            <Logo size="sm" />
          </Link>
          <div className="d-none d-md-flex">
            <Nav as="ul" className="d-flex align-items-center gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Nav.Item as="li" key={link.label}>
                    <Nav.Link as={Link} to={link.href} className="d-flex align-items-center gap-2">
                      <Icon style={{ width: '1rem', height: '1rem' }} />
                      <span>{link.label}</span>
                    </Nav.Link>
                  </Nav.Item>
                )
              })}
            </Nav>
          </div>
          <Button variant="link" className="d-md-none p-2" onClick={handleShow}>
            <Menu style={{ width: '1.25rem', height: '1.25rem' }} />
            <span className="visually-hidden">Open menu</span>
          </Button>
          <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" style={{ width: '300px' }}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column">
              <nav className="d-flex flex-column gap-3">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <NavLink
                      key={link.label}
                      to={link.href}
                      className="d-flex align-items-center gap-3 rounded px-3 py-2 text-decoration-none"
                      onClick={handleClose}
                    >
                      <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                      <span className="fw-medium">{link.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
              <div className="mt-auto border-top pt-4">
                {IS_LOGGED_IN ? (
                  <div className="d-flex align-items-center gap-3 px-3 py-2">
                    <Avatar
                      src={USER_AVATAR}
                      alt={USER_NAME}
                      fallback={USER_NAME.split(' ')
                        .map((n) => n[0])
                        .join('')}
                    />
                    <span className="small fw-medium">{USER_NAME}</span>
                  </div>
                ) : (
                  <Button variant="outline" className="w-100" size="sm">
                    <User className="me-2" style={{ width: '1rem', height: '1rem' }} />
                    Login
                  </Button>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <div className="d-none d-md-flex align-items-center gap-3">
            {IS_LOGGED_IN ? (
              <div className="d-flex align-items-center gap-2">
                <Avatar
                  src={USER_AVATAR}
                  alt={USER_NAME}
                  fallback={USER_NAME.split(' ')
                    .map((n) => n[0])
                    .join('')}
                />
                <span className="small fw-medium">{USER_NAME}</span>
              </div>
            ) : (
              <Button variant="outline" size="sm">
                <User className="me-2" style={{ width: '1rem', height: '1rem' }} />
                Login
              </Button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}
