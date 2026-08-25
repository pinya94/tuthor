// Recta numérica con marcas de referencia, la posición de salida y una rana
// que salta a la posición actual. La comparten el juego Salta la Recta y su
// examen — mismo aspecto en los dos.
export default function NumberLine({ min, max, S, marker, marcados, onTap, disabled }) {
  const pct = n => ((n - min) / (max - min)) * 100
  const refStep = max - min > 15 ? 5 : 2
  const refTicks = []
  for (let n = Math.ceil(min / refStep) * refStep; n <= max; n += refStep) refTicks.push(n)

  return (
    <div className="relative w-full h-24 mt-8 mb-4 select-none">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/15 -translate-y-1/2 rounded-full" />
      {refTicks.map(n => (
        <div key={n} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center" style={{ left: `${pct(n)}%` }}>
          <div className="w-px h-2.5 bg-white/20" />
          <span className="text-[10px] text-white/25 mt-1 tabular-nums">{n}</span>
        </div>
      ))}
      <div className="absolute top-1/2 -translate-x-1/2 text-2xl transition-all duration-500 ease-out" style={{ left: `${pct(marker)}%`, top: '18%' }}>
        🐸
      </div>
      {S !== null && (
        <div className="absolute -translate-x-1/2 flex flex-col items-center text-[10px] font-black text-lime-400" style={{ left: `${pct(S)}%`, top: '68%' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mb-1" />
          {S}
        </div>
      )}
      {marcados?.map(n => (
        <button key={n} disabled={disabled} onClick={() => onTap(n)}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40 border-2 border-white/20 text-white text-xs font-black tabular-nums transition-all"
          style={{ left: `${pct(n)}%` }}>
          {n}
        </button>
      ))}
    </div>
  )
}
