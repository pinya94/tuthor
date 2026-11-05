import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/construyeAtomo'
import PreguntaAtomo from '../components/construyeAtomo/PreguntaAtomo'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda es construir algo (átomo, orbitales, casilla): 150 s y +8 s por acierto.
const GAME_TIME = 150
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 6500 // da tiempo a leer la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Átomos neutros: protones, neutrones y electrones a partir de Z y A', en: 'Neutral atoms: protons, neutrons and electrons from Z and A', ca: 'Àtoms neutres: protons, neutrons i electrons a partir de Z i A' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Iones e isótopos: Cl⁻, Mg²⁺, carbono-14…', en: 'Ions and isotopes: Cl⁻, Mg²⁺, carbon-14…', ca: 'Ions i isòtops: Cl⁻, Mg²⁺, carboni-14…' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Configuración electrónica y su lugar en la tabla periódica', en: 'Electron configuration and its place in the periodic table', ca: 'Configuració electrònica i el seu lloc a la taula periòdica' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[construye-atomo] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ConstruyeAtomo() {
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
        type: 'juego', game: 'construye-atomo', category: 'atomos-moleculas',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('construye-atomo', { score: pts }),
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
    title: tr({ es: 'Construye el Átomo — Juego de protones, neutrones, electrones y configuración electrónica', en: 'Build the Atom — Protons, neutrons, electrons and electron configuration game', ca: 'Construeix l’Àtom — Joc de protons, neutrons, electrons i configuració electrònica' }),
    desc: tr({
      es: 'Juego de estructura atómica para ESO y Bachillerato: construye átomos, iones e isótopos con protones, neutrones y electrones a partir de Z y A, reparte los electrones en orbitales y encuentra cada configuración en la tabla periódica. Gratis.',
      en: 'Atomic structure game: build atoms, ions and isotopes with protons, neutrons and electrons from Z and A, fill the orbitals with electrons and find each configuration in the periodic table. Free.',
      ca: 'Joc d’estructura atòmica per a ESO i Batxillerat: construeix àtoms, ions i isòtops amb protons, neutrons i electrons a partir de Z i A, reparteix els electrons en orbitals i troba cada configuració a la taula periòdica. Gratis.',
    }),
    path: '/juegos/construye-atomo',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="construye-atomo"
            badge={tr({ es: 'Química · Estructura atómica', en: 'Chemistry · Atomic structure', ca: 'Química · Estructura atòmica' })}
            titulo={tr({ es: '⚛️ Construye el Átomo', en: '⚛️ Build the Atom', ca: '⚛️ Construeix l’Àtom' })}
            sub={tr({ es: 'Protones, neutrones y electrones, uno a uno', en: 'Protons, neutrons and electrons, one by one', ca: 'Protons, neutrons i electrons, un a un' })} />

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
              <p>{tr({ es: 'Z (número atómico) es el número de protones y decide qué elemento es: si cambias los protones, cambia el elemento. A (número másico) cuenta protones y neutrones juntos, así que los neutrones son A − Z. En un átomo neutro hay tantos electrones como protones.', en: 'Z (atomic number) is the number of protons and decides which element it is: change the protons and the element changes. A (mass number) counts protons and neutrons together, so the neutrons are A − Z. A neutral atom has as many electrons as protons.', ca: 'Z (nombre atòmic) és el nombre de protons i decideix quin element és: si canvies els protons, canvia l’element. A (nombre màssic) compta protons i neutrons junts, així que els neutrons són A − Z. En un àtom neutre hi ha tants electrons com protons.' })}</p>
              <p>{tr({ es: 'Un ion solo gana o pierde electrones: el Na⁺ ha perdido uno y el Cl⁻ ha ganado uno. Los isótopos de un elemento tienen los mismos protones y distintos neutrones. En el nivel difícil se reparten los electrones en orbitales (1s 2s 2p 3s 3p 4s 3d 4p: el 4s va antes que el 3d) y se busca el elemento en la tabla por su última capa y su último subnivel.', en: 'An ion only gains or loses electrons: Na⁺ has lost one and Cl⁻ has gained one. The isotopes of an element have the same protons and different neutrons. On the hard level you fill the orbitals with electrons (1s 2s 2p 3s 3p 4s 3d 4p: 4s comes before 3d) and find the element in the table from its outer shell and its last sublevel.', ca: 'Un ió només guanya o perd electrons: el Na⁺ n’ha perdut un i el Cl⁻ n’ha guanyat un. Els isòtops d’un element tenen els mateixos protons i diferents neutrons. Al nivell difícil es reparteixen els electrons en orbitals (1s 2s 2p 3s 3p 4s 3d 4p: el 4s va abans que el 3d) i es busca l’element a la taula per la seva última capa i el seu últim subnivell.' })}</p>
              <p>{tr({ es: 'Los protones se dibujan en rojo, los neutrones en gris y los electrones en azul, en sus capas.', en: 'Protons are drawn in red, neutrons in grey and electrons in blue, in their shells.', ca: 'Els protons es dibuixen en vermell, els neutrons en gris i els electrons en blau, a les seves capes.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen químico!' : '¡Maestro del átomo!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good chemist!' : 'Master of the atom!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon químic!' : 'Mestre de l’àtom!',
    })
    const shareText = tr({
      es: `He construido ${aciertos} átomos en Tuthor ⚛️ — ¿puedes superarme? https://tuthor.es/juegos/construye-atomo`,
      en: `I built ${aciertos} atoms on Tuthor ⚛️ — can you beat me? https://tuthor.es/en/juegos/construye-atomo`,
      ca: `He construït ${aciertos} àtoms a Tuthor ⚛️ — em pots superar? https://tuthor.es/ca/juegos/construye-atomo`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="construye-atomo" emoji="⚛️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaAtomo key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
