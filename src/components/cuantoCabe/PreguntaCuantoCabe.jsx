// Una ronda de ¿Cuánto Cabe? (ver lib/cuantoCabe): el cuerpo dibujado con sus
// medidas y un teclado para escribir el resultado. Los dibujos no van a
// escala (lo dice el pie): las medidas son las de las etiquetas.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, esCorrecta, explicacion, usaPi } from '../../lib/cuantoCabe'

const W = 320, H = 210
const LAB = { fontSize: 15, fontWeight: 900, fill: '#fde68a', stroke: '#0b1530', strokeWidth: 4, paintOrder: 'stroke' }
const pts = arr => arr.map(p => p.join(',')).join(' ')

function Cubitos({ a, b, c }) {
  const s = Math.min(26, 150 / (a + b), 120 / c)
  const P = (x, y, z) => [(x - y) * s * 0.866, (x + y) * s * 0.5 - z * s]
  const cubos = []
  for (let x = 0; x < a; x++) for (let y = 0; y < b; y++) for (let z = 0; z < c; z++) cubos.push([x, y, z])
  cubos.sort((p, q) => p[0] + p[1] - (q[0] + q[1]) || p[2] - q[2])
  const todos = [P(0, 0, 0), P(a, 0, 0), P(0, b, 0), P(a, b, 0), P(0, 0, c), P(a, b, c), P(a, 0, c), P(0, b, c)]
  const minX = Math.min(...todos.map(p => p[0])), maxX = Math.max(...todos.map(p => p[0]))
  const minY = Math.min(...todos.map(p => p[1])), maxY = Math.max(...todos.map(p => p[1]))
  const dx = (W - (maxX - minX)) / 2 - minX, dy = (H - (maxY - minY)) / 2 - minY
  return (
    <g transform={`translate(${dx} ${dy})`}>
      {cubos.map(([x, y, z]) => (
        <g key={`${x}${y}${z}`} stroke="#0b1530" strokeWidth="1.2" strokeLinejoin="round">
          <polygon points={pts([P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)])} fill="#38bdf8" />
          <polygon points={pts([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)])} fill="#0ea5e9" />
          <polygon points={pts([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)])} fill="#7dd3fc" />
        </g>
      ))}
    </g>
  )
}

function Ortoedro({ a, b, c }) {
  // Caja fija (no a escala) con sus tres medidas
  const P = (x, y, z) => [160 + (x - y) * 0.866, 120 + (x + y) * 0.5 - z]
  const A = 120, B = 80, C = 80
  return (
    <g strokeLinejoin="round">
      <polygon points={pts([P(0, B, 0), P(A, B, 0), P(A, B, C), P(0, B, C)])} fill="#a78bfa" stroke="#0b1530" strokeWidth="2" />
      <polygon points={pts([P(A, 0, 0), P(A, B, 0), P(A, B, C), P(A, 0, C)])} fill="#7c3aed" stroke="#0b1530" strokeWidth="2" />
      <polygon points={pts([P(0, 0, C), P(A, 0, C), P(A, B, C), P(0, B, C)])} fill="#c4b5fd" stroke="#0b1530" strokeWidth="2" />
      <text x={P(A / 2, B, 0)[0] - 6} y={P(A / 2, B, 0)[1] + 22} textAnchor="middle" {...LAB}>{a} cm</text>
      <text x={P(A, B / 2, 0)[0] + 30} y={P(A, B / 2, 0)[1] + 18} textAnchor="middle" {...LAB}>{b} cm</text>
      <text x={P(A, B, C / 2)[0] + 34} y={P(A, B, C / 2)[1] + 4} textAnchor="middle" {...LAB}>{c} cm</text>
    </g>
  )
}

function Cilindro({ r, h }) {
  return (
    <g>
      <path d="M90 50V160A70 18 0 0 0 230 160V50" fill="#34d399" stroke="#0b1530" strokeWidth="2" />
      <ellipse cx="160" cy="50" rx="70" ry="18" fill="#6ee7b7" stroke="#0b1530" strokeWidth="2" />
      <path d="M90 160A70 18 0 0 1 230 160" fill="none" stroke="#0b1530" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d="M160 50H230" stroke="#0b1530" strokeWidth="2.5" />
      <circle cx="160" cy="50" r="3" fill="#0b1530" />
      <text x="195" y="27" textAnchor="middle" {...LAB}>r = {r}</text>
      <path d="M248 50V160" stroke="#fde68a" strokeWidth="2" markerStart="url(#fl)" markerEnd="url(#fl)" />
      <text x="282" y="110" textAnchor="middle" {...LAB}>h = {h}</text>
    </g>
  )
}

function Cono({ r, h, g }) {
  return (
    <g>
      <path d="M160 30L90 165A70 18 0 0 0 230 165Z" fill="#fb923c" stroke="#0b1530" strokeWidth="2" strokeLinejoin="round" />
      <path d="M90 165A70 18 0 0 1 230 165" fill="none" stroke="#0b1530" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d="M160 30V165" stroke="#0b1530" strokeWidth="1.8" strokeDasharray="5 4" />
      <path d="M160 165H230" stroke="#0b1530" strokeWidth="2.5" />
      <text x="195" y="192" textAnchor="middle" {...LAB}>r = {r}</text>
      <text x="138" y="110" textAnchor="middle" {...LAB}>h = {h}</text>
      {g && <text x="226" y="96" textAnchor="middle" {...LAB}>g = {g}</text>}
    </g>
  )
}

