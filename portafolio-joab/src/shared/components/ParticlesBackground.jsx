import { useEffect, useRef } from 'react'

/**
 * Fondo de particulas en canvas: puntos flotantes conectados por lineas,
 * con una leve atraccion hacia el cursor. Sin dependencias externas.
 */
export default function ParticlesBackground({ id = 'particles', density = 55 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement
    let raf
    let particles = []
    const mouse = { x: -9999, y: -9999 }
    const colors = ['#ededef', '#c7c7cc', '#57575d']

    const resize = () => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      const count = Math.round((canvas.width * canvas.height) / 18000) + density * 0.3
      particles = Array.from({ length: Math.min(count, 110) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 130) {
          p.x -= dx * 0.006
          p.y -= dy * 0.006
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.55
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = '#ededef'
            ctx.globalAlpha = (1 - d / 120) * 0.15
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
    }
  }, [density])

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
    />
  )
}
