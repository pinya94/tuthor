import { useParams, Link } from 'react-router-dom'

const FICHAS = {
  'acercate': {
    titulo: 'Acércate al Número',
    subtitulo: 'Juego de Cálculo Mental y Lógica Matemática',
    emoji: '🎯', gradient: 'from-pink-600 to-rose-800',
    path: '/juegos/acercate',
    intro: 'Una herramienta pedagógica interactiva diseñada para que los estudiantes dominen la agilidad numérica sin frustración. Combina números usando operaciones aritméticas para alcanzar el objetivo exacto, nivel tras nivel, en un formato roguelike que engancha.',
    beneficios: [
      { titulo: 'Flexibilidad Cognitiva', texto: 'El juego obliga a encontrar múltiples caminos — combinando sumas, restas, multiplicaciones y divisiones — para llegar a un mismo número objetivo.' },
      { titulo: 'Memoria de Trabajo', texto: 'El alumno mantiene resultados parciales en la mente mientras calcula el siguiente paso, reforzando las conexiones neuronales del lóbulo frontal.' },
      { titulo: 'Reducción de la Ansiedad Matemática', texto: 'Al plantearse como un reto gamificado con mecánicas de roguelike, el error se percibe como parte del juego, no como un fracaso.' },
    ],
    ejemplo: 'En lugar de rellenar hojas de ejercicios, el alumno descompone el número 45 combinando (7 × 6) + 3 en cuestión de segundos.',
    enPapel: {
      titulo: 'Acércate al Número en papel',
      pasos: [
        'Escribe 5 números aleatorios del 1 al 15 en papelitos y un número objetivo entre 20 y 100.',
        'Usa solo las operaciones permitidas (empieza con suma y resta, añade multiplicación y división para más reto).',
        'Intenta llegar exactamente al objetivo combinando los números. Puedes cronometrar con el móvil.',
        'Si juegas con alguien, gana quien llegue más cerca del objetivo en menos tiempo.',
      ],
    },
    alternativas: [
      { nombre: 'Cifras y Letras', desc: 'El clásico concurso de televisión donde hay que llegar a un número con operaciones básicas.' },
      { nombre: 'Mathable', desc: 'Juego de mesa tipo Scrabble pero con números y operaciones matemáticas.' },
      { nombre: '24 Game', desc: 'Con 4 números y las 4 operaciones, llega exactamente a 24. Existen versiones en cartas.' },
    ],
    asignatura: 'Matemáticas', niveles: 'Primaria, Secundaria, Bachillerato',
  },
  'tuthor-time': {
    titulo: 'Tuthor Time',
    subtitulo: 'Juego de Cronología y Memoria Histórica',
    emoji: '🕰️', gradient: 'from-amber-600 to-orange-800',
    path: '/juegos/tuthor-time',
    intro: 'Viaja en el tiempo y demuestra cuánto sabes de historia. Envía a tus agentes temporales al año correcto de cada evento. Cuanto más cerca estés, menos vida gastan.',
    beneficios: [
      { titulo: 'Contextualización Temporal', texto: 'Situar eventos en su época obliga al cerebro a construir una línea temporal mental: causas, consecuencias y simultaneidades.' },
      { titulo: 'Aprendizaje por Error Calibrado', texto: 'El sistema de vida proporcional al error enseña que "estar cerca" tiene valor.' },
      { titulo: 'Retención a Largo Plazo', texto: 'La repetición espaciada natural — eventos que reaparecen en distintas partidas — refuerza la memoria.' },
    ],
    ejemplo: 'Un estudiante que prepara la Segunda Guerra Mundial juega 5 minutos y sitúa 8-10 eventos clave con precisión que mejora partida tras partida.',
    enPapel: {
      titulo: 'Adivinar el año en papel',
      pasos: [
        'Escribe 15-20 eventos históricos en tarjetas (sin el año visible en la cara principal).',
        'Un jugador lee el evento, los demás escriben el año que creen.',
        'Quien más se acerque gana un punto. Si alguien clava el año exacto, gana 3 puntos.',
        'Tras 10 rondas, el que más puntos tenga gana.',
      ],
    },
    alternativas: [
      { nombre: 'Timeline (juego de mesa)', desc: 'Cartas con eventos que hay que colocar en orden cronológico. Mismo concepto, formato físico.' },
      { nombre: 'Trivial Pursuit — Historia', desc: 'Las preguntas de historia del Trivial trabajan la misma memoria de fechas y contextos.' },
    ],
    asignatura: 'Historia', niveles: 'ESO, Bachillerato',
  },
  'linea-temporal': {
    titulo: 'Línea Temporal',
    subtitulo: 'Juego de Ordenación Cronológica',
    emoji: '📜', gradient: 'from-emerald-600 to-teal-800',
    path: '/juegos/linea-temporal',
    intro: 'Coloca eventos históricos en orden cronológico sin ver las fechas. Solo tu intuición histórica te ayudará.',
    beneficios: [
      { titulo: 'Razonamiento Relacional', texto: 'Sin fechas visibles, el alumno razona: "¿La imprenta fue antes o después del descubrimiento de América?".' },
      { titulo: 'Esquemas Mentales', texto: 'Ordenar cronológicamente crea un mapa mental de la historia donde situar nuevos conocimientos.' },
      { titulo: 'Detección de Anacronismos', texto: 'La práctica entrena detectar errores temporales — habilidad crítica para exámenes.' },
    ],
    ejemplo: 'Un alumno ordena 10 eventos de la Guerra Civil. Al colocar Guernica antes del Ebro, refuerza la secuencia causal.',
    enPapel: {
      titulo: 'Línea temporal en papel',
      pasos: [
        'Escribe eventos históricos en tarjetas con el año por detrás.',
        'Baraja las tarjetas y coloca una en el centro de la mesa como referencia.',
        'Por turnos, cada jugador coge una tarjeta, lee el evento y decide si va antes o después de las ya colocadas.',
        'Gira la tarjeta para comprobar. Si aciertas la posición, se queda; si no, vuelve al mazo.',
      ],
    },
    alternativas: [
      { nombre: 'Timeline (juego de mesa)', desc: 'Exactamente esta mecánica en formato cartas. Hay versiones de ciencia, música, cine...' },
      { nombre: 'Línea del tiempo en la pared', desc: 'Dibuja una línea en un papel grande y ve pegando post-its con eventos. Ideal para repasar en grupo.' },
    ],
    asignatura: 'Historia', niveles: 'Primaria, ESO, Bachillerato',
  },
  'quien-es-quien': {
    titulo: '¿Quién es Quién?',
    subtitulo: 'Juego de Deducción con Personajes Históricos',
    emoji: '🕵️', gradient: 'from-violet-600 to-purple-900',
    path: '/juegos/quien-es-quien',
    intro: 'Adivina el personaje histórico secreto usando pistas lógicas. Tacha candidatos, formula hipótesis y demuestra tu conocimiento.',
    beneficios: [
      { titulo: 'Pensamiento Deductivo', texto: 'Cada pista elimina candidatos. Lógica de exclusión transferible a ciencias, matemáticas y vida cotidiana.' },
      { titulo: 'Conocimiento Biográfico', texto: 'Las pistas contextualizadas enseñan biografías completas sin estudiarlas explícitamente.' },
      { titulo: 'Decisiones bajo Incertidumbre', texto: 'Con información parcial, saber cuándo arriesgar es metacognición pura.' },
    ],
    ejemplo: 'Pistas: "Europa, siglo XX, científico". Descarta guerreros, debate Einstein vs Curie, "Ganó dos Nobel" lo resuelve.',
    enPapel: {
      titulo: '¿Quién soy? con post-its',
      pasos: [
        'Cada jugador escribe un personaje histórico en un post-it y se lo pega en la frente a otro jugador.',
        'Por turnos, haz preguntas de sí/no: "¿Soy europeo?", "¿Viví en el siglo XX?".',
        'Puedes intentar adivinar en cualquier momento, pero si fallas pierdes un turno.',
        'Gana quien adivine su personaje con menos preguntas.',
      ],
    },
    alternativas: [
      { nombre: '¿Quién es Quién? (juego de mesa)', desc: 'El clásico de Hasbro. La versión de Tuthor lo adapta a personajes históricos reales.' },
      { nombre: 'Hedbanz', desc: 'Juego de adivinanzas con tarjetas en la frente. Mismo principio, formato familiar.' },
    ],
    asignatura: 'Historia', niveles: 'ESO, Bachillerato',
  },
  'portadas': {
    titulo: 'Portadas',
    subtitulo: 'Verificación de Titulares Históricos',
    emoji: '📰', gradient: 'from-stone-600 to-neutral-800',
    path: '/juegos/portadas',
    intro: 'Lee portadas de periódicos históricos reales y decide si el titular es verdad o mentira. Pensamiento crítico aplicado a la historia.',
    beneficios: [
      { titulo: 'Pensamiento Crítico', texto: 'Distinguir hechos de falsos es competencia esencial en la era de la desinformación.' },
      { titulo: 'Atención al Detalle', texto: 'Los titulares falsos tienen errores sutiles. Detectarlos entrena la lectura atenta.' },
      { titulo: 'Cultura General', texto: 'Cada portada viene con explicación detallada. Se aprende tanto de aciertos como de errores.' },
    ],
    ejemplo: 'Portada del NYT 1945: "Primera bomba sobre Nagasaki". Quien sabe que Hiroshima fue primero marca MENTIRA.',
    enPapel: {
      titulo: 'Verdad o mentira en clase',
      pasos: [
        'Prepara fichas con afirmaciones históricas: mitad verdaderas, mitad con un error sutil.',
        'Lee cada afirmación en voz alta. Los jugadores levantan un pulgar arriba (verdad) o abajo (mentira).',
        'Tras cada ronda, explica por qué es verdad o mentira. Un punto por acierto.',
        'Funciona genial en grupos de 4-6 personas o en clase entera.',
      ],
    },
    alternativas: [
      { nombre: 'Fauna (juego de mesa)', desc: 'Mismo principio de estimar datos (peso, hábitat de animales) y aprender de los errores.' },
      { nombre: 'Fake News Game', desc: 'Juegos online y de mesa centrados en detectar noticias falsas. Mismo músculo cognitivo.' },
    ],
    asignatura: 'Historia', niveles: 'ESO, Bachillerato',
  },
  'georush': {
    titulo: 'GeoRush',
    subtitulo: 'Geografía y Deducción por Pistas',
    emoji: '🌍', gradient: 'from-teal-500 to-cyan-700',
    path: '/juegos/georush',
    intro: 'Descubre el país misterioso a partir de pistas geográficas, demográficas e históricas. Cuanto antes lo adivines, más puntos.',
    beneficios: [
      { titulo: 'Integración Multidisciplinar', texto: 'Cada país combina geografía, demografía, historia y cultura. Conexiones entre asignaturas en una partida.' },
      { titulo: 'Velocidad de Procesamiento', texto: 'El timer obliga a decisiones rápidas. Mejora la "fluidez de recuperación" de conocimientos almacenados.' },
      { titulo: 'Geografía Aplicada', texto: 'En vez de memorizar listas, se aprenden asociaciones ricas: "Japón = Asia + Fuji + ambas guerras".' },
    ],
    ejemplo: 'Pistas: "Hemisferio sur, +500.000 km², portugués". Conectar tres datos = "Brasil" en segundos.',
    enPapel: {
      titulo: 'Adivina el país en grupo',
      pasos: [
        'Un jugador elige un país en secreto y prepara 5 pistas ordenadas de general a específica.',
        'Lee las pistas una a una. Tras cada pista, los demás pueden intentar adivinar.',
        'Cuantas menos pistas necesites, más puntos: 5 pistas = 1pt, 4 = 2pts, 3 = 3pts, 2 = 4pts, 1 = 5pts.',
        'Si nadie acierta tras las 5 pistas, el que eligió el país gana un punto bonus.',
      ],
    },
    alternativas: [
      { nombre: 'Worldle', desc: 'Juego web donde adivinas un país por su silueta. Complementa la deducción geográfica.' },
      { nombre: 'Flagle', desc: 'Adivina el país por fragmentos de su bandera. Trabaja la misma asociación visual-geográfica.' },
      { nombre: 'Atlas en familia', desc: 'Abre un atlas, elige un país al azar y entre todos intentad decir capital, continente, idioma y un dato curioso.' },
    ],
    asignatura: 'Geografía', niveles: 'Primaria, ESO, Bachillerato',
  },
}

