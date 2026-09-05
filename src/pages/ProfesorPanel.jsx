import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getTeacherProfile, getTeacherClasses, createClass, hasTeacherAccess } from '../lib/classes'
import RecursosImprimibles from '../components/RecursosImprimibles'

const PESTANAS = [
  { id: 'clases', emoji: '🏫', label: { es: 'Mis clases', en: 'My classes', ca: 'Les meves classes' } },
  { id: 'recursos', emoji: '🖨️', label: { es: 'Recursos', en: 'Resources', ca: 'Recursos' } },
]

export default function ProfesorPanel() {
  const { user } = useAuth()
  const { tr, localPath } = useLang()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [error, setError] = useState('')
  const [copiedCode, setCopiedCode] = useState('')
  const [waitingPayment, setWaitingPayment] = useState(false)
  const [tab, setTab] = useState('clases')

  useEffect(() => {
    if (user === undefined) return
    if (!user) { navigate(localPath('/profesores'), { replace: true }); return }
    checkAccess()
  }, [user])

  // Justo después de pagar, el webhook de Stripe puede tardar un par de
  // segundos en activar la cuenta — se reintenta unas cuantas veces antes
  // de mandar a /profesores como si el pago no hubiera funcionado.
  async function checkAccess(attempt = 0) {
    const justPaid = new URLSearchParams(window.location.search).get('pago') === 'ok'
    try {
      const profile = await getTeacherProfile(user.uid)
      if (hasTeacherAccess(profile)) { setWaitingPayment(false); loadClasses(); return }
      if (justPaid && attempt < 5) {
        setWaitingPayment(true)
        setTimeout(() => checkAccess(attempt + 1), 2000)
        return
      }
      navigate(localPath('/profesores'), { replace: true })
    } catch {
      setError(tr({ es: 'No se pudo cargar tu perfil de profesor.', en: 'Could not load your teacher profile.', ca: 'No s\'ha pogut carregar el teu perfil de professor.' }))
      setLoading(false)
    }
  }

  async function loadClasses() {
    setLoading(true)
    try {
      const list = await getTeacherClasses(user.uid)
      setClasses(list)
    } catch {
      setError(tr({ es: 'No se pudieron cargar tus clases.', en: 'Could not load your classes.', ca: 'No s\'han pogut carregar les teves classes.' }))
    }
    setLoading(false)
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!newName.trim()) return
    setCreating(true)
    setError('')
    try {
      await createClass(user.uid, newName.trim())
      setNewName('')
      await loadClasses()
    } catch {
      setError(tr({ es: 'No se pudo crear la clase. Inténtalo de nuevo.', en: 'Could not create the class. Please try again.', ca: 'No s\'ha pogut crear la classe. Torna-ho a intentar.' }))
    }
    setCreating(false)
  }

  function copyCode(code) {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 1500)
  }

  if (user === undefined || loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-white/30 text-sm">
          {waitingPayment
            ? tr({ es: 'Confirmando tu pago…', en: 'Confirming your payment…', ca: 'Confirmant el teu pagament…' })
            : tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}
        </p>
      </div>
    )
  }

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Recordatorio de beta: no solo en /profesores — un profesor que ya
          entra a diario a esto sigue metiendo datos reales de sus alumnos, y
          merece seguir sabiendo en qué está mientras dure la prueba. */}
      <div className="flex items-center gap-2.5 mb-5 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-3.5 py-2.5">
        <span className="text-lg shrink-0">🧪</span>
        <p className="text-amber-300/80 text-[12.5px]">
          {tr({
            es: 'Estás en la beta gratuita: algunas cosas pueden cambiar. Gracias por probarlo.',
            en: 'You\'re on the free beta: some things may change. Thanks for testing it.',
            ca: 'Ets a la beta gratuïta: algunes coses poden canviar. Gràcies per provar-ho.',
          })}
        </p>
      </div>

      {/* Dos pestañas del mismo peso, no una principal y una barra lateral:
          preparar la clase (recursos) es tanto trabajo del profesor como
          gestionarla, y en una columna de 300px no se podía trabajar. Cada
          una se lleva el ancho entero cuando está activa. */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {PESTANAS.map(p => (
          <button key={p.id} type="button" onClick={() => setTab(p.id)}
            className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
              tab === p.id
                ? 'border-teal-500/50 bg-teal-500/10'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25'
            }`}>
            <p className={`font-black text-[15px] ${tab === p.id ? 'text-white' : 'text-white/60'}`}>
              {p.emoji} {tr(p.label)}
            </p>
            <p className="text-white/35 text-[11.5px] mt-0.5">
              {p.id === 'clases'
                ? `${classes.length} ${tr({ es: 'clase(s)', en: 'class(es)', ca: 'classe(s)' })}`
                : tr({ es: 'Imprimibles y actividades', en: 'Printables and activities', ca: 'Imprimibles i activitats' })}
            </p>
          </button>
        ))}
      </div>

      {tab === 'recursos' ? <RecursosImprimibles /> : (
      <div>
      <h1 className="text-2xl font-black text-white mb-1">{tr({ es: 'Mis clases', en: 'My classes', ca: 'Les meves classes' })}</h1>
      <p className="text-white/50 text-sm mb-6">
        {tr({
          es: 'Crea una clase y comparte el código con tus alumnos para que se vinculen.',
          en: 'Create a class and share the code with your students so they can link it.',
          ca: 'Crea una classe i comparteix el codi amb els teus alumnes perquè s\'hi vinculin.',
        })}
      </p>

      <form onSubmit={handleCreate} className="flex gap-2 mb-8">
        <input type="text" required value={newName} onChange={e => setNewName(e.target.value)}
          placeholder={tr({ es: 'Nombre de la clase (ej. 3º ESO A)', en: 'Class name (e.g. Grade 9A)', ca: 'Nom de la classe (ex. 3r ESO A)' })}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
        <button type="submit" disabled={creating}
          className="px-5 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors shrink-0">
          {creating ? tr({ es: 'Creando…', en: 'Creating…', ca: 'Creant…' }) : tr({ es: '+ Crear clase', en: '+ Create class', ca: '+ Crear classe' })}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm -mt-6 mb-6">{error}</p>}

      {classes.length === 0 ? (
        <p className="text-white/30 text-sm">{tr({ es: 'Todavía no tienes ninguna clase.', en: 'You don\'t have any classes yet.', ca: 'Encara no tens cap classe.' })}</p>
      ) : (
        <div className="space-y-3">
          {classes.map(c => (
            <div key={c.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
              <button onClick={() => navigate(localPath(`/profesor/clase/${c.id}`))} className="text-left">
                <p className="text-white font-bold">{c.name}</p>
                <p className="text-white/40 text-xs mt-0.5">
                  {(c.studentIds?.length || 0)} {tr({ es: 'alumno(s)', en: 'student(s)', ca: 'alumne(s)' })}
                </p>
              </button>
              <button onClick={() => copyCode(c.code)}
                className="font-mono text-sm bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-teal-300 hover:border-teal-500/50 transition-colors">
                {copiedCode === c.code ? tr({ es: '¡Copiado!', en: 'Copied!', ca: 'Copiat!' }) : c.code}
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
      )}
    </div>
  )
}
