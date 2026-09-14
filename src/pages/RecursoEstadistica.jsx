import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import DiagramaFrecuencias from '../components/DiagramaFrecuencias'
import { RUTA, EJEMPLOS_LISTA, EJEMPLOS_TABLA, resolverEstadistica, numTexto } from '../lib/recursoEstadistica'
import { MENSAJE_ERROR } from '../lib/recursoFunciones'

// /recursos/estadistica — el alumno pega sus datos o su tabla de frecuencias y
// ve todos los parámetros con sus pasos. La matemática vive en
// lib/recursoEstadistica.js. Los datos van a la URL (?modo=…&d=… o &v=…&f=…)
// para poder mandar el enlace de un ejercicio concreto.

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  titulo: { es: 'Media, mediana y moda paso a paso', en: 'Mean, median and mode step by step', ca: 'Mitjana, mediana i moda pas a pas' },
  intro: {
    es: 'Escribe tus datos o la tabla de frecuencias del ejercicio. Verás la tabla completa, cada parámetro con sus pasos y el diagrama de barras.',
    en: 'Type your data or the frequency table from the exercise. You will see the full table, every measure with its steps and the bar chart.',
    ca: "Escriu les teves dades o la taula de freqüències de l'exercici. Veuràs la taula completa, cada paràmetre amb els seus passos i el diagrama de barres.",
  },
  lista: { es: '📝 Lista de datos', en: '📝 List of data', ca: '📝 Llista de dades' },
  tabla: { es: '📋 Tabla de frecuencias', en: '📋 Frequency table', ca: '📋 Taula de freqüències' },
  datos: { es: 'Datos', en: 'Data', ca: 'Dades' },
  ayudaLista: {
    es: 'Sepáralos con comas y espacio (3, 5, 7), con punto y coma o con espacios. Los decimales, con coma o punto: 2,5; 3,1.',
    en: 'Separate them with commas and a space (3, 5, 7), semicolons or spaces. Decimals with a point: 2.5 3.1.',
    ca: 'Separa-les amb comes i espai (3, 5, 7), amb punt i coma o amb espais. Els decimals, amb coma o punt: 2,5; 3,1.',
  },
  valor: { es: 'Valor (xᵢ)', en: 'Value (xᵢ)', ca: 'Valor (xᵢ)' },
  frecuencia: { es: 'Frecuencia (fᵢ)', en: 'Frequency (fᵢ)', ca: 'Freqüència (fᵢ)' },
  fila: { es: '+ Añadir fila', en: '+ Add row', ca: '+ Afegir fila' },
  quitar: { es: 'Quitar fila', en: 'Remove row', ca: 'Treure fila' },
  ejemplos: { es: 'Ejemplos', en: 'Examples', ca: 'Exemples' },
  leidos: { es: 'Datos leídos, ordenados', en: 'Data read, sorted', ca: 'Dades llegides, ordenades' },
  tablaTitulo: { es: 'Tabla de frecuencias', en: 'Frequency table', ca: 'Taula de freqüències' },
  copiar: { es: '🔗 Copiar enlace a este ejercicio', en: '🔗 Copy link to this exercise', ca: "🔗 Copiar l'enllaç a aquest exercici" },
  copiado: { es: '✓ Enlace copiado', en: '✓ Link copied', ca: '✓ Enllaç copiat' },
  practica: { es: 'Practica', en: 'Practise', ca: 'Practica' },
  juego: { es: '📊 Estadístico Exprés', en: '📊 Quick Statistician', ca: '📊 Estadístic Exprés' },
  examen: { es: '📝 Examen de estadística', en: '📝 Statistics exam', ca: "📝 Examen d'estadística" },
  mas: { es: '🧰 Más recursos', en: '🧰 More resources', ca: '🧰 Més recursos' },
}

const aFilas = ({ valores, frecuencias }) => valores.map((v, i) => ({ valor: v, frecuencia: frecuencias[i] ?? '' }))

