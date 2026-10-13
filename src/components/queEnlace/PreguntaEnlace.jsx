// Una ronda de ¿Qué Enlace?, con cuatro mecánicas (ver lib/queEnlace):
//   ionico     átomos con sus electrones de valencia: toca un metal y luego un
//              no metal para pasarle un electrón; añade átomos si hacen falta.
//   covalente  toca entre dos átomos para poner 1, 2 o 3 enlaces; los pares
//              libres y la cuenta del octeto se recalculan solos.
//   pinta      toca cada casilla marcada de la tabla para pintarla.
//   clasifica  toca una sustancia y luego su tipo.
// Al terminar, cada una responde una sola vez con su texto (esCorrecta).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import {
  ELEMENTOS, GRUPO_COL, CLASES, MAX_ATOMOS, molecula, valencia, objetivo, enlacesPorAtomo, textoCarga,
  enunciado, explicacion, nombreTipo, claseDe, textoItem, formulaIonica,
} from '../../lib/queEnlace'

const COLOR = { m: '#2563EB', n: '#16A34A', s: '#737373', g: '#9333EA' }
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const caja = 'rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3'
const T = (tr, es, en, ca) => tr({ es, en, ca })

// Puntos de electrones alrededor de un átomo: primero uno por lado y luego
// emparejados (como en las estructuras de Lewis). `dirs` limita los lados.
function puntos(n, cx, cy, rad, dirs = [270, 0, 90, 180]) {
  const out = []
  const porLado = dirs.map(() => 0)
  for (let i = 0; i < n; i++) porLado[i % dirs.length]++
  dirs.forEach((d, k) => {
    const a = (d * Math.PI) / 180
    const px = cx + Math.cos(a) * rad, py = cy + Math.sin(a) * rad
    const ox = -Math.sin(a) * 4.5, oy = Math.cos(a) * 4.5
    if (porLado[k] === 1) out.push([px, py])
    else for (let j = 0; j < porLado[k]; j++) out.push([px + (j ? ox : -ox), py + (j ? oy : -oy)])
  })
  return out
}

// ── Compuesto iónico ──────────────────────────────────────────────────────
function Ionico({ r, revelado, onResponder, tr, l }) {
  const val = ELEMENTOS[r.metal].carga, valN = 8 + ELEMENTOS[r.nometal].carga
  const [metales, setMetales] = useState([val])
  const [nomet, setNomet] = useState([valN])
  const [sel, setSel] = useState(0)
  const completos = metales.every(e => e === 0) && nomet.every(e => e === 8)
  const pasa = j => {
    if (revelado || sel == null || metales[sel] === 0 || nomet[j] >= 8) return
    const m2 = metales.map((e, i) => (i === sel ? e - 1 : e))
    setMetales(m2)
    setNomet(nomet.map((e, i) => (i === j ? e + 1 : e)))
    if (m2[sel] === 0) { const k = m2.findIndex(e => e > 0); setSel(k < 0 ? null : k) }
  }
  const W = 320, xs = n => Array.from({ length: n }, (_, i) => (W / (n + 1)) * (i + 1))
  const atomo = (el, x, y, e, carga, ok, activo, onClick, recibidos = 0) => (
    <g key={`${el}${x}${y}`} onClick={onClick} className={revelado ? '' : 'cursor-pointer'}>
      <circle cx={x} cy={y} r="24" fill={ELEMENTOS[el].tipo === 'm' ? '#1e3a8a' : '#14532d'} stroke={activo ? '#FCD34D' : ok ? '#4ADE80' : '#475569'} strokeWidth={activo || ok ? 3 : 1.5} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">{el}</text>
      {puntos(e, x, y, 31).map(([px, py], i) => <circle key={i} cx={px} cy={py} r="3.2" fill={i >= e - recibidos ? '#FBBF24' : '#E2E8F0'} />)}
      {carga !== 0 && <text x={x + 27} y={y - 18} fontSize="15" fontWeight="900" fill="#FCD34D">{textoCarga(carga)}</text>}
    </g>
  )
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={caja}>
        <svg viewBox={`0 0 ${W} 190`} className="w-full h-auto">
          <text x="6" y="16" fontSize="10" fill="#93C5FD" fontWeight="700">{T(tr, 'Metal: cede electrones', 'Metal: gives electrons', 'Metall: cedeix electrons')}</text>
          {metales.map((e, i) => atomo(r.metal, xs(metales.length)[i], 52, e, val - e, e === 0, sel === i && !revelado, () => e > 0 && setSel(i)))}
          <text x="6" y="108" fontSize="10" fill="#86EFAC" fontWeight="700">{T(tr, 'No metal: gana electrones', 'Non-metal: gains electrons', 'No metall: guanya electrons')}</text>
          {nomet.map((e, j) => atomo(r.nometal, xs(nomet.length)[j], 148, e, -(e - valN), e === 8, false, () => pasa(j), e - valN))}
        </svg>
        <p className="text-center text-xs text-white/60 mt-1">
          {completos
            ? <span className="text-green-300 font-bold">{T(tr, 'Todos completos', 'All complete', 'Tots complets')} · {metales.length}×{r.metal} + {nomet.length}×{r.nometal}</span>
            : T(tr, 'Toca un metal (amarillo) y luego un no metal', 'Tap a metal (yellow) and then a non-metal', 'Toca un metall (groc) i després un no metall')}
        </p>
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <button disabled={metales.length >= MAX_ATOMOS} onClick={() => { setMetales([...metales, val]); if (sel == null) setSel(metales.length) }} className="py-2 rounded-xl border border-white/15 bg-white/[0.06] text-white font-bold disabled:opacity-30">+ {r.metal}</button>
            <button disabled={nomet.length >= MAX_ATOMOS} onClick={() => setNomet([...nomet, valN])} className="py-2 rounded-xl border border-white/15 bg-white/[0.06] text-white font-bold disabled:opacity-30">+ {r.nometal}</button>
            <button onClick={() => { setMetales([val]); setNomet([valN]); setSel(0) }} className="py-2 rounded-xl border border-white/15 bg-white/[0.03] text-white/70 font-bold">↺ {T(tr, 'Otra vez', 'Reset', 'Un altre cop')}</button>
          </div>
          <button className={boton} onClick={() => onResponder(`${metales.length}:${nomet.length}:${completos ? 1 : 0}`)}>
            {T(tr, 'Comprobar', 'Check', 'Comprovar')}
          </button>
        </>
      )}
      {revelado && <p className="text-center text-white font-black text-2xl">{formulaIonica(r.metal, r.nometal)}</p>}
    </>
  )
}

