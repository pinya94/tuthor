import { useState, useRef, useEffect, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'
import { POOLS } from '../data/porteroLevels'
import {
  VIEW, W, H, ANIM_DURATION,
  toSVG, GridLines, Ball, FnCurve,
} from './TrayectoriaField'

// ── Zone definitions ──────────────────────────────────────────────────────────
// The goal is a vertical opening at x = goalX, spanning y ∈ [-4, 4]
// divided into 4 equal y-bands of 2 units each.

const GOAL_ZONES = [
  {
    id: 'A',
    yMin: 2, yMax: 4,
    label:  { es: 'Zona alta',   en: 'High zone',    ca: 'Zona alta'   },
    range:  { es: 'y ≥ 2',       en: 'y ≥ 2',        ca: 'y ≥ 2'       },
    color: '#3b82f6',
    arrow: '⬆',
  },
  {
    id: 'B',
    yMin: 0, yMax: 2,
    label:  { es: 'Centro-alto', en: 'Upper centre',  ca: 'Centre-alt'  },
    range:  { es: '0 ≤ y < 2',   en: '0 ≤ y < 2',    ca: '0 ≤ y < 2'   },
    color: '#22c55e',
    arrow: '↗',
  },
  {
    id: 'C',
    yMin: -2, yMax: 0,
    label:  { es: 'Centro-bajo', en: 'Lower centre',  ca: 'Centre-baix' },
    range:  { es: '−2 ≤ y < 0',  en: '−2 ≤ y < 0',   ca: '−2 ≤ y < 0'  },
    color: '#f59e0b',
    arrow: '↘',
  },
  {
    id: 'D',
    yMin: -4, yMax: -2,
    label:  { es: 'Zona baja',   en: 'Low zone',      ca: 'Zona baixa'  },
    range:  { es: 'y < −2',      en: 'y < −2',        ca: 'y < −2'      },
    color: '#ef4444',
    arrow: '⬇',
  },
]

function getZone(y) {
  if (y >= 2)  return 'A'
  if (y >= 0)  return 'B'
  if (y >= -2) return 'C'
  return 'D'
}

// ── Field SVG ─────────────────────────────────────────────────────────────────

function GoalZones({ goalX, chosen, correctZone, phase }) {
  const depth = 18 // pixels right of goal line

  return (
    <>
      {GOAL_ZONES.map(z => {
        const [gx, pyTop] = toSVG(goalX, z.yMax)
        const [,   pyBot] = toSVG(goalX, z.yMin)
        const height = pyBot - pyTop

        const isChosen  = chosen === z.id
        const isCorrect = phase === 'result' && correctZone === z.id
        const isWrong   = phase === 'result' && isChosen && !isCorrect

        let fill   = z.color + '28'
        let stroke = z.color + '55'
        if (isCorrect) { fill = z.color + '70'; stroke = z.color }
        if (isWrong)   { fill = '#ef444430';     stroke = '#ef4444' }

        return (
          <g key={z.id}>
            {/* Net behind goal */}
            <rect x={gx} y={pyTop} width={depth} height={height}
              fill={fill} stroke={stroke} strokeWidth={1.5} />
            {/* Zone letter label */}
            <text x={gx + depth / 2} y={pyTop + height / 2 + 4}
              textAnchor="middle" fontSize="9" fontWeight="bold"
              fill={z.color} style={{ userSelect: 'none' }}>
              {z.id}
            </text>
            {/* Net grid lines */}
            <line x1={gx} y1={pyTop + height / 2} x2={gx + depth} y2={pyTop + height / 2}
              stroke={z.color + '40'} strokeWidth={0.7} />
          </g>
        )
      })}

      {/* Goal posts */}
      {(() => {
        const [gx, pyTop] = toSVG(goalX, 4)
        const [,   pyBot] = toSVG(goalX, -4)
        return (
          <>
            {/* Back net outline */}
            <line x1={gx + depth} y1={pyTop} x2={gx + depth} y2={pyBot}
              stroke="#ffffff30" strokeWidth={1} />
            {/* Main post line */}
            <line x1={gx} y1={pyTop} x2={gx} y2={pyBot} stroke="white" strokeWidth={3} />
            {/* Top and bottom bars */}
            <line x1={gx} y1={pyTop} x2={gx + depth} y2={pyTop} stroke="white" strokeWidth={2.5} />
            <line x1={gx} y1={pyBot} x2={gx + depth} y2={pyBot} stroke="white" strokeWidth={2.5} />
            {/* Zone dividers on post */}
            {GOAL_ZONES.slice(0, 3).map(z => {
              const [, py] = toSVG(goalX, z.yMin)
              return <line key={z.id} x1={gx} y1={py} x2={gx + depth} y2={py}
                stroke="#ffffff50" strokeWidth={1} />
            })}
          </>
        )
      })()}

      {/* Result emoji at zone */}
      {phase === 'result' && correctZone && (() => {
        const z = GOAL_ZONES.find(z => z.id === correctZone)
        if (!z) return null
        const [gx, pyTop] = toSVG(goalX, z.yMax)
        const [,   pyBot] = toSVG(goalX, z.yMin)
        const cy = (pyTop + pyBot) / 2
        return (
          <text x={gx + depth / 2} y={cy + 7}
            textAnchor="middle" fontSize="14" style={{ userSelect: 'none' }}>
            {chosen === correctZone ? '🧤' : '⚽'}
          </text>
        )
      })()}
    </>
  )
}

function PorteroField({ question, phase, chosen, ballPos, trail }) {
  if (!question) return null
  const { fn, startX, goalX } = question
  const correctZone = getZone(fn(goalX))
  const [startPx, startPy] = toSVG(startX, fn(startX))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <GridLines />

      {/* Goal zones (always visible) */}
      <GoalZones goalX={goalX} chosen={chosen} correctZone={correctZone} phase={phase} />

      {/* "Portería en x = N" label on x-axis */}
      {(() => {
        const [gx, py0] = toSVG(goalX, 0)
        return (
          <text x={gx - 2} y={py0 + 14} textAnchor="middle" fontSize="8" fill="#ffffff50"
            style={{ userSelect: 'none' }}>
            x={goalX}
          </text>
        )
      })()}

      {/* Starting ball (choose phase only) */}
      {phase === 'choose' && (
        <g>
          <circle cx={startPx} cy={startPy} r={10} fill="#EDAE4930" />
          <text x={startPx} y={startPy + 5} textAnchor="middle" fontSize="14"
            style={{ userSelect: 'none' }}>⚽</text>
        </g>
      )}

      {/* Curve (shown after pick) */}
      {(phase === 'animating' || phase === 'result') && (
        <FnCurve fn={fn} color="#EDAE4980" xStart={startX} xEnd={goalX + 0.3} />
      )}

      {/* Show correct curve in green on result */}
      {phase === 'result' && chosen !== correctZone && (
        <FnCurve fn={fn} color="#22c55e60" xStart={startX} xEnd={goalX + 0.3} />
      )}

      {/* Animated ball */}
      {ballPos && <Ball x={ballPos[0]} y={ballPos[1]} trail={trail} />}
    </svg>
  )
}

