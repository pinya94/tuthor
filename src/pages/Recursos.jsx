import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'
import RecursosImprimibles from '../components/RecursosImprimibles'
import RecursosInteractivos from '../components/RecursosInteractivos'
import { RECURSOS_INTERACTIVOS } from '../lib/recursosInteractivos'
import { IMPRIMIBLE_IDS } from '../lib/materialImprimible'

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
//
// Diseño (rehecho en septiembre de 2026 porque "tiene que ser clara"): todo va
// sobre paneles OPACOS. El fondo de la app es un bosque animado con
// luciérnagas, y las tarjetas translúcidas de antes dejaban el texto encima de
// las luces. Arriba, tres accesos que dicen qué hay y bajan a su bloque; cada
// bloque tiene un número, un título corto y una sola frase.

const PANEL = 'rounded-3xl border border-white/10 bg-[#0b1120]/95 shadow-xl shadow-black/40'

function irA(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Bloque({ id, numero, titulo, frase, children }) {
  return (
    <section id={id} className={`${PANEL} p-5 sm:p-8 scroll-mt-20`}>
      <div className="flex items-start gap-3 mb-6">
        <span className="w-8 h-8 shrink-0 rounded-full bg-white/10 text-white font-black text-sm grid place-items-center mt-0.5">{numero}</span>
        <div>
          <h2 className="text-white font-black text-xl sm:text-2xl leading-tight">{titulo}</h2>
          <p className="text-white/60 text-[14.5px] mt-1">{frase}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

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
    ca: "Exercicis de funcions, equacions i estadística resolts pas a pas, el sistema solar i el globus terraqüi en 3D, i targetes per imprimir. Gratis i sense registre.",
  })

  const cuantos = tipo => RECURSOS_INTERACTIVOS.filter(r => r.tipo === tipo).length
  const ACCESOS = [
    {
      id: 'resolver', emoji: '🧮', acento: 'hover:border-sky-400/50',
      titulo: tr({ es: 'Resolver un ejercicio', en: 'Solve an exercise', ca: 'Resoldre un exercici' }),
      texto: tr({ es: 'Funciones, ecuaciones y estadística', en: 'Functions, equations and statistics', ca: 'Funcions, equacions i estadística' }),
      n: cuantos('resolver'), unidad: tr({ es: 'herramientas', en: 'tools', ca: 'eines' }),
    },
    {
      id: 'explorar', emoji: '🔭', acento: 'hover:border-violet-400/50',
      titulo: tr({ es: 'Explorar en 3D', en: 'Explore in 3D', ca: 'Explorar en 3D' }),
      texto: tr({ es: 'El sistema solar y la Tierra', en: 'The solar system and the Earth', ca: 'El sistema solar i la Terra' }),
      n: cuantos('explorar'), unidad: tr({ es: 'modelos', en: 'models', ca: 'models' }),
    },
    {
      id: 'imprimir', emoji: '🖨️', acento: 'hover:border-teal-400/50',
      titulo: tr({ es: 'Imprimir para clase', en: 'Print for class', ca: 'Imprimir per a classe' }),
      texto: tr({ es: 'Tarjetas listas para recortar', en: 'Cards ready to cut out', ca: 'Targetes a punt per retallar' }),
      n: IMPRIMIBLE_IDS.length, unidad: tr({ es: 'juegos de tarjetas', en: 'card sets', ca: 'jocs de targetes' }),
    },
  ]

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <SEOHead title={metaTitle} description={metaDesc} path="/recursos" lang={lang} />

      <header className={`${PANEL} p-6 sm:p-10`}>
        <p className="inline-flex items-center gap-2 text-[12px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-400/25 rounded-full px-3 py-1 mb-4">
          <span aria-hidden="true">✓</span>
          {tr({ es: 'Gratis y sin registro', en: 'Free, no sign-up', ca: 'Gratis i sense registre' })}
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight max-w-3xl">
          {tr({ es: 'Recursos para estudiar y dar clase', en: 'Resources for studying and teaching', ca: 'Recursos per estudiar i fer classe' })}
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mt-3">
          {tr({
            es: '¿Qué necesitas hoy? Elige y vas directo.',
            en: 'What do you need today? Pick one and go straight there.',
            ca: 'Què necessites avui? Tria i hi vas directe.',
          })}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
          {ACCESOS.map(a => (
            <button key={a.id} type="button" onClick={() => irA(a.id)}
              className={`group text-left flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-4 transition-colors ${a.acento}`}>
              <span className="text-3xl shrink-0" aria-hidden="true">{a.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-white font-black text-[15.5px] leading-tight">{a.titulo}</span>
                <span className="block text-white/55 text-[13px] mt-0.5">{a.texto}</span>
                <span className="block text-white/40 text-[12px] mt-1 font-semibold">{a.n} {a.unidad}</span>
              </span>
              <span className="text-white/40 group-hover:text-white text-lg transition-colors" aria-hidden="true">↓</span>
            </button>
          ))}
        </div>
      </header>

      {/* Tres bloques y no una lista: quien tiene un ejercicio delante (casi
          siempre un alumno) y quien prepara una clase tienen que encontrar lo
          suyo sin leer lo del otro. */}
      <Bloque id="resolver" numero="1"
        titulo={tr({ es: 'Resuelve tu ejercicio', en: 'Solve your exercise', ca: 'Resol el teu exercici' })}
        frase={tr({ es: 'Escribe los datos de tu libro y lo ves resuelto paso a paso.', en: 'Type in the data from your book and see it solved step by step.', ca: 'Escriu les dades del teu llibre i el veus resolt pas a pas.' })}>
        <RecursosInteractivos destacado tipo="resolver" />
      </Bloque>

      <Bloque id="explorar" numero="2"
        titulo={tr({ es: 'Explora en 3D', en: 'Explore in 3D', ca: 'Explora en 3D' })}
        frase={tr({ es: 'Gíralos, acércate y toca para ver los datos.', en: 'Rotate them, zoom in and tap to see the facts.', ca: "Gira'ls, apropa't i toca per veure les dades." })}>
        <RecursosInteractivos destacado tipo="explorar" />
      </Bloque>

      <Bloque id="imprimir" numero="3"
        titulo={tr({ es: 'Imprime para clase', en: 'Print for class', ca: 'Imprimeix per a classe' })}
        frase={tr({ es: 'Tarjetas ya escritas para recortar y repartir, e ideas para llevar cada juego al papel.', en: 'Cards already written to cut out and hand round, and ideas for taking each game to paper.', ca: 'Targetes ja escrites per retallar i repartir, i idees per portar cada joc al paper.' })}>
        <RecursosImprimibles />
      </Bloque>

      <aside className={`${PANEL} p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5`}>
        <span className="text-4xl" aria-hidden="true">🍎</span>
        <div className="flex-1">
          <p className="text-white font-black text-lg">
            {tr({ es: '¿Das clase? Tuthor tiene más', en: 'Do you teach? There\'s more in Tuthor', ca: 'Fas classe? Tuthor té més' })}
          </p>
          <p className="text-white/65 text-[14.5px] leading-relaxed mt-1 max-w-xl">
            {tr({
              es: 'Pasar lista, notas por trimestre, exámenes propios tipo test y el plano de la clase, gratis mientras dure la beta.',
              en: 'Attendance, grades by term, your own multiple-choice quizzes and the seating plan, free while the beta lasts.',
              ca: 'Passar llista, notes per trimestre, exàmens propis tipus test i el plànol de la classe, gratis mentre duri la beta.',
            })}
          </p>
        </div>
        <Link to={localPath('/profesores')}
          className="shrink-0 text-center px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors">
          {tr({ es: 'Ver Tuthor para profesores →', en: 'See Tuthor for teachers →', ca: 'Veure Tuthor per a professors →' })}
        </Link>
      </aside>
    </div>
  )
}
