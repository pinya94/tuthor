import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/quienLoPenso'
import PreguntaFilosofo from '../components/quienLoPenso/PreguntaFilosofo'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a ver al filósofo en la línea del tiempo

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Ideas famosas y el concepto clave de cada filósofo', en: 'Famous ideas and each philosopher’s key concept', ca: 'Idees famoses i el concepte clau de cada filòsof' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Y además la corriente o escuela de cada uno', en: 'Plus each one’s school or movement', ca: 'I a més el corrent o l’escola de cadascun' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Con la cronología: quién vivió antes', en: 'With chronology: who lived first', ca: 'Amb la cronologia: qui va viure abans' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[quien-lo-penso] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QuienLoPenso() {
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
        type: 'juego', game: 'quien-lo-penso', category: 'filosofia',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('quien-lo-penso', { score: pts }),
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
    title: tr({ es: '¿Quién lo Pensó? — Juego de historia de la filosofía: ideas, autores y corrientes', en: 'Who Thought It? — History of philosophy game: ideas, thinkers and schools', ca: 'Qui ho va Pensar? — Joc d’història de la filosofia: idees, autors i corrents' }),
    desc: tr({
      es: 'De Tales a Hannah Arendt: lee una idea y descubre qué filósofo la defendió, su concepto clave, su corriente y quién vivió antes, con la línea del tiempo de la filosofía. Juego gratis para ESO, Bachillerato y la PAU.',
      en: 'From Thales to Hannah Arendt: read an idea and find out which philosopher held it, their key concept, their school and who lived first, with a timeline of philosophy. Free game.',
      ca: 'De Tales a Hannah Arendt: llegeix una idea i descobreix quin filòsof la va defensar, el seu concepte clau, el seu corrent i qui va viure abans, amb la línia del temps de la filosofia. Joc gratis.',
    }),
    path: '/juegos/quien-lo-penso',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="quien-lo-penso"
            badge={tr({ es: 'Filosofía · Historia de la filosofía', en: 'Philosophy · History of philosophy', ca: 'Filosofia · Història de la filosofia' })}
            titulo={tr({ es: '🦉 ¿Quién lo Pensó?', en: '🦉 Who Thought It?', ca: '🦉 Qui ho va Pensar?' })}
            sub={tr({ es: 'Veintiséis siglos de ideas: ¿sabes de quién es cada una?', en: 'Twenty-six centuries of ideas: do you know whose each one is?', ca: 'Vint-i-sis segles d’idees: saps de qui és cadascuna?' })} />

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
              <p>{tr({ es: 'Sale una idea («nadie se baña dos veces en el mismo río», «la existencia precede a la esencia»…) y hay que decir qué filósofo la defendió. Otras rondas preguntan el concepto clave de un filósofo o su corriente.', en: 'An idea appears and you say which philosopher held it. Other rounds ask for a philosopher’s key concept or school.', ca: 'Surt una idea i cal dir quin filòsof la va defensar. Altres rondes pregunten el concepte clau d’un filòsof o el seu corrent.' })}</p>
              <p>{tr({ es: 'Debajo está la línea del tiempo, de los presocráticos al siglo XX, y al corregir se ilumina el filósofo. En difícil, además, hay que decir quién vivió antes.', en: 'Below is a timeline from the Presocratics to the 20th century, which lights up the philosopher when you answer. On hard, you also say who lived first.', ca: 'A sota hi ha la línia del temps, dels presocràtics al segle XX, i en corregir s’il·lumina el filòsof. En difícil, a més, cal dir qui va viure abans.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Muy filosófico!' : '¡Amigo de la sabiduría! 🦉',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Very philosophical!' : 'Lover of wisdom! 🦉',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Molt filosòfic!' : 'Amic de la saviesa! 🦉',
    })
    const shareText = tr({
      es: `He reconocido ${aciertos} ideas filosóficas en ¿Quién lo Pensó? de Tuthor 🦉 — ¿puedes superarme? https://tuthor.es/juegos/quien-lo-penso`,
      en: `I recognised ${aciertos} philosophical ideas in Who Thought It? on Tuthor 🦉 — can you beat me? https://tuthor.es/juegos/quien-lo-penso`,
      ca: `He reconegut ${aciertos} idees filosòfiques a Qui ho va Pensar? de Tuthor 🦉 — em pots superar? https://tuthor.es/juegos/quien-lo-penso`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="quien-lo-penso" emoji="🦉" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaFilosofo key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
