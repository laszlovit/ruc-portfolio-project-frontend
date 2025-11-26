import { Route, Routes } from 'react-router'
import { LoginPage } from './pages/LogIn'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  )
}

export default App
