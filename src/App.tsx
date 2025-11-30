import { Route, Routes } from 'react-router'
import { LoginPage } from './pages/LogIn'
import { SignUpPage } from './pages/SignUp'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<p>Home</p>} />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </>
  )
}

export default App
