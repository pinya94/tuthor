// ── Pentagrama Path: pentagrama SVG ──────────────────────────────────────────
// Renderizado propio (sin VexFlow): 5 líneas, clave de sol/fa, notas con
// plica y corchete, líneas adicionales, alteraciones, silencios y playhead.
// Las X se derivan del pulso acumulado (`cum`) de cada nota, de modo que el
// playhead (en pulsos) y las notas comparten la misma escala temporal.

const LETTER_STEP = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 }

// Paso diatónico absoluto: C4 → 28, D4 → 29...
function stepOf(pitch) {
  const m = /^([A-G])#?(\d)$/.exec(pitch)
  return Number(m[2]) * 7 + LETTER_STEP[m[1]]
}

const CLAVES = {
  sol: { bottomStep: stepOf('E4'), glyph: '𝄞', glyphY: 84, glyphSize: 62 },
  fa:  { bottomStep: stepOf('G2'), glyph: '𝄢', glyphY: 66, glyphSize: 44 },
}

const Y_BOTTOM = 100  // línea inferior del pentagrama
const GAP = 16        // separación entre líneas
const HALF = GAP / 2  // un paso diatónico
const X0 = 78         // inicio tras la clave
const BEAT_W = 58     // px por pulso
const NOTE_OFFSET = 14

const RESULT_COLORS = {
  verde:    '#4ade80',
  perfecto: '#4ade80',
  amarillo: '#facc15',
  naranja:  '#fb923c',
  rojo:     '#f87171',
}

export function beatX(beat) {
  return X0 + NOTE_OFFSET + beat * BEAT_W
}

function Nota({ nota, clave, color, dim }) {
  const cx = beatX(nota.cum)
  const step = stepOf(nota.pitch)
  const d = step - CLAVES[clave].bottomStep
  const cy = Y_BOTTOM - d * HALF
  const abierta = nota.beats >= 2
  const redonda = nota.beats >= 4
  const stemUp = d < 4 // por debajo de la línea central: plica hacia arriba
  const sharp = nota.pitch.includes('#')

  // Líneas adicionales (pasos pares fuera del pentagrama)
  const ledgers = []
  for (let ld = -2; ld >= (d % 2 === 0 ? d : d + 1); ld -= 2) ledgers.push(ld)
  for (let ld = 10; ld <= (d % 2 === 0 ? d : d - 1); ld += 2) ledgers.push(ld)

  const stemX = stemUp ? cx + 6.5 : cx - 6.5
  const stemY2 = stemUp ? cy - 42 : cy + 42

  return (
    <g opacity={dim ? 0.35 : 1}>
      {ledgers.map(ld => (
        <line key={ld} x1={cx - 13} x2={cx + 13} y1={Y_BOTTOM - ld * HALF} y2={Y_BOTTOM - ld * HALF}
          stroke={color} strokeWidth="1.5" opacity="0.7" />
      ))}
      {sharp && (
        <text x={cx - 20} y={cy + 5} fontSize="17" fill={color} textAnchor="middle" fontWeight="bold">♯</text>
      )}
      <ellipse cx={cx} cy={cy} rx="7.5" ry="5.5"
        transform={`rotate(-18 ${cx} ${cy})`}
        fill={abierta ? 'none' : color} stroke={color} strokeWidth={abierta ? 2 : 1.5} />
      {!redonda && (
        <line x1={stemX} x2={stemX} y1={cy + (stemUp ? -2 : 2)} y2={stemY2}
          stroke={color} strokeWidth="1.8" />
      )}
      {nota.beats === 0.5 && (
        <path
          d={stemUp
            ? `M ${stemX} ${stemY2} c 8 4, 12 10, 9 22`
            : `M ${stemX} ${stemY2} c 8 -4, 12 -10, 9 -22`}
          stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      )}
    </g>
  )
}

function Silencio({ nota }) {
  const cx = beatX(nota.cum)
  const yMid = Y_BOTTOM - 4 * HALF
  if (nota.beats >= 2) {
    // Silencio de blanca: bloque sobre la línea central
    return <rect x={cx - 7} y={yMid - 6} width="14" height="6" rx="1" fill="rgba(255,255,255,0.55)" />
  }
  // Silencio de negra (estilizado)
  return (
    <path
      d={`M ${cx - 4} ${yMid - 16} L ${cx + 3} ${yMid - 7} Q ${cx - 4} ${yMid - 1} ${cx + 2} ${yMid + 7}
          Q ${cx - 8} ${yMid + 3} ${cx - 2} ${yMid - 5} Q ${cx - 7} ${yMid - 10} ${cx - 4} ${yMid - 16} Z`}
      fill="rgba(255,255,255,0.55)" />
  )
}

/**
 * Props:
 *  - clave        'sol' | 'fa'
 *  - notas        [{ pitch|null, beats, cum }]
 *  - resultados   estado por índice: null | 'verde'|'perfecto'|'amarillo'|'naranja'|'rojo'
 *  - cursorIdx    modo A: índice de la nota actual (resaltada)
 *  - playheadBeat modo B: posición del playhead en pulsos (null = oculto; <0 durante count-in)
 */
export default function PentagramaSVG({ clave = 'sol', notas, resultados = [], cursorIdx = null, playheadBeat = null }) {
  const cfg = CLAVES[clave]
  const last = notas[notas.length - 1]
  const total = last.cum + last.beats
  const width = beatX(total) + 30
  const showPlayhead = playheadBeat != null && playheadBeat >= -0.02 && playheadBeat <= total + 0.5

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} 150`} width={width} height="150" className="block" style={{ minWidth: '100%' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="12" x2={width - 12}
            y1={Y_BOTTOM - i * GAP} y2={Y_BOTTOM - i * GAP}
            stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
        ))}
        <text x="22" y={cfg.glyphY} fontSize={cfg.glyphSize} fill="rgba(255,255,255,0.85)">{cfg.glyph}</text>

        {notas.map((n, i) => {
          if (!n.pitch) return <Silencio key={i} nota={n} />
          const res = resultados[i]
          const esCursor = cursorIdx === i
          const color = res ? RESULT_COLORS[res] : esCursor ? '#ffffff' : 'rgba(255,255,255,0.85)'
          return (
            <g key={i}>
              {esCursor && (
                <circle cx={beatX(n.cum)} cy={Y_BOTTOM - (stepOf(n.pitch) - cfg.bottomStep) * HALF}
                  r="14" fill="rgba(237,174,73,0.22)" stroke="#EDAE49" strokeWidth="1.5" />
              )}
              <Nota nota={n} clave={clave} color={color} dim={false} />
            </g>
          )
        })}

        {showPlayhead && (
          <g>
            <line x1={beatX(Math.max(0, playheadBeat))} x2={beatX(Math.max(0, playheadBeat))}
              y1="14" y2="136" stroke="#EDAE49" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={beatX(Math.max(0, playheadBeat))} cy="14" r="4" fill="#EDAE49" />
          </g>
        )}
      </svg>
    </div>
  )
}
