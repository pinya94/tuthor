import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComposableMap, Geographies, Geography, Graticule, Marker, Line } from 'react-simple-maps'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevoMazo, distanciaKm, evaluarDistancia } from '../lib/coordenadas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Windows no pinta emojis de bandera (regional indicators): cae a las dos
// letras del código ("EG" en vez de 🇪🇬). Mismo arreglo que GeoMapa.jsx —
// bandera como imagen de flagcdn.com en vez del emoji.
function flagToCode(emoji) {
  return [...emoji].map(c => String.fromCharCode(c.codePointAt(0) - 0x1F1E6 + 65)).join('').toLowerCase()
}
function FlagImg({ bandera, size = 28, className = '' }) {
  const code = flagToCode(bandera)
  return <img src={`https://flagcdn.com/w80/${code}.png`} alt={code} width={size} height={Math.round(size * 0.75)} className={`inline-block rounded shadow align-middle ${className}`} />
}

// Roguelike corto: 10 rondas como máximo (el pool tiene 40 países, no hace
// falta cubrirlo entero en una partida) o hasta que se acaben las vidas. Sin
// reloj ni sonda animada — mismo criterio que orbita.js: el reto es saber la
// posición real, no ser rápido de dedos.
const VIDAS_INICIALES = 3
const MAX_RONDAS = 10

const UI = {
  es: {
    titulo: 'Coordenadas',
    desc: 'Mueve la latitud y la longitud hasta donde creas que está el país pedido y confirma. Cuanto más cerca en el mapa real, más puntos.',
    volver: '← Volver', empezar: '¡Empezar! →',
    comoFunciona: 'Cómo funciona',
    paso1: 'Se pide un país: mueve los dos sliders (latitud y longitud) para marcarlo en el mapa',
    paso2: 'Sin prisa ni reloj — decide con calma y confirma cuando estés seguro',
    paso3: 'Cuanto más cerca esté tu marca de la real, más puntos. Muy lejos, pierdes una vida',
    paso4: `Tienes ${VIDAS_INICIALES} vidas — la partida acaba si se agotan o tras ${MAX_RONDAS} países`,
    salir: '← Salir',
    confirmar: '📍 Confirmar posición',
    objetivo: 'Marca en el mapa:',
    latitud: 'Latitud', longitud: 'Longitud',
    norte: 'N', sur: 'S', este: 'E', oeste: 'O',
    perfecto: '¡En el sitio exacto!', cerca: 'Cerca — buena zona', fallo: 'Lejos de ahí',
    siguiente: 'Siguiente país →', verResultado: 'Ver resultado →',
    finPartida: 'Partida terminada', reintentar: '🌐 Nueva partida', volverMenu: '← Volver al menú',
    paisesLbl: 'Países', rachaLbl: 'Mejor racha',
    distanciaLbl: 'Distancia', capitalLbl: 'Capital',
  },
  en: {
    titulo: 'Coordinates',
    desc: 'Move latitude and longitude to where you think the requested country is and confirm. The closer on the real map, the more points.',
    volver: '← Back', empezar: 'Start! →',
    comoFunciona: 'How it works',
    paso1: 'A country is requested: move the two sliders (latitude and longitude) to mark it on the map',
    paso2: 'No rush, no clock — decide calmly and confirm once you are sure',
    paso3: 'The closer your mark is to the real spot, the more points. Too far, you lose a life',
    paso4: `You have ${VIDAS_INICIALES} lives — the game ends when they run out or after ${MAX_RONDAS} countries`,
    salir: '← Exit',
    confirmar: '📍 Confirm position',
    objetivo: 'Mark on the map:',
    latitud: 'Latitude', longitud: 'Longitude',
    norte: 'N', sur: 'S', este: 'E', oeste: 'W',
    perfecto: 'Right on the spot!', cerca: 'Close — good region', fallo: 'Way off',
    siguiente: 'Next country →', verResultado: 'See result →',
    finPartida: 'Game over', reintentar: '🌐 New game', volverMenu: '← Back to menu',
    paisesLbl: 'Countries', rachaLbl: 'Best streak',
    distanciaLbl: 'Distance', capitalLbl: 'Capital',
  },
  ca: {
    titulo: 'Coordenades',
    desc: 'Mou la latitud i la longitud fins on creguis que és el país demanat i confirma. Com més a prop al mapa real, més punts.',
    volver: '← Enrere', empezar: 'Comença! →',
    comoFunciona: 'Com funciona',
    paso1: 'Es demana un país: mou els dos sliders (latitud i longitud) per marcar-lo al mapa',
    paso2: 'Sense presses ni rellotge — decideix amb calma i confirma quan estiguis segur',
    paso3: 'Com més a prop estigui la teva marca de la real, més punts. Molt lluny, perds una vida',
    paso4: `Tens ${VIDAS_INICIALES} vides — la partida acaba si s'acaben o després de ${MAX_RONDAS} països`,
    salir: '← Sortir',
    confirmar: '📍 Confirma la posició',
    objetivo: 'Marca al mapa:',
    latitud: 'Latitud', longitud: 'Longitud',
    norte: 'N', sur: 'S', este: 'E', oeste: 'O',
    perfecto: 'Just al lloc exacte!', cerca: 'A prop — bona zona', fallo: 'Lluny d\'aquí',
    siguiente: 'Següent país →', verResultado: 'Veure resultat →',
    finPartida: 'Partida acabada', reintentar: '🌐 Nova partida', volverMenu: '← Torna al menú',
    paisesLbl: 'Països', rachaLbl: 'Millor ratxa',
    distanciaLbl: 'Distància', capitalLbl: 'Capital',
  },
}

