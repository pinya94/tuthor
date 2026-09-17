import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { TIPOS, MODOS, tipoPorSlug, rutaDe } from '../lib/recursoFracciones'

// /recursos/fracciones — sumar, restar, multiplicar, dividir y simplificar
// fracciones, paso a paso. La matemática (exacta) está en lib/recursoFracciones.
// Los datos van a la URL (?m=modo&a=…&b=…) para mandar el enlace del ejercicio.

const ORDEN = ['suma-resta', 'multiplicar-dividir', 'simplificar']
const clavesDe = m => MODOS[m].slots.flatMap(s => [s.n, s.d])

const MODO_TX = {
  'suma-resta': { es: 'Sumar y restar', en: 'Add & subtract', ca: 'Sumar i restar' },
  'multiplicar-dividir': { es: 'Multiplicar y dividir', en: 'Multiply & divide', ca: 'Multiplicar i dividir' },
  'simplificar': { es: 'Simplificar', en: 'Simplify', ca: 'Simplificar' },
}

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  pasos: { es: 'Paso a paso', en: 'Step by step', ca: 'Pas a pas' },
  copiar: { es: '🔗 Copiar enlace a este ejercicio', en: '🔗 Copy link to this exercise', ca: "🔗 Copiar l'enllaç a aquest exercici" },
  copiado: { es: '✓ Enlace copiado', en: '✓ Link copied', ca: '✓ Enllaç copiat' },
  otrosTipos: { es: 'Otras calculadoras', en: 'Other calculators', ca: 'Altres calculadores' },
  practica: { es: 'Más recursos de matemáticas', en: 'More maths resources', ca: 'Més recursos de matemàtiques' },
  porcentajes: { es: '💯 Porcentajes', en: '💯 Percentages', ca: '💯 Percentatges' },
  mcm: { es: '🔢 m.c.m. y m.c.d.', en: '🔢 LCM and GCD', ca: '🔢 m.c.m. i m.c.d.' },
  mates: { es: '🧮 Estudiar matemáticas', en: '🧮 Study maths', ca: '🧮 Estudiar matemàtiques' },
  mas: { es: '🧰 Todos los recursos', en: '🧰 All resources', ca: '🧰 Tots els recursos' },
  errores: {
    incompleta: { es: 'Rellena numeradores y denominadores con números enteros (el denominador, ≥ 1).', en: 'Fill numerators and denominators with whole numbers (denominator ≥ 1).', ca: 'Omple numeradors i denominadors amb números enters (el denominador, ≥ 1).' },
    cero: { es: 'No se puede dividir entre una fracción que vale 0.', en: 'You cannot divide by a fraction equal to 0.', ca: 'No es pot dividir per una fracció que val 0.' },
  },
}

export default function RecursoFracciones() {
  const { tipo } = useParams()
  return <Recurso key={tipo ?? ''} slug={tipo} />
}

function FraccionInput({ v, dn, valores, onCambio, invalido }) {
  const casilla = `w-20 text-center bg-black/30 border rounded-lg px-2 py-2 text-white text-lg font-semibold tabular-nums outline-none transition-colors ${
    invalido ? 'border-red-500/70 focus:border-red-400' : 'border-white/15 focus:border-[#EDAE49]'}`
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <input value={valores[v] ?? ''} onChange={e => onCambio(v, e.target.value)} placeholder="1" aria-label={`numerador ${v}`}
        inputMode="numeric" autoComplete="off" spellCheck={false} className={casilla} />
      <div className="w-full h-0.5 bg-white/50 rounded" />
      <input value={valores[dn] ?? ''} onChange={e => onCambio(dn, e.target.value)} placeholder="2" aria-label={`denominador ${dn}`}
        inputMode="numeric" autoComplete="off" spellCheck={false} className={casilla} />
    </div>
  )
}

function Recurso({ slug }) {
  const { lang, tr, localPath } = useLang()
  const tipo = tipoPorSlug(slug) ?? TIPOS[0]
  const [params, setParams] = useSearchParams()
  const modoInicial = MODOS[params.get('m')] ? params.get('m') : tipo.modo
  const [modo, setModo] = useState(modoInicial)
  const [valores, setValores] = useState(() => {
    const claves = clavesDe(modoInicial)
    return claves.some(k => params.get(k) !== null)
      ? Object.fromEntries(claves.map(k => [k, params.get(k) ?? '']))
      : { ...MODOS[modoInicial].ejemplo }
  })
  const [copiado, setCopiado] = useState(false)

  const r = useMemo(() => MODOS[modo].calcular(valores, lang), [modo, valores, lang])

  const escribirUrl = (m, vals) => setParams({ m, ...Object.fromEntries(clavesDe(m).map(k => [k, vals[k] ?? ''])) }, { replace: true })
  function cambiarCampo(id, val) { const vals = { ...valores, [id]: val }; setValores(vals); escribirUrl(modo, vals) }
  function cambiarModo(m) { const vals = { ...MODOS[m].ejemplo }; setModo(m); setValores(vals); escribirUrl(m, vals) }

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}`
    try { await navigator.clipboard.writeText(url); setCopiado(true); setTimeout(() => setCopiado(false), 2000) } catch { /* sin permiso */ }
  }

  const M = MODOS[modo]

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
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {M.slots.map((s, i) => (
            <div key={s.n} className="flex items-center gap-4">
              {i > 0 && M.op && <span className="text-white/70 text-2xl font-black">{M.op}</span>}
              <FraccionInput v={s.n} dn={s.d} valores={valores} onCambio={cambiarCampo} invalido={!r.ok} />
            </div>
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
                <p className="text-green-300/70 text-[13px] font-bold mb-1 tabular-nums">{res.etiqueta}</p>
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
          <Link to={localPath('/recursos/porcentajes')} className="text-sm font-bold px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white">{tr(TX.porcentajes)}</Link>
          <Link to={localPath('/recursos/mcm-mcd')} className="text-sm font-bold px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white">{tr(TX.mcm)}</Link>
          <Link to={localPath('/estudiar/matematicas')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr(TX.mates)}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.mas)}</Link>
        </div>
      </div>
    </div>
  )
}
