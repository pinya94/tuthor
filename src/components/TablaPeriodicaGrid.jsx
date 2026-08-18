// Tabla periódica jugable (Encuentra el Elemento) — grid CSS, no SVG: es
// fundamentalmente una tabla, no un diagrama con trazos. La comparten el
// juego y el examen.
//
// Cada celda de los elementos curados (data/tablaperiodica.js: periodos 1-6
// completos, Z=1 a Z=86) enseña su número atómico y su símbolo DESDE EL
// PRINCIPIO, como una tabla periódica de verdad — a diferencia de Rayos X
// (silueta en blanco), aquí ocultar el símbolo no tendría sentido, así que
// la dificultad está en la PISTA (lib/encuentraElemento.js: traducir un
// nombre o razonar una posición por categoría+grupo+periodo), no en
// esconder el tablero.
//
// El bloque f (lantánidos 57-71 y actínidos 89-103) se deja fuera a
// propósito — no aporta nada jugable que un instituto enseñe por nombre
// individual — y su hueco en grupo 3 · periodo 6 se dibuja con la etiqueta
// "57–71" en vez de un elemento real, igual que cualquier tabla periódica
// simplificada de libro de texto.
import { ELEMENTOS, TIPOS } from '../data/tablaperiodica'

const GRUPOS = 18
const PERIODOS = 6

// ¿Existe una casilla química real en (periodo, grupo)? Los periodos 1-3 no
// tienen bloque d (grupos 3-12) — solo grupos principales — así que ahí no
// se dibuja nada, haya o no elemento curado, para no inventar una casilla
// que la química real no tiene.
function existeCasilla(periodo, grupo) {
  if (periodo === 1) return grupo === 1 || grupo === 18
  if (periodo === 2 || periodo === 3) return grupo <= 2 || grupo >= 13
  return true
}

const MAPA = new Map(ELEMENTOS.map(e => [`${e.periodo}-${e.grupo}`, e]))

function Celda({ periodo, grupo, guess, onPick, revelado, objetivo }) {
  if (!existeCasilla(periodo, grupo)) {
    return <div style={{ gridColumn: grupo, gridRow: periodo }} />
  }
  // Puerta de los lantánidos: no es un elemento jugable, solo la etiqueta
  // que también llevan las tablas de libro de texto en esa casilla.
  if (periodo === 6 && grupo === 3) {
    return (
      <div style={{ gridColumn: grupo, gridRow: periodo }}
        className="m-[1px] rounded-[3px] border border-white/10 flex items-center justify-center">
        <span className="text-[6px] text-white/30 select-none leading-none">57–71</span>
      </div>
    )
  }
  const elemento = MAPA.get(`${periodo}-${grupo}`)
  if (!elemento) {
    return (
      <div style={{ gridColumn: grupo, gridRow: periodo }}
        className="m-[1px] rounded-[3px] border border-white/5" />
    )
  }
  const esGuess = guess?.symbol === elemento.symbol
  const esObjetivo = revelado && objetivo?.symbol === elemento.symbol
  const tipo = TIPOS[elemento.tipo]

  // Revelado: la celda correcta siempre en verde; si el clic cayó en otra
  // celda, esa otra en rojo — se ven las dos a la vez cuando hay fallo.
  // Antes de revelar: la celda tentativa (aún sin confirmar) en ámbar.
  let ring = 'border-white/15'
  if (esObjetivo) ring = 'border-green-400 ring-2 ring-green-400/70 z-10'
  else if (revelado && esGuess) ring = 'border-red-400 ring-2 ring-red-400/70 z-10'
  else if (!revelado && esGuess) ring = 'border-[#EDAE49] ring-2 ring-[#EDAE49]/70 z-10'

  return (
    <button
      type="button"
      onClick={onPick ? () => onPick(elemento) : undefined}
      disabled={!onPick}
      style={{ gridColumn: grupo, gridRow: periodo }}
      className={`relative m-[1px] rounded-[3px] border bg-gradient-to-br ${tipo.color} ${ring} flex flex-col items-center justify-center text-white overflow-hidden transition-transform ${onPick ? 'cursor-pointer hover:scale-[1.08] hover:z-20' : ''}`}
    >
      <span className="absolute top-0.5 left-[3px] text-[6px] leading-none opacity-70 select-none">{elemento.z}</span>
      <span className="text-[10px] font-black leading-none select-none">{elemento.symbol}</span>
    </button>
  )
}

export default function TablaPeriodicaGrid({ guess, onPick, revelado, objetivo }) {
  const celdas = []
  for (let periodo = 1; periodo <= PERIODOS; periodo++) {
    for (let grupo = 1; grupo <= GRUPOS; grupo++) {
      celdas.push(
        <Celda key={`${periodo}-${grupo}`} periodo={periodo} grupo={grupo}
          guess={guess} onPick={onPick} revelado={revelado} objetivo={objetivo} />
      )
    }
  }
  // max-w-2xl y mx-auto en el propio componente (no solo en la página que lo
  // llama): la tabla son ~540px de contenido real (18 × 30px), así que sin
  // un tope se estira a lo ancho de lo que le deje el contenedor — en
  // EncuentraElemento.jsx eso era casi el viewport entero, mucho más ancho
  // que el resto de la página (cabecera, pista, botón, todos con max-w-2xl),
  // y quedaba una caja enorme casi vacía con la tabla perdida dentro.
  return (
    <div className="w-full max-w-2xl mx-auto overflow-x-auto rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1030] to-[#050714] p-2">
      <div
        style={{ display: 'grid', gridTemplateColumns: `repeat(${GRUPOS}, 30px)`, gridTemplateRows: `repeat(${PERIODOS}, 30px)` }}
        className="mx-auto"
      >
        {celdas}
      </div>
    </div>
  )
}