export default function InfoJuegoFicha() {
  const { slug } = useParams()
  const ficha = FICHAS[slug]

  if (!ficha) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">Juego no encontrado</p>
          <Link to="/info/juegos" className="text-[#EDAE49] hover:underline">← Volver al catálogo</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      {/* Header oscuro */}
      <div className="px-4 sm:px-8 py-10 max-w-3xl mx-auto">
        <Link to="/info/juegos" className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← Volver al catálogo
        </Link>
        <header className="mb-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{ficha.emoji}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{ficha.titulo}</h1>
              <p className="text-white/40 text-lg">{ficha.subtitulo}</p>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.asignatura}</span>
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.niveles}</span>
          </div>
          <Link to={ficha.path}
            className="inline-block py-3 px-8 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
            Jugar a {ficha.titulo} →
          </Link>
        </header>
      </div>

      {/* Contenido claro */}
      <div className="bg-[#f5f5f0] text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">

          <p className="text-gray-600 leading-relaxed text-lg mb-8">{ficha.intro}</p>

          <div className={`bg-gradient-to-br ${ficha.gradient} rounded-2xl h-48 sm:h-64 flex items-center justify-center mb-10 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative text-center">
              <span className="text-8xl sm:text-9xl drop-shadow-2xl">{ficha.emoji}</span>
              <p className="text-white/60 text-sm font-bold mt-2">{ficha.asignatura} · {ficha.niveles}</p>
            </div>
          </div>

          {/* CTA 1 */}
          <div className="text-center mb-10">
            <Link to={ficha.path}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              Jugar a {ficha.titulo} →
            </Link>
          </div>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-juego-ficha-1" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* Beneficios */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-6">🧠 Beneficios Pedagógicos</h2>
            <div className="space-y-5">
              {ficha.beneficios.map(b => (
                <div key={b.titulo} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-black text-gray-900 text-lg mb-2">{b.titulo}</h3>
                  <p className="text-gray-500 leading-relaxed">{b.texto}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-4">💡 Ejemplo Práctico</h2>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
              <p className="text-teal-800 leading-relaxed italic">"{ficha.ejemplo}"</p>
            </div>
          </section>

          {/* CTA 2 */}
          <div className="text-center mb-10">
            <Link to={ficha.path}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              Probar {ficha.titulo} ahora →
            </Link>
          </div>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-juego-ficha-2" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* En papel */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">📝 {ficha.enPapel.titulo}</h2>
            <p className="text-gray-400 mb-5">¿Prefieres aprender sin pantallas? Prueba esta versión analógica:</p>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <ol className="space-y-3">
                {ficha.enPapel.pasos.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 text-teal-700 font-black text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="text-gray-600 leading-relaxed pt-0.5">{p}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Alternativas */}
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">🎲 Juegos similares que te pueden gustar</h2>
            <p className="text-gray-400 mb-5">Si te gusta {ficha.titulo}, estos juegos trabajan habilidades parecidas:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {ficha.alternativas.map(a => (
                <div key={a.nombre} className="bg-white rounded-2xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{a.nombre}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-juego-ficha-3" style={{ minHeight: '90px', marginBottom: '2.5rem' }} />

          {/* CTA final */}
          <footer className="text-center pt-4">
            <h2 className="text-2xl font-black text-gray-900 mb-3">¿Listo para probarlo?</h2>
            <p className="text-gray-400 mb-6">Accede gratis y empieza a mejorar ahora.</p>
            <Link to={ficha.path}
              className="inline-block py-4 px-10 bg-teal-600 hover:bg-teal-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-600/30">
              Jugar a {ficha.titulo} →
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
