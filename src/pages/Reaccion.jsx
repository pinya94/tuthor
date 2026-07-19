// ── Reacción (arcade roguelike de primeros auxilios) ────────────────────────
// Un único reloj para toda la partida en vez de vidas: empieza en 1 minuto,
// cada acierto suma 10s y cada fallo resta 20s — el reloj corre siempre de
// fondo, así que decidir despacio también cuesta tiempo. Cada 5 aciertos se
// elige 1 de 3 mejoras (mismo patrón que el modo roguelike de Acércate). Los
// casos salen de un mazo barajado sin repetición dentro de la partida.
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
import ReaccionMejora from '../components/ReaccionMejora'
import ReaccionResumenFinal from '../components/ReaccionResumenFinal'
import { CASOS } from '../data/reaccionCasos'
import { RELOJ_INICIAL_MS, ACIERTO_MS, FALLO_MS, MEJORA_CADA, barajarMazo, puntosPorCaso } from '../lib/reaccionArcade'

const LS_BEST = 'reaccion-best'
const TICK_MS = 100

function formatReloj(ms) {
  const s = Math.ceil(ms / 1000)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

function formatTiempo(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export default function Reaccion() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [pantalla, setPantalla] = useState('intro') // intro | jugando | mejora | final
  const [caso, setCaso] = useState(null)
  const [relojMs, setRelojMs] = useState(RELOJ_INICIAL_MS)
  const [resueltos, setResueltos] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [score, setScore] = useState(0)
  const [escudoActivo, setEscudoActivo] = useState(false)
  const [leves, setLeves] = useState([])
  const [peligrosas, setPeligrosas] = useState([])
  const [elapsed, setElapsed] = useState(0)
  const [best] = useState(() => Number(localStorage.getItem(LS_BEST) || 0))

  const savedRef = useRef(false)
  const mazoRef = useRef([])
  const relojRef = useRef(RELOJ_INICIAL_MS)
  const escudoRef = useRef(false)
  const multiplicadorRef = useRef(1)
  const pendingUltimoIdRef = useRef(null)

  useEffect(() => {
    if (pantalla !== 'jugando') return
    const idElapsed = setInterval(() => setElapsed(e => e + 1), 1000)
    const idReloj = setInterval(() => {
      relojRef.current = Math.max(0, relojRef.current - TICK_MS)
      setRelojMs(relojRef.current)
      if (relojRef.current <= 0) setPantalla('final')
    }, TICK_MS)
    return () => { clearInterval(idElapsed); clearInterval(idReloj) }
  }, [pantalla])

  function sacarSiguienteCaso(evitarId) {
    if (mazoRef.current.length === 0) mazoRef.current = barajarMazo(CASOS, evitarId)
    return mazoRef.current.shift()
  }

  function empezar() {
    savedRef.current = false
    mazoRef.current = barajarMazo(CASOS)
    relojRef.current = RELOJ_INICIAL_MS
    escudoRef.current = false
    multiplicadorRef.current = 1
    setResueltos(0); setAciertos(0); setRacha(0); setMejorRacha(0); setScore(0)
    setEscudoActivo(false); setLeves([]); setPeligrosas([]); setElapsed(0)
    setRelojMs(RELOJ_INICIAL_MS)
    setCaso(mazoRef.current.shift())
    setPantalla('jugando')
  }

  function onResuelto(opcion) {
    const ultimoId = caso.id
    let nuevaRacha = racha
    let nuevoAciertos = aciertos

    if (opcion.esCorrecta) {
      nuevaRacha = racha + 1
      nuevoAciertos = aciertos + 1
      setAciertos(nuevoAciertos)
      setScore(s => s + puntosPorCaso(nuevaRacha, multiplicadorRef.current))
      relojRef.current += ACIERTO_MS
    } else {
      nuevaRacha = 0
      let penal = FALLO_MS
      if (escudoRef.current) { escudoRef.current = false; setEscudoActivo(false); penal = 0 }
      relojRef.current -= penal
      const entrada = { situacion: caso.situacion, texto: opcion.texto, explicacion: opcion.explicacion }
      if (opcion.esPeligrosa) setPeligrosas(p => [...p, entrada])
      else setLeves(l => [...l, entrada])
    }

    setRacha(nuevaRacha)
    setMejorRacha(m => Math.max(m, nuevaRacha))
    setRelojMs(Math.max(0, relojRef.current))
    setResueltos(r => r + 1)

    if (relojRef.current <= 0) { setPantalla('final'); return }

    if (opcion.esCorrecta && nuevoAciertos % MEJORA_CADA === 0) {
      pendingUltimoIdRef.current = ultimoId
      setPantalla('mejora')
      return
    }
    setCaso(sacarSiguienteCaso(ultimoId))
  }

  function onMejoraElegida(mejora) {
    if (mejora.id === 'tiempo') {
      relojRef.current += 15000
      setRelojMs(relojRef.current)
    } else if (mejora.id === 'escudo') {
      escudoRef.current = true
      setEscudoActivo(true)
    } else if (mejora.id === 'multiplicador') {
      multiplicadorRef.current *= 1.3
    }
    setCaso(sacarSiguienteCaso(pendingUltimoIdRef.current))
    setPantalla('jugando')
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
        title={tr({ es: 'Se acabó el tiempo — fin de la partida', en: 'Time\'s up — run over', ca: 'S\'ha acabat el temps — fi de la partida' })}
        score={score}
        message={peligrosas.length > 0
          ? tr({ es: 'Revisa las decisiones peligrosas antes de la próxima', en: 'Review the dangerous decisions before your next run', ca: 'Revisa les decisions perilloses abans de la propera' })
          : null}
        stats={[
          { label: tr({ es: 'Casos resueltos', en: 'Cases resolved', ca: 'Casos resolts' }), value: resueltos, emoji: '📋' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: mejorRacha, emoji: '🔥' },
          { label: tr({ es: 'Decisiones peligrosas', en: 'Dangerous decisions', ca: 'Decisions perilloses' }), value: peligrosas.length, emoji: '🔴' },
          { label: tr({ es: 'Tiempo jugado', en: 'Time played', ca: 'Temps jugat' }), value: formatTiempo(elapsed), emoji: '⏱️' },
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
        title={tr({ es: 'Reacción — arcade roguelike de primeros auxilios', en: 'Reacción — first-aid roguelike arcade', ca: 'Reacció — arcade roguelike de primers auxilis' })}
        description={tr({
          es: 'Un reloj contrarreloj y casos de emergencia sin repetir: atragantamientos, accidentes de moto, hipoglucemias, cuándo ir a urgencias y más. Educativo, no sustituye una formación oficial.',
          en: 'A ticking clock and non-repeating emergency cases: choking, motorcycle accidents, low blood sugar, when to go to the ER and more. Educational, not a substitute for official training.',
          ca: 'Un rellotge contrarellotge i casos d\'emergència sense repetir: ennuegaments, accidents de moto, hipoglucèmies, quan anar a urgències i més. Educatiu, no substitueix una formació oficial.',
        })}
        path="/juegos/reaccion" lang={lang} />

      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <button onClick={() => navigate(localPath('/juegos'))}
          className="text-white/30 hover:text-white/60 text-sm flex items-center gap-1 transition-colors">
          {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
        </button>
        {pantalla === 'jugando' && (
          <div className="flex items-center gap-3 text-sm font-mono">
            {escudoActivo && <span>🛡️</span>}
            <span className={relojMs < 10000 ? 'text-red-400 font-bold' : 'text-white/70'}>⏱️ {formatReloj(relojMs)}</span>
            <span className="text-white/30">💰 {score}</span>
          </div>
        )}
      </div>

      {pantalla === 'intro' && (
        <ReaccionSituacionInicial onEmpezar={empezar} mejorPuntuacion={best} />
      )}

      {pantalla === 'jugando' && caso && (
        <ReaccionCaso key={`${resueltos}-${caso.id}`} caso={caso} onResuelto={onResuelto} />
      )}

      {pantalla === 'mejora' && (
        <ReaccionMejora onElegir={onMejoraElegida} />
      )}
    </div>
  )
}
