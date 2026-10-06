// Una ronda del Ciclo de las rocas: el diagrama del ciclo (procesos y rutas)
// o la muestra de una roca con su descripción, y las opciones. La usan el
// juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { ROCAS, RUTAS, FLECHAS, NODOS, enunciado, textoOpcion, explicacion, nombreRoca, nombreProceso } from '../../lib/cicloRocas'
import CicloSVG from './CicloSVG'
import MuestraRoca from './MuestraRoca'

// Las flechas del ciclo que recorre una ruta, en orden.
function flechasDeRuta(ruta) {
  const tipoDe = id => ROCAS[id].tipo
  let nodo = tipoDe(ruta.desde)
  return ruta.buena.map(p => {
    const i = FLECHAS.findIndex(([a, , q]) => a === nodo && q === p)
    nodo = FLECHAS[i][1]
    return i
  })
}

export default function PreguntaRocas({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const nombres = Object.fromEntries(Object.keys(NODOS).map(id => [id, { es: { magma: 'Magma', ignea: 'Ígneas', sedimentos: 'Sedimentos', sedimentaria: 'Sedimentarias', metamorfica: 'Metamórficas' }, en: { magma: 'Magma', ignea: 'Igneous', sedimentos: 'Sediments', sedimentaria: 'Sedimentary', metamorfica: 'Metamorphic' }, ca: { magma: 'Magma', ignea: 'Ígnies', sedimentos: 'Sediments', sedimentaria: 'Sedimentàries', metamorfica: 'Metamòrfiques' } }[l][id]]))
  nombres.aria = tr({ es: 'Diagrama del ciclo de las rocas', en: 'Rock cycle diagram', ca: 'Diagrama del cicle de les roques' })

  const enCiclo = ronda.tipo === 'proceso' || ronda.tipo === 'ruta'
  // En las de ruta el camino solo se pinta al corregir: antes daría la respuesta.
  const marcadas = ronda.tipo === 'proceso' ? [ronda.flecha] : ronda.tipo === 'ruta' && revelado ? flechasDeRuta(RUTAS[ronda.ruta]) : []
  const etiquetas = ronda.tipo === 'proceso' ? [nombreProceso(FLECHAS[ronda.flecha][2], l)] : marcadas.map(i => nombreProceso(FLECHAS[i][2], l))
  const columnas = ronda.tipo === 'tipo' ? 'grid-cols-3' : ronda.tipo === 'origen' ? 'grid-cols-2' : 'grid-cols-1'
  const roca = ronda.roca && ronda.tipo !== 'ruta' ? ronda.roca : null

  return (
    <div className="w-full">
      {roca && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-2 flex items-center gap-3">
          <div className="w-32 shrink-0"><MuestraRoca roca={roca} aria={nombreRoca(roca, l)} /></div>
          <div className="min-w-0">
            <p className="text-white font-black text-lg leading-tight">{nombreRoca(roca, l)}</p>
            <p className="text-white/70 text-[13px] leading-snug mt-0.5">{ROCAS[roca].desc[l] ?? ROCAS[roca].desc.es}</p>
          </div>
        </div>
      )}
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(ronda, l)}</p>
      {enCiclo && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <CicloSVG marcadas={marcadas} revelado={revelado} etiquetas={ronda.tipo === 'ruta' ? null : etiquetas} nombres={nombres} />
        </div>
      )}
      <div className={`grid gap-2 ${columnas}`}>
        {ronda.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-3 rounded-xl border text-white text-sm font-bold transition-all ${clase(o)}`}>
            {textoOpcion(o, ronda, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
