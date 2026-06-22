import { useParams, Link } from 'react-router-dom'

const FICHAS = {
  'acercate': {
    titulo: 'Acércate al Número',
    subtitulo: 'Juego de Cálculo Mental y Lógica Matemática',
    emoji: '🎯',
    path: '/juegos/acercate',
    intro: 'Una herramienta pedagógica interactiva diseñada para que los estudiantes dominen la agilidad numérica sin frustración. Combina números usando operaciones aritméticas para alcanzar el objetivo exacto, nivel tras nivel, en un formato roguelike que engancha.',
    beneficios: [
      { titulo: 'Flexibilidad Cognitiva', texto: 'El juego obliga a encontrar múltiples caminos — combinando sumas, restas, multiplicaciones y divisiones — para llegar a un mismo número objetivo. Esto entrena la capacidad de cambiar de estrategia sobre la marcha, una habilidad clave en resolución de problemas.' },
      { titulo: 'Memoria de Trabajo', texto: 'El alumno mantiene resultados parciales en la mente mientras calcula el siguiente paso, reforzando las conexiones neuronales del lóbulo frontal. Cada operación encadenada es un ejercicio de memoria activa.' },
      { titulo: 'Reducción de la Ansiedad Matemática', texto: 'Al plantearse como un reto gamificado con mecánicas de roguelike (mejoras, niveles, puntos), el error se percibe como parte del juego, no como un fracaso. Esto reduce la barrera emocional que muchos estudiantes tienen con las matemáticas.' },
    ],
    ejemplo: 'En lugar de rellenar hojas de ejercicios tradicionales, el alumno se enfrenta al reto de descomponer el número 45. Para lograrlo, su cerebro activa estrategias avanzadas: combinar (7 × 6) + 3 en cuestión de segundos. Cada nivel aumenta la dificultad de forma progresiva, y las mejoras entre rondas mantienen la motivación alta.',
    asignatura: 'Matemáticas',
    niveles: 'Primaria, Secundaria, Bachillerato',
  },
  'tuthor-time': {
    titulo: 'Tuthor Time',
    subtitulo: 'Juego de Cronología y Memoria Histórica',
    emoji: '🕰️',
    path: '/juegos/tuthor-time',
    intro: 'Viaja en el tiempo y demuestra cuánto sabes de historia. Envía a tus agentes temporales al año correcto de cada evento histórico. Cuanto más cerca estés, menos vida gastan. Un juego que convierte la memorización de fechas en una aventura.',
    beneficios: [
      { titulo: 'Contextualización Temporal', texto: 'Situar eventos en su época exacta obliga al cerebro a construir una línea temporal mental. Esto desarrolla la comprensión del flujo histórico: causas, consecuencias y simultaneidades entre eventos de distintas regiones.' },
      { titulo: 'Aprendizaje por Error Calibrado', texto: 'El sistema de vida proporcional al error (no binario acierto/fallo) enseña que "estar cerca" tiene valor. Un alumno que sitúa la Revolución Francesa en 1785 está aprendiendo más que uno que no lo intenta.' },
      { titulo: 'Retención a Largo Plazo', texto: 'La repetición espaciada natural del juego — eventos que reaparecen en distintas partidas — refuerza la memoria sin la monotonía de las fichas de estudio tradicionales.' },
    ],
    ejemplo: 'Un estudiante que prepara el examen de la Segunda Guerra Mundial juega una partida de 5 minutos. Al terminar, ha situado temporalmente 8-10 eventos clave (Pearl Harbor, Día D, Stalingrado) con una precisión que mejora partida tras partida. El feedback visual del contador de años le da contexto inmediato de su error.',
    asignatura: 'Historia',
    niveles: 'ESO, Bachillerato',
  },
  'linea-temporal': {
    titulo: 'Línea Temporal',
    subtitulo: 'Juego de Ordenación Cronológica',
    emoji: '📜',
    path: '/juegos/linea-temporal',
    intro: 'Coloca eventos históricos en orden cronológico sin ver las fechas. Solo tu intuición histórica y tu conocimiento del contexto te ayudarán. Un juego que transforma la memorización pasiva en razonamiento activo.',
    beneficios: [
      { titulo: 'Razonamiento Relacional', texto: 'Al no mostrar fechas, el alumno debe razonar: "¿La imprenta fue antes o después del descubrimiento de América?". Este tipo de pensamiento relacional es más profundo que la memorización aislada de fechas.' },
      { titulo: 'Construcción de Esquemas Mentales', texto: 'Ordenar eventos cronológicamente obliga a crear un mapa mental de la historia. Los alumnos desarrollan una estructura interna que les permite situar nuevos conocimientos en contexto.' },
      { titulo: 'Detección de Anacronismos', texto: 'La práctica repetida entrena la capacidad de detectar errores temporales — una habilidad crítica para exámenes de historia y comprensión lectora.' },
    ],
    ejemplo: 'Un alumno de ESO debe ordenar 10 eventos de la Guerra Civil Española. Al colocar el "Bombardeo de Guernica" antes de la "Batalla del Ebro", su cerebro refuerza la secuencia causal: la intervención nazi precedió a la ofensiva republicana final.',
    asignatura: 'Historia',
    niveles: 'Primaria, ESO, Bachillerato',
  },
  'quien-es-quien': {
    titulo: '¿Quién es Quién?',
    subtitulo: 'Juego de Deducción con Personajes Históricos',
    emoji: '🕵️',
    path: '/juegos/quien-es-quien',
    intro: 'Adivina el personaje histórico secreto usando pistas lógicas. Tacha candidatos, formula hipótesis y demuestra tu conocimiento de las figuras que cambiaron la historia. Un clásico reinventado para el aula.',
    beneficios: [
      { titulo: 'Pensamiento Deductivo', texto: 'Cada pista elimina candidatos. El alumno practica la lógica de exclusión: "Si nació en el siglo XX, no puede ser Julio César". Este razonamiento es transferible a ciencias, matemáticas y vida cotidiana.' },
      { titulo: 'Conocimiento Biográfico Contextual', texto: 'Las pistas no son datos sueltos sino información contextualizada: nacionalidad, época, logros, profesión. El alumno aprende biografías completas sin estudiarlas explícitamente.' },
      { titulo: 'Toma de Decisiones bajo Incertidumbre', texto: 'Con información parcial, el alumno debe decidir cuándo arriesgar. Esta habilidad metacognitiva — saber cuánto sabes — es fundamental en cualquier examen.' },
    ],
    ejemplo: 'Las pistas dicen: "Nació en Europa", "Vivió en el siglo XX", "Fue científico". El alumno descarta guerreros y políticos, se debate entre Einstein y Curie, y la siguiente pista ("Ganó dos premios Nobel") lo resuelve. En 2 minutos ha repasado 12 personajes históricos.',
    asignatura: 'Historia',
    niveles: 'ESO, Bachillerato',
  },
  'portadas': {
    titulo: 'Portadas',
    subtitulo: 'Juego de Verificación de Titulares Históricos',
    emoji: '📰',
    path: '/juegos/portadas',
    intro: 'Lee portadas de periódicos históricos reales y decide si el titular es verdad o mentira. Un juego que desarrolla el pensamiento crítico y el fact-checking aplicado a la historia.',
    beneficios: [
      { titulo: 'Pensamiento Crítico y Fact-Checking', texto: 'En la era de la desinformación, saber distinguir hechos reales de falsos es una competencia esencial. Este juego entrena esa habilidad en un contexto histórico verificable.' },
      { titulo: 'Atención al Detalle', texto: 'Los titulares falsos contienen errores sutiles: una fecha cambiada, un lugar incorrecto, un protagonista equivocado. Detectarlos entrena la lectura atenta y la verificación de fuentes.' },
      { titulo: 'Cultura General Histórica', texto: 'Cada portada — sea verdadera o falsa — viene con una explicación detallada. El alumno aprende tanto de sus aciertos como de sus errores, construyendo una base sólida de conocimiento histórico.' },
    ],
    ejemplo: 'Aparece una portada del New York Times de 1945: "EEUU lanza la primera bomba atómica sobre Nagasaki". El alumno que sabe que Hiroshima fue primero marca MENTIRA y gana puntos. La explicación le refuerza el orden cronológico y los detalles del evento.',
    asignatura: 'Historia',
    niveles: 'ESO, Bachillerato',
  },
  'georush': {
    titulo: 'GeoRush',
    subtitulo: 'Juego de Geografía y Deducción por Pistas',
    emoji: '🌍',
    path: '/juegos/georush',
    intro: 'Descubre el país misterioso a partir de pistas geográficas, demográficas e históricas. Cada pista que necesitas reduce tus puntos, así que cuanto antes lo adivines, mejor. Un juego que conecta datos del mundo real en tiempo récord.',
    beneficios: [
      { titulo: 'Integración de Conocimientos Multidisciplinar', texto: 'Cada país combina geografía (continente, hemisferio), demografía (población, superficie), historia (guerras mundiales) y cultura (idioma, famosos, montañas). El alumno conecta datos de distintas asignaturas en una sola partida.' },
      { titulo: 'Velocidad de Procesamiento', texto: 'El timer continuo obliga a tomar decisiones rápidas. La práctica repetida mejora la velocidad de acceso a conocimientos almacenados — lo que los psicólogos cognitivos llaman "fluidez de recuperación".' },
      { titulo: 'Geografía Aplicada', texto: 'En lugar de memorizar capitales de una lista, el alumno aprende asociaciones ricas: "Japón = Asia + hemisferio norte + más de 100M habitantes + Monte Fuji + participó en ambas guerras". Estas redes asociativas son mucho más resistentes al olvido.' },
    ],
    ejemplo: 'Las pistas dicen: "Hemisferio sur", "Más de 500.000 km²", "Se habla portugués". El alumno que conecta estos tres datos rápidamente escribe "Brasil" y gana +20 segundos para el siguiente país. En una partida de 90 segundos puede acertar 5-8 países.',
    asignatura: 'Geografía',
    niveles: 'Primaria, ESO, Bachillerato',
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
    <div className="relative z-10 min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-10 max-w-3xl mx-auto">

      <Link to="/info/juegos" className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
        ← Volver al catálogo
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{ficha.emoji}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{ficha.titulo}</h1>
            <p className="text-white/40 text-lg">{ficha.subtitulo}</p>
          </div>
        </div>
        <p className="text-white/60 leading-relaxed text-lg">{ficha.intro}</p>
        <div className="flex gap-3 mt-4">
          <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.asignatura}</span>
          <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-full">{ficha.niveles}</span>
        </div>

        <Link to={ficha.path}
          className="inline-block mt-6 py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
          Jugar a {ficha.titulo} →
        </Link>
      </header>

      {/* Beneficios */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🧠</span>
          Beneficios Pedagógicos y Base Científica
        </h2>
        <div className="space-y-5">
          {ficha.beneficios.map(b => (
            <div key={b.titulo} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-black text-white text-lg mb-2">{b.titulo}</h3>
              <p className="text-white/50 leading-relaxed">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ejemplo */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
          <span className="text-3xl">💡</span>
          Ejemplo Práctico de Aplicación
        </h2>
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6">
          <p className="text-violet-200 leading-relaxed italic">"{ficha.ejemplo}"</p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center border-t border-white/10 pt-10">
        <h2 className="text-2xl font-black text-white mb-3">¿Listo para poner a prueba tu mente?</h2>
        <p className="text-white/40 mb-6">Accede gratis a Tuthor y empieza a mejorar ahora.</p>
        <Link to={ficha.path}
          className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
          Jugar a {ficha.titulo} →
        </Link>
      </section>
    </div>
  )
}
