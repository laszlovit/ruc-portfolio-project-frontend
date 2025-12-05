import { Container as CustomContainer } from '@/components/container'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/contexts/toast-context'
import { useUserQueries } from '@/feature/users/queries'
import { Bookmark, Calendar, Star } from 'lucide-react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'

/* 
TODO: Update database to cascade delete ratings and bookmarks when user is 
deleted otherwise it will violate foreign key constraints and fail to delete user.
*/

function ProfileAvatar({ username }: { username?: string }) {
  const initials =
    username
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U'

  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-circle mx-auto"
      style={{
        width: '120px',
        height: '120px',
        backgroundColor: '#FFB6C1',
        color: '#ffffff',
        fontSize: '3rem',
        fontWeight: 'bold',
      }}
    >
      {initials}
    </div>
  )
}

function StatCard({ value, label, description }: { value: string | number; label: string; description: string }) {
  return (
    <Card className="h-100 border">
      <Card.Body className="d-flex flex-column">
        <div className="text-primary fw-bold mb-2" style={{ fontSize: '2rem' }}>
          {value}
        </div>
        <div className="fw-semibold mb-1">{label}</div>
        <div className="small text-muted">{description}</div>
      </Card.Body>
    </Card>
  )
}

export default function Profile() {
  const { user, updateUser, logout } = useAuth()
  const [username, setUsername] = useState<string>(() => user?.username ?? '')
  const [activeTab, setActiveTab] = useState<string>('profile-info')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { updateUserName, deleteUser } = useUserQueries()
  const { showToast } = useToast()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await updateUserName(username)
      showToast('Username updated successfully!', 'success')
      updateUser({ username: username, email: user?.email ?? '' })
    } catch (err) {
      console.error('Update error', err)
      showToast('Failed to update username. Please try again.', 'error')
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
  }

  async function handleDeleteConfirm() {
    try {
      await deleteUser()
      setShowDeleteModal(false)
      showToast('User deleted successfully!', 'success')
      logout()
    } catch (err) {
      console.error('Delete error', err)
      showToast('Failed to delete user. Please try again.', 'error')
      setShowDeleteModal(false)
    }
  }

  return (
    <div className="py-5">
      <CustomContainer>
        {/* Profile Header Section */}
        <div className="text-center mb-5">
          <ProfileAvatar username={user?.username} />
          <h1 className="mt-3 mb-2 fw-bold">{user?.username || 'User'}</h1>
          <Button variant="danger" className="text-white" onClick={handleDeleteClick}>
            Delete Account
          </Button>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete your account?</p>
            <p className="text-danger fw-semibold mb-0">
              This action cannot be undone. All your data, including ratings and bookmarks, will be permanently deleted.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" className="text-white" onClick={handleDeleteConfirm}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Statistics Cards */}
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <StatCard value="125" label="Total Items Rated" description="Movies and shows you've reviewed" />
          </div>
          <div className="col-md-4">
            <StatCard value="42" label="Total Bookmarks" description="Your curated list of must-watch content" />
          </div>
          <div className="col-md-4">
            <StatCard value="Last 7 days" label="Recent Activity" description="Your latest ratings and bookmarks" />
          </div>
        </div>

        {/* Tabs Section */}
        <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
          <Nav variant="tabs" className="border-bottom mb-4" style={{ borderBottom: 'none' }}>
            <Nav.Item>
              <Nav.Link
                eventKey="profile-info"
                className={activeTab === 'profile-info' ? 'active' : ''}
                style={{
                  borderBottom: activeTab === 'profile-info' ? '3px solid #636AE8' : '3px solid transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  backgroundColor: activeTab === 'profile-info' ? 'rgba(99, 106, 232, 0.05)' : 'transparent',
                  fontWeight: activeTab === 'profile-info' ? '600' : 'normal',
                }}
              >
                Profile Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="bookmarks"
                className={activeTab === 'bookmarks' ? 'active' : ''}
                style={{
                  borderBottom: activeTab === 'bookmarks' ? '3px solid #636AE8' : '3px solid transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  backgroundColor: activeTab === 'bookmarks' ? 'rgba(99, 106, 232, 0.05)' : 'transparent',
                  fontWeight: activeTab === 'bookmarks' ? '600' : 'normal',
                }}
              >
                Bookmarks
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="ratings"
                className={activeTab === 'ratings' ? 'active' : ''}
                style={{
                  borderBottom: activeTab === 'ratings' ? '3px solid #636AE8' : '3px solid transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  backgroundColor: activeTab === 'ratings' ? 'rgba(99, 106, 232, 0.05)' : 'transparent',
                  fontWeight: activeTab === 'ratings' ? '600' : 'normal',
                }}
              >
                My Ratings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="activity"
                className={activeTab === 'activity' ? 'active' : ''}
                style={{
                  borderBottom: activeTab === 'activity' ? '3px solid #636AE8' : '3px solid transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  backgroundColor: activeTab === 'activity' ? 'rgba(99, 106, 232, 0.05)' : 'transparent',
                  fontWeight: activeTab === 'activity' ? '600' : 'normal',
                }}
              >
                Recent Activity
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="profile-info">
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="text-white">
                  Save Changes
                </Button>
              </Form>
            </Tab.Pane>

            <Tab.Pane eventKey="bookmarks">
              <div className="text-center py-5 text-muted">
                <Bookmark style={{ width: '3rem', height: '3rem' }} className="mb-3 opacity-50" />
                <p>No bookmarks yet. Start bookmarking your favorite movies and shows!</p>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="ratings">
              <div className="text-center py-5 text-muted">
                <Star style={{ width: '3rem', height: '3rem' }} className="mb-3 opacity-50" />
                <p>No ratings yet. Rate movies and shows to see them here!</p>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="activity">
              <div className="text-center py-5 text-muted">
                <Calendar style={{ width: '3rem', height: '3rem' }} className="mb-3 opacity-50" />
                <p>No recent activity. Your latest actions will appear here!</p>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </CustomContainer>
    </div>
  )
}
