// Una ronda de Lee la Etiqueta (ver lib/etiqueta): las etiquetas y cómo se
// responde, sin opciones. Se tocan las etiquetas en orden, se echan terrones
// al vaso, se pinta el semáforo, se teclean los gramos o se cargan las dos
// raciones en la balanza. La usan el juego (contra reloj) y el examen
// (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, producto, esCorrecta, enRacion, leeGramos, NOMBRE_NUTRIENTE, TERRON } from '../../lib/etiqueta'
import Etiqueta from './Etiqueta'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const COLOR = { bajo: '#22C55E', medio: '#F59E0B', alto: '#EF4444' }
const SIGUIENTE = { undefined: 'bajo', bajo: 'medio', medio: 'alto', alto: 'bajo' }

function Terron({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4 8l8-4 8 4v9l-8 4-8-4z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M4 8l8 4 8-4M12 12v9" fill="none" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="8" cy="13" r=".8" fill="#CBD5E1" /><circle cx="15" cy="15" r=".8" fill="#CBD5E1" /><circle cx="12" cy="7.5" r=".8" fill="#CBD5E1" />
    </svg>
  )
}

// El teclado de los gramos: dígitos, coma y borrar.
function Teclado({ escribe, l }) {
  const sep = l === 'en' ? '.' : ','
  return (
    <div className="grid grid-cols-4 gap-1.5 mb-3">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', sep, '⌫'].map(t => (
        <button key={t} className={tecla} onClick={() => escribe(t, sep)}>{t}</button>
      ))}
    </div>
  )
}
const cambia = (x, t, sep) => (t === '⌫' ? x.slice(0, -1) : t === sep ? (x.includes(sep) || !x ? x : x + t) : x.length < 6 ? x + t : x)

