import { useEffect, useRef, useState } from 'react'

const MAX_RETRIES = 2
const RETRY_DELAY_MS = 500

const POSITION_CLASSES = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
}

/**
 * Imagen con loading="lazy", skeleton mientras carga, fallback para
 * espacios vacios, reintentos automaticos si la carga falla (sin tocar
 * la URL original — solo fuerza un nuevo intento del navegador), y
 * opcionalmente una miniatura generada en el navegador (canvas) despues
 * de cargar.
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  fallback,
  imgClassName = '',
  thumbnail = false,
  maxDim = 480,
  objectFit = 'cover',
  objectPosition = 'center',
  fill = true,
}) {
  const [status, setStatus] = useState('loading') // loading | loaded | error
  const [displaySrc, setDisplaySrc] = useState(src)
  const [attempt, setAttempt] = useState(0)
  const retriesRef = useRef(0)
  const isFirstRun = useRef(true)

  // Solo reinicia la carga cuando `src` REALMENTE cambia a otra imagen —
  // no en el montaje inicial (eso era lo que causaba el remount innecesario
  // que dejaba la imagen "perdida" justo despues de una transicion de pagina).
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    retriesRef.current = 0
    setDisplaySrc(src)
    setStatus('loading')
    setAttempt((a) => a + 1)
  }, [src])

  const handleLoad = (e) => {
    setStatus('loaded')
    if (!thumbnail) return

    const el = e.currentTarget
    // Se hace en el siguiente frame para no competir con el propio pintado
    requestAnimationFrame(() => {
      try {
        const { naturalWidth: w, naturalHeight: h } = el
        const scale = maxDim / Math.max(w, h)
        if (scale >= 1) return // la imagen ya es chica, no hace falta reducir

        const canvas = document.createElement('canvas')
        canvas.width = Math.round(w * scale)
        canvas.height = Math.round(h * scale)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(el, 0, 0, canvas.width, canvas.height)
        setDisplaySrc(canvas.toDataURL('image/jpeg', 0.78))
      } catch {
        // Si por lo que sea falla (formato raro, etc.), se queda con la
        // imagen original — nunca se rompe, solo no se optimiza.
      }
    })
  }

  const handleError = () => {
    if (retriesRef.current < MAX_RETRIES) {
      retriesRef.current += 1
      setTimeout(() => {
        // Fuerza a React a montar un <img> nuevo (misma URL original) para
        // que el navegador reintente la carga — sin alterar la URL.
        setAttempt((a) => a + 1)
      }, RETRY_DELAY_MS)
    } else {
      setStatus('error')
    }
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status !== 'error' && (
        <img
          key={attempt}
          src={displaySrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          data-loaded={status === 'loaded'}
          onLoad={handleLoad}
          onError={handleError}
          className={
            fill
              ? `img-fade h-full w-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${POSITION_CLASSES[objectPosition] ?? 'object-center'} ${imgClassName}`
              : `img-fade block w-full h-auto ${imgClassName}`
          }
        />
      )}

      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-(--color-surface-2)" />
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-(--color-text-dim)">
          {fallback}
        </div>
      )}
    </div>
  )
}