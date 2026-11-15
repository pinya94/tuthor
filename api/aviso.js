// Aviso por correo al administrador cuando llega algo nuevo: un mensaje de
// contacto, un bug, una propuesta de colaboración o un alta de profe (o sus
// datos corregidos tras «Pedir datos»).
//
// El cliente solo manda { tipo, id } (src/lib/avisoAdmin.js). El texto del
// correo sale del documento que este endpoint lee de Firestore con Firebase
// Admin, así que nadie puede usarlo para mandar un correo con lo que quiera.
// Además solo avisa de documentos recién creados (menos de 10 minutos) y una
// sola vez por documento (`avisadoEn`), para que no se pueda repetir a mano.
//
// Correo: Gmail por SMTP con una «contraseña de aplicación». Variables de
// entorno en Vercel:
//   GMAIL_USER          la cuenta de Gmail que envía
//   GMAIL_APP_PASSWORD  su contraseña de aplicación (16 letras)
//   AVISO_PARA          a quién se avisa (si falta, a GMAIL_USER)
// Sin ellas el endpoint no hace nada (503) y la web sigue funcionando igual.
//
// POST { tipo: 'contacto' | 'colaboracion' | 'bug' | 'profe', id }
import { getDb, fail } from './_admin.js'

const TIPOS = {
  contacto: { col: 'contactMessages', asunto: m => `Tuthor · Mensaje de contacto de ${m.name || m.email || 'alguien'}` },
  colaboracion: { col: 'colabMessages', asunto: m => `Tuthor · Colaboración: ${m.company || m.name || m.email || 'nueva'}` },
  bug: { col: 'bugReports', asunto: m => `Tuthor · Bug en ${m.page || 'la web'}` },
  profe: { col: 'solicitudesProfe', asunto: m => `Tuthor · Alta de profe: ${m.nombre || m.email}` },
}
const IDIOMA = { es: 'castellano', en: 'inglés', ca: 'catalán' }
const DIEZ_MIN = 10 * 60 * 1000

function cuerpo(tipo, m, idioma) {
  const l = idioma ? `Idioma: ${IDIOMA[idioma] ?? idioma}\n` : ''
  if (tipo === 'profe') {
    return `${m.nombre} (${m.email}) se ha dado de alta como profe.\n\n`
      + `Centro: ${m.centro}\nEtapa: ${m.etapa}\nQué da: ${m.materias || '—'}\n${l}`
      + (m.mensaje ? `\n«${m.mensaje}»\n` : '')
      + '\nRevísala en https://www.tuthor.es/admin («Altas de profes»).'
  }
  return `De: ${m.name || '—'} <${m.email || 'sin correo'}>\n${m.company ? `Empresa: ${m.company}\n` : ''}${m.page ? `Página: ${m.page}\n` : ''}${l}\n${m.message}\n\n`
    + 'Contéstale desde tu correo o míralo en https://www.tuthor.es/admin.'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return res.status(503).json({ error: 'correo_sin_configurar' })
  const tipo = req.body?.tipo
  const id = String(req.body?.id ?? '')
  if (!TIPOS[tipo] || !/^[\w-]{6,128}$/.test(id)) return res.status(400).json({ error: 'params' })
  try {
    const db = await getDb()
    const ref = db.doc(`${TIPOS[tipo].col}/${id}`)
    // Transacción: dos llamadas a la vez no mandan dos correos
    const m = await db.runTransaction(async tx => {
      const snap = await tx.get(ref)
      if (!snap.exists) return null
      const d = snap.data()
      const creado = d.createdAt?.toMillis?.() ?? 0
      if (d.avisadoEn || Date.now() - creado > DIEZ_MIN) return null
      tx.update(ref, { avisadoEn: new Date() })
      return d
    })
    if (!m) return res.status(200).json({ ok: true, enviado: false })

    let idioma = m.idioma
    if (tipo === 'profe') idioma = (await db.doc(`users/${id}`).get()).data()?.idioma

    const { default: nodemailer } = await import('nodemailer')
    const t = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } })
    await t.sendMail({
      from: `Tuthor <${GMAIL_USER}>`,
      to: process.env.AVISO_PARA || GMAIL_USER,
      replyTo: m.email || undefined, // «Responder» le contesta directamente
      subject: TIPOS[tipo].asunto(m),
      text: cuerpo(tipo, m, idioma),
    })
    return res.status(200).json({ ok: true, enviado: true })
  } catch (err) {
    return fail(res, err, 'aviso')
  }
}
