// Una ronda de Bajo Presión (ver lib/bajoPresion): el gas en un cilindro con
// émbolo, antes y después. Las partículas se mueven más rápido cuanto mayor es
// la temperatura; el émbolo marca el volumen, el manómetro la presión y el
// termómetro la temperatura. La magnitud que falta se ajusta con − / + y el
// dibujo de «después» la sigue. Las escalas NO dependen de la respuesta (si el
// tope del émbolo fuera la solución, el dibujo la chivaría).
import { useEffect, useState } from 'react'
import { useLang } from '../../context/LangContext'
import ConIndices from '../ConIndices'
import {
  PASOS, UNIDAD, inicial, respuesta, esCorrecta, enunciado, explicacion, pistaFallo, num, NOMBRE_LEY,
} from '../../lib/bajoPresion'

const T = (tr, es, en, ca) => tr({ es, en, ca })
const T_MAX = 700

function useReloj() {
  const [t, setT] = useState(0)
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let id, ultimo = 0
    const paso = ms => {
      if (ms - ultimo > 33) { ultimo = ms; setT(ms / 1000) }
      id = requestAnimationFrame(paso)
    }
    id = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(id)
  }, [])
  return t
}

// Partículas fijas por cilindro (semilla fija: no cambian entre renders)
const PARTICULAS = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 2.39996) % (2 * Math.PI)
  return { x0: (i * 0.618) % 1, y0: (i * 0.377 + 0.13) % 1, vx: Math.cos(a), vy: Math.sin(a) }
})
const tri = u => 1 - Math.abs((((u % 2) + 2) % 2) - 1)

function Cilindro({ P, V, T: temp, n = 1, vMax, pMax, t, titulo, resalta }) {
  const W = 160, H = 220, x0 = 22, x1 = 118, fondo = 205
  const h = 18 + 150 * Math.min(1, V / vMax)
  const tope = fondo - h
  const cuantas = Math.max(4, Math.min(24, Math.round(10 * n)))
  const vel = 0.12 * Math.sqrt(temp / 300)
  const ang = -120 + 240 * Math.min(1, P / pMax)
  const rad = a => (a - 90) * Math.PI / 180
  const color = k => (resalta === k ? '#FBBF24' : '#CBD5E1')
  return (
    <div className="flex-1 min-w-0">
      <p className="text-center text-[11px] uppercase tracking-widest text-white/45 font-bold mb-1">{titulo}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img">
        {/* paredes */}
        <path d={`M${x0} 30V${fondo}H${x1}V30`} fill="#0f1c3a" stroke="#94A3B8" strokeWidth="2.5" />
        {/* partículas */}
        {PARTICULAS.slice(0, cuantas).map((p, i) => {
          const px = x0 + 6 + (x1 - x0 - 12) * tri(p.x0 * 2 + p.vx * vel * t * 2)
          const py = tope + 12 + (fondo - tope - 18) * tri(p.y0 * 2 + p.vy * vel * t * 2)
          return <circle key={i} cx={px} cy={py} r="3.6" fill="#38BDF8" />
        })}
        {/* émbolo */}
        <rect x={x0 + 1.5} y={tope} width={x1 - x0 - 3} height="7" rx="1.5" fill={resalta === 'V' ? '#FBBF24' : '#64748B'} />
        <rect x={(x0 + x1) / 2 - 3} y={Math.min(tope, 30) - 12} width="6" height={tope - Math.min(tope, 30) + 12} fill="#475569" />
        {/* manómetro */}
        <circle cx="38" cy="16" r="13" fill="#1E293B" stroke={color('P')} strokeWidth="2" />
        <line x1="38" y1="16" x2={38 + 10 * Math.cos(rad(ang))} y2={16 + 10 * Math.sin(rad(ang))} stroke={color('P')} strokeWidth="2.2" strokeLinecap="round" />
        {/* termómetro */}
        <rect x="134" y="40" width="10" height="160" rx="5" fill="#1E293B" stroke={color('T')} strokeWidth="1.5" />
        <rect x="136.5" y={198 - 154 * Math.min(1, temp / T_MAX)} width="5" height={154 * Math.min(1, temp / T_MAX)} rx="2.5" fill="#EF4444" />
        <circle cx="139" cy="203" r="8" fill="#EF4444" stroke={color('T')} strokeWidth="1.5" />
      </svg>
    </div>
  )
}

function Etiquetas({ est, l, falta, celsius, revelado }) {
  const linea = (k, txt) => (
    <p key={k} className={`tabular-nums ${falta === k ? 'text-amber-300 font-black' : 'text-white/85 font-bold'}`}>{txt}</p>
  )
  return (
    <div className="text-center text-sm leading-6">
      {est.n !== undefined && linea('n', `n = ${num(est.n, l)} mol`)}
      {linea('P', `P = ${num(est.P, l)} atm`)}
      {linea('V', `V = ${num(est.V, l)} L`)}
      {/* con °C, el paso a kelvin es parte del ejercicio: solo se enseña al corregir */}
      {linea('T', celsius && !revelado && falta !== 'T' ? `T = ${num(est.T - 273, l)} °C` : `T = ${num(est.T, l)} K${celsius ? ` (${num(est.T - 273, l)} °C)` : ''}`)}
    </div>
  )
}

