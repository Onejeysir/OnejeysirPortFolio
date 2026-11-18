import { useEffect } from 'react'

export function PointerHalo() {
  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!media.matches) return
    const cursor = document.querySelector<HTMLElement>('.cursor-halo')
    if (!cursor) return
    let frame = 0
    let x = -100
    let y = -100

    const move = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
        frame = 0
      })
    }
    const hover = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('a, button, input, textarea, select, [role="button"]')) cursor.classList.add('is-hovering')
      else cursor.classList.remove('is-hovering')
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', hover, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="cursor-halo" aria-hidden="true" />
}
