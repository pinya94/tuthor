/**
 * El cuerpo de Rayos X: un dibujo propio, reescalable (viewBox 200×440), con
 * DOS CAPAS sobre la misma silueta. Si se pregunta por un órgano se ve la
 * capa de órganos; si se pregunta por un hueso, la del esqueleto.
 *
 * Cada órgano o hueso es un <g> con su id (los de data/organos.js), así que
 * el acierto lo decide la forma tocada, igual que en CelulaSVG — sin
 * distancias ni radios de tolerancia. Los huesos finos (radio, cúbito,
 * peroné…) llevan una zona de toque invisible más ancha que su dibujo, para
 * que se puedan tocar con el dedo; las de dos huesos vecinos no se solapan.
 *
 * Los huesos de brazos y piernas existen a los dos lados: se dibujan dos
 * veces (espejo en x = 100) con el mismo id, y vale cualquiera de los dos.
 *
 * Vista FRONTAL: la derecha de la persona queda a la izquierda del dibujo
 * (hígado a la izquierda, corazón y estómago a la derecha).
 *
 * Props:
 *   capa      'organos' | 'huesos' | 'musculos' (de frente) | 'espalda' (músculos de espalda)
 *   onPick    (id) => void — null para bloquear
 *   elegido   id tocado por el jugador
 *   correcto  id que había que tocar (solo al revelar)
 *   revelado  true tras responder: resalta y apaga el resto
 */

const VERDE = '#4ade80'
const ROJO = '#f87171'
const HUESO = '#e2e8f0'
const HUESO_OSC = '#94a3b8'
const brillo = c => `drop-shadow(0 0 2px ${c}) drop-shadow(0 0 2px ${c}) drop-shadow(0 0 5px ${c})`

// Ids que se pueden tocar en cada capa (el test comprueba que coinciden con
// data/organos.js: todo órgano o hueso del banco tiene su forma).
// eslint-disable-next-line react-refresh/only-export-components -- lista de ids junto a sus formas (la lee el test)
export const PIEZAS_ORGANOS = ['cerebro', 'ojos', 'boca', 'traquea', 'pulmones', 'corazon', 'diafragma', 'higado', 'estomago', 'rinones', 'intestinos', 'vejiga']
// eslint-disable-next-line react-refresh/only-export-components
export const PIEZAS_HUESOS = ['craneo', 'columna', 'costillas', 'esternon', 'clavicula', 'pelvis', 'humero', 'codo', 'radio', 'cubito', 'muneca', 'femur', 'rotula', 'tibia', 'perone', 'tobillo']
// eslint-disable-next-line react-refresh/only-export-components
export const PIEZAS_MUSCULOS = ['deltoides', 'pectoral', 'biceps', 'antebrazo', 'abdominales', 'oblicuos', 'esternocleidomastoideo', 'cuadriceps', 'aductores', 'tibial']
// eslint-disable-next-line react-refresh/only-export-components
export const PIEZAS_ESPALDA = ['trapecio', 'dorsal', 'triceps', 'gluteos', 'isquiotibiales', 'gemelos']

// ── Silueta ──────────────────────────────────────────────────────────────────
// Las piezas van sólidas dentro de un grupo con opacidad: así las zonas donde
// se tocan (hombro, cadera) no salen más oscuras.
function Silueta({ tenue }) {
  const lado = s => (
    <g transform={s ? 'translate(200 0) scale(-1 1)' : undefined}>
      <path d="M62 110L47 190L40 262" stroke="#1e4a7a" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <ellipse cx="38" cy="276" rx="9" ry="14" fill="#1e4a7a" />
      <path d="M84 258L82 344" stroke="#1e4a7a" strokeWidth="29" strokeLinecap="round" />
      <path d="M82 344L81 412" stroke="#1e4a7a" strokeWidth="21" strokeLinecap="round" />
      <ellipse cx="78" cy="426" rx="13" ry="8" fill="#1e4a7a" />
    </g>
  )
  return (
    <g opacity={tenue ? 0.45 : 0.7}>
      <ellipse cx="100" cy="44" rx="29" ry="33" fill="#1e4a7a" />
      <rect x="88" y="70" width="24" height="34" rx="9" fill="#1e4a7a" />
      <path d="M62 104Q100 92 138 104L141 150Q134 200 132 230L136 262Q100 276 64 262L68 230Q66 200 59 150Z" fill="#1e4a7a" />
      {lado(false)}
      {lado(true)}
    </g>
  )
}

