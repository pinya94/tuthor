import { useState, useRef, useEffect, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'

// ── SVG constants ─────────────────────────────────────────────────────────────
const W = 440
const H = 300
const GOAL = { x1: 80, y1: 28, x2: 360, y2: 162, midX: 220, midY: 95 }
const KICKER_X = 220
const KICKER_Y = 256
const ANIM_DURATION = 900

const ZONES = [
  { id: 'TL', x1: 80,  y1: 28, x2: 220, y2: 95,  cx: 150, cy: 61  },
  { id: 'TR', x1: 220, y1: 28, x2: 360, y2: 95,  cx: 290, cy: 61  },
  { id: 'BL', x1: 80,  y1: 95, x2: 220, y2: 162, cx: 150, cy: 128 },
  { id: 'BR', x1: 220, y1: 95, x2: 360, y2: 162, cx: 290, cy: 128 },
]

const ZONE_LABELS = {
  TL: { es: 'Arriba izquierda', en: 'Top left',     ca: 'Dalt esquerra'  },
  TR: { es: 'Arriba derecha',   en: 'Top right',    ca: 'Dalt dreta'     },
  BL: { es: 'Abajo izquierda',  en: 'Bottom left',  ca: 'Baix esquerra'  },
  BR: { es: 'Abajo derecha',    en: 'Bottom right', ca: 'Baix dreta'     },
}

// ── Level generation ──────────────────────────────────────────────────────────

function generateKick(difficulty, showHint) {
  const zoneId = ZONES[Math.floor(Math.random() * 4)].id
  const isLeft = zoneId.endsWith('L')
  const isTop  = zoneId.startsWith('T')

  let kickerX
  if (showHint) {
    // kicker aims opposite side of their foot position: left kicker → right zone
    kickerX = isLeft
      ? 140 + Math.random() * 40   // kicker right side → ball goes left
      : 260 + Math.random() * 40   // kicker left side  → ball goes right
  } else if (difficulty === 'medium') {
    kickerX = isLeft ? 160 + Math.random() * 60 : 220 + Math.random() * 60
  } else {
    kickerX = 120 + Math.random() * 200 // hard: wide random
  }

  const arrowAngleX = ZONES.find(z => z.id === zoneId).cx - KICKER_X
  const arrowAngleY = ZONES.find(z => z.id === zoneId).cy - KICKER_Y

  return { zoneId, kickerX, arrowAngleX, arrowAngleY, isTop }
}

// ── Field SVG ─────────────────────────────────────────────────────────────────

function PorteroField({ kick, phase, chosen, ballPos, outcome, showHint, doubleDefense, secondChosen, onZoneClick, l }) {
  const isTop = kick?.isTop

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {/* Grass gradient */}
      <defs>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#166534" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#14532d" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="ballGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EDAE49" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EDAE49" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pitch area below goal */}
      <rect x={0} y={0} width={W} height={H} fill="url(#grassGrad)" />

      {/* Center spot */}
      <ellipse cx={KICKER_X} cy={KICKER_Y + 14} rx={18} ry={5} fill="#ffffff12" />

      {/* Net grid */}
      {[...Array(8)].map((_, i) => {
        const x = GOAL.x1 + ((GOAL.x2 - GOAL.x1) / 8) * i
        return <line key={`nv${i}`} x1={x} y1={GOAL.y1} x2={x} y2={GOAL.y2} stroke="#ffffff18" strokeWidth={0.8} />
      })}
      {[...Array(5)].map((_, i) => {
        const y = GOAL.y1 + ((GOAL.y2 - GOAL.y1) / 5) * i
        return <line key={`nh${i}`} x1={GOAL.x1} y1={y} x2={GOAL.x2} y2={y} stroke="#ffffff18" strokeWidth={0.8} />
      })}

      {/* Zone highlights */}
      {ZONES.map(z => {
        const isChosen = chosen === z.id || secondChosen === z.id
        const isCorrect = phase === 'result' && kick?.zoneId === z.id
        const isWrong   = phase === 'result' && isChosen && !isCorrect

        let fill = '#ffffff08'
        let stroke = '#ffffff20'
        if (isCorrect)        { fill = outcome === 'save' ? '#22c55e30' : '#ef444430'; stroke = outcome === 'save' ? '#22c55e' : '#ef4444' }
        else if (isWrong)     { fill = '#ef444415'; stroke = '#ef444440' }
        else if (isChosen)    { fill = '#EDAE4925'; stroke = '#EDAE49' }
        else if (phase === 'choose') { fill = '#ffffff08'; stroke = '#ffffff20' }

        return (
          <rect key={z.id} x={z.x1} y={z.y1}
            width={z.x2 - z.x1} height={z.y2 - z.y1}
            fill={fill} stroke={stroke} strokeWidth={1.5}
            style={{ cursor: phase === 'choose' ? 'pointer' : 'default', transition: 'fill 0.2s, stroke 0.2s' }}
            onClick={() => phase === 'choose' && onZoneClick(z.id)}
          />
        )
      })}

      {/* Zone labels (only during choose) */}
      {phase === 'choose' && ZONES.map(z => (
        <text key={`lbl${z.id}`} x={z.cx} y={z.cy + 4} textAnchor="middle" fontSize="11" fill="#ffffff55"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {ZONE_LABELS[z.id][l] ?? ZONE_LABELS[z.id].es}
        </text>
      ))}

      {/* Goal posts and crossbar */}
      {/* Back net rect */}
      <rect x={GOAL.x1} y={GOAL.y1} width={GOAL.x2 - GOAL.x1} height={GOAL.y2 - GOAL.y1} fill="none" stroke="#ffffff30" strokeWidth={0.5} />
      {/* Posts */}
      <line x1={GOAL.x1} y1={GOAL.y1} x2={GOAL.x1} y2={GOAL.y2 + 8} stroke="white" strokeWidth={5} strokeLinecap="round" />
      <line x1={GOAL.x2} y1={GOAL.y1} x2={GOAL.x2} y2={GOAL.y2 + 8} stroke="white" strokeWidth={5} strokeLinecap="round" />
      {/* Crossbar */}
      <line x1={GOAL.x1 - 2} y1={GOAL.y1} x2={GOAL.x2 + 2} y2={GOAL.y1} stroke="white" strokeWidth={5} strokeLinecap="round" />
      {/* Center dividers (subtle) */}
      <line x1={GOAL.midX} y1={GOAL.y1} x2={GOAL.midX} y2={GOAL.y2} stroke="#ffffff25" strokeWidth={1} />
      <line x1={GOAL.x1} y1={GOAL.midY} x2={GOAL.x2} y2={GOAL.midY} stroke="#ffffff25" strokeWidth={1} />

      {/* Result emoji in zone */}
      {phase === 'result' && kick && (
        <text x={ZONES.find(z => z.id === kick.zoneId).cx}
          y={ZONES.find(z => z.id === kick.zoneId).cy + 6}
          textAnchor="middle" fontSize="28" style={{ userSelect: 'none' }}>
          {outcome === 'save' ? '🧤' : '⚽'}
        </text>
      )}

      {/* Kicker (show during choose) */}
      {phase === 'choose' && kick && (
        <>
          <text x={kick.kickerX} y={KICKER_Y + 6} textAnchor="middle" fontSize="26" style={{ userSelect: 'none' }}>🏃</text>
          {/* Hint arrow (easy mode) */}
          {showHint && (() => {
            const zone = ZONES.find(z => z.id === kick.zoneId)
            const dx = zone.cx - kick.kickerX
            const dy = zone.cy - KICKER_Y
            const len = Math.sqrt(dx * dx + dy * dy)
            const ux = dx / len * 35
            const uy = dy / len * 35
            return (
              <line
                x1={kick.kickerX} y1={KICKER_Y - 10}
                x2={kick.kickerX + ux} y2={KICKER_Y - 10 + uy}
                stroke="#EDAE4990" strokeWidth={2.5} strokeLinecap="round"
                strokeDasharray="6 3"
              />
            )
          })()}
        </>
      )}

      {/* Ball animation */}
      {ballPos && (
        <g>
          <circle cx={ballPos.x} cy={ballPos.y} r={16} fill="url(#ballGlow)" opacity={0.4} />
          <text x={ballPos.x} y={ballPos.y + 7} textAnchor="middle" fontSize="18" style={{ userSelect: 'none' }}>⚽</text>
        </g>
      )}
    </svg>
  )
}

