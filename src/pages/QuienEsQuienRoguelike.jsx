import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PERSONAJES_TODOS, montarTablero, generarPistas } from '../data/personajes'

const BOARD_SIZE = 12

const DIFS = {
  facil:   { label: 'Fácil',   emoji: '🟢', agentesIni: 3, tiempoBase: 90 },
  medio:   { label: 'Medio',   emoji: '🟡', agentesIni: 2, tiempoBase: 60 },
  dificil: { label: 'Difícil', emoji: '🔴', agentesIni: 1, tiempoBase: 45 },
}

const MEJORAS_POOL = [
  { id: 'agente',  emoji: '🕵️', titulo: '+1 agente',         desc: 'Recupera un agente — una vida más en la run', noDificil: true },
  { id: 'pista',   emoji: '📅', titulo: 'Pista automática',  desc: 'Cada nivel empieza con la pista única del personaje ya revelada' },
  { id: 'tiempo',  emoji: '⏱️', titulo: '+20 segundos',      desc: 'Añade 20s al tiempo de todos los niveles siguientes' },
  { id: 'fechas',  emoji: '🗓️', titulo: 'Épocas en tablero', desc: 'Los personajes muestran su época histórica en el tablero' },
  { id: 'bonus',   emoji: '✨', titulo: '×1.2 puntos',        desc: 'Multiplica todos los puntos futuros por 1.2' },
]

