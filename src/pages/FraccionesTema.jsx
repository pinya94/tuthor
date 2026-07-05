import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

export default function FraccionesTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const metaTitle = en ? 'Fractions' : ca ? 'Fraccions' : 'Fracciones'
  const metaDesc = en
    ? 'Study Fractions on Tuthor: equivalent fractions, operations, decimals and percentages. Interactive practice for Primary and Secondary.'
    : ca
    ? 'Estudia Fraccions a Tuthor: fraccions equivalents, operacions, decimals i percentatges. Pràctica interactiva per a Primària i ESO.'
    : 'Estudia Fracciones en Tuthor: fracciones equivalentes, operaciones, decimales y porcentajes. Práctica interactiva para Primaria y ESO.'
  const pageMeta = <PageMeta title={metaTitle} description={metaDesc} path="/estudiar/matematicas/fracciones" lang={lang} />
  const courseSchema = <CourseSchema name={metaTitle} description={metaDesc} path="/estudiar/matematicas/fracciones" lang={lang} subject={en ? 'Mathematics' : 'Matemáticas'} />
  const breadcrumb = <BreadcrumbSchema lang={lang} items={[
    { name: en ? 'Study' : ca ? 'Estudiar' : 'Estudiar', path: '/estudiar' },
    { name: en ? 'Mathematics' : ca ? 'Matemàtiques' : 'Matemáticas', path: '/estudiar/matematicas' },
    { name: metaTitle, path: '/estudiar/matematicas/fracciones' },
  ]} />

  const opciones = [
    {
      id: 'examen',
      titulo: ca ? 'Examen de pràctica' : en ? 'Practice exam' : 'Examen de práctica',
      descripcion: ca
        ? 'Preguntes d\'opció múltiple sobre fraccions equivalents, operacions, decimals i percentatges. Tria el teu nivell.'
        : en
        ? 'Multiple-choice questions on equivalent fractions, operations, decimals and percentages. Choose your level.'
        : 'Preguntas de opción múltiple sobre fracciones equivalentes, operaciones, decimales y porcentajes. Elige tu nivel.',
      emoji: '🍕',
      gradient: 'from-blue-500 to-indigo-600',
      detalles: [
        ca ? 'Opció múltiple' : en ? 'Multiple choice' : 'Opción múltiple',
        ca ? 'Primària i ESO' : en ? 'Primary & Secondary' : 'Primaria y ESO',
        ca ? 'Nota final' : en ? 'Final grade' : 'Nota final',
      ],
      action: () => navigate(localPath('/examen/fracciones')),
    },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      {pageMeta}{courseSchema}{breadcrumb}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar/matematicas'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Matemàtiques' : en ? 'Mathematics' : 'Matemáticas'}
          </button>
          {' '}/{' '}<span className="text-white/50">{ca ? 'Fraccions i Decimals' : en ? 'Fractions and Decimals' : 'Fracciones y Decimales'}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">🍕</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ca ? 'Fraccions i Decimals' : en ? 'Fractions and Decimals' : 'Fracciones y Decimales'}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {ca ? 'Operacions, equivalències i percentatges' : en ? 'Operations, equivalences and percentages' : 'Operaciones, equivalencias y porcentajes'}
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
