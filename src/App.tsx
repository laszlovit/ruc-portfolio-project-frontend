import ExploreGenres from './components/explore-genres'
import Footer from './components/footer'
import HomeHero from './components/home-hero'
import MeetTalent from './components/meet-talent'
import Navbar from './components/navbar'
import PopularPicks from './components/popular-picks'
import RecentSearches from './components/recent-searches'

function App() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <RecentSearches />
      <PopularPicks />
      <ExploreGenres />
      <MeetTalent />
      <Footer />
    </>
  )
}

export default App
