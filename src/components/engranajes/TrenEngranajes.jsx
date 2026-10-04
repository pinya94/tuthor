// Dibujo de un tren de engranajes (lib/engranajes.js). Cada rueda tiene sus
// dientes de verdad y un radio proporcional a ellos, así «la pequeña va más
// rápida» se ve. La motriz gira desde el principio (para que se vea el
// sentido); al corregir giran todas, cada una a su velocidad y en su sentido.
const K = 2.15          // radio por diente
const ALTO_DIENTE = 6
const GIRO = 480        // segundos por vuelta a 1 rpm: 60 rpm → 8 s por vuelta

const radio = z => K * z + 6

function pathRueda(cx, cy, z) {
  const r = radio(z), ro = r + ALTO_DIENTE / 2, ri = r - ALTO_DIENTE / 2
  const paso = (2 * Math.PI) / z
  let d = ''
  for (let i = 0; i < z; i++) {
    const a = i * paso
    const pts = [
      [ri, a], [ro, a + paso * 0.18], [ro, a + paso * 0.48], [ri, a + paso * 0.66],
    ]
    for (const [rr, aa] of pts) d += `${d ? 'L' : 'M'}${(cx + rr * Math.cos(aa)).toFixed(1)} ${(cy + rr * Math.sin(aa)).toFixed(1)}`
  }
  return d + 'Z'
}

// Posiciones: cada rueda se coloca tocando a la que la mueve, con un ligero
// zigzag para que el tren quepa en un móvil; las del mismo eje, encima.
export function posiciones(tren) {
  const pos = [{ x: 0, y: 0 }]
  let giro = 0
  for (let i = 1; i < tren.length; i++) {
    const r = tren[i], m = tren[r.mueve]
    if (r.mismoEje) { pos.push({ ...pos[r.mueve] }); continue }
    giro = giro >= 0 ? -0.42 : 0.42
    const d = radio(m.z) + radio(r.z)
    pos.push({ x: pos[r.mueve].x + d * Math.cos(giro), y: pos[r.mueve].y + d * Math.sin(giro) })
  }
  return pos
}

const COLORES = ['#94a3b8', '#60a5fa', '#a78bfa', '#34d399', '#f472b6', '#fbbf24', '#22d3ee']

export default function TrenEngranajes({ ronda, revelado, t }) {
  const { tren } = ronda
  const pos = posiciones(tren)
  const xs = pos.map((p, i) => [p.x - radio(tren[i].z) - 8, p.x + radio(tren[i].z) + 8]).flat()
  const ys = pos.map((p, i) => [p.y - radio(tren[i].z) - 8, p.y + radio(tren[i].z) + 8]).flat()
  const minX = Math.min(...xs) - 6, maxX = Math.max(...xs) + 6
  const minY = Math.min(...ys) - 22, maxY = Math.max(...ys) + 8
  const ultima = tren.length - 1
  // ¿Es la rueda grande de un eje compartido? (su pareja, más pequeña, va encima)
  const grandeDeEje = i => tren.some((o, j) => j !== i && pos[j].x === pos[i].x && pos[j].y === pos[i].y && o.z < tren[i].z)
  // Se dibujan primero las grandes, para que el piñón de una rueda doble quede encima.
  const orden = tren.map((_, i) => i).sort((a, b) => (pos[a].x === pos[b].x && pos[a].y === pos[b].y ? tren[b].z - tren[a].z : a - b))

  return (
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} className="w-full h-auto block" style={{ maxHeight: '46vh' }} role="img" aria-label={t.aria}>
      {orden.map(i => {
        const r = tren[i], p = pos[i]
        const gira = revelado || i === 0
        const dur = GIRO / r.rpm
        const color = i === ultima ? '#facc15' : COLORES[i % COLORES.length]
        const compartido = r.mismoEje || tren.some(o => o.mismoEje && o.mueve === i)
        return (
          <g key={i}>
            <g>
              {gira && (
                <animateTransform attributeName="transform" type="rotate" from={`0 ${p.x} ${p.y}`} to={`${360 * r.sentido} ${p.x} ${p.y}`} dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" />
              )}
              <path d={pathRueda(p.x, p.y, r.z)} fill={color} fillOpacity={i === ultima ? 0.35 : 0.28} stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
              <path d={`M${p.x} ${p.y - radio(r.z) + 9}V${p.y - 6}`} stroke={color} strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx={p.x} cy={p.y} r={compartido ? 7 : 5} fill="#0f172a" stroke={color} strokeWidth="2" />
            {/* Dientes: en una rueda doble, el número de la grande va por fuera de la pequeña */}
            <text x={p.x} y={p.y + radio(r.z) * (grandeDeEje(i) ? 0.8 : 0.5) + 4} fontSize="11" fontWeight="800" fill="#e2e8f0" textAnchor="middle" stroke="#0b1226" strokeWidth="3" paintOrder="stroke">{r.z}</text>
          </g>
        )
      })}
      {/* La motriz se rotula fuera del dibujo (PreguntaEngranajes); aquí, la de la pregunta */}
      <text x={pos[ultima].x} y={pos[ultima].y - radio(tren[ultima].z) - 10} fontSize="14" fontWeight="900" fill="#facc15" textAnchor="middle">
        {revelado ? `${tren[ultima].sentido === 1 ? '↻' : '↺'} ${Math.round(tren[ultima].rpm * 100) / 100} rpm` : '?'}
      </text>
    </svg>
  )
}
