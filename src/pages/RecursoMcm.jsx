import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import SEOEstatico from '../components/SEOEstatico'
import { TIPOS, tipoPorSlug, rutaDe, EJEMPLOS, resolver } from '../lib/recursoMcm'

// /recursos/mcm-mcd — el alumno escribe sus números y ve la factorización, el
// m.c.m. y el m.c.d., paso a paso. La matemática está en lib/recursoMcm.js.
// Los números van a la URL (?n=…) para poder mandar el enlace del ejercicio.
// Una URL por tipo (m.c.m., m.c.d.): el cálculo es el mismo, cambia el enfoque.

const TX = {
  recursos: { es: 'Recursos', en: 'Resources', ca: 'Recursos' },
  numeros: { es: 'Números', en: 'Numbers', ca: 'Números' },
  ayuda: { es: 'Escribe dos o más números enteros, separados por comas o espacios: 12, 18, 24.', en: 'Type two or more whole numbers, separated by commas or spaces: 12, 18, 24.', ca: 'Escriu dos o més números enters, separats per comes o espais: 12, 18, 24.' },
  ejemplos: { es: 'Ejemplos', en: 'Examples', ca: 'Exemples' },
  factorizacion: { es: 'Factorización en primos', en: 'Prime factorisation', ca: 'Factorització en primers' },
  reglaMcm: { es: 'm.c.m. — cada factor primo al MAYOR exponente', en: 'LCM — every prime factor to its HIGHEST power', ca: 'm.c.m. — cada factor primer al MAJOR exponent' },
  reglaMcd: { es: 'm.c.d. — solo los factores comunes, al MENOR exponente', en: 'GCD — only the common factors, to their LOWEST power', ca: 'm.c.d. — només els factors comuns, al MENOR exponent' },
  coprimos: { es: 'No tienen factores primos comunes, así que su m.c.d. es 1 (son primos entre sí).', en: 'They share no prime factors, so their GCD is 1 (they are coprime).', ca: 'No tenen factors primers comuns, així que el seu m.c.d. és 1 (són primers entre si).' },
  copiar: { es: '🔗 Copiar enlace a este ejercicio', en: '🔗 Copy link to this exercise', ca: "🔗 Copiar l'enllaç a aquest exercici" },
  copiado: { es: '✓ Enlace copiado', en: '✓ Link copied', ca: '✓ Enllaç copiat' },
  otrosTipos: { es: 'Otras calculadoras', en: 'Other calculators', ca: 'Altres calculadores' },
  practica: { es: 'Más recursos de matemáticas', en: 'More maths resources', ca: 'Més recursos de matemàtiques' },
  ecuaciones: { es: '⚖️ Ecuaciones', en: '⚖️ Equations', ca: '⚖️ Equacions' },
  estadistica: { es: '📊 Estadística', en: '📊 Statistics', ca: '📊 Estadística' },
  mates: { es: '🧮 Estudiar matemáticas', en: '🧮 Study maths', ca: '🧮 Estudiar matemàtiques' },
  mas: { es: '🧰 Todos los recursos', en: '🧰 All resources', ca: '🧰 Tots els recursos' },
  errores: {
    pocos: { es: 'Escribe al menos dos números.', en: 'Type at least two numbers.', ca: 'Escriu almenys dos números.' },
    muchos: { es: 'Demasiados números (máximo 8).', en: 'Too many numbers (max 8).', ca: 'Massa números (màxim 8).' },
    invalido: { es: 'Solo números enteros, sin decimales ni signos.', en: 'Whole numbers only, no decimals or signs.', ca: 'Només números enters, sense decimals ni signes.' },
    rango: { es: 'Usa números entre 1 y 100000.', en: 'Use numbers between 1 and 100000.', ca: 'Fes servir números entre 1 i 100000.' },
  },
}

export default function RecursoMcm() {
  const { tipo } = useParams()
  return <Recurso key={tipo ?? ''} slug={tipo} />
}

