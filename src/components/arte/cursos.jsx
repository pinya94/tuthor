// Arte del selector de curso: una ilustración por etapa (tarjeta de la home)
// y un glifo de línea por opción (pastillas). Sustituyen a los emojis.

function Primaria(props) {
  return (
    <svg viewBox="0 0 96 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <rect x="16" y="8" width="50" height="48" rx="5" fill="#FFFBEB" />
      <rect x="16" y="8" width="9" height="48" rx="4" fill="#F59E0B" />
      <path d="M25 8V56" stroke="#D97706" strokeWidth="1.5" />
      <text x="45" y="30" fontSize="14" fontWeight="800" fill="#B45309" textAnchor="middle" fontFamily="inherit">abc</text>
      <rect x="32" y="37" width="26" height="3" rx="1.5" fill="#FCD34D" />
      <rect x="32" y="44" width="18" height="3" rx="1.5" fill="#FDE68A" />
      <g transform="translate(64 56) rotate(-58)">
        <path d="M0 0L8 -3.5V3.5Z" fill="#FDE68A" />
        <path d="M0 0L3 -1.3V1.3Z" fill="#334155" />
        <rect x="8" y="-3.5" width="26" height="7" fill="#FB923C" />
        <rect x="34" y="-3.8" width="4" height="7.6" fill="#CBD5E1" />
        <rect x="36" y="-3.5" width="7" height="7" rx="2" fill="#F472B6" />
      </g>
    </svg>
  )
}

function Eso(props) {
  return (
    <svg viewBox="0 0 96 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path d="M46 56Q34 50 12 52V20Q34 18 46 24Z" fill="#E0F2FE" />
      <path d="M46 56Q58 50 80 52V20Q58 18 46 24Z" fill="#F0F9FF" />
      <path d="M46 24V56" stroke="#0369A1" strokeWidth="1.5" />
      <path d="M18 30Q30 28 40 32M18 38Q30 36 40 40M18 46Q30 44 40 48" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 32Q62 28 74 30M52 40Q62 36 74 38" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
      <g stroke="#0EA5E9" strokeWidth="1.8">
        <ellipse cx="78" cy="14" rx="12" ry="4.5" />
        <ellipse cx="78" cy="14" rx="12" ry="4.5" transform="rotate(60 78 14)" />
        <ellipse cx="78" cy="14" rx="12" ry="4.5" transform="rotate(-60 78 14)" />
      </g>
      <circle cx="78" cy="14" r="2.8" fill="#F472B6" />
    </svg>
  )
}

function Bachillerato(props) {
  return (
    <svg viewBox="0 0 96 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <rect x="50" y="38" width="38" height="14" rx="7" fill="#F5F5F4" />
      <ellipse cx="84" cy="45" rx="4" ry="7" fill="#E7E5E4" />
      <rect x="64" y="36" width="6" height="18" fill="#EF4444" />
      <path d="M22 28V39Q36 47 50 39V28" fill="#312E81" />
      <path d="M36 12L66 24L36 36L6 24Z" fill="#4338CA" />
      <path d="M36 24L58 29V41" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="55" y="40" width="6" height="7" rx="1.5" fill="#FBBF24" />
      <circle cx="36" cy="24" r="2.2" fill="#FBBF24" />
    </svg>
  )
}

export const ARTE_CURSOS = { primaria: Primaria, eso: Eso, bachillerato: Bachillerato }

// Glifos de línea (24×24, currentColor) para las pastillas del filtro.
const trazo = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const GLIFOS_CURSO = {
  todas: <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" {...trazo}><path d="M12 4 4 8l8 4 8-4-8-4ZM4 12l8 4 8-4M4 16l8 4 8-4" /></svg>,
  primaria: <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" {...trazo}><path d="M4 20l1-4L16 5l3 3L8 19l-4 1ZM14 7l3 3" /></svg>,
  eso: <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" {...trazo}><path d="M12 6c-2-1.5-5-2-8-1.5V18c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6ZM12 6v13.5" /></svg>,
  bachillerato: <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true" {...trazo}><path d="M2 9l10-5 10 5-10 5L2 9ZM6 11v5c3 2.5 9 2.5 12 0v-5M22 9v5" /></svg>,
}
