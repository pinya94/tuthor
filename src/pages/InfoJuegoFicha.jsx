import { useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

const FICHAS_ES = {
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
      { nombre: 'Retos de cálculo en grupo', desc: 'Escribe un número objetivo en la pizarra y reparte números al azar. Quien llegue primero gana.' },
      { nombre: 'Juegos de mesa de operaciones', desc: 'Hay muchos juegos de mesa centrados en combinar operaciones matemáticas. Busca en tu tienda local.' },
      { nombre: 'Desafío del 24', desc: 'Con 4 números y las 4 operaciones, intenta llegar exactamente a 24. Funciona con cartas normales.' },
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
      { nombre: 'Cartas de cronología', desc: 'Escribe eventos en cartas y juega a colocarlos en orden. Mismo concepto, formato físico casero.' },
      { nombre: 'Quiz de fechas en grupo', desc: 'Lee un evento, cada jugador escribe el año. Quien más se acerque gana. Ideal para repasar antes de un examen.' },
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
      { nombre: 'Cartas cronológicas caseras', desc: 'Haz tus propias cartas con eventos y años por detrás. Funciona para cualquier asignatura.' },
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
      { nombre: 'Adivinanzas con post-its', desc: 'Pega un personaje en la frente de cada jugador. Preguntas de sí/no hasta adivinar.' },
      { nombre: 'Fichas de personajes', desc: 'Crea fichas con datos de personajes históricos y juega a descartar por pistas con amigos.' },
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
      { nombre: 'Debate en clase', desc: 'Lee afirmaciones históricas y organiza un debate argumentado sobre si son verdaderas o falsas.' },
      { nombre: 'Periódico del aula', desc: 'Los alumnos redactan titulares reales y falsos sobre un tema. Los compañeros los clasifican.' },
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
      { nombre: 'Atlas en familia', desc: 'Abre un atlas, elige un país al azar y entre todos intentad decir capital, continente, idioma y un dato curioso.' },
      { nombre: 'Mapa mudo', desc: 'Imprime un mapa sin nombres y rellénalo de memoria. Clásico que nunca falla para fijar ubicaciones.' },
      { nombre: 'Quiz de banderas', desc: 'Imprime banderas sin nombre y juega a identificarlas. Funciona genial en grupo con puntos.' },
    ],
    asignatura: 'Geografía', niveles: 'Primaria, ESO, Bachillerato',
  },
}

