// Opinión sobre un juego en pruebas (beta): ¿te gusta este tipo de ejercicio?
// y ¿ha fallado algo? Va a la colección `bugReports` (la de «Reportar un
// bug»: cualquiera crea, solo admin lee, sale en Admin → Bugs reportados) y
// avisa al admin por correo, como un bug normal.
//
// `frases`: lo que el juego no aceptó en esta partida (texto dicho/escrito y
// la misión). Solo se adjunta si la persona marca la casilla: el juego dice
// que no guarda lo que dices, así que enviarlo tiene que ser decisión suya.
import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'
import { avisarAdmin } from '../lib/avisoAdmin'

const CARAS = [['😞', 'Nada'], ['😐', 'Poco'], ['🙂', 'Bien'], ['😀', 'Mucho'], ['🤩', '¡Me encanta!']]

export default function OpinionBeta({ juego, nombre, pagina, contexto = '', frases = [], compacto = false, pista = '¿Algo que mejorar? ¿Te marcó mal una frase que estaba bien? Cuéntanoslo.' }) {
  const { lang } = useLang()
  const [nota, setNota] = useState(0)
  const [texto, setTexto] = useState('')
  const [adjuntar, setAdjuntar] = useState(false)
  const [estado, setEstado] = useState('idle') // idle · enviando · ok · error

  async function enviar(ev) {
    ev.preventDefault()
    if (!nota && !texto.trim()) return
    setEstado('enviando')
    const lineas = [
      `[${nombre} · beta] Valoración: ${nota ? `${nota}/5 (${CARAS[nota - 1][1]})` : 'sin valorar'}`,
      contexto && `Contexto: ${contexto}`,
      texto.trim() && `Comentario: ${texto.trim()}`,
      adjuntar && frases.length > 0 && `Frases no aceptadas:\n${frases.map(f => `- «${f.texto}» (misión: ${f.mision})`).join('\n')}`,
    ].filter(Boolean)
    try {
      const { db } = await import('../lib/firebase')
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore')
      const ref = await addDoc(collection(db, 'bugReports'), {
        name: '', email: '', page: pagina, message: lineas.join('\n').slice(0, 2000),
        idioma: lang, createdAt: serverTimestamp(), read: false,
        tipo: 'opinion-beta', juego, valoracion: nota || null,
      })
      avisarAdmin('bug', ref.id)
      trackEvent('opinion_beta', { item_id: juego, valor: nota })
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'ok') return (
    <div className="rounded-xl border border-emerald-400/30 bg-emerald-950/40 text-emerald-100 px-4 py-3 text-sm text-center">
      ¡Gracias! Lo leemos todo y nos ayuda a mejorarlo.
    </div>
  )

  return (
    <form onSubmit={enviar} className="rounded-xl border border-violet-400/30 bg-violet-950/30 px-4 py-3 text-left">
      <p className="text-white font-bold text-sm">
        <span className="mr-1.5 rounded bg-violet-500 text-white text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5 align-middle">Beta</span>
        {compacto ? '¿Te gusta este tipo de ejercicio?' : 'Está en pruebas: ¿te gusta este tipo de ejercicio?'}
      </p>
      <div className="flex gap-1.5 mt-2" role="radiogroup" aria-label="Valoración">
        {CARAS.map(([cara, txt], k) => (
          <button key={k} type="button" role="radio" aria-checked={nota === k + 1} aria-label={txt} title={txt} onClick={() => setNota(k + 1)}
            className={`flex-1 rounded-lg py-1.5 text-2xl transition-all ${nota === k + 1 ? 'bg-violet-500/50 ring-2 ring-violet-300 scale-105' : 'bg-white/5 hover:bg-white/10'}`}>
            {cara}
          </button>
        ))}
      </div>
      <textarea value={texto} onChange={ev => setTexto(ev.target.value)} rows={compacto ? 2 : 3} maxLength={1200}
        placeholder={pista}
        className="w-full mt-2 rounded-lg bg-white/10 border border-white/15 text-white text-sm px-3 py-2 placeholder-white/35 focus:outline-none focus:border-white/40" />
      {frases.length > 0 && (
        <label className="flex items-start gap-2 mt-2 text-white/70 text-xs cursor-pointer">
          <input type="checkbox" checked={adjuntar} onChange={ev => setAdjuntar(ev.target.checked)} className="mt-0.5" />
          <span>{frases.length === 1 ? 'Adjuntar la frase que no me aceptó' : `Adjuntar las ${frases.length} frases que no me aceptó`}, para que la revisen.</span>
        </label>
      )}
      <div className="flex items-center gap-3 mt-2">
        <button type="submit" disabled={estado === 'enviando' || (!nota && !texto.trim())}
          className="rounded-lg bg-violet-500 hover:bg-violet-400 disabled:opacity-40 text-white font-bold text-sm px-4 py-2">
          {estado === 'enviando' ? 'Enviando…' : 'Enviar opinión'}
        </button>
        {estado === 'error' && <span className="text-red-300 text-xs">No se ha podido enviar. Prueba otra vez.</span>}
      </div>
    </form>
  )
}
