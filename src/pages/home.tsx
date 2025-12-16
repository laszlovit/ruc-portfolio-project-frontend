import ExploreGenres from '@/components/explore-genres'
import HomeHero from '@/components/home-hero'
import MeetTalent from '@/components/meet-talent'
import PopularPicks from '@/components/popular-picks'

export default function Home() {
  return (
    <>
      <HomeHero />
      <PopularPicks />
      <ExploreGenres />
      <MeetTalent />
    </>
  )
}
