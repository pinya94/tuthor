// Una ronda de ¿Quién Desafina? (ver lib/quienDesafina):
//   cual   tocar cada instrumento para oírlo (y elegirlo), luego alto/bajo
//   afina  mover la clavija del segundo hasta que suene como el primero
// El timbre de cada instrumento se sintetiza con Web Audio (sin muestras):
// distinto para cada uno, pero sin vibrato, que movería la afinación.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { ensureAudio } from '../../lib/pentagramaAudio'
import Instrumento from '../laOrquesta/Instrumento'
import { instrumento } from '../../lib/laOrquesta'
import { notaDe, frecuencias, conCents, centsDe, afinado, RANGO, enunciado, explicacion, tx } from '../../lib/quienDesafina'

// [onda, filtro (Hz) o null, ataque, ¿se apaga solo? (pulsado/percutido)]
const TIMBRE = {
  violin: ['sawtooth', 2800, 0.08, false],
  flauta: ['sine', null, 0.06, false],
  guitarra: ['triangle', 3500, 0.005, true],
  clarinete: ['square', 1800, 0.05, false],
  trompeta: ['sawtooth', 4200, 0.03, false],
  piano: ['triangle', 5000, 0.005, true],
}
const DUR = 1.1

function suena(id, f, cuando = 0) {
  const ac = ensureAudio()
  if (!ac) return
  const [onda, filtro, ataque, seApaga] = TIMBRE[id] ?? TIMBRE.flauta
  const t0 = ac.currentTime + cuando
  const g = ac.createGain()
  g.gain.setValueAtTime(0, t0)
  g.gain.linearRampToValueAtTime(onda === 'square' || onda === 'sawtooth' ? 0.09 : 0.2, t0 + ataque)
  if (seApaga) g.gain.exponentialRampToValueAtTime(0.0001, t0 + DUR)
  else { g.gain.setValueAtTime(onda === 'square' || onda === 'sawtooth' ? 0.09 : 0.2, t0 + DUR - 0.15); g.gain.linearRampToValueAtTime(0, t0 + DUR) }
  if (filtro) { const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = filtro; lp.connect(ac.destination); g.connect(lp) } else g.connect(ac.destination)
  const o = ac.createOscillator()
  o.type = onda
  o.frequency.value = f
  o.connect(g)
  o.start(t0)
  o.stop(t0 + DUR + 0.05)
}

