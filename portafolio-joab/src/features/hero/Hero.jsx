import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Code2, User, Globe } from 'lucide-react'
import LanyardCard from './LanyardCard'
import ParticlesBackground from '../../shared/components/ParticlesBackground'
import Typewriter from '../../shared/components/Typewriter'
import { PERSONAL } from '../../data/personalData'

const BADGES = [Code2, User, Globe]

export default function Hero() {
  const [typed, setTyped] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-screen grid-bg flex items-start overflow-hidden pt-32 sm:pt-36 pb-16"
    >
      <ParticlesBackground id="hero-particles" density={45} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-bg) pointer-events-none" />

      <div className="relative mx-auto max-w-6xl w-full px-6 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 mb-7"
          >
            {BADGES.map((Icon, i) => (
              <span
                key={i}
                className="grid h-9 w-9 place-items-center rounded-full border border-(--color-border) text-(--color-text-muted)"
              >
                <Icon size={15} />
              </span>
            ))}
          </motion.div>

          <h1 className="font-display font-bold leading-[0.95] text-5xl sm:text-6xl lg:text-7xl min-h-[2.1em] sm:min-h-[1.95em]">
            <Typewriter
              lines={['Desarrollador', 'Full Stack']}
              speed={55}
              startDelay={300}
              onDone={() => setTyped(true)}
              className=""
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={typed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mt-3 font-mono text-sm text-(--color-text-dim)"
          >
            perito en informática_ · 6to. perito
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={typed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-xl text-(--color-text-muted) leading-relaxed"
          >
            {PERSONAL.bio}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={typed ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-xl italic text-(--color-text)/80 border-l-2 border-(--color-border) pl-4"
          >
            "{PERSONAL.quotes[0]}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={typed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={PERSONAL.cvUrl}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-accent) text-(--color-bg) px-6 py-3 font-medium text-sm transition-transform hover:scale-105 active:scale-95"
            >
              <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
              Descargar CV
            </a>
            <button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-(--color-border) px-6 py-3 font-medium text-sm text-(--color-text) transition-colors hover:border-(--color-text) hover:bg-(--color-surface)"
            >
              Ver proyectos
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LanyardCard />
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest text-(--color-text-dim) hover:text-(--color-text) transition-colors"
      >
        SCROLL
        <ArrowDown size={14} />
      </motion.button>
    </section>
  )
}
