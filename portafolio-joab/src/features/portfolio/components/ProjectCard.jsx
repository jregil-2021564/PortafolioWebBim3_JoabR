import { motion } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import LazyImage from '../../../shared/components/LazyImage'
import { useReveal } from '../../../shared/hooks/useReveal'

export default function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal(0.15)

  const content = (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="lazy-card group relative h-full rounded-2xl panel overflow-hidden flex flex-col"
    >
      <div className="aspect-video bg-(--color-surface-2) relative overflow-hidden">
        {project.images?.[0] ? (
          <LazyImage
            src={project.images[0]}
            alt={project.title}
            thumbnail
            maxDim={480}
            className="h-full w-full"
            imgClassName="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full grid place-items-center">
            <Code2 className="text-(--color-text-dim)" size={32} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-bg)/80 to-transparent pointer-events-none" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display font-semibold">{project.title}</p>
          <ArrowUpRight
            size={16}
            className="shrink-0 mt-1 text-(--color-text-dim) transition-all group-hover:text-(--color-text) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <p className="text-xs font-mono text-(--color-text-muted) mt-1">{project.subtitle}</p>
        <p className="text-sm text-(--color-text-muted) mt-2 line-clamp-2 flex-1">
          {project.description}
        </p>
        {project.tech.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-(--color-surface-2) border border-(--color-border) px-2 py-0.5 text-[10px] font-mono text-(--color-text-muted)"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 28 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.25) }}
      className="h-full"
    >
      {project.placeholder ? (
        <div className="opacity-60 cursor-not-allowed h-full">{content}</div>
      ) : (
        <Link to={`/proyecto/${project.id}`} className="block h-full">
          {content}
        </Link>
      )}
    </motion.div>
  )
}