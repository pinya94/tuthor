import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { EVENTOS_ROGUELIKE } from '../data/tuthorTimeEventos'

const VIDA_BIXO = 120

const DIFS = {
  facil:   { label: 'Fácil',   emoji: '🟢', agentes: 3, tiempoBase: 30, puedeRecuperar: true  },
  medio:   { label: 'Medio',   emoji: '🟡', agentes: 2, tiempoBase: 25, puedeRecuperar: true  },
  dificil: { label: 'Difícil', emoji: '🔴', agentes: 1, tiempoBase: 20, puedeRecuperar: false },
}

const UPGRADE_INFO = {
  recuperar_agente: { label: 'Recuperar agente',  emoji: '🩺', desc: 'Un agente caído vuelve con el 60% de vida' },
  pista:            { label: 'Pistas temporales', emoji: '🗓️', desc: 'Los próximos 3 eventos muestran un rango aproximado del año' },
  mas_tiempo:       { label: '+8 segundos',        emoji: '⏱️', desc: 'Todos los niveles ganan 8 segundos adicionales de tiempo' },
  mas_vida:         { label: 'Salud completa',     emoji: '💊', desc: 'Todos los agentes recuperan toda su vida' },
  multiplicador:    { label: '×1.5 puntos',        emoji: '⭐', desc: 'Multiplica ×1.5 tu puntuación los próximos 3 niveles' },
}

