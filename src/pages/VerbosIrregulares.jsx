import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/verbosIrregulares'
import PreguntaVerbos from '../components/verbosIrregulares/PreguntaVerbos'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se construye (fichas, cajas, teclear): 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4000 // da tiempo a leer las tres formas

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Los 32 más usados (go, buy, eat…): forja sus formas y agrúpalos por patrón', en: 'The 32 most common (go, buy, eat…): build their forms and group them by pattern', ca: 'Els 32 més usats (go, buy, eat…): forja les formes i agrupa’ls per patró' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'La lista de la ESO: 71 verbos, a teclear y en frases', en: 'A secondary-school list of 71 verbs, typed and in sentences', ca: 'La llista de l’ESO: 71 verbs, per teclejar i en frases' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Más de 100 verbos (sought, dealt, withdrawn…) y escribir las dos formas', en: 'Over 100 verbs (sought, dealt, withdrawn…), writing both forms', ca: 'Més de 100 verbs (sought, dealt, withdrawn…) i escriure les dues formes' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[verbos-irregulares] los niveles de la pantalla no coinciden con NIVELES')
}

export default function VerbosIrregulares() {
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
        type: 'juego', game: 'verbos-irregulares', category: 'irregular-verbs',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('verbos-irregulares', { score: pts }),
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
    title: tr({ es: 'Verbos irregulares en inglés — Juego de pasado y participio', en: 'Irregular Verbs — Past simple and past participle game', ca: 'Verbs irregulars en anglès — Joc de passat i participi' }),
    desc: tr({
      es: 'Juego de verbos irregulares en inglés: forja el pasado y el participio con fichas, agrúpalos por patrón (cut-cut-cut, buy-bought-bought, go-went-gone), escríbelos y ponlos en frases. Más de 100 verbos, gratis.',
      en: 'Irregular verbs game: build the past simple and past participle from tiles, group verbs by pattern (cut-cut-cut, buy-bought-bought, go-went-gone), type them and use them in sentences. Over 100 verbs, free.',
      ca: 'Joc de verbs irregulars en anglès: forja el passat i el participi amb fitxes, agrupa’ls per patró (cut-cut-cut, buy-bought-bought, go-went-gone), escriu-los i posa’ls en frases. Més de 100 verbs, gratis.',
    }),
    path: '/juegos/verbos-irregulares',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="verbos-irregulares"
            badge={tr({ es: 'Inglés · Verbos', en: 'English · Verbs', ca: 'Anglès · Verbs' })}
            titulo={tr({ es: '🔁 Verbos Irregulares', en: '🔁 Irregular Verbs', ca: '🔁 Verbs Irregulars' })}
            sub={tr({ es: 'go · went · gone, sin tabla y sin trampas', en: 'go · went · gone, without the list in front of you', ca: 'go · went · gone, sense taula i sense trampes' })} />

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
              <p>{tr({ es: 'Forja: sale el infinitivo y hay que rellenar el pasado y el participio con fichas. Entre ellas está la forma que se inventa quien no se lo sabe (goed, buyed) y las que se confunden de verdad (bought y brought).', en: 'Build: you get the infinitive and fill in the past simple and the past participle with tiles. Among them are the made-up regular forms (goed, buyed) and the ones people really mix up (bought and brought).', ca: 'Forja: surt l’infinitiu i cal omplir el passat i el participi amb fitxes. Entre elles hi ha la forma que s’inventa qui no ho sap (goed, buyed) i les que es confonen de debò (bought i brought).' })}</p>
              <p>{tr({ es: 'Patrones: cada verbo a su caja, según qué formas se repiten: cut-cut-cut (las tres iguales), buy-bought-bought (pasado = participio), go-went-gone (las tres distintas) o come-came-come (participio = infinitivo). Aprender los verbos por grupos cuesta mucho menos que de uno en uno.', en: 'Patterns: each verb to its box, depending on which forms repeat: cut-cut-cut, buy-bought-bought, go-went-gone or come-came-come. Learning verbs in groups is much easier than one by one.', ca: 'Patrons: cada verb a la seva caixa, segons quines formes es repeteixen: cut-cut-cut, buy-bought-bought, go-went-gone o come-came-come. Aprendre els verbs per grups costa molt menys que d’un en un.' })}</p>
              <p>{tr({ es: 'En medio y difícil, además, hay que escribirlos letra a letra y colocar cada forma en su frase: con «yesterday» va el pasado; detrás de «have», el participio.', en: 'On medium and hard you also type them letter by letter and put each form in its sentence: “yesterday” takes the past simple; after “have”, the past participle.', ca: 'En mitjà i difícil, a més, cal escriure’ls lletra a lletra i col·locar cada forma a la seva frase: amb «yesterday» va el passat; darrere de «have», el participi.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Bien hecho!' : '¡Te los sabes de memoria!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Well done!' : 'You know them by heart!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ben fet!' : 'Te’ls saps de memòria!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} verbos irregulares en Tuthor 🔁 — ¿puedes superarme? https://tuthor.es/juegos/verbos-irregulares`,
      en: `I got ${aciertos} irregular verbs right on Tuthor 🔁 — can you beat me? https://tuthor.es/en/juegos/verbos-irregulares`,
      ca: `He encertat ${aciertos} verbs irregulars a Tuthor 🔁 — em pots superar? https://tuthor.es/ca/juegos/verbos-irregulares`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="verbos-irregulares" emoji="🔁" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaVerbos key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
