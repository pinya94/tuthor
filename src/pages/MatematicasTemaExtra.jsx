import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import ContenidoTema, { contenidoMeta } from '../components/ContenidoTema'

// Páginas de estudio de matemáticas fuera del motor de MODOS (no son una
// operación con niveles): /estudiar/matematicas/<slug>. El contenido está en
// data/temaMatematicas.js; aquí, el nombre corto y qué se ofrece para practicar.
const BASE = '/estudiar/matematicas'
const T3 = (es, en, ca) => ({ es, en, ca })
const TEMAS = {
  'numeros-romanos': {
    emoji: '🏛️', nombre: T3('Números romanos', 'Roman numerals', 'Nombres romans'),
    modos: [
      { to: '/juegos/numeros-romanos', emoji: '🏛️', gradient: 'from-amber-500 to-orange-700', titulo: T3('Números Romanos (juego)', 'Roman Numerals (game)', 'Nombres Romans (joc)'), desc: T3('Construye cada número tocando los símbolos I, V, X, L, C, D y M, contra reloj.', 'Build each number by tapping the symbols I, V, X, L, C, D and M, against the clock.', 'Construeix cada nombre tocant els símbols I, V, X, L, C, D i M, contra rellotge.') },
      { to: '/examen/numeros-romanos-test', emoji: '📝', gradient: 'from-stone-500 to-amber-800', titulo: T3('Examen de números romanos', 'Roman numerals exam', 'Examen de nombres romans'), desc: T3('Con la mecánica del juego, sin cronómetro y con tres niveles.', 'Using the game mechanic, with no timer and three levels.', 'Amb la mecànica del joc, sense cronòmetre i amb tres nivells.') },
    ],
  },
  'teorema-de-pitagoras': {
    emoji: '📐', nombre: T3('Teorema de Pitágoras', 'Pythagoras’ theorem', 'Teorema de Pitàgores'),
    modos: [
      { to: '/examen/geometria', emoji: '📝', gradient: 'from-pink-500 to-rose-700', titulo: T3('Examen de Geometría', 'Geometry exam', 'Examen de Geometria'), desc: T3('Áreas, perímetros, ángulos y el teorema de Pitágoras, con la solución explicada.', 'Areas, perimeters, angles and Pythagoras’ theorem, with worked answers.', 'Àrees, perímetres, angles i el teorema de Pitàgores, amb la solució explicada.') },
      { to: '/juegos/angulo-recto', emoji: '📏', gradient: 'from-indigo-500 to-violet-700', titulo: T3('Ángulo Recto (juego)', 'Right Angle (game)', 'Angle Recte (joc)'), desc: T3('El paso siguiente con triángulos rectángulos: seno, coseno y tangente.', 'The next step with right-angled triangles: sine, cosine and tangent.', 'El pas següent amb triangles rectangles: sinus, cosinus i tangent.') },
    ],
  },
  'sistemas-de-ecuaciones': {
    emoji: '🔣', nombre: T3('Sistemas de ecuaciones', 'Simultaneous equations', 'Sistemes d’equacions'),
    modos: [
      { to: '/examen/sistemas-ecuaciones-test', emoji: '📝', gradient: 'from-red-500 to-rose-700', titulo: T3('Examen de sistemas de ecuaciones', 'Simultaneous equations exam', 'Examen de sistemes d’equacions'), desc: T3('Sistemas generados al momento, con la solución paso a paso.', 'Freshly generated systems, with step-by-step answers.', 'Sistemes generats al moment, amb la solució pas a pas.') },
      { to: '/juegos/cruce-rectas', emoji: '✖️', gradient: 'from-amber-500 to-sky-700', titulo: T3('Cruce de Rectas (juego)', 'Line Crossing (game)', 'Encreuament de Rectes (joc)'), desc: T3('El método gráfico: dibuja las dos rectas y encuentra dónde se cortan, contra reloj.', 'The graphical method: draw both lines and find where they cross, against the clock.', 'El mètode gràfic: dibuixa les dues rectes i troba on es tallen, contra rellotge.') },
      { to: '/examen/cruce-rectas-test', emoji: '📈', gradient: 'from-sky-500 to-indigo-700', titulo: T3('Examen por el método gráfico', 'Graphical method exam', 'Examen pel mètode gràfic'), desc: T3('Con la mecánica del juego, sin cronómetro: incluye sistemas sin solución y con infinitas.', 'Using the game mechanic, with no timer: includes systems with no solution and infinitely many.', 'Amb la mecànica del joc, sense cronòmetre: inclou sistemes sense solució i amb infinites.') },
      { to: '/juegos/balanza-algebraica', emoji: '⚖️', gradient: 'from-emerald-500 to-teal-700', titulo: T3('Balanza Algebraica (juego)', 'Algebra Balance (game)', 'Balança Algebraica (joc)'), desc: T3('Para afianzar el paso previo: despejar la x en ecuaciones de primer grado.', 'To secure the step before: solving linear equations for x.', 'Per consolidar el pas previ: aïllar la x en equacions de primer grau.') },
    ],
  },
  'numeros-decimales': {
    emoji: '🔢', nombre: T3('Números decimales', 'Decimals', 'Nombres decimals'),
    modos: [
      { to: '/examen/numeros-decimales-test', emoji: '📝', gradient: 'from-blue-500 to-indigo-700', titulo: T3('Examen de números decimales', 'Decimals exam', 'Examen de nombres decimals'), desc: T3('Leer, comparar, redondear y operar con decimales, con la explicación de cada respuesta.', 'Reading, comparing, rounding and calculating with decimals, with every answer explained.', 'Llegir, comparar, arrodonir i operar amb decimals, amb l’explicació de cada resposta.') },
      { to: '/juegos/redondeo', emoji: '📍', gradient: 'from-sky-500 to-indigo-700', titulo: T3('Redondeo (juego)', 'Rounding (game)', 'Arrodoniment (joc)'), desc: T3('Elige el número redondo más cercano.', 'Pick the nearest round number.', 'Tria el nombre rodó més proper.') },
      { to: '/juegos/menor-a-mayor', emoji: '📶', gradient: 'from-violet-500 to-purple-700', titulo: T3('De Menor a Mayor (juego)', 'Least to Greatest (game)', 'De Menor a Major (joc)'), desc: T3('Ordena fracciones, decimales y porcentajes.', 'Put fractions, decimals and percentages in order.', 'Ordena fraccions, decimals i percentatges.') },
      { to: '/juegos/escalera-unidades', emoji: '🔟', gradient: 'from-teal-500 to-cyan-700', titulo: T3('La Escalera de Unidades (juego)', 'The Unit Staircase (game)', 'L’Escala d’Unitats (joc)'), desc: T3('Mueve la coma al cambiar de unidad: de km a m, de g a kg…', 'Move the decimal point as you change unit: km to m, g to kg…', 'Mou la coma en canviar d’unitat: de km a m, de g a kg…') },
    ],
  },
}

