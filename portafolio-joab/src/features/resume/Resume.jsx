import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Award, Maximize2 } from 'lucide-react'
import SectionHeading from '../../shared/ui/SectionHeading'
import Reveal from '../../shared/components/Reveal'
import Lightbox from '../../shared/components/Lightbox'
import LazyImage from '../../shared/components/LazyImage'
import { EDUCATION, EXPERIENCE, CERTIFICATES } from '../../data/resumeData'

function TimelineBlock({ icon: Icon, label, items }) {
  return (
    <div>
      <Reveal direction="up">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-(--color-accent-soft) text-(--color-accent)">
            <Icon size={16} />
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted)">
            {label}
          </p>
        </div>
      </Reveal>
      <div className="relative pl-6 border-l border-(--color-border) space-y-8">
        {items.map((item, i) => (
          <Reveal key={item.id} direction="right" delay={i * 0.1} className="relative">
            <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-(--color-accent) ring-4 ring-(--color-bg)" />
            <p className="font-display font-semibold">{item.institution || item.company}</p>
            <p className="text-sm text-(--color-accent) font-mono mt-0.5">
              {item.program || item.role}
            </p>
            <p className="text-xs text-(--color-text-dim) mt-0.5">{item.period}</p>
            <p className="text-sm text-(--color-text-muted) mt-2 leading-relaxed">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function Resume() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="resume" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Currículum"
          title="Educación y experiencia"
          description="Mi recorrido de formación y las experiencias en las que he participado."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-14">
          <TimelineBlock icon={GraduationCap} label="Educación" items={EDUCATION} />
          <TimelineBlock icon={Briefcase} label="Experiencia" items={EXPERIENCE} />
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-(--color-accent-soft) text-(--color-accent)">
              <Award size={16} />
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-(--color-text-muted)">
              Certificaciones — click para ampliar
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTIFICATES.map((cert, i) => (
              <Reveal key={cert.id} direction="up" delay={Math.min(i * 0.06, 0.24)}>
                <motion.button
                  onClick={() => setSelected(cert)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="lazy-card group relative w-full aspect-[4/3] rounded-2xl overflow-hidden panel"
                >
                  <LazyImage
                    src={cert.image}
                    alt={cert.title}
                    thumbnail
                    maxDim={420}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-300 group-hover:scale-105"
                    fallback={
                      <>
                        <Award size={26} />
                        <span className="font-mono text-[11px] px-4 text-center">
                          Espacio para diploma
                        </span>
                      </>
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-sm font-medium">{cert.title}</p>
                  </div>
                  <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} />
                  </span>
                </motion.button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}