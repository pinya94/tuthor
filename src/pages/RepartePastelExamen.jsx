import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import Pastel from '../components/Pastel'

// Examen con la mecánica de Reparte el Pastel: 10 preguntas, sin tiempo.
// Añade un tercer tipo de ronda que el juego arcade no tiene — suma de
// fracciones — porque aquí no hay presión de reloj para pensar el mcm.
//
//  - identifica: opción múltiple (igual que en el juego).
//  - construye: toca las porciones hasta formar la fracción pedida.
//  - suma: toca las porciones hasta formar a1/b1 + a2/b2 (en un pastel con
//    denominador común) — el mcm se ve, no hace falta calcularlo aparte.

const RANGOS = {
  facil:   { denominadores: [2, 3, 4],       multiplicidad: [1],    nMax: 6,  tipos: ['identifica', 'construye'] },
  medio:   { denominadores: [2, 3, 4, 5, 6], multiplicidad: [1, 2], nMax: 10, tipos: ['identifica', 'construye', 'suma'], sumaPares: [[2, 4], [3, 6], [2, 6], [4, 8]] },
  dificil: { denominadores: [3, 4, 5, 6, 7, 8], multiplicidad: [1, 2, 3], nMax: 12, tipos: ['identifica', 'construye', 'suma'], sumaPares: [[2, 3], [3, 4], [2, 5], [4, 6], [3, 5]] },
}

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: { es: 'Identifica y construye', en: 'Identify and build', ca: 'Identifica i construeix' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: { es: 'Añade sumas con denominadores relacionados', en: 'Adds sums with related denominators', ca: 'Afegeix sumes amb denominadors relacionats' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: { es: 'Sumas con denominadores distintos (mcm real)', en: 'Sums with different denominators (real LCM)', ca: 'Sumes amb denominadors diferents (mcm real)' } },
]

function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b) }
function lcm(a, b) { return (a * b) / gcd(a, b) }

function generarConstruye(dif) {
  const b = pick(dif.denominadores)
  const a = rng(1, b - 1)
  const kOpciones = dif.multiplicidad.filter(k => b * k <= dif.nMax)
  const k = pick(kOpciones.length ? kOpciones : [1])
  const n = b * k
  const m = a * k
  return { tipo: 'construye', a, b, n, m }
}

function generarIdentifica(dif) {
  const { a, b, n, m } = generarConstruye(dif)
  const candidatos = new Set([`${n - m}/${n}`, `${n}/${m}`, `${Math.min(m + 1, n - 1)}/${n}`, `${Math.max(1, m - 1)}/${n}`])
  candidatos.delete(`${m}/${n}`)
  const distractores = [...candidatos].slice(0, 3)
  while (distractores.length < 3) distractores.push(`${rng(1, n - 1)}/${n}`)
  const opciones = shuffle([`${m}/${n}`, ...new Set(distractores)].slice(0, 4))
  return { tipo: 'identifica', a, b, n, m, opciones }
}

function generarSuma(dif) {
  for (let intento = 0; intento < 8; intento++) {
    const [b1, b2] = pick(dif.sumaPares)
    const n = lcm(b1, b2)
    const a1 = rng(1, b1 - 1)
    const m1 = a1 * (n / b1)
    const maxM2 = n - m1
    const pasoB2 = n / b2
    const maxA2 = Math.floor(maxM2 / pasoB2)
    if (maxA2 < 1) continue
    const a2 = rng(1, maxA2)
    const m2 = a2 * pasoB2
    const m = m1 + m2
    return { tipo: 'suma', a1, b1, a2, b2, n, m1, m2, m }
  }
  // fallback casi imposible de alcanzar (denominadores del pool siempre caben)
  return { tipo: 'suma', a1: 1, b1: 2, a2: 1, b2: 2, n: 2, m1: 1, m2: 1, m: 2 }
}

function genRound(difficulty) {
  const dif = RANGOS[difficulty]
  const tipo = pick(dif.tipos)
  if (tipo === 'identifica') return generarIdentifica(dif)
  if (tipo === 'suma') return generarSuma(dif)
  return generarConstruye(dif)
}

function isCorrect(round, answer) {
  if (round.tipo === 'identifica') return answer === `${round.m}/${round.n}`
  return answer === round.m // construye / suma: nº de porciones tocadas
}

