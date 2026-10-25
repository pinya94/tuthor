// Una ronda de ¿Quién Decide? En las de órgano y poder, un organigrama del
// Estado (Corona, tres poderes, Tribunal Constitucional, Defensor del Pueblo
// y comunidades autónomas) que al corregir ilumina la respuesta. En la de la
// ley, los pasos ya dados en fila y un hueco para el siguiente. Sin opciones:
// el órgano se toca en el organigrama, los casos se llevan a sus cajas, los
// números se teclean y los pasos de la ley se ordenan.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, tx, CASOS_ORGANO, esCorrecta, respuestaBuena, cajaDe, nombreItem, nombreCaja, textoPaso } from '../../lib/quienDecide'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const comprobar = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }

const CAJAS = {
  rey:       { x: 110, y: 6, w: 120, h: 30 },
  congreso:  { x: 6, y: 76, w: 104, h: 34 },
  senado:    { x: 6, y: 116, w: 104, h: 34 },
  gobierno:  { x: 118, y: 76, w: 104, h: 74 },
  cgpj:      { x: 230, y: 76, w: 104, h: 34 },
  supremo:   { x: 230, y: 116, w: 104, h: 34 },
  tc:        { x: 6, y: 170, w: 104, h: 36 },
  defensor:  { x: 118, y: 170, w: 104, h: 36 },
  ccaa:      { x: 230, y: 170, w: 104, h: 36 },
}
const COLUMNAS = { legislativo: 6, ejecutivo: 118, judicial: 230 }
const DE_PODER = { congreso: 'legislativo', senado: 'legislativo', gobierno: 'ejecutivo', cgpj: 'judicial', supremo: 'judicial' }

