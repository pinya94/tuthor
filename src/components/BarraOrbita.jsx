// Barra de distancias del juego Órbita — extraída de Orbita.jsx para
// reutilizarla también en OrbitaExamen.jsx (mismo patrón que
// MapaCoordenadas.jsx para Coordenadas/CoordenadasExamen). Durante el
// lanzamiento solo se ve el Sol y la sonda; los planetas y la zona objetivo
// se revelan al confirmar (prop `resultado` no nula).
import { PLANETAS } from '../data/planetas'
import { CENTROS, FRONTERAS } from '../lib/orbita'
import PlanetaDibujo, { Sonda } from './orbita/PlanetaDibujo'

export default function BarraOrbita({ pos, objetivoIdx, resultado }) {
  const revelada = resultado != null
  const glow = resultado === 'perfecto' ? 'drop-shadow-[0_0_10px_rgba(74,222,128,0.9)]'
    : resultado === 'orbita' ? 'drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]'
    : resultado === 'fallo' ? 'drop-shadow-[0_0_10px_rgba(248,113,113,0.9)]'
    : ''

  return (
    <div className="relative w-full h-24 sm:h-28 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1030] to-[#050714] overflow-hidden">
      {/* Estrellas de fondo y el Sol asomando por la izquierda */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
        {[[8, 20], [22, 78], [37, 15], [51, 70], [64, 28], [79, 82], [91, 18], [70, 55]].map(([x, y]) => (
          <circle key={x} cx={`${x}%`} cy={`${y}%`} r="1" fill="#fff" opacity="0.35" />
        ))}
      </svg>
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-500 shadow-[0_0_24px_8px_rgba(251,191,36,0.45)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />

      {revelada && objetivoIdx != null && (
        <div className="absolute top-0 bottom-0 bg-[#EDAE49]/10 border-x border-[#EDAE49]/40"
          style={{
            left: `${objetivoIdx > 0 ? FRONTERAS[objetivoIdx - 1] : 0}%`,
            right: `${objetivoIdx < FRONTERAS.length ? 100 - FRONTERAS[objetivoIdx] : 0}%`,
          }} />
      )}

      {/* Marcas neutras: las 8 paradas existen y se ve dónde están, pero no
          cuál es cuál — solo el número de orden desde el Sol. Sin esto es
          adivinar a ciegas; con el emoji ya puesto sería demasiado fácil. */}
      {!revelada && PLANETAS.map((p, i) => (
        <div key={p.id} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center select-none"
          style={{ left: `${CENTROS[i]}%` }}>
          <span className="w-3.5 h-3.5 rounded-full bg-white/15 border-2 border-white/40" />
          <span className="absolute top-full mt-1 text-[10px] text-white/40 font-bold">{i + 1}</span>
        </div>
      ))}

      {revelada && PLANETAS.map((p, i) => (
        <div key={p.id} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 select-none"
          style={{ left: `${CENTROS[i]}%` }}>
          <PlanetaDibujo id={p.id} className={i >= 4 ? 'w-9 h-9' : 'w-6 h-6'} />
        </div>
      ))}

      <div className={`absolute top-[18%] -translate-x-1/2 select-none transition-[left] ${revelada ? '' : 'duration-75'} ${glow}`}
        style={{ left: `${pos}%` }}>
        <Sonda className="w-8 h-8" />
        <span className="block mx-auto w-px h-4 bg-[#EDAE49]/70" />
      </div>
    </div>
  )
}
