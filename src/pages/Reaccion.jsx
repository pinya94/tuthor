// ── Reacción (arcade de primeros auxilios, estilo Papers, Please) ───────────
// Casos de emergencia llegan uno tras otro; cada uno da un tiempo para
// decidir que se acorta con la racha (mismo patrón que el Survivor de
// Pentagrama Path). Una decisión peligrosa cuesta más vidas que un despiste.
// La partida acaba al agotar las vidas y termina en la pantalla final
// estándar de Tuthor con el desglose de errores.
//
// El contenido "profundo" del protocolo (ordenar pasos, explicaciones largas)
// vive aparte en el Examen de Primeros Auxilios — ver src/pages/PrimerosAuxiliosExamen.jsx.
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import ReaccionSituacionInicial from '../components/ReaccionSituacionInicial'
import ReaccionCaso from '../components/ReaccionCaso'
import ReaccionResumenFinal from '../components/ReaccionResumenFinal'
import { CASOS } from '../data/reaccionCasos'
import { FAILS_LIMIT, tiempoPara, elegirSiguienteCaso, puntosPorCaso } from '../lib/reaccionArcade'

const LS_BEST = 'reaccion-best'

function formatTiempo(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export default function Reaccion() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [pantalla, setPantalla] = useState('intro') // intro | jugando | final
  const [caso, setCaso] = useState(null)
  const [tiempoMs, setTiempoMs] = useState(tiempoPara(0))
  const [resueltos, setResueltos] = useState(0)
  const [vidasPerdidas, setVidasPerdidas] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [score, setScore] = useState(0)
  const [leves, setLeves] = useState([])
  const [peligrosas, setPeligrosas] = useState([])
  const [elapsed, setElapsed] = useState(0)
  const [best] = useState(() => Number(localStorage.getItem(LS_BEST) || 0))

  const savedRef = useRef(false)
  const ultimoIdRef = useRef(null)

  useEffect(() => {
    if (pantalla !== 'jugando') return
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [pantalla])

  function empezar() {
    savedRef.current = false
    setResueltos(0); setVidasPerdidas(0); setRacha(0); setMejorRacha(0); setScore(0)
    setLeves([]); setPeligrosas([]); setElapsed(0)
    const primero = elegirSiguienteCaso(CASOS, 0, null)
    ultimoIdRef.current = primero.id
    setCaso(primero)
    setTiempoMs(tiempoPara(0))
    setPantalla('jugando')
  }

  function onResuelto(opcion, msRestante) {
    let nuevaRacha = racha
    let nuevasVidasPerdidas = vidasPerdidas

    if (!opcion) {
      // Tiempo agotado: fallo leve
      setLeves(l => [...l, {
        situacion: caso.situacion,
        explicacion: { es: 'No hubo tiempo para decidir — en una emergencia real, dudar también tiene coste.', en: 'There was no time to decide — in a real emergency, hesitating has a cost too.', ca: 'No hi va haver temps per decidir — en una emergència real, dubtar també té un cost.' },
      }])
      nuevaRacha = 0
      nuevasVidasPerdidas += 1
    } else if (opcion.esCorrecta) {
      nuevaRacha = racha + 1
      setScore(s => s + puntosPorCaso(msRestante, tiempoMs, nuevaRacha))
    } else if (opcion.esPeligrosa) {
      setPeligrosas(p => [...p, { situacion: caso.situacion, texto: opcion.texto, explicacion: opcion.explicacion }])
      nuevaRacha = 0
      nuevasVidasPerdidas += 2
    } else {
      setLeves(l => [...l, { situacion: caso.situacion, texto: opcion.texto, explicacion: opcion.explicacion }])
      nuevaRacha = 0
      nuevasVidasPerdidas += 1
    }

    setRacha(nuevaRacha)
    setMejorRacha(m => Math.max(m, nuevaRacha))
    setVidasPerdidas(nuevasVidasPerdidas)
    const nuevosResueltos = resueltos + 1
    setResueltos(nuevosResueltos)

    if (nuevasVidasPerdidas >= FAILS_LIMIT) {
      setPantalla('final')
      return
    }
    const siguiente = elegirSiguienteCaso(CASOS, nuevosResueltos, ultimoIdRef.current)
    ultimoIdRef.current = siguiente.id
    setCaso(siguiente)
    setTiempoMs(tiempoPara(nuevosResueltos))
  }

  useEffect(() => {
    if (pantalla !== 'final' || savedRef.current) return
    savedRef.current = true
    if (score > Number(localStorage.getItem(LS_BEST) || 0)) {
      localStorage.setItem(LS_BEST, String(score))
    }
    if (!user) return
    const coinsEarned = computeCoins('reaccion', { score, peligrosas: peligrosas.length })
    saveActivity(user.uid, {
      type: 'juego', game: 'reaccion', score, coinsEarned,
      passed: peligrosas.length === 0,
      timeSpent: elapsed,
      userName: user.displayName || 'Jugador', userPhoto: user.photoURL || null,
    }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantalla])

  if (pantalla === 'final') {
    return (
      <GameEndScreen
        game="reaccion"
        result={{ score, peligrosas: peligrosas.length }}
        emoji="🚑"
        title={tr({ es: `${FAILS_LIMIT} vidas perdidas — fin de la partida`, en: `${FAILS_LIMIT} lives lost — run over`, ca: `${FAILS_LIMIT} vides perdudes — fi de la partida` })}
        score={score}
        message={peligrosas.length > 0
          ? tr({ es: 'Revisa las decisiones peligrosas antes de la próxima', en: 'Review the dangerous decisions before your next run', ca: 'Revisa les decisions perilloses abans de la propera' })
          : null}
        stats={[
          { label: tr({ es: 'Casos resueltos', en: 'Cases resolved', ca: 'Casos resolts' }), value: resueltos, emoji: '📋' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: mejorRacha, emoji: '🔥' },
          { label: tr({ es: 'Decisiones peligrosas', en: 'Dangerous decisions', ca: 'Decisions perilloses' }), value: peligrosas.length, emoji: '🔴' },
          { label: tr({ es: 'Tiempo', en: 'Time', ca: 'Temps' }), value: formatTiempo(elapsed), emoji: '⏱️' },
        ]}
        shareText={tr({
          es: `He conseguido ${score} puntos en Reacción 🚑 (${resueltos} casos resueltos) — ¿puedes superarme? https://tuthor.es/juegos/reaccion`,
          en: `I scored ${score} points in Reacción 🚑 (${resueltos} cases resolved) — can you beat me? https://tuthor.es/juegos/reaccion`,
          ca: `He aconseguit ${score} punts a Reacció 🚑 (${resueltos} casos resolts) — pots superar-me? https://tuthor.es/juegos/reaccion`,
        })}
        onPlayAgain={empezar}
        playAgainLabel={tr({ es: '▶ Otra vez', en: '▶ Play again', ca: '▶ Una altra vegada' })}
        secondaryActions={[{ label: tr({ es: '← Todos los juegos', en: '← All games', ca: '← Tots els jocs' }), onClick: () => navigate(localPath('/juegos')) }]}
        user={user} lang={lang}
      >
        <ReaccionResumenFinal leves={leves} peligrosas={peligrosas} />
      </GameEndScreen>
    )
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <SEOHead
        title={tr({ es: 'Reacción — arcade de primeros auxilios', en: 'Reacción — first-aid arcade', ca: 'Reacció — arcade de primers auxilis' })}
        description={tr({
          es: 'Casos de emergencia llegan uno tras otro: decide rápido qué hacer ante un atragantamiento, una quemadura, una alergia y más. Educativo, no sustituye una formación oficial.',
          en: 'Emergency cases arrive one after another: decide fast what to do for choking, burns, allergic reactions and more. Educational, not a substitute for official training.',
          ca: 'Casos d\'emergència arriben un darrere l\'altre: decideix ràpid què fer davant un ennuegament, una cremada, una al·lèrgia i més. Educatiu, no substitueix una formació oficial.',
        })}
        path="/juegos/reaccion" lang={lang} />

      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <button onClick={() => navigate(localPath('/juegos'))}
          className="text-white/30 hover:text-white/60 text-sm flex items-center gap-1 transition-colors">
          {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
        </button>
        {pantalla === 'jugando' && (
          <div className="flex items-center gap-3 text-sm font-mono">
            <span className="text-red-400">{'❤️'.repeat(Math.max(0, FAILS_LIMIT - vidasPerdidas))}</span>
            <span className="text-white/30">💰 {score}</span>
          </div>
        )}
      </div>

      {pantalla === 'intro' && (
        <ReaccionSituacionInicial onEmpezar={empezar} mejorPuntuacion={best} />
      )}

      {pantalla === 'jugando' && caso && (
        <ReaccionCaso key={`${resueltos}-${caso.id}`} caso={caso} tiempoMs={tiempoMs} onResuelto={onResuelto} />
      )}
    </div>
  )
}
