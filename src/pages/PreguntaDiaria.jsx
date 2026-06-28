import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getDailyStatus, saveDailyChallenge } from '../lib/activity'
import { getDesafioDeHoy } from '../data/preguntasDiarias'
import { PAISES, NOMBRES_PAISES, NOMBRES_PAISES_EN } from '../data/paises'
import AuthModal from '../components/AuthModal'
import CombinaNumeros from '../components/CombinaNumeros'
import WorldMap from '../components/WorldMap'

function GeoInput({ value, onChange, onSubmit, disabled, useEnglish }) {
  const [focused, setFocused] = useState(false)
  const [hlIdx, setHlIdx]     = useState(-1)
  const ref = useRef(null)
  const lista = useEnglish ? NOMBRES_PAISES_EN : NOMBRES_PAISES

  function normalize(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
  }

  const filtered = useMemo(() => {
    if (!value || value.length < 1) return []
    const norm = normalize(value)
    return lista.filter(n => normalize(n).includes(norm)).slice(0, 5)
  }, [value, lista])

  function select(name) {
    onChange(name); setFocused(false); setHlIdx(-1)
    setTimeout(() => onSubmit(name), 50)
  }

  function handleKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHlIdx(i => Math.min(i + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHlIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (hlIdx >= 0 && filtered[hlIdx]) select(filtered[hlIdx])
      else if (filtered.length === 1) select(filtered[0])
      else onSubmit(value)
    }
  }

  return (
    <div className="relative">
      <input ref={ref} type="text" value={value}
        onChange={e => { onChange(e.target.value); setHlIdx(-1) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onKeyDown={handleKey} disabled={disabled}
        placeholder={useEnglish ? 'Type a country…' : 'Escribe un país…'}
        className="w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-2.5 text-white placeholder:text-white/25 outline-none transition-colors disabled:opacity-40"
        autoComplete="off" />
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a2e] border border-white/20 rounded-xl overflow-hidden shadow-2xl max-h-40 overflow-y-auto">
          {filtered.map((name, i) => (
            <button key={name} onMouseDown={() => select(name)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                i === hlIdx ? 'bg-[#EDAE49]/20 text-[#EDAE49]' : 'text-white/70 hover:bg-white/10'
              }`}>{name}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PreguntaDiaria() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en'
  const ca = lang === 'ca'
  const [selected, setSelected]   = useState(null)
  const [answered, setAnswered]   = useState(false)
  const [dailyDone, setDailyDone] = useState(false)
  const [streak, setStreak]       = useState(0)
  const [loading, setLoading]     = useState(true)
  const [showAuth, setShowAuth]   = useState(false)
  const [showCoins, setShowCoins] = useState(false)

  const desafio    = getDesafioDeHoy()
  const esMate     = desafio.tipo === 'matematicas'
  const esPortada  = desafio.tipo === 'portada'
  const esGeoRush  = desafio.tipo === 'georush'
  const esNumPath  = desafio.tipo === 'numpath'
  const esGeoMapa  = desafio.tipo === 'geomapa'
  const pregunta   = desafio.tipo === 'trivia' ? desafio.pregunta : null
  const portadaHoy = desafio.tipo === 'portada' ? desafio.portada : null
  const paisHoy    = (desafio.tipo === 'georush' || desafio.tipo === 'geomapa') ? desafio.pais : null

  // GeoRush daily state
  const [geoInput, setGeoInput]     = useState('')
  const [geoPistaIdx, setGeoPistaIdx] = useState(0)
  const [geoFeedback, setGeoFeedback] = useState(null)

  const geoPistas = useMemo(() => {
    if (!paisHoy) return []
    const continentes = paisHoy.continente.split('/')
    const continenteTexto = continentes.length > 1 ? continentes.join(' y ') : paisHoy.continente
    return [
      { texto: `Está en el hemisferio ${paisHoy.hemisferio === 'ambos' ? 'norte y sur' : paisHoy.hemisferio}`, tipo: 'obligatoria' },
      { texto: `Su montaña más alta es ${paisHoy.montana}`, tipo: 'regalo' },
      { texto: `Está en ${continenteTexto}`, tipo: 'obligatoria' },
      { texto: `Se habla ${paisHoy.idioma}`, tipo: 'regalo' },
      { texto: `Un famoso de allí: ${paisHoy.famoso}`, tipo: 'regalo' },
    ]
  }, [paisHoy])

  useEffect(() => {
    if (!user) { setLoading(false); return }
    getDailyStatus(user.uid).then(({ done, streak: s }) => {
      setDailyDone(done); setStreak(s); setLoading(false)
    })
  }, [user])

  function triggerCoins() {
    setShowCoins(true)
    setTimeout(() => setShowCoins(false), 3000)
  }

  async function confirmar() {
    if (!selected || answered) return
    setAnswered(true)
    if (user) {
      const saved = await saveDailyChallenge(user.uid, selected === correct)
      if (saved) { setStreak(s => s + 1); triggerCoins() }
    }
  }

  async function confirmarPortada(respuesta) {
    if (answered) return
    setSelected(respuesta ? 'true' : 'false')
    setAnswered(true)
    if (user) {
      const correcto = respuesta === portadaHoy.veracidad
      const saved    = await saveDailyChallenge(user.uid, correcto)
      if (saved) { setStreak(s => s + 1); triggerCoins() }
    }
  }

  function normalize(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
  }

  async function handleGeoSubmit(val) {
    const nombreInput = val || geoInput
    if (answered) return
    const paisResp = PAISES.find(p => p.nombre === nombreInput)
    if (!paisResp) {
      setGeoFeedback({ ok: false, msg: ca ? 'País no reconegut' : en ? 'Country not recognised' : 'País no reconocido' })
      setTimeout(() => setGeoFeedback(null), 1200)
      return
    }
    if (nombreInput === paisHoy.nombre) {
      setAnswered(true)
      setGeoFeedback({ ok: true, msg: `🎉 ${ca ? '' : '¡'}${paisHoy.nombre}!` })
      if (user) {
        const saved = await saveDailyChallenge(user.uid, true)
        if (saved) { setStreak(s => s + 1); triggerCoins() }
      }
      return
    }
    // Advance to next clue
    setGeoInput('')
    setGeoFeedback({ ok: false, msg: ca ? `No és ${nombreInput}` : en ? `Not ${nombreInput}` : `No es ${nombreInput}` })
    setTimeout(() => {
      setGeoFeedback(null)
      if (geoPistaIdx + 1 < geoPistas.length) {
        setGeoPistaIdx(i => i + 1)
      } else {
        setAnswered(true)
        setGeoFeedback({ ok: false, msg: ca ? `Era ${paisHoy.nombre}` : en ? `It was ${paisHoy.nombre}` : `Era ${paisHoy.nombre}` })
        if (user) saveDailyChallenge(user.uid, false)
      }
    }, 1000)
  }

  async function handleGeoMapaSubmit(val) {
    const nombreInput = val || geoInput
    if (answered) return
    const getName = p => (en && p.nombreEn) ? p.nombreEn : p.nombre
    const paisResp = PAISES.find(p => getName(p) === nombreInput)
    if (!paisResp) {
      setGeoFeedback({ ok: false, msg: ca ? 'País no reconegut' : en ? 'Country not recognised' : 'País no reconocido' })
      setTimeout(() => setGeoFeedback(null), 1200)
      return
    }
    if (paisResp.nombre === paisHoy.nombre) {
      setAnswered(true)
      setGeoFeedback({ ok: true, msg: `🎉 ${getName(paisHoy)}!` })
      if (user) {
        const saved = await saveDailyChallenge(user.uid, true)
        if (saved) { setStreak(s => s + 1); triggerCoins() }
      }
      return
    }
    setGeoInput('')
    setGeoFeedback({ ok: false, msg: ca ? `No és ${nombreInput}` : en ? `Not ${nombreInput}` : `No es ${nombreInput}` })
    setTimeout(() => {
      setGeoFeedback(null)
      if (geoPistaIdx < 2) {
        setGeoPistaIdx(i => i + 1)
      } else {
        setAnswered(true)
        setGeoFeedback({ ok: false, msg: ca ? `Era ${getName(paisHoy)}` : en ? `It was ${getName(paisHoy)}` : `Era ${getName(paisHoy)}` })
        if (user) saveDailyChallenge(user.uid, false)
      }
    }, 1000)
  }

  async function handleMathFinish(result) {
    setAnswered(true)
    if (user) {
      const saved = await saveDailyChallenge(user.uid, result.passed)
      if (saved) { setStreak(s => s + 1); triggerCoins() }
    }
  }

  const correct = en ? (pregunta?.correctaEn || pregunta?.correcta) : pregunta?.correcta

  return (
    <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {/* Coin reward notification */}
      {showCoins && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
          <div className="bg-amber-500 text-black font-black text-lg px-6 py-3 rounded-2xl shadow-2xl shadow-amber-500/50 flex items-center gap-2">
            <span className="text-2xl">💰</span>
            +1.000 {ca ? 'monedes' : en ? 'coins' : 'monedas'}
          </div>
        </div>
      )}

      <div className="max-w-lg w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

        {/* Cabecera */}
        <div className="bg-gradient-to-r from-orange-500 to-rose-600 px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs font-medium">{ca ? 'Repte d\'avui' : en ? "Today's challenge" : 'Reto de hoy'}</p>
              <h2 className="text-2xl font-black text-white mt-0.5">{ca ? 'Repte Diari' : en ? 'Daily Challenge' : 'Pregunta Diaria'}</h2>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-xs">{ca ? 'Ratxa diària' : en ? 'Daily streak' : 'Racha diaria'}</p>
              <p className="text-3xl font-black text-white">🔥 {streak}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-white/30 text-sm">{ca ? 'Carregant...' : en ? 'Loading...' : 'Cargando...'}</div>
        ) : dailyDone ? (
          /* ── Ya completado hoy ── */
          <div className="px-6 sm:px-8 py-10 text-center">
            <p className="text-5xl mb-4">✅</p>
            <h3 className="text-xl font-black text-white mb-2">{ca ? 'Ja ho has fet avui!' : en ? 'Already done today!' : '¡Ya lo hiciste hoy!'}</h3>
            <p className="text-white/40 text-sm mb-6">{ca ? 'Torna demà per un nou repte i mantenir la ratxa.' : en ? 'Come back tomorrow for a new challenge.' : 'Vuelve mañana para un nuevo reto y seguir tu racha.'}</p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
              <p className="text-amber-400 font-bold text-lg">🔥 {streak} {ca ? (streak === 1 ? 'dia' : 'dies') : en ? (streak === 1 ? 'day' : 'days') : (streak === 1 ? 'día' : 'días')} {ca ? 'seguits' : en ? 'in a row' : 'seguidos'}</p>
              <p className="text-white/30 text-xs mt-1">{ca ? 'No trenquis la ratxa!' : en ? "Don't break the streak!" : '¡No rompas la racha!'}</p>
            </div>
          </div>
        ) : esPortada ? (
          /* ── Portada histórica ── */
          <>
            <div className="px-6 sm:px-8 py-4">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                {ca ? '📰 Portada històrica · Veritat o mentida?' : en ? '📰 Historical headline · True or false?' : '📰 Portada histórica · ¿Verdad o mentira?'}
              </p>
              {/* Mini portada */}
              <div
                className="bg-[#f5f0e3] rounded-xl overflow-hidden border border-[#c8b89a] shadow-lg mb-4"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                <div className="h-2 bg-gray-900" />
                <div className="px-4 pt-2 pb-2 border-b-2 border-gray-800 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-gray-500">{portadaHoy.lugar} · {portadaHoy.mes}</p>
                  <h2 className="text-base font-black uppercase tracking-wide text-gray-900 leading-tight">{portadaHoy.periodico}</h2>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-black text-gray-900 leading-snug mb-2">{(en && portadaHoy.titularEn) || portadaHoy.titular}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-200 pt-2">{(en && portadaHoy.subtitularEn) || portadaHoy.subtitular}</p>
                </div>
                <div className="h-1.5 bg-gray-900 mx-4 mb-3 rounded-sm" />
              </div>

              {!answered ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => confirmarPortada(true)}
                    className="py-4 bg-green-700 hover:bg-green-600 text-white font-black text-lg rounded-xl transition-all active:scale-95"
                  >
                    {ca ? '✓ VERITAT' : en ? '✓ TRUE' : '✓ VERDAD'}
                  </button>
                  <button
                    onClick={() => confirmarPortada(false)}
                    className="py-4 bg-red-700 hover:bg-red-600 text-white font-black text-lg rounded-xl transition-all active:scale-95"
                  >
                    {ca ? '✗ MENTIDA' : en ? '✗ FALSE' : '✗ MENTIRA'}
                  </button>
                </div>
              ) : (
                <>
                  <div className={`text-center py-3 rounded-xl font-bold mb-3 ${
                    (selected === 'true') === portadaHoy.veracidad
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {(selected === 'true') === portadaHoy.veracidad
                      ? (ca ? `🎉 Correcte! Era ${portadaHoy.veracidad ? 'VERITAT' : 'MENTIDA'}` : en ? `🎉 Correct! It was ${portadaHoy.veracidad ? 'TRUE' : 'FALSE'}` : `🎉 ¡Correcto! Era ${portadaHoy.veracidad ? 'VERDAD' : 'MENTIRA'}`)
                      : (ca ? `❌ Era ${portadaHoy.veracidad ? 'VERITAT' : 'MENTIDA'}` : en ? `❌ It was ${portadaHoy.veracidad ? 'TRUE' : 'FALSE'}` : `❌ Era ${portadaHoy.veracidad ? 'VERDAD' : 'MENTIRA'}`)
                    }
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-white/60 text-sm leading-relaxed">💡 {(en && portadaHoy.explicacionEn) || portadaHoy.explicacion}</p>
                  </div>
                  {!user && (
                    <button onClick={() => setShowAuth(true)} className="mt-3 w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-amber-500/30 transition-colors">
                      {ca ? 'Inicia sessió per guardar la ratxa 🔥' : en ? 'Sign in to save your streak 🔥' : 'Inicia sesión para guardar tu racha 🔥'}
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="px-6 sm:px-8 pb-6">
              <p className="text-center text-white/20 text-xs">{ca ? 'Nova portada demà · Torna cada dia' : en ? 'New headline tomorrow · Come back every day' : 'Nueva portada mañana · Vuelve cada día'}</p>
            </div>
          </>
        ) : esNumPath ? (
          /* ── NumPath daily ── */
          <>
            <div className="px-6 sm:px-8 py-6 text-center">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                🧮 NumPath
              </p>
              <p className="text-white/60 text-sm mb-6">
                {ca ? 'Resol un tauler en 30 segons. Navega fins a una meta amb la puntuació exacta.' : en ? 'Solve one grid in 30 seconds. Navigate to a goal with the exact score.' : 'Resuelve un tablero en 30 segundos. Navega hasta una meta con la puntuación exacta.'}
              </p>
              {!answered ? (
                <button
                  onClick={() => { navigate(localPath('/juegos/numpath'), { state: { modoDaily: true } }) }}
                  className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 rounded-xl transition-all text-lg"
                >
                  {ca ? 'Jugar NumPath →' : en ? 'Play NumPath →' : 'Jugar NumPath →'}
                </button>
              ) : (
                <div className="bg-green-500/20 text-green-400 font-bold py-3 rounded-xl">
                  {ca ? '✓ Completat' : en ? '✓ Completed' : '✓ Completado'}
                </div>
              )}
            </div>
            <div className="px-6 sm:px-8 pb-6">
              <p className="text-center text-white/20 text-xs">{ca ? 'Nou repte demà · Torna cada dia' : en ? 'New challenge tomorrow · Come back every day' : 'Nuevo reto mañana · Vuelve cada día'}</p>
            </div>
          </>
        ) : esGeoMapa ? (
          /* ── GeoMapa daily ── */
          <>
            <div className="px-6 sm:px-8 py-4">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                {ca ? '🗺️ Identifica el país · GeoMapa' : en ? '🗺️ Identify the country · GeoMap' : '🗺️ Identifica el país · GeoMapa'}
              </p>
              <div className="bg-black/40 border border-white/10 rounded-xl p-2 mb-4">
                <WorldMap highlight={paisHoy?.iso || ''} highlightColor="#EDAE49" baseColor="#1e293b" borderColor="#0f172a" className="rounded-lg overflow-hidden" />
              </div>
              {!answered ? (
                <>
                  {geoPistaIdx >= 1 && paisHoy?.bandera && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-3 text-center">
                      <img src={`https://flagcdn.com/w80/${[...paisHoy.bandera].map(c => String.fromCharCode(c.codePointAt(0) - 0x1F1E6 + 65)).join('').toLowerCase()}.png`} alt="" width={48} height={36} className="inline-block rounded shadow mb-1" />
                      <p className="text-white/50 text-xs">{ca ? 'Pista: bandera' : en ? 'Hint: flag' : 'Pista: bandera'}</p>
                    </div>
                  )}
                  {geoPistaIdx >= 2 && paisHoy?.capital && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-3 text-center">
                      <p className="text-white font-bold">{en && paisHoy.capitalEn ? paisHoy.capitalEn : paisHoy.capital}</p>
                      <p className="text-white/50 text-xs">{ca ? 'Pista: capital' : en ? 'Hint: capital' : 'Pista: capital'}</p>
                    </div>
                  )}
                  {geoFeedback && (
                    <div className={`text-center py-2 px-3 rounded-xl mb-3 text-sm font-bold ${geoFeedback.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {geoFeedback.msg}
                    </div>
                  )}
                  <GeoInput value={geoInput} onChange={setGeoInput} onSubmit={handleGeoMapaSubmit} disabled={answered} useEnglish={en} />
                  <p className="text-center text-white/20 text-xs mt-2">{ca ? 'Intent' : en ? 'Attempt' : 'Intento'} {geoPistaIdx + 1}/3</p>
                </>
              ) : (
                <div className={`text-center py-3 rounded-xl font-bold ${geoFeedback?.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {geoFeedback?.msg}
                </div>
              )}
            </div>
            <div className="px-6 sm:px-8 pb-6">
              <p className="text-center text-white/20 text-xs">{ca ? 'Nou repte demà · Torna cada dia' : en ? 'New challenge tomorrow · Come back every day' : 'Nuevo reto mañana · Vuelve cada día'}</p>
            </div>
          </>
        ) : esGeoRush ? (
          /* ── Adivina el país ── */
          <>
            <div className="px-6 sm:px-8 py-4">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                {ca ? '🌍 Endevina el país · GeoRush' : en ? '🌍 Guess the country · GeoRush' : '🌍 Adivina el país · GeoRush'}
              </p>
              {/* Pistas */}
              <div className="space-y-2 mb-4">
                {geoPistas.slice(0, geoPistaIdx + 1).map((p, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    i === geoPistaIdx && !answered
                      ? 'bg-[#EDAE49]/15 border border-[#EDAE49]/40 text-white'
                      : 'bg-white/5 border border-white/10 text-white/50'
                  }`}>
                    <span className="text-xs">{p.tipo === 'regalo' ? '🎁' : '🔒'}</span>
                    <span>{p.texto}</span>
                  </div>
                ))}
                {!answered && geoPistas.slice(geoPistaIdx + 1).map((_, i) => (
                  <div key={`l-${i}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-white/3 border border-white/5 text-white/15">
                    <span className="text-xs opacity-40">{geoPistas[geoPistaIdx + 1 + i]?.tipo === 'regalo' ? '🎁' : '🔒'}</span>
                    <span>{ca ? 'Pista oculta' : en ? 'Hidden clue' : 'Pista oculta'}</span>
                  </div>
                ))}
              </div>

              {!answered ? (
                <>
                  <div className="relative mb-3">
                    <GeoInput value={geoInput} onChange={setGeoInput} onSubmit={handleGeoSubmit} disabled={!!geoFeedback} useEnglish={en} />
                  </div>
                  {geoFeedback && (
                    <div className={`text-center py-2 rounded-xl font-bold text-sm mb-2 ${geoFeedback.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {geoFeedback.msg}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className={`text-center py-3 rounded-xl font-bold mb-3 ${
                    geoFeedback?.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {geoFeedback?.msg}
                  </div>
                  {!user && (
                    <button onClick={() => setShowAuth(true)} className="mt-3 w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-amber-500/30 transition-colors">
                      {ca ? 'Inicia sessió per guardar la ratxa 🔥' : en ? 'Sign in to save your streak 🔥' : 'Inicia sesión para guardar tu racha 🔥'}
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="px-6 sm:px-8 pb-6">
              <p className="text-center text-white/20 text-xs">{ca ? 'Nou país demà · Torna cada dia' : en ? 'New country tomorrow · Come back every day' : 'Nuevo país mañana · Vuelve cada día'}</p>
            </div>
          </>
        ) : esMate ? (
          /* ── Reto de cálculo mental (mismo motor que Acércate, sin selección) ── */
          <>
            <div className="px-6 sm:px-8 py-6">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                {desafio.modo.emoji} {en ? (desafio.modo.tituloEn || desafio.modo.titulo) : desafio.modo.titulo} · {en ? (desafio.grado.labelEn || desafio.grado.label) : desafio.grado.label}
              </p>
              <CombinaNumeros
                ops={desafio.modo.ops}
                cfg={desafio.grado}
                nivelLabel={{ emoji: desafio.grado.emoji, label: en ? (desafio.grado.labelEn || desafio.grado.label) : desafio.grado.label }}
                onFinish={handleMathFinish}
              />
            </div>
            <div className="px-6 sm:px-8 pb-8">
              {!answered && !user && (
                <p className="text-center text-white/30 text-xs">
                  <button onClick={() => setShowAuth(true)} className="underline hover:text-white/60">{ca ? 'Inicia sessió' : en ? 'Sign in' : 'Inicia sesión'}</button> {ca ? 'per guardar la ratxa' : en ? 'to save your streak' : 'para guardar tu racha'}
                </p>
              )}
              {answered && !user && (
                <button onClick={() => setShowAuth(true)} className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-amber-500/30 transition-colors">
                  {ca ? 'Inicia sessió per guardar la ratxa 🔥' : en ? 'Sign in to save your streak 🔥' : 'Inicia sesión para guardar tu racha 🔥'}
                </button>
              )}
              <p className="text-center text-white/20 text-xs mt-4">{ca ? 'Nou repte demà · Torna cada dia' : en ? 'New challenge tomorrow · Come back every day' : 'Nuevo reto mañana · Vuelve cada día'}</p>
            </div>
          </>
        ) : (
          /* ── Pregunta de trivia ── */
          <>
            <div className="px-6 sm:px-8 py-6">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">{en ? (pregunta.categoriaEn || pregunta.categoria) : pregunta.categoria}</p>
              <h3 className="text-xl font-bold text-white leading-snug mb-6">{en ? (pregunta.preguntaEn || pregunta.pregunta) : pregunta.pregunta}</h3>
              <div className="grid grid-cols-2 gap-3">
                {(en ? (pregunta.opcionesEn || pregunta.opciones) : pregunta.opciones).map(op => (
                  <button
                    key={op}
                    onClick={() => !answered && setSelected(op)}
                    className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all text-left
                      ${answered
                        ? op === correct
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : op === selected && selected !== correct
                            ? 'border-red-500 bg-red-500/20 text-red-400'
                            : 'border-white/10 text-white/30'
                        : selected === op
                          ? 'border-violet-500 bg-violet-500/20 text-white'
                          : 'border-white/10 text-white/70 hover:border-violet-400 hover:bg-violet-500/10'
                      }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-8">
              {!answered ? (
                <>
                  <button
                    onClick={confirmar}
                    disabled={!selected}
                    className="w-full bg-violet-600 disabled:opacity-30 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition-colors disabled:cursor-not-allowed"
                  >
                    {ca ? 'Confirmar resposta →' : en ? 'Confirm answer →' : 'Confirmar respuesta →'}
                  </button>
                  {!user && (
                    <p className="text-center text-white/30 text-xs mt-3">
                      <button onClick={() => setShowAuth(true)} className="underline hover:text-white/60">{ca ? 'Inicia sessió' : en ? 'Sign in' : 'Inicia sesión'}</button> {ca ? 'per guardar la ratxa' : en ? 'to save your streak' : 'para guardar tu racha'}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className={`text-center py-3 rounded-xl font-bold mb-3 ${selected === correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {selected === correct ? (ca ? '🎉 Correcte!' : en ? '🎉 Correct!' : '🎉 ¡Correcto!') : (ca ? `❌ Era: ${correct}` : en ? `❌ It was: ${correct}` : `❌ Era: ${correct}`)}
                  </div>
                  {(pregunta.explicacion || pregunta.explicacionEn) && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white/60 text-sm leading-relaxed">💡 {en ? (pregunta.explicacionEn || pregunta.explicacion) : pregunta.explicacion}</p>
                    </div>
                  )}
                  {!user && (
                    <button onClick={() => setShowAuth(true)} className="mt-4 w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-amber-500/30 transition-colors">
                      {ca ? 'Inicia sessió per guardar la ratxa 🔥' : en ? 'Sign in to save your streak 🔥' : 'Inicia sesión para guardar tu racha 🔥'}
                    </button>
                  )}
                </>
              )}
              <p className="text-center text-white/20 text-xs mt-4">{ca ? 'Nova pregunta demà · Torna cada dia' : en ? 'New question tomorrow · Come back every day' : 'Nueva pregunta mañana · Vuelve cada día'}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
