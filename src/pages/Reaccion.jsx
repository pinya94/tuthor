// ── Reacción (arcade roguelike de primeros auxilios) ────────────────────────
// Un único reloj para toda la partida en vez de vidas: empieza bajo, cada
// acierto suma tiempo y cada fallo resta más — el reloj corre siempre de
// fondo, así que decidir despacio también cuesta tiempo. Cada 5 aciertos se
// elige 1 de 3 mejoras (mismo patrón que el modo roguelike de Acércate).
//
// Los "escenarios" salen de un mazo barajado sin repetición dentro de la
// partida. Un escenario puede tener varias fases encadenadas (p. ej.
// atragantamiento: confirmar → golpes → Heimlich → RCP si pierde el
// conocimiento): al resolver una fase se avanza automáticamente a la
// siguiente fase del MISMO escenario, no se vuelve al mazo. Algunas
// opciones llevan `saltaEscenario: true` — representan un error de
// seguridad de la propia escena (acercarte sin comprobar el peligro) y
// cortan el escenario ahí mismo, aunque la partida sigue con el siguiente.
//
// El contenido "profundo" del protocolo (ordenar pasos, explicaciones largas)
// vive aparte en Estudiar > Vida Práctica — ver src/pages/PrimerosAuxiliosEscenario.jsx.
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
import { ESCENARIOS } from '../data/reaccionEscenarios'
import { CASOS } from '../data/reaccionCasos'
import { RELOJ_INICIAL_MS, ACIERTO_MS, FALLO_MS, MEJORA_CADA, barajarMazo, puntosPorCaso } from '../lib/reaccionArcade'

const LS_BEST = 'reaccion-best'
const TICK_MS = 100

