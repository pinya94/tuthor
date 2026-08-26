import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FOTOS, EPOCAS } from '../data/epocasHistoricas'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import SEOHead from '../components/SEOHead'

const VIDAS_INICIALES = 2 // margen pequeño: un fallo no acaba la partida, dos sí
const BASE_PTS = 100
const SLIDER_MAX = 1000

// Rango de años reales (numeración con signo: negativo = a.C.) que cubre
// cada época en la línea temporal. Deliberadamente NO proporcional al
// tiempo real: cada época ocupa el mismo ancho visual (1/5 del slider) para
// que la Prehistoria —millones de años— no se coma la barra entera y deje
// el resto invisible. Dentro de cada tramo sí se interpola linealmente en
// años reales, solo para el año que se muestra en pantalla mientras
// arrastras; lo que se evalúa sigue siendo la época, nunca el año exacto.
const ERA_RANGOS = {
  prehistoria:    { start: -3300000, end: -3000 },
  antigua:        { start: -3000,    end: 476 },
  'edad-media':   { start: 476,      end: 1492 },
  'edad-moderna': { start: 1492,     end: 1789 },
  contemporanea:  { start: 1789,     end: new Date().getFullYear() },
}

const UI = {
  es: {
    titulo: '¿Qué Época Es?', desc: 'Modo roguelike: adivina la época en fotos reales, ronda tras ronda, hasta que se te acaben las vidas.',
    volver: '← Volver', empezar: '¡Empezar partida! →',
    comoFunciona: 'Cómo funciona',
    paso1: 'Aparece una fotografía histórica real',
    paso2: 'Desliza en la línea temporal hasta la época que retrata (¡no cuándo se hizo la foto!)',
    paso3: 'Aciertas: sigues y suman puntos con racha. Fallas: pierdes una vida',
    paso4: `Tienes ${VIDAS_INICIALES} vidas — cuando se acaban, termina la partida`,
    aviso: 'Ojo: algunas fotos son de excavaciones, pinturas o reconstrucciones modernas de algo mucho más antiguo. Lo que cuenta es la época que retrata la imagen, no cuándo se hizo la fotografía o el cuadro.',
    salir: '← Salir', ronda: 'Ronda',
    tuRespuesta: 'Tu respuesta', confirmar: 'Confirmar →',
    correcto: '¡Correcto!', incorrecto: '¡Incorrecto!', vidaPerdida: '💔 −1 vida', finAqui: 'Fin de la partida',
    eraTexto: 'Esto retrata…', fechaTexto: 'Fecha real',
    siguiente: 'Siguiente →', verResultado: 'Ver resultado →',
    finPartida: 'Fin de la partida', rondas: 'Rondas', mejorRacha: 'Mejor racha',
    compartir: '🔗 Compartir resultado', reintentar: 'Jugar de nuevo', volverMenu: 'Volver al menú',
    aC: 'a.C.', dC: 'd.C.', haceAnos: n => `hace ~${n} años`,
  },
  en: {
    titulo: 'What Era Is This?', desc: 'Roguelike mode: guess the era in real photos, round after round, until you run out of lives.',
    volver: '← Back', empezar: 'Start game! →',
    comoFunciona: 'How it works',
    paso1: 'A real historical photograph appears',
    paso2: 'Drag the timeline to the era it shows (not when the photo was taken!)',
    paso3: 'Correct: keep going, points add up with your streak. Wrong: lose a life',
    paso4: `You have ${VIDAS_INICIALES} lives — when they run out, the game ends`,
    aviso: "Heads up: some photos are of excavations, paintings or modern reconstructions of something much older. What counts is the era shown, not when the photograph or painting was made.",
    salir: '← Exit', ronda: 'Round',
    tuRespuesta: 'Your answer', confirmar: 'Confirm →',
    correcto: 'Correct!', incorrecto: 'Wrong!', vidaPerdida: '💔 −1 life', finAqui: 'Game over',
    eraTexto: 'This shows…', fechaTexto: 'Real date',
    siguiente: 'Next →', verResultado: 'See result →',
    finPartida: 'Game over', rondas: 'Rounds', mejorRacha: 'Best streak',
    compartir: '🔗 Share result', reintentar: 'Play again', volverMenu: 'Back to menu',
    aC: 'BC', dC: 'AD', haceAnos: n => `~${n} years ago`,
  },
  ca: {
    titulo: 'Quina Època És?', desc: 'Mode roguelike: endevina l\'època en fotos reals, ronda rere ronda, fins que se t\'acabin les vides.',
    volver: '← Tornar', empezar: 'Comença la partida! →',
    comoFunciona: 'Com funciona',
    paso1: 'Apareix una fotografia històrica real',
    paso2: 'Arrossega a la línia temporal fins a l\'època que retrata (no pas quan es va fer la foto!)',
    paso3: 'Encertes: continues i sumes punts amb la ratxa. Falles: perds una vida',
    paso4: `Tens ${VIDAS_INICIALES} vides — quan s'acaben, la partida s'atura`,
    aviso: "Compte: algunes fotos són d'excavacions, pintures o reconstruccions modernes d'alguna cosa molt més antiga. El que compta és l'època que retrata la imatge, no pas quan es va fer la fotografia o el quadre.",
    salir: '← Sortir', ronda: 'Ronda',
    tuRespuesta: 'La teva resposta', confirmar: 'Confirmar →',
    correcto: 'Correcte!', incorrecto: 'Incorrecte!', vidaPerdida: '💔 −1 vida', finAqui: 'Fi de la partida',
    eraTexto: 'Això retrata…', fechaTexto: 'Data real',
    siguiente: 'Següent →', verResultado: 'Veure resultat →',
    finPartida: 'Fi de la partida', rondas: 'Rondes', mejorRacha: 'Millor ratxa',
    compartir: '🔗 Compartir resultat', reintentar: 'Jugar de nou', volverMenu: 'Tornar al menú',
    aC: 'aC', dC: 'dC', haceAnos: n => `fa ~${n} anys`,
  },
}

