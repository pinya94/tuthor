import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats } from '../lib/activity'
import { construirTemario, contarTemario, temasTocados } from '../lib/temario'
import SEOHead from '../components/SEOHead'

// ── /temario: la página que enseña TODO ──────────────────────────────────────
//
// La que faltaba. Tuthor tenía 137 exámenes y ni una sola página que los
// listara: se llegaba a ellos desde la ficha de un tema, desde Google o desde
// una tarea del profesor, y punto. Un padre que quería ver de qué se examina
// su hijo no tenía dónde mirar.
//
// Se lee de arriba abajo en tres alturas, y esa es toda la idea:
//
//   1. una línea con las cifras    → "¿cuánto hay?"     (dos segundos)
//   2. doce materias plegadas      → "¿de qué hay?"     (un vistazo)
//   3. una materia abierta         → "¿qué exactamente?" (cuando interesa)
//
// Plegadas por defecto a propósito. Con las doce abiertas son 223 filas y la
// página vuelve a ser el muro que se quería evitar; plegadas, la primera
// pantalla ES el índice completo del producto.
//
// Todo el contenido sale de lib/temario.js, que lo deriva de los registros.
// Aquí no hay ni un nombre de tema escrito a mano.

const PANEL = 'rounded-2xl border border-white/10 bg-[#0b1120]/95'

function Cifra({ n, label }) {
  return (
    <div className="text-center">
      <p className="text-white font-black text-2xl sm:text-3xl leading-none">{n}</p>
      <p className="text-white/45 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-1">{label}</p>
    </div>
  )
}

function Actividad({ f, localPath }) {
  return (
    <Link
      to={localPath(f.ruta)}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-violet-600/20 hover:border-violet-400/40 px-2.5 py-1.5 text-[12.5px] font-semibold text-white/75 hover:text-white transition-colors"
    >
      <span aria-hidden="true">{f.emoji}</span>
      {f.label}
    </Link>
  )
}

function Tema({ tema, tocado, localPath, tr }) {
  return (
    <div className="py-3 border-t border-white/[0.07] first:border-t-0">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-white font-bold text-[14.5px]">{tema.label}</h3>
        {tocado && (
          <span
            className="shrink-0 rounded-full bg-emerald-500/15 text-emerald-300 text-[10.5px] font-bold px-2 py-0.5"
            // "Empezado", no "completado": ver el comentario de temasTocados
            // en lib/temario.js — hay formatos que no pueden decir qué tema se
            // jugó, así que afirmar completitud sería mentir a veces.
            title={tr({ es: 'Ya has hecho algo de este tema', en: 'You have done something on this topic', ca: "Ja has fet alguna cosa d'aquest tema" })}
          >
            ✓ {tr({ es: 'Empezado', en: 'Started', ca: 'Començat' })}
          </span>
        )}
        <span className="ml-auto shrink-0 text-white/30 text-xs">
          {tema.formatos.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tema.formatos.map(f => <Actividad key={f.id} f={f} localPath={localPath} />)}
      </div>
    </div>
  )
}