// Hueso largo: trazo con cabezas redondeadas en los extremos.
function Largo({ x1, y1, x2, y2, w }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={HUESO} strokeWidth={w} strokeLinecap="round" />
      <circle cx={x1} cy={y1} r={w * 0.72} fill={HUESO} />
      <circle cx={x2} cy={y2} r={w * 0.72} fill={HUESO} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={HUESO_OSC} strokeWidth={w * 0.28} strokeLinecap="round" opacity="0.5" />
    </g>
  )
}
// Zona de toque invisible a lo largo de un hueso.
const Toque = ({ x1, y1, x2, y2, w }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth={w} strokeLinecap="round" />
)
const Espejo = ({ children }) => <g transform="translate(200 0) scale(-1 1)">{children}</g>
const DosLados = ({ children }) => <>{children}<Espejo>{children}</Espejo></>

// La capa de órganos se recorta de la cabeza a la pelvis (las piernas no
// tienen nada que tocar): el dibujo sale más grande en el mismo alto.
// eslint-disable-next-line react-refresh/only-export-components
export const ALTO = { organos: 290, huesos: 440, musculos: 440, espalda: 440 }

// ── Músculos ─────────────────────────────────────────────────────────────────
// Rojos con sus fibras dibujadas (líneas claras en la dirección en que tiran),
// para que se lean como músculo y no como órgano. Los de las extremidades se
// dibujan a los dos lados con el mismo id, como los huesos.
const Fibras = ({ d }) => <path d={d} stroke="#fecaca" strokeWidth="1" fill="none" opacity="0.55" strokeLinecap="round" />
const Huso = ({ cx, cy, rx, ry, rot = 0, fill }) => (
  <g transform={`rotate(${rot} ${cx} ${cy})`}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
    <Fibras d={`M${cx - rx * 0.4} ${cy - ry * 0.75}L${cx - rx * 0.4} ${cy + ry * 0.75}M${cx + rx * 0.35} ${cy - ry * 0.7}L${cx + rx * 0.35} ${cy + ry * 0.7}`} />
  </g>
)

function MusculosFrente({ pieza }) {
  return (
    <>
      <g {...pieza('esternocleidomastoideo')}>
        <DosLados>
          <Toque x1={91} y1={73} x2={97} y2={104} w={9} />
          <line x1={91} y1={73} x2={97} y2={104} stroke="#fca5a5" strokeWidth="5" strokeLinecap="round" />
        </DosLados>
      </g>
      <g {...pieza('pectoral')}>
        <DosLados>
          <path d="M98 108L98 141Q84 147 71 137Q64 125 67 112Q81 104 98 108Z" fill="#fb7185" />
          <Fibras d="M97 114L72 116M97 122L70 126M97 131L73 134" />
        </DosLados>
      </g>
      <g {...pieza('deltoides')}>
        <DosLados>
          <path d="M58 102Q71 99 73 112Q69 128 59 136Q50 124 52 111Q53 104 58 102Z" fill="#f87171" />
          <Fibras d="M62 104L58 132M67 107L62 130" />
        </DosLados>
      </g>
      <g {...pieza('biceps')}>
        <DosLados><Huso cx={55} cy={156} rx={6.5} ry={20} rot={10.6} fill="#ef4444" /></DosLados>
      </g>
      <g {...pieza('antebrazo')}>
        <DosLados><Huso cx={44} cy={222} rx={6} ry={23} rot={5.5} fill="#f97316" /></DosLados>
      </g>
      <g {...pieza('abdominales')}>
        <rect x="89" y="147" width="22" height="86" rx="7" fill="#fb923c" />
        <path d="M100 149V231M90 168H110M90 188H110M90 208H110" stroke="#7c2d12" strokeWidth="1.6" />
      </g>
      <g {...pieza('oblicuos')}>
        <DosLados>
          <path d="M71 158Q66 200 71 233L87 236L87 150Q78 150 71 158Z" fill="#fdba74" />
          <Fibras d="M73 170L86 158M72 190L86 176M73 210L86 196M75 228L86 216" />
        </DosLados>
      </g>
      <g {...pieza('cuadriceps')}>
        <DosLados><Huso cx={81} cy={298} rx={10} ry={36} rot={1.5} fill="#dc2626" /></DosLados>
      </g>
      <g {...pieza('aductores')}>
        <DosLados>
          <path d="M97 266Q99 288 93 314Q89 296 91 270Z" fill="#f472b6" />
        </DosLados>
      </g>
      <g {...pieza('tibial')}>
        <DosLados>
          <Toque x1={80} y1={358} x2={79} y2={402} w={10} />
          <Huso cx={79.5} cy={380} rx={3.8} ry={22} fill="#f59e0b" />
        </DosLados>
      </g>
    </>
  )
}

