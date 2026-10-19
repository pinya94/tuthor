// Una ronda de Termómetro. Según el tipo:
//   escala  → el termómetro con dos escalas y sus puntos de referencia
//             (0 °C = 273 K = 32 °F; 100 °C = 373 K = 212 °F)
//   mezcla  → dos vasos de agua (altura según la masa, color según la
//             temperatura) y el vaso de la mezcla, que se colorea al corregir
//   calor   → el bloque de la sustancia, de la temperatura inicial a la final
//   resto   → la escena con su emoji
// Sin opciones: se teclea (escala, calor), se ajusta el vaso de la mezcla,
// se reparten escenas en cajas o se monta una sartén.
// La usan el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, escalaDe, aK, aF, colorAgua, num, SUSTANCIAS, ESCENAS, MODOS, MATERIALES, esCorrecta, leeNumero, modoDe } from '../../lib/termometro'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const tx = (o, l) => o[l] ?? o.es

const UNI = { C: '°C', K: 'K', F: '°F' }
const deC = (c, u) => (u === 'C' ? c : u === 'K' ? aK(c) : aF(c))

function TermometroDoble({ ronda, revelado, l, escrito }) {
  const [de, a] = escalaDe(ronda)
  const c = ronda.c
  const cMin = -70, cMax = 165
  const y = t => 214 - ((t - cMin) / (cMax - cMin)) * 190
  const refs = [0, 100]
  const lado = (u, x, ancla) => refs.map(r => (
    <g key={`${u}${r}`}>
      <line x1={ancla === 'end' ? x + 4 : x - 14} x2={ancla === 'end' ? x + 16 : x - 2} y1={y(r)} y2={y(r)} stroke="#94A3B8" strokeWidth="1.5" />
      <text x={x} y={y(r) + 4} textAnchor={ancla} fontSize="11" fontWeight="700" fill="#94A3B8">{num(deC(r, u), l)} {UNI[u]}</text>
    </g>
  ))
  const etiqueta = (x, ancla, texto, color) => (
    <text x={x} y={y(c) + 5} textAnchor={ancla} fontSize="15" fontWeight="900" fill={color} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>{texto}</text>
  )
  const nivel = Math.max(y(cMax - 5), Math.min(y(c), 214))
  return (
    <svg viewBox="0 0 260 250" className="w-full max-w-[300px] mx-auto h-auto" role="img" aria-label="Termómetro">
      <text x="64" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FDE68A">{UNI[de]}</text>
      <text x="196" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FDE68A">{UNI[a]}</text>
      <rect x="120" y="18" width="20" height="208" rx="10" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
      <rect x="125" y={nivel} width="10" height={226 - nivel} fill="#EF4444" />
      <circle cx="130" cy="232" r="16" fill="#EF4444" stroke="#64748B" strokeWidth="2" />
      {lado(de, 104, 'end')}
      {lado(a, 156, 'start')}
      <line x1="94" x2="166" y1={y(c)} y2={y(c)} stroke="#FCD34D" strokeWidth="2" strokeDasharray="4 3" />
      {etiqueta(88, 'end', `${num(ronda.dato, l)} ${UNI[de]}`, '#FFFFFF')}
      {etiqueta(172, 'start', revelado ? `${num(ronda.bueno, l)} ${UNI[a]}` : `${escrito || '?'} ${escrito ? UNI[a] : ''}`, revelado ? '#86EFAC' : '#FCD34D')}
    </svg>
  )
}

// Un vaso: altura del agua según la masa, color según la temperatura.
function Vaso({ x, m, t, oculto }) {
  const alto = 26 + (m / 1000) * 90 // 100 g → 35, 1000 g → 116
  const top = 150 - alto
  return (
    <g>
      <rect x={x + 4} y={top} width="62" height={alto} fill={oculto ? '#334155' : colorAgua(t)} opacity="0.85" />
      <path d={`M${x} 36 L${x} 150 Q${x} 156 ${x + 6} 156 L${x + 64} 156 Q${x + 70} 156 ${x + 70} 150 L${x + 70} 36`} stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
      <text x={x + 35} y="176" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFFFFF">{m} g</text>
      <text x={x + 35} y="26" textAnchor="middle" fontSize="15" fontWeight="900" fill={oculto ? '#FCD34D' : '#FFFFFF'}>{oculto ? '?' : `${t} °C`}</text>
    </g>
  )
}

