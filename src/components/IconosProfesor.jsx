// Iconos de la parte del profesor (panel, clase, módulos y herramientas del
// aula), en el mismo estilo que Iconos.jsx: 24×24, planos, sin degradados.
// Sustituyen a los emojis que hacían de icono en pestañas y botones.
import { Libro, Moneda, Racha, Reloj, Lista } from './Iconos'

const base = { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true }
const trazo = { ...base, stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function Pupitre(p) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="8" width="18" height="4" rx="1" fill="#F59E0B" />
      <path d="M5 12v8M19 12v8" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <rect x="8" y="5" width="8" height="3" rx=".8" fill="#F8FAFC" />
      <path d="M9 16h6" stroke="#B45309" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Calendario(p) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" fill="#F8FAFC" />
      <path d="M3 7a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 7v2.5H3Z" fill="#EF4444" />
      <path d="M8 3v3.5M16 3v3.5" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" />
      <rect x="6.5" y="12" width="3" height="3" rx=".6" fill="#94A3B8" />
      <rect x="10.5" y="12" width="3" height="3" rx=".6" fill="#0EA5E9" />
      <rect x="14.5" y="12" width="3" height="3" rx=".6" fill="#94A3B8" />
      <rect x="6.5" y="16" width="3" height="3" rx=".6" fill="#94A3B8" />
    </svg>
  )
}

// Cuaderno de notas: una hoja con la nota rodeada en rojo.
export function Cuaderno(p) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="2.5" width="16" height="19" rx="2" fill="#F8FAFC" />
      <path d="M7 7.5h10M7 11h6" stroke="#CBD5E1" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="15" cy="16" r="3.8" stroke="#EF4444" strokeWidth="1.6" />
      <path d="M13.6 14.6v3M15.3 14.6h1.3v3h-1.3Z" stroke="#EF4444" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

// Pasar lista: carpeta con casillas marcadas.
export function PasarLista(p) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="3.5" width="16" height="18" rx="2.2" fill="#14B8A6" />
      <rect x="6" y="6" width="12" height="13.5" rx="1.2" fill="#F0FDFA" />
      <rect x="9" y="2.2" width="6" height="3" rx="1.2" fill="#99F6E4" />
      <path d="M7.8 9.8l1.2 1.2 2-2.2M7.8 14.3l1.2 1.2 2-2.2" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 10h3.5M12.5 14.5h3.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Libreta de observaciones con su lápiz.
export function Libreta(p) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="13" height="18" rx="2" fill="#6366F1" />
      <rect x="6.5" y="3" width="10.5" height="18" rx="1.5" fill="#EEF2FF" />
      <path d="M9 8h5.5M9 11.5h4" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 19.5l1-3.5 5.2-5.2 2.5 2.5-5.2 5.2Z" fill="#FBBF24" />
      <path d="M14 19.5l1-3.5 2.5 2.5Z" fill="#334155" />
    </svg>
  )
}

