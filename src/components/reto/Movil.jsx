// El móvil del alumno en una partida en directo. La pregunta grande está en
// la pizarra; aquí solo lo necesario para contestar (en los juegos donde
// responder es tocar el dibujo, el dibujo también, porque es el botón).
// Sigue el estado que marca el profe: sala → pregunta → solución → … → fin.
import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../../context/LangContext'
import { responder, escuchaColeccion, posiciones, ERRORES } from '../../lib/rankingClase'
import { NotaProfe } from './ExamenReto'

const caja = 'rounded-2xl bg-[#141b2e] border border-white/[0.08] p-5 text-center'

export default function Movil({ codigo, reto, isCorrect, renderQuestion, l, yo }) {
  const { tr } = useLang()
  const dir = reto.directo ?? { estado: 'sala', i: -1 }
  const T = (reto.segundos ?? 30) * 1000
  const ronda = useMemo(() => { try { return dir.ronda ? JSON.parse(dir.ronda) : null } catch { return null } }, [dir.ronda])
  const [mias, setMias] = useState({}) // i → { estado: 'enviando'|'ok', correcta, puntos, error }
  const [marcador, setMarcador] = useState([])

  useEffect(() => escuchaColeccion(codigo, 'marcador', setMarcador), [codigo])

  const contesta = async a => {
    const i = dir.i
    if (mias[i]) return
    const correcta = !!isCorrect(ronda, a)
    setMias(m => ({ ...m, [i]: { estado: 'enviando', correcta } }))
    const r = await responder(codigo, i, correcta)
    setMias(m => ({ ...m, [i]: { estado: 'ok', correcta, puntos: r?.puntos ?? 0, error: r?.error } }))
  }

  const filas = [...marcador].sort((a, b) => b.puntos - a.puntos)
  const pos = posiciones(filas)
  const k = filas.findIndex(f => f.pid === yo.pid)
  const total = k >= 0 ? filas[k].puntos : 0
  const cabecera = (
    <div className="flex items-center justify-between mb-3 px-1">
      <p className="text-white/50 text-xs font-bold truncate">{reto.nombre}</p>
      <p className="text-white text-sm font-black shrink-0">{yo.apodo} · <span className="text-amber-300 tabular-nums">{total.toLocaleString()}</span></p>
    </div>
  )
  const marco = hijo => <div className="relative z-10 max-w-xl mx-auto px-3 py-4">{cabecera}{hijo}</div>

  if (dir.estado === 'sala' || dir.i < 0) {
    return marco(
      <div className={`${caja} space-y-3`}>
        <p className="text-5xl">👀</p>
        <p className="text-white font-black text-xl">{tr({ es: '¡Ya estás dentro!', en: 'You’re in!', ca: 'Ja hi ets!' })}</p>
        <p className="text-white/60">{tr({ es: 'Mira la pizarra: la partida empieza cuando tu profe lo diga.', en: 'Watch the board: the game starts when your teacher says so.', ca: 'Mira la pissarra: la partida comença quan el teu profe ho digui.' })}</p>
        <NotaProfe nota={reto.nota} />
      </div>,
    )
  }

  if (dir.estado === 'fin') {
    return marco(
      <div className={`${caja} space-y-2`}>
        <p className="text-5xl">{k >= 0 && pos[k] <= 3 ? ['🥇', '🥈', '🥉'][pos[k] - 1] : '🏁'}</p>
        <p className="text-white font-black text-2xl">{k >= 0 ? tr({ es: `Has quedado ${pos[k]}.º de ${filas.length}`, en: `You came ${pos[k]} of ${filas.length}`, ca: `Has quedat ${pos[k]}r de ${filas.length}` }) : tr({ es: 'Fin de la partida', en: 'Game over', ca: 'Fi de la partida' })}</p>
        <p className="text-amber-300 font-black text-xl tabular-nums">{total.toLocaleString()} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}</p>
      </div>,
    )
  }

  const mia = mias[dir.i]
  if (dir.estado === 'solucion') {
    return marco(
      <div className={`${caja} space-y-2`}>
        <p className="text-5xl">{!mia ? '⏰' : mia.correcta ? '✅' : '❌'}</p>
        <p className={`font-black text-2xl ${!mia ? 'text-white/70' : mia.correcta ? 'text-green-300' : 'text-red-300'}`}>
          {!mia ? tr({ es: 'Sin responder', en: 'No answer', ca: 'Sense resposta' }) : mia.correcta ? `+${(mia.puntos ?? 0).toLocaleString()}` : tr({ es: 'Esta no', en: 'Not this one', ca: 'Aquesta no' })}
        </p>
        {k >= 0 && <p className="text-white/60">{tr({ es: `Vas ${pos[k]}.º de ${filas.length}`, en: `You’re ${pos[k]} of ${filas.length}`, ca: `Vas ${pos[k]}r de ${filas.length}` })}</p>}
        <p className="text-white/40 text-sm">{tr({ es: 'La solución está en la pizarra', en: 'The answer is on the board', ca: 'La solució és a la pissarra' })}</p>
      </div>,
    )
  }

  // Pregunta (una por clave: su reloj empieza al llegar a este móvil)
  return marco(<PreguntaMovil key={dir.i} {...{ ronda, mia, T, dir, reto, contesta, renderQuestion, l, tr }} />)
}

// El reloj del móvil puede ir desfasado del servidor: la cuenta atrás
// empieza cuando la pregunta llega aquí (el servidor da un margen).
function PreguntaMovil({ ronda, mia, T, dir, reto, contesta, renderQuestion, l, tr }) {
  const [llegada] = useState(() => Date.now())
  const [ahora, setAhora] = useState(llegada)
  useEffect(() => {
    const t = setInterval(() => setAhora(Date.now()), 250)
    return () => clearInterval(t)
  }, [])
  const queda = Math.max(0, T - (ahora - llegada))
  const segs = Math.ceil(queda / 1000)
  if (mia) {
    return (
      <div className={`${caja} space-y-2`}>
        <p className="text-5xl">{mia.estado === 'enviando' ? '⏳' : mia.error ? '⚠️' : '📨'}</p>
        <p className="text-white font-black text-xl">{mia.error ? tr(ERRORES[mia.error] ?? ERRORES.red) : tr({ es: 'Respuesta enviada', en: 'Answer sent', ca: 'Resposta enviada' })}</p>
        <p className="text-white/50">{tr({ es: 'Espera a que se acabe el tiempo…', en: 'Wait for the time to run out…', ca: 'Espera que s’acabi el temps…' })} {segs > 0 && <b className="text-white tabular-nums">{segs}s</b>}</p>
      </div>
    )
  }
  if (queda <= 0 || !ronda) {
    return (<div className={caja}><p className="text-5xl mb-2">⏰</p><p className="text-white font-black text-xl">{tr({ es: '¡Se acabó el tiempo!', en: 'Time’s up!', ca: 'S’ha acabat el temps!' })}</p></div>)
  }
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-white/50 text-xs font-bold">{tr({ es: 'Pregunta', en: 'Question', ca: 'Pregunta' })} {dir.i + 1}/{reto.nPreguntas ?? 10}</span>
        <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className={`h-full ${segs <= 5 ? 'bg-red-400' : 'bg-amber-400'} transition-[width] duration-200`} style={{ width: `${(queda / T) * 100}%` }} />
        </div>
        <span className={`text-sm font-black tabular-nums ${segs <= 5 ? 'text-red-300' : 'text-white'}`}>{segs}s</span>
      </div>
      {renderQuestion({ round: ronda, phase: 'choose', onAnswer: contesta, l, qIndex: dir.i })}
    </div>
  )
}
