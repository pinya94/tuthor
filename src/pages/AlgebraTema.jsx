import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

export default function AlgebraTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const metaTitle = en ? 'Algebra' : ca ? 'Àlgebra' : 'Álgebra'
  const metaDesc = en
    ? 'Study Algebra on Tuthor: equations, expressions, polynomials and systems. Interactive practice for Secondary.'
    : ca
    ? 'Estudia Àlgebra a Tuthor: equacions, expressions, polinomis i sistemes. Pràctica interactiva per a l\'ESO.'
    : 'Estudia Álgebra en Tuthor: ecuaciones, expresiones, polinomios y sistemas. Práctica interactiva para la ESO.'
  const pageMeta = <PageMeta title={metaTitle} description={metaDesc} path="/estudiar/matematicas/algebra" lang={lang} />
  const courseSchema = <CourseSchema name={metaTitle} description={metaDesc} path="/estudiar/matematicas/algebra" lang={lang} subject={en ? 'Mathematics' : 'Matemáticas'} />
  const breadcrumb = <BreadcrumbSchema lang={lang} items={[
    { name: en ? 'Study' : ca ? 'Estudiar' : 'Estudiar', path: '/estudiar' },
    { name: en ? 'Mathematics' : ca ? 'Matemàtiques' : 'Matemáticas', path: '/estudiar/matematicas' },
    { name: metaTitle, path: '/estudiar/matematicas/algebra' },
  ]} />

  const opciones = [
    {
      id: 'balanza-algebraica',
      titulo: ca ? 'Balança Algebraica' : en ? 'Algebra Balance' : 'Balanza Algebraica',
      descripcion: ca
        ? 'Amb la mecànica del joc: despeja la x fent la mateixa operació als dos costats fins a deixar-la sola. Equacions de primer grau.'
        : en
        ? 'Using the game mechanic: isolate x by doing the same operation to both sides until it stands alone. Linear equations.'
        : 'Con la mecánica del juego: despeja la x haciendo la misma operación a los dos lados hasta dejarla sola. Ecuaciones de primer grado.',
      emoji: '🟰',
      gradient: 'from-violet-500 to-indigo-700',
      detalles: [
        ca ? '3 nivells' : en ? '3 levels' : '3 niveles',
        ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas',
        ca ? 'Amb el joc' : en ? 'With the game' : 'Con el juego',
      ],
      action: () => navigate(localPath('/examen/balanza-algebraica-test')),
    },
    {
      id: 'examen',
      titulo: ca ? 'Examen de pràctica' : en ? 'Practice exam' : 'Examen de práctica',
      descripcion: ca
        ? 'Preguntes d\'opció múltiple sobre equacions de 1r i 2n grau, sistemes d\'equacions, monomis i factorització.'
        : en
        ? 'Multiple-choice questions on 1st and 2nd degree equations, systems of equations, monomials and factorisation.'
        : 'Preguntas de opción múltiple sobre ecuaciones de 1.º y 2.º grado, sistemas de ecuaciones, monomios y factorización.',
      emoji: '🔣',
      gradient: 'from-red-500 to-rose-700',
      detalles: [
        ca ? 'Opció múltiple' : en ? 'Multiple choice' : 'Opción múltiple',
        'ESO',
        ca ? 'Nota final' : en ? 'Final grade' : 'Nota final',
      ],
      action: () => navigate(localPath('/examen/algebra')),
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
          {' '}/{' '}<span className="text-white/50">{ca ? 'Àlgebra' : en ? 'Algebra' : 'Álgebra'}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">🔣</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ca ? 'Àlgebra' : en ? 'Algebra' : 'Álgebra'}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {ca ? 'Equacions, sistemes i factorització' : en ? 'Equations, systems and factorisation' : 'Ecuaciones, sistemas y factorización'}
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

        {!en && !ca && (
          <a
            href="https://www.youtube.com/watch?v=DpWiRC3CZMM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/10 p-4 transition-all hover:border-amber-500/30 hover:scale-[1.01] group"
            style={{ background: 'rgba(17,20,29,0.86)' }}>
            <span className="text-2xl shrink-0">🎬</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white group-hover:text-amber-300 transition-colors">Vídeo: ¿cómo funciona una balanza?</p>
              <p className="text-white/50 text-sm leading-snug">La idea detrás del método: por qué puedes hacer lo mismo en los dos lados de una ecuación.</p>
            </div>
            <span className="text-amber-400 font-black shrink-0">→</span>
          </a>
        )}
      </div>
    </div>
  )
}
