// Los resultados de un reto de clase, junto a la lista real de la clase. Todo
// es OPCIONAL: el reto ya está guardado en la clase con sus resultados. Si el
// profe quiere, empareja cada nombre que pusieron con un alumno de su lista
// (con cuenta o ficha) —se sugieren los que coinciden sin dudas— y pasa las
// notas a la libreta de Notas de la clase como una columna más (de ahí salen
// solas en el Boletín). Lo decide el profe, no el alumno, igual que con las
// fichas (ver aula-profesor).
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useLang } from '../../context/LangContext'
import { getClassWithStudents } from '../../lib/classes'
import { fichasDe } from '../../lib/roster'
import { crearColumnaConNotas, setGrade } from '../../lib/grades'
import { trimestreDe } from '../../lib/report'
import { examLabel } from '../../lib/exams'
import { trackEvent } from '../../lib/analytics'
import { participantes, guardaEmparejado, marcaEnNotas, sugiereEmparejado, notaDe, escuchaColeccion } from '../../lib/rankingClase'

const tarjeta = 'rounded-2xl bg-[#141b2e] border border-white/[0.08] p-4'

async function listaDeClase(classId) {
  const clase = await getClassWithStudents(classId)
  if (!clase) return { clase: null, lista: [] }
  const reales = await Promise.all((clase.studentIds ?? []).map(async uid => {
    try { const s = await getDoc(doc(db, 'users', uid)); const d = s.exists() ? s.data() : {}; return { id: uid, name: d.name || d.email || uid } } catch { return { id: uid, name: uid } }
  }))
  const fichas = fichasDe(clase).map(f => ({ id: f.id, name: f.name, esFicha: true }))
  return { clase, lista: [...reales, ...fichas].sort((a, b) => a.name.localeCompare(b.name, 'es')) }
}

