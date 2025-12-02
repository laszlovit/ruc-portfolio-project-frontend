import { Route, Routes } from 'react-router'
import Layout from './components/layout'
import Home from './pages/home'
import { LoginPage } from './pages/login'
import NotFound from './pages/not-found'
import { SignUpPage } from './pages/sign-up'
import Title from './pages/title'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/titles/:titleId" element={<Title />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
