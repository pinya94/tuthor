// Piezas de pantalla del ritmo de partida (ver lib/ritmoPartida.js y
// lib/useRitmoPartida.js):
//   <HudPartida>        nivel (se puede cambiar EN la partida, con confirmación),
//                       puntos, racha, reloj y «Terminar partida»
//   <PanelRespuesta>    tras responder: acierto breve, o fallo con el reloj
//                       parado y «Seguir» (Enter/Espacio)
//   <LineasCorreccion>  una línea por pieza con ✓/✗ (no solo color) y el
//                       «¿Por qué?» desplegable
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { Racha } from './Iconos'
import { TXT } from '../lib/ritmoPartida'

export function HudPartida({ niveles, nivel, onCambiarNivel, puntos, racha = 0, restante, total, onTerminar, fase }) {
  const { tr } = useLang()
  const [pide, setPide] = useState(null) // nivel al que se quiere cambiar
  const color = restante > total * 0.66 ? '#22c55e' : restante > total * 0.28 ? '#f59e0b' : '#ef4444'
  const pct = Math.max(0, Math.min(1, restante / total))
  const pausa = fase === 'fallo' || fase === 'acierto'
  return (
    <div className="w-full max-w-[480px] mb-3 px-1">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div role="group" aria-label={tr(TXT.cambiarNivel)} className="inline-flex gap-0.5 p-0.5 rounded-lg bg-white/5 border border-white/10 mb-1">
            {Object.entries(niveles).map(([id, d]) => (
              <button key={id} type="button" aria-pressed={nivel === id}
                onClick={() => { if (id !== nivel) setPide(id) }}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${nivel === id ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/75'}`}>
                {d.emoji} {tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {puntos} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}
            {racha >= 2 && <span className="flex items-center gap-0.5 text-orange-400 text-sm font-black"><Racha className="w-4 h-4" />{racha}</span>}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative w-14 h-14" role="timer" aria-label={tr({ es: `${restante} segundos`, en: `${restante} seconds`, ca: `${restante} segons` })}>
            <svg className="absolute inset-0" viewBox="0 0 56 56" aria-hidden="true">
              <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff15" strokeWidth="4" />
              <circle cx="28" cy="28" r="24" fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - pct)}`}
                strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset .25s linear' }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-sm" style={{ color }}>{pausa ? '⏸' : restante}</span>
            </div>
          </div>
          <button type="button" onClick={onTerminar} className="text-[11px] font-bold text-white/45 hover:text-white underline underline-offset-2">
            {tr(TXT.terminarPartida)}
          </button>
        </div>
      </div>
      {pide && (
        <div role="alertdialog" aria-label={tr({ es: 'Cambiar de nivel', en: 'Change level', ca: 'Canviar de nivell' })} className="mt-2 rounded-xl border border-amber-300/40 bg-amber-400/10 px-3 py-2 text-sm text-white flex flex-wrap items-center gap-2">
          <span className="flex-1 min-w-[12rem]">{tr({ es: `¿Pasar a ${tr(niveles[pide].label)}? La partida empieza de cero.`, en: `Switch to ${tr(niveles[pide].label)}? The game restarts from zero.`, ca: `Passar a ${tr(niveles[pide].label)}? La partida torna a començar.` })}</span>
          <button type="button" onClick={() => { const n = pide; setPide(null); onCambiarNivel(n) }} className="px-3 py-1 rounded-lg bg-[#EDAE49] text-black font-black text-xs">{tr({ es: 'Sí, cambiar', en: 'Yes, switch', ca: 'Sí, canviar' })}</button>
          <button type="button" onClick={() => setPide(null)} className="px-3 py-1 rounded-lg bg-white/10 text-white font-bold text-xs">{tr({ es: 'No', en: 'No', ca: 'No' })}</button>
        </div>
      )}
    </div>
  )
}

const GUARDA_MS = 350

// fase: 'acierto' | 'fallo'. delta: segundos que cambió el reloj.
export function PanelRespuesta({ fase, delta, puntos = 10, racha = 0, onSeguir, textoAcierto }) {
  const { tr } = useLang()
  const btn = useRef(null)
  // El mismo Enter/Espacio que cierra la ronda (p. ej. sentar el último
  // instrumento con el teclado) no debe «pulsar» también Seguir y saltarse la
  // corrección: durante los primeros GUARDA_MS no se hace caso.
  const listoEn = useRef(0)
  const seguir = useCallback(() => { if (performance.now() >= listoEn.current) onSeguir() }, [onSeguir])
  useEffect(() => {
    if (fase !== 'fallo') return
    listoEn.current = performance.now() + GUARDA_MS
    btn.current?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' })
    const foco = setTimeout(() => btn.current?.focus({ preventScroll: true }), GUARDA_MS)
    // Enter/Espacio aunque el foco esté en otro sitio (si está en el botón,
    // ya lo pulsa el propio navegador).
    const k = e => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      if (e.target === btn.current) return
      const t = e.target?.tagName
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SUMMARY' || (t === 'BUTTON' && !e.target.disabled)) return
      e.preventDefault()
      seguir()
    }
    window.addEventListener('keydown', k)
    return () => { clearTimeout(foco); window.removeEventListener('keydown', k) }
  }, [fase, seguir])
  if (fase === 'acierto') {
    return (
      <p role="status" className="text-center text-sm font-black mt-2 text-green-400">
        ✓ {textoAcierto ?? tr({ es: '¡Bien!', en: 'Well done!', ca: 'Molt bé!' })} · +{puntos}{delta > 0 ? ` · +${delta} s` : ''}{racha >= 2 ? ` · 🔥 ${racha}` : ''}
      </p>
    )
  }
  if (fase !== 'fallo') return null
  return (
    <div className="mt-3">
      <p className="text-center text-xs text-white/45 mb-2">
        <span className="text-red-400 font-bold">{delta < 0 ? `${delta} s` : ''}</span>{delta < 0 ? ' · ' : ''}⏸ {tr(TXT.relojParado)}
      </p>
      <button ref={btn} type="button" onClick={seguir}
        className="w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black text-base hover:bg-amber-400 transition-colors">
        {tr(TXT.seguir)} →
      </button>
    </div>
  )
}

// lineas: [{ ok, texto }]. porQue: texto del desplegable. Si todo está bien
// no sale nada (la confirmación breve ya lo dice y se pasa sola).
export function LineasCorreccion({ lineas, porQue, abierto = false }) {
  const { tr } = useLang()
  const fallos = lineas.filter(x => !x.ok).length
  return (
    <div className="mt-3">
      {fallos > 0 && (
        <ul className="space-y-1 rounded-xl px-3 py-2 bg-white/5 border border-white/10">
          {lineas.map((x, i) => (
            <li key={i} className={`text-sm leading-snug flex gap-1.5 ${x.ok ? 'text-white/60' : 'text-white'}`}>
              <span aria-hidden="true" className={`font-black ${x.ok ? 'text-green-400' : 'text-red-400'}`}>{x.ok ? '✓' : '✗'}</span>
              <span><span className="sr-only">{x.ok ? tr({ es: 'Bien: ', en: 'Right: ', ca: 'Bé: ' }) : tr({ es: 'Mal: ', en: 'Wrong: ', ca: 'Malament: ' })}</span>{x.texto}</span>
            </li>
          ))}
        </ul>
      )}
      {porQue && fallos > 0 && (
        <details className="mt-2 rounded-xl bg-white/[0.03] border border-white/10 px-3 py-2 text-sm text-white/75" open={abierto}>
          <summary className="cursor-pointer font-bold text-white/80 select-none">{tr(TXT.porQue)}</summary>
          <p className="mt-1.5 leading-snug">{porQue}</p>
        </details>
      )}
    </div>
  )
}
