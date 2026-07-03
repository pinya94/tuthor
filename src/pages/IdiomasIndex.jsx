import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const IDIOMAS = [
  {
    id: 'espanol',
    titulo: { es: 'Español', en: 'Spanish', ca: 'Espanyol' },
    desc: {
      es: 'Gramática, ortografía y sintaxis del español.',
      en: 'Spanish grammar, spelling and syntax.',
      ca: 'Gramàtica, ortografia i sintaxi de l\'espanyol.',
    },
    emoji: '✏️',
    gradient: 'from-red-500 to-yellow-500',
    niveles: { es: 'Primaria y ESO', en: 'Primary & Secondary', ca: 'Primària i ESO' },
  },
  {
    id: 'ingles',
    titulo: { es: 'English', en: 'English', ca: 'English' },
    desc: {
      es: 'Gramática inglesa: tiempos verbales, pasiva, phrasal verbs y más.',
      en: 'English grammar: tenses, passive voice, phrasal verbs and more.',
      ca: 'Gramàtica anglesa: temps verbals, passiva, phrasal verbs i més.',
    },
    emoji: '💬',
    gradient: 'from-blue-700 to-red-600',
    niveles: { es: 'Primaria y ESO', en: 'Primary & Secondary', ca: 'Primària i ESO' },
  },
]

export default function IdiomasIndex() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-1">
          {ca ? 'Estudiar · Idiomes' : en ? 'Study · Languages' : 'Estudiar · Idiomas'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {ca ? 'Tria un idioma' : en ? 'Pick a language' : 'Elige un idioma'}
        </h1>
        <p className="text-white/40 mt-1 text-sm">
          {ca ? 'Gramàtica i ortografia' : en ? 'Grammar and spelling' : 'Gramática y ortografía'}
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        {IDIOMAS.map(idioma => (
          <button
            key={idioma.id}
            onClick={() => navigate(localPath(`/estudiar/idiomas/${idioma.id}`))}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`bg-gradient-to-br ${idioma.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{idioma.emoji}</span>
                    <div>
                      <h3 className="font-black text-white text-2xl leading-tight">{idioma.titulo[lang] || idioma.titulo.es}</h3>
                      <p className="text-white/60 text-xs">{idioma.niveles[lang] || idioma.niveles.es}</p>
                    </div>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed">{idioma.desc[lang] || idioma.desc.es}</p>
                </div>
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <span className="text-white font-black text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
