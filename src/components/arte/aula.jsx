// El aula vista desde arriba: pizarra, mesa del profesor y los pupitres, con
// tantos ocupados como alumnos tenga la clase (hasta llenar el dibujo). Es la
// portada de cada clase en el panel del profesor.
import { Lienzo } from './base'

const FILAS = 3
const COLUMNAS = 6
const CABEZAS = ['#F472B6', '#38BDF8', '#FBBF24', '#34D399', '#A78BFA', '#FB923C']

export function ArteAula({ alumnos = 0, className }) {
  const ocupados = Math.min(alumnos, FILAS * COLUMNAS)
  const mesas = []
  for (let f = 0; f < FILAS; f++) {
    for (let c = 0; c < COLUMNAS; c++) {
      const i = f * COLUMNAS + c
      mesas.push({ x: 30 + c * 32, y: 62 + f * 22, ocupada: i < ocupados, color: CABEZAS[i % CABEZAS.length] })
    }
  }
  return (
    <Lienzo className={className}>
      {/* pizarra y mesa del profesor */}
      <rect x="62" y="10" width="116" height="30" rx="3" fill="#065F46" stroke="#CA8A04" strokeWidth="3" />
      <path d="M74 22l4-5 4 9 4-6M96 20h20M96 28h14M130 24h30" stroke="#ECFDF5" strokeOpacity=".75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="100" y="45" width="40" height="9" rx="2" fill="#B45309" />
      {mesas.map(({ x, y, ocupada, color }) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y + 6} width="24" height="9" rx="2" fill={ocupada ? '#F59E0B' : '#FFFFFF'} fillOpacity={ocupada ? 1 : 0.1} />
          {ocupada && <circle cx={x + 12} cy={y + 3} r="4.5" fill={color} />}
        </g>
      ))}
    </Lienzo>
  )
}
