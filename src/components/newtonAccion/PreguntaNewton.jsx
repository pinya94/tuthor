// Una ronda de Newton en Acción: la caja con sus fuerzas como flechas, sobre
// el suelo, en un plano inclinado o dentro de un ascensor. Nada se responde
// eligiendo entre cuatro (ver «Mecánicas» en lib/newtonAccion.js):
//   teclea    se escribe el número
//   empuja    se arrastra la flecha del empuje hasta la fuerza que hace falta
//   bascula   se mueve la aguja de la báscula del ascensor
//   diagrama  se dibujan las fuerzas tocando cada lado del cuerpo
// Al corregir aparece el valor buscado y, en el plano, las dos componentes del peso.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, textoRespuesta, unidad, num, rango, esCorrecta, diagramaBueno, ESCENAS, LADOS, FUERZAS, NOMBRE_FUERZA } from '../../lib/newtonAccion'

const tx = (o, l) => o[l] ?? o.es
const COL = { F: '#F59E0B', Fr: '#F87171', P: '#A78BFA', N: '#38BDF8', T: '#34D399', a: '#4ADE80' }

function Flecha({ x1, y1, x2, y2, c, texto, tx = 0, ty = 0, discontinua }) {
  const ang = Math.atan2(y2 - y1, x2 - x1)
  const p = (d, da) => `${x2 - d * Math.cos(ang + da)},${y2 - d * Math.sin(ang + da)}`
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - 8 * Math.cos(ang)} y2={y2 - 8 * Math.sin(ang)} stroke={c} strokeWidth="4" strokeLinecap="round" strokeDasharray={discontinua ? '5 4' : undefined} />
      <polygon points={`${x2},${y2} ${p(12, 0.45)} ${p(12, -0.45)}`} fill={c} />
      {texto && <text x={x2 + tx} y={y2 + ty} textAnchor="middle" fontSize="12" fontWeight="900" fill={c} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>{texto}</text>}
    </g>
  )
}

