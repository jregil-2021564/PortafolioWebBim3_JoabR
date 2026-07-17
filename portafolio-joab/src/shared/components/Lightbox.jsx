import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Lightbox({ item, onClose }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = item ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
        >
          <motion.button
            onClick={onClose}
            whileHover={{ rotate: 90 }}
            className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-full border border-(--color-border) text-(--color-text) hover:text-(--color-text) hover:border-(--color-text)"
            aria-label="Cerrar"
          >
            <X size={18} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full rounded-2xl overflow-hidden panel"
          >
            <div className="aspect-[4/3] bg-(--color-surface-2) grid place-items-center overflow-hidden relative">
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-(--color-surface-2)" />
              )}
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                decoding="async"
                onLoad={() => setLoaded(true)}
                data-loaded={loaded}
                className="img-fade relative h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'flex'
                }}
              />
              <div className="hidden h-full w-full flex-col items-center justify-center gap-2 text-(--color-text-dim) font-mono text-xs">
                Imagen pendiente de subir
              </div>
            </div>
            <div className="p-5">
              <p className="font-display font-semibold">{item.title}</p>
              {item.issuer && (
                <p className="text-sm text-(--color-text-muted) mt-1">{item.issuer}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
