import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PORTADAS } from '../data/portadas'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import GameEndScreen from '../components/GameEndScreen'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import SEOHead from '../components/SEOHead'

const DIFS = {
  facil:   { label: 'Fácil', labelEn: 'Easy', labelCa: 'Fàcil',     emoji: '🟢', tiempoInicio: 60, suma: 10, resta: 10, basePts: 100 },
  medio:   { label: 'Medio', labelEn: 'Medium', labelCa: 'Mitjà',   emoji: '🟡', tiempoInicio: 30, suma:  5, resta: 10, basePts: 150 },
  dificil: { label: 'Difícil', labelEn: 'Hard', labelCa: 'Difícil', emoji: '🔴', tiempoInicio: 20, suma:  3, resta: 15, basePts: 200 },
}

const PUI = {
  es: {
    titulo: 'Portadas', desc: 'Lee el titular histórico y decide: ¿verdad o mentira?',
    volver: '← Volver', empezar: '¡Empezar! →',
    reglas: 'Reglas', puntos: 'Puntos', comoFunciona: 'Cómo funciona',
    tiempoInicial: 'Tiempo inicial', alAcertar: 'Al acertar', alFallar: 'Al fallar', portadas: 'Portadas',
    titulares: 'titulares históricos', base: 'Base por acierto', racha2: 'Racha ×2', racha3: 'Racha ×3+',
    paso1: 'Aparece la portada de un periódico histórico real', paso2: 'Decide si el titular es VERDAD o MENTIRA',
    paso3: 'Si aciertas ganas tiempo; si fallas lo pierdes', paso4: 'Siempre verás la explicación: así aprendes de verdad',
    verdad: '✓ VERDAD', mentira: '✗ MENTIRA',
    correcto: '¡Correcto!', incorrecto: '¡Incorrecto!', tiempoAgotado: '¡tiempo agotado!',
    titularEra: 'El titular era…', salir: '← Salir', tiempo: 'Tiempo',
    verResultado: 'Ver resultado →', continuar: 'Continuar →',
    tiempoAgotadoFin: '¡Tiempo agotado!', puntuacionFinal: 'Puntuación final', aciertos: 'Aciertos', precision: 'Precisión',
    compartir: '🔗 Compartir resultado', reintentar: 'Intentarlo de nuevo', cambiarDif: 'Cambiar dificultad',
  },
  en: {
    titulo: 'Headlines', desc: 'Read the historical headline and decide: true or false?',
    volver: '← Back', empezar: 'Start! →',
    reglas: 'Rules', puntos: 'Points', comoFunciona: 'How it works',
    tiempoInicial: 'Starting time', alAcertar: 'On correct', alFallar: 'On wrong', portadas: 'Headlines',
    titulares: 'historical headlines', base: 'Base per correct', racha2: 'Streak ×2', racha3: 'Streak ×3+',
    paso1: 'A real historical newspaper front page appears', paso2: 'Decide if the headline is TRUE or FALSE',
    paso3: 'Correct = gain time; wrong = lose time', paso4: "You'll always see the explanation: that's how you truly learn",
    verdad: '✓ TRUE', mentira: '✗ FALSE',
    correcto: 'Correct!', incorrecto: 'Wrong!', tiempoAgotado: 'time is up!',
    titularEra: 'The headline was…', salir: '← Exit', tiempo: 'Time',
    verResultado: 'See result →', continuar: 'Continue →',
    tiempoAgotadoFin: 'Time is up!', puntuacionFinal: 'Final score', aciertos: 'Correct', precision: 'Accuracy',
    compartir: '🔗 Share result', reintentar: 'Try again', cambiarDif: 'Change difficulty',
  },
  ca: {
    titulo: 'Portades', desc: 'Llegeix el titular històric i decideix: veritat o mentida?',
    volver: '← Tornar', empezar: 'Comença! →',
    reglas: 'Regles', puntos: 'Punts', comoFunciona: 'Com funciona',
    tiempoInicial: 'Temps inicial', alAcertar: 'En encertar', alFallar: 'En fallar', portadas: 'Portades',
    titulares: 'titulars històrics', base: 'Base per encert', racha2: 'Ratxa ×2', racha3: 'Ratxa ×3+',
    paso1: 'Apareix la portada d\'un diari històric real', paso2: 'Decideix si el titular és VERITAT o MENTIDA',
    paso3: 'Si encertes guanyes temps; si falles el perds', paso4: 'Sempre veuràs l\'explicació: així aprens de veritat',
    verdad: '✓ VERITAT', mentira: '✗ MENTIDA',
    correcto: 'Correcte!', incorrecto: 'Incorrecte!', tiempoAgotado: 'temps esgotat!',
    titularEra: 'El titular era…', salir: '← Sortir', tiempo: 'Temps',
    verResultado: 'Veure resultat →', continuar: 'Continuar →',
    tiempoAgotadoFin: 'Temps esgotat!', puntuacionFinal: 'Puntuació final', aciertos: 'Encerts', precision: 'Precisió',
    compartir: '🔗 Compartir resultat', reintentar: 'Tornar-ho a provar', cambiarDif: 'Canviar dificultat',
  },
}

