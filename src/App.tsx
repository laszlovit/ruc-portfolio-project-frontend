import { Route, Routes } from 'react-router'
import { SignUpPage } from './pages/sign-up'
import { LoginPage } from './pages/login'

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