function explicacion(round, l) {
  if (round.tipo === 'identifica' || round.tipo === 'construye') {
    return {
      es: `${round.a}/${round.b} = ${round.m}/${round.n} en un pastel de ${round.n} porciones.`,
      en: `${round.a}/${round.b} = ${round.m}/${round.n} on a ${round.n}-slice cake.`,
      ca: `${round.a}/${round.b} = ${round.m}/${round.n} en un pastís de ${round.n} porcions.`,
    }[l]
  }
  return {
    es: `${round.a1}/${round.b1} = ${round.m1}/${round.n}. ${round.a2}/${round.b2} = ${round.m2}/${round.n}. ${round.m1}/${round.n} + ${round.m2}/${round.n} = ${round.m}/${round.n} porciones.`,
    en: `${round.a1}/${round.b1} = ${round.m1}/${round.n}. ${round.a2}/${round.b2} = ${round.m2}/${round.n}. ${round.m1}/${round.n} + ${round.m2}/${round.n} = ${round.m}/${round.n} slices.`,
    ca: `${round.a1}/${round.b1} = ${round.m1}/${round.n}. ${round.a2}/${round.b2} = ${round.m2}/${round.n}. ${round.m1}/${round.n} + ${round.m2}/${round.n} = ${round.m}/${round.n} porcions.`,
  }[l]
}

function Question({ round, phase, onAnswer, l }) {
  const [shaded, setShaded] = useState(new Set())
  const resuelto = phase === 'result'

  if (round.tipo === 'identifica') {
    const preShaded = new Set(Array.from({ length: round.m }, (_, i) => i))
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <p className="text-pink-400 text-xs font-black uppercase tracking-widest text-center mb-3">
          {{ es: '¿Qué fracción está sombreada?', en: 'What fraction is shaded?', ca: 'Quina fracció està ombrejada?' }[l]}
        </p>
        <Pastel n={round.n} shaded={preShaded} />
        <div className="grid grid-cols-2 gap-2 mt-5">
          {round.opciones.map(op => (
            <button key={op} disabled={resuelto} onClick={() => onAnswer(op)}
              className={`py-3 px-2 border text-sm font-black rounded-xl transition-all ${
                resuelto
                  ? op === `${round.m}/${round.n}` ? 'bg-green-500/20 border-green-400 text-green-400' : 'bg-white/5 border-white/10 text-white/30'
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
              }`}>
              {op}
            </button>
          ))}
        </div>
        {resuelto && <p className="text-white/50 text-sm text-center mt-3">{explicacion(round, l)}</p>}
      </div>
    )
  }

  const objetivo = round.tipo === 'suma' ? `${round.a1}/${round.b1} + ${round.a2}/${round.b2}` : `${round.a}/${round.b}`

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-pink-400 text-xs font-black uppercase tracking-widest text-center mb-1">
        {{ es: 'Construye la fracción', en: 'Build the fraction', ca: 'Construeix la fracció' }[l]}
      </p>
      <p className="text-white font-black text-2xl text-center mb-3">{objetivo}</p>
      <Pastel n={round.n} shaded={shaded} disabled={resuelto}
        onToggle={i => setShaded(prev => {
          const next = new Set(prev)
          next.has(i) ? next.delete(i) : next.add(i)
          return next
        })} />
      <p className="text-white/40 text-xs text-center mt-3 mb-3">
        {{ es: `Toca las porciones (pastel de ${round.n})`, en: `Tap the slices (${round.n}-slice cake)`, ca: `Toca les porcions (pastís de ${round.n})` }[l]}
      </p>
      {!resuelto && (
        <button onClick={() => onAnswer(shaded.size)}
          className="block mx-auto px-8 py-2.5 bg-pink-500 hover:bg-pink-400 text-black font-black rounded-xl transition-all">
          {{ es: 'Comprobar ✓', en: 'Check ✓', ca: 'Comprova ✓' }[l]}
        </button>
      )}
      {resuelto && <p className="text-white/50 text-sm text-center">{explicacion(round, l)}</p>}
    </div>
  )
}

export default function RepartePastelExamen() {
  return (
    <MechanicExam
      gameId="reparte-pastel-test"
      emoji="🍰"
      badge={{ es: 'Examen · Fracciones', en: 'Exam · Fractions', ca: 'Examen · Fraccions' }}
      title={{ es: '🍰 Examen Reparte el Pastel', en: '🍰 Slice the Cake Exam', ca: '🍰 Examen Reparteix el Pastís' }}
      sub={{ es: 'Identifica, construye y suma fracciones tocando porciones', en: 'Identify, build and add fractions by tapping slices', ca: 'Identifica, construeix i suma fraccions tocant porcions' }}
      metaTitle={{ es: 'Examen de Fracciones — Pastel Visual', en: 'Fractions Exam — Visual Cake', ca: 'Examen de Fraccions — Pastís Visual' }}
      metaDesc={{ es: 'Examen de fracciones con la mecánica del pastel: identifica, construye y suma fracciones tocando porciones. 10 preguntas, sin tiempo.', en: 'Fractions exam using the cake mechanic: identify, build and add fractions by tapping slices. 10 questions, no timer.', ca: 'Examen de fraccions amb la mecànica del pastís: identifica, construeix i suma fraccions tocant porcions. 10 preguntes, sense temps.' }}
      metaPath="/examen/reparte-pastel-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/reparte-pastel"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
