import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import RecursosImprimibles from '../components/RecursosImprimibles'

// Página PÚBLICA de recursos: el mismo material que ve el profesor en su
// panel, pero sin cuenta ni código de beta. Es a la vez captación y producto:
//
//   · Captación — "recursos imprimibles para profesores" / "fichas para
//     imprimir" es lo que un docente busca de verdad en Google, y hasta ahora
//     Tuthor no tenía nada que ofrecer a esa búsqueda. Ver también el enlace
//     desde cada ficha de /info/juegos/:slug, que es donde vive la actividad
//     en papel de ese juego.
//   · Producto — se puede usar entero sin registrarse. Quien imprima unas
//     tarjetas y le funcionen en clase es quien luego mira qué más hay.
//
// Reutiliza <RecursosImprimibles/> tal cual: no depende de sesión ni de
// Firestore, así que la misma pieza sirve dentro y fuera del panel.

export default function Recursos() {
  const { lang, tr, localPath } = useLang()

  const metaTitle = tr({
    es: 'Recursos imprimibles para profesores',
    en: 'Printable classroom resources for teachers',
    ca: 'Recursos imprimibles per a professors',
  })
  const metaDesc = tr({
    es: 'Tarjetas listas para recortar: eventos históricos por época, países y capitales, elementos químicos, titulares verdaderos y falsos. Gratis y sin registro.',
    en: 'Cards ready to cut out: historical events by period, countries and capitals, chemical elements, real and fake headlines. Free, no sign-up.',
    ca: 'Targetes a punt per retallar: esdeveniments històrics per època, països i capitals, elements químics, titulars verdaders i falsos. Gratis i sense registre.',
  })

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead title={metaTitle} description={metaDesc} path="/recursos" lang={lang} />

      <span className="text-4xl block mb-3">🖨️</span>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{metaTitle}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed max-w-2xl mb-2">
        {tr({
          es: 'Material para llevar al aula sin pantallas: tarjetas ya escritas para recortar y repartir, y actividades en papel de cada juego de Tuthor. Se imprimen desde aquí, gratis y sin crear ninguna cuenta.',
          en: 'Material to take into a screen-free classroom: cards already written, ready to cut out and hand round, plus the paper version of every Tuthor game. Print them from here, free and with no account.',
          ca: "Material per portar a l'aula sense pantalles: targetes ja escrites per retallar i repartir, i activitats en paper de cada joc de Tuthor. S'imprimeixen des d'aquí, gratis i sense crear cap compte.",
        })}
      </p>
      <p className="text-white/35 text-[13px] mb-8">
        {tr({
          es: 'Salen de los mismos datos que usan los juegos, así que lo que se trabaja en papel y lo que se juega en pantalla es lo mismo.',
          en: 'They come from the same data the games use, so what you work on paper and what they play on screen match.',
          ca: 'Surten de les mateixes dades que fan servir els jocs, així que el que es treballa en paper i el que es juga a la pantalla és el mateix.',
        })}
      </p>

      <RecursosImprimibles />

      <div className="mt-10 rounded-2xl border border-teal-500/25 bg-teal-500/[0.06] px-5 py-5">
        <p className="text-white font-black text-base mb-1">
          {tr({ es: '¿Das clase? Tuthor tiene más', en: 'Do you teach? There\'s more in Tuthor', ca: 'Fas classe? Tuthor té més' })}
        </p>
        <p className="text-white/50 text-[13.5px] leading-relaxed mb-4 max-w-xl">
          {tr({
            es: 'Pasar lista, notas por trimestre, exámenes propios tipo test y el plano de la clase, gratis mientras dure la beta.',
            en: 'Attendance, grades by term, your own multiple-choice quizzes and the seating plan, free while the beta lasts.',
            ca: 'Passar llista, notes per trimestre, exàmens propis tipus test i el plànol de la classe, gratis mentre duri la beta.',
          })}
        </p>
        <Link to={localPath('/profesores')}
          className="inline-block px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors">
          {tr({ es: 'Ver Tuthor para profesores →', en: 'See Tuthor for teachers →', ca: 'Veure Tuthor per a professors →' })}
        </Link>
      </div>
    </div>
  )
}
