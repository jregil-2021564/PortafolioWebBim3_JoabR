import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="relative flex h-8 w-[52px] shrink-0 items-center rounded-full border border-(--color-border) bg-(--color-surface-2) px-1 transition-colors"
    >
      <Sun
        size={13}
        className={`absolute left-1.5 transition-opacity ${isLight ? 'opacity-0' : 'opacity-40'}`}
      />
      <Moon
        size={13}
        className={`absolute right-1.5 transition-opacity ${isLight ? 'opacity-40' : 'opacity-0'}`}
      />
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className="grid h-6 w-6 place-items-center rounded-full bg-(--color-text) text-(--color-bg) shadow-sm"
        style={{ marginLeft: isLight ? 'auto' : 0 }}
      >
        {isLight ? <Sun size={13} /> : <Moon size={13} />}
      </motion.span>
    </button>
  )
}