import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOHead from '../components/SEOHead'

// Superficie oscura casi opaca: legibilidad sobre el fondo del bosque
const SURF = 'rgba(17,20,29,0.86)'

const DATA = {
  es: {
    h1: 'Juegos Educativos Online',
    intro: 'Herramientas interactivas diseñadas por docentes para facilitar el estudio de asignaturas clave en Primaria, Secundaria y Bachillerato.',
    body: 'Nuestro método combina la ciencia pedagógica con la gamificación para mejorar el rendimiento escolar desde casa. Cada juego activa habilidades cognitivas reales mientras el alumno se divierte.',
    proximamente: 'Ciencias, Idiomas y más — Próximamente',
    proximamenteTexto: 'Estamos desarrollando juegos de ciencias naturales, vocabulario en inglés, química elemental y física aplicada. Todos seguirán el mismo enfoque: aprender jugando, con base científica y adaptados a los temarios oficiales.',
    cta: 'Ir a jugar ahora →',
    verMas: 'Ver beneficios y jugar →',
    categorias: [
      { titulo: 'Matemáticas y Cálculo Mental', emoji: '📐', texto: 'El bloque de matemáticas está diseñado para desarrollar la agilidad numérica y romper la barrera ante el cálculo abstracto. A través de mecánicas de puzzle y roguelike, los estudiantes interiorizan operaciones aritméticas de forma natural.' },
      { titulo: 'Historia y Ciencias Sociales', emoji: '⏳', texto: 'Aprender fechas, contextos y personajes históricos no tiene por qué ser memorización pasiva. Nuestros juegos convierten los temarios oficiales en experiencias interactivas que fijan los conceptos de forma duradera.' },
      { titulo: 'Geografía', emoji: '🌍', texto: 'La geografía cobra vida cuando tienes que pensar rápido. Aprende países, continentes, ríos y montañas a través de pistas progresivas que te obligan a conectar datos geográficos en tiempo real.' },
      { titulo: 'Idiomas y Gramática', emoji: '🔍', texto: 'Trabajar vocabulario, categorías gramaticales y ortografía de forma activa es mucho más eficaz que estudiar listas de palabras. Nuestros juegos de lengua plantean retos contextualizados que refuerzan el español, el catalán y el inglés.' },
      { titulo: 'Economía y Finanzas Personales', emoji: '💰', texto: 'Entender el dinero de verdad requiere tomar decisiones, no memorizar definiciones. Nuestro simulador de vida financiera enseña inflación, interés compuesto, deuda y señales de estafa jugando una vida entera.' },
      { titulo: 'Física y Fuerzas', emoji: '🧭', texto: 'La física se entiende mejor viéndola. Nuestros juegos convierten conceptos como las fuerzas, los vectores y el equilibrio en retos visuales donde el alumno predice el resultado y comprueba al instante si acertó.' },
      { titulo: 'Química y Reacciones', emoji: '⚗️', texto: 'Ajustar ecuaciones químicas suele ser puro cálculo abstracto. Nuestros juegos lo convierten en equilibrar una balanza: el alumno cambia los coeficientes y ve, elemento a elemento, cómo se cumple la ley de conservación de la masa.' },
    ],
  },
  en: {
    h1: 'Online Educational Games',
    intro: 'Interactive tools designed by teachers to make studying key subjects in Primary, Secondary and Sixth Form easier.',
    body: 'Our method combines pedagogical science with gamification to improve school performance from home. Every game activates real cognitive skills while the student has fun.',
    proximamente: 'Science, Languages & more — Coming soon',
    proximamenteTexto: 'We are developing games for natural sciences, English vocabulary, basic chemistry and applied physics. All will follow the same approach: learning through play, evidence-based and aligned with official syllabuses.',
    cta: 'Start playing now →',
    verMas: 'See benefits & play →',
    categorias: [
      { titulo: 'Maths & Mental Arithmetic', emoji: '📐', texto: 'The maths module is designed to build numerical agility and break through the barrier of abstract calculation. Through puzzle and roguelike mechanics, students internalise arithmetic operations naturally.' },
      { titulo: 'History & Social Sciences', emoji: '⏳', texto: 'Learning dates, contexts and historical figures does not have to be passive memorisation. Our games turn official syllabuses into interactive experiences that make concepts stick.' },
      { titulo: 'Geography', emoji: '🌍', texto: 'Geography comes alive when you have to think fast. Learn countries, continents, rivers and mountains through progressive clues that force you to connect geographical data in real time.' },
      { titulo: 'Languages & Grammar', emoji: '🔍', texto: 'Actively working on vocabulary, word classes and spelling is far more effective than studying word lists. Our language games present contextualised challenges that reinforce Spanish, Catalan and English.' },
      { titulo: 'Economics & Personal Finance', emoji: '💰', texto: 'Truly understanding money takes making decisions, not memorising definitions. Our financial life simulator teaches inflation, compound interest, debt and scam signals by playing out a whole life.' },
      { titulo: 'Physics & Forces', emoji: '🧭', texto: 'Physics is best understood by seeing it. Our games turn concepts like forces, vectors and equilibrium into visual challenges where the student predicts the outcome and checks instantly whether they were right.' },
      { titulo: 'Chemistry & Reactions', emoji: '⚗️', texto: 'Balancing chemical equations is usually pure abstract calculation. Our games turn it into balancing a scale: the student changes the coefficients and sees, element by element, how the law of conservation of mass is met.' },
    ],
  },
  ca: {
    h1: 'Jocs Educatius en Línia',
    intro: 'Eines interactives dissenyades per docents per facilitar l\'estudi d\'assignatures clau a Primària, Secundària i Batxillerat.',
    body: 'El nostre mètode combina la ciència pedagògica amb la gamificació per millorar el rendiment escolar des de casa. Cada joc activa habilitats cognitives reals mentre l\'alumne es diverteix.',
    proximamente: 'Ciències, Idiomes i més — Pròximament',
    proximamenteTexto: 'Estem desenvolupant jocs de ciències naturals, vocabulari en anglès, química elemental i física aplicada. Tots seguiran el mateix enfocament: aprendre jugant, amb base científica i adaptats als temaris oficials.',
    cta: 'Anar a jugar ara →',
    verMas: 'Veure beneficis i jugar →',
    categorias: [
      { titulo: 'Matemàtiques i Càlcul Mental', emoji: '📐', texto: 'El bloc de matemàtiques està dissenyat per desenvolupar l\'agilitat numèrica i trencar la barrera davant el càlcul abstracte. A través de mecàniques de puzzle i roguelike, els estudiants interioritzen operacions aritmètiques de forma natural.' },
      { titulo: 'Història i Ciències Socials', emoji: '⏳', texto: 'Aprendre dates, contextos i personatges històrics no ha de ser memorització passiva. Els nostres jocs converteixen els temaris oficials en experiències interactives que fixen els conceptes de forma duradora.' },
      { titulo: 'Geografia', emoji: '🌍', texto: 'La geografia pren vida quan has de pensar ràpid. Aprèn països, continents, rius i muntanyes a través de pistes progressives que t\'obliguen a connectar dades geogràfiques en temps real.' },
      { titulo: 'Idiomes i Gramàtica', emoji: '🔍', texto: 'Treballar vocabulari, categories gramaticals i ortografia de forma activa és molt més eficaç que estudiar llistes de paraules. Els nostres jocs de llengua plantegen reptes contextualitzats que reforcen el català, el castellà i l\'anglès.' },
      { titulo: 'Economia i Finances Personals', emoji: '💰', texto: 'Entendre els diners de debò requereix prendre decisions, no memoritzar definicions. El nostre simulador de vida financera ensenya inflació, interès compost, deute i senyals d\'estafa jugant una vida sencera.' },
      { titulo: 'Física i Forces', emoji: '🧭', texto: 'La física s\'entén millor veient-la. Els nostres jocs converteixen conceptes com les forces, els vectors i l\'equilibri en reptes visuals on l\'alumne prediu el resultat i comprova a l\'instant si ha encertat.' },
      { titulo: 'Química i Reaccions', emoji: '⚗️', texto: 'Ajustar equacions químiques sol ser pur càlcul abstracte. Els nostres jocs ho converteixen en equilibrar una balança: l\'alumne canvia els coeficients i veu, element a element, com es compleix la llei de conservació de la massa.' },
    ],
  },
}

