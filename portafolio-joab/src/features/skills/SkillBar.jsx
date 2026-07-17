import { motion } from 'framer-motion'
import { useReveal } from '../../shared/hooks/useReveal'

export default function SkillBar({ name, level, delay = 0 }) {
  const [ref, visible] = useReveal(0.3)

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm text-(--color-text)">{name}</span>
        <span className="font-mono text-xs text-(--color-accent)">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-(--color-surface-2) overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-(--color-accent) to-(--color-accent-2)"
          initial={{ width: 0 }}
          animate={{ width: visible ? `${level}%` : 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