export default function PreguntaGas({ ronda: r, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = useReloj()
  const previo = revelado && elegida ? Number(elegida.split(':')[1]) / 10 : null
  const [x, setX] = useState(previo ?? inicial(r))
  const mag = r.pide
  const [grueso, fino] = PASOS[mag]
  const mueve = d => { if (!revelado) setX(v => Math.max(fino, Math.round((v + d) * 10) / 10)) }
  const ok = revelado && esCorrecta(r, respuesta(mag, x))
  const pista = revelado && !ok ? pistaFallo(r, respuesta(mag, x), l) : null
  const ideal = r.tipo === 'ideal'
  const antes = ideal ? null : r.a
  const despues = ideal ? { ...r.a, [mag]: x } : { ...r.b, [mag]: x }
  const conocidos = ideal ? [] : [r.a.V, ...(mag === 'V' ? [] : [r.b.V])]
  const vMax = Math.max(...(ideal ? [mag === 'V' ? 20 : r.a.V * 3] : conocidos.map(v => v * 3)), x) * 1.1
  const pMax = Math.max(ideal ? (mag === 'P' ? 8 : r.a.P * 3) : r.a.P * 3, mag === 'P' ? 0 : despues.P * 1.2, x) * 1.1
  const bueno = ideal ? r.a[mag] : r.b[mag]
  const b = 'rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 disabled:opacity-30 px-2.5 py-2 text-white font-black text-sm min-w-[3.1rem]'
  const fmt = v => (l === 'en' ? String(v) : String(v).replace('.', ','))
  const nombreMag = { P: T(tr, 'Presión', 'Pressure', 'Pressió'), V: T(tr, 'Volumen', 'Volume', 'Volum'), T: T(tr, 'Temperatura', 'Temperature', 'Temperatura') }[mag]

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug"><ConIndices texto={enunciado(r, l)} /></p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <div className="flex gap-2 items-start">
          {antes && (
            <div className="flex-1 min-w-0">
              <Cilindro {...antes} vMax={vMax} pMax={pMax} t={t} titulo={T(tr, 'Antes', 'Before', 'Abans')} />
              <Etiquetas est={antes} l={l} celsius={r.celsius} revelado={revelado} />
            </div>
          )}
          <div className={`flex-1 min-w-0 ${ideal ? "max-w-[14rem] mx-auto" : ""}`}>
            <Cilindro {...despues} vMax={vMax} pMax={pMax} t={t} resalta={mag} titulo={ideal ? T(tr, 'El gas', 'The gas', 'El gas') : T(tr, 'Después', 'After', 'Després')} />
            <Etiquetas est={despues} l={l} falta={mag} celsius={r.celsius} revelado={revelado} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-3 py-3 mb-3">
        <p className="text-center text-[11px] uppercase tracking-widest text-white/45 font-bold mb-1">{nombreMag}</p>
        <div className="flex items-center justify-center gap-1.5">
          <button type="button" className={b} disabled={revelado} onClick={() => mueve(-grueso)}>−{fmt(grueso)}</button>
          <button type="button" className={b} disabled={revelado} onClick={() => mueve(-fino)}>−{fmt(fino)}</button>
          <div className="text-center min-w-[6.5rem]">
            <p className={`text-3xl font-black tabular-nums leading-none ${revelado ? (ok ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>{num(x, l)}</p>
            <p className="text-white/60 text-xs font-bold mt-1">{UNIDAD[mag]}{mag === 'T' ? ` · ${num(x - 273, l)} °C` : ''}</p>
          </div>
          <button type="button" className={b} disabled={revelado} onClick={() => mueve(fino)}>+{fmt(fino)}</button>
          <button type="button" className={b} disabled={revelado} onClick={() => mueve(grueso)}>+{fmt(grueso)}</button>
        </div>
      </div>

      {revelado
        ? (
          <div className={`rounded-xl px-3 py-2.5 mb-3 text-sm font-black border ${ok ? 'bg-green-500/15 border-green-500/40 text-green-300' : 'bg-red-500/15 border-red-500/40 text-red-300'}`}>
            {ok ? T(tr, '✓ ¡Correcto!', '✓ Correct!', '✓ Correcte!') : `✗ ${T(tr, 'Era', 'It was', 'Era')} ${num(bueno, l)} ${UNIDAD[mag]}.${pista ? ` ${pista}` : ''}`}
          </div>
        )
        : (
          <>
            <button type="button" onClick={() => onResponder(respuesta(mag, x))} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black">
              {T(tr, 'Comprobar', 'Check', 'Comprovar')}
            </button>
            <p className="text-center text-xs text-white/40 mt-2">{tr(NOMBRE_LEY[r.tipo])} · {T(tr, 'la temperatura, siempre en kelvin', 'temperature always in kelvin', 'la temperatura, sempre en kelvin')}</p>
          </>
        )}
      {revelado && <p className="text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 <ConIndices texto={explicacion(r, l)} /></p>}
    </div>
  )
}
