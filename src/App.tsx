import { Route, Routes } from 'react-router'
import Layout from './components/layout'
import Home from './pages/home'
import { LoginPage } from './pages/log-in'
import NotFound from './pages/not-found'
import Person from './pages/person'
import Profile from './pages/profile'
import { SignUpPage } from './pages/sign-up'
import Title from './pages/title'
import { ProtectedRoute } from './routes/protected-route'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public  */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Protected  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/titles/:tconst" element={<Title />} />
          <Route path="/people/:nconst" element={<Person />} />
        </Route>

        {/* 404  */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