function Recurso({ slug }) {
  const { tr, localPath } = useLang()
  const tipo = tipoPorSlug(slug) ?? TIPOS[0]
  const [params, setParams] = useSearchParams()
  const [texto, setTexto] = useState(() => params.get('n') ?? EJEMPLOS[0])
  const [copiado, setCopiado] = useState(false)

  const r = useMemo(() => resolver(texto), [texto])

  function cambiar(t) {
    setTexto(t)
    setParams({ n: t }, { replace: true })
  }

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}?${new URLSearchParams({ n: texto })}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* sin permiso de portapapeles: el enlace sigue en la barra */ }
  }

  const caja = 'rounded-xl border px-3 py-2 text-white text-lg font-semibold tabular-nums outline-none transition-colors w-full'

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <SEOEstatico path={rutaDe(tipo)} />

      <p className="text-white/35 text-xs mb-3">
        <Link to={localPath('/recursos')} className="hover:text-white/60">{tr(TX.recursos)}</Link>
      </p>
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">{tipo.emoji} {tr(tipo.titulo)}</h1>
      <p className="text-white/55 text-[15px] leading-relaxed mb-5">{tr(tipo.intro)}</p>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 mb-5 space-y-3">
        <p className="text-white/45 text-xs font-semibold uppercase tracking-widest">{tr(TX.numeros)}</p>
        <input value={texto} onChange={e => cambiar(e.target.value)} placeholder="12, 18"
          aria-label={tr(TX.numeros)} aria-invalid={!r.ok} inputMode="numeric" autoComplete="off" spellCheck={false}
          className={`${caja} bg-black/30 ${r.ok ? 'border-white/15 focus:border-[#EDAE49]' : 'border-red-500/70 focus:border-red-400'}`} />
        <p className="text-white/30 text-xs leading-relaxed">{tr(TX.ayuda)}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-white/35 text-xs mr-1">{tr(TX.ejemplos)}:</span>
          {EJEMPLOS.map(ej => (
            <button key={ej} type="button" onClick={() => cambiar(ej)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">{ej}</button>
          ))}
        </div>
      </section>

      {!r.ok && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-semibold px-4 py-3 mb-5">
          ⚠️ {tr(TX.errores[r.error] ?? TX.errores.invalido)}
        </p>
      )}

      {r.ok && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 px-4 py-3">
              <p className="text-sky-300/70 text-[11px] uppercase tracking-widest font-bold mb-1">m.c.m.</p>
              <p className="text-white text-2xl font-black tabular-nums">{r.mcm}</p>
            </div>
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3">
              <p className="text-green-300/70 text-[11px] uppercase tracking-widest font-bold mb-1">m.c.d.</p>
              <p className="text-white text-2xl font-black tabular-nums">{r.mcd}</p>
            </div>
          </div>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-3">
            <h2 className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-2">{tr(TX.factorizacion)}</h2>
            <ul className="space-y-1">
              {r.factorTexto.map(t => (
                <li key={t} className="text-white/85 text-[15px] font-semibold tabular-nums">{t}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-3">
            <h2 className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-2">{tr(TX.reglaMcm)}</h2>
            <p className="text-white text-[15px] font-semibold tabular-nums">m.c.m. = {r.mcmTexto}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-2">{tr(TX.reglaMcd)}</h2>
            <p className="text-white text-[15px] font-semibold tabular-nums">m.c.d. = {r.mcdTexto}</p>
            {r.coprimos && <p className="text-white/50 text-xs leading-relaxed mt-2">{tr(TX.coprimos)}</p>}
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
          <Link to={localPath('/recursos/ecuaciones')} className="text-sm font-bold px-4 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white">{tr(TX.ecuaciones)}</Link>
          <Link to={localPath('/recursos/estadistica')} className="text-sm font-bold px-4 py-2 rounded-xl bg-sky-600/80 hover:bg-sky-600 text-white">{tr(TX.estadistica)}</Link>
          <Link to={localPath('/estudiar/matematicas')} className="text-sm font-bold px-4 py-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white">{tr(TX.mates)}</Link>
          <Link to={localPath('/recursos')} className="text-sm font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white">{tr(TX.mas)}</Link>
        </div>
      </div>
    </div>
  )
}
