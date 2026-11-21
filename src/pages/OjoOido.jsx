import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta, tiempoPartida } from '../lib/ojoOido'
import PreguntaOjoOido from '../components/ojoOido/PreguntaOjoOido'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Tocar una parte es rápido; el recorrido, algo más: 120 s y +10 s por acierto.
const WRONG_TIME = 5
const REVEAL_MS = 5000 // da tiempo a leer la comprobación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Toca cada parte del ojo y del oído por su nombre', en: 'Tap each part of the eye and ear by its name', ca: 'Toca cada part de l’ull i de l’orella pel seu nom' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Encuentra la parte por lo que hace: enfocar, captar la luz, el equilibrio…', en: 'Find the part from what it does: focusing, detecting light, balance…', ca: 'Troba la part pel que fa: enfocar, captar la llum, l’equilibri…' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'El camino de la luz y del sonido, en orden, hasta el cerebro', en: 'The path of light and sound, in order, all the way to the brain', ca: 'El camí de la llum i del so, en ordre, fins al cervell' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[ojo-y-oido] los niveles de la pantalla no coinciden con NIVELES')
}

export default function OjoOido() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(() => tiempoPartida('facil'))
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
    setRonda({ ...genRonda(niv), uid: Math.random() })
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(tiempoPartida(niv))
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'ojo-y-oido', category: 'los-sentidos',
        score: pts, timeSpent: tiempoPartida(nivel),
        coinsEarned: computeCoins('ojo-y-oido', { score: pts }),
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
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'Ojo y Oído — Juego de los sentidos: partes del ojo y del oído', en: 'Eye and Ear — Senses game: parts of the eye and ear', ca: 'Ull i Orella — Joc dels sentits: parts de l’ull i de l’orella' }),
    desc: tr({
      es: 'Juego de los sentidos: toca las partes del ojo y del oído dibujados en corte, por su nombre o por su función, y sigue el camino de la luz y del sonido hasta que se convierten en señales para el cerebro. Primaria y ESO. Gratis.',
      en: 'Senses game: tap the parts of the eye and ear in cross-section, by name or by what they do, and follow the path of light and sound until they become signals for the brain. Free.',
      ca: 'Joc dels sentits: toca les parts de l’ull i de l’orella dibuixats en secció, pel nom o per la funció, i segueix el camí de la llum i del so fins que es converteixen en senyals per al cervell. Primària i ESO. Gratis.',
    }),
    path: '/juegos/ojo-y-oido',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="ojo-y-oido"
            badge={tr({ es: 'Biología · Los sentidos', en: 'Biology · The senses', ca: 'Biologia · Els sentits' })}
            titulo={tr({ es: '👂 Ojo y Oído', en: '👂 Eye and Ear', ca: '👂 Ull i Orella' })}
            sub={tr({ es: 'Las partes del ojo y del oído, y el camino de la luz y del sonido', en: 'The parts of the eye and ear, and the path of light and sound', ca: 'Les parts de l’ull i de l’orella, i el camí de la llum i del so' })} />

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
              <p>{tr({ es: 'Sale el ojo o el oído dibujado en corte, sin nombres. En fácil te decimos qué parte tocar; en medio, solo lo que hace (enfocar la imagen, captar la luz, el equilibrio…); en difícil, tienes que seguir el camino de la luz o del sonido tocando las partes en orden.', en: 'The eye or the ear appears in cross-section, without labels. On Easy we tell you which part to tap; on Medium, only what it does (focusing the image, detecting light, balance…); on Hard, you follow the path of light or sound by tapping the parts in order.', ca: 'Surt l’ull o l’orella dibuixat en secció, sense noms. En fàcil et diem quina part tocar; en mitjà, només el que fa (enfocar la imatge, captar la llum, l’equilibri…); en difícil, has de seguir el camí de la llum o del so tocant les parts en ordre.' })}</p>
              <p>{tr({ es: 'La luz entra por la córnea, pasa por la pupila y el cristalino y llega a la retina, que la convierte en señales nerviosas; el nervio óptico las lleva al cerebro. El sonido entra por el pabellón y el conducto, hace vibrar el tímpano y los huesecillos, y la cóclea convierte la vibración en señales nerviosas que el nervio auditivo lleva al cerebro.', en: 'Light enters through the cornea, passes through the pupil and the lens and reaches the retina, which turns it into nerve signals; the optic nerve carries them to the brain. Sound enters through the pinna and the ear canal, makes the eardrum and ossicles vibrate, and the cochlea turns the vibration into nerve signals that the auditory nerve carries to the brain.', ca: 'La llum entra per la còrnia, passa per la pupil·la i el cristal·lí i arriba a la retina, que la converteix en senyals nerviosos; el nervi òptic els porta al cervell. El so entra pel pavelló i el conducte, fa vibrar el timpà i els ossets, i la còclea converteix la vibració en senyals nerviosos que el nervi auditiu porta al cervell.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {tiempoPartida(nivel)}s · {tr({ es: `Acierto +10 · Fallo −${WRONG_TIME}s`, en: `Correct +10 · Wrong −${WRONG_TIME}s`, ca: `Encert +10 · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Buen ojo (y buen oído)!' : '¡Experto en los sentidos!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'A good eye (and a good ear)!' : 'Senses expert!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Bon ull (i bona orella)!' : 'Expert en els sentits!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} partes del ojo y del oído en Tuthor 👂 — ¿puedes superarme? https://tuthor.es/juegos/ojo-y-oido`,
      en: `I got ${aciertos} parts of the eye and ear right on Tuthor 👂 — can you beat me? https://tuthor.es/en/juegos/ojo-y-oido`,
      ca: `He encertat ${aciertos} parts de l’ull i de l’orella a Tuthor 👂 — em pots superar? https://tuthor.es/ca/juegos/ojo-y-oido`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="ojo-y-oido" emoji="👂" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const total = tiempoPartida(nivel)
  const timerColor = timeLeft > total * 0.66 ? '#22c55e' : timeLeft > total * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / total)
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
        <PreguntaOjoOido key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {acierto
              ? <span className="text-green-400">+10{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
