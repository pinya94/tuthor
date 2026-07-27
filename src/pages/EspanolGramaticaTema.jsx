import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'

// Cada tema de gramática ofrece varias formas de estudiar el mismo contenido:
// el examen tipo test de siempre y la mecánica de "Analiza la Frase" enfocada.
const TEMAS = {
  sustantivos: {
    titulo: { es: 'Sustantivos', en: 'Nouns', ca: 'Substantius' }, emoji: '📚',
    modos: [
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
    ],
  },
  adjetivos: {
    titulo: { es: 'Adjetivos', en: 'Adjectives', ca: 'Adjectius' }, emoji: '🎨',
    modos: [
      { id: 'espanol-gramatica-adjetivos-test', emoji: '📝', gradient: 'from-pink-500 to-rose-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre los adjetivos, la concordancia y los grados.', en: 'Multiple-choice questions about adjectives, agreement and degrees.', ca: 'Preguntes d\'opció múltiple sobre els adjectius, la concordança i els graus.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-adjetivos-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca solo los adjetivos.', en: 'Using the game mechanic: mark only the adjectives.', ca: 'Amb la mecànica del joc: marca només els adjectius.' }, detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  determinantes: {
    titulo: { es: 'Determinantes', en: 'Determiners', ca: 'Determinants' }, emoji: '🔖',
    modos: [
      { id: 'espanol-gramatica-determinantes-test', emoji: '📝', gradient: 'from-amber-500 to-orange-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre artículos, demostrativos, posesivos y numerales.', en: 'Multiple-choice questions about articles, demonstratives, possessives and numerals.', ca: 'Preguntes d\'opció múltiple sobre articles, demostratius, possessius i numerals.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-determinantes-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca los artículos y determinantes.', en: 'Using the game mechanic: mark the articles and determiners.', ca: 'Amb la mecànica del joc: marca els articles i determinants.' }, detalles: { es: ['3 niveles', '10 preguntas', 'Con el juego'], en: ['3 levels', '10 questions', 'With the game'], ca: ['3 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  pronombres: {
    titulo: { es: 'Pronombres', en: 'Pronouns', ca: 'Pronoms' }, emoji: '🙋',
    modos: [
      { id: 'espanol-gramatica-pronombres-test', emoji: '📝', gradient: 'from-lime-500 to-green-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre los pronombres y sus clases.', en: 'Multiple-choice questions about pronouns and their types.', ca: 'Preguntes d\'opció múltiple sobre els pronoms i les seves classes.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-pronombres-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca solo los pronombres.', en: 'Using the game mechanic: mark only the pronouns.', ca: 'Amb la mecànica del joc: marca només els pronoms.' }, detalles: { es: ['2 niveles', '10 preguntas', 'Con el juego'], en: ['2 levels', '10 questions', 'With the game'], ca: ['2 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  adverbios: {
    titulo: { es: 'Adverbios', en: 'Adverbs', ca: 'Adverbis' }, emoji: '⏱️',
    modos: [
      { id: 'espanol-gramatica-adverbios-test', emoji: '📝', gradient: 'from-teal-500 to-cyan-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre los adverbios y sus tipos.', en: 'Multiple-choice questions about adverbs and their types.', ca: 'Preguntes d\'opció múltiple sobre els adverbis i els seus tipus.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-adverbios-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca solo los adverbios.', en: 'Using the game mechanic: mark only the adverbs.', ca: 'Amb la mecànica del joc: marca només els adverbis.' }, detalles: { es: ['2 niveles', '10 preguntas', 'Con el juego'], en: ['2 levels', '10 questions', 'With the game'], ca: ['2 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  nexos: {
    titulo: { es: 'Preposiciones y conjunciones', en: 'Prepositions & conjunctions', ca: 'Preposicions i conjuncions' }, emoji: '🔗',
    modos: [
      { id: 'espanol-gramatica-nexos-test', emoji: '📝', gradient: 'from-sky-500 to-blue-600', titulo: { es: 'Examen tipo test', en: 'Multiple-choice exam', ca: 'Examen tipus test' }, desc: { es: 'Preguntas de opción múltiple sobre preposiciones y conjunciones.', en: 'Multiple-choice questions about prepositions and conjunctions.', ca: 'Preguntes d\'opció múltiple sobre preposicions i conjuncions.' }, detalles: { es: ['Opción múltiple', '10 preguntas', 'Con explicación'], en: ['Multiple choice', '10 questions', 'With explanation'], ca: ['Opció múltiple', '10 preguntes', 'Amb explicació'] } },
      { id: 'frases-nexos-test', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', titulo: { es: 'Señálalos en la frase', en: 'Spot them in the sentence', ca: 'Assenyala\'ls a la frase' }, desc: { es: 'Con la mecánica del juego: marca las preposiciones y conjunciones.', en: 'Using the game mechanic: mark the prepositions and conjunctions.', ca: 'Amb la mecànica del joc: marca les preposicions i conjuncions.' }, detalles: { es: ['2 niveles', '10 preguntas', 'Con el juego'], en: ['2 levels', '10 questions', 'With the game'], ca: ['2 nivells', '10 preguntes', 'Amb el joc'] } },
    ],
  },
  morfologia: {
    titulo: { es: 'Género y número', en: 'Gender & number', ca: 'Gènere i nombre' }, emoji: '♀️',
    modos: [
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

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6">
      <div className="max-w-2xl mx-auto w-full mb-6">
        <p className="text-white/30 text-xs mb-4">
          <button onClick={() => navigate(localPath('/estudiar'))} className="hover:text-white/60 transition-colors">
            {ca ? 'Estudiar' : en ? 'Study' : 'Estudiar'}
          </button>
          {' / '}
          <button onClick={() => navigate(localPath(gramaticaPath))} className="hover:text-white/60 transition-colors">
            {ca ? 'Gramàtica' : en ? 'Grammar' : 'Gramática'}
          </button>
          {' / '}
          <span className="text-white/50">{l(data.titulo)}</span>
        </p>

        <div className="flex items-center gap-4">
          <span className="text-5xl">{data.emoji}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{l(data.titulo)}</h1>
            <p className="text-white/40 text-sm mt-0.5">{ca ? 'Tria com vols estudiar-ho' : en ? 'Choose how to study it' : 'Elige cómo estudiarlo'}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
          {ca ? 'Formes d\'estudiar' : en ? 'Ways to study' : 'Formas de estudiar'}
        </p>

        {data.modos.map(modo => (
          <button
            key={modo.id}
            onClick={() => navigate(localPath(`/examen/${modo.id}`), { state: { backPath: `${gramaticaPath}/${tema}` } })}
            className="w-full group relative rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40"
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
          </button>
        ))}
      </div>
    </div>
  )
}
