import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FlowDiagram from './components/FlowDiagram'
import Benefits from './components/Benefits'
import HowItWorks from './components/HowItWorks'
import Offering from './components/Offering'
import Results from './components/Results'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FlowDiagram />
        <Benefits />
        <HowItWorks />
        <Offering />
        <Results />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
