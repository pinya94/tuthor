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

// Cada ronda se hace (vacunar, simular, colocar): 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a leer la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Fichas de enfermedades, microbios dibujados y un brote fácil de encerrar', en: 'Disease cards, drawn microbes and an outbreak that is easy to contain', ca: 'Fitxes de malalties, microbis dibuixats i un brot fàcil de tancar' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Brotes más justos, células o no, antibióticos y defensas', en: 'Tighter outbreaks, cells or not, antibiotics and defences', ca: 'Brots més ajustats, cèl·lules o no, antibiòtics i defenses' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'El brote con las vacunas justas, inmunidad de grupo y tipos de inmunidad', en: 'The outbreak with exactly enough vaccines, herd immunity and types of immunity', ca: 'El brot amb les vacunes justes, immunitat de grup i tipus d’immunitat' } },
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
      es: 'Vacuna para frenar un brote en una cuadrícula y míralo crecer generación a generación, encuentra el porcentaje de la inmunidad de grupo y clasifica virus, bacterias, hongos y protozoos. Juego gratis.',
      en: 'Vaccinate to stop an outbreak on a grid and watch it spread generation by generation, find the herd immunity percentage and sort viruses, bacteria, fungi and protozoa. Free game.',
      ca: 'Vacuna per frenar un brot en una quadrícula i mira com creix generació a generació, troba el percentatge de la immunitat de grup i classifica virus, bacteris, fongs i protozous. Joc gratis.',
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
              <p>{tr({ es: 'Frena el brote: en una cuadrícula de personas hay un enfermo y algunos ya inmunes. Toca a tres para vacunarlos y pulsa «Simular»: el contagio pasa a los vecinos sin proteger, generación a generación. Gana si no enferman más de la meta.', en: 'Stop the outbreak: in a grid of people there is one sick person and some already immune. Tap three to vaccinate them and press “Run”: the infection passes to unprotected neighbours, generation by generation. You win if no more than the target fall ill.', ca: 'Frena el brot: en una quadrícula de persones hi ha un malalt i alguns ja immunes. Toca’n tres per vacunar-los i prem «Simular»: el contagi passa als veïns sense protegir, generació a generació. Guanyes si no emmalalteixen més que la meta.' })}</p>
              <p>{tr({ es: 'Otras rondas: mover el deslizador hasta vacunar justo lo necesario para que R baje de 1, completar la ficha de una enfermedad (microbio y contagio) y clasificar microbios dibujados, defensas o tipos de inmunidad.', en: 'Other rounds: move the slider until you vaccinate just enough for R to drop below 1, complete a disease card (microbe and spread) and sort drawn microbes, defences or types of immunity.', ca: 'Altres rondes: moure el control fins a vacunar just el necessari perquè R baixi d’1, completar la fitxa d’una malaltia (microbi i contagi) i classificar microbis dibuixats, defenses o tipus d’immunitat.' })}</p>
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
