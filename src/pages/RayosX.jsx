import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevoMazo, evaluarClick } from '../lib/rayosX'
import { ORGANOS } from '../data/organos'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import SiluetaCuerpo from '../components/SiluetaCuerpo'

// Roguelike corto y cerrado: 7 rondas como máximo (un diagnóstico por
// órgano, sin repetir). Sin reloj: el jugador toca la silueta a su ritmo y
// confirma cuando esté seguro — el reto es SABER dónde está el órgano, no
// ser rápido de dedos (mismo espíritu que Órbita/Coordenadas, mecánica de
// clic en vez de slider). Las posiciones no se enseñan hasta confirmar.
const VIDAS_INICIALES = 3

const UI = {
  es: {
    titulo: 'Rayos X',
    desc: 'Toca la silueta donde crees que está el órgano pedido. Cuanto más preciso, más puntos. Si señalas la zona de otro órgano, pierdes una vida.',
    volver: '← Volver', empezar: '🔬 ¡Empezar diagnóstico!',
    comoFunciona: 'Cómo funciona',
    paso1: 'Toca la silueta en el punto donde crees que está el órgano pedido',
    paso2: 'Sin prisa ni reloj — puedes tocar varias veces para ajustar antes de confirmar',
    paso3: 'Cuanto más cerca del centro real, más puntos. Si aciertas otro órgano, pierdes una vida',
    paso4: `Tienes ${VIDAS_INICIALES} vidas — el diagnóstico acaba si se agotan o al preguntar los ${ORGANOS.length} órganos`,
    salir: '← Salir',
    marcar: '📍 ¡Marcar aquí!',
    objetivo: 'Localiza:',
    perfecto: '¡Diagnóstico exacto!', organo: 'Órgano correcto', fallo: 'Órgano equivocado',
    siguiente: 'Siguiente órgano →', verResultado: 'Ver resultado →',
    finPartida: 'Diagnóstico terminado', reintentar: '🔬 Nuevo diagnóstico', volverMenu: '← Volver al menú',
    organosLbl: 'Órganos', rachaLbl: 'Mejor racha',
    examen: 'Examen con la mecánica del juego →',
  },
  en: {
    titulo: 'X-Ray',
    desc: 'Tap the silhouette where you think the requested organ is. The more precise, the more points. Land on another organ\'s zone and you lose a life.',
    volver: '← Back', empezar: '🔬 Start diagnosis!',
    comoFunciona: 'How it works',
    paso1: 'Tap the silhouette at the point where you think the requested organ is',
    paso2: 'No rush, no clock — you can tap several times to adjust before confirming',
    paso3: 'The closer to the real centre, the more points. Land on another organ, lose a life',
    paso4: `You have ${VIDAS_INICIALES} lives — the diagnosis ends when they run out, or once you've been asked all ${ORGANOS.length} organs`,
    salir: '← Exit',
    marcar: '📍 Mark here!',
    objetivo: 'Locate:',
    perfecto: 'Spot on!', organo: 'Right organ', fallo: 'Wrong organ',
    siguiente: 'Next organ →', verResultado: 'See result →',
    finPartida: 'Diagnosis over', reintentar: '🔬 New diagnosis', volverMenu: '← Back to menu',
    organosLbl: 'Organs', rachaLbl: 'Best streak',
    examen: 'Exam using the game mechanic →',
  },
  ca: {
    titulo: 'Raigs X',
    desc: 'Toca la silueta on creus que és l\'òrgan demanat. Com més precís, més punts. Si assenyales la zona d\'un altre òrgan, perds una vida.',
    volver: '← Enrere', empezar: '🔬 Comença el diagnòstic!',
    comoFunciona: 'Com funciona',
    paso1: 'Toca la silueta al punt on creus que és l\'òrgan demanat',
    paso2: 'Sense presses ni rellotge — pots tocar diverses vegades per ajustar abans de confirmar',
    paso3: 'Com més a prop del centre real, més punts. Si encertes un altre òrgan, perds una vida',
    paso4: `Tens ${VIDAS_INICIALES} vides — el diagnòstic acaba si s'acaben o en preguntar els ${ORGANOS.length} òrgans`,
    salir: '← Sortir',
    marcar: '📍 Marca aquí!',
    objetivo: 'Localitza:',
    perfecto: 'Diagnòstic exacte!', organo: 'Òrgan correcte', fallo: 'Òrgan equivocat',
    siguiente: 'Òrgan següent →', verResultado: 'Veure resultat →',
    finPartida: 'Diagnòstic acabat', reintentar: '🔬 Nou diagnòstic', volverMenu: '← Torna al menú',
    organosLbl: 'Òrgans', rachaLbl: 'Millor ratxa',
    examen: 'Examen amb la mecànica del joc →',
  },
}

