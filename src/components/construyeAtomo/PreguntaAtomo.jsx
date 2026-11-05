// Una ronda de Construye el Átomo (ver lib/construyeAtomo), con tres mecánicas:
//   construir  protones, neutrones y electrones con − / +; el átomo se dibuja
//              en vivo y el nombre del elemento cambia con los protones
//   config     reparte electrones en las cajas de orbitales (dibujadas por
//              capas: el 3d sale antes que el 4s y hay que saber cuál va antes)
//   tabla      lee la configuración y toca el elemento en la tabla periódica
// Todas responden una sola vez al pulsar Comprobar.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import ConIndices from '../ConIndices'
import {
  el, nombre, simbolo, Z_MAX, SUBNIVELES, ORDEN_CAPAS, idx, configDe, porCapa,
  cargaTexto, enunciado, explicacion, pistaFallo, respuestaAtomo, respuestaConfig, leeAtomo, leeConfig, esCorrecta,
} from '../../lib/construyeAtomo'

const ROJO = '#ef4444', GRIS = '#94a3b8', AZUL = '#38bdf8'
const T = (tr, es, en, ca) => tr({ es, en, ca })

function Veredicto({ ok, children }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 mb-3 text-sm font-black border ${ok ? 'bg-green-500/15 border-green-500/40 text-green-300' : 'bg-red-500/15 border-red-500/40 text-red-300'}`}>
      {children}
    </div>
  )
}

// Configuración con <sup> de verdad: los superíndices Unicode ⁴-⁹ salen con
// otra fuente y «2p⁶» se lee como «2pᶜ»
function ConfigTexto({ c }) {
  const partes = SUBNIVELES.map((x, i) => (c[i] ? <span key={x.id} className="inline-block mr-1.5 last:mr-0">{x.id}<sup className="text-[0.62em] ml-px">{c[i]}</sup></span> : null)).filter(Boolean)
  return partes.length ? <>{partes}</> : '—'
}

function Notacion({ z, a, q }) {
  return (
    <span className="inline-flex items-center font-black text-white" aria-label={`${a} ${z} ${simbolo(z)} ${q}`}>
      <span className="flex flex-col items-end text-lg leading-[1.05] mr-0.5 text-amber-300">
        <span>{a}</span><span>{z}</span>
      </span>
      <span className="text-5xl leading-none">{simbolo(z)}</span>
      {q !== 0 && <span className="self-start text-2xl text-sky-300 ml-0.5">{Math.abs(q) === 1 ? '' : Math.abs(q)}{q > 0 ? '+' : '−'}</span>}
    </span>
  )
}

// ── El átomo dibujado ────────────────────────────────────────────────────
function Dibujo({ p, n, e }) {
  const W = 320, H = 230, cx = W / 2, cy = H / 2
  const total = p + n
  // Protones y neutrones repartidos a lo largo de una espiral (girasol)
  // mezclados en proporción, para que no quede un bloque rojo y otro gris
  const tipos = []
  let pp = 0
  for (let i = 0; i < total; i++) {
    if (pp < Math.round(((i + 1) * p) / total)) { tipos.push('p'); pp++ } else tipos.push('n')
  }
  // los átomos pequeños se dibujan más grandes
  const rN = total <= 16 ? 7 : total <= 40 ? 5.6 : 4.6
  const nucleones = tipos.map((t, i) => {
    const rad = rN * 1.05 * Math.sqrt(i + 0.5)
    const ang = i * 2.39996
    return { t, x: cx + rad * Math.cos(ang), y: cy + rad * Math.sin(ang) }
  })
  const rNucleo = total ? rN * 1.05 * Math.sqrt(total) + rN : 0
  const capas = porCapa(Math.min(e, Z_MAX))
  const r0 = Math.max(36, rNucleo + 16)
  const paso = Math.min(30, (H / 2 - 8 - r0) / Math.max(1, capas.length - 1))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img">
      {capas.map((k, i) => {
        const R = r0 + i * paso
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#ffffff26" strokeWidth={1.2} />
            {Array.from({ length: k }, (_, j) => {
              const a = (j / k) * 2 * Math.PI - Math.PI / 2 + i * 0.4
              return <circle key={j} cx={cx + R * Math.cos(a)} cy={cy + R * Math.sin(a)} r={3.6} fill={AZUL} stroke="#0b1226" strokeWidth={1} />
            })}
          </g>
        )
      })}
      {[...nucleones].reverse().map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={rN} fill={b.t === 'p' ? ROJO : GRIS} stroke="#0b1226" strokeWidth={0.8} />
      ))}
      {total === 0 && <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fill="#ffffff55">·</text>}
    </svg>
  )
}

function Contador({ etiqueta, color, v, set, max, revelado, bueno }) {
  const mueve = d => { if (!revelado) set(x => Math.max(0, Math.min(max, x + d))) }
  const b = 'rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 disabled:opacity-30 w-10 py-2 text-white font-black text-sm'
  const ok = revelado && v === bueno
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center gap-1.5 w-[6.6rem] shrink-0 text-sm font-bold text-white/85">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />{etiqueta}
      </span>
      <button type="button" className={b} disabled={revelado || v === 0} onClick={() => mueve(-5)}>−5</button>
      <button type="button" className={b} disabled={revelado || v === 0} onClick={() => mueve(-1)}>−</button>
      <span className={`w-10 text-center text-xl font-black tabular-nums ${revelado ? (ok ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>{v}</span>
      <button type="button" className={b} disabled={revelado || v >= max} onClick={() => mueve(1)}>+</button>
      <button type="button" className={b} disabled={revelado || v >= max} onClick={() => mueve(5)}>+5</button>
      {revelado && !ok && <span className="text-green-400 text-sm font-black ml-1">✓ {bueno}</span>}
    </div>
  )
}

function Construir({ r, revelado, elegida, onResponder, tr, l }) {
  const prev = revelado ? leeAtomo(elegida) : null
  const [p, setP] = useState(prev?.p ?? 0)
  const [n, setN] = useState(prev?.n ?? 0)
  const [e, setE] = useState(prev?.e ?? 0)
  const bueno = { p: r.z, n: r.a - r.z, e: r.z - r.q }
  const q = p - e
  const ok = revelado && esCorrecta(r, respuestaAtomo(p, n, e))
  const pista = revelado && !ok ? pistaFallo(r, respuestaAtomo(p, n, e), l) : null
  return (
    <>
      {(r.tipo === 'notacion' || r.tipo === 'ion') && (
        <div className="flex justify-center mb-2"><Notacion z={r.z} a={r.a} q={r.q} /></div>
      )}
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] mb-2 relative">
        <Dibujo p={p} n={n} e={e} />
        <div className="absolute top-2 left-3 text-left">
          <p className="text-[11px] uppercase tracking-widest text-white/40 font-bold">{T(tr, 'Elemento', 'Element', 'Element')}</p>
          <p className={`font-black text-base leading-tight ${p ? 'text-white' : 'text-white/35'}`}>
            {p >= 1 && p <= Z_MAX ? `${nombre(p, l)} (${simbolo(p)})` : p > Z_MAX ? `Z = ${p}` : T(tr, 'sin protones', 'no protons', 'sense protons')}
          </p>
        </div>
        <div className="absolute top-2 right-3 text-right text-sm font-bold text-white/80 tabular-nums">
          <p>A = {p + n}</p>
          <p className={q === 0 ? 'text-white/50' : 'text-sky-300'}>{T(tr, 'carga', 'charge', 'càrrega')} {cargaTexto(q)}</p>
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <Contador etiqueta={T(tr, 'Protones', 'Protons', 'Protons')} color={ROJO} v={p} set={setP} max={Z_MAX} revelado={revelado} bueno={bueno.p} />
        <Contador etiqueta={T(tr, 'Neutrones', 'Neutrons', 'Neutrons')} color={GRIS} v={n} set={setN} max={50} revelado={revelado} bueno={bueno.n} />
        <Contador etiqueta={T(tr, 'Electrones', 'Electrons', 'Electrons')} color={AZUL} v={e} set={setE} max={Z_MAX + 4} revelado={revelado} bueno={bueno.e} />
      </div>
      {revelado
        ? <Veredicto ok={ok}>{ok ? T(tr, '✓ ¡Correcto!', '✓ Correct!', '✓ Correcte!') : `✗ ${pista ?? T(tr, 'No es este átomo.', 'That is not this atom.', 'No és aquest àtom.')}`}</Veredicto>
        : (
          <button type="button" disabled={p === 0} onClick={() => onResponder(respuestaAtomo(p, n, e))} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {T(tr, 'Comprobar', 'Check', 'Comprovar')}
          </button>
        )}
    </>
  )
}