function Tarjeta({ id, activo, marca, onClick, l, children }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-2xl p-2 pb-2.5 flex flex-col items-center transition-all border-2 ${marca ?? (activo ? 'border-amber-300 bg-white/15' : 'border-transparent bg-white/[0.06] hover:bg-white/10')}`}>
      <Instrumento id={id} className="w-full h-auto block max-w-[6rem]" />
      <span className="text-white text-[12px] font-black mt-1">{tx(instrumento(id).nombre, l)}</span>
      {children}
    </button>
  )
}

function Cual({ r, revelado, onResponder, l, tr }) {
  const fs = frecuencias(r)
  const [elegido, setElegido] = useState(null)
  const [dir, setDir] = useState(null)
  const toca = i => { suena(r.inst[i], fs[i]); if (!revelado) setElegido(i) }
  const todos = () => r.inst.forEach((id, i) => suena(id, fs[i], i * (DUR + 0.25)))
  const listo = elegido !== null && (!r.direccion || dir)
  const envia = () => { if (!revelado && listo) onResponder(r.direccion ? `cual:${elegido}:${dir}` : `cual:${elegido}`) }
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {r.inst.map((id, i) => (
          <Tarjeta key={id} id={id} l={l} activo={elegido === i} onClick={() => toca(i)}
            marca={revelado ? (i === r.malo ? 'border-red-400 bg-red-500/10' : 'border-green-400/60 bg-green-500/5') : undefined}>
            <span className="text-white/50 text-[11px] mt-0.5">🔊 {tr({ es: 'tocar', en: 'play', ca: 'tocar' })}</span>
          </Tarjeta>
        ))}
      </div>
      <button type="button" onClick={todos} className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-2 text-white text-sm font-bold mb-3">
        🔊 {tr({ es: 'Escuchar los tres seguidos', en: 'Play all three in a row', ca: 'Escoltar els tres seguits' })}
      </button>
      {r.direccion && !revelado && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[['sube', tr({ es: '⬆ Está alto (agudo)', en: '⬆ Sharp (too high)', ca: '⬆ Està alt (agut)' })], ['baja', tr({ es: '⬇ Está bajo (grave)', en: '⬇ Flat (too low)', ca: '⬇ Està baix (greu)' })]].map(([k, t]) => (
            <button key={k} type="button" onClick={() => setDir(k)} className={`rounded-xl py-2.5 text-sm font-black ${dir === k ? 'bg-sky-500 text-white ring-2 ring-amber-300' : 'bg-white/10 text-white/80'}`}>{t}</button>
          ))}
        </div>
      )}
      {!revelado && (
        <>
          <button type="button" disabled={!listo} onClick={envia} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
          <p className="text-center text-xs text-white/40 mt-2">{r.direccion
            ? tr({ es: 'Toca cada instrumento para oírlo; el último que toques es tu elección', en: 'Tap each instrument to hear it; the last one you tap is your choice', ca: 'Toca cada instrument per sentir-lo; l’últim que toquis és la teva tria' })
            : tr({ es: 'Toca cada instrumento para oírlo; el último que toques es el que eliges', en: 'Tap each instrument to hear it; the last one you tap is the one you choose', ca: 'Toca cada instrument per sentir-lo; l’últim que toquis és el que tries' })}</p>
        </>
      )}
    </>
  )
}

function Afina({ r, revelado, onResponder, onCents, l, tr }) {
  const f0 = notaDe(r).f
  const [v, setV] = useState(r.inicio)
  const cents = centsDe(r, v)
  const tocaRef = () => suena(r.inst[0], f0)
  const tocaOtro = (c = cents) => suena(r.inst[1], conCents(f0, c))
  const envia = () => { if (revelado) return; onCents(cents); onResponder(afinado(r, cents) ? 'afina:ok' : 'afina:mal') }
  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Tarjeta id={r.inst[0]} l={l} onClick={tocaRef} marca="border-amber-400/60 bg-amber-400/5">
          <span className="text-amber-300 text-[11px] font-bold mt-0.5">🔊 {tr({ es: 'referencia', en: 'reference', ca: 'referència' })}</span>
        </Tarjeta>
        <Tarjeta id={r.inst[1]} l={l} onClick={() => tocaOtro()} marca={revelado ? (afinado(r, cents) ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10') : 'border-sky-400/60 bg-sky-500/5'}>
          <span className="text-sky-300 text-[11px] font-bold mt-0.5">🔊 {tr({ es: 'el que afinas', en: 'the one you tune', ca: 'el que afines' })}</span>
        </Tarjeta>
      </div>
      <div className="rounded-xl bg-white/[0.05] px-3 py-3 mb-3">
        <div className="flex justify-between text-[11px] text-white/50 font-bold mb-1">
          <span>{tr({ es: '⬇ más grave', en: '⬇ lower', ca: '⬇ més greu' })}</span>
          <span>{tr({ es: 'clavija', en: 'tuning peg', ca: 'clavilla' })}</span>
          <span>{tr({ es: 'más agudo ⬆', en: 'higher ⬆', ca: 'més agut ⬆' })}</span>
        </div>
        <input type="range" min={-RANGO} max={RANGO} step="1" value={v} disabled={revelado}
          onChange={e => setV(Number(e.target.value))}
          onPointerUp={() => tocaOtro()} onKeyUp={() => tocaOtro()}
          className="w-full accent-sky-400" aria-label={tr({ es: 'Clavija de afinación', en: 'Tuning peg', ca: 'Clavilla d’afinació' })} />
      </div>
      <button type="button" onClick={() => { tocaRef(); tocaOtro(); }} className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-2 text-white text-sm font-bold mb-3">
        🔊 {tr({ es: 'Los dos a la vez (si no está afinado, se oyen «batidos»)', en: 'Both together (out of tune, you hear “beats”)', ca: 'Els dos alhora (si no està afinat, se senten «batecs»)' })}
      </button>
      {!revelado && (
        <button type="button" onClick={envia} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black">
          {tr({ es: 'Ya está afinado', en: 'It’s in tune', ca: 'Ja està afinat' })}
        </button>
      )}
    </>
  )
}

export default function PreguntaDesafina({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  // La clavija final hace falta en la explicación: el componente Afina la sube aquí
  const [clavija, setClavija] = useState(null)
  const props = { r: ronda, revelado, l, tr }
  const nombres = ronda.inst.map(id => tx(instrumento(id).nombre, l))
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {ronda.tipo === 'afina'
        ? <Afina {...props} onResponder={onResponder} onCents={setClavija} />
        : <Cual {...props} onResponder={onResponder} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l, nombres, clavija ?? undefined)}</p>}
    </div>
  )
}
