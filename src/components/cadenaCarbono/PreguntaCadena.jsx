// Una ronda de Cadena de Carbono. La molécula en fórmula semidesarrollada:
// la cadena en fila, el grupo funcional arriba (O en rojo, N en azul), la
// rama abajo y los enlaces dobles y triples en ámbar. El dibujo se puede
// tocar: carbonos y enlaces (para colocar piezas, numerar o poner H).
//   construye / isomero  el constructor: carbonos −/+ y una pieza
//   numera               tocar el carbono 1
//   hidrogenos           tocar cada carbono para cambiar sus H
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import {
  carbonos, molecula, nombre, enunciado, explicacion, sub, atomos, formulaClave, verFormula, deClave,
  PIEZAS, DONDE, MAX_C, deConstruida, claveConstruida,
} from '../../lib/cadenaCarbono'

const PASO = 76
const COLOR = { O: '#F87171', N: '#60A5FA' }
const AMBAR = '#FBBF24'

// Ancho aproximado de una etiqueta como «CH₂» o «COOH» a 20 px.
const ancho = t => [...t].reduce((a, c) => a + (/[₀-₉]/.test(c) ? 8 : 13), 0)

function Etiqueta({ x, y, t, c }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="20" fontWeight="800" fill={c ?? '#F8FAFC'}>
      {[...t].map((ch, i) => <tspan key={i} fill={c ?? COLOR[ch] ?? '#F8FAFC'}>{ch}</tspan>)}
    </text>
  )
}

function Lineas({ x1, y1, x2, y2, orden, c }) {
  const vertical = x1 === x2
  const off = orden === 1 ? [0] : orden === 2 ? [-3.5, 3.5] : [-5.5, 0, 5.5]
  return off.map(o => (
    <line key={o} x1={vertical ? x1 + o : x1} y1={vertical ? y1 : y1 + o} x2={vertical ? x2 + o : x2} y2={vertical ? y2 : y2 + o}
      stroke={c} strokeWidth="2.4" strokeLinecap="round" />
  ))
}

