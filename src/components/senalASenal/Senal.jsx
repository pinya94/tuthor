// Señales de tráfico dibujadas en SVG como MARCO + SÍMBOLO, para poder
// montarlas pieza a pieza en el juego. Formas y colores del Código de la
// circulación: triángulo de peligro, círculo rojo de prohibición, círculo
// azul de obligación, cuadrado azul de indicación y las dos de prioridad.
import { MARCOS, senal } from '../../lib/senalASenal'

const ROJO = '#DC2626', AZUL = '#1D4ED8', NEGRO = '#111827', BLANCO = '#FFFFFF'

function Marco({ id }) {
  switch (id) {
    case 'peligro': return <polygon points="50,8 94,86 6,86" fill={BLANCO} stroke={ROJO} strokeWidth="8" strokeLinejoin="round" />
    case 'prohibicion': return <circle cx="50" cy="50" r="42" fill={BLANCO} stroke={ROJO} strokeWidth="9" />
    case 'prohibicionAzul': return <circle cx="50" cy="50" r="42" fill={AZUL} stroke={ROJO} strokeWidth="9" />
    case 'rojoLleno': return <circle cx="50" cy="50" r="44" fill={ROJO} stroke={BLANCO} strokeWidth="2" />
    case 'obligacion': return <circle cx="50" cy="50" r="45" fill={AZUL} stroke={BLANCO} strokeWidth="2" />
    case 'indicacion': return <rect x="6" y="6" width="88" height="88" rx="8" fill={AZUL} stroke={BLANCO} strokeWidth="2" />
    case 'octogono': return <polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill={ROJO} stroke={BLANCO} strokeWidth="3" />
    case 'ceda': return <polygon points="6,14 94,14 50,90" fill={BLANCO} stroke={ROJO} strokeWidth="9" strokeLinejoin="round" />
    default: return <circle cx="50" cy="50" r="42" fill="none" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 6" />
  }
}

const Bici = ({ c, k = 1, x = 50, y = 52 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`} stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="-14" cy="6" r="9" /><circle cx="14" cy="6" r="9" />
    <path d="M-14 6 L-4 -8 L8 -8 L14 6 M-4 -8 L1 6 L8 -8 M-6 -13 L-1 -13 M6 -12 L10 -14" />
  </g>
)
const Persona = ({ c, k = 1, x = 50, y = 50 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`} stroke={c} strokeWidth="4" fill="none" strokeLinecap="round">
    <circle cx="2" cy="-18" r="4" fill={c} stroke="none" />
    <path d="M1 -12 L-2 2 L-9 14 M-2 2 L6 14 M0 -8 L-8 -2 M0 -8 L8 -4" />
  </g>
)
const Cebra = ({ c, y }) => <g>{[-3, -1, 1, 3].map(i => <rect key={i} x={46 + i * 7} y={y} width="4" height="8" fill={c} />)}</g>
const Texto = ({ t, c, size, y }) => <text x="50" y={y} textAnchor="middle" fontSize={size} fontWeight="900" fill={c} fontFamily="Arial, sans-serif">{t}</text>

function Simbolo({ id, marco }) {
  const c = MARCOS[marco]?.oscuro ? BLANCO : NEGRO
  switch (id) {
    case 'curva': return (
      <g>
        <path d="M44 76 L44 56 Q44 46 56 44" stroke={c} strokeWidth="6" fill="none" />
        <path d="M54 36 L64 44 L54 52 Z" fill={c} />
      </g>
    )
    case 'peaton':
      if (marco === 'indicacion') return (
        <g>
          <polygon points="50,16 84,78 16,78" fill={BLANCO} />
          <Persona c={NEGRO} k={0.8} y={58} /><Cebra c={NEGRO} y={66} />
        </g>
      )
      return <g><Persona c={c} k={0.95} y={marco === 'peligro' ? 62 : 48} /><Cebra c={c} y={marco === 'peligro' ? 74 : 64} /></g>
    case 'semaforo': return (
      <g>
        <rect x="42" y="42" width="16" height="36" rx="3" fill={NEGRO} />
        <circle cx="50" cy="49" r="4.5" fill={ROJO} /><circle cx="50" cy="60" r="4.5" fill="#F59E0B" /><circle cx="50" cy="71" r="4.5" fill="#16A34A" />
      </g>
    )
    case 'bici': return <Bici c={c} k={marco === 'peligro' ? 0.95 : 1.12} y={marco === 'peligro' ? 64 : 52} />
    case 'n50': return <Texto t="50" c={c} size="34" y={marco === 'peligro' ? 76 : 62} />
    case 'n30': return <Texto t="30" c={c} size="34" y={marco === 'peligro' ? 76 : 62} />
    case 'flecha': return (
      <g>
        <path d="M26 50 L62 50" stroke={c} strokeWidth="11" />
        <path d="M58 32 L80 50 L58 68 Z" fill={c} />
      </g>
    )
    case 'P': return marco === 'peligro' ? <Texto t="P" c={c} size="40" y="78" /> : <Texto t="P" c={c} size="60" y="72" />
    case 'H': return marco === 'peligro' ? <Texto t="H" c={c} size="40" y="78" /> : <Texto t="H" c={c} size="60" y="72" />
    case 'sinSalida': return (
      <g>
        <rect x="40" y="34" width="20" height="50" fill={c} />
        <rect x="22" y="18" width="56" height="16" fill={ROJO} />
      </g>
    )
    case 'barra':
      if (marco === 'rojoLleno') return <rect x="20" y="42" width="60" height="16" fill={BLANCO} />
      return <line x1="22" y1="22" x2="78" y2="78" stroke={ROJO} strokeWidth="9" />
    case 'aspa': return (
      <g>
        <line x1="22" y1="22" x2="78" y2="78" stroke={ROJO} strokeWidth="9" />
        <line x1="78" y1="22" x2="22" y2="78" stroke={ROJO} strokeWidth="9" />
      </g>
    )
    case 'stop': return <Texto t="STOP" c={marco === 'octogono' ? BLANCO : c} size="27" y="60" />
    default: return null
  }
}

// Una señal montada con piezas sueltas (cualquiera de las dos puede faltar).
export function SenalPieza({ marco, simbolo, className = 'w-40 mx-auto block' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <Marco id={marco} />
      {simbolo && <Simbolo id={simbolo} marco={marco} />}
    </svg>
  )
}

export default function Senal({ id, className }) {
  const sn = senal(id)
  if (!sn) return null
  return <SenalPieza marco={sn.marco} simbolo={sn.simbolo} className={className} />
}
