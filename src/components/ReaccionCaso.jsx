import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext'

const TICK_MS = 100

// Un caso del arcade: situación + acciones puras, con una barra de tiempo
// que baja sola. Al elegir (o al agotarse el tiempo) se ve un destello de
// color medio segundo y se avisa al padre — sin explicación aquí: eso se
// guarda para el resumen final, para no cortar el ritmo caso a caso.
export default function ReaccionCaso({ caso, tiempoMs, onResuelto }) {
  const { tr } = useLang()
  const [restante, setRestante] = useState(tiempoMs)
  const [elegida, setElegida] = useState(null) // índice de la opción elegida, o 'timeout'
  const resueltoRef = useRef(false)
  const restanteRef = useRef(tiempoMs)

  useEffect(() => {
    resueltoRef.current = false
    restanteRef.current = tiempoMs
    setRestante(tiempoMs)
    setElegida(null)
    const id = setInterval(() => {
      restanteRef.current = Math.max(0, restanteRef.current - TICK_MS)
      setRestante(restanteRef.current)
      if (restanteRef.current <= 0 && !resueltoRef.current) {
        resueltoRef.current = true
        clearInterval(id)
        setElegida('timeout')
        setTimeout(() => onResuelto(null, 0), 500)
      }
    }, TICK_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caso.id])

  function elegir(i) {
    if (resueltoRef.current) return
    resueltoRef.current = true
    setElegida(i)
    const msRestante = restanteRef.current
    setTimeout(() => onResuelto(caso.opciones[i], msRestante), 500)
  }

  const pct = Math.max(0, (restante / tiempoMs) * 100)
  const resuelto = elegida !== null

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-5">
        <div
          className={`h-full rounded-full transition-all ${pct < 25 ? 'bg-red-500' : pct < 50 ? 'bg-orange-400' : 'bg-[#EDAE49]'}`}
          style={{ width: `${pct}%`, transitionDuration: `${TICK_MS}ms`, transitionTimingFunction: 'linear' }}
        />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-5 text-center">
        <p className="text-white text-lg leading-relaxed font-semibold">{tr(caso.situacion)}</p>
      </div>

      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 text-center">
        {tr({ es: '¿Qué haces?', en: 'What do you do?', ca: 'Què fas?' })}
      </p>

      <div className="space-y-3">
        {caso.opciones.map((op, i) => {
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

      {elegida === 'timeout' && (
        <p className="text-orange-400 text-sm text-center mt-4 font-bold">
          ⏱️ {tr({ es: '¡Se acabó el tiempo!', en: 'Time\'s up!', ca: 'S\'ha acabat el temps!' })}
        </p>
      )}
    </div>
  )
}
