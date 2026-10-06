// /estudiar/matematicas/porcentajes: el tema de porcentajes con sus formatos
// (el juego Rebajas, su examen y el examen de teoría) y una explicación breve
// del método del multiplicador, que es lo que resuelve todos los casos. Antes
// la ficha del temario llevaba directa al examen porque solo había uno.
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import CourseSchema from '../components/CourseSchema'
import BreadcrumbSchema from '../components/BreadcrumbSchema'

const PATH = '/estudiar/matematicas/porcentajes'

export default function PorcentajesTema() {
  const { lang, localPath, tr } = useLang()
  const titulo = tr({ es: 'Proporcionalidad y Porcentajes', en: 'Proportion and Percentages', ca: 'Proporcionalitat i Percentatges' })
  const desc = tr({
    es: 'Porcentajes para Primaria y ESO: descuentos, IVA, aumentos y rebajas encadenadas con el método del multiplicador. Juego de rebajas, examen con la mecánica del juego y examen de teoría.',
    en: 'Percentages for primary and secondary: discounts, VAT, increases and chained sales with the multiplier method. A sales game, an exam with the game mechanic and a theory exam.',
    ca: 'Percentatges per a Primària i ESO: descomptes, IVA, augments i rebaixes encadenades amb el mètode del multiplicador. Joc de rebaixes, examen amb la mecànica del joc i examen de teoria.',
  })

  const opciones = [
    {
      to: '/juegos/rebajas', emoji: '🛍️', gradient: 'from-rose-500 to-orange-600',
      titulo: tr({ es: 'Rebajas (juego)', en: 'Sale! (game)', ca: 'Rebaixes (joc)' }),
      descripcion: tr({ es: 'Etiquetas de tienda contra reloj: cuánto pagas, qué % es, el IVA, el precio de antes y ofertas como el 3×2.', en: 'Shop tags against the clock: what you pay, what % it is, VAT, the old price and deals like 3 for 2.', ca: 'Etiquetes de botiga contra rellotge: quant pagues, quin % és, l’IVA, el preu d’abans i ofertes com el 3×2.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '60 segundos', en: '60 seconds', ca: '60 segons' }), tr({ es: 'Ranking', en: 'Leaderboard', ca: 'Rànquing' })],
    },
    {
      to: '/examen/rebajas-test', emoji: '🛍️', gradient: 'from-orange-500 to-amber-600',
      titulo: tr({ es: 'Rebajas (examen con el juego)', en: 'Sale! (exam with the game)', ca: 'Rebaixes (examen amb el joc)' }),
      descripcion: tr({ es: 'Las mismas etiquetas, sin reloj y con nota: diez preguntas de porcentajes de la vida real.', en: 'The same tags, no timer and with a mark: ten real-life percentage questions.', ca: 'Les mateixes etiquetes, sense rellotge i amb nota: deu preguntes de percentatges de la vida real.' }),
      detalles: [tr({ es: '3 niveles', en: '3 levels', ca: '3 nivells' }), tr({ es: '10 preguntas', en: '10 questions', ca: '10 preguntes' }), tr({ es: 'Sin cronómetro', en: 'No timer', ca: 'Sense cronòmetre' })],
    },
    {
      to: '/examen/porcentajes', emoji: '💯', gradient: 'from-emerald-500 to-teal-700',
      titulo: tr({ es: 'Examen de teoría', en: 'Theory exam', ca: 'Examen de teoria' }),
      descripcion: tr({ es: 'Tipo test sobre porcentajes, regla de tres, proporcionalidad directa e inversa y escalas, con explicación en cada respuesta.', en: 'Multiple choice on percentages, the rule of three, direct and inverse proportion and scales, with an explanation for each answer.', ca: 'Tipus test sobre percentatges, regla de tres, proporcionalitat directa i inversa i escales, amb explicació a cada resposta.' }),
      detalles: [tr({ es: 'Opción múltiple', en: 'Multiple choice', ca: 'Opció múltiple' }), tr({ es: 'Primaria y ESO', en: 'Primary & Secondary', ca: 'Primària i ESO' }), tr({ es: 'Nota final', en: 'Final mark', ca: 'Nota final' })],
    },
  ]

  // El método, con ejemplos resueltos: es el texto propio de la página.
  const ejemplos = [
    { cuenta: tr({ es: '40 € × 0,75 = 30 €', en: '€40 × 0.75 = €30', ca: '40 € × 0,75 = 30 €' }),
      que: tr({ es: '25 % de descuento: pagas el 75 %', en: '25% off: you pay 75%', ca: '25 % de descompte: pagues el 75 %' }) },
    { cuenta: tr({ es: '50 € × 1,21 = 60,50 €', en: '€50 × 1.21 = €60.50', ca: '50 € × 1,21 = 60,50 €' }),
      que: tr({ es: 'Sumar el 21 % de IVA', en: 'Adding 21% VAT', ca: 'Sumar el 21 % d’IVA' }) },
    { cuenta: tr({ es: '45 € ÷ 0,75 = 60 €', en: '€45 ÷ 0.75 = €60', ca: '45 € ÷ 0,75 = 60 €' }),
      que: tr({ es: 'Pagaste 45 € con un 25 % de descuento: ¿cuánto costaba?', en: 'You paid €45 with 25% off: what was the price?', ca: 'Vas pagar 45 € amb un 25 % de descompte: quant costava?' }) },
    { cuenta: tr({ es: '50 € × 1,2 × 0,8 = 48 €', en: '€50 × 1.2 × 0.8 = €48', ca: '50 € × 1,2 × 0,8 = 48 €' }),
      que: tr({ es: 'Sube un 20 % y luego baja un 20 %: no vuelve a 50 €', en: 'Up 20% then down 20%: it does not go back to €50', ca: 'Puja un 20 % i després baixa un 20 %: no torna a 50 €' }) },
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
          <span className="text-5xl">💯</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{titulo}</h1>
            <p className="text-white/40 text-sm mt-0.5">{tr({ es: 'Descuentos, IVA, aumentos y regla de tres', en: 'Discounts, VAT, increases and the rule of three', ca: 'Descomptes, IVA, augments i regla de tres' })}</p>
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
          <h2 className="text-white font-black text-lg mb-2">{tr({ es: 'El truco: multiplicar, no sumar ni restar', en: 'The trick: multiply, don’t add or subtract', ca: 'El truc: multiplicar, no sumar ni restar' })}</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-2">
            {tr({
              es: 'Un porcentaje es una fracción con denominador 100: el 25 % son 25 de cada 100, es decir, 0,25. Casi todos los errores con porcentajes vienen de sumar o restar el porcentaje como si fueran euros. Es mucho más seguro convertir cada cambio en un multiplicador: bajar un 25 % es quedarse con el 75 %, o sea, multiplicar por 0,75; subir un 21 % es multiplicar por 1,21.',
              en: 'A percentage is a fraction over 100: 25% is 25 out of every 100, that is, 0.25. Almost every percentage mistake comes from adding or subtracting the percentage as if it were euros. It is much safer to turn each change into a multiplier: going down 25% means keeping 75%, so multiplying by 0.75; going up 21% means multiplying by 1.21.',
              ca: 'Un percentatge és una fracció amb denominador 100: el 25 % són 25 de cada 100, és a dir, 0,25. Gairebé tots els errors amb percentatges vénen de sumar o restar el percentatge com si fossin euros. És molt més segur convertir cada canvi en un multiplicador: baixar un 25 % és quedar-se amb el 75 %, o sigui, multiplicar per 0,75; pujar un 21 % és multiplicar per 1,21.',
            })}
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            {tr({
              es: 'Con el multiplicador salen también los casos que más se confunden: para saber el precio de antes de una rebaja se divide entre el multiplicador, y los cambios seguidos se multiplican uno detrás de otro. Por eso un 20 % de descuento más un 10 % extra es un 28 % y no un 30 %, y subir y bajar el mismo porcentaje siempre deja el precio por debajo del inicial.',
              en: 'The multiplier also solves the cases people mix up most: to find the price before a sale you divide by the multiplier, and successive changes are multiplied one after another. That is why 20% off plus an extra 10% is 28%, not 30%, and going up and down by the same percentage always leaves the price below where it started.',
              ca: 'Amb el multiplicador surten també els casos que més es confonen: per saber el preu d’abans d’una rebaixa es divideix pel multiplicador, i els canvis seguits es multipliquen l’un darrere l’altre. Per això un 20 % de descompte més un 10 % extra és un 28 % i no un 30 %, i pujar i baixar el mateix percentatge sempre deixa el preu per sota de l’inicial.',
            })}
          </p>
          <ul className="space-y-1.5">
            {ejemplos.map(e => (
              <li key={e.cuenta} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="text-white/55">{e.que}</span>
                <span className="font-bold text-amber-200 tabular-nums">{e.cuenta}</span>
              </li>
            ))}
          </ul>
          <p className="text-white/50 text-xs mt-3">
            {tr({ es: '¿Tienes un ejercicio concreto? ', en: 'Got a specific exercise? ', ca: 'Tens un exercici concret? ' })}
            <Link to={localPath('/recursos/porcentajes')} className="text-teal-300 font-bold hover:underline">{tr({ es: 'Calculadora de porcentajes paso a paso', en: 'Step-by-step percentage calculator', ca: 'Calculadora de percentatges pas a pas' })}</Link>
          </p>
        </section>
      </div>
    </div>
  )
}
