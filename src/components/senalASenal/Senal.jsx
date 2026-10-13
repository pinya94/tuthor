// Señales de tráfico dibujadas en SVG, con las formas y colores del Código de
// la circulación: triángulo de peligro, círculo rojo de prohibición, círculo
// azul de obligación, cuadrado azul de indicación y las dos de prioridad.
const ROJO = '#DC2626', AZUL = '#1D4ED8', NEGRO = '#111827', BLANCO = '#FFFFFF'

const Triangulo = ({ children }) => (
  <g>
    <polygon points="50,8 94,86 6,86" fill={BLANCO} stroke={ROJO} strokeWidth="8" strokeLinejoin="round" />
    <g transform="translate(0 10)">{children}</g>
  </g>
)
const CirculoRojo = ({ children, fondo = BLANCO }) => (
  <g>
    <circle cx="50" cy="50" r="42" fill={fondo} stroke={ROJO} strokeWidth="9" />
    {children}
  </g>
)
const CirculoAzul = ({ children }) => (
  <g>
    <circle cx="50" cy="50" r="45" fill={AZUL} stroke={BLANCO} strokeWidth="2" />
    {children}
  </g>
)
const CuadradoAzul = ({ children }) => (
  <g>
    <rect x="6" y="6" width="88" height="88" rx="8" fill={AZUL} stroke={BLANCO} strokeWidth="2" />
    {children}
  </g>
)

// Pictogramas
const Bici = ({ c = NEGRO, k = 1, x = 50, y = 52 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`} stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="-14" cy="6" r="9" /><circle cx="14" cy="6" r="9" />
    <path d="M-14 6 L-4 -8 L8 -8 L14 6 M-4 -8 L1 6 L8 -8 M-6 -13 L-1 -13 M6 -12 L10 -14" />
  </g>
)
const Persona = ({ c = NEGRO, k = 1, x = 50, y = 50 }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`} stroke={c} strokeWidth="4" fill="none" strokeLinecap="round">
    <circle cx="2" cy="-18" r="4" fill={c} stroke="none" />
    <path d="M1 -12 L-2 2 L-9 14 M-2 2 L6 14 M0 -8 L-8 -2 M0 -8 L8 -4" />
  </g>
)
const Cebra = ({ c = NEGRO, y = 66 }) => (
  <g>{[-3, -1, 1, 3].map(i => <rect key={i} x={46 + i * 7} y={y} width="4" height="8" fill={c} />)}</g>
)

const DIBUJOS = {
  stop: () => (
    <g>
      <polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill={ROJO} stroke={BLANCO} strokeWidth="3" />
      <text x="50" y="60" textAnchor="middle" fontSize="27" fontWeight="900" fill={BLANCO} fontFamily="Arial, sans-serif">STOP</text>
    </g>
  ),
  ceda: () => <polygon points="6,14 94,14 50,90" fill={BLANCO} stroke={ROJO} strokeWidth="9" strokeLinejoin="round" />,
  curva: () => (
    <Triangulo>
      <path d="M44 66 L44 46 Q44 36 56 34" stroke={NEGRO} strokeWidth="6" fill="none" />
      <path d="M54 26 L64 34 L54 42 Z" fill={NEGRO} />
    </Triangulo>
  ),
  peatonesPeligro: () => <Triangulo><Persona k={0.95} y={52} /><Cebra y={64} /></Triangulo>,
  semaforoPeligro: () => (
    <Triangulo>
      <rect x="42" y="32" width="16" height="36" rx="3" fill={NEGRO} />
      <circle cx="50" cy="39" r="4.5" fill={ROJO} /><circle cx="50" cy="50" r="4.5" fill="#F59E0B" /><circle cx="50" cy="61" r="4.5" fill="#16A34A" />
    </Triangulo>
  ),
  ciclistasPeligro: () => <Triangulo><Bici k={0.95} y={54} /></Triangulo>,
  direccionProhibida: () => (
    <g>
      <circle cx="50" cy="50" r="44" fill={ROJO} stroke={BLANCO} strokeWidth="2" />
      <rect x="20" y="42" width="60" height="16" fill={BLANCO} />
    </g>
  ),
  maxima50: () => <CirculoRojo><text x="50" y="62" textAnchor="middle" fontSize="34" fontWeight="900" fill={NEGRO} fontFamily="Arial, sans-serif">50</text></CirculoRojo>,
  noEstacionar: () => <CirculoRojo fondo={AZUL}><line x1="22" y1="22" x2="78" y2="78" stroke={ROJO} strokeWidth="9" /></CirculoRojo>,
  noParar: () => <CirculoRojo fondo={AZUL}><line x1="22" y1="22" x2="78" y2="78" stroke={ROJO} strokeWidth="9" /><line x1="78" y1="22" x2="22" y2="78" stroke={ROJO} strokeWidth="9" /></CirculoRojo>,
  noBicis: () => <CirculoRojo><Bici k={1.1} /></CirculoRojo>,
  derecha: () => (
    <CirculoAzul>
      <path d="M26 50 L62 50" stroke={BLANCO} strokeWidth="11" />
      <path d="M58 32 L80 50 L58 68 Z" fill={BLANCO} />
    </CirculoAzul>
  ),
  carrilBici: () => <CirculoAzul><Bici c={BLANCO} k={1.15} /></CirculoAzul>,
  minima30: () => <CirculoAzul><text x="50" y="62" textAnchor="middle" fontSize="34" fontWeight="900" fill={BLANCO} fontFamily="Arial, sans-serif">30</text></CirculoAzul>,
  peatonesInd: () => (
    <CuadradoAzul>
      <polygon points="50,16 84,78 16,78" fill={BLANCO} />
      <Persona k={0.8} y={58} /><Cebra y={66} />
    </CuadradoAzul>
  ),
  aparcamiento: () => <CuadradoAzul><text x="50" y="72" textAnchor="middle" fontSize="60" fontWeight="900" fill={BLANCO} fontFamily="Arial, sans-serif">P</text></CuadradoAzul>,
  hospital: () => <CuadradoAzul><text x="50" y="72" textAnchor="middle" fontSize="60" fontWeight="900" fill={BLANCO} fontFamily="Arial, sans-serif">H</text></CuadradoAzul>,
  sinSalida: () => (
    <CuadradoAzul>
      <rect x="40" y="34" width="20" height="50" fill={BLANCO} />
      <rect x="22" y="18" width="56" height="16" fill={ROJO} />
    </CuadradoAzul>
  ),
}

export default function Senal({ id, className = 'w-40 mx-auto block' }) {
  const D = DIBUJOS[id]
  if (!D) return null
  return <svg viewBox="0 0 100 100" className={className} aria-hidden="true"><D /></svg>
}
