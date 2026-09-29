import { Link, useNavigate } from 'react-router-dom'
import Thumbnail from '../components/Thumbnail'
import { slugDeRuta } from '../components/arte'
import { GAMES } from '../data/constants'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { CURSOS_LANDING } from '../data/landingsCurso'
import { ARTE_CURSOS } from '../components/arte/cursos'

export default function Juegos() {
  const navigate = useNavigate()
  const { lt, localPath, t, lang, tr } = useLang()

  function handleClick(game) {
    if (!game.ready) return
    if (game.path) navigate(localPath(game.path))
    else if (game.url) window.open(game.url, '_blank')
  }

  const seoData = {
    es: { title: 'Juegos educativos', desc: 'Historia, geografía, matemáticas y lengua con juegos interactivos. Repasa el temario de Primaria, ESO y Bachillerato jugando.', path: '/juegos' },
    en: { title: 'Educational games', desc: 'History, geography, maths and language with interactive games. Revise Primary, Secondary and Sixth Form content while playing.', path: '/en/juegos' },
    ca: { title: 'Jocs educatius', desc: 'Història, geografia, matemàtiques i llengua amb jocs interactius. Repassa el temari de Primària, ESO i Batxillerat jugant.', path: '/ca/juegos' },
  }[lang] || {}

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={seoData.title} description={seoData.desc} path={seoData.path} lang={lang} />
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">{t('juegos.titulo', 'Aprende sin darte cuenta')}</h1>
        <p className="text-white/40 mt-1 text-sm">{t('juegos.subtitulo', 'Juegos educativos para repasar mientras te diviertes')}</p>
      </div>

      {/* Por curso: enlaces reales a las páginas de entrada (data/landingsCurso.js),
          que agrupan los juegos por asignatura de ese curso. */}
      <div className="max-w-5xl mx-auto w-full mb-6 flex flex-wrap gap-3">
        {Object.entries(CURSOS_LANDING).map(([curso, c]) => {
          const ArteCurso = ARTE_CURSOS[curso]
          return (
            <Link key={curso} to={localPath(`/juegos/${curso}`)}
              className="group flex items-center gap-3 rounded-2xl bg-[#141b2e] border border-white/[0.08] hover:border-white/20 pl-2 pr-5 py-2 transition-colors">
              {ArteCurso && <ArteCurso className="w-16 shrink-0" />}
              <span>
                <span className="block text-white font-black text-sm">{tr(c.titulo)}</span>
                <span className="block text-white/45 text-xs">{c.edades} {tr({ es: 'años', en: 'years', ca: 'anys' })} · {tr({ es: 'por asignatura', en: 'by subject', ca: 'per assignatura' })} →</span>
              </span>
            </Link>
          )
        })}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto w-full pb-4">
          {[...GAMES].sort((a, b) => (b.ready ? 1 : 0) - (a.ready ? 1 : 0)).map(game => (
            <Thumbnail
              key={game.title}
              title={lt(game)}
              subtitle={lt(game, 'subtitle')}
              emoji={game.emoji}
              gradient={game.gradient}
              slug={slugDeRuta(game.path)}
              comingSoon={!game.ready}
              onClick={() => handleClick(game)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
