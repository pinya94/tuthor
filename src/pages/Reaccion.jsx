// ── Reacción (primeros auxilios) ────────────────────────────────────────────
// Cada escenario: fase de orden (arrastra TODOS los pasos 'orden' del
// escenario a su sitio) seguida de fase de decisión (las 'decision' del
// escenario, una a una, en su posiciónEnSecuencia). Al terminar el escenario
// se muestra su resumen (fallos leves vs decisiones peligrosas) antes de
// pasar al siguiente escenario o, si era el último, a la pantalla final
// estándar de Tuthor con monedas y ranking.
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import ReaccionSituacionInicial from '../components/ReaccionSituacionInicial'
import ReaccionPasosDragDrop from '../components/ReaccionPasosDragDrop'
import ReaccionDecisionCritica from '../components/ReaccionDecisionCritica'
import ReaccionResumenEscenario from '../components/ReaccionResumenEscenario'
import { SCENARIOS } from '../data/reaccionScenarios'

function formatTiempo(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

const RESULTADO_INICIAL = () => ({ ordenErrores: [], decisionesLeves: [], decisionesPeligrosas: [] })

// Orden de los escenarios para una partida: aleatorio, sin repetir ninguno.
function ordenAleatorioEscenarios() {
  return SCENARIOS.map((_, i) => i).sort(() => Math.random() - 0.5)
}

export default function Reaccion() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [pantalla, setPantalla] = useState('intro') // intro | orden | decision | resumen | final
  const [ordenEscenarios, setOrdenEscenarios] = useState(ordenAleatorioEscenarios)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [decisionIndex, setDecisionIndex] = useState(0)
  const [resultadoEscenario, setResultadoEscenario] = useState(RESULTADO_INICIAL)
  const [totales, setTotales] = useState(RESULTADO_INICIAL)
  const [elapsed, setElapsed] = useState(0)

  const savedRef = useRef(false)
  const escenario = SCENARIOS[ordenEscenarios[scenarioIndex]]
  const pasosOrden = escenario.pasos.filter(p => p.tipo === 'orden')
  const decisiones = escenario.pasos.filter(p => p.tipo === 'decision').sort((a, b) => a.posicionEnSecuencia - b.posicionEnSecuencia)

  // Timer suave: corre durante todo el escenario, no bloquea ni penaliza por sí solo.
  useEffect(() => {
    if (pantalla === 'intro' || pantalla === 'final') return
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [pantalla])

  function empezarEscenario() {
    setDecisionIndex(0)
    setResultadoEscenario(RESULTADO_INICIAL())
    setPantalla('orden')
  }

  function onConfirmarOrden(orderedIds) {
    const objetivo = [...pasosOrden].sort((a, b) => a.posicionCorrecta - b.posicionCorrecta)
    const ordenErrores = []
    orderedIds.forEach((id, i) => {
      if (id === objetivo[i].id) return
      const paso = pasosOrden.find(p => p.id === id)
      ordenErrores.push({ texto: paso.texto, posicionCorrecta: paso.posicionCorrecta })
    })
    setResultadoEscenario(r => ({ ...r, ordenErrores }))
    if (decisiones.length > 0) {
      setPantalla('decision')
    } else {
      setPantalla('resumen')
    }
  }

  function onElegirDecision(opcion) {
    if (!opcion.esCorrecta) {
      const entrada = { texto: opcion.texto, explicacion: opcion.explicacion }
      setResultadoEscenario(r =>
        opcion.esPeligrosa
          ? { ...r, decisionesPeligrosas: [...r.decisionesPeligrosas, entrada] }
          : { ...r, decisionesLeves: [...r.decisionesLeves, entrada] }
      )
    }
    if (decisionIndex + 1 < decisiones.length) {
      setDecisionIndex(i => i + 1)
    } else {
      setPantalla('resumen')
    }
  }

  function onContinuarResumen() {
    setTotales(t => ({
      ordenErrores: [...t.ordenErrores, ...resultadoEscenario.ordenErrores],
      decisionesLeves: [...t.decisionesLeves, ...resultadoEscenario.decisionesLeves],
      decisionesPeligrosas: [...t.decisionesPeligrosas, ...resultadoEscenario.decisionesPeligrosas],
    }))
    if (scenarioIndex + 1 < SCENARIOS.length) {
      setScenarioIndex(i => i + 1)
      setPantalla('intro')
    } else {
      setPantalla('final')
    }
  }

  function jugarDeNuevo() {
    savedRef.current = false
    setOrdenEscenarios(ordenAleatorioEscenarios())
    setScenarioIndex(0)
    setDecisionIndex(0)
    setResultadoEscenario(RESULTADO_INICIAL())
    setTotales(RESULTADO_INICIAL())
    setElapsed(0)
    setPantalla('intro')
  }

  const totalPasos = SCENARIOS.reduce((n, e) => n + e.pasos.length, 0)
  const fallos = totales.ordenErrores.length + totales.decisionesLeves.length + totales.decisionesPeligrosas.length
  const score = Math.max(0, (totalPasos - fallos) * 10)

  useEffect(() => {
    if (pantalla !== 'final' || !user || savedRef.current) return
    savedRef.current = true
    const coinsEarned = computeCoins('reaccion', {
      ordenErrores: totales.ordenErrores.length,
      decisionesPeligrosas: totales.decisionesPeligrosas.length,
    })
    saveActivity(user.uid, {
      type: 'juego', game: 'reaccion', score, coinsEarned,
      passed: totales.decisionesPeligrosas.length === 0,
      timeSpent: elapsed,
      userName: user.displayName || 'Jugador', userPhoto: user.photoURL || null,
    }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pantalla])

  if (pantalla === 'final') {
    return (
      <GameEndScreen
        game="reaccion"
        result={{ ordenErrores: totales.ordenErrores.length, decisionesPeligrosas: totales.decisionesPeligrosas.length }}
        emoji="🚑"
        title={tr({ es: 'Simulacro completado', en: 'Drill completed', ca: 'Simulacre completat' })}
        score={score}
        message={totales.decisionesPeligrosas.length > 0
          ? tr({ es: 'Revisa las decisiones peligrosas antes de la próxima', en: 'Review the dangerous decisions before your next run', ca: 'Revisa les decisions perilloses abans de la propera' })
          : null}
        stats={[
          { label: tr({ es: 'Fallos leves', en: 'Minor mistakes', ca: 'Errades lleus' }), value: totales.ordenErrores.length + totales.decisionesLeves.length, emoji: '🟠' },
          { label: tr({ es: 'Decisiones peligrosas', en: 'Dangerous decisions', ca: 'Decisions perilloses' }), value: totales.decisionesPeligrosas.length, emoji: '🔴' },
          { label: tr({ es: 'Tiempo', en: 'Time', ca: 'Temps' }), value: formatTiempo(elapsed), emoji: '⏱️' },
        ]}
        shareText={tr({
          es: `He completado un simulacro de primeros auxilios en Reacción con ${score} puntos 🚑 https://tuthor.es/juegos/reaccion`,
          en: `I completed a first-aid drill in Reacción with ${score} points 🚑 https://tuthor.es/juegos/reaccion`,
          ca: `He completat un simulacre de primers auxilis a Reacció amb ${score} punts 🚑 https://tuthor.es/juegos/reaccion`,
        })}
        onPlayAgain={jugarDeNuevo}
        playAgainLabel={tr({ es: '▶ Otro simulacro', en: '▶ Another drill', ca: '▶ Un altre simulacre' })}
        secondaryActions={[{ label: tr({ es: '← Todos los juegos', en: '← All games', ca: '← Tots els jocs' }), onClick: () => navigate(localPath('/juegos')) }]}
        user={user} lang={lang}
      />
    )
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <SEOHead
        title={tr({ es: 'Reacción — primeros auxilios básicos', en: 'Reacción — basic first aid', ca: 'Reacció — primers auxilis bàsics' })}
        description={tr({
          es: 'Ordena los pasos y toma las decisiones correctas ante una emergencia: atragantamiento y más escenarios de primeros auxilios básicos.',
          en: 'Order the steps and make the right calls in an emergency: choking and more basic first-aid scenarios.',
          ca: 'Ordena els passos i pren les decisions correctes davant una emergència: ennuegament i més escenaris de primers auxilis bàsics.',
        })}
        path="/juegos/reaccion" lang={lang} />

      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <button onClick={() => navigate(localPath('/juegos'))}
          className="text-white/30 hover:text-white/60 text-sm flex items-center gap-1 transition-colors">
          {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
        </button>
        {pantalla !== 'intro' && (
          <span className="text-white/30 text-sm font-mono">⏱️ {formatTiempo(elapsed)}</span>
        )}
      </div>

      {pantalla === 'intro' && (
        <ReaccionSituacionInicial escenario={escenario} onEmpezar={empezarEscenario} />
      )}

      {pantalla === 'orden' && (
        <ReaccionPasosDragDrop pasos={pasosOrden} onConfirm={onConfirmarOrden} />
      )}

      {pantalla === 'decision' && (
        <ReaccionDecisionCritica key={decisiones[decisionIndex].id} decision={decisiones[decisionIndex]} onElegir={onElegirDecision} />
      )}

      {pantalla === 'resumen' && (
        <ReaccionResumenEscenario
          ordenErrores={resultadoEscenario.ordenErrores}
          decisionesLeves={resultadoEscenario.decisionesLeves}
          decisionesPeligrosas={resultadoEscenario.decisionesPeligrosas}
          onContinuar={onContinuarResumen}
        />
      )}
    </div>
  )
}
