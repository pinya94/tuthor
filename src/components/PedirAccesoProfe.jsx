// «¿Quieres entrar en la beta de profesores? Pide acceso»: debajo del alta de profe en
// /profesores. Con la cuenta del profe (el acceso se da a esa cuenta); un
// administrador la aprueba en /admin y la cuenta pasa a ser de profe sola.
// Ver src/lib/solicitudesProfe.js.
import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'
import { miSolicitud, pedirAcceso } from '../lib/solicitudesProfe'

const campo = 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-amber-400 transition-colors'

export default function PedirAccesoProfe({ user, etapas, onEntrar }) {
  const { tr } = useLang()
  const [abierto, setAbierto] = useState(false)
  const [sol, setSol] = useState(undefined) // undefined = cargando, null = no hay
  const [f, setF] = useState({ nombre: '', centro: '', etapa: 'eso', materias: '', mensaje: '' })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    let vivo = true
    miSolicitud(user.uid).then(s => { if (vivo) setSol(s) }).catch(() => { if (vivo) setSol(null) })
    return () => { vivo = false }
  }, [user])

  const cambia = k => e => setF(x => ({ ...x, [k]: e.target.value }))
  const envia = async e => {
    e.preventDefault()
    setEnviando(true); setError('')
    try { await pedirAcceso(user, f); setSol({ ...f, estado: 'pendiente', createdAt: { toDate: () => new Date() } }) } catch { setError(tr({ es: 'No se ha podido enviar. Revisa los datos y prueba otra vez.', en: 'It couldn’t be sent. Check the details and try again.', ca: 'No s’ha pogut enviar. Revisa les dades i torna-ho a provar.' })) }
    setEnviando(false)
  }

  const caja = 'mt-6 rounded-2xl border border-white/[0.08] bg-[#141b2e] p-5'
  // Ya la ha pedido: su estado
  if (user && sol && sol.estado !== 'rechazada') {
    const fecha = sol.createdAt?.toDate?.().toLocaleDateString(undefined, { day: 'numeric', month: 'long' })
    return (
      <div className={caja}>
        <p className="text-white font-black">{sol.estado === 'aprobada' ? '✅ ' + tr({ es: '¡Ya tienes acceso!', en: 'You have access!', ca: 'Ja tens accés!' }) : '📨 ' + tr({ es: 'Solicitud enviada', en: 'Request sent', ca: 'Sol·licitud enviada' })}</p>
        <p className="text-white/55 text-sm mt-1">{sol.estado === 'aprobada'
          ? tr({ es: 'Recarga la página y entrarás directamente a tu panel de profe.', en: 'Reload the page and you’ll go straight to your teacher dashboard.', ca: 'Recarrega la pàgina i entraràs directament al teu tauler de profe.' })
          : tr({ es: `La enviaste${fecha ? ` el ${fecha}` : ''}. Te daremos acceso pronto: cuando esté, al volver aquí entrarás directamente a tu panel.`, en: `You sent it${fecha ? ` on ${fecha}` : ''}. We’ll give you access soon: once done, coming back here takes you straight to your dashboard.`, ca: `La vas enviar${fecha ? ` el ${fecha}` : ''}. Et donarem accés aviat: quan estigui, en tornar aquí entraràs directament al teu tauler.` })}</p>
      </div>
    )
  }

  return (
    <div className={caja}>
      {!abierto ? (
        <button type="button" onClick={() => (user ? setAbierto(true) : onEntrar())} className="w-full text-left">
          <p className="text-white font-black">{tr({ es: '¿Quieres entrar en la beta de profesores?', en: 'Want to join the teacher beta?', ca: 'Vols entrar a la beta de professors?' })} <span className="text-amber-300">{tr({ es: 'Pide acceso →', en: 'Request access →', ca: 'Demana accés →' })}</span></p>
          <p className="text-white/45 text-xs mt-1">{sol?.estado === 'rechazada'
            ? tr({ es: 'Tu solicitud anterior no se aprobó. Puedes enviar otra con más detalles.', en: 'Your previous request wasn’t approved. You can send another with more details.', ca: 'La teva sol·licitud anterior no es va aprovar. En pots enviar una altra amb més detalls.' })
            : tr({ es: 'Cuéntanos quién eres y te damos acceso con tu cuenta.', en: 'Tell us who you are and we’ll give your account access.', ca: 'Explica’ns qui ets i et donem accés amb el teu compte.' })}</p>
        </button>
      ) : (
        <form onSubmit={envia} className="space-y-3">
          <p className="text-white font-black">{tr({ es: 'Pedir acceso a la beta de profes', en: 'Request access to the teacher beta', ca: 'Demanar accés a la beta de profes' })}</p>
          <p className="text-white/45 text-xs">{tr({ es: `Con tu cuenta ${user.email}: es la que pasará a ser de profe.`, en: `With your account ${user.email}: this is the one that becomes a teacher account.`, ca: `Amb el teu compte ${user.email}: és el que passarà a ser de profe.` })}</p>
          <input required minLength={2} maxLength={80} value={f.nombre} onChange={cambia('nombre')} className={campo} placeholder={tr({ es: 'Tu nombre', en: 'Your name', ca: 'El teu nom' })} />
          <input required minLength={2} maxLength={120} value={f.centro} onChange={cambia('centro')} className={campo} placeholder={tr({ es: 'Centro y localidad', en: 'School and town', ca: 'Centre i localitat' })} />
          <select value={f.etapa} onChange={cambia('etapa')} className={campo}>
            {etapas.map(s => <option key={s.id} value={s.id} className="bg-[#0d0d1a]">{tr(s.label)}</option>)}
          </select>
          <input maxLength={120} value={f.materias} onChange={cambia('materias')} className={campo} placeholder={tr({ es: 'Qué das (ej. Física y Química, 3.º y 4.º ESO)', en: 'What you teach (e.g. Chemistry, Year 10)', ca: 'Què fas (ex. Física i Química, 3r i 4t ESO)' })} />
          <textarea maxLength={600} rows={3} value={f.mensaje} onChange={cambia('mensaje')} className={campo} placeholder={tr({ es: 'Para qué te gustaría usarlo (opcional)', en: 'What you’d like to use it for (optional)', ca: 'Per a què t’agradaria fer-lo servir (opcional)' })} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={enviando} className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm disabled:opacity-50">
            {enviando ? '…' : tr({ es: 'Enviar solicitud', en: 'Send request', ca: 'Enviar sol·licitud' })}
          </button>
          <p className="text-white/35 text-[11px]">{tr({ es: 'Solo usamos estos datos para revisar tu solicitud.', en: 'We only use these details to review your request.', ca: 'Només fem servir aquestes dades per revisar la teva sol·licitud.' })}</p>
        </form>
      )}
    </div>
  )
}
