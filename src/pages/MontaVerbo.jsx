import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/montaVerbo'
import PreguntaVerbo from '../components/montaVerbo/PreguntaVerbo'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Seis fichas por tabla: unos 15-20 s cada una. Más tiempo cuanto más alto el nivel.
const TIEMPOS = { facil: 90, medio: 120, dificil: 150 }
const BONUS = { facil: 12, medio: 15, dificil: 20 }
const WRONG_TIME = 10
const REVEAL_OK = 1500
const REVEAL_MAL = 4500 // da tiempo a ver qué casillas fallaron

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Verbos regulares: presente, pretérito perfecto simple y futuro', en: 'Regular verbs: present, simple past and future', ca: 'Verbs regulars: present, passat simple i futur' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Imperfecto, condicional y tiempos compuestos (he cantado, había comido)', en: 'Imperfect, conditional and compound tenses', ca: 'Imperfet, condicional i temps compostos' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Subjuntivo e irregulares: tener, hacer, decir, pedir, dormir…', en: 'Subjunctive and irregular verbs', ca: 'Subjuntiu i irregulars' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[monta-el-verbo] los niveles de la pantalla no coinciden con NIVELES')
}

export default function MontaVerbo() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(TIEMPOS.facil)
  const [aciertos, setAciertos] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [ultimo, setUltimo] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const aciertosRef = useRef(0)
  const nivelRef = useRef('facil')
  useEffect(() => { aciertosRef.current = aciertos }, [aciertos])

  const next = useCallback(niv => {
    setRonda({ ...genRonda(niv), uid: Math.random() })
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    nivelRef.current = niv
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(TIEMPOS[niv])
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'monta-el-verbo', category: 'verbos',
        score: pts, timeSpent: TIEMPOS[nivelRef.current],
        coinsEarned: computeCoins('monta-el-verbo', { score: pts }),
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

  function responder(cells) {
    if (phase !== 'choose') return
    setPhase('result')
    const ok = esCorrecta(ronda, cells)
    setUltimo(ok)
    if (ok) {
      setAciertos(a => a + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + BONUS[nivel])
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), ok ? REVEAL_OK : REVEAL_MAL)
  }

  const seo = {
    title: tr({ es: 'Monta el Verbo — Juego de conjugación de verbos en español', en: 'Monta el Verbo — Spanish verb conjugation game', ca: 'Monta el Verbo — Joc de conjugació de verbs en castellà' }),
    desc: tr({
      es: 'Juego de conjugación: completa la tabla de cada tiempo verbal colocando las terminaciones con fichas. Presente, pretérito perfecto simple, imperfecto, futuro, condicional, compuestos, subjuntivo e irregulares. Primaria y ESO. Gratis.',
      en: 'Spanish conjugation game: complete each tense table by placing the endings with tiles. Free.',
      ca: 'Joc de conjugació en castellà: completa la taula de cada temps verbal col·locant les terminacions amb fitxes. Gratis.',
    }),
    path: '/juegos/monta-el-verbo',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="monta-el-verbo"
            badge={tr({ es: 'Lengua · Verbos', en: 'Spanish · Verbs', ca: 'Castellà · Verbs' })}
            titulo={tr({ es: '🛠️ Monta el Verbo', en: '🛠️ Monta el Verbo', ca: '🛠️ Monta el Verbo' })}
            sub={tr({ es: 'Completa la tabla del tiempo verbal con las fichas de las terminaciones', en: 'Complete the tense table with the ending tiles', ca: 'Completa la taula del temps verbal amb les fitxes de les terminacions' })} />

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
              <p>{tr({ es: 'Sale un verbo y un tiempo, por ejemplo «cantar · Pretérito imperfecto», y la tabla de las seis personas con la raíz ya puesta: cant·__. Toca las fichas de abajo para colocar las terminaciones en orden, de yo a ellos (cantaba, cantabas, cantaba, cantábamos…). Si te equivocas de ficha, toca el hueco para devolverla.', en: 'A verb and a tense appear, and the table of the six persons with the stem already in place. Tap the tiles to place the endings in order, from yo to ellos. Tap a gap to give a tile back.', ca: 'Surt un verb i un temps, i la taula de les sis persones amb l’arrel ja posada. Toca les fitxes per col·locar les terminacions en ordre, de yo a ellos. Toca un buit per tornar la fitxa.' })}</p>
              <p>{tr({ es: 'Sobran fichas: son las trampas de siempre, como la terminación de otro tiempo (cantía), la de otra conjugación (comamos en presente) o el irregular «regularizado» (hació, pedió, dijieron). En los tiempos compuestos lo que se coloca es el verbo haber: he, había, habré… cantado.', en: 'There are spare tiles: the usual traps, such as the ending of another tense, another conjugation, or a «regularised» irregular verb. In compound tenses you place the verb haber.', ca: 'Sobren fitxes: són els paranys de sempre, com la terminació d’un altre temps, d’una altra conjugació o l’irregular «regularitzat». En els temps compostos es col·loca el verb haber.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {TIEMPOS[nivel]}s · {tr({ es: `Acierto +10 y +${BONUS[nivel]}s · Fallo −${WRONG_TIME}s`, en: `Correct +10 and +${BONUS[nivel]}s · Wrong −${WRONG_TIME}s`, ca: `Encert +10 i +${BONUS[nivel]}s · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 3 ? 'Buen comienzo' : aciertos < 7 ? '¡Buenas tablas!' : '¡Maestro de la conjugación!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 3 ? 'Good start' : aciertos < 7 ? 'Great tables!' : 'Conjugation master!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 3 ? 'Bon començament' : aciertos < 7 ? 'Bones taules!' : 'Mestre de la conjugació!',
    })
    const shareText = tr({
      es: `He completado ${aciertos} tablas de verbos en Monta el Verbo de Tuthor 🛠️ — ¿puedes superarme? https://tuthor.es/juegos/monta-el-verbo`,
      en: `I completed ${aciertos} verb tables in Monta el Verbo on Tuthor 🛠️ — can you beat me? https://tuthor.es/juegos/monta-el-verbo`,
      ca: `He completat ${aciertos} taules de verbs a Monta el Verbo de Tuthor 🛠️ — em pots superar? https://tuthor.es/juegos/monta-el-verbo`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="monta-el-verbo" emoji="🛠️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'tablas', en: 'tables', ca: 'taules' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const total = TIEMPOS[nivel]
  const timerColor = timeLeft > total * 0.66 ? '#22c55e' : timeLeft > total * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / total)
  const isResult = phase === 'result'

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
        <PreguntaVerbo key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {ultimo
              ? <span className="text-green-400">+10 · +{BONUS[nivel]}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
