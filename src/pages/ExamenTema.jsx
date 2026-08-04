import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { EXAMENES_HISTORIA } from '../data/historiaEvents'

// Página puente del patrón tema → formato (ver src/lib/examTopics.js):
// /examen/<materia>/<tema>/<formato> traduce la URL al location.state que ya
// esperan las páginas existentes, sin tocarlas — así una tarea asignada puede
// enlazar a un tema+formato concreto con una URL estable (sobrevive a
// recargar). Materia nueva con temas = un caso más en este switch + su
// <Route> en App.jsx.
export default function ExamenTema({ materia }) {
  const { tema, formato } = useParams()
  const navigate = useNavigate()
  const { localPath } = useLang()

  useEffect(() => {
    // /clase redirige solo: alumnos a sus tareas, profesores a /profesor.
    const backPath = '/clase'

    if (materia === 'matematicas') {
      // MatematicasPractica en modo examen guarda category `${modo}-${nivel}`
      // — exactamente lo que topicTask('matematicas', tema, formato) espera.
      navigate(localPath(`/estudiar/matematicas/${tema}/jugar`), {
        replace: true,
        state: { nivel: formato, modoExamen: true, backPath },
      })
      return
    }

    // historia
    if (formato === 'quien-es-quien') {
      navigate(localPath('/juegos/quien-es-quien'), { replace: true, state: { pool: tema, backPath } })
    } else if (formato === 'juego-fechas') {
      const examen = EXAMENES_HISTORIA.find(ex => ex.id === tema) || EXAMENES_HISTORIA[0]
      navigate(localPath('/examen/historia'), { replace: true, state: { examen, backPath } })
    } else {
      navigate(localPath('/examen/linea-temporal'), { replace: true, state: { categoria: tema, backPath } })
    }
  }, [materia, tema, formato])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <p className="text-white/30 text-sm">Cargando…</p>
    </div>
  )
}
