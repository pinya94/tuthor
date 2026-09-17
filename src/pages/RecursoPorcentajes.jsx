import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { TIPOS, MODOS, tipoPorSlug, rutaDe } from '../lib/recursoPorcentajes'

// /recursos/porcentajes — cuatro cálculos de porcentaje con sus casillas. La
// matemática (exacta) está en lib/recursoPorcentajes.js. Los datos van a la URL
// (?m=modo&x=…&n=…) para poder mandar el enlace del ejercicio. Una URL por tipo
// (regla de tres, aumento/descuento…) fija el modo por defecto y el enfoque SEO.

const ORDEN = ['porcentaje-de', 'que-porcentaje', 'regla-de-tres', 'variacion']

const MODO_TX = {
  'porcentaje-de': { es: 'X % de N', en: 'X% of N', ca: 'X % de N' },
  'que-porcentaje': { es: '¿Qué % es?', en: 'What % is?', ca: 'Quin % és?' },
  'regla-de-tres': { es: 'Regla de tres', en: 'Rule of three', ca: 'Regla de tres' },
  'variacion': { es: 'Aumento/descuento', en: 'Increase/discount', ca: 'Augment/descompte' },
}

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  pasos: { es: 'Paso a paso', en: 'Step by step', ca: 'Pas a pas' },
  copiar: { es: '🔗 Copiar enlace a este ejercicio', en: '🔗 Copy link to this exercise', ca: "🔗 Copiar l'enllaç a aquest exercici" },
  copiado: { es: '✓ Enlace copiado', en: '✓ Link copied', ca: '✓ Enllaç copiat' },
  otrosTipos: { es: 'Otras calculadoras', en: 'Other calculators', ca: 'Altres calculadores' },
  practica: { es: 'Más recursos de matemáticas', en: 'More maths resources', ca: 'Més recursos de matemàtiques' },
  mcm: { es: '🔢 m.c.m. y m.c.d.', en: '🔢 LCM and GCD', ca: '🔢 m.c.m. i m.c.d.' },
  ecuaciones: { es: '⚖️ Ecuaciones', en: '⚖️ Equations', ca: '⚖️ Equacions' },
  mates: { es: '🧮 Estudiar matemáticas', en: '🧮 Study maths', ca: '🧮 Estudiar matemàtiques' },
  mas: { es: '🧰 Todos los recursos', en: '🧰 All resources', ca: '🧰 Tots els recursos' },
  errores: {
    incompleta: { es: 'Rellena las casillas con números (vale 15, 2,5…).', en: 'Fill the boxes with numbers (15, 2.5… all work).', ca: 'Omple les caselles amb números (val 15, 2,5…).' },
    cero: { es: 'Ese número no puede ser 0.', en: 'That number cannot be 0.', ca: 'Aquest número no pot ser 0.' },
  },
}

export default function RecursoPorcentajes() {
  const { tipo } = useParams()
  return <Recurso key={tipo ?? ''} slug={tipo} />
}

