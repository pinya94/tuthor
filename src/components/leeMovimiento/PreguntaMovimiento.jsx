// Una ronda de Lee el movimiento, sin opciones: se etiqueta qué hace el móvil
// en cada tramo, se ordenan los tramos del más rápido al más lento o se
// teclea el número (con su signo). La usan el juego (contra reloj) y el
// examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, TRAMOS, ETIQUETAS, queHace, nombreCorto, esCorrecta, respuestaBuena, leeNumero, unidad } from '../../lib/leeMovimiento'
import GraficaMovimiento from './GraficaMovimiento'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const COLOR = ['#60A5FA', '#F472B6', '#FBBF24'] // los de los tramos A, B y C en la gráfica
const comprobar = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }
const num = (x, l) => (l === 'en' ? String(x) : String(x).replace('.', ',').replace('-', '−'))

function Etiqueta({ r, revelado, onResponder, l, tr }) {
  const [elegidas, setElegidas] = useState({})
  const opciones = ETIQUETAS[r.eje]
  const listo = [0, 1, 2].every(i => elegidas[i])
  return (
    <>
      <div className="space-y-2 mb-3">
        {[0, 1, 2].map(i => {
          const buena = queHace(r, i)
          return (
            <div key={i} className="flex items-center gap-2">
              <span className="shrink-0 w-7 h-7 rounded-full grid place-items-center text-sm font-black" style={{ color: COLOR[i], border: `2px solid ${COLOR[i]}` }}>{TRAMOS[i]}</span>
              <div className={`flex-1 grid gap-1 ${opciones.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {opciones.map(o => {
                  const sel = elegidas[i] === o
                  const color = revelado
                    ? (o === buena ? 'border-green-400 bg-green-500/20 text-white' : sel ? 'border-red-400 bg-red-500/20 text-white' : 'border-white/5 text-white/30')
                    : sel ? 'border-amber-300 bg-amber-300/20 text-white' : 'border-white/15 bg-white/[0.05] text-white/80'
                  return (
                    <button key={o} disabled={revelado} onClick={() => setElegidas(e => ({ ...e, [i]: o }))}
                      className={`rounded-lg border px-1.5 py-1.5 text-[11.5px] font-bold leading-tight ${color}`}>
                      {nombreCorto(o, l)}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(`etiqueta:${[0, 1, 2].filter(i => elegidas[i] !== queHace(r, i)).length}`)}>{tr(comprobar)}</button>}
    </>
  )
}

function Ordena({ r, revelado, elegida, onResponder, tr }) {
  const [orden, setOrden] = useState([])
  const mostrado = revelado ? String(elegida ?? '').split('>').filter(Boolean) : orden
  const ok = revelado && esCorrecta(r, elegida)
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {[0, 1, 2].map(k => (
          <div key={k} className={`rounded-xl border-2 py-2 text-center ${revelado ? (ok ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15') : mostrado[k] ? 'border-white/25 bg-white/[0.07]' : 'border-dashed border-amber-300/50'}`}>
            <p className="text-white/50 text-[11px] font-bold">{k === 0 ? tr({ es: 'Más rápido', en: 'Fastest', ca: 'Més ràpid' }) : k === 2 ? tr({ es: 'Más lento', en: 'Slowest', ca: 'Més lent' }) : '·'}</p>
            <p className="font-black text-xl" style={{ color: mostrado[k] ? COLOR[TRAMOS.indexOf(mostrado[k])] : '#fff' }}>{mostrado[k] ?? '?'}</p>
          </div>
        ))}
      </div>
      {revelado
        ? !ok && <p className="text-center text-green-300 font-black text-sm">{respuestaBuena(r).split('>').join(' > ')}</p>
        : (
          <>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {TRAMOS.map((t, i) => (
                <button key={t} disabled={orden.includes(t)} onClick={() => setOrden(o => [...o, t])}
                  className="rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 py-2.5 font-black text-lg disabled:opacity-25" style={{ color: COLOR[i] }}>
                  {tr({ es: 'Tramo', en: 'Stretch', ca: 'Tram' })} {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-3 rounded-2xl bg-white/10 text-white font-bold disabled:opacity-30" disabled={!orden.length} onClick={() => setOrden([])}>{tr({ es: 'Borrar', en: 'Clear', ca: 'Esborrar' })}</button>
              <button className={boton} disabled={orden.length < 3} onClick={() => onResponder(orden.join('>'))}>{tr(comprobar)}</button>
            </div>
          </>
        )}
    </>
  )
}

function Teclea({ r, revelado, elegida, onResponder, l, tr }) {
  const [v, setV] = useState('')
  const sep = l === 'en' ? '.' : ','
  const escribe = t => setV(x => {
    if (t === '⌫') return x.slice(0, -1)
    if (t === '−') return x.startsWith('−') ? x.slice(1) : '−' + x // el signo va delante y se quita volviendo a pulsar
    if (t === sep) return x.includes(sep) || !x.replace('−', '') ? x : x + t
    return x.length < 7 ? x + t : x
  })
  const ok = revelado && esCorrecta(r, elegida)
  return (
    <>
      <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
        <span className="text-amber-300 font-black text-2xl tabular-nums">{(revelado ? String(elegida ?? '') : v) || '?'} {unidad(r)}</span>
        {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${num(r.bueno, l)} ${unidad(r)}`}</span>}
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {['1', '2', '3', '−', '4', '5', '6', sep, '7', '8', '9', '0'].map(t => <button key={t} className={tecla} onClick={() => escribe(t)}>{t}</button>)}
            <button className={`${tecla} col-span-4`} onClick={() => escribe('⌫')}>⌫</button>
          </div>
          <button className={boton} disabled={leeNumero(v) == null} onClick={() => onResponder(v)}>{tr(comprobar)}</button>
        </>
      )}
    </>
  )
}

export default function PreguntaMovimiento({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const tipoGrafica = r.eje === 'x'
    ? tr({ es: 'Gráfica posición-tiempo', en: 'Position-time graph', ca: 'Gràfica posició-temps' })
    : tr({ es: 'Gráfica velocidad-tiempo', en: 'Velocity-time graph', ca: 'Gràfica velocitat-temps' })
  const props = { r, revelado, elegida, onResponder, l, tr }
  const cuerpo = r.mecanica === 'etiqueta' ? <Etiqueta {...props} />
    : r.mecanica === 'ordena' ? <Ordena {...props} />
    : <Teclea {...props} />
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <p className={`text-center text-[11px] font-bold uppercase tracking-wide mb-1 ${r.eje === 'x' ? 'text-sky-300' : 'text-pink-300'}`}>{tipoGrafica}</p>
        <GraficaMovimiento ronda={r} revelado={revelado} t={{ aria: tipoGrafica }} />
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
