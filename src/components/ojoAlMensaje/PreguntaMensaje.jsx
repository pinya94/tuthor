// Una ronda de Ojo al Mensaje: la pantalla de un móvil con el mensaje
// troceado. Cada trozo se puede tocar: si es una trampa se marca en rojo con
// su nombre; si es normal, en gris (y cuenta como fallo). Al dar el veredicto
// se enseñan en ámbar las trampas que se escaparon.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { TRAMPAS, VEREDICTOS, ORDEN_VEREDICTOS, enunciado, explicacion, motivoFallo, respuesta, leeRespuesta, tx } from '../../lib/ojoAlMensaje'

const corto = (t, l) => tx(t, l).split(':')[0]

function Trozo({ sg, estado, onTocar, l, bloque }) {
  const base = bloque ? 'block w-full text-left px-3 py-2 rounded-2xl' : 'inline px-1 py-0.5 rounded-md'
  const color = {
    libre: 'hover:bg-sky-100 active:bg-sky-200 cursor-pointer',
    trampa: 'bg-red-100 ring-2 ring-red-500',
    normal: 'bg-slate-200 text-slate-500',
    escapada: 'bg-amber-100 ring-2 ring-amber-500',
    fijo: '',
  }[estado]
  const etiqueta = estado === 'trampa' ? `🚩 ${corto(TRAMPAS[sg.trampa], l)}`
    : estado === 'escapada' ? `⚠️ ${corto(TRAMPAS[sg.trampa], l)}`
    : estado === 'normal' ? tx({ es: '✓ normal', en: '✓ normal', ca: '✓ normal' }, l) : null
  return (
    <>
      <button type="button" disabled={estado !== 'libre'} onClick={onTocar}
        className={`${base} ${color} transition-colors box-decoration-clone`}>
        {tx(sg.t, l)}
      </button>
      {etiqueta && (
        <span className={`${bloque ? 'block mt-0.5 mb-1 ml-1' : 'inline-block mx-1'} align-middle text-[11px] font-bold px-1.5 py-0.5 rounded ${
          estado === 'trampa' ? 'bg-red-600 text-white' : estado === 'escapada' ? 'bg-amber-500 text-black' : 'bg-slate-300 text-slate-600'}`}>
          {etiqueta}
        </span>
      )}
      {!bloque && ' '}
    </>
  )
}

