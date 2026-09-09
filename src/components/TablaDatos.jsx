// Una clasificación: la misma información que un gráfico pero en tabla.
//
// No es un gráfico dibujado con celdas: es el otro formato en el que llega un
// dato en clase y en la vida —una clasificación, un cuadro de resultados, una
// tabla del INE— y leerlo es una destreza propia. Aquí, además, hay que
// COMBINAR dos columnas (a favor menos en contra) para resolver un empate, que
// es la parte que un gráfico de barras no pide nunca.
//
// La columna de la diferencia NO se muestra a propósito: si estuviera
// calculada, la pregunta se contestaría leyendo una celda.
export default function TablaDatos({ filas, comp, tr, marcarFila = null, puntosLabel }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-[12px] border-collapse">
        <thead>
          <tr className="text-white/40 text-[10px] uppercase tracking-wider">
            <th className="text-left font-bold py-1.5 pl-1">{tr(comp.quien)}</th>
            <th className="text-center font-bold py-1.5 px-1">{puntosLabel}</th>
            <th className="text-center font-bold py-1.5 px-1">{tr(comp.aFavor)}</th>
            <th className="text-center font-bold py-1.5 px-1">{tr(comp.enContra)}</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={f.nombre}
              className={`border-t border-white/10 ${marcarFila === i ? 'bg-teal-500/10' : ''}`}>
              <td className={`py-2 pl-1 font-semibold ${marcarFila === i ? 'text-teal-300' : 'text-white'}`}>
                <span className="text-white/30 mr-1.5 tabular-nums">{i + 1}.</span>{f.nombre}
              </td>
              <td className="text-center py-2 px-1 font-black text-white tabular-nums">{f.puntos}</td>
              <td className="text-center py-2 px-1 text-white/70 tabular-nums">{f.gf}</td>
              <td className="text-center py-2 px-1 text-white/70 tabular-nums">{f.gc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
