// Monedas y billetes de euro dibujados, con los colores de verdad: cobre
// (1, 2 y 5 céntimos), oro nórdico (10, 20 y 50) y bicolores (1 € con el
// centro dorado, 2 € con el centro plateado). Antes eran círculos marrones
// todos iguales, así que reconocer la moneda no enseñaba nada.
// Las monedas crecen un poco con su valor, como en la cartera.

const COBRE = { borde: '#9a3412', cara: '#c2410c', brillo: '#fb923c' }
const ORO = { borde: '#a16207', cara: '#eab308', brillo: '#fde68a' }
const PLATA = { borde: '#64748b', cara: '#cbd5e1', brillo: '#f8fafc' }

function estiloMoneda(v) {
  if (v <= 5) return { tam: 42, ext: COBRE }
  if (v <= 50) return { tam: 42 + (v === 10 ? 2 : v === 20 ? 5 : 8), ext: ORO }
  if (v === 100) return { tam: 52, ext: PLATA, int: ORO }
  return { tam: 56, ext: ORO, int: PLATA }
}

export function MonedaEuro({ v, label, className = '', size }) {
  const { tam, ext, int } = estiloMoneda(v)
  const px = size ?? tam
  return (
    <svg viewBox="0 0 60 60" width={px} height={px} className={className} aria-hidden="true">
      <circle cx="30" cy="30" r="28" fill={ext.cara} stroke={ext.borde} strokeWidth="3" />
      {int && <circle cx="30" cy="30" r="18" fill={int.cara} stroke={int.borde} strokeWidth="1.5" />}
      <circle cx="30" cy="30" r={int ? 23 : 22} fill="none" stroke={ext.borde} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="1.5 2.5" />
      <path d="M14 20a18 18 0 0 1 12-9" stroke={(int ?? ext).brillo} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
      <text x="30" y="35.5" textAnchor="middle" fontSize={label.length > 3 ? 14 : 16} fontWeight="900"
        fill={int ? '#1c1917' : v <= 5 ? '#fff7ed' : '#422006'} style={{ userSelect: 'none' }}>{label}</text>
    </svg>
  )
}

export function BilleteEuro({ label, color, className = '', alto = 44 }) {
  return (
    <svg viewBox="0 0 100 52" height={alto} className={className} aria-hidden="true">
      <rect x="1" y="1" width="98" height="50" rx="5" fill={color} stroke="#ffffff55" strokeWidth="2" />
      <rect x="6" y="6" width="88" height="40" rx="3" fill="none" stroke="#ffffff30" strokeWidth="1" />
      {/* El arco de los billetes de euro y el círculo de estrellas */}
      <path d="M58 44V28a12 12 0 0 1 24 0v16" fill="#ffffff22" stroke="#ffffff40" strokeWidth="1.2" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <circle key={i} cx={18 + 7 * Math.cos(a)} cy={16 + 7 * Math.sin(a)} r="1.1" fill="#fde047" />
      })}
      <text x="12" y="42" fontSize="17" fontWeight="900" fill="#fff" style={{ userSelect: 'none' }}>{label}</text>
    </svg>
  )
}