// hs: H puestos por el alumno (num → h; sin valor, «C?»). onCarbon/onEnlace:
// zonas que se pueden tocar. diana: qué zonas resaltar ('carbono',
// 'interior', 'enlace').
export function Molecula({ m, espejo, numerar, hs, onCarbon, onEnlace, diana }) {
  let cs = carbonos(m)
  if (espejo) cs = [...cs].reverse()
  const n = cs.length
  const W = 60 + (n - 1) * PASO
  const Y = 82
  const fijo = c => ['CHO', 'HCHO', 'COOH', 'HCOOH'].includes(c.etiqueta)
  const texto = (c, k) => {
    if (k === 0 && n > 1 && c.etiqueta === 'CHO') return 'OHC'
    if (k === 0 && n > 1 && c.etiqueta === 'COOH') return 'HOOC'
    if (hs && !fijo(c)) { const h = hs[c.num]; return h == null ? 'C?' : 'C' + (h === 0 ? '' : h === 1 ? 'H' : 'H' + sub(h)) }
    return c.etiqueta
  }
  const xs = cs.map((_, k) => 30 + k * PASO)
  const esDiana = (c, k) => diana === 'carbono' || (diana === 'interior' && k > 0 && k < n - 1)
  return (
    <svg viewBox={`0 0 ${W} 150`} className="w-full mx-auto block" style={{ maxWidth: W * 1.25 }} role="img" aria-label={nombre(m)}>
      {cs.slice(0, -1).map((c, k) => {
        const sig = cs[k + 1]
        const menor = Math.min(c.num, sig.num)
        const orden = carbonos(m).find(x => x.num === menor).enlace
        const x1 = xs[k] + ancho(texto(c, k)) / 2 + 3, x2 = xs[k + 1] - ancho(texto(sig, k + 1)) / 2 - 3
        return (
          <g key={k} onClick={onEnlace ? () => onEnlace(menor) : undefined} className={onEnlace ? 'cursor-pointer' : ''}>
            {onEnlace && <rect x={x1} y={Y - 24} width={Math.max(8, x2 - x1)} height="34" fill="transparent" />}
            {diana === 'enlace' && <rect x={x1 - 2} y={Y - 19} width={Math.max(8, x2 - x1) + 4} height="24" rx="6" fill="none" stroke={AMBAR} strokeDasharray="4 3" />}
            <Lineas x1={x1} y1={Y - 7} x2={x2} y2={Y - 7} orden={orden} c={orden > 1 ? AMBAR : '#94A3B8'} />
          </g>
        )
      })}
      {cs.map((c, k) => (
        <g key={c.num} onClick={onCarbon ? () => onCarbon(c.num, k) : undefined} className={onCarbon ? 'cursor-pointer' : ''}>
          {onCarbon && <rect x={xs[k] - 30} y={Y - 30} width="60" height="42" fill="transparent" />}
          {esDiana(c, k) && <rect x={xs[k] - 26} y={Y - 26} width="52" height="34" rx="8" fill="none" stroke={AMBAR} strokeDasharray="4 3" />}
          <Etiqueta x={xs[k]} y={Y} t={texto(c, k)} c={hs && !fijo(c) ? (hs[c.num] == null ? '#94A3B8' : '#FDE68A') : undefined} />
          {c.arriba && (
            <>
              <Lineas x1={xs[k]} y1={Y - 24} x2={xs[k]} y2={Y - 44} orden={c.doble ? 2 : 1} c={c.doble ? AMBAR : '#94A3B8'} />
              <Etiqueta x={xs[k]} y={Y - 50} t={c.arriba} />
            </>
          )}
          {c.abajo && (
            <>
              <Lineas x1={xs[k]} y1={Y + 6} x2={xs[k]} y2={Y + 26} orden={1} c="#94A3B8" />
              <Etiqueta x={xs[k]} y={Y + 48} t={c.abajo} c="#6EE7B7" />
            </>
          )}
          {numerar && n > 1 && (
            <g>
              <circle cx={xs[k] - ancho(texto(c, k)) / 2 - 2} cy={Y - 26} r="8" fill={AMBAR} />
              <text x={xs[k] - ancho(texto(c, k)) / 2 - 2} y={Y - 22} textAnchor="middle" fontSize="11" fontWeight="900" fill="#1E1B4B">{c.num}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  )
}

const caja = 'rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 mb-3'
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const ROTULO = { doble: 'C=C', triple: 'C≡C', OH: '–OH', O: 'C=O', NH2: '–NH₂', CHO: '–CHO', COOH: '–COOH', rama: '–CH₃' }

function Constructor({ r, revelado, elegida, onResponder, l, tr }) {
  const m = molecula(r)
  const [est, setEst] = useState({ n: r.tipo === 'isomero' ? m.n : 1, extra: null })
  const [pieza, setPieza] = useState(null)
  const hecha = deConstruida(est)
  const a = atomos(hecha)
  const cambiaN = d => {
    const n = Math.min(MAX_C, Math.max(1, est.n + d))
    let extra = est.extra
    if (extra?.pos && (DONDE[extra.t] === 'enlace' ? extra.pos > n - 1 : DONDE[extra.t] === 'interior' ? extra.pos >= n : extra.pos > n)) extra = null
    if (extra && (DONDE[extra.t] === 'enlace' || DONDE[extra.t] === 'interior') && n < (DONDE[extra.t] === 'enlace' ? 2 : 3)) extra = null
    setEst({ n, extra })
  }
  const elige = t => {
    if (revelado) return
    if (DONDE[t] === 'extremo') { setEst({ ...est, extra: { t } }); setPieza(null); return }
    setPieza(pieza === t ? null : t)
  }
  const pon = pos => { setEst({ ...est, extra: { t: pieza, pos } }); setPieza(null) }
  const onCarbon = pieza && (DONDE[pieza] === 'carbono' || DONDE[pieza] === 'interior')
    ? (num, k) => { if (DONDE[pieza] === 'interior' && (k === 0 || k === est.n - 1)) return; pon(num) } : undefined
  const onEnlace = pieza && DONDE[pieza] === 'enlace' && est.n > 1 ? pon : undefined
  const ok = revelado && elegida != null && (r.tipo === 'isomero' ? elegida !== 'invalido' && elegida !== r.mol && formulaClave(atomos(deClave(elegida))) === formulaClave(atomos(m)) : elegida === r.bueno)
  return (
    <>
      <div className={caja}>
        {r.tipo === 'isomero' ? (
          <>
            <p className="text-white/50 text-xs text-center">{nombre(m, l)} · {verFormula(formulaClave(atomos(m)))}</p>
            <div className="max-w-[260px] mx-auto opacity-80"><Molecula m={m} /></div>
            <p className="text-white/50 text-xs text-center mt-1">{enunciado(r, l)}</p>
          </>
        ) : (
          <>
            <p className="text-white/50 text-xs text-center">{enunciado(r, l)}</p>
            <p className="text-white font-black text-2xl text-center">{nombre(m, l)}</p>
          </>
        )}
        <div className="min-h-[8rem] flex items-center">
          <Molecula m={hecha} onCarbon={revelado ? undefined : onCarbon} onEnlace={revelado ? undefined : onEnlace} diana={revelado ? null : pieza ? (DONDE[pieza] === 'enlace' ? 'enlace' : DONDE[pieza]) : null} />
        </div>
        <p className={`text-center text-sm font-bold ${revelado ? (ok ? 'text-green-300' : 'text-red-300') : 'text-white/60'}`}>
          {verFormula(formulaClave(a))}{revelado && !ok ? ' ✗' : ''}
        </p>
        {revelado && !ok && r.tipo === 'construye' && (
          <div className="mt-2 border-t border-white/10 pt-2">
            <p className="text-green-300 text-xs font-bold text-center">{tr({ es: 'Así es', en: 'This is it', ca: 'Així és' })}</p>
            <Molecula m={m} numerar />
          </div>
        )}
      </div>
      {!revelado && (
        <>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/50 text-xs uppercase tracking-widest">{tr({ es: 'Carbonos', en: 'Carbons', ca: 'Carbonis' })}</span>
            <button onClick={() => cambiaN(-1)} disabled={est.n <= 1} className="w-10 h-10 rounded-xl bg-white/10 text-white text-xl font-black disabled:opacity-30">−</button>
            <span className="text-white font-black text-xl w-6 text-center">{est.n}</span>
            <button onClick={() => cambiaN(1)} disabled={est.n >= MAX_C} className="w-10 h-10 rounded-xl bg-white/10 text-white text-xl font-black disabled:opacity-30">+</button>
          </div>
          <div className="grid grid-cols-5 gap-1.5 mb-1">
            <button onClick={() => { setEst({ ...est, extra: null }); setPieza(null) }} className="py-2 rounded-lg border border-white/15 bg-white/[0.03] text-white/70 text-[12px] font-bold">✕</button>
            {PIEZAS.map(t => (
              <button key={t} onClick={() => elige(t)}
                className={`py-2 rounded-lg border text-[12.5px] font-black transition-all ${pieza === t ? 'bg-amber-300/30 border-amber-300 text-white' : est.extra?.t === t ? 'bg-white/15 border-white/30 text-white' : 'bg-white/[0.06] border-white/15 text-white/85'}`}>
                {ROTULO[t]}
              </button>
            ))}
          </div>
          <p className="text-center text-xs text-amber-200/80 min-h-[1.25rem] mb-2">
            {pieza ? (DONDE[pieza] === 'enlace' ? tr({ es: 'Toca un enlace de la cadena', en: 'Tap a bond in the chain', ca: 'Toca un enllaç de la cadena' }) : DONDE[pieza] === 'interior' ? tr({ es: 'Toca un carbono de dentro de la cadena', en: 'Tap a carbon inside the chain', ca: 'Toca un carboni de dins de la cadena' }) : tr({ es: 'Toca un carbono', en: 'Tap a carbon', ca: 'Toca un carboni' })) : ''}
          </p>
          <button className={boton} onClick={() => onResponder(claveConstruida(est))}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Numera({ r, revelado, onResponder, l }) {
  const m = molecula(r)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className={caja}>
        <Molecula m={m} espejo={r.espejo} numerar={revelado} onCarbon={revelado ? undefined : num => onResponder(String(num))} />
        {revelado && <p className="text-white font-black text-xl text-center">{nombre(m, l)}</p>}
      </div>
    </>
  )
}

function Hidrogenos({ r, revelado, onResponder, l, tr }) {
  const m = molecula(r)
  const cs = carbonos(m)
  const tocables = cs.filter(c => !['CHO', 'HCHO', 'COOH', 'HCOOH'].includes(c.etiqueta))
  const [hs, setHs] = useState({})
  const CICLO = [1, 2, 3, 0]
  const toca = num => !revelado && tocables.some(c => c.num === num) && setHs({ ...hs, [num]: hs[num] == null ? 1 : CICLO[(CICLO.indexOf(hs[num]) + 1) % 4] })
  const listo = tocables.every(c => hs[c.num] != null)
  // Fórmula que lleva puesta el alumno.
  const real = atomos(m)
  const Hpuestos = cs.reduce((t, c) => t + (tocables.includes(c) ? (hs[c.num] ?? 0) : c.etiqueta === 'CHO' || c.etiqueta === 'COOH' ? 1 : c.etiqueta === 'HCHO' || c.etiqueta === 'HCOOH' ? 2 : 0) + (c.arriba === 'OH' ? 1 : c.arriba === 'NH₂' ? 2 : 0) + (c.abajo ? 3 : 0), 0)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className={caja}>
        <p className="text-white/60 text-sm text-center">{nombre(m, l)}</p>
        <Molecula m={m} espejo={r.espejo} hs={revelado ? Object.fromEntries(cs.map(c => [c.num, c.h])) : hs} onCarbon={revelado ? undefined : toca} />
        <p className="text-center text-sm font-bold text-white/70">{verFormula(formulaClave({ ...real, H: revelado ? real.H : Hpuestos }))}</p>
        {!revelado && <p className="text-center text-xs text-white/45 mt-1">{tr({ es: 'Cada toque: 1, 2, 3 o ningún H', en: 'Each tap: 1, 2, 3 or no H', ca: 'Cada toc: 1, 2, 3 o cap H' })}</p>}
      </div>
      {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(`h:${tocables.filter(c => hs[c.num] !== c.h).length}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

export default function PreguntaCadena({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, l, tr }
  return (
    <div className="w-full">
      {ronda.tipo === 'numera' ? <Numera {...props} />
        : ronda.tipo === 'hidrogenos' ? <Hidrogenos {...props} />
        : <Constructor {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l, elegida)}</p>}
    </div>
  )
}
