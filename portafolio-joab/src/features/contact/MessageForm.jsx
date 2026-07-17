import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { User, Mail, MessageSquare, Send, Check, AlertCircle } from 'lucide-react'
import { PERSONAL } from '../../data/personalData'
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../../data/emailjsConfig'

export default function MessageForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    if (!isEmailJSConfigured()) {
      // Respaldo: EmailJS todavia no configurado -> abre el correo directamente
      const subject = encodeURIComponent(`Contacto desde el portafolio — ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email || 'sin correo'})`)
      window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: name,
          from_email: email || 'No proporcionado',
          message,
          to_email: PERSONAL.email,
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      )
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface-2) px-4 py-3 focus-within:border-(--color-text)/40 transition-colors">
        <User size={15} className="text-(--color-text-dim) shrink-0" />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          maxLength={60}
          required
          className="w-full bg-transparent text-sm outline-none placeholder:text-(--color-text-dim)"
        />
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface-2) px-4 py-3 focus-within:border-(--color-text)/40 transition-colors">
        <Mail size={15} className="text-(--color-text-dim) shrink-0" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full bg-transparent text-sm outline-none placeholder:text-(--color-text-dim)"
        />
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-(--color-border) bg-(--color-surface-2) px-4 py-3 focus-within:border-(--color-text)/40 transition-colors">
        <MessageSquare size={15} className="text-(--color-text-dim) shrink-0 mt-0.5" />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          rows={5}
          maxLength={500}
          required
          className="w-full bg-transparent text-sm outline-none placeholder:text-(--color-text-dim) resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-(--color-accent) text-(--color-bg) px-5 py-3 font-mono text-xs uppercase tracking-widest font-semibold disabled:opacity-60"
      >
        {status === 'sending' ? (
          'Enviando…'
        ) : status === 'sent' ? (
          <>
            <Check size={14} /> Enviado
          </>
        ) : (
          <>
            <Send size={14} /> Send Message
          </>
        )}
      </motion.button>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-xs text-(--color-storm)">
          <AlertCircle size={13} /> No se pudo enviar. Intenta de nuevo o escribe directo a {PERSONAL.email}.
        </p>
      )}

      {!isEmailJSConfigured() && (
        <p className="flex items-start gap-2 rounded-lg border border-(--color-storm)/30 bg-(--color-storm)/10 px-3 py-2.5 text-[11px] text-(--color-text-muted) leading-relaxed">
          <AlertCircle size={13} className="text-(--color-storm) shrink-0 mt-0.5" />
          EmailJS aún no está configurado, así que este formulario solo abre tu correo (no llega
          automático). Sigue los pasos de <span className="font-mono">src/data/emailjsConfig.js</span> para
          que los mensajes te lleguen directo a {PERSONAL.email}.
        </p>
      )}

      {isEmailJSConfigured() && (
        <p className="text-[11px] text-(--color-text-dim) leading-relaxed">
          El mensaje llega directo a {PERSONAL.email} mediante EmailJS.
        </p>
      )}
    </form>
  )
}
