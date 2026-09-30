// Los planetas de Órbita dibujados (antes eran emojis de círculos de color:
// ⚪🟡🔵🔴… — Tierra y Urano eran el mismo círculo azul). Cada uno con el
// rasgo que lo identifica en un libro: cráteres, continentes, bandas,
// anillos. SVG 40×40, se escala con className.
const DIBUJOS = {
  mercurio: (
    <g>
      <circle cx="20" cy="20" r="11" fill="#9ca3af" />
      <circle cx="16" cy="16" r="2.4" fill="#6b7280" /><circle cx="23" cy="23" r="3" fill="#6b7280" /><circle cx="24" cy="15" r="1.4" fill="#6b7280" />
    </g>
  ),
  venus: (
    <g>
      <circle cx="20" cy="20" r="13" fill="#fcd34d" />
      <path d="M9 17q11-4 22 1M8 23q12 4 24-1" stroke="#f59e0b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  ),
  tierra: (
    <g>
      <circle cx="20" cy="20" r="13.5" fill="#2563eb" />
      <path d="M12 12q5-2 7 2t-2 7q-4 1-5-3t0-6ZM22 20q4-2 8 1q1 5-3 7q-4 0-5-3t0-5ZM24 9q3 0 5 3" fill="#22c55e" />
      <path d="M11 27q4 2 8 1" stroke="#e0f2fe" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8" />
    </g>
  ),
  marte: (
    <g>
      <circle cx="20" cy="20" r="12" fill="#dc2626" />
      <circle cx="15" cy="17" r="3" fill="#991b1b" /><circle cx="24" cy="24" r="2.4" fill="#991b1b" />
      <path d="M14 9q6-2 12 0" stroke="#fee2e2" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  ),
  jupiter: (
    <g>
      <circle cx="20" cy="20" r="17" fill="#e7c9a0" />
      <path d="M4 14h32M3.5 21h33M5 27h30" stroke="#b45309" strokeWidth="3" />
      <ellipse cx="26" cy="24" rx="4" ry="2.4" fill="#dc2626" />
    </g>
  ),
  saturno: (
    <g>
      <ellipse cx="20" cy="20" rx="19" ry="5.5" fill="none" stroke="#fde68a" strokeWidth="2.6" transform="rotate(-18 20 20)" />
      <circle cx="20" cy="20" r="11.5" fill="#eab308" />
      <path d="M9 18h22M9.5 23h21" stroke="#a16207" strokeWidth="1.8" />
      <path d="M2.5 23.5Q20 30 37.5 16.5" stroke="#fde68a" strokeWidth="2.6" fill="none" transform="rotate(0)" />
    </g>
  ),
  urano: (
    <g>
      <ellipse cx="20" cy="20" rx="4.5" ry="18" fill="none" stroke="#a5f3fc" strokeWidth="1.8" transform="rotate(12 20 20)" />
      <circle cx="20" cy="20" r="12.5" fill="#67e8f9" />
      <path d="M20 8v24" stroke="#22d3ee" strokeWidth="2" transform="rotate(12 20 20)" />
    </g>
  ),
  neptuno: (
    <g>
      <circle cx="20" cy="20" r="12.5" fill="#1d4ed8" />
      <path d="M9 16q11-3 22 0M9 24q11 3 22 0" stroke="#3b82f6" strokeWidth="2" fill="none" />
      <ellipse cx="15" cy="20" rx="3" ry="1.8" fill="#1e3a8a" />
    </g>
  ),
}

export default function PlanetaDibujo({ id, className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {DIBUJOS[id] ?? <circle cx="20" cy="20" r="12" fill="#94a3b8" />}
    </svg>
  )
}

// La sonda (antes el emoji 🛰️).
export function Sonda({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="3" y="15" width="11" height="10" rx="1.5" fill="#38bdf8" />
      <rect x="26" y="15" width="11" height="10" rx="1.5" fill="#38bdf8" />
      <path d="M3 20h11M26 20h11M8.5 15v10M31.5 15v10" stroke="#0c4a6e" strokeWidth="1" />
      <path d="M14 20h12" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="15" y="13" width="10" height="14" rx="3" fill="#e2e8f0" />
      <circle cx="20" cy="18" r="2.4" fill="#f59e0b" />
      <path d="M20 13V8m0 0l-3-2m3 2l3-2" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
