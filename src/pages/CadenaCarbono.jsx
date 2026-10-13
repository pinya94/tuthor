import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cadenaCarbono'
import PreguntaCadena from '../components/cadenaCarbono/PreguntaCadena'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada molécula se construye: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a ver la cadena numerada y la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Construir moléculas sin localizador (propeno, etanol, butanal) y poner los hidrógenos', en: 'Build molecules without locants (propene, ethanol, butanal) and add the hydrogens', ca: 'Construir molècules sense localitzador (propè, etanol, butanal) i posar els hidrògens' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Con localizador (pent-2-eno, butan-2-ol) y numerar desde el extremo bueno', en: 'With locants (pent-2-ene, butan-2-ol) and numbering from the right end', ca: 'Amb localitzador (pent-2-è, butan-2-ol) i numerar des de l’extrem bo' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Ramificaciones y construir isómeros con la misma fórmula', en: 'Branches and building isomers with the same formula', ca: 'Ramificacions i construir isòmers amb la mateixa fórmula' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[cadena-carbono] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CadenaCarbono() {
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
        type: 'juego', game: 'cadena-carbono', category: 'quimica-organica',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('cadena-carbono', { score: pts }),
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
    title: tr({ es: 'Cadena de Carbono — Juego de química orgánica: nombra y formula moléculas', en: 'Carbon Chain — Organic chemistry game: name molecules and write their formulas', ca: 'Cadena de Carboni — Joc de química orgànica: anomena i formula molècules' }),
    desc: tr({
      es: 'Construye moléculas orgánicas a partir de su nombre: carbonos, dobles y triples enlaces, alcoholes, aldehídos, cetonas, ácidos y aminas. Numera la cadena, pon los hidrógenos y monta isómeros. Juego gratis.',
      en: 'Build organic molecules from their names: carbons, double and triple bonds, alcohols, aldehydes, ketones, acids and amines. Number the chain, add the hydrogens and build isomers. Free game.',
      ca: 'Construeix molècules orgàniques a partir del nom: carbonis, enllaços dobles i triples, alcohols, aldehids, cetones, àcids i amines. Numera la cadena, posa els hidrògens i munta isòmers. Joc gratis.',
    }),
    path: '/juegos/cadena-carbono',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="cadena-carbono"
            badge={tr({ es: 'Química · Química orgánica', en: 'Chemistry · Organic chemistry', ca: 'Química · Química orgànica' })}
            titulo={tr({ es: '⛓️ Cadena de Carbono', en: '⛓️ Carbon Chain', ca: '⛓️ Cadena de Carboni' })}
            sub={tr({ es: 'Del nombre a la molécula, pieza a pieza', en: 'From the name to the molecule, piece by piece', ca: 'Del nom a la molècula, peça a peça' })} />

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
              <p>{tr({ es: 'Te dan un nombre («pent-2-eno», «ácido butanoico») y construyes la molécula: pon los carbonos con − y +, elige una pieza (doble o triple enlace, –OH, C=O, –NH₂, –CHO, –COOH o una rama –CH₃) y tócala en su sitio del dibujo. La fórmula se va calculando sola.', en: 'You are given a name (“pent-2-ene”, “butanoic acid”) and you build the molecule: set the carbons with − and +, pick a piece (double or triple bond, –OH, C=O, –NH₂, –CHO, –COOH or a –CH₃ branch) and tap its place on the drawing. The formula updates as you go.', ca: 'Et donen un nom («pent-2-è», «àcid butanoic») i construeixes la molècula: posa els carbonis amb − i +, tria una peça (enllaç doble o triple, –OH, C=O, –NH₂, –CHO, –COOH o una branca –CH₃) i toca-la al seu lloc del dibuix. La fórmula es calcula sola.' })}</p>
              <p>{tr({ es: 'Otras rondas: tocar el carbono por el que se empieza a numerar (el más cercano al grupo), poner los hidrógenos de cada carbono hasta que todos formen 4 enlaces y, en difícil, construir un isómero: otra molécula con la misma fórmula.', en: 'Other rounds: tap the carbon where numbering starts (the one nearest the group), give each carbon its hydrogens until all form 4 bonds and, on hard, build an isomer: a different molecule with the same formula.', ca: 'Altres rondes: tocar el carboni per on es comença a numerar (el més proper al grup), posar els hidrògens de cada carboni fins que tots formin 4 enllaços i, en difícil, construir un isòmer: una altra molècula amb la mateixa fórmula.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Ya lees moléculas!' : '¡Maestro del carbono! ⛓️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You can read molecules!' : 'Carbon master! ⛓️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ja llegeixes molècules!' : 'Mestre del carboni! ⛓️',
    })
    const shareText = tr({
      es: `He nombrado ${aciertos} moléculas en Cadena de Carbono de Tuthor ⛓️ — ¿puedes superarme? https://tuthor.es/juegos/cadena-carbono`,
      en: `I named ${aciertos} molecules in Carbon Chain on Tuthor ⛓️ — can you beat me? https://tuthor.es/juegos/cadena-carbono`,
      ca: `He anomenat ${aciertos} molècules a Cadena de Carboni de Tuthor ⛓️ — em pots superar? https://tuthor.es/juegos/cadena-carbono`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="cadena-carbono" emoji="⛓️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaCadena key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
