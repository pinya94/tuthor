// Piezas visuales de Tuthor Time pensadas para el móvil: el selector de año
// con teclado propio (el teclado del teléfono tapaba media pantalla y no
// tiene forma cómoda de escribir un año a.C.), la línea de las eras donde se
// ve en qué época cae el año, y el agente dibujado.
import { useEffect } from 'react'

// ── Eras: tramos iguales en pantalla aunque no duren lo mismo ────────────────
export const ERAS = [
  { desde: -3000, hasta: 476, color: '#F59E0B', nombre: { es: 'Antigua', en: 'Ancient', ca: 'Antiga' } },
  { desde: 476, hasta: 1492, color: '#A78BFA', nombre: { es: 'Media', en: 'Medieval', ca: 'Mitjana' } },
  { desde: 1492, hasta: 1789, color: '#38BDF8', nombre: { es: 'Moderna', en: 'Early modern', ca: 'Moderna' } },
  { desde: 1789, hasta: 2030, color: '#34D399', nombre: { es: 'Contemp.', en: 'Modern', ca: 'Contemp.' } },
]

// Posición 0-1 en la línea (cada era ocupa un cuarto).
export function posicionEnEras(año) {
  if (año == null || Number.isNaN(año)) return null
  if (año <= ERAS[0].desde) return 0
  const i = ERAS.findIndex(e => año < e.hasta)
  const k = i < 0 ? ERAS.length - 1 : i
  const e = ERAS[k]
  const dentro = Math.min(1, Math.max(0, (año - e.desde) / (e.hasta - e.desde)))
  return (k + dentro) / ERAS.length
}

function Marcador({ pos, color, etiqueta, abajo = false }) {
  if (pos == null) return null
  return (
    <div className="absolute top-0 bottom-0 -translate-x-1/2 flex flex-col items-center transition-[left] duration-300" style={{ left: `${pos * 100}%` }}>
      {!abajo && <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md -mt-6 whitespace-nowrap" style={{ background: color, color: '#0b1020' }}>{etiqueta}</span>}
      <span className="w-1 flex-1 rounded-full" style={{ background: color }} />
      {abajo && <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md -mb-6 whitespace-nowrap" style={{ background: color, color: '#0b1020' }}>{etiqueta}</span>}
    </div>
  )
}

// La línea del tiempo con uno o dos marcadores (lo enviado y lo real).
export function LineaEras({ año, real, etiquetaAño, etiquetaReal, tr }) {
  return (
    <div className="pt-6 pb-6">
      {/* Los nombres de las eras van dentro de la barra: así las etiquetas de
          los marcadores (arriba y abajo) nunca los pisan. */}
      <div className="relative h-8">
        <div className="absolute inset-y-1 inset-x-0 flex rounded-full overflow-hidden">
          {ERAS.map(e => (
            <div key={e.desde} className="flex-1 flex items-center justify-center" style={{ background: `${e.color}33` }}>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wide" style={{ color: e.color }}>{tr(e.nombre)}</span>
            </div>
          ))}
        </div>
        <Marcador pos={posicionEnEras(año)} color="#F8FAFC" etiqueta={etiquetaAño} />
        <Marcador pos={posicionEnEras(real)} color="#FBBF24" etiqueta={etiquetaReal} abajo />
      </div>
    </div>
  )
}

// ── Selector de año con teclado propio ──────────────────────────────────────
// `digitos`: texto con hasta 4 cifras; `ac`: antes de Cristo.
export function SelectorAño({ digitos, ac, onDigitos, onAc, onEnviar, tr, deshabilitado }) {
  // En ordenador sigue valiendo el teclado físico: cifras, borrar, '-' y Enter.
  useEffect(() => {
    function onKey(e) {
      if (deshabilitado) return
      if (/^\d$/.test(e.key)) { if (digitos.length < 4) onDigitos(digitos + e.key); e.preventDefault() }
      else if (e.key === 'Backspace') { onDigitos(digitos.slice(0, -1)); e.preventDefault() }
      else if (e.key === '-') { onAc(!ac); e.preventDefault() }
      else if (e.key === 'Enter' && digitos) { onEnviar(); e.preventDefault() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [digitos, ac, deshabilitado, onDigitos, onAc, onEnviar])

  const tecla = 'h-12 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/20 text-white text-xl font-black transition-colors select-none'
  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className={`text-5xl font-black tabular-nums tracking-tight ${digitos ? 'text-white' : 'text-white/20'}`}>{digitos || '0000'}</span>
        <button type="button" onClick={() => onAc(!ac)}
          className={`px-2.5 py-1.5 rounded-lg text-sm font-black border transition-colors ${ac ? 'bg-amber-500/20 border-amber-400/60 text-amber-300' : 'bg-white/[0.05] border-white/15 text-white/70'}`}>
          {ac ? tr({ es: 'a.C.', en: 'BC', ca: 'aC' }) : tr({ es: 'd.C.', en: 'AD', ca: 'dC' })}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
          <button key={d} type="button" className={tecla} onClick={() => digitos.length < 4 && onDigitos(digitos + d)}>{d}</button>
        ))}
        <button type="button" className={`${tecla} text-sm`} onClick={() => onAc(!ac)}>
          {tr({ es: 'a.C. / d.C.', en: 'BC / AD', ca: 'aC / dC' })}
        </button>
        <button type="button" className={tecla} onClick={() => digitos.length < 4 && onDigitos(digitos + '0')}>0</button>
        <button type="button" className={tecla} onClick={() => onDigitos(digitos.slice(0, -1))} aria-label={tr({ es: 'Borrar', en: 'Delete', ca: 'Esborrar' })}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5H9l-6 7 6 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM17 9l-6 6M11 9l6 6" /></svg>
        </button>
      </div>
      <button type="button" onClick={onEnviar} disabled={!digitos || deshabilitado}
        className="w-full py-4 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 disabled:opacity-30 text-black font-black text-lg transition-colors">
        {tr({ es: 'Enviar agente →', en: 'Send agent →', ca: 'Enviar agent →' })}
      </button>
    </div>
  )
}

// ── El agente dibujado (sombrero y gabardina; tachado si ha caído) ───────────
export function Agente({ muerto, className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 22c0-5 3-8 7-8s7 3 7 8Z" fill={muerto ? '#475569' : '#8B5CF6'} />
      <path d="M12 14l-2 8h4Z" fill={muerto ? '#334155' : '#F8FAFC'} fillOpacity=".8" />
      <circle cx="12" cy="10" r="4" fill={muerto ? '#64748B' : '#FCD7B4'} />
      <path d="M6.5 7.5h11" stroke={muerto ? '#334155' : '#1E293B'} strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 7.5c0-3 1.5-4.5 3.5-4.5s3.5 1.5 3.5 4.5" fill={muerto ? '#334155' : '#1E293B'} />
      {muerto && <path d="M4 4l16 16" stroke="#F87171" strokeWidth="2.2" strokeLinecap="round" />}
    </svg>
  )
}
