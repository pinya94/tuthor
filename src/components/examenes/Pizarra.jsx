// Pizarra para dibujar la imagen de una pregunta (un triángulo con sus lados,
// un circuito, una gráfica, una flecha sobre un mapa…). Guarda las figuras
// como una lista (vectores) y repinta el lienzo, así deshacer es quitar la
// última. Al terminar se exporta a PNG y se comprime (lib/imagenes.js).
//
// Opcionalmente, una foto de fondo para anotar encima.
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../context/LangContext'

const W = 1000, H = 625
const COLORES = ['#111827', '#dc2626', '#2563eb', '#16a34a', '#d97706']
const GROSORES = [3, 6, 10]
const HERRAMIENTAS = [
  ['lapiz', '✏️', { es: 'Lápiz', en: 'Pen', ca: 'Llapis' }],
  ['linea', '╱', { es: 'Línea', en: 'Line', ca: 'Línia' }],
  ['flecha', '➜', { es: 'Flecha', en: 'Arrow', ca: 'Fletxa' }],
  ['rect', '▭', { es: 'Rectángulo', en: 'Rectangle', ca: 'Rectangle' }],
  ['circulo', '◯', { es: 'Círculo', en: 'Circle', ca: 'Cercle' }],
  ['texto', 'T', { es: 'Texto', en: 'Text', ca: 'Text' }],
]

function pinta(ctx, f) {
  ctx.strokeStyle = f.color; ctx.fillStyle = f.color; ctx.lineWidth = f.grosor
  ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  if (f.tipo === 'lapiz') {
    ctx.beginPath()
    f.puntos.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
    ctx.stroke()
  } else if (f.tipo === 'linea' || f.tipo === 'flecha') {
    ctx.beginPath(); ctx.moveTo(f.x1, f.y1); ctx.lineTo(f.x2, f.y2); ctx.stroke()
    if (f.tipo === 'flecha') {
      const a = Math.atan2(f.y2 - f.y1, f.x2 - f.x1), L = 14 + f.grosor * 2
      ctx.beginPath()
      ctx.moveTo(f.x2, f.y2)
      ctx.lineTo(f.x2 - L * Math.cos(a - 0.45), f.y2 - L * Math.sin(a - 0.45))
      ctx.lineTo(f.x2 - L * Math.cos(a + 0.45), f.y2 - L * Math.sin(a + 0.45))
      ctx.closePath(); ctx.fill()
    }
  } else if (f.tipo === 'rect') {
    ctx.strokeRect(Math.min(f.x1, f.x2), Math.min(f.y1, f.y2), Math.abs(f.x2 - f.x1), Math.abs(f.y2 - f.y1))
  } else if (f.tipo === 'circulo') {
    ctx.beginPath()
    ctx.ellipse((f.x1 + f.x2) / 2, (f.y1 + f.y2) / 2, Math.abs(f.x2 - f.x1) / 2, Math.abs(f.y2 - f.y1) / 2, 0, 0, Math.PI * 2)
    ctx.stroke()
  } else if (f.tipo === 'texto') {
    ctx.font = `600 ${18 + f.grosor * 3}px system-ui, sans-serif`
    ctx.textBaseline = 'middle'
    ctx.fillText(f.texto, f.x1, f.y1)
  }
}

function dibujaTodo(ctx, figuras, { cuadricula, fondo }) {
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H)
  if (fondo) {
    const e = Math.min(W / fondo.width, H / fondo.height)
    const w = fondo.width * e, h = fondo.height * e
    ctx.drawImage(fondo, (W - w) / 2, (H - h) / 2, w, h)
  }
  if (cuadricula) {
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1
    for (let x = 0; x <= W; x += 25) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
    for (let y = 0; y <= H; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
  }
  figuras.forEach(f => pinta(ctx, f))
}

