// Iconos del sistema (monedas, racha, ranking, aciertos, tiempo…), dibujados
// para Tuthor en SVG plano: sustituyen a los emojis que hacían de icono en
// las pantallas finales, los exámenes y el ranking. 24×24, sin degradados;
// se escalan con className (w-4 h-4, w-10 h-10…).

const base = { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true }

export function Moneda(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="10" fill="#F59E0B" />
      <circle cx="12" cy="12" r="7.6" fill="#FBBF24" />
      <path d="M8.5 8.6h7M12 8.6v7.4" stroke="#B45309" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6.4 9.6a6.2 6.2 0 0 1 3.1-3.3" stroke="#FEF3C7" strokeOpacity=".85" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function Racha(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.5c2.6 3.3 6 5.6 6 10a6 6 0 0 1-12 0c0-2.3 1-4 2.2-5.3.1 1.8.9 3 2.2 3.5-.5-3 .4-5.7 1.6-8.2Z" fill="#F97316" />
      <path d="M12 12c1.4 1.5 2.6 2.6 2.6 4.3a2.6 2.6 0 0 1-5.2 0c0-1.2.7-2.1 1.4-2.8.1.9.5 1.4 1 1.6-.2-1.1 0-2.1.2-3.1Z" fill="#FDE047" />
    </svg>
  )
}

export function Trofeo(p) {
  return (
    <svg {...base} {...p}>
      <path d="M7 5.5H4.5v1.2A3.3 3.3 0 0 0 7.6 10M17 5.5h2.5v1.2A3.3 3.3 0 0 1 16.4 10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" fill="#FBBF24" />
      <rect x="10.8" y="13.5" width="2.4" height="3.5" fill="#F59E0B" />
      <rect x="7.5" y="17" width="9" height="3" rx="1" fill="#B45309" />
      <path d="M9.4 6.2v2.4" stroke="#FEF3C7" strokeOpacity=".85" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function Estrella(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8Z" fill="#FBBF24" strokeLinejoin="round" />
    </svg>
  )
}

export function Diana(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9.5" fill="#EF4444" />
      <circle cx="12" cy="12" r="6.5" fill="#FEE2E2" />
      <circle cx="12" cy="12" r="3.5" fill="#EF4444" />
    </svg>
  )
}

export function Acierto(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="10" fill="#22C55E" />
      <path d="M7.5 12.2l3 3 6-6.4" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Reloj(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="10" fill="#0EA5E9" />
      <circle cx="12" cy="12" r="7.6" fill="#F0F9FF" />
      <path d="M12 12V7.6M12 12l3.2 2" stroke="#0C4A6E" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  )
}

export function Rayo(p) {
  return (
    <svg {...base} {...p}>
      <path d="M13.5 2 4.5 13.4h6.3L9.6 22l9.9-12.2h-6.4Z" fill="#FACC15" strokeLinejoin="round" />
    </svg>
  )
}

export function Corazon(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 20.5S3 15 3 8.8A4.6 4.6 0 0 1 12 7.2a4.6 4.6 0 0 1 9 1.6C21 15 12 20.5 12 20.5Z" fill="#F43F5E" />
    </svg>
  )
}

