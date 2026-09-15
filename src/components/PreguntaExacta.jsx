import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { comprobar, respuestaTexto } from '../lib/examenesAlgebra'

// Una pregunta de los exámenes de álgebra generados (lib/examenesAlgebra.js):
// la ecuación o el sistema, una casilla por incógnita y, al corregir, la
// respuesta y los pasos. Se monta con key={qIndex} en MechanicExam para que
// las casillas se vacíen al pasar de pregunta.

const TX = {
  sinSolucion: { es: 'No tiene solución real', en: 'No real solution', ca: 'No té solució real' },
  confirmar: { es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
  era: { es: 'La respuesta era', en: 'The answer was', ca: 'La resposta era' },
  ayuda: {
    es: 'Puedes escribir enteros, fracciones (−1/2) o decimales (0,5).',
    en: 'You can type whole numbers, fractions (−1/2) or decimals (0.5).',
    ca: 'Pots escriure enters, fraccions (−1/2) o decimals (0,5).',
  },
  doble: {
    es: 'Si solo hay una solución, basta con escribirla en x₁.',
    en: 'If there is only one solution, just type it in x₁.',
    ca: 'Si només hi ha una solució, n\'hi ha prou d\'escriure-la a x₁.',
  },
}

export default function PreguntaExacta({ round, phase, onAnswer, l }) {
  const { tr } = useLang()
  const [valores, setValores] = useState({})
  const [sinSolucion, setSinSolucion] = useState(false)
  const corregida = phase === 'result'
  const respuesta = { ...valores, sinSolucion }
  const bien = corregida && comprobar(round, respuesta)
  const vacia = !sinSolucion && round.campos.every(c => !String(valores[c.id] ?? '').trim())

  return (
    <>
      <p className="text-white/55 text-sm text-center mb-2">{tr(round.enunciado)}</p>
      {round.lineas.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 mb-4 text-center space-y-1">
          {round.lineas.map(linea => (
            <p key={linea} className="text-2xl font-black text-white tabular-nums">{linea}</p>
          ))}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 mb-3">
        {round.campos.map(c => (
          <label key={c.id} className="flex items-center gap-2 text-white/70 text-lg font-bold">
            {tr(c.etiqueta)} =
            <input value={valores[c.id] ?? ''} disabled={corregida || sinSolucion} autoComplete="off" spellCheck={false}
              aria-label={tr(c.etiqueta)}
              onChange={e => setValores(v => ({ ...v, [c.id]: e.target.value }))}
              onKeyDown={e => { if (e.key === 'Enter' && !vacia && !corregida) onAnswer(respuesta) }}
              className="w-24 bg-black/30 border border-white/15 rounded-xl px-3 py-2 text-white text-lg font-semibold tabular-nums outline-none focus:border-[#EDAE49] disabled:opacity-40" />
          </label>
        ))}
      </div>

      {round.permiteSinSolucion && (
        <label className="flex items-center justify-center gap-2 text-white/60 text-sm mb-3 cursor-pointer">
          <input type="checkbox" checked={sinSolucion} disabled={corregida} onChange={e => setSinSolucion(e.target.checked)} className="accent-[#EDAE49]" />
          {tr(TX.sinSolucion)}
        </label>
      )}

      {!corregida ? (
        <>
          <button type="button" onClick={() => onAnswer(respuesta)} disabled={vacia}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition disabled:opacity-30 disabled:cursor-not-allowed">
            {tr(TX.confirmar)}
          </button>
          <p className="text-white/30 text-xs text-center mt-2">
            {tr(TX.ayuda)}{round.tipo === 'segundo-grado' ? ` ${tr(TX.doble)}` : ''}
          </p>
        </>
      ) : (
        <div className={`rounded-xl px-4 py-3 border ${bien ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${bien ? 'text-green-400' : 'text-red-400'}`}>
            {bien ? tr(TX.correcto) : `${tr(TX.incorrecto)} · ${tr(TX.era)}: ${respuestaTexto(round, l)}`}
          </p>
          {/* Los pasos salen siempre, se acierte o no: quien acierta por
              intuición también tiene que ver cómo se llega. */}
          <ol className="mt-2 space-y-1">
            {round.pasos.map((p, i) => (
              <li key={i} className="text-white/75 text-[13.5px] leading-relaxed tabular-nums break-words">{tr(p)}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
