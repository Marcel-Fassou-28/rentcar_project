import FooterSection from "../common/FooterSection"
import HeroSection from "../home/HeroSection"
import InciteSection from "../home/InciteSection"
import PresentationSection from "../home/PresentationSection"
import StatsSection from "../home/StatsSection"

function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <PresentationSection />
      <InciteSection />
    </div>
  )
}

export default Home