// ── Configuración electrónica ────────────────────────────────────────────
function Cajas({ cap, k }) {
  const orb = cap / 2
  // Regla de Hund: primero uno en cada caja, luego se emparejan
  const cajas = Array.from({ length: orb }, (_, i) => (k > i ? 1 : 0) + (k > orb + i ? 1 : 0))
  return (
    <span className="inline-flex">
      {cajas.map((x, i) => (
        <span key={i} className="w-6 h-7 border border-white/40 -ml-px first:ml-0 flex items-center justify-center text-[13px] font-black text-sky-300 leading-none">
          {x === 2 ? '↑↓' : x === 1 ? '↑' : ''}
        </span>
      ))}
    </span>
  )
}

function Config({ r, revelado, elegida, onResponder, tr, l }) {
  const [c, setC] = useState(() => leeConfig(revelado ? elegida : null) ?? SUBNIVELES.map(() => 0))
  const total = c.reduce((a, b) => a + b, 0)
  const buena = configDe(r.z - r.q)
  const ok = revelado && esCorrecta(r, respuestaConfig(c))
  const pista = revelado && !ok ? pistaFallo(r, respuestaConfig(c), l) : null
  const mueve = (i, d) => { if (!revelado) setC(v => v.map((x, j) => (j === i ? Math.max(0, Math.min(SUBNIVELES[i].cap, x + d)) : x))) }
  const b = 'rounded-lg bg-white/10 hover:bg-white/15 active:bg-white/20 disabled:opacity-30 w-9 py-1.5 text-white font-black text-sm'
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2.5 mb-2">
        {ORDEN_CAPAS.map((id, fila) => {
          const i = idx(id), sn = SUBNIVELES[i]
          const nuevaCapa = fila > 0 && SUBNIVELES[idx(ORDEN_CAPAS[fila - 1])].n !== sn.n
          const mal = revelado && c[i] !== buena[i]
          return (
            <div key={id} className={`flex items-center gap-2 py-1 ${nuevaCapa ? 'border-t border-white/10 mt-1 pt-2' : ''}`}>
              <span className={`w-9 font-mono font-black text-base ${mal ? 'text-red-400' : 'text-white'}`}>{id}</span>
              <button type="button" className="flex-1 flex items-center gap-2 min-w-0 text-left" disabled={revelado} onClick={() => mueve(i, 1)}>
                <Cajas cap={sn.cap} k={c[i]} />
                <span className="text-sm font-black tabular-nums text-white/70 min-w-[1rem]">{c[i] || ''}</span>
                {mal && <span className="text-green-400 text-xs font-black">✓ {buena[i]}</span>}
              </button>
              {!revelado && (
                <>
                  <button type="button" className={b} disabled={c[i] === 0} onClick={() => mueve(i, -1)}>−</button>
                  <button type="button" className={b} disabled={c[i] === sn.cap} onClick={() => mueve(i, 1)}>+</button>
                </>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-center text-sm font-bold text-white/75 mb-1">
        {total === 1 ? T(tr, 'Llevas 1 electrón', '1 electron placed', 'Portes 1 electró') : T(tr, `Llevas ${total} electrones`, `${total} electrons placed`, `Portes ${total} electrons`)}
      </p>
      <p className="text-center font-mono text-white font-black mb-3 min-h-[1.5rem] break-words"><ConfigTexto c={c} /></p>
      {revelado
        ? <Veredicto ok={ok}>{ok ? T(tr, '✓ ¡Correcto!', '✓ Correct!', '✓ Correcte!') : <>✗ {pista ?? ''} {T(tr, 'Era', 'It was', 'Era')}: <span className="font-mono"><ConfigTexto c={buena} /></span></>}</Veredicto>
        : (
          <>
            <button type="button" disabled={total === 0} onClick={() => onResponder(respuestaConfig(c))} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
              {T(tr, 'Comprobar', 'Check', 'Comprovar')}
            </button>
            <p className="text-center text-xs text-white/40 mt-2">{T(tr, 'Toca un subnivel para añadir un electrón; las flechas se colocan solas', 'Tap a sublevel to add an electron; the arrows place themselves', 'Toca un subnivell per afegir-hi un electró; les fletxes es col·loquen soles')}</p>
          </>
        )}
    </>
  )
}

// ── Tabla periódica (periodos 1-4) ───────────────────────────────────────
function Tabla({ r, revelado, elegida, onResponder, tr, l }) {
  const [sel, setSel] = useState(revelado && elegida ? Number(elegida.slice(2)) : null)
  const zs = Array.from({ length: Z_MAX }, (_, i) => i + 1)
  const ok = revelado && sel === r.z
  const color = z => {
    if (revelado && z === r.z) return 'bg-green-500 text-black border-green-300'
    if (revelado && z === sel) return 'bg-red-500 text-white border-red-300'
    if (z === sel) return 'bg-sky-500 text-black border-sky-200'
    return 'bg-white/[0.07] text-white/85 border-white/15 hover:bg-white/15'
  }
  return (
    <>
      <p className="text-center font-mono text-lg sm:text-xl font-black text-sky-200 mb-3 break-words"><ConfigTexto c={r.config} /></p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-1.5 mb-2">
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'auto repeat(18, minmax(0, 1fr))' }}>
          <span />
          {Array.from({ length: 18 }, (_, g) => <span key={g} className="text-center text-[8px] sm:text-[10px] text-white/35 font-bold">{g + 1}</span>)}
          {[1, 2, 3, 4].map(per => (
            <div key={per} className="contents">
              <span className="text-[9px] sm:text-[10px] text-white/35 font-bold pr-0.5 self-center">{per}</span>
              {Array.from({ length: 18 }, (_, g) => {
                const z = zs.find(x => el(x).periodo === per && el(x).grupo === g + 1)
                if (!z) return <span key={g} />
                return (
                  <button key={g} type="button" disabled={revelado} onClick={() => setSel(z)}
                    className={`aspect-square rounded-[3px] border text-[9px] sm:text-xs font-black leading-none flex items-center justify-center ${color(z)}`}>
                    {simbolo(z)}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm font-bold text-white/75 mb-3 min-h-[1.25rem]">
        {sel ? `${nombre(sel, l)} (${simbolo(sel)})` : T(tr, 'Toca una casilla', 'Tap a cell', 'Toca una casella')}
      </p>
      {revelado
        ? <Veredicto ok={ok}>{ok ? T(tr, '✓ ¡Correcto!', '✓ Correct!', '✓ Correcte!') : `✗ ${T(tr, 'Era', 'It was', 'Era')}: ${nombre(r.z, l)} (${simbolo(r.z)})`}</Veredicto>
        : (
          <button type="button" disabled={!sel} onClick={() => onResponder(`z:${sel}`)} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {T(tr, 'Comprobar', 'Check', 'Comprovar')}
          </button>
        )}
    </>
  )
}

export default function PreguntaAtomo({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, tr, l }
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug"><ConIndices texto={enunciado(ronda, l)} /></p>
      {ronda.tipo === 'config' ? <Config {...props} /> : ronda.tipo === 'tabla' ? <Tabla {...props} /> : <Construir {...props} />}
      {revelado && <p className="text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 <ConIndices texto={explicacion(ronda, l)} /></p>}
    </div>
  )
}
