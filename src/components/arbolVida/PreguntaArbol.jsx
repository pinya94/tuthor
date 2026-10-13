// Una ronda de Árbol de la Vida (ver lib/arbolVida):
//   rasgos / especies  cladograma en escalera: se toca una ficha y luego su
//                      sitio (un tramo del tronco o una hoja)
//   ancestro           árbol ramificado: tocar el nodo donde se separan dos especies
//   ordena             tocar los grupos del más antiguo al más reciente
//   clasifica          tarjetas a su caja
// Cada mecánica responde una sola vez (ver esCorrecta).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import {
  ARBOLES, APARICION, RASGOS, hojas, escalera, claveNodo, ancestroComun, emo, ser,
  enunciado, explicacion, cajaDe, textoItem, textoCaja,
} from '../../lib/arbolVida'

const VERDE = '#4ADE80', ROJO = '#F87171', GRIS = '#94A3B8', AMBAR = '#FCD34D'
const caja = 'rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3'
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const ficha = sel => `rounded-xl border px-2 py-1.5 text-[13px] font-bold text-white transition-all ${sel ? 'bg-amber-300/25 border-amber-300 ring-2 ring-amber-300' : 'bg-white/[0.06] border-white/15'}`

// ── Escalera ──────────────────────────────────────────────────────────────
function Escalera({ r, l, tr, revelado, onResponder }) {
  const e = escalera(r.escalera)
  const n = e.taxa.length
  const modo = r.tipo // 'rasgos' | 'especies'
  const [puestos, setPuestos] = useState({}) // sitio (índice) → ficha
  const [sel, setSel] = useState(r.fichas[0])
  const libres = r.fichas.filter(f => !Object.values(puestos).includes(f))
  const coloca = k => {
    if (revelado || !sel) return
    const nuevo = Object.fromEntries(Object.entries(puestos).filter(([, f]) => f !== sel))
    nuevo[k] = sel
    setPuestos(nuevo)
    setSel(r.fichas.find(f => !Object.values(nuevo).includes(f)) ?? null)
  }
  const bueno = k => (modo === 'rasgos' ? e.rasgos[k] : e.taxa[k])
  const fallos = Array.from({ length: n }, (_, k) => k).filter(k => puestos[k] !== bueno(k)).length
  const listo = Object.keys(puestos).length === n

  const R0 = [14, 226], RL = [250, 56]
  const xs = e.taxa.map((_, i) => 30 + i * (220 / (n - 1)))
  const sobre = t => [R0[0] + (RL[0] - R0[0]) * t, R0[1] + (RL[1] - R0[1]) * t]
  const nodos = e.taxa.slice(0, -1).map((_, j) => sobre((j + 1) / n))
  const color = k => (!revelado || puestos[k] == null ? AMBAR : puestos[k] === bueno(k) ? VERDE : ROJO)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={caja}>
        <svg viewBox="0 0 360 236" className="w-full h-auto">
          <line x1={R0[0]} y1={R0[1]} x2={RL[0]} y2={RL[1]} stroke={GRIS} strokeWidth="3" strokeLinecap="round" />
          {nodos.map(([x, y], j) => <line key={j} x1={x} y1={y} x2={xs[j]} y2={56} stroke={GRIS} strokeWidth="3" strokeLinecap="round" />)}
          {e.taxa.map((t, i) => {
            const enHoja = modo === 'especies' ? (revelado ? t : puestos[i]) : t
            return (
              <g key={i} onClick={modo === 'especies' ? () => coloca(i) : undefined} className={modo === 'especies' && !revelado ? 'cursor-pointer' : ''}>
                {modo === 'especies' && <rect x={xs[i] - 20} y={10} width="40" height="38" rx="9" fill={puestos[i] ? 'transparent' : '#1e293b'} stroke={modo === 'especies' && revelado && puestos[i] !== t ? ROJO : modo === 'especies' && revelado ? VERDE : '#475569'} strokeDasharray={puestos[i] ? '' : '4 3'} strokeWidth="1.5" />}
                {enHoja && <text x={xs[i]} y={40} textAnchor="middle" fontSize="24">{emo(enHoja)}</text>}
              </g>
            )
          })}
          {e.rasgos.map((g, k) => {
            const [mx, my] = sobre((k + 0.5) / n)
            const texto = modo === 'rasgos' ? (puestos[k] ? tx2(RASGOS[puestos[k]], l) : '') : tx2(RASGOS[g], l)
            const tocable = modo === 'rasgos' && !revelado
            return (
              <g key={k} onClick={tocable ? () => coloca(k) : undefined} className={tocable ? 'cursor-pointer' : ''}>
                {tocable && <rect x={mx - 10} y={my - 12} width="130" height="28" fill="transparent" />}
                <circle cx={mx} cy={my} r="5" fill={modo === 'rasgos' ? color(k) : '#A78BFA'} />
                <rect x={mx + 8} y={my - 1} width="112" height="20" rx="10" fill={texto ? '#1e1b4b' : 'transparent'} stroke={modo === 'rasgos' ? color(k) : '#A78BFA'} strokeDasharray={texto ? '' : '4 3'} strokeWidth="1.3" />
                <text x={mx + 64} y={my + 13} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#F8FAFC">{texto}</text>
              </g>
            )
          })}
        </svg>
        {revelado && fallos > 0 && modo === 'rasgos' && (
          <p className="text-xs text-white/60 text-center">{e.rasgos.map(g => tx2(RASGOS[g], l)).join(' → ')}</p>
        )}
      </div>
      {!revelado && (
        <>
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {r.fichas.map(f => {
              const puesta = !libres.includes(f)
              return (
                <button key={f} onClick={() => setSel(f)} className={`${ficha(sel === f)} ${puesta && sel !== f ? 'opacity-40' : ''}`}>
                  {modo === 'rasgos' ? tx2(RASGOS[f], l) : `${emo(f)} ${ser(f, l)}`}
                </button>
              )
            })}
          </div>
          <button className={boton} disabled={!listo} onClick={() => onResponder(`${modo}:${fallos}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}
const tx2 = (o, l) => o[l] ?? o.es

// ── Antepasado común ──────────────────────────────────────────────────────
function layout(t) {
  const lista = hojas(t)
  const W = 300, x0 = 40, paso = (W - 2 * x0) / (lista.length - 1)
  const nodos = []
  function rec(n) {
    if (typeof n === 'string') { const nodo = { hoja: n, x: x0 + lista.indexOf(n) * paso, h: 0 }; nodos.push(nodo); return nodo }
    const [a, b] = n.map(rec)
    const nodo = { hijos: [a, b], x: (a.x + b.x) / 2, h: Math.max(a.h, b.h) + 1, t: n }
    nodos.push(nodo)
    return nodo
  }
  const raiz = rec(t)
  return { raiz, nodos, alto: raiz.h }
}

function Ancestro({ r, l, tr, revelado, elegida, onResponder }) {
  const t = ARBOLES[r.arbol]
  const { raiz, nodos, alto } = layout(t)
  const Y = h => 52 + h * (100 / alto)
  const bueno = claveNodo(ancestroComun(t, r.a, r.b))
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={caja}>
        <svg viewBox={`0 0 300 ${Y(alto) + 22}`} className="w-full max-w-[360px] mx-auto h-auto">
          {nodos.filter(n => n.hijos).flatMap(n => n.hijos.map(c => (
            <path key={`${n.x}-${c.x}-${c.h}`} d={`M${n.x} ${Y(n.h)} L${c.x} ${Y(c.h)}`} stroke={GRIS} strokeWidth="2.5" strokeLinecap="round" />
          )))}
          <line x1={raiz.x} y1={Y(alto)} x2={raiz.x} y2={Y(alto) + 14} stroke={GRIS} strokeWidth="2.5" />
          {nodos.filter(n => n.hijos).map(n => {
            const k = claveNodo(n.t)
            const fill = revelado ? (k === bueno ? VERDE : k === elegida ? ROJO : '#334155') : '#334155'
            return (
              <g key={k} onClick={revelado ? undefined : () => onResponder(k)} className={revelado ? '' : 'cursor-pointer'}>
                <circle cx={n.x} cy={Y(n.h)} r="14" fill="transparent" />
                <circle cx={n.x} cy={Y(n.h)} r="8" fill={fill} stroke={AMBAR} strokeWidth={revelado ? 0 : 2} />
              </g>
            )
          })}
          {nodos.filter(n => n.hoja).map(n => (
            <g key={n.hoja}>
              <text x={n.x} y={30} textAnchor="middle" fontSize="26">{emo(n.hoja)}</text>
              {[r.a, r.b].includes(n.hoja) && <rect x={n.x - 18} y={4} width="36" height="34" rx="8" fill="none" stroke={AMBAR} strokeWidth="2.5" />}
            </g>
          ))}
        </svg>
        {!revelado && <p className="text-center text-xs text-white/50">{tr({ es: 'Los puntos son antepasados: toca uno', en: 'The dots are ancestors: tap one', ca: 'Els punts són avantpassats: toca’n un' })}</p>}
      </div>
    </>
  )
}

// ── Ordenar en el tiempo ──────────────────────────────────────────────────
function Ordena({ r, l, tr, revelado, onResponder }) {
  const [seq, setSeq] = useState([])
  const bueno = r.bueno.split(',')
  const toca = g => {
    if (revelado || seq.includes(g)) return
    const s2 = [...seq, g]
    setSeq(s2)
    if (s2.length === r.grupo.length) onResponder(s2.join(','))
  }
  const fmt = g => (APARICION[g].ma >= 1 ? `${APARICION[g].ma.toLocaleString(l === 'en' ? 'en-GB' : 'es-ES')} Ma` : '0,3 Ma')
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={caja}>
        <div className="grid grid-cols-4 gap-1.5 items-end">
          {r.grupo.map((_, i) => {
            const g = seq[i]
            const ok = revelado && g === bueno[i]
            return (
              <div key={i} className={`rounded-xl border min-h-[5.2rem] p-1 text-center ${g ? (revelado ? (ok ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15') : 'border-white/20 bg-white/5') : 'border-dashed border-white/20'}`}>
                <p className="text-white/40 text-[10px] font-bold">{i + 1}.º</p>
                {g && <><p className="text-2xl leading-none">{APARICION[g].e}</p><p className="text-white text-[10.5px] font-bold leading-tight mt-0.5">{tx2(APARICION[g].n, l)}</p></>}
                {revelado && <p className="text-[10px] font-bold mt-0.5" style={{ color: ok ? VERDE : GRIS }}>{fmt(bueno[i])}{!ok ? ` · ${APARICION[bueno[i]].e}` : ''}</p>}
              </div>
            )
          })}
        </div>
        <p className="flex justify-between text-[10px] text-white/40 font-bold mt-1 px-1"><span>{tr({ es: '← más antiguo', en: '← oldest', ca: '← més antic' })}</span><span>{tr({ es: 'más reciente →', en: 'most recent →', ca: 'més recent →' })}</span></p>
      </div>
      {!revelado && (
        <div className="grid grid-cols-2 gap-2">
          {r.grupo.map(g => (
            <button key={g} disabled={seq.includes(g)} onClick={() => toca(g)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] py-2.5 text-white text-sm font-bold disabled:opacity-25">
              {APARICION[g].e} {tx2(APARICION[g].n, l)}
            </button>
          ))}
          {seq.length > 0 && <button onClick={() => setSeq(seq.slice(0, -1))} className="col-span-2 py-2 rounded-xl text-white/60 text-sm font-bold bg-white/[0.03]">↶ {tr({ es: 'Deshacer', en: 'Undo', ca: 'Desfer' })}</button>}
        </div>
      )}
    </>
  )
}

// ── Clasificar tarjetas ───────────────────────────────────────────────────
function Clasifica({ r, l, revelado, onResponder }) {
  const [puestas, setPuestas] = useState({})
  const [activa, setActiva] = useState(r.items[0])
  const colocar = c => {
    if (revelado || !activa) return
    const n = { ...puestas, [activa]: c }
    setPuestas(n)
    const sig = r.items.find(i => !n[i])
    setActiva(sig ?? null)
    if (!sig) onResponder(`clasifica:${r.items.filter(i => n[i] !== cajaDe(i)).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className="space-y-1.5 mb-3">
        {r.items.filter(i => !puestas[i]).map(i => (
          <button key={i} onClick={() => setActiva(i)} className={`block w-full text-left rounded-xl px-3 py-2 text-[13px] leading-snug text-white transition-all ${activa === i ? 'bg-white/20 ring-2 ring-amber-300' : 'bg-white/5'}`}>
            {textoItem(i, l)}
          </button>
        ))}
      </div>
      <div className={`grid gap-2 ${r.cajas.length === 2 ? 'grid-cols-2' : r.cajas.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || !activa} onClick={() => colocar(c)}
            className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[4rem] text-left">
            <span className="block text-white text-[12.5px] font-black leading-tight">{textoCaja(r, c, l)}</span>
            {r.items.filter(i => puestas[i] === c).map(i => (
              <span key={i} className={`block mt-1 rounded-md px-1.5 py-0.5 text-[10.5px] leading-tight text-white ${cajaDe(i) === c ? 'bg-green-500/30 ring-1 ring-green-400' : 'bg-red-500/30 ring-1 ring-red-400'}`}>
                {textoItem(i, l).slice(0, 44)}{textoItem(i, l).length > 44 ? '…' : ''}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaArbol({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, l, tr, revelado, elegida, onResponder }
  return (
    <div className="w-full">
      {ronda.tipo === 'rasgos' || ronda.tipo === 'especies' ? <Escalera {...props} />
        : ronda.tipo === 'ancestro' ? <Ancestro {...props} />
        : ronda.tipo === 'ordena' ? <Ordena {...props} />
        : <Clasifica {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
