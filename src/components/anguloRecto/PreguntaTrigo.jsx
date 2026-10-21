// Una ronda de Ángulo Recto: el triángulo rectángulo a escala (ángulo recto
// abajo a la derecha; α en el vértice de abajo o en el de arriba), las
// medidas de los lados («x» la que se busca) y cómo se responde, sin opciones:
// tocando los lados (fracción, nombres), rellenando la tabla de notables o
// tecleando el resultado. Al corregir se
// colorean los lados con su nombre respecto de α: así se ve que el cateto
// opuesto cambia según dónde esté el ángulo. Los problemas con contexto
// solo enseñan el triángulo al corregir: traducir el enunciado a un dibujo
// es la mitad del ejercicio. La usan el juego y el examen.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, etiquetaLado, roles, NOMBRE_ROL, PROBLEMAS, ROLES, NOTABLES, abrev, esCorrecta, leeNumero, num } from '../../lib/anguloRecto'

const COLOR_ROL = { opuesto: '#FB7185', contiguo: '#38BDF8', hip: '#FBBF24' }

// onLado: los lados se pueden tocar. marcas {base|alto|hip: {texto, color}}:
// lo que el alumno ha puesto en cada lado. sel: el lado elegido ahora.
function Triangulo({ r, revelado, l, tr, onLado, marcas = {}, sel }) {
  const { base, alto, vertice } = r.tri
  // Ancho de sobra a la derecha: ahí va la etiqueta del lado vertical con su nombre.
  const W = 340
  const k = Math.min(180 / base, 130 / alto)
  const bw = Math.max(40, base * k), ah = Math.max(30, alto * k)
  const x0 = 40 + (180 - bw) / 2, y0 = 170
  const A = [x0, y0], C = [x0 + bw, y0], B = [x0 + bw, y0 - ah]
  // El lienzo se ajusta a la altura del triángulo: los muy tumbados no dejan hueco arriba.
  const top = Math.max(0, y0 - ah - 40)
  const R = vertice ? roles(vertice) : null
  const rolDe = ld => (R ? Object.keys(R).find(k2 => R[k2] === ld) : null)
  const colorear = revelado && R && r.tipo !== 'notable'
  const colorLado = ld => (colorear ? COLOR_ROL[rolDe(ld)] : marcas[ld]?.color ?? (sel === ld ? '#FDE68A' : '#CBD5E1'))
  const nombre = ld => (colorear ? (NOMBRE_ROL[rolDe(ld)][l] ?? NOMBRE_ROL[rolDe(ld)].es) : marcas[ld]?.texto ?? null)
  const valor = ld => etiquetaLado(r, ld, revelado, l)

  // Etiqueta de cada lado, fuera del triángulo.
  const len = Math.hypot(bw, ah)
  const nx = -ah / len, ny = -bw / len // normal hacia fuera de la hipotenusa (arriba-izquierda)
  const etq = [
    { ld: 'base', x: (A[0] + C[0]) / 2, y: y0 + 18, anchor: 'middle' },
    { ld: 'alto', x: C[0] + 10, y: (C[1] + B[1]) / 2 + 4, anchor: 'start' },
    { ld: 'hip', x: (A[0] + B[0]) / 2 + nx * 16, y: (A[1] + B[1]) / 2 + ny * 16, anchor: 'end' },
  ]

  // Arco del ángulo marcado.
  let arco = null
  if (vertice) {
    const rad = 26
    const P = vertice === 'abajo' ? A : B
    const d1 = vertice === 'abajo' ? [1, 0] : [0, 1] // hacia C
    const d2 = vertice === 'abajo' ? [bw / len, -ah / len] : [-bw / len, ah / len] // hacia el otro vértice
    const p1 = [P[0] + d1[0] * rad, P[1] + d1[1] * rad], p2 = [P[0] + d2[0] * rad, P[1] + d2[1] * rad]
    const sweep = vertice === 'abajo' ? 0 : 1
    const mid = [(d1[0] + d2[0]) / 2, (d1[1] + d2[1]) / 2]
    const ml = Math.hypot(...mid)
    // Con ángulos pequeños la bisectriz cae entre los dos lados: la etiqueta, más lejos.
    const angMarcado = vertice === 'abajo' ? Math.atan2(ah, bw) : Math.atan2(bw, ah)
    const dist = rad + 14 + (angMarcado < 0.55 ? 26 : 0)
    const lx = P[0] + (mid[0] / ml) * dist, ly = P[1] + (mid[1] / ml) * dist + 4
    const texto = r.tipo === 'notable' ? `${r.a}°` : r.tipo === 'angulo' ? (revelado ? `α ≈ ${r.bueno}°` : 'α') : (r.tipo === 'razon' ? 'α' : `${r.tri.angulo}°`)
    arco = (
      <g>
        <path d={`M${p1[0]} ${p1[1]} A${rad} ${rad} 0 0 ${sweep} ${p2[0]} ${p2[1]}`} stroke="#A78BFA" strokeWidth="2.5" fill="none" />
        <text x={lx} y={ly} textAnchor="middle" fontSize="13" fontWeight="900" fill="#C4B5FD" stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>{texto}</text>
      </g>
    )
  }

  return (
    <svg viewBox={`0 ${top} ${W} ${204 - top}`} className="w-full max-w-[380px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Triángulo rectángulo', en: 'Right-angled triangle', ca: 'Triangle rectangle' })}>
      <polygon points={`${A} ${C} ${B}`} fill="#1E293B" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={colorLado('base')} strokeWidth="4" strokeLinecap="round" />
      <line x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} stroke={colorLado('alto')} strokeWidth="4" strokeLinecap="round" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={colorLado('hip')} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${C[0] - 13} ${C[1]} V${C[1] - 13} H${C[0]}`} stroke="#94A3B8" strokeWidth="1.8" fill="none" />
      {arco}
      {onLado && [['base', A, C], ['alto', C, B], ['hip', A, B]].map(([ld, P, Q]) => (
        <line key={ld} x1={P[0]} y1={P[1]} x2={Q[0]} y2={Q[1]} stroke="transparent" strokeWidth="30" strokeLinecap="round" className="cursor-pointer" style={{ pointerEvents: 'stroke' }} onClick={() => onLado(ld)} />
      ))}
      {etq.map(e => {
        const v = valor(e.ld)
        const n = nombre(e.ld)
        if (!v && !n) return null
        if (onLado && !v && n) return <text key={e.ld} x={e.x} y={e.y} textAnchor={e.anchor} fontSize="12" fontWeight="900" fill={colorLado(e.ld)} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke', pointerEvents: 'none' }}>{n}</text>
        const esX = v === 'x'
        return (
          <text key={e.ld} x={e.x} y={e.y} textAnchor={e.anchor} fontSize="14" fontWeight="900" fill={esX ? '#FCD34D' : '#FFFFFF'} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>
            {v}
            {n && <tspan fontSize="10.5" fontWeight="700" fill={colorLado(e.ld)}>{v ? ' · ' : ''}{n}</tspan>}
          </text>
        )
      })}
    </svg>
  )
}

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const CORTO = { hip: { es: 'H', en: 'H', ca: 'H' }, opuesto: { es: 'O', en: 'O', ca: 'O' }, contiguo: { es: 'C', en: 'A', ca: 'C' } }

export default function PreguntaTrigo({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const ok = revelado && esCorrecta(r, elegida)
  const verTriangulo = (r.tipo !== 'problema' || revelado) && r.mecanica !== 'tabla'
  const [frac, setFrac] = useState([null, null]) // lados elegidos: arriba, abajo
  const [nombres, setNombres] = useState({})     // lado → rol
  const [huecoSel, setHuecoSel] = useState(0)
  const [puestos, setPuestos] = useState({})     // índice de hueco → índice de ficha
  const [v, setV] = useState('')
  const comprobar = (txt, disabled, onClick) => <button className={boton} disabled={disabled} onClick={onClick}>{txt ?? tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
  const nombreRol = rol => NOMBRE_ROL[rol][l] ?? NOMBRE_ROL[rol].es

  let props = {}, controles
  if (r.mecanica === 'fraccion') {
    const toca = ld => setFrac(([a, b]) => (a == null ? [ld, b] : b == null ? [a, ld] : [ld, null]))
    const val = ld => (ld ? r.tri[ld] : null)
    const marcas = {}
    if (frac[0]) marcas[frac[0]] = { texto: '↑', color: '#FDE68A' }
    if (frac[1]) marcas[frac[1]] = { texto: '↓', color: '#93C5FD' }
    props = { onLado: revelado ? null : toca, marcas }
    const elegidos = revelado ? String(elegida).split('/') : [val(frac[0]), val(frac[1])]
    controles = (
      <>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-white text-2xl font-black">{abrev(r.f, l)} α =</span>
          <span className="flex flex-col items-center">
            <span className={`min-w-[3.5rem] text-center text-2xl font-black tabular-nums rounded-lg px-2 ${revelado ? (ok ? 'text-green-300' : 'text-red-300') : 'text-amber-300'}`}>{elegidos[0] ?? '?'}</span>
            <span className="w-16 h-0.5 bg-white/70 my-0.5" />
            <span className={`min-w-[3.5rem] text-center text-2xl font-black tabular-nums rounded-lg px-2 ${revelado ? (ok ? 'text-green-300' : 'text-red-300') : 'text-sky-300'}`}>{elegidos[1] ?? '?'}</span>
          </span>
          {revelado && !ok && <span className="text-green-300 text-xl font-black">→ {r.bueno}</span>}
        </div>
        {!revelado && comprobar(null, !frac[0] || !frac[1], () => onResponder(`${val(frac[0])}/${val(frac[1])}`))}
      </>
    )
  } else if (r.mecanica === 'nombra') {
    const Rr = roles(r.tri.vertice)
    const rolBueno = ld => Object.keys(Rr).find(k => Rr[k] === ld)
    const toca = ld => setNombres(n => ({ ...n, [ld]: ROLES[(ROLES.indexOf(n[ld]) + 1) % ROLES.length] }))
    const marcas = {}
    for (const ld of ['base', 'alto', 'hip']) {
      if (!nombres[ld]) continue
      marcas[ld] = { texto: nombreRol(nombres[ld]), color: revelado ? (nombres[ld] === rolBueno(ld) ? '#4ADE80' : '#F87171') : COLOR_ROL[nombres[ld]] }
    }
    props = { onLado: revelado ? null : toca, marcas }
    const listo = ['base', 'alto', 'hip'].every(ld => nombres[ld])
    controles = !revelado && (
      <>
        <div className="flex justify-center gap-3 text-[12px] font-bold mb-3">
          {ROLES.map(rol => <span key={rol} style={{ color: COLOR_ROL[rol] }}>{tx2(CORTO[rol], l)} = {nombreRol(rol)}</span>)}
        </div>
        {comprobar(null, !listo, () => onResponder(`nombra:${['base', 'alto', 'hip'].filter(ld => nombres[ld] !== rolBueno(ld)).length}`))}
      </>
    )
  } else if (r.mecanica === 'tabla') {
    const valorDe = (f, a) => NOTABLES[f][a]
    const huecoDe = (f, a) => r.huecos.findIndex(([hf, ha]) => hf === f && ha === a)
    const pon = fi => {
      if (revelado) return
      const n = { ...puestos }
      for (const k of Object.keys(n)) if (n[k] === fi) delete n[k]
      n[huecoSel] = fi
      setPuestos(n)
      const sig = r.huecos.findIndex((_, i) => n[i] == null)
      if (sig >= 0) setHuecoSel(sig)
    }
    const fallos = r.huecos.filter(([f, a], i) => r.fichas[puestos[i]] !== valorDe(f, a)).length
    controles = (
      <>
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <table className="w-full text-center tabular-nums">
            <thead><tr><th />{[30, 45, 60].map(a => <th key={a} className="text-violet-300 font-black py-1.5">{a}°</th>)}</tr></thead>
            <tbody>
              {['sen', 'cos', 'tan'].map(f => (
                <tr key={f}>
                  <th className="text-white/70 font-black text-left pl-2">{abrev(f, l)}</th>
                  {[30, 45, 60].map(a => {
                    const h = huecoDe(f, a)
                    if (h < 0) return <td key={a} className="text-white/80 font-bold py-2">{valorDe(f, a)}</td>
                    const puesto = puestos[h] != null ? r.fichas[puestos[h]] : null
                    const bien = revelado && puesto === valorDe(f, a)
                    return (
                      <td key={a} className="p-1">
                        <button disabled={revelado} onClick={() => setHuecoSel(h)} className={`w-full rounded-lg py-1.5 font-black border-2 ${revelado ? (bien ? 'border-green-400 text-green-300' : 'border-red-400 text-red-300') : huecoSel === h ? 'border-amber-300 text-amber-200 bg-amber-400/10' : 'border-dashed border-white/30 text-white'}`}>
                          {puesto ?? '?'}{revelado && !bien && <span className="block text-[11px] text-green-300">{valorDe(f, a)}</span>}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!revelado && (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {r.fichas.map((x, fi) => (
                <button key={fi} onClick={() => pon(fi)} className={`min-w-[3.4rem] px-3 py-2 rounded-xl font-black text-white tabular-nums ${Object.values(puestos).includes(fi) ? 'bg-white/5 opacity-40' : 'bg-white/10 hover:bg-white/15'}`}>{x}</button>
              ))}
            </div>
            {comprobar(null, r.huecos.some((_, i) => puestos[i] == null), () => onResponder(`tabla:${fallos}`))}
          </>
        )}
      </>
    )
  } else {
    // teclea
    const sep = l === 'en' ? '.' : ','
    const decimales = r.tipo === 'lado' || r.tipo === 'problema'
    const uni = r.tipo === 'angulo' ? '°' : r.tipo === 'problema' ? ' m' : ''
    const escribe = t => setV(x => (t === '⌫' ? x.slice(0, -1) : t === sep ? (x.includes(sep) || !x ? x : x + t) : x.length < 6 ? x + t : x))
    const correcto = r.tipo === 'pitagoras' || r.tipo === 'angulo' ? num(r.bueno, l) : num(r.bueno / 10, l)
    controles = (
      <>
        <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
          <span className="text-amber-300 font-black text-2xl tabular-nums">x = {(revelado ? String(elegida) : v) || '?'}{uni}</span>
          {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${correcto}${uni}`}</span>}
        </div>
        {!revelado && (
          <>
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ...(decimales ? [sep] : []), '⌫'].map(t => <button key={t} className={tecla} onClick={() => escribe(t)}>{t}</button>)}
            </div>
            {comprobar(null, leeNumero(v) == null, () => onResponder(v))}
          </>
        )}
      </>
    )
  }

  return (
    <div className="w-full">
      {verTriangulo ? (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <Triangulo r={r} revelado={revelado} l={l} tr={tr} {...props} />
        </div>
      ) : r.mecanica !== 'tabla' && (
        <p className="text-center text-5xl leading-none mb-2" aria-hidden="true">{PROBLEMAS[r.problema].emoji}</p>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {controles}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}

const tx2 = (o, l) => o[l] ?? o.es
