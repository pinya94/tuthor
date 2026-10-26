// Crear y ver los retos de clase: la pestaña «Retos» del aula del profesor
// (con su classId) y la parte del profe de /ranking (sin clase). Tres modos:
//   📺 en directo  la pizarra lleva la partida y los alumnos responden en el móvil
//   🏠 deberes     un examen con nota del profe; cada uno lo hace en casa
//   🏆 ranking     sus récords de cualquier juego, toda la semana
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { EXAMS, examLabel } from '../../lib/exams'
import { RETOS_EXAMENES } from '../../data/retosExamenes'
import { SEGUNDOS, N_PREGUNTAS } from '../../lib/apodo'
import { crearReto, misRankings } from '../../lib/rankingClase'
import VideoRetos from '../VideoRetos'

const MODOS = [
  { id: 'directo', emoji: '📺', label: { es: 'En directo', en: 'Live', ca: 'En directe' },
    desc: { es: 'Lo proyectas y cada uno responde en su móvil, con tiempo por pregunta.', en: 'You project it and everyone answers on their phone, against the clock.', ca: 'Ho projectes i cadascú respon al mòbil, amb temps per pregunta.' } },
  { id: 'deberes', emoji: '🏠', label: { es: 'Deberes', en: 'Homework', ca: 'Deures' },
    desc: { es: 'Cada uno hace el examen en casa; tú ves la nota de cada uno.', en: 'Everyone does the exam at home; you see each mark.', ca: 'Cadascú fa l’examen a casa; tu veus la nota de cadascú.' } },
  { id: 'ranking', emoji: '🏆', label: { es: 'Ranking libre', en: 'Open ranking', ca: 'Rànquing lliure' },
    desc: { es: 'Sus récords en cualquier juego suben solos, toda la semana.', en: 'Their best scores in any game go up on their own, all week.', ca: 'Els seus rècords a qualsevol joc pugen sols, tota la setmana.' } },
]
const NIVELES = [
  { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' } },
  { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' } },
  { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' } },
]
const campo = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500'
const chip = on => `rounded-xl border px-3 py-2 text-sm font-bold ${on ? 'border-teal-400 bg-teal-500/20 text-white' : 'border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]'}`

export function CrearReto({ uid, classId, nombreClase = '', onCreado }) {
  const { tr, lang, localPath } = useLang()
  const navigate = useNavigate()
  const [modo, setModo] = useState('directo')
  const [examen, setExamen] = useState('')
  const [nivel, setNivel] = useState(1)
  const [nPreguntas, setNPreguntas] = useState(10)
  const [segundos, setSegundos] = useState(30)
  const [nota, setNota] = useState('')
  const [nombre, setNombre] = useState('')
  const [creando, setCreando] = useState(false)
  const [error, setError] = useState('')
  const examenes = useMemo(() => RETOS_EXAMENES.filter(id => EXAMS[id])
    .map(id => ({ id, label: `${EXAMS[id].emoji ?? ''} ${examLabel(id, lang)}` }))
    .sort((a, b) => a.label.localeCompare(b.label, lang)), [lang])

  const crea = async e => {
    e.preventDefault()
    if (modo !== 'ranking' && !examen) { setError(tr({ es: 'Elige un juego.', en: 'Choose a game.', ca: 'Tria un joc.' })); return }
    setCreando(true); setError('')
    try {
      const porDefecto = modo === 'ranking' ? (nombreClase || tr({ es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' })) : `${examLabel(examen, lang)}${nombreClase ? ` · ${nombreClase}` : ''}`
      const codigo = await crearReto(uid, { nombre: nombre.trim() || porDefecto, modo, examen, nivel, nPreguntas, segundos, nota, classId })
      onCreado?.(codigo)
      // En directo se abre la pizarra; lo demás, la página para compartirlo y ver resultados
      navigate(localPath(modo === 'directo' ? `/reto/${codigo}` : `/ranking/${codigo}`))
    } catch { setError(tr({ es: 'No se ha podido crear. Prueba otra vez.', en: 'It couldn’t be created. Try again.', ca: 'No s’ha pogut crear. Torna-ho a provar.' })) }
    setCreando(false)
  }

  return (
    <form onSubmit={crea} className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-3">
        {MODOS.map(m => (
          <button key={m.id} type="button" onClick={() => setModo(m.id)} className={`text-left rounded-2xl border p-3 ${modo === m.id ? 'border-teal-400 bg-teal-500/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'}`}>
            <span className="block text-white font-black">{m.emoji} {tr(m.label)}</span>
            <span className="block text-white/50 text-xs mt-0.5 leading-snug">{tr(m.desc)}</span>
          </button>
        ))}
      </div>

      {modo !== 'ranking' && (
        <>
          <label className="block">
            <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Juego', en: 'Game', ca: 'Joc' })}</span>
            <select value={examen} onChange={e => setExamen(e.target.value)} className={campo}>
              <option value="">{tr({ es: '— Elige un juego —', en: '— Choose a game —', ca: '— Tria un joc —' })}</option>
              {examenes.map(x => <option key={x.id} value={x.id}>{x.label}</option>)}
            </select>
          </label>
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Nivel', en: 'Level', ca: 'Nivell' })}</span>
              <div className="flex gap-1.5">{NIVELES.map((n, i) => <button key={i} type="button" onClick={() => setNivel(i)} className={chip(nivel === i)}>{n.emoji} {tr(n.label)}</button>)}</div>
            </div>
            <div>
              <span className="block text-white/50 text-xs font-bold mb-1">{tr({ es: 'Preguntas', en: 'Questions', ca: 'Preguntes' })}</span>
              <div className="flex gap-1.5">{N_PREGUNTAS.map(n => <button key={n} type="button" onClick={() => setNPreguntas(n)} className={chip(nPreguntas === n)}>{n}</button>)}</div>
            </div>
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
          placeholder={modo === 'ranking' ? (nombreClase || tr({ es: 'Ranking de clase', en: 'Class ranking', ca: 'Rànquing de classe' })) : (examen ? `${examLabel(examen, lang)}${nombreClase ? ` · ${nombreClase}` : ''}` : '')} />
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
  const { tr, localPath } = useLang()
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
      {retos.map(r => {
        const m = MODOS.find(x => x.id === (r.modo ?? 'ranking'))
        return (
          <li key={r.codigo} className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
            <span className="text-lg" title={tr(m.label)}>{m.emoji}</span>
            <span className="flex-1 min-w-0 text-white text-sm font-bold truncate">{r.nombre}{r.cerrado ? ' 🔒' : ''}</span>
            <span className="font-mono text-teal-300 text-xs">{r.codigo}</span>
            {r.modo === 'directo' && <Link to={localPath(`/reto/${r.codigo}`)} className="rounded-lg bg-amber-400 text-black text-xs font-black px-2 py-1">📺 {tr({ es: 'Pizarra', en: 'Board', ca: 'Pissarra' })}</Link>}
            <Link to={localPath(`/ranking/${r.codigo}`)} className="rounded-lg bg-white/10 text-white text-xs font-bold px-2 py-1">{tr({ es: 'Resultados', en: 'Results', ca: 'Resultats' })}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default function RetosPanel({ uid, classId, nombreClase }) {
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
        <CrearReto uid={uid} classId={classId} nombreClase={nombreClase} />
      </div>
      <div className="rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4">
        <h2 className="text-white font-black mb-3">{tr({ es: 'Retos de esta clase', en: 'This class’s challenges', ca: 'Reptes d’aquesta classe' })}</h2>
        <ListaRetos uid={uid} classId={classId} />
      </div>
    </section>
    </>
  )
}
