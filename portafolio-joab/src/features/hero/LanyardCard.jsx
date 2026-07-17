import { useEffect, useRef } from 'react'
import { PERSONAL } from '../../data/personalData'

const SEGMENTS = 10
const SEG_LEN = 15
const GRAVITY = 0.55
const DAMPING = 0.98
const ITERATIONS = 6
const DROP_MS = 1000

export default function LanyardCard() {
  const stageRef = useRef(null)
  const anchorRef = useRef(null)
  const ropePathRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const anchorEl = anchorRef.current
    const cardEl = cardRef.current
    const ropePath = ropePathRef.current

    let cardW = 190
    let anchorX = stage.clientWidth / 2
    const anchorY = 6

    const resize = () => {
      cardW = Math.min(190, stage.clientWidth - 40)
      anchorX = stage.clientWidth / 2
      cardEl.style.width = cardW + 'px'
    }
    resize()

    // Todos los puntos arrancan pegados al ancla: la cuerda "cae" y se
    // despliega con la fisica en vez de aparecer ya extendida.
    let points = []
    for (let i = 0; i <= SEGMENTS; i++) {
      points.push({ x: anchorX, y: anchorY, oldx: anchorX, oldy: anchorY, pinned: i === 0 })
    }

    let dragging = false
    let dragOffsetX = 0
    let dragOffsetY = 0
    let pointerX = 0
    let pointerY = 0
    let cardRot = 0
    let cardRotVel = 0
    const startTime = performance.now()
    let raf

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const updatePhysics = (now) => {
      const dropT = Math.min(1, (now - startTime) / DROP_MS)
      const segLen = SEG_LEN * Math.max(0.02, easeOutCubic(dropT))
      const end = points[points.length - 1]

      if (dragging) {
        end.oldx = end.x
        end.oldy = end.y
        const rect = stage.getBoundingClientRect()
        end.x = pointerX - rect.left - dragOffsetX + cardW / 2
        end.y = pointerY - rect.top - dragOffsetY + 20
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        if (p.pinned) continue
        if (dragging && i === points.length - 1) continue
        const vx = (p.x - p.oldx) * DAMPING
        const vy = (p.y - p.oldy) * DAMPING
        p.oldx = p.x
        p.oldy = p.y
        p.x += vx
        p.y += vy + GRAVITY
      }

      points[0].x = anchorX
      points[0].y = anchorY

      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (let i = 0; i < points.length - 1; i++) {
          const a = points[i]
          const b = points[i + 1]
          if (dragging && i + 1 === points.length - 1) continue
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001
          const diff = (dist - segLen) / dist
          const offX = dx * 0.5 * diff
          const offY = dy * 0.5 * diff
          if (!a.pinned) {
            a.x += offX
            a.y += offY
          }
          b.x -= offX
          b.y -= offY
        }
        points[0].x = anchorX
        points[0].y = anchorY
      }

      const last = points[points.length - 1]
      const prev = points[points.length - 2]
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2
      const targetRot = angle * (180 / Math.PI) * 0.6

      if (!dragging) {
        const spring = (targetRot - cardRot) * 0.08
        cardRotVel = (cardRotVel + spring) * 0.85
        cardRot += cardRotVel
      } else {
        cardRot = targetRot * 0.5
      }
    }

    const render = () => {
      anchorEl.style.left = anchorX + 'px'
      anchorEl.style.top = anchorY + 'px'

      let d = `M ${points[0].x} ${points[0].y}`
      for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`
      ropePath.setAttribute('d', d)

      const last = points[points.length - 1]
      cardEl.style.left = last.x - cardW / 2 + 'px'
      cardEl.style.top = last.y + 'px'
      cardEl.style.transform = `rotate(${cardRot}deg)`
    }

    const loop = (now) => {
      updatePhysics(now)
      render()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onPointerDown = (e) => {
      dragging = true
      cardEl.setPointerCapture(e.pointerId)
      const rect = cardEl.getBoundingClientRect()
      dragOffsetX = e.clientX - rect.left
      dragOffsetY = e.clientY - rect.top
      pointerX = e.clientX
      pointerY = e.clientY
    }
    const onPointerMove = (e) => {
      if (!dragging) return
      pointerX = e.clientX
      pointerY = e.clientY
    }
    const onPointerUp = () => {
      dragging = false
    }
    const onResize = () => resize()

    cardEl.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      cardEl.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="w-full">
      <div ref={stageRef} className="relative w-full h-[380px] sm:h-[440px]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2]">
          <path ref={ropePathRef} fill="none" stroke="#232326" strokeWidth="2.5" />
        </svg>

        <div
          ref={anchorRef}
          className="absolute h-3 w-3 rounded-full bg-(--color-text) -translate-x-1/2 -translate-y-1/2 z-[3]"
          style={{ boxShadow: '0 0 0 4px rgba(237,237,239,0.08)' }}
        />

        <div
          ref={cardRef}
          className="absolute rounded-xl border-[6px] border-(--color-text) bg-black p-0 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.75)] cursor-grab touch-none select-none z-[4]"
          style={{ transformOrigin: 'top center' }}
        >
          <span
            className="absolute -top-9 left-[38%] -translate-x-1/2 rounded-[2px] border border-(--color-border) bg-(--color-bg-soft) px-1.5 py-1 font-mono text-[8px] tracking-[2px] text-(--color-text-muted) whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            3D CARD
          </span>
          <span
            className="absolute -top-9 left-[62%] -translate-x-1/2 rounded-[2px] border border-(--color-border) bg-(--color-bg-soft) px-1.5 py-1 font-mono text-[8px] tracking-[2px] text-(--color-text-muted) whitespace-nowrap"
            style={{ writingMode: 'vertical-rl' }}
          >
            3D CARD
          </span>

          <div className="aspect-[3/3.7] w-full overflow-hidden rounded-[7px]">
            <img
              src={PERSONAL.photoUrl}
              alt={PERSONAL.name}
              draggable={false}
              className="h-full w-full object-cover grayscale contrast-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'flex'
              }}
            />
            <div
              className="hidden h-full w-full items-center justify-center text-(--color-text-dim) font-mono text-[10px] tracking-widest"
              style={{ background: 'radial-gradient(circle at 35% 30%, #2c2c2f, #0e0e0f 70%)' }}
            >
              FOTO
            </div>
          </div>
        </div>
      </div>

      <p className="text-center font-mono text-[10px] tracking-widest text-(--color-text-dim) mt-2">
        arrastra el carnet — suéltalo y observa cómo se asienta
      </p>
    </div>
  )
}
