import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/compasCompleto'
import PreguntaCompas from '../components/compasCompleto/PreguntaCompas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Rondas de varios toques (emparejar tres, construir el hueco): 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4500 // da tiempo a ver el compás completo y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Redonda, blanca, negra y corchea, y completar compases', en: 'Semibreve, minim, crotchet and quaver, and completing bars', ca: 'Rodona, blanca, negra i corxera, i completar compassos' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Con puntillos, silencios y el compás de 3/4', en: 'With dots, rests and 3/4 time', ca: 'Amb punts, silencis i el compàs de 3/4' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Descubre el compás sumando los tiempos', en: 'Work out the time signature by adding the beats', ca: 'Descobreix el compàs sumant els temps' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[compas-completo] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CompasCompleto() {
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
        type: 'juego', game: 'compas-completo', category: 'ritmo',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('compas-completo', { score: pts }),
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
    title: tr({ es: 'Compás Completo — Juego de ritmo: figuras, silencios y compases', en: 'Full Bar — Rhythm game: note values, rests and time signatures', ca: 'Compàs Complet — Joc de ritme: figures, silencis i compassos' }),
    desc: tr({
      es: 'Redondas, blancas, negras, corcheas y semicorcheas en el pentagrama: cómo se llama cada figura, cuántos tiempos dura, qué falta para completar el compás y qué compás es. Juego de música gratis.',
      en: 'Semibreves, minims, crotchets, quavers and semiquavers on the staff: what each note is called, how many beats it lasts, what completes the bar and what the time signature is. Free music game.',
      ca: 'Rodones, blanques, negres, corxeres i semicorxeres al pentagrama: com es diu cada figura, quants temps dura, què falta per completar el compàs i quin compàs és. Joc de música gratis.',
    }),
    path: '/juegos/compas-completo',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="compas-completo"
            badge={tr({ es: 'Música · Ritmo', en: 'Music · Rhythm', ca: 'Música · Ritme' })}
            titulo={tr({ es: '🥁 Compás Completo', en: '🥁 Full Bar', ca: '🥁 Compàs Complet' })}
            sub={tr({ es: 'Cada figura vale unos tiempos: ¿qué falta para llenar el compás?', en: 'Every note is worth some beats: what fills the bar?', ca: 'Cada figura val uns temps: què falta per omplir el compàs?' })} />

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
              <p>{tr({ es: 'No hay opciones. Unas rondas son tres figuras dibujadas: toca una y después su nombre. Otras, una figura y una regla de cuatro tiempos: toca dónde acaba, con la negra como un tiempo (la redonda vale 4, la blanca 2, la corchea ½ y la semicorchea ¼; el puntillo suma la mitad).', en: 'There are no options. Some rounds show three notes: tap one and then its name. Others show a note and a four-beat ruler: tap where it ends, with the crotchet as one beat (semibreve 4, minim 2, quaver ½, semiquaver ¼; a dot adds half).', ca: 'No hi ha opcions. Unes rondes són tres figures dibuixades: toca’n una i després el seu nom. Altres, una figura i un regle de quatre temps: toca on acaba, amb la negra com un temps (la rodona val 4, la blanca 2, la corxera ½ i la semicorxera ¼; el punt suma la meitat).' })}</p>
              <p>{tr({ es: 'En los compases con hueco, rellénalo con figuras de la paleta hasta que el compás sume justo (vale cualquier combinación que sume lo que falta). Y con la cifra a la vista, toca dónde va la barra que separa dos compases.', en: 'In bars with a gap, fill it with notes from the palette until the bar adds up exactly (any combination that adds up to what is missing counts). And with the time signature shown, tap where the bar line between two bars goes.', ca: 'Als compassos amb buit, omple’l amb figures de la paleta fins que el compàs sumi just (val qualsevol combinació que sumi el que falta). I amb la xifra a la vista, toca on va la barra que separa dos compassos.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Llevas el ritmo!' : '¡Director de orquesta! 🥁',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You’ve got rhythm!' : 'Conductor! 🥁',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Portes el ritme!' : 'Director d’orquestra! 🥁',
    })
    const shareText = tr({
      es: `He completado ${aciertos} compases en Compás Completo de Tuthor 🥁 — ¿puedes superarme? https://tuthor.es/juegos/compas-completo`,
      en: `I completed ${aciertos} bars in Full Bar on Tuthor 🥁 — can you beat me? https://tuthor.es/juegos/compas-completo`,
      ca: `He completat ${aciertos} compassos a Compàs Complet de Tuthor 🥁 — em pots superar? https://tuthor.es/juegos/compas-completo`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="compas-completo" emoji="🥁" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaCompas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
