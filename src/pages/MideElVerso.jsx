import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/mideVerso'
import PreguntaVerso from '../components/mideVerso/PreguntaVerso'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 5500 // da tiempo a leer la cuenta sílaba a sílaba

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Octosílabos: cuenta sílabas, mira la última palabra y la rima', en: 'Eight-syllable lines: count, check the last word and the rhyme', ca: 'Octosíl·labs: compta síl·labes, mira l’última paraula i la rima' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Versos de 7 a 11 sílabas y su nombre', en: 'Lines of 7 to 11 syllables and their names', ca: 'Versos de 7 a 11 síl·labes i el seu nom' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Alejandrinos con cesura y estrofas: redondilla, cuarteto, romance…', en: 'Alexandrines with caesura and stanzas: redondilla, cuarteto, romance…', ca: 'Alexandrins amb cesura i estrofes: redondilla, quartet, romanç…' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[mide-el-verso] los niveles de la pantalla no coinciden con NIVELES')
}

export default function MideElVerso() {
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
    setRonda(prev => genRonda(niv, { evitar: prev?.clave }))
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
        type: 'juego', game: 'mide-el-verso', category: 'metrica',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('mide-el-verso', { score: pts }),
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
    title: tr({ es: 'Mide el verso — Juego de métrica: sílabas, sinalefa, rima y estrofas', en: 'Measure the Verse — Spanish metre game: syllables, synalepha, rhyme', ca: 'Mesura el vers — Joc de mètrica castellana: síl·labes, sinalefa i rima' }),
    desc: tr({
      es: 'Mide versos de Garcilaso, Quevedo, Bécquer, Machado o Lorca: sílabas métricas con sinalefa y ley del acento final, rima consonante o asonante y estrofas. Juego de Lengua gratis.',
      en: 'Measure lines by Garcilaso, Quevedo, Bécquer, Machado or Lorca: metrical syllables with synalepha and the final-stress rule, full rhyme or assonance, and stanzas.',
      ca: 'Mesura versos de Garcilaso, Quevedo, Bécquer, Machado o Lorca: síl·labes mètriques amb sinalefa i llei de l’accent final, rima consonant o assonant i estrofes.',
    }),
    path: '/juegos/mide-el-verso',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="mide-el-verso"
            badge={tr({ es: 'Lengua · Métrica', en: 'Spanish · Metre', ca: 'Llengua · Mètrica' })}
            titulo={tr({ es: '✒️ Mide el verso', en: '✒️ Measure the Verse', ca: '✒️ Mesura el vers' })}
            sub={tr({ es: 'Sílabas, sinalefas, rima y estrofas', en: 'Syllables, synalephas, rhyme and stanzas', ca: 'Síl·labes, sinalefes, rima i estrofes' })} />

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
              <p>{tr({ es: 'Sale un fragmento de un poema clásico con uno o varios versos señalados. Hay que contar sus sílabas métricas, ver cómo es la última palabra, decir qué rima tienen dos versos o qué estrofa forman los cuatro.', en: 'An excerpt from a classic Spanish poem appears with one or more lines marked. You count the metrical syllables, check the last word, say how two lines rhyme or which stanza the four form.', ca: 'Surt un fragment d’un poema clàssic castellà amb un o més versos assenyalats. Cal comptar-ne les síl·labes mètriques, veure com és l’última paraula, dir quina rima tenen dos versos o quina estrofa formen els quatre.' })}</p>
              <p>{tr({ es: 'Para contar: separa en sílabas, une la vocal final de una palabra con la inicial de la siguiente (sinalefa) y mira la última palabra: si es aguda se suma una, si es esdrújula se resta una. Al corregir verás la cuenta entera, sílaba a sílaba.', en: 'To count: split into syllables, join a word’s final vowel with the next word’s first vowel (synalepha) and look at the last word: add one if it is stressed on the last syllable, subtract one if stressed on the third-to-last. When the answer is shown you see the whole count, syllable by syllable.', ca: 'Per comptar: separa en síl·labes, uneix la vocal final d’una paraula amb la inicial de la següent (sinalefa) i mira l’última paraula: si és aguda se suma una, si és esdrúixola se’n resta una. En corregir veuràs el compte sencer, síl·laba a síl·laba.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Cuentas sílabas como un poeta!' : '¡Endecasílabo perfecto! ✒️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You count syllables like a poet!' : 'A perfect hendecasyllable! ✒️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Comptes síl·labes com un poeta!' : 'Endecasíl·lab perfecte! ✒️',
    })
    const shareText = tr({
      es: `He medido bien ${aciertos} versos en Tuthor ✒️ — ¿puedes superarme? https://tuthor.es/juegos/mide-el-verso`,
      en: `I measured ${aciertos} lines of verse right on Tuthor ✒️ — can you beat me? https://tuthor.es/juegos/mide-el-verso`,
      ca: `He mesurat bé ${aciertos} versos a Tuthor ✒️ — em pots superar? https://tuthor.es/juegos/mide-el-verso`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="mide-el-verso" emoji="✒️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaVerso key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
