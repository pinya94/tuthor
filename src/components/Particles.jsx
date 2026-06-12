import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.5 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -Math.random() * 0.3 - 0.05,
        alpha: Math.random(),
        alphaDir: Math.random() > 0.5 ? 0.008 : -0.008,
        hue: Math.random() > 0.5 ? 60 : 100,
      })
    }
    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grd.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.alpha})`)
        grd.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 90%, ${p.alpha})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        p.alpha += p.alphaDir
        if (p.alpha > 1 || p.alpha < 0) p.alphaDir *= -1
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = { x: Math.random() * canvas.width, y: canvas.height + 5, r: Math.random() * 2.5 + 1, dx: (Math.random() - 0.5) * 0.4, dy: -Math.random() * 0.3 - 0.05, alpha: Math.random(), alphaDir: Math.random() > 0.5 ? 0.008 : -0.008, hue: Math.random() > 0.5 ? 60 : 100 }
        }
      })
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
