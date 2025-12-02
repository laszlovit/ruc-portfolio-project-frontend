import { Link, Route, Routes } from 'react-router'
import { SignUpPage } from './pages/sign-up'
import { ProtectedRoute } from './routes/protected-route'
import { LoginPage } from './pages/LogIn'
import { ProfilePage } from './pages/Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <p>Home</p>
          <Link to="/profile">
            Profile
          </Link>
        </>} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
