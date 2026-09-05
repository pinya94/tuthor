// ── Resolución de meta SEO por URL ───────────────────────────────────────────
// Módulo puro (sin I/O): dado un path neutro y un idioma devuelve
// { title, desc }. Lo usan scripts/prerender.mjs (build) y los tests de
// invariantes (src/lib/__tests__), que comprueban que toda URL del sitemap
// resuelve meta específica.
//
// Fuentes (las mismas que usan las páginas):
//   - src/lib/exams.js      → /examen/*
//   - src/lib/games.js      → /juegos/*
//   - src/data/fichasEstudiarIndex.js → /info/estudiar/* (una ficha por fichero)
//   - src/data/infoJuegosFichas.js   → /info/juegos/*
//   - STATIC_META (abajo)   → portadas de sección y páginas sueltas

import { EXAMS } from '../src/lib/exams.js'
import { GAMES } from '../src/lib/games.js'
import { CICLOS } from '../src/data/ciclosCientificos.js'
import { TEMAS_DIAGNOSTICO } from '../src/data/diagnostico.js'
import { FICHAS as FICHAS_ESTUDIAR } from '../src/data/fichasEstudiarIndex.js'
import {
  FICHAS_ES as JUEGOS_FICHAS_ES,
  FICHAS_EN as JUEGOS_FICHAS_EN,
} from '../src/data/infoJuegosFichas.js'

export const BASE_URL = 'https://www.tuthor.es'
// Idiomas publicados en hreflang — mantener en sintonía con SEOHead.jsx
export const HREFLANG_LANGS = ['es', 'en']

