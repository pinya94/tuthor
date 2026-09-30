// Avatares dibujados. En la cuenta y en los rankings el avatar se guarda como
// su emoji (equippedAvatar / avatarEmoji); aquí cada emoji tiene su dibujo, así
// que todo avatar ya comprado se ve dibujado sin migrar ningún dato. Un emoji
// sin dibujo cae al propio emoji.
//
// Estilo: 64×64, fondo circular de color y la cara plana, sin degradados.

function Base({ fondo, children, className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill={fondo} />
      {children}
    </svg>
  )
}

// Ojos redondos con brillo.
function Ojos({ x1 = 25, x2 = 39, y = 30, r = 3, color = '#1C1917' }) {
  return (
    <g>
      <circle cx={x1} cy={y} r={r} fill={color} />
      <circle cx={x2} cy={y} r={r} fill={color} />
      <circle cx={x1 + r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#FFFFFF" />
      <circle cx={x2 + r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#FFFFFF" />
    </g>
  )
}

const Buho = p => (
  <Base fondo="#7C3AED" {...p}>
    <path d="M18 18l6 8M46 18l-6 8" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="32" cy="38" rx="17" ry="18" fill="#B45309" />
    <ellipse cx="32" cy="44" rx="10" ry="10" fill="#FDE68A" />
    <circle cx="25" cy="32" r="7" fill="#FEF3C7" />
    <circle cx="39" cy="32" r="7" fill="#FEF3C7" />
    <Ojos x1={25} x2={39} y={32} r={3.5} />
    <path d="M29 38h6l-3 5Z" fill="#F59E0B" />
  </Base>
)

const Gato = p => (
  <Base fondo="#0EA5E9" {...p}>
    <path d="M16 26L19 10L28 20ZM48 26L45 10L36 20Z" fill="#F97316" />
    <path d="M19 22L20 14L25 20ZM45 22L44 14L39 20Z" fill="#FDBA74" />
    <ellipse cx="32" cy="36" rx="17" ry="15" fill="#F97316" />
    <ellipse cx="32" cy="41" rx="8" ry="6" fill="#FED7AA" />
    <Ojos x1={25} x2={39} y={33} r={3} color="#166534" />
    <path d="M30 38h4l-2 2.5Z" fill="#F472B6" />
    <path d="M12 38h10M12 42h10M42 38h10M42 42h10" stroke="#FFF7ED" strokeWidth="1.2" strokeLinecap="round" />
  </Base>
)

const Perro = p => (
  <Base fondo="#F59E0B" {...p}>
    <ellipse cx="15" cy="32" rx="6" ry="12" fill="#78350F" transform="rotate(15 15 32)" />
    <ellipse cx="49" cy="32" rx="6" ry="12" fill="#78350F" transform="rotate(-15 49 32)" />
    <ellipse cx="32" cy="34" rx="15" ry="16" fill="#D6A363" />
    <ellipse cx="32" cy="42" rx="8" ry="6" fill="#FEF3C7" />
    <Ojos x1={26} x2={38} y={31} r={2.8} />
    <ellipse cx="32" cy="39" rx="3" ry="2.2" fill="#1C1917" />
    <path d="M30 45q2 4 4 0Z" fill="#F472B6" />
  </Base>
)

const Zorro = p => (
  <Base fondo="#14B8A6" {...p}>
    <path d="M14 18l6 16 8-6ZM50 18l-6 16-8-6Z" fill="#EA580C" />
    <path d="M14 26q18-4 36 0L32 52Z" fill="#F97316" />
    <path d="M18 30q8 8 14 22q6-14 14-22q-7 6-14 6q-7 0-14-6Z" fill="#FFF7ED" />
    <Ojos x1={25} x2={39} y={32} r={2.6} />
    <circle cx="32" cy="48" r="2.4" fill="#1C1917" />
  </Base>
)

const Oso = p => (
  <Base fondo="#22C55E" {...p}>
    <circle cx="19" cy="20" r="6" fill="#78350F" />
    <circle cx="45" cy="20" r="6" fill="#78350F" />
    <circle cx="19" cy="20" r="3" fill="#D6A363" />
    <circle cx="45" cy="20" r="3" fill="#D6A363" />
    <circle cx="32" cy="35" r="16" fill="#92400E" />
    <ellipse cx="32" cy="41" rx="7.5" ry="6" fill="#D6A363" />
    <Ojos x1={26} x2={38} y={32} r={2.6} />
    <ellipse cx="32" cy="38.5" rx="2.8" ry="2" fill="#1C1917" />
  </Base>
)

const Panda = p => (
  <Base fondo="#F472B6" {...p}>
    <circle cx="19" cy="20" r="6" fill="#1C1917" />
    <circle cx="45" cy="20" r="6" fill="#1C1917" />
    <circle cx="32" cy="35" r="16" fill="#F8FAFC" />
    <ellipse cx="25" cy="33" rx="4.5" ry="5.5" fill="#1C1917" transform="rotate(-20 25 33)" />
    <ellipse cx="39" cy="33" rx="4.5" ry="5.5" fill="#1C1917" transform="rotate(20 39 33)" />
    <circle cx="25.5" cy="33" r="1.6" fill="#FFFFFF" />
    <circle cx="38.5" cy="33" r="1.6" fill="#FFFFFF" />
    <ellipse cx="32" cy="41" rx="2.8" ry="2" fill="#1C1917" />
  </Base>
)

const Leon = p => (
  <Base fondo="#38BDF8" {...p}>
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2
      return <circle key={i} cx={32 + 17 * Math.cos(a)} cy={34 + 17 * Math.sin(a)} r="7" fill="#C2410C" />
    })}
    <circle cx="32" cy="34" r="14" fill="#FBBF24" />
    <Ojos x1={27} x2={37} y={31} r={2.4} />
    <path d="M29 37h6l-3 3Z" fill="#78350F" />
    <path d="M29 42q3 2 6 0" stroke="#78350F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </Base>
)