function fmtCoord(v, pos, neg) {
  return `${Math.abs(Math.round(v))}° ${v >= 0 ? pos : neg}`
}

// ── Mapa con marcador(es) ────────────────────────────────────────────────────
// Durante 'jugando' solo se ve la marca del jugador moviéndose — el país
// real y la línea de distancia se revelan solo tras confirmar.
function MapaCoordenadas({ guessLat, guessLon, real, revelado }) {
  const color = !revelado ? '#EDAE49'
    : real.resultado === 'perfecto' ? '#4ade80'
    : real.resultado === 'cerca' ? '#facc15'
    : '#f87171'

  return (
    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 bg-[#0b1030]">
      <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400} style={{ width: '100%', height: '100%' }}>
        <Graticule stroke="#ffffff12" step={[30, 30]} />
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo}
              fill="#1b2447" stroke="#ffffff1f" strokeWidth={0.5}
              style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }} />
          ))}
        </Geographies>

        {revelado && (
          <Line from={[guessLon, guessLat]} to={[real.lon, real.lat]} stroke={color} strokeWidth={1} strokeDasharray="3 3" />
        )}

        <Marker coordinates={[guessLon, guessLat]}>
          <circle r={5} fill={color} stroke="#000" strokeWidth={1} />
        </Marker>

        {revelado && (
          <Marker coordinates={[real.lon, real.lat]}>
            <circle r={5} fill="#4ade80" stroke="#000" strokeWidth={1} />
            <circle r={9} fill="none" stroke="#4ade80" strokeWidth={1} opacity={0.5} />
          </Marker>
        )}
      </ComposableMap>
    </div>
  )
}