const CAT_STYLE = {
  política:   'bg-blue-500/20 text-blue-300 border-blue-500/30',
  ciencia:    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  guerra:     'bg-red-500/20 text-red-300 border-red-500/30',
  cultura:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
  deportes:   'bg-orange-500/20 text-orange-300 border-orange-500/30',
  catástrofe: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  espacio:    'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function PortadaCard({ p, lang, lt }) {
  const catStyle = CAT_STYLE[p.categoria] || 'bg-white/10 text-white/50 border-white/10'
  const titular = lt(p, 'titular')
  const subtitular = lt(p, 'subtitular')
  return (
    <div
      className="bg-[#f5f0e3] rounded-2xl overflow-hidden shadow-2xl border border-[#c8b89a]"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      <div className="h-3 md:h-4 bg-gray-900" />

      <div className="px-5 md:px-10 pt-4 md:pt-6 pb-3 md:pb-5 border-b-2 border-gray-800 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1">
          {p.lugar} · {p.mes}
        </p>
        <h1 className="text-2xl md:text-5xl font-black uppercase tracking-wide text-gray-900 leading-tight">
          {p.periodico}
        </h1>
        <div className="flex items-center justify-between mt-2 md:mt-3">
          <span className="text-[9px] md:text-xs text-gray-400">{lang === 'ca' ? 'Edició especial' : lang === 'en' ? 'Special edition' : 'Edición especial'}</span>
          <span className={`text-[9px] md:text-xs font-bold uppercase px-2 py-0.5 rounded border ${catStyle}`}>
            {p.categoria}
          </span>
          <span className="text-[9px] md:text-xs text-gray-400">{lang === 'ca' ? 'Preu: 10 cts.' : lang === 'en' ? 'Price: 10 cts.' : 'Precio: 10 ctos.'}</span>
        </div>
      </div>

      <div className="mx-5 md:mx-10 border-t-2 border-b border-gray-700" style={{ marginTop: '3px', paddingTop: '1px' }} />

      <div className="px-5 md:px-10 py-4 md:py-7">
        <h2 className="text-lg md:text-3xl font-black leading-snug text-gray-900 mb-3 md:mb-5">
          {titular}
        </h2>
        <div className="border-t border-b border-gray-300 py-2.5 md:py-4">
          <p className="text-xs md:text-base leading-relaxed text-gray-600">
            {subtitular}
          </p>
        </div>
      </div>

      <div className="h-1.5 md:h-2 bg-gray-900 mx-5 md:mx-10 mb-4 md:mb-6 rounded-sm" />
    </div>
  )
}

