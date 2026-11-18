import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Hero } from '../sections/Hero'
import { Process } from '../sections/Process'
import { Services } from '../sections/Services'
import { Stack } from '../sections/Stack'
import { Vision } from '../sections/Vision'
import { Work } from '../sections/Work'
import { BackToTop } from '../components/BackToTop'
import { IntroLoader } from '../components/IntroLoader'
import { PointerHalo } from '../components/PointerHalo'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <IntroLoader />
      <PointerHalo />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <About />
        <Stack />
        <Work />
        <Services />
        <Process />
        <Vision />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
