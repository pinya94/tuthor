import { useState, useRef, useEffect, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { createSim, NODE_R } from '../lib/puentesEngine'
import {
  FIELD, GRID, GROUND_Y, PIECE_TYPES, LEVELS, pieceCost,
} from '../data/puentesLevels'

// ── Puntuación mixta ───────────────────────────────────────────────────────────
const BASE_LEVEL = 100      // por nivel superado
const PREDICT_BONUS = 40    // por acertar la predicción
// El presupuesto sobrante se suma tal cual (premia eficiencia).

// ── Colores por tensión (cualitativo, no unidades reales) ──────────────────────
function ratioColor(ratio, broken) {
  if (broken) return '#7f1d1d'
  if (ratio < 0.5) return '#22c55e'
  if (ratio < 0.85) return '#eab308'
  return '#ef4444'
}

const HIT_R = 18           // radio de "agarre" de un nodo (px de campo)
const TAP_MOVE = 8         // umbral px para distinguir tap de arrastre

// ── i18n ────────────────────────────────────────────────────────────────────────
const T = {
  badge:    { es: 'Física · Estructuras', en: 'Physics · Structures', ca: 'Física · Estructures' },
  title:    { es: '🌉 Puentes', en: '🌉 Bridges', ca: '🌉 Ponts' },
  sub:      { es: 'Construye una estructura que aguante la carga', en: 'Build a structure that holds the load', ca: 'Construeix una estructura que aguanti la càrrega' },
  how:      { es: 'Cómo se juega', en: 'How to play', ca: 'Com es juga' },
  h1:       { es: 'Toca en el vacío para crear un nodo', en: 'Tap empty space to create a node', ca: 'Toca al buit per crear un node' },
  h2:       { es: 'Arrastra de un nodo a otro para colocar una pieza', en: 'Drag from one node to another to place a piece', ca: 'Arrossega d’un node a un altre per posar una peça' },
  h3:       { es: 'Vigas aguantan tirón y empuje; los cables solo tiran', en: 'Beams take pull and push; cables only pull', ca: 'Bigues aguanten estirada i empenta; els cables només estiren' },
  h4:       { es: 'Pulsa Probar: verde = seguro, rojo = punto de ruptura', en: 'Hit Test: green = safe, red = breaking point', ca: 'Prem Provar: verd = segur, vermell = punt de ruptura' },
  disc:     { es: 'Simulación aproximada con fines educativos: enseña tensión, compresión y triangulación de forma cualitativa, no es un cálculo de ingeniería real.', en: 'Approximate simulation for learning: it teaches tension, compression and triangulation qualitatively — not a real engineering calculation.', ca: 'Simulació aproximada amb finalitat educativa: ensenya tensió, compressió i triangulació de manera qualitativa, no és un càlcul d’enginyeria real.' },
  start:    { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  level:    { es: 'Nivel', en: 'Level', ca: 'Nivell' },
  budget:   { es: 'Presupuesto', en: 'Budget', ca: 'Pressupost' },
  beam:     { es: 'Viga', en: 'Beam', ca: 'Biga' },
  cable:    { es: 'Cable', en: 'Cable', ca: 'Cable' },
  erase:    { es: 'Borrar', en: 'Erase', ca: 'Esborrar' },
  clear:    { es: 'Vaciar', en: 'Clear', ca: 'Buidar' },
  test:     { es: '▶ Probar', en: '▶ Test', ca: '▶ Provar' },
  needPiece:{ es: 'Coloca al menos una pieza', en: 'Place at least one piece', ca: 'Posa almenys una peça' },
  noBudget: { es: 'Sin presupuesto para esa pieza', en: 'Not enough budget for that piece', ca: 'Sense pressupost per a aquesta peça' },
  predictQ: { es: '¿Aguantará la carga?', en: 'Will it hold the load?', ca: 'Aguantarà la càrrega?' },
  predictNote:{ es: 'Tu predicción no penaliza — solo te hace pensar antes de probar.', en: 'Your prediction has no penalty — it just makes you think before testing.', ca: 'La teva predicció no penalitza — només et fa pensar abans de provar.' },
  yes:      { es: 'Sí, aguanta', en: 'Yes, it holds', ca: 'Sí, aguanta' },
  no:       { es: 'No, colapsa', en: 'No, it collapses', ca: 'No, col·lapsa' },
  testing:  { es: 'Probando…', en: 'Testing…', ca: 'Provant…' },
  pause:    { es: '⏸ Pausa', en: '⏸ Pause', ca: '⏸ Pausa' },
  resume:   { es: '▶ Seguir', en: '▶ Resume', ca: '▶ Continuar' },
  rebuild:  { es: '↩ Volver a construir', en: '↩ Back to building', ca: '↩ Tornar a construir' },
  hold:     { es: '¡Aguantó! 🎉', en: 'It held! 🎉', ca: 'Va aguantar! 🎉' },
  collapse: { es: 'Punto de ruptura alcanzado', en: 'Breaking point reached', ca: 'Punt de ruptura assolit' },
  why:      { es: 'Por qué funcionó', en: 'Why it worked', ca: 'Per què va funcionar' },
  next:     { es: 'Siguiente nivel →', en: 'Next level →', ca: 'Nivell següent →' },
  seeResults:{ es: 'Ver resultados →', en: 'See results →', ca: 'Veure resultats →' },
  legendSafe:{ es: 'segura', en: 'safe', ca: 'segura' },
  legendNear:{ es: 'cerca del límite', en: 'near the limit', ca: 'a prop del límit' },
  legendBreak:{ es: 'punto de ruptura', en: 'breaking point', ca: 'punt de ruptura' },
  scoreBase:{ es: 'Nivel superado', en: 'Level cleared', ca: 'Nivell superat' },
  scoreBudget:{ es: 'Presupuesto ahorrado', en: 'Budget saved', ca: 'Pressupost estalviat' },
  scorePredict:{ es: 'Predicción acertada', en: 'Prediction correct', ca: 'Predicció encertada' },
  endTitle: { es: 'Puentes completado', en: 'Bridges complete', ca: 'Ponts completat' },
  levelsCleared:{ es: 'Niveles', en: 'Levels', ca: 'Nivells' },
  predAcc:  { es: 'Predicciones', en: 'Predictions', ca: 'Prediccions' },
  again:    { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
}
function tt(key, l) { return T[key]?.[l] ?? T[key]?.es ?? key }

// Feedback correctivo específico según qué rompió y por qué fuerza.
function failFeedback(loseReason, firstBreak, l) {
  if (loseReason === 'gap') {
    return {
      es: 'La carga se cayó por un hueco sin apoyo: el tablero tiene que ser continuo de un extremo a otro, con nodos bajo todo el recorrido.',
      en: 'The load fell through an unsupported gap: the deck must be continuous from end to end, with nodes under the whole path.',
      ca: 'La càrrega va caure per un buit sense suport: el tauler ha de ser continu d’un extrem a l’altre, amb nodes sota tot el recorregut.',
    }[l]
  }
  if (loseReason === 'sag' || !firstBreak) {
    return {
      es: 'La estructura se hundió sin llegar a romper una pieza: le falta rigidez. Añade diagonales para triangular y que no se deforme.',
      en: 'The structure sagged without any piece breaking: it lacks rigidity. Add diagonals to triangulate so it does not deform.',
      ca: 'L’estructura es va enfonsar sense trencar cap peça: li falta rigidesa. Afegeix diagonals per triangular i que no es deformi.',
    }[l]
  }
  const { type, sign } = firstBreak
  if (type === 'cable') {
    return {
      es: 'Un cable se rompió por exceso de tensión. Reparte el peso con más cables o sujeta ese punto con una viga.',
      en: 'A cable snapped from too much tension. Spread the weight with more cables or brace that point with a beam.',
      ca: 'Un cable es va trencar per excés de tensió. Reparteix el pes amb més cables o subjecta aquell punt amb una biga.',
    }[l]
  }
  if (sign === 'compression') {
    return {
      es: 'Una viga colapsó por compresión (pandeo): la estaba aplastando demasiada carga. Añade una diagonal para repartir el empuje.',
      en: 'A beam buckled under compression: too much load was crushing it. Add a diagonal to spread the push.',
      ca: 'Una biga va col·lapsar per compressió (vinclament): massa càrrega l’aixafava. Afegeix una diagonal per repartir l’empenta.',
    }[l]
  }
  return {
    es: 'Una viga se rompió estirada por la tensión. Refuerza ese tramo o triangula para que el tirón se reparta.',
    en: 'A beam tore apart under tension. Reinforce that section or triangulate so the pull is shared.',
    ca: 'Una biga es va trencar estirada per la tensió. Reforça aquell tram o triangula perquè l’estirada es reparteixi.',
  }[l]
}

function anchorsToNodes(level) {
  return level.anchors.map((a, i) => ({ id: `a${i}`, x: a.x, y: a.y, fixed: true }))
}

// ── Dibujo ───────────────────────────────────────────────────────────────────
function drawScene(ctx, scene) {
  const { W, H } = FIELD
  ctx.clearRect(0, 0, W, H)

  // Fondo + suelo
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, W, H)
  // Rejilla tenue
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  ctx.lineWidth = 1
  for (let x = 0; x <= W; x += GRID) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, GROUND_Y); ctx.stroke() }
  for (let y = 0; y <= GROUND_Y; y += GRID) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
  // Suelo
  ctx.fillStyle = 'rgba(120,113,108,0.25)'
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y)
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(W, GROUND_Y); ctx.stroke()

  const test = scene.mode === 'test'
  const pieces = test ? scene.state.pieces : scene.pieces
  const nodes = test ? scene.state.nodes : scene.nodes

  // Piezas
  for (const p of pieces) {
    let ax, ay, bx, by
    if (test) { ax = p.ax; ay = p.ay; bx = p.bx; by = p.by } else {
      const a = nodes.find(n => n.id === p.a), b = nodes.find(n => n.id === p.b)
      if (!a || !b) continue
      ax = a.x; ay = a.y; bx = b.x; by = b.y
    }
    const def = PIECE_TYPES[p.type]
    const isBeam = p.type === 'beam'
    let color = def.color
    if (test) color = ratioColor(p.ratio, p.broken)

    ctx.lineCap = 'round'
    if (p.broken) {
      ctx.setLineDash([6, 8])
      ctx.strokeStyle = color
      ctx.lineWidth = isBeam ? 5 : 3
    } else if (test && p.type === 'cable' && p.sign === 'slack') {
      ctx.setLineDash([2, 6])
      ctx.strokeStyle = 'rgba(245,158,11,0.4)'
      ctx.lineWidth = 2
    } else {
      ctx.setLineDash([])
      ctx.strokeStyle = color
      ctx.lineWidth = isBeam ? 6 : 3
    }
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
    ctx.setLineDash([])
  }

  // Preview de arrastre (modo construcción)
  if (!test && scene.drag) {
    const d = scene.drag
    ctx.setLineDash([4, 6])
    ctx.strokeStyle = scene.tool === 'cable' ? 'rgba(245,158,11,0.7)' : 'rgba(148,163,184,0.7)'
    ctx.lineWidth = scene.tool === 'cable' ? 3 : 5
    ctx.beginPath(); ctx.moveTo(d.fromX, d.fromY); ctx.lineTo(d.toX, d.toY); ctx.stroke()
    ctx.setLineDash([])
  }

  // Nodos
  for (const n of nodes) {
    if (n.fixed) {
      ctx.fillStyle = '#38bdf8'
      ctx.beginPath()
      ctx.moveTo(n.x, n.y - NODE_R - 2)
      ctx.lineTo(n.x - NODE_R - 3, n.y + NODE_R + 4)
      ctx.lineTo(n.x + NODE_R + 3, n.y + NODE_R + 4)
      ctx.closePath(); ctx.fill()
    } else {
      ctx.fillStyle = test ? '#e2e8f0' : '#EDAE49'
      ctx.beginPath(); ctx.arc(n.x, n.y, NODE_R - 1, 0, Math.PI * 2); ctx.fill()
    }
  }

  // Carga (uno o varios puntos)
  if (test && scene.state.loads) {
    ctx.font = '26px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (const ld of scene.state.loads) {
      ctx.fillText(ld.type === 'moving' ? '🚗' : '📦', ld.x, ld.y - 14)
    }
  }
}