// Suelo: segunda ley, peso, rozamiento y velocidad constante. `empuje` es el
// valor que va marcando el alumno con la flecha (mecánica «empuja»).
function Suelo({ r, revelado, l, tr, empuje }) {
  const cx = 130, base = 120
  const caja = <rect x={cx - 30} y={base - 50} width="60" height="50" rx="5" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
  const masa = <text x={cx} y={base - 20} textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF">{r.m} kg</text>
  const dato = (texto, c = COL.a) => <text x={250} y={34} textAnchor="middle" fontSize="13" fontWeight="900" fill={c}>{texto}</text>
  const ajusta = r.mecanica === 'empuja'
  // Largo de la flecha del empuje: proporcional a lo que marca el alumno (o al bueno al corregir)
  const fMostrada = ajusta ? (revelado ? r.bueno : empuje) : r.F
  const largoF = ajusta ? 12 + 140 * Math.min(1, (fMostrada ?? 0) / rango(r).max) : 80
  const flechaF = (fMostrada ?? 0) > 0 && <Flecha x1={cx + 30} y1={base - 25} x2={cx + 30 + largoF} y2={base - 25} c={COL.F} texto={`F = ${fMostrada} N`} ty={-10} tx={-24} />
  let flechas
  if (r.tipo === 'segunda') {
    const fTxt = r.despeje === 'F' ? null : `F = ${r.F} N`
    flechas = <>
      {r.despeje === 'F' ? flechaF : <Flecha x1={cx + 30} y1={base - 25} x2={cx + 110} y2={base - 25} c={COL.F} texto={fTxt} ty={-10} tx={-20} />}
      {r.despeje === 'F' && dato(`a = ${r.a} m/s² →`)}
      {revelado && r.despeje !== 'F' && dato(r.despeje === 'a' ? `a = ${r.a} m/s² →` : `m = ${r.m} kg`)}
    </>
  } else if (r.tipo === 'rozamiento' || r.tipo === 'constante') {
    const quieta = r.tipo === 'rozamiento' && r.quieta
    const frTxt = r.tipo === 'constante' || revelado ? `Fr = ${quieta ? r.F : r.Fr} N` : 'Fr'
    flechas = <>
      {ajusta ? flechaF : <Flecha x1={cx + 30} y1={base - 25} x2={cx + 110} y2={base - 25} c={COL.F} texto={`F = ${r.F} N`} ty={-10} tx={-20} />}
      <Flecha x1={cx - 30} y1={base - 6} x2={cx - 95} y2={base - 6} c={COL.Fr} texto={frTxt} ty={-10} tx={14} />
      <Flecha x1={cx} y1={base} x2={cx} y2={base + 34} c={COL.P} texto="P" tx={14} ty={-4} />
      <Flecha x1={cx} y1={base - 50} x2={cx} y2={base - 84} c={COL.N} texto="N" tx={14} ty={10} />
      {r.tipo === 'constante' && dato('v = cte →')}
      {r.tipo === 'rozamiento' && !quieta && dato(`a = ${r.aObjetivo} m/s² →`)}
      {revelado && quieta && dato(tr({ es: 'a = 0: no se mueve', en: 'a = 0: it does not move', ca: 'a = 0: no es mou' }))}
    </>
  } else {
    // peso
    flechas = <>
      <Flecha x1={cx} y1={base - 25} x2={cx} y2={base + 38} c={COL.P} texto={revelado && r.caso !== 'masaLuna' ? `P = ${num(r.bueno, l)} N` : 'P'} tx={40} ty={-6} />
      <text x={40} y={40} fontSize="34">{r.caso === 'tierra' ? '🌍' : '🌙'}</text>
      {revelado && r.caso === 'masaLuna' && dato(`m = ${r.m} kg`)}
    </>
  }
  return (
    <svg viewBox="0 0 300 168" className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Caja con sus fuerzas', en: 'Box with its forces', ca: 'Caixa amb les seves forces' })}>
      <line x1="10" x2="290" y1={base} y2={base} stroke={r.tipo === 'peso' && r.caso !== 'tierra' ? '#CBD5E1' : '#64748B'} strokeWidth="3" />
      {caja}{masa}{flechas}
    </svg>
  )
}

