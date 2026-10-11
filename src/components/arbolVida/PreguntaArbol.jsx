// Una ronda de Árbol de la Vida. Las de árbol enseñan el cladograma con las
// especies arriba; al corregir se marcan en verde las dos ramas y el
// antepasado común que comparten. Las de «qué apareció antes», al corregir,
// una línea del tiempo (escala logarítmica: de 3500 millones de años a hoy).
// El resto, la escena con su emoji. La usan el juego y el examen.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, ARBOLES, SERES, ESCENARIOS, APARICION, hojas } from '../../lib/arbolVida'

const VERDE = '#4ADE80', GRIS = '#94A3B8'

// Coloca cada nodo: hojas arriba repartidas; los internos, en la media de sus
// hijos y más abajo cuanto más alto es el subárbol.
function layout(t) {
  const lista = hojas(t)
  const W = 300, x0 = 40, paso = (W - 2 * x0) / (lista.length - 1)
  const nodos = []
  function rec(n) {
    if (typeof n === 'string') { const nodo = { hoja: n, x: x0 + lista.indexOf(n) * paso, h: 0 }; nodos.push(nodo); return nodo }
    const [a, b] = n.map(rec)
    const nodo = { hijos: [a, b], x: (a.x + b.x) / 2, h: Math.max(a.h, b.h) + 1, sub: hojas(n) }
    nodos.push(nodo)
    return nodo
  }
  const raiz = rec(t)
  return { raiz, nodos, alto: raiz.h }
}

function Arbol({ r, revelado, tr }) {
  const t = ARBOLES[r.arbol]
  const { raiz, nodos, alto } = layout(t)
  const Y = h => 52 + h * (100 / alto)
  // El antepasado común: el nodo más bajo que contiene a los dos.
  const ancestro = nodos.filter(n => n.sub && n.sub.includes(r.x) && n.sub.includes(r.bueno)).sort((a, b) => a.h - b.h)[0]
  const enCamino = n => revelado && ancestro && (n === ancestro || (n.hoja ? [r.x, r.bueno].includes(n.hoja) : n.sub.every(h => [r.x, r.bueno].includes(h)) && n.h < ancestro.h))
  const lineas = []
  for (const n of nodos) if (n.hijos) for (const c of n.hijos) {
    const marcada = revelado && n === ancestro
    lineas.push(<path key={`${n.x}-${c.x}-${c.h}`} d={`M${n.x} ${Y(n.h)} L${c.x} ${Y(c.h)}`} stroke={marcada || (enCamino(n) && enCamino(c)) ? VERDE : GRIS} strokeWidth={marcada ? 4 : 2.5} strokeLinecap="round" />)
  }
  return (
    <svg viewBox={`0 0 300 ${Y(alto) + 22}`} className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Árbol evolutivo', en: 'Evolutionary tree', ca: 'Arbre evolutiu' })}>
      {lineas}
      <line x1={raiz.x} y1={Y(alto)} x2={raiz.x} y2={Y(alto) + 14} stroke={GRIS} strokeWidth="2.5" />
      {revelado && ancestro && <circle cx={ancestro.x} cy={Y(ancestro.h)} r="6" fill={VERDE} />}
      {revelado && ancestro && <text x={ancestro.x > 180 ? ancestro.x - 10 : ancestro.x + 10} y={Y(ancestro.h) + 4} textAnchor={ancestro.x > 180 ? 'end' : 'start'} fontSize="10" fontWeight="800" fill={VERDE}>{tr({ es: 'antepasado común', en: 'common ancestor', ca: 'avantpassat comú' })}</text>}
      {nodos.filter(n => n.hoja).map(n => (
        <g key={n.hoja}>
          <text x={n.x} y={30} textAnchor="middle" fontSize="26">{SERES[n.hoja].e}</text>
          {n.hoja === r.x && <rect x={n.x - 18} y={4} width="36" height="34" rx="8" fill="none" stroke="#FCD34D" strokeWidth="2.5" />}
          {revelado && n.hoja === r.bueno && <rect x={n.x - 18} y={4} width="36" height="34" rx="8" fill="none" stroke={VERDE} strokeWidth="2.5" />}
        </g>
      ))}
    </svg>
  )
}

function Linea({ r, l, tr }) {
  // En orden, del más antiguo (izquierda) al más reciente, a la misma distancia:
  // con una escala real, 230 y 200 millones de años se montarían uno encima del otro.
  const orden = [...r.grupo].sort((a, b) => APARICION[b].ma - APARICION[a].ma)
  const X = ma => 45 + orden.findIndex(g => APARICION[g].ma === ma) * 73
  return (
    <svg viewBox="0 0 310 100" className="w-full max-w-[360px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Línea del tiempo', en: 'Timeline', ca: 'Línia del temps' })}>
      <line x1="20" x2="295" y1="56" y2="56" stroke={GRIS} strokeWidth="2.5" />
      {orden.map((g, i) => {
        const x = X(APARICION[g].ma)
        const arriba = i % 2 === 0
        return (
          <g key={g}>
            <circle cx={x} cy={56} r={g === r.bueno ? 6 : 4} fill={g === r.bueno ? VERDE : '#CBD5E1'} />
            <text x={x} y={arriba ? 36 : 96} textAnchor="middle" fontSize="18">{APARICION[g].e}</text>
            <text x={x} y={arriba ? 16 : 74} textAnchor="middle" fontSize="9" fontWeight="800" fill={g === r.bueno ? VERDE : GRIS}>{APARICION[g].ma >= 1 ? `${APARICION[g].ma.toLocaleString(l === 'en' ? 'en-GB' : 'es-ES')} Ma` : '0,3 Ma'}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function PreguntaArbol({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const emoji = r.tipo === 'darwin' ? ESCENARIOS.find(e => e.id === r.escenario).e : r.tipo === 'organos' ? '🦴' : r.tipo === 'prueba' ? '🔎' : null
  const largas = ['darwin'].includes(r.tipo)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      {r.tipo === 'arbol' && <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3"><Arbol r={r} revelado={revelado} tr={tr} /></div>}
      {r.tipo === 'tiempo' && revelado && <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3"><Linea r={r} l={l} tr={tr} /></div>}
      {emoji && <p className="text-center text-5xl leading-none mb-2" aria-hidden="true">{emoji}</p>}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${largas ? 'grid-cols-1' : r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-2 rounded-xl border text-white text-sm font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
