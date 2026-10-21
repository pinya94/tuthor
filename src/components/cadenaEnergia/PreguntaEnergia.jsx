// Una ronda de Cadena de energía, sin opciones: las situaciones se reparten
// en cajas de formas de energía, los huecos (entrada y salida del aparato,
// eslabones de la cadena) se rellenan con fichas
// de formas y los números se teclean. La usan el juego
// (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { FORMAS, SITUACIONES, APARATOS, CADENAS, enunciado, textoOpcion, explicacion, nombreForma, esCorrecta, leeNumero } from '../../lib/cadenaEnergia'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'

// Un hueco para rellenar con una forma de energía.
function Hueco({ forma, l, activo, estado, onClick, pequena }) {
  const f = forma ? FORMAS[forma] : null
  const borde = estado === 'bien' ? 'border-green-400 bg-green-500/15' : estado === 'mal' ? 'border-red-400 bg-red-500/15' : activo ? 'border-amber-300 bg-amber-300/15' : 'border-dashed border-amber-300/60 bg-amber-300/5'
  return (
    <button type="button" onClick={onClick} className={`shrink-0 rounded-xl border-2 text-center px-1 py-1.5 ${pequena ? 'w-[66px]' : 'w-[76px]'} ${borde}`}>
      <p className={`leading-none ${pequena ? 'text-xl' : 'text-2xl'}`}>{f ? f.emoji : '❓'}</p>
      <p className="mt-1 font-bold leading-tight text-[10.5px] text-white/85">{f ? nombreForma(forma, l) : '?'}</p>
    </button>
  )
}

// Las nueve formas de energía, para tocar.
function Paleta({ onElige, l }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 mb-3">
      {Object.keys(FORMAS).map(f => (
        <button key={f} onClick={() => onElige(f)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 py-1.5 px-1 text-white">
          <span className="text-xl leading-none">{FORMAS[f].emoji}</span>
          <span className="block text-[10.5px] font-bold leading-tight mt-0.5">{nombreForma(f, l)}</span>
        </button>
      ))}
    </div>
  )
}

