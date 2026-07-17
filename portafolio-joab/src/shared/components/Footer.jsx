import Reveal from './Reveal'

export default function Footer() {
  return (
    <Reveal
      as="footer"
      direction="up"
      amount={0.01}
      margin="0px"
      className="border-t border-(--color-border-soft) py-8 px-6"
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-(--color-text-dim)">
        <span>© {new Date().getFullYear()} Joab Regil. Todos los derechos reservados.</span>
        <span>Diseñado y desarrollado desde cero.</span>
      </div>
    </Reveal>
  )
}