// ── Power-ups ─────────────────────────────────────────────────────────────────

const POWERUP_POOL = [
  { id: 'double_def', emoji: '🛡️', label: { es: 'Doble defensa', en: 'Double defence', ca: 'Doble defensa' }, desc: { es: 'Cubre 2 zonas en la siguiente parada', en: 'Cover 2 zones on the next save', ca: 'Cobreix 2 zones a la pròxima aturada' } },
  { id: 'extra_time',  emoji: '⏱️', label: { es: '+5 segundos', en: '+5 seconds', ca: '+5 segons' },         desc: { es: 'Más tiempo para seguir parando', en: 'More time to keep saving', ca: 'Més temps per seguir aturant' } },
  { id: 'extra_time_big', emoji: '⏰', label: { es: '+10 segundos', en: '+10 seconds', ca: '+10 segons' },   desc: { es: 'Gran recarga de tiempo', en: 'Big time reload', ca: 'Gran recàrrega de temps' } },
  { id: 'hint',        emoji: '👁️', label: { es: 'Visión de portero', en: 'Keeper\'s vision', ca: 'Visió de porter' }, desc: { es: 'Muestra la pista en la siguiente jugada', en: 'Shows the hint on the next play', ca: 'Mostra la pista a la pròxima jugada' } },
  { id: 'two_zones',   emoji: '🎯', label: { es: 'Solo 2 zonas', en: 'Only 2 zones', ca: 'Només 2 zones' }, desc: { es: 'La siguiente jugada tiene solo 2 opciones', en: 'Next play has only 2 options', ca: 'La propera jugada té només 2 opcions' } },
]