const Rana = p => (
  <Base fondo="#8B5CF6" {...p}>
    <circle cx="22" cy="24" r="7" fill="#22C55E" />
    <circle cx="42" cy="24" r="7" fill="#22C55E" />
    <ellipse cx="32" cy="38" rx="19" ry="14" fill="#22C55E" />
    <circle cx="22" cy="24" r="4" fill="#FFFFFF" />
    <circle cx="42" cy="24" r="4" fill="#FFFFFF" />
    <circle cx="22" cy="24.5" r="2.2" fill="#1C1917" />
    <circle cx="42" cy="24.5" r="2.2" fill="#1C1917" />
    <path d="M20 40q12 9 24 0" stroke="#14532D" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <circle cx="19" cy="36" r="2.5" fill="#F9A8D4" fillOpacity=".7" />
    <circle cx="45" cy="36" r="2.5" fill="#F9A8D4" fillOpacity=".7" />
  </Base>
)

const Pinguino = p => (
  <Base fondo="#7DD3FC" {...p}>
    <ellipse cx="32" cy="36" rx="17" ry="19" fill="#1E293B" />
    <path d="M18 34q14-14 28 0q0 16-14 18q-14-2-14-18Z" fill="#F8FAFC" />
    <Ojos x1={26} x2={38} y={33} r={2.6} />
    <path d="M28 38h8l-4 5Z" fill="#F59E0B" />
  </Base>
)

const Dragon = p => (
  <Base fondo="#DC2626" {...p}>
    <path d="M20 22L16 8L26 18ZM44 22L48 8L38 18Z" fill="#FDE68A" />
    <ellipse cx="32" cy="34" rx="16" ry="15" fill="#16A34A" />
    <ellipse cx="32" cy="42" rx="11" ry="7" fill="#4ADE80" />
    <circle cx="25" cy="30" r="3.5" fill="#FDE047" />
    <circle cx="39" cy="30" r="3.5" fill="#FDE047" />
    <ellipse cx="25" cy="30" rx="1" ry="2.8" fill="#1C1917" />
    <ellipse cx="39" cy="30" rx="1" ry="2.8" fill="#1C1917" />
    <circle cx="28.5" cy="41" r="1.4" fill="#14532D" />
    <circle cx="35.5" cy="41" r="1.4" fill="#14532D" />
  </Base>
)

const Unicornio = p => (
  <Base fondo="#C4B5FD" {...p}>
    <path d="M32 4l4 16h-8Z" fill="#FBBF24" />
    <path d="M30 10h4M29.5 14h5" stroke="#B45309" strokeWidth="1.2" />
    <path d="M14 26q4-10 14-8q-6 6-4 16Z" fill="#F472B6" />
    <path d="M13 34q2-6 8-6q-2 6 0 12Z" fill="#38BDF8" />
    <ellipse cx="33" cy="36" rx="14" ry="15" fill="#F8FAFC" />
    <Ojos x1={28} x2={39} y={34} r={2.4} />
    <ellipse cx="34" cy="44" rx="6" ry="4" fill="#FBCFE8" />
  </Base>
)

