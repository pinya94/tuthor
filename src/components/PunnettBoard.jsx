// Cuadro de Punnett. Aparece SIEMPRE resuelto, y solo después de responder:
// no es la entrada del jugador, es la demostración de por qué su respuesta
// era (o no) la correcta. Cada casilla muestra el genotipo y el fenotipo que
// le corresponde, para que se vea de un vistazo de dónde sale la proporción.
import { fenotipoDe } from '../lib/genetica'

const L = {
  padres: { es: 'Padres', en: 'Parents', ca: 'Pares' },
  cruce:  { es: 'Descendencia posible', en: 'Possible offspring', ca: 'Descendència possible' },
}

// Un progenitor: su organismo, su fenotipo visible y su genotipo.
//
// En las rondas de deducción el genotipo es LA PREGUNTA, así que se tapa
// hasta revelar: enseñarlo antes regalaría la respuesta. El fenotipo (lo que
// se ve a simple vista) sí se muestra siempre, porque es el dato de partida.
function Padre({ round, genotipo, l, oculto }) {
  const fen = fenotipoDe(round, genotipo)
  return (
    <div className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[104px]">
      <span className="text-2xl leading-none">{round.rasgo.org}</span>
      <span className="text-xl leading-none">{fen.emoji}</span>
      <span className={`font-black text-lg tracking-wide ${oculto ? 'text-white/25' : 'text-white'}`}>
        {oculto ? '??' : genotipo}
      </span>
      <span className="text-white/40 text-[11px] text-center leading-tight">{fen.label[l] ?? fen.label.es}</span>
    </div>
  )
}

export default function PunnettBoard({ round, reveal, l = 'es' }) {
  const [p1, p2] = round.padres
  const t = k => L[k][l] ?? L[k].es
  const oculto = round.tipo === 'deduce' && !reveal

  return (
    <div className="w-full">
      {/* Los dos progenitores */}
      <p className="text-white/35 text-[11px] uppercase tracking-widest font-bold text-center mb-2">{t('padres')}</p>
      <div className="flex items-center justify-center gap-3 mb-4">
        <Padre round={round} genotipo={p1} l={l} oculto={oculto} />
        <span className="text-white/40 font-black text-xl">×</span>
        <Padre round={round} genotipo={p2} l={l} oculto={oculto} />
      </div>

      {/* El cuadro, solo al revelar */}
      {reveal && (
        <>
          <p className="text-white/35 text-[11px] uppercase tracking-widest font-bold text-center mb-2">{t('cruce')}</p>
          <div className="max-w-[280px] mx-auto">
            {/* Cabecera: alelos del segundo progenitor */}
            <div className="grid grid-cols-3 gap-1 mb-1">
              <span />
              {[p2[0], p2[1]].map((al, i) => (
                <span key={i} className="text-center text-[#EDAE49] font-black text-sm">{al}</span>
              ))}
            </div>
            {[0, 1].map(fila => (
              <div key={fila} className="grid grid-cols-3 gap-1 mb-1">
                {/* Alelo del primer progenitor */}
                <span className="flex items-center justify-center text-[#EDAE49] font-black text-sm">{p1[fila]}</span>
                {[0, 1].map(col => {
                  const g = round.cuadro[fila * 2 + col]
                  const fen = fenotipoDe(round, g)
                  return (
                    <div key={col} className="flex flex-col items-center justify-center gap-0.5 bg-white/5 border border-white/15 rounded-lg py-2">
                      <span className="text-base leading-none">{fen.emoji}</span>
                      <span className="text-white font-black text-sm tracking-wide">{g}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
