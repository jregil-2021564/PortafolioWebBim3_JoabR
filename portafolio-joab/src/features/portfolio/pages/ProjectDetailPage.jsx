import { useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, Globe, Code2, ListChecks, ImageOff } from 'lucide-react'
import LazyImage from '../../../shared/components/LazyImage'
import { PROJECTS } from '../../../data/projectsData'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!project) return <Navigate to="/" replace />

  const goBack = () => navigate('/', { state: { scrollTo: 'portfolio' } })

  return (
    <main className="relative min-h-screen grid-bg pt-32 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-(--color-text-muted) hover:text-(--color-accent) transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Volver
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-(--color-accent)">
              Project Portafolio
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mt-3">{project.title}</h1>
            <p className="text-(--color-accent) font-mono text-sm mt-2">{project.subtitle}</p>

            <p className="mt-6 text-(--color-text-muted) leading-relaxed">{project.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl glass-panel p-4 flex items-center gap-3">
                <Code2 size={18} className="text-(--color-accent)" />
                <div>
                  <p className="font-display font-bold text-xl">{project.tech.length}</p>
                  <p className="font-mono text-[10px] uppercase text-(--color-text-dim)">
                    Tecnologías
                  </p>
                </div>
              </div>
              <div className="rounded-2xl glass-panel p-4 flex items-center gap-3">
                <ListChecks size={18} className="text-(--color-accent)" />
                <div>
                  <p className="font-display font-bold text-xl">{project.features.length}</p>
                  <p className="font-mono text-[10px] uppercase text-(--color-text-dim)">
                    Funciones clave
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.repoUrl ?? '#'}
                target={project.repoUrl ? '_blank' : undefined}
                rel="noreferrer"
                aria-disabled={!project.repoUrl}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  project.repoUrl
                    ? 'border-(--color-border) hover:border-(--color-accent) hover:text-(--color-accent)'
                    : 'border-(--color-border-soft) text-(--color-text-dim) cursor-not-allowed'
                }`}
              >
                <Github size={14} /> {project.repoUrl ? 'Repositorio' : 'Sin repositorio'}
              </a>
              <a
                href={project.demoUrl ?? '#'}
                target={project.demoUrl ? '_blank' : undefined}
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  project.demoUrl
                    ? 'bg-(--color-accent) text-(--color-bg) hover:scale-105'
                    : 'border border-(--color-border-soft) text-(--color-text-dim) cursor-not-allowed'
                }`}
              >
                <Globe size={14} /> {project.demoUrl ? 'Ver demo' : 'Sin demo'}
              </a>
            </div>

            {project.features.length > 0 && (
              <div className="mt-10">
                <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted) mb-4">
                  Key Features
                </p>
                <ul className="space-y-2.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-(--color-text)">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-(--color-accent) shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.tech.length > 0 && (
              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted) mb-4">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-(--color-border) bg-(--color-surface-2) px-3.5 py-1.5 text-xs font-mono text-(--color-text-muted)"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {project.images.length > 0 ? (
              project.images.map((img) => (
                <div key={img} className="rounded-2xl overflow-hidden panel">
                  <LazyImage src={img} alt={project.title} className="w-full aspect-video" />
                </div>
              ))
            ) : (
              <div className="rounded-2xl panel aspect-video flex flex-col items-center justify-center gap-3 text-(--color-text-dim)">
                <ImageOff size={28} />
                <p className="font-mono text-xs text-center px-6">
                  Capturas del proyecto pendientes de agregar
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}