const Tiburon = p => (
  <Base fondo="#1D4ED8" {...p}>
    <path d="M32 6l7 14h-14Z" fill="#94A3B8" />
    <ellipse cx="32" cy="36" rx="19" ry="16" fill="#94A3B8" />
    <path d="M15 40q17 14 34 0q-17 6-34 0Z" fill="#F8FAFC" />
    <path d="M20 42l3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3" stroke="#1E293B" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    <Ojos x1={24} x2={40} y={31} r={2.4} />
  </Base>
)

const Robot = p => (
  <Base fondo="#334155" {...p}>
    <path d="M32 8v8" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="32" cy="8" r="3" fill="#F43F5E" />
    <rect x="15" y="16" width="34" height="32" rx="8" fill="#CBD5E1" />
    <rect x="19" y="23" width="26" height="12" rx="4" fill="#0F172A" />
    <circle cx="26" cy="29" r="3" fill="#22D3EE" />
    <circle cx="38" cy="29" r="3" fill="#22D3EE" />
    <path d="M24 41h16" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 2" />
    <rect x="11" y="27" width="4" height="10" rx="2" fill="#94A3B8" />
    <rect x="49" y="27" width="4" height="10" rx="2" fill="#94A3B8" />
  </Base>
)

const Fantasma = p => (
  <Base fondo="#4338CA" {...p}>
    <path d="M16 52V30a16 16 0 0 1 32 0v22l-5.3-4-5.4 4-5.3-4-5.3 4-5.4-4Z" fill="#F8FAFC" />
    <ellipse cx="26" cy="30" rx="3" ry="4" fill="#1E1B4B" />
    <ellipse cx="38" cy="30" rx="3" ry="4" fill="#1E1B4B" />
    <ellipse cx="32" cy="40" rx="3" ry="3.5" fill="#1E1B4B" />
  </Base>
)

const Alien = p => (
  <Base fondo="#BE185D" {...p}>
    <path d="M32 10c12 0 18 9 18 18c0 12-10 24-18 24s-18-12-18-24c0-9 6-18 18-18Z" fill="#4ADE80" />
    <ellipse cx="24" cy="31" rx="6" ry="4" fill="#0F172A" transform="rotate(25 24 31)" />
    <ellipse cx="40" cy="31" rx="6" ry="4" fill="#0F172A" transform="rotate(-25 40 31)" />
    <path d="M29 44q3 2 6 0" stroke="#14532D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <circle cx="14" cy="14" r="1" fill="#F8FAFC" /><circle cx="52" cy="20" r="1.2" fill="#F8FAFC" /><circle cx="48" cy="50" r="1" fill="#F8FAFC" />
  </Base>
)

const Mago = p => (
  <Base fondo="#312E81" {...p}>
    <path d="M32 4L46 26H18Z" fill="#6366F1" />
    <rect x="14" y="24" width="36" height="5" rx="2.5" fill="#4F46E5" />
    <path d="M30 12l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L27 14.3l2-.3Z" fill="#FDE047" />
    <circle cx="32" cy="36" r="9" fill="#FCD7B4" />
    <Ojos x1={29} x2={35} y={35} r={1.6} />
    <path d="M22 40q10 18 20 0q-4 4-10 4q-6 0-10-4Z" fill="#F8FAFC" />
  </Base>
)

const Lobo = p => (
  <Base fondo="#1E3A8A" {...p}>
    <path d="M16 26L18 8L28 20ZM48 26L46 8L36 20Z" fill="#64748B" />
    <path d="M16 26q16-8 32 0L32 54Z" fill="#94A3B8" />
    <path d="M24 36q8 4 16 0L32 54Z" fill="#E2E8F0" />
    <circle cx="25" cy="31" r="2.8" fill="#FDE047" />
    <circle cx="39" cy="31" r="2.8" fill="#FDE047" />
    <circle cx="25" cy="31" r="1.2" fill="#1C1917" />
    <circle cx="39" cy="31" r="1.2" fill="#1C1917" />
    <circle cx="32" cy="48" r="2.4" fill="#1C1917" />
  </Base>
)

const Fuego = p => (
  <Base fondo="#7F1D1D" {...p}>
    <path d="M32 8c7 9 16 15 16 27a16 16 0 0 1-32 0c0-6 3-10 6-13c0 5 2 8 5 9c-2-8 1-15 5-23Z" fill="#F97316" />
    <path d="M32 28c4 5 8 8 8 14a8 8 0 0 1-16 0c0-3 2-6 4-8c0 3 1 4 3 5c-1-4 0-8 1-11Z" fill="#FDE047" />
  </Base>
)