// ── Pantalla de intro ──────────────────────────────────────────────────────────
function Intro({ l, onStart }) {
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tt('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{tt('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{tt('sub', l)}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tt('how', l)}</p>
          <div className="space-y-2.5">
            {[['👆', tt('h1', l)], ['✏️', tt('h2', l)], ['🟫', tt('h3', l)], ['🧪', tt('h4', l)]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/60">
                <span className="text-base w-5 shrink-0 text-center">{e}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5"><span className="w-4 h-1.5 rounded" style={{ background: '#94a3b8' }} /><span className="text-white/60">{tt('beam', l)}</span></span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-1 rounded" style={{ background: '#f59e0b' }} /><span className="text-white/60">{tt('cable', l)}</span></span>
          </div>
          <p className="text-white/35 text-xs mt-3 leading-relaxed">{tt('disc', l)}</p>
        </div>

        <button onClick={onStart}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20">
          {tt('start', l)}
        </button>
      </div>
    </div>
  )
}

// ── Juego ────────────────────────────────────────────────────────────────────
export default function Puentes() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('intro')   // intro | play | end
  const [levelIdx, setLevelIdx] = useState(0)
  const level = LEVELS[levelIdx]

  const [mode, setMode] = useState('build')        // build | predict | test | result
  const [tool, setTool] = useState('beam')
  const [nodes, setNodes] = useState(() => anchorsToNodes(LEVELS[0]))
  const [pieces, setPieces] = useState([])
  const [drag, setDrag] = useState(null)           // preview de arrastre
  const [warn, setWarn] = useState(null)
  const [paused, setPaused] = useState(false)
  const [result, setResult] = useState(null)       // { won, loseReason, firstBreak, score, budgetLeft, predictOk }

  const [totalScore, setTotalScore] = useState(0)
  const [predStats, setPredStats] = useState({ correct: 0, total: 0 })
  const [levelsCleared, setLevelsCleared] = useState(0)

  const canvasRef = useRef(null)
  const simRef = useRef(null)
  const rafRef = useRef(null)
  const pausedRef = useRef(false)
  const idRef = useRef(0)
  const startedAtRef = useRef(0)

  const spent = pieces.reduce((s, p) => s + pieceCost(p.type), 0)
  const budgetLeft = level.budget - spent

  const nextId = () => `p${idRef.current++}`

  // Reset al cambiar de nivel
  const loadLevel = useCallback((idx) => {
    setLevelIdx(idx)
    setNodes(anchorsToNodes(LEVELS[idx]))
    setPieces([])
    setTool(LEVELS[idx].allowed[0])
    setMode('build')
    setDrag(null)
    setResult(null)
  }, [])

  // ── Dibujo en modo construcción ──
  // Solo repinta en 'build'. En 'predict'/'result' el canvas conserva el último
  // frame (estructura o colapso) tras el overlay; en 'test' dibuja el bucle rAF.
  useEffect(() => {
    if (screen !== 'play' || mode !== 'build') return
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    drawScene(ctx, { mode: 'build', nodes, pieces, drag, tool })
  }, [screen, mode, nodes, pieces, drag, tool])

  // ── Limpieza ──
  const stopSim = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (simRef.current) { simRef.current.destroy(); simRef.current = null }
  }, [])
  useEffect(() => () => stopSim(), [stopSim])

  // ── Interacción de construcción ──
  function toField(e) {
    const cv = canvasRef.current
    const rect = cv.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) / rect.width * FIELD.W,
      y: (e.clientY - rect.top) / rect.height * FIELD.H,
    }
  }
  function snap(v) { return Math.round(v / GRID) * GRID }
  function nodeAt(x, y) {
    let best = null, bestD = HIT_R
    for (const n of nodes) {
      const d = Math.hypot(n.x - x, n.y - y)
      if (d < bestD) { bestD = d; best = n }
    }
    return best
  }
  function pieceAt(x, y) {
    for (const p of pieces) {
      const a = nodes.find(n => n.id === p.a), b = nodes.find(n => n.id === p.b)
      if (!a || !b) continue
      // distancia punto-segmento
      const dx = b.x - a.x, dy = b.y - a.y
      const len2 = dx * dx + dy * dy || 1
      let t = ((x - a.x) * dx + (y - a.y) * dy) / len2
      t = Math.max(0, Math.min(1, t))
      const px = a.x + t * dx, py = a.y + t * dy
      if (Math.hypot(px - x, py - y) < 8) return p
    }
    return null
  }

  const downRef = useRef(null)

  function flashWarn(key) { setWarn(key); setTimeout(() => setWarn(w => (w === key ? null : w)), 1600) }

  function addPiece(aId, bId) {
    if (aId === bId) return
    if (pieces.some(p => (p.a === aId && p.b === bId) || (p.a === bId && p.b === aId))) return
    if (budgetLeft < pieceCost(tool)) { flashWarn('noBudget'); return }
    setPieces(ps => [...ps, { id: nextId(), type: tool, a: aId, b: bId }])
  }

  function onPointerDown(e) {
    if (mode !== 'build') return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    const p = toField(e)
    const hit = nodeAt(p.x, p.y)
    downRef.current = { x: p.x, y: p.y, node: hit, moved: false }
    if (tool !== 'erase' && hit) setDrag({ fromX: hit.x, fromY: hit.y, toX: p.x, toY: p.y })
  }
  function onPointerMove(e) {
    if (mode !== 'build' || !downRef.current) return
    const p = toField(e)
    const d = downRef.current
    if (Math.hypot(p.x - d.x, p.y - d.y) > TAP_MOVE) d.moved = true
    if (tool !== 'erase' && d.node) setDrag({ fromX: d.node.x, fromY: d.node.y, toX: p.x, toY: p.y })
  }
  function onPointerUp(e) {
    if (mode !== 'build' || !downRef.current) return
    const p = toField(e)
    const d = downRef.current
    downRef.current = null
    setDrag(null)

    if (tool === 'erase') {
      const pc = pieceAt(p.x, p.y)
      if (pc) { setPieces(ps => ps.filter(x => x.id !== pc.id)); return }
      const nd = nodeAt(p.x, p.y)
      if (nd && !nd.fixed && !pieces.some(pp => pp.a === nd.id || pp.b === nd.id)) {
        setNodes(ns => ns.filter(x => x.id !== nd.id))
      }
      return
    }

    // Arrastre desde un nodo → conectar / crear nodo + pieza
    if (d.node && d.moved) {
      const target = nodeAt(p.x, p.y)
      if (target && target.id !== d.node.id) { addPiece(d.node.id, target.id); return }
      const nx = snap(p.x), ny = snap(p.y)
      if (nx > 8 && nx < FIELD.W - 8 && ny > 8 && ny < GROUND_Y - 4) {
        if (budgetLeft < pieceCost(tool)) { flashWarn('noBudget'); return }
        const id = nextId()
        setNodes(ns => [...ns, { id, x: nx, y: ny, fixed: false }])
        setPieces(ps => [...ps, { id: nextId(), type: tool, a: d.node.id, b: id }])
      }
      return
    }

    // Tap en vacío → crear nodo suelto
    if (!d.node && !d.moved) {
      const nx = snap(p.x), ny = snap(p.y)
      if (nx > 8 && nx < FIELD.W - 8 && ny > 8 && ny < GROUND_Y - 4 && !nodeAt(nx, ny)) {
        setNodes(ns => [...ns, { id: nextId(), x: nx, y: ny, fixed: false }])
      }
    }
  }

  // ── Simulación ──
  function askPrediction() {
    if (pieces.length === 0) { flashWarn('needPiece'); return }
    setMode('predict')
  }

  function beginTest(pred) {
    setMode('test')
    pausedRef.current = false
    setPaused(false)

    const sim = createSim({ nodes, pieces }, level, {
      onWin: () => finishLevel(true, pred),
      onLose: (info) => finishLevel(false, pred, info),
    })
    simRef.current = sim

    const loop = () => {
      if (!simRef.current) return
      if (!pausedRef.current) simRef.current.tick()
      const st = simRef.current.getState()
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) drawScene(ctx, { mode: 'test', state: st })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }

  const finishedRef = useRef(false)
  function finishLevel(won, pred, info = {}) {
    if (finishedRef.current) return
    finishedRef.current = true
    // deja ver el frame final un instante y detiene el bucle
    setTimeout(() => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null }, 400)

    const predictOk = pred === won
    setPredStats(s => ({ correct: s.correct + (predictOk ? 1 : 0), total: s.total + 1 }))

    let gained = 0
    if (won) {
      const budgetBonus = Math.max(0, budgetLeft)
      gained = BASE_LEVEL + budgetBonus + (predictOk ? PREDICT_BONUS : 0)
      setTotalScore(s => s + gained)
      setLevelsCleared(c => c + 1)
      setResult({ won: true, score: gained, budgetLeft: budgetBonus, predictOk })
    } else {
      setResult({ won: false, loseReason: info.reason, firstBreak: info.piece, predictOk })
    }
    setMode('result')
    setTimeout(() => { finishedRef.current = false }, 500)
  }

  function togglePause() {
    const nv = !pausedRef.current
    pausedRef.current = nv
    setPaused(nv)
  }

  function backToBuild() {
    stopSim()
    setMode('build')
    setResult(null)
    setPaused(false)
    // redibuja construcción
    requestAnimationFrame(() => {
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) drawScene(ctx, { mode: 'build', nodes, pieces, drag: null, tool })
    })
  }

  function goNext() {
    stopSim()
    if (levelIdx + 1 >= LEVELS.length) { setScreen('end'); return }
    loadLevel(levelIdx + 1)
  }

  function restartAll() {
    stopSim()
    setTotalScore(0); setPredStats({ correct: 0, total: 0 }); setLevelsCleared(0)
    startedAtRef.current = Date.now()
    loadLevel(0)
    setScreen('play')
  }

  // Guardar actividad al terminar
  useEffect(() => {
    if (screen !== 'end') return
    if (user?.uid) {
      saveActivity(user.uid, {
        type: 'juego', game: 'puentes', category: 'fisica',
        score: totalScore, passed: levelsCleared > 0,
        coinsEarned: computeCoins('puentes', { score: totalScore }),
        timeSpent: Math.round((Date.now() - startedAtRef.current) / 1000),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }, [screen, user, totalScore, levelsCleared])

  // ── Render ──
  const seo = {
    es: { title: 'Puentes — Juego de física estructural', desc: 'Construye un puente con vigas y cables y prueba si aguanta la carga. Aprende tensión, compresión y triangulación jugando. Gratis, sin instalar.', path: '/juegos/puentes' },
    en: { title: 'Bridges — Structural physics game', desc: 'Build a bridge with beams and cables and test if it holds the load. Learn tension, compression and triangulation by playing. Free, no install.', path: '/en/juegos/puentes' },
    ca: { title: 'Ponts — Joc de física estructural', desc: 'Construeix un pont amb bigues i cables i prova si aguanta la càrrega. Aprèn tensió, compressió i triangulació jugant. Gratis, sense instal·lar.', path: '/ca/juegos/puentes' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><Intro l={l} onStart={() => { startedAtRef.current = Date.now(); setScreen('play') }} /></>)
  }

  if (screen === 'end') {
    const shareText = l === 'en'
      ? `I built ${levelsCleared} bridges in Puentes 🌉 — ${totalScore} pts. Can you beat me? https://tuthor.es/juegos/puentes`
      : l === 'ca'
      ? `He construït ${levelsCleared} ponts a Puentes 🌉 — ${totalScore} pts. Pots superar-me? https://tuthor.es/juegos/puentes`
      : `He construido ${levelsCleared} puentes en Puentes 🌉 — ${totalScore} pts. ¿Puedes superarme? https://tuthor.es/juegos/puentes`
    const msg = { es: levelsCleared >= LEVELS.length ? '¡Ingeniero de puentes! 🏗️' : '¡Buen trabajo!', en: levelsCleared >= LEVELS.length ? 'Bridge engineer! 🏗️' : 'Good work!', ca: levelsCleared >= LEVELS.length ? 'Enginyer de ponts! 🏗️' : 'Bon treball!' }[l]
    return (
      <GameEndScreen
        game="puentes"
        emoji="🌉"
        title={tt('endTitle', l)}
        score={totalScore}
        message={msg}
        stats={[
          { label: tt('levelsCleared', l), value: `${levelsCleared}/${LEVELS.length}`, emoji: '🌉' },
          { label: tt('predAcc', l), value: `${predStats.correct}/${predStats.total}`, emoji: '🔮' },
        ]}
        shareText={shareText}
        onPlayAgain={restartAll}
        playAgainLabel={tt('again', l)}
        user={user} lang={lang}
      />
    )
  }

  const allowed = level.allowed
  const tools = [...allowed, 'erase']
  const toolMeta = { beam: { emoji: '🟫', key: 'beam' }, cable: { emoji: '➖', key: 'cable' }, erase: { emoji: '🧽', key: 'erase' } }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[820px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🌉 {tt('level', l)} {levelIdx + 1}/{LEVELS.length}</p>
          <p className="text-white font-bold text-base">{level.name[l] ?? level.name.es}</p>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-[10px] uppercase tracking-widest">{tt('budget', l)}</p>
          <p className={`font-black text-lg ${budgetLeft <= 0 ? 'text-red-400' : 'text-[#EDAE49]'}`}>{budgetLeft}<span className="text-white/30 text-sm">/{level.budget}</span></p>
        </div>
      </div>

      {/* Pista del nivel */}
      {mode === 'build' && (
        <div className="w-full max-w-[820px] mb-2 px-1">
          <p className="text-white/45 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2">💡 {level.hint[l] ?? level.hint.es}</p>
        </div>
      )}

      {/* Canvas */}
      <div className="relative w-full max-w-[820px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]" style={{ aspectRatio: `${FIELD.W} / ${FIELD.H}` }}>
        <canvas
          ref={canvasRef}
          width={FIELD.W}
          height={FIELD.H}
          className="w-full h-full touch-none block"
          style={{ cursor: mode === 'build' ? (tool === 'erase' ? 'not-allowed' : 'crosshair') : 'default' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />

        {/* Leyenda de colores (durante test) */}
        {mode === 'test' && (
          <div className="absolute top-2 left-2 flex flex-col gap-1 bg-black/40 rounded-lg px-2.5 py-1.5 text-[10px]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />{tt('legendSafe', l)}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#eab308' }} />{tt('legendNear', l)}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />{tt('legendBreak', l)}</span>
          </div>
        )}

        {/* Overlay de predicción */}
        {mode === 'predict' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm px-6 text-center">
            <p className="text-4xl mb-2">🔮</p>
            <p className="text-white font-black text-xl mb-1">{tt('predictQ', l)}</p>
            <p className="text-white/50 text-xs mb-6 max-w-xs">{tt('predictNote', l)}</p>
            <div className="flex gap-3">
              <button onClick={() => beginTest(true)} className="px-5 py-3 rounded-xl bg-green-500/20 border border-green-500/60 text-green-300 font-bold hover:bg-green-500/30 transition">{tt('yes', l)}</button>
              <button onClick={() => beginTest(false)} className="px-5 py-3 rounded-xl bg-red-500/20 border border-red-500/60 text-red-300 font-bold hover:bg-red-500/30 transition">{tt('no', l)}</button>
            </div>
          </div>
        )}

        {/* Overlay de resultado */}
        {mode === 'result' && result && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm px-6 text-center">
            {result.won ? (
              <>
                <p className="text-5xl mb-2">🎉</p>
                <p className="text-green-400 font-black text-2xl mb-3">{tt('hold', l)}</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3 w-full max-w-xs text-left text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-white/50">{tt('scoreBase', l)}</span><span className="text-white font-bold">+{BASE_LEVEL}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">{tt('scoreBudget', l)}</span><span className="text-white font-bold">+{result.budgetLeft}</span></div>
                  {result.predictOk && <div className="flex justify-between"><span className="text-white/50">{tt('scorePredict', l)}</span><span className="text-white font-bold">+{PREDICT_BONUS}</span></div>}
                  <div className="flex justify-between border-t border-white/10 pt-1 mt-1"><span className="text-[#EDAE49] font-bold">+{result.score}</span><span className="text-[#EDAE49] font-black">= {totalScore}</span></div>
                </div>
                <p className="text-white/60 text-xs mb-4 max-w-xs"><span className="text-white/40 font-semibold uppercase tracking-wide">{tt('why', l)}:</span> {level.principle[l] ?? level.principle.es}</p>
                <button onClick={goNext} className="px-6 py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
                  {levelIdx + 1 >= LEVELS.length ? tt('seeResults', l) : tt('next', l)}
                </button>
              </>
            ) : (
              <>
                <p className="text-5xl mb-2">💥</p>
                <p className="text-red-400 font-black text-xl mb-3">{tt('collapse', l)}</p>
                <p className="text-white/70 text-sm mb-5 max-w-sm">{failFeedback(result.loseReason, result.firstBreak, l)}</p>
                <button onClick={backToBuild} className="px-6 py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tt('rebuild', l)}</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Aviso */}
      <div className="h-5 mt-1.5">
        {warn && <p className="text-amber-400 text-xs">{tt(warn, l)}</p>}
      </div>

      {/* Controles */}
      {mode === 'build' && (
        <div className="w-full max-w-[820px] flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex gap-2">
            {tools.map(tid => {
              const m = toolMeta[tid]
              const active = tool === tid
              const cost = tid !== 'erase' ? pieceCost(tid) : null
              return (
                <button key={tid} onClick={() => setTool(tid)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border transition ${active ? 'bg-white/15 border-[#EDAE49]/60 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'}`}>
                  <span>{m.emoji}</span>{tt(m.key, l)}
                  {cost != null && <span className="text-white/40 text-xs">·{cost}</span>}
                </button>
              )
            })}
          </div>
          <div className="flex gap-2">
            {pieces.length > 0 && (
              <button onClick={() => { setPieces([]); setNodes(anchorsToNodes(level)) }}
                className="px-3 py-2 rounded-lg text-sm font-semibold bg-white/5 border border-white/10 text-white/50 hover:text-white/80 transition">
                🧹 {tt('clear', l)}
              </button>
            )}
            <button onClick={askPrediction} disabled={pieces.length === 0}
              className="px-5 py-2 rounded-lg text-sm font-black bg-[#EDAE49] text-black hover:bg-amber-400 transition disabled:opacity-40 disabled:cursor-not-allowed">
              {tt('test', l)}
            </button>
          </div>
        </div>
      )}

      {mode === 'test' && (
        <div className="w-full max-w-[820px] flex items-center justify-center gap-3 px-1">
          <span className="text-white/50 text-sm">{tt('testing', l)}</span>
          <button onClick={togglePause} className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 border border-white/15 text-white hover:bg-white/20 transition">
            {paused ? tt('resume', l) : tt('pause', l)}
          </button>
          <button onClick={backToBuild} className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/5 border border-white/10 text-white/60 hover:text-white transition">
            {tt('rebuild', l)}
          </button>
        </div>
      )}
    </div>
  )
}
