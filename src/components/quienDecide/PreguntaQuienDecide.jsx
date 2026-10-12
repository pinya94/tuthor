// Una ronda de ¿Quién Decide? En las de órgano y poder, un organigrama del
// Estado (Corona, tres poderes, Tribunal Constitucional, Defensor del Pueblo
// y comunidades autónomas) que al corregir ilumina la respuesta. En la de la
// ley, los pasos ya dados en fila y un hueco para el siguiente.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, tx, CASOS_ORGANO, CASOS_PODER, CASOS_DERECHO, PASOS_LEY, NUMEROS } from '../../lib/quienDecide'

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

function Organigrama({ r, revelado, elegida, tr }) {
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
          <g key={id}>
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

function PasosLey({ r, revelado, l }) {
  const hechos = PASOS_LEY.slice(0, r.paso)
  return (
    <ol className="space-y-1.5 text-left">
      {hechos.map((p, i) => (
        <li key={p.id} className="flex gap-2 items-start text-[13px] text-white/80">
          <span className="shrink-0 w-5 h-5 rounded-full bg-white/15 text-white text-[11px] font-black flex items-center justify-center">{i + 1}</span>
          <span className="leading-snug">{tx(p.t, l)}</span>
        </li>
      ))}
      <li className={`flex gap-2 items-start text-[13px] rounded-lg border-2 px-1.5 py-1 ${revelado ? 'border-green-400 text-green-200' : 'border-dashed border-amber-300 text-amber-200'}`}>
        <span className="shrink-0 w-5 h-5 rounded-full bg-amber-300 text-black text-[11px] font-black flex items-center justify-center">{r.paso + 1}</span>
        <span className="leading-snug font-bold">{revelado ? tx(PASOS_LEY[r.paso].t, l) : '?'}</span>
      </li>
    </ol>
  )
}

export default function PreguntaQuienDecide({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  let tarjeta
  if (r.tipo === 'organo' || r.tipo === 'poder') {
    const texto = r.tipo === 'organo' ? CASOS_ORGANO[r.caso][1] : CASOS_PODER[r.caso][2]
    tarjeta = (
      <>
        <p className="text-white font-bold text-lg leading-snug text-center mb-3 px-1">
          {r.tipo === 'poder' && <span className="mr-1.5">{CASOS_PODER[r.caso][1]}</span>}{tx(texto, l)}
        </p>
        <Organigrama r={r} revelado={revelado} elegida={elegida} tr={tr} />
      </>
    )
  } else if (r.tipo === 'ley') tarjeta = <PasosLey r={r} revelado={revelado} l={l} />
  else if (r.tipo === 'derecho') {
    const [, nombre, art] = CASOS_DERECHO[r.caso]
    tarjeta = (
      <div className="text-center">
        <p className="text-white font-black text-2xl leading-snug">{tx(nombre, l)}</p>
        <p className={`text-sm font-bold mt-1 ${revelado ? 'text-green-300' : 'text-white/40'}`}>{revelado ? tr({ es: `Artículo ${art}`, en: `Article ${art}`, ca: `Article ${art}` }) : tr({ es: 'Artículo ?', en: 'Article ?', ca: 'Article ?' })}</p>
      </div>
    )
  } else if (r.tipo === 'numero') {
    const n = NUMEROS.find(x => x.id === r.num)
    tarjeta = (
      <div className="text-center">
        <p className="text-4xl">📜</p>
        <p className={`font-black text-5xl mt-1 tabular-nums ${revelado ? 'text-green-300' : 'text-amber-300'}`}>{revelado ? textoOpcion(n.r, r, l) : '?'}</p>
      </div>
    )
  } else tarjeta = (
    <div className="text-center">
      <p className="text-4xl">🏛️ ↔ 🏘️</p>
      <p className="text-white/70 text-sm font-bold mt-2">{tr({ es: 'Estado (art. 149) o comunidad autónoma (art. 148)', en: 'State (Art. 149) or autonomous community (Art. 148)', ca: 'Estat (art. 149) o comunitat autònoma (art. 148)' })}</p>
    </div>
  )

  const largas = ['derecho', 'ley', 'competencia', 'organo', 'poder'].includes(r.tipo)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3">{tarjeta}</div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${largas ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
