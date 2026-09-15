import { useMemo, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import ResultadoRecurso from '../components/ResultadoRecurso'
import { TIPOS, BASE, tipoPorSlug, rutaDe, clavesDe, resolver, MENSAJE_ERROR } from '../lib/recursoFunciones'

// /recursos/funciones — el alumno escribe su ejercicio y se lo dibujamos
// resuelto. Toda la matemática vive en lib/ (expresion, problemasFunciones,
// problemasRectas, recursoFunciones); esta página solo recoge lo escrito y
// pinta el resultado.
//
// Lo escrito va a la URL (?f=2x%2B3&g=…) en cuanto se toca una casilla: un
// profesor puede mandar el enlace de un ejercicio concreto, y un alumno volver
// a él. La URL limpia, sin parámetros, abre el primer ejemplo, y es la que
// declara el canonical: los enlaces con datos no compiten con ella en Google.

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  funciones: { es: 'Funciones', en: 'Functions', ca: 'Funcions' },
  ejemplos: { es: 'Ejemplos', en: 'Examples', ca: 'Exemples' },
  ayuda: {
    es: 'Se entiende: 2x + 3 · x^2 − 4x + 3 · x² · (x − 1)(x + 2) · 0,5x · 1/x · sqrt(x)',
    en: 'Understood: 2x + 3 · x^2 − 4x + 3 · x² · (x − 1)(x + 2) · 0.5x · 1/x · sqrt(x)',
    ca: "S'entén: 2x + 3 · x^2 − 4x + 3 · x² · (x − 1)(x + 2) · 0,5x · 1/x · sqrt(x)",
  },
  copiar: { es: '🔗 Copiar enlace a este ejercicio', en: '🔗 Copy link to this exercise', ca: "🔗 Copiar l'enllaç a aquest exercici" },
  copiado: { es: '✓ Enlace copiado', en: '✓ Link copied', ca: '✓ Enllaç copiat' },
  practica: { es: 'Practica funciones', en: 'Practise functions', ca: 'Practica funcions' },
  juego: { es: '📈 Caza la Función', en: '📈 Function Hunt', ca: '📈 Caça la Funció' },
  examen: { es: '📝 Examen de funciones', en: '📝 Functions exam', ca: '📝 Examen de funcions' },
  imprimibles: { es: '🖨️ Más recursos', en: '🖨️ More resources', ca: '🖨️ Més recursos' },
}

// El componente se monta de nuevo al cambiar de tipo (key en el export): cada
// tipo tiene sus propias casillas y no tiene sentido arrastrar las de otro.
export default function RecursoFunciones() {
  const { tipo } = useParams()
  return <Recurso key={tipo ?? ''} slug={tipo} />
}

function Casilla({ valor, onCambio, error, ancho = 'w-full', placeholder, etiqueta }) {
  return (
    <input value={valor ?? ''} onChange={e => onCambio(e.target.value)} placeholder={placeholder}
      aria-label={etiqueta} aria-invalid={!!error} inputMode="text" autoComplete="off" spellCheck={false}
      className={`${ancho} bg-black/30 border rounded-xl px-3 py-2.5 text-white text-lg font-semibold tabular-nums outline-none transition-colors ${
        error ? 'border-red-500/70 focus:border-red-400' : 'border-white/15 focus:border-[#EDAE49]'}`} />
  )
}

