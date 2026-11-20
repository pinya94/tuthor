// «Jugar con la clase» en dos pasos (20-nov-2026, idea del usuario: «que sea
// como entrar y jugar»): 1) eliges el juego en una cuadrícula con su dibujo;
// 2) «📺 Empezar en directo» abre la pizarra con el código, o «🏠 Mandarlo
// para casa» lo deja de deberes. Clase, nivel, preguntas y segundos vienen
// puestos (la última clase, medio, 10, 30 s) y se cambian en «Ajustes».
// El formulario completo (ranking libre, nota, nombre…) sigue en RetosPanel,
// plegado en «Más opciones».
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { EXAMS, examLabel } from '../../lib/exams'
import { RETOS_EXAMENES, RETOS_TEST, sinColetilla } from '../../data/retosExamenes'
import { SEGUNDOS, N_PREGUNTAS } from '../../lib/apodo'
import { crearReto } from '../../lib/rankingClase'
import { getTeacherClasses } from '../../lib/classes'
import { SUBJECT_DEFS } from '../../lib/statsAggregation'
import { MAS_JUGADOS } from '../../data/destacados'
import { GAMES } from '../../data/constants'
import { ARTE_JUEGOS, ArteJuego } from '../arte'
import { trackEvent } from '../../lib/analytics'