export default function MatematicasTemaExtra({ slug }) {
  const { lang, tr, localPath } = useLang()
  const tema = TEMAS[slug]
  const meta = contenidoMeta(slug, lang)
  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <PageMeta title={meta?.title} description={meta?.desc} path={`${BASE}/${slug}`} lang={lang} />
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar')} className="hover:text-white/60 transition-colors">{tr({ es: 'Estudiar', en: 'Study', ca: 'Estudiar' })}</Link>
          {' / '}
          <Link to={localPath(BASE)} className="hover:text-white/60 transition-colors">{tr({ es: 'Matemáticas', en: 'Maths', ca: 'Matemàtiques' })}</Link>
          {' / '}
          <span className="text-white/50">{tr(tema.nombre)}</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{tema.emoji}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{meta?.title}</h1>
        </div>
      </div>

      <ContenidoTema tema={slug} lang={lang} />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{tr({ es: 'Practica', en: 'Practise', ca: 'Practica' })}</p>
        {tema.modos.map(m => (
          <Link key={m.to} to={localPath(m.to)} state={{ backPath: `${BASE}/${slug}` }}
            className="block w-full group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40">
            <div className={`bg-gradient-to-br ${m.gradient} p-5 flex items-center gap-4`}>
              <span className="text-3xl">{m.emoji}</span>
              <div className="flex-1">
                <h2 className="font-black text-white text-lg">{tr(m.titulo)}</h2>
                <p className="text-white/75 text-sm leading-relaxed">{tr(m.desc)}</p>
              </div>
              <span className="w-10 h-10 shrink-0 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-white font-black text-lg">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
