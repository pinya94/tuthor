import { useLang } from '../context/LangContext'
import PlanoFunciones from './PlanoFunciones'
import { COLOR_PUNTO } from '../lib/recursoFunciones'

// El resultado de un recurso interactivo tal como lo devuelve completar()
// (lib/recursoFunciones.js): ecuaciones con su color, veredicto si lo hay,
// gráfica, puntos, datos sueltos y los pasos. Lo comparten el recurso de
// funciones y el de ecuaciones, para que un mismo resultado se lea igual.

const TX = {
  aprox: {
    es: 'No es una recta ni una parábola: se dibuja igual, pero los resultados son aproximados (≈).',
    en: 'It is neither a line nor a parabola: it is still drawn, but the results are approximate (≈).',
    ca: 'No és una recta ni una paràbola: es dibuixa igual, però els resultats són aproximats (≈).',
  },
  puntos: { es: 'Puntos', en: 'Points', ca: 'Punts' },
  si: { es: '✓ Sí está en la gráfica', en: '✓ It is on the graph', ca: '✓ Sí que és a la gràfica' },
  no: { es: '✗ No está en la gráfica', en: '✗ It is not on the graph', ca: '✗ No és a la gràfica' },
}

export default function ResultadoRecurso({ r }) {
  const { tr } = useLang()
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-3">
        {r.ecuaciones.map(e => (
          <span key={e.texto} className="text-lg font-black px-3 py-1 rounded-xl bg-black/30 border border-white/10" style={{ color: e.color }}>{e.texto}</span>
        ))}
        {r.pertenece !== undefined && (
          <span className={`text-sm font-black px-3 py-2 rounded-xl ${r.pertenece ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
            {tr(r.pertenece ? TX.si : TX.no)}
          </span>
        )}
      </div>

      {!r.exacta && <p className="text-amber-300/80 text-xs mb-3">{tr(TX.aprox)}</p>}

      <PlanoFunciones funciones={r.funciones} verticales={r.verticales} puntos={r.puntos} rango={r.rango} />

      {r.puntos.length > 0 && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-2">{tr(TX.puntos)}</p>
          <ul className="space-y-1">
            {r.puntos.map((p, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLOR_PUNTO[p.clase] }} />
                <span className="text-white/55">{tr(p.etiqueta)}:</span>
                <span className="text-white font-bold tabular-nums">{tr(p.texto)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {r.datos.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {r.datos.map((d, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <p className="text-white/40 text-[11px]">{tr(d.etiqueta)}</p>
              <p className="text-white font-black">{tr(d.valor)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Los pasos, que son para lo que se viene: la respuesta sola no ayuda
          a hacer el siguiente ejercicio. */}
      <div className="mt-5 space-y-3">
        {r.secciones.map((s, i) => (
          <section key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-white font-black text-base mb-2">{tr(s.titulo)}</h2>
            <ol className="space-y-1.5">
              {s.pasos.map((p, j) => (
                <li key={j} className="text-white/75 text-[14.5px] leading-relaxed tabular-nums">{tr(p)}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  )
}
