import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

export default function EnterosRacionalesTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const metaTitle = en ? 'Integers and Rationals' : ca ? 'Enters i Racionals' : 'Enteros y Racionales'
  const metaDesc = en
    ? 'Study Integers and Rational Numbers on Tuthor: operations, number line, fractions and decimals. Interactive practice for Primary and Secondary.'
    : ca
    ? 'Estudia Enters i Racionals a Tuthor: operacions, recta numèrica, fraccions i decimals. Pràctica interactiva per a Primària i ESO.'
    : 'Estudia Enteros y Racionales en Tuthor: operaciones, recta numérica, fracciones y decimales. Práctica interactiva para Primaria y ESO.'
  const pageMeta = <PageMeta title={metaTitle} description={metaDesc} path="/estudiar/matematicas/enteros-racionales" lang={lang} />
  const courseSchema = <CourseSchema name={metaTitle} description={metaDesc} path="/estudiar/matematicas/enteros-racionales" lang={lang} subject={en ? 'Mathematics' : 'Matemáticas'} />
  const breadcrumb = <BreadcrumbSchema lang={lang} items={[
    { name: en ? 'Study' : ca ? 'Estudiar' : 'Estudiar', path: '/estudiar' },
    { name: en ? 'Mathematics' : ca ? 'Matemàtiques' : 'Matemáticas', path: '/estudiar/matematicas' },
    { name: metaTitle, path: '/estudiar/matematicas/enteros-racionales' },
  ]} />

  const opciones = [
    {
      id: 'salta-recta',
      titulo: ca ? 'Salta la Recta' : en ? 'Jump the Number Line' : 'Salta la Recta',
      descripcion: ca
        ? 'Salta per una recta numèrica: toca on cau una operació o endevina quina operació va ser. Practica la regla de signes.'
        : en
        ? 'Jump along a number line: tap where an operation lands or guess which operation it was. Practise the sign rule.'
        : 'Salta por una recta numérica: toca dónde cae una operación o adivina qué operación fue. Practica la regla de signos.',
      emoji: '🐸',
      gradient: 'from-lime-500 to-green-700',
      detalles: [
        ca ? 'Contrarellotge' : en ? 'Against the clock' : 'Contrarreloj',
        'ESO',
        ca ? 'Visual' : en ? 'Visual' : 'Visual',
      ],
      action: () => navigate(localPath('/juegos/salta-recta')),
    },
    {
      id: 'examen',
      titulo: ca ? 'Examen de pràctica' : en ? 'Practice exam' : 'Examen de práctica',
      descripcion: ca
        ? 'Preguntes d\'opció múltiple sobre enters, valor absolut, operacions amb signes i nombres racionals.'
        : en
        ? 'Multiple-choice questions on integers, absolute value, signed operations and rational numbers.'
        : 'Preguntas de opción múltiple sobre enteros, valor absoluto, operaciones con signos y números racionales.',
      emoji: '🔢',
      gradient: 'from-slate-500 to-gray-700',
      detalles: [
        ca ? 'Opció múltiple' : en ? 'Multiple choice' : 'Opción múltiple',
        'ESO',
        ca ? 'Nota final' : en ? 'Final grade' : 'Nota final',
      ],
      action: () => navigate(localPath('/examen/enteros-racionales')),
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
          {' '}/{' '}<span className="text-white/50">{ca ? 'Nombres Enters i Racionals' : en ? 'Integers and Rationals' : 'Números Enteros y Racionales'}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">🔢</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ca ? 'Nombres Enters i Racionals' : en ? 'Integers and Rationals' : 'Números Enteros y Racionales'}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {ca ? 'Signes, valor absolut i racionals' : en ? 'Signs, absolute value and rationals' : 'Signos, valor absoluto y racionales'}
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
