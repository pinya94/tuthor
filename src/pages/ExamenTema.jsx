import { useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { EXAMENES_HISTORIA } from '../data/historiaEvents'
import { MODOS } from '../lib/mathEngine'
import { examRoute } from '../lib/exams'
import { SUBJECTS } from '../lib/statsAggregation'
import { defaultLevel, formatLevels, topicTask, resolveFormat } from '../lib/topicCatalog'

// Página puente del modelo uniforme materia → tema → formato → nivel
// (ver src/lib/topicCatalog.js). La URL /examen/<materia>/<tema>/<formato>?nivel=
// es estable (sobrevive a recargar y se puede asignar como tarea); aquí se
// traduce al location.state que ya espera cada página de destino, sin tocarlas.
//
// Materia nueva con temas = un caso más en este switch + su <Route> en App.jsx.
export default function ExamenTema({ materia }) {
  const { tema, formato } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { lang, localPath } = useLang()

  useEffect(() => {
    // /clase redirige solo: alumnos a sus tareas, profesores a /profesor.
    const backPath = '/clase'
    // El nivel pedido solo vale si el formato lo admite para ese tema.
    const pedido = params.get('nivel')
    const disponibles = formatLevels(materia, tema, formato)
    const nivel = disponibles.includes(pedido) ? pedido : defaultLevel(materia, tema, formato)
    const go = (path, state) => navigate(localPath(path), { replace: true, state: { backPath, ...state } })

    // Materias basadas en exámenes (lengua, geografía, ciencias): cada
    // combinación tema+formato ES un examen del registro, con su propia ruta.
    // No hace falta ningún caso específico por materia: los exámenes
    // compartidos entre temas reciben cuál les toca por location.state.
    const fmt = resolveFormat(materia, tema, formato)
    const task = fmt && topicTask(materia, tema, formato)
    const ruta = task && examRoute(task.gameId)
    if (ruta) {
      const subj = SUBJECTS.find(s => s.id === materia)
      const lbl = subj?.examLabels[tema]
      return go(ruta, fmt.stateKey
        ? { [fmt.stateKey]: tema, titulo: lbl?.[lang] || lbl?.es || tema }
        : undefined)
    }

    if (materia === 'matematicas') {
      if (formato === 'examen-practica') return go(`/estudiar/matematicas/${tema}/examen`, { nivel })
      if (formato === 'numpath') return go('/juegos/numpath', { modoExamen: true, ops: MODOS[tema]?.ops, nivel })
      // acercate: MatematicasPractica en modo examen (guarda `${tema}-${nivel}`)
      return go(`/estudiar/matematicas/${tema}/jugar`, { nivel, modoExamen: true })
    }

    // historia
    if (formato === 'quien-es-quien') return go('/juegos/quien-es-quien', { pool: tema })
    if (formato === 'portadas') return go('/examen/portadas', { categoria: tema })
    if (formato === 'juego-fechas') {
      const examen = EXAMENES_HISTORIA.find(ex => ex.id === tema) || EXAMENES_HISTORIA[0]
      return go('/examen/historia', { examen, nivel })
    }
    return go('/examen/linea-temporal', { categoria: tema, nivel })
  }, [materia, tema, formato])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <p className="text-white/30 text-sm">Cargando…</p>
    </div>
  )
}
