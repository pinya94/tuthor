// /estudiar/matematicas/sucesiones: el tema con sus formatos (el juego Sigue
// la Serie, su examen y el examen de teoría) y una explicación breve de las
// progresiones. Antes la ficha del temario llevaba directa al examen porque
// solo había uno.
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const PATH = '/estudiar/matematicas/sucesiones'

export default function SucesionesTema() {
  const { lang, localPath, tr } = useLang()
  const titulo = tr({ es: 'Sucesiones y Progresiones', en: 'Sequences', ca: 'Successions i Progressions' })
  const desc = tr({
    es: 'Sucesiones para la ESO y Bachillerato: progresiones aritméticas y geométricas, término n-ésimo, término general y suma de términos. Juego Sigue la Serie, examen con el juego y examen de teoría.',
    en: 'Sequences for secondary and sixth form: arithmetic and geometric sequences, nth term, general term and sum of terms. The Next in Line game, an exam with the game and a theory exam.',
    ca: 'Successions per a l’ESO i Batxillerat: progressions aritmètiques i geomètriques, terme n-èsim, terme general i suma de termes. Joc Segueix la Sèrie, examen amb el joc i examen de teoria.',
  })

  const opciones = [
    {
      to: '/juegos/sigue-serie', emoji: '🐚', gradient: 'from-pink-500 to-rose-700',
      titulo: tr({ es: 'Sigue la Serie (juego)', en: 'Next in Line (game)', ca: 'Segueix la Sèrie (joc)' }),
      descripcion: tr({ es: 'Qué número sigue, figuras de puntos que crecen, el término 100, el término general y la suma, contra reloj.', en: 'What comes next, growing dot patterns, term 100, the general term and the sum, against the clock.', ca: 'Quin nombre segueix, figures de punts que creixen, el terme 100, el terme general i la suma, contra rellotge.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '60 segundos', en: '60 seconds', ca: '60 segons' }), tr({ es: 'Ranking', en: 'Leaderboard', ca: 'Rànquing' })],
    },
    {
      to: '/examen/sigue-serie-test', emoji: '🐚', gradient: 'from-rose-500 to-fuchsia-700',
      titulo: tr({ es: 'Sigue la Serie (examen con el juego)', en: 'Next in Line (exam with the game)', ca: 'Segueix la Sèrie (examen amb el joc)' }),
      descripcion: tr({ es: 'Las mismas preguntas, sin reloj y con nota: diez de progresiones aritméticas y geométricas.', en: 'The same questions, no timer and with a mark: ten on arithmetic and geometric sequences.', ca: 'Les mateixes preguntes, sense rellotge i amb nota: deu de progressions aritmètiques i geomètriques.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '10 preguntas', en: '10 questions', ca: '10 preguntes' }), tr({ es: 'Sin cronómetro', en: 'No timer', ca: 'Sense cronòmetre' })],
    },
    {
      to: '/examen/sucesiones', emoji: '📝', gradient: 'from-sky-500 to-indigo-700',
      titulo: tr({ es: 'Examen de teoría', en: 'Theory exam', ca: 'Examen de teoria' }),
      descripcion: tr({ es: 'Tipo test sobre sucesiones, progresiones aritméticas y geométricas, término general y sumas, con explicación en cada respuesta.', en: 'Multiple choice on sequences, arithmetic and geometric progressions, general term and sums, with an explanation for each answer.', ca: 'Tipus test sobre successions, progressions aritmètiques i geomètriques, terme general i sumes, amb explicació a cada resposta.' }),
      detalles: [tr({ es: 'Opción múltiple', en: 'Multiple choice', ca: 'Opció múltiple' }), tr({ es: 'ESO y Bachillerato', en: 'Secondary & Sixth form', ca: 'ESO i Batxillerat' }), tr({ es: 'Nota final', en: 'Final mark', ca: 'Nota final' })],
    },
  ]

  const ejemplos = [
    { cuenta: '5, 8, 11, 14…  →  aₙ = 3n + 2', que: tr({ es: 'Aritmética: d = 3 y a₁ = 5', en: 'Arithmetic: d = 3 and a₁ = 5', ca: 'Aritmètica: d = 3 i a₁ = 5' }) },
    { cuenta: 'a₁₀₀ = 5 + 99 · 3 = 302', que: tr({ es: 'Del primero al centésimo hay 99 saltos', en: 'From the first to the hundredth there are 99 steps', ca: 'Del primer al centèsim hi ha 99 salts' }) },
    { cuenta: '2, 6, 18, 54…  →  aₙ = 2 · 3ⁿ⁻¹', que: tr({ es: 'Geométrica: r = 3 y a₁ = 2', en: 'Geometric: r = 3 and a₁ = 2', ca: 'Geomètrica: r = 3 i a₁ = 2' }) },
    { cuenta: '1 + 2 + … + 100 = (1 + 100) · 100 ÷ 2 = 5050', que: tr({ es: 'La suma de Gauss', en: 'Gauss’s sum', ca: 'La suma de Gauss' }) },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <SEOHead title={titulo} description={desc} path={PATH} />
      <CourseSchema name={titulo} description={desc} path={PATH} lang={lang} subject={tr({ es: 'Matemáticas', en: 'Mathematics', ca: 'Matemàtiques' })} />
      <BreadcrumbSchema lang={lang} items={[
        { name: tr({ es: 'Estudiar', en: 'Study', ca: 'Estudiar' }), path: '/estudiar' },
        { name: tr({ es: 'Matemáticas', en: 'Mathematics', ca: 'Matemàtiques' }), path: '/estudiar/matematicas' },
        { name: titulo, path: PATH },
      ]} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar/matematicas')} className="hover:text-white/60 transition-colors">{tr({ es: 'Matemáticas', en: 'Mathematics', ca: 'Matemàtiques' })}</Link>
          {' '}/{' '}<span className="text-white/50">{titulo}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">🐚</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{tr({ es: 'Aritméticas, geométricas, término general y suma', en: 'Arithmetic, geometric, general term and sum', ca: 'Aritmètiques, geomètriques, terme general i suma' })}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Modos disponibles', en: 'Available modes', ca: 'Modes disponibles' })}</p>
        {opciones.map(o => (
          <Link key={o.to} to={localPath(o.to)}
            className="block w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${o.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{o.emoji}</span>
                    <h2 className="font-black text-white text-xl">{o.titulo}</h2>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{o.descripcion}</p>
                  <div className="flex flex-wrap gap-2">
                    {o.detalles.map(d => <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">{d}</span>)}
                  </div>
                </div>
                <div className="shrink-0 mt-1 w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                  <span className="text-white font-black text-lg">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mt-6">
          <h2 className="text-white font-black text-lg mb-2">{tr({ es: 'Sumar siempre lo mismo o multiplicar siempre por lo mismo', en: 'Always adding the same or always multiplying by the same', ca: 'Sumar sempre el mateix o multiplicar sempre pel mateix' })}</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-2">
            {tr({
              es: 'Una sucesión es una lista ordenada de números: a₁, a₂, a₃… En una progresión aritmética cada término es el anterior más una cantidad fija, la diferencia d; en una geométrica, el anterior multiplicado por un número fijo, la razón r. Para saber cuál es, se restan dos términos seguidos (si siempre sale lo mismo, es aritmética) o se dividen (si siempre sale lo mismo, es geométrica). Hay sucesiones que no son de ningún tipo, como la de los cuadrados o la de Fibonacci.',
              en: 'A sequence is an ordered list of numbers: a₁, a₂, a₃… In an arithmetic sequence each term is the previous one plus a fixed amount, the common difference d; in a geometric one, the previous one multiplied by a fixed number, the common ratio r. To tell which it is, subtract two consecutive terms (if it always gives the same, it is arithmetic) or divide them (if it always gives the same, it is geometric). Some sequences are neither, like the squares or Fibonacci.',
              ca: 'Una successió és una llista ordenada de nombres: a₁, a₂, a₃… En una progressió aritmètica cada terme és l’anterior més una quantitat fixa, la diferència d; en una geomètrica, l’anterior multiplicat per un nombre fix, la raó r. Per saber quina és, es resten dos termes seguits (si sempre surt el mateix, és aritmètica) o es divideixen (si sempre surt el mateix, és geomètrica). Hi ha successions que no són de cap tipus, com la dels quadrats o la de Fibonacci.',
            })}
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            {tr({
              es: 'El término general da cualquier término sin calcular los anteriores: aₙ = a₁ + (n − 1)·d en las aritméticas y aₙ = a₁ · rⁿ⁻¹ en las geométricas. El error típico es olvidar el «n − 1»: del primer término al término n hay n − 1 saltos. Y para sumar los n primeros términos de una aritmética se usa el truco de Gauss: Sₙ = (a₁ + aₙ) · n ÷ 2, porque el primero más el último suma lo mismo que el segundo más el penúltimo.',
              en: 'The general term gives any term without working out the ones before: aₙ = a₁ + (n − 1)d for arithmetic sequences and aₙ = a₁ × rⁿ⁻¹ for geometric ones. The usual mistake is forgetting the “n − 1”: from the first term to term n there are n − 1 steps. To add the first n terms of an arithmetic sequence, use Gauss’s trick: Sₙ = (a₁ + aₙ) × n ÷ 2, because the first plus the last adds up to the same as the second plus the second-to-last.',
              ca: 'El terme general dona qualsevol terme sense calcular els anteriors: aₙ = a₁ + (n − 1)·d en les aritmètiques i aₙ = a₁ · rⁿ⁻¹ en les geomètriques. L’error típic és oblidar el «n − 1»: del primer terme al terme n hi ha n − 1 salts. I per sumar els n primers termes d’una aritmètica es fa servir el truc de Gauss: Sₙ = (a₁ + aₙ) · n ÷ 2, perquè el primer més l’últim suma el mateix que el segon més el penúltim.',
            })}
          </p>
          <ul className="space-y-1.5">
            {ejemplos.map(e => (
              <li key={e.cuenta} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-bold text-amber-200 tabular-nums">{e.cuenta}</span>
                <span className="text-white/55">{e.que}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