const JUEGOS = {
  es: [
    [
      { slug: 'acercate', titulo: 'Acércate al Número', desc: 'Combina operaciones para llegar al número objetivo. Roguelike con mejoras entre niveles.', emoji: '🎯', gradient: 'from-pink-600 to-rose-800', tags: ['Mates','Roguelike'] },
      { slug: 'numpath', titulo: 'NumPath', desc: 'Navega por una cuadrícula de operaciones y alcanza las metas con la puntuación exacta.', emoji: '🧮', gradient: 'from-yellow-500 to-orange-500', tags: ['Mates','Estrategia'] },
      { slug: 'funciones-grafica', titulo: 'Caza la Función', desc: 'Lee una gráfica y ajusta la pendiente y la ordenada (o a, b, c) hasta que tu recta o parábola encaje sobre la objetivo.', emoji: '📈', gradient: 'from-pink-600 to-rose-800', tags: ['Mates','Funciones'] },
      { slug: 'balanza-algebraica', titulo: 'Balanza Algebraica', desc: 'Resuelve ecuaciones con el método de la balanza: toca un término para restarlo a los dos lados y divide hasta dejar la x sola.', emoji: '⚖️', gradient: 'from-violet-600 to-indigo-800', tags: ['Mates','Ecuaciones'] },
    ],
    [
      { slug: 'tuthor-time', titulo: 'Tuthor Time', desc: 'Viaja en el tiempo y acierta el año de cada evento histórico.', emoji: '🕰️', gradient: 'from-amber-600 to-orange-800', tags: ['Historia','Fechas'] },
      { slug: 'linea-temporal', titulo: 'Línea Temporal', desc: 'Ordena eventos históricos cronológicamente sin ver fechas.', emoji: '📜', gradient: 'from-emerald-600 to-teal-800', tags: ['Historia','Orden'] },
      { slug: 'quien-es-quien', titulo: '¿Quién es Quién?', desc: 'Descubre el personaje histórico secreto usando pistas lógicas.', emoji: '🕵️', gradient: 'from-violet-600 to-purple-900', tags: ['Historia','Deducción'] },
      { slug: 'portadas', titulo: 'Portadas', desc: 'Lee titulares de periódicos históricos y decide si son verdad o mentira.', emoji: '📰', gradient: 'from-stone-600 to-neutral-800', tags: ['Historia','Crítico'] },
    ],
    [
      { slug: 'georush', titulo: 'GeoRush', desc: 'Adivina el país misterioso a partir de pistas geográficas.', emoji: '🌍', gradient: 'from-teal-500 to-cyan-700', tags: ['Geografía','Pistas'] },
      { slug: 'geomapa', titulo: 'GeoMapa', desc: 'Identifica el país iluminado en el mapa mundial. Pistas progresivas si fallas.', emoji: '🗺️', gradient: 'from-purple-600 to-violet-800', tags: ['Geografía','Mapa'] },
    ],
    [
      { slug: 'intruso', titulo: 'El Intruso', desc: 'Cuatro palabras, una no encaja. Vocabulario y gramática a contrarreloj en español, catalán e inglés.', emoji: '🔍', gradient: 'from-violet-500 to-purple-700', tags: ['Idiomas','Gramática'] },
      { slug: 'analiza-frases', titulo: 'Analiza la Frase', desc: 'Aparece una frase y señalas lo que se te pide: el sujeto, el predicado, los adjetivos, las palabras en femenino… Sintaxis, gramática y morfología jugando.', emoji: '🧐', gradient: 'from-violet-600 to-fuchsia-800', tags: ['Lengua','Sintaxis'] },
    ],
    [
      { slug: 'spicy', titulo: 'Spicy', desc: 'Vive una vida entera tomando decisiones de dinero: estudiar o trabajar, alquilar o invertir, ahorrar o gastar. Aprende a leer las señales de riesgo jugando.', emoji: '🌶️', gradient: 'from-amber-500 to-red-700', tags: ['Economía','Simulación'] },
    ],
    [
      { slug: 'fuerza-neta', titulo: 'Fuerza Neta', desc: 'Suma las fuerzas que actúan sobre una caja y predice hacia dónde se mueve, o si está en equilibrio. Incluye fuerzas diagonales.', emoji: '🧭', gradient: 'from-sky-600 to-blue-800', tags: ['Física','Vectores'] },
      { slug: 'balanza', titulo: 'Equilibra la Balanza', desc: 'Coloca el peso a la distancia correcta para equilibrar la balanza. Palancas, momentos y la ley de la palanca.', emoji: '⚖️', gradient: 'from-teal-600 to-emerald-800', tags: ['Física','Palancas'] },
    ],
    [
      { slug: 'balanza-ecuaciones', titulo: 'Balanza de Ecuaciones', desc: 'Ajusta los coeficientes de una reacción hasta que haya los mismos átomos de cada elemento a los dos lados. Ley de conservación de la masa jugando.', emoji: '⚗️', gradient: 'from-emerald-600 to-teal-800', tags: ['Química','Reacciones'] },
    ],
  ],
  en: [
    [
      { slug: 'acercate', titulo: 'Target Number', desc: 'Combine operations to reach the target number. Roguelike with upgrades between levels.', emoji: '🎯', gradient: 'from-pink-600 to-rose-800', tags: ['Maths','Roguelike'] },
      { slug: 'numpath', titulo: 'NumPath', desc: 'Navigate a grid of operations and reach goals with the exact score.', emoji: '🧮', gradient: 'from-yellow-500 to-orange-500', tags: ['Maths','Strategy'] },
      { slug: 'funciones-grafica', titulo: 'Function Hunt', desc: 'Read a graph and adjust the slope and intercept (or a, b, c) until your line or parabola matches the target.', emoji: '📈', gradient: 'from-pink-600 to-rose-800', tags: ['Maths','Functions'] },
      { slug: 'balanza-algebraica', titulo: 'Algebra Balance', desc: 'Solve equations with the balance method: tap a term to subtract it from both sides and divide until x stands alone.', emoji: '⚖️', gradient: 'from-violet-600 to-indigo-800', tags: ['Maths','Equations'] },
    ],
    [
      { slug: 'tuthor-time', titulo: 'Tuthor Time', desc: 'Travel through time and guess the year of each historical event.', emoji: '🕰️', gradient: 'from-amber-600 to-orange-800', tags: ['History','Dates'] },
      { slug: 'linea-temporal', titulo: 'Timeline', desc: 'Place historical events in chronological order without seeing dates.', emoji: '📜', gradient: 'from-emerald-600 to-teal-800', tags: ['History','Order'] },
      { slug: 'quien-es-quien', titulo: 'Who is Who?', desc: 'Discover the secret historical figure using logical clues.', emoji: '🕵️', gradient: 'from-violet-600 to-purple-900', tags: ['History','Deduction'] },
      { slug: 'portadas', titulo: 'Headlines', desc: 'Read historical newspaper headlines and decide if they are true or false.', emoji: '📰', gradient: 'from-stone-600 to-neutral-800', tags: ['History','Critical'] },
    ],
    [
      { slug: 'georush', titulo: 'GeoRush', desc: 'Guess the mystery country from geographical, demographic and historical clues.', emoji: '🌍', gradient: 'from-teal-500 to-cyan-700', tags: ['Geography','Clues'] },
      { slug: 'geomapa', titulo: 'GeoMapa', desc: 'Identify the highlighted country on the world map. Progressive hints if you miss.', emoji: '🗺️', gradient: 'from-purple-600 to-violet-800', tags: ['Geography','Map'] },
    ],
    [
      { slug: 'intruso', titulo: 'Odd One Out', desc: 'Four words, one does not fit. Vocabulary and grammar against the clock in Spanish, Catalan and English.', emoji: '🔍', gradient: 'from-violet-500 to-purple-700', tags: ['Languages','Grammar'] },
      { slug: 'analiza-frases', titulo: 'Analyse the Sentence', desc: 'A sentence appears and you point out what is asked: the subject, the predicate, the adjectives, the plural words… Syntax, grammar and morphology by playing.', emoji: '🧐', gradient: 'from-violet-600 to-fuchsia-800', tags: ['Language','Syntax'] },
    ],
    [
      { slug: 'spicy', titulo: 'Spicy', desc: 'Live an entire life making money decisions: study or work, rent or invest, save or spend. Learn to read risk signals by playing.', emoji: '🌶️', gradient: 'from-amber-500 to-red-700', tags: ['Economics','Simulation'] },
    ],
    [
      { slug: 'fuerza-neta', titulo: 'Net Force', desc: 'Add up the forces acting on a box and predict which way it moves, or if it is balanced. Includes diagonal forces.', emoji: '🧭', gradient: 'from-sky-600 to-blue-800', tags: ['Physics','Vectors'] },
      { slug: 'balanza', titulo: 'Balance the Scale', desc: 'Place the weight at the right distance to balance the scale. Levers, moments and the law of the lever.', emoji: '⚖️', gradient: 'from-teal-600 to-emerald-800', tags: ['Physics','Levers'] },
    ],
    [
      { slug: 'balanza-ecuaciones', titulo: 'Equation Balancer', desc: 'Adjust the coefficients of a reaction until there are the same atoms of each element on both sides. The law of conservation of mass by playing.', emoji: '⚗️', gradient: 'from-emerald-600 to-teal-800', tags: ['Chemistry','Reactions'] },
    ],
  ],
  ca: [
    [
      { slug: 'acercate', titulo: 'Acosta\'t al Número', desc: 'Combina operacions per arribar al número objectiu. Roguelike amb millores entre nivells.', emoji: '🎯', gradient: 'from-pink-600 to-rose-800', tags: ['Mates','Roguelike'] },
      { slug: 'numpath', titulo: 'NumPath', desc: 'Navega per una quadrícula d\'operacions i arriba a les metes amb la puntuació exacta.', emoji: '🧮', gradient: 'from-yellow-500 to-orange-500', tags: ['Mates','Estratègia'] },
      { slug: 'funciones-grafica', titulo: 'Caça la Funció', desc: 'Llegeix una gràfica i ajusta el pendent i l’ordenada (o a, b, c) fins que la teva recta o paràbola encaixi sobre l’objectiu.', emoji: '📈', gradient: 'from-pink-600 to-rose-800', tags: ['Mates','Funcions'] },
      { slug: 'balanza-algebraica', titulo: 'Balança Algebraica', desc: 'Resol equacions amb el mètode de la balança: toca un terme per restar-lo als dos costats i divideix fins a deixar la x sola.', emoji: '⚖️', gradient: 'from-violet-600 to-indigo-800', tags: ['Mates','Equacions'] },
    ],
    [
      { slug: 'tuthor-time', titulo: 'Tuthor Time', desc: 'Viatja en el temps i encerta l\'any de cada esdeveniment històric.', emoji: '🕰️', gradient: 'from-amber-600 to-orange-800', tags: ['Història','Dates'] },
      { slug: 'linea-temporal', titulo: 'Línia Temporal', desc: 'Ordena esdeveniments històrics cronològicament sense veure dates.', emoji: '📜', gradient: 'from-emerald-600 to-teal-800', tags: ['Història','Ordre'] },
      { slug: 'quien-es-quien', titulo: 'Qui és Qui?', desc: 'Descobreix el personatge històric secret fent servir pistes lògiques.', emoji: '🕵️', gradient: 'from-violet-600 to-purple-900', tags: ['Història','Deducció'] },
      { slug: 'portadas', titulo: 'Portades', desc: 'Llegeix titulars de diaris històrics i decideix si són veritat o mentida.', emoji: '📰', gradient: 'from-stone-600 to-neutral-800', tags: ['Història','Crític'] },
    ],
    [
      { slug: 'georush', titulo: 'GeoRush', desc: 'Endevina el país misteriós a partir de pistes geogràfiques.', emoji: '🌍', gradient: 'from-teal-500 to-cyan-700', tags: ['Geografia','Pistes'] },
      { slug: 'geomapa', titulo: 'GeoMapa', desc: 'Identifica el país il·luminat al mapa mundial. Pistes progressives si falles.', emoji: '🗺️', gradient: 'from-purple-600 to-violet-800', tags: ['Geografia','Mapa'] },
    ],
    [
      { slug: 'intruso', titulo: "L'Intrús", desc: 'Quatre paraules, una no hi encaixa. Vocabulari i gramàtica a contrarellotge en català, castellà i anglès.', emoji: '🔍', gradient: 'from-violet-500 to-purple-700', tags: ['Idiomes','Gramàtica'] },
      { slug: 'analiza-frases', titulo: 'Analitza la Frase', desc: 'Apareix una frase i assenyales el que se’t demana: el subjecte, el predicat, els adjectius, les paraules en femení… Sintaxi, gramàtica i morfologia jugant.', emoji: '🧐', gradient: 'from-violet-600 to-fuchsia-800', tags: ['Llengua','Sintaxi'] },
    ],
    [
      { slug: 'spicy', titulo: 'Spicy', desc: 'Viu una vida sencera prenent decisions de diners: estudiar o treballar, llogar o invertir, estalviar o gastar. Aprèn a llegir els senyals de risc jugant.', emoji: '🌶️', gradient: 'from-amber-500 to-red-700', tags: ['Economia','Simulació'] },
    ],
    [
      { slug: 'fuerza-neta', titulo: 'Força Neta', desc: 'Suma les forces que actuen sobre una caixa i prediu cap on es mou, o si està en equilibri. Inclou forces diagonals.', emoji: '🧭', gradient: 'from-sky-600 to-blue-800', tags: ['Física','Vectors'] },
      { slug: 'balanza', titulo: 'Equilibra la Balança', desc: 'Col·loca el pes a la distància correcta per equilibrar la balança. Palanques, moments i la llei de la palanca.', emoji: '⚖️', gradient: 'from-teal-600 to-emerald-800', tags: ['Física','Palanques'] },
    ],
    [
      { slug: 'balanza-ecuaciones', titulo: 'Balança d’Equacions', desc: 'Ajusta els coeficients d’una reacció fins que hi hagi els mateixos àtoms de cada element als dos costats. Llei de conservació de la massa jugant.', emoji: '⚗️', gradient: 'from-emerald-600 to-teal-800', tags: ['Química','Reaccions'] },
    ],
  ],
}

