import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/brote'
import PreguntaBrote from '../components/brote/PreguntaBrote'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a leer la explicación

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Microbios, quién causa cada enfermedad y cómo se contagia', en: 'Microbes, what causes each disease and how it spreads', ca: 'Microbis, qui causa cada malaltia i com s’encomana' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Células o no, antibióticos, defensas del cuerpo y contagios', en: 'Cells or not, antibiotics, the body’s defences and infections', ca: 'Cèl·lules o no, antibiòtics, defenses del cos i contagis' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Tipos de inmunidad, crecimiento de un brote e inmunidad de grupo', en: 'Types of immunity, outbreak growth and herd immunity', ca: 'Tipus d’immunitat, creixement d’un brot i immunitat de grup' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[brote] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Brote() {
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
        type: 'juego', game: 'brote', category: 'salud-enfermedad',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('brote', { score: pts }),
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
    title: tr({ es: '¡Brote! — Juego de salud y enfermedad: microbios, contagio, defensas y vacunas', en: 'Outbreak! — Health and disease game: microbes, infection, defences and vaccines', ca: 'Brot! — Joc de salut i malaltia: microbis, contagi, defenses i vacunes' }),
    desc: tr({
      es: 'Virus, bacterias, hongos y protozoos dibujados; qué causa cada enfermedad y cómo se contagia; cuándo sirven los antibióticos; las tres líneas de defensa, los tipos de inmunidad, cómo crece un brote y la inmunidad de grupo. Juego de biología gratis.',
      en: 'Viruses, bacteria, fungi and protozoa drawn; what causes each disease and how it spreads; when antibiotics work; the three lines of defence, types of immunity, how an outbreak grows and herd immunity. Free biology game.',
      ca: 'Virus, bacteris, fongs i protozous dibuixats; què causa cada malaltia i com s’encomana; quan serveixen els antibiòtics; les tres línies de defensa, els tipus d’immunitat, com creix un brot i la immunitat de grup. Joc de biologia gratis.',
    }),
    path: '/juegos/brote',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="brote"
            badge={tr({ es: 'Biología · Salud y enfermedad', en: 'Biology · Health and disease', ca: 'Biologia · Salut i malaltia' })}
            titulo={tr({ es: '🦠 ¡Brote!', en: '🦠 Outbreak!', ca: '🦠 Brot!' })}
            sub={tr({ es: 'Conoce a los microbios, cómo se contagian y cómo te defiendes', en: 'Meet the microbes, how they spread and how you fight back', ca: 'Coneix els microbis, com s’encomanen i com et defenses' })} />

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
              <p>{tr({ es: 'Unas rondas enseñan un microbio dibujado: ¿virus, bacteria, hongo o protozoo? ¿Es una célula? Otras, una enfermedad: qué la causa, cómo se contagia y si los antibióticos sirven contra su microbio (solo atacan bacterias).', en: 'Some rounds show a drawn microbe: virus, bacterium, fungus or protozoan? Is it a cell? Others show a disease: what causes it, how it spreads and whether antibiotics work against its microbe (they only attack bacteria).', ca: 'Unes rondes mostren un microbi dibuixat: virus, bacteri, fong o protozou? És una cèl·lula? D’altres, una malaltia: què la causa, com s’encomana i si els antibiòtics serveixen contra el seu microbi (només ataquen bacteris).' })}</p>
              <p>{tr({ es: 'También salen casos para decidir qué línea de defensa actúa (barreras, defensa inespecífica o linfocitos) y qué tipo de inmunidad es (activa o pasiva, natural o artificial).', en: 'There are also cases where you decide which line of defence is at work (barriers, non-specific defence or lymphocytes) and what type of immunity it is (active or passive, natural or artificial).', ca: 'També surten casos per decidir quina línia de defensa actua (barreres, defensa inespecífica o limfòcits) i quin tipus d’immunitat és (activa o passiva, natural o artificial).' })}</p>
              <p>{tr({ es: 'Y en los niveles altos, el brote: si cada enfermo contagia a R personas, los casos se multiplican por R en cada generación; para frenarlo hay que vacunar al menos 1 − 1/R de la población.', en: 'And on the higher levels, the outbreak: if each sick person infects R people, cases multiply by R every generation; to stop it you must vaccinate at least 1 − 1/R of the population.', ca: 'I als nivells alts, el brot: si cada malalt n’encomana R persones, els casos es multipliquen per R a cada generació; per frenar-lo cal vacunar almenys 1 − 1/R de la població.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Brote controlado!' : '¡Epidemiólogo de élite! 🦠',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Outbreak under control!' : 'Top epidemiologist! 🦠',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Brot controlat!' : 'Epidemiòleg d’elit! 🦠',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas de microbios y defensas en ¡Brote! de Tuthor 🦠 — ¿puedes superarme? https://tuthor.es/juegos/brote`,
      en: `I got ${aciertos} microbe and immunity questions right in Outbreak! on Tuthor 🦠 — can you beat me? https://tuthor.es/juegos/brote`,
      ca: `He encertat ${aciertos} preguntes de microbis i defenses a Brot! de Tuthor 🦠 — em pots superar? https://tuthor.es/juegos/brote`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="brote" emoji="🦠" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaBrote key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
