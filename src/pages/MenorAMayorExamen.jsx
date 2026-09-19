import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { nuevoMazo, posicionCorrecta } from '../lib/menorAMayor'
import TimelineBoard from '../components/TimelineBoard'
import SEOHead from '../components/SEOHead'
import CoinsAnimation from '../components/CoinsAnimation'

const MAX_VIDAS = 3
const N_CARTAS = 11    // 1 de ancla + 10 por colocar
const OBJETIVO = 7     // colocar 7 de 10 → aprobado

const DIFS = [
  { id: 'facil',   emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     que: { es: 'Decimales y fracciones sencillas', en: 'Decimals and simple fractions', ca: 'Decimals i fraccions senzilles' } },
  { id: 'medio',   emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   que: { es: 'Fracciones, decimales y porcentajes mezclados', en: 'Fractions, decimals and percentages mixed', ca: 'Fraccions, decimals i percentatges barrejats' } },
  { id: 'dificil', emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, que: { es: 'Todo lo anterior y números negativos', en: 'All of the above plus negative numbers', ca: 'Tot l\'anterior i nombres negatius' } },
]

const TIPO_LABEL = {
  fraccion:   { es: 'fracción', en: 'fraction', ca: 'fracció' },
  decimal:    { es: 'decimal', en: 'decimal', ca: 'decimal' },
  porcentaje: { es: 'porcentaje', en: 'percentage', ca: 'percentatge' },
  entero:     { es: 'entero', en: 'integer', ca: 'enter' },
}

