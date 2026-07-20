import { useState, useRef } from 'react'
import { useLang } from '../context/LangContext'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Un caso del arcade: situación + acciones puras. Sin timer propio — el
// reloj de la partida corre de fondo y es el único que manda. Al elegir se
// ve un destello de color medio segundo y se avisa al padre; sin
// explicación aquí, eso se guarda para el resumen final.
export default function ReaccionCaso({ caso, onResuelto }) {
  const { tr } = useLang()
  const [opciones] = useState(() => shuffle(caso.opciones))
  const [elegida, setElegida] = useState(null)
  const resueltoRef = useRef(false)

  function elegir(i) {
    if (resueltoRef.current) return
    resueltoRef.current = true
    setElegida(i)
    setTimeout(() => onResuelto(opciones[i]), 500)
  }

  const resuelto = elegida !== null

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-5 text-center">
        <p className="text-white text-lg leading-relaxed font-semibold">{tr(caso.situacion)}</p>
      </div>

      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 text-center">
        {tr({ es: '¿Qué haces?', en: 'What do you do?', ca: 'Què fas?' })}
      </p>

      <div className="space-y-3">
        {opciones.map((op, i) => {
          const activa = elegida === i
          const estilo = !resuelto
            ? 'border-white/15 bg-white/5 hover:bg-white/10'
            : activa
              ? op.esPeligrosa ? 'border-red-500 bg-red-500/20' : op.esCorrecta ? 'border-green-500 bg-green-500/20' : 'border-orange-400 bg-orange-400/15'
              : 'border-white/10 bg-white/5 opacity-30'
          return (
            <button key={i} onClick={() => elegir(i)} disabled={resuelto}
              className={`w-full text-left rounded-xl border px-4 py-3 text-sm text-white transition-colors ${estilo}`}>
              {activa && (op.esPeligrosa ? '🔴 ' : op.esCorrecta ? '✅ ' : '🟠 ')}
              {tr(op.texto)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
