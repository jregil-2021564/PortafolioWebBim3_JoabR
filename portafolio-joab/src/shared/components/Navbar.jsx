import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { id: 'home', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'resume', label: 'Currículum' },
  { id: 'portfolio', label: 'Portafolio' },
  { id: 'contact', label: 'Contacto' },
]

// Espera (frame a frame) a que todas las secciones existan en el DOM antes
// de armar el observer — evita la condicion de carrera cuando venimos de
// una transicion de pagina y el nuevo contenido todavia no monto.
function waitForSections(onReady) {
  let raf
  let attempts = 0
  const tick = () => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (sections.length >= LINKS.length || attempts > 60) {
      onReady(sections)
    } else {
      attempts++
      raf = requestAnimationFrame(tick)
    }
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    let observer
    const cancelWait = waitForSections((sections) => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id)
          })
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      )
      sections.forEach((s) => observer.observe(s))
    })

    return () => {
      cancelWait()
      observer?.disconnect()
    }
    // location.key cambia en cada navegacion (incluso hacia la misma ruta),
    // asi que esto se re-arma cada vez que volvemos a "/".
  }, [isHome, location.key])

  const goTo = (id) => {
    setOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-5 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled ? 'glass-panel py-2.5 px-5 shadow-lg shadow-black/30' : ''
        }`}
      >
        <Link
          to="/"
          className="font-mono text-sm tracking-widest text-(--color-text) hover:text-(--color-accent) transition-colors"
        >
          joab<span className="text-(--color-accent)">.dev</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-wider">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              className={`relative py-1 transition-colors ${
                active === link.id && isHome
                  ? 'text-(--color-accent)'
                  : 'text-(--color-text-muted) hover:text-(--color-text)'
              }`}
            >
              {link.label}
              {active === link.id && isHome && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-(--color-accent)"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
  <ThemeToggle />
  <button
    onClick={() => setOpen((o) => !o)}
    className="md:hidden p-2 text-(--color-text)"
    aria-label="Abrir menú"
  >
    {open ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 overflow-hidden glass-panel rounded-2xl"
          >
            <div className="flex flex-col p-4 gap-1 font-mono text-sm uppercase tracking-wider">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => goTo(link.id)}
                  className={`text-left py-2.5 px-2 rounded-lg transition-colors ${
                    active === link.id && isHome
                      ? 'text-(--color-accent) bg-(--color-accent-soft)'
                      : 'text-(--color-text-muted) hover:text-(--color-text)'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