function Ficha({ forma, l, incognita, revelado, pequena }) {
  const oculta = incognita && !revelado
  const f = FORMAS[forma]
  return (
    <div className={`shrink-0 rounded-xl border text-center px-1.5 py-1.5 ${pequena ? 'w-[66px]' : 'w-[76px]'} ${oculta ? 'border-dashed border-amber-300/70 bg-amber-300/10' : incognita ? 'border-green-400/60 bg-green-500/15' : 'border-white/10 bg-white/[0.05]'}`}>
      <p className={`leading-none ${pequena ? 'text-xl' : 'text-2xl'}`}>{oculta ? '❓' : f.emoji}</p>
      <p className={`mt-1 font-bold leading-tight text-[10.5px] ${oculta ? 'text-amber-300' : incognita ? 'text-green-300' : 'text-white/80'}`}>{oculta ? '?' : nombreForma(forma, l)}</p>
    </div>
  )
}
const Flecha = () => <span className="shrink-0 text-white/35 font-black">→</span>

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.findIndex(i => !puestas[i])
  const pon = f => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.items[activa]]: f }
    setPuestas(n)
    if (r.items.every(i => n[i])) onResponder(`clasifica:${r.items.filter(i => n[i] !== SITUACIONES[i].forma).length}`)
  }
  const sit = activa >= 0 ? SITUACIONES[r.items[activa]] : null
  return (
    <>
      {sit && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3 flex items-center gap-3">
          <span className="text-5xl leading-none">{sit.emoji}</span>
          <div>
            <p className="text-white/40 text-xs">{activa + 1} / {r.items.length}</p>
            <p className="text-white font-bold text-lg leading-snug">{sit.texto[l] ?? sit.texto.es}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(f => (
          <button key={f} disabled={revelado || activa < 0} onClick={() => pon(f)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-2 min-h-[5rem] text-left">
            <span className="block text-white font-black text-[13px]">{FORMAS[f].emoji} {nombreForma(f, l)}</span>
            {r.items.filter(i => puestas[i] === f).map(i => (
              <span key={i} className={`block mt-1 rounded-md px-1.5 py-1 text-[11.5px] font-bold text-white leading-tight ${revelado ? (SITUACIONES[i].forma === f ? 'bg-green-500/25 ring-1 ring-green-400' : 'bg-red-500/25 ring-1 ring-red-400') : 'bg-white/10'}`}>
                {SITUACIONES[i].emoji} {SITUACIONES[i].texto[l] ?? SITUACIONES[i].texto.es}
                {revelado && SITUACIONES[i].forma !== f && <span className="block text-green-300">→ {nombreForma(SITUACIONES[i].forma, l)}</span>}
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

// Huecos con fichas: la entrada y la salida del aparato, o los eslabones de la cadena.
function Huecos({ r, revelado, elegida, onResponder, l, tr }) {
  const esAparato = r.mecanica === 'monta'
  const a = esAparato ? APARATOS[r.aparato] : null
  const c = esAparato ? null : CADENAS[r.cadena]
  const buenas = esAparato ? [a.entra, a.sale] : c.formas
  const huecos = esAparato ? [0, 1] : r.huecos
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(huecos[0])
  const elige = f => {
    if (revelado) return
    const n = { ...puestas, [activo]: f }
    setPuestas(n)
    const sig = huecos.find(k => !n[k])
    if (sig != null) setActivo(sig)
  }
  const listo = huecos.every(k => puestas[k])
  const responder = () => onResponder(esAparato ? `${puestas[0]}>${puestas[1]}` : `completa:${huecos.filter(k => puestas[k] !== buenas[k]).length}`)
  const pequena = !esAparato && c.formas.length > 3
  const casilla = k => (huecos.includes(k)
    ? <Hueco key={k} forma={revelado ? (puestas[k] ?? null) : puestas[k]} l={l} pequena={pequena} activo={!revelado && activo === k} estado={revelado ? (puestas[k] === buenas[k] ? 'bien' : 'mal') : null} onClick={() => !revelado && setActivo(k)} />
    : <Ficha key={k} forma={buenas[k]} l={l} pequena={pequena} />)
  const ok = revelado && esCorrecta(r, elegida)
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">
        <p className="text-center text-white font-bold mb-2"><span className="text-3xl align-middle mr-1.5">{esAparato ? a.emoji : c.emoji}</span>{tx(esAparato ? a.nombre : c.nombre, l)}</p>
        <div className="flex items-center justify-center gap-1">
          {esAparato
            ? [casilla(0), <Flecha key="f1" />, <span key="ap" className="shrink-0 text-3xl">{a.emoji}</span>, <Flecha key="f2" />, casilla(1)]
            : buenas.flatMap((_, k) => (k ? [<Flecha key={`a${k}`} />, casilla(k)] : [casilla(k)]))}
        </div>
        {esAparato && <p className="text-center text-white/45 text-[11px] mt-1.5">{tr({ es: 'entra · · · sale (útil)', en: 'in · · · out (useful)', ca: 'entra · · · surt (útil)' })}</p>}
        {revelado && !ok && <p className="text-center text-green-300 text-sm font-bold mt-2">{buenas.map(f => nombreForma(f, l)).join(' → ')}</p>}
      </div>
      {!revelado && (
        <>
          <Paleta l={l} onElige={elige} />
          <button className={boton} disabled={!listo} onClick={responder}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Teclea({ r, revelado, elegida, onResponder, l, tr }) {
  const [v, setV] = useState('')
  const sep = l === 'en' ? '.' : ','
  const escribe = t => setV(x => (t === '⌫' ? x.slice(0, -1) : t === sep ? (x.includes(sep) || !x ? x : x + t) : x.length < 6 ? x + t : x))
  const ok = revelado && esCorrecta(r, elegida)
  const uni = r.tipo === 'rendimiento' && r.pide === 'rendimiento' ? ' %' : ' J'
  let escena
  if (r.tipo === 'rendimiento') {
    const a = APARATOS[r.aparato]
    escena = (
      <div>
        <p className="text-center text-white font-bold mb-2"><span className="text-3xl align-middle mr-1.5">{a.emoji}</span>{a.nombre[l] ?? a.nombre.es}</p>
        <div className="flex h-9 rounded-lg overflow-hidden border border-white/15 text-[11px] font-black">
          <div className="flex items-center justify-center bg-green-500/70 text-white" style={{ width: `${Math.max(r.pct, 14)}%` }}>
            {tr({ es: 'Útil', en: 'Useful', ca: 'Útil' })} {r.util} J
          </div>
          <div className="flex-1 flex items-center justify-center bg-slate-500/40 text-white/85">
            🔥 {r.pide === 'perdida' && !revelado ? '? J' : `${r.entra - r.util} J`}
          </div>
        </div>
        <p className="text-center text-white/60 text-[12px] mt-1.5">
          {tr({ es: 'Entran', en: 'In', ca: 'Entren' })} {r.entra} J
          {r.pide === 'rendimiento' && <> · {tr({ es: 'rendimiento', en: 'efficiency', ca: 'rendiment' })} <b className={revelado ? 'text-green-300' : 'text-amber-300'}>{revelado ? textoOpcion(r.pct, r, l) : '?'}</b></>}
        </p>
      </div>
    )
  } else {
    const cima = 34, suelo = 132, medio = (cima + suelo) / 2, X = 98, XC = 124
    escena = (
      <svg viewBox="0 0 260 150" className="w-full h-auto max-h-[170px]" role="img" aria-label={tr({ es: 'Piedra en lo alto', en: 'Stone up high', ca: 'Pedra a dalt' })}>
        <defs><marker id="cae" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 0L5 10Z" fill="#E7E5E4" /></marker></defs>
        <path d={`M20 ${suelo}H240`} stroke="#94A3B8" strokeWidth="3" />
        <path d={`M20 ${cima}H110V${suelo}H20Z`} fill="#57534E" />
        <circle cx={X} cy={cima - 10} r="10" fill="#A8A29E" stroke="#0f172a" strokeWidth="2" />
        <text x={X - 14} y={cima - 26} textAnchor="middle" fontSize="12" fontWeight="800" fill="#E7E5E4">{r.m} kg</text>
        <path d={`M200 ${cima}V${suelo}`} stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="4 3" />
        <path d={`M194 ${cima}H206M194 ${suelo}H206`} stroke="#FBBF24" strokeWidth="1.6" />
        <text x="210" y={medio + 4} fontSize="12" fontWeight="800" fill="#FBBF24">{r.h} m</text>
        {r.pide !== 'ep' && (
          <g>
            <path d={`M${X + 12} ${cima - 14}Q${XC} ${cima - 14} ${XC} ${cima + 4}V${(r.pide === 'ec-mitad' ? medio : suelo) - 16}`} stroke="#E7E5E4" strokeWidth="1.6" strokeDasharray="3 4" fill="none" markerEnd="url(#cae)" />
            <circle cx={XC} cy={r.pide === 'ec-mitad' ? medio : suelo - 10} r="10" fill="none" stroke="#A8A29E" strokeWidth="2" strokeDasharray="3 3" />
          </g>
        )}
      </svg>
    )
  }
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">{escena}</div>
      <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
        <span className="text-amber-300 font-black text-2xl tabular-nums">{(revelado ? String(elegida ?? '') : v) || '?'}{uni}</span>
        {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${textoOpcion(r.bueno, r, l)}`}</span>}
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', sep, '⌫'].map(t => <button key={t} className={tecla} onClick={() => escribe(t)}>{t}</button>)}
          </div>
          <button className={boton} disabled={leeNumero(v) == null} onClick={() => onResponder(v)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

const tx = (o, l) => o[l] ?? o.es

export default function PreguntaEnergia({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, l, tr }
  const cuerpo = ronda.mecanica === 'clasifica' ? <Clasifica {...props} />
    : ronda.mecanica === 'teclea' ? <Teclea {...props} />
    : <Huecos {...props} />
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
