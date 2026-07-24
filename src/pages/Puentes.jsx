import { useState, useRef, useEffect, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { FIELD, PIECES, LEVELS, pieceCost, pieceHolds } from '../data/puentesLevels'

const BASE_LEVEL = 100 // + presupuesto ahorrado

const COL = {
  ok: '#22c55e', bad: '#ef4444',
  empty: 'rgba(255,255,255,0.28)',
  tension: '#f59e0b', compression: '#38bdf8',
  node: '#e2e8f0', anchor: '#64748b',
}

const T = {
  badge:   { es: 'Física · Estructuras', en: 'Physics · Structures', ca: 'Física · Estructures' },
  title:   { es: '🌉 Puentes', en: '🌉 Bridges', ca: '🌉 Ponts' },
  sub:     { es: 'Elige la pieza de cada tramo y aguanta la carga', en: 'Pick each member’s piece and hold the load', ca: 'Tria la peça de cada tram i aguanta la càrrega' },
  how:     { es: 'Cómo se juega', en: 'How to play', ca: 'Com es juga' },
  h1:      { es: 'El puente ya está dibujado. Toca cada tramo marcado para elegir su pieza.', en: 'The bridge is already drawn. Tap each marked member to choose its piece.', ca: 'El pont ja està dibuixat. Toca cada tram marcat per triar-ne la peça.' },
  h2:      { es: 'Viga 🟫: aguanta empujar Y tirar (cara). Cable ➖: solo tirar (barato).', en: 'Beam 🟫: takes push AND pull (pricey). Cable ➖: pull only (cheap).', ca: 'Biga 🟫: aguanta empènyer I estirar (cara). Cable ➖: només estirar (barat).' },
  h3:      { es: 'Toca un tramo para cambiar: vacío → viga → cable → vacío.', en: 'Tap a member to change: empty → beam → cable → empty.', ca: 'Toca un tram per canviar: buit → biga → cable → buit.' },
  h4:      { es: 'Pulsa Probar: verde = aguanta, rojo = falla.', en: 'Hit Test: green = holds, red = fails.', ca: 'Prem Provar: verd = aguanta, vermell = falla.' },
  disc:    { es: 'Modelo simplificado con fines educativos: enseña tensión vs compresión de forma cualitativa.', en: 'Simplified model for learning: it teaches tension vs compression qualitatively.', ca: 'Model simplificat amb finalitat educativa: ensenya tensió vs compressió de manera qualitativa.' },
  start:   { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  level:   { es: 'Nivel', en: 'Level', ca: 'Nivell' },
  budget:  { es: 'Presupuesto', en: 'Budget', ca: 'Pressupost' },
  test:    { es: '▶ Probar', en: '▶ Test', ca: '▶ Provar' },
  fill:    { es: 'Elige una pieza en cada tramo', en: 'Choose a piece in every member', ca: 'Tria una peça a cada tram' },
  noBudget:{ es: 'Sin presupuesto para esa pieza', en: 'Not enough budget for that piece', ca: 'Sense pressupost per a aquesta peça' },
  testing: { es: 'Probando…', en: 'Testing…', ca: 'Provant…' },
  hold:    { es: '¡Aguantó! 🎉', en: 'It held! 🎉', ca: 'Va aguantar! 🎉' },
  fail:    { es: 'Falla', en: 'It fails', ca: 'Falla' },
  why:     { es: 'Por qué', en: 'Why', ca: 'Per què' },
  next:    { es: 'Siguiente nivel →', en: 'Next level →', ca: 'Nivell següent →' },
  seeRes:  { es: 'Ver resultados →', en: 'See results →', ca: 'Veure resultats →' },
  rebuild: { es: '↩ Cambiar piezas', en: '↩ Change pieces', ca: '↩ Canviar peces' },
  reveal:  { es: 'Fuerzas reales', en: 'Actual forces', ca: 'Forces reals' },
  tension: { es: 'Tensión (tira) → cable o viga', en: 'Tension (pulls) → cable or beam', ca: 'Tensió (estira) → cable o biga' },
  compression: { es: 'Compresión (empuja) → solo viga', en: 'Compression (pushes) → beam only', ca: 'Compressió (empeny) → només biga' },
  scoreBase:{ es: 'Nivel superado', en: 'Level cleared', ca: 'Nivell superat' },
  scoreBudget:{ es: 'Presupuesto ahorrado', en: 'Budget saved', ca: 'Pressupost estalviat' },
  endTitle:{ es: 'Puentes completado', en: 'Bridges complete', ca: 'Ponts completat' },
  levelsCleared:{ es: 'Niveles', en: 'Levels', ca: 'Nivells' },
  again:   { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
}
function tt(k, l) { return T[k]?.[l] ?? T[k]?.es ?? k }

// ── Intro ────────────────────────────────────────────────────────────────────
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
            {[['👆', tt('h1', l)], ['🧩', tt('h2', l)], ['🔁', tt('h3', l)], ['🧪', tt('h4', l)]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/60">
                <span className="text-base w-5 shrink-0 text-center">{e}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/35 text-xs mb-6 leading-relaxed px-1">{tt('disc', l)}</p>
        <button onClick={onStart}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20">
          {tt('start', l)}
        </button>
      </div>
    </div>
  )
}

// ── SVG del puente ─────────────────────────────────────────────────────────────
function Support({ x, y }) {
  const ground = y > 250
  const w = 26, h = 12
  return (
    <g>
      <rect x={x - w / 2} y={ground ? y : y - h} width={w} height={h} rx={2} fill={COL.anchor} />
      {[0, 1, 2, 3].map(i => {
        const sx = x - w / 2 + 4 + i * 6
        return ground
          ? <line key={i} x1={sx} y1={y + h} x2={sx - 5} y2={y + h + 6} stroke={COL.anchor} strokeWidth={1.5} />
          : <line key={i} x1={sx} y1={y - h} x2={sx - 5} y2={y - h - 6} stroke={COL.anchor} strokeWidth={1.5} />
      })}
    </g>
  )
}

function ForceBadge({ x, y, force }) {
  const isT = force === 'tension'
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill="#0d1117" stroke={isT ? COL.tension : COL.compression} strokeWidth={1.5} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="bold"
        fill={isT ? COL.tension : COL.compression} style={{ userSelect: 'none' }}>
        {isT ? 'T' : 'C'}
      </text>
    </g>
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

  const [assign, setAssign] = useState({})         // memberId → 'beam' | 'cable' | undefined
  const [mode, setMode] = useState('build')        // build | testing | result
  const [result, setResult] = useState(null)       // { won, bad }
  const [warn, setWarn] = useState(false)

  const [totalScore, setTotalScore] = useState(0)
  const [levelsCleared, setLevelsCleared] = useState(0)

  const timerRef = useRef(null)
  const startedAtRef = useRef(0)

  const spent = level.members.reduce((s, m) => s + pieceCost(assign[m.id]), 0)
  const budgetLeft = level.budget - spent
  const allFilled = level.members.every(m => assign[m.id])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const loadLevel = useCallback((idx) => {
    setLevelIdx(idx)
    setAssign({})
    setMode('build')
    setResult(null)
  }, [])

  function cycleMember(id) {
    if (mode !== 'build') return
    setAssign(prev => {
      const order = [undefined, 'beam', 'cable']
      const idx = order.indexOf(prev[id])
      const otherSpent = level.members.reduce((s, m) => s + (m.id === id ? 0 : pieceCost(prev[m.id])), 0)
      for (let step = 1; step <= 3; step++) {
        const next = order[(idx + step) % 3]
        if (otherSpent + pieceCost(next) <= level.budget) return { ...prev, [id]: next }
      }
      setWarn(true); setTimeout(() => setWarn(false), 1500)
      return prev
    })
  }

  function runTest() {
    if (!allFilled) { setWarn(true); setTimeout(() => setWarn(false), 1500); return }
    const bad = level.members.find(m => !pieceHolds(assign[m.id], m.force)) || null
    const ev = { won: !bad, bad }
    setResult(ev)
    setMode('testing')
    timerRef.current = setTimeout(() => {
      if (ev.won) {
        const gained = BASE_LEVEL + Math.max(0, budgetLeft)
        setTotalScore(s => s + gained)
        setLevelsCleared(c => c + 1)
      }
      setMode('result')
    }, 1300)
  }

  function backToBuild() { setMode('build'); setResult(null) }

  function goNext() {
    if (levelIdx + 1 >= LEVELS.length) { setScreen('end'); return }
    loadLevel(levelIdx + 1)
  }

  function restartAll() {
    setTotalScore(0); setLevelsCleared(0)
    startedAtRef.current = Date.now()
    loadLevel(0)
    setScreen('play')
  }

  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    saveActivity(user.uid, {
      type: 'juego', game: 'puentes', category: 'fisica',
      score: totalScore, passed: levelsCleared > 0,
      coinsEarned: computeCoins('puentes', { score: totalScore }),
      timeSpent: Math.round((Date.now() - startedAtRef.current) / 1000),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user, totalScore, levelsCleared])

  // ── SEO / pantallas simples ──
  const seo = {
    es: { title: 'Puentes — Juego de física estructural', desc: 'Elige viga o cable en cada tramo del puente y aguanta la carga. Aprende tensión y compresión jugando. Gratis, sin instalar.', path: '/juegos/puentes' },
    en: { title: 'Bridges — Structural physics game', desc: 'Pick beam or cable for each bridge member and hold the load. Learn tension and compression by playing. Free, no install.', path: '/en/juegos/puentes' },
    ca: { title: 'Ponts — Joc de física estructural', desc: 'Tria biga o cable a cada tram del pont i aguanta la càrrega. Aprèn tensió i compressió jugant. Gratis, sense instal·lar.', path: '/ca/juegos/puentes' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><Intro l={l} onStart={() => { startedAtRef.current = Date.now(); setScreen('play') }} /></>)
  }

  if (screen === 'end') {
    const shareText = l === 'en'
      ? `I finished ${levelsCleared}/${LEVELS.length} bridges in Puentes 🌉 — ${totalScore} pts. Try it! https://tuthor.es/juegos/puentes`
      : l === 'ca'
      ? `He acabat ${levelsCleared}/${LEVELS.length} ponts a Puentes 🌉 — ${totalScore} pts. Prova-ho! https://tuthor.es/juegos/puentes`
      : `He terminado ${levelsCleared}/${LEVELS.length} puentes en Puentes 🌉 — ${totalScore} pts. ¡Pruébalo! https://tuthor.es/juegos/puentes`
    const msg = { es: levelsCleared >= LEVELS.length ? '¡Ingeniero de puentes! 🏗️' : '¡Buen trabajo!', en: levelsCleared >= LEVELS.length ? 'Bridge engineer! 🏗️' : 'Good work!', ca: levelsCleared >= LEVELS.length ? 'Enginyer de ponts! 🏗️' : 'Bon treball!' }[l]
    return (
      <GameEndScreen game="puentes" emoji="🌉" title={tt('endTitle', l)} score={totalScore} message={msg}
        stats={[{ label: tt('levelsCleared', l), value: `${levelsCleared}/${LEVELS.length}`, emoji: '🌉' }]}
        shareText={shareText} onPlayAgain={restartAll} playAgainLabel={tt('again', l)} user={user} lang={lang} />
    )
  }

  const P = level.nodes
  const testing = mode === 'testing' || mode === 'result'
  const showForces = level.showForces || mode === 'result' // en result siempre se revelan

  const midpoint = (a, b) => ({ x: (P[a].x + P[b].x) / 2, y: (P[a].y + P[b].y) / 2 })

  function memberStroke(m) {
    const t = assign[m.id]
    if (!testing) {
      if (!t) return { color: COL.empty, width: 4, dash: '7 7' }
      return { color: PIECES[t].color, width: t === 'beam' ? 7 : 4, dash: null }
    }
    const holds = pieceHolds(t, m.force)
    return { color: holds ? COL.ok : COL.bad, width: t === 'beam' ? 7 : 4, dash: holds ? null : '8 6' }
  }

  const loadNode = P[level.loadAt]
  const loadDropped = mode === 'result' && result && !result.won
  const loadY = loadNode.y + (loadDropped ? 55 : 0)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[760px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🌉 {tt('level', l)} {levelIdx + 1}/{LEVELS.length}</p>
          <p className="text-white font-bold text-base">{level.name[l] ?? level.name.es}</p>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-[10px] uppercase tracking-widest">{tt('budget', l)}</p>
          <p className={`font-black text-lg ${budgetLeft < 0 ? 'text-red-400' : 'text-[#EDAE49]'}`}>{budgetLeft}<span className="text-white/30 text-sm">/{level.budget}</span></p>
        </div>
      </div>

      {/* Pista */}
      {mode === 'build' && (
        <div className="w-full max-w-[760px] mb-2 px-1">
          <p className="text-white/45 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2">💡 {level.hint[l] ?? level.hint.es}</p>
        </div>
      )}

      {/* Lienzo SVG */}
      <div className="relative w-full max-w-[760px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]" style={{ aspectRatio: `${FIELD.W} / ${FIELD.H}` }}>
        <svg viewBox={`0 0 ${FIELD.W} ${FIELD.H}`} width="100%" style={{ display: 'block' }}>
          {/* Tramos fijos (tablero dado) */}
          {level.fixed.map(([a, b], i) => (
            <line key={`f${i}`} x1={P[a].x} y1={P[a].y} x2={P[b].x} y2={P[b].y}
              stroke="#475569" strokeWidth={8} strokeLinecap="round" />
          ))}

          {/* Tramos editables */}
          {level.members.map(m => {
            const s = memberStroke(m)
            return (
              <g key={m.id} onClick={() => cycleMember(m.id)} style={{ cursor: mode === 'build' ? 'pointer' : 'default' }}>
                {/* zona de click ancha */}
                <line x1={P[m.a].x} y1={P[m.a].y} x2={P[m.b].x} y2={P[m.b].y}
                  stroke="transparent" strokeWidth={22} strokeLinecap="round" />
                <line x1={P[m.a].x} y1={P[m.a].y} x2={P[m.b].x} y2={P[m.b].y}
                  stroke={s.color} strokeWidth={s.width} strokeLinecap="round"
                  strokeDasharray={s.dash || undefined}
                  style={{ transition: 'stroke 0.35s' }} />
              </g>
            )
          })}

          {/* Insignias de fuerza */}
          {showForces && level.members.map(m => {
            const mp = midpoint(m.a, m.b)
            return <ForceBadge key={`b${m.id}`} x={mp.x} y={mp.y} force={m.force} />
          })}

          {/* Nodos */}
          {Object.entries(P).map(([id, p]) => (
            <circle key={id} cx={p.x} cy={p.y} r={level.supports.includes(id) ? 5 : 6}
              fill={level.supports.includes(id) ? COL.anchor : COL.node} />
          ))}

          {/* Soportes anclados */}
          {level.supports.map(id => <Support key={`s${id}`} x={P[id].x} y={P[id].y} />)}

          {/* Carga */}
          <g style={{ transition: 'transform 0.5s' }}>
            <text x={loadNode.x} y={loadY - 12} textAnchor="middle" fontSize="26" style={{ userSelect: 'none' }}>📦</text>
          </g>

          {/* Rotura */}
          {mode === 'result' && result && !result.won && result.bad && (() => {
            const mp = midpoint(result.bad.a, result.bad.b)
            return <text x={mp.x} y={mp.y + 6} textAnchor="middle" fontSize="24" style={{ userSelect: 'none' }}>💥</text>
          })()}
        </svg>

        {/* Overlay de resultado */}
        {mode === 'result' && result && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm px-6 text-center">
            {result.won ? (
              <>
                <p className="text-5xl mb-2">🎉</p>
                <p className="text-green-400 font-black text-2xl mb-3">{tt('hold', l)}</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3 w-full max-w-xs text-left text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-white/50">{tt('scoreBase', l)}</span><span className="text-white font-bold">+{BASE_LEVEL}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">{tt('scoreBudget', l)}</span><span className="text-white font-bold">+{Math.max(0, budgetLeft)}</span></div>
                  <div className="flex justify-between border-t border-white/10 pt-1 mt-1"><span className="text-[#EDAE49] font-bold">{tt('level', l)}</span><span className="text-[#EDAE49] font-black">{totalScore}</span></div>
                </div>
                <p className="text-white/60 text-xs mb-4 max-w-sm"><span className="text-white/40 font-semibold uppercase tracking-wide">{tt('why', l)}:</span> {level.principle[l] ?? level.principle.es}</p>
                <button onClick={goNext} className="px-6 py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
                  {levelIdx + 1 >= LEVELS.length ? tt('seeRes', l) : tt('next', l)}
                </button>
              </>
            ) : (
              <>
                <p className="text-5xl mb-2">💥</p>
                <p className="text-red-400 font-black text-xl mb-3">{tt('fail', l)}</p>
                <p className="text-white/70 text-sm mb-5 max-w-sm">
                  {{
                    es: 'Pusiste un CABLE en un tramo que EMPUJA (compresión). Un cable solo aguanta tirando, no empujando: cámbialo por una VIGA.',
                    en: 'You put a CABLE on a member that PUSHES (compression). A cable only holds by pulling, not pushing: swap it for a BEAM.',
                    ca: 'Has posat un CABLE en un tram que EMPENY (compressió). Un cable només aguanta estirant, no empenyent: canvia’l per una BIGA.',
                  }[l]}
                </p>
                <button onClick={backToBuild} className="px-6 py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tt('rebuild', l)}</button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="w-full max-w-[760px] mt-2 px-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/50">
        <span className="flex items-center gap-1.5"><span className="w-4 h-1.5 rounded" style={{ background: PIECES.beam.color }} />{PIECES.beam.label[l]} ·{PIECES.beam.cost}</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-1 rounded" style={{ background: PIECES.cable.color }} />{PIECES.cable.label[l]} ·{PIECES.cable.cost}</span>
        {showForces && <>
          <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full border" style={{ borderColor: COL.tension, color: COL.tension }}>&nbsp;</span>{tt('tension', l)}</span>
          <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-full border" style={{ borderColor: COL.compression, color: COL.compression }}>&nbsp;</span>{tt('compression', l)}</span>
        </>}
      </div>

      {/* Aviso */}
      <div className="h-5 mt-1">
        {warn && <p className="text-amber-400 text-xs">{allFilled ? tt('noBudget', l) : tt('fill', l)}</p>}
      </div>

      {/* Controles */}
      {mode === 'build' && (
        <div className="w-full max-w-[760px] flex justify-center px-1">
          <button onClick={runTest} disabled={!allFilled}
            className="px-8 py-3 rounded-xl text-base font-black bg-[#EDAE49] text-black hover:bg-amber-400 transition disabled:opacity-40 disabled:cursor-not-allowed">
            {tt('test', l)}
          </button>
        </div>
      )}
      {mode === 'testing' && (
        <div className="w-full max-w-[760px] flex justify-center px-1">
          <span className="text-white/50 text-sm">{tt('testing', l)}</span>
        </div>
      )}
    </div>
  )
}
