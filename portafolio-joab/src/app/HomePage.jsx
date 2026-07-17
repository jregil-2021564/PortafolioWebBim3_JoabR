import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../features/hero/Hero'
import About from '../features/about/About'
import Skills from '../features/skills/Skills'
import Resume from '../features/resume/Resume'
import PortfolioShowcase from '../features/portfolio/PortfolioShowcase'
import Contact from '../features/contact/Contact'

export default function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Si venimos de "Volver" en un proyecto (o de cualquier navegacion que
  // pida un scroll destino), esperamos a que el DOM exista y recien ahi
  // hacemos scroll — evita el bug de "aterrizar en inicio".
  useEffect(() => {
    const targetId = location.state?.scrollTo
    if (!targetId) return

    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        navigate(location.pathname, { replace: true, state: {} })
      } else if (attempts < 30) {
        attempts++
        requestAnimationFrame(tryScroll)
      }
    }
    requestAnimationFrame(tryScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Resume />
      <PortfolioShowcase />
      <Contact />
    </>
  )
}
