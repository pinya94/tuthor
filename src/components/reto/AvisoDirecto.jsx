// «¿Lo usas con tu clase? Juégalo en directo»: solo para visitas que llegan
// desde el aula virtual de un colegio (lib/origenAula.js), al pie de cada juego
// y examen. Lleva a /profesores con este juego ya elegido: allí el profe con
// acceso salta a crear el reto y el que no lo tiene ve cómo funciona y pide entrar.
import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { vieneDeAula } from '../../lib/origenAula'
import { trackEvent } from '../../lib/analytics'

const nada = () => () => {}

export default function AvisoDirecto({ examen, className = '' }) {
  const { tr, localPath } = useLang()
  // En el prerender no hay referrer: el aviso solo existe en el navegador
  const aula = useSyncExternalStore(nada, vieneDeAula, () => false)
  if (!aula) return null

  const destino = `${localPath('/profesores')}${examen ? `?examen=${encodeURIComponent(examen)}` : ''}#retos`
  return (
    <Link to={destino} onClick={() => trackEvent('aula_directo_click', { item_id: examen ?? '' })}
      className={`${className} flex items-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] hover:bg-amber-400/[0.12] px-4 py-3 text-left transition-colors`}>
      <span className="text-2xl" aria-hidden="true">📺</span>
      <span className="min-w-0">
        <span className="block text-white font-black text-sm">
          {tr({ es: '¿Eres profe? Juégalo en directo con tu clase', en: 'Teacher? Play it live with your class', ca: 'Ets profe? Juga-hi en directe amb la classe' })}
        </span>
        <span className="block text-white/55 text-xs leading-snug">
          {tr({
            es: 'Lo proyectas en la pizarra y cada alumno responde desde su móvil, sin cuentas. Al final, el ranking y la nota de cada uno.',
            en: 'Project it on the board and everyone answers on their phone, no accounts needed. At the end, the ranking and everyone’s mark.',
            ca: 'El projectes a la pissarra i cada alumne respon des del mòbil, sense comptes. Al final, el rànquing i la nota de cadascú.',
          })}
        </span>
      </span>
      <span className="ml-auto text-amber-200 font-black" aria-hidden="true">→</span>
    </Link>
  )
}
