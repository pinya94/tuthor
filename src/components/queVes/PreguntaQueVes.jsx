// Una ronda de ¿Qué Ves? (ver lib/queVes): la escena del parque y una frase
// sobre ella con huecos. Tocar una ficha la pone en el primer hueco libre;
// tocar un hueco lleno lo vacía.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { ACCIONES, MASCOTAS, GRUPOS, esCorrecta, explicacion, fraseCorrecta } from '../../lib/queVes'

const E = ({ x, y, s = 22, children }) => <text x={x} y={y} fontSize={s} textAnchor="middle" dominantBaseline="central">{children}</text>

export function Escena({ esc }) {
  const xs = esc.ninos.length === 2 ? [95, 245] : [62, 180, 298]
  const fila = (n, x0, dx, y, emoji, s) => Array.from({ length: n }, (_, i) => <E key={i} x={x0 + i * dx} y={y} s={s}>{emoji}</E>)
  return (
    <svg viewBox="0 0 360 240" className="w-full h-auto block select-none" role="img" aria-label="Park">
      <rect width="360" height="100" fill="#1d3b63" />
      <rect y="100" width="360" height="140" fill="#1f5130" />
      <circle cx="330" cy="26" r="16" fill="#fcd34d" />
      {fila(esc.grupos.birds, 34, 34, 30, GRUPOS.birds.emoji, 22)}
      <ellipse cx="292" cy="206" rx="64" ry="26" fill="#2563eb" fillOpacity=".75" />
      {fila(esc.grupos.ducks, 248, 22, 206, GRUPOS.ducks.emoji, 18)}
      {fila(esc.grupos.flowers, 22, 24, 218, GRUPOS.flowers.emoji, 18)}
      {fila(esc.grupos.butterflies, 26, 26, 184, GRUPOS.butterflies.emoji, 16)}
      {esc.ninos.map((p, i) => {
        const A = ACCIONES[p.accion], x = xs[i]
        return (
          <g key={p.n}>
            {/* Cada niño con su mascota sobre su alfombrilla: de quién es cada una, sin dudas */}
            <rect x={x - 50} y={86} width={92} height={74} rx={12} fill="#ffffff" fillOpacity=".08" stroke="#ffffff" strokeOpacity=".18" />
            {A.agua && <ellipse cx={x} cy={122} rx="30" ry="11" fill="#38bdf8" fillOpacity=".7" />}
            <E x={x} y={112} s={34}>{A.emoji}</E>
            {A.prop && <E x={x + 22} y={124} s={18}>{A.prop}</E>}
            <E x={x - 30} y={132} s={20}>{MASCOTAS[p.mascota].emoji}</E>
            <text x={x} y={150} textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" stroke="#0b1530" strokeWidth="4" paintOrder="stroke">{p.n}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function PreguntaQueVes({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const nHuecos = r.partes.filter(p => typeof p !== 'string').length
  const [puestas, setPuestas] = useState(() => Array(nHuecos).fill(null))
  const usadas = new Set(puestas.filter(x => x !== null))
  const texto = id => r.fichas.find(f => f.id === id)?.texto
  const elegidas = puestas.map(texto)
  const completa = puestas.every(x => x !== null)
  const acierto = revelado && esCorrecta(r, elegidas)
  const siguiente = puestas.indexOf(null)

  const poner = id => { if (!revelado && siguiente >= 0) setPuestas(p => p.map((x, i) => (i === siguiente ? id : x))) }
  const quitar = i => { if (!revelado) setPuestas(p => p.map((x, j) => (j === i ? null : x))) }

  let k = -1
  return (
    <div className="w-full">
      <div className="rounded-2xl overflow-hidden border border-white/10 mb-3"><Escena esc={r.escena} /></div>

      <div lang="en" className={`rounded-xl px-3 py-3 border mb-3 text-lg leading-[2.6rem] ${revelado ? (acierto ? 'border-green-500/60 bg-green-500/10' : 'border-red-500/60 bg-red-500/10') : 'border-white/15 bg-[#0d1117]'}`}>
        {r.partes.map((p, idx) => {
          if (typeof p === 'string') return <span key={idx} className="text-white">{p}</span>
          k++
          const i = k
          const lleno = puestas[i] !== null
          const bien = revelado && p.ok.includes(elegidas[i])
          const cls = revelado
            ? (bien ? 'bg-green-500/25 border-green-400 text-green-100' : 'bg-red-500/25 border-red-400 text-red-100 line-through')
            : lleno ? 'bg-[#EDAE49]/20 border-[#EDAE49]/70 text-white' : `border-dashed ${i === siguiente ? 'border-amber-300 bg-amber-300/10' : 'border-white/30'} text-transparent`
          return (
            <button key={idx} type="button" onClick={() => quitar(i)} disabled={revelado || !lleno}
              className={`inline-block align-middle mx-0.5 min-w-[3.2rem] px-2 py-0.5 rounded-lg border-2 font-bold leading-normal ${cls}`}>
              {lleno ? elegidas[i] : '___'}
            </button>
          )
        })}
      </div>

      {!revelado && (
        <>
          <p className="text-center text-white/40 text-xs mb-2">{tr({ es: 'Mira el dibujo y llena los huecos en orden (toca un hueco para vaciarlo)', en: 'Look at the picture and fill the gaps in order (tap a gap to empty it)', ca: 'Mira el dibuix i omple els buits en ordre (toca un buit per buidar-lo)' })}</p>
          <div lang="en" className="flex flex-wrap gap-2 justify-center mb-3">
            {r.fichas.map(f => (usadas.has(f.id)
              ? <span key={f.id} className="px-3 py-2 rounded-lg border border-dashed border-white/10 text-transparent select-none">{f.texto}</span>
              : <button key={f.id} type="button" onClick={() => poner(f.id)}
                  className="px-3 py-2 rounded-lg border bg-white/5 border-white/15 text-white/90 text-base font-semibold hover:bg-white/10 hover:border-white/30">{f.texto}</button>))}
          </div>
          <button type="button" disabled={!completa} onClick={() => onResponder(elegidas)}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
        </>
      )}

      {revelado && (
        <div className={`rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          {!acierto && <p lang="en" className="mt-1 text-center text-green-300 font-bold">{fraseCorrecta(r)}</p>}
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