// ── Meta manual de páginas estáticas (path neutro, sin prefijo de idioma) ───
export const STATIC_META = {
  // La raíz es la landing de venta desde el pivot a suscripción. Mantener en
  // sintonía con el <SEOHead> de Landing.jsx: el prerender genera el HTML que
  // ven crawlers y scrapers, que no ejecutan JS.
  //
  // /app NO tiene entrada aquí, y NO está en el sitemap: es el panel privado
  // de quien ya tiene cuenta, no una página de marketing. Sin sesión
  // redirige a "/" — y esa redirección se dispara también durante el
  // prerender (nunca hay sesión ahí), así que indexarla arriesgaba a que el
  // prerender se quedara esperando algo que no llega nunca.
  '/': {
    es: { title: 'Aprende jugando: el mismo concepto desde varios ángulos', desc: 'Plataforma educativa para Primaria, ESO y Bachillerato. Juegos y exámenes en 11 materias, con panel de seguimiento para padres. Cada concepto, explicado de varias formas distintas.' },
    en: { title: 'Learn by playing: one concept, several angles', desc: 'Educational platform for primary and secondary school. Games and exams across 11 subjects, with a tracking panel for parents. Every concept, explained in several different ways.' },
  },
  // Sin "gratis" desde el muro de pago: los temarios y las fichas siguen
  // abiertos, pero jugar y examinarse va con la suscripción, y estas dos
  // páginas son la puerta a ambos.
  '/estudiar': {
    es: { title: 'Estudiar por materias', desc: 'Elige materia y repasa con juegos y exámenes tipo test: historia, matemáticas, geografía, ciencias e idiomas. Temario abierto para todos.' },
    en: { title: 'Study by subject', desc: 'Pick a subject and revise with games and quizzes: history, maths, geography, science and languages. Study notes open to everyone.' },
  },
  '/juegos': {
    es: { title: 'Juegos educativos por materia', desc: 'Catálogo de juegos educativos: cálculo mental, cronología histórica, geografía y vocabulario. Partidas de 5 minutos con ranking y monedas.' },
    en: { title: 'Educational games by subject', desc: 'Catalogue of educational games: mental maths, history timelines, geography and vocabulary. 5-minute rounds with rankings and coins.' },
  },
  '/estudiar/historia': {
    es: { title: 'Historia — temas y exámenes', desc: 'Repasa historia con juegos: Guerra Civil, Segunda Guerra Mundial, Roma, líneas temporales y personajes. Exámenes tipo test con nota.' },
    en: { title: 'History — topics and exams', desc: 'Revise history with games: Spanish Civil War, WWII, Ancient Rome, timelines and famous figures. Multiple-choice exams with grades.' },
  },
  '/estudiar/matematicas': {
    es: { title: 'Matemáticas — práctica y exámenes', desc: 'Cálculo mental, fracciones, álgebra, geometría, estadística y funciones. Practica en modo libre o ponte a prueba con exámenes con nota.' },
    en: { title: 'Maths — practice and exams', desc: 'Mental arithmetic, fractions, algebra, geometry, statistics and functions. Practise freely or test yourself with graded exams.' },
  },
  '/estudiar/geografia': {
    es: { title: 'Geografía — mapas y exámenes', desc: 'Aprende países, capitales y banderas de todos los continentes con mapas interactivos y exámenes tipo test. España y EE. UU. incluidos.' },
    en: { title: 'Geography — maps and exams', desc: 'Learn countries, capitals and flags of every continent with interactive maps and quizzes. Spain and USA maps included.' },
  },
  '/estudiar/quimica': {
    es: { title: 'Química — temas y exámenes', desc: 'Tabla periódica, estados de la materia, mezclas, ácidos y átomos. Teoría breve y exámenes tipo test por nivel: Primaria, ESO y Bachillerato.' },
    en: { title: 'Chemistry — topics and exams', desc: 'Periodic table, states of matter, mixtures, acids and atoms. Short theory and level-based quizzes for primary and secondary school.' },
  },
  '/estudiar/fisica': {
    es: { title: 'Física — temas y exámenes', desc: 'Fuerzas y movimiento, energía, electricidad, ondas y luz. Teoría breve y exámenes tipo test por nivel: Primaria, ESO y Bachillerato.' },
    en: { title: 'Physics — topics and exams', desc: 'Forces and motion, energy, electricity, waves and light. Short theory and level-based quizzes for primary and secondary school.' },
  },
  '/estudiar/biologia': {
    es: { title: 'Biología — temas y exámenes', desc: 'La célula, cuerpo humano, seres vivos, ecosistemas, genética y nutrición. Teoría breve y exámenes tipo test por nivel.' },
    en: { title: 'Biology — topics and exams', desc: 'The cell, human body, living things, ecosystems, genetics and nutrition. Short theory and level-based quizzes for school.' },
  },
  '/estudiar/geologia': {
    es: { title: 'Geología y el Universo — temas y exámenes', desc: 'Rocas y minerales y el sistema solar. Teoría breve, juegos y exámenes tipo test por nivel: Primaria, ESO y Bachillerato.' },
    en: { title: 'Geology & the Universe — topics and exams', desc: 'Rocks and minerals and the solar system. Short theory, games and level-based quizzes for primary and secondary school.' },
  },
  '/estudiar/economia': {
    es: { title: 'Economía — Finanzas Personales', desc: 'Inflación, interés compuesto, deuda y señales de estafa. Repasa con el examen tipo test o vive una vida entera en el simulador Spicy.' },
    en: { title: 'Economics — Personal Finance', desc: 'Inflation, compound interest, debt and scam signals. Revise with the quiz or live a whole life in the Spicy simulator.' },
  },
  '/estudiar/musica': {
    es: { title: 'Música — teoría y exámenes', desc: 'Lectura de partituras y ritmo. Teoría breve y exámenes interactivos con piano virtual, para Primaria, ESO y Bachillerato.' },
    en: { title: 'Music — theory and exams', desc: 'Sheet music reading and rhythm. Short theory and interactive exams with a virtual piano, for primary and secondary school.' },
  },
  '/estudiar/vida-practica': {
    es: { title: 'Primeros Auxilios — teoría y práctica', desc: 'Practica primeros auxilios tema a tema: atragantamiento, quemaduras, desmayo, cortes y picaduras. Ordena los pasos y toma las decisiones correctas.' },
    en: { title: 'First Aid — theory and practice', desc: 'Practice first aid topic by topic: choking, burns, fainting, cuts and stings. Order the steps and make the right calls.' },
  },
  '/estudiar/idiomas': {
    es: { title: 'Idiomas — español e inglés', desc: 'Gramática y ortografía del español, grammar del inglés. Teoría breve con ejemplos y exámenes tipo test con explicación en cada respuesta.' },
    en: { title: 'Languages — Spanish and English', desc: 'Spanish grammar and spelling, English grammar. Short theory with examples and quizzes with an explanation for every answer.' },
  },
  '/estudiar/idiomas/espanol': {
    es: { title: 'Lengua Española — gramática y ortografía', desc: 'Sustantivos, verbos, sintaxis, acentuación y ortografía. Teoría con ejemplos y exámenes tipo test para Primaria y ESO.' },
    en: { title: 'Spanish — grammar and spelling', desc: 'Nouns, verbs, syntax, accents and spelling. Theory with examples and multiple-choice tests for primary and secondary school.' },
  },
  '/estudiar/idiomas/espanol/gramatica': {
    es: { title: 'Gramática española — teoría y exámenes', desc: 'Sustantivos, verbos y sintaxis con teoría breve, ejemplos y exámenes tipo test con explicación. Para Primaria y ESO.' },
    en: { title: 'Spanish grammar — theory and tests', desc: 'Nouns, verbs and syntax with short theory, examples and multiple-choice tests with explanations. For primary and secondary levels.' },
  },
  '/estudiar/idiomas/espanol/ortografia': {
    es: { title: 'Ortografía española — teoría y exámenes', desc: 'Acentuación, B y V, y las reglas de ortografía que más caen en examen. Teoría breve y tests con explicación en cada respuesta.' },
    en: { title: 'Spanish spelling — theory and tests', desc: 'Accents, B vs V and the spelling rules that matter most in exams. Short theory and quizzes with explained answers.' },
  },
  '/estudiar/idiomas/ingles': {
    es: { title: 'Inglés — grammar y exámenes', desc: 'Present simple, past simple, present perfect, articles y passive voice. Teoría breve y exámenes tipo test con explicación.' },
    en: { title: 'English — grammar and tests', desc: 'Present simple, past simple, present perfect, articles and passive voice. Short theory and multiple-choice tests with explanations.' },
  },
  '/estudiar/idiomas/ingles/grammar': {
    es: { title: 'English grammar — teoría y exámenes', desc: 'Los tiempos verbales y estructuras del inglés que entran en examen, con teoría breve, ejemplos y tests con explicación.' },
    en: { title: 'English grammar — theory and tests', desc: 'The English tenses and structures that come up in exams, with short theory, examples and explained quizzes.' },
  },
  '/examen/historia': {
    es: { title: 'Examen de Historia tipo test', desc: 'Ponte a prueba con preguntas de historia de España y universal: fechas, personajes y acontecimientos. Con nota final y explicaciones.' },
    en: { title: 'History multiple-choice exam', desc: 'Test yourself with Spanish and world history questions: dates, figures and events. Final grade and explanations included.' },
  },
  '/examen/linea-temporal': {
    es: { title: 'Examen de Línea Temporal', desc: 'Ordena acontecimientos históricos en su línea temporal: de la Prehistoria a la actualidad. Examen con nota y ranking.' },
    en: { title: 'Timeline exam', desc: 'Put historical events in the right order on the timeline, from prehistory to today. Graded exam with rankings.' },
  },
  '/info/estudiar': {
    es: { title: 'Guías de estudio por tema', desc: 'Guías de cada tema: qué entra en el examen, consejos de estudio y acceso directo al test interactivo. Historia, mates, ciencias e idiomas.' },
    en: { title: 'Study guides by topic', desc: 'Guides for every topic: what the exam covers, study tips and direct access to the interactive test. History, maths, science and languages.' },
  },
  '/info/juegos': {
    es: { title: 'Juegos educativos — base pedagógica', desc: 'Qué trabaja cada juego de Tuthor, su base pedagógica y cómo jugarlo también en papel. Guía para familias y profesores.' },
    en: { title: 'Educational games — pedagogical basis', desc: 'What each Tuthor game trains, its pedagogical basis and how to play it on paper too. A guide for families and teachers.' },
  },
  '/info/diaria': {
    es: { title: 'Pregunta diaria — crea el hábito de estudio', desc: 'Un reto nuevo cada día de 2 minutos: trivia, cálculo o geografía. La ciencia del hábito aplicada al estudio, con rachas y recompensas.' },
    en: { title: 'Daily question — build a study habit', desc: 'A new 2-minute challenge every day: trivia, arithmetic or geography. Habit science applied to studying, with streaks and rewards.' },
  },
  '/privacidad': {
    es: { title: 'Política de privacidad', desc: 'Política de privacidad y protección de datos de Tuthor: qué datos tratamos, con qué finalidad y cuáles son tus derechos.' },
    en: { title: 'Privacy policy', desc: 'Tuthor privacy and data protection policy: what data we process, why, and what your rights are.' },
  },
  '/recursos': {
    es: { title: 'Recursos imprimibles para profesores', desc: 'Tarjetas listas para recortar: eventos históricos por época, países y capitales, elementos químicos y titulares verdaderos y falsos. Gratis y sin registro.' },
    en: { title: 'Printable classroom resources', desc: 'Cards ready to cut out: historical events by period, countries and capitals, chemical elements and real vs fake headlines. Free, no sign-up.' },
  },
  '/profesores': {
    es: { title: 'Herramientas gratis para profesores', desc: 'Pasa lista, pon notas, crea tus propios exámenes y gestiona toda la clase desde el móvil. Gratis durante la beta, sin tarjeta ni permanencia.' },
    en: { title: 'Free tools for teachers', desc: 'Take attendance, grade your students, build your own quizzes and run the whole classroom from your phone. Free during the beta, no card required.' },
  },
}

