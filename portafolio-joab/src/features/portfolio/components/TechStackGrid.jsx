import { TECH_STACK } from '../../../data/skillsData'

function Chip({ tech }) {
  return (
    <div className="mx-2.5 flex items-center gap-2.5 rounded-xl glass-panel border border-(--color-accent)/15 px-5 py-3.5 shrink-0">
      <iconify-icon icon={tech.icon} width="24" height="24" />
      <span className="font-mono text-xs text-(--color-text-muted) whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  )
}

export default function TechStackGrid() {
  const half = Math.ceil(TECH_STACK.length / 2)
  const rowA = TECH_STACK.slice(0, half)
  const rowB = TECH_STACK.slice(half)

  return (
    <div className="space-y-5">
      <div className="marquee-row overflow-hidden">
        <div className="marquee-track">
          {[...rowA, ...rowA].map((tech, i) => (
            <Chip key={`a-${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      <div className="marquee-row overflow-hidden">
        <div className="marquee-track marquee-track-reverse">
          {[...rowB, ...rowB].map((tech, i) => (
            <Chip key={`b-${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>

      <p className="text-center font-mono text-[10px] tracking-widest text-(--color-text-dim) pt-2">
        pasa el cursor para pausar
      </p>
    </div>
  )
}
