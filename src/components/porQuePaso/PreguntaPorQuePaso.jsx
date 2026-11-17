// Una ronda de ¿Por Qué Pasó? (ver lib/porQuePaso): el hecho (o los dos
// hechos, en difícil) y sus piezas; cada pieza se clasifica como causa o
// consecuencia (y, con dos hechos, de cuál). Al corregir, cada pieza dice
// dónde iba.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { hecho, casilla, esCorrecta, explicacion } from '../../lib/porQuePaso'

const COLOR = { A: '#fbbf24', B: '#38bdf8' }

function Boton({ activo, onClick, children, color, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`flex-1 rounded-lg px-2 py-1.5 text-xs sm:text-sm font-black border transition-colors ${activo ? 'text-black' : 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10'}`}
      style={activo ? { background: color ?? '#e2e8f0', borderColor: color ?? '#e2e8f0' } : undefined}>
      {children}
    </button>
  )
}

export default function PreguntaPorQuePaso({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const dos = r.hechos.length === 2
  const [hechoDe, setHechoDe] = useState(() => (dos ? {} : Object.fromEntries(r.piezas.map(p => [p.id, 'A']))))
  const [tipoDe, setTipoDe] = useState({})
  // «No tiene que ver» no necesita decir de qué hecho
  const respuesta = Object.fromEntries(r.piezas.filter(p => tipoDe[p.id] === 'x' || (hechoDe[p.id] && tipoDe[p.id])).map(p => [p.id, tipoDe[p.id] === 'x' ? 'x' : `${hechoDe[p.id]}:${tipoDe[p.id]}`]))
  const completa = Object.keys(respuesta).length === r.piezas.length
  const acierto = revelado && esCorrecta(r, respuesta)
  const CAUSA = tr({ es: 'Causa', en: 'Cause', ca: 'Causa' }), CONSEC = tr({ es: 'Consecuencia', en: 'Consequence', ca: 'Conseqüència' })
  const NADA = tr({ es: 'No tiene que ver', en: 'Not related', ca: 'No hi té res a veure' })

  return (
    <div className="w-full">
      <div className={`grid gap-2 mb-3 ${dos ? 'grid-cols-2' : ''}`}>
        {r.hechos.map((id, i) => {
          const h = hecho(id), letra = i ? 'B' : 'A'
          return (
            <div key={id} className="rounded-xl border px-3 py-2.5" style={{ borderColor: `${COLOR[letra]}88`, background: `${COLOR[letra]}14` }}>
              {dos && <p className="text-[11px] font-black" style={{ color: COLOR[letra] }}>{letra}</p>}
              <p className="text-white font-black leading-snug text-[15px]">{h.emoji} {h.titulo[l]}</p>
            </div>
          )
        })}
      </div>
      {!revelado && (
        <p className="text-center text-white/45 text-xs mb-2">
          {dos
            ? tr({ es: 'Para cada pieza: ¿de qué hecho es (A o B) y es causa o consecuencia? Alguna no tiene que ver con ninguno.', en: 'For each piece: which event is it about (A or B), and is it a cause or a consequence? One is not related to either.', ca: 'Per a cada peça: de quin fet és (A o B) i és causa o conseqüència? Alguna no té res a veure amb cap.' })
            : tr({ es: '¿Cada pieza es causa o consecuencia del hecho? Ojo: alguna es de otra época y no tiene que ver.', en: 'Is each piece a cause or a consequence of the event? Careful: some are from another time and are not related.', ca: 'Cada peça és causa o conseqüència del fet? Compte: alguna és d’una altra època i no hi té res a veure.' })}
        </p>
      )}

      <div className="space-y-2 mb-3">
        {r.piezas.map(p => {
          const bien = casilla(r, p)
          const ok = revelado && respuesta[p.id] === bien
          const [letraBien, tipoBien] = bien.split(':')
          return (
            <div key={p.id} className={`rounded-xl border px-3 py-2 ${revelado ? (ok ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10') : 'border-white/10 bg-white/[0.04]'}`}>
              <p className="text-white text-sm font-semibold leading-snug mb-1.5">{p.texto[l]}</p>
              {!revelado ? (
                <div className="space-y-1.5">
                  <div className="flex gap-1.5">
                    {dos && ['A', 'B'].map(x => <Boton key={x} activo={tipoDe[p.id] !== 'x' && hechoDe[p.id] === x} color={COLOR[x]} onClick={() => { setHechoDe(v => ({ ...v, [p.id]: x })); if (tipoDe[p.id] === 'x') setTipoDe(v => ({ ...v, [p.id]: undefined })) }}>{x}</Boton>)}
                    <Boton activo={tipoDe[p.id] === 'c'} onClick={() => setTipoDe(v => ({ ...v, [p.id]: 'c' }))}>⬅ {CAUSA}</Boton>
                    <Boton activo={tipoDe[p.id] === 'q'} onClick={() => setTipoDe(v => ({ ...v, [p.id]: 'q' }))}>{CONSEC} ➡</Boton>
                  </div>
                  <Boton activo={tipoDe[p.id] === 'x'} color="#94a3b8" onClick={() => setTipoDe(v => ({ ...v, [p.id]: 'x' }))}>🚫 {NADA}</Boton>
                </div>
              ) : (
                <p className={`text-xs font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>
                  {ok ? '✓ ' : `✗ ${tr({ es: 'Iba en', en: 'It belongs in', ca: 'Anava a' })}: `}{bien === 'x' ? `${NADA} (${hecho(p.de).titulo[l]})` : `${dos ? `${letraBien} · ` : ''}${tipoBien === 'c' ? CAUSA : CONSEC}`}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {!revelado && (
        <button type="button" disabled={!completa} onClick={() => onResponder(respuesta)}
          className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
          {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
        </button>
      )}
      {revelado && (
        <div className={`rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Todo en su sitio', en: '✓ All correct', ca: '✓ Tot al seu lloc' }) : tr({ es: '✗ Alguna pieza no va ahí', en: '✗ Some pieces are in the wrong place', ca: '✗ Alguna peça no hi va' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
