import { useEffect, useState } from 'react'
import CoinsAnimation, { CoinsEarnedBadge } from './CoinsAnimation'
import GameResultFooter from './GameResultFooter'
import ShareButton from './ShareButton'
import { computeCoins, GAMES as REGISTRO } from '../lib/games'
import { consumeCompletedAssignments } from '../lib/activity'
import AdSlot from './AdSlot'
import ReferralCard from './ReferralCard'
import { ARTE_JUEGOS, ArteJuego, slugDeRuta } from './arte'
import { Acierto, IconoDeEmoji } from './Iconos'
import DescubreTuthor from './DescubreTuthor'

// Slug del arte del juego: por su ruta en el registro, o el propio id.
function slugDeArte(game) {
  const porRuta = slugDeRuta(REGISTRO[game]?.route)
  if (porRuta && ARTE_JUEGOS[porRuta]) return porRuta
  return ARTE_JUEGOS[game] ? game : null
}

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

  const arte = slugDeArte(game)

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
      <div className="max-w-lg w-full">

        <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] overflow-hidden mb-5">
          {arte && (
            <div className="border-b border-white/[0.06] px-6 pt-4 pb-2">
              <ArteJuego slug={arte} className="w-full max-w-[250px] mx-auto aspect-video block" />
            </div>
          )}

          <div className="px-6 sm:px-8 py-6 text-center">
            {!arte && emoji && <div className="text-6xl mb-3">{emoji}</div>}
            {title && <p className="text-white/40 text-sm mb-1">{title}</p>}
            <p className="text-6xl font-black text-white tabular-nums tracking-tight leading-none">{(score ?? 0).toLocaleString()}</p>
            <p className="text-white/50 text-base mt-1.5">{sLabel}</p>
            <CoinsEarnedBadge coins={coins} lang={lang} />
            {completedTasks?.map((t, i) => (
              <p key={i} className="flex items-center justify-center gap-1.5 text-green-400 font-bold text-sm mt-3">
                <Acierto className="w-4 h-4" />
                {L.taskDone[lang] ?? L.taskDone.es} {t.className} {L.taskDoneEnd[lang] ?? L.taskDoneEnd.es}
              </p>
            ))}
            {message && <p className="text-[#EDAE49] font-bold mt-3">{message}</p>}

            {stats?.length > 0 && (
              <div className={`grid gap-2.5 mt-5 ${stats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {stats.map(s => (
                  <div key={s.label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 flex items-center gap-3 text-left">
                    <IconoDeEmoji emoji={s.emoji} className="w-8 h-8 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold truncate">{s.label}</p>
                      <p className="text-white font-black text-xl tabular-nums leading-tight">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {children}

            <GameResultFooter game={game} score={score} user={user} lang={lang} />
          </div>
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

        {/* Tras la partida: invitar (gratis y da Pro) y el anuncio. El banner
            de "Hazte Pro" se quitó de aquí a propósito: cortaba el final de
            cada partida con una venta. ReferralCard se pinta solo si hay
            sesión; AdSlot cae a iGraal mientras AdSense no tenga bloque. */}
        {/* Qué más hay del mismo tema (y qué es Tuthor, para quien entra por primera vez). */}
        <DescubreTuthor id={game} className="mt-5" />
        <ReferralCard variant="compact" className="mt-5" />
        <AdSlot placement="gameEnd" className="mt-3" />

      </div>

      {score > 0 && coins > 0 && <CoinsAnimation coins={coins} />}
    </div>
  )
}
