import { useEffect, useState } from 'react'
import CoinsAnimation, { CoinsEarnedBadge } from './CoinsAnimation'
import GameResultFooter from './GameResultFooter'
import ShareButton from './ShareButton'
import { computeCoins } from '../lib/games'
import { consumeCompletedAssignments } from '../lib/activity'
import IgraalCard from './IgraalCard'

const L = {
  ptsLabel:  { es: 'puntos', en: 'points', ca: 'punts' },
  playAgain: { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  taskDone:  { es: 'Tarea de', en: 'Task for', ca: 'Tasca de' },
  taskDoneEnd: { es: 'completada', en: 'completed', ca: 'completada' },
}

/**
 * Pantalla final estándar de juego. Misma estructura en todos:
 * emoji → título → puntos grandes → monedas ganadas → mensaje →
 * [extras del juego via children] → ranking → compartir → jugar de nuevo → secundarias.
 *
 * Props:
 *  - game        id del registro (src/lib/games.js) — calcula monedas y alimenta el ranking
 *  - result      objeto para computeCoins (p.ej. { score }); por defecto { score }
 *  - emoji       emoji grande de cabecera
 *  - title       texto pequeño sobre la puntuación ("Partido finalizado", "Fin de la run"…)
 *  - score       puntuación mostrada en grande (y enviada al ranking)
 *  - scoreLabel  etiqueta bajo la puntuación (por defecto "puntos"); puede ser string u objeto {es,en,ca}
 *  - message     frase de valoración (opcional, ámbar)
 *  - stats       [{ label, value, emoji? }] tarjetas extra opcionales (nivel, rondas…)
 *  - shareText   texto para el botón compartir (opcional)
 *  - onPlayAgain acción principal
 *  - playAgainLabel  etiqueta del botón principal (por defecto "Jugar de nuevo")
 *  - secondaryActions [{ label, onClick }] botones secundarios (menú, cambiar dificultad…)
 *  - user, lang  contexto
 *  - children    contenido específico del juego (detalles, mejoras…), entre monedas y ranking
 */
export default function GameEndScreen({
  game, result, emoji, title, score, scoreLabel, message, stats,
  shareText, onPlayAgain, playAgainLabel, secondaryActions = [],
  user, lang = 'es', children,
}) {
  const coins = computeCoins(game, result ?? { score })
  const sLabel = typeof scoreLabel === 'object'
    ? (scoreLabel[lang] ?? scoreLabel.es)
    : (scoreLabel ?? L.ptsLabel[lang] ?? L.ptsLabel.es)

  // Aviso de tarea(s) del profesor completadas con esta partida — llega desde
  // saveActivity (ver consumeCompletedAssignments en src/lib/activity.js).
  // Buffer + evento cubren que el hook resuelva antes o después de montar.
  const [completedTasks, setCompletedTasks] = useState(null)
  useEffect(() => {
    const buffered = consumeCompletedAssignments()
    if (buffered) setCompletedTasks(buffered)
    const onCompleted = e => setCompletedTasks(e.detail)
    window.addEventListener('tuthor:assignments-completed', onCompleted)
    return () => window.removeEventListener('tuthor:assignments-completed', onCompleted)
  }, [])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
      <div className="max-w-lg w-full">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
          <div className="text-6xl mb-3">{emoji}</div>
          {title && <p className="text-white/40 text-sm mb-1">{title}</p>}
          <p className="text-5xl font-black text-white mb-1">{(score ?? 0).toLocaleString()}</p>
          <p className="text-white/60 text-lg">{sLabel}</p>
          <CoinsEarnedBadge coins={coins} lang={lang} />
          {completedTasks?.map((t, i) => (
            <p key={i} className="text-green-400 font-bold text-sm mt-3">
              ✅ {L.taskDone[lang] ?? L.taskDone.es} {t.className} {L.taskDoneEnd[lang] ?? L.taskDoneEnd.es}
            </p>
          ))}
          {message && <p className="text-[#EDAE49] font-bold mt-3">{message}</p>}

          {stats?.length > 0 && (
            <div className={`grid gap-3 mt-5 ${stats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {stats.map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-0.5">
                    {s.emoji ? `${s.emoji} ` : ''}{s.label}
                  </p>
                  <p className="text-white font-black text-2xl">{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {children}

          <GameResultFooter game={game} score={score} user={user} lang={lang} />
        </div>

        <div className="space-y-3">
          {shareText && <ShareButton text={shareText} lang={lang} />}
          {onPlayAgain && (
            <button onClick={onPlayAgain}
              className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-xl transition">
              {playAgainLabel ?? L.playAgain[lang] ?? L.playAgain.es}
            </button>
          )}
          {secondaryActions.map(a => (
            <button key={a.label} onClick={a.onClick}
              className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition">
              {a.label}
            </button>
          ))}
        </div>

        <IgraalCard className="mt-5" />

      </div>

      {score > 0 && coins > 0 && <CoinsAnimation coins={coins} />}
    </div>
  )
}
