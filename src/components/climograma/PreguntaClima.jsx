// Una ronda de Climograma (ver lib/climograma): todo se responde tocando el
// climograma. Un mes (cálido, lluvioso), varios (secos, verano), el más alto
// y el más bajo más la amplitud tecleada, o tres climogramas pequeños a la
// caja de su clima. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, INICIALES, NOMBRE_CLIMA, esCorrecta, respuestaMeses } from '../../lib/climograma'
import GraficaClima from './GraficaClima'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const nom = (c, l) => NOMBRE_CLIMA[c][l] ?? NOMBRE_CLIMA[c].es

function Leyenda({ tr }) {
  return (
    <div className="flex justify-center gap-4 text-[11px] font-bold mt-0.5">
      <span className="text-red-300">— {tr({ es: 'Temperatura (°C)', en: 'Temperature (°C)', ca: 'Temperatura (°C)' })}</span>
      <span className="text-blue-300">▮ {tr({ es: 'Precipitación (mm)', en: 'Rainfall (mm)', ca: 'Precipitació (mm)' })}</span>
    </div>
  )
}

function Meses({ r, revelado, elegida, onResponder, tr, l }) {
  const varios = r.mecanica === 'secos' || r.mecanica === 'verano'
  const amplitud = r.mecanica === 'amplitud'
  const [sel, setSel] = useState([])
  const [v, setV] = useState('')
  const toca = m => {
    if (revelado) return
    if (!varios && !amplitud) { onResponder(m); return }
    setSel(s => (s.includes(m) ? s.filter(x => x !== m) : amplitud && s.length >= 2 ? [s[1], m] : [...s, m]))
  }
  const elegidos = revelado ? (varios ? String(elegida).split(',').filter(Boolean).map(Number) : amplitud ? sel : [Number(elegida)]) : sel
  const ok = revelado && esCorrecta(r, elegida)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <GraficaClima ronda={r} revelado={revelado} iniciales={INICIALES[l]} t={{ aria: tr({ es: 'Climograma', en: 'Climate graph', ca: 'Climograma' }) }} onMes={revelado ? null : toca} elegidos={elegidos} />
        <Leyenda tr={tr} />
        {amplitud && sel.length > 0 && <p className="text-center text-xs text-amber-200 mt-1">{sel.map(m => `${INICIALES[l][m]} ${r.T[m]} °C`).join(' · ')}</p>}
      </div>
      {amplitud && !revelado && (
        <>
          <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
            <span className="text-white/60 text-sm font-bold">{tr({ es: 'Amplitud', en: 'Range', ca: 'Amplitud' })}: </span>
            <span className="text-amber-300 font-black text-2xl tabular-nums">{v || '?'} °C</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'].map(t => (
              <button key={t} className={tecla} onClick={() => setV(x => (t === '⌫' ? x.slice(0, -1) : x.length < 3 ? x + t : x))}>{t}</button>
            ))}
          </div>
        </>
      )}
      {!revelado && (varios || amplitud) && (
        <button className={boton} disabled={amplitud ? !v : !sel.length} onClick={() => onResponder(amplitud ? v : respuestaMeses(sel))}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
      )}
      {revelado && amplitud && <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>{elegida} °C {ok ? '✓' : `→ ${r.bueno} °C`}</p>}
    </>
  )
}

function Clasifica({ r, revelado, onResponder, tr, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.climas.findIndex((_, i) => puestas[i] == null)
  const colocar = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [activa]: c }
    setPuestas(n)
    if (r.climas.every((_, i) => n[i] != null)) onResponder(`clasifica:${r.climas.filter((x, i) => n[i] !== x.tipo).length}`)
  }
  const aria = { aria: tr({ es: 'Climograma', en: 'Climate graph', ca: 'Climograma' }) }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      {activa >= 0 && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <p className="text-white/40 text-xs text-center">{activa + 1} / {r.climas.length}</p>
          <GraficaClima ronda={{ ...r.climas[activa], pregunta: 'clima' }} revelado={false} iniciales={INICIALES[l]} t={aria} />
          <Leyenda tr={tr} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => colocar(c)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[4rem] text-left">
            <span className="block text-white text-[13px] font-black">{nom(c, l)}</span>
            <span className="grid grid-cols-2 gap-1 mt-1">
              {r.climas.map((x, i) => puestas[i] === c && (
                <span key={i} className={`rounded-md p-0.5 ${revelado ? (x.tipo === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : 'ring-1 ring-white/20'}`}>
                  <GraficaClima ronda={{ ...x, pregunta: 'clima' }} revelado={false} iniciales={INICIALES[l]} t={aria} />
                </span>
              ))}
            </span>
            {revelado && r.climas.some((x, i) => puestas[i] === c && x.tipo !== c) && <span className="block text-[10.5px] text-red-300 mt-1">{r.climas.filter((x, i) => puestas[i] === c && x.tipo !== c).map(x => nom(x.tipo, l)).join(', ')}</span>}
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaClima({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, tr, l }
  return (
    <div className="w-full">
      {ronda.mecanica === 'clasifica' ? <Clasifica {...props} /> : <Meses {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
