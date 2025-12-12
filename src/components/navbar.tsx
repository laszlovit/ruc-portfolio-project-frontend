import { useAuth } from '@/contexts/auth-context'
import { Film, LogOut, Menu, Tv, User, Users } from 'lucide-react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link, NavLink, useNavigate } from 'react-router'
import { Container } from './container'
import { Logo } from './logo'

const navLinks = [
  { href: '#', label: 'Movies', icon: Film },
  { href: '#', label: 'TV Shows', icon: Tv },
  { href: '#', label: 'Celebs', icon: Users },
]

function Avatar({ src, alt, fallback }: { src?: string; alt: string; fallback: string }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center bg-secondary rounded-circle overflow-hidden bg-background-gray"
      style={{ width: '1.5rem', height: '1.5rem' }}
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
  const { user, isAuthenticated, logout } = useAuth()

  const handleClose = () => setShowOffcanvas(false)
  const handleShow = () => setShowOffcanvas(true)

  const navigate = useNavigate()

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
    navigate('/')
  }

  return (
    <nav className="border-bottom">
      <Container>
        <div className="d-flex align-items-center justify-content-between" style={{ height: '4rem' }}>
          <Link to="/" className="text-decoration-none">
            <Logo size="sm" />
          </Link>
          <div className="d-md-flex d-none">
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
          <Button variant="link" className="p-2 d-md-none" onClick={handleShow}>
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
                      className="d-flex align-items-center gap-3 px-3 py-2 rounded text-decoration-none"
                      onClick={handleClose}
                    >
                      <Icon style={{ width: '1.25rem', height: '1.25rem' }} />
                      <span className="fw-medium">{link.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
              <div className="mt-auto pt-4 border-top">
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      className="d-flex align-items-center gap-3 px-3 py-2 w-100 text-decoration-none text-dark"
                      style={{ border: 'none' }}
                    >
                      <Avatar
                        src="/user-avatar-placeholder.svg"
                        alt="User avatar"
                        fallback={
                          user?.username
                            .split(' ')
                            .map((n) => n[0])
                            .join('') || 'MS'
                        }
                      />
                      <span className="small fw-medium">{user?.username}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">
                        <User className="me-2" style={{ width: '1rem', height: '1rem' }} />
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        <LogOut className="me-2" style={{ width: '1rem', height: '1rem' }} />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button variant="primary" className="w-100" size="sm">
                    <User className="me-2 text-white" style={{ width: '1rem', height: '1rem' }} />
                    <span className="text-white">Login</span>
                  </Button>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <div className="d-md-flex align-items-center gap-3 d-none">
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="d-flex align-items-center gap-2 text-decoration-none text-dark"
                  style={{ border: 'none' }}
                >
                  <Avatar
                    src="/user-avatar-placeholder.svg"
                    alt="User avatar"
                    fallback={
                      user?.username
                        .split(' ')
                        .map((n) => n[0])
                        .join('') || 'MS'
                    }
                  />
                  <span className="small fw-medium">{user?.username}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    <User className="me-2" style={{ width: '1rem', height: '1rem' }} />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    <LogOut className="me-2" style={{ width: '1rem', height: '1rem' }} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="primary" size="sm">
                <User className="me-2 text-white" style={{ width: '1rem', height: '1rem' }} />
                <span className="text-white">Login</span>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}