function Plano({ r, revelado, l, tr }) {
  const ang = (r.ang * Math.PI) / 180
  const L = 230, x0 = 30, y0 = 150
  const xT = x0 + L * Math.cos(ang) * 0.95, yT = y0 - L * Math.sin(ang) * 0.95
  const top = Math.min(0, yT - 20)
  // La caja, a mitad de la rampa y girada.
  const mx = x0 + L * 0.55 * Math.cos(ang), my = y0 - L * 0.55 * Math.sin(ang)
  const nx = -Math.sin(ang), ny = -Math.cos(ang) // normal hacia fuera (arriba-izquierda)
  const cx = mx + nx * 18, cy = my + ny * 18
  const largo = 60
  return (
    <svg viewBox={`0 ${top} 300 ${178 - top}`} className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Plano inclinado', en: 'Inclined plane', ca: 'Pla inclinat' })}>
      <polygon points={`${x0},${y0} ${xT},${y0} ${xT},${yT}`} fill="#1E293B" stroke="#64748B" strokeWidth="2" />
      <path d={`M${x0 + 34} ${y0} A34 34 0 0 0 ${x0 + 34 * Math.cos(ang)} ${y0 - 34 * Math.sin(ang)}`} stroke="#A78BFA" strokeWidth="2.5" fill="none" />
      <text x={x0 + 50} y={y0 - 6} fontSize="12" fontWeight="900" fill="#C4B5FD">{r.ang}°</text>
      <g transform={`rotate(${-r.ang} ${cx} ${cy})`}>
        <rect x={cx - 20} y={cy - 18} width="40" height="36" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
        {r.m && <text x={cx} y={cy + 5} textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">{r.m} kg</text>}
      </g>
      <Flecha x1={cx} y1={cy} x2={cx} y2={cy + largo} c={COL.P} texto="P" tx={12} />
      <Flecha x1={cx} y1={cy} x2={cx + nx * largo * Math.cos(ang)} y2={cy + ny * largo * Math.cos(ang)} c={COL.N} texto={revelado && r.pide === 'normal' ? `N ≈ ${num(r.bueno / 10, l)} N` : 'N'} tx={-10} ty={-6} />
      {revelado && <>
        <Flecha x1={cx} y1={cy} x2={cx - Math.cos(ang) * largo * Math.sin(ang)} y2={cy + Math.sin(ang) * largo * Math.sin(ang)} c={COL.a} discontinua texto={r.pide === 'a' ? `a ≈ ${num(r.bueno / 10, l)} m/s²` : 'P·sen α'} tx={12} ty={22} />
        <Flecha x1={cx} y1={cy} x2={cx - nx * largo * Math.cos(ang)} y2={cy - ny * largo * Math.cos(ang)} c={COL.P} discontinua texto="P·cos α" tx={30} ty={10} />
      </>}
    </svg>
  )
}

// Ascensor con báscula: `marca` es lo que señala la aguja que mueve el alumno.
function Ascensor({ r, revelado, tr, marca, max }) {
  const sube = r.caso === 'subeAcelera' || r.caso === 'subeFrena' || r.caso === 'constante'
  const aArriba = r.caso === 'subeAcelera'
  const aAbajo = r.caso === 'bajaAcelera' || r.caso === 'subeFrena'
  const v = revelado ? r.bueno : marca
  // Esfera de la báscula: de 0 a `max`, media vuelta
  const angAguja = Math.PI * (1 - Math.min(1, v / max))
  return (
    <svg viewBox="0 0 300 170" className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Ascensor con báscula', en: 'Lift with scales', ca: 'Ascensor amb bàscula' })}>
      <rect x="90" y="14" width="120" height="146" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
      <line x1="150" y1="0" x2="150" y2="14" stroke="#64748B" strokeWidth="3" />
      <rect x="120" y="140" width="60" height="8" rx="2" fill="#94A3B8" />
      <text x="150" y="128" textAnchor="middle" fontSize="40">🧑</text>
      <text x="150" y="157" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0F172A">{r.m} kg</text>
      <text x="240" y="30" fontSize="20" fill="#CBD5E1">{sube ? '⬆' : '⬇'}</text>
      {aArriba && <Flecha x1={250} y1={120} x2={250} y2={70} c={COL.a} texto={`a = ${r.a}`} tx={0} ty={-8} />}
      {aAbajo && <Flecha x1={250} y1={70} x2={250} y2={120} c={COL.a} texto={`a = ${r.a}`} tx={0} ty={16} />}
      {r.caso === 'constante' && <text x="250" y="100" textAnchor="middle" fontSize="11" fontWeight="900" fill={COL.a}>v = cte</text>}
      {/* la esfera de la báscula */}
      <g transform="translate(44 120)">
        <path d="M-34 0 A34 34 0 0 1 34 0" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
        <line x1="0" y1="0" x2={30 * Math.cos(angAguja)} y2={-30 * Math.sin(angAguja)} stroke={revelado ? COL.a : '#F59E0B'} strokeWidth="3" strokeLinecap="round" />
        <circle r="3.5" fill="#E2E8F0" />
        <text y="20" textAnchor="middle" fontSize="13" fontWeight="900" fill={revelado ? COL.a : '#FFFFFF'}>{v} N</text>
      </g>
    </svg>
  )
}

// Diagrama de fuerzas: el cuerpo en el centro y un hueco por lado; cada toque
// pasa a la fuerza siguiente (nada → P → N → F → Fr → T).
function Diagrama({ r, revelado, valor, onCambia, tr, l }) {
  const e = ESCENAS.find(x => x.id === r.escena)
  const bueno = diagramaBueno(r)
  const apoyado = ['reposo', 'empuje', 'frena', 'tira'].includes(e.id)
  const C = { x: 150, y: 92 }
  const fin = { arriba: [C.x, C.y - 76], abajo: [C.x, C.y + 76], izq: [C.x - 92, C.y], der: [C.x + 92, C.y] }
  const ini = { arriba: [C.x, C.y - 30], abajo: [C.x, C.y + 30], izq: [C.x - 34, C.y], der: [C.x + 34, C.y] }
  const etiqueta = { arriba: [0, -8], abajo: [0, 18], izq: [-4, -10], der: [4, -10] }
  const siguiente = f => FUERZAS[(FUERZAS.indexOf(f ?? '') + 1) % FUERZAS.length]
  return (
    <div className="relative">
      <svg viewBox="0 0 300 190" className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Diagrama de fuerzas', en: 'Free-body diagram', ca: 'Diagrama de forces' })}>
        {apoyado && <line x1="20" x2="280" y1={C.y + 30} y2={C.y + 30} stroke="#64748B" strokeWidth="3" />}
        {e.id === 'colgada' && <><line x1="80" x2="220" y1="6" y2="6" stroke="#64748B" strokeWidth="3" /><line x1={C.x} x2={C.x} y1="6" y2={C.y - 22} stroke="#94A3B8" strokeWidth="2" /></>}
        {apoyado || e.id === 'colgada'
          ? <rect x={C.x - 30} y={C.y - 30} width="60" height="60" rx="6" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
          : <circle cx={C.x} cy={C.y} r="28" fill="#1E293B" stroke="#475569" strokeWidth="2" />}
        <text x={C.x} y={C.y + 11} textAnchor="middle" fontSize="30">{e.emoji}</text>
        {LADOS.map(lado => {
          const f = revelado ? (bueno[lado] ?? '') : (valor[lado] ?? '')
          if (!f) return null
          const [x1, y1] = ini[lado], [x2, y2] = fin[lado], [dx, dy] = etiqueta[lado]
          return <Flecha key={lado} x1={x1} y1={y1} x2={x2} y2={y2} c={COL[f]} texto={f} tx={dx} ty={dy} />
        })}
      </svg>
      {/* Los huecos que se tocan: encima del dibujo, uno por lado */}
      {!revelado && LADOS.map(lado => {
        const pos = { arriba: 'left-1/2 top-[2%] -translate-x-1/2', abajo: 'left-1/2 bottom-[2%] -translate-x-1/2', izq: 'left-[6%] top-1/2 -translate-y-1/2', der: 'right-[6%] top-1/2 -translate-y-1/2' }[lado]
        const f = valor[lado] ?? ''
        return (
          <button key={lado} type="button" onClick={() => onCambia({ ...valor, [lado]: siguiente(f) })}
            aria-label={`${tr({ es: 'Fuerza', en: 'Force', ca: 'Força' })} ${lado}: ${f ? tx(NOMBRE_FUERZA[f], l) : tr({ es: 'ninguna', en: 'none', ca: 'cap' })}`}
            className={`absolute ${pos} w-12 h-12 rounded-full ${f ? 'border-2 border-transparent' : 'border-2 border-dashed border-white/25 bg-white/[0.03]'} text-white/40 text-xl font-black active:scale-95`}>
            {f ? '' : '+'}
          </button>
        )
      })}
      {revelado && LADOS.some(lado => (valor[lado] ?? '') !== (bueno[lado] ?? '')) && (
        <p className="text-center text-xs text-white/50 mt-1">{tr({ es: 'Tú habías puesto:', en: 'You had:', ca: 'Tu havies posat:' })} {LADOS.filter(lado => valor[lado]).map(lado => valor[lado]).join(', ') || '—'}</p>
      )}
    </div>
  )
}

// Leyenda de las fuerzas del diagrama
function Leyenda({ l }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] font-bold mb-3">
      {FUERZAS.filter(Boolean).map(f => <span key={f} style={{ color: COL[f] }}>{f} = {tx(NOMBRE_FUERZA[f], l)}</span>)}
    </div>
  )
}

