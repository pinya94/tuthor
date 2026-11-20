import { useNavigate, useParams, Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import BotonPractica from '../components/BotonPractica'
import PageMeta from '../components/PageMeta'
import ContenidoTema, { contenidoMeta } from '../components/ContenidoTema'
import PracticaFrase from '../components/PracticaFrase'

// Cada tema de gramática ofrece varias formas de estudiar el mismo contenido:
// el examen tipo test de siempre y la mecánica de "Analiza la Frase" enfocada.
// El juego Analiza la Frase arrancado ya filtrado a lo que trata el tema
// (ver el state que acepta su página). Va el primero: quien llega a estudiar
// un tema ve antes el juego que el examen.
const juegoFrase = (key, filter, que) => ({
  id: 'juego-' + key, to: '/juegos/analiza-frases', emoji: '🎮', gradient: 'from-emerald-500 to-teal-700',
  state: { filter, level: 'eso', label: que },
  titulo: { es: 'Analiza la Frase (juego)', en: 'Sentence Detective (game)', ca: 'Analitza la Frase (joc)' },
  desc: {
    es: `Contrarreloj con frases nuevas para practicar ${que.es.toLowerCase()}. Cada acierto suma tiempo.`,
    en: `Against the clock, with fresh sentences to practise ${que.en.toLowerCase()}. Every hit adds time.`,
    ca: `Contrarellotge amb frases noves per practicar ${que.ca.toLowerCase()}. Cada encert suma temps.`,
  },
  detalles: { es: ['Juego', 'Contrarreloj', 'Frases nuevas'], en: ['Game', 'Against the clock', 'Fresh sentences'], ca: ['Joc', 'Contrarellotge', 'Frases noves'] },
})
const juegoFabrica = {
  id: 'juego-fabrica', to: '/juegos/fabrica-palabras', soloEs: true, emoji: '🎮', gradient: 'from-emerald-500 to-teal-700',
  titulo: { es: 'La Fábrica de Palabras (juego)', en: '', ca: '' },
  desc: { es: 'Contrarreloj: monta palabras con prefijos y sufijos y une sinónimos y antónimos.', en: '', ca: '' },
  detalles: { es: ['Juego', 'Contrarreloj', '3 niveles'], en: [], ca: [] },
}

const TEMAS = {
  sustantivos: {
    titulo: { es: 'Sustantivos', en: 'Nouns', ca: 'Substantius' }, emoji: '📚',
    modos: [
      juegoFrase('sustantivos', ['sustantivo'], { es: 'Los sustantivos', en: 'The nouns', ca: 'Els substantius' }),
      {
        id: 'espanol-gramatica-sustantivos-test', emoji: '📝', gradient: 'from-red-500 to-rose-600',
        titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' },
        desc: { es: 'Preguntas de opción múltiple sobre los sustantivos y sus clases.', en: 'Multiple-choice questions about nouns and their types.', ca: 'Preguntes d\'opció múltiple sobre els substantius i les seves classes.' },
        detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] },
      },
      {
        id: 'frases-sustantivos-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700',
        titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' },
        desc: { es: 'Con la mecánica del juego: aparece una frase y marcas solo los sustantivos.', en: 'Using the game mechanic: a sentence appears and you mark only the nouns.', ca: 'Amb la mecànica del joc: apareix una frase i marques només els substantius.' },
        detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] },
      },
    ],
  },
  verbos: {
    titulo: { es: 'Verbos', en: 'Verbs', ca: 'Verbs' }, emoji: '🏃',
    modos: [
      {
        id: 'monta-el-verbo', to: '/juegos/monta-el-verbo', soloEs: true, emoji: '🛠️', gradient: 'from-orange-500 to-red-700',
        titulo: { es: 'Monta el Verbo (juego)', en: 'Monta el Verbo (game)', ca: 'Monta el Verbo (joc)' },
        desc: { es: 'Completa la tabla de cada tiempo verbal colocando las terminaciones con fichas, con trampas incluidas.', en: '', ca: '' },
        detalles: { es: ['Juego', '3 niveles', 'Conjugación'], en: [], ca: [] },
      },
      {
        id: 'monta-el-verbo-test', soloEs: true, emoji: '📝', gradient: 'from-amber-500 to-orange-700',
        titulo: { es: 'Examen de conjugación', en: 'Conjugation exam', ca: 'Examen de conjugació' },
        desc: { es: 'Diez tablas con la mecánica del juego, sin reloj y con nota.', en: '', ca: '' },
        detalles: { es: ['10 tablas', 'Con el juego', 'Nota final'], en: [], ca: [] },
      },
      juegoFrase('verbos', ['verbo'], { es: 'Los verbos', en: 'The verbs', ca: 'Els verbs' }),
      {
        id: 'espanol-gramatica-verbos-test', emoji: '📝', gradient: 'from-orange-500 to-amber-600',
        titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' },
        desc: { es: 'Preguntas de opción múltiple sobre los verbos y su conjugación.', en: 'Multiple-choice questions about verbs and conjugation.', ca: 'Preguntes d\'opció múltiple sobre els verbs i la conjugació.' },
        detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] },
      },
      {
        id: 'frases-verbos-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700',
        titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' },
        desc: { es: 'Con la mecánica del juego: marca todos los verbos (las oraciones compuestas tienen varios).', en: 'Using the game mechanic: mark all the verbs (compound sentences have several).', ca: 'Amb la mecànica del joc: marca tots els verbs (les oracions compostes en tenen diversos).' },
        detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] },
      },
    ],
  },
  sintaxis: {
    titulo: { es: 'Sintaxis', en: 'Syntax', ca: 'Sintaxi' }, emoji: '🔬',
    modos: [
      juegoFrase('sintaxis', ['sujeto', 'predicado'], { es: 'El sujeto y el predicado', en: 'The subject and the predicate', ca: 'El subjecte i el predicat' }),
      {
        id: 'espanol-gramatica-sintaxis-test', emoji: '📝', gradient: 'from-purple-500 to-violet-600',
        titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' },
        desc: { es: 'Preguntas de opción múltiple sobre sujeto, predicado y complementos.', en: 'Multiple-choice questions about subject, predicate and objects.', ca: 'Preguntes d\'opció múltiple sobre subjecte, predicat i complements.' },
        detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] },
      },
      {
        id: 'frases-sintaxis-test', emoji: '🧩', gradient: 'from-violet-500 to-fuchsia-700',
        titulo: { es: 'Analízala en la frase', en: 'Analyse it in the sentence', ca: 'Analitza-la a la frase' },
        desc: { es: 'Con la mecánica del juego: señala el sujeto, el predicado y su núcleo.', en: 'Using the game mechanic: point out the subject, the predicate and its head.', ca: 'Amb la mecànica del joc: assenyala el subjecte, el predicat i el seu nucli.' },
        detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] },
      },
      {
        id: 'frases-complementos-test', emoji: '🔗', gradient: 'from-fuchsia-600 to-purple-800',
        titulo: { es: 'Los complementos', en: 'The objects', ca: 'Els complements' },
        desc: { es: 'Con la mecánica del juego: señala el CD, el CI y los complementos circunstanciales.', en: 'Using the game mechanic: point out the direct object, the indirect object and the adverbials.', ca: 'Amb la mecànica del joc: assenyala el CD, el CI i els complements circumstancials.' },
        detalles: { es: ['ESO y Bachillerato', '10 preguntas', 'Con el juego'], en: ['Secondary and Sixth Form', '10 questions', 'With the game'], ca: ['ESO i Batxillerat', '10 preguntes', 'Amb el joc'] },
      },
    ],
  },
  adjetivos: {
    titulo: { es: 'Adjetivos', en: 'Adjectives', ca: 'Adjectius' }, emoji: '🎨',
    modos: [
      juegoFrase('adjetivos', ['adjetivo'], { es: 'Los adjetivos', en: 'The adjectives', ca: 'Els adjectius' }),
      { id: 'espanol-gramatica-adjetivos-test', emoji: '📝', gradient: 'from-pink-500 to-rose-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre los adjetivos, la concordancia y los grados.', en: 'Multiple-choice questions about adjectives, agreement and degrees.', ca: 'Preguntes d\'opció múltiple sobre els adjectius, la concordança i els graus.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-adjetivos-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca solo los adjetivos.', en: 'Using the game mechanic: mark only the adjectives.', ca: 'Amb la mecànica del joc: marca només els adjectius.' }, detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  determinantes: {
    titulo: { es: 'Determinantes', en: 'Determiners', ca: 'Determinants' }, emoji: '🔖',
    modos: [
      juegoFrase('determinantes', ['articulo', 'determinante'], { es: 'Los artículos y determinantes', en: 'The articles and determiners', ca: 'Els articles i determinants' }),
      { id: 'espanol-gramatica-determinantes-test', emoji: '📝', gradient: 'from-amber-500 to-orange-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre artículos, demostrativos, posesivos y numerales.', en: 'Multiple-choice questions about articles, demonstratives, possessives and numerals.', ca: 'Preguntes d\'opció múltiple sobre articles, demostratius, possessius i numerals.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-determinantes-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca los artículos y determinantes.', en: 'Using the game mechanic: mark the articles and determiners.', ca: 'Amb la mecànica del joc: marca els articles i determinants.' }, detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  pronombres: {
    titulo: { es: 'Pronombres', en: 'Pronouns', ca: 'Pronoms' }, emoji: '🙋',
    modos: [
      juegoFrase('pronombres', ['pronombre'], { es: 'Los pronombres', en: 'The pronouns', ca: 'Els pronoms' }),
      { id: 'espanol-gramatica-pronombres-test', emoji: '📝', gradient: 'from-lime-500 to-green-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre los pronombres y sus clases.', en: 'Multiple-choice questions about pronouns and their types.', ca: 'Preguntes d\'opció múltiple sobre els pronoms i les seves classes.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-pronombres-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca solo los pronombres.', en: 'Using the game mechanic: mark only the pronouns.', ca: 'Amb la mecànica del joc: marca només els pronoms.' }, detalles: { es: ['2 niveles', '10 preguntas', 'Con el juego'], en: ['2 levels', '10 questions', 'With the game'], ca: ['2 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  adverbios: {
    titulo: { es: 'Adverbios', en: 'Adverbs', ca: 'Adverbis' }, emoji: '⏱️',
    modos: [
      juegoFrase('adverbios', ['adverbio'], { es: 'Los adverbios', en: 'The adverbs', ca: 'Els adverbis' }),
      { id: 'espanol-gramatica-adverbios-test', emoji: '📝', gradient: 'from-teal-500 to-cyan-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre los adverbios y sus tipos.', en: 'Multiple-choice questions about adverbs and their types.', ca: 'Preguntes d\'opció múltiple sobre els adverbis i els seus tipus.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-adverbios-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca solo los adverbios.', en: 'Using the game mechanic: mark only the adverbs.', ca: 'Amb la mecànica del joc: marca només els adverbis.' }, detalles: { es: ['2 niveles', '10 preguntas', 'Con el juego'], en: ['2 levels', '10 questions', 'With the game'], ca: ['2 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  nexos: {
    titulo: { es: 'Preposiciones y conjunciones', en: 'Prepositions & conjunctions', ca: 'Preposicions i conjuncions' }, emoji: '🔗',
    modos: [
      juegoFrase('nexos', ['preposicion', 'conjuncion'], { es: 'Las preposiciones y conjunciones', en: 'The prepositions and conjunctions', ca: 'Les preposicions i conjuncions' }),
      { id: 'espanol-gramatica-nexos-test', emoji: '📝', gradient: 'from-sky-500 to-blue-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre preposiciones y conjunciones.', en: 'Multiple-choice questions about prepositions and conjunctions.', ca: 'Preguntes d\'opció múltiple sobre preposicions i conjuncions.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-nexos-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca las preposiciones y conjunciones.', en: 'Using the game mechanic: mark the prepositions and conjunctions.', ca: 'Amb la mecànica del joc: marca les preposicions i conjuncions.' }, detalles: { es: ['2 niveles', '10 preguntas', 'Con el juego'], en: ['2 levels', '10 questions', 'With the game'], ca: ['2 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  'sinonimos-antonimos': {
    titulo: { es: 'Sinónimos y antónimos', en: 'Synonyms & antonyms', ca: 'Sinònims i antònims' }, emoji: '🔁',
    modos: [
      juegoFabrica,
      { id: 'fabrica-palabras-test', emoji: '🏭', gradient: 'from-orange-500 to-rose-700', titulo: { es: 'La Fábrica de Palabras (con el juego)', en: 'The Word Factory (with the game)', ca: 'La Fàbrica de Paraules (amb el joc)' }, desc: { es: 'Monta palabras pegando prefijos y sufijos y une sinónimos y antónimos. Desde aquí puedes pasar al juego contra reloj.', en: 'Build Spanish words with prefixes and suffixes and match synonyms and antonyms. From here you can go on to the timed game.', ca: 'Munta paraules enganxant prefixos i sufixos i uneix sinònims i antònims. Des d’aquí pots passar al joc contra rellotge.' }, detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  'prefijos-sufijos': {
    titulo: { es: 'Prefijos y sufijos', en: 'Prefixes & suffixes', ca: 'Prefixos i sufixos' }, emoji: '🧩',
    modos: [
      juegoFabrica,
      { id: 'fabrica-palabras-test', emoji: '🏭', gradient: 'from-orange-500 to-rose-700', titulo: { es: 'La Fábrica de Palabras (con el juego)', en: 'The Word Factory (with the game)', ca: 'La Fàbrica de Paraules (amb el joc)' }, desc: { es: 'Monta palabras pegando prefijos y sufijos y une sinónimos y antónimos. Desde aquí puedes pasar al juego contra reloj.', en: 'Build Spanish words with prefixes and suffixes and match synonyms and antonyms. From here you can go on to the timed game.', ca: 'Munta paraules enganxant prefixos i sufixos i uneix sinònims i antònims. Des d’aquí pots passar al joc contra rellotge.' }, detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  morfologia: {
    titulo: { es: 'Género y número', en: 'Gender & number', ca: 'Gènere i nombre' }, emoji: '♀️',
    modos: [
      juegoFrase('morfologia', ['femenino', 'masculino', 'singular', 'plural'], { es: 'El género y el número', en: 'Gender and number', ca: 'El gènere i el nombre' }),
      { id: 'espanol-gramatica-morfologia-test', emoji: '📝', gradient: 'from-fuchsia-500 to-purple-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre el género y el número: reglas y excepciones.', en: 'Multiple-choice questions about gender and number: rules and exceptions.', ca: 'Preguntes d\'opció múltiple sobre el gènere i el nombre: regles i excepcions.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-morfologia-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalas en la frase', en: 'Spot them in the sentence', ca: 'Assenyala-les a la frase' }, desc: { es: 'Con la mecánica del juego: marca las palabras en femenino, masculino, singular o plural.', en: 'Using the game mechanic: mark the feminine, masculine, singular or plural words.', ca: 'Amb la mecànica del joc: marca les paraules en femení, masculí, singular o plural.' }, detalles: { es: ['2 niveles', '10 preguntas', 'Con el juego'], en: ['2 levels', '10 questions', 'With the game'], ca: ['2 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
}

export default function EspanolGramaticaTema() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { tema } = useParams()
  const en = lang === 'en', ca = lang === 'ca'
  const l = obj => (en ? obj.en : ca ? obj.ca : obj.es)

  const data = TEMAS[tema]
  const gramaticaPath = '/estudiar/idiomas/espanol/gramatica'
  if (!data) { navigate(localPath(gramaticaPath)); return null }

  const cMeta = contenidoMeta(tema, lang)
  // El juego del tema, también como ejercicio dentro de la página
  const juego = data.modos.find(m => m.to === '/juegos/analiza-frases')
  const pageMeta = (
    <PageMeta
      title={cMeta?.title || `${l(data.titulo)} en español — teoría y ejercicios`}
      description={cMeta?.desc || `Estudia ${l(data.titulo).toLowerCase()} en español con un resumen y ejercicios interactivos.`}
      path={`${gramaticaPath}/${tema}`} lang={lang} />
  )

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      {pageMeta}
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <Link to={localPath('/estudiar')} className="inline-block text-center hover:text-white/60 transition-colors">
            {ca ? 'Estudiar' : en ? 'Study' : 'Estudiar'}
          </Link>
          {' / '}
          <Link to={localPath(gramaticaPath)} className="inline-block text-center hover:text-white/60 transition-colors">
            {ca ? 'Gramàtica' : en ? 'Grammar' : 'Gramática'}
          </Link>
          {' / '}
          <span className="text-white/50">{l(data.titulo)}</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="text-5xl">{data.emoji}</span>
          <div>
            {/* Con contenido propio, el H1 dice lo que se busca («Los pronombres:
                qué son, tipos y ejemplos»), no solo el nombre del tema */}
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{cMeta ? cMeta.title.replace(/\s*\((con tabla|with table|amb taula)\)$/, '') : l(data.titulo)}</h1>
          </div>
        </div>
        <BotonPractica ejercicio={!!juego} />
      </div>

      <ContenidoTema tema={tema} lang={lang} practica={juego && <PracticaFrase tema={tema} filter={juego.state.filter} label={juego.state.label} />} />

      <div id="formas" className="max-w-2xl mx-auto w-full space-y-4 scroll-mt-20">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Formes d\'estudiar' : en ? 'Ways to study' : 'Formas de estudiar'}
        </p>

        {data.modos.filter(modo => !modo.soloEs || lang === 'es').map(modo => (
          <Link
            key={modo.id}
            to={localPath(modo.to ?? `/examen/${modo.id}`)} state={{ backPath: `${gramaticaPath}/${tema}`, ...modo.state }}
            className="block w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
          >
            <div className={`bg-gradient-to-br ${modo.gradient} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{modo.emoji}</span>
                    <h3 className="font-black text-white text-xl">{l(modo.titulo)}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{l(modo.desc)}</p>
                  <div className="flex flex-wrap gap-2">
                    {l(modo.detalles).map(d => (
                      <span key={d} className="text-xs font-semibold bg-black/25 text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <span className="text-white font-black text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Los demás temas de gramática: enlaces entre hermanas (SEO interno y
          para seguir estudiando sin volver al índice) */}
      <nav className="max-w-2xl mx-auto w-full mt-8" aria-label={ca ? 'Altres temes de gramàtica' : en ? 'Other grammar topics' : 'Otros temas de gramática'}>
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">{ca ? 'Altres temes de gramàtica' : en ? 'Other grammar topics' : 'Otros temas de gramática'}</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TEMAS).filter(([id]) => id !== tema).map(([id, t]) => (
            <Link key={id} to={localPath(`${gramaticaPath}/${id}`)}className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/80 text-sm hover:bg-white/[0.12]">
              {t.emoji} {l(t.titulo)}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
