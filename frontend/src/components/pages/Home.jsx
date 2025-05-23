import HeroSection from "../home/HeroSection"
import InciteSection from "../home/InciteSection"
import PresentationSection from "../home/PresentationSection"

function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <PresentationSection />
      <InciteSection />
    </div>
  )
}

export default Home