export default function PreguntaNewton({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const mec = r.mecanica
  const { max, paso } = rango(r)
  const [texto, setTexto] = useState('')
  const [valor, setValor] = useState(() => (mec === 'diagrama' ? {} : 0))
  const manda = () => { if (!revelado) onResponder(mec === 'teclea' ? texto : valor) }
  const acierto = revelado && esCorrecta(r, elegida)

  const dibujo = mec === 'diagrama' ? <Diagrama r={r} revelado={revelado} valor={revelado ? (elegida ?? {}) : valor} onCambia={setValor} tr={tr} l={l} />
    : r.tipo === 'plano' ? <Plano r={r} revelado={revelado} l={l} tr={tr} />
    : r.tipo === 'ascensor' ? <Ascensor r={r} revelado={revelado} tr={tr} marca={valor} max={max} />
    : r.tipo === 'reaccion' ? null
    : <Suelo r={r} revelado={revelado} l={l} tr={tr} empuje={valor} />

  const boton = 'px-5 py-3 rounded-xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black disabled:opacity-40'
  return (
    <div className="w-full">
      {dibujo ? (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">{dibujo}</div>
      ) : (
        <p className="text-center text-5xl leading-none mb-2" aria-hidden="true">{r.caso === 'camion' ? '🚚' : '🧱'}</p>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>

      {mec === 'diagrama' && <Leyenda l={l} />}

      {!revelado && mec === 'teclea' && (
        <form onSubmit={e => { e.preventDefault(); manda() }} className="flex gap-2 justify-center">
          <input value={texto} onChange={e => setTexto(e.target.value.replace(/[^0-9.,]/g, ''))} inputMode="decimal" autoFocus
            aria-label={tr({ es: 'Tu respuesta', en: 'Your answer', ca: 'La teva resposta' })}
            className="w-28 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-xl font-black text-white tabular-nums outline-none focus:border-amber-400" />
          <span className="self-center text-white/70 font-black">{unidad(r)}</span>
          <button type="submit" disabled={!texto} className={boton}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </form>
      )}

      {!revelado && (mec === 'empuja' || mec === 'bascula') && (
        <div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setValor(v => Math.max(0, v - paso))} className="w-11 h-11 rounded-xl bg-white/10 text-white text-xl font-black" aria-label="−">−</button>
            <input type="range" min="0" max={max} step={paso} value={valor} onChange={e => setValor(Number(e.target.value))}
              aria-label={mec === 'bascula' ? tr({ es: 'Aguja de la báscula', en: 'Scales needle', ca: 'Agulla de la bàscula' }) : tr({ es: 'Fuerza del empuje', en: 'Push force', ca: 'Força de l’empenta' })}
              className="flex-1 accent-amber-400" />
            <button type="button" onClick={() => setValor(v => Math.min(max, v + paso))} className="w-11 h-11 rounded-xl bg-white/10 text-white text-xl font-black" aria-label="+">+</button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-white text-2xl font-black tabular-nums">{valor} N</span>
            <button type="button" onClick={manda} disabled={valor === 0} className={boton}>
              {mec === 'bascula' ? tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' }) : tr({ es: 'Empujar', en: 'Push', ca: 'Empènyer' })}
            </button>
          </div>
        </div>
      )}

      {!revelado && mec === 'diagrama' && (
        <div className="text-center">
          <button type="button" onClick={manda} className={boton}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </div>
      )}

      {revelado && (
        <>
          <p className={`text-center font-black ${acierto ? 'text-green-400' : 'text-red-300'}`}>
            {acierto ? '✅ ' : '❌ '}{tr({ es: 'Respuesta', en: 'Answer', ca: 'Resposta' })}: {textoRespuesta(r, l)}
          </p>
          <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>
        </>
      )}
    </div>
  )
}
