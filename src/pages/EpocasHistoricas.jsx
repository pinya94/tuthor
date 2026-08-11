import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FOTOS, EPOCAS } from '../data/epocasHistoricas'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import GameEndScreen from '../components/GameEndScreen'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import SEOHead from '../components/SEOHead'

const TOTAL_PREGUNTAS = 10
const BASE_PTS = 100

const UI = {
  es: {
    titulo: '¿Qué Época Es?', desc: 'Mira la imagen real y adivina a qué época histórica pertenece.',
    volver: '← Volver', empezar: '¡Empezar! →',
    comoFunciona: 'Cómo funciona',
    paso1: 'Aparece una fotografía histórica real',
    paso2: 'Elige a qué época pertenece lo que retrata (¡no cuándo se hizo la foto!)',
    paso3: 'Aciertas: ganas puntos. Fallas: sigues, sin puntos',
    paso4: 'Siempre verás la explicación y la fecha exacta',
    aviso: 'Ojo: algunas fotos son de excavaciones o reconstrucciones modernas de algo mucho más antiguo. Lo que cuenta es la época que retrata la imagen, no cuándo se hizo la fotografía.',
    salir: '← Salir', pregunta: 'Pregunta', de: 'de',
    correcto: '¡Correcto!', incorrecto: '¡Incorrecto!',
    eraTexto: 'Esto retrata…', fechaTexto: 'Fecha real',
    siguiente: 'Siguiente →', verResultado: 'Ver resultado →',
    puntuacionFinal: 'Puntuación final', aciertos: 'Aciertos', precision: 'Precisión',
    compartir: '🔗 Compartir resultado', reintentar: 'Jugar de nuevo', volverMenu: 'Volver al menú',
  },
  en: {
    titulo: 'What Era Is This?', desc: 'Look at the real image and guess which historical era it belongs to.',
    volver: '← Back', empezar: 'Start! →',
    comoFunciona: 'How it works',
    paso1: 'A real historical photograph appears',
    paso2: 'Pick the era of what it shows (not when the photo was taken!)',
    paso3: 'Correct: earn points. Wrong: keep going, no points',
    paso4: "You'll always see the explanation and the exact date",
    aviso: "Heads up: some photos are of excavations or modern reconstructions of something much older. What counts is the era shown, not when the photograph itself was taken.",
    salir: '← Exit', pregunta: 'Question', de: 'of',
    correcto: 'Correct!', incorrecto: 'Wrong!',
    eraTexto: 'This shows…', fechaTexto: 'Real date',
    siguiente: 'Next →', verResultado: 'See result →',
    puntuacionFinal: 'Final score', aciertos: 'Correct', precision: 'Accuracy',
    compartir: '🔗 Share result', reintentar: 'Play again', volverMenu: 'Back to menu',
  },
  ca: {
    titulo: 'Quina Època És?', desc: 'Mira la imatge real i endevina a quina època històrica pertany.',
    volver: '← Tornar', empezar: 'Comença! →',
    comoFunciona: 'Com funciona',
    paso1: 'Apareix una fotografia històrica real',
    paso2: 'Tria a quina època pertany el que retrata (no pas quan es va fer la foto!)',
    paso3: 'Encertes: guanyes punts. Falles: continues, sense punts',
    paso4: "Sempre veuràs l'explicació i la data exacta",
    aviso: "Compte: algunes fotos són d'excavacions o reconstruccions modernes d'alguna cosa molt més antiga. El que compta és l'època que retrata la imatge, no pas quan es va fer la fotografia.",
    salir: '← Sortir', pregunta: 'Pregunta', de: 'de',
    correcto: 'Correcte!', incorrecto: 'Incorrecte!',
    eraTexto: 'Això retrata…', fechaTexto: 'Data real',
    siguiente: 'Següent →', verResultado: 'Veure resultat →',
    puntuacionFinal: 'Puntuació final', aciertos: 'Encerts', precision: 'Precisió',
    compartir: '🔗 Compartir resultat', reintentar: 'Jugar de nou', volverMenu: 'Tornar al menú',
  },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRonda(n) {
  const barajadas = shuffle(FOTOS)
  const ronda = []
  for (let i = 0; i < n; i++) ronda.push(barajadas[i % barajadas.length])
  return shuffle(ronda)
}

export default function EpocasHistoricas() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const t = UI[lang] || UI.es
  const epocasOrden = Object.keys(EPOCAS)

  const [fase, setFase]         = useState('intro')
  const [ronda, setRonda]       = useState([])
  const [idx, setIdx]           = useState(0)
  const [puntos, setPuntos]     = useState(0)
  const [racha, setRacha]       = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [saved, setSaved]       = useState(false)
  const startRef = useRef(null)

  const foto = ronda[idx]

  function iniciar() {
    setRonda(pickRonda(TOTAL_PREGUNTAS))
    setIdx(0)
    setPuntos(0)
    setRacha(0)
    setAciertos(0)
    setFeedback(null)
    setSaved(false)
    setFase('jugando')
    startRef.current = Date.now()
  }

  useEffect(() => {
    if (fase !== 'fin' || saved || !user) return
    setSaved(true)
    const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
    const pct = ronda.length > 0 ? Math.round((aciertos / ronda.length) * 100) : 0
    saveActivity(user.uid, {
      type: 'juego', game: 'epocas-historicas', category: 'general',
      score: puntos, passed: pct >= 50, timeSpent,
      coinsEarned: computeCoins('epocas-historicas', { score: puntos }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  function responder(epocaId) {
    const correcto = epocaId === foto.epoca
    const nuevaRacha = correcto ? racha + 1 : 0
    const pts = correcto ? Math.round(BASE_PTS * (1 + racha * 0.25)) : 0
    if (correcto) {
      setAciertos(a => a + 1)
      setPuntos(p => p + pts)
    }
    setRacha(nuevaRacha)
    setFeedback({ correcto, elegido: epocaId, pts, rachaAntes: racha })
    setFase('feedback')
  }

  function siguiente() {
    const nextIdx = idx + 1
    if (nextIdx >= ronda.length) {
      setFase('fin')
      return
    }
    setIdx(nextIdx)
    setFeedback(null)
    setFase('jugando')
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead
          title={lang === 'en' ? 'What Era Is This? — Guess the Historical Period' : lang === 'ca' ? 'Quina Època És? — Endevina el Període Històric' : '¿Qué Época Es? — Adivina el Periodo Histórico'}
          description={lang === 'en' ? 'Look at real historical photographs — from Ancient Egypt to World War II — and guess which era they belong to. Free history game.' : lang === 'ca' ? 'Mira fotografies històriques reals — des de l\'Antic Egipte fins a la Segona Guerra Mundial — i endevina a quina època pertanyen. Joc d\'història gratuït.' : 'Mira fotografías históricas reales —desde el Antiguo Egipto hasta la Segunda Guerra Mundial— y adivina a qué época pertenecen. Juego de historia gratuito.'}
          path={lang === 'en' ? '/en/juegos/epocas-historicas' : lang === 'ca' ? '/ca/juegos/epocas-historicas' : '/juegos/epocas-historicas'}
          lang={lang}
        />
        <div className="max-w-xl w-full flex flex-col items-center">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {t.volver}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🏺</span>
            <h1 className="text-4xl font-black text-white mb-2">{t.titulo}</h1>
            <p className="text-white/40">{t.desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t.comoFunciona}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['🖼️', t.paso1],
                ['🤔', t.paso2],
                ['✅', t.paso3],
                ['💡', t.paso4],
              ].map(([e, txt]) => (
                <div key={txt} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-7 text-sm text-amber-200/90 leading-relaxed">
            ⚠️ {t.aviso}
          </div>

          <button onClick={iniciar}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {t.empezar}
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (fase === 'jugando' && foto) {
    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
            {t.salir}
          </button>
          <div className="flex items-center gap-4 text-sm text-white/50">
            {racha >= 2 && <span className="text-amber-400 font-bold">🔥 ×{racha}</span>}
            <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
            <span className="text-white/30">{t.pregunta} {idx + 1} {t.de} {ronda.length}</span>
          </div>
        </div>

        <div className="mb-5 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
          <img
            src={foto.src}
            alt=""
            className="w-full max-h-[50vh] object-contain bg-black"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {epocasOrden.map(id => (
            <button
              key={id}
              onClick={() => responder(id)}
              className="py-4 px-4 bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-95 text-left"
            >
              {EPOCAS[id][lang] ?? EPOCAS[id].es}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── FEEDBACK ──────────────────────────────────────────────────────────────
  if (fase === 'feedback' && feedback) {
    const { correcto, pts, rachaAntes } = feedback
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full space-y-4">
          <div className={`rounded-2xl p-6 border text-center ${
            correcto ? 'bg-green-900/30 border-green-500/40' : 'bg-red-900/30 border-red-500/40'
          }`}>
            <div className="text-5xl mb-2">{correcto ? '✅' : '❌'}</div>
            <h2 className={`text-3xl font-black ${correcto ? 'text-green-400' : 'text-red-400'}`}>
              {correcto ? t.correcto : t.incorrecto}
            </h2>
            {correcto && pts > 0 && (
              <span className="text-amber-300 font-bold text-lg block mt-1">+{pts} pts</span>
            )}
            {correcto && racha >= 2 && (
              <p className="text-amber-400 text-sm font-bold mt-1">
                🔥 ×{(1 + rachaAntes * 0.25).toFixed(2)}
              </p>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
            <img src={foto.src} alt="" className="w-full max-h-[35vh] object-contain bg-black" />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{t.eraTexto}</p>
            <p className="text-white font-black text-lg mb-3">
              {EPOCAS[foto.epoca][lang] ?? EPOCAS[foto.epoca].es} — {foto.tema[lang] ?? foto.tema.es}
            </p>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{t.fechaTexto}</p>
            <p className="text-white/70 font-semibold mb-3">{foto.fecha[lang] ?? foto.fecha.es}</p>
            <p className="text-white/60 leading-relaxed">{foto.explicacion[lang] ?? foto.explicacion.es}</p>
            <p className="text-white/25 text-xs mt-3">📷 {foto.credito}</p>
          </div>

          <button
            onClick={siguiente}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02]"
          >
            {idx + 1 >= ronda.length ? t.verResultado : t.siguiente}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const pct = ronda.length > 0 ? Math.round((aciertos / ronda.length) * 100) : 0
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🏺' : pct >= 40 ? '🤔' : '😬'
    const shareText = `He conseguido ${puntos.toLocaleString()} pts en ¿Qué Época Es? 🏺 — ¿puedes superarme? https://tuthor.es/juegos/epocas-historicas`
    return (
      <GameEndScreen
        game="epocas-historicas"
        emoji={emoji}
        title={t.puntuacionFinal}
        score={puntos}
        stats={[
          { label: t.aciertos, value: `${aciertos}/${ronda.length}` },
          { label: t.precision, value: `${pct}%` },
        ]}
        shareText={shareText}
        onPlayAgain={iniciar}
        playAgainLabel={t.reintentar}
        secondaryActions={[{ label: t.volverMenu, onClick: () => setFase('intro') }]}
        user={user} lang={lang}
      />
    )
  }

  return null
}