export default function PreguntaEtiqueta({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const ps = ronda.productos.map(producto)
  const n = ronda.nutriente
  const ok = revelado && esCorrecta(ronda, elegida)
  const num = x => (l === 'en' ? String(x) : String(x).replace('.', ','))

  // estado de cada mecánica
  const [orden, setOrden] = useState([])
  const [terrones, setTerrones] = useState(0)
  const [colores, setColores] = useState({})
  const [v, setV] = useState('')
  const [gramos, setGramos] = useState(['', ''])
  const [activa, setActiva] = useState(0)

  const columnas = ps.length === 3 ? 'grid-cols-3' : ps.length === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-[260px] mx-auto'
  const etiquetas = (extra = () => null) => (
    <div className={`grid gap-2 mb-3 ${columnas}`}>
      {ps.map(p => (
        <div key={p.id} className="relative">
          <Etiqueta p={p} compacta={ps.length === 3} corta={ps.length > 1} resalta={revelado ? n : null} marca={null} />
          {extra(p)}
        </div>
      ))}
    </div>
  )

  let cuerpo
  if (ronda.tipo === 'mas') {
    const toca = id => {
      if (revelado || orden.includes(id)) return
      const nuevo = [...orden, id]
      // con dos etiquetas basta con tocar la de más
      const completo = ronda.orden.length === 2 ? [id, ...ronda.productos.filter(x => x !== id)] : nuevo
      setOrden(completo.length === ronda.orden.length ? completo : nuevo)
      if (completo.length === ronda.orden.length) onResponder(`orden:${completo.join()}`)
    }
    const puesto = revelado && typeof elegida === 'string' ? elegida.replace('orden:', '').split(',') : orden
    cuerpo = etiquetas(p => {
      const k = puesto.indexOf(p.id)
      const bien = revelado && ronda.orden.indexOf(p.id) === k
      return (
        <>
          {!revelado && <button className="absolute inset-0 rounded-xl" aria-label={tr(p.nombre)} onClick={() => toca(p.id)} />}
          {k >= 0 && (ronda.orden.length > 2 || k === 0) && (
            <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black text-black shadow ${revelado ? (bien ? 'bg-green-400' : 'bg-red-400') : 'bg-amber-300'}`}>{ronda.orden.length > 2 ? k + 1 : '★'}</span>
          )}
          {revelado && ronda.orden.length === 2 && k !== 0 && ronda.orden[0] === p.id && <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black text-black shadow bg-green-400">★</span>}
          {revelado && ronda.orden.length > 2 && !bien && <span className="absolute -bottom-2 -right-2 px-1.5 rounded-full bg-green-400 text-black text-[11px] font-black">{ronda.orden.indexOf(p.id) + 1}</span>}
        </>
      )
    })
  } else if (ronda.tipo === 'terrones') {
    const puestos = revelado ? Number(elegida) || 0 : terrones
    cuerpo = (
      <>
        {etiquetas()}
        <div className="flex items-end justify-center gap-4 mb-3">
          <button disabled={revelado} onClick={() => setTerrones(x => Math.max(0, x - 1))} className="w-11 h-11 rounded-full bg-white/10 text-white text-2xl font-black disabled:opacity-30">−</button>
          <div className="w-36 min-h-[6rem] rounded-b-3xl rounded-t-md border-2 border-white/30 border-t-0 bg-white/[0.04] p-1.5 flex flex-wrap-reverse content-start justify-center gap-0.5">
            {Array.from({ length: puestos }, (_, i) => <Terron key={i} className="w-6 h-6" />)}
          </div>
          <button disabled={revelado} onClick={() => setTerrones(x => Math.min(30, x + 1))} className="w-11 h-11 rounded-full bg-amber-400 flex items-center justify-center disabled:opacity-30" aria-label="+1"><Terron className="w-7 h-7" /></button>
        </div>
        <p className="text-center text-white font-black mb-3">{puestos} × {TERRON} g = {puestos * TERRON} g {revelado && (ok ? '✓' : `→ ${ronda.bueno}`)}</p>
        {!revelado && <button className={boton} disabled={!terrones} onClick={() => onResponder(String(terrones))}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
      </>
    )
  } else if (ronda.tipo === 'semaforo') {
    const p = ps[0]
    const claves = Object.keys(ronda.colores)
    const listo = claves.every(k => colores[k])
    cuerpo = (
      <>
        {etiquetas()}
        <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-2 mb-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${claves.length}, minmax(0, 1fr))` }}>
          {claves.map(k => {
            const c = colores[k]
            const bien = revelado && c === ronda.colores[k]
            return (
              <button key={k} disabled={revelado} onClick={() => setColores(s => ({ ...s, [k]: SIGUIENTE[s[k]] }))} className="flex flex-col items-center gap-1">
                <span className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-black text-black ${revelado ? (bien ? 'border-green-300' : 'border-red-400') : 'border-white/30'}`} style={{ background: c ? COLOR[c] : 'transparent' }}>
                  {!c && <span className="text-white/50 text-lg">?</span>}
                </span>
                <span className="text-white text-[11px] font-bold leading-tight text-center">{NOMBRE_NUTRIENTE[k][l] ?? NOMBRE_NUTRIENTE[k].es}</span>
                <span className="text-white/50 text-[10px] tabular-nums">{num(p[k])} g</span>
                {revelado && !bien && <span className="w-4 h-4 rounded-full" style={{ background: COLOR[ronda.colores[k]] }} />}
              </button>
            )
          })}
        </div>
        {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(`semaforo:${claves.filter(k => colores[k] !== ronda.colores[k]).length}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
      </>
    )
  } else if (ronda.tipo === 'racion') {
    cuerpo = (
      <>
        {etiquetas()}
        <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
          <span className="text-amber-300 font-black text-2xl tabular-nums">{(revelado ? String(elegida ?? '') : v) || '?'} g</span>
          {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${num(ronda.bueno)} g`}</span>}
        </div>
        {!revelado && (
          <>
            <Teclado l={l} escribe={(t, sep) => setV(x => cambia(x, t, sep))} />
            <button className={boton} disabled={leeGramos(v) == null} onClick={() => onResponder(v)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
          </>
        )}
      </>
    )
  } else {
    // trampa: la balanza con las dos raciones
    const valores = revelado ? String(elegida ?? '|').split('|') : gramos
    const reales = ps.map(p => enRacion(p, n))
    const xs = valores.map(leeGramos)
    const pesa = revelado ? reales : xs
    const giro = pesa.every(x => x != null) ? Math.max(-12, Math.min(12, (pesa[1] - pesa[0]) * 6 / Math.max(1, Math.max(...pesa)) * 2)) : 0
    cuerpo = (
      <>
        {etiquetas()}
        <svg viewBox="0 0 300 90" className="w-full h-auto mb-1" aria-hidden="true">
          <path d="M150 86 L136 86 L150 30 L164 86Z" fill="#64748B" />
          <g transform={`rotate(${giro} 150 30)`} style={{ transition: 'transform .4s' }}>
            <rect x="40" y="27" width="220" height="6" rx="3" fill="#94A3B8" />
            {[60, 240].map((x, i) => (
              <g key={x}>
                <path d={`M${x - 30} 52 h60 l-8 10 h-44z`} fill={i === activa && !revelado ? '#FCD34D' : '#CBD5E1'} />
                <line x1={x - 26} y1="52" x2={x} y2="30" stroke="#94A3B8" /><line x1={x + 26} y1="52" x2={x} y2="30" stroke="#94A3B8" />
                <text x={x} y="48" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff" stroke="#0F172A" strokeWidth="3" paintOrder="stroke">{valores[i] ? `${valores[i]} g` : '?'}</text>
              </g>
            ))}
          </g>
        </svg>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {ps.map((p, i) => (
            <button key={p.id} disabled={revelado} onClick={() => setActiva(i)} className={`rounded-xl border px-2 py-1.5 text-left ${!revelado && activa === i ? 'border-amber-300 ring-2 ring-amber-300 bg-white/[0.06]' : 'border-white/10 bg-white/[0.04]'}`}>
              <span className="block text-white text-[12px] font-bold leading-tight">{p.emoji} {tr(p.nombreRacion)}</span>
              <span className={`block text-lg font-black tabular-nums ${revelado ? (esCorrecta({ ...ronda, productos: [p.id, p.id] }, `${valores[i]}|${valores[i]}`) ? 'text-green-300' : 'text-red-300') : 'text-amber-300'}`}>
                {valores[i] || '?'} g {revelado && <span className="text-white/60 text-xs">({num(reales[i])} g)</span>}
              </span>
            </button>
          ))}
        </div>
        {!revelado && (
          <>
            <Teclado l={l} escribe={(t, sep) => setGramos(gs => gs.map((x, i) => (i === activa ? cambia(x, t, sep) : x)))} />
            <button className={boton} disabled={!xs.every(x => x != null)} onClick={() => onResponder(gramos.join('|'))}>{tr({ es: 'A la balanza', en: 'Onto the scales', ca: 'A la balança' })}</button>
          </>
        )}
      </>
    )
  }

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
