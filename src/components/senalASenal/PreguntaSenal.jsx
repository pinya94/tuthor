// Una ronda de Señal a Señal, con dos mecánicas:
//   monta      se elige forma y dibujo y la señal se va dibujando; «Comprobar»
//              responde «marco:símbolo».
//   clasifica  se toca una señal y luego su tipo; al colocar las cuatro se
//              responde «clasifica:fallos».
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import Senal, { SenalPieza } from './Senal'
import { MARCOS, SIMBOLOS, TIPOS, senal, enunciado, explicacion, tx } from '../../lib/senalASenal'

const pieza = sel => `rounded-xl border p-1.5 transition-all ${sel ? 'bg-white/20 border-amber-300 ring-2 ring-amber-300' : 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'}`

function Monta({ r, revelado, elegida, onResponder, l }) {
  const [marco, setMarco] = useState(null)
  const [simbolo, setSimbolo] = useState(null)
  const sn = senal(r.senal)
  const ok = revelado && elegida === r.bueno
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 mb-3">
        <p className="text-white/50 text-xs text-center">{enunciado(r, l)}</p>
        <p className="text-white font-black text-lg leading-snug text-center mb-2">{tx(sn.sig, l)}</p>
        <div className="flex justify-center items-center gap-4">
          <div className="text-center">
            <SenalPieza marco={marco} simbolo={simbolo} className="w-32 h-32 block" />
            {revelado && !ok && <p className="text-red-300 text-xs font-bold mt-1">{tx({ es: 'Tu señal ✗', en: 'Your sign ✗', ca: 'El teu senyal ✗' }, l)}</p>}
          </div>
          {revelado && !ok && (
            <div className="text-center">
              <Senal id={sn.id} className="w-32 h-32 block" />
              <p className="text-green-300 text-xs font-bold mt-1">{tx({ es: 'Así es', en: 'This is it', ca: 'Així és' }, l)}</p>
            </div>
          )}
        </div>
      </div>
      <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">{tx({ es: 'Forma', en: 'Shape', ca: 'Forma' }, l)}</p>
      <div className={`grid gap-1.5 mb-3 ${r.marcos.length > 5 ? 'grid-cols-4' : r.marcos.length === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {r.marcos.map(m => (
          <button key={m} disabled={revelado} onClick={() => setMarco(m)} className={pieza(marco === m)} aria-label={tx(MARCOS[m].nombre, l)}>
            <SenalPieza marco={m} className="w-full h-auto block" />
            {(r.pistas || revelado) && <span className="block text-[10px] text-white/70 font-bold leading-tight mt-0.5">{tx(TIPOS[MARCOS[m].tipo].nombre, l)}</span>}
          </button>
        ))}
      </div>
      <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">{tx({ es: 'Dibujo', en: 'Symbol', ca: 'Dibuix' }, l)}</p>
      <div className={`grid gap-1.5 mb-3 ${r.simbolos.length > 4 ? 'grid-cols-6' : 'grid-cols-4'}`}>
        {r.simbolos.map(x => (
          <button key={x} disabled={revelado} onClick={() => setSimbolo(x)} className={`${pieza(simbolo === x)} !bg-slate-200 ${simbolo === x ? '' : 'opacity-90'}`} aria-label={tx(SIMBOLOS[x], l)}>
            <SenalPieza marco="ninguno" simbolo={x} className="w-full h-auto block" />
          </button>
        ))}
      </div>
      {!revelado && (
        <button disabled={!marco || !simbolo} onClick={() => onResponder(`${marco}:${simbolo}`)}
          className="w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity">
          {tx({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' }, l)}
        </button>
      )}
    </>
  )
}

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({}) // id de señal → tipo elegido
  const [activa, setActiva] = useState(r.senales[0])
  const colocar = tipo => {
    if (revelado || !activa) return
    const nuevas = { ...puestas, [activa]: tipo }
    setPuestas(nuevas)
    const sig = r.senales.find(i => !nuevas[i])
    setActiva(sig ?? null)
    if (!sig) onResponder(`clasifica:${r.senales.filter(i => nuevas[i] !== senal(i).tipo).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="flex justify-center gap-2 mb-3 min-h-[4.5rem]">
        {r.senales.filter(i => !puestas[i]).map(i => (
          <button key={i} onClick={() => setActiva(i)} className={`rounded-xl p-1 transition-all ${activa === i ? 'bg-white/20 ring-2 ring-amber-300 scale-110' : 'bg-white/5'}`}>
            <Senal id={i} className="w-14 h-14 block" />
          </button>
        ))}
      </div>
      <div className={`grid gap-2 ${r.clases.length > 4 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.clases.map(t => {
          const dentro = r.senales.filter(i => puestas[i] === t)
          return (
            <button key={t} disabled={revelado || !activa} onClick={() => colocar(t)}
              className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[5.5rem] text-left transition-all">
              <span className="block text-white text-sm font-black">{tx(TIPOS[t].nombre, l)}</span>
              {r.pistas && <span className="block text-white/50 text-[10.5px] leading-tight">{tx(TIPOS[t].forma, l).split(':')[0]}</span>}
              <span className="flex flex-wrap gap-1 mt-1">
                {dentro.map(i => {
                  const bien = senal(i).tipo === t
                  return <span key={i} className={`rounded-md p-0.5 ${bien ? 'bg-green-500/40 ring-2 ring-green-400' : 'bg-red-500/40 ring-2 ring-red-400'}`}><Senal id={i} className="w-9 h-9 block" /></span>
                })}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}

export default function PreguntaSenal({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  return (
    <div className="w-full">
      {ronda.tipo === 'clasifica'
        ? <Clasifica r={ronda} revelado={revelado} onResponder={onResponder} l={l} />
        : <Monta r={ronda} revelado={revelado} elegida={elegida} onResponder={onResponder} l={l} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l, elegida)}</p>}
    </div>
  )
}