const EPOCAS_LABEL = {
  antiguedad: 'Ant.',
  siglo_xix:  'S.XIX',
  siglo_xx:   'S.XX',
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getMejoras(difId) {
  return MEJORAS_POOL.filter(m => !(m.noDificil && difId === 'dificil'))
}

function calcTiempo(dif, nivel, bonusTiempo) {
  return Math.max(5, dif.tiempoBase - (nivel - 1) * 3 + bonusTiempo)
}

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ p, tachado, modoAdivinar, resultado, mostrarEpoca, onClick }) {
  let opacidad = 'opacity-100', escala = 'scale-100', anillo = '', overlay = null

  if (resultado === 'correcto') {
    anillo = 'ring-2 ring-green-400'; escala = 'scale-110'
  } else if (resultado === 'incorrecto') {
    opacidad = 'opacity-40'
  } else if (resultado === 'revelado') {
    anillo = 'ring-2 ring-amber-400'; escala = 'scale-105'
  } else if (tachado) {
    opacidad = 'opacity-20'
    overlay = (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-8 h-8 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </div>
    )
  } else if (modoAdivinar) {
    anillo = 'ring-2 ring-violet-400/60 hover:ring-violet-400'; escala = 'hover:scale-105'
  } else {
    escala = 'hover:scale-105'; opacidad = 'hover:opacity-90'
  }

  return (
    <div
      className={`relative rounded-xl shadow transition-all duration-200 select-none ${tachado ? 'cursor-default' : 'cursor-pointer'} ${opacidad} ${escala} ${anillo}`}
      style={{ backgroundColor: p.color, width: '100%', paddingBottom: '100%' }}
      onClick={onClick}
    >
      <div style={{ position: 'absolute', inset: 0 }} className="flex flex-col items-center justify-center p-1.5 overflow-hidden">
        {resultado === 'correcto' && <span className="text-2xl">✓</span>}
        {resultado === 'revelado' && <span className="text-2xl">★</span>}
        {resultado !== 'correcto' && resultado !== 'revelado' && (
          <>
            <p className="text-white font-bold text-center leading-tight" style={{ fontSize: 'clamp(7px, 1.1vw, 12px)', wordBreak: 'break-word' }}>
              {p.nombre}
            </p>
            {mostrarEpoca && (
              <span className="text-white/50 text-[7px] mt-0.5 font-semibold">{EPOCAS_LABEL[p.atributos.epoca] || ''}</span>
            )}
          </>
        )}
      </div>
      {overlay}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function QuienEsQuienRoguelike() {
  const navigate = useNavigate()

  // ── Run state ──────────────────────────────────────────────────────────────
  const [fase, setFase]       = useState('intro')
  const [difId, setDifId]     = useState('medio')
  const [rd, setRd]           = useState(null)
  const [score, setScore]     = useState(0)
  const [levelKey, setLevelKey] = useState(0)
  const [opciones, setOpciones] = useState([])
  const [levelScore, setLevelScore] = useState(null)
  const [falloMsg, setFalloMsg]   = useState('')
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied]       = useState(false)

  // ── Per-level state ────────────────────────────────────────────────────────
  const [tablero, setTablero]   = useState([])
  const [secreto, setSecreto]   = useState(null)
  const [pistas, setPistas]     = useState([])
  const [pistaIdx, setPistaIdx] = useState(0)
  const [tachados, setTachados] = useState(new Set())
  const [modoAdivinar, setModoAdivinar] = useState(false)
  const [resultados, setResultados]     = useState({})
  const [animFallo, setAnimFallo]       = useState(false)
  const [popupFallo, setPopupFallo]     = useState(null)
  const [popupConfirm, setPopupConfirm] = useState(null)
  const [tiempo, setTiempo]             = useState(90)
  const [tiempoAgotado, setTiempoAgotado] = useState(false)

  const timerRef   = useRef(null)
  const rdRef      = useRef(rd)
  const secretoRef = useRef(secreto)
  const pistasRef  = useRef(pistas)
  const pistaIdxRef = useRef(pistaIdx)
  rdRef.current       = rd
  secretoRef.current  = secreto
  pistasRef.current   = pistas
  pistaIdxRef.current = pistaIdx

  // Timer — cosmético, no termina la partida
  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      setTiempo(t => {
        if (t <= 1) { clearInterval(timerRef.current); setTiempoAgotado(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase, levelKey])

  // ── Iniciar nivel ──────────────────────────────────────────────────────────
  function iniciarNivel(runData) {
    const dif = DIFS[runData.difId]
    const t   = calcTiempo(dif, runData.nivel, runData.bonusTiempo)
    const tab = montarTablero(PERSONAJES_TODOS, BOARD_SIZE)
    const sec = tab[Math.floor(Math.random() * tab.length)]
    const pistasGen = generarPistas(sec, tab)

    let pistasFinales = pistasGen
    if (runData.pistaAuto) {
      const especial = { attr: 'especial', texto: sec.pistaUnica, ratio: 1, negativa: false, especial: true }
      pistasFinales = [especial, ...pistasGen.filter(p => p.attr !== 'única')]
    }

    setTablero(tab); setSecreto(sec); setPistas(pistasFinales); setPistaIdx(0)
    setTachados(new Set()); setModoAdivinar(false); setResultados({})
    setAnimFallo(false); setPopupFallo(null); setPopupConfirm(null)
    setTiempoAgotado(false); setLevelScore(null)
    setRd(runData); setTiempo(t)
    setLevelKey(k => k + 1)
    setFase('jugando')
  }

  function startRun() {
    const dif = DIFS[difId]
    setScore(0)
    iniciarNivel({ nivel: 1, agentes: dif.agentesIni, mejoras: [], bonusTiempo: 0, pistaAuto: false, tienenFechas: false, multiplicador: 1.0, difId })
  }

  // ── Ganar nivel ────────────────────────────────────────────────────────────
  function ganarNivel() {
    clearInterval(timerRef.current)
    const cur  = rdRef.current
    const idx  = pistaIdxRef.current
    const total = pistasRef.current.length
    const pts  = Math.round(Math.max(0, (total - idx - 1)) * 100 * (cur.multiplicador || 1))
    setScore(s => s + pts)
    setLevelScore(pts)

    const nextNivel = cur.nivel + 1
    if (cur.nivel % 3 === 0) {
      setTimeout(() => {
        setOpciones(shuffle(getMejoras(cur.difId)).slice(0, 3))
        setRd({ ...cur, nivel: nextNivel })
        setFase('mejora')
      }, 1400)
    } else {
      setTimeout(() => iniciarNivel({ ...cur, nivel: nextNivel }), 1200)
    }
  }

  // ── Adivinar ───────────────────────────────────────────────────────────────
  function adivinar(p) {
    if (resultados[p.id]) return
    const cur = rdRef.current
    const sec = secretoRef.current

    if (tachados.has(p.id)) setTachados(prev => { const n = new Set(prev); n.delete(p.id); return n })

    if (p.id === sec.id) {
      setResultados(prev => ({ ...prev, [p.id]: 'correcto' }))
      setModoAdivinar(false)
      ganarNivel()
    } else {
      setResultados(prev => ({ ...prev, [p.id]: 'incorrecto' }))
      setAnimFallo(true)
      setTimeout(() => setAnimFallo(false), 600)

      setTimeout(() => {
        setResultados(prev => { const n = { ...prev }; delete n[p.id]; return n })
        setTachados(prev => { const n = new Set(prev); n.add(p.id); return n })

        const newAgentes = cur.agentes - 1
        const newRd = { ...cur, agentes: Math.max(0, newAgentes) }
        setRd(newRd)

        if (newAgentes <= 0) {
          setFalloMsg('💥 ¡Sin agentes! La run ha terminado')
          setResultados(prev => ({ ...prev, [sec.id]: 'revelado' }))
          setTimeout(() => setFase('resultado'), 2000)
        } else {
          setFalloMsg(`💔 ¡Incorrecto! Te quedan ${newAgentes} agente${newAgentes !== 1 ? 's' : ''}`)
          setPopupFallo({ newAgentes })
        }
      }, 800)
    }
  }

  // ── Elegir mejora ──────────────────────────────────────────────────────────
  function elegirMejora(mejora) {
    const cur   = rdRef.current
    const newRd = { ...cur, mejoras: [...cur.mejoras, mejora.id] }
    if (mejora.id === 'agente')  newRd.agentes += 1
    if (mejora.id === 'tiempo')  newRd.bonusTiempo += 20
    if (mejora.id === 'pista')   newRd.pistaAuto = true
    if (mejora.id === 'fechas')  newRd.tienenFechas = true
    if (mejora.id === 'bonus')   newRd.multiplicador = Math.round(((cur.multiplicador || 1.0) + 0.2) * 10) / 10
    iniciarNivel(newRd)
  }

  // ── Share ──────────────────────────────────────────────────────────────────
  function getShareTexto() {
    const dif  = DIFS[rd?.difId || difId]
    const mult = (rd?.multiplicador || 1) > 1 ? ` · ×${rd.multiplicador.toFixed(1)}` : ''
    return `🕵️ He llegado al nivel ${rd?.nivel} con ${score.toLocaleString()} pts en ¿Quién es quién?${mult}\n${dif.emoji} Modo ${dif.label} — parece fácil, pero no lo es. ¿Puedes superarme?\n🎮 https://www.tuthor.es/juegos/quien-es-quien`
  }

  function copiarTexto() {
    navigator.clipboard.writeText(getShareTexto()).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  // ══════════════════════════════════════════════════════════════════════════
  // INTRO
  if (fase === 'intro') {
    const dif = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <button onClick={() => navigate('/juegos')}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            ← Volver
          </button>
          <div className="text-center mb-6">
            <span className="text-6xl block mb-3">🕵️</span>
            <h1 className="text-3xl font-black text-white mb-1">¿Quién es quién? Roguelike</h1>
            <p className="text-white/40 text-sm">Supera niveles, elige mejoras, llega lo más lejos posible</p>
          </div>

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

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            {[
              ['🕵️', 'Agentes', `${dif.agentesIni} — cada fallo pierde un agente`],
              ['⏱️', 'Tiempo',  `${dif.tiempoBase}s por nivel (−3s/nivel, mín. 5s)`],
              ['⭐', 'Puntos',  'Cuantas menos pistas uses, más puntos ganas'],
              ['🎁', 'Mejoras', 'Cada 3 niveles elige una mejora permanente'],
            ].map(([e, k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <span className="text-white/40 shrink-0">{e} {k}</span>
                <span className="text-white font-semibold text-right text-xs sm:text-sm">{v}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Cómo funciona</p>
            <div className="space-y-2">
              {[
                ['🎴', 'Descarta personajes tocándolos para tacharlos'],
                ['💡', 'Pide pistas para ir descartando — cuantas menos uses, más puntos'],
                ['🎯', 'Adivina el personaje correcto para pasar de nivel'],
                ['💔', 'Cada fallo pierde un agente — sin agentes, la run termina'],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={startRun}
            className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/30">
            ¡Empezar run!
          </button>
          <button onClick={() => navigate('/juegos/quien-es-quien/clasico')}
            className="w-full py-3 mt-3 text-white/30 hover:text-white/60 text-sm transition-colors">
            ¿Prefieres jugar sin run? → Modo clásico
          </button>
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MEJORA
  if (fase === 'mejora') return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-3">🎁</div>
        <h2 className="text-2xl font-black text-white mb-1">¡Nivel {(rd?.nivel || 1) - 1} superado!</h2>
        <p className="text-white/40 text-sm mb-2">Elige una mejora permanente</p>
        <p className="text-violet-400 font-bold text-sm mb-8">⭐ {score.toLocaleString()} pts acumulados</p>
        <div className="space-y-3">
          {opciones.map(m => (
            <button key={m.id} onClick={() => elegirMejora(m)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98] group">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{m.emoji}</span>
                <div>
                  <p className="font-black text-white text-lg group-hover:text-violet-300 transition-colors">{m.titulo}</p>
                  <p className="text-white/45 text-sm mt-0.5">{m.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // RESULTADO
  if (fase === 'resultado') {
    const dif = DIFS[rd?.difId || difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4">🏁</div>
          <h2 className="text-3xl font-black text-white mb-1">Fin de la run</h2>
          <p className="text-white/40 text-sm mb-6">{dif.emoji} {dif.label}</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-1">Nivel</p>
              <p className="text-4xl font-black text-white">{rd?.nivel}</p>
            </div>
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-4">
              <p className="text-violet-400/70 text-xs uppercase tracking-widest font-semibold mb-1">Puntos</p>
              <p className="text-4xl font-black text-violet-400">{score.toLocaleString()}</p>
            </div>
          </div>

          {rd?.mejoras?.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
              <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">Mejoras conseguidas</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {rd.mejoras.map((id, i) => {
                  const m = MEJORAS_POOL.find(x => x.id === id)
                  return (
                    <span key={i} className="bg-white/10 rounded-xl px-3 py-1.5 text-sm font-semibold text-white flex items-center gap-1.5">
                      {m?.emoji} {m?.titulo}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center mb-3">
            <button onClick={startRun}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl transition-all hover:scale-[1.02]">
              Nueva run
            </button>
            <button onClick={() => setFase('intro')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all">
              Menú
            </button>
          </div>

          <button onClick={() => setShowShare(true)}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/60 hover:text-white font-semibold rounded-2xl transition-all text-sm flex items-center justify-center gap-2">
            <span>📤</span> Compartir resultado
          </button>
        </div>

        {showShare && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowShare(false)} />
            <div className="relative bg-[#1a1a2e] border border-white/15 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <button onClick={() => setShowShare(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors text-xl leading-none">✕</button>
              <h3 className="text-lg font-black text-white mb-1">Compartir resultado</h3>
              <p className="text-white/40 text-sm mb-4">Copia el texto y compártelo donde quieras</p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 text-sm text-white/70 whitespace-pre-line leading-relaxed font-mono select-all">
                {getShareTexto()}
              </div>
              <button onClick={copiarTexto}
                className={`w-full py-3 rounded-2xl border font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  copied ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60 hover:text-white'
                }`}>
                {copied ? '✅ ¡Copiado!' : '📋 Copiar texto'}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════════════════
  // JUGANDO
  const dif = DIFS[rd?.difId || difId]
  const activosCount = tablero.filter(p => !tachados.has(p.id) && !resultados[p.id]).length
  const hayMasPistas = pistaIdx < pistas.length - 1
  const tiempoBase   = calcTiempo(dif, rd?.nivel || 1, rd?.bonusTiempo || 0)
  const tiempoRatio  = tiempo / tiempoBase
  const tiempoColor  = tiempoAgotado ? 'text-red-400 animate-pulse'
    : tiempoRatio > 0.5 ? 'text-green-400'
    : tiempoRatio > 0.2 ? 'text-amber-400'
    : 'text-red-400'
  const nivelEnBloque = rd ? ((rd.nivel - 1) % 3) + 1 : 1
  const esMejora = nivelEnBloque === 3

  return (
    <div className={`relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-2 sm:px-6 py-3 transition-all ${animFallo ? 'brightness-50' : ''}`}>

      {/* Popup confirmación */}
      {popupConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <span className="text-5xl block mb-3">🤔</span>
            <h3 className="text-white font-black text-xl mb-1">Parece que apuntas a…</h3>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-black text-lg mx-auto my-3 shadow-lg"
              style={{ backgroundColor: popupConfirm.color }}>
              {popupConfirm.iniciales}
            </div>
            <p className="text-white font-bold text-lg mb-1">{popupConfirm.nombre}</p>
            <p className="text-white/40 text-sm mb-5">¿Quieres comprobarlo?</p>
            <div className="flex gap-3">
              <button onClick={() => setPopupConfirm(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-bold py-3 rounded-xl transition-all">
                Cancelar
              </button>
              <button onClick={() => { setPopupConfirm(null); adivinar(popupConfirm) }}
                className="flex-1 bg-violet-600 hover:bg-violet-500 font-black py-3 rounded-xl text-white transition-all">
                Comprobar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup fallo */}
      {popupFallo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <span className="text-5xl block mb-3">❌</span>
            <h3 className="text-white font-black text-xl mb-2">{falloMsg}</h3>
            <p className="text-white/40 text-sm mb-5">El personaje sigue en el tablero — sigue intentándolo</p>
            <button onClick={() => { setPopupFallo(null); setModoAdivinar(true) }}
              className="w-full bg-violet-600 hover:bg-violet-500 font-black py-3 rounded-xl text-white text-base transition-all">
              Seguir →
            </button>
          </div>
        </div>
      )}

      {/* Barra de progreso */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1.5">
          <span>Nivel {rd?.nivel}</span>
          <span className={esMejora ? 'text-violet-400 animate-pulse' : ''}>
            {esMejora ? '🎁 ¡Mejora al superar este nivel!' : `Mejora en ${3 - nivelEnBloque} nivel${3 - nivelEnBloque !== 1 ? 'es' : ''}`}
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${esMejora ? 'bg-violet-400' : 'bg-violet-600'}`}
            style={{ width: `${(nivelEnBloque / 3) * 100}%` }} />
        </div>
      </div>

      {/* HUD */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">Agentes</span>
          <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
            {Array.from({ length: Math.min(rd?.agentes || 0, 6) }).map((_, i) => (
              <span key={i} className="text-sm">🕵️</span>
            ))}
            {(rd?.agentes || 0) > 6 && <span className="text-white/50 text-xs font-bold">+{(rd?.agentes || 0) - 6}</span>}
          </div>
        </div>
        <div className="flex flex-col items-center bg-violet-900/20 border border-violet-500/30 rounded-xl py-2 px-1">
          <span className="text-violet-400/70 text-[9px] uppercase tracking-widest font-semibold">Nivel</span>
          <span className="text-white font-black text-xl leading-none mt-0.5">{rd?.nivel}</span>
        </div>
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">Tiempo</span>
          <span className={`font-black text-xl leading-none mt-0.5 ${tiempoColor}`}>
            {tiempoAgotado ? '⏰' : `${tiempo}s`}
          </span>
        </div>
      </div>

      {/* Puntos */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-white/25 text-xs font-semibold">
          ⭐ {score.toLocaleString()} pts
          {rd?.multiplicador > 1 && <span className="text-violet-400 ml-1.5">×{rd.multiplicador.toFixed(1)}</span>}
        </span>
        {levelScore !== null && (
          <span className="text-violet-400 text-xs font-black animate-pulse">+{levelScore} pts este nivel</span>
        )}
      </div>

      {/* Tablero */}
      <div className={`border rounded-2xl p-2 sm:p-3 transition-all flex flex-col gap-2 flex-1 ${modoAdivinar ? 'border-violet-500/50 bg-violet-900/10' : 'border-white/10 bg-white/5'}`}>
        {modoAdivinar && (
          <p className="text-violet-300 text-xs text-center font-semibold">
            👆 Toca cualquier personaje para adivinar
          </p>
        )}

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
          {tablero.map(p => (
            <Avatar
              key={p.id}
              p={p}
              tachado={tachados.has(p.id)}
              modoAdivinar={modoAdivinar && !resultados[p.id]}
              resultado={resultados[p.id] ?? null}
              mostrarEpoca={rd?.tienenFechas}
              onClick={() => {
                if (resultados[p.id]) return
                if (modoAdivinar) adivinar(p)
                else setTachados(prev => {
                  const n = new Set(prev)
                  if (n.has(p.id)) n.delete(p.id); else n.add(p.id)
                  return n
                })
              }}
            />
          ))}
        </div>

        {/* Pista actual */}
        {pistas[pistaIdx] && (
          <div className={`flex items-start gap-3 rounded-xl px-3 py-2.5 border text-white text-sm ${
            pistas[pistaIdx].especial ? 'border-amber-500/40 bg-amber-900/20'
            : pistas[pistaIdx].negativa ? 'border-red-500/40 bg-red-900/20'
            : 'border-violet-500/40 bg-violet-600/20'
          }`}>
            <span className={`font-black shrink-0 text-xs mt-0.5 ${pistas[pistaIdx].especial ? 'text-amber-400' : pistas[pistaIdx].negativa ? 'text-red-400' : 'text-violet-400'}`}>
              {pistas[pistaIdx].especial ? '📅' : pistas[pistaIdx].negativa ? '✕' : `#${pistaIdx + 1}`}
            </span>
            <span className="leading-relaxed">{pistas[pistaIdx].texto}</span>
          </div>
        )}
        {pistaIdx > 0 && (
          <p className="text-white/25 text-xs text-center -mt-0.5">
            {pistaIdx} pista{pistaIdx > 1 ? 's' : ''} anterior{pistaIdx > 1 ? 'es' : ''} — ¡recuérdalas!
          </p>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          {(() => {
            const unicoRestante = activosCount === 1
              ? tablero.find(p => !tachados.has(p.id) && !resultados[p.id])
              : null

            if (unicoRestante) return (
              <button onClick={() => setPopupConfirm(unicoRestante)}
                className="flex-1 bg-violet-600 hover:bg-violet-500 font-black py-3 rounded-xl text-white text-base transition-all">
                ¿Es {unicoRestante.nombre}?
              </button>
            )

            if (modoAdivinar) return (
              <>
                {hayMasPistas && (
                  <button onClick={() => { setPistaIdx(i => i + 1); setModoAdivinar(false) }}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-medium px-4 py-3 rounded-xl transition-all whitespace-nowrap text-sm">
                    💡 Pista {pistaIdx + 2}
                  </button>
                )}
                <button onClick={() => setModoAdivinar(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-medium py-3 rounded-xl transition-all text-sm">
                  Cancelar
                </button>
              </>
            )

            if (hayMasPistas) return (
              <>
                <button onClick={() => setPistaIdx(i => i + 1)}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 font-black py-3 rounded-xl text-white text-base transition-all">
                  💡 Nueva pista
                </button>
                <button onClick={() => setModoAdivinar(true)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-medium px-4 py-3 rounded-xl transition-all whitespace-nowrap text-sm">
                  🎯 Adivinar
                </button>
              </>
            )

            return (
              <button onClick={() => setModoAdivinar(true)}
                className="flex-1 bg-violet-600 hover:bg-violet-500 font-black py-3 rounded-xl text-white text-base transition-all">
                🎯 Adivinar
              </button>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
