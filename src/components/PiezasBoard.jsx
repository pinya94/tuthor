import { SIN_ARTICULO } from '../lib/piezaQueFalta'

/**
 * Tablero de La Pieza que Falta: la frase con su hueco y las fichas debajo.
 * Lo comparten el juego arcade (con reloj) y el examen por tema (sin reloj),
 * para que la mecánica sea LA MISMA en los dos sitios y no se dupliquen ni el
 * resaltado de la pista ni el número de huecos.
 *
 * Props:
 *   round    la ronda de genRound()
 *   placed   índices de chips colocados, en orden
 *   onPlace  (i) => void   — tocar una ficha libre
 *   onRemove (pos) => void — tocar una ya colocada para devolverla
 *   reveal   true cuando ya se ha respondido (bloquea y colorea)
 *   ok       true/false una vez revelado
 *   l        idioma
 */

const NADA = { es: 'nada', en: 'nothing', ca: 'res' }

// Resalta la pista dentro del texto. La pista es literalmente un trozo del
// texto, así que basta partir por él: no hace falta marcar la frase en los
// datos con ninguna etiqueta.
function ConPista({ texto, pista }) {
  if (!texto) return null
  const i = pista ? texto.indexOf(pista) : -1
  if (i < 0) return <>{texto}</>
  return (
    <>
      {texto.slice(0, i)}
      <span className="underline decoration-amber-400 decoration-2 underline-offset-4 text-amber-300">{pista}</span>
      {texto.slice(i + pista.length)}
    </>
  )
}

export default function PiezasBoard({ round, placed, onPlace, onRemove, reveal, ok, l = 'es' }) {
  return (
    <>
      <div className={`w-full rounded-2xl border p-5 mb-4 transition-colors ${
        reveal ? (ok ? 'border-green-500/40 bg-green-500/5' : 'border-red-500/40 bg-red-500/5') : 'border-white/10 bg-white/5'}`}>
        <p className="text-white text-xl sm:text-2xl leading-relaxed text-center">
          <ConPista texto={round.pre} pista={round.pista} />
          {/* Un hueco por pieza que pide la respuesta, no uno solo: el número
              de rayas ES la pista de cuántas piezas faltan. */}
          <span className="inline-flex flex-wrap justify-center items-center gap-1 align-middle mx-1">
            {Array.from({ length: round.sol.length }, (_, pos) => {
              const ci = placed[pos]
              if (ci === undefined) {
                return <span key={pos} className="inline-block w-14 border-b-2 border-dashed border-white/30 align-middle" />
              }
              return (
                <button key={pos} onClick={() => onRemove(pos)} disabled={reveal}
                  className="px-2.5 py-1 rounded-lg bg-[#EDAE49] text-black font-bold text-lg disabled:opacity-90">
                  {round.chips[ci]}
                </button>
              )
            })}
          </span>
          <ConPista texto={round.post} pista={round.pista} />
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-2">
        {round.chips.map((chip, i) => {
          const usada = placed.includes(i)
          return (
            <button key={i} onClick={() => onPlace(i)} disabled={usada || reveal}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-base transition-all border ${
                usada || reveal
                  ? 'bg-white/5 border-white/5 text-white/20'
                  : 'bg-white/10 border-white/15 text-white hover:bg-white/20 active:scale-95'}`}>
              {chip}
              {chip === SIN_ARTICULO && (
                <span className="ml-1.5 text-white/40 text-xs font-normal">{NADA[l] ?? NADA.es}</span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}
