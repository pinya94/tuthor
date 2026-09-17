import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import ResultadoRecurso from '../components/ResultadoRecurso'
import { TIPOS, tipoPorSlug, rutaDe, resolverEcuacion } from '../lib/recursoEcuaciones'
import { MENSAJE_ERROR } from '../lib/recursoFunciones'

// /recursos/ecuaciones — el alumno escribe su ecuación y la ve resuelta, con
// la comprobación y la gráfica de los dos lados. La matemática está en
// lib/recursoEcuaciones.js; el resultado se pinta con el mismo componente que
// el recurso de funciones. Como allí, la ecuación va a la URL (?e=…) para
// poder mandar el enlace de un ejercicio concreto.
//
// Una URL por TIPO de ecuación (segundo grado, primer grado, con fracciones,
// con paréntesis): el solver es el mismo, cambian el título y los ejemplos para
// posicionar por lo que se busca. Ver TIPOS en lib/recursoEcuaciones.js.

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  ecuacion: { es: 'Ecuación', en: 'Equation', ca: 'Equació' },
  ayuda: {
    es: 'Escríbela con un signo =. Sin =, se entiende que es igual a 0. Vale x², x^2, 0,5x, 3(x − 2) y fracciones como x/2.',
    en: 'Write it with an = sign. Without =, it is taken as equal to 0. x², x^2, 0.5x, 3(x − 2) and fractions like x/2 all work.',
    ca: "Escriu-la amb un signe =. Sense =, s'entén que és igual a 0. Val x², x^2, 0,5x, 3(x − 2) i fraccions com x/2.",
  },
  ejemplos: { es: 'Ejemplos', en: 'Examples', ca: 'Exemples' },
  solucion: { es: 'Solución', en: 'Solution', ca: 'Solució' },
  sinSolucion: { es: 'No tiene solución', en: 'No solution', ca: 'No té solució' },
  infinitas: { es: 'Cualquier x es solución', en: 'Every x is a solution', ca: 'Qualsevol x és solució' },
  copiar: { es: '🔗 Copiar enlace a este ejercicio', en: '🔗 Copy link to this exercise', ca: "🔗 Copiar l'enllaç a aquest exercici" },
  copiado: { es: '✓ Enlace copiado', en: '✓ Link copied', ca: '✓ Enllaç copiat' },
  otrosTipos: { es: 'Otros tipos de ecuaciones', en: 'Other kinds of equations', ca: 'Altres tipus d\'equacions' },
  practica: { es: 'Practica', en: 'Practise', ca: 'Practica' },
  balanza: { es: '⚖️ Balanza Algebraica', en: '⚖️ Algebra Balance', ca: '⚖️ Balança Algebraica' },
  funciones: { es: '📈 Problemas de funciones', en: '📈 Function problems', ca: '📈 Problemes de funcions' },
  mas: { es: '🧰 Más recursos', en: '🧰 More resources', ca: '🧰 Més recursos' },
}

// Cada tipo tiene sus propios ejemplos: al cambiar de tipo se monta de nuevo.
export default function RecursoEcuaciones() {
  const { tipo } = useParams()
  return <Recurso key={tipo ?? ''} slug={tipo} />
}