function Organigrama({ r, revelado, elegida, tr, onElige }) {
  const L = {
    rey: [tr({ es: 'El rey', en: 'The King', ca: 'El rei' })],
    congreso: [tr({ es: 'Congreso', en: 'Congress', ca: 'Congrés' })],
    senado: [tr({ es: 'Senado', en: 'Senate', ca: 'Senat' })],
    gobierno: [tr({ es: 'Gobierno', en: 'Government', ca: 'Govern' })],
    cgpj: ['CGPJ'],
    supremo: [tr({ es: 'Tribunal', en: 'Supreme', ca: 'Tribunal' }), tr({ es: 'Supremo', en: 'Court', ca: 'Suprem' })],
    tc: [tr({ es: 'Tribunal', en: 'Constitutional', ca: 'Tribunal' }), tr({ es: 'Constitucional', en: 'Court', ca: 'Constitucional' })],
    defensor: [tr({ es: 'Defensor', en: 'Ombudsman', ca: 'Defensor' }), tr({ es: 'del Pueblo', en: '', ca: 'del Poble' })],
    ccaa: [tr({ es: 'Comunidades', en: 'Autonomous', ca: 'Comunitats' }), tr({ es: 'autónomas', en: 'communities', ca: 'autònomes' })],
  }
  const P = {
    legislativo: tr({ es: 'LEGISLATIVO', en: 'LEGISLATIVE', ca: 'LEGISLATIU' }),
    ejecutivo: tr({ es: 'EJECUTIVO', en: 'EXECUTIVE', ca: 'EXECUTIU' }),
    judicial: tr({ es: 'JUDICIAL', en: 'JUDICIAL', ca: 'JUDICIAL' }),
  }
  const estado = id => {
    if (!revelado) return 'neutro'
    const objetivo = r.tipo === 'poder' ? DE_PODER[id] === r.bueno : id === r.bueno
    const fallo = r.tipo === 'poder' ? DE_PODER[id] === elegida && elegida !== r.bueno : id === elegida && elegida !== r.bueno
    return objetivo ? 'bien' : fallo ? 'mal' : 'neutro'
  }
  const fill = { neutro: '#1E293B', bien: '#166534', mal: '#7F1D1D' }
  const stroke = { neutro: '#475569', bien: '#4ADE80', mal: '#F87171' }
  return (
    <svg viewBox="0 0 340 212" className="w-full max-w-[360px] mx-auto block" aria-hidden="true">
      <path d="M170 36 V48 M58 48 H282 M58 48 V58 M170 48 V58 M282 48 V58" stroke="#475569" strokeWidth="1.5" fill="none" />
      {Object.entries(COLUMNAS).map(([p, x]) => {
        const activo = revelado && r.tipo === 'poder' && p === r.bueno
        return (
          <g key={p}>
            <rect x={x} y={58} width={104} height={14} rx="4" fill={activo ? '#4ADE80' : '#334155'} />
            <text x={x + 52} y={68.5} textAnchor="middle" fontSize="8.5" fontWeight="900" fill={activo ? '#052e16' : '#CBD5E1'} letterSpacing="0.5">{P[p]}</text>
          </g>
        )
      })}
      <line x1="6" x2="334" y1="160" y2="160" stroke="#334155" strokeDasharray="4 4" />
      {Object.entries(CAJAS).map(([id, c]) => {
        const e = estado(id)
        const lineas = L[id].filter(Boolean)
        return (
          <g key={id} onClick={onElige && !revelado ? () => onElige(id) : undefined} style={onElige && !revelado ? { cursor: 'pointer' } : undefined}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="7" fill={fill[e]} stroke={stroke[e]} strokeWidth={e === 'neutro' ? 1.2 : 2.2} />
            {lineas.map((t, i) => (
              <text key={i} x={c.x + c.w / 2} y={c.y + c.h / 2 + 4 + (i - (lineas.length - 1) / 2) * 12} textAnchor="middle" fontSize="11" fontWeight="800" fill="#F8FAFC">{t}</text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.findIndex(it => puestas[it] == null)
  const pon = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.items[activa]]: c }
    setPuestas(n)
    if (r.items.every(it => n[it] != null)) onResponder(`clasifica:${r.items.filter(it => n[it] !== cajaDe(r, it)).length}`)
  }
  return (
    <>
      {activa >= 0 && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 text-center">
          <p className="text-white/40 text-xs">{activa + 1} / {r.items.length}</p>
          <p className="text-white font-black text-lg leading-snug">{nombreItem(r, r.items[activa], l)}</p>
        </div>
      )}
      <div className={`grid gap-2 ${r.cajas.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => pon(c)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-2 min-h-[5rem] text-left">
            <span className="block text-white font-black text-[12.5px] leading-tight">{nombreCaja(r, c, l)}</span>
            {r.items.filter(it => puestas[it] === c).map(it => (
              <span key={it} className={`block mt-1 rounded-md px-1.5 py-1 text-[11px] font-bold text-white leading-tight ${revelado ? (cajaDe(r, it) === c ? 'bg-green-500/25 ring-1 ring-green-400' : 'bg-red-500/25 ring-1 ring-red-400') : 'bg-white/10'}`}>
                {nombreItem(r, it, l)}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

function Ordena({ r, revelado, elegida, onResponder, l, tr }) {
  const [orden, setOrden] = useState([])
  const mostrado = revelado ? String(elegida ?? '').split('>').filter(Boolean) : orden
  const ok = revelado && esCorrecta(r, elegida)
  const bueno = respuestaBuena(r).split('>')
  return (
    <>
      <ol className="space-y-1.5 mb-3">
        {r.pasos.map((_, k) => {
          const id = mostrado[k]
          const color = revelado ? (id === bueno[k] ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15') : id ? 'border-white/25 bg-white/[0.07]' : 'border-dashed border-amber-300/50'
          return (
            <li key={k} className={`flex gap-2 items-start rounded-xl border-2 px-2 py-1.5 text-[13px] text-white ${color}`}>
              <span className="shrink-0 w-5 h-5 rounded-full bg-amber-300 text-black text-[11px] font-black grid place-items-center">{k + 1}</span>
              <span className="leading-snug">{id ? textoPaso(id, l) : '…'}</span>
            </li>
          )
        })}
      </ol>
      {revelado
        ? !ok && <ol className="space-y-1 text-green-300 text-[12.5px] font-bold">{bueno.map((id, k) => <li key={id}>{k + 1}. {textoPaso(id, l)}</li>)}</ol>
        : (
          <>
            <div className="space-y-1.5 mb-3">
              {r.pasos.filter(id => !orden.includes(id)).map(id => (
                <button key={id} onClick={() => setOrden(o => [...o, id])} className="w-full text-left rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-3 py-2 text-[13px] text-white font-semibold leading-snug">{textoPaso(id, l)}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-3 rounded-2xl bg-white/10 text-white font-bold disabled:opacity-30" disabled={!orden.length} onClick={() => setOrden([])}>{tr({ es: 'Borrar', en: 'Clear', ca: 'Esborrar' })}</button>
              <button className={boton} disabled={orden.length < r.pasos.length} onClick={() => onResponder(orden.join('>'))}>{tr(comprobar)}</button>
            </div>
          </>
        )}
    </>
  )
}

function Teclea({ r, revelado, elegida, onResponder, l, tr }) {
  const [v, setV] = useState('')
  const ok = revelado && esCorrecta(r, elegida)
  const escribe = t => setV(x => (t === '⌫' ? x.slice(0, -1) : x.length < 5 ? x + t : x))
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 text-center">
        <p className="text-4xl">📜</p>
        <p className={`font-black text-5xl mt-1 tabular-nums ${revelado ? (ok ? 'text-green-300' : 'text-red-300') : 'text-amber-300'}`}>{(revelado ? String(elegida ?? '') : v) || '?'}</p>
        {revelado && !ok && <p className="text-green-300 font-black mt-1">→ {textoOpcion(r.bueno, r, l)}</p>}
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((t, i) => (t ? <button key={t} className={tecla} onClick={() => escribe(t)}>{t}</button> : <span key={`h${i}`} />))}
          </div>
          <button className={boton} disabled={!v} onClick={() => onResponder(v)}>{tr(comprobar)}</button>
        </>
      )}
    </>
  )
}

export default function PreguntaQuienDecide({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const props = { r, revelado, elegida, onResponder, l, tr }
  let cuerpo
  if (r.mecanica === 'toca') {
    cuerpo = (
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4">
        <p className="text-white font-bold text-lg leading-snug text-center mb-3 px-1">{tx(CASOS_ORGANO[r.caso][1], l)}</p>
        <Organigrama r={r} revelado={revelado} elegida={elegida} tr={tr} onElige={onResponder} />
      </div>
    )
  } else if (r.mecanica === 'clasifica') cuerpo = <Clasifica {...props} />
  else if (r.mecanica === 'ordena') cuerpo = <Ordena {...props} />
  else cuerpo = <Teclea {...props} />
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
