// Una ronda de ¿Más o Menos? (ver lib/masOMenos): el dato conocido, el lugar
// nuevo y dos botones. Al responder, dos barras comparan los valores.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { CATEGORIAS, item, valor, esCorrecta, explicacion } from '../../lib/masOMenos'

const GRIS = '#94a3b8', AMBAR = '#fbbf24'

function Tarjeta({ titulo, nombre, dato, color }) {
  return (
    <div className="flex-1 rounded-xl border px-3 py-3 min-h-[7.5rem] flex flex-col" style={{ borderColor: `${color}66`, background: `${color}14` }}>
      <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color }}>{titulo}</p>
      <p className="text-white font-black text-lg leading-tight mt-1 flex-1">{nombre}</p>
      <p className="font-black tabular-nums text-[15px] leading-tight" style={{ color }}>{dato ?? '¿…?'}</p>
    </div>
  )
}

export default function PreguntaMasOMenos({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [elegida, setElegida] = useState(null)
  const C = CATEGORIAS[r.cat]
  const a = item(r.cat, r.anterior), b = item(r.cat, r.actual)
  const acierto = revelado && esCorrecta(r, elegida)
  const responde = x => { setElegida(x); onResponder(x) }
  const max = Math.max(a.v, b.v)
  const NOMBRE_CAT = { poblacion: { es: 'Población', en: 'Population', ca: 'Població' }, superficie: { es: 'Superficie', en: 'Area', ca: 'Superfície' }, altura: { es: 'Altura', en: 'Height', ca: 'Altura' }, rios: { es: 'Longitud del río', en: 'River length', ca: 'Longitud del riu' } }

  return (
    <div className="w-full">
      <p className="text-center text-white/60 text-sm font-bold mb-2">{C.emoji} {tr(NOMBRE_CAT[r.cat])}</p>
      <div className="flex gap-2 mb-3">
        <Tarjeta titulo={tr({ es: 'Este', en: 'This one', ca: 'Aquest' })} nombre={a.nombre[l]} dato={valor(r.cat, a.v, l)} color={GRIS} />
        <Tarjeta titulo={tr({ es: '¿Y este?', en: 'And this one?', ca: 'I aquest?' })} nombre={b.nombre[l]} dato={revelado ? valor(r.cat, b.v, l) : null} color={AMBAR} />
      </div>
      {!revelado && <p className="text-center text-white font-bold mb-3">{b.nombre[l]}: {C.pregunta[l]}</p>}

      {revelado && (
        // Barras en escala lineal: con cocientes de ×100 la pequeña casi no se ve, y eso también enseña
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 mb-3 space-y-2">
          {[[a, GRIS], [b, AMBAR]].map(([x, c]) => (
            <div key={x.id}>
              <div className="flex justify-between text-xs font-bold mb-1"><span className="text-white/80">{x.nombre[l]}</span><span style={{ color: c }}>{valor(r.cat, x.v, l)}</span></div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${Math.max(1.5, (x.v / max) * 100)}%`, background: c }} /></div>
            </div>
          ))}
        </div>
      )}

      {!revelado && (
        <div className="flex gap-2">
          <button type="button" onClick={() => responde('menos')} className="flex-1 rounded-xl bg-sky-500 hover:bg-sky-400 py-3 text-black font-black text-lg">⬇ {C.menos[l]}</button>
          <button type="button" onClick={() => responde('mas')} className="flex-1 rounded-xl bg-amber-400 hover:bg-amber-300 py-3 text-black font-black text-lg">⬆ {C.mas[l]}</button>
        </div>
      )}
      {revelado && (
        <div className={`rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
