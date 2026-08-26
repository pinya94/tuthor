import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

export default function EstadisticaTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const metaTitle = en ? 'Statistics and Probability' : ca ? 'Estadística i Probabilitat' : 'Estadística y Probabilidad'
  const metaDesc = en
    ? 'Study Statistics on Tuthor: mean, median, mode, probability and charts. Interactive practice for Primary and Secondary.'
    : ca
    ? 'Estudia Estadística a Tuthor: mitjana, mediana, moda, probabilitat i gràfiques. Pràctica interactiva per a Primària i ESO.'
    : 'Estudia Estadística en Tuthor: media, mediana, moda, probabilidad y gráficas. Práctica interactiva para Primaria y ESO.'
  const pageMeta = <PageMeta title={metaTitle} description={metaDesc} path="/estudiar/matematicas/estadistica" lang={lang} />
  const courseSchema = <CourseSchema name={metaTitle} description={metaDesc} path="/estudiar/matematicas/estadistica" lang={lang} subject={en ? 'Mathematics' : 'Matemáticas'} />
  const breadcrumb = <BreadcrumbSchema lang={lang} items={[
    { name: en ? 'Study' : ca ? 'Estudiar' : 'Estudiar', path: '/estudiar' },
    { name: en ? 'Mathematics' : ca ? 'Matemàtiques' : 'Matemáticas', path: '/estudiar/matematicas' },
    { name: metaTitle, path: '/estudiar/matematicas/estadistica' },
  ]} />

  const opciones = [
    {
      id: 'estadistico-expres',
      titulo: ca ? 'Estadístic Exprés' : en ? 'Quick Statistician' : 'Estadístico Exprés',
      descripcion: ca
        ? 'Calcula mitjana, mediana, moda i rang d\'un conjunt de dades real, a contrarellotge. Sense rodes ni atzar: només càlcul.'
        : en
        ? 'Calculate mean, median, mode and range from a real dataset, against the clock. No wheels, no chance: just calculation.'
        : 'Calcula media, mediana, moda y rango de un conjunto de datos real, a contrarreloj. Sin ruletas ni azar: solo cálculo.',
      emoji: '📊',
      gradient: 'from-sky-500 to-blue-700',
      detalles: [
        ca ? 'Contrarellotge' : en ? 'Against the clock' : 'Contrarreloj',
        ca ? 'Primària i ESO' : en ? 'Primary & Secondary' : 'Primaria y ESO',
        ca ? 'Càlcul, no atzar' : en ? 'Calculation, not chance' : 'Cálculo, no azar',
      ],
      action: () => navigate(localPath('/juegos/estadistico-expres')),
    },
    {
      id: 'examen',
      titulo: ca ? 'Examen de pràctica' : en ? 'Practice exam' : 'Examen de práctica',
      descripcion: ca
        ? 'Preguntes d\'opció múltiple sobre mitjana, mediana, moda, probabilitat i gràfics estadístics. Tria el teu nivell.'
        : en
        ? 'Multiple-choice questions on mean, median, mode, probability and statistical charts. Choose your level.'
        : 'Preguntas de opción múltiple sobre media, mediana, moda, probabilidad y gráficos estadísticos. Elige tu nivel.',
      emoji: '📊',
      gradient: 'from-purple-500 to-violet-600',
      detalles: [
        ca ? 'Opció múltiple' : en ? 'Multiple choice' : 'Opción múltiple',
        ca ? 'Primària i ESO' : en ? 'Primary & Secondary' : 'Primaria y ESO',
        ca ? 'Nota final' : en ? 'Final grade' : 'Nota final',
      ],
      action: () => navigate(localPath('/examen/estadistica')),
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
          {' '}/{' '}<span className="text-white/50">{ca ? 'Estadística i Probabilitat' : en ? 'Statistics and Probability' : 'Estadística y Probabilidad'}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">📊</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ca ? 'Estadística i Probabilitat' : en ? 'Statistics and Probability' : 'Estadística y Probabilidad'}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {ca ? 'Dades, gràfics i probabilitat' : en ? 'Data, charts and probability' : 'Datos, gráficos y probabilidad'}
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

        <div className="pt-2">
          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">
            {ca ? 'Exàmens per mesura' : en ? 'Exams by measure' : 'Exámenes por medida'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'media', titulo: ca ? 'Mitjana' : en ? 'Mean' : 'Media', path: '/examen/estadistico-media-test' },
              { id: 'mediana', titulo: ca ? 'Mediana' : en ? 'Median' : 'Mediana', path: '/examen/estadistico-mediana-test' },
              { id: 'moda', titulo: ca ? 'Moda' : en ? 'Mode' : 'Moda', path: '/examen/estadistico-moda-test' },
              { id: 'rango', titulo: ca ? 'Rang' : en ? 'Range' : 'Rango', path: '/examen/estadistico-rango-test' },
            ].map(m => (
              <button key={m.id} onClick={() => navigate(localPath(m.path))}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/40 rounded-xl px-4 py-3.5 text-left transition-all flex items-center justify-between gap-2">
                <span className="text-white font-bold text-sm">{m.titulo}</span>
                <span className="text-white/30 text-sm">→</span>
              </button>
            ))}
          </div>
          <p className="text-white/25 text-xs mt-2.5">
            {ca
              ? 'Un examen centrat només en aquesta mesura, sense barrejar-la amb les altres.'
              : en
              ? 'An exam focused only on this measure, without mixing it with the others.'
              : 'Un examen centrado solo en esa medida, sin mezclarla con las demás.'}
          </p>
        </div>
      </div>
    </div>
  )
}
