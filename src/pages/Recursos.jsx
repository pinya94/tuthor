import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import RecursosImprimibles from '../components/RecursosImprimibles'
import RecursosInteractivos from '../components/RecursosInteractivos'

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

  // Antes "Recursos imprimibles para profesores": un alumno que llegaba desde
  // un recurso interactivo leía que la página no era para él.
  const metaTitle = tr({
    es: 'Recursos gratis para estudiar y dar clase',
    en: 'Free resources for students and teachers',
    ca: 'Recursos gratis per estudiar i fer classe',
  })
  const metaDesc = tr({
    es: 'Ejercicios de funciones, ecuaciones y estadística resueltos paso a paso, el sistema solar y el globo terráqueo en 3D, y tarjetas para imprimir. Gratis y sin registro.',
    en: 'Function, equation and statistics exercises solved step by step, the solar system and the globe in 3D, and printable cards. Free, no sign-up.',
    ca: 'Targetes a punt per retallar: esdeveniments històrics per època, països i capitals, elements químics, titulars verdaders i falsos. Gratis i sense registre.',
  })

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SEOHead title={metaTitle} description={metaDesc} path="/recursos" lang={lang} />

      <span className="text-4xl block mb-3">🧰</span>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{metaTitle}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed max-w-2xl mb-8">
        {tr({
          es: 'Herramientas para usar ahora mismo con tu propio ejercicio, y material ya hecho para llevar al aula. Todo gratis y sin crear ninguna cuenta.',
          en: 'Tools to use right now with your own exercise, and ready-made material to take into class. All free, with no account.',
          ca: "Eines per fer servir ara mateix amb el teu propi exercici, i material ja fet per portar a l'aula. Tot gratis i sense crear cap compte.",
        })}
      </p>

      {/* Dos secciones y no una lista: los interactivos son para quien tiene un
          ejercicio delante (casi siempre un alumno) y los imprimibles para quien
          prepara una clase. Cada uno tiene que encontrar lo suyo sin leer lo
          del otro. */}
      <section className="mb-12">
        <h2 className="text-white font-black text-xl mb-1">🧮 {tr({ es: 'Para resolver tus ejercicios', en: 'To solve your exercises', ca: 'Per resoldre els teus exercicis' })}</h2>
        <p className="text-white/45 text-[13.5px] mb-4 max-w-2xl">
          {tr({ es: 'Escribe tu ejercicio y se resuelve paso a paso, o explora en 3D.', en: 'Type your exercise and it is solved step by step, or explore in 3D.', ca: 'Escriu el teu exercici i es resol pas a pas, o explora en 3D.' })}
        </p>
        <RecursosInteractivos />
      </section>

      <h2 className="text-white font-black text-xl mb-1">🖨️ {tr({ es: 'Para imprimir y llevar a clase', en: 'To print and take to class', ca: 'Per imprimir i portar a classe' })}</h2>
      <p className="text-white/45 text-[13.5px] mb-4 max-w-2xl">
        {tr({
          es: 'Tarjetas ya escritas para recortar y repartir, y la versión en papel de cada juego de Tuthor. Salen de los mismos datos que usan los juegos.',
          en: 'Cards already written, ready to cut out and hand round, plus the paper version of every Tuthor game. They come from the same data the games use.',
          ca: 'Targetes ja escrites per retallar i repartir, i la versió en paper de cada joc de Tuthor. Surten de les mateixes dades que fan servir els jocs.',
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