function Recurso({ slug }) {
  const { tr, localPath } = useLang()
  const tipo = tipoPorSlug(slug) ?? TIPOS[0]
  const [params, setParams] = useSearchParams()
  const [ecuacion, setEcuacion] = useState(() => params.get('e') ?? tipo.ejemplos[0])
  const [copiado, setCopiado] = useState(false)

  const r = useMemo(() => {
    try {
      return resolverEcuacion(ecuacion)
    } catch {
      return { ok: false, error: { campo: 'e', codigo: 'incompleta', detalle: '' } }
    }
  }, [ecuacion])

  function cambiar(texto) {
    setEcuacion(texto)
    setParams({ e: texto }, { replace: true })
  }

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}?${new URLSearchParams({ e: ecuacion })}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* sin permiso de portapapeles: el enlace sigue en la barra */ }
  }

  const infinitas = r.ok && r.datos.some(d => d.valor.es === 'Infinitas')
  const otros = TIPOS.filter(t => t.slug !== tipo.slug)

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOEstatico path={rutaDe(tipo)} />

      <p className="text-white/35 text-xs mb-3">
        <Link to={localPath('/recursos')} className="hover:text-white/60">{tr(TX.recursos)}</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">{tipo.emoji} {tr(tipo.titulo)}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed mb-5">{tr(tipo.intro)}</p>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 mb-5 space-y-3">
        <p className="text-white/45 text-xs font-semibold uppercase tracking-widest">{tr(TX.ecuacion)}</p>
        <input value={ecuacion} onChange={e => cambiar(e.target.value)} placeholder="2x + 3 = x − 1"
          aria-label={tr(TX.ecuacion)} aria-invalid={!r.ok} autoComplete="off" spellCheck={false}
          className={`w-full bg-black/30 border rounded-xl px-3 py-2.5 text-white text-lg font-semibold tabular-nums outline-none transition-colors ${
            r.ok ? 'border-white/15 focus:border-[#EDAE49]' : 'border-red-500/70 focus:border-red-400'}`} />
        <p className="text-white/30 text-xs leading-relaxed">{tr(TX.ayuda)}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-white/35 text-xs mr-1">{tr(TX.ejemplos)}:</span>
          {tipo.ejemplos.map(ej => (
            <button key={ej} type="button" onClick={() => cambiar(ej)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              {ej}
            </button>
          ))}
        </div>
      </section>

      {!r.ok && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-semibold px-4 py-3 mb-5">
          ⚠️ {tr((MENSAJE_ERROR[r.error.codigo] ?? MENSAJE_ERROR.incompleta)(r.error.detalle))}
        </p>
      )}

      {r.ok && (
        <>
          {/* La respuesta, grande y lo primero: es lo que se viene a mirar,
              aunque lo que enseña de verdad está en los pasos de debajo. */}
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 mb-4">
            <p className="text-green-300/70 text-[11px] uppercase tracking-widest font-bold mb-1">{tr(TX.solucion)}</p>
            <p className="text-white text-xl font-black tabular-nums">
              {infinitas ? tr(TX.infinitas) : r.soluciones.length ? r.soluciones.map(s => tr(s.texto)).join('   ·   ') : tr(TX.sinSolucion)}
            </p>
          </div>

          <ResultadoRecurso r={r} />

          <button type="button" onClick={copiar}
            className="mt-5 text-sm font-bold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors">
            {tr(copiado ? TX.copiado : TX.copiar)}
          </button>
        </>
      )}

      {/* Enlazado interno entre las variantes: cada tipo lleva a los demás. */}
      <nav className="mt-10 pt-6 border-t border-white/10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr(TX.otrosTipos)}</p>
        <div className="flex flex-wrap gap-2">
          {otros.map(t => (
            <Link key={t.slug || 'base'} to={localPath(rutaDe(t))}
              className="text-sm font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              {t.emoji} {tr(t.titulo)}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr(TX.practica)}</p>
        <div className="flex flex-wrap gap-2">
          <Link to={localPath('/juegos/balanza-algebraica')} className="text-sm font-bold px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white">{tr(TX.balanza)}</Link>
          <Link to={localPath('/examen/ecuaciones-segundo-grado-test')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr({ es: '📝 Examen de 2º grado', en: '📝 Quadratics exam', ca: '📝 Examen de 2n grau' })}</Link>
          <Link to={localPath('/examen/sistemas-ecuaciones-test')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr({ es: '📝 Examen de sistemas', en: '📝 Systems exam', ca: '📝 Examen de sistemes' })}</Link>
          <Link to={localPath('/recursos/funciones')} className="text-sm font-bold px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white">{tr(TX.funciones)}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.mas)}</Link>
        </div>
      </div>
    </div>
  )
}
