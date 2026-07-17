import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../../shared/ui/SectionHeading'
import Reveal from '../../shared/components/Reveal'
import Lightbox from '../../shared/components/Lightbox'
import LazyImage from '../../shared/components/LazyImage'
import ProjectCard from './components/ProjectCard'
import TechStackGrid from './components/TechStackGrid'
import { PROJECTS } from '../../data/projectsData'
import { CERTIFICATES } from '../../data/resumeData'
import { Award, Maximize2 } from 'lucide-react'

const TABS = [
  { id: 'projects', label: 'Proyectos' },
  { id: 'certificates', label: 'Certificados' },
  { id: 'techstack', label: 'Tech Stack' },
]

export default function PortfolioShowcase() {
  const [tab, setTab] = useState('projects')
  const [selected, setSelected] = useState(null)

  return (
    <section id="portfolio" className="relative py-28 px-6 grid-bg">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Portafolio"
          title="Explora mi trabajo"
          description="Proyectos, certificaciones y las tecnologías que uso para construirlos."
        />

        <Reveal direction="up" delay={0.15}>
          <div className="mt-10 max-w-full overflow-x-auto no-scrollbar">
            <div className="mx-auto flex w-fit gap-1 rounded-full glass-panel p-1.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative px-3.5 sm:px-5 py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider rounded-full transition-colors whitespace-nowrap"
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-(--color-accent)"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      tab === t.id ? 'text-(--color-bg) font-semibold' : 'text-(--color-text-muted)'
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            {tab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {PROJECTS.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </motion.div>
            )}

            {tab === 'certificates' && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {CERTIFICATES.map((cert, i) => (
                  <motion.button
                    key={cert.id}
                    onClick={() => setSelected(cert)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className="lazy-card group relative aspect-[4/3] rounded-2xl overflow-hidden panel"
                  >
                    <LazyImage
                      src={cert.image}
                      alt={cert.title}
                      thumbnail
                      maxDim={420}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-300 group-hover:scale-105"
                      fallback={
                        <>
                          <Award size={26} />
                          <span className="font-mono text-[11px] px-4 text-center">
                            Espacio para diploma
                          </span>
                        </>
                      }
                    />
                    <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={14} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-sm font-medium text-left">{cert.title}</p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {tab === 'techstack' && (
              <motion.div
                key="techstack"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <TechStackGrid />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}