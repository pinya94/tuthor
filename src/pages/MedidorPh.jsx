import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, evaluar, categoria } from '../lib/medidorPh'
import TiraPh, { TuboPh } from '../components/TiraPh'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 3
const REVEAL_MS = 3400
const MEMORIA = 8
const PUNTOS = { exacto: 15, bien: 10, fallo: 0 }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: '¿Ácido, neutro o básico? Basta con la zona', en: 'Acidic, neutral or basic? The zone is enough', ca: 'Àcid, neutre o bàsic? N’hi ha prou amb la zona' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Acércate a su pH: margen de ±1,5', en: 'Get close to its pH: ±1.5 margin', ca: 'Acosta’t al seu pH: marge de ±1,5' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Tira sin colores y margen de ±1', en: 'Strip without colours and ±1 margin', ca: 'Tira sense colors i marge de ±1' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[medidor-ph] los niveles de la pantalla no coinciden con NIVELES')
}

const fmt = (v, l) => (l === 'en' ? v.toFixed(1) : v.toFixed(1).replace('.', ','))

export default function MedidorPh() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [puntos, setPuntos] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [exactos, setExactos] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [valor, setValor] = useState(null)
  const [phase, setPhase] = useState('choose')
  const [resultado, setResultado] = useState(null)

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistosRef = useRef([])
  const puntosRef = useRef(0)
  useEffect(() => { puntosRef.current = puntos }, [puntos])

  const zonaTxt = {
    acido: tr({ es: 'Ácido', en: 'Acidic', ca: 'Àcid' }),
    neutro: tr({ es: 'Neutro', en: 'Neutral', ca: 'Neutre' }),
    basico: tr({ es: 'Básico', en: 'Basic', ca: 'Bàsic' }),
    real: tr({ es: 'su pH', en: 'its pH', ca: 'el seu pH' }),
  }

  const next = useCallback(niv => {
    const r = genRonda(niv, { evitar: vistosRef.current })
    vistosRef.current = [r.sustancia.id, ...vistosRef.current].slice(0, MEMORIA)
    setRonda(r); setValor(null); setResultado(null); setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setPuntos(0); setAciertos(0); setExactos(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    vistosRef.current = []
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = puntosRef.current
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'medidor-ph', category: 'acidos-bases',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('medidor-ph', { score: pts }),
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

  function confirmar() {
    if (phase !== 'choose' || valor == null) return
    const res = evaluar(ronda.sustancia, valor, nivel)
    setResultado(res); setPhase('result')
    if (res !== 'fallo') {
      setPuntos(p => p + PUNTOS[res])
      setAciertos(a => a + 1)
      if (res === 'exacto') setExactos(e => e + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'Medidor de pH — Juego de ácidos y bases', en: 'pH Meter — Acids and bases game', ca: 'Mesurador de pH — Joc d’àcids i bases' }),
    desc: tr({
      es: 'Coloca limón, lejía, café, agua de mar o jabón en la escala de pH del 0 al 14 y mira el color del indicador universal. Tres niveles, 26 sustancias de casa con su pH real. Juego de química gratis.',
      en: 'Place lemon, bleach, coffee, seawater or soap on the pH scale from 0 to 14 and see the universal indicator colour. Three levels, 26 household substances with their real pH. Free chemistry game.',
      ca: 'Col·loca llimona, lleixiu, cafè, aigua de mar o sabó a l’escala de pH del 0 al 14 i mira el color de l’indicador universal. Tres nivells, 26 substàncies de casa amb el seu pH real. Joc de química gratis.',
    }),
    path: '/juegos/medidor-ph',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="medidor-ph"
            badge={tr({ es: 'Química · Ácidos y bases', en: 'Chemistry · Acids and bases', ca: 'Química · Àcids i bases' })}
            titulo={tr({ es: '🧪 Medidor de pH', en: '🧪 pH Meter', ca: '🧪 Mesurador de pH' })}
            sub={tr({ es: '¿Cuánto de ácido o de básico es lo que hay en casa?', en: 'How acidic or basic are the things at home?', ca: 'Com d’àcid o de bàsic és el que hi ha a casa?' })} />

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
              <p>{tr({ es: 'Sale algo que tienes en casa —zumo de limón, lejía, leche, agua de mar— y tienes que tocar o arrastrar la marca hasta su sitio en la escala de pH, del 0 al 14.', en: 'Something from home appears — lemon juice, bleach, milk, seawater — and you tap or drag the marker to its place on the pH scale, from 0 to 14.', ca: 'Surt una cosa que tens a casa —suc de llimona, lleixiu, llet, aigua de mar— i has de tocar o arrossegar la marca fins al seu lloc a l’escala de pH, del 0 al 14.' })}</p>
              <p>{tr({ es: 'Por debajo de 7 es ácido, el 7 es neutro y por encima es básico. Cuanto más lejos del 7, más fuerte. Los colores son los del indicador universal: rojo los ácidos fuertes, verde lo neutro, morado las bases fuertes.', en: 'Below 7 is acidic, 7 is neutral and above it is basic. The further from 7, the stronger. The colours are those of universal indicator: red for strong acids, green for neutral, purple for strong bases.', ca: 'Per sota de 7 és àcid, el 7 és neutre i per sobre és bàsic. Com més lluny del 7, més fort. Els colors són els de l’indicador universal: vermell els àcids forts, verd el neutre, morat les bases fortes.' })}</p>
              <p>{tr({ es: 'En fácil basta con acertar la zona. En medio hay que quedarse a 1,5 de su pH, y en difícil a 1 y con la tira gris: el color solo sale al corregir. Clavarlo (a medio punto) da más puntos.', en: 'On easy getting the zone is enough. On medium you must land within 1.5 of its pH, and on hard within 1 with a grey strip: the colour only shows when corrected. Nailing it (within half a point) scores more.', ca: 'En fàcil n’hi ha prou amb encertar la zona. En mitjà t’has de quedar a 1,5 del seu pH, i en difícil a 1 i amb la tira grisa: el color només surt en corregir. Clavar-ho (a mig punt) dona més punts.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {tr({ es: 'Exacto +15 · Cerca +10 · +3s por acierto · Fallo −5s', en: 'Exact +15 · Close +10 · +3s per hit · Miss −5s', ca: 'Exacte +15 · A prop +10 · +3s per encert · Error −5s' })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Bien medido!' : '¡Eres un indicador universal! 🧪',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Well measured!' : 'You are a universal indicator! 🧪',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ben mesurat!' : 'Ets un indicador universal! 🧪',
    })
    const shareText = tr({
      es: `He sacado ${puntos} puntos en Medidor de pH 🧪 — ¿puedes superarme? https://tuthor.es/juegos/medidor-ph`,
      en: `I scored ${puntos} points in pH Meter 🧪 — can you beat me? https://tuthor.es/juegos/medidor-ph`,
      ca: `He fet ${puntos} punts a Mesurador de pH 🧪 — em pots superar? https://tuthor.es/juegos/medidor-ph`,
    })
    const stats = [{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]
    if (nivel !== 'facil') stats.push({ label: tr({ es: 'exactos', en: 'exact', ca: 'exactes' }), value: exactos, emoji: '🎯' })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="medidor-ph" emoji="🧪" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={puntos} message={msg}
        stats={stats} shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null

  const cfg = NIVELES[nivel]
  const isResult = phase === 'result'
  const s = ronda.sustancia
  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / GAME_TIME)
  // El tubo toma el color de la marca solo si la tira tiene colores: en
  // difícil el color es justo la ayuda que el nivel quita.
  const phTubo = isResult ? s.ph : (cfg.colores ? valor : null)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{DIFS[nivel].emoji} {tr(DIFS[nivel].label)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {puntos} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}
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

      <div className="w-full max-w-[460px] rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4 mb-4 flex items-center gap-4">
        <TuboPh ph={phTubo} className="w-12 h-24 shrink-0" />
        <div className="min-w-0">
          <p className="text-white/45 text-xs uppercase tracking-widest mb-1">
            {nivel === 'facil'
              ? tr({ es: '¿Ácido, neutro o básico?', en: 'Acidic, neutral or basic?', ca: 'Àcid, neutre o bàsic?' })
              : tr({ es: '¿Qué pH tiene?', en: 'What is its pH?', ca: 'Quin pH té?' })}
          </p>
          <p className="text-white text-2xl font-black leading-tight">{tr(s.nombre)}</p>
          {valor != null && !isResult && nivel !== 'facil' && (
            <p className="text-[#EDAE49] font-black mt-1">pH {fmt(valor, l)}</p>
          )}
          {valor != null && !isResult && nivel === 'facil' && (
            <p className="text-[#EDAE49] font-black mt-1">{zonaTxt[categoria(valor)]}</p>
          )}
        </div>
      </div>

      <div className="w-full max-w-[460px] px-1 mb-4">
        <TiraPh valor={valor} onChange={setValor} real={isResult ? s.ph : null}
          colores={cfg.colores} zonas={nivel === 'facil'} textos={zonaTxt} bloqueada={isResult} />
      </div>

      {!isResult ? (
        <button onClick={confirmar} disabled={valor == null}
          className="w-full max-w-[460px] py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 disabled:bg-white/[0.06] disabled:text-white/40 transition">
          {valor == null
            ? tr({ es: 'Toca la tira para medir', en: 'Tap the strip to measure', ca: 'Toca la tira per mesurar' })
            : tr({ es: 'Medir', en: 'Measure', ca: 'Mesurar' })}
        </button>
      ) : (
        <div className="w-full max-w-[460px] px-1 space-y-2">
          <p className={`text-center font-black text-lg ${resultado === 'fallo' ? 'text-red-400' : 'text-green-400'}`}>
            {resultado === 'exacto' ? tr({ es: '¡Exacto!', en: 'Spot on!', ca: 'Exacte!' })
              : resultado === 'bien' ? tr({ es: '¡Bien!', en: 'Good!', ca: 'Bé!' })
              : tr({ es: 'Lejos', en: 'Too far', ca: 'Lluny' })}
            <span className="text-white/80"> · pH {fmt(s.ph, l)} ({zonaTxt[categoria(s.ph)].toLowerCase()})</span>
          </p>
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">💡 {tr(s.dato)}</p>
          </div>
          <p className="text-center text-xs font-bold">
            {resultado !== 'fallo'
              ? <span className="text-green-400">+{PUNTOS[resultado]} · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        </div>
      )}
    </div>
  )
}
