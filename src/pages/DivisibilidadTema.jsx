// /estudiar/matematicas/divisibilidad: el tema con sus formatos (el juego
// Bloques Primos, su examen y el examen de teoría) y una explicación breve de
// lo que resuelve todos los ejercicios: descomponer en primos y leer el mcd y
// el mcm de los factores. Antes la ficha del temario llevaba directa al examen
// porque solo había uno.
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const PATH = '/estudiar/matematicas/divisibilidad'

export default function DivisibilidadTema() {
  const { lang, localPath, tr } = useLang()
  const titulo = tr({ es: 'Divisibilidad', en: 'Divisibility', ca: 'Divisibilitat' })
  const desc = tr({
    es: 'Divisibilidad para Primaria y ESO: múltiplos y divisores, criterios de divisibilidad, números primos, descomposición factorial, mcd y mcm. Juego Bloques Primos, examen con el juego y examen de teoría.',
    en: 'Divisibility for primary and secondary: multiples and factors, divisibility rules, prime numbers, prime factorisation, HCF and LCM. The Prime Blocks game, an exam with the game and a theory exam.',
    ca: 'Divisibilitat per a Primària i ESO: múltiples i divisors, criteris de divisibilitat, nombres primers, descomposició factorial, mcd i mcm. Joc Blocs Primers, examen amb el joc i examen de teoria.',
  })

  const opciones = [
    {
      to: '/juegos/bloques-primos', emoji: '🧱', gradient: 'from-blue-500 to-emerald-600',
      titulo: tr({ es: 'Bloques Primos (juego)', en: 'Prime Blocks (game)', ca: 'Blocs Primers (joc)' }),
      descripcion: tr({ es: 'Cada factor primo es un bloque de color: el mcd y el mcm se ven. Criterios, primos, descomposición y problemas contra reloj.', en: 'Each prime factor is a coloured block: you can see the HCF and LCM. Rules, primes, factorisation and problems against the clock.', ca: 'Cada factor primer és un bloc de color: el mcd i el mcm es veuen. Criteris, primers, descomposició i problemes contra rellotge.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '60 segundos', en: '60 seconds', ca: '60 segons' }), tr({ es: 'Ranking', en: 'Leaderboard', ca: 'Rànquing' })],
    },
    {
      to: '/examen/bloques-primos-test', emoji: '🧱', gradient: 'from-emerald-500 to-teal-700',
      titulo: tr({ es: 'Bloques Primos (examen con el juego)', en: 'Prime Blocks (exam with the game)', ca: 'Blocs Primers (examen amb el joc)' }),
      descripcion: tr({ es: 'Las mismas preguntas, sin reloj y con nota: diez de mcd, mcm, primos y problemas.', en: 'The same questions, no timer and with a mark: ten on HCF, LCM, primes and problems.', ca: 'Les mateixes preguntes, sense rellotge i amb nota: deu de mcd, mcm, primers i problemes.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '10 preguntas', en: '10 questions', ca: '10 preguntes' }), tr({ es: 'Sin cronómetro', en: 'No timer', ca: 'Sense cronòmetre' })],
    },
    {
      to: '/examen/divisibilidad', emoji: '➗', gradient: 'from-violet-500 to-indigo-700',
      titulo: tr({ es: 'Examen de teoría', en: 'Theory exam', ca: 'Examen de teoria' }),
      descripcion: tr({ es: 'Tipo test sobre múltiplos y divisores, criterios, números primos, mcd y mcm, con explicación en cada respuesta.', en: 'Multiple choice on multiples and factors, rules, primes, HCF and LCM, with an explanation for each answer.', ca: 'Tipus test sobre múltiples i divisors, criteris, nombres primers, mcd i mcm, amb explicació a cada resposta.' }),
      detalles: [tr({ es: 'Opción múltiple', en: 'Multiple choice', ca: 'Opció múltiple' }), tr({ es: 'Primaria y ESO', en: 'Primary & Secondary', ca: 'Primària i ESO' }), tr({ es: 'Nota final', en: 'Final mark', ca: 'Nota final' })],
    },
  ]

  const criterios = [
    ['2', tr({ es: 'acaba en cifra par', en: 'ends in an even digit', ca: 'acaba en xifra parella' })],
    ['3', tr({ es: 'la suma de sus cifras es múltiplo de 3', en: 'its digits add up to a multiple of 3', ca: 'la suma de les xifres és múltiple de 3' })],
    ['4', tr({ es: 'sus dos últimas cifras son múltiplo de 4', en: 'its last two digits are a multiple of 4', ca: 'les dues últimes xifres són múltiple de 4' })],
    ['5', tr({ es: 'acaba en 0 o en 5', en: 'ends in 0 or 5', ca: 'acaba en 0 o en 5' })],
    ['9', tr({ es: 'la suma de sus cifras es múltiplo de 9', en: 'its digits add up to a multiple of 9', ca: 'la suma de les xifres és múltiple de 9' })],
    ['10', tr({ es: 'acaba en 0', en: 'ends in 0', ca: 'acaba en 0' })],
  ]

  const ejemplos = [
    { cuenta: '60 = 2² · 3 · 5', que: tr({ es: 'Descomponer: 60 : 2 → 30 : 2 → 15 : 3 → 5 : 5 → 1', en: 'Factorise: 60 ÷ 2 → 30 ÷ 2 → 15 ÷ 3 → 5 ÷ 5 → 1', ca: 'Descompondre: 60 : 2 → 30 : 2 → 15 : 3 → 5 : 5 → 1' }) },
    { cuenta: tr({ es: 'mcd(12, 18) = 2 · 3 = 6', en: 'HCF(12, 18) = 2 · 3 = 6', ca: 'mcd(12, 18) = 2 · 3 = 6' }), que: tr({ es: '12 = 2² · 3 y 18 = 2 · 3²: comunes, con el menor exponente', en: '12 = 2² · 3 and 18 = 2 · 3²: common factors, lowest power', ca: '12 = 2² · 3 i 18 = 2 · 3²: comuns, amb l’exponent més petit' }) },
    { cuenta: tr({ es: 'mcm(12, 18) = 2² · 3² = 36', en: 'LCM(12, 18) = 2² · 3² = 36', ca: 'mcm(12, 18) = 2² · 3² = 36' }), que: tr({ es: 'Todos los factores, con el mayor exponente', en: 'All factors, highest power', ca: 'Tots els factors, amb l’exponent més gran' }) },
    { cuenta: '6 × 36 = 12 × 18 = 216', que: tr({ es: 'Comprobación: mcd × mcm = el producto de los dos números', en: 'Check: HCF × LCM = the product of the two numbers', ca: 'Comprovació: mcd × mcm = el producte dels dos nombres' }) },
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
          <span className="text-5xl">➗</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{tr({ es: 'Múltiplos, divisores, primos, mcd y mcm', en: 'Multiples, factors, primes, HCF and LCM', ca: 'Múltiples, divisors, primers, mcd i mcm' })}</p>
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
          <h2 className="text-white font-black text-lg mb-2">{tr({ es: 'Todo empieza por descomponer en primos', en: 'It all starts with prime factorisation', ca: 'Tot comença per descompondre en primers' })}</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-2">
            {tr({
              es: 'Un número es múltiplo de otro si lo contiene un número exacto de veces (24 es múltiplo de 6), y divisor si lo divide sin resto (6 es divisor de 24). Los números primos son los que solo tienen dos divisores, el 1 y ellos mismos: 2, 3, 5, 7, 11, 13… Todos los demás se pueden escribir, de una sola manera, como una multiplicación de primos. Para encontrarla se divide entre primos de menor a mayor hasta llegar a 1.',
              en: 'A number is a multiple of another if it contains it an exact number of times (24 is a multiple of 6), and a factor if it divides it with no remainder (6 is a factor of 24). Prime numbers have only two factors, 1 and themselves: 2, 3, 5, 7, 11, 13… Every other number can be written, in only one way, as a product of primes. To find it, divide by primes from smallest to largest until you reach 1.',
              ca: 'Un nombre és múltiple d’un altre si el conté un nombre exacte de vegades (24 és múltiple de 6), i divisor si el divideix sense residu (6 és divisor de 24). Els nombres primers són els que només tenen dos divisors, l’1 i ells mateixos: 2, 3, 5, 7, 11, 13… Tots els altres es poden escriure, d’una sola manera, com una multiplicació de primers. Per trobar-la es divideix entre primers de menor a major fins a arribar a 1.',
            })}
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            {tr({
              es: 'Con la descomposición, el mcd y el mcm salen solos. El máximo común divisor se forma con los factores comunes elevados al menor exponente: tiene que caber en los dos números. El mínimo común múltiplo se forma con todos los factores, comunes y no comunes, elevados al mayor exponente: tiene que contener a los dos. En los problemas, si algo «vuelve a coincidir» se busca un mcm; si hay que partir o repartir en partes iguales lo más grandes posible, un mcd.',
              en: 'With the factorisation, the HCF and LCM come straight out. The highest common factor uses the common factors with the lowest power: it has to fit into both numbers. The lowest common multiple uses every factor, common or not, with the highest power: it has to contain both. In word problems, if things “coincide again” you need an LCM; if you cut or share into equal parts as big as possible, an HCF.',
              ca: 'Amb la descomposició, el mcd i el mcm surten sols. El màxim comú divisor es forma amb els factors comuns elevats a l’exponent més petit: ha de cabre en tots dos nombres. El mínim comú múltiple es forma amb tots els factors, comuns i no comuns, elevats a l’exponent més gran: ha de contenir-los tots dos. Als problemes, si una cosa «torna a coincidir» es busca un mcm; si cal partir o repartir en parts iguals tan grans com es pugui, un mcd.',
            })}
          </p>
          <ul className="space-y-1.5 mb-4">
            {ejemplos.map(e => (
              <li key={e.cuenta} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-bold text-amber-200 tabular-nums">{e.cuenta}</span>
                <span className="text-white/55">{e.que}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-white font-bold text-sm mb-1.5">{tr({ es: 'Criterios de divisibilidad', en: 'Divisibility rules', ca: 'Criteris de divisibilitat' })}</h3>
          <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
            {criterios.map(([d, c]) => (
              <li key={d} className="text-sm text-white/65">
                <b className="text-white">{tr({ es: `Entre ${d}:`, en: `By ${d}:`, ca: `Entre ${d}:` })}</b> {c}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