const EstrellaAv = p => (
  <Base fondo="#1E1B4B" {...p}>
    <path d="M32 9l6.6 13.5 14.8 2.1-10.7 10.4 2.5 14.8L32 42.8l-13.2 7 2.5-14.8L10.6 24.6l14.8-2.1Z" fill="#FBBF24" strokeLinejoin="round" />
    <circle cx="27.5" cy="30" r="1.8" fill="#78350F" />
    <circle cx="36.5" cy="30" r="1.8" fill="#78350F" />
    <path d="M28.5 35q3.5 3 7 0" stroke="#78350F" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </Base>
)

const Diamante = p => (
  <Base fondo="#4C1D95" {...p}>
    <path d="M18 24l6-9h16l6 9-14 26Z" fill="#67E8F9" />
    <path d="M18 24h28M24 15l4 9 4-9 4 9 4-9M28 24l4 26 4-26" stroke="#0E7490" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
    <path d="M24 15l4 9h-10Z" fill="#CFFAFE" fillOpacity=".8" />
  </Base>
)

const Tortuga = p => (
  <Base fondo="#0891B2" {...p}>
    <path d="M6 58q0-26 26-26t26 26Z" fill="#15803D" />
    <path d="M25 44l7-4 7 4v7l-7 4-7-4ZM12 54l5-8 8 2M52 54l-5-8-8 2" fill="none" stroke="#4ADE80" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 58h52" stroke="#A3E635" strokeWidth="3" strokeLinecap="round" />
    <circle cx="32" cy="20" r="10" fill="#86EFAC" />
    <Ojos x1={28} x2={36} y={19} r={2.2} />
    <path d="M29 24q3 2 6 0" stroke="#14532D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </Base>
)

const Abeja = p => (
  <Base fondo="#65A30D" {...p}>
    <ellipse cx="20" cy="22" rx="8" ry="6" fill="#E0F2FE" fillOpacity=".85" transform="rotate(-25 20 22)" />
    <ellipse cx="44" cy="22" rx="8" ry="6" fill="#E0F2FE" fillOpacity=".85" transform="rotate(25 44 22)" />
    <circle cx="32" cy="36" r="16" fill="#FACC15" />
    <path d="M17 31h30M16.5 40h31" stroke="#1C1917" strokeWidth="4.5" />
    <path d="M26 16q-2-6-6-8M38 16q2-6 6-8" stroke="#1C1917" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <circle cx="20" cy="8" r="2" fill="#1C1917" /><circle cx="44" cy="8" r="2" fill="#1C1917" />
    <circle cx="26" cy="25" r="2.4" fill="#1C1917" /><circle cx="38" cy="25" r="2.4" fill="#1C1917" />
    <path d="M29 46q3 2 6 0" stroke="#78350F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </Base>
)

const Koala = p => (
  <Base fondo="#10B981" {...p}>
    <circle cx="15" cy="26" r="9" fill="#94A3B8" />
    <circle cx="49" cy="26" r="9" fill="#94A3B8" />
    <circle cx="15" cy="26" r="5" fill="#F1F5F9" />
    <circle cx="49" cy="26" r="5" fill="#F1F5F9" />
    <ellipse cx="32" cy="36" rx="15" ry="16" fill="#CBD5E1" />
    <Ojos x1={26} x2={38} y={32} r={2.4} />
    <ellipse cx="32" cy="40" rx="4" ry="5.5" fill="#334155" />
  </Base>
)

const Tigre = p => (
  <Base fondo="#0D9488" {...p}>
    <circle cx="19" cy="19" r="6" fill="#EA580C" />
    <circle cx="45" cy="19" r="6" fill="#EA580C" />
    <circle cx="19" cy="19" r="3" fill="#FED7AA" />
    <circle cx="45" cy="19" r="3" fill="#FED7AA" />
    <circle cx="32" cy="35" r="16" fill="#F97316" />
    <path d="M32 19v6M26 20l1 5M38 20l-1 5M16 32h6M16 38h5M48 32h-6M48 38h-5" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="32" cy="42" rx="8" ry="6" fill="#FFF7ED" />
    <Ojos x1={26} x2={38} y={32} r={2.5} color="#166534" />
    <path d="M30 39h4l-2 2.5Z" fill="#F472B6" />
  </Base>
)

const Pulpo = p => (
  <Base fondo="#0369A1" {...p}>
    <path d="M18 38q-6 10-2 14M24 42q-2 8 0 12M32 43v12M40 42q2 8 0 12M46 38q6 10 2 14" stroke="#EC4899" strokeWidth="5" fill="none" strokeLinecap="round" />
    <ellipse cx="32" cy="28" rx="16" ry="17" fill="#EC4899" />
    <circle cx="23" cy="20" r="2.2" fill="#F9A8D4" /><circle cx="40" cy="16" r="1.6" fill="#F9A8D4" />
    <Ojos x1={26} x2={38} y={30} r={3} />
    <path d="M29 37q3 2 6 0" stroke="#831843" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </Base>
)

