// /novedades — lo nuevo en Tuthor, por fecha (data/novedades.js). Al entrar
// se da por visto (se apaga el punto de «✨ Novedades» en la barra lateral).
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { ArteJuego, slugDeRuta } from '../components/arte'
import { GAMES } from '../data/constants'
import { disponibleEn } from '../lib/games'
import { NOVEDADES, marcarNovedadesVistas } from '../data/novedades'
import { useLang } from '../context/LangContext'

const POR_SLUG = Object.fromEntries(GAMES.filter(g => g.path).map(g => [slugDeRuta(g.path), g]))

export default function Novedades() {
  const { lang, tr, lt, localPath } = useLang()
  useEffect(() => { marcarNovedadesVistas() }, [])

  const visibles = NOVEDADES.filter(n => !n.juego || (POR_SLUG[n.juego] && disponibleEn(n.juego, lang)))
  const porFecha = []
  for (const n of visibles) {
    const ultimo = porFecha[porFecha.length - 1]
    if (ultimo && ultimo.fecha === n.fecha) ultimo.items.push(n)
    else porFecha.push({ fecha: n.fecha, items: [n] })
  }
  const locale = lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES'
  const fechaTexto = f => new Date(f + 'T12:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'long' })

  return (
    <div className="relative z-10 px-4 sm:px-6 py-6">
      <SEOHead path="/novedades" noindex
        title={tr({ es: 'Novedades', en: 'What’s new', ca: 'Novetats' })}
        description={tr({ es: 'Lo último que hemos añadido a Tuthor.', en: 'The latest we have added to Tuthor.', ca: 'El darrer que hem afegit a Tuthor.' })} />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white font-black text-2xl sm:text-3xl">✨ {tr({ es: 'Novedades', en: 'What’s new', ca: 'Novetats' })}</h1>
        <p className="text-white/55 text-sm mt-1">{tr({ es: 'Lo que hemos añadido y mejorado, de lo más reciente a lo más antiguo.', en: 'What we have added and improved, newest first.', ca: 'El que hem afegit i millorat, del més recent al més antic.' })}</p>

        {porFecha.map(grupo => (
          <section key={grupo.fecha} className="mt-6">
            <h2 className="text-white/45 text-xs font-bold uppercase tracking-widest mb-2">{fechaTexto(grupo.fecha)}</h2>
            <div className="space-y-2">
              {grupo.items.map((n, i) => {
                if (n.juego) {
                  const g = POR_SLUG[n.juego]
                  return (
                    <Link key={i} to={localPath(g.path)} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-2.5">
                      <span className="shrink-0 w-24 aspect-video rounded-lg bg-black/20 overflow-hidden"><ArteJuego slug={n.juego} className="w-full h-full p-0.5" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="text-emerald-300 text-[11px] font-black uppercase tracking-wider">{tr({ es: 'Juego nuevo', en: 'New game', ca: 'Joc nou' })}</span>
                        <span className="block text-white font-bold leading-tight">{lt(g)}</span>
                        <span className="block text-white/55 text-sm truncate">{lt(g, 'subtitle')}</span>
                      </span>
                      <span className="text-white/40 text-lg pr-1">→</span>
                    </Link>
                  )
                }
                const Contenedor = n.enlace ? Link : 'div'
                return (
                  <Contenedor key={i} {...(n.enlace ? { to: localPath(n.enlace) } : {})}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 ${n.para === 'profes' ? 'border-sky-400/25 bg-sky-500/[0.06]' : 'border-white/10 bg-white/[0.04]'} ${n.enlace ? 'hover:bg-white/[0.08]' : ''}`}>
                    <span className="text-2xl shrink-0" aria-hidden="true">{n.emoji}</span>
                    <span className="min-w-0 flex-1">
                      {n.para === 'profes' && <span className="text-sky-300 text-[11px] font-black uppercase tracking-wider">{tr({ es: 'Para profes', en: 'For teachers', ca: 'Per a profes' })}</span>}
                      <span className="block text-white font-bold leading-tight">{tr(n.titulo)}</span>
                      <span className="block text-white/60 text-sm mt-0.5 leading-relaxed">{tr(n.texto)}</span>
                    </span>
                    {n.enlace && <span className="text-white/40 text-lg pr-1 self-center">→</span>}
                  </Contenedor>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