const FICHAS_EN = {
  'acercate': {
    titulo: 'Target Number', subtitulo: 'Mental Arithmetic & Logic Game',
    emoji: '🎯', gradient: 'from-pink-600 to-rose-800', path: '/juegos/acercate',
    intro: 'An interactive pedagogical tool designed so students master numerical agility without frustration. Combine numbers using arithmetic operations to hit the exact target, level after level, in an addictive roguelike format.',
    beneficios: [
      { titulo: 'Cognitive Flexibility', texto: 'The game forces players to find multiple paths — combining addition, subtraction, multiplication and division — to reach the same target number.' },
      { titulo: 'Working Memory', texto: 'The student holds partial results in mind while calculating the next step, strengthening frontal-lobe neural connections.' },
      { titulo: 'Maths Anxiety Reduction', texto: 'Framed as a gamified challenge with roguelike mechanics, mistakes feel like part of the game, not failure.' },
    ],
    ejemplo: 'Instead of filling in worksheets, the student breaks down 45 by combining (7 × 6) + 3 in seconds.',
    enPapel: { titulo: 'Target Number on paper', pasos: ['Write 5 random numbers (1–15) on slips of paper and a target number between 20 and 100.', 'Use only the allowed operations (start with addition/subtraction, add multiplication/division for extra challenge).', 'Try to reach the target exactly. Time yourselves with a phone.', 'If playing with someone, whoever gets closest fastest wins.'] },
    alternativas: [
      { nombre: 'Group calculation challenges', desc: 'Write a target on the board and hand out random numbers. First to reach it wins.' },
      { nombre: 'Operations board games', desc: 'Many board games focus on combining mathematical operations. Check your local shop.' },
      { nombre: '24 Challenge', desc: 'With 4 numbers and 4 operations, try to reach exactly 24. Works with regular playing cards.' },
    ],
    asignatura: 'Mathematics', niveles: 'Primary, Secondary, Sixth Form',
  },
  'tuthor-time': {
    titulo: 'Tuthor Time', subtitulo: 'Chronology & Historical Memory Game',
    emoji: '🕰️', gradient: 'from-amber-600 to-orange-800', path: '/juegos/tuthor-time',
    intro: 'Travel through time and show how much you know about history. Send your time agents to the correct year of each event. The closer you get, the less life they use.',
    beneficios: [
      { titulo: 'Temporal Contextualisation', texto: 'Placing events in their era forces the brain to build a mental timeline: causes, consequences and simultaneities.' },
      { titulo: 'Calibrated Error Learning', texto: 'The life system proportional to error teaches that "being close" has value.' },
      { titulo: 'Long-term Retention', texto: 'Natural spaced repetition — events reappearing across games — reinforces memory.' },
    ],
    ejemplo: 'A student preparing for WWII plays for 5 minutes and places 8–10 key events with improving accuracy each game.',
    enPapel: { titulo: 'Guess the year on paper', pasos: ['Write 15–20 historical events on cards (without the year visible).', 'One player reads the event, the others write down the year they think.', 'Closest wins a point. Exact match wins 3 points.', 'After 10 rounds, highest score wins.'] },
    alternativas: [
      { nombre: 'Chronology cards', desc: 'Write events on cards and play at placing them in order. Same concept, homemade format.' },
      { nombre: 'Group dates quiz', desc: 'Read an event, everyone writes the year. Closest wins. Great for pre-exam revision.' },
    ],
    asignatura: 'History', niveles: 'Secondary, Sixth Form',
  },
  'linea-temporal': {
    titulo: 'Timeline', subtitulo: 'Chronological Ordering Game',
    emoji: '📜', gradient: 'from-emerald-600 to-teal-800', path: '/juegos/linea-temporal',
    intro: 'Place historical events in chronological order without seeing dates. Only your historical intuition will help.',
    beneficios: [
      { titulo: 'Relational Reasoning', texto: 'Without visible dates, the student reasons: "Was the printing press before or after the discovery of America?". Deeper thinking than memorising.' },
      { titulo: 'Mental Schemas', texto: 'Ordering chronologically creates a mental map of history in which to place new knowledge.' },
      { titulo: 'Anachronism Detection', texto: 'Practice trains the ability to spot temporal errors — a critical exam skill.' },
    ],
    ejemplo: 'A student orders 10 Spanish Civil War events. Placing Guernica before the Ebro reinforces the causal sequence.',
    enPapel: { titulo: 'Timeline on paper', pasos: ['Write historical events on cards with the year on the back.', 'Shuffle and place one in the centre of the table as a reference.', 'Take turns picking a card, reading the event and deciding if it goes before or after those already placed.', 'Flip to check. If correct it stays; if not, back to the deck.'] },
    alternativas: [
      { nombre: 'Homemade chronology cards', desc: 'Make your own cards with events and dates on the back. Works for any subject.' },
      { nombre: 'Wall timeline', desc: 'Draw a line on a large sheet and stick post-its with events. Great for group revision.' },
    ],
    asignatura: 'History', niveles: 'Primary, Secondary, Sixth Form',
  },
  'quien-es-quien': {
    titulo: 'Who is Who?', subtitulo: 'Deduction Game with Historical Figures',
    emoji: '🕵️', gradient: 'from-violet-600 to-purple-900', path: '/juegos/quien-es-quien',
    intro: 'Guess the secret historical figure using logical clues. Cross out candidates, form hypotheses and prove your knowledge.',
    beneficios: [
      { titulo: 'Deductive Thinking', texto: 'Each clue eliminates candidates. Exclusion logic transferable to science, maths and everyday life.' },
      { titulo: 'Biographical Knowledge', texto: 'Contextualised clues teach complete biographies without explicitly studying them.' },
      { titulo: 'Decisions under Uncertainty', texto: 'With partial information, knowing when to take a risk is pure metacognition.' },
    ],
    ejemplo: 'Clues: "Europe, 20th century, scientist". Rule out warriors, debate Einstein vs Curie, "Won two Nobels" solves it.',
    enPapel: { titulo: 'Who am I? with post-its', pasos: ['Each player writes a historical figure on a post-it and sticks it on another player\'s forehead.', 'Take turns asking yes/no questions: "Am I European?", "Did I live in the 20th century?".', 'You can try to guess at any time, but if you are wrong you miss a turn.', 'Winner is whoever guesses with the fewest questions.'] },
    alternativas: [
      { nombre: 'Post-it guessing game', desc: 'Stick a character on each player\'s forehead. Yes/no questions until you guess.' },
      { nombre: 'Character cards', desc: 'Create cards with historical-figure data and play elimination by clues with friends.' },
    ],
    asignatura: 'History', niveles: 'Secondary, Sixth Form',
  },
  'portadas': {
    titulo: 'Headlines', subtitulo: 'Historical Headline Verification Game',
    emoji: '📰', gradient: 'from-stone-600 to-neutral-800', path: '/juegos/portadas',
    intro: 'Read real historical newspaper front pages and decide whether the headline is true or false. Critical thinking applied to history.',
    beneficios: [
      { titulo: 'Critical Thinking', texto: 'Distinguishing facts from falsehoods is an essential skill in the age of misinformation.' },
      { titulo: 'Attention to Detail', texto: 'False headlines contain subtle errors. Spotting them trains close reading.' },
      { titulo: 'General Culture', texto: 'Every front page comes with a detailed explanation. You learn as much from successes as from mistakes.' },
    ],
    ejemplo: 'NYT front page, 1945: "First bomb dropped on Nagasaki". Anyone who knows Hiroshima came first marks FALSE.',
    enPapel: { titulo: 'True or false in class', pasos: ['Prepare cards with historical statements: half true, half with a subtle error.', 'Read each statement aloud. Players give thumbs up (true) or down (false).', 'After each round, explain why it is true or false. One point per correct answer.', 'Works great in groups of 4–6 or whole-class.'] },
    alternativas: [
      { nombre: 'Classroom debate', desc: 'Read historical statements and run an argued debate on whether they are true or false.' },
      { nombre: 'Class newspaper', desc: 'Students write real and fake headlines about a topic. Classmates classify them.' },
    ],
    asignatura: 'History', niveles: 'Secondary, Sixth Form',
  },
  'georush': {
    titulo: 'GeoRush', subtitulo: 'Geography & Deduction by Clues',
    emoji: '🌍', gradient: 'from-teal-500 to-cyan-700', path: '/juegos/georush',
    intro: 'Discover the mystery country from geographical, demographic and historical clues. The sooner you guess, the more points you score.',
    beneficios: [
      { titulo: 'Multi-disciplinary Integration', texto: 'Each country combines geography, demographics, history and culture. Cross-subject connections in a single game.' },
      { titulo: 'Processing Speed', texto: 'The timer forces quick decisions. Improves "retrieval fluency" of stored knowledge.' },
      { titulo: 'Applied Geography', texto: 'Instead of memorising lists, you learn rich associations: "Japan = Asia + Fuji + both wars". Networks resistant to forgetting.' },
    ],
    ejemplo: 'Clues: "Southern hemisphere, +500,000 km², Portuguese". Connect three data points = "Brazil" in seconds.',
    enPapel: { titulo: 'Guess the country in a group', pasos: ['One player picks a country secretly and prepares 5 clues from general to specific.', 'Read the clues one by one. After each, the others can try to guess.', 'Fewer clues needed = more points: 5 clues = 1pt, 4 = 2pts, 3 = 3pts, 2 = 4pts, 1 = 5pts.', 'If nobody guesses after 5 clues, the chooser gets a bonus point.'] },
    alternativas: [
      { nombre: 'Family atlas', desc: 'Open an atlas, pick a random country and together try to name the capital, continent, language and a fun fact.' },
      { nombre: 'Blank map', desc: 'Print a map without names and fill it in from memory. A classic that never fails.' },
      { nombre: 'Flag quiz', desc: 'Print flags without names and play at identifying them. Works great in groups with points.' },
    ],
    asignatura: 'Geography', niveles: 'Primary, Secondary, Sixth Form',
  },
}