// Mecánica fiel al BIXO original:
// El agente viaja al año enviado y ESPERA hasta que ocurra el evento.
// Vida gastada = evento.año - añoEnviado
// Si añoEnviado > evento.año → llegó tarde, falla
// Si espera > vida restante del agente → muere
function calcularViaje(añoEnviado, añoEvento, vidaAgente) {
  if (añoEnviado > añoEvento) {
    return { resultado: 'TARDE', vidaGastada: 0, espera: 0 }
  }
  const espera = añoEvento - añoEnviado
  if (espera > vidaAgente) {
    return { resultado: 'MUERTO', vidaGastada: vidaAgente, espera }
  }
  return {
    resultado: espera === 0 ? 'PERFECTO' : 'ÉXITO',
    vidaGastada: espera,
    espera,
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Ordenar eventos: primero fáciles, luego medios, luego difíciles — con algo de mezcla
function ordenarEventos(eventos) {
  const faciles  = shuffle(eventos.filter(e => e.dificultad === 'fácil'))
  const medios   = shuffle(eventos.filter(e => e.dificultad === 'medio'))
  const dificiles = shuffle(eventos.filter(e => e.dificultad === 'difícil'))
  // Intercalar: los 4 primeros son fáciles, luego alternamos
  return [...faciles.slice(0, 4), ...shuffle([...faciles.slice(4), ...medios, ...dificiles])]
}

function getUpgradeOpts(difId, agentes) {
  const hasMuertos = agentes.some(a => a.muerto)
  const pool = Object.keys(UPGRADE_INFO).filter(u => {
    if (u === 'recuperar_agente' && (!DIFS[difId].puedeRecuperar || !hasMuertos)) return false
    return true
  })
  return shuffle(pool).slice(0, 3)
}

function pista(año) {
  let margen
  if (año < 0)         margen = 100
  else if (año < 1500) margen = 50
  else if (año < 1900) margen = 30
  else if (año < 1970) margen = 15
  else                 margen = 8
  return { desde: año - margen, hasta: año + margen }
}

function formatAño(a) {
  return a < 0 ? `${Math.abs(a)} a.C.` : String(a)
}

function AgentBar({ agente, activo }) {
  const pct = agente.muerto ? 0 : Math.max(0, (agente.vida / VIDA_BIXO) * 100)
  const barColor = pct > 60 ? 'bg-green-400' : pct > 30 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div className={`flex items-center gap-2 transition-opacity ${activo ? 'opacity-100' : 'opacity-40'}`}>
      <span className="text-sm w-5 text-center">{agente.muerto ? '💀' : '🕵️'}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-white/50 w-14 text-right tabular-nums">
        {agente.muerto ? 'Caído' : `${agente.vida}/${VIDA_BIXO}`}
      </span>
    </div>
  )
}

export default function TuthorTimeRoguelike() {
  const navigate = useNavigate()
  const [fase, setFase] = useState('intro')
  const [difId, setDifId] = useState('medio')
  const [nivel, setNivel] = useState(1)
  const [agentes, setAgentes] = useState([])
  const [agenteActivo, setAgenteActivo] = useState(0)
  const [eventos, setEventos] = useState([])
  const [eventoIdx, setEventoIdx] = useState(0)
  const [guess, setGuess] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [feedback, setFeedback] = useState(null)
  const [scoreTotal, setScoreTotal] = useState(0)
  const [bonusTiempo, setBonusTiempo] = useState(0)
  const [pistasRestantes, setPistasRestantes] = useState(0)
  const [scoreMult, setScoreMult] = useState(1)
  const [multRestantes, setMultRestantes] = useState(0)
  const [upgradeOpts, setUpgradeOpts] = useState([])
  const [levelKey, setLevelKey] = useState(0)
  const [showShare, setShowShare] = useState(false)

  const timerRef = useRef(null)
  const tiempoRef = useRef(null)
  const inputRef = useRef(null)

  const dif = DIFS[difId]
  const evento = eventos[eventoIdx]
  const tiempoNivel = Math.max(5, dif.tiempoBase - (nivel - 1) + bonusTiempo)

  function iniciarPartida(selectedDif) {
    const d = DIFS[selectedDif]
    const initAgentes = Array.from({ length: d.agentes }, () => ({
      vida: VIDA_BIXO, muerto: false,
    }))
    setDifId(selectedDif)
    setEventos(ordenarEventos(EVENTOS_ROGUELIKE))
    setEventoIdx(0)
    setNivel(1)
    setAgentes(initAgentes)
    setAgenteActivo(0)
    setScoreTotal(0)
    setBonusTiempo(0)
    setPistasRestantes(0)
    setScoreMult(1)
    setMultRestantes(0)
    setFeedback(null)
    setGuess('')
    setShowShare(false)
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  // Timer
  useEffect(() => {
    if (fase !== 'jugando') return
    setTimeLeft(tiempoNivel)
    tiempoRef.current = tiempoNivel

    timerRef.current = setInterval(() => {
      tiempoRef.current -= 1
      setTimeLeft(tiempoRef.current)
      if (tiempoRef.current <= 0) {
        clearInterval(timerRef.current)
        registrarRespuesta(null) // timeout
      }
    }, 1000)

    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelKey])

  useEffect(() => {
    if (fase === 'jugando' && inputRef.current) inputRef.current.focus()
  }, [fase, levelKey])

  function registrarRespuesta(añoEnviado) {
    clearInterval(timerRef.current)
    const esTiempo = añoEnviado === null
    const t = tiempoRef.current

    setAgentes(prev => {
      const next = prev.map(a => ({ ...a }))

      let idx = agenteActivo
      // Buscar agente activo vivo
      while (idx < next.length && next[idx].muerto) idx++
      if (idx >= next.length) idx = next.findIndex(a => !a.muerto)

      let vidaGastada = 0
      let resultado = 'ÉXITO'
      let espera = 0
      let pts = 0

      if (idx >= 0 && !next[idx].muerto) {
        if (esTiempo) {
          // Timeout: el agente muere (pierde toda la vida restante)
          vidaGastada = next[idx].vida
          resultado = 'TIEMPO'
        } else {
          const viaje = calcularViaje(añoEnviado, evento.año, next[idx].vida)
          resultado = viaje.resultado
          // Llegar tarde = agente muere (toda la vida perdida)
          vidaGastada = resultado === 'TARDE' ? next[idx].vida : viaje.vidaGastada
          espera = viaje.espera

          if (resultado !== 'TARDE') {
            // Puntuación: base - coste por años de espera + bonus velocidad
            const base = Math.max(0, 1000 - espera * 7)
            const timeBonus = resultado === 'PERFECTO' ? 2 : 1 + (t / tiempoNivel)
            pts = Math.round(base * timeBonus * scoreMult)
          }
        }

        next[idx].vida -= vidaGastada
        if (next[idx].vida <= 0) {
          next[idx].vida = 0
          next[idx].muerto = true
        }

        // Siguiente agente vivo
        const nextAlive = next.findIndex(a => !a.muerto)
        setAgenteActivo(nextAlive >= 0 ? nextAlive : 0)
      }

      const allDead = next.every(a => a.muerto)
      setScoreTotal(s => s + pts)
      setFeedback({
        resultado, vidaGastada, espera, pts,
        añoEnviado, esTiempo,
        evento: { ...evento },
        allDead,
      })

      setFase('feedback')

      return next
    })
  }

  function handleGuess() {
    const year = parseInt(guess, 10)
    if (isNaN(year)) return
    registrarRespuesta(year)
  }

  function siguienteNivel() {
    const newNivel = nivel + 1
    setNivel(newNivel)
    setEventoIdx(i => i + 1)
    setFeedback(null)
    setGuess('')

    if (multRestantes > 0) {
      const nm = multRestantes - 1
      setMultRestantes(nm)
      if (nm === 0) setScoreMult(1)
    }
    if (pistasRestantes > 0) setPistasRestantes(p => p - 1)

    if (newNivel % 3 === 1 && newNivel > 1) {
      setUpgradeOpts(getUpgradeOpts(difId, agentes))
      setFase('mejora')
    } else {
      setFase('jugando')
      setLevelKey(k => k + 1)
    }
  }

  function aplicarUpgrade(upgrade) {
    switch (upgrade) {
      case 'recuperar_agente':
        setAgentes(prev => {
          const next = [...prev]
          const idx = next.findIndex(a => a.muerto)
          if (idx >= 0) next[idx] = { vida: Math.floor(VIDA_BIXO * 0.6), muerto: false }
          return next
        })
        break
      case 'pista':
        setPistasRestantes(3)
        break
      case 'mas_tiempo':
        setBonusTiempo(b => b + 8)
        break
      case 'mas_vida':
        setAgentes(prev => prev.map(() => ({ vida: VIDA_BIXO, muerto: false })))
        break
      case 'multiplicador':
        setScoreMult(1.5)
        setMultRestantes(3)
        break
    }
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <button onClick={() => navigate('/juegos')}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            ← Volver
          </button>
          <div className="text-center mb-6">
            <span className="text-6xl block mb-3">⏳</span>
            <h1 className="text-3xl font-black text-white mb-1">Tuthor Time</h1>
            <p className="text-white/40 text-sm">Envía agentes al pasado — ¿cuántas misiones aguantarás?</p>
          </div>

          {/* Selector de dificultad */}
          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
            {Object.entries(DIFS).map(([id, d]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {d.emoji} {d.label}
              </button>
            ))}
          </div>

          {/* Stats de la dificultad */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            {[
              ['🕵️', 'Agentes',  `${d.agentes} agente${d.agentes > 1 ? 's' : ''} · ${d.puedeRecuperar ? `recuperable${d.agentes > 1 ? 's' : ''} con mejora` : `no recuperable${d.agentes > 1 ? 's' : ''}`}`],
              ['⏱️', 'Tiempo',   `${d.tiempoBase}s por misión (−1s por nivel, mín. 5s)`],
              ['💀', 'Vida',     `${VIDA_BIXO} años por agente`],
              ['📅', 'Mecánica', 'Llegas tarde o tiempo agotado → agente muere'],
              ['🎁', 'Mejoras',  'Cada 3 misiones elige una mejora permanente'],
            ].map(([e, k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <span className="text-white/40 shrink-0">{e} {k}</span>
                <span className="text-white font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* Cómo funciona */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Cómo funciona</p>
            <div className="space-y-2">
              {[
                ['📅', 'Envías al agente al año en que crees que ocurrió el evento'],
                ['⏳', 'Llega antes y espera — cada año de espera consume vida'],
                ['💀', 'Llegar tarde o agotar el tiempo mata al agente'],
                ['🎯', 'Año exacto = 0 vida gastada = puntuación máxima'],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => iniciarPartida(difId)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            ¡Empezar misión!
          </button>
          <button onClick={() => navigate('/juegos/tuthor-time/clasico')}
            className="w-full py-3 mt-3 text-white/30 hover:text-white/60 text-sm transition-colors">
            ¿Prefieres entrenar sin presión? → Modo clásico
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ────────────────────────────────────────────────────────────────
  if (fase === 'jugando' && evento) {
    const timerPct = (timeLeft / tiempoNivel) * 100
    const timerColor = timerPct > 50 ? 'bg-green-400' : timerPct > 25 ? 'bg-yellow-400' : 'bg-red-500'
    const pistaInfo = pistasRestantes > 0 ? pista(evento.año) : null

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md flex flex-col gap-3">

          {/* Header */}
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/juegos')} className="text-white/40 hover:text-white text-sm">← Salir</button>
            <span className="text-white/50 text-sm">Misión {nivel}</span>
            <span className="text-white font-bold tabular-nums">{scoreTotal.toLocaleString()} pts</span>
          </div>

          {/* Agentes */}
          <div className="bg-black/40 backdrop-blur rounded-xl p-3 border border-white/10 space-y-2">
            {agentes.map((ag, i) => (
              <AgentBar key={i} agente={ag} activo={i === agenteActivo && !ag.muerto} />
            ))}
          </div>

          {/* Timer */}
          <div>
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>Tiempo</span><span>{timeLeft}s</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>

          {/* Bonuses activos */}
          {(multRestantes > 0 || pistasRestantes > 0) && (
            <div className="flex gap-2 flex-wrap">
              {multRestantes > 0 && (
                <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">⭐ ×1.5 pts ({multRestantes})</span>
              )}
              {pistasRestantes > 0 && (
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">🗓️ Pista ({pistasRestantes})</span>
              )}
            </div>
          )}

          {/* Evento */}
          <div className="bg-black/40 backdrop-blur rounded-2xl p-5 border border-white/10">
            <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{dif.emoji} {dif.label}</div>
            <h2 className="text-xl font-bold text-white mb-2">{evento.nombre}</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{evento.descripcion}</p>

            {pistaInfo && (
              <div className="text-blue-300 text-xs bg-blue-900/30 rounded-lg px-3 py-2 mb-4">
                🗓️ El agente debería partir entre <strong>{formatAño(pistaInfo.desde)}</strong> y <strong>{formatAño(pistaInfo.hasta)}</strong> (aproximado)
              </div>
            )}

            <p className="text-white/40 text-xs mb-3">
              Envía al agente al año en que ocurrió. Llegará antes y esperará — cuanto más espere, más vida pierde.
            </p>

            <div className="space-y-3">
              <input
                ref={inputRef}
                type="number"
                value={guess}
                onChange={e => setGuess(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGuess()}
                placeholder="Año de destino  (negativo = a.C.)"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-lg font-bold placeholder:text-white/20 focus:outline-none focus:border-white/50"
              />
              <button
                onClick={handleGuess}
                disabled={!guess.trim()}
                className="w-full bg-white text-black font-bold py-3 rounded-xl disabled:opacity-30 hover:bg-white/90 transition"
              >
                Enviar agente
              </button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // ── FEEDBACK ───────────────────────────────────────────────────────────────
  if (fase === 'feedback' && feedback) {
    const { resultado, vidaGastada, espera, pts, añoEnviado, esTiempo, evento: ev, allDead } = feedback

    const badgeMap = {
      PERFECTO: { text: '¡Llegada perfecta!', color: 'text-green-400' },
      ÉXITO:    { text: espera <= 5 ? '¡Muy cerca!' : espera <= 20 ? 'Buen intento' : 'Lejos…', color: espera <= 5 ? 'text-green-300' : espera <= 20 ? 'text-yellow-300' : 'text-orange-400' },
      TARDE:    { text: '¡Llegaste tarde!', color: 'text-red-400' },
      MUERTO:   { text: 'El agente ha caído', color: 'text-red-500' },
      TIEMPO:   { text: 'Tiempo agotado', color: 'text-red-400' },
    }
    const badge = badgeMap[resultado] || badgeMap['ÉXITO']

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="bg-black/50 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">

            <div className={`text-2xl font-bold mb-1 ${badge.color}`}>{badge.text}</div>
            <h3 className="text-white/80 text-base font-semibold mb-5">{ev.nombre}</h3>

            <div className="text-5xl font-black text-white mb-1">{formatAño(ev.año)}</div>
            <div className="text-white/40 text-xs mb-5">Año del evento</div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-white/40 text-xs mb-1">Enviado a</div>
                <div className="text-white font-bold">{esTiempo ? '—' : formatAño(añoEnviado)}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-white/40 text-xs mb-1">Espera</div>
                <div className={`font-bold ${resultado === 'TARDE' ? 'text-red-400' : resultado === 'PERFECTO' ? 'text-green-400' : 'text-white'}`}>
                  {resultado === 'TARDE' ? 'Tarde' : resultado === 'TIEMPO' ? '—' : `${espera} años`}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-white/40 text-xs mb-1">Vida perdida</div>
                <div className={`font-bold ${vidaGastada === 0 ? 'text-green-400' : vidaGastada > 60 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {vidaGastada === 0 ? 'Ninguna' : `−${vidaGastada}`}
                </div>
              </div>
            </div>

            {pts > 0 && (
              <div className="text-yellow-300 font-bold text-xl mb-4">+{pts.toLocaleString()} pts</div>
            )}

            <div className="space-y-2 mb-5">
              {agentes.map((ag, i) => (
                <AgentBar key={i} agente={ag} activo={i === agenteActivo && !ag.muerto} />
              ))}
            </div>

            {allDead ? (
              <button
                onClick={() => setFase('resultado')}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition"
              >
                💀 Game over →
              </button>
            ) : (
              <button
                onClick={siguienteNivel}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition"
              >
                Siguiente misión →
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── MEJORA ─────────────────────────────────────────────────────────────────
  if (fase === 'mejora') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="bg-black/50 backdrop-blur rounded-2xl p-6 border border-white/10">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🎁</div>
              <h2 className="text-2xl font-bold text-white">¡Misión {nivel - 1} superada!</h2>
              <p className="text-white/50 text-sm mt-1">Elige una mejora para continuar</p>
            </div>
            <div className="space-y-3">
              {upgradeOpts.map(u => {
                const info = UPGRADE_INFO[u]
                return (
                  <button
                    key={u}
                    onClick={() => aplicarUpgrade(u)}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{info.emoji}</span>
                      <div>
                        <div className="text-white font-bold">{info.label}</div>
                        <div className="text-white/50 text-xs mt-0.5">{info.desc}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── RESULTADO ──────────────────────────────────────────────────────────────
  if (fase === 'resultado') {
    const shareText = `⏳ He llegado a la misión ${nivel} con ${scoreTotal.toLocaleString()} pts en Tuthor Time\n${dif.emoji} Modo ${dif.label} — ¿sabes más historia que yo?\n🎮 https://www.tuthor.es/juegos/tuthor-time`

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="bg-black/50 backdrop-blur rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-5xl mb-3">💀</div>
            <h2 className="text-2xl font-bold text-white mb-1">Misión terminada</h2>
            <p className="text-white/50 text-sm mb-6">Todos los agentes han caído en el tiempo</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/40 text-xs mb-1">Misiones</div>
                <div className="text-white font-black text-3xl">{nivel}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/40 text-xs mb-1">Puntuación</div>
                <div className="text-white font-black text-3xl">{scoreTotal.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowShare(true)}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition"
              >
                🔗 Compartir resultado
              </button>
              <button
                onClick={() => iniciarPartida(difId)}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition"
              >
                Intentarlo de nuevo
              </button>
              <button
                onClick={() => setFase('intro')}
                className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition"
              >
                Cambiar dificultad
              </button>
              <button
                onClick={() => navigate('/juegos/tuthor-time/clasico')}
                className="w-full text-white/30 hover:text-white/60 text-xs py-1 transition"
              >
                ¿Prefieres entrenar sin presión? → Modo clásico
              </button>
            </div>
          </div>
        </div>

        {showShare && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-white font-bold text-lg mb-4 text-center">Compartir resultado</h3>
              <textarea
                readOnly
                value={shareText}
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white/80 text-sm resize-none mb-4 focus:outline-none"
                rows={5}
              />
              <button
                onClick={() => { navigator.clipboard.writeText(shareText); alert('¡Copiado!') }}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition mb-2"
              >
                Copiar texto
              </button>
              <button
                onClick={() => setShowShare(false)}
                className="w-full text-white/40 hover:text-white text-sm py-2 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
