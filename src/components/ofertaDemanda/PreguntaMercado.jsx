// Una ronda de Oferta y demanda, sin opciones: la noticia (o las ecuaciones)
// y el gráfico. Se mueve la curva que se desplaza (y se ve moverse), se ponen
// las flechas del precio y la cantidad, se teclea el equilibrio o se dice si
// hay escasez o excedente y de cuánto. La usan el juego (contra reloj) y el
// examen.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, noticiaDe, ecuacionesTexto, letraOferta, esCorrecta, leeNumero } from '../../lib/ofertaDemanda'
import GraficoMercado from './GraficoMercado'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const chip = (on, estado) => `rounded-xl border px-2 py-2.5 text-sm font-black transition-all ${estado === 'bien' ? 'border-green-400 bg-green-500/20 text-white' : estado === 'mal' ? 'border-red-400 bg-red-500/20 text-white' : on ? 'border-amber-300 bg-amber-300/20 text-white' : 'border-white/15 bg-white/[0.06] text-white/80 hover:bg-white/[0.12]'}`
// Estado de un botón al corregir: el bueno en verde; el elegido, si no lo era, en rojo
const estadoDe = (revelado, valor, bueno, elegido) => (!revelado ? null : valor === bueno ? 'bien' : valor === elegido ? 'mal' : null)
const comprobar = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }

function Teclado({ setV, l }) {
  const sep = l === 'en' ? '.' : ','
  const escribe = t => setV(x => (t === '⌫' ? x.slice(0, -1) : t === sep ? (x.includes(sep) || !x ? x : x + t) : x.length < 6 ? x + t : x))
  return (
    <div className="grid grid-cols-4 gap-1.5 mb-3">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', sep, '⌫'].map(t => <button key={t} className={tecla} onClick={() => escribe(t)}>{t}</button>)}
    </div>
  )
}

