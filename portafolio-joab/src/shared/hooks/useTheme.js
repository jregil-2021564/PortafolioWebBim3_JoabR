import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('joab-theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('joab-theme', theme)
    } catch {
      /* localStorage no disponible — se ignora */
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}