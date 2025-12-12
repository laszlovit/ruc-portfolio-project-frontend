import { Container as CustomContainer } from '@/components/container'
import LoadingSpinner from '@/components/loading-spinner'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/contexts/toast-context'
import {
  useBookmarkedPeopleQuery,
  useBookmarkedTitlesQuery,
  useRatedTitlesQuery,
  useSearchHistoryQuery,
  useUserQueries,
} from '@/feature/users/queries'
import { Bookmark, Search, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import { Link, useNavigate } from 'react-router'

// TODO: Refetch search history

function ProfileAvatar({ username }: { username?: string }) {
  const initials =
    username
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U'

  return (
    <div
      className="d-flex align-items-center justify-content-center mx-auto rounded-circle"
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
    <Card className="border h-100">
      <Card.Body className="d-flex flex-column">
        <div className="mb-2 text-primary fw-bold" style={{ fontSize: '2rem' }}>
          {value}
        </div>
        <div className="mb-1 fw-semibold">{label}</div>
        <div className="text-muted small">{description}</div>
      </Card.Body>
    </Card>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, updateUser, logout, isLoading } = useAuth()
  const [username, setUsername] = useState<string>(() => user?.username ?? '')
  const [activeTab, setActiveTab] = useState<string>('profile-info')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteBookmarkModal, setShowDeleteBookmarkModal] = useState(false)
  const [showDeleteRatingModal, setShowDeleteRatingModal] = useState(false)
  const [showDeleteSearchHistoryModal, setShowDeleteSearchHistoryModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ tconst?: string; nconst?: string; title: string } | null>(null)
  const {
    updateUserName,
    deleteUser,
    deleteTitleBookmark,
    deleteTitleRating,
    deletePersonBookmark,
    deleteSearchHistory,
  } = useUserQueries()
  const { showToast } = useToast()

  const { data: bookmarkedTitlesData, bookmarkedTitles, setBookmarkedTitles } = useBookmarkedTitlesQuery()
  const { data: ratedTitlesData, ratedTitles, setRatedTitles } = useRatedTitlesQuery()
  const { data: searchHistoryData } = useSearchHistoryQuery()
  const { bookmarkedPeople, setBookmarkedPeople } = useBookmarkedPeopleQuery()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    navigate('/not-found')
    return null
  }

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

  const handleDeleteBookmarkClick = (e: React.MouseEvent, tconst: string, title: string) => {
    e.preventDefault()
    e.stopPropagation()
    setItemToDelete({ tconst, title })
    setShowDeleteBookmarkModal(true)
  }

  const handleDeletePersonBookmarkClick = (e: React.MouseEvent, nconst: string, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    setItemToDelete({ nconst, title: name })
    setShowDeleteBookmarkModal(true)
  }

  const handleDeleteRatingClick = (e: React.MouseEvent, tconst: string, title: string) => {
    e.preventDefault()
    e.stopPropagation()
    setItemToDelete({ tconst, title })
    setShowDeleteRatingModal(true)
  }

  const handleDeleteBookmarkCancel = () => {
    setShowDeleteBookmarkModal(false)
    setItemToDelete(null)
  }

  const handleDeleteRatingCancel = () => {
    setShowDeleteRatingModal(false)
    setItemToDelete(null)
  }

  async function handleDeleteBookmarkConfirm() {
    if (itemToDelete) {
      if (itemToDelete.tconst) {
        await deleteTitleBookmark(itemToDelete.tconst)
        setBookmarkedTitles((prev) => prev!.filter((i) => i.tconst !== itemToDelete.tconst))
        showToast('Successfully deleted title bookmark', 'success')
      } else if (itemToDelete.nconst) {
        await deletePersonBookmark(itemToDelete.nconst)
        setBookmarkedPeople((prev) => prev!.filter((i) => i.nconst !== itemToDelete.nconst))
        showToast('Successfully deleted person bookmark', 'success')
      }
      setItemToDelete(null)
      setShowDeleteBookmarkModal(false)
    }
  }

  async function handleDeleteRatingConfirm() {
    if (itemToDelete && itemToDelete.tconst) {
      const tconstToDelete = itemToDelete.tconst
      await deleteTitleRating(tconstToDelete)
      setRatedTitles((prev) => prev!.filter((i) => i.tconst !== tconstToDelete))
      setItemToDelete(null)
      setShowDeleteRatingModal(false)
      showToast('Successfully deleted title rating', 'success')
    }
  }

  const handleDeleteSearchHistoryClick = () => {
    setShowDeleteSearchHistoryModal(true)
  }

  const handleDeleteSearchHistoryCancel = () => {
    setShowDeleteSearchHistoryModal(false)
  }

  async function handleDeleteSearchHistoryConfirm() {
    try {
      await deleteSearchHistory()
      setShowDeleteSearchHistoryModal(false)
      showToast('Search history deleted successfully', 'success')
    } catch (err) {
      console.error('Delete search history error', err)
      showToast('Failed to delete search history. Please try again.', 'error')
      setShowDeleteSearchHistoryModal(false)
    }
  }

  return (
    <div className="py-5">
      <CustomContainer>
        <div className="mb-5 text-center">
          <ProfileAvatar username={user?.username} />
          <h1 className="mt-3 mb-2 fw-bold">{user?.username || 'User'}</h1>
          <Button variant="danger" className="text-white" onClick={handleDeleteClick}>
            Delete Account
          </Button>
        </div>

        <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete your account?</p>
            <p className="mb-0 text-danger fw-semibold">
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

        <Modal show={showDeleteBookmarkModal} onHide={handleDeleteBookmarkCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Remove Bookmark</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this bookmark?</p>
            {itemToDelete && <p className="mb-0 fw-semibold">&quot;{itemToDelete.title}&quot;</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteBookmarkCancel}>
              Cancel
            </Button>
            <Button variant="danger" className="text-white" onClick={handleDeleteBookmarkConfirm}>
              Remove Bookmark
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteRatingModal} onHide={handleDeleteRatingCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Remove Rating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to remove this rating?</p>
            {itemToDelete && <p className="mb-0 fw-semibold">&quot;{itemToDelete.title}&quot;</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteRatingCancel}>
              Cancel
            </Button>
            <Button variant="danger" className="text-white" onClick={handleDeleteRatingConfirm}>
              Remove Rating
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteSearchHistoryModal} onHide={handleDeleteSearchHistoryCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>Clear Search History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to clear all search history?</p>
            <p className="mb-0 text-danger fw-semibold">This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteSearchHistoryCancel}>
              Cancel
            </Button>
            <Button variant="danger" className="text-white" onClick={handleDeleteSearchHistoryConfirm}>
              Clear All
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="mb-5 row g-3">
          <div className="col-md-4">
            <StatCard
              value={ratedTitlesData?.total || 0}
              label="Total Items Rated"
              description="Movies and shows you've reviewed"
            />
          </div>
          <div className="col-md-4">
            <StatCard
              value={bookmarkedTitlesData?.total || 0}
              label="Total Bookmarks"
              description="Your curated list of must-watch content"
            />
          </div>
          <div className="col-md-4">
            <StatCard value="Last 7 days" label="Recent Activity" description="Your latest ratings and bookmarks" />
          </div>
        </div>

        <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
          <Nav variant="tabs" className="mb-4 border-bottom" style={{ borderBottom: 'none' }}>
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
                eventKey="search-history"
                className={activeTab === 'search-history' ? 'active' : ''}
                style={{
                  borderBottom: activeTab === 'search-history' ? '3px solid #636AE8' : '3px solid transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  backgroundColor: activeTab === 'search-history' ? 'rgba(99, 106, 232, 0.05)' : 'transparent',
                  fontWeight: activeTab === 'search-history' ? '600' : 'normal',
                }}
              >
                Search History
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
              {(bookmarkedTitles && bookmarkedTitles.length > 0) ||
              (bookmarkedPeople && bookmarkedPeople.length > 0) ? (
                <div className="d-flex flex-column gap-4">
                  {bookmarkedTitles && bookmarkedTitles.length > 0 && (
                    <div>
                      <h5 className="mb-3 fw-semibold">Titles</h5>
                      <div className="d-flex flex-column gap-3">
                        {bookmarkedTitles.map((bt) => (
                          <Card key={bt.tconst} as={Link} to={`/titles/${bt.tconst}`} className="text-decoration-none">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                              <div className="flex-grow-1">
                                <Card.Title className="mb-1 h6">{bt.primaryTitle}</Card.Title>
                                <Card.Text className="mb-0 text-muted small">
                                  Bookmarked on {new Date(bt.bookmarkDate).toLocaleDateString()}
                                </Card.Text>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                <Bookmark style={{ width: '1.5rem', height: '1.5rem' }} className="text-primary" />
                                <Button
                                  variant="link"
                                  className="p-0 text-danger"
                                  onClick={(e) => handleDeleteBookmarkClick(e, bt.tconst, bt.primaryTitle)}
                                  style={{ minWidth: 'auto' }}
                                >
                                  <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookmarkedPeople && bookmarkedPeople.length > 0 && (
                    <div>
                      <h5 className="mb-3 fw-semibold">People</h5>
                      <div className="d-flex flex-column gap-3">
                        {bookmarkedPeople.map((bp) => (
                          <Card key={bp.nconst} as={Link} to={`/people/${bp.nconst}`} className="text-decoration-none">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                              <div className="flex-grow-1">
                                <Card.Title className="mb-1 h6">{bp.fullName}</Card.Title>
                                <Card.Text className="mb-0 text-muted small">
                                  Bookmarked on {new Date(bp.bookmarkDate).toLocaleDateString()}
                                </Card.Text>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                <Bookmark style={{ width: '1.5rem', height: '1.5rem' }} className="text-primary" />
                                <Button
                                  variant="link"
                                  className="p-0 text-danger"
                                  onClick={(e) => handleDeletePersonBookmarkClick(e, bp.nconst, bp.fullName)}
                                  style={{ minWidth: 'auto' }}
                                >
                                  <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-5 text-muted text-center">
                  <Bookmark style={{ width: '3rem', height: '3rem' }} className="opacity-50 mb-3" />
                  <p>No bookmarks yet. Start bookmarking your favorite movies, shows, and people!</p>
                </div>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="ratings">
              {ratedTitles && ratedTitles.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {ratedTitles.map((rt) => (
                    <Card key={rt.tconst} as={Link} to={`/titles/${rt.tconst}`} className="text-decoration-none">
                      <Card.Body className="d-flex align-items-center justify-content-between">
                        <div className="flex-grow-1">
                          <Card.Title className="mb-1 h6">{rt.primaryTitle}</Card.Title>
                          <Card.Text className="mb-0 text-muted small">
                            Rated on {new Date(rt.ratingDate).toLocaleDateString()}
                          </Card.Text>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center gap-1">
                            <Star
                              style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }}
                              className="text-warning"
                            />
                            <span className="fw-semibold">{rt.rating}</span>
                          </div>
                          <Button
                            variant="link"
                            className="p-0 text-danger"
                            onClick={(e) => handleDeleteRatingClick(e, rt.tconst, rt.primaryTitle)}
                            style={{ minWidth: 'auto' }}
                          >
                            <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-5 text-muted text-center">
                  <Star style={{ width: '3rem', height: '3rem' }} className="opacity-50 mb-3" />
                  <p>No ratings yet. Rate movies and shows to see them here!</p>
                </div>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="search-history">
              {searchHistoryData?.items && searchHistoryData.items.length > 0 ? (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="mb-0 text-muted">
                      {searchHistoryData.total} search{searchHistoryData.total !== 1 ? 'es' : ''}
                    </p>
                    <Button variant="link" className="p-0 text-danger" onClick={handleDeleteSearchHistoryClick}>
                      <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} className="me-1" />
                      Clear All
                    </Button>
                  </div>
                  <Card>
                    <ListGroup variant="flush">
                      {searchHistoryData.items.map((history, index) => (
                        <ListGroup.Item
                          key={index}
                          action
                          as={Link}
                          to={`/titles/search?${history.searchParameters}`}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <div className="flex-grow-1">
                            <div className="fw-semibold">{history.searchParameters}</div>
                            <div className="text-muted small">
                              {new Date(history.searchDate).toLocaleDateString()} at{' '}
                              {new Date(history.searchDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </div>
                          <Search style={{ width: '1rem', height: '1rem' }} className="text-muted" />
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </>
              ) : (
                <div className="py-5 text-muted text-center">
                  <Search style={{ width: '3rem', height: '3rem' }} className="opacity-50 mb-3" />
                  <p>No recent search history. Your latest searches will appear here!</p>
                </div>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </CustomContainer>
    </div>
  )
}
