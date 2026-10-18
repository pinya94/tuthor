// Una ronda de Escala del Universo (ver lib/escalaUniverso):
//   regla      la regla de potencias de 10 (de 10⁻¹⁰ a 10²¹ m): se elige un
//              objeto, se toca la regla y se afina con ◀ ▶
//   coma       el número con su coma: ← y → la corren y el exponente cambia a la vez
//   exponente  − y + para el exponente (y un teclado para la mantisa al operar)
//   valor      un teclado para escribir el resultado (1/8, −8…)
// La usan el juego y el examen.
import { useRef, useState } from 'react'
import { useLang } from '../../context/LangContext'
import {
  enunciado, explicacion, OBJETOS, REGLA, sup, cientifica, decimal, deClave, clave, conExponente, metaComa, reglaBien,
} from '../../lib/escalaUniverso'

const W = 340, X0 = 18, X1 = 322
const xDe = e => X0 + ((e - REGLA.min) / (REGLA.max - REGLA.min)) * (X1 - X0)
const eDe = x => Math.max(REGLA.min, Math.min(REGLA.max, Math.round(REGLA.min + ((x - X0) / (X1 - X0)) * (REGLA.max - REGLA.min))))
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'

function Regla({ r, revelado, onResponder, tr, l }) {
  const [puestos, setPuestos] = useState({})
  const [activo, setActivo] = useState(r.objetos[0])
  const svgRef = useRef(null)
  const pon = ev => {
    if (revelado || !activo) return
    const bb = svgRef.current.getBoundingClientRect()
    setPuestos(p => ({ ...p, [activo]: eDe(((ev.clientX - bb.left) / bb.width) * W) }))
  }
  const mueve = d => activo && puestos[activo] != null && setPuestos(p => ({ ...p, [activo]: Math.max(REGLA.min, Math.min(REGLA.max, p[activo] + d)) }))
  const ticks = []
  for (let e = REGLA.min; e <= REGLA.max; e++) ticks.push(e)
  const listo = r.objetos.every(id => puestos[id] != null)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="flex flex-wrap justify-center gap-1.5 mb-2">
        {r.objetos.map(id => (
          <button key={id} onClick={() => !revelado && setActivo(id)}
            className={`rounded-xl px-2.5 py-1.5 text-[12.5px] font-bold text-white ${activo === id && !revelado ? 'bg-amber-500/30 ring-2 ring-amber-300' : 'bg-white/5'}`}>
            {OBJETOS[id].emoji} {tr(OBJETOS[id].n)}{puestos[id] != null ? ` · 10${sup(puestos[id])}` : ''}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-2">
        <svg ref={svgRef} viewBox={`0 0 ${W} 120`} className="w-full h-auto cursor-pointer touch-manipulation" onClick={pon}>
          <rect x="0" y="0" width={W} height="120" fill="transparent" />
          <line x1={X0} x2={X1} y1="80" y2="80" stroke="#64748B" strokeWidth="2" />
          {ticks.map(e => {
            const x = xDe(e), grande = e % 5 === 0
            return (
              <g key={e}>
                <line x1={x} x2={x} y1={grande ? 72 : 76} y2={grande ? 88 : 84} stroke={e === 0 ? '#FCD34D' : '#64748B'} strokeWidth={grande ? 2 : 1} />
                {grande && <text x={x} y="104" textAnchor="middle" fontSize="11" fontWeight="800" fill={e === 0 ? '#FCD34D' : '#94A3B8'}>10{sup(e)}</text>}
              </g>
            )
          })}
          <text x={xDe(0)} y="116" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FCD34D">1 m</text>
          {r.objetos.map((id, k) => {
            const e = puestos[id]
            const bien = revelado && Math.abs(e - OBJETOS[id].e) <= r.tol
            const y = 26 + k * 14
            return (
              <g key={id}>
                {revelado && (
                  <g>
                    <line x1={xDe(OBJETOS[id].e)} x2={xDe(OBJETOS[id].e)} y1="62" y2="80" stroke="#4ADE80" strokeWidth="2" />
                    <circle cx={xDe(OBJETOS[id].e)} cy="80" r="3.5" fill="#4ADE80" />
                  </g>
                )}
                {e != null && (
                  <g>
                    <line x1={xDe(e)} x2={xDe(e)} y1={y + 6} y2="80" stroke={revelado ? (bien ? '#4ADE80' : '#F87171') : activo === id ? '#FCD34D' : '#94A3B8'} strokeWidth="1.5" strokeDasharray={revelado && !bien ? '3 2' : ''} />
                    <text x={xDe(e)} y={y} textAnchor="middle" fontSize="16">{OBJETOS[id].emoji}</text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button className={tecla} onClick={() => mueve(-1)} disabled={puestos[activo] == null}>◀ ÷10</button>
            <button className={tecla} onClick={() => mueve(1)} disabled={puestos[activo] == null}>×10 ▶</button>
          </div>
          <button className={boton} disabled={!listo} onClick={() => onResponder(reglaBien(r, puestos) ? 'regla:ok' : 'regla:no')}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Coma({ r, revelado, elegida, onResponder, tr, l }) {
  const e0 = deClave(r.bueno).e
  const [d, setD] = useState(r.modo === 'leer' ? e0 : 0)
  const k = conExponente(r, d)
  const { m } = deClave(k)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-5 mb-3 text-center">
        <p className="text-white font-black text-[26px] tabular-nums break-all leading-tight">
          {decimal(clave(m, 0), l)}<span className="text-amber-300"> · 10{sup(d)}</span>
        </p>
        <p className="text-white/45 text-xs mt-2">{tr({ es: 'Cada paso de la coma es ×10 o ÷10: el exponente lo compensa', en: 'Each move of the point is ×10 or ÷10: the exponent makes up for it', ca: 'Cada pas de la coma és ×10 o ÷10: l’exponent ho compensa' })}</p>
        {revelado && <p className={`text-sm font-bold mt-2 ${elegida === metaComa(r) ? 'text-green-300' : 'text-red-300'}`}>{r.modo === 'leer' ? `${decimal(metaComa(r), l)} m` : `${cientifica(r.bueno, l)} m`}</p>}
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button className={tecla} onClick={() => setD(x => Math.min(REGLA.max + 2, x + 1))}>← {tr({ es: 'coma', en: 'point', ca: 'coma' })}</button>
            <button className={tecla} onClick={() => setD(x => Math.max(REGLA.min - 2, x - 1))}>{tr({ es: 'coma', en: 'point', ca: 'coma' })} →</button>
          </div>
          <button className={boton} onClick={() => onResponder(k)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Teclado({ setValor, teclas }) {
  return (
    <div className="grid grid-cols-4 gap-1.5 mb-3">
      {teclas.map(t => (
        <button key={t} className={tecla} onClick={() => setValor(v => (t === '⌫' ? v.slice(0, -1) : v.length < 8 ? v + t : v))}>{t}</button>
      ))}
    </div>
  )
}

function Exponente({ r, revelado, elegida, onResponder, tr, l }) {
  const operar = r.sub === 'operar'
  const base = operar ? null : r.bueno.split('^')[0]
  const [n, setN] = useState(1)
  const [mant, setMant] = useState('')
  const sep = l === 'en' ? '.' : ','
  const respuesta = operar ? clave(mant.replace(',', '.').replace(/\.$/, '') || '0', n) : `${base}^${n}`
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-5 mb-3 text-center">
        <p className="text-white font-black text-[30px] tabular-nums">
          {operar ? <>{mant || '?'}<span className="text-white/60"> · </span>10</> : base}
          <sup className="text-amber-300 text-[22px]">{n}</sup>
        </p>
        {revelado && <p className={`text-sm font-bold mt-1 ${elegida === respuesta && elegida ? 'text-green-300' : 'text-white/70'}`}>{operar ? cientifica(r.bueno, l) : `${base}${sup(r.bueno.split('^')[1])}`}</p>}
      </div>
      {!revelado && (
        <>
          {operar && <Teclado setValor={setMant} teclas={['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', sep, '⌫']} />}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-3">
            <button className={tecla} onClick={() => setN(x => x - 1)}>−</button>
            <span className="text-white/60 text-sm font-bold px-2">{tr({ es: 'exponente', en: 'exponent', ca: 'exponent' })}</span>
            <button className={tecla} onClick={() => setN(x => x + 1)}>+</button>
          </div>
          <button className={boton} disabled={operar && !mant} onClick={() => onResponder(respuesta)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Valor({ r, revelado, elegida, onResponder, tr, l }) {
  const [v, setV] = useState('')
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-5 mb-3 text-center">
        <p className="text-white font-black text-[30px]">{r.expr} = <span className="text-amber-300">{revelado ? elegida : v || '?'}</span></p>
        {revelado && <p className="text-green-300 text-sm font-bold mt-1">{r.expr} = {r.bueno}</p>}
      </div>
      {!revelado && (
        <>
          <Teclado setValor={setV} teclas={['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '−', '/', '⌫']} />
          <button className={boton} disabled={!v} onClick={() => onResponder(v)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

export default function PreguntaEscala({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, tr, l }
  return (
    <div className="w-full">
      {ronda.tipo === 'regla' ? <Regla {...props} />
        : ronda.tipo === 'coma' ? <Coma {...props} />
        : ronda.tipo === 'exponente' ? <Exponente {...props} />
        : <Valor {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
