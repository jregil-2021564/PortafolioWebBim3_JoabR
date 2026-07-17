import { motion } from 'framer-motion'
import SectionHeading from '../../shared/ui/SectionHeading'
import Reveal from '../../shared/components/Reveal'
import SkillBar from './SkillBar'
import { LANGUAGES, FRAMEWORKS, TOOLS } from '../../data/skillsData'

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 grid-bg">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Habilidades"
          title="Lo que domino"
          description="Lenguajes, frameworks y herramientas con las que trabajo día a día."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <Reveal direction="up">
            <div className="rounded-2xl glass-panel p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-(--color-accent) mb-6">
                Lenguajes
              </p>
              {LANGUAGES.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 0.06} />
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <div className="rounded-2xl glass-panel p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-(--color-accent) mb-6">
                Frameworks &amp; Bases de datos
              </p>
              {FRAMEWORKS.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={i * 0.06} />
              ))}

              <p className="font-mono text-xs uppercase tracking-widest text-(--color-accent) mt-8 mb-4">
                Herramientas
              </p>
              <div className="flex flex-wrap gap-2.5">
                {TOOLS.map((tool, i) => (
                  <Reveal key={tool} as="span" direction="up" delay={i * 0.05} duration={0.4}>
                    <motion.span
                      whileHover={{ y: -3, borderColor: 'var(--color-accent)' }}
                      className="block rounded-lg border border-(--color-border) bg-(--color-surface-2) px-3.5 py-2 text-xs font-mono text-(--color-text-muted)"
                    >
                      {tool}
                    </motion.span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
