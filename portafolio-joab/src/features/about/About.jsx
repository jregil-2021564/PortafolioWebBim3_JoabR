import { motion } from 'framer-motion'
import { Cake, MapPin, GraduationCap, Clock, Sparkles, Code2, Award, Globe } from 'lucide-react'
import Reveal from '../../shared/components/Reveal'
import SectionHeading from '../../shared/ui/SectionHeading'
import LazyImage from '../../shared/components/LazyImage'
import { PERSONAL } from '../../data/personalData'
import { PROJECTS } from '../../data/projectsData'
import { CERTIFICATES } from '../../data/resumeData'

const DATA_ROWS = [
  { icon: Cake, label: 'Edad', value: `${PERSONAL.age} años (${PERSONAL.birthDate})` },
  { icon: MapPin, label: 'Ubicación', value: PERSONAL.location },
  { icon: Clock, label: 'Programando', value: `${PERSONAL.yearsCoding}+ años` },
  {
    icon: GraduationCap,
    label: 'Formación actual',
    value: `${PERSONAL.school} — ${PERSONAL.program}`,
  },
]

const STATS = [
  { icon: Code2, label: 'Proyectos', value: PROJECTS.filter((p) => !p.placeholder).length },
  { icon: Award, label: 'Certificados', value: CERTIFICATES.length },
  { icon: Globe, label: 'Años programando', value: PERSONAL.yearsCoding },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sobre mí"
          title="Información acerca de mí"
          description="Un poco de contexto: quién soy, qué me mueve y hacia dónde voy."
        />

        <div className="mt-14 grid lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
          <div>
            <Reveal direction="up">
              <p className="text-lg leading-relaxed text-(--color-text)">{PERSONAL.bio}</p>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <div className="mt-6 rounded-2xl glass-panel p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-(--color-accent) mb-2">
                  Metas
                </p>
                <p className="text-(--color-text-muted) leading-relaxed">{PERSONAL.goals}</p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.14}>
              <div className="mt-6 flex flex-wrap gap-2">
                {PERSONAL.traits.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1.5 rounded-full border border-(--color-border) px-3.5 py-1.5 font-mono text-xs text-(--color-text-muted)"
                  >
                    <Sparkles size={12} className="text-(--color-accent)" />
                    {trait}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 italic text-(--color-text-muted) border-l-2 border-(--color-accent-2) pl-4">
                "{PERSONAL.quotes[1]}"
              </p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-3 gap-3">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} direction="up" delay={0.1 + i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl glass-panel p-5 text-left"
                  >
                    <stat.icon size={16} className="text-(--color-text-muted) mb-4" />
                    <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-(--color-text-dim) mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="left" delay={0.1}>
            <div>
              <div className="rounded-2xl overflow-hidden panel min-h-[220px] mb-6 border border-(--color-border) -mt-6 pt-6">
                <LazyImage
                  src={PERSONAL.aboutPhotoUrl}
                  alt={`${PERSONAL.name} ${PERSONAL.lastName}`}
                  className="w-full"
                  fill={false}
                  fallback={
                    <>
                      <GraduationCap size={28} />
                      <span className="font-mono text-[11px] px-6 text-center">
                        Espacio para tu foto
                      </span>
                    </>
                  }
                />
              </div>

              <div className="rounded-2xl glass-panel p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-(--color-accent) mb-5">
                  Datos generales
                </p>
                <ul className="space-y-5">
                  {DATA_ROWS.map(({ icon: Icon, label, value }, i) => (
                    <Reveal key={label} as="li" direction="right" delay={i * 0.06} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-(--color-accent-soft) text-(--color-accent)">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-(--color-text-dim)">
                          {label}
                        </p>
                        <p className="text-sm text-(--color-text) mt-0.5">{value}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}