function MusculosEspalda({ pieza }) {
  return (
    <>
      <g {...pieza('trapecio')}>
        <path d="M100 74L125 101L112 128L100 150L88 128L75 101Z" fill="#e11d48" />
        <Fibras d="M100 80V146M86 104L100 92L114 104M90 124L100 112L110 124" />
      </g>
      <g {...pieza('dorsal')}>
        <DosLados>
          <path d="M98 156L98 212Q84 218 72 202Q62 166 68 128Q78 147 92 152Z" fill="#be123c" />
          <Fibras d="M95 162L72 140M95 180L69 164M95 198L71 188" />
        </DosLados>
      </g>
      <g {...pieza('triceps')}>
        <DosLados><Huso cx={56} cy={152} rx={7} ry={23} rot={10.6} fill="#f43f5e" /></DosLados>
      </g>
      <g {...pieza('gluteos')}>
        <DosLados>
          <ellipse cx="86" cy="257" rx="15" ry="14" fill="#c026d3" />
          <Fibras d="M76 250Q86 258 96 266M78 260Q86 266 94 272" />
        </DosLados>
      </g>
      <g {...pieza('isquiotibiales')}>
        <DosLados><Huso cx={83} cy={306} rx={10.5} ry={30} rot={1.5} fill="#a21caf" /></DosLados>
      </g>
      <g {...pieza('gemelos')}>
        <DosLados><Huso cx={82} cy={370} rx={9} ry={19} fill="#db2777" /></DosLados>
      </g>
    </>
  )
}

