// Piezas comunes de los escape rooms: el guía que habla (con su cara según la
// expresión), la barra de arriba (reloj, páginas, línea del tiempo), el
// Cuaderno de sospechosos y el botón de pistas. Pensado para PROYECTOR:
// letra grande, mucho contraste y todo se maneja con el ratón o el teclado.
import { useEffect, useState } from 'react'
import Retrato from '../quienEsQuien/Retrato'

export const PERGAMINO = 'bg-[#f1e2bd] text-[#3b2a1a]'
export const BOTON = 'inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black px-5 py-3 text-base sm:text-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
export const BOTON_SEC = 'inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 transition-colors'

export const mmss = s => `${s < 0 ? '-' : ''}${Math.floor(Math.abs(s) / 60)}:${String(Math.abs(s) % 60).padStart(2, '0')}`
export const caraUrl = cara => `/escape/monje-${cara}.webp`

// Una línea del guía, escrita letra a letra. Clic / Enter / espacio: si aún
// escribe, la termina; si no, pasa a la siguiente.
function Linea({ texto, onSigue }) {
  const [n, setN] = useState(0)
  const acabada = n >= texto.length
  useEffect(() => {
    if (acabada) return
    const id = setInterval(() => setN(v => Math.min(texto.length, v + 2)), 28)
    return () => clearInterval(id)
  }, [acabada, texto])
  useEffect(() => {
    const tecla = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (acabada) onSigue(); else setN(texto.length) } }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [acabada, onSigue, texto])
  return (
    <button type="button" onClick={() => (acabada ? onSigue() : setN(texto.length))}
      className="block w-full text-left text-[#f6ecd2] text-lg sm:text-2xl leading-snug font-semibold min-h-[4.5em]">
      {texto.slice(0, n)}
      <span className={`block text-right text-amber-300/80 text-sm mt-2 ${acabada ? 'animate-pulse' : 'invisible'}`}>Pulsa para seguir ▸</span>
    </button>
  )
}

export function Dialogo({ lineas, nombre, onFin }) {
  const [i, setI] = useState(0)
  const [cara, texto] = lineas[Math.min(i, lineas.length - 1)]
  const sigue = () => (i + 1 < lineas.length ? setI(i + 1) : onFin())
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-3 sm:p-6" role="dialog" aria-label={nombre}>
      <div className="relative w-full max-w-5xl flex items-end gap-2 sm:gap-4">
        <img src={caraUrl(cara)} alt={nombre} className="w-28 sm:w-56 lg:w-72 shrink-0 select-none drop-shadow-2xl" draggable="false" />
        <div className="relative flex-1 mb-2 rounded-2xl border-2 border-amber-400/70 bg-[#1b140e]/95 p-4 sm:p-6 shadow-2xl">
          <span className="absolute -top-4 left-4 rounded-md bg-amber-400 text-[#2a1d10] font-black text-sm sm:text-base px-3 py-1">{nombre}</span>
          <Linea key={i} texto={texto} onSigue={sigue} />
          <button type="button" onClick={onFin} className="absolute top-2 right-3 text-white/40 hover:text-white/80 text-xs">Saltar escena</button>
        </div>
      </div>
    </div>
  )
}

