// ── Primeros Auxilios: escenario individual (Estudiar > Vida Práctica) ──────
// Práctica en profundidad de un único tema: situación → ordena los pasos →
// decisiones críticas con explicación → resumen. Sin reloj de partida ni
// puntuación — es una herramienta de estudio, no un juego. Para practicar
// rápido con más variedad de casos, ver el juego Reacción (/juegos/reaccion);
// para un test tipo examen, ver /examen/primeros-auxilios.
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import EscenarioSituacion from '../components/EscenarioSituacion'
import EscenarioOrdenar from '../components/EscenarioOrdenar'
import EscenarioDecision from '../components/EscenarioDecision'
import EscenarioResumen from '../components/EscenarioResumen'
import { SCENARIOS } from '../data/primerosAuxiliosEscenarios'

function formatTiempo(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

const RESULTADO_INICIAL = () => ({ ordenErrores: [], decisionesLeves: [], decisionesPeligrosas: [] })

export default function PrimerosAuxiliosEscenario() {
  const navigate = useNavigate()
  const { tema } = useParams()
  const { lang, tr, localPath } = useLang()

  const escenario = SCENARIOS.find(s => s.id === tema)

  const [pantalla, setPantalla] = useState('intro') // intro | orden | decision | resumen
  const [decisionIndex, setDecisionIndex] = useState(0)
  const [resultado, setResultado] = useState(RESULTADO_INICIAL)
  const [elapsed, setElapsed] = useState(0)

  const pasosOrden = escenario ? escenario.pasos.filter(p => p.tipo === 'orden') : []
  const decisiones = escenario
    ? escenario.pasos.filter(p => p.tipo === 'decision').sort((a, b) => a.posicionEnSecuencia - b.posicionEnSecuencia)
    : []

  useEffect(() => {
    if (pantalla === 'intro') return
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [pantalla])

  function empezar() {
    setDecisionIndex(0)
    setResultado(RESULTADO_INICIAL())
    setElapsed(0)
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
    setResultado(r => ({ ...r, ordenErrores }))
    setPantalla(decisiones.length > 0 ? 'decision' : 'resumen')
  }

  function onElegirDecision(opcion) {
    if (!opcion.esCorrecta) {
      const entrada = { texto: opcion.texto, explicacion: opcion.explicacion }
      setResultado(r =>
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

  if (!escenario) {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 text-center">
        <p className="text-white/60 mb-4">
          {tr({ es: 'No se ha encontrado ese tema.', en: 'That topic wasn\'t found.', ca: 'No s\'ha trobat aquest tema.' })}
        </p>
        <button onClick={() => navigate(localPath('/estudiar/vida-practica'))}
          className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
          {tr({ es: '← Volver a Primeros Auxilios', en: '← Back to First Aid', ca: '← Tornar a Primers Auxilis' })}
        </button>
      </div>
    )
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <SEOHead
        title={tr({ es: `${tr(escenario.titulo)} — Primeros Auxilios`, en: `${tr(escenario.titulo)} — First Aid`, ca: `${tr(escenario.titulo)} — Primers Auxilis` })}
        description={tr({
          es: 'Practica el protocolo de primeros auxilios paso a paso: ordena las acciones y toma las decisiones correctas ante la emergencia.',
          en: 'Practice the first-aid protocol step by step: order the actions and make the right calls in the emergency.',
          ca: 'Practica el protocol de primers auxilis pas a pas: ordena les accions i pren les decisions correctes davant l\'emergència.',
        })}
        path={`/estudiar/vida-practica/${escenario.id}`} lang={lang} />

      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <button onClick={() => navigate(localPath('/estudiar/vida-practica'))}
          className="text-white/30 hover:text-white/60 text-sm flex items-center gap-1 transition-colors">
          {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
        </button>
        {pantalla !== 'intro' && (
          <span className="text-white/30 text-sm font-mono">⏱️ {formatTiempo(elapsed)}</span>
        )}
      </div>

      {pantalla === 'intro' && (
        <EscenarioSituacion escenario={escenario} onEmpezar={empezar} />
      )}

      {pantalla === 'orden' && (
        <EscenarioOrdenar pasos={pasosOrden} onConfirm={onConfirmarOrden} />
      )}

      {pantalla === 'decision' && (
        <EscenarioDecision key={decisiones[decisionIndex].id} decision={decisiones[decisionIndex]} onElegir={onElegirDecision} />
      )}

      {pantalla === 'resumen' && (
        <EscenarioResumen
          ordenErrores={resultado.ordenErrores}
          decisionesLeves={resultado.decisionesLeves}
          decisionesPeligrosas={resultado.decisionesPeligrosas}
          onRepetir={empezar}
          onVolver={() => navigate(localPath('/estudiar/vida-practica'))}
        />
      )}
    </div>
  )
}