export default function RecursoEstadistica() {
  const { lang, tr, localPath } = useLang()
  const [params, setParams] = useSearchParams()

  const [modo, setModo] = useState(() => (params.get('modo') === 'tabla' ? 'tabla' : 'lista'))
  const [lista, setLista] = useState(() => params.get('d') ?? EJEMPLOS_LISTA[0])
  const [filas, setFilas] = useState(() => {
    const v = params.get('v'), f = params.get('f')
    return v !== null ? aFilas({ valores: v.split(';'), frecuencias: (f ?? '').split(';') }) : aFilas(EJEMPLOS_TABLA[0])
  })
  const [copiado, setCopiado] = useState(false)

  const r = useMemo(() => {
    try {
      return resolverEstadistica({ modo, lista, valores: filas.map(f => f.valor), frecuencias: filas.map(f => f.frecuencia) })
    } catch {
      return { ok: false, error: { campo: null, codigo: 'incompleta', detalle: '' } }
    }
  }, [modo, lista, filas])

  const consulta = (m, l, fs) => (m === 'tabla'
    ? { modo: 'tabla', v: fs.map(f => f.valor).join(';'), f: fs.map(f => f.frecuencia).join(';') }
    : { modo: 'lista', d: l })

  function cambiarModo(m) { setModo(m); setParams(consulta(m, lista, filas), { replace: true }) }
  function cambiarLista(l) { setLista(l); setParams(consulta('lista', l, filas), { replace: true }) }
  function cambiarFilas(fs) { setFilas(fs); setParams(consulta('tabla', lista, fs), { replace: true }) }
  const editarFila = (i, campo, v) => cambiarFilas(filas.map((f, k) => (k === i ? { ...f, [campo]: v } : f)))

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}?${new URLSearchParams(consulta(modo, lista, filas))}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* sin permiso de portapapeles: el enlace sigue en la barra */ }
  }

  const campoMal = c => r.error?.campo === c
  const casilla = mal => `w-full bg-black/30 border rounded-xl px-3 py-2 text-white font-semibold tabular-nums outline-none transition-colors ${
    mal ? 'border-red-500/70 focus:border-red-400' : 'border-white/15 focus:border-[#EDAE49]'}`

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOEstatico path={RUTA} />

      <p className="text-white/35 text-xs mb-3">
        <Link to={localPath('/recursos')} className="hover:text-white/60">{tr(TX.recursos)}</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">📊 {tr(TX.titulo)}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed mb-5">{tr(TX.intro)}</p>

      <div className="inline-flex gap-1 p-1 bg-black/25 border border-white/10 rounded-xl mb-4">
        {['lista', 'tabla'].map(m => (
          <button key={m} type="button" onClick={() => cambiarModo(m)}
            className={`text-[13px] font-bold px-4 py-2 rounded-lg transition-colors ${modo === m ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}`}>
            {tr(TX[m])}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 mb-5 space-y-3">
        {modo === 'lista' ? (
          <>
            <p className="text-white/45 text-xs font-semibold uppercase tracking-widest">{tr(TX.datos)}</p>
            <textarea value={lista} onChange={e => cambiarLista(e.target.value)} rows={3} spellCheck={false}
              aria-label={tr(TX.datos)} aria-invalid={campoMal('lista')} placeholder="3, 5, 7, 7, 9"
              className={`${casilla(campoMal('lista'))} text-lg resize-y`} />
            <p className="text-white/30 text-xs leading-relaxed">{tr(TX.ayudaLista)}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-white/35 text-xs mr-1">{tr(TX.ejemplos)}:</span>
              {EJEMPLOS_LISTA.map(ej => (
                <button key={ej} type="button" onClick={() => cambiarLista(ej)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">{ej}</button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-white/45 text-xs font-semibold uppercase tracking-widest">
              <span>{tr(TX.valor)}</span><span>{tr(TX.frecuencia)}</span><span className="w-8" />
            </div>
            {filas.map((f, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                <input value={f.valor} onChange={e => editarFila(i, 'valor', e.target.value)} aria-label={`${tr(TX.valor)} ${i + 1}`}
                  aria-invalid={campoMal(`fila-${i}-valor`)} className={casilla(campoMal(`fila-${i}-valor`))} inputMode="decimal" />
                <input value={f.frecuencia} onChange={e => editarFila(i, 'frecuencia', e.target.value)} aria-label={`${tr(TX.frecuencia)} ${i + 1}`}
                  aria-invalid={campoMal(`fila-${i}-frecuencia`)} className={casilla(campoMal(`fila-${i}-frecuencia`))} inputMode="numeric" />
                <button type="button" onClick={() => cambiarFilas(filas.filter((_, k) => k !== i))} disabled={filas.length <= 1}
                  aria-label={tr(TX.quitar)} className="w-8 h-8 rounded-lg text-white/40 hover:text-red-300 hover:bg-white/5 disabled:opacity-20">×</button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-1.5">
              <button type="button" onClick={() => cambiarFilas([...filas, { valor: '', frecuencia: '' }])}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white mr-2">{tr(TX.fila)}</button>
              <span className="text-white/35 text-xs mr-1">{tr(TX.ejemplos)}:</span>
              {EJEMPLOS_TABLA.map((ej, i) => (
                <button key={i} type="button" onClick={() => cambiarFilas(aFilas(ej))}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                  {ej.valores.map((v, k) => `${v}·${ej.frecuencias[k]}`).join('  ')}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {!r.ok && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-semibold px-4 py-3 mb-5">
          ⚠️ {tr((MENSAJE_ERROR[r.error.codigo] ?? MENSAJE_ERROR.incompleta)(r.error.detalle))}
        </p>
      )}

      {r.ok && (
        <>
          {/* Lo leído, siempre a la vista: con la coma decimal de por medio,
              es la forma de ver que "2,5" se ha entendido como se quería. */}
          {r.datosOrdenados && (
            <p className="text-white/45 text-xs mb-3 leading-relaxed">
              <span className="font-semibold uppercase tracking-widest">{tr(TX.leidos)}:</span>{' '}
              <span className="text-white/70 tabular-nums">{r.datosOrdenados.map(x => numTexto(x, lang)).join('  ·  ')}</span>
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {r.resumen.map(d => (
              <div key={d.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-white/40 text-[11px]">{tr(d.etiqueta)}</p>
                <p className="text-white font-black tabular-nums">{tr(d.valor)}</p>
              </div>
            ))}
          </div>

          <DiagramaFrecuencias barras={r.barras} media={r.media} mediana={r.mediana} />

          <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 overflow-x-auto">
            <h2 className="text-white font-black text-base mb-2">{tr(TX.tablaTitulo)}</h2>
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr className="text-white/45 text-xs text-right">
                  <th className="text-left font-semibold py-1 pr-3">xᵢ</th>
                  <th className="font-semibold py-1 px-3">fᵢ</th>
                  <th className="font-semibold py-1 px-3">Fᵢ</th>
                  <th className="font-semibold py-1 px-3">hᵢ</th>
                  <th className="font-semibold py-1 pl-3">%</th>
                </tr>
              </thead>
              <tbody>
                {r.tabla.map((t, i) => {
                  const tx = t.texto(lang)
                  return (
                    <tr key={i} className="border-t border-white/5 text-right text-white/80">
                      <td className="text-left py-1 pr-3 font-bold text-white">{tx.x}</td>
                      <td className="py-1 px-3">{t.fi}</td>
                      <td className="py-1 px-3">{t.Fi}</td>
                      <td className="py-1 px-3">{tx.hi}</td>
                      <td className="py-1 pl-3">{tx.pct}</td>
                    </tr>
                  )
                })}
                <tr className="border-t border-white/15 text-right text-white font-black">
                  <td className="text-left py-1 pr-3">N</td>
                  <td className="py-1 px-3">{r.N}</td>
                  <td colSpan={3} />
                </tr>
              </tbody>
            </table>
          </section>

          <div className="mt-4 space-y-3">
            {r.secciones.map(s => (
              <section key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h2 className="text-white font-black text-base mb-2">{tr(s.titulo)}</h2>
                <ol className="space-y-1.5">
                  {s.pasos.map((p, j) => (
                    <li key={j} className="text-white/75 text-[14.5px] leading-relaxed tabular-nums break-words">{tr(p)}</li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          <button type="button" onClick={copiar}
            className="mt-5 text-sm font-bold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors">
            {tr(copiado ? TX.copiado : TX.copiar)}
          </button>
        </>
      )}

      <div className="mt-10 pt-6 border-t border-white/10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr(TX.practica)}</p>
        <div className="flex flex-wrap gap-2">
          <Link to={localPath('/juegos/estadistico-expres')} className="text-sm font-bold px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white">{tr(TX.juego)}</Link>
          <Link to={localPath('/examen/estadistica')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr(TX.examen)}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.mas)}</Link>
        </div>
      </div>
    </div>
  )
}
