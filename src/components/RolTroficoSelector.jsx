import { ROLES } from '../data/cadenaTrofica'

// Tarjeta del organismo (emoji + nombre + dato) y la rejilla de botones de
// rol trófico. Comparten esta pieza el juego y el examen (mismo patrón que
// TablaPeriodicaGrid para Encuentra el Elemento): misma UI, dos consumidores.
//
// Props:
//  - organismo: el organismo de la ronda actual.
//  - roles: array de ids de rol a mostrar (rolesDisponibles(uiDiff)).
//  - guess: id de rol seleccionado (o null).
//  - onPick(rolId): callback al tocar un botón; null cuando no se puede elegir.
//  - revelado: si true, colorea acierto (verde) / fallo (rojo) en vez del estado "elegido".
//  - lang: 'es' | 'en' | 'ca'.
const NOMBRE_KEY = { es: 'nombre', en: 'nombreEn', ca: 'nombreCa' }
const DATO_KEY = { es: 'dato', en: 'datoEn', ca: 'datoCa' }

export default function RolTroficoSelector({ organismo, roles, guess, onPick, revelado, lang }) {
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const disabled = !onPick || revelado

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 text-center">
        <span className="text-5xl block mb-2">{organismo.emoji}</span>
        <p className="text-white font-black text-xl mb-1">{organismo[NOMBRE_KEY[l]]}</p>
        <p className="text-white/50 text-sm leading-relaxed">{organismo[DATO_KEY[l]]}</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {roles.map(rolId => {
          const rol = ROLES[rolId]
          const isGuess = guess === rolId
          const isCorrecto = revelado && rolId === organismo.rol
          const isFalloElegido = revelado && isGuess && rolId !== organismo.rol

          let cls = 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
          if (!revelado && isGuess) cls = 'border-[#EDAE49] bg-[#EDAE49]/15 text-white'
          if (isCorrecto) cls = 'border-green-500/50 bg-green-500/15 text-green-300'
          if (isFalloElegido) cls = 'border-red-500/50 bg-red-500/15 text-red-300'

          return (
            <button
              key={rolId}
              onClick={() => !disabled && onPick(rolId)}
              disabled={disabled}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${cls} ${disabled ? 'cursor-default' : 'cursor-pointer active:scale-[0.98]'}`}
            >
              <span className="text-2xl shrink-0">{rol.emoji}</span>
              <span className="font-semibold text-sm">{rol.label[l] ?? rol.label.es}</span>
            </button>
          )
        })}
      </div>

      {revelado && (
        <p className="text-white/50 text-xs text-center mt-3 leading-relaxed">
          {ROLES[organismo.rol].explicacion[l] ?? ROLES[organismo.rol].explicacion.es}
        </p>
      )}
    </div>
  )
}
