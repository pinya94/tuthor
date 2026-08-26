// Gráfico de barras minimalista para mostrar un dataset — sin ejes ni
// decoración, solo el valor de cada barra debajo. Lo comparten el juego
// Estadístico Exprés y sus exámenes por medida.
export default function BarChart({ valores }) {
  const max = Math.max(...valores, 1)
  const ancho = Math.min(48, Math.floor(260 / valores.length))
  return (
    <div className="flex items-end justify-center gap-2 h-36 mt-4 mb-3">
      {valores.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5" style={{ width: `${ancho}px` }}>
          <div className="w-full rounded-t-md bg-sky-500" style={{ height: `${Math.max(6, (v / max) * 110)}px` }} />
          <span className="text-white/60 text-[11px] font-bold tabular-nums">{v}</span>
        </div>
      ))}
    </div>
  )
}