const Loro = p => (
  <Base fondo="#FBBF24" {...p}>
    <path d="M30 6q8 2 8 10" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
    <ellipse cx="32" cy="34" rx="16" ry="18" fill="#DC2626" />
    <ellipse cx="25" cy="30" rx="6" ry="7" fill="#FFFFFF" />
    <circle cx="25" cy="30" r="2.6" fill="#1C1917" />
    <circle cx="26" cy="29" r=".9" fill="#FFFFFF" />
    <path d="M34 26q12 0 12 10q0 6-4 8q0-8-8-8Z" fill="#FDE68A" />
    <path d="M34 36q6 0 8 8q-4-2-8-2Z" fill="#1C1917" />
    <path d="M18 46q14 8 28 0" stroke="#2563EB" strokeWidth="4" fill="none" strokeLinecap="round" />
  </Base>
)

const Dino = p => (
  <Base fondo="#9333EA" {...p}>
    <path d="M12 64q0-24 12-30h12q-4 14 2 30Z" fill="#16A34A" />
    <path d="M22 64q0-16 6-24" stroke="#4ADE80" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M34 46q5 0 6 5" stroke="#16A34A" strokeWidth="3.2" fill="none" strokeLinecap="round" />
    <path d="M16 32l-4-4 5-1-2-5 5 1 0-5 4 3" fill="#FACC15" />
    <path d="M20 24q0-12 14-12h12q10 0 10 10v7q0 7-7 7H30q-10 0-10-12Z" fill="#22C55E" />
    <path d="M34 29h21" stroke="#14532D" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M37 29l1.8 3 1.8-3 1.8 3 1.8-3 1.8 3 1.8-3 1.8 3 1.8-3" fill="#FFFFFF" />
    <circle cx="36" cy="20" r="4" fill="#FFFFFF" />
    <circle cx="37" cy="20.5" r="2" fill="#1C1917" />
    <circle cx="52" cy="18" r="1.2" fill="#14532D" />
  </Base>
)

const Astronauta = p => (
  <Base fondo="#6D28D9" {...p}>
    <circle cx="10" cy="14" r="1.2" fill="#F8FAFC" /><circle cx="54" cy="12" r="1" fill="#F8FAFC" /><circle cx="52" cy="52" r="1.3" fill="#F8FAFC" /><circle cx="9" cy="48" r="1" fill="#F8FAFC" />
    <path d="M16 60q0-14 16-14t16 14Z" fill="#E2E8F0" />
    <rect x="27" y="50" width="10" height="6" rx="1.5" fill="#F43F5E" />
    <circle cx="32" cy="30" r="17" fill="#F1F5F9" />
    <rect x="19" y="21" width="26" height="18" rx="9" fill="#1E3A8A" />
    <path d="M23 26q4-3 9-3" stroke="#93C5FD" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <circle cx="38" cy="33" r="1.5" fill="#93C5FD" />
  </Base>
)

// Clave = el emoji del avatar (data/cosmetics.js AVATARS), que es lo que se guarda.
// eslint-disable-next-line react-refresh/only-export-components -- el mapa vive junto a sus dibujos
export const AVATAR_SVG = {
  '🦉': Buho, '🐱': Gato, '🐶': Perro, '🦊': Zorro, '🐻': Oso, '🐼': Panda, '🦁': Leon,
  '🐸': Rana, '🐧': Pinguino, '🐲': Dragon, '🦄': Unicornio, '🦈': Tiburon, '🤖': Robot,
  '👻': Fantasma, '👽': Alien, '🧙': Mago, '🐺': Lobo, '🔥': Fuego, '⭐': EstrellaAv, '💎': Diamante,
  '🐢': Tortuga, '🐝': Abeja, '🐨': Koala, '🐯': Tigre, '🐙': Pulpo, '🦜': Loro, '🦖': Dino, '🚀': Astronauta,
}

// El avatar dibujado de un emoji guardado; sin dibujo, el propio emoji.
export default function AvatarDibujo({ emoji, className = 'w-full h-full', fallbackSize }) {
  const Svg = AVATAR_SVG[emoji]
  if (Svg) return <Svg className={className} />
  return <span style={fallbackSize ? { fontSize: fallbackSize } : undefined}>{emoji}</span>
}