function pickPowerups() {
  return [...POWERUP_POOL].sort(() => Math.random() - 0.5).slice(0, 3)
}

// ── Screens ───────────────────────────────────────────────────────────────────

const DIFS = {
  easy:   { emoji: '🟢', label: { es: 'Fácil',   en: 'Easy',   ca: 'Fàcil'   }, desc: { es: 'Pista visual de dónde va el balón',       en: 'Visual hint of where the ball goes',   ca: 'Pista visual d\'on va la pilota'        } },
  medium: { emoji: '🟡', label: { es: 'Medio',   en: 'Medium', ca: 'Mitjà'   }, desc: { es: 'Solo la posición del delantero te orienta', en: 'Only the striker\'s position guides you', ca: 'Només la posició del davanter t\'orienta' } },
  hard:   { emoji: '🔴', label: { es: 'Difícil', en: 'Hard',   ca: 'Difícil' }, desc: { es: 'Delantero impredecible — puro instinto',    en: 'Unpredictable striker — pure instinct',  ca: 'Davanter impredictible — pur instint'   } },
}

const COPY = {
  badge:   { es: 'Matemáticas · Razonamiento espacial',    en: 'Maths · Spatial reasoning',          ca: 'Matemàtiques · Raonament espacial'   },
  title:   { es: '🧤 Portero',                             en: '🧤 Goalkeeper',                       ca: '🧤 Porter'                           },
  sub:     { es: 'Elige la zona para parar el disparo',    en: 'Pick the zone to stop the shot',      ca: 'Tria la zona per aturar el tir'       },
  difLbl:  { es: 'Dificultad',                             en: 'Difficulty',                          ca: 'Dificultat'                           },
  time:    { es: 'Tiempo',                                 en: 'Time',                                ca: 'Temps'                                },
  timeVal: { es: '90 segundos por partido',                en: '90 seconds per match',                ca: '90 segons per partit'                 },
  pts:     { es: 'Puntos',                                 en: 'Points',                              ca: 'Punts'                                },
  ptsVal:  { es: 'Cada parada = 10 pts → monedas',         en: 'Each save = 10 pts → coins',          ca: 'Cada aturada = 10 pts → monedes'      },
  zones:   { es: 'Zonas',                                  en: 'Zones',                               ca: 'Zones'                                },
  zonesVal:{ es: '4 cuadrantes — solo 1 para el balón',    en: '4 quadrants — only 1 stops the ball', ca: '4 quadrants — només 1 atura la pilota' },
  how:     { es: 'Cómo funciona',                          en: 'How it works',                        ca: 'Com funciona'                         },
  p1:      { es: 'Observa la posición y movimiento del delantero', en: 'Watch the striker\'s position and movement', ca: 'Observa la posició i moviment del davanter' },
  p2:      { es: 'Elige la zona donde crees que va el disparo',    en: 'Pick the zone where you think the shot goes', ca: 'Tria la zona on creus que va el tir'       },
  p3:      { es: 'Si paras el balón, elige una ventaja permanente', en: 'If you save it, pick a permanent advantage', ca: 'Si atures la pilota, tria un avantatge permanent' },
  p4:      { es: 'El partido acaba cuando se agota el tiempo',      en: 'Match ends when time runs out',               ca: 'El partit acaba quan s\'acaba el temps'          },
  pwup:    { es: 'Bonificaciones',                         en: 'Power-ups',                           ca: 'Bonificacions'                        },
  start:   { es: '▶ Empezar partido',                      en: '▶ Start match',                       ca: '▶ Començar partit'                    },
  saves:   { es: 'paradas',                                en: 'saves',                               ca: 'aturades'                             },
  goal:    { es: '¡Gol en contra!',                        en: 'Goal conceded!',                      ca: 'Gol en contra!'                       },
  save:    { es: '¡Parada!',                               en: 'Save!',                               ca: 'Aturada!'                             },
  next:    { es: 'Siguiente →',                            en: 'Next →',                              ca: 'Següent →'                            },
  chooseZone: { es: '¿En qué zona para el balón?',         en: 'Which zone stops the ball?',          ca: 'En quina zona s\'atura la pilota?'    },
  doubleInfo: { es: 'Doble defensa activa — elige 2 zonas', en: 'Double defence — pick 2 zones',      ca: 'Doble defensa activa — tria 2 zones'  },
  pwupTitle:  { es: '¡Parada!',                            en: 'Save!',                               ca: 'Aturada!'                             },
  pwupSub:    { es: 'Elige una ventaja permanente',         en: 'Pick a permanent power-up',           ca: 'Tria un avantatge permanent'          },
  end:     { es: 'Partido finalizado',                     en: 'Full time',                           ca: 'Partit finalitzat'                    },
  replay:  { es: '▶ Jugar de nuevo',                       en: '▶ Play again',                        ca: '▶ Jugar de nou'                       },
  changeDif: { es: 'Cambiar dificultad',                   en: 'Change difficulty',                   ca: 'Canviar dificultat'                   },
}

