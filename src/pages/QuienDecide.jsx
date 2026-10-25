import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/quienDecide'
import PreguntaQuienDecide from '../components/quienDecide/PreguntaQuienDecide'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Se toca, se clasifica, se teclea o se ordena: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a ver el organigrama iluminado y la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Los tres poderes, los órganos del Estado y sus números', en: 'The three powers, the bodies of the State and their numbers', ca: 'Els tres poders, els òrgans de l’Estat i els seus números' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Derechos y deberes, y competencias del Estado y las autonomías', en: 'Rights and duties, and State and regional powers', ca: 'Drets i deures, i competències de l’Estat i les autonomies' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'El camino de una ley, paso a paso', en: 'How a law is made, step by step', ca: 'El camí d’una llei, pas a pas' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[quien-decide] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QuienDecide() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [aciertos, setAciertos] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [elegida, setElegida] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const aciertosRef = useRef(0)
  useEffect(() => { aciertosRef.current = aciertos }, [aciertos])

  const next = useCallback(niv => {
    setRonda(genRonda(niv))
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'quien-decide', category: 'constitucion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('quien-decide', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => {
    if (screen !== 'playing' || phase === 'result') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(nextRef.current), [])

  function responder(r) {
    if (phase !== 'choose') return
    setElegida(r); setPhase('result')
    if (esCorrecta(ronda, r)) {
      setAciertos(a => a + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: '¿Quién Decide? — Juego de la Constitución española: poderes, Cortes, Gobierno y leyes', en: 'Who Decides? — Spanish Constitution game: powers, Parliament, Government and laws', ca: 'Qui Decideix? — Joc de la Constitució espanyola: poders, Corts, Govern i lleis' }),
    desc: tr({
      es: 'El Estado en un organigrama: qué hace el Congreso, el Senado, el Gobierno, el rey, el Tribunal Constitucional o el CGPJ; los tres poderes; los números de la Constitución; derechos y deberes; competencias; y el camino de una ley. Juego gratis.',
      en: 'The State as an organisation chart: what Congress, the Senate, the Government, the King, the Constitutional Court or the CGPJ do; the three powers; the Constitution’s numbers; rights and duties; regional powers; and how a law is made. Free game.',
      ca: 'L’Estat en un organigrama: què fa el Congrés, el Senat, el Govern, el rei, el Tribunal Constitucional o el CGPJ; els tres poders; els números de la Constitució; drets i deures; competències; i el camí d’una llei. Joc gratis.',
    }),
    path: '/juegos/quien-decide',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="quien-decide"
            badge={tr({ es: 'Geografía · La Constitución', en: 'Geography · The Constitution', ca: 'Geografia · La Constitució' })}
            titulo={tr({ es: '🗳️ ¿Quién Decide?', en: '🗳️ Who Decides?', ca: '🗳️ Qui Decideix?' })}
            sub={tr({ es: 'Congreso, Senado, Gobierno, rey y tribunales: a cada uno, lo suyo', en: 'Congress, Senate, Government, King and courts: each to its own job', ca: 'Congrés, Senat, Govern, rei i tribunals: a cadascú, el que li toca' })} />

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' })}</p>
          <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
            {Object.entries(DIFS).map(([id, d], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-5">{tr(DIFS[nivel].desc)}</p>

          <button onClick={() => startGame(nivel)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
          </button>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Sale algo que pasa en el Estado («vota la investidura del presidente», «juzga a una persona acusada de un delito») y hay que decir qué órgano o qué poder se encarga. Al corregir, el organigrama ilumina la respuesta.', en: 'Something that happens in the State appears («votes to invest the Prime Minister», «tries a person accused of a crime») and you say which body or which power is responsible. When you answer, the organisation chart lights up the answer.', ca: 'Surt una cosa que passa a l’Estat («vota la investidura del president», «jutja una persona acusada d’un delicte») i cal dir quin òrgan o quin poder se n’encarrega. En corregir, l’organigrama il·lumina la resposta.' })}</p>
              <p>{tr({ es: 'También salen los números de la Constitución (350 diputados, 169 artículos, 1978), qué derechos son fundamentales y cuáles principios rectores o deberes, y qué competencias son del Estado o de las comunidades autónomas.', en: 'You also get the Constitution’s numbers (350 deputies, 169 articles, 1978), which rights are fundamental and which are guiding principles or duties, and which powers belong to the State or the autonomous communities.', ca: 'També surten els números de la Constitució (350 diputats, 169 articles, 1978), quins drets són fonamentals i quins principis rectors o deures, i quines competències són de l’Estat o de les comunitats autònomes.' })}</p>
              <p>{tr({ es: 'No hay opciones: tocas el órgano en el organigrama, llevas cada caso a su caja (poder, derecho o competencia), tecleas los números y ordenas los pasos de una ley.', en: 'There are no options: you tap the body on the chart, put each case in its box (power, right or competence), type the numbers and order the steps of a law.', ca: 'No hi ha opcions: toques l’òrgan a l’organigrama, portes cada cas a la seva caixa (poder, dret o competència), tecleges els números i ordenes els passos d’una llei.' })}</p>
              <p>{tr({ es: 'En difícil, el camino de una ley: de la iniciativa al BOE, ¿qué paso va después?', en: 'On hard, the path of a law: from the initiative to the Official Gazette, which step comes next?', ca: 'En difícil, el camí d’una llei: de la iniciativa al BOE, quin pas va després?' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {tr({ es: `Acierto +10 y +${CORRECT_TIME}s · Fallo −${WRONG_TIME}s`, en: `Correct +10 and +${CORRECT_TIME}s · Wrong −${WRONG_TIME}s`, ca: `Encert +10 i +${CORRECT_TIME}s · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Te sabes la Constitución!' : '¡Padre de la Constitución! 🗳️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You know the Constitution!' : 'Founding father! 🗳️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Et saps la Constitució!' : 'Pare de la Constitució! 🗳️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas sobre la Constitución en ¿Quién Decide? de Tuthor 🗳️ — ¿puedes superarme? https://tuthor.es/juegos/quien-decide`,
      en: `I got ${aciertos} questions on the Spanish Constitution right in Who Decides? on Tuthor 🗳️ — can you beat me? https://tuthor.es/juegos/quien-decide`,
      ca: `He encertat ${aciertos} preguntes sobre la Constitució a Qui Decideix? de Tuthor 🗳️ — em pots superar? https://tuthor.es/juegos/quien-decide`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="quien-decide" emoji="🗳️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / GAME_TIME)
  const isResult = phase === 'result'
  const acierto = isResult && esCorrecta(ronda, elegida)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <div className="w-full max-w-[480px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{DIFS[nivel].emoji} {tr(DIFS[nivel].label)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {aciertos * 10} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}
            {streak >= 2 && <span className="flex items-center gap-0.5 text-orange-400 text-sm font-black"><Racha className="w-4 h-4" />{streak}</span>}
          </p>
        </div>
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff15" strokeWidth="4" />
            <circle cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct)}`}
              strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-sm" style={{ color: timerColor }}>{timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[480px]">
        <PreguntaQuienDecide key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {acierto
              ? <span className="text-green-400">+10 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
