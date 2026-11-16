// Al terminar una partida: UNA propuesta concreta para seguir jugando (otro
// juego de la misma materia, con su dibujo) y una razón para volver mañana
// («mañana toca…», el juego del día siguiente).
//
// Por qué: en Analytics (nov-2026) solo 1 de cada 4 visitantes termina una
// partida y casi nadie vuelve otro día. «Juegos similares» ya existía, pero
// plegado al pie. Aquí no se empuja a estudiar (preferencia del usuario: un
// juego no manda a estudiar) ni se habla de rachas (no se vende como app de
// marcador): se propone jugar a otra cosa y se avisa de lo de mañana.
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'
import { juegoDelDia, numeroDeDia } from '../lib/juegoDelDia'
import { ArteJuego, slugDeRuta } from './arte'
import { similares } from './PieJuego'

export default function SiguienteJuego({ className = 'mt-6' }) {
  const { tr, lang, localPath } = useLang()
  const { pathname } = useLocation()
  const slug = slugDeRuta(pathname.replace(/^\/(en|ca)(?=\/)/, ''))
  const otro = useMemo(() => {
    const lista = similares(slug, lang)
    // Cambia cada día para no proponer siempre el mismo
    return lista.length ? lista[numeroDeDia() % lista.length] : null
  }, [slug, lang])
  const manana = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    const j = juegoDelDia(lang, d)
    return j && j.slug !== slug ? j : null
  }, [lang, slug])
  if (!otro && !manana) return null
  const titulo = j => (lang === 'en' ? j.titleEn : lang === 'ca' ? j.titleCa : null) ?? j.title

  return (
    <div className={className}>
      {otro && (
        <Link to={localPath(otro.route)} onClick={() => trackEvent('siguiente_juego', { item_id: otro.slug, origen: slug })}
          className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#141b2e] hover:border-white/25 p-3 pr-4 transition-colors">
          <ArteJuego slug={otro.slug} className="shrink-0 w-28 aspect-video rounded-lg bg-white/[0.03]" />
          <div className="min-w-0 flex-1">
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{tr({ es: '¿Otra partida? Prueba', en: 'Another round? Try', ca: 'Una altra partida? Prova' })}</p>
            <p className="text-white font-black leading-snug">{otro.label}</p>
          </div>
          <span className="text-white/40 text-xl" aria-hidden="true">→</span>
        </Link>
      )}
      {manana && (
        <p className="text-center text-white/45 text-sm mt-3">
          {tr({ es: 'Mañana toca', en: 'Tomorrow’s game:', ca: 'Demà toca' })}{' '}
          <span className="text-white/80 font-bold">{manana.emoji} {titulo(manana)}</span>
          {tr({ es: '. ¡Vuelve mañana a jugarlo!', en: '. Come back tomorrow to play it!', ca: '. Torna demà a jugar-hi!' })}
        </p>
      )}
    </div>
  )
}
