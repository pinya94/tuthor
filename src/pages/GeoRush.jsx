import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAISES, NOMBRES_PAISES } from '../data/paises'

const DIFS = {
  facil:   { label: 'Fácil',   emoji: '🟢', tiempoInicio: 90,  obligatorio: false },
  medio:   { label: 'Medio',   emoji: '🟡', tiempoInicio: 60,  obligatorio: true },
  dificil: { label: 'Difícil', emoji: '🔴', tiempoInicio: 40,  obligatorio: true },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generarPistasBase(pais) {
  const pistas = []

  pistas.push({ tipo: 'hemisferio', texto: `Está en el hemisferio ${pais.hemisferio === 'ambos' ? 'norte y sur (cruza el ecuador)' : pais.hemisferio}`, validar: r => {
    const p = PAISES.find(p => p.nombre === r)
    if (!p) return false
    if (pais.hemisferio === 'ambos') return true
    return p.hemisferio === pais.hemisferio || p.hemisferio === 'ambos'
  }})

  pistas.push({ tipo: 'continente', texto: `Está en ${pais.continente}`, validar: r => PAISES.find(p => p.nombre === r)?.continente === pais.continente })

  const areaRef = pais.area > 500000 ? 500000 : pais.area > 100000 ? 100000 : 50000
  const masOMenos = pais.area >= areaRef ? 'más' : 'menos'
  pistas.push({ tipo: 'area', texto: `Tiene ${masOMenos} de ${areaRef.toLocaleString()} km²`, validar: r => {
    const p = PAISES.find(p => p.nombre === r)
    return p && (masOMenos === 'más' ? p.area >= areaRef : p.area < areaRef)
  }})

  const pobRef = pais.poblacion > 100000000 ? 100000000 : pais.poblacion > 50000000 ? 50000000 : 20000000
  const masPob = pais.poblacion >= pobRef ? 'más' : 'menos'
  pistas.push({ tipo: 'poblacion', texto: `Tiene ${masPob} de ${(pobRef / 1000000).toFixed(0)} millones de habitantes`, validar: r => {
    const p = PAISES.find(p => p.nombre === r)
    return p && (masPob === 'más' ? p.poblacion >= pobRef : p.poblacion < pobRef)
  }})

  const guerraTexto = pais.guerras === 'ambas' ? 'Participó en la I y II Guerra Mundial'
    : pais.guerras === 'I' ? 'Participó en la I Guerra Mundial (pero no en la II)'
    : pais.guerras === 'II' ? 'Participó en la II Guerra Mundial (pero no en la I)'
    : 'No participó en ninguna guerra mundial'
  pistas.push({ tipo: 'guerras', texto: guerraTexto, validar: r => PAISES.find(p => p.nombre === r)?.guerras === pais.guerras })

  return pistas
}

function generarPistasFinales(pais) {
  return [
    { emoji: '⛰️', texto: `Montaña más alta: ${pais.montana}` },
    { emoji: '🏞️', texto: `Río más largo: ${pais.rio}` },
    { emoji: '🗣️', texto: `Idioma: ${pais.idioma}` },
    { emoji: '⭐', texto: `Famoso: ${pais.famoso}` },
  ]
}

function normalize(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

function AutocompleteInput({ value, onChange, onSubmit, paises, disabled }) {
  const [focused, setFocused] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const inputRef = useRef(null)

  const filtered = useMemo(() => {
    if (!value || value.length < 1) return []
    const norm = normalize(value)
    return paises.filter(n => normalize(n).includes(norm)).slice(0, 6)
  }, [value, paises])

  function select(name) {
    onChange(name)
    setFocused(false)
    setHighlightIdx(-1)
    setTimeout(() => onSubmit(name), 50)
  }

  function handleKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightIdx >= 0 && filtered[highlightIdx]) select(filtered[highlightIdx])
      else if (filtered.length === 1) select(filtered[0])
      else onSubmit(value)
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); setHighlightIdx(-1) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onKeyDown={handleKey}
        disabled={disabled}
        placeholder="Escribe un país…"
        className="w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/25 outline-none transition-colors disabled:opacity-40"
        autoComplete="off"
      />
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a2e] border border-white/20 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
          {filtered.map((name, i) => (
            <button key={name} onMouseDown={() => select(name)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                i === highlightIdx ? 'bg-[#EDAE49]/20 text-[#EDAE49]' : 'text-white/70 hover:bg-white/10'
              }`}>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function BotonesSkip({ saltarGratis, onSaltarGratis, onSaltar }) {
  return (
    <div className="flex gap-2">
      {saltarGratis > 0 && (
        <button onClick={onSaltarGratis}
          className="flex-1 py-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-xl transition-colors">
          ⏭️ Saltar gratis ({saltarGratis})
        </button>
      )}
      <button onClick={onSaltar}
        className={`${saltarGratis > 0 ? 'flex-1' : 'w-full'} py-2 text-white/30 hover:text-white/50 text-sm transition-colors`}>
        Saltar país (−10s)
      </button>
    </div>
  )
}

export default function GeoRush() {
  const navigate = useNavigate()
  const [fase, setFase]         = useState('intro')
  const [difId, setDifId]       = useState('medio')
  const [timeLeft, setTimeLeft] = useState(60)
  const [puntos, setPuntos]     = useState(0)
  const [paisesAcertados, setPaisesAcertados] = useState(0)
  const [levelKey, setLevelKey] = useState(0)

  const [paisActual, setPaisActual]       = useState(null)
  const [pistasBase, setPistasBase]       = useState([])
  const [pistasFinales, setPistasFinales] = useState([])
  const [pistaIdx, setPistaIdx]           = useState(0)
  const [finalIdx, setFinalIdx]           = useState(0)
  const [pistaExtraAlInicio, setPistaExtraAlInicio] = useState(false)
  const [saltarGratis, setSaltarGratis]   = useState(0)
  const [inputVal, setInputVal]           = useState('')
  const [feedback, setFeedback]           = useState(null)
  const [faseRonda, setFaseRonda]         = useState('pista')
  const [paisesUsados, setPaisesUsados]   = useState([])
  const [combo, setCombo]                 = useState(0)
  const [maxCombo, setMaxCombo]           = useState(0)
  const [pistasRevealedTotal, setPistasRevealedTotal] = useState(0)

  const timerRef  = useRef(null)
  const tiempoRef = useRef(60)

  const dif = DIFS[difId]

  useEffect(() => {
    if (fase !== 'jugando') return
    if (faseRonda === 'recompensa' || faseRonda === 'fallado') return

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
  }, [fase, levelKey, faseRonda])

  function iniciar(selectedDif) {
    const d = DIFS[selectedDif]
    setDifId(selectedDif)
    setTimeLeft(d.tiempoInicio)
    tiempoRef.current = d.tiempoInicio
    setPuntos(0)
    setPaisesAcertados(0)
    setPaisesUsados([])
    setCombo(0)
    setMaxCombo(0)
    setPistaExtraAlInicio(false)
    setSaltarGratis(0)
    setFase('jugando')
    siguientePais([], selectedDif)
  }

  function siguientePais(usados) {
    const disponibles = PAISES.filter(p => !usados.includes(p.nombre))
    if (disponibles.length === 0) { setFase('fin'); return }
    const pais = disponibles[Math.floor(Math.random() * disponibles.length)]

    setPaisActual(pais)
    setPistasBase(generarPistasBase(pais))
    setPistasFinales(shuffle(generarPistasFinales(pais)))
    setPistaIdx(0)
    setFinalIdx(0)
    setInputVal('')
    setFeedback(null)
    setPistasRevealedTotal(0)
    setFaseRonda(pistaExtraAlInicio ? 'finales' : 'pista')
    if (pistaExtraAlInicio) setPistasRevealedTotal(5)
    setPaisesUsados(u => [...u, pais.nombre])
    setLevelKey(k => k + 1)
  }

  function calcPuntos(nuevoCombo) {
    const basePts = Math.max(50, 200 - pistasRevealedTotal * 15)
    const comboPts = nuevoCombo * 25
    const mult = difId === 'dificil' ? 1.5 : difId === 'medio' ? 1.2 : 1
    return Math.round((basePts + comboPts) * mult)
  }

  function handleRespuestaPista(val) {
    const nombreInput = val || inputVal
    const pista = pistasBase[pistaIdx]
    if (!pista) return
    const paisResp = PAISES.find(p => p.nombre === nombreInput)
    if (!paisResp) {
      setFeedback({ ok: false, msg: 'País no reconocido' })
      setTimeout(() => setFeedback(null), 1200)
      return
    }
    if (nombreInput === paisActual.nombre) {
      acertarPais()
      return
    }

    const esFacil = !dif.obligatorio

    if (pista.validar(nombreInput)) {
      setFeedback({ ok: true, msg: `✓ ${nombreInput} cumple la pista` })
      setInputVal('')
      setPistasRevealedTotal(n => n + 1)
      setTimeout(() => { setFeedback(null); avanzarPista() }, 800)
    } else if (esFacil) {
      setFeedback({ ok: 'neutral', msg: `${nombreInput} no cumple, pero avanzamos` })
      setInputVal('')
      setPistasRevealedTotal(n => n + 1)
      setTimeout(() => { setFeedback(null); avanzarPista() }, 1000)
    } else {
      setFeedback({ ok: false, msg: `✗ ${nombreInput} no cumple esta pista` })
      setInputVal('')
      setTimeout(() => setFeedback(null), 1200)
    }
  }

  function avanzarPista() {
    if (pistaIdx + 1 < pistasBase.length) {
      setPistaIdx(i => i + 1)
    } else {
      setFaseRonda('finales')
    }
  }

  function avanzarFinal() {
    setPistasRevealedTotal(n => n + 1)
    if (finalIdx + 1 < pistasFinales.length) {
      setFinalIdx(i => i + 1)
    } else {
      setFaseRonda('adivinar')
    }
  }

  function handleAdivinar(val) {
    const nombreInput = val || inputVal
    const paisResp = PAISES.find(p => p.nombre === nombreInput)
    if (!paisResp) {
      setFeedback({ ok: false, msg: 'País no reconocido' })
      setTimeout(() => setFeedback(null), 1200)
      return
    }
    if (nombreInput === paisActual.nombre) {
      acertarPais()
    } else if (faseRonda === 'finales' && finalIdx + 1 < pistasFinales.length) {
      setFeedback({ ok: 'neutral', msg: `No es ${nombreInput} — siguiente pista` })
      setInputVal('')
      setTimeout(() => {
        setFeedback(null)
        avanzarFinal()
      }, 1000)
    } else {
      setCombo(0)
      setFeedback({ ok: false, msg: `❌ Era ${paisActual.nombre}` })
      setFaseRonda('fallado')
    }
  }

  function acertarPais() {
    clearInterval(timerRef.current)
    const nuevoCombo = combo + 1
    setMaxCombo(m => Math.max(m, nuevoCombo))
    const pts = calcPuntos(nuevoCombo)
    setPuntos(p => p + pts)
    setPaisesAcertados(n => n + 1)
    setCombo(nuevoCombo)
    setFeedback({ ok: true, msg: `🎉 ¡${paisActual.nombre}! +${pts} pts` })
    setFaseRonda('recompensa')
  }

  function elegirRecompensa(tipo) {
    if (tipo === 'tiempo') {
      tiempoRef.current += 10
      setTimeLeft(tiempoRef.current)
    } else if (tipo === 'pistaExtra') {
      setPistaExtraAlInicio(true)
    } else if (tipo === 'bonus') {
      setPuntos(p => p + 150)
    } else if (tipo === 'saltar') {
      setSaltarGratis(n => n + 1)
    }
    setFeedback(null)
    siguientePais(paisesUsados)
  }

  function usarSaltarGratis() {
    setSaltarGratis(n => n - 1)
    setCombo(0)
    siguientePais(paisesUsados)
  }

  function saltarPais() {
    setCombo(0)
    tiempoRef.current = Math.max(0, tiempoRef.current - 10)
    setTimeLeft(tiempoRef.current)
    if (tiempoRef.current <= 0) { setFase('fin'); return }
    siguientePais(paisesUsados)
  }

  function continuarTrasFallo() {
    tiempoRef.current = Math.max(0, tiempoRef.current - 10)
    setTimeLeft(tiempoRef.current)
    if (tiempoRef.current <= 0) { setFase('fin'); return }
    siguientePais(paisesUsados)
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-xl w-full">
          <button onClick={() => navigate('/juegos')}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            ← Volver
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🌍</span>
            <h1 className="text-4xl font-black text-white mb-2">GeoRush</h1>
            <p className="text-white/40">Descubre el país misterioso a partir de pistas geográficas</p>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-6 w-fit mx-auto">
            {Object.entries(DIFS).map(([id, d]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {d.emoji} {d.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Reglas</p>
              {[
                ['⏱️', 'Tiempo', `${d.tiempoInicio}s (continuo)`],
                ['🔍', 'Pistas', `5 + 4 finales (una a una)`],
                ['❌', 'Fallar/saltar', '−10s'],
                ['📊', 'Puntos', 'Menos pistas = más puntos'],
              ].map(([e, k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2">
                  <span className="text-white/40 shrink-0">{e} {k}</span>
                  <span className="text-white font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Al acertar, elige</p>
              {[
                ['⏱️', '+10 segundos'],
                ['💡', 'Pista extra al inicio'],
                ['⏭️', 'Saltar gratis (acumulable)'],
                ...(difId === 'dificil' ? [['✨', '+150 pts bonus']] : []),
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-7">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Cómo funciona</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['🔍', 'Recibes pistas sobre un país misterioso'],
                ['✏️', 'Responde con un país que cumpla cada pista'],
                ['💡', 'Las pistas finales se revelan una a una'],
                ['🏆', 'Adivina pronto para más puntos'],
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
            ¡Empezar! →
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const shareText = `🌍 GeoRush: ${paisesAcertados} países · ${puntos.toLocaleString()} pts\n${dif.emoji} Modo ${dif.label} · Racha máx: ${maxCombo}\n🎮 https://www.tuthor.es/juegos/georush`
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-lg w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
            <div className="text-6xl mb-3">🌍</div>
            <h2 className="text-3xl font-black text-white mb-1">¡Tiempo agotado!</h2>
            <p className="text-white/40 mb-6">Modo {dif.emoji} {dif.label}</p>
            <div className="mb-4">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Puntuación</p>
              <p className="text-white font-black text-6xl tabular-nums">{puntos.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">Países</p>
                <p className="text-white font-black text-3xl">{paisesAcertados}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs mb-1">Mejor racha</p>
                <p className="text-white font-black text-3xl">{maxCombo}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigator.clipboard.writeText(shareText).then(() => alert('¡Copiado!'))}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition">
              🔗 Compartir resultado
            </button>
            <button onClick={() => iniciar(difId)}
              className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-xl transition">
              Intentarlo de nuevo
            </button>
            <button onClick={() => setFase('intro')}
              className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition">
              Cambiar dificultad
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (!paisActual) return null

  const timerPct   = Math.min(100, (timeLeft / dif.tiempoInicio) * 100)
  const timerColor = timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'

  const recompensaOpciones = [
    { id: 'tiempo', emoji: '⏱️', label: '+10 segundos', desc: 'Añade 10s al timer' },
    { id: 'pistaExtra', emoji: '💡', label: 'Pista extra al inicio', desc: 'Empieza con una pista final visible' },
    { id: 'saltar', emoji: '⏭️', label: 'Saltar gratis', desc: `Acumulas un saltar sin penalización${saltarGratis > 0 ? ` (tienes ${saltarGratis})` : ''}` },
    ...(difId === 'dificil' ? [{ id: 'bonus', emoji: '✨', label: '+150 pts', desc: 'Bonus de puntos directo' }] : []),
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-3xl mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          ← Salir
        </button>
        <div className="flex items-center gap-4 text-sm text-white/50">
          {saltarGratis > 0 && <span className="text-emerald-400 font-bold">⏭️ {saltarGratis}</span>}
          {combo >= 2 && <span className="text-amber-400 font-bold">🔥 ×{combo}</span>}
          <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
          <span className="text-white/30">🌍 {paisesAcertados}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>Tiempo</span>
          <span className={`font-bold tabular-nums text-sm ${timeLeft <= 10 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_320px] md:gap-8 md:items-start">

        {/* Panel de pistas */}
        <div className="mb-5 md:mb-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white/30 text-xs font-semibold uppercase tracking-widest">País misterioso</h2>
              {faseRonda === 'pista' && (
                <span className="text-white/20 text-xs">Pista {pistaIdx + 1}/{pistasBase.length}</span>
              )}
              {(faseRonda === 'finales' || faseRonda === 'adivinar') && (
                <span className="text-violet-400/60 text-xs">Final {Math.min(finalIdx + 1, pistasFinales.length)}/{pistasFinales.length}</span>
              )}
            </div>

            {/* Pistas base */}
            <div className="space-y-2 mb-4">
              {pistasBase.slice(0, faseRonda === 'pista' ? pistaIdx + 1 : pistasBase.length).map((p, i) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                  i === pistaIdx && faseRonda === 'pista'
                    ? 'bg-[#EDAE49]/15 border border-[#EDAE49]/40 text-white'
                    : 'bg-white/5 border border-white/10 text-white/50'
                }`}>
                  <span className="text-base">{i < pistaIdx || faseRonda !== 'pista' ? '✅' : '🔍'}</span>
                  <span>{p.texto}</span>
                </div>
              ))}
              {faseRonda === 'pista' && pistasBase.slice(pistaIdx + 1).map((_, i) => (
                <div key={`locked-${i}`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-white/3 border border-white/5 text-white/20">
                  <span>🔒</span>
                  <span>Pista bloqueada</span>
                </div>
              ))}
            </div>

            {/* Pistas finales (una a una) */}
            {(faseRonda === 'finales' || faseRonda === 'adivinar' || (pistaExtraAlInicio && faseRonda === 'pista')) && (
              <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-2">Pistas finales</p>
                {pistasFinales.slice(0, pistaExtraAlInicio && faseRonda === 'pista' ? 1 : finalIdx + 1).map((p, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm ${
                    i === finalIdx && faseRonda === 'finales'
                      ? 'bg-violet-500/15 border border-violet-500/30 text-violet-200'
                      : 'bg-violet-500/10 border border-violet-500/20 text-violet-300'
                  }`}>
                    <span>{p.emoji}</span>
                    <span>{p.texto}</span>
                  </div>
                ))}
                {faseRonda === 'finales' && pistasFinales.slice(finalIdx + 1).map((_, i) => (
                  <div key={`fl-${i}`} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm bg-white/3 border border-white/5 text-white/15">
                    <span>🔒</span>
                    <span>Pista final bloqueada</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Panel de acción */}
        <div className="flex flex-col gap-4">

          {/* PISTA: respondiendo pistas base */}
          {faseRonda === 'pista' && (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
                  {dif.obligatorio ? 'Responde con un país que cumpla:' : 'Intenta responder (si fallas, avanzamos):'}
                </p>
                <p className="text-white font-bold text-sm">{pistasBase[pistaIdx]?.texto}</p>
              </div>
              <AutocompleteInput value={inputVal} onChange={setInputVal} onSubmit={handleRespuestaPista}
                paises={NOMBRES_PAISES} disabled={!!feedback} />
              {feedback && (
                <div className={`text-center py-2 rounded-xl font-bold text-sm ${feedback.ok === true ? 'bg-green-500/20 text-green-400' : feedback.ok === 'neutral' ? 'bg-white/10 text-white/60' : 'bg-red-500/20 text-red-400'}`}>
                  {feedback.msg}
                </div>
              )}
              <BotonesSkip saltarGratis={saltarGratis} onSaltarGratis={usarSaltarGratis} onSaltar={saltarPais} />
            </>
          )}

          {/* FINALES: pistas finales una a una */}
          {faseRonda === 'finales' && (
            <>
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-4 text-center">
                <p className="text-violet-300 font-bold">Pista final {finalIdx + 1} de {pistasFinales.length}</p>
                <p className="text-white/40 text-sm mt-1">Escribe el país o pide otra pista</p>
              </div>
              <AutocompleteInput value={inputVal} onChange={setInputVal} onSubmit={handleAdivinar}
                paises={NOMBRES_PAISES} disabled={!!feedback} />
              {feedback && (
                <div className={`text-center py-2 rounded-xl font-bold text-sm ${feedback.ok === true ? 'bg-green-500/20 text-green-400' : feedback.ok === 'neutral' ? 'bg-white/10 text-white/60' : 'bg-red-500/20 text-red-400'}`}>
                  {feedback.msg}
                </div>
              )}
              {finalIdx + 1 < pistasFinales.length && (
                <button onClick={avanzarFinal}
                  className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl transition-all">
                  Siguiente pista final →
                </button>
              )}
              <BotonesSkip saltarGratis={saltarGratis} onSaltarGratis={usarSaltarGratis} onSaltar={saltarPais} />
            </>
          )}

          {/* ADIVINAR */}
          {faseRonda === 'adivinar' && (
            <>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-center">
                <p className="text-amber-300 font-bold text-lg">¿Qué país es?</p>
              </div>
              <AutocompleteInput value={inputVal} onChange={setInputVal} onSubmit={handleAdivinar}
                paises={NOMBRES_PAISES} disabled={!!feedback} />
              {feedback && (
                <div className={`text-center py-2 rounded-xl font-bold text-sm ${feedback.ok === true ? 'bg-green-500/20 text-green-400' : feedback.ok === 'neutral' ? 'bg-white/10 text-white/60' : 'bg-red-500/20 text-red-400'}`}>
                  {feedback.msg}
                </div>
              )}
              <BotonesSkip saltarGratis={saltarGratis} onSaltarGratis={usarSaltarGratis} onSaltar={saltarPais} />
            </>
          )}

          {/* RECOMPENSA */}
          {faseRonda === 'recompensa' && (
            <>
              <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-green-400 font-black text-xl">{feedback?.msg}</p>
              </div>
              <p className="text-white/30 text-xs uppercase tracking-widest text-center font-semibold">Elige recompensa</p>
              {recompensaOpciones.map(r => (
                <button key={r.id} onClick={() => elegirRecompensa(r.id)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <p className="font-bold text-white">{r.label}</p>
                      <p className="text-white/40 text-xs">{r.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* FALLADO */}
          {faseRonda === 'fallado' && (
            <>
              <div className="bg-red-900/30 border border-red-500/30 rounded-2xl p-5 text-center">
                <div className="text-4xl mb-2">😬</div>
                <p className="text-red-400 font-black text-xl">{feedback?.msg}</p>
                <p className="text-white/40 text-sm mt-2">−10 segundos</p>
              </div>
              <button onClick={continuarTrasFallo}
                className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all">
                Siguiente país →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