// ── Fila de órganos en orden (referencia visual, resalta el objetivo) ───────
function FilaOrganos({ objetivoId, l }) {
  return (
    <div className="flex justify-between gap-1 w-full mb-1 flex-wrap">
      {ORGANOS.map(o => {
        const activo = o.id === objetivoId
        return (
          <div key={o.id}
            className={`flex-1 min-w-[38px] flex flex-col items-center py-1.5 rounded-lg border text-center transition-all ${
              activo ? 'bg-[#EDAE49]/15 border-[#EDAE49]/50 scale-105' : 'bg-white/5 border-white/10 opacity-50'
            }`}>
            <span className="w-3 h-3 rounded-full mb-0.5" style={{ background: o.color }} />
            <span className={`text-[8px] sm:text-[9px] font-semibold leading-tight ${activo ? 'text-[#EDAE49]' : 'text-white/40'}`}>
              {(o.nombre[l] ?? o.nombre.es).slice(0, 5)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function RayosX() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = UI[l]

  const [fase, setFase]     = useState('intro') // intro | jugando | resultado | fin
  const [cola, setCola]     = useState([])
  const [organo, setOrgano] = useState(null)
  const [vidas, setVidas]   = useState(VIDAS_INICIALES)
  const [puntos, setPuntos] = useState(0)
  const [racha, setRacha]   = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [rondas, setRondas] = useState(0)
  const [guess, setGuess]   = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [saved, setSaved]   = useState(false)

  const gameStartRef = useRef(null)

  function iniciar() {
    const mazo = nuevoMazo()
    setOrgano(mazo[0])
    setCola(mazo.slice(1))
    setVidas(VIDAS_INICIALES)
    setPuntos(0)
    setRacha(0)
    setMejorRacha(0)
    setRondas(0)
    setFeedback(null)
    setSaved(false)
    setGuess(null)
    setFase('jugando')
    gameStartRef.current = Date.now()
  }

  // Guardar actividad al terminar el diagnóstico.
  useEffect(() => {
    if (fase !== 'fin' || saved || !user) return
    setSaved(true)
    const timeSpent = gameStartRef.current ? Math.round((Date.now() - gameStartRef.current) / 1000) : 0
    saveActivity(user.uid, {
      type: 'juego', game: 'rayos-x', category: 'biologia',
      score: puntos, passed: rondas >= 4, timeSpent,
      coinsEarned: computeCoins('rayos-x', { score: puntos }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  function marcar() {
    if (fase !== 'jugando' || !organo || !guess) return
    const resultado = evaluarClick(guess, organo.id)
    const gano = resultado !== 'fallo'
    const base = resultado === 'perfecto' ? 100 : resultado === 'organo' ? 50 : 0
    const bonus = resultado === 'perfecto' ? Math.min(racha * 10, 50) : 0
    const pts = base + bonus
    const nuevaRacha = resultado === 'perfecto' ? racha + 1 : 0
    const vidasRestantes = gano ? vidas : vidas - 1

    if (gano) setPuntos(p => p + pts)
    setRondas(r => r + 1)
    setRacha(nuevaRacha)
    setMejorRacha(m => Math.max(m, nuevaRacha))
    setVidas(vidasRestantes)
    setFeedback({ resultado, pts, vidasRestantes, organo, guessMarcado: guess })
    setFase('resultado')
  }

  function siguiente() {
    if (feedback && feedback.vidasRestantes <= 0) { setFase('fin'); return }
    if (cola.length === 0) { setFase('fin'); return } // los órganos ya preguntados
    setOrgano(cola[0])
    setCola(cola.slice(1))
    setFeedback(null)
    setGuess(null)
    setFase('jugando')
  }

  const seo = {
    es: { title: 'Rayos X — Localiza el órgano correcto', desc: 'Toca la silueta del cuerpo donde crees que está cada órgano y confirma tu diagnóstico. Aprende dónde está y para qué sirve cada órgano jugando, sin reloj. Juego de biología gratis.', path: '/juegos/rayos-x' },
    en: { title: 'X-Ray — Locate the right organ', desc: 'Tap the body silhouette where you think each organ is and confirm your diagnosis. Learn where each organ is and what it does by playing, no clock. Free biology game.', path: '/en/juegos/rayos-x' },
    ca: { title: 'Raigs X — Localitza l\'òrgan correcte', desc: 'Toca la silueta del cos on creus que és cada òrgan i confirma el teu diagnòstic. Aprèn on és i per a què serveix cada òrgan jugant, sense rellotge. Joc de biologia gratis.', path: '/ca/juegos/rayos-x' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="max-w-xl w-full flex flex-col items-center">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {t.volver}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🧠</span>
            <h1 className="text-4xl font-black text-white mb-2">{t.titulo}</h1>
            <p className="text-white/40">{t.desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 w-full">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t.comoFunciona}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['👆', t.paso1],
                ['🤔', t.paso2],
                ['🎯', t.paso3],
                ['❤️', t.paso4],
              ].map(([e, txt]) => (
                <div key={txt} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={iniciar}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 mb-3">
            {t.empezar}
          </button>
          <button onClick={() => navigate(localPath('/examen/rayos-x-test'))}
            className="text-white/30 hover:text-white/60 text-sm transition-colors">
            {t.examen}
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  if (fase === 'jugando' && organo) {
    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-md mx-auto w-full">
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
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
          </div>
        </div>

        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-1">{t.objetivo}</p>
        <p className="text-center text-2xl font-black text-white mb-4">
          {organo.nombre[l] ?? organo.nombre.es}
        </p>

        <SiluetaCuerpo guess={guess} onPick={setGuess} revelado={false} resultado={null} />

        <button onClick={marcar} disabled={!guess}
          className="w-full mt-4 py-5 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-amber-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100">
          {t.marcar}
        </button>
      </div>
    )
  }

  // ── RESULTADO ──────────────────────────────────────────────────────────────
  if (fase === 'resultado' && feedback) {
    const { resultado, pts, vidasRestantes, organo: o, guessMarcado } = feedback
    const color = resultado === 'perfecto' ? 'text-green-400' : resultado === 'organo' ? 'text-yellow-400' : 'text-red-400'
    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between mb-4 text-sm text-white/50">
          <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
          <span className="flex gap-0.5">
            {Array.from({ length: VIDAS_INICIALES }).map((_, i) => (
              <span key={i} className={i < vidas ? '' : 'opacity-20'}>❤️</span>
            ))}
          </span>
        </div>

        <p className={`text-center text-2xl font-black mb-1 ${color}`}>
          {t[resultado]} {resultado !== 'fallo' && pts > 0 && `· +${pts}`}
        </p>
        <p className="text-center text-white/40 text-sm mb-4">
          {t.objetivo} {o.nombre[l] ?? o.nombre.es}
        </p>

        <FilaOrganos objetivoId={o.id} l={l} />
        <SiluetaCuerpo guess={guessMarcado} onPick={null} revelado resultado={resultado} />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4 text-sm text-white/60 leading-relaxed">
          <p className="text-white/80 font-semibold mb-1">{o.funcion[l] ?? o.funcion.es}</p>
          {o.dato[l] ?? o.dato.es}
        </div>

        <button onClick={siguiente}
          className="w-full mt-5 py-4 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg transition-all hover:scale-[1.02]">
          {vidasRestantes <= 0 || cola.length === 0 ? t.verResultado : t.siguiente}
        </button>
      </div>
    )
  }

  // ── FIN ────────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const emoji = rondas >= ORGANOS.length ? '🏆' : rondas >= 4 ? '🧠' : rondas >= 2 ? '🔬' : '🤒'
    const shareText = l === 'en'
      ? `I diagnosed ${rondas} organs and scored ${puntos.toLocaleString()} pts in X-Ray 🧠 — can you beat me? https://tuthor.es/juegos/rayos-x`
      : l === 'ca'
      ? `He diagnosticat ${rondas} òrgans i he fet ${puntos.toLocaleString()} pts a Raigs X 🧠 — pots superar-me? https://tuthor.es/juegos/rayos-x`
      : `He diagnosticado ${rondas} órganos y conseguido ${puntos.toLocaleString()} pts en Rayos X 🧠 — ¿puedes superarme? https://tuthor.es/juegos/rayos-x`
    return (
      <GameEndScreen
        game="rayos-x"
        emoji={emoji}
        title={t.finPartida}
        score={puntos}
        stats={[
          { label: t.organosLbl, value: `${rondas}/${ORGANOS.length}`, emoji: '🧠' },
          { label: t.rachaLbl, value: `×${mejorRacha}`, emoji: '🔥' },
        ]}
        shareText={shareText}
        onPlayAgain={iniciar}
        playAgainLabel={t.reintentar}
        secondaryActions={[{ label: t.volverMenu, onClick: () => setFase('intro') }]}
        user={user} lang={l}
      />
    )
  }

  return null
}