// Los casos sueltos son, a efectos del mazo, escenarios de una sola fase —
// dan variedad de ritmo entre los escenarios encadenados más largos.
const CASOS_DE_UNA_FASE = CASOS.map(c => ({
  id: c.id,
  ambiguo: c.ambiguo,
  pasos: [{ situacion: c.situacion, opciones: c.opciones }],
}))
const TODOS_LOS_ESCENARIOS = [...ESCENARIOS, ...CASOS_DE_UNA_FASE]

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
  const [escenarioActual, setEscenarioActual] = useState(null)
  const [pasoIndex, setPasoIndex] = useState(0)
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
  const [motivoFin, setMotivoFin] = useState('tiempo') // 'tiempo' | 'completado'
  const [best] = useState(() => Number(localStorage.getItem(LS_BEST) || 0))

  const savedRef = useRef(false)
  const mazoRef = useRef([])
  const relojRef = useRef(RELOJ_INICIAL_MS)
  const relojMaxRef = useRef(RELOJ_INICIAL_MS) // techo de la barra: sube con el reloj, nunca baja
  const escudoRef = useRef(false)
  const multiplicadorRef = useRef(1)
  const pendingAvanceRef = useRef(null) // qué toca tras elegir una mejora: siguiente fase o siguiente escenario

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

  // Saca el siguiente escenario del mazo, o null si ya se han resuelto
  // todos — en ese caso la partida termina, no tiene sentido repreguntar.
  function sacarSiguienteEscenario() {
    return mazoRef.current.length > 0 ? mazoRef.current.shift() : null
  }

  function empezar() {
    savedRef.current = false
    mazoRef.current = barajarMazo(TODOS_LOS_ESCENARIOS)
    relojRef.current = RELOJ_INICIAL_MS
    relojMaxRef.current = RELOJ_INICIAL_MS
    escudoRef.current = false
    multiplicadorRef.current = 1
    setResueltos(0); setAciertos(0); setRacha(0); setMejorRacha(0); setScore(0)
    setEscudoActivo(false); setLeves([]); setPeligrosas([]); setElapsed(0)
    setMotivoFin('tiempo')
    setRelojMs(RELOJ_INICIAL_MS)
    setEscenarioActual(mazoRef.current.shift())
    setPasoIndex(0)
    setPantalla('jugando')
  }

  function onResuelto(opcion) {
    let nuevaRacha = racha
    let nuevoAciertos = aciertos
    const pasoActual = escenarioActual.pasos[pasoIndex]

    if (opcion.esCorrecta) {
      nuevaRacha = racha + 1
      nuevoAciertos = aciertos + 1
      setAciertos(nuevoAciertos)
      setScore(s => s + puntosPorCaso(nuevaRacha, multiplicadorRef.current))
      relojRef.current += ACIERTO_MS
      relojMaxRef.current = Math.max(relojMaxRef.current, relojRef.current)
    } else {
      nuevaRacha = 0
      let penal = FALLO_MS
      if (escudoRef.current) { escudoRef.current = false; setEscudoActivo(false); penal = 0 }
      relojRef.current -= penal
      const entrada = { situacion: pasoActual.situacion, texto: opcion.texto, explicacion: opcion.explicacion }
      if (opcion.esPeligrosa) setPeligrosas(p => [...p, entrada])
      else setLeves(l => [...l, entrada])
    }

    setRacha(nuevaRacha)
    setMejorRacha(m => Math.max(m, nuevaRacha))
    setRelojMs(Math.max(0, relojRef.current))
    setResueltos(r => r + 1)

    if (relojRef.current <= 0) { setMotivoFin('tiempo'); setPantalla('final'); return }

    // Un salto de escenario (error de seguridad de la escena) corta la
    // cadena aquí mismo, aunque queden fases por delante.
    const haySiguienteFase = !opcion.saltaEscenario && pasoIndex + 1 < escenarioActual.pasos.length

    if (opcion.esCorrecta && nuevoAciertos % MEJORA_CADA === 0) {
      pendingAvanceRef.current = haySiguienteFase ? { tipo: 'fase', pasoIndex: pasoIndex + 1 } : { tipo: 'escenario' }
      setPantalla('mejora')
      return
    }

    if (haySiguienteFase) {
      setPasoIndex(pasoIndex + 1)
      return
    }

    const siguiente = sacarSiguienteEscenario()
    if (!siguiente) { setMotivoFin('completado'); setPantalla('final'); return }
    setEscenarioActual(siguiente)
    setPasoIndex(0)
  }

  function onMejoraElegida(mejora) {
    if (mejora.id === 'tiempo') {
      relojRef.current += 5000
      relojMaxRef.current = Math.max(relojMaxRef.current, relojRef.current)
      setRelojMs(relojRef.current)
    } else if (mejora.id === 'escudo') {
      escudoRef.current = true
      setEscudoActivo(true)
    } else if (mejora.id === 'multiplicador') {
      multiplicadorRef.current *= 1.3
    }

    const pending = pendingAvanceRef.current
    if (pending?.tipo === 'fase') {
      setPasoIndex(pending.pasoIndex)
      setPantalla('jugando')
      return
    }
    const siguiente = sacarSiguienteEscenario()
    if (!siguiente) { setMotivoFin('completado'); setPantalla('final'); return }
    setEscenarioActual(siguiente)
    setPasoIndex(0)
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
        emoji={motivoFin === 'completado' ? '🏆' : '🚑'}
        title={motivoFin === 'completado'
          ? tr({ es: '¡Has resuelto todos los escenarios!', en: 'You\'ve resolved every scenario!', ca: 'Has resolt tots els escenaris!' })
          : tr({ es: 'Se acabó el tiempo — fin de la partida', en: 'Time\'s up — run over', ca: 'S\'ha acabat el temps — fi de la partida' })}
        score={score}
        message={peligrosas.length > 0
          ? tr({ es: 'Revisa las decisiones peligrosas antes de la próxima', en: 'Review the dangerous decisions before your next run', ca: 'Revisa les decisions perilloses abans de la propera' })
          : motivoFin === 'completado'
          ? tr({ es: 'No quedan más escenarios por hoy — vuelve otro día para otra tanda', en: 'No more scenarios left for today — come back another day for a new batch', ca: 'No queden més escenaris per avui — torna un altre dia per a una altra tanda' })
          : null}
        stats={[
          { label: tr({ es: 'Fases resueltas', en: 'Steps resolved', ca: 'Fases resoltes' }), value: resueltos, emoji: '📋' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: mejorRacha, emoji: '🔥' },
          { label: tr({ es: 'Decisiones peligrosas', en: 'Dangerous decisions', ca: 'Decisions perilloses' }), value: peligrosas.length, emoji: '🔴' },
          { label: tr({ es: 'Tiempo jugado', en: 'Time played', ca: 'Temps jugat' }), value: formatTiempo(elapsed), emoji: '⏱️' },
        ]}
        shareText={tr({
          es: `He conseguido ${score} puntos en Reacción 🚑 (${resueltos} fases resueltas) — ¿puedes superarme? https://tuthor.es/juegos/reaccion`,
          en: `I scored ${score} points in Reacción 🚑 (${resueltos} steps resolved) — can you beat me? https://tuthor.es/juegos/reaccion`,
          ca: `He aconseguit ${score} punts a Reacció 🚑 (${resueltos} fases resoltes) — pots superar-me? https://tuthor.es/juegos/reaccion`,
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

  const relojPct = Math.max(0, Math.min(100, (relojMs / relojMaxRef.current) * 100))
  const pasoActual = escenarioActual?.pasos[pasoIndex]
  const enCadena = escenarioActual && escenarioActual.pasos.length > 1

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <SEOHead
        title={tr({ es: 'Reacción — arcade roguelike de primeros auxilios', en: 'Reacción — first-aid roguelike arcade', ca: 'Reacció — arcade roguelike de primers auxilis' })}
        description={tr({
          es: 'Un reloj contrarreloj y escenarios de emergencia encadenados: atragantamiento, accidente de moto, hipoglucemia y más. Educativo, no sustituye una formación oficial.',
          en: 'A ticking clock and chained emergency scenarios: choking, motorcycle accidents, low blood sugar and more. Educational, not a substitute for official training.',
          ca: 'Un rellotge contrarellotge i escenaris d\'emergència encadenats: ennuegament, accident de moto, hipoglucèmia i més. Educatiu, no substitueix una formació oficial.',
        })}
        path="/juegos/reaccion" lang={lang} />

      <div className="w-full max-w-md mb-4">
        <div className="flex items-center justify-between">
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
        {pantalla === 'jugando' && (
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full transition-all ${relojPct < 25 ? 'bg-red-500' : relojPct < 50 ? 'bg-orange-400' : 'bg-[#EDAE49]'}`}
              style={{ width: `${relojPct}%`, transitionDuration: `${TICK_MS}ms`, transitionTimingFunction: 'linear' }}
            />
          </div>
        )}
        {pantalla === 'jugando' && enCadena && (
          <p className="text-white/30 text-xs text-center mt-2">
            {tr(escenarioActual.titulo)} · {tr({ es: 'paso', en: 'step', ca: 'pas' })} {pasoIndex + 1}/{escenarioActual.pasos.length}
          </p>
        )}
      </div>

      {pantalla === 'intro' && (
        <ReaccionSituacionInicial onEmpezar={empezar} mejorPuntuacion={best} />
      )}

      {pantalla === 'jugando' && pasoActual && (
        <ReaccionCaso key={`${resueltos}-${escenarioActual.id}-${pasoIndex}`} caso={pasoActual} onResuelto={onResuelto} />
      )}

      {pantalla === 'mejora' && (
        <ReaccionMejora onElegir={onMejoraElegida} />
      )}
    </div>
  )
}
