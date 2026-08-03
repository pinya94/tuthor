import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { EXAMENES_HISTORIA } from '../data/historiaEvents'

// Traduce la URL (tema + formato) al location.state que ya esperan las
// páginas de examen existentes, sin tocarlas — así una tarea asignada
// puede enlazar a un periodo concreto con una URL estable (sobrevive a
// recargar), en vez de depender de navegar desde HistoriaTema.jsx con state.
export default function ExamenHistoriaTema() {
  const { tema, formato } = useParams()
  const navigate = useNavigate()
  const { localPath } = useLang()

  useEffect(() => {
    const backPath = '/profesor'
    if (formato === 'quien-es-quien') {
      navigate(localPath('/juegos/quien-es-quien'), { replace: true, state: { pool: tema, backPath } })
    } else if (formato === 'juego-fechas') {
      const examen = EXAMENES_HISTORIA.find(ex => ex.id === tema) || EXAMENES_HISTORIA[0]
      navigate(localPath('/examen/historia'), { replace: true, state: { examen, backPath } })
    } else {
      navigate(localPath('/examen/linea-temporal'), { replace: true, state: { categoria: tema, backPath } })
    }
  }, [tema, formato])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <p className="text-white/30 text-sm">Cargando…</p>
    </div>
  )
}