function Pantalla({ r, estado, tocar, l }) {
  const [cab, ...cuerpo] = r.segs
  const T = sg => <Trozo key={sg.i} sg={sg} estado={estado(sg)} onTocar={() => tocar(sg)} l={l} />
  const B = (sg, clase) => (
    <div key={sg.i} className={`max-w-[88%] ${clase}`}>
      <Trozo sg={sg} estado={estado(sg)} onTocar={() => tocar(sg)} l={l} bloque />
    </div>
  )
  const marco = 'rounded-[1.6rem] border-[6px] border-slate-800 bg-slate-800 overflow-hidden shadow-xl mx-auto max-w-[340px]'
  const barra = (txt, fondo) => <div className={`px-3 pt-1.5 pb-2 text-[13px] font-bold ${fondo}`}>{txt}</div>

  if (r.canal === 'email') return (
    <div className={marco}>
      <div className="bg-white text-slate-900 text-[14px] leading-relaxed">
        {barra(<span>✉️ {tx({ es: 'Correo', en: 'Mail', ca: 'Correu' }, l)}</span>, 'bg-slate-100 text-slate-600')}
        <div className="px-3 py-2 border-b border-slate-200 text-[13px]">
          <span className="text-slate-500">{tx({ es: 'De:', en: 'From:', ca: 'De:' }, l)} </span>{T(cab)}
        </div>
        <div className="px-3 py-3">{cuerpo.map(T)}</div>
      </div>
    </div>
  )
  if (r.canal === 'popup') return (
    <div className={marco}>
      <div className="bg-slate-100 p-3">
        <div className="text-[11px] text-slate-500 bg-white rounded-full px-3 py-1 mb-3 truncate">🌐 www.juegos-gratis-online.net</div>
        <div className="bg-white rounded-xl border-2 border-amber-400 shadow-lg p-3 text-center text-slate-900">
          <div className="text-xl font-black mb-1">{T(cab)}</div>
          <div className="text-[14px] leading-relaxed">{cuerpo.map(T)}</div>
          <div className="mt-3 rounded-lg bg-green-500 text-white font-black py-2 text-sm select-none">{tx({ es: 'RECIBIR PREMIO', en: 'CLAIM PRIZE', ca: 'REBRE PREMI' }, l)}</div>
        </div>
      </div>
    </div>
  )
  if (r.canal === 'sms') return (
    <div className={marco}>
      <div className="bg-white text-slate-900 min-h-[12rem]">
        {barra(<span>💬 {T(cab)}</span>, 'bg-slate-100 text-slate-800 text-center')}
        <div className="p-3">
          <div className="max-w-[90%] bg-slate-200 rounded-2xl rounded-bl-sm px-2 py-2 text-[14px] leading-relaxed">{cuerpo.map(T)}</div>
        </div>
      </div>
    </div>
  )
  // chat, grupo y dm: burbujas
  const cabecera = r.canal === 'dm'
    ? barra(<span>📨 ChatBuzz · {T(cab)}</span>, 'bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white')
    : barra(<span className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-white/30 grid place-items-center">{r.canal === 'grupo' ? '👥' : '🙂'}</span>{T(cab)}</span>, 'bg-emerald-700 text-white')
  return (
    <div className={marco}>
      <div className={`${r.canal === 'dm' ? 'bg-white' : 'bg-[#efe7dd]'} text-slate-900 min-h-[12rem]`}>
        {cabecera}
        <div className="p-3 space-y-1.5 text-[14px] leading-snug">
          {cuerpo.map(sg => B(sg, r.canal === 'dm' ? 'bg-slate-100 rounded-2xl' : 'bg-white rounded-2xl shadow-sm'))}
        </div>
      </div>
    </div>
  )
}

export default function PreguntaMensaje({ ronda, revelado, elegida, onResponder, onTocar }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const [tocados, setTocados] = useState(() => new Set())
  const halladas = r.segs.filter(x => x.trampa && tocados.has(x.i)).length
  const fallos = r.segs.filter(x => !x.trampa && tocados.has(x.i)).length

  const estado = sg => {
    if (tocados.has(sg.i)) return sg.trampa ? 'trampa' : 'normal'
    if (revelado) return sg.trampa ? 'escapada' : 'fijo'
    return 'libre'
  }
  const tocar = sg => {
    if (revelado || tocados.has(sg.i)) return
    setTocados(prev => new Set(prev).add(sg.i))
    onTocar?.(!!sg.trampa)
  }
  const elegido = revelado && elegida ? leeRespuesta(elegida).veredicto : null
  const clase = v => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (v === r.veredicto) return 'bg-green-500/25 border-green-400'
    if (v === elegido) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const motivo = revelado && elegida ? motivoFallo(r, elegida, l) : null

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="flex justify-center gap-3 text-xs font-bold mb-2">
        <span className="text-red-300">🚩 {r.cuenta ? `${halladas} / ${r.trampas}` : halladas}</span>
        {fallos > 0 && <span className="text-white/50">✓ {fallos} {tx({ es: fallos === 1 ? 'normal' : 'normales', en: 'normal', ca: fallos === 1 ? 'normal' : 'normals' }, l)}</span>}
      </div>
      <Pantalla r={r} estado={estado} tocar={tocar} l={l} />
      <div className="grid grid-cols-3 gap-2 mt-3">
        {ORDEN_VEREDICTOS.map(v => (
          <button key={v} disabled={revelado} onClick={() => onResponder(respuesta(v, r.trampas - halladas, fallos))}
            className={`py-2.5 px-1 rounded-xl border text-white text-[13px] font-bold leading-tight transition-all ${clase(v)}`}>
            <span className="block text-xl mb-0.5">{VEREDICTOS[v].emoji}</span>
            {tx(VEREDICTOS[v].nombre, l)}
          </button>
        ))}
      </div>
      {revelado && (
        <div className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 space-y-1">
          {motivo && <p className="text-amber-300 font-bold">{motivo}</p>}
          <p>💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