function Recurso({ slug }) {
  const { lang, tr, localPath } = useLang()
  const tipo = tipoPorSlug(slug) ?? TIPOS[0]
  const [params, setParams] = useSearchParams()
  const modoInicial = MODOS[params.get('m')] ? params.get('m') : tipo.modo
  const [modo, setModo] = useState(modoInicial)
  const [valores, setValores] = useState(() => {
    const campos = MODOS[modoInicial].campos
    return campos.some(c => params.get(c.id) !== null)
      ? Object.fromEntries(campos.map(c => [c.id, params.get(c.id) ?? '']))
      : { ...MODOS[modoInicial].ejemplo }
  })
  const [copiado, setCopiado] = useState(false)

  const r = useMemo(() => MODOS[modo].calcular(valores, lang), [modo, valores, lang])

  const escribirUrl = (m, vals) =>
    setParams({ m, ...Object.fromEntries(MODOS[m].campos.map(c => [c.id, vals[c.id] ?? ''])) }, { replace: true })

  function cambiarCampo(id, val) {
    const vals = { ...valores, [id]: val }
    setValores(vals); escribirUrl(modo, vals)
  }
  function cambiarModo(m) {
    const vals = { ...MODOS[m].ejemplo }
    setModo(m); setValores(vals); escribirUrl(m, vals)
  }

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* sin permiso de portapapeles: el enlace sigue en la barra */ }
  }

  const campos = MODOS[modo].campos

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOEstatico path={rutaDe(tipo)} />

      <p className="text-white/35 text-xs mb-3">
        <Link to={localPath('/recursos')} className="hover:text-white/60">{tr(TX.recursos)}</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">{tipo.emoji} {tr(tipo.titulo)}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed mb-5">{tr(tipo.intro)}</p>

      <div className="flex flex-wrap gap-1 p-1 bg-black/25 border border-white/10 rounded-xl mb-4">
        {ORDEN.map(m => (
          <button key={m} type="button" onClick={() => cambiarModo(m)}
            className={`text-[13px] font-bold px-3.5 py-2 rounded-lg transition-colors ${modo === m ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}`}>
            {tr(MODO_TX[m])}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 mb-5">
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${campos.length}, minmax(0, 1fr))` }}>
          {campos.map(c => (
            <label key={c.id} className="block">
              <span className="block text-white/45 text-xs font-semibold uppercase tracking-widest mb-1.5">{tr(c.etiqueta)}</span>
              <input value={valores[c.id] ?? ''} onChange={e => cambiarCampo(c.id, e.target.value)} placeholder={c.placeholder}
                aria-label={tr(c.etiqueta)} aria-invalid={!r.ok} inputMode="decimal" autoComplete="off" spellCheck={false}
                className={`w-full bg-black/30 border rounded-xl px-3 py-2.5 text-white text-lg font-semibold tabular-nums outline-none transition-colors ${
                  r.ok ? 'border-white/15 focus:border-[#EDAE49]' : 'border-red-500/70 focus:border-red-400'}`} />
            </label>
          ))}
        </div>
      </section>

      {!r.ok && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-semibold px-4 py-3 mb-5">
          ⚠️ {tr(TX.errores[r.error] ?? TX.errores.incompleta)}
        </p>
      )}

      {r.ok && (
        <>
          <div className={`grid gap-2 mb-4 ${r.resultados.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {r.resultados.map(res => (
              <div key={res.etiqueta} className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3">
                <p className="text-green-300/70 text-[11px] uppercase tracking-widest font-bold mb-1">{res.etiqueta}</p>
                <p className="text-white text-2xl font-black tabular-nums">{res.valor}</p>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-2">{tr(TX.pasos)}</h2>
            <ol className="space-y-1.5">
              {r.pasos.map((p, i) => (
                <li key={i} className="text-white/80 text-[14.5px] leading-relaxed tabular-nums break-words">{p}</li>
              ))}
            </ol>
          </section>

          <button type="button" onClick={copiar}
            className="mt-5 text-sm font-bold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors">
            {tr(copiado ? TX.copiado : TX.copiar)}
          </button>
        </>
      )}

      {/* Enlazado interno entre las variantes. */}
      <nav className="mt-10 pt-6 border-t border-white/10">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr(TX.otrosTipos)}</p>
        <div className="flex flex-wrap gap-2">
          {TIPOS.filter(t => t.slug !== tipo.slug).map(t => (
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
          <Link to={localPath('/recursos/mcm-mcd')} className="text-sm font-bold px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white">{tr(TX.mcm)}</Link>
          <Link to={localPath('/recursos/ecuaciones')} className="text-sm font-bold px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white">{tr(TX.ecuaciones)}</Link>
          <Link to={localPath('/estudiar/matematicas')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr(TX.mates)}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.mas)}</Link>
        </div>
      </div>
    </div>
  )
}
