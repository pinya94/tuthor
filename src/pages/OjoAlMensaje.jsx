import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/ojoAlMensaje'
import PreguntaMensaje from '../components/ojoAlMensaje/PreguntaMensaje'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada mensaje se lee y se toca: más tiempo que un juego de opciones. Tras
// corregir no se pasa solo: hay trampas que se escaparon y una explicación
// que leer, así que el reloj se para hasta pulsar «Siguiente».
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 8
const TAP_TIME = 2 // tocar algo normal: si no costara, bastaría con tocarlo todo

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Timos y peligros claros, y se ve cuántas trampas hay', en: 'Clear scams and dangers, and you see how many traps there are', ca: 'Estafes i perills clars, i es veu quantes trampes hi ha' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'También mensajes de fiar, y ya no se dice cuántas trampas hay', en: 'Safe messages too, and the number of traps is hidden', ca: 'També missatges de fiar, i ja no es diu quantes trampes hi ha' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Direcciones casi iguales y mensajes que asustan pero son de fiar', en: 'Lookalike addresses and messages that look scary but are safe', ca: 'Adreces gairebé iguals i missatges que espanten però són de fiar' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[ojo-al-mensaje] los niveles de la pantalla no coinciden con NIVELES')
}

export default function OjoAlMensaje() {
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
        type: 'juego', game: 'ojo-al-mensaje', category: 'internet-seguro',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('ojo-al-mensaje', { score: pts }),
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
  }
  function tocado(esTrampa) {
    if (!esTrampa) setTimeLeft(t => Math.max(1, t - TAP_TIME))
  }

  const seo = {
    title: tr({ es: 'Ojo al Mensaje — Juego para detectar timos y peligros en internet', en: 'Check the Message — Game to spot online scams and dangers', ca: 'Ull al Missatge — Joc per detectar estafes i perills a internet' }),
    desc: tr({
      es: 'Llegan SMS, correos y mensajes: toca el remitente raro, el enlace falso, la prisa o el secreto, y decide si es de fiar, un timo o un peligro. Juego de internet seguro gratis.',
      en: 'Texts, emails and messages arrive: tap the odd sender, the fake link, the rush or the secret, and decide if it’s safe, a scam or a danger. Free online safety game.',
      ca: 'Arriben SMS, correus i missatges: toca el remitent estrany, l’enllaç fals, la pressa o el secret, i decideix si és de fiar, una estafa o un perill. Joc d’internet segur gratis.',
    }),
    path: '/juegos/ojo-al-mensaje',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="ojo-al-mensaje"
            badge={tr({ es: 'Vida práctica · Internet seguro', en: 'Life skills · Online safety', ca: 'Vida pràctica · Internet segur' })}
            titulo={tr({ es: '🎣 Ojo al Mensaje', en: '🎣 Check the Message', ca: '🎣 Ull al Missatge' })}
            sub={tr({ es: 'Encuentra la trampa antes de pulsar', en: 'Find the trap before you tap', ca: 'Troba la trampa abans de prémer' })} />

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
              <p>{tr({ es: 'Llega un mensaje: un SMS, un correo, un chat o una ventana que salta en una web. Toca dentro del mensaje lo que sea sospechoso: el remitente raro, el enlace que no es de la empresa, la prisa, que te pidan un código, un premio imposible, que alguien te pida guardar un secreto…', en: 'A message arrives: a text, an email, a chat or a pop-up on a website. Tap whatever is suspicious inside the message: the odd sender, the link that isn’t the company’s, the rush, being asked for a code, an impossible prize, someone asking you to keep a secret…', ca: 'Arriba un missatge: un SMS, un correu, un xat o una finestra que salta en una web. Toca dins del missatge el que sigui sospitós: el remitent estrany, l’enllaç que no és de l’empresa, la pressa, que et demanin un codi, un premi impossible, que algú et demani guardar un secret…' })}</p>
              <p>{tr({ es: 'Después decide: ✅ de fiar, 🎣 timo o 🙋 peligro (y entonces, pide ayuda). Cuenta como acierto si el veredicto es bueno y has encontrado todas las trampas. Ojo: tocar algo normal resta tiempo, y con dos la ronda no vale.', en: 'Then decide: ✅ safe, 🎣 scam or 🙋 danger (and then, get help). It counts if your verdict is right and you found every trap. Careful: tapping something normal costs time, and two of them spoil the round.', ca: 'Després decideix: ✅ de fiar, 🎣 estafa o 🙋 perill (i llavors, demana ajuda). Compta com a encert si el veredicte és bo i has trobat totes les trampes. Compte: tocar una cosa normal resta temps, i amb dues la ronda no val.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {tr({ es: `Acierto +10 y +${CORRECT_TIME}s · Fallo −${WRONG_TIME}s · Tocar algo normal −${TAP_TIME}s`, en: `Correct +10 and +${CORRECT_TIME}s · Wrong −${WRONG_TIME}s · Tapping something normal −${TAP_TIME}s`, ca: `Encert +10 i +${CORRECT_TIME}s · Error −${WRONG_TIME}s · Tocar una cosa normal −${TAP_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡No hay quien te la cuele!' : '¡Detective digital! 🎣',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'No one fools you!' : 'Digital detective! 🎣',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'No hi ha qui te la coli!' : 'Detectiu digital! 🎣',
    })
    const shareText = tr({
      es: `He destapado ${aciertos} mensajes trampa en Ojo al Mensaje de Tuthor 🎣 — ¿puedes superarme? https://tuthor.es/juegos/ojo-al-mensaje`,
      en: `I saw through ${aciertos} messages in Check the Message on Tuthor 🎣 — can you beat me? https://tuthor.es/juegos/ojo-al-mensaje`,
      ca: `He destapat ${aciertos} missatges trampa a Ull al Missatge de Tuthor 🎣 — em pots superar? https://tuthor.es/juegos/ojo-al-mensaje`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="ojo-al-mensaje" emoji="🎣" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaMensaje key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} onTocar={tocado} />
        {isResult && (
          <>
            <p className="text-center text-xs font-bold mt-2">
              {acierto
                ? <span className="text-green-400">+10 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
                : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
            </p>
            <button onClick={() => next(nivel)}
              className="w-full mt-3 py-3 rounded-2xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition-colors">
              {tr({ es: 'Siguiente ▶', en: 'Next ▶', ca: 'Següent ▶' })}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
