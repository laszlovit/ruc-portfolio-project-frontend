import ExploreGenres from '@/components/explore-genres'
import HomeHero from '@/components/home-hero'
import MeetTalent from '@/components/meet-talent'
import PopularPicks from '@/components/popular-picks'
import RecentSearches from '@/components/recent-searches'

export default function Home() {
  return (
    <>
      <HomeHero />
      <RecentSearches />
      <PopularPicks />
      <ExploreGenres />
      <MeetTalent />
    </>
  )
}