export default function MenorAMayorExamen() {
  const navigate = useNavigate()
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()

  const [fase, setFase]       = useState('intro') // intro | jugando | fin
  const [difId, setDifId]     = useState('medio')
  const [recta, setRecta]     = useState([])
  const [pending, setPending] = useState([])
  const [current, setCurrent] = useState(null)
  const [vidas, setVidas]     = useState(MAX_VIDAS)
  const [colocadas, setColocadas] = useState(0)
  const [phase, setPhase]     = useState('placing')
  const [chosenSlot, setChosenSlot]   = useState(null)
  const [correctSlot, setCorrectSlot] = useState(null)
  const [wasCorrect, setWasCorrect]   = useState(null)
  const [coins, setCoins]     = useState(0)
  const startRef = useRef(null)

  function empezar(selected) {
    const mazo = nuevoMazo(selected, N_CARTAS)
    setDifId(selected)
    setRecta([mazo[0]])
    setPending(mazo.slice(2))
    setCurrent(mazo[1])
    setVidas(MAX_VIDAS); setColocadas(0)
    setPhase('placing'); setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
    setCoins(0)
    setFase('jugando')
    startRef.current = Date.now()
  }

  function colocar(slot) {
    if (phase !== 'placing' || !current) return
    const correct = posicionCorrecta(current, recta)
    setChosenSlot(slot); setCorrectSlot(correct); setPhase('revealing')
    const ok = slot === correct
    setWasCorrect(ok)

    let nuevaRecta = recta, vidasR = vidas, colN = colocadas
    if (ok) {
      nuevaRecta = [...recta]; nuevaRecta.splice(slot, 0, current)
      setRecta(nuevaRecta)
      colN = colocadas + 1; setColocadas(colN)
    } else {
      vidasR = vidas - 1; setVidas(vidasR)
    }

    setTimeout(() => {
      if (vidasR <= 0 || pending.length === 0) {
        const passed = colN >= OBJETIVO
        const gan = Math.min(colN * 20, 200)
        setCoins(gan)
        if (user) {
          const t = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
          saveActivity(user.uid, {
            // category = id del examen (no la dificultad): así la tarea del
            // profesor "Fracciones → Ordenar de Menor a Mayor" se completa sola.
            type: 'examen', game: 'menor-a-mayor-test', category: 'menor-a-mayor-test',
            score: colN * 10, coinsEarned: gan, passed, timeSpent: t,
            userName: user.displayName, userPhoto: user.photoURL,
          }).catch(() => {})
        }
        setFase('fin'); return
      }
      setCurrent(pending[0]); setPending(p => p.slice(1))
      setPhase('placing'); setChosenSlot(null); setCorrectSlot(null); setWasCorrect(null)
    }, 1700)
  }

  const seo = {
    es: { title: 'Examen de ordenar números — fracciones, decimales y porcentajes', desc: 'Examen interactivo para ordenar de menor a mayor fracciones, decimales, porcentajes y negativos, con nota final. Coloca cada número en su sitio en la recta. Gratis, Primaria y ESO.', path: '/examen/menor-a-mayor-test' },
    en: { title: 'Ordering numbers exam — fractions, decimals and percentages', desc: 'Interactive exam to order fractions, decimals, percentages and negatives from least to greatest, with a final grade. Place each number on the line. Free.', path: '/en/examen/menor-a-mayor-test' },
    ca: { title: 'Examen d\'ordenar nombres — fraccions, decimals i percentatges', desc: 'Examen interactiu per ordenar de menor a major fraccions, decimals, percentatges i negatius, amb nota final. Col·loca cada nombre a la recta. Gratis, Primària i ESO.', path: '/ca/examen/menor-a-mayor-test' },
  }[lang] ?? null

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-4 py-8">
        {seo && <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={lang} />}
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/estudiar/matematicas'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>

          <div className="text-center mb-7">
            <span className="text-6xl block mb-3">📶</span>
            <h1 className="text-3xl font-black text-white mb-2">{tr({ es: 'Examen: Ordenar de Menor a Mayor', en: 'Exam: Order Least to Greatest', ca: 'Examen: Ordenar de Menor a Major' })}</h1>
            <p className="text-white/50 text-sm">{tr({ es: 'Fracciones, decimales y porcentajes en la recta', en: 'Fractions, decimals and percentages on the line', ca: 'Fraccions, decimals i percentatges a la recta' })}</p>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-3">
            {DIFS.map(d => (
              <button key={d.id} onClick={() => setDifId(d.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  difId === d.id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {d.emoji} {tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-sm text-center mb-6">{tr(DIFS.find(d => d.id === difId).que)}</p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-3">
            {[
              { icon: '🃏', title: tr({ es: 'Coloca cada número en su sitio', en: 'Place each number in order', ca: 'Col·loca cada nombre al seu lloc' }), desc: tr({ es: 'Aparece un número (fracción, decimal, porcentaje o entero) y decides dónde va en la recta, de menor a mayor.', en: 'A number appears (fraction, decimal, percentage or integer) and you decide where it goes on the line, least to greatest.', ca: 'Apareix un nombre (fracció, decimal, percentatge o enter) i decideixes on va a la recta, de menor a major.' }) },
              { icon: '❤️', title: tr({ es: `${MAX_VIDAS} vidas`, en: `${MAX_VIDAS} lives`, ca: `${MAX_VIDAS} vides` }), desc: tr({ es: 'Cada error te cuesta una vida y se revela el valor decimal para aprender.', en: 'Each mistake costs a life and the decimal value is revealed so you learn.', ca: 'Cada error et costa una vida i es revela el valor decimal per aprendre.' }) },
              { icon: '🏆', title: tr({ es: `Coloca ${OBJETIVO} de 10 → Apruebas`, en: `Place ${OBJETIVO} of 10 → Pass`, ca: `Col·loca ${OBJETIVO} de 10 → Aproves` }), desc: tr({ es: 'Al final tienes nota, como en un examen.', en: 'You get a grade at the end, like an exam.', ca: 'Al final tens nota, com en un examen.' }) },
            ].map(r => (
              <div key={r.title} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{r.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{r.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => empezar(difId)}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-sky-500/30">
            {tr({ es: 'Empezar el examen →', en: 'Start the exam →', ca: 'Començar l\'examen →' })}
          </button>
        </div>
      </div>
    )
  }

  // ── RESULTADO ────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const aprobado = colocadas >= OBJETIVO
    let nota, color
    if (!aprobado)            { nota = tr({ es: 'SUSPENSO', en: 'FAIL', ca: 'SUSPÈS' });            color = 'text-red-400' }
    else if (colocadas >= 10) { nota = tr({ es: 'SOBRESALIENTE', en: 'OUTSTANDING', ca: 'EXCEL·LENT' }); color = 'text-sky-300' }
    else if (colocadas >= 9)  { nota = tr({ es: 'NOTABLE', en: 'GOOD', ca: 'NOTABLE' });             color = 'text-blue-400' }
    else                      { nota = tr({ es: 'APROBADO', en: 'PASS', ca: 'APROVAT' });            color = 'text-green-400' }

    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-4 py-8">
        {seo && <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={lang} />}
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{tr({ es: 'Resultado', en: 'Result', ca: 'Resultat' })}</p>
            <h1 className={`text-4xl font-black mb-1 ${color}`}>{nota}</h1>
            <p className="text-white/40 text-sm">
              {aprobado
                ? tr({ es: `Colocaste ${colocadas} de 10 números correctamente`, en: `You placed ${colocadas} of 10 numbers correctly`, ca: `Vas col·locar ${colocadas} de 10 nombres correctament` })
                : tr({ es: `Solo ${colocadas} de los ${OBJETIVO} necesarios`, en: `Only ${colocadas} of the ${OBJETIVO} needed`, ca: `Només ${colocadas} dels ${OBJETIVO} necessaris` })}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { val: colocadas, label: tr({ es: 'Colocados', en: 'Placed', ca: 'Col·locats' }), emoji: '✅' },
              { val: OBJETIVO, label: tr({ es: 'Para aprobar', en: 'To pass', ca: 'Per aprovar' }), emoji: '🎯' },
              { val: vidas, label: tr({ es: 'Vidas', en: 'Lives', ca: 'Vides' }), emoji: '❤️' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <span className="text-xl block mb-1">{s.emoji}</span>
                <p className="text-xl font-black text-white">{s.val}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => empezar(difId)} className="w-full bg-sky-500 hover:bg-sky-400 text-black font-black py-3 rounded-xl transition-colors">
              {tr({ es: 'Repetir ↺', en: 'Retry ↺', ca: 'Repetir ↺' })}
            </button>
            <button onClick={() => navigate(localPath('/juegos/menor-a-mayor'))} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-colors">
              {tr({ es: 'Jugar la versión libre', en: 'Play the free-play version', ca: 'Jugar la versió lliure' })}
            </button>
          </div>
        </div>
        {coins > 0 && <CoinsAnimation coins={coins} />}
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  const progreso = Math.round((colocadas / (N_CARTAS - 1)) * 100)

  return (
    <div className="relative z-10 flex flex-col" style={{ height: 'calc(100dvh - 4rem)' }}>
      {seo && <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={lang} />}

      <div className="flex items-center justify-between px-4 sm:px-8 py-2 shrink-0 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-1">
          {Array.from({ length: MAX_VIDAS }).map((_, i) => (
            <span key={i} className={`text-xl transition-all ${i < vidas ? '' : 'opacity-20 grayscale'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white font-black text-base leading-none">{colocadas}/{N_CARTAS - 1}</p>
          <p className="text-white/30 text-xs">{tr({ es: 'colocados', en: 'placed', ca: 'col·locats' })}</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-sm font-semibold">{pending.length + 1} {tr({ es: 'restantes', en: 'remaining', ca: 'restants' })}</p>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 ml-auto overflow-hidden">
            <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </div>

      <TimelineBoard
        current={current} timeline={recta} phase={phase} wasCorrect={wasCorrect}
        chosenSlot={chosenSlot} correctSlot={correctSlot} onPlace={colocar}
        lang={lang} accent="sky"
        tuLineaLabel={{ es: 'Tu recta, de menor a mayor', en: 'Your line, least to greatest', ca: 'La teva recta, de menor a major' }}
        getName={it => it.expr}
        getDesc={() => ''}
        getReveal={it => it.decimal}
        getBadge={it => ({ text: tr(TIPO_LABEL[it.tipo]), cls: 'text-sky-300 bg-sky-500/10 border-sky-500/30' })}
      />
    </div>
  )
}
