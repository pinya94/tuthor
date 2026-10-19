// Una ronda de Engranajes (ver lib/engranajes): el tren dibujado y cómo se
// responde, sin opciones. Se ponen flechas a las ruedas, se toca la más
// rápida o la más lenta, se teclean las rpm o se eligen los dientes de la
// última rueda viendo cómo cambia. La usan el juego (contra reloj) y el
// examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, esCorrecta, ruedasConFlecha, resolverTren, DIENTES } from '../../lib/engranajes'
import TrenEngranajes from './TrenEngranajes'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const flecha = s => (s === 1 ? '↻' : '↺')

export default function PreguntaEngranajes({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const { tren } = ronda
  const ultima = tren.length - 1
  const ok = revelado && esCorrecta(ronda, elegida)
  const [sentidos, setSentidos] = useState({})
  const [v, setV] = useState('')
  const zBuena = tren[ultima].z
  const [z, setZ] = useState(() => DIENTES.find(d => d !== zBuena && d !== tren[tren[ultima].mueve].z) ?? DIENTES[0])
  const t = { aria: tr({ es: 'Tren de engranajes', en: 'Gear train', ca: 'Tren d’engranatges' }) }

  let dibujo, controles = null
  if (ronda.mecanica === 'flechas') {
    const ruedas = ruedasConFlecha(ronda)
    const marcas = { 0: { txt: flecha(tren[0].sentido), color: '#e2e8f0' } }
    for (const i of ruedas) {
      if (sentidos[i]) marcas[i] = { txt: flecha(sentidos[i]), color: revelado ? (sentidos[i] === tren[i].sentido ? '#4ade80' : '#f87171') : '#fde68a' }
    }
    const listo = ruedas.every(i => sentidos[i])
    dibujo = <TrenEngranajes ronda={ronda} revelado={revelado} t={t} amarilla={-1} marcas={marcas}
      onRueda={revelado ? null : i => { const j = tren[i].mismoEje ? tren[i].mueve : i; if (j > 0) setSentidos(s => ({ ...s, [j]: s[j] === 1 ? -1 : 1 })) }} />
    if (!revelado) controles = <button className={boton} disabled={!listo} onClick={() => onResponder(`flechas:${ruedas.filter(i => sentidos[i] !== tren[i].sentido).length}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
  } else if (ronda.mecanica === 'rapida') {
    const tocada = elegida != null ? Number(elegida) : null
    const marcas = {}
    if (revelado) {
      marcas[ronda.objetivo] = { txt: '✓', color: '#4ade80' }
      if (tocada != null && tocada !== ronda.objetivo) marcas[tocada] = { txt: '✗', color: '#f87171' }
      tren.forEach((r, i) => { if (!marcas[i]) marcas[i] = { txt: '', color: '#fff' } })
    }
    dibujo = <TrenEngranajes ronda={ronda} revelado={revelado} t={t} amarilla={-1} marcas={marcas} onRueda={revelado ? null : i => onResponder(String(i))} />
  } else if (ronda.mecanica === 'rpm') {
    dibujo = <TrenEngranajes ronda={ronda} revelado={revelado} t={t} etiqueta={revelado ? undefined : `${v || '?'} rpm`} />
    controles = revelado
      ? <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>{elegida} rpm {ok ? '✓' : `→ ${ronda.bueno} rpm`}</p>
      : (
        <>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '⌫'].map(k => (
              <button key={k} className={tecla} onClick={() => setV(x => (k === '⌫' ? x.slice(0, -1) : x.length < 4 ? x + k : x))}>{k}</button>
            ))}
          </div>
          <button className={boton} disabled={!v} onClick={() => onResponder(v)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )
  } else {
    // construye: la última rueda con los dientes elegidos, girando de verdad
    const zVista = revelado ? Number(String(elegida).replace('z:', '')) || z : z
    const tren2 = resolverTren(tren.map((r, i) => (i === ultima ? { ...r, z: zVista } : r)), tren[0].rpm, tren[0].sentido)
    const rpmVista = Math.round(tren2[ultima].rpm * 100) / 100
    const idx = DIENTES.indexOf(z)
    dibujo = <TrenEngranajes ronda={{ ...ronda, tren: tren2 }} revelado={revelado} t={t} etiqueta={`${rpmVista} rpm`} />
    controles = revelado
      ? <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>{zVista} {tr({ es: 'dientes', en: 'teeth', ca: 'dents' })} → {rpmVista} rpm {ok ? '✓' : `· ${tr({ es: 'hacían falta', en: 'needed', ca: 'calien' })} ${zBuena}`}</p>
      : (
        <>
          <div className="flex items-center justify-center gap-3 mb-1">
            <button className="w-12 h-12 rounded-full bg-white/10 text-white text-2xl font-black disabled:opacity-30" disabled={idx <= 0} onClick={() => setZ(DIENTES[idx - 1])}>−</button>
            <div className="text-center min-w-[7rem]">
              <p className="text-amber-300 text-3xl font-black tabular-nums leading-none">{z}</p>
              <p className="text-white/50 text-xs font-bold">{tr({ es: 'dientes', en: 'teeth', ca: 'dents' })}</p>
            </div>
            <button className="w-12 h-12 rounded-full bg-white/10 text-white text-2xl font-black disabled:opacity-30" disabled={idx >= DIENTES.length - 1} onClick={() => setZ(DIENTES[idx + 1])}>+</button>
          </div>
          <p className="text-center text-white/60 text-xs mb-3">{tr({ es: 'Objetivo', en: 'Target', ca: 'Objectiu' })}: <span className="text-white font-black">{ronda.bueno} rpm</span></p>
          <button className={boton} onClick={() => onResponder(`z:${z}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )
  }

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-1 leading-snug">{enunciado(ronda, l)}</p>
      <p className="text-white/45 text-xs text-center mb-2">{tr({ es: 'El número de cada rueda son sus dientes. La primera es la que mueve.', en: 'The number on each gear is its teeth. The first one is the driver.', ca: 'El número de cada roda són les seves dents. La primera és la que mou.' })}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <p className="text-slate-300 text-xs font-bold px-1 pb-1">
          {tr({ es: 'Rueda motriz (izquierda):', en: 'Driver gear (left):', ca: 'Roda motriu (esquerra):' })} {flecha(tren[0].sentido)} {tren[0].sentido === 1 ? tr({ es: 'horario', en: 'clockwise', ca: 'horari' }) : tr({ es: 'antihorario', en: 'anticlockwise', ca: 'antihorari' })} · {tren[0].rpm} rpm
        </p>
        {dibujo}
      </div>
      {controles}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
