// Una ronda de Termómetro. Según el tipo:
//   escala  → el termómetro con dos escalas y sus puntos de referencia
//             (0 °C = 273 K = 32 °F; 100 °C = 373 K = 212 °F)
//   mezcla  → dos vasos de agua (altura según la masa, color según la
//             temperatura) y el vaso de la mezcla, que se colorea al corregir
//   calor   → el bloque de la sustancia, de la temperatura inicial a la final
//   resto   → la escena con su emoji
// La usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, escalaDe, aK, aF, colorAgua, num, SUSTANCIAS, ESCENAS, CONCEPTOS } from '../../lib/termometro'

const UNI = { C: '°C', K: 'K', F: '°F' }
const deC = (c, u) => (u === 'C' ? c : u === 'K' ? aK(c) : aF(c))

function TermometroDoble({ ronda, revelado, l }) {
  const [de, a] = escalaDe(ronda)
  const c = ronda.c
  const cMin = -70, cMax = 165
  const y = t => 214 - ((t - cMin) / (cMax - cMin)) * 190
  const refs = [0, 100]
  const lado = (u, x, ancla) => refs.map(r => (
    <g key={`${u}${r}`}>
      <line x1={ancla === 'end' ? x + 4 : x - 14} x2={ancla === 'end' ? x + 16 : x - 2} y1={y(r)} y2={y(r)} stroke="#94A3B8" strokeWidth="1.5" />
      <text x={x} y={y(r) + 4} textAnchor={ancla} fontSize="11" fontWeight="700" fill="#94A3B8">{num(deC(r, u), l)} {UNI[u]}</text>
    </g>
  ))
  const etiqueta = (x, ancla, texto, color) => (
    <text x={x} y={y(c) + 5} textAnchor={ancla} fontSize="15" fontWeight="900" fill={color} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>{texto}</text>
  )
  const nivel = Math.max(y(cMax - 5), Math.min(y(c), 214))
  return (
    <svg viewBox="0 0 260 250" className="w-full max-w-[300px] mx-auto h-auto" role="img" aria-label="Termómetro">
      <text x="64" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FDE68A">{UNI[de]}</text>
      <text x="196" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FDE68A">{UNI[a]}</text>
      <rect x="120" y="18" width="20" height="208" rx="10" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
      <rect x="125" y={nivel} width="10" height={226 - nivel} fill="#EF4444" />
      <circle cx="130" cy="232" r="16" fill="#EF4444" stroke="#64748B" strokeWidth="2" />
      {lado(de, 104, 'end')}
      {lado(a, 156, 'start')}
      <line x1="94" x2="166" y1={y(c)} y2={y(c)} stroke="#FCD34D" strokeWidth="2" strokeDasharray="4 3" />
      {etiqueta(88, 'end', `${num(ronda.dato, l)} ${UNI[de]}`, '#FFFFFF')}
      {etiqueta(172, 'start', revelado ? `${num(ronda.bueno, l)} ${UNI[a]}` : '?', revelado ? '#86EFAC' : '#FCD34D')}
    </svg>
  )
}

// Un vaso: altura del agua según la masa, color según la temperatura.
function Vaso({ x, m, t, oculto }) {
  const alto = 26 + (m / 1000) * 90 // 100 g → 35, 1000 g → 116
  const top = 150 - alto
  return (
    <g>
      <rect x={x + 4} y={top} width="62" height={alto} fill={oculto ? '#334155' : colorAgua(t)} opacity="0.85" />
      <path d={`M${x} 36 L${x} 150 Q${x} 156 ${x + 6} 156 L${x + 64} 156 Q${x + 70} 156 ${x + 70} 150 L${x + 70} 36`} stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
      <text x={x + 35} y="176" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFFFFF">{m} g</text>
      <text x={x + 35} y="26" textAnchor="middle" fontSize="15" fontWeight="900" fill={oculto ? '#FCD34D' : '#FFFFFF'}>{oculto ? '?' : `${t} °C`}</text>
    </g>
  )
}

function Mezcla({ ronda, revelado }) {
  const [[m1, t1], [m2, t2]] = ronda.vasos
  return (
    <svg viewBox="0 0 330 184" className="w-full h-auto" role="img" aria-label="Mezcla de agua">
      <Vaso x={4} m={m1} t={t1} />
      <text x="92" y="104" textAnchor="middle" fontSize="22" fontWeight="900" fill="#94A3B8">+</text>
      <Vaso x={112} m={m2} t={t2} />
      <text x="200" y="104" textAnchor="middle" fontSize="22" fontWeight="900" fill="#94A3B8">→</text>
      <Vaso x={222} m={m1 + m2} t={ronda.bueno} oculto={!revelado} />
    </svg>
  )
}

function Calor({ ronda, l }) {
  const S = SUSTANCIAS[ronda.sustancia]
  const caja = t => (
    <div className="rounded-xl px-3 py-2 text-center border border-white/10" style={{ background: colorAgua(t) }}>
      <p className="text-white font-black text-lg tabular-nums leading-tight drop-shadow">{t} °C</p>
    </div>
  )
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="text-center">
        <p className="text-white/60 text-xs font-bold mb-1">{num(ronda.m, l)} kg · {S.n[l] ?? S.n.es}</p>
        {caja(ronda.t0)}
      </div>
      <div className="text-center px-1">
        <p className="text-2xl leading-none">🔥</p>
        <p className="text-amber-300 font-black text-sm">Q = ?</p>
      </div>
      <div className="text-center">
        <p className="text-white/60 text-xs font-bold mb-1">&nbsp;</p>
        {caja(ronda.tf)}
      </div>
    </div>
  )
}

export default function PreguntaTermometro({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const emoji = r.tipo === 'transmision' ? ESCENAS.find(e => e.id === r.escena).emoji
    : r.tipo === 'concepto' ? CONCEPTOS.find(c => c.id === r.concepto).emoji
    : r.tipo === 'conductor' ? (r.pide === 'conductor' ? '🔥' : '🍳') : null

  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const columnas = r.tipo === 'transmision' ? 'grid-cols-3' : r.tipo === 'concepto' ? 'grid-cols-1' : 'grid-cols-2'

  return (
    <div className="w-full">
      {(r.tipo === 'escala' || r.tipo === 'mezcla' || r.tipo === 'calor') && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">
          {r.tipo === 'escala' && <TermometroDoble ronda={r} revelado={revelado} l={l} />}
          {r.tipo === 'mezcla' && <Mezcla ronda={r} revelado={revelado} />}
          {r.tipo === 'calor' && <Calor ronda={r} l={l} />}
        </div>
      )}
      {emoji && <p className="text-center text-5xl leading-none mb-2" aria-hidden="true">{emoji}</p>}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${columnas}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-2 rounded-xl border text-white text-sm font-bold leading-snug tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
