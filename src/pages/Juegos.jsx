import { useNavigate } from 'react-router-dom'
import Thumbnail from '../components/Thumbnail'
import { GAMES } from '../data/constants'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'

export default function Juegos() {
  const navigate = useNavigate()
  const { lt, localPath, t, lang } = useLang()

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
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto w-full pb-4">
          {[...GAMES].sort((a, b) => (b.ready ? 1 : 0) - (a.ready ? 1 : 0)).map(game => (
            <Thumbnail
              key={game.title}
              title={lt(game)}
              subtitle={lt(game, 'subtitle')}
              emoji={game.emoji}
              gradient={game.gradient}
              comingSoon={!game.ready}
              onClick={() => handleClick(game)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