function Mezcla({ ronda, revelado, elegida }) {
  const [[m1, t1], [m2, t2]] = ronda.vasos
  return (
    <svg viewBox="0 0 330 184" className="w-full h-auto" role="img" aria-label="Mezcla de agua">
      <Vaso x={4} m={m1} t={t1} />
      <text x="92" y="104" textAnchor="middle" fontSize="22" fontWeight="900" fill="#94A3B8">+</text>
      <Vaso x={112} m={m2} t={t2} />
      <text x="200" y="104" textAnchor="middle" fontSize="22" fontWeight="900" fill="#94A3B8">→</text>
      <Vaso x={222} m={m1 + m2} t={revelado ? ronda.bueno : elegida} oculto={elegida == null && !revelado} />
    </svg>
  )
}

function Calor({ ronda, l }) {
  const S = SUSTANCIAS[ronda.sustancia]
  const caja = t => (
    <div className="rounded-xl px-3 py-2 text-center border border-white/10" style={{ background: colorAgua(t) }}>
      <p className="text-white font-black text-lg tabular-nums leading-tight drop-shadow">{t} °C</p>
    </div>
  )
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="text-center">
        <p className="text-white/60 text-xs font-bold mb-1">{num(ronda.m, l)} kg · {S.n[l] ?? S.n.es}</p>
        {caja(ronda.t0)}
      </div>
      <div className="text-center px-1">
        <p className="text-2xl leading-none">🔥</p>
        <p className="text-amber-300 font-black text-sm">Q = ?</p>
      </div>
      <div className="text-center">
        <p className="text-white/60 text-xs font-bold mb-1">&nbsp;</p>
        {caja(ronda.tf)}
      </div>
    </div>
  )
}

// Teclado numérico con signo (para °C y °F bajo cero).
function Teclado({ setV, signo }) {
  const pulsa = k => setV(x => (k === '⌫' ? x.slice(0, -1) : k === '±' ? (x.startsWith('−') ? x.slice(1) : '−' + x) : x.replace('−', '').length < 7 ? x + k : x))
  return (
    <div className="grid grid-cols-4 gap-1.5 mb-3">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ...(signo ? ['±'] : []), '⌫'].map(k => (
        <button key={k} className={tecla} onClick={() => pulsa(k)}>{k}</button>
      ))}
    </div>
  )
}

