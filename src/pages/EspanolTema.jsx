import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function EspanolTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const opciones = [
    {
      id: 'examen',
      titulo: ca ? 'Examen de pràctica' : en ? 'Practice exam' : 'Examen de práctica',
      descripcion: ca
        ? 'Preguntes d\'opció múltiple sobre gramàtica, ortografia, categories gramaticals i sintaxi. Tria el teu nivell.'
        : en
        ? 'Multiple-choice questions on grammar, spelling, word classes and syntax. Choose your level.'
        : 'Preguntas de opción múltiple sobre gramática, ortografía, categorías gramaticales y sintaxis. Elige tu nivel.',
      emoji: '🇪🇸',
      gradient: 'from-red-500 to-yellow-500',
      detalles: [
        ca ? 'Opció múltiple' : en ? 'Multiple choice' : 'Opción múltiple',
        ca ? 'Primària i ESO' : en ? 'Primary & Secondary' : 'Primaria y ESO',
        ca ? 'Nota final' : en ? 'Final grade' : 'Nota final',
      ],
      action: () => navigate(localPath('/examen/espanol')),
    },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar/idiomas'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Idiomes' : en ? 'Languages' : 'Idiomas'}
          </button>
          {' '}/{' '}<span className="text-white/50">{ca ? 'Gramàtica Espanyola' : en ? 'Spanish Grammar' : 'Gramática Española'}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">🇪🇸</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ca ? 'Gramàtica Espanyola' : en ? 'Spanish Grammar' : 'Gramática Española'}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {ca ? 'Ortografia, categories i sintaxi' : en ? 'Spelling, word classes and syntax' : 'Ortografía, categorías y sintaxis'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Modes disponibles' : en ? 'Available modes' : 'Modos disponibles'}
        </p>
        {opciones.map(o => (
          <button key={o.id} onClick={o.action}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${o.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{o.emoji}</span>
                    <h3 className="font-black text-white text-xl">{o.titulo}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{o.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {o.detalles.map(d => (
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">{d}</span>
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
