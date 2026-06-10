import { BookingProvider } from './booking'
import { LangProvider } from './i18n'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import BeforeAfter from './components/BeforeAfter'
import Experience from './components/Experience'
import Team from './components/Team'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import MobileCtaBar from './components/MobileCtaBar'
import BookingModal from './components/BookingModal'

export default function App() {
  return (
    <LangProvider>
      <BookingProvider>
        <Header />
        <main>
          <Hero />
          <Stats />
          <Services />
          <HowItWorks />
          <BeforeAfter />
          <Experience />
          <Team />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <MobileCtaBar />
        <BookingModal />
      </BookingProvider>
    </LangProvider>
  )
}
