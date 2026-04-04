import { useState, lazy, Suspense } from 'react'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'

// Below-fold sections loaded lazily — browser only parses+executes
// these JS chunks AFTER the hero is visible, cutting initial parse time.
const ServicesSection    = lazy(() => import('./sections/ServicesSection'))
const ProcessSection     = lazy(() => import('./sections/ProcessSection'))
const StatsSection       = lazy(() => import('./sections/StatsSection'))
const ProjectsSection    = lazy(() => import('./sections/ProjectsSection'))
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'))
const ContactSection     = lazy(() => import('./sections/ContactSection'))
const Footer             = lazy(() => import('./components/Footer'))

// Lightweight placeholder while lazy chunk loads (invisible, matches bg)
const SectionFallback = () => (
    <div style={{ minHeight: '60vh', background: '#050505' }} />
)

function App() {
    const [introComplete, setIntroComplete] = useState(false)

    return (
        <>
            <IntroAnimation onComplete={() => setIntroComplete(true)} />
            <Navbar visible={introComplete} />
            <main>
                {/* Hero loads eagerly — immediately visible after intro */}
                <HeroSection />

                {/* Everything below is lazy — deferred until after first paint */}
                <Suspense fallback={<SectionFallback />}>
                    <ServicesSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <ProcessSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <StatsSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <ProjectsSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <TestimonialsSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <ContactSection />
                </Suspense>
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            </main>
        </>
    )
}

export default App
