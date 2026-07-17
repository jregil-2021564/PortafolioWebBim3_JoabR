import { useEffect, useState } from 'react'

/**
 * Escribe una lista de líneas letra por letra. Cada línea se revela
 * completa antes de pasar a la siguiente (sin borrar).
 */
export default function Typewriter({
  lines,
  speed = 45,
  startDelay = 200,
  lineDelay = 220,
  className = '',
  cursor = true,
  onDone,
}) {
  const [output, setOutput] = useState(lines.map(() => ''))
  const [lineIndex, setLineIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let charIndex = 0
    let timeoutId

    const typeChar = () => {
      const currentLine = lines[lineIndex]
      if (charIndex <= currentLine.length) {
        setOutput((prev) => {
          const next = [...prev]
          next[lineIndex] = currentLine.slice(0, charIndex)
          return next
        })
        charIndex++
        timeoutId = setTimeout(typeChar, speed)
      } else if (lineIndex < lines.length - 1) {
        timeoutId = setTimeout(() => setLineIndex((i) => i + 1), lineDelay)
      } else {
        setDone(true)
        onDone?.()
      }
    }

    timeoutId = setTimeout(typeChar, lineIndex === 0 ? startDelay : 0)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex])

  return (
    <span className={className}>
      {output.map((text, i) => (
        <span key={i} className="block">
          {text}
          {!done && i === lineIndex && cursor && (
            <span className="inline-block w-[3px] h-[0.85em] bg-current ml-1 align-middle animate-pulse" />
          )}
        </span>
      ))}
    </span>
  )
}
