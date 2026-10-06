// Una «muestra de mano» dibujada: el contorno de un trozo de roca y su
// textura (cristales del granito, burbujas de la pómez, vetas del mármol,
// bandas del gneis…). Las posiciones salen de una semilla por roca: la misma
// roca siempre se dibuja igual.
import { ROCAS } from '../../lib/cicloRocas'

const W = 200, H = 130
const CONTORNO = 'M24 70 L38 30 L82 16 L132 20 L172 38 L184 76 L166 108 L110 120 L54 114 L28 96 Z'

function aleatorio(semilla) {
  let h = 0
  for (const ch of semilla) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return () => ((h = (h * 1103515245 + 12345) >>> 0) / 4294967296)
}

function textura(tipo, r) {
  const pts = n => Array.from({ length: n }, () => ({ x: 20 + r() * 170, y: 12 + r() * 112 }))
  switch (tipo) {
    case 'cristales': return { fondo: '#E7D3C8', capas: pts(70).map((p, i) => {
      const c = ['#F4A6A6', '#9CA3AF', '#1F2937', '#F8FAFC'][i % 4], s = 4 + r() * 6
      return <path key={i} d={`M${p.x} ${p.y}l${s} ${-s / 2}l${s / 2} ${s}l${-s} ${s / 2}Z`} fill={c} />
    }) }
    case 'fino': return { fondo: '#374151', capas: pts(140).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r=".9" fill="#6B7280" />) }
    case 'poros': return { fondo: '#E5E1D8', capas: pts(55).map((p, i) => <ellipse key={i} cx={p.x} cy={p.y} rx={1.5 + r() * 4} ry={1 + r() * 2.5} fill="#A8A29E" />) }
    case 'vidrio': return { fondo: '#111827', capas: [<path key="b" d="M50 40 Q90 26 140 44" stroke="#F8FAFC" strokeOpacity=".55" strokeWidth="5" fill="none" strokeLinecap="round" />, <path key="c" d="M60 92 Q110 104 150 84" stroke="#9CA3AF" strokeOpacity=".35" strokeWidth="3" fill="none" />] }
    case 'fosiles': return { fondo: '#CBD5E1', capas: [...pts(40).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="#94A3B8" />),
      ...[[70, 60], [130, 82], [104, 40]].map(([x, y], i) => <path key={`f${i}`} d={`M${x} ${y}m-9 0a9 9 0 1 1 18 0a6 6 0 1 1 -12 0a3 3 0 1 1 6 0`} stroke="#64748B" strokeWidth="1.6" fill="none" />)] }
    case 'granos': return { fondo: '#D6B47A', capas: pts(160).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={1 + r() * 1.3} fill={i % 3 ? '#B45309' : '#FDE68A'} fillOpacity=".7" />) }
    case 'cantos': return { fondo: '#A8A29E', capas: pts(18).map((p, i) => <ellipse key={i} cx={p.x} cy={p.y} rx={5 + r() * 9} ry={4 + r() * 6} fill={['#78716C', '#E7E5E4', '#B45309', '#57534E'][i % 4]} stroke="#44403C" strokeWidth=".8" />) }
    case 'carbon': return { fondo: '#0F0F10', capas: [<path key="b" d="M40 50 L150 40 M50 80 L160 74" stroke="#4B5563" strokeWidth="2" />] }
    case 'blanco': return { fondo: '#F8FAFC', capas: pts(30).map((p, i) => <path key={i} d={`M${p.x} ${p.y}l7 -3l2 7l-7 3Z`} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth=".6" />) }
    case 'vetas': return { fondo: '#F1F5F9', capas: [...[30, 62, 94].map((y, i) => <path key={i} d={`M20 ${y} Q70 ${y - 14} 110 ${y + 6} T190 ${y - 4}`} stroke="#94A3B8" strokeWidth="1.6" fill="none" />), ...pts(25).map((p, i) => <circle key={`b${i}`} cx={p.x} cy={p.y} r="1" fill="#FFFFFF" />)] }
    case 'laminas': return { fondo: '#334155', capas: Array.from({ length: 12 }, (_, i) => <path key={i} d={`M10 ${14 + i * 9}L195 ${8 + i * 9}`} stroke="#475569" strokeWidth="2" />) }
    case 'azucar': return { fondo: '#F5E1DA', capas: pts(180).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r=".9" fill={i % 2 ? '#FFFFFF' : '#D6A99A'} />) }
    default: return { fondo: '#9CA3AF', capas: Array.from({ length: 7 }, (_, i) => <path key={i} d={`M10 ${18 + i * 16} Q60 ${8 + i * 16} 100 ${20 + i * 16} T195 ${14 + i * 16}`} stroke={i % 2 ? '#1F2937' : '#F1F5F9'} strokeWidth="7" fill="none" />) } // bandas (gneis)
  }
}

export default function MuestraRoca({ roca, aria }) {
  const r = aleatorio(roca)
  const { fondo, capas } = textura(ROCAS[roca].textura, r)
  const id = `roca-${roca}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[150px]" role="img" aria-label={aria}>
      <defs><clipPath id={id}><path d={CONTORNO} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        <rect width={W} height={H} fill={fondo} />
        {capas}
      </g>
      <path d={CONTORNO} fill="none" stroke="#0f172a" strokeOpacity=".6" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}