// value (0..SLIDER_MAX) → { eraId, year } — cada época ocupa 1/5 del slider
// por igual, con el año interpolado linealmente solo dentro de ese tramo.
function sliderToEraYear(value, epocasOrden) {
  const segSize = SLIDER_MAX / epocasOrden.length
  const segIdx  = Math.min(epocasOrden.length - 1, Math.floor(value / segSize))
  const eraId   = epocasOrden[segIdx]
  const frac    = (value - segIdx * segSize) / segSize
  const { start, end } = ERA_RANGOS[eraId]
  const year = Math.round(start + frac * (end - start))
  return { eraId, year }
}

function formatYear(eraId, year, t) {
  if (eraId === 'prehistoria') {
    const yearsAgo = new Date().getFullYear() - year
    return t.haceAnos(yearsAgo.toLocaleString())
  }
  if (year < 0) return `${Math.abs(year).toLocaleString()} ${t.aC}`
  return `${year.toLocaleString()} ${t.dC}`
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Baraja el mazo completo de fotos. Si la última foto mostrada quedaría
// primera otra vez (mala suerte al barajar), la cambia de sitio para no
// repetir la misma imagen dos veces seguidas.
function nuevoMazo(excludeId) {
  const barajado = shuffle(FOTOS)
  if (excludeId && barajado.length > 1 && barajado[0].id === excludeId) {
    [barajado[0], barajado[1]] = [barajado[1], barajado[0]]
  }
  return barajado
}

export default function EpocasHistoricas() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const t = UI[lang] || UI.es
  const epocasOrden = Object.keys(EPOCAS)

  const [fase, setFase]         = useState('intro')
  const [foto, setFoto]         = useState(null)
  const [cola, setCola]         = useState([]) // próximas fotos, sin incluir la actual
  const [vidas, setVidas]       = useState(VIDAS_INICIALES)
  const [puntos, setPuntos]     = useState(0)
  const [racha, setRacha]       = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [rondas, setRondas]     = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [saved, setSaved]       = useState(false)
  const [sliderVal, setSliderVal] = useState(Math.round(SLIDER_MAX / 2))
  const startRef = useRef(null)

  const preview = sliderToEraYear(sliderVal, epocasOrden)

  function iniciar() {
    const mazo = nuevoMazo(null)
    setFoto(mazo[0])
    setCola(mazo.slice(1))
    setVidas(VIDAS_INICIALES)
    setPuntos(0)
    setRacha(0)
    setMejorRacha(0)
    setRondas(0)
    setFeedback(null)
    setSaved(false)
    setSliderVal(Math.round(SLIDER_MAX / 2))
    setFase('jugando')
    startRef.current = Date.now()
  }

  useEffect(() => {
    if (fase !== 'fin' || saved || !user) return
    setSaved(true)
    const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
    saveActivity(user.uid, {
      type: 'juego', game: 'epocas-historicas', category: 'general',
      score: puntos, passed: rondas >= 5, timeSpent,
      coinsEarned: computeCoins('epocas-historicas', { score: puntos }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  function confirmar() {
    const epocaId = preview.eraId
    const correcto = epocaId === foto.epoca
    const pts = correcto ? Math.round(BASE_PTS * (1 + racha * 0.25)) : 0
    const nuevaRacha = correcto ? racha + 1 : 0
    const vidasRestantes = correcto ? vidas : vidas - 1

    if (correcto) setPuntos(p => p + pts)
    setRondas(r => r + 1)
    setRacha(nuevaRacha)
    setMejorRacha(m => Math.max(m, nuevaRacha))
    setVidas(vidasRestantes)
    setFeedback({ correcto, pts, rachaAntes: racha, vidasRestantes })
    setFase('feedback')
  }

  function siguiente() {
    setSliderVal(Math.round(SLIDER_MAX / 2))
    if (feedback && feedback.vidasRestantes <= 0) {
      setFase('fin')
      return
    }
    let proximaCola = cola
    if (proximaCola.length === 0) proximaCola = nuevoMazo(foto?.id)
    setFoto(proximaCola[0])
    setCola(proximaCola.slice(1))
    setFeedback(null)
    setFase('jugando')
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead
          title={lang === 'en' ? 'What Era Is This? — Guess the Historical Period' : lang === 'ca' ? 'Quina Època És? — Endevina el Període Històric' : '¿Qué Época Es? — Adivina el Periodo Histórico'}
          description={lang === 'en' ? 'Look at real historical photographs — from Prehistory to World War II — and guess which era they belong to, roguelike style: how many rounds can you survive? Free history game.' : lang === 'ca' ? 'Mira fotografies històriques reals — des de la Prehistòria fins a la Segona Guerra Mundial — i endevina a quina època pertanyen, a l\'estil roguelike: quantes rondes pots superar? Joc d\'història gratuït.' : 'Mira fotografías históricas reales —desde la Prehistoria hasta la Segunda Guerra Mundial— y adivina a qué época pertenecen, al estilo roguelike: ¿cuántas rondas aguantas? Juego de historia gratuito.'}
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

          <SupportBlock variant="top" className="mb-5 w-full" />

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t.comoFunciona}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['🖼️', t.paso1],
                ['🤔', t.paso2],
                ['✅', t.paso3],
                ['❤️', t.paso4],
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
          <div className="flex items-center gap-3 text-sm text-white/50">
            {racha >= 2 && <span className="text-amber-400 font-bold">🔥 ×{racha}</span>}
            <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
            <span className="flex gap-0.5">
              {Array.from({ length: VIDAS_INICIALES }).map((_, i) => (
                <span key={i} className={i < vidas ? '' : 'opacity-20'}>❤️</span>
              ))}
            </span>
            <span className="text-white/30 hidden sm:inline">{t.ronda} {rondas + 1}</span>
          </div>
        </div>

        <div className="mb-5 rounded-2xl overflow-hidden border border-white/10 bg-black/30">
          <img
            src={foto.src}
            alt=""
            className="w-full max-h-[50vh] object-contain bg-black"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="text-center mb-4">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-1">{t.tuRespuesta}</p>
            <p className="text-white font-black text-2xl">{EPOCAS[preview.eraId][lang] ?? EPOCAS[preview.eraId].es}</p>
            <p className="text-amber-300 font-semibold text-sm mt-0.5">{formatYear(preview.eraId, preview.year, t)}</p>
          </div>

          {/* Tramos iguales por época (no proporcionales a años reales) */}
          <div className="flex gap-0.5 h-2.5 rounded-full overflow-hidden mb-2">
            {epocasOrden.map(id => (
              <div key={id} className={`flex-1 rounded-full transition-colors ${id === preview.eraId ? 'bg-[#EDAE49]' : 'bg-white/10'}`} />
            ))}
          </div>

          <input
            type="range"
            min={0}
            max={SLIDER_MAX}
            value={sliderVal}
            onChange={e => setSliderVal(Number(e.target.value))}
            className="w-full accent-[#EDAE49]"
          />

          <div className="flex text-[10px] text-white/30 mt-1 px-0.5">
            {epocasOrden.map(id => (
              <span key={id} className={`flex-1 text-center truncate px-0.5 ${id === preview.eraId ? 'text-amber-300 font-semibold' : ''}`}>
                {EPOCAS[id][lang] ?? EPOCAS[id].es}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={confirmar}
          className="w-full mt-4 py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-95"
        >
          {t.confirmar}
        </button>
      </div>
    )
  }

  // ── FEEDBACK ──────────────────────────────────────────────────────────────
  if (fase === 'feedback' && feedback && foto) {
    const { correcto, pts, rachaAntes, vidasRestantes } = feedback
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
            {!correcto && (
              <span className="text-red-300 font-bold text-lg block mt-1">
                {vidasRestantes <= 0 ? t.finAqui : t.vidaPerdida}
              </span>
            )}
            {correcto && rachaAntes >= 1 && (
              <p className="text-amber-400 text-sm font-bold mt-1">
                🔥 ×{(1 + rachaAntes * 0.25).toFixed(2)}
              </p>
            )}
            <div className="flex gap-1 justify-center mt-3">
              {Array.from({ length: VIDAS_INICIALES }).map((_, i) => (
                <span key={i} className={`text-lg ${i < vidasRestantes ? '' : 'opacity-20'}`}>❤️</span>
              ))}
            </div>
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
            {vidasRestantes <= 0 ? t.verResultado : t.siguiente}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const emoji = rondas >= 15 ? '🏆' : rondas >= 8 ? '🏺' : rondas >= 4 ? '🤔' : '😬'
    const shareText = `He aguantado ${rondas} rondas y ${puntos.toLocaleString()} pts en ¿Qué Época Es? 🏺 — ¿puedes superarme? https://tuthor.es/juegos/epocas-historicas`
    return (
      <GameEndScreen
        game="epocas-historicas"
        emoji={emoji}
        title={t.finPartida}
        score={puntos}
        stats={[
          { label: t.rondas, value: rondas, emoji: '🎲' },
          { label: t.mejorRacha, value: `×${mejorRacha}`, emoji: '🔥' },
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