export default function CuerpoSVG({ capa, onPick, elegido, correcto, revelado }) {
  const H = ALTO[capa] ?? 440
  const pieza = id => {
    let opacity = 1, filter
    if (revelado) {
      if (id === correcto) filter = brillo(VERDE)
      else if (id === elegido) filter = brillo(ROJO)
      else opacity = 0.25
    }
    return {
      onClick: onPick ? e => { e.stopPropagation(); onPick(id) } : undefined,
      style: { cursor: onPick ? 'pointer' : 'default', opacity, filter, transition: 'opacity .2s' },
    }
  }

  return (
    <svg viewBox={`0 0 200 ${H}`} className="w-full h-auto block select-none" role="img" style={{ touchAction: 'manipulation' }}>
      <defs>
        <radialGradient id="rx-fondo" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#10244a" />
          <stop offset="100%" stopColor="#050b1a" />
        </radialGradient>
      </defs>
      <rect width="200" height={H} fill="url(#rx-fondo)" />
      <Silueta tenue={capa !== 'organos'} />

      {capa === 'musculos' ? <MusculosFrente pieza={pieza} /> : capa === 'espalda' ? <MusculosEspalda pieza={pieza} /> : capa === 'organos' ? (
        <>
          <g {...pieza('pulmones')}>
            <path d="M95 118Q76 111 69 132Q63 158 67 185Q82 191 96 182Z" fill="#3b82f6" />
            <path d="M105 118Q124 111 131 132Q137 158 133 185Q121 191 111 184Q119 170 111 158Z" fill="#3b82f6" />
            <path d="M92 128L82 142M88 136L78 158M92 150L84 170M108 128L118 142M112 136L122 158M114 162L122 174" stroke="#bfdbfe" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          </g>
          <g {...pieza('traquea')}>
            <rect x="95.5" y="78" width="9" height="40" rx="4.5" fill="#7dd3fc" />
            {[84, 90, 96, 102, 108].map(y => <path key={y} d={`M95.5 ${y}h9`} stroke="#0c4a6e" strokeWidth="1.3" />)}
            <path d="M100 116L88 126M100 116L112 126" stroke="#7dd3fc" strokeWidth="5" strokeLinecap="round" />
          </g>
          <g {...pieza('diafragma')}>
            <path d="M64 197Q82 182 100 191Q118 182 136 197" stroke="transparent" strokeWidth="12" fill="none" />
            <path d="M64 197Q82 182 100 191Q118 182 136 197" stroke="#22d3ee" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
          <g {...pieza('higado')}>
            <path d="M66 202Q84 193 107 199Q105 211 91 218Q74 224 68 216Z" fill="#a16207" />
            <path d="M74 206Q88 202 100 204" stroke="#fde68a" strokeWidth="1.5" fill="none" opacity="0.5" />
          </g>
          <g {...pieza('estomago')}>
            <path d="M108 200Q126 196 132 207Q134 222 119 223Q107 223 109 215Q116 216 118 211Q119 205 110 205Z" fill="#fb923c" />
          </g>
          <g {...pieza('rinones')}>
            {[75, 125].map(cx => (
              <g key={cx}>
                <ellipse cx={cx} cy={234} rx="5.5" ry="10" fill="#be123c" />
                <path d={`M${cx + (cx < 100 ? 4 : -4)} ${230}q${cx < 100 ? -3 : 3} 4 0 8`} stroke="#fda4af" strokeWidth="1.5" fill="none" />
              </g>
            ))}
          </g>
          <g {...pieza('intestinos')}>
            <rect x="84" y="226" width="32" height="30" fill="transparent" />
            <path d="M87 254V232Q87 228 91 228H109Q113 228 113 232V254" stroke="#b45309" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M91 235q3-3 6 0t6 0t6 0M91 242q3 3 6 0t6 0t6 0M91 249q3-3 6 0t6 0t6 0" stroke="#fbbf24" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <g {...pieza('vejiga')}>
            <path d="M93 264Q93 258 100 258Q107 258 107 264Q107 273 100 274Q93 273 93 264Z" fill="#facc15" />
          </g>
          <g {...pieza('corazon')}>
            <path d="M112 176C97 166 97 146 105.5 146C109 146 111 149 112 152C113 149 115 146 118.5 146C127 146 127 166 112 176Z"
              fill="#ef4444" transform="rotate(-15 112 160)" />
            <path d="M106 146Q106 136 114 136Q120 136 120 142" stroke="#b91c1c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
          <g {...pieza('cerebro')}>
            <ellipse cx="100" cy="34" rx="22" ry="16" fill="#c084fc" />
            <path d="M100 19v30M84 30q4-4 8 0t8 0M100 30q4-4 8 0t8 0M83 39q4 4 8 0t8 0M101 39q4 4 8 0t8 0" stroke="#7e22ce" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </g>
          <g {...pieza('ojos')}>
            {[90, 110].map(cx => (
              <g key={cx}>
                <circle cx={cx} cy="57" r="7" fill="transparent" />
                <ellipse cx={cx} cy="57" rx="5.5" ry="4" fill="#f8fafc" />
                <circle cx={cx} cy="57" r="2.4" fill="#0ea5e9" />
                <circle cx={cx} cy="57" r="1" fill="#0f172a" />
              </g>
            ))}
          </g>
          <g {...pieza('boca')}>
            <rect x="88" y="62" width="24" height="12" fill="transparent" />
            <path d="M89 67Q94.5 64 100 66Q105.5 64 111 67Q100 75 89 67Z" fill="#f472b6" />
          </g>
        </>
      ) : (
        <>
          {/* Columna: se ve en el cuello y en la zona lumbar (en el pecho la
              tapa el esternón, como de frente de verdad) */}
          <g {...pieza('columna')}>
            {Array.from({ length: 21 }, (_, i) => 80 + i * 8).map(y => (
              <rect key={y} x="95" y={y} width="10" height="6" rx="2" fill="#cbd5e1" />
            ))}
          </g>
          <g {...pieza('costillas')}>
            {[114, 124, 134, 144, 154, 164, 174].map((y, i) => (
              <g key={y}>
                <path d={`M96 ${y}Q${74 - i} ${y - 4} ${68 + i * 0.6} ${y + 12}`} stroke="transparent" strokeWidth="7" fill="none" />
                <path d={`M104 ${y}Q${126 + i} ${y - 4} ${132 - i * 0.6} ${y + 12}`} stroke="transparent" strokeWidth="7" fill="none" />
                <path d={`M96 ${y}Q${74 - i} ${y - 4} ${68 + i * 0.6} ${y + 12}`} stroke={HUESO} strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d={`M104 ${y}Q${126 + i} ${y - 4} ${132 - i * 0.6} ${y + 12}`} stroke={HUESO} strokeWidth="3.2" fill="none" strokeLinecap="round" />
              </g>
            ))}
          </g>
          <g {...pieza('esternon')}>
            <rect x="95.5" y="106" width="9" height="58" rx="3.5" fill="#f8fafc" />
            <path d="M97 164L100 172L103 164Z" fill="#f8fafc" />
          </g>
          <g {...pieza('clavicula')}>
            <DosLados>
              <Toque x1={96} y1={101} x2={66} y2={97} w={10} />
              <path d="M96 101Q82 104 66 97" stroke={HUESO} strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </DosLados>
          </g>
          <g {...pieza('pelvis')}>
            <path d="M70 236Q65 252 78 266Q88 273 100 267Q112 273 122 266Q135 252 130 236Q116 245 100 240Q84 245 70 236Z" fill={HUESO} />
            <ellipse cx="87" cy="258" rx="5" ry="6" fill="#1e293b" />
            <ellipse cx="113" cy="258" rx="5" ry="6" fill="#1e293b" />
            <path d="M94 242Q100 252 106 242" fill="#cbd5e1" />
          </g>
          <g {...pieza('craneo')}>
            <path d="M72 38Q72 11 100 11Q128 11 128 38Q128 54 119 61L117 72Q100 80 83 72L81 61Q72 54 72 38Z" fill={HUESO} />
            <ellipse cx="90" cy="44" rx="7" ry="6" fill="#0f172a" />
            <ellipse cx="110" cy="44" rx="7" ry="6" fill="#0f172a" />
            <path d="M100 50L96 59H104Z" fill="#0f172a" />
            <path d="M88 66h24M92 63v6M97 63v6M103 63v6M108 63v6" stroke="#64748b" strokeWidth="1.2" />
          </g>
          <g {...pieza('humero')}>
            <DosLados>
              <Toque x1={62} y1={112} x2={48} y2={184} w={14} />
              <Largo x1={62} y1={112} x2={48} y2={184} w={6.5} />
            </DosLados>
          </g>
          {/* Radio del lado del pulgar (hacia fuera, con la palma al frente)
              y cúbito del lado del meñique: dos zonas de toque que se tocan
              sin pisarse. */}
          <g {...pieza('radio')}>
            <DosLados>
              <Toque x1={42} y1={198} x2={35} y2={256} w={8} />
              <Largo x1={42} y1={198} x2={35} y2={256} w={3.8} />
            </DosLados>
          </g>
          <g {...pieza('cubito')}>
            <DosLados>
              <Toque x1={50} y1={198} x2={43} y2={256} w={8} />
              <Largo x1={50} y1={198} x2={43} y2={256} w={3.8} />
            </DosLados>
          </g>
          <g {...pieza('codo')}>
            <DosLados>
              <circle cx="47" cy="191" r="7.5" fill="transparent" />
              <circle cx="47" cy="191" r="5" fill="#f8fafc" stroke={HUESO_OSC} strokeWidth="1.2" />
            </DosLados>
          </g>
          <g {...pieza('muneca')}>
            <DosLados>
              <circle cx="39" cy="263" r="7" fill="transparent" />
              {[[35, 261], [39, 260], [43, 262], [37, 265], [41, 266]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill={HUESO} />)}
            </DosLados>
          </g>
          {/* Manos y pies: de adorno, no se preguntan */}
          <g opacity="0.55" style={{ pointerEvents: 'none' }}>
            <DosLados>
              <path d="M33 270L30 286M37 271L36 290M41 271L42 289M45 269L48 283" stroke={HUESO} strokeWidth="2" strokeLinecap="round" />
              <path d="M76 420L68 430M80 420L76 432M84 420L84 432M88 419L91 430" stroke={HUESO} strokeWidth="2" strokeLinecap="round" />
            </DosLados>
          </g>
          <g {...pieza('femur')}>
            <DosLados>
              <Toque x1={86} y1={262} x2={83} y2={336} w={16} />
              <Largo x1={86} y1={262} x2={83} y2={336} w={8} />
              <circle cx="80" cy="256" r="5.5" fill={HUESO} />
            </DosLados>
          </g>
          <g {...pieza('rotula')}>
            <DosLados>
              <ellipse cx="83" cy="345" rx="7" ry="7.5" fill="transparent" />
              <ellipse cx="83" cy="345" rx="4.5" ry="5.5" fill="#f8fafc" stroke={HUESO_OSC} strokeWidth="1.2" />
            </DosLados>
          </g>
          <g {...pieza('tibia')}>
            <DosLados>
              <Toque x1={81} y1={355} x2={79} y2={407} w={9} />
              <Largo x1={81} y1={355} x2={79} y2={407} w={5.5} />
            </DosLados>
          </g>
          <g {...pieza('perone')}>
            <DosLados>
              <Toque x1={89} y1={357} x2={87.5} y2={405} w={7} />
              <Largo x1={89} y1={357} x2={87.5} y2={405} w={3} />
            </DosLados>
          </g>
          <g {...pieza('tobillo')}>
            <DosLados>
              <circle cx="82" cy="414" r="7" fill="transparent" />
              {[[78, 413], [83, 412], [87, 414], [81, 417]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" fill={HUESO} />)}
            </DosLados>
          </g>
        </>
      )}
    </svg>
  )
}