// Temas de matemáticas con página propia (/estudiar/matematicas/:tema)
const MATH_TEMAS = ['algebra', 'enteros-racionales', 'estadistica', 'fracciones', 'funciones', 'geometria']

// /examen/<sufijo> cuya entrada en EXAMS usa otro id
const EXAM_PATH_ALIASES = {
  'portadas': 'portadas-examen',
  'geografia': 'geografia-examen',
  'geomapa': 'geomapa-examen',
  'geomapa-espana': 'geomapa-espana-examen',
  'geomapa-eeuu': 'geomapa-eeuu-examen',
  'portero': 'portero-examen',
  'trayectoria': 'trayectoria-examen',
}

const label = (entry, lang) => entry.label[lang] ?? entry.label.es

// Devuelve { title, desc } para un path neutro, o null si no hay meta específica.
export function resolveMeta(path, lang) {
  const l = lang === 'en' ? 'en' : 'es' // ca cae a es mientras no esté traducido

  const stat = STATIC_META[path]
  if (stat) return stat[l]

  let m = path.match(/^\/info\/estudiar\/([\w-]+)$/)
  if (m) {
    const entry = FICHAS_ESTUDIAR[m[1]]
    const ficha = entry && (entry[l] ?? entry.es)
    if (ficha) return { title: `${ficha.titulo} — ${ficha.subtitulo}`, desc: `${ficha.intro.slice(0, 155)}…` }
  }

  m = path.match(/^\/info\/juegos\/([\w-]+)$/)
  if (m) {
    const ficha = (l === 'en' ? JUEGOS_FICHAS_EN : JUEGOS_FICHAS_ES)[m[1]]
    if (ficha) return { title: `${ficha.titulo} — ${ficha.subtitulo}`, desc: `${ficha.intro.slice(0, 155)}…` }
  }

  m = path.match(/^\/examen\/([\w-]+)$/)
  if (m) {
    const exam = EXAMS[EXAM_PATH_ALIASES[m[1]] ?? m[1]]
    if (exam) {
      const name = label(exam, l)
      // Sin "gratis": los exámenes van con la suscripción desde el muro de
      // pago. Anunciar como gratuito lo que se cobra genera devoluciones y
      // reseñas malas, y sale en el título de ~88 páginas.
      return l === 'en'
        ? { title: `${name} — multiple-choice exam`, desc: `Interactive ${name} exam with instant feedback, explained answers and a final grade. For primary and secondary school students.` }
        : { title: `Examen de ${name} tipo test`, desc: `Examen interactivo de ${name}, con corrección al instante, explicación en cada respuesta y nota final. Para Primaria, ESO y Bachillerato.` }
    }
  }

  m = path.match(/^\/examen\/ciclo\/([\w-]+)$/)
  if (m) {
    const ciclo = CICLOS[m[1]]
    if (ciclo) {
      const name = label(ciclo, l)
      const desc = ciclo.descripcion[l] ?? ciclo.descripcion.es
      return l === 'en'
        ? { title: `${name} — order the steps`, desc: `${desc} Interactive exam: place each step before or after the others in the right order.` }
        : { title: `Examen de ${name} — ordena los pasos`, desc: `${desc} Examen interactivo: coloca cada paso antes o después en el orden correcto.` }
    }
  }

  m = path.match(/^\/examen\/diagnostico\/([\w-]+)$/)
  if (m) {
    const diag = TEMAS_DIAGNOSTICO.find(t => t.id === m[1])
    if (diag) {
      const name = diag.titulo[l] ?? diag.titulo.es
      return l === 'en'
        ? { title: `${name} Diagnosis — revise by elimination`, desc: `Revise ${name} by ruling out candidates with progressive science clues until you find the right one. Free interactive practice.` }
        : { title: `Diagnóstico de ${name} — repasa por descarte`, desc: `Repasa ${name} descartando candidatos con pistas científicas progresivas hasta dar con el correcto. Práctica interactiva gratis.` }
    }
  }

  m = path.match(/^\/juegos\/([\w-]+)$/)
  if (m) {
    const game = Object.values(GAMES).find(g => g.route === path)
    if (game) {
      const name = label(game, l)
      // Sin "gratis" — igual que en /examen/* más abajo: jugar va con la
      // suscripción desde el muro de pago, y anunciar como gratuito lo que
      // se cobra sale en el título de ~22 páginas y genera reseñas malas.
      return l === 'en'
        ? { title: `${name} — educational game`, desc: `Play ${name}: quick 5-minute rounds, coins, rankings and real learning. For primary and secondary school students.` }
        : { title: `${name} — juego educativo`, desc: `Juega a ${name}: partidas rápidas de 5 minutos, monedas, ranking y aprendizaje real. Para Primaria, ESO y Bachillerato.` }
    }
  }

  m = path.match(/^\/estudiar\/matematicas\/([\w-]+)$/)
  if (m && MATH_TEMAS.includes(m[1])) {
    const exam = EXAMS[m[1]]
    if (exam) {
      const name = label(exam, l)
      return l === 'en'
        ? { title: `${name} — theory, examples and exam`, desc: `Learn ${name} with short theory, worked examples and an interactive exam with explained answers. Free for primary and secondary school.` }
        : { title: `${name} — teoría, ejemplos y examen`, desc: `Aprende ${name} con teoría breve, ejemplos resueltos y un examen interactivo con explicaciones. Gratis, para Primaria, ESO y Bachillerato.` }
    }
  }

  return null
}