function t(key, l) {
  return COPY[key]?.[l] ?? COPY[key]?.es ?? key
}

function DifficultyScreen({ onSelect, l }) {
  const [dif, setDif] = useState('easy')
  const pwupLabels = { es: [['🛡️','Doble defensa','Cubre 2 zonas en la siguiente jugada'],['⏱️','+5 segundos','Más tiempo de portería'],['⏰','+10 segundos','Gran recarga de tiempo'],['👁️','Visión de portero','Pista sobre la dirección del disparo'],['🎯','Solo 2 zonas','La siguiente jugada tiene solo 2 opciones']], en: [['🛡️','Double defence','Cover 2 zones on the next play'],['⏱️','+5 seconds','More goalkeeping time'],['⏰','+10 seconds','Big time reload'],['👁️','Keeper\'s vision','Hint about the shot direction'],['🎯','Only 2 zones','Next play shows only 2 options']], ca: [['🛡️','Doble defensa','Cobreix 2 zones a la pròxima jugada'],['⏱️','+5 segons','Més temps de porter'],['⏰','+10 segons','Gran recàrrega de temps'],['👁️','Visió de porter','Pista sobre la direcció del tir'],['🎯','Només 2 zones','La pròxima jugada té només 2 opcions']] }
  const pwups = pwupLabels[l] ?? pwupLabels.es

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{t('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{t('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{t('sub', l)}</p>

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
        <p className="text-white/40 text-xs text-center mb-5">{DIFS[dif].desc[l] ?? DIFS[dif].desc.es}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 space-y-2.5 text-sm">
          {[['⏱️', t('time', l), t('timeVal', l)], ['⭐', t('pts', l), t('ptsVal', l)], ['🥅', t('zones', l), t('zonesVal', l)]].map(([e, k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <span className="text-white/40 shrink-0 pt-0.5">{e} {k}</span>
              <span className="text-white font-semibold text-right">{v}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t('how', l)}</p>
          <div className="space-y-2">
            {[['🏃', t('p1', l)], ['🥅', t('p2', l)], ['🎁', t('p3', l)], ['⏰', t('p4', l)]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/50">
                <span className="text-base w-5 shrink-0 text-center">{e}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t('pwup', l)}</p>
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
          {t('start', l)}
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
        <p className="text-green-400 font-black text-3xl mb-1">{t('pwupTitle', l)}</p>
        <p className="text-white font-black text-5xl mb-1">{score}</p>
        <p className="text-white/40 text-sm mb-8">{t('saves', l)}</p>
        <p className="text-white/60 text-sm font-semibold mb-4">{t('pwupSub', l)}</p>
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
  const msgs = {
    es: score === 0 ? '¡A practicar más!' : score < 3 ? 'Buen intento' : score < 7 ? '¡Buen partido!' : '¡Portero del año! 🔥',
    en: score === 0 ? 'Keep practising!'  : score < 3 ? 'Good try'    : score < 7 ? 'Good game!'    : 'Goalkeeper of the year! 🔥',
    ca: score === 0 ? 'A practicar!'      : score < 3 ? 'Bon intent'  : score < 7 ? 'Bon partit!'   : 'Porter de l\'any! 🔥',
  }
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <p className="text-6xl mb-3">🧤</p>
      <p className="text-white/40 text-sm mb-1">{t('end', l)}</p>
      <p className="text-5xl font-black text-white mb-1">{score}</p>
      <p className="text-white/60 text-lg mb-2">{t('saves', l)}</p>
      <p className="text-[#EDAE49] font-bold mb-8">{msgs[l] ?? msgs.es}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={onRestart} className="px-6 py-3 rounded-full bg-[#EDAE49] text-black font-bold hover:bg-[#f5c16c] transition-colors">
          {t('replay', l)}
        </button>
        <button onClick={onChangeDiff} className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
          {t('changeDif', l)}
        </button>
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

  const [screen, setScreen]       = useState('difficulty')
  const [difficulty, setDifficulty] = useState(null)
  const [timeLeft, setTimeLeft]   = useState(GAME_TIME)
  const [score, setScore]         = useState(0)
  const [kick, setKick]           = useState(null)
  const [phase, setPhase]         = useState('choose')
  const [chosen, setChosen]       = useState(null)
  const [secondChosen, setSecondChosen] = useState(null)
  const [ballPos, setBallPos]     = useState(null)
  const [outcome, setOutcome]     = useState(null)
  const [pendingPowerups, setPendingPowerups] = useState(null)

  // persistent power-up flags
  const showHintRef       = useRef(false)
  const doubleDefenseRef  = useRef(false)
  const twoZonesRef       = useRef(false)

  const animRef  = useRef(null)
  const timerRef = useRef(null)
  const phaseRef = useRef('choose')
  const scoreRef = useRef(0)
  const timeLeftRef = useRef(GAME_TIME)

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeLeftRef.current = timeLeft }, [timeLeft])

  function newKick(diff, showHint) {
    const k = generateKick(diff ?? difficulty, showHint ?? showHintRef.current)

    // Apply twoZones: only show 2 of 4 zones (the correct + 1 random wrong)
    if (twoZonesRef.current) {
      k.visibleZones = [k.zoneId, ZONES.find(z => z.id !== k.zoneId && Math.random() > 0.5)?.id ?? ZONES.find(z => z.id !== k.zoneId).id]
      twoZonesRef.current = false
    } else {
      k.visibleZones = null // show all 4
    }

    setKick(k)
    setPhase('choose')
    setChosen(null)
    setSecondChosen(null)
    setBallPos(null)
    setOutcome(null)
    if (animRef.current) cancelAnimationFrame(animRef.current)
  }

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0)
    setTimeLeft(GAME_TIME)
    showHintRef.current = diff === 'easy'
    doubleDefenseRef.current = false
    twoZonesRef.current = false
    newKick(diff, diff === 'easy')
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

  // save activity on end
  useEffect(() => {
    if (screen !== 'end') return
    const pts = scoreRef.current * 10
    if (user?.uid) {
      saveActivity(user.uid, {
        type: 'juego',
        game: 'portero',
        category: 'matematicas',
        score: pts,
        passed: scoreRef.current > 0,
        timeSpent: GAME_TIME - timeLeftRef.current,
      }).catch(() => {})
    }
  }, [screen, user])

  function handleZoneClick(zoneId) {
    if (phase !== 'choose' || !kick) return

    if (doubleDefenseRef.current && !chosen) {
      setChosen(zoneId)
      return // wait for second click
    }
    if (doubleDefenseRef.current && chosen && !secondChosen && zoneId !== chosen) {
      setSecondChosen(zoneId)
      doubleDefenseRef.current = false
      shoot(chosen, zoneId)
      return
    }
    if (!doubleDefenseRef.current) {
      setChosen(zoneId)
      shoot(zoneId, null)
    }
  }

  function shoot(zone1, zone2) {
    if (!kick) return
    setPhase('animating')

    const targetZone = ZONES.find(z => z.id === kick.zoneId)
    const startX = KICKER_X
    const startY = KICKER_Y
    const endX = targetZone.cx
    const endY = targetZone.cy
    const start = Date.now()

    function animate() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / ANIM_DURATION, 1)
      // ease-out
      const t = 1 - Math.pow(1 - progress, 2)
      setBallPos({ x: startX + (endX - startX) * t, y: startY + (endY - startY) * t })

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        const saved = zone1 === kick.zoneId || zone2 === kick.zoneId
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
      }, 900)
    }
  }

  function applyPowerup(pw) {
    setPendingPowerups(null)
    let nextHint = showHintRef.current

    if (pw.id === 'extra_time')     setTimeLeft(tl => Math.min(tl + 5, 999))
    if (pw.id === 'extra_time_big') setTimeLeft(tl => Math.min(tl + 10, 999))
    if (pw.id === 'double_def')     doubleDefenseRef.current = true
    if (pw.id === 'hint')           { nextHint = true; showHintRef.current = true }
    if (pw.id === 'two_zones')      twoZonesRef.current = true

    newKick(difficulty, nextHint)
    if (pw.id === 'hint') showHintRef.current = false // one-shot: reset after applying to kick
  }

  function skipResult() {
    newKick(difficulty)
  }

  useEffect(() => () => {
    if (animRef.current)  cancelAnimationFrame(animRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

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

  if (!kick) return null

  if (phase === 'powerup' && pendingPowerups) {
    return <PowerupScreen powerups={pendingPowerups} score={score} onPick={applyPowerup} l={l} />
  }

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isDoubleWaiting = doubleDefenseRef.current && chosen && !secondChosen

  const visibleZoneIds = kick.visibleZones ?? ZONES.map(z => z.id)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      {/* Header */}
      <div className="w-full max-w-[540px] flex items-center justify-between mb-3 px-2">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🧤 Portero</p>
          <p className="text-white font-bold text-lg">{score} {t('saves', l)}</p>
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

      {/* Field */}
      <div className="relative w-full max-w-[540px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <PorteroField
          kick={kick}
          phase={phase}
          chosen={chosen}
          secondChosen={secondChosen}
          ballPos={ballPos}
          outcome={outcome}
          showHint={showHintRef.current}
          doubleDefense={doubleDefenseRef.current}
          onZoneClick={handleZoneClick}
          l={l}
        />

        {/* Save overlay */}
        {phase === 'result' && outcome === 'save' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
            <p className="text-5xl mb-1">🧤</p>
            <p className="text-green-400 font-black text-3xl">{t('save', l)}</p>
          </div>
        )}

        {/* Goal conceded overlay */}
        {phase === 'result' && outcome === 'goal' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm">
            <p className="text-4xl mb-2">⚽</p>
            <p className="text-red-400 font-black text-xl mb-4">{t('goal', l)}</p>
            <button onClick={skipResult}
              className="px-5 py-2 rounded-full bg-[#EDAE49] text-black font-bold text-sm hover:bg-[#f5c16c] transition-colors">
              {t('next', l)}
            </button>
          </div>
        )}
      </div>

      {/* Zone buttons */}
      <div className="w-full max-w-[540px] px-2">
        <p className="text-white/50 text-xs text-center mb-2">
          {isDoubleWaiting
            ? (l === 'es' ? 'Elige la segunda zona →' : l === 'en' ? 'Pick the second zone →' : 'Tria la segona zona →')
            : (doubleDefenseRef.current
                ? t('doubleInfo', l)
                : t('chooseZone', l))}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {visibleZoneIds.map(zoneId => {
            const isChosen = chosen === zoneId || secondChosen === zoneId
            const isCorrect = phase === 'result' && kick.zoneId === zoneId
            const isWrong   = phase === 'result' && isChosen && !isCorrect
            let bg = 'bg-white/5 hover:bg-white/10 border-white/10'
            if (phase === 'result') {
              if (isCorrect) bg = 'bg-green-500/20 border-green-500'
              else if (isWrong) bg = 'bg-red-500/20 border-red-500'
              else bg = 'bg-white/5 border-white/10 opacity-40'
            } else if (isChosen) {
              bg = 'bg-amber-500/20 border-amber-500'
            }

            const zoneMap = { TL: '↖', TR: '↗', BL: '↙', BR: '↘' }
            return (
              <button key={zoneId}
                onClick={() => handleZoneClick(zoneId)}
                disabled={phase !== 'choose'}
                className={`w-full px-4 py-3 rounded-xl border font-semibold text-sm text-white transition-all flex items-center gap-2 ${bg}`}>
                <span className="text-lg">{zoneMap[zoneId]}</span>
                <span>{ZONE_LABELS[zoneId][l] ?? ZONE_LABELS[zoneId].es}</span>
                {isChosen && phase === 'choose' && <span className="ml-auto text-xs text-amber-400">🧤</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
