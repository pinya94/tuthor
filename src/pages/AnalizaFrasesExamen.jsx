import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import SentenceBoard from '../components/SentenceBoard'
import { genRound, sameSet } from '../lib/analizaFrases'

const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'primaria',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Clases de palabras y sujeto/predicado', en: 'Word classes and subject/predicate', ca: 'Classes de paraules i subjecte/predicat' } },
  { key: 'eso', emoji: '🟡', difficulty: 'eso',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Pronombres, adverbios y complementos', en: 'Pronouns, adverbs and objects', ca: 'Pronoms, adverbis i complements' } },
  { key: 'bach', emoji: '🔴', difficulty: 'bach',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Frases largas, atributo y CD/CI/CC', en: 'Long sentences, attribute and objects', ca: 'Frases llargues, atribut i complements' } },
]

// Se remonta por cada pregunta (key={qIndex}), así la selección arranca vacía.
function Question({ round, phase, answer, onAnswer, l }) {
  const [sel, setSel] = useState([])
  const reveal = phase === 'result'
  return (
    <div className="flex flex-col items-center">
      <p className="text-white/80 text-base mb-3 text-center px-2">
        {l === 'en' ? 'Select' : 'Selecciona'} <span className="text-[#EDAE49] font-black">{round.label[l] ?? round.label.es}</span>
      </p>
      <div className="w-full rounded-xl border border-white/10 bg-[#0d1117] p-4 mb-3">
        <SentenceBoard
          tokens={round.tokens}
          selected={reveal ? (answer || []) : sel}
          correct={round.indices}
          reveal={reveal}
          onToggle={i => setSel(s => (s.includes(i) ? s.filter(x => x !== i) : [...s, i]))} />
      </div>
      {reveal && (
        <p className="text-white/60 text-sm mb-1 text-center">💡 {round.explica[l] ?? round.explica.es}</p>
      )}
      {!reveal && (
        <button onClick={() => onAnswer(sel)} disabled={sel.length === 0}
          className="w-full py-3 rounded-xl text-base font-black bg-[#EDAE49] text-black hover:bg-amber-400 transition disabled:opacity-40 disabled:cursor-not-allowed">
          {l === 'en' ? '✓ Check' : l === 'ca' ? '✓ Comprovar' : '✓ Comprobar'}
        </button>
      )}
    </div>
  )
}

export default function AnalizaFrasesExamen() {
  return (
    <MechanicExam
      gameId="analiza-frases-test"
      emoji="🧐"
      badge={{ es: 'Examen · Lengua', en: 'Exam · Language', ca: 'Examen · Llengua' }}
      title={{ es: '🧐 Examen Analiza la Frase', en: '🧐 Sentence Detective Exam', ca: '🧐 Examen Analitza la Frase' }}
      sub={{ es: 'Señala lo que se te pide en cada frase', en: 'Pick out what you’re asked for in each sentence', ca: 'Assenyala el que et demanen a cada frase' }}
      metaTitle={{ es: 'Examen de Análisis Sintáctico — Lengua', en: 'Sentence Analysis Exam — Language', ca: 'Examen d’Anàlisi Sintàctica — Llengua' }}
      metaDesc={{ es: 'Examen de análisis gramatical y sintáctico: señala el sujeto, el predicado, los complementos o las clases de palabras. 10 preguntas, sin tiempo, con explicación.', en: 'Grammar and syntax exam: point out the subject, predicate, objects or word classes. 10 questions, no timer, with explanation.', ca: 'Examen d’anàlisi gramatical i sintàctica: assenyala el subjecte, el predicat, els complements o les classes de paraules. 10 preguntes, sense temps, amb explicació.' }}
      metaPath="/examen/analiza-frases-test"
      subjectSchema="Lengua Española"
      backGamePath="/juegos/analiza-frases"
      playLabel={{ es: 'Modo arcade (40s)', en: 'Arcade mode (40s)', ca: 'Mode arcade (40s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => sameSet(ans, round.indices)}
      renderQuestion={props => <Question key={props.qIndex} {...props} />}
    />
  )
}
