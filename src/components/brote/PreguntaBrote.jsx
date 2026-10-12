// Una ronda de ¡Brote! Según el tipo, la tarjeta enseña un microbio dibujado,
// una enfermedad, un caso (defensas, inmunidad), el árbol de contagios por
// generaciones o un enfermo con sus contactos (inmunidad de grupo).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, enfermedad, tx, DEFENSAS, CASOS_INMUNIDAD, VIAS, MICROBIOS } from '../../lib/brote'

const VERDE = '#4ADE80', NUCLEO = '#7C3AED', BORDE = '#0F172A'

// ── Microbios ─────────────────────────────────────────────────────────────
export function Microbio({ forma, className = 'w-full max-w-[260px] mx-auto block' }) {
  const g = {
    virus: (
      <g>
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2
          return <g key={i}><line x1={110 + 34 * Math.cos(a)} y1={75 + 34 * Math.sin(a)} x2={110 + 48 * Math.cos(a)} y2={75 + 48 * Math.sin(a)} stroke="#F472B6" strokeWidth="3" />
            <circle cx={110 + 50 * Math.cos(a)} cy={75 + 50 * Math.sin(a)} r="5" fill="#F472B6" /></g>
        })}
        <circle cx="110" cy="75" r="35" fill="#C084FC" stroke={BORDE} strokeWidth="2" />
        <path d="M88 70 q8 -14 16 0 t16 0 t16 0" stroke="#FDE68A" strokeWidth="3" fill="none" />
        <path d="M92 86 q8 -12 16 0 t16 0" stroke="#FDE68A" strokeWidth="3" fill="none" />
      </g>
    ),
    fago: (
      <g>
        <polygon points="110,10 134,24 134,52 110,66 86,52 86,24" fill="#C084FC" stroke={BORDE} strokeWidth="2" />
        <rect x="104" y="66" width="12" height="44" fill="#A78BFA" stroke={BORDE} strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => <line key={i} x1="104" x2="116" y1={72 + i * 8} y2={72 + i * 8} stroke={BORDE} strokeWidth="1.5" />)}
        <rect x="94" y="108" width="32" height="7" rx="2" fill="#A78BFA" stroke={BORDE} strokeWidth="2" />
        {[-1, 1].map(d => <g key={d}><path d={`M${110 + d * 14} 115 l${d * 18} 12 l${d * 4} 16`} stroke="#E9D5FF" strokeWidth="3" fill="none" />
          <path d={`M${110 + d * 6} 115 l${d * 8} 16 l${d * 2} 14`} stroke="#E9D5FF" strokeWidth="3" fill="none" /></g>)}
      </g>
    ),
    bacilo: (
      <g>
        <path d="M168 75 q10 -14 20 0 t20 0" stroke="#86EFAC" strokeWidth="3" fill="none" />
        <rect x="40" y="52" width="130" height="46" rx="23" fill={VERDE} stroke={BORDE} strokeWidth="2" />
        <path d="M70 72 q10 -12 20 0 t20 0 t20 0 M76 82 q10 10 20 0 t20 0" stroke="#166534" strokeWidth="3" fill="none" />
      </g>
    ),
    coco: (
      <g>
        {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={42 + i * 34} cy={75 + (i % 2 ? -8 : 8)} r="17" fill={VERDE} stroke={BORDE} strokeWidth="2" />)}
      </g>
    ),
    espirilo: (
      <g>
        <path d="M30 75 q20 -40 40 0 t40 0 t40 0 t40 0" stroke={BORDE} strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M30 75 q20 -40 40 0 t40 0 t40 0 t40 0" stroke={VERDE} strokeWidth="14" fill="none" strokeLinecap="round" />
      </g>
    ),
    levadura: (
      <g>
        <ellipse cx="96" cy="84" rx="48" ry="38" fill="#FCD34D" stroke={BORDE} strokeWidth="2" />
        <ellipse cx="134" cy="54" rx="18" ry="15" fill="#FCD34D" stroke={BORDE} strokeWidth="2" />
        <circle cx="90" cy="86" r="14" fill={NUCLEO} stroke={BORDE} strokeWidth="2" />
        <circle cx="118" cy="100" r="6" fill="#FDE68A" />
      </g>
    ),
    moho: (
      <g stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M20 140 C70 130 120 138 200 132" />
        <path d="M60 136 L60 60 M110 136 L112 40 M180 133 L178 70 M112 90 L138 66" />
        {[[60, 52], [112, 32], [178, 62], [140, 58]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="13" fill="#64748B" stroke={BORDE} strokeWidth="2" />)}
        {[[56, 50], [64, 55], [108, 30], [116, 35], [175, 60], [181, 65], [137, 56]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#CBD5E1" stroke="none" />)}
      </g>
    ),
    ameba: (
      <g>
        <path d="M60 80 C40 50 70 30 95 45 C110 20 150 25 150 50 C185 45 195 80 165 95 C175 125 130 135 115 115 C90 135 50 125 62 100 C40 95 42 85 60 80 Z" fill="#60A5FA" stroke={BORDE} strokeWidth="2" />
        <circle cx="118" cy="78" r="15" fill={NUCLEO} stroke={BORDE} strokeWidth="2" />
        <circle cx="82" cy="95" r="7" fill="#BFDBFE" />
        <circle cx="150" cy="70" r="5" fill="#BFDBFE" />
      </g>
    ),
    paramecio: (
      <g>
        {Array.from({ length: 34 }, (_, i) => {
          const a = (i / 34) * Math.PI * 2
          return <line key={i} x1={110 + 82 * Math.cos(a)} y1={75 + 34 * Math.sin(a)} x2={110 + 92 * Math.cos(a)} y2={75 + 42 * Math.sin(a)} stroke="#7DD3FC" strokeWidth="2" />
        })}
        <path d="M30 75 C30 40 80 38 110 45 C150 52 192 40 192 75 C192 110 150 100 110 106 C75 112 30 110 30 75 Z" fill="#38BDF8" stroke={BORDE} strokeWidth="2" />
        <path d="M100 48 C110 70 120 80 118 104" stroke="#0369A1" strokeWidth="3" fill="none" />
        <ellipse cx="80" cy="78" rx="16" ry="11" fill={NUCLEO} stroke={BORDE} strokeWidth="2" />
        <circle cx="150" cy="70" r="7" fill="#E0F2FE" />
      </g>
    ),
  }[forma]
  return <svg viewBox="0 0 220 150" className={className} aria-hidden="true">{g}</svg>
}
// Un microbio que represente a cada tipo, para las tarjetas de enfermedad.
const TIPICO = { virus: 'virus', bacteria: 'bacilo', hongo: 'moho', protozoo: 'ameba' }

