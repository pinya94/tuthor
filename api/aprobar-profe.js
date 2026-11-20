// Revisa el alta de un profesor (src/lib/solicitudesProfe.js). Solo un
// administrador: la misma lista de correos que isAdmin() en firestore.rules (si
// cambia allí, cambiarla aquí).
//
// Desde el 31-oct-2026 la cuenta de profe se abre al momento, sin palabra de la
// beta: el profe la usa entera mientras su solicitud está «pendiente» y aquí se
// revisa después.
//   validar    → estado 'aprobada' (y la cuenta queda de profe, por si aún no lo era)
//   rectificar → estado 'rectificar' con una nota de qué falta; el profe la ve
//                en su panel y corrige los datos (vuelve a 'pendiente')
//   rechazar   → estado 'rechazada' y se le quita el acceso de profe (spam)
// 'aprobar' es el nombre antiguo de 'validar' y se sigue aceptando.
// En el servidor porque un admin no puede escribir el perfil de otra cuenta
// desde el cliente (las rules solo dejan a cada uno el suyo).
//
// POST { uid, accion, nota? }  con Authorization: Bearer <token>
import { getDb, getAdminAuth, fail } from './_admin.js'

const ADMINS = ['pinya1994@gmail.com', 'consiguetualgogratis@gmail.com', 'consiguetualgogratis@tuthor.app', 'manel.willx@gmail.com']
const CODIGO_BETA = 'BETATUTHOR'
const ESTADO = { validar: 'aprobada', aprobar: 'aprobada', rectificar: 'rectificar', rechazar: 'rechazada' }

// Correo al profe al validar o al pedirle datos (desde el 20-nov-2026; antes
// era un mailto que el admin tenía que acordarse de enviar a mano). Mismo
// Gmail que api/aviso.js, en el idioma con que usa Tuthor. Sin GMAIL_* no se
// manda y el panel ofrece el mailto de siempre. Rechazar no escribe (spam).
function correoProfe(estado, s, idioma, nota) {
  const nombre = s.nombre || ''
  const panel = idioma === 'en' ? 'https://www.tuthor.es/en/profesor' : idioma === 'ca' ? 'https://www.tuthor.es/ca/profesor' : 'https://www.tuthor.es/profesor'
  if (estado === 'aprobada') {
    if (idioma === 'en') return { subject: 'Your Tuthor teacher account has been verified', text: `Hello ${nombre},

We have reviewed your sign-up and everything is in order: your Tuthor teacher account (${s.email}) is now verified. You can keep using it as before at ${panel}

Thank you for using Tuthor with your students!` }
    if (idioma === 'ca') return { subject: 'El teu compte de professor a Tuthor està validat', text: `Hola, ${nombre}:

Hem revisat la teva alta i tot és correcte: el teu compte de professor a Tuthor (${s.email}) queda validat. Pots continuar fent-lo servir com fins ara a ${panel}

Gràcies per fer servir Tuthor amb els teus alumnes!` }
    return { subject: 'Tu cuenta de profe en Tuthor está validada', text: `Hola, ${nombre}:

Hemos revisado tu alta y todo está correcto: tu cuenta de profesor en Tuthor (${s.email}) queda validada. Puedes seguir usándola como hasta ahora en ${panel}

¡Gracias por usar Tuthor con tus alumnos!` }
  }
  if (idioma === 'en') return { subject: 'Your Tuthor teacher account: we need one more detail', text: `Hello ${nombre},

We have reviewed your Tuthor teacher sign-up and need you to correct or add the following:

${nota}

You can do it from your dashboard (${panel}), in the notice at the top. In the meantime you can keep using everything as normal.

Thank you!` }
  if (idioma === 'ca') return { subject: 'El teu compte de professor a Tuthor: necessitem una dada', text: `Hola, ${nombre}:

Hem revisat la teva alta com a professor a Tuthor i necessitem que corregeixis o completis això:

${nota}

Ho pots fer des del teu tauler (${panel}), a l’avís de dalt. Mentrestant pots continuar fent-ho servir tot amb normalitat.

Gràcies!` }
  return { subject: 'Tu cuenta de profe en Tuthor: necesitamos un dato', text: `Hola, ${nombre}:

Hemos revisado tu alta como profesor en Tuthor y necesitamos que corrijas o completes esto:

${nota}

Puedes hacerlo desde tu panel (${panel}), en el aviso de arriba. Mientras tanto puedes seguir usándolo todo con normalidad.

¡Gracias!` }
}

async function enviarCorreoProfe(db, uid, estado, s, nota) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return 'sin_configurar'
  if (!s.email || (estado !== 'aprobada' && estado !== 'rectificar')) return 'no_aplica'
  try {
    const idioma = (await db.doc(`users/${uid}`).get()).data()?.idioma
    const { subject, text } = correoProfe(estado, s, idioma, nota)
    const { default: nodemailer } = await import('nodemailer')
    const t = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } })
    await t.sendMail({ from: `Tuthor <${GMAIL_USER}>`, to: s.email, replyTo: GMAIL_USER, subject, text })
    return 'enviado'
  } catch { return 'error' }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  const cabecera = String(req.headers?.authorization ?? '')
  if (!cabecera.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' })
  try {
    let quien
    try { quien = await (await getAdminAuth()).verifyIdToken(cabecera.slice(7)) } catch { return res.status(401).json({ error: 'unauthorized' }) }
    if (!ADMINS.includes(quien.email) || quien.childMode) return res.status(403).json({ error: 'forbidden' })

    const uid = String(req.body?.uid ?? '')
    const accion = req.body?.accion
    const nota = String(req.body?.nota ?? '').trim().slice(0, 600)
    if (!uid || !ESTADO[accion]) return res.status(400).json({ error: 'params' })
    if (accion === 'rectificar' && nota.length < 3) return res.status(400).json({ error: 'nota' })

    const db = await getDb()
    const solRef = db.doc(`solicitudesProfe/${uid}`)
    const sol = await solRef.get()
    if (!sol.exists) return res.status(404).json({ error: 'no_existe' })
    const s = sol.data()

    if (ESTADO[accion] === 'aprobada') {
      await db.doc(`users/${uid}`).set({
        teacherProfile: { active: true, schoolName: s.centro ?? '', stage: s.etapa ?? 'eso', promoCode: CODIGO_BETA, validadoPor: quien.email, validadoEn: new Date() },
      }, { merge: true })
    }
    if (accion === 'rechazar') {
      await db.doc(`users/${uid}`).set({ teacherProfile: { active: false } }, { merge: true })
    }
    await solRef.update({
      estado: ESTADO[accion],
      nota: accion === 'rectificar' ? nota : '',
      resueltaEn: new Date(), resueltaPor: quien.email,
    })
    const correo = await enviarCorreoProfe(db, uid, ESTADO[accion], s, nota)
    if (correo === 'enviado') await solRef.update({ correoEnviadoEn: new Date() }).catch(() => {})
    return res.status(200).json({ ok: true, estado: ESTADO[accion], correo })
  } catch (err) {
    return fail(res, err, 'aprobar-profe')
  }
}
