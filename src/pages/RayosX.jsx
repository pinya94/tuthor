import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRonda, esCorrecta, enunciado } from '../lib/rayosX'
import { SISTEMAS } from '../data/organos'
import CuerpoSVG, { ALTO } from '../components/rayosX/CuerpoSVG'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega, IconoIntro } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Rayos X (biología · cuerpo humano). Contra reloj, como el resto de juegos:
// se pide un órgano o un hueso y se toca en el cuerpo dibujado. Si es un
// hueso se ve el esqueleto; si no, los órganos (components/rayosX/CuerpoSVG).
// Acertar suma tiempo, fallar lo resta; el reloj se para mientras se lee la
// explicación de cada respuesta.
const GAME_TIME = 40
const CORRECT_TIME = 3
const WRONG_TIME = 5
const REVEAL_MS = 2600
const MEMORIA = 6

const NIVELES = {
  facil:   { label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Los órganos, huesos y músculos más conocidos, por su nombre', en: 'The best-known organs, bones and muscles, by name', ca: 'Els òrgans, ossos i músculs més coneguts, pel nom' } },
  medio:   { label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Todos: también radio, cúbito, peroné, riñones…', en: 'All of them: radius, ulna, fibula, kidneys too…', ca: 'Tots: també radi, cúbit, peroné, ronyons…' } },
  dificil: { label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Te dicen lo que hace, no cómo se llama', en: 'You get what it does, not its name', ca: 'Et diuen què fa, no com es diu' } },
}

export default function RayosX() {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('intro') // intro | playing | end
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [aciertos, setAciertos] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [elegido, setElegido] = useState(null)
  const [phase, setPhase] = useState('choose') // choose | result

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistosRef = useRef([])
  const aciertosRef = useRef(0)
  useEffect(() => { aciertosRef.current = aciertos }, [aciertos])

  const siguiente = useCallback(niv => {
    const r = genRonda(niv, { evitar: vistosRef.current })
    vistosRef.current = [r.parte.id, ...vistosRef.current].slice(0, MEMORIA)
    setRonda(r)
    setElegido(null)
    setPhase('choose')
  }, [])

  function empezar(niv) {
    setNivel(niv)
    setAciertos(0); setRacha(0); setMejorRacha(0)
    setTimeLeft(GAME_TIME)
    vistosRef.current = []
    setScreen('playing')
    siguiente(niv)
  }

  function terminar() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'rayos-x', category: 'cuerpo-humano',
        score: pts, passed: aciertosRef.current >= 5, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('rayos-x', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  // Reloj: parado mientras se enseña la respuesta
  useEffect(() => {
    if (screen !== 'playing' || phase === 'result') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); terminar(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(nextRef.current), [])

  function tocar(id) {
    if (phase !== 'choose' || !ronda) return
    setElegido(id)
    setPhase('result')
    if (esCorrecta(ronda, id)) {
      const nueva = racha + 1
      setAciertos(a => a + 1)
      setRacha(nueva)
      setMejorRacha(m => Math.max(m, nueva))
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setRacha(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => siguiente(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'Rayos X — Órganos, huesos y músculos del cuerpo humano', en: 'X-Ray — Organs, bones and muscles of the human body', ca: 'Raigs X — Òrgans, ossos i músculs del cos humà' }),
    desc: tr({
      es: 'Toca cada órgano o hueso en un cuerpo dibujado: corazón, pulmones, riñones, fémur, radio, cúbito… Contra reloj y con tres niveles. Juego de biología gratis.',
      en: 'Tap each organ or bone on a drawn body: heart, lungs, kidneys, femur, radius, ulna… Against the clock, three levels. Free biology game.',
      ca: 'Toca cada òrgan o os en un cos dibuixat: cor, pulmons, ronyons, fèmur, radi, cúbit… Contra rellotge i amb tres nivells. Joc de biologia gratis.',
    }),
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seo.title} description={seo.desc} path="/juegos/rayos-x" />
        <div className="max-w-md w-full">
          <CabeceraJuego slug="rayos-x"
            badge={tr({ es: 'Biología · Cuerpo humano', en: 'Biology · Human body', ca: 'Biologia · Cos humà' })}
            titulo={tr({ es: 'Rayos X', en: 'X-Ray', ca: 'Raigs X' })}
            sub={tr({ es: 'Toca el órgano o el hueso que se te pide.', en: 'Tap the organ or bone you are asked for.', ca: "Toca l'òrgan o l'os que se't demana." })} />

          <div className="flex justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-3 mx-auto w-fit">
            {Object.entries(NIVELES).map(([id, n], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(n.label)}
              </button>
            ))}
          </div>
          <p className="text-white/45 text-xs text-center mb-5">{tr(NIVELES[nivel].desc)}</p>

          <button onClick={() => empezar(nivel)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 mb-3">
            {tr({ es: '¡Empezar diagnóstico!', en: 'Start diagnosis!', ca: 'Comença el diagnòstic!' })}
          </button>
          <ComoSeJuega>
            <div className="bg-[#141b2e] border border-white/[0.08] rounded-2xl p-4 space-y-2.5 text-sm text-white/60">
              {[
                ['👆', tr({ es: 'Te piden un órgano o un hueso: tócalo en el cuerpo.', en: 'You are asked for an organ or a bone: tap it on the body.', ca: "Et demanen un òrgan o un os: toca'l al cos." })],
                ['🦴', tr({ es: 'Si es un hueso, verás el esqueleto; si es un órgano, verás los órganos.', en: 'If it is a bone you will see the skeleton; if it is an organ, the organs.', ca: "Si és un os, veuràs l'esquelet; si és un òrgan, veuràs els òrgans." })],
                ['⏱️', tr({ es: `${GAME_TIME} segundos. Acierto +${CORRECT_TIME} s, fallo −${WRONG_TIME} s.`, en: `${GAME_TIME} seconds. Right +${CORRECT_TIME}s, wrong −${WRONG_TIME}s.`, ca: `${GAME_TIME} segons. Encert +${CORRECT_TIME} s, error −${WRONG_TIME} s.` })],
              ].map(([e, t]) => (
                <div key={e} className="flex items-start gap-3"><IconoIntro emoji={e} /><span>{t}</span></div>
              ))}
            </div>
          </ComoSeJuega>
          <Link to={localPath('/examen/rayos-x-test')} className="block text-center mt-3 text-white/30 hover:text-white/60 text-sm transition-colors">
            {tr({ es: 'Examen con la mecánica del juego →', en: 'Exam using the game mechanic →', ca: 'Examen amb la mecànica del joc →' })}
          </Link>
        </div>
      </div>
    )
  }

  // ── FIN ────────────────────────────────────────────────────────────────────
  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = aciertos === 0 ? tr({ es: '¡Sigue practicando!', en: 'Keep practising!', ca: 'Segueix practicant!' })
      : aciertos < 5 ? tr({ es: 'Buen comienzo', en: 'Good start', ca: 'Bon començament' })
      : aciertos < 12 ? tr({ es: '¡Bien hecho!', en: 'Well done!', ca: 'Ben fet!' })
      : tr({ es: '¡Ojo clínico!', en: 'A true diagnostician!', ca: 'Ull clínic!' })
    return (
      <GameEndScreen game="rayos-x" emoji="🧠" title={tr({ es: 'Diagnóstico terminado', en: 'Diagnosis over', ca: 'Diagnòstic acabat' })}
        score={pts} message={msg}
        stats={[
          { label: tr({ es: 'Aciertos', en: 'Correct', ca: 'Encerts' }), value: aciertos, emoji: '✅' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: `×${mejorRacha}`, emoji: '🔥' },
        ]}
        shareText={tr({
          es: `He acertado ${aciertos} partes del cuerpo en Rayos X — ¿puedes superarme? https://tuthor.es/juegos/rayos-x`,
          en: `I got ${aciertos} body parts right in X-Ray — can you beat me? https://tuthor.es/juegos/rayos-x`,
          ca: `He encertat ${aciertos} parts del cos a Raigs X — em pots superar? https://tuthor.es/juegos/rayos-x`,
        })}
        onPlayAgain={() => empezar(nivel)}
        playAgainLabel={tr({ es: 'Nuevo diagnóstico', en: 'New diagnosis', ca: 'Nou diagnòstic' })}
        secondaryActions={[{ label: tr({ es: 'Cambiar de nivel', en: 'Change level', ca: 'Canviar de nivell' }), onClick: () => setScreen('intro') }]}
        user={user} lang={lang} />
    )
  }

  if (!ronda) return null

  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / GAME_TIME)
  const isResult = phase === 'result'
  const acerto = isResult && esCorrecta(ronda, elegido)
  const { parte } = ronda
  const sistema = SISTEMAS[parte.sistema]

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 pt-4 pb-6">
      <SEOHead title={seo.title} description={seo.desc} path="/juegos/rayos-x" />

      <div className="w-full max-w-[460px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {ronda.capa === 'huesos' ? tr({ es: 'Esqueleto', en: 'Skeleton', ca: 'Esquelet' })
              : ronda.capa === 'musculos' ? tr({ es: 'Músculos · de frente', en: 'Muscles · front', ca: 'Músculs · de cara' })
              : ronda.capa === 'espalda' ? tr({ es: 'Músculos · de espalda', en: 'Muscles · back', ca: 'Músculs · d’esquena' })
              : tr({ es: 'Órganos', en: 'Organs', ca: 'Òrgans' })}
          </p>
          <p className="text-white font-bold text-lg flex items-center gap-2 tabular-nums">
            {aciertos} {aciertos === 1 ? tr({ es: 'acierto', en: 'correct', ca: 'encert' }) : tr({ es: 'aciertos', en: 'correct', ca: 'encerts' })}
            {racha >= 2 && <span className="flex items-center gap-0.5 text-orange-400 text-sm font-black"><Racha className="w-4 h-4" />{racha}</span>}
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

      <p className="text-white/50 text-xs uppercase tracking-widest">
        {ronda.preguntaPor === 'funcion' ? tr({ es: 'Toca el que…', en: 'Tap the one that…', ca: 'Toca el que…' }) : tr({ es: 'Toca', en: 'Tap', ca: 'Toca' })}
      </p>
      <p className="text-white text-xl font-black text-center px-2 leading-snug mb-3">{enunciado(ronda, l)}</p>

      {/* El ancho sale del alto libre (el cuerpo es alto y estrecho): así
          cabe entero con la explicación debajo sin tener que bajar. */}
      <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08]"
        style={{ maxWidth: `min(${ronda.capa === 'organos' ? 380 : 320}px, calc((100dvh - 20rem) * ${200 / ALTO[ronda.capa]}))` }}>
        <CuerpoSVG capa={ronda.capa} onPick={isResult ? null : tocar}
          elegido={elegido} correcto={isResult ? parte.id : null} revelado={isResult} />
      </div>

      {isResult && (
        <div className="w-full max-w-[460px] mt-3 space-y-1.5 px-1">
          <p className={`text-center font-black ${acerto ? 'text-green-400' : 'text-red-400'}`}>
            {acerto ? '✓' : '✗'} {tr({ es: 'Era', en: 'It was', ca: 'Era' })}: {parte.nombre[l] ?? parte.nombre.es}
            {sistema && <span className="text-white/40 font-semibold text-xs"> · {sistema[l] ?? sistema.es}</span>}
          </p>
          <div className="rounded-xl px-3 py-2 bg-[#141b2e] border border-white/[0.08]">
            <p className="text-white/70 text-sm">{ronda.preguntaPor === 'funcion' ? (parte.dato[l] ?? parte.dato.es) : (parte.funcion[l] ?? parte.funcion.es)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
