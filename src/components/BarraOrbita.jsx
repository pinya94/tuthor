// Barra de distancias del juego Órbita — extraída de Orbita.jsx para
// reutilizarla también en OrbitaExamen.jsx (mismo patrón que
// MapaCoordenadas.jsx para Coordenadas/CoordenadasExamen). Durante el
// lanzamiento solo se ve el Sol y la sonda; los planetas y la zona objetivo
// se revelan al confirmar (prop `resultado` no nula).
import { PLANETAS } from '../data/planetas'
import { CENTROS, FRONTERAS } from '../lib/orbita'

export default function BarraOrbita({ pos, objetivoIdx, resultado }) {
  const revelada = resultado != null
  const glow = resultado === 'perfecto' ? 'drop-shadow-[0_0_10px_rgba(74,222,128,0.9)]'
    : resultado === 'orbita' ? 'drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]'
    : resultado === 'fallo' ? 'drop-shadow-[0_0_10px_rgba(248,113,113,0.9)]'
    : ''

  return (
    <div className="relative w-full h-16 sm:h-20 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1030] to-[#050714] overflow-hidden">
      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xl sm:text-2xl">☀️</div>

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
          <span className="w-2 h-2 rounded-full bg-white/25 border border-white/40" />
          <span className="text-[8px] sm:text-[9px] text-white/30 font-bold mt-0.5">{i + 1}</span>
        </div>
      ))}

      {revelada && PLANETAS.map((p, i) => (
        <div key={p.id} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-base sm:text-lg select-none"
          style={{ left: `${CENTROS[i]}%` }}>
          {p.emoji}
        </div>
      ))}

      <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-xl sm:text-2xl select-none transition-[left] ${revelada ? '' : 'duration-75'} ${glow}`}
        style={{ left: `${pos}%` }}>
        🛰️
      </div>
    </div>
  )
}