export default function EmparejarReto({ codigo, reto, entradas }) {
  const { tr, lang, localPath } = useLang()
  const [lista, setLista] = useState(null)
  const [gente, setGente] = useState(null)
  const [marcador, setMarcador] = useState([])
  const [mapa, setMapa] = useState(null)
  const [estado, setEstado] = useState('') // '', 'guardando', 'guardado', 'notas'
  const [error, setError] = useState('')

  useEffect(() => {
    let vivo = true
    Promise.all([listaDeClase(reto.classId), participantes(codigo)])
      .then(([{ lista: l }, p]) => { if (vivo) { setLista(l); setGente(p) } })
      .catch(() => { if (vivo) { setLista([]); setGente([]) } })
    return () => { vivo = false }
  }, [codigo, reto.classId])
  useEffect(() => (reto.modo === 'directo' ? escuchaColeccion(codigo, 'marcador', setMarcador) : undefined), [codigo, reto.modo])

  // Lo guardado manda; si no hay nada guardado, las sugerencias sin dudas
  const sugerido = useMemo(() => (gente && lista ? sugiereEmparejado(gente, lista) : {}), [gente, lista])
  const actual = mapa ?? reto.emparejado ?? sugerido
  const usados = new Set(Object.values(actual))

  if (!lista || !gente) return <section className={`${tarjeta} mb-4`}><p className="text-white/40 text-sm">…</p></section>
  if (!gente.length) return null

  const emparejados = gente.filter(p => actual[p.pid])
  const conNotas = reto.modo !== 'ranking'
  const guarda = async () => {
    setEstado('guardando'); setError('')
    try { await guardaEmparejado(codigo, actual); setMapa(null); setEstado('guardado') } catch { setError(tr({ es: 'No se ha podido guardar.', en: 'It couldn’t be saved.', ca: 'No s’ha pogut desar.' })); setEstado('') }
  }
  const aNotas = async () => {
    setEstado('notas'); setError('')
    try {
      await guardaEmparejado(codigo, actual)
      const values = {}
      for (const p of emparejados) { const n = notaDe(reto, p.pid, entradas, marcador); if (n != null) values[actual[p.pid]] = n }
      if (reto.enNotas) {
        // Ya estaba en Notas: se actualiza la misma columna
        await Promise.all(Object.entries(values).map(([id, n]) => setGrade(reto.classId, reto.enNotas, id, n)))
      } else {
        const fecha = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'short' })
        const nombre = `${tr({ es: 'Reto', en: 'Challenge', ca: 'Repte' })} · ${examLabel(reto.examen, lang).replace(/\s*\((con el juego|with the game|amb el joc)\)\s*$/i, '')} · ${fecha}`
        const colId = await crearColumnaConNotas(reto.classId, nombre.slice(0, 60), trimestreDe(), values)
        await marcaEnNotas(codigo, colId)
      }
      trackEvent('reto_to_grades', { modo: reto.modo, alumnos: Object.keys(values).length })
      setMapa(null); setEstado('pasado')
    } catch { setError(tr({ es: 'No se han podido pasar las notas.', en: 'The marks couldn’t be copied.', ca: 'No s’han pogut passar les notes.' })); setEstado('') }
  }

  return (
    <section className={`${tarjeta} mb-4`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h2 className="text-white font-black">👥 {tr({ es: 'Con tu lista de clase', en: 'With your class list', ca: 'Amb la teva llista de classe' })}</h2>
        <span className="text-white/40 text-xs">{tr({ es: 'Opcional', en: 'Optional', ca: 'Opcional' })}</span>
      </div>
      <p className="text-white/55 text-sm mb-3">
        {tr({ es: 'El reto ya está guardado en la clase. Si quieres, di quién es quién y pasa las notas a tu libreta de Notas. Lo que no emparejes se queda tal cual.', en: 'The challenge is already saved in the class. If you like, say who is who and copy the marks to your gradebook. Anything you don’t match stays as it is.', ca: 'El repte ja està desat a la classe. Si vols, digues qui és qui i passa les notes a la llibreta de Notes. El que no aparellis es queda tal qual.' })}
      </p>
      <div className="divide-y divide-white/[0.06]">
        {gente.map(p => {
          const n = conNotas ? notaDe(reto, p.pid, entradas, marcador) : null
          return (
            <div key={p.pid} className="flex flex-wrap items-center gap-2 py-2">
              <span className="text-white font-bold flex-1 min-w-[8rem]">{p.apodo}</span>
              {n != null && <span className={`w-10 text-right font-black tabular-nums ${n >= 5 ? 'text-green-300' : 'text-red-300'}`}>{n.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>}
              <span className="text-white/30">→</span>
              <select value={actual[p.pid] ?? ''} onChange={e => { setMapa({ ...actual, [p.pid]: e.target.value || undefined }); setEstado('') }}
                className="min-w-[11rem] rounded-lg border border-white/10 bg-[#0b1226] px-2 py-1.5 text-sm text-white [&>option]:bg-[#0b1226]">
                <option value="">{tr({ es: '— Sin emparejar —', en: '— Not matched —', ca: '— Sense aparellar —' })}</option>
                {lista.map(x => <option key={x.id} value={x.id} disabled={usados.has(x.id) && actual[p.pid] !== x.id}>{x.name}{x.esFicha ? ' ·' : ''}</option>)}
              </select>
            </div>
          )
        })}
      </div>
      {!reto.emparejado && Object.keys(sugerido).length > 0 && !mapa && <p className="text-white/40 text-xs mt-2">💡 {tr({ es: 'Los que coinciden por nombre ya vienen puestos: revísalos y guarda.', en: 'Those that match by name are already filled in: check them and save.', ca: 'Els que coincideixen pel nom ja hi són: revisa’ls i desa.' })}</p>}
      {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button type="button" onClick={guarda} disabled={estado === 'guardando'} className="rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] px-3 py-2 text-white/85 text-sm font-bold disabled:opacity-50">
          {estado === 'guardado' ? '✓ ' + tr({ es: 'Guardado', en: 'Saved', ca: 'Desat' }) : tr({ es: 'Guardar quién es quién', en: 'Save who is who', ca: 'Desar qui és qui' })}
        </button>
        {conNotas && (
          <button type="button" onClick={aNotas} disabled={!emparejados.length || estado === 'notas'} className="rounded-xl bg-teal-600 hover:bg-teal-500 px-3 py-2 text-white text-sm font-black disabled:opacity-40">
            📝 {reto.enNotas ? tr({ es: `Actualizar en Notas (${emparejados.length})`, en: `Update in Grades (${emparejados.length})`, ca: `Actualitzar a Notes (${emparejados.length})` }) : tr({ es: `Pasar a Notas (${emparejados.length})`, en: `Copy to Grades (${emparejados.length})`, ca: `Passar a Notes (${emparejados.length})` })}
          </button>
        )}
        {(reto.enNotas || estado === 'pasado') && (
          <Link to={`${localPath(`/profesor/clase/${reto.classId}`)}?tab=notas`} className="text-teal-300 text-sm font-bold">
            {estado === 'pasado' ? '✓ ' : ''}{tr({ es: 'Ver en Notas de la clase →', en: 'See in the class gradebook →', ca: 'Veure a les Notes de la classe →' })}
          </Link>
        )}
      </div>
      {lista.length === 0 && <p className="text-white/40 text-xs mt-2">{tr({ es: 'Tu clase aún no tiene alumnos en la lista: añádelos en la pestaña Alumnos (sin cuenta también).', en: 'Your class has no students on the list yet: add them in the Students tab (without accounts too).', ca: 'La classe encara no té alumnes a la llista: afegeix-los a la pestanya Alumnes (sense compte també).' })}</p>}
    </section>
  )
}
