import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/disoluciones'
import PreguntaDisolucion from '../components/disoluciones/PreguntaDisolucion'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a ver los vasos coloreados y la cuenta

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Soluto y disolvente, concentración en g/L y qué vaso está más concentrado', en: 'Solute and solvent, concentration in g/L and which beaker is most concentrated', ca: 'Solut i dissolvent, concentració en g/L i quin got és més concentrat' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Gramos que necesitas, % en masa y disoluciones saturadas', en: 'Grams you need, % by mass and saturated solutions', ca: 'Grams que necessites, % en massa i dissolucions saturades' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Diluir con c₁·V₁ = c₂·V₂, molaridad y despejar el volumen', en: 'Diluting with c₁·V₁ = c₂·V₂, molarity and solving for volume', ca: 'Diluir amb c₁·V₁ = c₂·V₂, molaritat i aïllar el volum' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[prepara-disolucion] los niveles de la pantalla no coinciden con NIVELES')
}

export default function PreparaDisolucion() {
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
        type: 'juego', game: 'prepara-disolucion', category: 'disoluciones',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('prepara-disolucion', { score: pts }),
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
    title: tr({ es: 'Prepara la Disolución — Juego de concentración y disoluciones', en: 'Make the Solution — Concentration and solutions game', ca: 'Prepara la Dissolució — Joc de concentració i dissolucions' }),
    desc: tr({
      es: 'Vasos de precipitados dibujados para practicar disoluciones: soluto y disolvente, concentración en g/L, porcentaje en masa, solubilidad y disoluciones saturadas, diluir y molaridad. Juego de química gratis.',
      en: 'Drawn beakers to practise solutions: solute and solvent, concentration in g/L, percentage by mass, solubility and saturated solutions, dilution and molarity. Free chemistry game.',
      ca: 'Gots de precipitats dibuixats per practicar dissolucions: solut i dissolvent, concentració en g/L, percentatge en massa, solubilitat i dissolucions saturades, diluir i molaritat. Joc de química gratis.',
    }),
    path: '/juegos/prepara-disolucion',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="prepara-disolucion"
            badge={tr({ es: 'Química · Disoluciones', en: 'Chemistry · Solutions', ca: 'Química · Dissolucions' })}
            titulo={tr({ es: '💧 Prepara la Disolución', en: '💧 Make the Solution', ca: '💧 Prepara la Dissolució' })}
            sub={tr({ es: 'Gramos, mililitros y concentración: a ver qué vaso gana', en: 'Grams, millilitres and concentration: see which beaker wins', ca: 'Grams, mil·lilitres i concentració: a veure quin got guanya' })} />

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
              <p>{tr({ es: 'Una disolución es una mezcla homogénea: el soluto (lo que se disuelve, en menor cantidad) y el disolvente (en mayor cantidad). Salen vasos de precipitados con los gramos de soluto arriba y el volumen abajo; el color se vuelve más intenso cuanto más concentrada está, pero solo se ve al corregir.', en: 'A solution is a uniform mixture: the solute (what dissolves, in the smaller amount) and the solvent (in the larger amount). Beakers appear with the grams of solute on top and the volume below; the colour gets stronger the more concentrated it is, but you only see it when you answer.', ca: 'Una dissolució és una barreja homogènia: el solut (el que es dissol, en menys quantitat) i el dissolvent (en més quantitat). Surten gots de precipitats amb els grams de solut a dalt i el volum a baix; el color es fa més intens com més concentrada és, però només es veu en corregir.' })}</p>
              <p>{tr({ es: 'La concentración en g/L es gramos de soluto ÷ litros de disolución (¡pasa los mL a litros!). El % en masa se calcula sobre el total, soluto más disolvente. Y al diluir, el soluto no cambia: c₁ · V₁ = c₂ · V₂.', en: 'Concentration in g/L is grams of solute ÷ litres of solution (convert the mL to litres!). Percentage by mass is worked out on the total, solute plus solvent. And when you dilute, the solute does not change: c₁ · V₁ = c₂ · V₂.', ca: 'La concentració en g/L és grams de solut ÷ litres de dissolució (passa els mL a litres!). El % en massa es calcula sobre el total, solut més dissolvent. I en diluir, el solut no canvia: c₁ · V₁ = c₂ · V₂.' })}</p>
              <p>{tr({ es: 'Cuidado con las trampas: el vaso con más soluto no siempre es el más concentrado, y si echas más de lo que cabe según la solubilidad, el resto se queda en el fondo.', en: 'Watch out for the traps: the beaker with the most solute is not always the most concentrated, and if you add more than the solubility allows, the rest stays at the bottom.', ca: 'Compte amb els paranys: el got amb més solut no sempre és el més concentrat, i si hi tires més del que hi cap segons la solubilitat, la resta es queda al fons.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Bien concentrado!' : '¡Química de laboratorio! 💧',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Nicely concentrated!' : 'Lab-grade chemistry! 💧',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ben concentrat!' : 'Química de laboratori! 💧',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de disoluciones en Prepara la Disolución de Tuthor 💧 — ¿puedes superarme? https://tuthor.es/juegos/prepara-disolucion`,
      en: `I got ${aciertos} solution questions right in Make the Solution on Tuthor 💧 — can you beat me? https://tuthor.es/juegos/prepara-disolucion`,
      ca: `He encertat ${aciertos} de dissolucions a Prepara la Dissolució de Tuthor 💧 — em pots superar? https://tuthor.es/juegos/prepara-disolucion`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="prepara-disolucion" emoji="💧" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaDisolucion key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