const NIVELES = [
  { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' } },
  { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' } },
  { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' } },
]
const CATALOGO = Object.fromEntries(GAMES.filter(g => g.path).map(g => [g.path.replace(/^\/juegos\//, ''), g]))
const sinTildes = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const chip = on => `rounded-xl border px-3 py-1.5 text-sm font-bold ${on ? 'border-teal-400 bg-teal-500/20 text-white' : 'border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'}`
const CLAVE_CLASE = 'tuthor_ultima_clase_reto'

// Cada examen que se puede mandar, con su dibujo si es el de un juego
function useOpciones(lang, lt) {
  return useMemo(() => {
    const rango = s => { const i = MAS_JUGADOS.indexOf(s); return i < 0 ? 999 : i }
    const juego = id => {
      const slug = id.replace(/-test$/, '')
      return ARTE_JUEGOS[slug] ? slug : null
    }
    const mk = (id, test) => {
      const slug = test ? null : juego(id)
      const g = slug && CATALOGO[slug]
      return { id, slug, test, materia: EXAMS[id]?.subject, emoji: EXAMS[id]?.emoji ?? '🎮',
        titulo: g ? lt(g) : sinColetilla(examLabel(id, lang)), rango: slug ? rango(slug) : 999 }
    }
    return {
      juegos: RETOS_EXAMENES.filter(id => EXAMS[id]).map(id => mk(id, false)).sort((a, b) => a.rango - b.rango || a.titulo.localeCompare(b.titulo, lang)),
      tests: RETOS_TEST.filter(id => EXAMS[id]).map(id => mk(id, true)).sort((a, b) => a.titulo.localeCompare(b.titulo, lang)),
    }
  }, [lang, lt])
}

export default function JugarConClase({ uid, classId: claseFija, nombreClase: nombreFijo = '', examenInicial }) {
  const { tr, lang, lt, localPath } = useLang()
  const navigate = useNavigate()
  const { juegos, tests } = useOpciones(lang, lt)
  const todos = useMemo(() => [...juegos, ...tests], [juegos, tests])
  const [elegido, setElegido] = useState(() => todos.find(x => x.id === examenInicial) ?? null)
  const [busca, setBusca] = useState('')
  const [materia, setMateria] = useState('')
  const [conTests, setConTests] = useState(false)
  const [nivel, setNivel] = useState(1)
  const [nPreguntas, setNPreguntas] = useState(10)
  const [segundos, setSegundos] = useState(30)
  const [clases, setClases] = useState(null)
  const [claseElegida, setClaseElegida] = useState('')
  const [creando, setCreando] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (claseFija) return
    let vivo = true
    getTeacherClasses(uid).then(c => {
      if (!vivo) return
      setClases(c)
      let ultima = ''
      try { ultima = localStorage.getItem(CLAVE_CLASE) || '' } catch { /* sin almacenamiento */ }
      setClaseElegida(c.some(x => x.id === ultima) ? ultima : (c[0]?.id ?? ''))
    }).catch(() => { if (vivo) setClases([]) })
    return () => { vivo = false }
  }, [uid, claseFija])
  const classId = claseFija ?? (claseElegida || undefined)
  const nombreClase = claseFija ? nombreFijo : (clases?.find(c => c.id === claseElegida)?.name ?? '')

  const filtra = lista => {
    const q = sinTildes(busca.trim())
    return lista.filter(x => (!materia || x.materia === materia) && (!q || sinTildes(x.titulo).includes(q)))
  }
  const materias = SUBJECT_DEFS.filter(m => todos.some(x => x.materia === m.id))

  const empieza = async modo => {
    if (!elegido) return
    setCreando(modo); setError('')
    try {
      if (classId) { try { localStorage.setItem(CLAVE_CLASE, classId) } catch { /* sin almacenamiento */ } }
      const fecha = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10)
      const nombre = `${elegido.titulo}${nombreClase ? ` · ${nombreClase}` : ''}`
      const codigo = await crearReto(uid, { nombre, modo, examen: elegido.id, nivel, nPreguntas, segundos, nota: '', classId, claseNombre: nombreClase, fecha })
      trackEvent('jugar_con_clase', { item_id: elegido.id, modo })
      navigate(localPath(modo === 'directo' ? `/reto/${codigo}` : `/profesor/reto/${codigo}`))
    } catch {
      setError(tr({ es: 'No se ha podido crear. Prueba otra vez.', en: 'It couldn’t be created. Try again.', ca: 'No s’ha pogut crear. Torna-ho a provar.' }))
      setCreando('')
    }
  }

  // Paso 2: el juego ya elegido
  if (elegido) {
    return (
      <div className="rounded-2xl border border-teal-400/40 bg-[#141b2e] overflow-hidden">
        <div className="grid sm:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-video sm:aspect-auto sm:min-h-[220px] bg-black/20">
            {elegido.slug ? <ArteJuego slug={elegido.slug} className="absolute inset-0 w-full h-full p-3" />
              : <span className="absolute inset-0 grid place-items-center text-7xl">{elegido.emoji}</span>}
          </div>
          <div className="p-5 flex flex-col gap-3">
            <button type="button" onClick={() => setElegido(null)} className="self-start text-white/50 hover:text-white text-xs font-bold">← {tr({ es: 'Elegir otro juego', en: 'Choose another game', ca: 'Triar un altre joc' })}</button>
            <h3 className="text-white font-black text-2xl leading-tight">{elegido.titulo}</h3>
            {!claseFija && clases && clases.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {clases.map(c => <button key={c.id} type="button" onClick={() => setClaseElegida(c.id)} className={chip(claseElegida === c.id)}>🏫 {c.name}</button>)}
                <button type="button" onClick={() => setClaseElegida('')} className={chip(!claseElegida)}>{tr({ es: 'Sin clase', en: 'No class', ca: 'Sense classe' })}</button>
              </div>
            )}
            <button type="button" disabled={!!creando} onClick={() => empieza('directo')}
              className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-lg py-3.5 disabled:opacity-50">
              {creando === 'directo' ? '…' : `📺 ${tr({ es: 'Empezar en directo', en: 'Start live', ca: 'Començar en directe' })}`}
            </button>
            <p className="text-white/45 text-xs -mt-1">{tr({ es: 'Se abre la pizarra con el código: proyéctala y tus alumnos entran desde el móvil, sin cuenta.', en: 'The board opens with the code: project it and students join from their phones, no account.', ca: 'S’obre la pissarra amb el codi: projecta-la i els alumnes entren des del mòbil, sense compte.' })}</p>
            <button type="button" disabled={!!creando} onClick={() => empieza('deberes')}
              className="w-full rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold py-2.5 disabled:opacity-50">
              {creando === 'deberes' ? '…' : `🏠 ${tr({ es: 'Mandarlo para casa (una semana)', en: 'Set it as homework (one week)', ca: 'Enviar-ho per a casa (una setmana)' })}`}
            </button>
            {error && <p className="text-red-300 text-sm">{error}</p>}
            <details className="text-sm">
              <summary className="cursor-pointer text-white/50 hover:text-white/80 font-bold">⚙️ {tr({ es: 'Ajustes', en: 'Settings', ca: 'Ajustos' })} · {NIVELES[nivel].emoji} {tr(NIVELES[nivel].label)} · {nPreguntas} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · {segundos} s</summary>
              <div className="mt-3 space-y-3">
                <div className="flex flex-wrap gap-1.5">{NIVELES.map((n, i) => <button key={i} type="button" onClick={() => setNivel(i)} className={chip(nivel === i)}>{n.emoji} {tr(n.label)}</button>)}</div>
                <div className="flex flex-wrap gap-1.5 items-center"><span className="text-white/45 text-xs">{tr({ es: 'Preguntas', en: 'Questions', ca: 'Preguntes' })}</span>{N_PREGUNTAS.map(n => <button key={n} type="button" onClick={() => setNPreguntas(n)} className={chip(nPreguntas === n)}>{n}</button>)}</div>
                <div className="flex flex-wrap gap-1.5 items-center"><span className="text-white/45 text-xs">{tr({ es: 'Segundos (en directo)', en: 'Seconds (live)', ca: 'Segons (en directe)' })}</span>{SEGUNDOS.map(n => <button key={n} type="button" onClick={() => setSegundos(n)} className={chip(segundos === n)}>{n}</button>)}</div>
              </div>
            </details>
          </div>
        </div>
      </div>
    )
  }

  // Paso 1: elegir el juego
  const listaJuegos = filtra(juegos), listaTests = filtra(tests)
  return (
    <div>
      <input value={busca} onChange={e => setBusca(e.target.value)}
        placeholder={tr({ es: '🔍 Busca un juego o un tema', en: '🔍 Search a game or topic', ca: '🔍 Busca un joc o un tema' })}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none focus:border-teal-500" />
      <div className="flex gap-1.5 overflow-x-auto py-2">
        <button type="button" onClick={() => setMateria('')} className={`shrink-0 ${chip(!materia)}`}>🔥 {tr({ es: 'Todos', en: 'All', ca: 'Tots' })}</button>
        {materias.map(m => <button key={m.id} type="button" onClick={() => setMateria(m.id)} className={`shrink-0 ${chip(materia === m.id)}`}>{m.emoji} {tr(m.label)}</button>)}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-1">
        {listaJuegos.map(x => (
          <button key={x.id} type="button" onClick={() => setElegido(x)}
            className="group text-left rounded-xl overflow-hidden bg-[#141b2e] border border-white/[0.08] hover:border-teal-400/60 transition-colors">
            <span className="block aspect-video bg-black/20 relative">
              {x.slug ? <ArteJuego slug={x.slug} className="absolute inset-0 w-full h-full p-1.5" /> : <span className="absolute inset-0 grid place-items-center text-4xl">{x.emoji}</span>}
            </span>
            <span className="block px-3 py-2 text-white text-xs font-bold leading-tight line-clamp-2">{x.titulo}</span>
          </button>
        ))}
      </div>
      {listaJuegos.length === 0 && listaTests.length === 0 && <p className="text-white/40 text-sm py-3">{tr({ es: 'Nada con ese nombre.', en: 'Nothing with that name.', ca: 'Res amb aquest nom.' })}</p>}
      {listaTests.length > 0 && (
        <div className="mt-4">
          <button type="button" onClick={() => setConTests(v => !v)} className="text-white/55 hover:text-white text-sm font-bold">
            {conTests ? '▾' : '▸'} {tr({ es: `Exámenes tipo test (${listaTests.length})`, en: `Multiple-choice quizzes (${listaTests.length})`, ca: `Exàmens tipus test (${listaTests.length})` })}
          </button>
          {(conTests || busca.trim()) && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 mt-2">
              {listaTests.map(x => (
                <button key={x.id} type="button" onClick={() => setElegido(x)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-white/85 hover:bg-white/[0.08]">
                  <span className="text-lg shrink-0">{x.emoji}</span><span className="truncate">{x.titulo}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
