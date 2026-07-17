import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

const OFFSETS = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.88 },
  fade: {},
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  className = '',
  amount = 0.15,
  margin = '0px 0px -80px 0px',
  as = 'div',
}) {
  const [ref, visible] = useReveal(amount, margin)
  const offset = OFFSETS[direction]
  const Component = typeof as === 'string' ? motion[as] : as

  return (
    <Component
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : offset.x ?? 0,
        y: visible ? 0 : offset.y ?? 0,
        scale: visible ? 1 : offset.scale ?? 1,
      }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}