// Barra de arriba: reloj, páginas y la línea del tiempo que recupera el color
export function Barra({ restante, sinReloj, epocas, recuperadas, onCuaderno, aviso }) {
  const pantalla = () => { try { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.() } catch { /* sin pantalla completa */ } }
  return (
    <div className="sticky top-0 z-40 bg-[#120d09]/95 border-b border-amber-900/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 py-2 flex items-center gap-3">
        <span className={`font-mono font-black text-xl sm:text-3xl tabular-nums ${sinReloj ? 'text-white/40' : restante < 300 ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
          {sinReloj ? 'Sin reloj' : mmss(restante)}
        </span>
        {aviso && <span className="text-red-300 font-bold text-sm sm:text-base animate-pulse">{aviso}</span>}
        <span className="ml-auto text-white/70 font-bold text-sm sm:text-base">📜 {recuperadas.length}/{epocas.length}</span>
        <button type="button" onClick={onCuaderno} className="rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-black px-3 py-1.5 text-sm sm:text-base">📒 Cuaderno</button>
        <button type="button" onClick={pantalla} className="hidden sm:inline-flex rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 text-sm" title="Pantalla completa">⛶</button>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-5 pb-2 grid gap-1" style={{ gridTemplateColumns: `repeat(${epocas.length}, minmax(0, 1fr))` }}>
        {epocas.map(e => {
          const ok = recuperadas.includes(e.id)
          return (
            <div key={e.id} className={`rounded px-1 py-0.5 text-center text-[10px] sm:text-xs font-bold truncate transition-colors duration-700 ${ok ? 'bg-amber-500 text-[#2a1d10]' : 'bg-white/[0.07] text-white/25'}`}>
              {e.epoca}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Cuaderno({ sospechosos, tachados, onTacha, pistas, paginas, onCerrar }) {
  return (
    <div className="fixed inset-0 z-[55] bg-black/70 flex items-start sm:items-center justify-center p-3 overflow-y-auto" onClick={onCerrar}>
      <div className={`${PERGAMINO} w-full max-w-4xl rounded-2xl p-4 sm:p-6 shadow-2xl my-6`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl sm:text-3xl font-black">📒 Cuaderno del archivero</h2>
          <button type="button" onClick={onCerrar} className="rounded-lg bg-[#3b2a1a] text-[#f1e2bd] font-bold px-3 py-1.5">Cerrar ✕</button>
        </div>
        <p className="text-sm sm:text-base mb-3 opacity-80">Toca a un sospechoso para tacharlo (o para recuperarlo).</p>
        <Sospechosos sospechosos={sospechosos} tachados={tachados} onElige={onTacha} />
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          <div>
            <h3 className="font-black text-lg mb-2">🔎 Pistas sobre el ladrón</h3>
            {pistas.length === 0 ? <p className="opacity-60">Todavía ninguna.</p> : (
              <ul className="space-y-1.5">{pistas.map((p, i) => <li key={i} className="leading-snug">• {p}</li>)}</ul>
            )}
          </div>
          <div>
            <h3 className="font-black text-lg mb-2">📜 Páginas recuperadas</h3>
            {paginas.length === 0 ? <p className="opacity-60">Todavía ninguna.</p> : (
              <ul className="space-y-1.5">{paginas.map(p => (
                <li key={p.id} className="flex items-center gap-3"><span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-[#3b2a1a] text-[#f1e2bd] font-black text-xl">{p.cifra}</span>{p.epoca}</li>
              ))}</ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Sospechosos({ sospechosos, tachados = [], onElige, grande = false }) {
  return (
    <div className={`grid grid-cols-3 ${grande ? 'lg:grid-cols-6' : 'sm:grid-cols-6'} gap-2 sm:gap-3`}>
      {sospechosos.map(s => {
        const fuera = tachados.includes(s.id)
        return (
          <button key={s.id} type="button" onClick={() => onElige(s.id)}
            className={`relative flex flex-col justify-start rounded-xl border-2 p-1.5 text-center transition-all ${fuera ? 'border-[#3b2a1a]/20 opacity-45' : 'border-[#3b2a1a]/40 hover:border-[#3b2a1a] bg-white/40'}`}>
            <div className="aspect-[66/86] rounded-lg overflow-hidden bg-[#d9c79a]">
              <Retrato p={{ id: s.id }} rasgos={s.rasgos} busto className="w-full h-full" />
            </div>
            <p className="font-black text-xs sm:text-sm mt-1 leading-tight">{s.tit} {s.nombre}</p>
            {grande && <p className="text-[11px] sm:text-xs leading-tight opacity-75 mt-0.5">{s.oficio}</p>}
            {fuera && <span className="absolute inset-0 flex items-center justify-center text-red-700 text-6xl font-black pointer-events-none">✕</span>}
          </button>
        )
      })}
    </div>
  )
}

// Pistas de una sala: se destapan de una en una; la última es la solución
export function Pistas({ pistas, usadas, onUsa }) {
  return (
    <div className="mt-4">
      {usadas > 0 && (
        <ol className="space-y-2 mb-3">
          {pistas.slice(0, usadas).map((p, i) => (
            <li key={i} className="rounded-xl bg-sky-950/60 border border-sky-400/30 text-sky-100 px-4 py-2.5 text-base sm:text-lg">
              <b>💡 Pista {i + 1}{i === pistas.length - 1 ? ' (solución)' : ''}:</b> {p}
            </li>
          ))}
        </ol>
      )}
      {usadas < pistas.length && (
        <button type="button" onClick={onUsa} className={BOTON_SEC}>💡 Pedir pista ({usadas}/{pistas.length})</button>
      )}
    </div>
  )
}

// Aviso breve dentro de una sala (fallo al comprobar)
export function Aviso({ texto }) {
  if (!texto) return null
  return <p className="mt-3 rounded-xl bg-red-950/70 border border-red-400/40 text-red-100 font-bold px-4 py-2.5 text-base sm:text-lg" role="alert">{texto}</p>
}
