// Pie de la pantalla de un juego (intro y final): dos botones plegados, con
// el mismo estilo discreto que «¿Cómo se juega?» y bien separados del juego,
// que es lo importante. «Juegos similares» abre los dibujos de otros juegos de
// la misma materia; «Compartir con tu clase», el enlace para Classroom, copiar
// o el QR. El bloque de estudio («Más para practicar») se queda en los
// exámenes: el usuario pidió que en un juego no empuje a estudiar.
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { GAMES, disponibleEn } from '../lib/games'
import { ARTE_JUEGOS, ArteJuego, slugDeRuta } from './arte'
import CompartirClase from './CompartirClase'
import { RETOS_EXAMENES } from '../data/retosExamenes'
import { examRoute } from '../lib/exams'

// Otros juegos de la misma materia (uno por ruta, con dibujo y en este idioma).
function similares(slug, lang) {
  const actual = Object.values(GAMES).find(g => slugDeRuta(g.route) === slug)
  if (!actual) return []
  const vistos = new Set([slug])
  const out = []
  for (const [id, g] of Object.entries(GAMES)) {
    const s = slugDeRuta(g.route)
    if (!s || vistos.has(s) || g.subject !== actual.subject || !ARTE_JUEGOS[s] || !disponibleEn(id, lang)) continue
    vistos.add(s)
    out.push({ slug: s, label: g.label[lang] ?? g.label.es, route: g.route })
  }
  return out
}

// El examen de este juego, si se puede jugar en directo con amigos (su
// portada abre «Juega con tus amigos» con ?amigos=1)
function rutaConAmigos(slug) {
  const id = Object.keys(GAMES).find(k => slugDeRuta(GAMES[k].route) === slug)
  const examen = id && RETOS_EXAMENES.find(e => e === `${id}-test`)
  return examen ? examRoute(examen) : null
}

function Plegable({ icono, titulo, abierto, onToggle, children }) {
  return (
    <>
      <button type="button" onClick={onToggle} aria-expanded={abierto}
        className="flex items-center gap-2 text-white/45 hover:text-white text-sm font-semibold py-2 transition-colors">
        <span aria-hidden="true">{icono}</span>{titulo}
        <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-transform ${abierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {abierto && children}
    </>
  )
}

export default function PieJuego({ slug: slugProp, className = 'mt-12' }) {
  const { tr, lang, localPath } = useLang()
  const { pathname } = useLocation()
  const slug = slugProp ?? slugDeRuta(pathname)
  const juegos = useMemo(() => similares(slug, lang), [slug, lang])
  const conAmigos = useMemo(() => rutaConAmigos(slug), [slug])
  const [abierto, setAbierto] = useState(null) // 'similares' | 'compartir' | null
  const alterna = que => setAbierto(a => (a === que ? null : que))

  return (
    <div className={`${className} border-t border-white/[0.06] pt-3`}>
      <div className="flex flex-wrap justify-center gap-x-6">
        {juegos.length > 0 && (
          <Plegable icono="🎮" titulo={tr({ es: 'Juegos similares', en: 'Similar games', ca: 'Jocs semblants' })}
            abierto={abierto === 'similares'} onToggle={() => alterna('similares')} />
        )}
        <Plegable icono="🏫" titulo={tr({ es: 'Compartir con tu clase', en: 'Share with your class', ca: 'Comparteix amb la classe' })}
          abierto={abierto === 'compartir'} onToggle={() => alterna('compartir')} />
        {conAmigos && (
          <Link to={`${localPath(conAmigos)}?amigos=1`} className="flex items-center gap-2 text-white/45 hover:text-white text-sm font-semibold py-2 transition-colors">
            <span aria-hidden="true">🎉</span>{tr({ es: 'Juega con tus amigos', en: 'Play with your friends', ca: 'Juga amb els teus amics' })}
          </Link>
        )}
      </div>

      {/* Siempre en el HTML, solo oculto: así los enlaces cuentan para el buscador */}
      {juegos.length > 0 && (
        <div hidden={abierto !== 'similares'}>
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
          {juegos.map(j => (
            <Link key={j.slug} to={localPath(j.route)}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.08] p-1.5 text-center transition-colors">
              <ArteJuego slug={j.slug} className="w-full aspect-video rounded-md" />
              <span className="block mt-1 text-[11px] font-semibold leading-tight text-white/60 group-hover:text-white">{j.label}</span>
            </Link>
          ))}
        </div>
        </div>
      )}
      {abierto === 'compartir' && (
        <div className="mt-3 rounded-2xl border border-white/[0.08] bg-[#141b2e] p-4 text-left">
          <CompartirClase />
        </div>
      )}
    </div>
  )
}
