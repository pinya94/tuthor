// Ilustraciones de las tres puertas de la home. SVG plano y reescalable
// (viewBox 240×180), dibujado a mano para contar lo que hay detrás de cada
// tarjeta —no un icono genérico—:
//   · diaria  → cronómetro con la cuña de 5 minutos, racha y semana cumplida
//   · juegos  → una partida: la curva que "caza" el objetivo, +10, moneda
//   · temario → la hoja del examen con los temas marcados, la nota y el lápiz
// Estética plana (sin degradados) para que la tarjeta pueda ser un plano
// neutro y el color lo ponga el dibujo. Decorativas: el título de la tarjeta
// ya da el nombre accesible, así que van aria-hidden.

// Destello de cuatro puntas centrado en (x, y) con radio s.
const destello = (x, y, s) =>
  `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`

function Diaria(props) {
  return (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <circle cx="120" cy="88" r="80" fill="#FFFFFF" fillOpacity=".045" />

      {/* Líneas de velocidad: es rápido */}
      <g stroke="#FDBA74" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round">
        <path d="M50 72h14" />
        <path d="M42 84h20" />
        <path d="M50 96h14" />
      </g>

      {/* Corona, vástago y pulsador lateral (van detrás del cuerpo) */}
      <rect x="112" y="26" width="16" height="10" rx="3" fill="#F59E0B" />
      <rect x="116" y="33" width="8" height="7" fill="#D97706" />
      <rect x="82.5" y="45.5" width="10" height="8" rx="2" fill="#D97706" transform="rotate(45 87.5 49.5)" />

      {/* Cuerpo y esfera */}
      <circle cx="120" cy="82" r="46" fill="#F59E0B" />
      <circle cx="120" cy="82" r="38" fill="#FFF7ED" />

      {/* La cuña de 5 minutos: de las 12 a la 1 */}
      <path d="M120 82L120 51A31 31 0 0 1 135.5 55.15Z" fill="#FB923C" />

      {/* Marcas: cuatro mayores y ocho menores */}
      <g stroke="#FDBA74" strokeWidth="2.5" strokeLinecap="round">
        <path d="M120 48v6M154 82h-6M120 116v-6M86 82h6" />
        <path d="M137 52.56 135 56.02M149.44 65 145.98 67M149.44 99 145.98 97M137 111.44 135 107.98M103 111.44 105 107.98M90.56 99 94.02 97M90.56 65 94.02 67M103 52.56 105 56.02" />
      </g>

      {/* Aguja y eje */}
      <path d="M120 82L133 59.5" stroke="#9A3412" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="120" cy="82" r="4.5" fill="#9A3412" />
      <circle cx="120" cy="82" r="1.8" fill="#FFF7ED" />

      {/* Insignia de racha */}
      <circle cx="163" cy="51" r="19" fill="#431407" stroke="#FFF7ED" strokeWidth="3" />
      <path d="M163 36C169 43.5 174 48.5 174 55.5C174 61 169 64.5 163 64.5C157 64.5 152 61 152 55.8C152 51 154.5 47.8 157 45.5C157 49.5 158.5 52 161 53C160 47 160.5 41.5 163 36Z" fill="#F97316" />
      <path d="M163 49C166.5 52.5 169 55 169 58.3C169 61.6 166.5 63.8 163 63.8C159.5 63.8 157 61.6 157 58.6C157 56.2 158.5 54.6 160.2 53.3C160.3 55.4 161.3 57 163 57.2C162.2 54.5 162.2 51.8 163 49Z" fill="#FDE047" />

      {/* La semana: cuatro días cumplidos, hoy, y lo que queda */}
      <g>
        {[46, 68, 90, 112].map(x => (
          <rect key={x} x={x} y="142" width="16" height="16" rx="4" fill="#F59E0B" />
        ))}
        <rect x="132" y="140" width="20" height="20" rx="6" stroke="#FDBA74" strokeWidth="1.5" />
        <rect x="134" y="142" width="16" height="16" rx="4" fill="#F97316" />
        {[156, 178].map(x => (
          <rect key={x} x={x + 0.9} y="142.9" width="14.2" height="14.2" rx="3.5" stroke="#FDBA74" strokeOpacity=".45" strokeWidth="1.8" />
        ))}
        <g stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {[46, 68, 90, 112, 134].map(x => (
            <path key={x} d={`M${x + 4.5} 150.5L${x + 7.2} 153.2L${x + 12} 147.5`} />
          ))}
        </g>
      </g>
    </svg>
  )
}

