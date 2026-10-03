import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import TiraPh, { TuboPh } from '../components/TiraPh'
import { NIVELES, genRonda, isCorrect, categoria } from '../lib/medidorPh'

// Examen con la mecánica del Medidor de pH: la misma tira, sin cronómetro.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Ácido, neutro o básico', en: 'Acidic, neutral or basic', ca: 'Àcid, neutre o bàsic' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Acércate a su pH (±1,5)', en: 'Get close to its pH (±1.5)', ca: 'Acosta’t al seu pH (±1,5)' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Tira sin colores y ±1', en: 'Strip without colours and ±1', ca: 'Tira sense colors i ±1' } },
]

const TXT = {
  zona: { es: '¿Ácido, neutro o básico?', en: 'Acidic, neutral or basic?', ca: 'Àcid, neutre o bàsic?' },
  ph: { es: '¿Qué pH tiene?', en: 'What is its pH?', ca: 'Quin pH té?' },
  confirmar: { es: 'Confirmar', en: 'Confirm', ca: 'Confirmar' },
  toca: { es: 'Toca la tira para medir', en: 'Tap the strip to measure', ca: 'Toca la tira per mesurar' },
  ok: { es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' },
  mal: { es: 'No era ahí', en: 'Not there', ca: 'No era aquí' },
  acido: { es: 'Ácido', en: 'Acidic', ca: 'Àcid' },
  neutro: { es: 'Neutro', en: 'Neutral', ca: 'Neutre' },
  basico: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
  real: { es: 'su pH', en: 'its pH', ca: 'el seu pH' },
}

// Estado propio (la marca antes de confirmar): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function PreguntaPh({ round, phase, onAnswer, l }) {
  const [valor, setValor] = useState(null)
  const t = k => TXT[k][l] ?? TXT[k].es
  const s = round.sustancia
  const cfg = NIVELES[round.nivel]
  const revelado = phase === 'result'
  const acierto = revelado && isCorrect(round, valor)
  const fmt = v => (l === 'en' ? v.toFixed(1) : v.toFixed(1).replace('.', ','))
  const zonas = { acido: t('acido'), neutro: t('neutro'), basico: t('basico'), real: t('real') }
  return (
    <>
      <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4 mb-4 flex items-center gap-4">
        <TuboPh ph={revelado ? s.ph : (cfg.colores ? valor : null)} className="w-11 h-22 shrink-0" />
        <div className="min-w-0">
          <p className="text-white/45 text-xs uppercase tracking-widest mb-1">{t(cfg.porCategoria ? 'zona' : 'ph')}</p>
          <p className="text-white text-xl font-black leading-tight">{s.nombre[l] ?? s.nombre.es}</p>
        </div>
      </div>
      <div className="mb-4 px-1">
        <TiraPh valor={valor} onChange={setValor} real={revelado ? s.ph : null}
          colores={cfg.colores} zonas={cfg.porCategoria} textos={zonas} bloqueada={revelado} />
      </div>
      {revelado ? (
        <div className="space-y-2 mb-1">
          <p className={`text-center font-black text-lg ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? t('ok') : t('mal')}
            <span className="text-white/80"> · pH {fmt(s.ph)} ({zonas[categoria(s.ph)].toLowerCase()})</span>
          </p>
          <p className="text-white/70 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {s.dato[l] ?? s.dato.es}</p>
        </div>
      ) : (
        <button onClick={() => valor != null && onAnswer(valor)} disabled={valor == null}
          className="w-full py-3.5 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:bg-white/[0.06] disabled:text-white/40 transition">
          {valor == null ? t('toca') : `${t('confirmar')} · ${cfg.porCategoria ? zonas[categoria(valor)] : `pH ${fmt(valor)}`}`}
        </button>
      )}
    </>
  )
}

// MechanicExam genera las 10 rondas seguidas: con memoria de las últimas no se
// repite sustancia dentro del mismo examen.
const vistos = []
function genRoundSinRepetir(difficulty) {
  const r = genRonda(difficulty, { evitar: vistos })
  vistos.unshift(r.sustancia.id)
  vistos.length = Math.min(vistos.length, 12)
  return r
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <PreguntaPh key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function MedidorPhExamen() {
  return (
    <MechanicExam
      gameId="medidor-ph-test"
      emoji="🧪"
      badge={{ es: 'Examen · Ácidos y bases', en: 'Exam · Acids and bases', ca: 'Examen · Àcids i bases' }}
      title={{ es: 'Examen Medidor de pH', en: 'pH Meter Exam', ca: 'Examen Mesurador de pH' }}
      sub={{ es: 'Sitúa cada sustancia de casa en la escala de pH', en: 'Place each household substance on the pH scale', ca: 'Situa cada substància de casa a l’escala de pH' }}
      metaTitle={{ es: 'Examen de pH — Ácidos y bases con el juego', en: 'pH Exam — Acids and bases with the game', ca: 'Examen de pH — Àcids i bases amb el joc' }}
      metaDesc={{ es: 'Examen de la escala de pH con la mecánica del juego: coloca limón, lejía, leche o agua de mar entre 0 y 14. 10 preguntas, tres niveles, sin cronómetro.', en: 'pH scale exam using the game mechanic: place lemon, bleach, milk or seawater between 0 and 14. 10 questions, three levels, no timer.', ca: 'Examen de l’escala de pH amb la mecànica del joc: col·loca llimona, lleixiu, llet o aigua de mar entre 0 i 14. 10 preguntes, tres nivells, sense cronòmetre.' }}
      metaPath="/examen/medidor-ph-test"
      subjectSchema="Química"
      backGamePath="/juegos/medidor-ph"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRoundSinRepetir}
      isCorrect={isCorrect}
      renderQuestion={renderQuestion}
    />
  )
}
