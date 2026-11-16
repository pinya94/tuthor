// «Practica este tema» arriba de cada página de estudio.
//
// Analytics (nov-2026): quien entra por una página de estudio lee 40 s - 1 min
// y se va, mientras que quien entra por un juego se queda 5-12 minutos. Los
// juegos y exámenes de cada tema estaban al final, debajo de todo el texto,
// y casi nadie llegaba. Esta tarjeta los adelanta sin tocar cada página: tras
// montarse busca el primer enlace a un juego o examen que la propia página
// pone DESPUÉS del contenido (marcado con data-fin-contenido-tema) y lo
// ofrece aquí, con un «ver todas las opciones» que baja hasta ellas.
// Si la página no ofrece ninguno, no se pinta nada.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'

const ES_PRACTICA = /\/(juegos|examen)\//

function buscarPractica() {
  const fin = document.querySelector('[data-fin-contenido-tema]')
  if (!fin) return null
  const despues = [...document.querySelectorAll('a[href]')].filter(x =>
    (fin.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING) && ES_PRACTICA.test(x.getAttribute('href')))
  // Un juego antes que un examen: es lo que hace quedarse (Analytics)
  const a = despues.find(x => /\/juegos\//.test(x.getAttribute('href'))) ?? despues[0]
  if (!a) return null
  const titulo = (a.querySelector('h2, h3')?.textContent || a.textContent || '').replace(/\s+/g, ' ').replace(/→/g, '').trim()
  return { href: a.getAttribute('href'), titulo: titulo.slice(0, 80), juego: /\/juegos\//.test(a.getAttribute('href')) }
}

export default function PracticaArriba() {
  const { tr } = useLang()
  const [p, setP] = useState(null)
  useEffect(() => {
    // Una vuelta de pintado para que la página haya puesto sus tarjetas
    const id = requestAnimationFrame(() => setP(buscarPractica()))
    return () => cancelAnimationFrame(id)
  }, [])
  if (!p) return null
  const bajar = () => document.querySelector('[data-fin-contenido-tema]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <div className="max-w-2xl mx-auto w-full mb-5 rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="min-w-0 flex-1">
        <p className="text-amber-200/80 text-[11px] font-bold uppercase tracking-widest">
          {p.juego ? tr({ es: 'Aprende este tema jugando', en: 'Learn this topic by playing', ca: 'Aprèn aquest tema jugant' }) : tr({ es: 'Ponte a prueba', en: 'Test yourself', ca: 'Posa’t a prova' })}
        </p>
        <p className="text-white font-bold leading-snug truncate">{p.titulo}</p>
      </div>
      <Link to={p.href} onClick={() => trackEvent('cta_practica_arriba', { item_id: p.href })}
        className="shrink-0 rounded-xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black px-4 py-2 text-sm">
        {p.juego ? tr({ es: '▶ Jugar', en: '▶ Play', ca: '▶ Jugar' }) : tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
      </Link>
      <button type="button" onClick={bajar} className="basis-full text-left text-amber-200/70 hover:text-amber-100 text-xs font-semibold">
        {tr({ es: 'Ver todos los juegos y exámenes del tema ↓', en: 'See all the games and quizzes for this topic ↓', ca: 'Veure tots els jocs i exàmens del tema ↓' })}
      </button>
    </div>
  )
}
