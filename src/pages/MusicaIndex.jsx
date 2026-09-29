import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import { ArteMateria } from '../components/arte/materias'
import TarjetaArte from '../components/TarjetaArte'
import { ARTE_TEMAS } from '../components/arte/temas'

const TEMAS = [
  {
    id: 'notas', emoji: '🎼', gradient: 'from-indigo-500 to-fuchsia-700', ready: true,
    path: '/examen/musica',
    titulo: { es: 'Notas', en: 'Notes', ca: 'Notes' },
    subtitulo: {
      es: 'Lee el pentagrama y tócalo en el piano',
      en: 'Read the staff and play it on the piano',
      ca: 'Llegeix el pentagrama i toca-ho al piano',
    },
  },
  {
    id: 'ritmo', emoji: '🥁', gradient: 'from-amber-500 to-orange-700', ready: true,
    path: '/examen/musica-ritmo-test',
    titulo: { es: 'Ritmo', en: 'Rhythm', ca: 'Ritme' },
    subtitulo: {
      es: 'Compases, figuras y silencios',
      en: 'Bars, note values and rests',
      ca: 'Compassos, figures i silencis',
    },
  },
]

export default function MusicaIndex() {
  const { lang, localPath, tr } = useLang()

  const seoData = {
    es: { title: 'Música — teoría y exámenes', desc: 'Lectura de partituras y ritmo. Teoría breve y exámenes interactivos con piano virtual, por Primaria, ESO y Bachillerato.', path: '/estudiar/musica' },
    en: { title: 'Music — theory and exams', desc: 'Sheet music reading and rhythm. Short theory and interactive exams with a virtual piano, for primary and secondary school.', path: '/en/estudiar/musica' },
    ca: { title: 'Música — teoria i exàmens', desc: 'Lectura de partitures i ritme. Teoria breu i exàmens interactius amb piano virtual, per a Primària, ESO i Batxillerat.', path: '/ca/estudiar/musica' },
  }[lang] || {}

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={seoData.title} description={seoData.desc} path={seoData.path} lang={lang} />
      <div className="text-center mb-6">
        <ArteMateria id="musica" />
        <p className="text-white/40 text-sm mb-1">
          {tr({ es: 'Estudiar · Música', en: 'Study · Music', ca: 'Estudiar · Música' })}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {tr({ es: 'Elige un tema', en: 'Pick a topic', ca: 'Tria un tema' })}
        </h1>
        <p className="text-white/40 mt-1 text-sm">
          {tr({ es: 'Lenguaje musical para todos los niveles', en: 'Music theory for all levels', ca: 'Llenguatge musical per a tots els nivells' })}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
        {TEMAS.filter(t => t.ready).map(t => (
          <TarjetaArte key={t.id} Arte={ARTE_TEMAS[`musica/${t.id}`]} titulo={tr(t.titulo)} sub={tr(t.subtitulo)}
            to={localPath(t.path)} />
        ))}
      </div>
    </div>
  )
}
