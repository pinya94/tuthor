// El vaso de El Laboratorio: la mezcla tal como se vería. Los líquidos que no
// se mezclan van en capas por densidad (el aceite arriba); los que sí, en una
// sola capa con el color mezclado; lo disuelto tiñe el líquido y no se ve
// como grano (por eso una disolución es homogénea); los sólidos son granos de
// su color y tamaño, posados en el fondo. Las posiciones salen de una semilla
// por mezcla: el mismo vaso siempre se dibuja igual.
import { COMPONENTES } from '../../lib/laboratorio'

const W = 260, H = 200
const X0 = 60, X1 = 200, FONDO = 182, BORDE = 28

const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
function mezclaColor(cs) {
  const v = cs.map(hex)
  const m = [0, 1, 2].map(k => Math.round(v.reduce((s, x) => s + x[k], 0) / v.length))
  return '#' + m.map(x => x.toString(16).padStart(2, '0')).join('')
}
function aleatorio(semilla) {
  let h = 0
  for (const ch of semilla) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return () => ((h = (h * 1103515245 + 12345) >>> 0) / 4294967296)
}

export default function VasoMezcla({ ronda, aria }) {
  const comps = ronda.componentes.map(id => ({ id, ...COMPONENTES[id] }))
  const liquidos = comps.filter(c => c.liquido)
  const disueltos = ronda.seco ? [] : comps.filter(c => c.disuelto && !c.liquido)
  const solidos = comps.filter(c => c.grano && !(c.disuelto && !ronda.seco))
  const rand = aleatorio(ronda.mezcla)

  // Capas de líquido: los inmiscibles aparte; el resto, mezclado y teñido.
  const capas = []
  if (liquidos.length) {
    const miscibles = liquidos.filter(c => !c.inmiscible)
    const tinte = disueltos.map(c => c.disuelto)
    if (miscibles.length) {
      const base = mezclaColor(miscibles.map(c => c.liquido))
      // lo disuelto oscuro (tintas, pigmentos) manda en el color
      const color = tinte.length ? mezclaColor([base, ...tinte, ...tinte]) : base
      capas.push({ color, densidad: Math.max(...miscibles.map(c => c.densidad)) })
    }
    for (const c of liquidos.filter(c => c.inmiscible)) capas.push({ color: c.liquido, densidad: c.densidad })
    capas.sort((a, b) => b.densidad - a.densidad) // la más densa, abajo
  }
  const altoLiquido = 110
  const altoCapa = capas.length ? altoLiquido / capas.length : 0

  // Granos: en el fondo, mezclados, cada sólido con su tamaño.
  const granos = []
  for (const s of solidos) {
    const [color, r] = s.grano
    const n = Math.round((ronda.seco ? 260 : 140) / (r * r))
    for (let i = 0; i < Math.max(6, n); i++) {
      const alto = ronda.seco ? 52 : 26
      granos.push({ x: X0 + 6 + rand() * (X1 - X0 - 12), y: FONDO - r - rand() * alto, r, color, k: `${s.id}${i}` })
    }
  }
  granos.sort(() => rand() - 0.5)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[230px]" role="img" aria-label={aria}>
      {capas.map((c, i) => (
        <rect key={i} x={X0 + 2} y={FONDO - altoCapa * (i + 1)} width={X1 - X0 - 4} height={altoCapa} fill={c.color} fillOpacity=".55" />
      ))}
      {capas.length > 0 && <path d={`M${X0 + 2} ${FONDO - altoLiquido}H${X1 - 2}`} stroke={capas.at(-1).color} strokeWidth="2" />}
      {granos.map(g => <circle key={g.k} cx={g.x} cy={g.y} r={g.r} fill={g.color} stroke="#0f172a" strokeOpacity=".35" strokeWidth=".6" />)}
      {/* destellos de lo disuelto: está, pero no se ve como grano */}
      {disueltos.length > 0 && [0, 1, 2, 3, 4].map(i => (
        <circle key={i} cx={X0 + 25 + i * 26} cy={FONDO - 30 - (i % 2) * 34} r="1.6" fill="#F8FAFC" fillOpacity=".6" />
      ))}
      <path d={`M${X0} ${BORDE}V${FONDO + 3}Q${X0} ${FONDO + 7} ${X0 + 5} ${FONDO + 7}H${X1 - 5}Q${X1} ${FONDO + 7} ${X1} ${FONDO + 3}V${BORDE}`}
        fill="none" stroke="#CBD5E1" strokeOpacity=".85" strokeWidth="3" strokeLinejoin="round" />
      <path d={`M${X0 - 6} ${BORDE}H${X0 + 4}M${X1 - 4} ${BORDE}H${X1 + 6}`} stroke="#CBD5E1" strokeOpacity=".85" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
