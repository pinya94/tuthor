// Crear y ver los retos de clase. Solo en la zona del profe: la pestaña
// «Retos» del panel (/profesor?tab=retos, todos) y la de cada clase (con su
// classId). El alumno no ve nada de esto: entra por /reto con el código.
// Tres modos:
//   📺 en directo  la pizarra lleva la partida y los alumnos responden en el móvil
//   🏠 deberes     un examen con nota del profe; cada uno lo hace en casa
//   🏆 ranking     sus récords de cualquier juego, toda la semana
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { EXAMS, examLabel } from '../../lib/exams'
import { RETOS_TODOS, esTest, sinColetilla } from '../../data/retosExamenes'
import { SEGUNDOS, N_PREGUNTAS } from '../../lib/apodo'
import { crearReto, misRankings } from '../../lib/rankingClase'
import { getTeacherClasses } from '../../lib/classes'
import { SUBJECT_DEFS } from '../../lib/statsAggregation'
import VideoRetos from '../VideoRetos'

const MODOS = [
  { id: 'directo', emoji: '📺', label: { es: 'En directo', en: 'Live', ca: 'En directe' },
    desc: { es: 'Lo proyectas y cada uno responde en su móvil, con tiempo por pregunta.', en: 'You project it and everyone answers on their phone, against the clock.', ca: 'Ho projectes i cadascú respon al mòbil, amb temps per pregunta.' } },
  { id: 'deberes', emoji: '🏠', label: { es: 'Para casa', en: 'Homework', ca: 'Per a casa' },
    desc: { es: 'Cada uno hace el examen en casa; tú ves la nota de cada uno.', en: 'Everyone does the exam at home; you see each mark.', ca: 'Cadascú fa l’examen a casa; tu veus la nota de cadascú.' } },
  { id: 'ranking', emoji: '🏆', label: { es: 'Ranking libre', en: 'Open ranking', ca: 'Rànquing lliure' },
    desc: { es: 'Sus récords en cualquier juego suben solos, toda la semana.', en: 'Their best scores in any game go up on their own, all week.', ca: 'Els seus rècords a qualsevol joc pugen sols, tota la setmana.' } },
]
const NIVELES = [
  { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' } },
  { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' } },
  { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' } },
]
// La etiqueta del examen sin el «(con el juego)» del registro, que aquí sobra
const sinTildes = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

function SelectorJuego({ valor, onElige }) {
  const { tr, lang } = useLang()
  const [abierto, setAbierto] = useState(!valor)
  const [busca, setBusca] = useState('')
  const grupos = useMemo(() => {
    const q = sinTildes(busca.trim())
    const items = RETOS_TODOS.filter(id => EXAMS[id]).map(id => ({ id, emoji: EXAMS[id].emoji ?? '🎮', label: sinColetilla(examLabel(id, lang)), materia: EXAMS[id].subject, test: esTest(id) }))
      .filter(x => !q || sinTildes(x.label).includes(q))
    return SUBJECT_DEFS.map(m => ({ m, items: items.filter(x => x.materia === m.id).sort((a, b) => a.test - b.test || a.label.localeCompare(b.label, lang)) }))
      .filter(g => g.items.length)
  }, [busca, lang])
  const elegido = valor && EXAMS[valor]
  if (!abierto && elegido) {
    return (
      <button type="button" onClick={() => setAbierto(true)} className="w-full flex items-center gap-3 rounded-xl border border-teal-400/60 bg-teal-500/10 px-3 py-2.5 text-left">
        <span className="text-2xl">{elegido.emoji}</span>
        <span className="flex-1 text-white font-black">{sinColetilla(examLabel(valor, lang))}</span>
        <span className="text-teal-300 text-xs font-bold">{tr({ es: 'Cambiar', en: 'Change', ca: 'Canviar' })}</span>
      </button>
    )
  }
  return (
    <div className="rounded-xl border border-white/10 bg-black/20">
      <input value={busca} onChange={e => setBusca(e.target.value)} autoFocus={!!valor}
        placeholder={tr({ es: '🔍 Busca un juego (fórmulas, verso, mapa…)', en: '🔍 Search a game (formulas, map, rhythm…)', ca: '🔍 Busca un joc (fórmules, vers, mapa…)' })}
        className="w-full rounded-t-xl border-b border-white/10 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/35 outline-none" />
      <div className="max-h-72 overflow-y-auto p-2 space-y-3">
        {grupos.length === 0 && <p className="text-white/40 text-sm px-1 py-2">{tr({ es: 'Ningún juego con ese nombre.', en: 'No game with that name.', ca: 'Cap joc amb aquest nom.' })}</p>}
        {grupos.map(({ m, items }) => (
          <div key={m.id}>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest px-1 mb-1">{m.emoji} {tr(m.label)}</p>
            <div className="grid sm:grid-cols-2 gap-1">
              {items.map(x => (
                <button key={x.id} type="button" onClick={() => { onElige(x.id); setAbierto(false); setBusca('') }}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm ${x.id === valor ? 'bg-teal-500/25 text-white font-bold' : 'text-white/85 hover:bg-white/[0.08]'}`}>
                  <span className="text-lg shrink-0">{x.emoji}</span><span className="truncate flex-1">{x.label}</span><span className={`shrink-0 text-[10px] font-bold rounded px-1.5 py-0.5 ${x.test ? 'bg-sky-500/15 text-sky-300' : 'bg-amber-400/15 text-amber-300'}`}>{x.test ? tr({ es: 'test', en: 'quiz', ca: 'test' }) : tr({ es: 'juego', en: 'game', ca: 'joc' })}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const campo = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500'
const chip = on => `rounded-xl border px-3 py-2 text-sm font-bold ${on ? 'border-teal-400 bg-teal-500/20 text-white' : 'border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'}`

// modoFijo: viene ya elegido desde «＋ Mandar a la clase» (no se enseña el selector)
// examenInicial: el juego ya elegido (desde el aviso «Juégalo en directo» de un juego)
export function CrearReto({ uid, classId: claseFija, nombreClase: nombreFijo = '', onCreado, modoFijo, examenInicial }) {
  const { tr, lang, localPath } = useLang()
  const navigate = useNavigate()
  const [modo, setModo] = useState(modoFijo ?? 'directo')
  // Para casa: fecha de entrega (por defecto, dentro de una semana)
  const [fecha, setFecha] = useState(() => new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10))
  const [examen, setExamen] = useState(() => (examenInicial && RETOS_TODOS.includes(examenInicial) ? examenInicial : ''))
  const [nivel, setNivel] = useState(1)
  const [nPreguntas, setNPreguntas] = useState(10)
  const [segundos, setSegundos] = useState(30)
  const [nota, setNota] = useState('')
  const [nombre, setNombre] = useState('')
  const [creando, setCreando] = useState(false)
  // Desde el panel se elige la clase (un reto de clase queda guardado en ella);
  // desde la pestaña de una clase ya viene puesta
  const [clases, setClases] = useState(null)
  const [claseElegida, setClaseElegida] = useState('')
  useEffect(() => {
    if (claseFija) return
    let vivo = true
    getTeacherClasses(uid).then(c => { if (vivo) { setClases(c); setClaseElegida(c[0]?.id ?? '') } }).catch(() => { if (vivo) setClases([]) })
    return () => { vivo = false }
  }, [uid, claseFija])
  const classId = claseFija ?? (claseElegida || undefined)
  const nombreClase = claseFija ? nombreFijo : (clases?.find(c => c.id === claseElegida)?.name ?? '')
  const [error, setError] = useState('')

  const crea = async e => {
    e.preventDefault()
    if (modo !== 'ranking' && !examen) { setError(tr({ es: 'Elige un juego.', en: 'Choose a game.', ca: 'Tria un joc.' })); return }
    setCreando(true); setError('')
    try {
      const porDefecto = modo === 'ranking' ? (nombreClase || tr({ es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' })) : `${sinColetilla(examLabel(examen, lang))}${nombreClase ? ` · ${nombreClase}` : ''}`
      const codigo = await crearReto(uid, { nombre: nombre.trim() || porDefecto, modo, examen, nivel, nPreguntas, segundos, nota, classId, claseNombre: nombreClase, fecha })
      onCreado?.(codigo)
      // En directo se abre la pizarra; lo demás, la página para compartirlo y ver resultados
      navigate(localPath(modo === 'directo' ? `/reto/${codigo}` : `/profesor/reto/${codigo}`))
    } catch { setError(tr({ es: 'No se ha podido crear. Prueba otra vez.', en: 'It couldn’t be created. Try again.', ca: 'No s’ha pogut crear. Torna-ho a provar.' })) }
    setCreando(false)
  }

  return (
    <form onSubmit={crea} className="space-y-4">
      {!modoFijo && <div className="grid gap-2 sm:grid-cols-3">
        {MODOS.map(m => (
          <button key={m.id} type="button" onClick={() => setModo(m.id)} className={`text-left rounded-2xl border p-3 ${modo === m.id ? 'border-teal-400 bg-teal-500/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'}`}>
            <span className="block text-white font-black">{m.emoji} {tr(m.label)}</span>
            <span className="block text-white/50 text-xs mt-0.5 leading-snug">{tr(m.desc)}</span>
          </button>
        ))}
      </div>}

      {!claseFija && clases && (
        <div>
          <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Clase', en: 'Class', ca: 'Classe' })}</span>
          <div className="flex flex-wrap gap-1.5">
            {clases.map(c => <button key={c.id} type="button" onClick={() => setClaseElegida(c.id)} className={chip(claseElegida === c.id)}>🏫 {c.name}</button>)}
            <button type="button" onClick={() => setClaseElegida('')} className={chip(!claseElegida)}>{tr({ es: 'Sin clase', en: 'No class', ca: 'Sense classe' })}</button>
          </div>
          <p className="text-white/35 text-[11px] mt-1">{claseElegida
            ? tr({ es: 'Se guardará en la clase: podrás emparejar los nombres con tu lista y pasar las notas.', en: 'It will be saved in the class: you can match names with your list and copy the marks.', ca: 'Es desarà a la classe: podràs aparellar els noms amb la llista i passar les notes.' })
            : tr({ es: 'Suelto: sin lista de clase ni notas.', en: 'Standalone: no class list or marks.', ca: 'Solt: sense llista de classe ni notes.' })}</p>
        </div>
      )}

      {modo !== 'ranking' && (
        <>
          <div>
            <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Juego', en: 'Game', ca: 'Joc' })}</span>
            <SelectorJuego valor={examen} onElige={setExamen} />
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Nivel', en: 'Level', ca: 'Nivell' })}</span>
              <div className="flex gap-1.5">{NIVELES.map((n, i) => <button key={i} type="button" onClick={() => setNivel(i)} className={chip(nivel === i)}>{n.emoji} {tr(n.label)}</button>)}</div>
            </div>
            <div>
              <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Preguntas', en: 'Questions', ca: 'Preguntes' })}</span>
              <div className="flex gap-1.5">{N_PREGUNTAS.map(n => <button key={n} type="button" onClick={() => setNPreguntas(n)} className={chip(nPreguntas === n)}>{n}</button>)}</div>
            </div>
            {modo === 'deberes' && (
              <label>
                <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Para el', en: 'Due', ca: 'Per al' })}</span>
                <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-teal-500 [color-scheme:dark]" />
              </label>
            )}
            {modo === 'directo' && (
              <div>
                <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Segundos por pregunta', en: 'Seconds per question', ca: 'Segons per pregunta' })}</span>
                <div className="flex flex-wrap gap-1.5">{SEGUNDOS.map(n => <button key={n} type="button" onClick={() => setSegundos(n)} className={chip(segundos === n)}>{n}</button>)}</div>
              </div>
            )}
          </div>
        </>
      )}

      <label className="block">
        <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Nota para los alumnos (opcional)', en: 'Note for students (optional)', ca: 'Nota per als alumnes (opcional)' })}</span>
        <textarea value={nota} onChange={e => setNota(e.target.value)} maxLength={400} rows={2} className={campo}
          placeholder={tr({ es: 'Ej.: Poned vuestro nombre y primer apellido, que lo voy a corregir. Hasta el viernes.', en: 'E.g.: Use your first name and surname, I’ll be marking it. Due Friday.', ca: 'Ex.: Poseu el vostre nom i primer cognom, que ho corregiré. Fins divendres.' })} />
      </label>
      <label className="block">
        <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Nombre (opcional)', en: 'Name (optional)', ca: 'Nom (opcional)' })}</span>
        <input value={nombre} onChange={e => setNombre(e.target.value)} maxLength={60} className={campo}
          placeholder={modo === 'ranking' ? (nombreClase || tr({ es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' })) : (examen ? `${sinColetilla(examLabel(examen, lang))}${nombreClase ? ` · ${nombreClase}` : ''}` : '')} />
      </label>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <button type="submit" disabled={creando} className="w-full rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black py-3 disabled:opacity-50">
        {creando ? '…' : modo === 'directo' ? `📺 ${tr({ es: 'Crear y abrir la pizarra', en: 'Create and open the board', ca: 'Crear i obrir la pissarra' })}` : `+ ${tr({ es: 'Crear', en: 'Create', ca: 'Crear' })}`}
      </button>
    </form>
  )
}

// Los retos ya creados (de esta clase si hay classId), con su modo
export function ListaRetos({ uid, classId }) {
  const { tr } = useLang()
  const [retos, setRetos] = useState(null)
  useEffect(() => {
    let vivo = true
    misRankings(uid).then(r => { if (vivo) setRetos(classId ? r.filter(x => x.classId === classId) : r) }).catch(() => { if (vivo) setRetos([]) })
    return () => { vivo = false }
  }, [uid, classId])
  if (retos == null) return <p className="text-white/30 text-xs">…</p>
  if (!retos.length) return <p className="text-white/35 text-sm">{tr({ es: 'Aún no has creado ninguno.', en: 'You haven’t created any yet.', ca: 'Encara no n’has creat cap.' })}</p>
  return (
    <ul className="space-y-1.5">
      {retos.map(r => <FilaReto key={r.codigo} r={r} conClase={!classId} />)}
    </ul>
  )
}

const fechaCorta = (d, lang) => (d ? new Date(`${d}T12:00:00`).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'short' }) : '')
// Una actividad de reto en una lista (la del panel, la de la clase): qué es,
// para cuándo, su código y a dónde ir (la pizarra o su gestión)
export function FilaReto({ r, conClase = false }) {
  const { tr, lang, localPath } = useLang()
  const m = MODOS.find(x => x.id === (r.modo ?? 'ranking'))
  return (
    <li className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2 list-none">
      <span className="text-lg" title={tr(m.label)}>{m.emoji}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-white text-sm font-bold truncate">{r.nombre}{r.cerrado ? ' 🔒' : ''}</span>
        <span className="block text-white/40 text-[11px] truncate">
          {tr(m.label)}{r.fecha ? ` · ${tr({ es: 'para el', en: 'due', ca: 'per al' })} ${fechaCorta(r.fecha, lang)}` : ''}
          {' · '}{r.createdAt?.toDate?.().toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) ?? ''}{conClase && r.claseNombre ? ` · 🏫 ${r.claseNombre}` : ''}{r.enNotas ? ' · 📝' : ''}
        </span>
      </span>
      <span className="font-mono text-teal-300 text-xs hidden sm:inline">{r.codigo}</span>
      {r.modo === 'directo' && <Link to={localPath(`/reto/${r.codigo}`)} className="rounded-lg bg-amber-400 text-black text-xs font-black px-2 py-1">📺 {tr({ es: 'Pizarra', en: 'Board', ca: 'Pissarra' })}</Link>}
      <Link to={localPath(`/profesor/reto/${r.codigo}`)} className="rounded-lg bg-white/10 text-white text-xs font-bold px-2 py-1">{tr({ es: 'Resultados', en: 'Results', ca: 'Resultats' })}</Link>
    </li>
  )
}

export default function RetosPanel({ uid, classId, nombreClase, examenInicial }) {
  const { tr } = useLang()
  return (
    <>
    <details className="mb-4 rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4 group">
      <summary className="cursor-pointer list-none text-white font-black flex items-center gap-2">
        <span className="text-amber-300">▶</span> {tr({ es: '¿Cómo funciona? Míralo en 45 segundos', en: 'How does it work? See it in 45 seconds', ca: 'Com funciona? Mira-ho en 45 segons' })}
      </summary>
      <div className="mt-4 max-w-3xl mx-auto"><VideoRetos /></div>
    </details>
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] mb-8">
      <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4">
        <h2 className="text-white font-black mb-1">{tr({ es: 'Nuevo reto', en: 'New challenge', ca: 'Nou repte' })}</h2>
        <p className="text-white/45 text-xs mb-4">{tr({ es: 'Tus alumnos entran con un código y un apodo, sin crear cuenta.', en: 'Your students join with a code and a nickname, no account needed.', ca: 'Els teus alumnes entren amb un codi i un sobrenom, sense crear compte.' })}</p>
        <CrearReto uid={uid} classId={classId} nombreClase={nombreClase} examenInicial={examenInicial} />
      </div>
      <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4">
        <h2 className="text-white font-black mb-3">{classId ? tr({ es: 'Retos de esta clase', en: 'This class’s challenges', ca: 'Reptes d’aquesta classe' }) : tr({ es: 'Tus retos', en: 'Your challenges', ca: 'Els teus reptes' })}</h2>
        <ListaRetos uid={uid} classId={classId} />
      </div>
    </section>
    </>
  )
}
