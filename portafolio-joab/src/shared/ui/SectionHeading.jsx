import Reveal from '../components/Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const isCenter = align === 'center'
  return (
    <div className={isCenter ? 'text-center mx-auto max-w-2xl' : ''}>
      <Reveal direction="up">
        <span className="font-mono text-xs tracking-[0.25em] text-(--color-accent) uppercase">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3">{title}</h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.14}>
          <p className={`mt-3 text-(--color-text-muted) leading-relaxed ${isCenter ? '' : 'max-w-xl'}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