export default function InfoJuegosHub() {
  const { lang, localPath } = useLang()
  const d = DATA[lang] || DATA.es
  const juegos = JUEGOS[lang] || JUEGOS.es

  const seoHub = {
    es: { title: 'Guía de Juegos Educativos', desc: 'Descubre todos los juegos educativos de Tuthor: historia, geografía, matemáticas y lengua. Beneficios pedagógicos, ejemplos y cómo jugar sin pantallas.' },
    en: { title: 'Educational Games Guide', desc: 'Discover all Tuthor educational games: history, geography, maths and languages. Pedagogical benefits, examples and how to play without screens.' },
    ca: { title: 'Guia de Jocs Educatius', desc: 'Descobreix tots els jocs educatius de Tuthor: història, geografia, matemàtiques i llengua. Beneficis pedagògics, exemples i com jugar sense pantalles.' },
  }[lang] || {}

  return (
    <div className="relative z-10">
      <SEOHead title={seoHub.title} description={seoHub.desc} path={lang==='en'?'/en/info/juegos':lang==='ca'?'/ca/info/juegos':'/info/juegos'} lang={lang} />
      <div className="px-4 sm:px-8 py-10 max-w-4xl mx-auto">
        <Link to={localPath('/')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← {lang === 'en' ? 'Home' : lang === 'ca' ? 'Inici' : 'Inicio'}
        </Link>
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">{d.h1}</h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">{d.intro}</p>
        </header>
      </div>

      <div className="text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-12 space-y-10">

          <p className="text-white/60 leading-relaxed max-w-2xl mx-auto text-center text-lg">{d.body}</p>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-juegos" style={{ minHeight: '90px' }} />

          {d.categorias.map((cat, catIdx) => (
            <section key={cat.titulo}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.emoji}</span>
                <h2 className="text-2xl font-black text-white">{cat.titulo}</h2>
              </div>
              <p className="text-white/60 leading-relaxed mb-6 max-w-3xl">{cat.texto}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                {juegos[catIdx].map(j => (
                  <Link key={j.slug} to={localPath(`/info/juegos/${j.slug}`)}
                    className="group rounded-2xl border border-white/10 hover:border-white/25 overflow-hidden transition-all hover:scale-[1.01]"
                    style={{ background: SURF }}>
                    <div className={`bg-gradient-to-br ${j.gradient} h-28 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                      <span className="text-5xl relative drop-shadow-lg group-hover:scale-110 transition-transform">{j.emoji}</span>
                      <div className="absolute bottom-2 right-3 flex gap-1.5">
                        {j.tags.map(t => (
                          <span key={t} className="text-[10px] font-bold bg-black/40 text-white/90 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-white text-lg group-hover:text-amber-400 transition-colors mb-1">{j.titulo}</h3>
                      <p className="text-white/55 text-sm leading-relaxed mb-3">{j.desc}</p>
                      <span className="text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-colors">{d.verMas}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {catIdx < d.categorias.length - 1 && (
                <>
                  <aside className="ad-slot" aria-label="Publicidad" data-ad-slot={`info-juegos-${catIdx}`} style={{ minHeight: '90px', marginTop: '2rem' }} />
                  <hr className="border-white/10 mt-6" />
                </>
              )}
            </section>
          ))}

          <section>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🔬</span>
              <h2 className="text-2xl font-black text-white">{d.proximamente}</h2>
            </div>
            <p className="text-white/60 leading-relaxed max-w-3xl">{d.proximamenteTexto}</p>
          </section>

          <aside className="ad-slot" aria-label="Publicidad" data-ad-slot="info-juegos-bottom" style={{ minHeight: '90px' }} />

          <footer className="text-center pt-4">
            <Link to={localPath('/juegos')}
              className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
              {d.cta}
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