export default function Coordenadas() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = UI[l]

  const [fase, setFase]     = useState('intro') // intro | jugando | resultado | fin
  const [cola, setCola]     = useState([])
  const [pais, setPais]     = useState(null)
  const [vidas, setVidas]   = useState(VIDAS_INICIALES)
  const [puntos, setPuntos] = useState(0)
  const [racha, setRacha]   = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [rondas, setRondas] = useState(0)
  const [latVal, setLatVal] = useState(0)
  const [lonVal, setLonVal] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [saved, setSaved]   = useState(false)

  const gameStartRef = useRef(null)

  function iniciar() {
    const mazo = nuevoMazo()
    setPais(mazo[0])
    setCola(mazo.slice(1))
    setVidas(VIDAS_INICIALES)
    setPuntos(0)
    setRacha(0)
    setMejorRacha(0)
    setRondas(0)
    setFeedback(null)
    setSaved(false)
    setLatVal(0)
    setLonVal(0)
    setFase('jugando')
    gameStartRef.current = Date.now()
  }

  useEffect(() => {
    if (fase !== 'fin' || saved || !user) return
    setSaved(true)
    const timeSpent = gameStartRef.current ? Math.round((Date.now() - gameStartRef.current) / 1000) : 0
    saveActivity(user.uid, {
      type: 'juego', game: 'coordenadas', category: 'geografia',
      score: puntos, passed: rondas >= 5, timeSpent,
      coinsEarned: computeCoins('coordenadas', { score: puntos }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  function confirmar() {
    if (fase !== 'jugando' || !pais) return
    const km = distanciaKm(latVal, lonVal, pais.lat, pais.lon)
    const resultado = evaluarDistancia(km)
    const gano = resultado !== 'fallo'
    const base = resultado === 'perfecto' ? 100 : resultado === 'cerca' ? 50 : 0
    const bonus = resultado === 'perfecto' ? Math.min(racha * 10, 50) : 0
    const pts = base + bonus
    const nuevaRacha = resultado === 'perfecto' ? racha + 1 : 0
    const vidasRestantes = gano ? vidas : vidas - 1

    if (gano) setPuntos(p => p + pts)
    setRondas(r => r + 1)
    setRacha(nuevaRacha)
    setMejorRacha(m => Math.max(m, nuevaRacha))
    setVidas(vidasRestantes)
    setFeedback({ resultado, pts, vidasRestantes, pais, km: Math.round(km), guessLat: latVal, guessLon: lonVal })
    setFase('resultado')
  }

  function siguiente() {
    if (feedback && feedback.vidasRestantes <= 0) { setFase('fin'); return }
    if (rondas >= MAX_RONDAS || cola.length === 0) { setFase('fin'); return }
    setPais(cola[0])
    setCola(cola.slice(1))
    setFeedback(null)
    setLatVal(0)
    setLonVal(0)
    setFase('jugando')
  }

  const seo = {
    es: { title: 'Coordenadas — Sitúa el país en el mapa', desc: 'Mueve la latitud y la longitud hasta donde creas que está cada país y confirma. Aprende a leer coordenadas geográficas jugando, sin reloj ni reflejos. Juego de geografía gratis.', path: '/juegos/coordenadas' },
    en: { title: 'Coordinates — Place the country on the map', desc: 'Move latitude and longitude to where you think each country is and confirm. Learn to read geographic coordinates by playing, no clock or reflexes needed. Free geography game.', path: '/en/juegos/coordenadas' },
    ca: { title: 'Coordenades — Situa el país al mapa', desc: 'Mou la latitud i la longitud fins on creguis que és cada país i confirma. Aprèn a llegir coordenades geogràfiques jugant, sense rellotge ni reflexos. Joc de geografia gratis.', path: '/ca/juegos/coordenadas' },
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
            <span className="text-7xl block mb-4">🌐</span>
            <h1 className="text-4xl font-black text-white mb-2">{t.titulo}</h1>
            <p className="text-white/40">{t.desc}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 w-full">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t.comoFunciona}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ['🧭', t.paso1],
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
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {t.empezar}
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  if (fase === 'jugando' && pais) {
    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-2xl mx-auto w-full">
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
          <FlagImg bandera={pais.bandera} /> {l === 'en' && pais.nombreEn ? pais.nombreEn : pais.nombre}
        </p>

        <MapaCoordenadas guessLat={latVal} guessLon={lonVal} real={null} revelado={false} />

        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>{t.latitud}</span>
            <span className="font-mono text-white">{fmtCoord(latVal, t.norte, t.sur)}</span>
          </div>
          <input type="range" min={-90} max={90} value={latVal}
            onChange={e => setLatVal(Number(e.target.value))}
            className="w-full accent-[#EDAE49]" />
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>{t.longitud}</span>
            <span className="font-mono text-white">{fmtCoord(lonVal, t.este, t.oeste)}</span>
          </div>
          <input type="range" min={-180} max={180} value={lonVal}
            onChange={e => setLonVal(Number(e.target.value))}
            className="w-full accent-[#EDAE49]" />
        </div>

        <button onClick={confirmar}
          className="w-full mt-5 py-5 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-amber-500/20">
          {t.confirmar}
        </button>
      </div>
    )
  }

  // ── RESULTADO ──────────────────────────────────────────────────────────────
  if (fase === 'resultado' && feedback) {
    const { resultado, pts, vidasRestantes, pais: p, km, guessLat, guessLon } = feedback
    const color = resultado === 'perfecto' ? 'text-green-400' : resultado === 'cerca' ? 'text-yellow-400' : 'text-red-400'
    return (
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-2xl mx-auto w-full">
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
        <p className="text-center text-white/40 text-sm mb-1">
          {t.objetivo} <FlagImg bandera={p.bandera} size={20} /> {l === 'en' && p.nombreEn ? p.nombreEn : p.nombre}
        </p>
        <p className="text-center text-white/30 text-xs mb-4">
          {t.distanciaLbl}: {km.toLocaleString()} km
        </p>

        <MapaCoordenadas guessLat={guessLat} guessLon={guessLon} real={{ ...p, resultado }} revelado={true} />

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4 text-sm text-white/60 leading-relaxed">
          <span className="font-semibold text-white/80">{t.capitalLbl}:</span> {p.capital}
          {p.famoso && <span> · {p.famoso}</span>}
        </div>

        <button onClick={siguiente}
          className="w-full mt-5 py-4 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg transition-all hover:scale-[1.02]">
          {vidasRestantes <= 0 || rondas >= MAX_RONDAS || cola.length === 0 ? t.verResultado : t.siguiente}
        </button>
      </div>
    )
  }

  // ── FIN ────────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const emoji = rondas >= MAX_RONDAS ? '🏆' : rondas >= 5 ? '🌐' : rondas >= 3 ? '🧭' : '🗺️'
    const shareText = l === 'en'
      ? `I placed ${rondas} countries and scored ${puntos.toLocaleString()} pts in Coordinates 🌐 — can you beat me? https://tuthor.es/juegos/coordenadas`
      : l === 'ca'
      ? `He situat ${rondas} països i he fet ${puntos.toLocaleString()} pts a Coordenades 🌐 — pots superar-me? https://tuthor.es/juegos/coordenadas`
      : `He situado ${rondas} países y conseguido ${puntos.toLocaleString()} pts en Coordenadas 🌐 — ¿puedes superarme? https://tuthor.es/juegos/coordenadas`
    return (
      <GameEndScreen
        game="coordenadas"
        emoji={emoji}
        title={t.finPartida}
        score={puntos}
        stats={[
          { label: t.paisesLbl, value: `${rondas}/${MAX_RONDAS}`, emoji: '🌐' },
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
