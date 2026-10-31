// En qué punto está la validación de la cuenta de profe (src/lib/solicitudesProfe.js),
// arriba del panel. El profe lo usa todo desde el alta; esto solo le cuenta
// cómo va la revisión:
//   pendiente   «en validación: puedes usarlo todo; te avisaremos»
//   rectificar  la nota del equipo y un formulario para corregir o añadir datos
//   aprobada    «cuenta validada», una sola vez (luego desaparece)
// Las cuentas de profe de antes de abrir la beta no tienen solicitud: nada.
import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'
import { miSolicitud, pedirAcceso } from '../lib/solicitudesProfe'

// Las mismas etapas que el alta de /profesores
const STAGES = [
  { id: 'primaria', label: { es: 'Primaria', en: 'Primary', ca: 'Primària' } },
  { id: 'eso', label: { es: 'ESO', en: 'Secondary', ca: 'ESO' } },
  { id: 'bachillerato', label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' } },
  { id: 'otro', label: { es: 'Otro', en: 'Other', ca: 'Altre' } },
]
const campo = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-amber-400'
const claveVista = uid => `tuthor_validacion_vista_${uid}`

export default function EstadoValidacionProfe({ user }) {
  const { tr } = useLang()
  const [sol, setSol] = useState(undefined)
  const [f, setF] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [yaVista] = useState(() => { try { return localStorage.getItem(claveVista(user.uid)) === '1' } catch { return false } })

  useEffect(() => {
    let vivo = true
    miSolicitud(user.uid).then(s => { if (vivo) setSol(s) }).catch(() => { if (vivo) setSol(null) })
    return () => { vivo = false }
  }, [user.uid])

  // La validada se enseña una vez: la próxima visita ya no sale
  useEffect(() => {
    if (sol?.estado === 'aprobada') { try { localStorage.setItem(claveVista(user.uid), '1') } catch { /* da igual */ } }
  }, [sol, user.uid])

  if (!sol) return null

  if (sol.estado === 'pendiente') {
    return (
      <div className="mb-5 rounded-xl border border-sky-400/30 bg-sky-500/[0.07] px-4 py-3">
        <p className="text-white font-black text-sm">🔎 {tr({ es: 'Tu cuenta de profesor está en validación', en: 'Your teacher account is being validated', ca: 'El teu compte de professor està en validació' })}</p>
        <p className="text-white/60 text-[13px] mt-1">{tr({
          es: 'Puedes entrar y usarlo todo con normalidad. Mientras tanto, nuestro equipo revisa tu solicitud: si todo está correcto te lo confirmaremos, y si falta algo te pediremos que lo corrijas o que aportes algún dato más.',
          en: 'You can log in and use everything as normal. Meanwhile, our team is reviewing your request: if everything is correct we’ll confirm it, and if something is missing we’ll ask you to correct it or provide a few more details.',
          ca: 'Pots entrar i fer-ho servir tot amb normalitat. Mentrestant, el nostre equip revisa la teva sol·licitud: si tot és correcte t’ho confirmarem, i si falta alguna cosa et demanarem que la corregeixis o que aportis alguna dada més.',
        })}</p>
      </div>
    )
  }

  if (sol.estado === 'aprobada') {
    if (yaVista) return null
    return (
      <div className="mb-5 rounded-xl border border-green-400/30 bg-green-500/[0.08] px-4 py-3">
        <p className="text-white font-black text-sm">✅ {tr({ es: 'Tu cuenta de profesor está validada', en: 'Your teacher account has been validated', ca: 'El teu compte de professor està validat' })}</p>
        <p className="text-white/60 text-[13px] mt-1">{tr({ es: 'Todo correcto. Gracias por usar Tuthor con tus alumnos.', en: 'All correct. Thank you for using Tuthor with your students.', ca: 'Tot correcte. Gràcies per fer servir Tuthor amb els teus alumnes.' })}</p>
      </div>
    )
  }

  if (sol.estado !== 'rectificar') return null

  const abre = () => setF({ nombre: sol.nombre ?? '', centro: sol.centro ?? '', etapa: sol.etapa ?? 'eso', materias: sol.materias ?? '', mensaje: sol.mensaje ?? '' })
  const cambia = k => e => setF(x => ({ ...x, [k]: e.target.value }))
  const envia = async e => {
    e.preventDefault()
    setEnviando(true); setError('')
    try { await pedirAcceso(user, f); setSol({ ...f, estado: 'pendiente' }); setF(null) } catch { setError(tr({ es: 'No se ha podido enviar. Revisa los datos y prueba otra vez.', en: 'It couldn’t be sent. Check the details and try again.', ca: 'No s’ha pogut enviar. Revisa les dades i torna-ho a provar.' })) }
    setEnviando(false)
  }
  return (
    <div className="mb-5 rounded-xl border border-amber-400/40 bg-amber-400/[0.08] px-4 py-3">
      <p className="text-white font-black text-sm">✏️ {tr({ es: 'Necesitamos que revises tus datos de profesor', en: 'We need you to check your teacher details', ca: 'Necessitem que revisis les teves dades de professor' })}</p>
      <p className="text-white/60 text-[13px] mt-1">{tr({ es: 'Puedes seguir usándolo todo. Nuestro equipo te pide esto:', en: 'You can keep using everything. Our team asks you for this:', ca: 'Pots continuar fent-ho servir tot. El nostre equip et demana això:' })}</p>
      {sol.nota && <p className="mt-2 rounded-lg bg-black/25 px-3 py-2 text-white/85 text-sm italic">«{sol.nota}»</p>}
      {!f ? (
        <button type="button" onClick={abre} className="mt-3 rounded-xl bg-amber-400 hover:bg-amber-300 px-4 py-2 text-black text-sm font-black">
          {tr({ es: 'Corregir mis datos', en: 'Correct my details', ca: 'Corregir les meves dades' })}
        </button>
      ) : (
        <form onSubmit={envia} className="mt-3 space-y-2">
          <input required minLength={2} maxLength={80} value={f.nombre} onChange={cambia('nombre')} className={campo} placeholder={tr({ es: 'Tu nombre', en: 'Your name', ca: 'El teu nom' })} />
          <input required minLength={2} maxLength={120} value={f.centro} onChange={cambia('centro')} className={campo} placeholder={tr({ es: 'Centro y localidad', en: 'School and town', ca: 'Centre i localitat' })} />
          <select value={f.etapa} onChange={cambia('etapa')} className={campo}>
            {STAGES.map(s => <option key={s.id} value={s.id} className="bg-[#0d0d1a]">{tr(s.label)}</option>)}
          </select>
          <input maxLength={120} value={f.materias} onChange={cambia('materias')} className={campo} placeholder={tr({ es: 'Qué das (ej. Física y Química, 3.º y 4.º ESO)', en: 'What you teach (e.g. Chemistry, Year 10)', ca: 'Què fas (ex. Física i Química, 3r i 4t ESO)' })} />
          <textarea maxLength={600} rows={3} value={f.mensaje} onChange={cambia('mensaje')} className={campo} placeholder={tr({ es: 'Lo que te hemos pedido u otros datos (opcional)', en: 'What we asked for, or any other details (optional)', ca: 'El que t’hem demanat o altres dades (opcional)' })} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={enviando} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black text-sm font-black disabled:opacity-50">
            {enviando ? '…' : tr({ es: 'Enviar para revisar', en: 'Send for review', ca: 'Enviar per revisar' })}
          </button>
        </form>
      )}
    </div>
  )
}
