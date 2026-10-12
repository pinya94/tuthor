// Una ronda de Cadena de Carbono. La molécula en fórmula semidesarrollada:
// la cadena en fila, el grupo funcional arriba (O en rojo, N en azul), la
// rama abajo y los enlaces dobles y triples en ámbar. Al corregir se
// numeran los carbonos desde el extremo que manda el nombre.
import { useLang } from '../../context/LangContext'
import { carbonos, molecula, nombre, enunciado, textoOpcion, explicacion } from '../../lib/cadenaCarbono'

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

export function Molecula({ m, espejo, numerar }) {
  let cs = carbonos(m)
  if (espejo) cs = [...cs].reverse()
  const n = cs.length
  const W = 60 + (n - 1) * PASO
  const Y = 82
  // Un grupo de extremo a la izquierda se escribe al revés: OHC–, HOOC–.
  const texto = (c, k) => (k === 0 && n > 1 && c.etiqueta === 'CHO' ? 'OHC' : k === 0 && n > 1 && c.etiqueta === 'COOH' ? 'HOOC' : c.etiqueta)
  const xs = cs.map((_, k) => 30 + k * PASO)
  return (
    <svg viewBox={`0 0 ${W} 150`} className="w-full mx-auto block" style={{ maxWidth: W * 1.25 }} role="img" aria-label={nombre(m)}>
      {cs.slice(0, -1).map((c, k) => {
        const sig = cs[k + 1]
        const orden = carbonos(m).find(x => x.num === Math.min(c.num, sig.num)).enlace
        return <Lineas key={k} x1={xs[k] + ancho(texto(c, k)) / 2 + 3} y1={Y - 7} x2={xs[k + 1] - ancho(texto(sig, k + 1)) / 2 - 3} y2={Y - 7}
          orden={orden} c={orden > 1 ? AMBAR : '#94A3B8'} />
      })}
      {cs.map((c, k) => (
        <g key={c.num}>
          <Etiqueta x={xs[k]} y={Y} t={texto(c, k)} />
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

export default function PreguntaCadena({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const m = molecula(r)
  const conNombre = r.tipo === 'estructura'
  const largas = r.tipo === 'estructura' || r.tipo === 'isomero' || r.tipo === 'nombre'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 mb-3 min-h-[9rem] flex flex-col justify-center">
        {conNombre && <p className="text-white font-black text-2xl sm:text-3xl text-center py-2">{nombre(m, l)}</p>}
        {(!conNombre || revelado) && <Molecula m={m} espejo={r.espejo} numerar={revelado} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${largas ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all break-words ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
