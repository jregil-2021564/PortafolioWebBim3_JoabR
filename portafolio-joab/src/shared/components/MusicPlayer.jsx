import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music2, Play, Pause, Volume2, VolumeX, X } from 'lucide-react'
import { TRACKS } from '../../data/musicData'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    const onEnded = () => setPlaying(false) // no deberia dispararse por el loop, es solo respaldo
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  const currentTrack = TRACKS.find((t) => t.id === currentId)

  const playTrack = async (track) => {
    const audio = audioRef.current
    if (currentId === track.id) {
      // Ya es la cancion activa: solo pausa/reanuda
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        try {
          await audio.play()
          setPlaying(true)
        } catch {
          /* el navegador bloqueo el autoplay, se ignora */
        }
      }
      return
    }

    audio.src = track.src
    audio.loop = true
    setCurrentId(track.id)
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    audioRef.current.muted = !muted
    setMuted((m) => !m)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-2rem)]">
      <audio ref={audioRef} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[min(16rem,calc(100vw-2rem))] rounded-2xl panel border border-(--color-border) p-4 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-(--color-text-muted)">
                Música de fondo
              </p>
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Activar sonido' : 'Silenciar'}
                className="text-(--color-text-dim) hover:text-(--color-text) transition-colors"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>

            <div className="space-y-1.5">
              {TRACKS.map((track) => {
                const isActive = currentId === track.id
                return (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? 'bg-(--color-accent-soft) border border-(--color-accent)/30'
                        : 'hover:bg-(--color-surface-2) border border-transparent'
                    }`}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-(--color-surface-2) text-(--color-text)">
                      {isActive && playing ? <Pause size={13} /> : <Play size={13} />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{track.title}</p>
                      <p className="font-mono text-[10px] text-(--color-text-dim) truncate">
                        {track.artist}
                      </p>
                    </div>
                    {isActive && playing && (
                      <span className="ml-auto flex items-end gap-0.5 h-3">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-[3px] bg-(--color-accent) rounded-full"
                            animate={{ height: ['30%', '100%', '30%'] }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <p className="mt-3 font-mono text-[9px] text-(--color-text-dim) leading-relaxed">
              Estas son mis Top 3 canciones y por eso agregue este apartado.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Reproductor de música"
        className="relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-(--color-accent) text-(--color-bg) shadow-xl shadow-black/40"
      >
        {open ? (
          <X size={20} />
        ) : (
          <motion.span
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
          >
            <Music2 size={20} />
          </motion.span>
        )}
        {playing && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-(--color-storm) ring-2 ring-(--color-bg) animate-pulse" />
        )}
      </motion.button>
    </div>
  )
}