// ── Personas ──────────────────────────────────────────────────────────────
function Persona({ x, y, c, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-9" r="5" fill={c} />
      <path d="M-7 8 Q-7 -3 0 -3 Q7 -3 7 8 Z" fill={c} />
    </g>
  )
}

function Generaciones({ R, k, revelado, valor }) {
  const filas = Array.from({ length: k + 1 }, (_, g) => R ** g)
  const H = 34
  return (
    <svg viewBox={`0 0 320 ${(k + 1) * H + 6}`} className="w-full max-w-[340px] mx-auto block" aria-hidden="true">
      {filas.map((n, g) => {
        const y = 20 + g * H
        const ultima = g === k
        return (
          <g key={g}>
            <text x="4" y={y + 5} fontSize="12" fontWeight="800" fill="#94A3B8">{`G${g}`}</text>
            {ultima
              ? <g>
                  <rect x="130" y={y - 13} width="90" height="26" rx="8" fill="none" stroke={revelado ? VERDE : '#FBBF24'} strokeWidth="2" strokeDasharray={revelado ? '' : '5 4'} />
                  <text x="175" y={y + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={revelado ? '#86EFAC' : '#FBBF24'}>{revelado ? valor : '?'}</text>
                </g>
              : Array.from({ length: n }, (_, i) => {
                  const paso = Math.min(16, 270 / n)
                  return <Persona key={i} x={175 + (i - (n - 1) / 2) * paso} y={y + 2} c="#F87171" s={Math.min(1, paso / 15)} />
                })}
          </g>
        )
      })}
    </svg>
  )
}

function Grupo({ R, revelado }) {
  // El enfermo a la izquierda y sus R contactos en rejilla; al corregir,
  // R − 1 vacunados (azul) y 1 sin proteger: así cada enfermo contagia a 1 como mucho.
  const cols = Math.min(R, 5)
  const filas = Math.ceil(R / cols)
  return (
    <svg viewBox={`0 0 280 ${Math.max(90, filas * 26 + 24)}`} className="w-full max-w-[300px] mx-auto block" aria-hidden="true">
      <Persona x={34} y={50} c="#F87171" s={1.8} />
      <text x="34" y="82" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FCA5A5">R₀ = {R}</text>
      <path d="M62 46 L110 46" stroke="#94A3B8" strokeWidth="2.5" />
      <path d="M104 40 L112 46 L104 52" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
      {Array.from({ length: R }, (_, i) => {
        const x = 136 + (i % cols) * 28, y = 24 + Math.floor(i / cols) * 26
        const c = !revelado ? '#E2E8F0' : i === 0 ? '#E2E8F0' : '#60A5FA'
        return <Persona key={i} x={x} y={y} c={c} />
      })}
    </svg>
  )
}

export default function PreguntaBrote({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const e = r.enf ? enfermedad(r.enf) : null
  const largas = ['celula', 'contagio', 'antibiotico', 'defensa'].includes(r.tipo)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  let tarjeta
  if (r.forma) tarjeta = <Microbio forma={r.forma} />
  else if (e) tarjeta = (
    <div className="text-center">
      <p className="text-white font-black text-3xl">{tx(e.nombre, l)}</p>
      {revelado && (
        <div className="flex items-center justify-center gap-3 mt-2">
          <Microbio forma={TIPICO[e.mic]} className="w-20" />
          <span className="text-white/80 text-sm font-bold">{tx(MICROBIOS[e.mic], l)}{e.via ? ` · ${VIAS[e.via].emoji}` : ''}</span>
        </div>
      )}
    </div>
  )
  else if (r.tipo === 'defensa' || r.tipo === 'inmunidad') {
    const [, emoji, texto] = (r.tipo === 'defensa' ? DEFENSAS : CASOS_INMUNIDAD)[r.caso]
    tarjeta = (
      <div className="text-center px-1">
        <p className="text-4xl mb-2">{emoji}</p>
        <p className="text-white font-bold text-lg leading-snug">{tx(texto, l)}</p>
      </div>
    )
  }
  else if (r.tipo === 'generaciones') tarjeta = <Generaciones R={r.R} k={r.k} revelado={revelado} valor={r.bueno} />
  else if (r.tipo === 'grupo') tarjeta = <Grupo R={r.R} revelado={revelado} />
  else tarjeta = (
    <p className="text-white/80 text-center font-bold">
      🦠 {tr({ es: 'Infecciosa = la causa un microbio: virus, bacteria, hongo o protozoo.', en: 'Infectious = caused by a microbe: virus, bacterium, fungus or protozoan.', ca: 'Infecciosa = la causa un microbi: virus, bacteri, fong o protozou.' })}
    </p>
  )
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 min-h-[9rem] flex flex-col justify-center">{tarjeta}</div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${largas || r.opciones.length === 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
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
