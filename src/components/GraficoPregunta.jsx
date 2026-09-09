import { useLang } from '../context/LangContext'
import GraficoDatos from './GraficoDatos'
import TablaDatos from './TablaDatos'

// La pregunta de Lee el Gráfico, para los exámenes.
//
// El juego pinta esto mismo dentro de su propia pantalla contrarreloj; aquí lo
// monta MechanicExam, que aporta el flujo de examen (10 preguntas, sin tiempo,
// nota al final). Comparten el componente para que una pregunta se vea igual
// en los dos sitios: si el gráfico del examen fuera distinto del gráfico del
// juego, practicar en uno no serviría para el otro.
export default function GraficoPregunta({ round, phase, onAnswer, l }) {
  const { tr } = useLang()
  const ctx = round.contexto
  const elegible = phase === 'choose'
  const tr3 = o => o?.[l] ?? o?.es ?? ''

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-white/10 p-3 mb-3" style={{ background: 'rgba(17,20,29,0.86)' }}>
        <p className="text-white/40 text-[10.5px] font-bold uppercase tracking-widest text-center mb-1">
          {ctx.emoji} {tr3(ctx.materia)}
          {round.leyenda ? ` · ${round.leyenda.join(' y ')}`
            : ctx.magnitud ? ` · ${tr3(ctx.magnitud)}`
              : ctx.corto ? ` · ${tr3(ctx.corto)}` : ''}
        </p>

        {round.formato === 'tabla' ? (
          <TablaDatos filas={round.filas} comp={round.comp} tr={tr3}
            marcarFila={round.marcarFila ?? null} puntosLabel="Pts" />
        ) : (
          <GraficoDatos
            valores={round.valores}
            segunda={round.segunda}
            etiquetas={round.etiquetas}
            tipo={round.grafico ?? ctx.grafico}
            ejeTruncado={round.ejeTruncado}
            marcar={round.marcar ?? []}
            leyenda={round.leyenda}
            etiquetarValores={round.etiquetarValores}
            formatEje={v => (ctx.escala >= 1000 ? `${v * ctx.escala / 1000}k` : String(v * (ctx.escala ?? 1)))}
            titulo={tr3(ctx.sujeto)}
          />
        )}

        {round.ejeTruncado && (
          <p className="text-amber-400/70 text-[10.5px] text-center mt-1">
            {tr({ es: '⚠ El eje no empieza en cero', en: '⚠ The axis does not start at zero', ca: "⚠ L'eix no comença a zero" })}
          </p>
        )}
      </div>

      <p className="text-white font-bold text-[15px] text-center mb-3 leading-snug">{round.pregunta}</p>

      <div className="grid grid-cols-2 gap-2">
        {round.opciones.map(op => {
          const esCorrecta = op === round.correcta
          const estado = elegible ? 'idle' : esCorrecta ? 'bien' : 'apagada'
          return (
            <button key={op} type="button" onClick={() => onAnswer(op)} disabled={!elegible}
              className={`px-3 py-3 rounded-xl border text-[13px] font-bold transition-colors ${
                estado === 'bien' ? 'border-green-500/60 bg-green-500/15 text-green-300'
                  : estado === 'apagada' ? 'border-white/5 text-white/25'
                    : 'border-white/10 bg-white/5 text-white hover:border-teal-500/40 hover:bg-white/10'
              }`}>
              {op}
            </button>
          )
        })}
      </div>
    </div>
  )
}
