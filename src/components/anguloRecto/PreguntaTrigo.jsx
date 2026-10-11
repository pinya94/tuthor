// Una ronda de Ángulo Recto: el triángulo rectángulo a escala (ángulo recto
// abajo a la derecha; α en el vértice de abajo o en el de arriba), las
// medidas de los lados («x» la que se busca) y las opciones. Al corregir se
// colorean los lados con su nombre respecto de α: así se ve que el cateto
// opuesto cambia según dónde esté el ángulo. Los problemas con contexto
// solo enseñan el triángulo al corregir: traducir el enunciado a un dibujo
// es la mitad del ejercicio. La usan el juego y el examen.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, etiquetaLado, roles, NOMBRE_ROL, PROBLEMAS } from '../../lib/anguloRecto'

const COLOR_ROL = { opuesto: '#FB7185', contiguo: '#38BDF8', hip: '#FBBF24' }

function Triangulo({ r, revelado, l, tr }) {
  const { base, alto, vertice } = r.tri
  // Ancho de sobra a la derecha: ahí va la etiqueta del lado vertical con su nombre.
  const W = 340
  const k = Math.min(180 / base, 130 / alto)
  const bw = Math.max(40, base * k), ah = Math.max(30, alto * k)
  const x0 = 40 + (180 - bw) / 2, y0 = 170
  const A = [x0, y0], C = [x0 + bw, y0], B = [x0 + bw, y0 - ah]
  // El lienzo se ajusta a la altura del triángulo: los muy tumbados no dejan hueco arriba.
  const top = Math.max(0, y0 - ah - 40)
  const R = vertice ? roles(vertice) : null
  const rolDe = ld => (R ? Object.keys(R).find(k2 => R[k2] === ld) : null)
  const colorear = revelado && R && r.tipo !== 'notable'
  const colorLado = ld => (colorear ? COLOR_ROL[rolDe(ld)] : '#CBD5E1')
  const nombre = ld => (colorear ? (NOMBRE_ROL[rolDe(ld)][l] ?? NOMBRE_ROL[rolDe(ld)].es) : null)
  const valor = ld => etiquetaLado(r, ld, revelado, l)

  // Etiqueta de cada lado, fuera del triángulo.
  const len = Math.hypot(bw, ah)
  const nx = -ah / len, ny = -bw / len // normal hacia fuera de la hipotenusa (arriba-izquierda)
  const etq = [
    { ld: 'base', x: (A[0] + C[0]) / 2, y: y0 + 18, anchor: 'middle' },
    { ld: 'alto', x: C[0] + 10, y: (C[1] + B[1]) / 2 + 4, anchor: 'start' },
    { ld: 'hip', x: (A[0] + B[0]) / 2 + nx * 16, y: (A[1] + B[1]) / 2 + ny * 16, anchor: 'end' },
  ]

  // Arco del ángulo marcado.
  let arco = null
  if (vertice) {
    const rad = 26
    const P = vertice === 'abajo' ? A : B
    const d1 = vertice === 'abajo' ? [1, 0] : [0, 1] // hacia C
    const d2 = vertice === 'abajo' ? [bw / len, -ah / len] : [-bw / len, ah / len] // hacia el otro vértice
    const p1 = [P[0] + d1[0] * rad, P[1] + d1[1] * rad], p2 = [P[0] + d2[0] * rad, P[1] + d2[1] * rad]
    const sweep = vertice === 'abajo' ? 0 : 1
    const mid = [(d1[0] + d2[0]) / 2, (d1[1] + d2[1]) / 2]
    const ml = Math.hypot(...mid)
    // Con ángulos pequeños la bisectriz cae entre los dos lados: la etiqueta, más lejos.
    const angMarcado = vertice === 'abajo' ? Math.atan2(ah, bw) : Math.atan2(bw, ah)
    const dist = rad + 14 + (angMarcado < 0.55 ? 26 : 0)
    const lx = P[0] + (mid[0] / ml) * dist, ly = P[1] + (mid[1] / ml) * dist + 4
    const texto = r.tipo === 'notable' ? `${r.a}°` : r.tipo === 'angulo' ? (revelado ? `α ≈ ${r.bueno}°` : 'α') : (r.tipo === 'razon' ? 'α' : `${r.tri.angulo}°`)
    arco = (
      <g>
        <path d={`M${p1[0]} ${p1[1]} A${rad} ${rad} 0 0 ${sweep} ${p2[0]} ${p2[1]}`} stroke="#A78BFA" strokeWidth="2.5" fill="none" />
        <text x={lx} y={ly} textAnchor="middle" fontSize="13" fontWeight="900" fill="#C4B5FD" stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>{texto}</text>
      </g>
    )
  }

  return (
    <svg viewBox={`0 ${top} ${W} ${204 - top}`} className="w-full max-w-[380px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Triángulo rectángulo', en: 'Right-angled triangle', ca: 'Triangle rectangle' })}>
      <polygon points={`${A} ${C} ${B}`} fill="#1E293B" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={colorLado('base')} strokeWidth="4" strokeLinecap="round" />
      <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={colorLado('alto')} strokeWidth="4" strokeLinecap="round" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={colorLado('hip')} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${C[0] - 13} ${C[1]} V${C[1] - 13} H${C[0]}`} stroke="#94A3B8" strokeWidth="1.8" fill="none" />
      {arco}
      {etq.map(e => {
        const v = valor(e.ld)
        const n = nombre(e.ld)
        if (!v && !n) return null
        const esX = v === 'x'
        return (
          <text key={e.ld} x={e.x} y={e.y} textAnchor={e.anchor} fontSize="14" fontWeight="900" fill={esX ? '#FCD34D' : '#FFFFFF'} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>
            {v}
            {n && <tspan fontSize="10.5" fontWeight="700" fill={colorLado(e.ld)}>{v ? ' · ' : ''}{n}</tspan>}
          </text>
        )
      })}
    </svg>
  )
}

export default function PreguntaTrigo({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const verTriangulo = r.tipo !== 'problema' || revelado
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      {verTriangulo ? (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <Triangulo r={r} revelado={revelado} l={l} tr={tr} />
        </div>
      ) : (
        <p className="text-center text-5xl leading-none mb-2" aria-hidden="true">{PROBLEMAS[r.problema].emoji}</p>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-base font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
