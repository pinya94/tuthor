import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

// Traduce la URL (tema + formato) al location.state que ya esperan
// ExamenLineaTemporal.jsx / QuienEsQuien.jsx, sin tocar esas páginas — así
// una tarea asignada puede enlazar a un periodo concreto con una URL
// estable (sobrevive a recargar), en vez de depender de navegar desde
// HistoriaTema.jsx con state.
export default function ExamenHistoriaTema() {
  const { tema, formato } = useParams()
  const navigate = useNavigate()
  const { localPath } = useLang()

  useEffect(() => {
    if (formato === 'quien-es-quien') {
      navigate(localPath('/juegos/quien-es-quien'), { replace: true, state: { pool: tema, backPath: '/profesor' } })
    } else {
      navigate(localPath('/examen/linea-temporal'), { replace: true, state: { categoria: tema, backPath: '/profesor' } })
    }
  }, [tema, formato])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <p className="text-white/30 text-sm">Cargando…</p>
    </div>
  )
}
