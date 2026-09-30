// Recta numérica con marcas de referencia, la posición de salida y una rana
// que salta a la posición actual. La comparten el juego Salta la Recta y su
// examen — mismo aspecto en los dos.
//
// Pensada para el móvil: línea gruesa con una marca por número (las de
// referencia más largas y con su valor), rana dibujada y, cuando la rana se
// ha movido, el arco del salto desde la salida — ver el salto es lo que
// enseña que sumar un negativo es ir hacia la izquierda.

function Rana({ className }) {
  return (
    <svg viewBox="0 0 44 36" className={className} aria-hidden="true">
      <ellipse cx="22" cy="24" rx="17" ry="11" fill="#22c55e" />
      <ellipse cx="22" cy="27" rx="11" ry="6" fill="#86efac" />
      <circle cx="13" cy="12" r="7" fill="#22c55e" />
      <circle cx="31" cy="12" r="7" fill="#22c55e" />
      <circle cx="13" cy="12" r="4" fill="#fff" />
      <circle cx="31" cy="12" r="4" fill="#fff" />
      <circle cx="14" cy="12.5" r="2" fill="#14532d" />
      <circle cx="32" cy="12.5" r="2" fill="#14532d" />
      <path d="M15 24q7 5 14 0" stroke="#14532d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function NumberLine({ min, max, S, marker, marcados, onTap, disabled }) {
  const pct = n => ((n - min) / (max - min)) * 100
  const refStep = max - min > 15 ? 5 : 2
  const refTicks = []
  for (let n = Math.ceil(min / refStep) * refStep; n <= max; n += refStep) refTicks.push(n)
  const unit = []
  if (max - min <= 40) for (let n = Math.ceil(min); n <= max; n++) if (!refTicks.includes(n)) unit.push(n)
  const saltado = S !== null && marker !== null && marker !== S

  return (
    <>
    <div className="relative w-full h-32 mt-6 mb-3 select-none">
      {/* Arco del salto (de la salida a donde está la rana) */}
      {saltado && (
        <svg className="absolute inset-x-0 top-0 h-1/2 w-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
          <path d={`M${pct(S)} 50 Q${(pct(S) + pct(marker)) / 2} ${-10} ${pct(marker)} 50`}
            fill="none" stroke="#a3e635" strokeWidth="2.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" opacity="0.8" />
        </svg>
      )}

      <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-white/25 -translate-y-1/2 rounded-full" />
      {unit.map(n => (
        <div key={n} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-px h-2 bg-white/25" style={{ left: `${pct(n)}%` }} />
      ))}
      {refTicks.map(n => (
        <div key={n} className="absolute top-1/2 -translate-x-1/2 flex flex-col items-center" style={{ left: `${pct(n)}%`, marginTop: -8 }}>
          <div className={`w-0.5 h-4 ${n === 0 ? 'bg-white/70' : 'bg-white/40'}`} />
          <span className={`text-xs mt-1 tabular-nums font-bold ${n === 0 ? 'text-white/80' : 'text-white/45'}`}>{n}</span>
        </div>
      ))}
      <div className="absolute -translate-x-1/2 transition-all duration-500 ease-out" style={{ left: `${pct(marker)}%`, top: '14%' }}>
        <Rana className="w-10 h-8 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]" />
      </div>
      {S !== null && (
        <div className="absolute -translate-x-1/2 flex flex-col items-center text-xs font-black text-lime-400" style={{ left: `${pct(S)}%`, top: '76%' }}>
          <div className="w-2 h-2 rounded-full bg-lime-400 mb-0.5" />
          {S}
        </div>
      )}
      {/* Candidatos: un punto en la recta... */}
      {marcados?.map(n => (
        <div key={n} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-lime-400/80 ring-2 ring-[#141b2e]"
          style={{ left: `${pct(n)}%` }} />
      ))}
    </div>
    {/* ...y los botones en fila debajo: sobre la recta se pisaban cuando dos
        candidatos estaban a uno o dos números. */}
    {marcados?.length > 0 && (
      <div className="flex justify-center gap-2 mb-2">
        {[...marcados].sort((x, y) => x - y).map(n => (
          <button key={n} disabled={disabled} onClick={() => onTap(n)}
            className="flex-1 max-w-[5rem] py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 border border-lime-400/40 text-white text-lg font-black tabular-nums transition-all active:scale-95">
            {n}
          </button>
        ))}
      </div>
    )}
    </>
  )
}
