import { Route, Routes } from 'react-router'
import { LoginPage } from './pages/LogIn'
import { SignUpPage } from './pages/SignUp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </>
  )
}

export default App
