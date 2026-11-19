// Una ronda de Construye la Figura (ver lib/construyeFigura): cuadrícula en
// la que se pinta tocando o arrastrando (el primer toque decide si pinta o
// borra). Al corregir se dibuja el contorno contado como perímetro y, si
// falla, una figura que sí valía.
import { useState, useRef } from 'react'
import { useLang } from '../../context/LangContext'
import { bordes, valida, enunciado, pista, explicacion } from '../../lib/construyeFigura'

const C = 44 // lado de casilla en unidades del SVG

function Mini({ cells, color, titulo }) {
  const ps = cells.map(s => s.split(',').map(Number))
  const r0 = Math.min(...ps.map(p => p[0])), c0 = Math.min(...ps.map(p => p[1]))
  const alto = Math.max(...ps.map(p => p[0])) - r0 + 1, ancho = Math.max(...ps.map(p => p[1])) - c0 + 1
  const m = 14
  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`-2 -2 ${ancho * m + 4} ${alto * m + 4}`} style={{ width: ancho * m + 4, height: alto * m + 4 }}>
        {ps.map(([r, c]) => <rect key={`${r},${c}`} x={(c - c0) * m} y={(r - r0) * m} width={m} height={m} fill={color} stroke="#0f172a" strokeWidth="1" />)}
      </svg>
      {titulo && <p className="text-white/50 text-[11px] mt-1">{titulo}</p>}
    </div>
  )
}

export default function PreguntaFigura({ ronda: r, revelado, onResponder, mostrarArea = false }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [cells, setCells] = useState(() => new Set())
  const modo = useRef(null) // 'pinta' | 'borra' mientras se arrastra
  const svgRef = useRef(null)
  const n = r.n

  function casilla(e) {
    const box = svgRef.current.getBoundingClientRect()
    const c = Math.floor(((e.clientX - box.left) / box.width) * n)
    const f = Math.floor(((e.clientY - box.top) / box.height) * n)
    return f >= 0 && c >= 0 && f < n && c < n ? `${f},${c}` : null
  }
  function aplica(s) {
    if (!s) return
    setCells(prev => {
      const tiene = prev.has(s)
      if ((modo.current === 'pinta') === tiene) return prev
      const nx = new Set(prev)
      if (tiene) nx.delete(s); else nx.add(s)
      return nx
    })
  }
  function down(e) {
    if (revelado) return
    const s = casilla(e)
    if (!s) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    modo.current = cells.has(s) ? 'borra' : 'pinta'
    aplica(s)
  }
  function move(e) { if (modo.current && !revelado) aplica(casilla(e)) }
  function up() { modo.current = null }

  const lista = [...cells]
  const v = revelado ? valida(r, lista) : null
  const ok = v?.ok
  const relleno = !revelado ? '#f59e0b' : ok ? '#22c55e' : '#ef4444'

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 mb-3 text-center">
        <p className="text-white font-black text-lg leading-snug">{tr(enunciado(r))}</p>
        {r.tipo === 'otra' && (
          <div className="mt-2 flex justify-center">
            <Mini cells={r.muestra} color="#a78bfa" titulo={tr({ es: `Muestra · perímetro ${r.P0}`, en: `Sample · perimeter ${r.P0}`, ca: `Mostra · perímetre ${r.P0}` })} />
          </div>
        )}
        <p className="text-white/50 text-xs mt-1">💡 {tr(pista(r))}</p>
      </div>

      <div className="flex justify-center">
        <svg ref={svgRef} viewBox={`0 0 ${n * C} ${n * C}`} className="w-full max-w-[360px] select-none rounded-lg bg-white/[0.04]"
          style={{ touchAction: 'none' }}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}>
          {Array.from({ length: n * n }, (_, i) => {
            const f = Math.floor(i / n), c = i % n, s = `${f},${c}`
            return <rect key={s} x={c * C + 1} y={f * C + 1} width={C - 2} height={C - 2} rx="4"
              fill={cells.has(s) ? relleno : 'rgba(255,255,255,0.06)'} />
          })}
          {revelado && bordes(lista).map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1 * C} y1={y1 * C} x2={x2 * C} y2={y2 * C} stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      {!revelado ? (
        <>
          <p className="text-center text-white/40 text-xs mt-2 h-4">
            {mostrarArea && tr({ es: `Área: ${lista.length}`, en: `Area: ${lista.length}`, ca: `Àrea: ${lista.length}` })}
          </p>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <button type="button" onClick={() => setCells(new Set())}
              className="py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white/70 font-bold text-sm">
              {tr({ es: '🧽 Borrar', en: '🧽 Clear', ca: '🧽 Esborrar' })}
            </button>
            <button type="button" onClick={() => onResponder(lista)} disabled={!lista.length}
              className="col-span-2 py-3 rounded-xl bg-[#EDAE49] text-black font-black disabled:opacity-40">
              {tr({ es: '✓ Comprobar', en: '✓ Check', ca: '✓ Comprovar' })}
            </button>
          </div>
        </>
      ) : (
        <div className={`mt-3 rounded-xl px-3 py-2 border ${ok ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? tr({ es: '✓ ¡Figura correcta!', en: '✓ Correct shape!', ca: '✓ Figura correcta!' }) : tr({ es: '✗ Esta no vale', en: '✗ Not quite', ca: '✗ Aquesta no val' })}
          </p>
          <p className="text-white/75 text-xs text-center mt-0.5">
            {explicacion(r, lista, l)}
          </p>
          {!ok && (
            <div className="mt-2 flex justify-center">
              <Mini cells={r.ejemplo} color="#22c55e" titulo={tr({ es: 'Una que valía', en: 'One that works', ca: 'Una que valia' })} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