// ── Molécula covalente ────────────────────────────────────────────────────
function Covalente({ r, revelado, onResponder, tr, l }) {
  const mol = molecula(r.molecula)
  const [ords, setOrds] = useState(() => mol.enlaces.map(() => 0))
  const tot = enlacesPorAtomo(mol, ords)
  const listo = ords.every(o => o > 0)
  const gira = i => !revelado && setOrds(ords.map((o, k) => (k === i ? (o + 1) % 4 : o)))
  const R = 15
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className={caja}>
        <svg viewBox="0 0 200 120" className="w-full h-auto max-h-64">
          {mol.enlaces.map(([a, b], i) => {
            const [, x1, y1] = mol.atomos[a], [, x2, y2] = mol.atomos[b]
            const d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d
            const sx = x1 + ux * R, sy = y1 + uy * R, ex = x2 - ux * R, ey = y2 - uy * R
            const nx = -uy, ny = ux
            const o = ords[i]
            const offs = o === 1 ? [0] : o === 2 ? [-2.6, 2.6] : o === 3 ? [-4.5, 0, 4.5] : []
            return (
              <g key={i} onClick={() => gira(i)} className={revelado ? '' : 'cursor-pointer'}>
                <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="transparent" strokeWidth="22" />
                {o === 0 && <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />}
                {offs.map((f, k) => <line key={k} x1={sx + nx * f} y1={sy + ny * f} x2={ex + nx * f} y2={ey + ny * f} stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />)}
                {o === 0 && !revelado && <text x={(sx + ex) / 2} y={(sy + ey) / 2 - 4} textAnchor="middle" fontSize="9" fill="#94A3B8">+</text>}
              </g>
            )
          })}
          {mol.atomos.map(([el, x, y], i) => {
            const libres = valencia(el) - tot[i]
            const cuenta = valencia(el) + tot[i]
            // Lados libres: los que no apuntan a un enlace.
            const angs = mol.enlaces.flatMap(([a, b]) => (a === i ? [b] : b === i ? [a] : [])).map(j => (Math.atan2(mol.atomos[j][2] - y, mol.atomos[j][1] - x) * 180) / Math.PI)
            const dirs = [270, 0, 90, 180].filter(d => angs.every(g => Math.abs(((d - g + 540) % 360) - 180) > 50))
            const color = cuenta === objetivo(el) ? '#4ADE80' : cuenta > objetivo(el) ? '#F87171' : '#FBBF24'
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={R - 3} fill="#0f172a" stroke={color} strokeWidth="1.6" />
                <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">{el}</text>
                {libres > 0 && dirs.length > 0 && puntos(libres, x, y, R + 2, dirs).map(([px, py], k) => <circle key={k} cx={px} cy={py} r="1.8" fill="#E2E8F0" />)}
                <text x={x} y={y + (y > 90 ? -R - 3 : R + 10)} textAnchor="middle" fontSize="7" fontWeight="700" fill={color}>{Math.max(0, cuenta)}/{objetivo(el)}</text>
              </g>
            )
          })}
        </svg>
        <p className="text-center text-xs text-white/60">{T(tr, 'Toca entre dos átomos: 1, 2 o 3 enlaces. Cada número cuenta los electrones que rodean al átomo.', 'Tap between two atoms: 1, 2 or 3 bonds. Each number counts the electrons around the atom.', 'Toca entre dos àtoms: 1, 2 o 3 enllaços. Cada número compta els electrons que envolten l’àtom.')}</p>
      </div>
      {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(ords.join(','))}>{T(tr, 'Comprobar', 'Check', 'Comprovar')}</button>}
    </>
  )
}

