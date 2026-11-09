import { useContext } from 'react'
import { GamesContext } from '../../../context/GamesContext'
import Hero from './Hero'
import FeatureSection from './FeatureSection'
import Content from './Content'
import Plataformas from './Plataformas'
import StatsBar from './StatsBar'
import Reseñas from './Reseñas'
import Newsletter from './Newsletter'

export default function Home() {
  const { activeSearch } = useContext(GamesContext);

  if (activeSearch) {
    return (
      <div className="pt-24 min-h-[80vh]">
        <Content />
      </div>
    )
  }

  return (
    <>
      <Hero />
      <FeatureSection />
      <Content />
      <Plataformas />
      {/* <StatsBar />
      <Reseñas />
      <Newsletter /> */}
    </>
  )
}
