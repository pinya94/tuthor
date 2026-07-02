import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { ELEMENTOS } from '../data/tablaperiodica'

const TEMAS_META = {
  es: {
    'tabla-periodica': {
      titulo: 'Tabla Periódica',
      emoji: '⚗️',
      descripcion: 'Símbolos, nombres, números atómicos, grupos y tipos de los elementos químicos.',
    },
  },
  en: {
    'tabla-periodica': {
      titulo: 'Periodic Table',
      emoji: '⚗️',
      descripcion: 'Symbols, names, atomic numbers, groups and types of chemical elements.',
    },
  },
  ca: {
    'tabla-periodica': {
      titulo: 'Taula Periòdica',
      emoji: '⚗️',
      descripcion: 'Símbols, noms, números atòmics, grups i tipus dels elements químics.',
    },
  },
}

// Modos de examen por tema: qué pruebas hay disponibles y sus detalles
const MODOS_POR_TEMA = {
  'tabla-periodica': [
    {
      id: 'examen',
      emoji: '📝',
      gradient: 'from-violet-500 to-purple-700',
      titulo: { es: 'Examen', en: 'Exam', ca: 'Examen' },
      descripcion: {
        es: 'Identifica elementos por símbolo, nombre o número atómico. Preguntas mixtas según el nivel elegido.',
        en: 'Identify elements by symbol, name or atomic number. Mixed questions based on the chosen level.',
        ca: 'Identifica elements per símbol, nom o número atòmic. Preguntes mixtes segons el nivell triat.',
      },
      detalles: {
        es: ['3 niveles', '10 preguntas', 'Hasta 6 tipos de pregunta', '2 intentos'],
        en: ['3 levels', '10 questions', 'Up to 6 question types', '2 attempts'],
        ca: ['3 nivells', '10 preguntes', 'Fins a 6 tipus de pregunta', '2 intents'],
      },
      path: 'tabla-periodica',
    },
  ],
}

export default function QuimicaTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en', ca = lang === 'ca'
  const { tema } = useParams()

  const temasMeta = TEMAS_META[lang] || TEMAS_META.es
  const meta = temasMeta[tema]

  if (!meta) { navigate(localPath('/estudiar/quimica')); return null }

  const modos = MODOS_POR_TEMA[tema] || []

  function getLabel(obj) {
    return lang === 'en' ? obj.en : lang === 'ca' ? obj.ca : obj.es
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Estudiar' : en ? 'Study' : 'Estudiar'}
          </button>
          {' / '}
          <button onClick={() => navigate(localPath('/estudiar/quimica'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Ciències' : en ? 'Science' : 'Ciencias'}
          </button>
          {' / '}
          <span className="text-white/50">{meta.titulo}</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="text-5xl">{meta.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta.titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{meta.descripcion}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Proves disponibles' : en ? 'Available tests' : 'Pruebas disponibles'}
        </p>

        {modos.map(modo => (
          <button
            key={modo.id}
            onClick={() => navigate(localPath(`/examen/${modo.path}`), {
              state: { backPath: `/estudiar/quimica/${tema}` }
            })}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`bg-gradient-to-br ${modo.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{modo.emoji}</span>
                    <h3 className="font-black text-white text-xl">{getLabel(modo.titulo)}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{getLabel(modo.descripcion)}</p>
                  <div className="flex flex-wrap gap-2">
                    {getLabel(modo.detalles).map(d => (
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                        {d}
                      </span>
                    ))}
                  </div>
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