function Recurso({ slug }) {
  const { tr, localPath } = useLang()
  const [params, setParams] = useSearchParams()
  const tipo = tipoPorSlug(slug)

  const [valores, setValores] = useState(() => {
    if (!tipo) return {}
    const claves = clavesDe(tipo)
    return claves.some(k => params.get(k) !== null)
      ? Object.fromEntries(claves.map(k => [k, params.get(k) ?? '']))
      : { ...tipo.ejemplos[0] }
  })
  const [copiado, setCopiado] = useState(false)

  const r = useMemo(() => {
    if (!tipo) return null
    try {
      return resolver(tipo, valores)
    } catch {
      // Un fallo inesperado del motor no puede tirar la página: se trata como
      // una expresión que no se ha entendido.
      return { ok: false, error: { campo: null, codigo: 'incompleta', detalle: '' } }
    }
  }, [tipo, valores])

  if (!tipo) return <Navigate to={localPath(BASE)} replace />

  function cambiar(nuevos) {
    setValores(nuevos)
    setParams(nuevos, { replace: true })
  }
  const campo = clave => ({
    valor: valores[clave],
    onCambio: v => cambiar({ ...valores, [clave]: v }),
    error: r?.error?.campo === clave,
  })

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}?${new URLSearchParams(valores)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* sin permiso de portapapeles: el enlace sigue en la barra */ }
  }

  const resumenEjemplo = ej => tipo.campos.map(c => (
    c.tipo === 'punto' ? `(${ej[`${c.id}x`]}, ${ej[`${c.id}y`]})` : c.tipo === 'numero' ? `m = ${ej[c.id]}` : ej[c.id]
  )).join('  ·  ')

  const mensajeError = r && !r.ok ? tr((MENSAJE_ERROR[r.error.codigo] ?? MENSAJE_ERROR.incompleta)(r.error.detalle)) : null

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOEstatico path={rutaDe(tipo)} />

      <p className="text-white/35 text-xs mb-3">
        <Link to={localPath('/recursos')} className="hover:text-white/60">{tr(TX.recursos)}</Link>
        {' / '}
        <Link to={localPath(BASE)} className="hover:text-white/60">{tr(TX.funciones)}</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">{tipo.emoji} {tr(tipo.titulo)}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed mb-5">{tr(tipo.intro)}</p>

      {/* Un tipo por pestaña, cada una con su URL. */}
      <nav className="flex gap-1.5 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {TIPOS.map(t => (
          <Link key={t.id} to={localPath(rutaDe(t))}
            className={`shrink-0 text-[13px] font-bold px-3.5 py-2 rounded-xl border transition-colors ${
              t.id === tipo.id ? 'bg-white/15 border-white/25 text-white' : 'border-white/10 text-white/45 hover:text-white/80 hover:bg-white/5'}`}>
            {t.emoji} {tr(t.corto)}
          </Link>
        ))}
      </nav>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 mb-5 space-y-4">
        {tipo.campos.map(c => (
          <div key={c.id}>
            <p className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-1.5">{tr(c.etiqueta)}</p>
            {c.tipo === 'funcion' && (
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-lg font-bold shrink-0">y =</span>
                <Casilla {...campo(c.id)} etiqueta={tr(c.etiqueta)} placeholder="2x + 3" />
              </div>
            )}
            {c.tipo === 'numero' && <Casilla {...campo(c.id)} etiqueta={tr(c.etiqueta)} ancho="w-32" placeholder="2" />}
            {c.tipo === 'punto' && (
              <div className="flex items-center gap-1.5 text-white/60 text-xl font-bold">
                <span>(</span>
                <Casilla {...campo(`${c.id}x`)} etiqueta={`${tr(c.etiqueta)} x`} ancho="w-24" placeholder="x" />
                <span>,</span>
                <Casilla {...campo(`${c.id}y`)} etiqueta={`${tr(c.etiqueta)} y`} ancho="w-24" placeholder="y" />
                <span>)</span>
              </div>
            )}
          </div>
        ))}
        {tipo.campos.some(c => c.tipo === 'funcion') && <p className="text-white/30 text-xs leading-relaxed">{tr(TX.ayuda)}</p>}

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-white/35 text-xs mr-1">{tr(TX.ejemplos)}:</span>
          {tipo.ejemplos.map((ej, i) => (
            <button key={i} type="button" onClick={() => cambiar({ ...ej })}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              {resumenEjemplo(ej)}
            </button>
          ))}
        </div>
      </section>

      {mensajeError && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-semibold px-4 py-3 mb-5">⚠️ {mensajeError}</p>
      )}

      {r?.ok && (
        <>
          <ResultadoRecurso r={r} />

          <button type="button" onClick={copiar}
            className="mt-5 text-sm font-bold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors">
            {tr(copiado ? TX.copiado : TX.copiar)}
          </button>
        </>
      )}

      <div className="mt-10 pt-6 border-t border-white/10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr(TX.practica)}</p>
        <div className="flex flex-wrap gap-2">
          <Link to={localPath('/juegos/funciones-grafica')} className="text-sm font-bold px-4 py-2 rounded-xl bg-pink-600/80 hover:bg-pink-600 text-white">{tr(TX.juego)}</Link>
          <Link to={localPath('/examen/funciones')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr(TX.examen)}</Link>
          <Link to={localPath('/examen/rectas-test')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr({ es: '📝 Examen de rectas', en: '📝 Lines exam', ca: '📝 Examen de rectes' })}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.imprimibles)}</Link>
        </div>
      </div>
    </div>
  )
}