export default function Portadas() {
  const navigate = useNavigate()
  const { lang, localPath, lt } = useLang()
  const { user } = useAuth()
  const pu = PUI[lang] || PUI.es
  const dl = d => lang === 'ca' ? (d.labelCa || d.label) : lang === 'en' ? (d.labelEn || d.label) : d.label
  const [fase, setFase]         = useState('intro')
  const [difId, setDifId]       = useState('medio')
  const [portadas, setPortadas] = useState([])
  const [idx, setIdx]           = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [puntos, setPuntos]     = useState(0)
  const [racha, setRacha]       = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [total, setTotal]       = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [levelKey, setLevelKey] = useState(0)
  const [saved, setSaved]       = useState(false)

  const timerRef    = useRef(null)
  const tiempoRef   = useRef(null)
  const startRef    = useRef(null)
  const puntosRef   = useRef(0)

  const dif     = DIFS[difId]
  const portada = portadas[idx]

  function iniciar(selectedDif) {
    const d = DIFS[selectedDif]
    setDifId(selectedDif)
    setPortadas(shuffle(PORTADAS))
    setIdx(0)
    setTimeLeft(d.tiempoInicio)
    setPuntos(0)
    puntosRef.current = 0
    setRacha(0)
    setAciertos(0)
    setTotal(0)
    setFeedback(null)
    setSaved(false)
    setFase('jugando')
    setLevelKey(k => k + 1)
    startRef.current = Date.now()
  }

  useEffect(() => {
    if (fase !== 'fin' || puntos <= 0 || saved || !user) return
    setSaved(true)
    const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
    const pct = total > 0 ? Math.round((aciertos / total) * 100) : 0
    saveActivity(user.uid, {
      type: 'juego', game: 'portadas', category: difId,
      score: puntos, passed: pct >= 50, timeSpent,
      coinsEarned: computeCoins('portadas', { score: puntos }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  useEffect(() => {
    if (fase !== 'jugando') return
    tiempoRef.current = timeLeft

    timerRef.current = setInterval(() => {
      tiempoRef.current -= 1
      setTimeLeft(tiempoRef.current)
      if (tiempoRef.current <= 0) {
        clearInterval(timerRef.current)
        setFase('fin')
      }
    }, 1000)

    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelKey])

  function handleRespuesta(respuesta) {
    clearInterval(timerRef.current)
    const correcto  = respuesta === portada.veracidad
    const delta     = correcto ? dif.suma : -dif.resta
    const nuevaRacha = correcto ? racha + 1 : 0
    const ptsSumados = correcto ? Math.round(dif.basePts * (1 + racha * 0.25)) : 0

    if (correcto) {
      setAciertos(a => a + 1)
      setPuntos(p => { puntosRef.current = p + ptsSumados; return p + ptsSumados })
    }
    setRacha(nuevaRacha)
    setTotal(t => t + 1)
    setFeedback({ correcto, delta, portada, ptsSumados, rachaAntes: racha, nuevaRacha })
    setFase('feedback')
  }

  function continuar() {
    const newTime = timeLeft + feedback.delta
    const nextIdx = idx + 1
    if (newTime <= 0 || nextIdx >= portadas.length) {
      setFase('fin')
      return
    }
    setTimeLeft(newTime)
    setIdx(nextIdx)
    setFeedback(null)
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={lang==='en'?'Headlines — True or False Historical Headlines':lang==='ca'?'Portades — Titulars Històrics Veritat o Mentida':'Portadas — Titulares Históricos Verdad o Mentira'} description={lang==='en'?'Read real historical newspaper headlines and decide if they are true or false. Critical thinking meets history in this free game.':lang==='ca'?'Llegeix portades de diaris històrics reals i decideix si el titular és veritat o mentida. Pensament crític i història.':'Lee portadas de periódicos históricos reales y decide si el titular es verdad o mentira. Pensamiento crítico e historia.'} path={lang==='en'?'/en/juegos/portadas':lang==='ca'?'/ca/juegos/portadas':'/juegos/portadas'} lang={lang} />
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {pu.volver}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">📰</span>
            <h1 className="text-4xl font-black text-white mb-2">{pu.titulo}</h1>
            <p className="text-white/40">{pu.desc}</p>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-6 w-fit mx-auto">
            {Object.entries(DIFS).map(([id, d]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {d.emoji} {dl(d)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{pu.reglas}</p>
              {[
                ['⏱️', pu.tiempoInicial, `${d.tiempoInicio}s`],
                ['✅', pu.alAcertar,     `+${d.suma}s`],
                ['❌', pu.alFallar,      `−${d.resta}s`],
              ].map(([e, k, v]) => (
                <div key={k} className="flex items-start justify-between gap-2">
                  <span className="text-white/40 shrink-0">{e} {k}</span>
                  <span className="text-white font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{pu.puntos}</p>
              {[
                ['🎯', pu.base, `${d.basePts} pts`],
                ['🔥', pu.racha2,  `+25% pts`],
                ['🏆', pu.racha3,  `+50% pts`],
              ].map(([e, k, v]) => (
                <div key={k} className="flex items-start justify-between gap-2">
                  <span className="text-white/40 shrink-0">{e} {k}</span>
                  <span className="text-white font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-7">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{pu.comoFunciona}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['📰', pu.paso1],
                ['🤔', pu.paso2],
                ['⏱️', pu.paso3],
                ['💡', pu.paso4],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => iniciar(difId)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {pu.empezar}
          </button>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (fase === 'jugando' && portada) {
    const timerPct   = Math.min(100, (timeLeft / dif.tiempoInicio) * 100)
    const timerColor = timeLeft > 15 ? 'bg-green-400' : timeLeft > 7 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'

    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-4xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
            {pu.salir}
          </button>
          <div className="flex items-center gap-4 text-sm text-white/50">
            {racha >= 2 && (
              <span className="text-amber-400 font-bold">🔥 Racha ×{racha}</span>
            )}
            <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
            <span className="text-white/30">✓{aciertos} ✗{total - aciertos}</span>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-white/40 mb-1.5">
            <span>{pu.tiempo}</span>
            <span className={`font-bold tabular-nums text-sm ${timeLeft <= 7 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
        </div>

        {/* Layout: columna única en móvil, dos columnas en desktop */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_320px] md:gap-8 md:items-center">

          {/* Portada */}
          <div className="mb-5 md:mb-0">
            <PortadaCard p={portada} lang={lang} lt={lt} />
          </div>

          {/* Botones + info lateral */}
          <div className="flex flex-col gap-4">
            <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{pu.puntuacionFinal}</p>
              <p className="text-white font-black text-3xl tabular-nums">{puntos.toLocaleString()}</p>
              {racha >= 2 && (
                <p className="text-amber-400 text-sm font-bold mt-1">🔥 {lang === 'ca' ? `Ratxa de ${racha}` : lang === 'en' ? `Streak of ${racha}` : `Racha de ${racha}`} — ×{(1 + (racha - 1) * 0.25).toFixed(2)}</p>
              )}
            </div>

            <button
              onClick={() => handleRespuesta(true)}
              className="py-6 md:py-8 bg-green-700 hover:bg-green-600 text-white font-black text-2xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              {pu.verdad}
            </button>
            <button
              onClick={() => handleRespuesta(false)}
              className="py-6 md:py-8 bg-red-700 hover:bg-red-600 text-white font-black text-2xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              {pu.mentira}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── FEEDBACK ──────────────────────────────────────────────────────────────
  if (fase === 'feedback' && feedback) {
    const { correcto, delta, portada: p, ptsSumados, rachaAntes, nuevaRacha } = feedback
    const newTime   = timeLeft + delta
    const acabaAqui = newTime <= 0

    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full space-y-4">

          <div className={`rounded-2xl p-6 border text-center ${
            correcto ? 'bg-green-900/30 border-green-500/40' : 'bg-red-900/30 border-red-500/40'
          }`}>
            <div className="text-5xl mb-2">{correcto ? '✅' : '❌'}</div>
            <h2 className={`text-3xl font-black ${correcto ? 'text-green-400' : 'text-red-400'}`}>
              {correcto ? pu.correcto : pu.incorrecto}
            </h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className={`text-lg font-bold ${delta > 0 ? 'text-green-300' : 'text-red-300'}`}>
                {delta > 0 ? `+${delta}s` : `${delta}s`}
              </span>
              {correcto && ptsSumados > 0 && (
                <span className="text-amber-300 font-bold text-lg">+{ptsSumados} pts</span>
              )}
            </div>
            {correcto && nuevaRacha >= 2 && (
              <p className="text-amber-400 text-sm font-bold mt-1">
                🔥 {lang === 'ca' ? `Ratxa de ${nuevaRacha}!` : lang === 'en' ? `Streak of ${nuevaRacha}!` : `¡Racha de ${nuevaRacha}!`} ×{(1 + rachaAntes * 0.25).toFixed(2)} {lang === 'ca' ? 'multiplicador' : lang === 'en' ? 'multiplier' : 'multiplicador'}
              </p>
            )}
            {acabaAqui && (
              <p className="text-white/50 text-sm mt-1">{pu.tiempoAgotadoFin}</p>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{pu.titularEra}</p>
            <div className={`flex items-center gap-2 font-black text-lg mb-3 ${p.veracidad ? 'text-green-400' : 'text-red-400'}`}>
              <span>{p.veracidad ? '✓' : '✗'}</span>
              <span>{p.veracidad ? (lang === 'ca' ? 'VERITAT' : lang === 'en' ? 'TRUE' : 'VERDAD') : (lang === 'ca' ? 'MENTIDA' : lang === 'en' ? 'FALSE' : 'MENTIRA')}</span>
            </div>
            <p className="text-white/60 leading-relaxed">{lt(p, 'explicacion')}</p>
          </div>

          <button
            onClick={continuar}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02]"
          >
            {acabaAqui ? pu.verResultado : pu.continuar}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const pct      = total > 0 ? Math.round((aciertos / total) * 100) : 0
    const emoji    = pct >= 80 ? '🏆' : pct >= 60 ? '📰' : pct >= 40 ? '🤔' : '😬'
    const shareText = `He conseguido ${puntos.toLocaleString()} pts en Portadas Históricas 📰 — ¿puedes superarme? https://tuthor.es/juegos/portadas`
    return (
      <GameEndScreen
        game="portadas"
        emoji={emoji}
        title={`${pu.tiempoAgotadoFin} · ${dif.emoji} ${dl(dif)}`}
        score={puntos}
        stats={[
          { label: pu.aciertos, value: `${aciertos}/${total}` },
          { label: pu.precision, value: `${pct}%` },
        ]}
        shareText={shareText}
        onPlayAgain={() => iniciar(difId)}
        playAgainLabel={pu.reintentar}
        secondaryActions={[{ label: pu.cambiarDif, onClick: () => setFase('intro') }]}
        user={user} lang={lang}
      />
    )
  }

  return null
}
