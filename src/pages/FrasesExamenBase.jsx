import { useState } from 'react'
import { useLang } from '../context/LangContext'
import MechanicExam from '../components/MechanicExam'
import SentenceBoard from '../components/SentenceBoard'
import { genRound, sameSet } from '../lib/analizaFrases'
import { LEVELS_ALL } from '../data/frasesTasks'

function Question({ round, phase, answer, onAnswer, l }) {
  const [sel, setSel] = useState([])
  const reveal = phase === 'result'
  return (
    <div className="flex flex-col items-center">
      <p className="text-white/80 text-base mb-3 text-center px-2">
        {l === 'en' ? 'Select' : 'Selecciona'} <span className="text-[#EDAE49] font-black">{round.label[l] ?? round.label.es}</span>
      </p>
      <div className="w-full rounded-xl border border-white/10 bg-[#0d1117] p-4 mb-3">
        <SentenceBoard tokens={round.tokens} selected={reveal ? (answer || []) : sel} correct={round.indices} reveal={reveal}
          onToggle={i => setSel(s => (s.includes(i) ? s.filter(x => x !== i) : [...s, i]))} />
      </div>
      {reveal && <p className="text-white/60 text-sm mb-1 text-center">💡 {round.explica[l] ?? round.explica.es}</p>}
      {!reveal && (
        <button onClick={() => onAnswer(sel)} disabled={sel.length === 0}
          className="w-full py-3 rounded-xl text-base font-black bg-[#EDAE49] text-black hover:bg-amber-400 transition disabled:opacity-40 disabled:cursor-not-allowed">
          {l === 'en' ? '✓ Check' : l === 'ca' ? '✓ Comprovar' : '✓ Comprobar'}
        </button>
      )}
    </div>
  )
}

// Base de todos los exámenes de "Analiza la Frase". `filter` = tareas a las que
// se ciñe el examen (null = todas). `levels` = niveles ofrecidos.
export default function FrasesExamenBase({ gameId, filter = null, levels = LEVELS_ALL, badge, title, sub, metaTitle, metaDesc, metaPath, sentenceLang, subjectSchema }) {
  const { lang } = useLang()
  const lg = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  // Idioma de las FRASES (los rótulos siguen la UI). Para gramática inglesa, 'en'.
  const sLang = sentenceLang || lg
  return (
    <MechanicExam
      gameId={gameId}
      emoji="🧐"
      badge={badge}
      title={title}
      sub={sub}
      metaTitle={metaTitle}
      metaDesc={metaDesc}
      metaPath={metaPath}
      subjectSchema={subjectSchema || 'Lengua Española'}
      backGamePath="/juegos/analiza-frases"
      playLabel={{ es: 'Modo arcade (40s)', en: 'Arcade mode (40s)', ca: 'Mode arcade (40s)' }}
      levels={levels}
      genRound={level => genRound({ lang: sLang, level, filter })}
      isCorrect={(round, ans) => sameSet(ans, round.indices)}
      renderQuestion={props => <Question key={props.qIndex} {...props} />}
    />
  )
}