// ── Difficulty screen ─────────────────────────────────────────────────────────

const DIFS = {
  easy:   { emoji: '🟢', label: { es: 'Fácil',   en: 'Easy',   ca: 'Fàcil'   },
    desc: { es: 'Rectas simples · f(x) = mx',               en: 'Simple lines · f(x) = mx',             ca: 'Rectes simples · f(x) = mx'             } },
  medium: { emoji: '🟡', label: { es: 'Medio',   en: 'Medium', ca: 'Mitjà'   },
    desc: { es: 'Rectas con pendiente y corte · f(x) = mx + b', en: 'Lines with slope & intercept',     ca: 'Rectes amb pendent i tall'               } },
  hard:   { emoji: '🔴', label: { es: 'Difícil', en: 'Hard',   ca: 'Difícil' },
    desc: { es: 'Parábolas y funciones cuadráticas',         en: 'Parabolas & quadratic functions',      ca: 'Paràboles i funcions quadràtiques'       } },
}

const COPY = {
  badge:   { es: 'Matemáticas · Funciones',                    en: 'Maths · Functions',                    ca: 'Matemàtiques · Funcions'               },
  title:   { es: '🧤 Portero',                                  en: '🧤 Goalkeeper',                         ca: '🧤 Porter'                             },
  sub:     { es: 'Calcula dónde llega el balón y para el tiro', en: 'Calculate where the ball lands and save', ca: 'Calcula on arriba la pilota i atura el tir' },
  time:    { es: 'Tiempo',    en: 'Time',      ca: 'Temps'    },
  timeVal: { es: '90 segundos por partido',   en: '90 seconds per match',   ca: '90 segons per partit'   },
  pts:     { es: 'Puntos',    en: 'Points',    ca: 'Punts'    },
  ptsVal:  { es: 'Cada parada = 10 pts → monedas', en: 'Each save = 10 pts → coins', ca: 'Cada aturada = 10 pts → monedes' },
  zones:   { es: 'Zonas',     en: 'Zones',     ca: 'Zones'    },
  zonesVal:{ es: '4 bandas de altura — calcula f(x₀) y elige', en: '4 height bands — compute f(x₀) and pick', ca: '4 bandes d\'alçada — calcula f(x₀) i tria' },
  how:     { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:      { es: 'Lee la función f(x) que describe la trayectoria del disparo', en: 'Read the function f(x) that describes the shot trajectory', ca: 'Llegeix la funció f(x) que descriu la trajectòria del tir' },
  p2:      { es: 'Calcula f(x₀) donde x₀ es la posición de la portería',       en: 'Calculate f(x₀) where x₀ is the goal position',             ca: 'Calcula f(x₀) on x₀ és la posició de la porteria'        },
  p3:      { es: 'Elige la zona (A, B, C, D) donde entra el balón',            en: 'Pick the zone (A, B, C, D) where the ball enters',           ca: 'Tria la zona (A, B, C, D) on entra la pilota'            },
  p4:      { es: 'La animación muestra la trayectoria real — ¡aprende del error!', en: 'The animation shows the real trajectory — learn from mistakes!', ca: 'L\'animació mostra la trajectòria real — aprèn de l\'error!' },
  pwup:    { es: 'Bonificaciones', en: 'Power-ups', ca: 'Bonificacions' },
  start:   { es: '▶ Empezar partido', en: '▶ Start match', ca: '▶ Començar partit' },
  saves:   { es: 'paradas',   en: 'saves',     ca: 'aturades'  },
  calcQ:   { es: '¿A qué zona llega el balón? · Portería en x =', en: 'Which zone does the ball reach? · Goal at x =', ca: 'A quina zona arriba la pilota? · Porteria a x =' },
  save:    { es: '¡Parada!',      en: 'Save!',       ca: 'Aturada!'     },
  goal:    { es: '¡Gol en contra!', en: 'Goal conceded!', ca: 'Gol en contra!' },
  next:    { es: 'Siguiente →',   en: 'Next →',      ca: 'Següent →'    },
  expTitle:{ es: 'Solución:',     en: 'Solution:',   ca: 'Solució:'     },
  pwupPick:{ es: 'Elige una ventaja permanente', en: 'Pick a permanent power-up', ca: 'Tria un avantatge permanent' },
  end:     { es: 'Partido finalizado', en: 'Full time', ca: 'Partit finalitzat' },
  replay:  { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  changeDif: { es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' },
}

function T(key, l) { return COPY[key]?.[l] ?? COPY[key]?.es ?? key }

// ── Power-ups ─────────────────────────────────────────────────────────────────

const POWERUP_POOL = [
  { id: 'extra_time',    emoji: '⏱️', label: { es: '+5 segundos',    en: '+5 seconds',     ca: '+5 segons'     }, desc: { es: 'Más tiempo para seguir parando',   en: 'More time to keep saving',   ca: 'Més temps per seguir aturant'   } },
  { id: 'extra_time_big',emoji: '⏰', label: { es: '+10 segundos',   en: '+10 seconds',    ca: '+10 segons'    }, desc: { es: 'Gran recarga de tiempo',           en: 'Big time reload',            ca: 'Gran recàrrega de temps'        } },
  { id: 'zone_margin',   emoji: '↔️', label: { es: 'Zona adyacente', en: 'Adjacent zone',   ca: 'Zona adjacent' }, desc: { es: 'La siguiente jugada también acepta la zona contigua', en: 'Next play also accepts the adjacent zone', ca: 'La pròxima jugada també accepta la zona contigua' } },
  { id: 'two_zones',     emoji: '🎯', label: { es: 'Solo 2 zonas',   en: 'Only 2 zones',   ca: 'Només 2 zones' }, desc: { es: 'La siguiente jugada tiene solo 2 opciones', en: 'Next play has only 2 options', ca: 'La pròxima jugada té només 2 opcions' } },
  { id: 'double_save',   emoji: '🛡️', label: { es: 'Doble defensa', en: 'Double defence', ca: 'Doble defensa' }, desc: { es: 'La siguiente jugada puedes elegir 2 zonas', en: 'Next play you can pick 2 zones', ca: 'La pròxima jugada pots triar 2 zones' } },
]

function pickPowerups() {
  return [...POWERUP_POOL].sort(() => Math.random() - 0.5).slice(0, 3)
}

// ── Screens ───────────────────────────────────────────────────────────────────

function DifficultyScreen({ onSelect, l }) {
  const [dif, setDif] = useState('easy')

  const pwupRows = {
    es: [['↔️','Zona adyacente','La siguiente jugada también acepta la zona contigua'],['🛡️','Doble defensa','Puedes elegir 2 zonas en la siguiente jugada'],['🎯','Solo 2 zonas','La siguiente jugada tiene solo 2 opciones'],['⏱️','+5 segundos','Más tiempo de partido'],['⏰','+10 segundos','Gran recarga de tiempo']],
    en: [['↔️','Adjacent zone','Next play also accepts the adjacent zone'],['🛡️','Double defence','Pick 2 zones on the next play'],['🎯','Only 2 zones','Next play shows only 2 options'],['⏱️','+5 seconds','More match time'],['⏰','+10 seconds','Big time reload']],
    ca: [['↔️','Zona adjacent','La pròxima jugada també accepta la zona contigua'],['🛡️','Doble defensa','Pots triar 2 zones a la propera jugada'],['🎯','Només 2 zones','La pròxima jugada té 2 opcions'],['⏱️','+5 segons','Més temps de partit'],['⏰','+10 segons','Gran recàrrega de temps']],
  }
  const pwups = pwupRows[l] ?? pwupRows.es

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        {/* Difficulty tabs */}
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-3 w-fit mx-auto">
          {Object.entries(DIFS).map(([id, d]) => (
            <button key={id} onClick={() => setDif(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                dif === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}>
              {d.emoji} {d.label[l] ?? d.label.es}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-xs text-center mb-5 font-mono">{DIFS[dif].desc[l] ?? DIFS[dif].desc.es}</p>

        {/* Stats */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 space-y-2.5 text-sm">
          {[['⏱️', T('time', l), T('timeVal', l)], ['⭐', T('pts', l), T('ptsVal', l)], ['🥅', T('zones', l), T('zonesVal', l)]].map(([e, k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <span className="text-white/40 shrink-0 pt-0.5">{e} {k}</span>
              <span className="text-white font-semibold text-right">{v}</span>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('how', l)}</p>
          <div className="space-y-2">
            {[['📐', T('p1', l)], ['🧮', T('p2', l)], ['🥅', T('p3', l)], ['🎬', T('p4', l)]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/50">
                <span className="text-base w-5 shrink-0 text-center">{e}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zone guide */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
            {l === 'en' ? 'Zone guide' : l === 'ca' ? 'Guia de zones' : 'Guía de zonas'}
          </p>
          <div className="space-y-2">
            {GOAL_ZONES.map(z => (
              <div key={z.id} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black"
                  style={{ background: z.color + '40', color: z.color }}>{z.id}</span>
                <span className="text-white font-semibold">{z.label[l] ?? z.label.es}</span>
                <span className="ml-auto text-white/40 font-mono text-xs">{z.range[l] ?? z.range.es}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Power-ups */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('pwup', l)}</p>
          <div className="space-y-3">
            {pwups.map(([e, label, desc]) => (
              <div key={label} className="flex items-start gap-3 text-sm">
                <span className="text-lg w-6 shrink-0 text-center">{e}</span>
                <div>
                  <p className="text-white font-semibold">{label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => onSelect(dif)}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20">
          {T('start', l)}
        </button>
      </div>
    </div>
  )
}

function PowerupScreen({ powerups, score, onPick, l }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-sm w-full text-center">
        <div className="text-6xl mb-3" style={{ animation: 'bounce 0.6s infinite alternate' }}>🧤</div>
        <p className="text-green-400 font-black text-3xl mb-1">{T('save', l)}</p>
        <p className="text-white font-black text-5xl mb-1">{score}</p>
        <p className="text-white/40 text-sm mb-8">{T('saves', l)}</p>
        <p className="text-white/60 text-sm font-semibold mb-4">{T('pwupPick', l)}</p>
        <div className="space-y-3">
          {powerups.map(pw => (
            <button key={pw.id} onClick={() => onPick(pw)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#EDAE49]/50 rounded-2xl p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98] group">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{pw.emoji}</span>
                <div>
                  <p className="font-black text-white text-lg group-hover:text-[#EDAE49] transition-colors">{pw.label[l] ?? pw.label.es}</p>
                  <p className="text-white/45 text-sm mt-0.5">{pw.desc[l] ?? pw.desc.es}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function EndScreen({ score, l, onRestart, onChangeDiff }) {
  const msgs = { es: score === 0 ? '¡A practicar más!' : score < 3 ? 'Buen intento' : score < 7 ? '¡Buen partido!' : '¡Portero del año! 🔥', en: score === 0 ? 'Keep practising!' : score < 3 ? 'Good try' : score < 7 ? 'Good game!' : 'Goalkeeper of the year! 🔥', ca: score === 0 ? 'A practicar!' : score < 3 ? 'Bon intent' : score < 7 ? 'Bon partit!' : 'Porter de l\'any! 🔥' }
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <p className="text-6xl mb-3">🧤</p>
      <p className="text-white/40 text-sm mb-1">{T('end', l)}</p>
      <p className="text-5xl font-black text-white mb-1">{score}</p>
      <p className="text-white/60 text-lg mb-2">{T('saves', l)}</p>
      <p className="text-[#EDAE49] font-bold mb-8">{msgs[l] ?? msgs.es}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={onRestart} className="px-6 py-3 rounded-full bg-[#EDAE49] text-black font-bold hover:bg-[#f5c16c] transition-colors">{T('replay', l)}</button>
        <button onClick={onChangeDiff} className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">{T('changeDif', l)}</button>
      </div>
    </div>
  )
}

// ── Main game ─────────────────────────────────────────────────────────────────

const GAME_TIME = 90

export default function Portero() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen]         = useState('difficulty')
  const [difficulty, setDifficulty] = useState(null)
  const [timeLeft, setTimeLeft]     = useState(GAME_TIME)
  const [score, setScore]           = useState(0)
  const [question, setQuestion]     = useState(null)
  const [usedIds, setUsedIds]       = useState([])

  const [phase, setPhase]           = useState('choose')
  const [chosen, setChosen]         = useState(null)
  const [secondChosen, setSecondChosen] = useState(null)
  const [ballPos, setBallPos]       = useState(null)
  const [trail, setTrail]           = useState([])
  const [outcome, setOutcome]       = useState(null)
  const [pendingPowerups, setPendingPowerups] = useState(null)

  // power-up flags
  const zoneMarginRef   = useRef(false)  // adjacent zone also counts as save
  const doubleSaveRef   = useRef(false)  // allow 2 zone picks
  const twoZonesRef     = useRef(false)  // hide 2 wrong zones
  const visibleZonesRef = useRef(null)   // which zone ids to show (null = all 4)

  const animRef  = useRef(null)
  const timerRef = useRef(null)
  const phaseRef = useRef('choose')
  const scoreRef = useRef(0)
  const timeRef  = useRef(GAME_TIME)

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const nextQuestion = useCallback((diff, prevUsed) => {
    const pool = POOLS[diff]
    const available = pool.filter(q => !prevUsed.includes(q.id))
    const src = available.length > 0 ? available : pool
    const q = src[Math.floor(Math.random() * src.length)]
    const newUsed = available.length > 0 ? [...prevUsed, q.id] : [q.id]
    setUsedIds(newUsed)

    // twoZones: pick correct + 1 random wrong, reset flag
    if (twoZonesRef.current) {
      const correct = getZone(q.fn(q.goalX))
      const others = GOAL_ZONES.filter(z => z.id !== correct)
      const wrong = others[Math.floor(Math.random() * others.length)].id
      visibleZonesRef.current = [correct, wrong].sort(() => Math.random() - 0.5)
      twoZonesRef.current = false
    } else {
      visibleZonesRef.current = null
    }

    setQuestion(q)
    setPhase('choose')
    setChosen(null)
    setSecondChosen(null)
    setBallPos(null)
    setTrail([])
    setOutcome(null)
    if (animRef.current) cancelAnimationFrame(animRef.current)
  }, [])

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0)
    setTimeLeft(GAME_TIME)
    zoneMarginRef.current  = false
    doubleSaveRef.current = false
    twoZonesRef.current   = false
    visibleZonesRef.current = null
    nextQuestion(diff, [])
  }

  // timer
  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => {
      if (phaseRef.current === 'powerup') return
      setTimeLeft(tl => {
        if (tl <= 1) { clearInterval(timerRef.current); setScreen('end'); return 0 }
        return tl - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])

  // save activity
  useEffect(() => {
    if (screen !== 'end') return
    const pts = scoreRef.current * 10
    if (user?.uid) {
      saveActivity(user.uid, {
        type: 'juego', game: 'portero', category: 'matematicas',
        score: pts, passed: scoreRef.current > 0,
        timeSpent: GAME_TIME - timeRef.current,
      }).catch(() => {})
    }
  }, [screen, user])

  useEffect(() => () => {
    if (animRef.current)  cancelAnimationFrame(animRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  function handleZonePick(zoneId) {
    if (phase !== 'choose' || !question) return

    if (doubleSaveRef.current && !chosen) {
      setChosen(zoneId)
      return // wait for second pick
    }
    if (doubleSaveRef.current && chosen && !secondChosen && zoneId !== chosen) {
      setSecondChosen(zoneId)
      doubleSaveRef.current = false
      animateShot(chosen, zoneId)
      return
    }
    if (!doubleSaveRef.current) {
      setChosen(zoneId)
      animateShot(zoneId, null)
    }
  }

  function animateShot(zone1, zone2) {
    if (!question) return
    setPhase('animating')

    const { fn, startX, goalX } = question
    const endX = goalX + 0.2
    const start = Date.now()
    const trailPts = []

    // Seed trail from start position
    try {
      const y0 = fn(startX)
      if (isFinite(y0)) trailPts.push(toSVG(startX, y0))
    } catch { /* skip */ }

    function animate() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / ANIM_DURATION, 1)
      const x = startX + progress * (endX - startX)
      let y
      try { y = fn(x) } catch { y = null }

      const inView = y !== null && isFinite(y) && y >= VIEW.yMin - 0.5 && y <= VIEW.yMax + 0.5
      if (inView) {
        const pt = toSVG(x, y)
        trailPts.push(pt)
        setBallPos([x, y])
        setTrail([...trailPts].slice(-50))
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        const correctZone = getZone(fn(goalX))
        const ZONE_IDX = { A: 0, B: 1, C: 2, D: 3 }
        const isAdjacent = z => zoneMarginRef.current && Math.abs(ZONE_IDX[z] - ZONE_IDX[correctZone]) === 1
        const saved = zone1 === correctZone || (zone2 && zone2 === correctZone)
          || isAdjacent(zone1) || (zone2 && isAdjacent(zone2))
        zoneMarginRef.current = false // one-shot
        doFinish(saved ? 'save' : 'goal')
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }

  function doFinish(result) {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    setOutcome(result)
    setPhase('result')
    if (result === 'save') {
      setScore(s => s + 1)
      setTimeout(() => {
        setPendingPowerups(pickPowerups())
        setPhase('powerup')
      }, 1200)
    }
  }

  function applyPowerupFixed(pw) {
    setPendingPowerups(null)
    if (pw.id === 'extra_time')     setTimeLeft(tl => Math.min(tl + 5, 999))
    if (pw.id === 'extra_time_big') setTimeLeft(tl => Math.min(tl + 10, 999))
    if (pw.id === 'two_zones')      twoZonesRef.current = true
    if (pw.id === 'double_save')    doubleSaveRef.current = true
    if (pw.id === 'zone_margin')    zoneMarginRef.current = true
    nextQuestion(difficulty, usedIds)
  }

  function skipResult() { nextQuestion(difficulty, usedIds) }

  // ── render ──

  if (screen === 'difficulty') return <DifficultyScreen onSelect={startGame} l={l} />

  if (screen === 'end') {
    return (
      <>
        <EndScreen score={score} l={l} onRestart={() => startGame(difficulty)} onChangeDiff={() => setScreen('difficulty')} />
        {score > 0 && <CoinsAnimation points={score * 10} />}
      </>
    )
  }

  if (!question) return null

  if (phase === 'powerup' && pendingPowerups) {
    return <PowerupScreen powerups={pendingPowerups} score={score} onPick={applyPowerupFixed} l={l} />
  }

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const correctZone = getZone(question.fn(question.goalX))
  const visibleIds = visibleZonesRef.current ?? GOAL_ZONES.map(z => z.id)

  const isDoubleWaiting = doubleSaveRef.current && chosen && !secondChosen

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      {/* Header */}
      <div className="w-full max-w-[600px] flex items-center justify-between mb-3 px-2">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🧤 Portero</p>
          <p className="text-white font-bold text-lg">{score} {T('saves', l)}</p>
        </div>
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff15" strokeWidth="4" />
            <circle cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct)}`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-sm" style={{ color: timerColor }}>{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Function equation */}
      <div className="w-full max-w-[600px] px-2 mb-2">
        <div className="bg-white/8 border border-white/15 rounded-xl px-5 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">
              {T('calcQ', l)} {question.goalX}
            </p>
            <p className="text-white font-black text-xl font-mono">{question.label}</p>
          </div>
          {/* Portería indicator */}
          <div className="text-right shrink-0">
            <p className="text-white/30 text-[10px]">{l === 'en' ? 'Goal at' : l === 'ca' ? 'Porteria a' : 'Portería en'}</p>
            <p className="text-white/70 font-mono text-sm font-bold">x = {question.goalX}</p>
          </div>
        </div>
      </div>

      {/* SVG Field */}
      <div className="relative w-full max-w-[600px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <PorteroField
          question={question}
          phase={phase}
          chosen={chosen}
          ballPos={ballPos}
          trail={trail}
        />

        {/* Save overlay */}
        {phase === 'result' && outcome === 'save' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
            <p className="text-5xl mb-1">🧤</p>
            <p className="text-green-400 font-black text-3xl">{T('save', l)}</p>
          </div>
        )}

        {/* Goal conceded overlay */}
        {phase === 'result' && outcome === 'goal' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm px-4">
            <p className="text-4xl mb-2">⚽</p>
            <p className="text-red-400 font-black text-xl mb-2">{T('goal', l)}</p>
            <p className="text-white/50 text-xs font-semibold mb-1">{T('expTitle', l)}</p>
            <p className="text-white/80 text-sm text-center mb-4 font-mono">
              {question.explanation?.[l] ?? question.explanation?.es}
            </p>
            <button onClick={skipResult}
              className="px-5 py-2 rounded-full bg-[#EDAE49] text-black font-bold text-sm hover:bg-[#f5c16c] transition-colors">
              {T('next', l)}
            </button>
          </div>
        )}
      </div>

      {/* Zone buttons */}
      <div className="w-full max-w-[600px] px-2">
        {isDoubleWaiting ? (
          <p className="text-amber-400 text-xs text-center mb-2">
            {l === 'es' ? 'Elige la segunda zona →' : l === 'en' ? 'Pick the second zone →' : 'Tria la segona zona →'}
          </p>
        ) : doubleSaveRef.current ? (
          <p className="text-white/50 text-xs text-center mb-2">
            {l === 'es' ? 'Doble defensa — elige 2 zonas' : l === 'en' ? 'Double defence — pick 2 zones' : 'Doble defensa — tria 2 zones'}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          {GOAL_ZONES.filter(z => visibleIds.includes(z.id)).map(z => {
            const isChosen  = chosen === z.id || secondChosen === z.id
            const isCorrect = phase === 'result' && correctZone === z.id
            const isWrong   = phase === 'result' && isChosen && !isCorrect

            let borderStyle = { borderColor: z.color + '40' }
            let bgClass = 'bg-white/5 hover:bg-white/10'
            if (isCorrect)       { bgClass = 'bg-green-500/20';  borderStyle = { borderColor: '#22c55e' } }
            else if (isWrong)    { bgClass = 'bg-red-500/20';    borderStyle = { borderColor: '#ef4444' } }
            else if (isChosen)   { bgClass = 'bg-amber-500/20';  borderStyle = { borderColor: '#EDAE49' } }
            else if (phase === 'result') bgClass = 'bg-white/5 opacity-40'

            return (
              <button key={z.id}
                onClick={() => handleZonePick(z.id)}
                disabled={phase !== 'choose'}
                style={borderStyle}
                className={`w-full px-3 py-3 rounded-xl border font-semibold text-sm text-white transition-all flex items-center gap-2 ${bgClass}`}>
                <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: z.color + '40', color: z.color }}>
                  {z.id}
                </span>
                <div className="text-left">
                  <p className="text-white text-xs font-bold">{z.label[l] ?? z.label.es}</p>
                  <p className="text-white/40 text-[10px] font-mono">{z.range[l] ?? z.range.es}</p>
                </div>
                {isChosen && phase === 'choose' && <span className="ml-auto text-xs">🧤</span>}
                {isCorrect && <span className="ml-auto">✓</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
