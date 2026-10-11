// /estudiar/matematicas/potencias: el tema con sus formatos (el juego Escala
// del Universo, su examen y el examen de teoría) y una explicación breve de
// las propiedades y la notación científica. Antes la ficha del temario
// llevaba directa al examen porque solo había uno.
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const PATH = '/estudiar/matematicas/potencias'

export default function PotenciasTema() {
  const { lang, localPath, tr } = useLang()
  const titulo = tr({ es: 'Potencias y Notación Científica', en: 'Powers and Scientific Notation', ca: 'Potències i Notació Científica' })
  const desc = tr({
    es: 'Potencias y notación científica para la ESO: propiedades de las potencias, exponente cero y negativo, escribir, comparar y operar en notación científica. Juego Escala del Universo, examen con el juego y examen de teoría.',
    en: 'Powers and scientific notation for secondary: laws of indices, zero and negative exponents, writing, comparing and calculating in scientific notation. The Universe Scale game, an exam with the game and a theory exam.',
    ca: 'Potències i notació científica per a l’ESO: propietats de les potències, exponent zero i negatiu, escriure, comparar i operar en notació científica. Joc Escala de l’Univers, examen amb el joc i examen de teoria.',
  })

  const opciones = [
    {
      to: '/juegos/escala-universo', emoji: '🔭', gradient: 'from-indigo-500 to-violet-700',
      titulo: tr({ es: 'Escala del Universo (juego)', en: 'Universe Scale (game)', ca: 'Escala de l’Univers (joc)' }),
      descripcion: tr({ es: 'Del átomo a la Vía Láctea en una regla de potencias de 10: notación científica, comparar tamaños y propiedades contra reloj.', en: 'From the atom to the Milky Way on a powers-of-10 ruler: scientific notation, comparing sizes and laws of indices against the clock.', ca: 'De l’àtom a la Via Làctia en un regle de potències de 10: notació científica, comparar mides i propietats contra rellotge.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '60 segundos', en: '60 seconds', ca: '60 segons' }), tr({ es: 'Ranking', en: 'Leaderboard', ca: 'Rànquing' })],
    },
    {
      to: '/examen/escala-universo-test', emoji: '🔭', gradient: 'from-violet-500 to-fuchsia-700',
      titulo: tr({ es: 'Escala del Universo (examen con el juego)', en: 'Universe Scale (exam with the game)', ca: 'Escala de l’Univers (examen amb el joc)' }),
      descripcion: tr({ es: 'Las mismas preguntas, sin reloj y con nota: diez de notación científica y propiedades de las potencias.', en: 'The same questions, no timer and with a mark: ten on scientific notation and laws of indices.', ca: 'Les mateixes preguntes, sense rellotge i amb nota: deu de notació científica i propietats de les potències.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '10 preguntas', en: '10 questions', ca: '10 preguntes' }), tr({ es: 'Sin cronómetro', en: 'No timer', ca: 'Sense cronòmetre' })],
    },
    {
      to: '/examen/potencias', emoji: '📝', gradient: 'from-sky-500 to-indigo-700',
      titulo: tr({ es: 'Examen de teoría', en: 'Theory exam', ca: 'Examen de teoria' }),
      descripcion: tr({ es: 'Tipo test sobre potencias, sus propiedades, raíces y notación científica, con explicación en cada respuesta.', en: 'Multiple choice on powers, their laws, roots and scientific notation, with an explanation for each answer.', ca: 'Tipus test sobre potències, les seves propietats, arrels i notació científica, amb explicació a cada resposta.' }),
      detalles: [tr({ es: 'Opción múltiple', en: 'Multiple choice', ca: 'Opció múltiple' }), tr({ es: 'Primaria y ESO', en: 'Primary & Secondary', ca: 'Primària i ESO' }), tr({ es: 'Nota final', en: 'Final mark', ca: 'Nota final' })],
    },
  ]

  const ejemplos = [
    { cuenta: '2⁵ · 2³ = 2⁸', que: tr({ es: 'Misma base al multiplicar: se suman los exponentes', en: 'Same base, multiplying: add the exponents', ca: 'Mateixa base en multiplicar: se sumen els exponents' }) },
    { cuenta: '(3²)⁴ = 3⁸', que: tr({ es: 'Potencia de una potencia: se multiplican', en: 'Power of a power: multiply them', ca: 'Potència d’una potència: es multipliquen' }) },
    { cuenta: '5⁻² = 1/25', que: tr({ es: 'Exponente negativo: el inverso, no un número negativo', en: 'Negative exponent: the reciprocal, not a negative number', ca: 'Exponent negatiu: l’invers, no un nombre negatiu' }) },
    { cuenta: tr({ es: '384 000 000 m = 3,84 · 10⁸ m', en: '384,000,000 m = 3.84 × 10⁸ m', ca: '384 000 000 m = 3,84 · 10⁸ m' }), que: tr({ es: 'La distancia de la Tierra a la Luna en notación científica', en: 'The Earth–Moon distance in scientific notation', ca: 'La distància de la Terra a la Lluna en notació científica' }) },
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
          <span className="text-5xl">🔭</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{tr({ es: 'Propiedades, exponentes negativos y notación científica', en: 'Laws of indices, negative exponents and scientific notation', ca: 'Propietats, exponents negatius i notació científica' })}</p>
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
          <h2 className="text-white font-black text-lg mb-2">{tr({ es: 'Tres reglas y una forma de escribir', en: 'Three rules and one way of writing', ca: 'Tres regles i una manera d’escriure' })}</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-2">
            {tr({
              es: 'Una potencia es una multiplicación repetida: 2⁵ = 2 · 2 · 2 · 2 · 2. De ahí salen sus propiedades. Si se multiplican potencias de la misma base, se juntan todos los factores y se suman los exponentes; si se dividen, se simplifican y se restan; y si se eleva una potencia a otra, se multiplican. Dividir una potencia entre sí misma explica por qué a⁰ = 1, y seguir restando explica que a⁻ⁿ sea 1/aⁿ: un exponente negativo da un número pequeño, nunca uno negativo.',
              en: 'A power is repeated multiplication: 2⁵ = 2 × 2 × 2 × 2 × 2. Its rules come from that. Multiplying powers with the same base puts all the factors together, so the exponents add; dividing cancels them, so they subtract; raising a power to a power multiplies them. Dividing a power by itself explains why a⁰ = 1, and carrying on subtracting explains why a⁻ⁿ is 1/aⁿ: a negative exponent gives a small number, never a negative one.',
              ca: 'Una potència és una multiplicació repetida: 2⁵ = 2 · 2 · 2 · 2 · 2. D’aquí surten les seves propietats. Si es multipliquen potències de la mateixa base, s’ajunten tots els factors i se sumen els exponents; si es divideixen, se simplifiquen i es resten; i si s’eleva una potència a una altra, es multipliquen. Dividir una potència entre si mateixa explica per què a⁰ = 1, i continuar restant explica que a⁻ⁿ sigui 1/aⁿ: un exponent negatiu dona un nombre petit, mai un de negatiu.',
            })}
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            {tr({
              es: 'La notación científica sirve para escribir números muy grandes o muy pequeños: una cifra distinta de cero antes de la coma, multiplicada por una potencia de 10. El exponente dice cuántos lugares se ha movido la coma: positivo si el número es grande y negativo si es menor que 1. Para comparar dos números se mira primero el exponente; para multiplicarlos se multiplican las mantisas y se suman los exponentes, y si la mantisa pasa de 10 se corrige.',
              en: 'Scientific notation is for writing very large or very small numbers: one non-zero digit before the point, multiplied by a power of 10. The exponent says how many places the point has moved: positive if the number is large and negative if it is less than 1. To compare two numbers, look at the exponent first; to multiply them, multiply the leading numbers and add the exponents, and if the leading number goes over 10, adjust it.',
              ca: 'La notació científica serveix per escriure nombres molt grans o molt petits: una xifra diferent de zero abans de la coma, multiplicada per una potència de 10. L’exponent diu quants llocs s’ha mogut la coma: positiu si el nombre és gran i negatiu si és menor que 1. Per comparar dos nombres es mira primer l’exponent; per multiplicar-los es multipliquen les mantisses i se sumen els exponents, i si la mantissa passa de 10 es corregeix.',
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
