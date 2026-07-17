import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, ImagePlus, Heart, Pin, X } from 'lucide-react'

const STORAGE_KEY = 'joab-portfolio-comments'
const LIKES_KEY = 'joab-portfolio-liked'
const MAX_IMAGE_DIM = 480

const SEED = [
  {
    id: 1,
    name: 'Joab Regil',
    message: '¡Gracias por pasar por mi portafolio! Déjame un comentario si quieres 👋',
    date: new Date().toISOString(),
    likes: 2,
    pinned: true,
    image: null,
  },
]

function loadComments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : SEED
  } catch {
    return SEED
  }
}
function saveComments(comments) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
  } catch {
    /* localStorage no disponible — se ignora */
  }
}
function loadLiked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(LIKES_KEY) || '[]'))
  } catch {
    return new Set()
  }
}
function saveLiked(set) {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify([...set]))
  } catch {
    /* ignorado */
  }
}

// Reduce la imagen a un thumbnail liviano antes de guardarla en localStorage
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_DIM / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.72))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function avatarColor(name) {
  const palette = ['#3a3a3f', '#33313a', '#2f3238', '#3a3134']
  let hash = 0
  for (const ch of name) hash = (hash + ch.charCodeAt(0)) % palette.length
  return palette[hash]
}

export default function CommentsBoard() {
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(new Set())
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    setComments(loadComments())
    setLiked(loadLiked())
  }, [])

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await compressImage(file)
      setImagePreview(dataUrl)
    } catch {
      setError('No se pudo procesar la imagen.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Escribe tu nombre y un comentario antes de publicar.')
      return
    }
    const entry = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
      likes: 0,
      pinned: false,
      image: imagePreview,
    }
    const next = [entry, ...comments]
    setComments(next)
    saveComments(next)
    setName('')
    setMessage('')
    setImagePreview(null)
    setError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const toggleLike = (id) => {
    const nextLiked = new Set(liked)
    const next = comments.map((c) => {
      if (c.id !== id) return c
      const isLiked = nextLiked.has(id)
      if (isLiked) nextLiked.delete(id)
      else nextLiked.add(id)
      return { ...c, likes: Math.max(0, c.likes + (isLiked ? -1 : 1)) }
    })
    setLiked(nextLiked)
    setComments(next)
    saveLiked(nextLiked)
    saveComments(next)
  }

  const sorted = [...comments].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return (
    <div className="rounded-2xl panel p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted) mb-5">
        Deja un comentario
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface-2) px-4 py-2.5 focus-within:border-(--color-text)/40 transition-colors">
          <User size={14} className="text-(--color-text-dim) shrink-0" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            maxLength={60}
            className="w-full bg-transparent text-sm outline-none placeholder:text-(--color-text-dim)"
          />
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Comment"
          rows={4}
          maxLength={400}
          className="w-full rounded-xl border border-(--color-border) bg-(--color-surface-2) px-4 py-3 text-sm outline-none placeholder:text-(--color-text-dim) resize-none focus:border-(--color-text)/40 transition-colors"
        />

        {imagePreview ? (
          <div className="relative w-fit">
            <img src={imagePreview} alt="Vista previa" className="h-16 w-16 rounded-lg object-cover border border-(--color-border)" />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null)
                if (fileRef.current) fileRef.current.value = ''
              }}
              className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-(--color-bg) border border-(--color-border)"
            >
              <X size={11} />
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 rounded-xl border border-dashed border-(--color-border) px-4 py-2.5 text-xs font-mono text-(--color-text-muted) cursor-pointer hover:border-(--color-text)/30 transition-colors w-fit">
            <ImagePlus size={14} />
            Upload Image
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        )}

        {error && <p className="text-xs text-(--color-storm)">{error}</p>}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-(--color-accent) text-(--color-bg) px-5 py-3 font-mono text-xs uppercase tracking-widest font-semibold"
        >
          <Send size={14} /> Post Comment
        </motion.button>

        <p className="text-[11px] text-(--color-text-dim) leading-relaxed">
          
        </p>
      </form>

      <div className="mt-6 space-y-2.5 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
        <AnimatePresence initial={false}>
          {sorted.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-3 rounded-xl border border-(--color-border) bg-(--color-surface-2) p-3.5"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-display font-semibold text-sm text-(--color-text)"
                style={{ background: avatarColor(c.name) }}
              >
                {c.name.charAt(0).toUpperCase()}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="font-display font-semibold text-sm truncate">{c.name}</p>
                    {c.pinned && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-(--color-surface) border border-(--color-border) px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-(--color-text-dim)">
                        <Pin size={9} /> Pinned
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleLike(c.id)}
                    className={`flex items-center gap-1 font-mono text-[11px] shrink-0 transition-colors ${
                      liked.has(c.id) ? 'text-(--color-text)' : 'text-(--color-text-dim) hover:text-(--color-text-muted)'
                    }`}
                  >
                    <Heart size={12} fill={liked.has(c.id) ? 'currentColor' : 'none'} />
                    {c.likes}
                  </button>
                </div>
                <p className="text-sm text-(--color-text-muted) mt-1 leading-relaxed break-words">
                  {c.message}
                </p>
                {c.image && (
                  <img src={c.image} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover border border-(--color-border)" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