export function Lista(p) {
  return (
    <svg {...base} {...p}>
      <rect x="4.5" y="3.5" width="15" height="18" rx="2.5" fill="#8B5CF6" />
      <rect x="6.5" y="5.5" width="11" height="14" rx="1.5" fill="#F5F3FF" />
      <rect x="9" y="2.2" width="6" height="3.2" rx="1.2" fill="#C4B5FD" />
      <path d="M8.8 10h6.4M8.8 13h6.4M8.8 16h4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Bombilla(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.8a6.4 6.4 0 0 0-3.6 11.7V16h7.2v-1.5A6.4 6.4 0 0 0 12 2.8Z" fill="#FDE68A" />
      <rect x="8.9" y="16.4" width="6.2" height="2.2" rx=".8" fill="#94A3B8" />
      <rect x="9.6" y="19" width="4.8" height="2" rx="1" fill="#64748B" />
      <path d="M10.3 12.5l1.7-2.3 1.7 2.3" stroke="#D97706" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Libro(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 6.3C10 4.8 7 4.3 3.5 4.8v13.6c3.5-.5 6.5 0 8.5 1.5Z" fill="#60A5FA" />
      <path d="M12 6.3c2-1.5 5-2 8.5-1.5v13.6c-3.5-.5-6.5 0-8.5 1.5Z" fill="#93C5FD" />
      <path d="M12 6.3v13.6" stroke="#1E40AF" strokeWidth="1.2" />
    </svg>
  )
}

export function Enlace(p) {
  return (
    <svg {...base} {...p} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  )
}

// Medalla de podio: 1 oro, 2 plata, 3 bronce.
const METAL = { 1: ['#FBBF24', '#B45309'], 2: ['#E2E8F0', '#64748B'], 3: ['#FDBA74', '#9A3412'] }
export function Medalla({ puesto, ...p }) {
  const [cara, borde] = METAL[puesto] || METAL[3]
  return (
    <svg {...base} {...p}>
      <path d="M7 2.5h3.5l2 5.5H9Z" fill="#60A5FA" />
      <path d="M17 2.5h-3.5l-2 5.5H15Z" fill="#F472B6" />
      <circle cx="12" cy="14.5" r="7" fill={cara} stroke={borde} strokeWidth="1.5" />
      <text x="12" y="18" fontSize="9" fontWeight="900" fill={borde} textAnchor="middle" fontFamily="inherit">{puesto}</text>
    </svg>
  )
}

// Dificultad en barras (1 a `total`): sustituye al semáforo 🟢🟡🔴.
const COLOR_NIVEL = ['#34D399', '#FBBF24', '#FB7185']
export function BarrasNivel({ n, total = 3, className = '' }) {
  const color = COLOR_NIVEL[Math.min(n, 3) - 1] || COLOR_NIVEL[0]
  return (
    <svg viewBox={`0 0 ${total * 6} 14`} className={className} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const h = 5 + (i * 9) / Math.max(1, total - 1)
        return <rect key={i} x={i * 6} y={14 - h} width="4" height={h} rx="1.2" fill={i < n ? color : '#FFFFFF'} fillOpacity={i < n ? 1 : 0.15} />
      })}
    </svg>
  )
}

// Anillo de nota: cuánto de `total` se ha acertado, con el número en medio.
export function AnilloNota({ valor, total = 10, className = '' }) {
  const r = 42
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, valor / total))
  const color = pct === 1 ? '#FBBF24' : pct >= 0.6 ? '#34D399' : pct >= 0.4 ? '#FB923C' : '#FB7185'
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r={r} stroke="#FFFFFF" strokeOpacity=".08" strokeWidth="8" fill="none" />
      <circle cx="50" cy="50" r={r} stroke={color} strokeWidth="8" fill="none" strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 50 50)" />
      <text x="50" y="57" fontSize="26" fontWeight="900" fill="#FFFFFF" textAnchor="middle" fontFamily="inherit">{valor}</text>
      <text x="50" y="72" fontSize="10" fontWeight="700" fill="#FFFFFF" fillOpacity=".45" textAnchor="middle" fontFamily="inherit">/ {total}</text>
    </svg>
  )
}

// Los juegos pasan emojis en sus estadísticas finales (47 pantallas): aquí se
// traducen a su icono propio. Un emoji sin equivalente simplemente no se
// pinta — la etiqueta de texto ya dice qué es.
const DE_EMOJI = {
  '✅': Acierto, '✔️': Acierto, '✔': Acierto,
  '⏱️': Reloj, '⏱': Reloj, '⏰': Reloj, '🕐': Reloj, '⌛': Reloj, '⏳': Reloj,
  '🔥': Racha,
  '🎯': Diana,
  '⚡': Rayo,
  '❤️': Corazon, '❤': Corazon, '💖': Corazon,
  '⭐': Estrella, '🌟': Estrella, '✨': Estrella,
  '🏆': Trofeo, '🥇': Trofeo,
  '💰': Moneda,
  '📝': Lista, '📋': Lista,
  '💡': Bombilla,
  '📚': Libro, '📖': Libro,
}
export function IconoDeEmoji({ emoji, className }) {
  const Icono = emoji ? DE_EMOJI[emoji] : null
  return Icono ? <Icono className={className} /> : null
}