// ── Pintar la tabla ───────────────────────────────────────────────────────
const C = 29, G = 2, X0 = 4, Y0 = 18
function Pinta({ r, revelado, onResponder, tr, l }) {
  const [pintura, setPintura] = useState({})
  const ciclo = [...r.colores, undefined]
  const pinta = el => {
    if (revelado) return
    const sig = ciclo[(ciclo.indexOf(pintura[el]) + 1) % ciclo.length]
    setPintura({ ...pintura, [el]: sig })
  }
  const listo = r.elementos.every(e => pintura[e])
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">
        {r.colores.length > 2 ? T(tr, 'Pinta cada casilla marcada: metal, no metal o semimetal', 'Paint each marked square: metal, non-metal or metalloid', 'Pinta cada casella marcada: metall, no metall o semimetall') : enunciado(r, l)}
      </p>
      <div className={caja}>
        <svg viewBox={`0 0 ${X0 * 2 + 11 * (C + G)} ${Y0 + 4 * (C + G) + 4}`} className="w-full max-w-[360px] mx-auto h-auto">
          {GRUPO_COL.map((g, i) => g && <text key={i} x={X0 + i * (C + G) + C / 2} y={12} textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748B">{g}</text>)}
          {Object.entries(ELEMENTOS).map(([sim, e]) => {
            const x = X0 + e.col * (C + G), y = Y0 + (e.p - 1) * (C + G)
            const marcado = r.elementos.includes(sim)
            const p = pintura[sim]
            const fill = revelado ? COLOR[e.tipo] : marcado && p ? COLOR[p] : '#1E293B'
            const mal = revelado && marcado && p !== e.tipo
            return (
              <g key={sim} onClick={() => marcado && pinta(sim)} className={marcado && !revelado ? 'cursor-pointer' : ''}>
                <rect x={x} y={y} width={C} height={C} rx="4" fill={fill} opacity={revelado && !marcado ? 0.45 : !marcado ? 0.6 : 1}
                  stroke={mal ? '#F87171' : marcado ? '#FCD34D' : '#334155'} strokeWidth={marcado ? 3 : 1} />
                <text x={x + C / 2} y={y + C / 2 + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={marcado ? '#FFFFFF' : '#64748B'}>{sim}</text>
                {mal && <text x={x + C - 4} y={y + 9} textAnchor="end" fontSize="9" fontWeight="900" fill="#FCA5A5">✗</text>}
              </g>
            )
          })}
        </svg>
        <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] font-bold mt-1">
          {r.colores.map(t => <span key={t} style={{ color: COLOR[t] === '#737373' ? '#A3A3A3' : COLOR[t] === '#2563EB' ? '#60A5FA' : '#4ADE80' }}>■ {nombreTipo(t, l)}</span>)}
        </p>
        {!revelado && <p className="text-center text-xs text-white/50 mt-1">{T(tr, 'Cada toque cambia el color', 'Each tap changes the colour', 'Cada toc canvia el color')}</p>}
      </div>
      {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(`pinta:${r.elementos.filter(e => pintura[e] !== ELEMENTOS[e].tipo).length}`)}>{T(tr, 'Comprobar', 'Check', 'Comprovar')}</button>}
    </>
  )
}

// ── Clasificar sustancias ─────────────────────────────────────────────────
function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const [activa, setActiva] = useState(r.items[0])
  const colocar = c => {
    if (revelado || !activa) return
    const n = { ...puestas, [activa]: c }
    setPuestas(n)
    const sig = r.items.find(i => !n[i])
    setActiva(sig ?? null)
    if (!sig) onResponder(`clasifica:${r.items.filter(i => n[i] !== claseDe(i)).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug text-[15px]">{enunciado(r, l)}</p>
      <div className="space-y-1.5 mb-3">
        {r.items.filter(i => !puestas[i]).map(i => (
          <button key={i} onClick={() => setActiva(i)} className={`block w-full text-left rounded-xl px-3 py-2 text-sm text-white transition-all ${activa === i ? 'bg-white/20 ring-2 ring-amber-300' : 'bg-white/5'}`}>
            {textoItem(i, l)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(CLASES).map(c => (
          <button key={c} disabled={revelado || !activa} onClick={() => colocar(c)}
            className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[4.5rem] text-left">
            <span className="block text-white text-[13px] font-black leading-tight">{CLASES[c][l] ?? CLASES[c].es}</span>
            {r.items.filter(i => puestas[i] === c).map(i => (
              <span key={i} className={`block mt-1 rounded-md px-1.5 py-0.5 text-[11px] leading-tight text-white ${claseDe(i) === c ? 'bg-green-500/30 ring-1 ring-green-400' : 'bg-red-500/30 ring-1 ring-red-400'}`}>
                {i.startsWith('s:') ? i.slice(2) : textoItem(i, l).slice(0, 38) + '…'}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaEnlace({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, onResponder, tr, l }
  return (
    <div className="w-full">
      {ronda.tipo === 'ionico' ? <Ionico {...props} />
        : ronda.tipo === 'covalente' ? <Covalente {...props} />
        : ronda.tipo === 'pinta' ? <Pinta {...props} />
        : <Clasifica {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
