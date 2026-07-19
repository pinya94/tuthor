import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'

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
    id: 'ritmo', emoji: '🥁', gradient: 'from-slate-500 to-slate-700', ready: false,
    titulo: { es: 'Ritmo', en: 'Rhythm', ca: 'Ritme' },
    subtitulo: {
      es: 'Compases, figuras y silencios',
      en: 'Bars, note values and rests',
      ca: 'Compassos, figures i silencis',
    },
  },
]

export default function MusicaIndex() {
  const navigate = useNavigate()
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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
        {TEMAS.map(t => (
          <button
            key={t.id}
            onClick={() => t.ready && navigate(localPath(t.path))}
            className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 ${
              t.ready ? 'hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 cursor-pointer' : 'opacity-50 cursor-default'
            }`}
          >
            <div className={`bg-gradient-to-br ${t.gradient} p-5 aspect-square flex flex-col justify-between`}>
              {!t.ready && (
                <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {tr({ es: 'Pronto', en: 'Soon', ca: 'Aviat' })}
                </span>
              )}
              <span className="text-4xl">{t.emoji}</span>
              <div>
                <h3 className="font-black text-white text-base leading-tight">{tr(t.titulo)}</h3>
                <p className="text-white/65 text-xs mt-1 leading-relaxed line-clamp-2">{tr(t.subtitulo)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