// Boletín: documento con una gráfica de barras.
export function Boletin(p) {
  return (
    <svg {...base} {...p}>
      <path d="M5 2.5h10l4.5 4.5v14.5H5Z" fill="#F8FAFC" />
      <path d="M15 2.5V7h4.5Z" fill="#CBD5E1" />
      <rect x="7.5" y="14" width="2.4" height="4.5" rx=".5" fill="#F472B6" />
      <rect x="11" y="11" width="2.4" height="7.5" rx=".5" fill="#8B5CF6" />
      <rect x="14.5" y="12.5" width="2.4" height="6" rx=".5" fill="#22C55E" />
      <path d="M7.5 7.5h5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Grupo(p) {
  return (
    <svg {...base} {...p}>
      <circle cx="6.5" cy="9" r="2.5" fill="#38BDF8" />
      <path d="M2 19a4.5 4.5 0 0 1 9 0Z" fill="#38BDF8" />
      <circle cx="17.5" cy="9" r="2.5" fill="#F472B6" />
      <path d="M13 19a4.5 4.5 0 0 1 9 0Z" fill="#F472B6" />
      <circle cx="12" cy="7" r="3" fill="#FBBF24" />
      <path d="M6.5 20a5.5 5.5 0 0 1 11 0Z" fill="#FBBF24" />
    </svg>
  )
}

// Ajustes: tres interruptores (qué módulos se encienden).
export function Ajustes(p) {
  return (
    <svg {...trazo} {...p}>
      <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}

// Matraz de laboratorio: la beta.
export function Matraz(p) {
  return (
    <svg {...base} {...p}>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" stroke="#FCD34D" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7.2 15h9.6l2 3.3a1.3 1.3 0 0 1-1.1 2H6.3a1.3 1.3 0 0 1-1.1-2Z" fill="#F59E0B" />
      <circle cx="11" cy="17.5" r="1" fill="#FEF3C7" />
    </svg>
  )
}

// Caja de herramientas: los recursos del profesor.
export function Herramientas(p) {
  return (
    <svg {...base} {...p}>
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" stroke="#94A3B8" strokeWidth="1.8" />
      <rect x="2.5" y="7" width="19" height="13" rx="2" fill="#EF4444" />
      <rect x="2.5" y="11" width="19" height="2.5" fill="#B91C1C" />
      <rect x="10.5" y="10.2" width="3" height="4.2" rx=".8" fill="#FBBF24" />
    </svg>
  )
}

export function Dado(p) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="#F8FAFC" />
      {[[8, 8], [16, 8], [12, 12], [8, 16], [16, 16]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="#EF4444" />)}
    </svg>
  )
}

export function Barajar(p) {
  return <svg {...trazo} {...p}><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>
}

export function Papelera(p) {
  return <svg {...trazo} {...p}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" /></svg>
}

export function Impresora(p) {
  return (
    <svg {...trazo} {...p}>
      <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}

export function Chincheta(p) {
  return (
    <svg {...base} {...p}>
      <path d="M12 14v8" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 3h8l-1 5 3 4v2H6v-2l3-4Z" fill="#F43F5E" />
    </svg>
  )
}

export function Ojo(p) {
  return (
    <svg {...trazo} {...p}>
      <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function Candado(p) {
  return (
    <svg {...trazo} {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

// Balanza de pesos (ponderar notas).
export function Pesas(p) {
  return <svg {...trazo} {...p}><path d="M12 3v18M7 21h10M4 7h16M4 7l-2.5 6a3 3 0 0 0 5 0L4 7ZM20 7l-2.5 6a3 3 0 0 0 5 0L20 7Z" /></svg>
}

export function Punteria(p) {
  return (
    <svg {...trazo} {...p}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </svg>
  )
}

// Un icono por módulo del aula (lib/teacherModules.js); el test de iconos
// exige que todos tengan el suyo.
export const ICONO_MODULO = {
  aula: Pupitre,
  agenda: Calendario,
  notas: Cuaderno,
  asistencia: PasarLista,
  observaciones: Libreta,
  boletin: Boletin,
  deberes: Libro,
  alumnos: Grupo,
}

export function IconoModulo({ id, className = 'w-5 h-5' }) {
  const Icono = ICONO_MODULO[id]
  return Icono ? <Icono className={className} /> : null
}

// La línea de datos de un alumno (monedas · racha · tiempo · exámenes) con
// iconos en vez de emojis.
export function DatosAlumno({ coins, streak, tiempo, examenes, className = '' }) {
  const items = [[Moneda, coins], [Racha, streak], [Reloj, tiempo], [Lista, examenes]]
  return (
    <span className={`inline-flex items-center gap-2.5 flex-wrap ${className}`}>
      {items.map(([Icono, v], i) => (
        <span key={i} className="inline-flex items-center gap-1 tabular-nums"><Icono className="w-3.5 h-3.5" />{v}</span>
      ))}
    </span>
  )
}
