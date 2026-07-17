import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Music2, Mail, Briefcase, ArrowUpRight } from 'lucide-react'
import SectionHeading from '../../shared/ui/SectionHeading'
import Reveal from '../../shared/components/Reveal'
import MessageForm from './MessageForm'
import CommentsBoard from './CommentsBoard'
import { SOCIALS, PERSONAL } from '../../data/personalData'

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  music: Music2,
  mail: Mail,
  briefcase: Briefcase,
}

function SocialIcon({ icon }) {
  if (icon === 'whatsapp') {
    return <iconify-icon icon="ri:whatsapp-fill" width="17" height="17" />
  }
  const Icon = ICONS[icon] ?? Mail
  return <Icon size={17} />
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-28 px-5 sm:px-6 grid-bg">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          align="center"
          eyebrow="Contacto"
          title="Hablemos"
          description="Escríbeme un mensaje directo, encuéntrame en mis redes, o deja un comentario en el portafolio."
        />

        {/* Mensaje directo */}
        <Reveal direction="up" delay={0.05}>
          <div className="mt-12 rounded-2xl panel p-5 sm:p-6 max-w-xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted) mb-5">
              Enviar mensaje
            </p>
            <MessageForm />
          </div>
        </Reveal>

        {/* Redes sociales */}
        <div className="mt-14">
          <Reveal direction="up">
            <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted) mb-5 text-center">
              Redes sociales
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {SOCIALS.map((social, i) => (
              <Reveal key={social.label} direction="up" delay={Math.min(i * 0.05, 0.25)}>
                <motion.a
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="group flex items-center gap-3 rounded-xl panel px-4 py-3.5 h-full"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-(--color-accent-soft) text-(--color-text)">
                    <SocialIcon icon={social.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{social.label}</p>
                    {social.pending && (
                      <p className="font-mono text-[9px] text-(--color-text-dim)">pendiente</p>
                    )}
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-(--color-text-dim) transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </motion.a>
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 text-center text-(--color-text-dim) font-mono text-[11px]">
              {PERSONAL.email} · {PERSONAL.phone}
            </p>
          </Reveal>
        </div>

        {/* Comentarios */}
        <div className="mt-16">
          <Reveal direction="up">
            <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted) mb-5 text-center">
              Comentarios
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <div className="max-w-2xl mx-auto">
              <CommentsBoard />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