function Materia({ materia, abierta, onToggle, tocados, localPath, tr }) {
  const hechos = materia.temas.filter(t => tocados.has(`${materia.id}/${t.id}`)).length
  return (
    <section className={PANEL}>
      <button
        onClick={onToggle}
        aria-expanded={abierta}
        className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-left hover:bg-white/[0.03] transition-colors rounded-2xl"
      >
        <span className="text-2xl shrink-0" aria-hidden="true">{materia.emoji}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-white font-black text-[15.5px] truncate">{materia.label}</span>
          <span className="block text-white/45 text-xs mt-0.5">
            {materia.temas.length} {tr({ es: 'temas', en: 'topics', ca: 'temes' })}
            {' · '}
            {materia.numActividades} {tr({ es: 'actividades', en: 'activities', ca: 'activitats' })}
            {hechos > 0 && (
              <span className="text-emerald-400/80 font-semibold">
                {' · '}{hechos} {tr({ es: 'empezados', en: 'started', ca: 'començats' })}
              </span>
            )}
          </span>
        </span>
        <svg
          className={`w-4 h-4 shrink-0 text-white/40 transition-transform ${abierta ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {abierta && (
        <div className="px-4 sm:px-5 pb-4">
          {materia.temas.map(t => (
            <Tema
              key={t.id}
              tema={t}
              tocado={tocados.has(`${materia.id}/${t.id}`)}
              localPath={localPath}
              tr={tr}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default function Temario() {
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()
  const [abiertas, setAbiertas] = useState(() => new Set())
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (user) getStats(user.uid).then(setStats).catch(() => {})
  }, [user])

  // Reconstruir el mapa entero son ~223 combinaciones: barato, pero no hace
  // falta repetirlo en cada render por cambiar un desplegable.
  // Sin filtrar por curso, y es deliberado: solo 21 de los 98 temas declaran
  // curso en el catálogo, así que un selector aquí dejaría diez materias
  // intactas sin decirlo. Ver filtrarPorNivel() en lib/temario.js para qué
  // falta para encenderlo. Esta página promete el mapa COMPLETO; que lo sea.
  const temario = useMemo(() => construirTemario(lang), [lang])
  const cifras = useMemo(() => contarTemario(temario), [temario])
  const tocados = useMemo(() => temasTocados(stats), [stats])

  function toggle(id) {
    setAbiertas(prev => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id); else s.add(id)
      return s
    })
  }

  const todasAbiertas = abiertas.size === temario.length && temario.length > 0

  const seo = {
    es: {
      title: 'Temario completo: todas las materias, temas y exámenes',
      desc: 'El índice completo de Tuthor: materias, temas y actividades de Primaria, ESO y Bachillerato. Juegos y exámenes tipo test, gratis y sin registro.',
    },
    en: {
      title: 'Full syllabus: every subject, topic and quiz',
      desc: 'The complete index of Tuthor: subjects, topics and activities for primary and secondary school. Games and quizzes, free and with no sign-up.',
    },
    ca: {
      title: 'Temari complet: totes les matèries, temes i exàmens',
      desc: "L'índex complet de Tuthor: matèries, temes i activitats de Primària, ESO i Batxillerat. Jocs i exàmens tipus test, gratis i sense registre.",
    },
  }[lang] || {}

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <SEOHead title={seo.title} description={seo.desc} path="/temario" lang={lang} />

      <header className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {tr({ es: 'Todo lo que hay en Tuthor', en: 'Everything in Tuthor', ca: 'Tot el que hi ha a Tuthor' })}
        </h1>
        <p className="text-white/45 text-sm mt-1.5">
          {tr({
            es: 'El índice completo, de Primaria a Bachillerato. Toca una materia para desplegarla.',
            en: 'The complete index, from primary to sixth form. Tap a subject to open it.',
            ca: "L'índex complet, de Primària a Batxillerat. Toca una matèria per desplegar-la.",
          })}
        </p>
      </header>

      {/* Las cifras, arriba del todo: es la respuesta de dos segundos a
          "¿cuánto hay aquí?". Se cuentan del mapa, no se escriben a mano —
          mismo motivo que en lib/cifras.js para la landing. */}
      <div className={`${PANEL} grid grid-cols-3 divide-x divide-white/[0.07] py-4 mb-5`}>
        <Cifra n={cifras.materias} label={tr({ es: 'materias', en: 'subjects', ca: 'matèries' })} />
        <Cifra n={cifras.temas} label={tr({ es: 'temas', en: 'topics', ca: 'temes' })} />
        <Cifra n={cifras.actividades} label={tr({ es: 'actividades', en: 'activities', ca: 'activitats' })} />
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-end mb-4">
        <button
          onClick={() => setAbiertas(todasAbiertas ? new Set() : new Set(temario.map(m => m.id)))}
          className="text-violet-300/80 hover:text-violet-300 text-sm font-bold transition-colors"
        >
          {todasAbiertas
            ? tr({ es: 'Plegar todo', en: 'Collapse all', ca: 'Plegar-ho tot' })
            : tr({ es: 'Desplegar todo', en: 'Expand all', ca: 'Desplegar-ho tot' })}
        </button>
      </div>

      <div className="space-y-2.5">
        {temario.map(m => (
          <Materia
            key={m.id}
            materia={m}
            abierta={abiertas.has(m.id)}
            onToggle={() => toggle(m.id)}
            tocados={tocados}
            localPath={localPath}
            tr={tr}
          />
        ))}
      </div>

      <p className="text-white/30 text-xs text-center mt-8 leading-relaxed">
        {tr({
          es: 'Todo es gratis y se puede jugar sin cuenta. La cuenta solo hace falta para guardar el progreso.',
          en: 'Everything is free and playable without an account. An account is only needed to save progress.',
          ca: 'Tot és gratis i es pot jugar sense compte. El compte només cal per desar el progrés.',
        })}
      </p>
    </div>
  )
}
