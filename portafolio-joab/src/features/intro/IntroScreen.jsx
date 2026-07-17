import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, User, Globe, ArrowRight } from 'lucide-react'
import { PERSONAL } from '../../data/personalData'
import ParticlesBackground from '../../shared/components/ParticlesBackground'

const ICONS = [Code2, User, Globe]

export default function IntroScreen({ onEnter }) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 1600
    const tick = () => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / duration) * 100))
      setProgress(pct)
      if (pct < 100) requestAnimationFrame(tick)
      else setReady(true)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleEnter = () => {
    setLeaving(true)
    setTimeout(onEnter, 650)
  }

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] bg-(--color-bg) grid-bg flex flex-col items-center justify-center px-6"
        >
          <ParticlesBackground id="intro-particles" density={50} />
          <div className="absolute inset-0 bg-gradient-to-b from-(--color-bg)/40 via-transparent to-(--color-bg)" />

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              {ICONS.map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-11 w-11 place-items-center rounded-full border border-(--color-border) text-(--color-accent)"
                >
                  <Icon size={17} />
                </span>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              {!ready ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-mono text-xs tracking-[0.3em] text-(--color-text-dim) uppercase mb-5">
                    Cargando portafolio
                  </p>
                  <div className="w-56 sm:w-72 h-px bg-(--color-border) mx-auto relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-(--color-accent)"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="font-display text-4xl font-bold text-(--color-accent) mt-4 tabular-nums">
                    {progress}%
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono text-xs tracking-[0.3em] text-(--color-accent) uppercase mb-4">
                    Bienvenida
                  </p>
                  <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-[0.95] max-w-2xl">
                    Bienvenido a mi
                    <br />
                    <span className="text-gradient">portafolio web</span>
                  </h1>
                  <p className="mt-5 max-w-md mx-auto text-(--color-text-muted) italic">
                    "{PERSONAL.quotes[0]}"
                  </p>

                  <motion.button
                    onClick={handleEnter}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-(--color-accent) text-(--color-bg) px-7 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold"
                  >
                    Ir al portafolio
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="absolute bottom-8 font-mono text-[10px] tracking-widest text-(--color-text-dim)">
            joab.dev
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