function Cajas({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.escenas.findIndex(id => !puestas[id])
  const pon = m => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.escenas[activa]]: m }
    setPuestas(n)
    if (r.escenas.every(id => n[id])) onResponder(`clasifica:${r.escenas.filter(id => n[id] !== modoDe(id)).length}`)
  }
  const e = activa >= 0 ? ESCENAS.find(x => x.id === r.escenas[activa]) : null
  return (
    <>
      {e && !revelado && (
        <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-3 mb-3 text-center">
          <p className="text-white/40 text-xs">{activa + 1} / {r.escenas.length}</p>
          <p className="text-4xl leading-none my-1" aria-hidden="true">{e.emoji}</p>
          <p className="text-white text-sm font-bold leading-snug">{tx(e.texto, l)}</p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(MODOS).map(m => (
          <button key={m} disabled={revelado || activa < 0} onClick={() => pon(m)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-1.5 min-h-[5.5rem]">
            <span className="block text-white font-black text-[12px] mb-1">{tx(MODOS[m], l)}</span>
            <span className="flex flex-wrap justify-center gap-1">
              {r.escenas.filter(id => puestas[id] === m).map(id => (
                <span key={id} className={`text-2xl leading-none rounded-lg p-0.5 ${revelado ? (modoDe(id) === m ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>{ESCENAS.find(x => x.id === id).emoji}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

function Sarten({ r, revelado, onResponder, tr, l }) {
  const [cuerpo, setCuerpo] = useState(null)
  const [mango, setMango] = useState(null)
  const activo = !cuerpo ? 'cuerpo' : !mango ? 'mango' : null
  const elige = id => {
    if (revelado) return
    if (activo === 'cuerpo') setCuerpo(id)
    else if (activo === 'mango') setMango(id)
  }
  const fallos = (cuerpo && !MATERIALES[cuerpo].conduce ? 1 : 0) + (mango && MATERIALES[mango].conduce ? 1 : 0)
  const color = (id, bien) => (revelado ? (bien ? '#4ADE80' : '#F87171') : id ? '#FDE68A' : '#475569')
  const okCuerpo = cuerpo && MATERIALES[cuerpo].conduce, okMango = mango && !MATERIALES[mango].conduce
  return (
    <>
      <svg viewBox="0 0 300 120" className="w-full h-auto mb-2" aria-hidden="true">
        <ellipse cx="105" cy="62" rx="88" ry="38" fill="#1E293B" stroke={color(cuerpo, okCuerpo)} strokeWidth="4" strokeDasharray={cuerpo ? '' : '6 4'} />
        <ellipse cx="105" cy="58" rx="70" ry="26" fill="#0F172A" />
        <rect x="190" y="52" width="104" height="18" rx="9" fill="#1E293B" stroke={color(mango, okMango)} strokeWidth="4" strokeDasharray={mango ? '' : '6 4'} />
        <text x="105" y="66" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">{cuerpo ? `${MATERIALES[cuerpo].emoji} ${tx(MATERIALES[cuerpo].n, l)}` : tr({ es: 'Cuerpo', en: 'Pan', ca: 'Cos' })}</text>
        <text x="242" y="96" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">{mango ? `${MATERIALES[mango].emoji} ${tx(MATERIALES[mango].n, l)}` : tr({ es: 'Mango', en: 'Handle', ca: 'Mànec' })}</text>
      </svg>
      {!revelado && <p className="text-center text-amber-300 text-xs font-bold mb-2">{activo === 'cuerpo' ? tr({ es: 'Elige el material del cuerpo', en: 'Choose the material for the pan', ca: 'Tria el material del cos' }) : activo === 'mango' ? tr({ es: 'Ahora, el del mango', en: 'Now, the handle', ca: 'Ara, el del mànec' }) : ''}</p>}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {r.piezas.map(id => (
          <button key={id} disabled={revelado || !activo || id === cuerpo} onClick={() => elige(id)} className="py-2.5 px-2 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] text-white text-sm font-bold disabled:opacity-40">
            {MATERIALES[id].emoji} {tx(MATERIALES[id].n, l)}
          </button>
        ))}
      </div>
      {!revelado && (
        <div className="grid grid-cols-2 gap-2">
          <button className="py-3 rounded-2xl bg-white/10 text-white font-bold disabled:opacity-30" disabled={!cuerpo} onClick={() => { setCuerpo(null); setMango(null) }}>{tr({ es: 'Empezar de nuevo', en: 'Start again', ca: 'Tornar a començar' })}</button>
          <button className={boton} disabled={!!activo} onClick={() => onResponder(`sarten:${fallos}`)}>{tr({ es: 'A cocinar', en: 'Start cooking', ca: 'A cuinar' })}</button>
        </div>
      )}
    </>
  )
}

export default function PreguntaTermometro({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const [v, setV] = useState('')
  const [t, setT] = useState(() => (r.vasos ? r.vasos[0][1] : 0))
  const ok = revelado && esCorrecta(r, elegida)
  const comprobar = txt => <button className={boton} disabled={leeNumero(v) == null} onClick={() => onResponder(v)}>{txt ?? tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
  const resultado = u => revelado && <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>{elegida} {u} {ok ? '✓' : `→ ${num(r.bueno, l)} ${u}`}</p>

  let cuerpo
  if (r.mecanica === 'escala') {
    const u = { C: '°C', K: 'K', F: '°F' }[escalaDe(r)[1]]
    cuerpo = (
      <>
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3"><TermometroDoble ronda={r} revelado={revelado} l={l} escrito={v} /></div>
        {revelado ? resultado(u) : <><Teclado setV={setV} signo={escalaDe(r)[1] !== 'K'} />{comprobar()}</>}
      </>
    )
  } else if (r.mecanica === 'calor') {
    cuerpo = (
      <>
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3"><Calor ronda={r} l={l} /></div>
        <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center"><span className="text-amber-300 font-black text-2xl tabular-nums">Q = {(revelado ? elegida : v) || '?'} J</span></div>
        {revelado ? resultado('J') : <><Teclado setV={setV} />{comprobar()}</>}
      </>
    )
  } else if (r.mecanica === 'mezcla') {
    const [[, t1], [, t2]] = r.vasos
    const paso = d => setT(x => Math.max(t1, Math.min(t2, x + d)))
    cuerpo = (
      <>
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3"><Mezcla ronda={r} revelado={revelado} elegida={revelado ? Number(elegida) : t} /></div>
        {revelado ? resultado('°C') : (
          <>
            <div className="flex items-center justify-center gap-2 mb-3">
              {[-5, -1].map(d => <button key={d} className="w-12 h-11 rounded-xl bg-white/10 text-white font-black" onClick={() => paso(d)}>{d}</button>)}
              <span className="min-w-[5.5rem] text-center text-2xl font-black tabular-nums" style={{ color: colorAgua(t) }}>{t} °C</span>
              {[1, 5].map(d => <button key={d} className="w-12 h-11 rounded-xl bg-white/10 text-white font-black" onClick={() => paso(d)}>+{d}</button>)}
            </div>
            <button className={boton} onClick={() => onResponder(String(t))}>{tr({ es: 'Mezclar', en: 'Mix', ca: 'Barrejar' })}</button>
          </>
        )}
      </>
    )
  } else if (r.mecanica === 'transmision') {
    cuerpo = <Cajas r={r} revelado={revelado} onResponder={onResponder} l={l} />
  } else {
    cuerpo = <Sarten r={r} revelado={revelado} onResponder={onResponder} tr={tr} l={l} />
  }

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
