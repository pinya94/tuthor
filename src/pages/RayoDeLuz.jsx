import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevoTablero, resuelto } from '../lib/rayoLuz'
import TableroLuz from '../components/rayoLuz/TableroLuz'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, IconoIntro, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Rayo de Luz (física · ondas y luz). Gira los espejos hasta que el láser
// llegue al sensor. Partida contra reloj: cada tablero resuelto suma tiempo y
// puntos, y resolverlo con el MÍNIMO de toques da un extra — así compensa
// pensar por dónde irá el rayo en vez de girar espejos al azar. Al resolver
// se dibujan los ángulos iguales en cada rebote (ley de la reflexión).
const GAME_TIME = 60
const TIEMPO_ACIERTO = 6
const TIEMPO_SALTO = 5
const PAUSA_RESUELTO = 1500

const NIVELES = {
  facil:   { puntos: 10, label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Dos espejos que girar', en: 'Two mirrors to turn', ca: 'Dos miralls per girar' } },
  medio:   { puntos: 15, label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Tres espejos, paredes y espejos que sobran', en: 'Three mirrors, walls and spare mirrors', ca: 'Tres miralls, parets i miralls que sobren' } },
  dificil: { puntos: 20, label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Cuatro o cinco rebotes y más obstáculos', en: 'Four or five bounces and more obstacles', ca: 'Quatre o cinc rebots i més obstacles' } },
}
const BONUS_PERFECTO = 5

export default function RayoDeLuz() {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [screen, setScreen] = useState('intro') // intro | playing | end
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [resueltos, setResueltos] = useState(0)
  const [perfectos, setPerfectos] = useState(0)
  const [racha, setRacha] = useState(0)
  const [ronda, setRonda] = useState(null)   // { tablero, minimo }
  const [orient, setOrient] = useState({})
  const [toques, setToques] = useState(0)
  const [fase, setFase] = useState('jugando') // jugando | resuelto
  const [ultimo, setUltimo] = useState(null)

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const siguiente = useCallback(niv => {
    const r = nuevoTablero(niv)
    setRonda({ tablero: r.tablero, minimo: r.minimo })
    setOrient(r.orient)
    setToques(0)
    setFase('jugando')
  }, [])

  function empezar(niv) {
    setNivel(niv)
    setScore(0); setResueltos(0); setPerfectos(0); setRacha(0); setUltimo(null)
    setTimeLeft(GAME_TIME)
    setScreen('playing')
    siguiente(niv)
  }

  // Reloj: parado mientras se enseña el tablero resuelto
  useEffect(() => {
    if (screen !== 'playing' || fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setScreen('end'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, fase])

  useEffect(() => () => { clearInterval(timerRef.current); clearTimeout(nextRef.current) }, [])

  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    saveActivity(user.uid, {
      type: 'juego', game: 'rayo-de-luz', category: 'fisica',
      score: scoreRef.current, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('rayo-de-luz', { score: scoreRef.current }),
      timeSpent: GAME_TIME,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function girar(id) {
    if (fase !== 'jugando' || !ronda) return
    const nuevo = { ...orient, [id]: orient[id] === '/' ? '\\' : '/' }
    const t = toques + 1
    setOrient(nuevo)
    setToques(t)
    if (resuelto(ronda.tablero, nuevo)) {
      const perfecto = t <= ronda.minimo
      const nr = racha + 1
      const gana = NIVELES[nivel].puntos + (perfecto ? BONUS_PERFECTO : 0)
      setScore(s => s + gana)
      setResueltos(n => n + 1)
      if (perfecto) setPerfectos(n => n + 1)
      setRacha(nr)
      setTimeLeft(x => x + TIEMPO_ACIERTO)
      setUltimo({ gana, perfecto, toques: t, minimo: ronda.minimo })
      setFase('resuelto')
      nextRef.current = setTimeout(() => siguiente(nivel), PAUSA_RESUELTO)
    }
  }

  function saltar() {
    if (fase !== 'jugando') return
    setRacha(0)
    setTimeLeft(x => Math.max(1, x - TIEMPO_SALTO))
    siguiente(nivel)
  }

  const seo = {
    title: tr({ es: 'Rayo de Luz — Juego de la reflexión con espejos', en: 'Light Beam — Mirror reflection game', ca: 'Raig de Llum — Joc de la reflexió amb miralls' }),
    desc: tr({
      es: 'Gira los espejos y lleva el láser hasta el sensor. Aprende la ley de la reflexión jugando: el rayo sale del espejo con el mismo ángulo con el que llega. Juego de física gratis.',
      en: 'Turn the mirrors and guide the laser to the sensor. Learn the law of reflection by playing: the beam leaves the mirror at the same angle it arrives. Free physics game.',
      ca: 'Gira els miralls i porta el làser fins al sensor. Aprèn la llei de la reflexió jugant: el raig surt del mirall amb el mateix angle amb què arriba. Joc de física gratis.',
    }),
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seo.title} description={seo.desc} path="/juegos/rayo-de-luz" />
        <div className="max-w-md w-full">
          <CabeceraJuego slug="rayo-de-luz"
            badge={tr({ es: 'Física · Ondas y luz', en: 'Physics · Waves and light', ca: 'Física · Ones i llum' })}
            titulo={tr({ es: 'Rayo de Luz', en: 'Light Beam', ca: 'Raig de Llum' })}
            sub={tr({ es: 'Gira los espejos y lleva el láser al sensor.', en: 'Turn the mirrors and guide the laser to the sensor.', ca: 'Gira els miralls i porta el làser al sensor.' })} />

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
            {tr({ es: 'Encender el láser', en: 'Switch on the laser', ca: 'Encendre el làser' })}
          </button>
          <ComoSeJuega>
            <div className="bg-[#141b2e] border border-white/[0.08] rounded-2xl p-4 space-y-2.5 text-sm text-white/60">
              {[
                ['👆', tr({ es: 'Toca un espejo para girarlo. Solo tiene dos posiciones: / y \\.', en: 'Tap a mirror to turn it. It only has two positions: / and \\.', ca: 'Toca un mirall per girar-lo. Només té dues posicions: / i \\.' })],
                ['🎯', tr({ es: 'El rayo rebota con el mismo ángulo con el que llega: en un espejo inclinado 45°, gira 90°. Llévalo hasta el sensor.', en: 'The beam bounces off at the same angle it arrives: on a 45° mirror, it turns 90°. Guide it to the sensor.', ca: 'El raig rebota amb el mateix angle amb què arriba: en un mirall inclinat 45°, gira 90°. Porta\'l fins al sensor.' })],
                ['⭐', tr({ es: `Si lo consigues con los mínimos toques, +${BONUS_PERFECTO} puntos extra. Piensa antes de girar.`, en: `Solve it with the fewest taps for +${BONUS_PERFECTO} bonus points. Think before you turn.`, ca: `Si ho aconsegueixes amb els mínims tocs, +${BONUS_PERFECTO} punts extra. Pensa abans de girar.` })],
                ['⏱️', tr({ es: `${GAME_TIME} segundos. Cada tablero resuelto suma ${TIEMPO_ACIERTO}; saltarlo resta ${TIEMPO_SALTO}.`, en: `${GAME_TIME} seconds. Each solved board adds ${TIEMPO_ACIERTO}; skipping costs ${TIEMPO_SALTO}.`, ca: `${GAME_TIME} segons. Cada tauler resolt suma ${TIEMPO_ACIERTO}; saltar-lo en resta ${TIEMPO_SALTO}.` })],
              ].map(([e, t]) => (
                <div key={e} className="flex items-start gap-3"><IconoIntro emoji={e} /><span>{t}</span></div>
              ))}
            </div>
          </ComoSeJuega>
          <Link to={localPath('/examen/rayo-de-luz-test')} className="block text-center mt-3 text-white/30 hover:text-white/60 text-sm transition-colors">
            {tr({ es: 'Examen con la mecánica del juego →', en: 'Exam using the game mechanic →', ca: 'Examen amb la mecànica del joc →' })}
          </Link>
        </div>
      </div>
    )
  }

  // ── FIN ────────────────────────────────────────────────────────────────────
  if (screen === 'end') {
    const msg = resueltos === 0
      ? tr({ es: '¡Sigue practicando!', en: 'Keep practising!', ca: 'Segueix practicant!' })
      : resueltos < 4 ? tr({ es: 'Buen comienzo', en: 'Good start', ca: 'Bon començament' })
      : resueltos < 8 ? tr({ es: '¡Bien hecho!', en: 'Well done!', ca: 'Ben fet!' })
      : tr({ es: '¡Maestro de la luz!', en: 'Master of light!', ca: 'Mestre de la llum!' })
    return (
      <GameEndScreen game="rayo-de-luz" emoji="🔦" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })}
        score={score} message={msg}
        stats={[
          { label: tr({ es: 'Tableros', en: 'Boards', ca: 'Taulers' }), value: resueltos, emoji: '✅' },
          { label: tr({ es: 'A la primera', en: 'Fewest taps', ca: 'A la primera' }), value: perfectos, emoji: '⭐' },
        ]}
        shareText={tr({
          es: `He llevado el láser al sensor en ${resueltos} tableros de Rayo de Luz — ¿puedes superarme? https://tuthor.es/juegos/rayo-de-luz`,
          en: `I guided the laser to the sensor on ${resueltos} boards in Light Beam — can you beat me? https://tuthor.es/juegos/rayo-de-luz`,
          ca: `He portat el làser al sensor en ${resueltos} taulers de Raig de Llum — em pots superar? https://tuthor.es/juegos/rayo-de-luz`,
        })}
        onPlayAgain={() => empezar(nivel)}
        playAgainLabel={tr({ es: 'Otra partida', en: 'Play again', ca: 'Una altra partida' })}
        secondaryActions={[{ label: tr({ es: 'Cambiar de nivel', en: 'Change level', ca: 'Canviar de nivell' }), onClick: () => setScreen('intro') }]}
        user={user} lang={lang} />
    )
  }

  if (!ronda) return null

  const timerPct = Math.min(1, timeLeft / GAME_TIME)
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const esResuelto = fase === 'resuelto'

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 pt-4 pb-6">
      <SEOHead title={seo.title} description={seo.desc} path="/juegos/rayo-de-luz" />

      <div className="w-full max-w-[460px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{tr(NIVELES[nivel].label)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2 tabular-nums">
            {score} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}
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

      <p className="text-white font-bold text-base text-center">
        {esResuelto
          ? tr({ es: '¡Luz en el sensor!', en: 'Light on the sensor!', ca: 'Llum al sensor!' })
          : tr({ es: 'Lleva el láser hasta el sensor', en: 'Guide the laser to the sensor', ca: 'Porta el làser fins al sensor' })}
      </p>
      <p className="text-white/45 text-xs text-center mb-2 h-4">
        {esResuelto && ultimo
          ? (ultimo.perfecto
            ? tr({ es: `+${ultimo.gana} · con los mínimos toques`, en: `+${ultimo.gana} · fewest taps`, ca: `+${ultimo.gana} · amb els mínims tocs` })
            : tr({ es: `+${ultimo.gana} · ${ultimo.toques} toques (se podía en ${ultimo.minimo})`, en: `+${ultimo.gana} · ${ultimo.toques} taps (could be ${ultimo.minimo})`, ca: `+${ultimo.gana} · ${ultimo.toques} tocs (es podia en ${ultimo.minimo})` }))
          : tr({ es: 'Toca un espejo para girarlo', en: 'Tap a mirror to turn it', ca: 'Toca un mirall per girar-lo' })}
      </p>

      <div className={`w-full rounded-2xl border bg-[#0b1226] overflow-hidden transition-colors ${esResuelto ? 'border-green-400/60' : 'border-white/[0.08]'}`}
        style={{ maxWidth: 'min(460px, calc((100dvh - 16rem) * 0.84))' }}>
        <TableroLuz tablero={ronda.tablero} orient={orient} onGirar={esResuelto ? null : girar} mostrarAngulos={esResuelto} />
      </div>

      <div className="w-full max-w-[460px] flex items-center justify-between mt-3 px-1">
        <span className="text-white/40 text-sm tabular-nums">
          {tr({ es: 'Toques', en: 'Taps', ca: 'Tocs' })}: <b className="text-white/80">{toques}</b>
          <span className="mx-2 text-white/20">·</span>
          {tr({ es: 'Resueltos', en: 'Solved', ca: 'Resolts' })}: <b className="text-white/80">{resueltos}</b>
        </span>
        <button onClick={saltar} disabled={esResuelto}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-bold hover:bg-white/10 disabled:opacity-30 transition">
          {tr({ es: `Saltar (−${TIEMPO_SALTO}s)`, en: `Skip (−${TIEMPO_SALTO}s)`, ca: `Saltar (−${TIEMPO_SALTO}s)` })}
        </button>
      </div>
    </div>
  )
}
