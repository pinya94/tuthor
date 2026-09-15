import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

export default function FuncionesTema() {
  const navigate = useNavigate()
  const { lang, localPath, tr } = useLang()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const metaTitle = ca ? 'Funcions — Matemàtiques' : en ? 'Functions — Mathematics' : 'Funciones — Matemáticas'
  const metaDesc  = ca
    ? 'Practica funcions lineals, paràboles i funcions a trossos amb jocs i exàmens interactius a Tuthor.'
    : en
    ? 'Practice linear functions, parabolas and piecewise functions with interactive games and exams on Tuthor.'
    : 'Practica funciones lineales, parábolas y funciones a trozos con juegos y exámenes interactivos en Tuthor.'

  const juegos = [
    {
      id: 'funciones-grafica',
      titulo: ca ? 'Caça la Funció' : en ? 'Function Hunt' : 'Caza la Función',
      descripcion: ca
        ? 'Llegeix la gràfica i ajusta el pendent, l\'ordenada o els coeficients fins que la teva corba encaixi. Rectes i paràboles.'
        : en
        ? 'Read the graph and adjust the slope, intercept or coefficients until your curve matches. Lines and parabolas.'
        : 'Lee la gráfica y ajusta la pendiente, la ordenada o los coeficientes hasta que tu curva encaje. Rectas y parábolas.',
      emoji: '📈',
      gradient: 'from-pink-500 to-rose-700',
      detalles: [
        ca ? '3 nivells' : en ? '3 levels' : '3 niveles',
        ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas',
        ca ? 'Amb el joc' : en ? 'With the game' : 'Con el juego',
      ],
      action: () => navigate(localPath('/examen/funciones-grafica-test')),
    },
    {
      id: 'trayectoria',
      titulo: 'Trayectoria',
      descripcion: ca
        ? '10 preguntes sense temps: rectes, paràboles i funcions a trossos. Descobreix la teva nota al final.'
        : en
        ? '10 questions with no time limit: lines, parabolas and piecewise functions. See your grade at the end.'
        : '10 preguntas sin tiempo: rectas, parábolas y funciones a trozos. Descubre tu nota al final.',
      emoji: '📝',
      gradient: 'from-amber-500 to-orange-600',
      detalles: [
        ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas',
        ca ? 'Sense temps' : en ? 'No time limit' : 'Sin tiempo',
        ca ? 'Nota final' : en ? 'Final grade' : 'Nota final',
      ],
      action: () => navigate(localPath('/examen/trayectoria')),
    },
    {
      id: 'portero',
      titulo: ca ? 'Examen Porter' : en ? 'Goalkeeper Exam' : 'Examen Portero',
      descripcion: ca
        ? '10 tirs: calcula f(x₀) i tria la zona on entra la pilota. Rectes i paràboles. Sense temps.'
        : en
        ? '10 shots: calculate f(x₀) and pick the zone the ball enters. Lines and parabolas. No time limit.'
        : '10 tiros: calcula f(x₀) y elige la zona donde entra el balón. Rectas y parábolas. Sin tiempo.',
      emoji: '🧤',
      gradient: 'from-green-500 to-teal-600',
      detalles: [
        ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas',
        ca ? 'Rectes i paràboles' : en ? 'Lines & parabolas' : 'Rectas y parábolas',
        ca ? 'Sense temps' : en ? 'No time limit' : 'Sin tiempo',
      ],
      action: () => navigate(localPath('/examen/portero')),
    },
    {
      id: 'teoria',
      titulo: ca ? 'Examen de teoria' : en ? 'Theory exam' : 'Examen de teoría',
      descripcion: ca
        ? '10 preguntes d\'opció múltiple sobre funcions lineals, pendents, eixos i gràfiques. Amb explicació després de cada resposta.'
        : en
        ? '10 multiple-choice questions on linear functions, slopes, axes and graphs. With explanation after each answer.'
        : '10 preguntas de opción múltiple sobre funciones lineales, pendientes, ejes y gráficas. Con explicación tras cada respuesta.',
      emoji: '📈',
      gradient: 'from-violet-500 to-purple-700',
      detalles: [
        ca ? '10 preguntes' : en ? '10 questions' : '10 preguntas',
        ca ? 'Opció múltiple' : en ? 'Multiple choice' : 'Opción múltiple',
        ca ? 'Explicació inclosa' : en ? 'Explanation included' : 'Explicación incluida',
      ],
      action: () => navigate(localPath('/examen/funciones')),
    },
    {
      id: 'rectas',
      titulo: tr({"es":"Rectas: pendiente y puntos","en":"Lines: slope and points","ca":"Rectes: pendent i punts"}),
      descripcion: tr({"es":"La recta que pasa por dos puntos, la de una pendiente y un punto, y dónde se cortan dos rectas. Cada examen es distinto y trae la resolución paso a paso.","en":"The line through two points, the one from a slope and a point, and where two lines cross. Every exam is different and comes with step-by-step solutions.","ca":"La recta que passa per dos punts, la d'un pendent i un punt, i on es tallen dues rectes. Cada examen és diferent i porta la resolució pas a pas."}),
      emoji: '📏',
      gradient: 'from-sky-500 to-indigo-700',
      detalles: [
        tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }),
        tr({ es: 'Distinto cada vez', en: 'Different every time', ca: 'Diferent cada vegada' }),
        tr({ es: 'Paso a paso', en: 'Step by step', ca: 'Pas a pas' }),
      ],
      action: () => navigate(localPath('/examen/rectas-test')),
    },
    // No es un modo de práctica sino una herramienta: resuelve el ejercicio
    // que el alumno ya tiene delante. Va la última para no quitar sitio a
    // los que puntúan.
    {
      id: 'recurso',
      titulo: tr({ es: 'Resolver mis ejercicios', en: 'Solve my exercises', ca: 'Resoldre els meus exercicis' }),
      descripcion: tr({
        es: 'Escribe tu función o los datos del problema y te la dibujamos con los cortes, el vértice o la recta que pasa por dos puntos, paso a paso.',
        en: 'Type your function or the problem data and we draw it with the crossings, the vertex or the line through two points, step by step.',
        ca: 'Escriu la teva funció o les dades del problema i te la dibuixem amb els talls, el vèrtex o la recta que passa per dos punts, pas a pas.',
      }),
      emoji: '🧮',
      gradient: 'from-sky-500 to-blue-700',
      detalles: [
        tr({ es: 'Paso a paso', en: 'Step by step', ca: 'Pas a pas' }),
        tr({ es: 'Fracciones exactas', en: 'Exact fractions', ca: 'Fraccions exactes' }),
        tr({ es: 'Gratis', en: 'Free', ca: 'Gratis' }),
      ],
      action: () => navigate(localPath('/recursos/funciones')),
    },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <PageMeta title={metaTitle} description={metaDesc} path="/estudiar/matematicas/funciones" lang={lang} />
      <CourseSchema name={metaTitle} description={metaDesc} path="/estudiar/matematicas/funciones" lang={lang} subject={en ? 'Mathematics' : 'Matemáticas'} />
      <BreadcrumbSchema lang={lang} items={[
        { name: en ? 'Study' : ca ? 'Estudiar' : 'Estudiar', path: '/estudiar' },
        { name: en ? 'Mathematics' : ca ? 'Matemàtiques' : 'Matemáticas', path: '/estudiar/matematicas' },
        { name: en ? 'Functions' : ca ? 'Funcions' : 'Funciones', path: '/estudiar/matematicas/funciones' },
      ]} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar/matematicas'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Matemàtiques' : en ? 'Mathematics' : 'Matemáticas'}
          </button>
          {' '}/{' '}<span className="text-white/50">{ca ? 'Funcions' : en ? 'Functions' : 'Funciones'}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">⚽</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {ca ? 'Funcions' : en ? 'Functions' : 'Funciones'}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {ca ? 'Rectes, paràboles i funcions a trossos' : en ? 'Lines, parabolas and piecewise functions' : 'Rectas, parábolas y funciones a trozos'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Modes disponibles' : en ? 'Available modes' : 'Modos disponibles'}
        </p>
        {juegos.map(j => (
          <button key={j.id} onClick={j.action}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${j.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{j.emoji}</span>
                    <h3 className="font-black text-white text-xl">{j.titulo}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{j.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {j.detalles.map(d => (
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
