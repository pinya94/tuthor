// Arte de economía (Spicy), música (Pentagrama Path) y vida práctica
// (Reacción). Cada dibujo enseña la mecánica real del juego.
import { Lienzo } from './base'

function Spicy(p) {
  const camino = 'M18 112C70 112 60 72 110 72C156 72 146 36 196 36'
  return (
    <Lienzo {...p}>
      <path d={camino} stroke="#334155" strokeWidth="16" strokeLinecap="round" />
      <path d={camino} stroke="#FDE68A" strokeWidth="2" strokeDasharray="6 6" />
      {[[65, 92], [110, 72], [151.5, 54]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      ))}
      {/* el cruce: cada decisión lleva a un sitio */}
      <rect x="85" y="32" width="3" height="36" fill="#A8A29E" />
      <path d="M88 34H108L114 39L108 44H88Z" fill="#F97316" />
      <path d="M85 48H66L60 53L66 58H85Z" fill="#64748B" />
      {/* la guindilla */}
      <path d="M204 16Q226 12 230 28Q228 42 210 44Q220 32 204 16Z" fill="#EF4444" />
      <path d="M204 16Q200 10 194 12" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
    </Lienzo>
  )
}

function PentagramaPath(p) {
  const notas = [[70, 44], [104, 36], [138, 28, true], [172, 40]]
  const negras = [54, 74, 114, 134, 154]
  return (
    <Lienzo {...p}>
      <path d="M26 20H214M26 28H214M26 36H214M26 44H214M26 52H214M206 20V52" stroke="#A5B4FC" strokeWidth="1.5" />
      {notas.map(([x, y, on]) => (
        <g key={x}>
          <path d={`M${x + 5.2} ${y - 1}V${y - 24}`} stroke={on ? '#F472B6' : '#F8FAFC'} strokeWidth="2" />
          <ellipse cx={x} cy={y} rx="6" ry="4.6" fill={on ? '#F472B6' : '#F8FAFC'} transform={`rotate(-20 ${x} ${y})`} />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={40 + i * 20} y="70" width="20" height="52" rx="2" fill={i === 4 ? '#F472B6' : '#F8FAFC'} stroke="#CBD5E1" strokeWidth="1" />
      ))}
      {negras.map(x => <rect key={x} x={x} y="70" width="12" height="30" rx="2" fill="#1E1B4B" />)}
      <path d="M137 34L131 104" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="3 3" />
    </Lienzo>
  )
}

function Reaccion(p) {
  return (
    <Lienzo {...p}>
      <path d="M88 44V36H112V44" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="62" y="44" width="76" height="58" rx="10" fill="#EF4444" />
      <rect x="94" y="58" width="12" height="30" rx="2" fill="#FFFFFF" />
      <rect x="85" y="67" width="30" height="12" rx="2" fill="#FFFFFF" />
      <path d="M146 76H162L168 60L176 96L184 68L190 76H222" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="197" y="17" width="6" height="5" rx="1" fill="#FBBF24" />
      <circle cx="200" cy="36" r="14" fill="#F8FAFC" stroke="#FBBF24" strokeWidth="3" />
      <path d="M200 36L207 29" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="36" r="1.8" fill="#1E293B" />
    </Lienzo>
  )
}

export const ARTE_VIDA = {
  spicy: Spicy,
  'pentagrama-path': PentagramaPath,
  reaccion: Reaccion,
}