function Juegos(props) {
  return (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <circle cx="120" cy="90" r="80" fill="#FFFFFF" fillOpacity=".045" />
      <ellipse cx="120" cy="152" rx="58" ry="6" fill="#000000" fillOpacity=".25" />

      {/* La pantalla */}
      <rect x="52" y="42" width="136" height="96" rx="16" fill="#8B5CF6" />
      <rect x="61" y="51" width="118" height="78" rx="9" fill="#1E1238" />
      <path d="M90.5 51v78M120 51v78M149.5 51v78M61 77h118M61 103h118" stroke="#A78BFA" strokeOpacity=".15" strokeWidth="1" />
      <path d="M68 58v64h104" stroke="#A78BFA" strokeOpacity=".4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* La partida: la curva que se ajusta hasta cazar el objetivo */}
      <path d="M70 118C100 117 118 104 132 88C142 77 150 69 170 62" stroke="#E879F9" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="70" cy="118" r="3.5" fill="#E879F9" />
      <circle cx="147.25" cy="73.5" r="9" stroke="#FBBF24" strokeWidth="2.5" />
      <circle cx="147.25" cy="73.5" r="3.5" fill="#FBBF24" />

      {/* Puntos ganados */}
      <rect x="150" y="24" width="40" height="22" rx="11" fill="#FBBF24" />
      <text x="170" y="39.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#3B0764" fontFamily="inherit">+10</text>

      {/* Moneda */}
      <circle cx="48" cy="64" r="16" fill="#F59E0B" />
      <circle cx="48" cy="64" r="12" fill="#FBBF24" />
      <path d="M48 57.5L49.65 61.73L54.18 61.99L50.66 64.87L51.82 69.26L48 66.8L44.18 69.26L45.34 64.87L41.82 61.99L46.35 61.73Z" fill="#F59E0B" />
      <ellipse cx="42" cy="57" rx="3" ry="1.6" fill="#FFFFFF" fillOpacity=".5" transform="rotate(-35 42 57)" />

      {/* Estrella */}
      <path d="M192 113L194.82 120.12L202.46 120.6L196.56 125.48L198.47 132.9L192 128.8L185.53 132.9L187.44 125.48L181.54 120.6L189.18 120.12Z" fill="#FDE68A" />

      <path d={destello(30, 92, 5)} fill="#E9D5FF" fillOpacity=".8" />
      <path d={destello(208, 64, 5)} fill="#E9D5FF" fillOpacity=".8" />
    </svg>
  )
}

function Temario(props) {
  const hechos = [
    { y: 62, a: 58, b: 38 },
    { y: 84, a: 50, b: 44 },
    { y: 106, a: 62, b: 30 },
  ]
  return (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <circle cx="120" cy="90" r="80" fill="#FFFFFF" fillOpacity=".045" />

      {/* La hoja de atrás: el siguiente tema */}
      <rect x="80" y="30" width="100" height="124" rx="9" fill="#1D4ED8" transform="rotate(8 130 92)" />

      {/* Pestañas de temas asomando por el borde */}
      <rect x="160" y="64" width="20" height="16" rx="4" fill="#60A5FA" />
      <rect x="160" y="88" width="20" height="16" rx="4" fill="#34D399" />
      <rect x="160" y="112" width="20" height="16" rx="4" fill="#F472B6" />

      {/* La hoja del examen */}
      <rect x="62" y="26" width="108" height="130" rx="9" fill="#F8FAFC" />
      <rect x="62" y="26" width="108" height="24" rx="9" fill="#3B82F6" />
      <rect x="62" y="40" width="108" height="10" fill="#3B82F6" />
      <rect x="74" y="34" width="46" height="6" rx="3" fill="#DBEAFE" />

      {/* Tema a tema: tres hechos y el que toca ahora */}
      {hechos.map(({ y, a, b }) => (
        <g key={y}>
          <rect x="74" y={y} width="14" height="14" rx="3.5" fill="#3B82F6" />
          <path d={`M77.5 ${y + 7.3}L80.2 ${y + 10}L84.8 ${y + 4.6}`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="96" y={y + 2} width={a} height="5" rx="2.5" fill="#93C5FD" />
          <rect x="96" y={y + 9} width={b} height="3.5" rx="1.75" fill="#CBD5E1" />
        </g>
      ))}
      <rect x="75" y="129" width="12" height="12" rx="3" stroke="#93C5FD" strokeWidth="2" />
      <rect x="96" y="130" width="46" height="5" rx="2.5" fill="#CBD5E1" />
      <rect x="96" y="137" width="36" height="3.5" rx="1.75" fill="#E2E8F0" />

      {/* La nota */}
      <circle cx="170" cy="36" r="22" fill="#10B981" />
      <circle cx="170" cy="36" r="17" stroke="#D1FAE5" strokeOpacity=".6" strokeWidth="1.5" />
      <text x="170" y="42" textAnchor="middle" fontSize="17" fontWeight="800" fill="#FFFFFF" fontFamily="inherit">10</text>

      {/* El lápiz, con la punta sobre la hoja */}
      <g transform="translate(150 150) rotate(-40)">
        <path d="M0 0L14 -6V6Z" fill="#FDE68A" />
        <path d="M0 0L5 -2.15V2.15Z" fill="#334155" />
        <rect x="14" y="-6" width="44" height="12" fill="#FBBF24" />
        <rect x="14" y="-1.5" width="44" height="3" fill="#F59E0B" fillOpacity=".7" />
        <rect x="61" y="-6" width="13" height="12" rx="3" fill="#F472B6" />
        <rect x="58" y="-6.5" width="7" height="13" fill="#CBD5E1" />
      </g>

      <path d={destello(206, 22, 5)} fill="#A7F3D0" />
      <path d={destello(214, 46, 3.5)} fill="#A7F3D0" fillOpacity=".7" />
    </svg>
  )
}

export const ILUSTRACIONES = { diaria: Diaria, juegos: Juegos, temario: Temario }

// Acentos por tarjeta. Clases literales (no construidas con plantillas) para
// que Tailwind las encuentre al generar el CSS.
export const TONOS = {
  amber: { borde: 'hover:border-amber-400/40', flecha: 'text-amber-300' },
  violet: { borde: 'hover:border-violet-400/40', flecha: 'text-violet-300' },
  sky: { borde: 'hover:border-sky-400/40', flecha: 'text-sky-300' },
}