const Resultado = ({ ok, bueno }) => <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${bueno}`}</span>

export default function PreguntaMercado({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const n = r.noticia !== undefined ? noticiaDe(r) : null
  const [mueve, setMueve] = useState(null)       // 'D+' | 'D-' | 'S+' | 'S-' | 'ninguna'
  const [precio, setPrecio] = useState(null)     // '+' | '-'
  const [cantidad, setCantidad] = useState(null)
  const [tipoExc, setTipoExc] = useState(null)   // 'demanda' | 'oferta'
  const [v, setV] = useState('')
  const ok = revelado && esCorrecta(r, elegida)
  const O = letraOferta(l)

  let controles
  if (r.mecanica === 'mueve') {
    const flechas = [['D-', `← D`], ['D+', `D →`], ['S-', `← ${O}`], ['S+', `${O} →`]]
    controles = (
      <>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {flechas.map(([k, txt]) => (
            <button key={k} disabled={revelado} onClick={() => setMueve(k)}
              className={chip(mueve === k, estadoDe(revelado, k, r.bueno, mueve)) + (k[0] === 'D' ? ' text-sky-300' : ' text-pink-300')}>{txt}</button>
          ))}
        </div>
        {r.opciones.includes('ninguna') && (
          <button disabled={revelado} onClick={() => setMueve('ninguna')} className={chip(mueve === 'ninguna', estadoDe(revelado, 'ninguna', r.bueno, mueve)) + ' w-full mb-2'}>
            {tr({ es: 'No se mueve ninguna: es un movimiento a lo largo', en: 'Neither moves: it is a movement along', ca: 'No se’n mou cap: és un moviment al llarg' })}
          </button>
        )}
        {!revelado && <button className={boton} disabled={!mueve} onClick={() => onResponder(mueve)}>{tr(comprobar)}</button>}
        {revelado && !ok && <p className="text-center text-green-300 text-sm font-bold">{textoOpcion(r.bueno, r, l)}</p>}
      </>
    )
  } else if (r.mecanica === 'flechas') {
    const fila = (etq, val, set, bueno) => (
      <div className="flex items-center gap-2 mb-2">
        <span className="w-24 text-white/70 text-sm font-bold">{etq}</span>
        {['+', '-'].map(s => <button key={s} disabled={revelado} onClick={() => set(s)} className={chip(val === s, estadoDe(revelado, s, bueno, val)) + ' flex-1 text-xl'}>{s === '+' ? '↑' : '↓'}</button>)}
      </div>
    )
    controles = (
      <>
        {fila(tr({ es: 'Precio', en: 'Price', ca: 'Preu' }), precio, setPrecio, r.bueno[0])}
        {fila(tr({ es: 'Cantidad', en: 'Quantity', ca: 'Quantitat' }), cantidad, setCantidad, r.bueno[1])}
        {!revelado && <button className={boton} disabled={!precio || !cantidad} onClick={() => onResponder(precio + cantidad)}>{tr(comprobar)}</button>}
        {revelado && !ok && <p className="text-center text-green-300 text-sm font-bold">→ {textoOpcion(r.bueno, r, l)}</p>}
      </>
    )
  } else if (r.mecanica === 'teclea') {
    const uni = r.pide === 'P' ? '€' : tr({ es: 'unidades', en: 'units', ca: 'unitats' })
    controles = (
      <>
        <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
          <span className="text-amber-300 font-black text-2xl tabular-nums">{(revelado ? String(elegida ?? '') : v) || '?'} {uni}</span>
          {revelado && <Resultado ok={ok} bueno={textoOpcion(r.bueno, r, l)} />}
        </div>
        {!revelado && <><Teclado setV={setV} l={l} /><button className={boton} disabled={leeNumero(v) == null} onClick={() => onResponder(v)}>{tr(comprobar)}</button></>}
      </>
    )
  } else {
    const [tE, nE] = revelado ? String(elegida ?? '|').split('|') : [tipoExc, v]
    controles = (
      <>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {[['demanda', tr({ es: 'Escasez (exceso de demanda)', en: 'Shortage (excess demand)', ca: 'Escassetat (excés de demanda)' })], ['oferta', tr({ es: 'Excedente (exceso de oferta)', en: 'Surplus (excess supply)', ca: 'Excedent (excés d’oferta)' })]].map(([k, txt]) => (
            <button key={k} disabled={revelado} onClick={() => setTipoExc(k)} className={chip(tE === k, estadoDe(revelado, k, r.bueno.split(':')[0], tE)) + ' text-[12.5px] leading-tight'}>{txt}</button>
          ))}
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
          <span className="text-amber-300 font-black text-2xl tabular-nums">{nE || '?'} {tr({ es: 'unidades', en: 'units', ca: 'unitats' })}</span>
          {revelado && <Resultado ok={ok} bueno={textoOpcion(r.bueno, r, l)} />}
        </div>
        {!revelado && <><Teclado setV={setV} l={l} /><button className={boton} disabled={!tipoExc || leeNumero(v) == null} onClick={() => onResponder(`${tipoExc}|${v}`)}>{tr(comprobar)}</button></>}
      </>
    )
  }

  return (
    <div className="w-full">
      {n ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 mb-2">
          <p className="text-white/40 text-[10.5px] font-bold uppercase tracking-wide">📰 {tr({ es: 'Noticia', en: 'News', ca: 'Notícia' })}</p>
          <p className="text-white font-bold leading-snug">{n.texto[l] ?? n.texto.es}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 mb-2 flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-[14px]">
          <span className="text-sky-300 font-bold">{ecuacionesTexto(r, l).qd}</span>
          <span className="text-pink-300 font-bold">{ecuacionesTexto(r, l).qs}</span>
        </div>
      )}
      <p className="text-white/85 text-sm text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <GraficoMercado ronda={r} revelado={revelado} mueve={r.mecanica === 'mueve' ? mueve : null} t={{
          aria: tr({ es: 'Gráfico de oferta y demanda', en: 'Supply and demand graph', ca: 'Gràfic d’oferta i demanda' }),
          precio: 'P', cantidad: 'Q', oferta: O,
          alolargo: tr({ es: 'a lo largo de D', en: 'along D', ca: 'al llarg de D' }),
          escasez: tr({ es: 'escasez', en: 'shortage', ca: 'escassetat' }),
          excedente: tr({ es: 'excedente', en: 'surplus', ca: 'excedent' }),
        }} />
      </div>
      {controles}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
