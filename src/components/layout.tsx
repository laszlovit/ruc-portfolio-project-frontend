import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from './footer'
import Navbar from './navbar'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