const UI = {
  es: { back: '← Volver al catálogo', jugar: 'Jugar a', probar: 'Probar', ahora: 'ahora →', beneficiosH2: '🧠 Beneficios Pedagógicos', ejemploH2: '💡 Ejemplo Práctico', papelPre: '¿Prefieres aprender sin pantallas? Prueba esta versión analógica:', altH2: '🎲 Juegos similares que te pueden gustar', altPre: 'Si te gusta', altPost: ', estos juegos trabajan habilidades parecidas:', listoH2: '¿Listo para probarlo?', listoSub: 'Accede gratis y empieza a mejorar ahora.', notFound: 'Juego no encontrado' },
  en: { back: '← Back to catalogue', jugar: 'Play', probar: 'Try', ahora: 'now →', beneficiosH2: '🧠 Pedagogical Benefits', ejemploH2: '💡 Practical Example', papelPre: 'Prefer to learn without screens? Try this analogue version:', altH2: '🎲 Similar activities you might enjoy', altPre: 'If you like', altPost: ', these activities work similar skills:', listoH2: 'Ready to try it?', listoSub: 'Access for free and start improving now.', notFound: 'Game not found' },
}

export default function InfoJuegoFicha() {
  const { slug } = useParams()
  const { lang, localPath } = useLang()
  const fichas = lang === 'en' ? FICHAS_EN : FICHAS_ES
  const ui = UI[lang] || UI.es
  const ficha = fichas[slug]

  if (!ficha) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">{ui.notFound}</p>
          <Link to={localPath('/info/juegos')} className="text-[#EDAE49] hover:underline">{ui.back}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      {/* Header oscuro */}
      <div className="px-4 sm:px-8 py-10 max-w-3xl mx-auto">
        <Link to={localPath('/info/juegos')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          {ui.back}
        </Link>
        <header className="mb-4">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <span className="text-5xl sm:text-6xl shrink-0">{ficha.emoji}</span>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">{ficha.titulo}</h1>
              <p className="text-white/40 text-sm sm:text-lg">{ficha.subtitulo}</p>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.asignatura}</span>
            <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.niveles}</span>
          </div>
          <Link to={localPath(ficha.path)}
            className="inline-block py-3 px-8 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
            {ui.jugar} {ficha.titulo} →
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
            <h2 className="text-2xl font-black text-gray-900 mb-6">{ui.beneficiosH2}</h2>
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
            <h2 className="text-2xl font-black text-gray-900 mb-4">{ui.ejemploH2}</h2>
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
            <p className="text-gray-400 mb-5">{ui.papelPre}</p>
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
            <h2 className="text-2xl font-black text-gray-900 mb-2">{ui.altH2}</h2>
            <p className="text-gray-400 mb-5">{ui.altPre} {ficha.titulo}{ui.altPost}</p>
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
            <h2 className="text-2xl font-black text-gray-900 mb-3">{ui.listoH2}</h2>
            <p className="text-gray-400 mb-6">{ui.listoSub}</p>
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