function Piramide({ l, h }) {
  const P = (x, y, z) => [160 + (x - y) * 0.866, 150 + (x + y) * 0.5 - z]
  const L = 100, ap = P(L / 2, L / 2, 120)
  return (
    <g strokeLinejoin="round">
      <polygon points={pts([P(0, L, 0), P(L, L, 0), ap])} fill="#f472b6" stroke="#0b1530" strokeWidth="2" />
      <polygon points={pts([P(L, 0, 0), P(L, L, 0), ap])} fill="#db2777" stroke="#0b1530" strokeWidth="2" />
      <path d={`M${P(L / 2, L / 2, 0).join(' ')}L${ap.join(' ')}`} stroke="#0b1530" strokeWidth="1.8" strokeDasharray="5 4" />
      <text x={P(L / 2, L, 0)[0] - 6} y={P(L / 2, L, 0)[1] + 22} textAnchor="middle" {...LAB}>l = {l}</text>
      <text x={ap[0] + 28} y={ap[1] + 70} textAnchor="middle" {...LAB}>h = {h}</text>
    </g>
  )
}

function Esfera({ r }) {
  return (
    <g>
      <circle cx="160" cy="105" r="85" fill="#60a5fa" stroke="#0b1530" strokeWidth="2" />
      <ellipse cx="160" cy="105" rx="85" ry="20" fill="none" stroke="#0b1530" strokeWidth="1.5" strokeDasharray="5 4" />
      <path d="M160 105H245" stroke="#0b1530" strokeWidth="2.5" />
      <circle cx="160" cy="105" r="3" fill="#0b1530" />
      <text x="202" y="96" textAnchor="middle" {...LAB}>r = {r}</text>
    </g>
  )
}

export function Cuerpo({ r }) {
  const m = r.m
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block select-none" role="img" aria-label={r.cuerpo}>
      <defs><marker id="fl" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#fde68a" /></marker></defs>
      {r.cuerpo === 'cubitos' && <Cubitos {...m} />}
      {r.cuerpo === 'ortoedro' && <Ortoedro {...m} />}
      {r.cuerpo === 'cilindro' && <Cilindro {...m} />}
      {r.cuerpo === 'cono' && <Cono {...m} />}
      {r.cuerpo === 'piramide' && <Piramide {...m} />}
      {r.cuerpo === 'esfera' && <Esfera {...m} />}
    </svg>
  )
}

export default function PreguntaCuantoCabe({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [valor, setValor] = useState('')
  const acierto = revelado && esCorrecta(r, valor)
  const tecla = t => { if (revelado) return; setValor(v => (t === '⌫' ? v.slice(0, -1) : v.length < 7 ? v + t : v)) }
  const unidad = r.magnitud === 'V' ? 'cm³' : 'cm²'

  return (
    <div className="w-full">
      <p className="text-center font-bold text-white mb-2 leading-snug min-h-[3rem] flex items-center justify-center">{enunciado(r, l)}</p>
      <div className="rounded-2xl border border-white/10 bg-[#0b1530] overflow-hidden">
        <Cuerpo r={r} />
      </div>
      <p className="text-center text-white/35 text-[11px] mt-1 mb-2">
        {r.cuerpo === 'cubitos'
          ? tr({ es: 'Cuenta también los cubitos que no se ven: la caja está llena.', en: 'Count the hidden cubes too: the box is full.', ca: 'Compta també els cubets que no es veuen: la caixa és plena.' })
          : tr({ es: 'Medidas en cm. El dibujo no está a escala.', en: 'Measurements in cm. The drawing is not to scale.', ca: 'Mesures en cm. El dibuix no és a escala.' })}
      </p>

      <div className={`rounded-xl border px-3 py-2 mb-2 flex items-center justify-between ${revelado ? (acierto ? 'border-green-500/60 bg-green-500/10' : 'border-red-500/60 bg-red-500/10') : 'border-white/20 bg-[#0d1117]'}`}>
        <span className="text-white/40 text-sm">{r.magnitud === 'V' ? 'V' : r.magnitud === 'A' ? 'A' : 'AL'} =</span>
        <span className="text-2xl font-black text-white tabular-nums">{valor || <span className="text-white/20">?</span>} <span className="text-white/50 text-base">{unidad}</span></span>
      </div>

      {!revelado && (
        <>
          <div className="grid grid-cols-6 gap-1.5 mb-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'].map(t => (
              <button key={t} type="button" onClick={() => tecla(t)}
                className={`rounded-lg py-2.5 font-black text-lg ${t === '⌫' ? 'col-span-2 bg-white/10 text-white/80' : 'bg-white/5 border border-white/15 text-white'} hover:bg-white/15`}>{t}</button>
            ))}
          </div>
          <button type="button" disabled={!valor} onClick={() => onResponder(valor)}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
          {usaPi(r) && <p className="text-center text-white/35 text-[11px] mt-1.5">{tr({ es: 'Vale con π ≈ 3,14 o con el π de la calculadora.', en: 'Either π ≈ 3.14 or your calculator’s π is fine.', ca: 'Val amb π ≈ 3,14 o amb el π de la calculadora.' })}</p>}
        </>
      )}

      {revelado && (
        <div className={`rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