export default function Pizarra({ onGuardar, onCerrar }) {
  const { tr } = useLang()
  const ref = useRef(null)
  const [figuras, setFiguras] = useState([])
  const [actual, setActual] = useState(null)
  const [herr, setHerr] = useState('lapiz')
  const [color, setColor] = useState(COLORES[0])
  const [grosor, setGrosor] = useState(GROSORES[0])
  const [cuadricula, setCuadricula] = useState(false)
  const [texto, setTexto] = useState('')
  const [fondo, setFondo] = useState(null)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    const ctx = ref.current.getContext('2d')
    dibujaTodo(ctx, actual ? [...figuras, actual] : figuras, { cuadricula, fondo })
  }, [figuras, actual, cuadricula, fondo])

  const punto = e => {
    const r = ref.current.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H]
  }
  function abajo(e) {
    e.preventDefault()
    ref.current.setPointerCapture?.(e.pointerId)
    const [x, y] = punto(e)
    if (herr === 'texto') {
      if (texto.trim()) setFiguras(fs => [...fs, { tipo: 'texto', texto: texto.trim(), x1: x, y1: y, color, grosor }])
      return
    }
    setActual(herr === 'lapiz' ? { tipo: 'lapiz', puntos: [[x, y]], color, grosor } : { tipo: herr, x1: x, y1: y, x2: x, y2: y, color, grosor })
  }
  function mover(e) {
    if (!actual) return
    const [x, y] = punto(e)
    setActual(a => (a.tipo === 'lapiz' ? { ...a, puntos: [...a.puntos, [x, y]] } : { ...a, x2: x, y2: y }))
  }
  function arriba() {
    if (actual) setFiguras(fs => [...fs, actual])
    setActual(null)
  }

  function cargarFondo(file) {
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => setFondo(img)
    img.src = url
  }

  async function guardar() {
    setGuardando(true)
    try { await onGuardar(ref.current) } finally { setGuardando(false) }
  }

  const boton = activo => `px-2.5 py-1.5 rounded-lg text-[12px] font-bold border transition-colors ${activo ? 'bg-teal-600 border-teal-600 text-white' : 'border-white/15 text-white/70 hover:bg-white/10'}`

  return createPortal(
    <div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-2 sm:p-6" onClick={onCerrar}>
      <div className="w-full max-w-4xl rounded-2xl bg-[#141b2e] border border-white/10 p-3 sm:p-4" onClick={e => e.stopPropagation()}>
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {HERRAMIENTAS.map(([id, icono, nombre]) => (
            <button key={id} type="button" title={tr(nombre)} onClick={() => setHerr(id)} className={boton(herr === id)}>{icono} <span className="hidden sm:inline">{tr(nombre)}</span></button>
          ))}
          <span className="w-px h-6 bg-white/10 mx-1" />
          {COLORES.map(c => (
            <button key={c} type="button" onClick={() => setColor(c)} className={`w-7 h-7 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`} style={{ background: c }} aria-label={c} />
          ))}
          <span className="w-px h-6 bg-white/10 mx-1" />
          {GROSORES.map(g => (
            <button key={g} type="button" onClick={() => setGrosor(g)} className={boton(grosor === g)}>
              <span className="inline-block rounded-full bg-current align-middle" style={{ width: g + 2, height: g + 2 }} />
            </button>
          ))}
        </div>
        {herr === 'texto' && (
          <input value={texto} onChange={e => setTexto(e.target.value)} maxLength={60} autoFocus
            placeholder={tr({ es: 'Escribe el texto y toca la pizarra donde quieras ponerlo', en: 'Type the text and tap the board where you want it', ca: 'Escriu el text i toca la pissarra on el vulguis posar' })}
            className="w-full mb-2 bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-white text-[13px] outline-none focus:border-teal-500" />
        )}
        <canvas ref={ref} width={W} height={H} onPointerDown={abajo} onPointerMove={mover} onPointerUp={arriba} onPointerCancel={arriba}
          className="w-full rounded-lg touch-none cursor-crosshair bg-white" style={{ aspectRatio: `${W} / ${H}` }} />
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <button type="button" onClick={() => setFiguras(fs => fs.slice(0, -1))} disabled={!figuras.length} className={boton(false)}>↶ {tr({ es: 'Deshacer', en: 'Undo', ca: 'Desfer' })}</button>
          <button type="button" onClick={() => { setFiguras([]); setFondo(null) }} className={boton(false)}>{tr({ es: 'Borrar todo', en: 'Clear', ca: 'Esborrar tot' })}</button>
          <button type="button" onClick={() => setCuadricula(c => !c)} className={boton(cuadricula)}>▦ {tr({ es: 'Cuadrícula', en: 'Grid', ca: 'Quadrícula' })}</button>
          <label className={`${boton(!!fondo)} cursor-pointer`}>
            🖼️ {tr({ es: 'Dibujar sobre una foto', en: 'Draw on a photo', ca: 'Dibuixar sobre una foto' })}
            <input type="file" accept="image/*" className="hidden" onChange={e => cargarFondo(e.target.files?.[0])} />
          </label>
          <span className="flex-1" />
          <button type="button" onClick={onCerrar} className={boton(false)}>{tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' })}</button>
          <button type="button" onClick={guardar} disabled={guardando || (!figuras.length && !fondo)}
            className="px-4 py-1.5 rounded-lg text-[13px] font-black bg-[#EDAE49] text-black hover:bg-amber-400 disabled:opacity-40">
            {guardando ? tr({ es: 'Guardando…', en: 'Saving…', ca: 'Desant…' }) : tr({ es: 'Usar este dibujo', en: 'Use this drawing', ca: 'Fes servir aquest dibuix' })}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
