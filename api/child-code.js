// Generación y rotación del código de acceso del hijo.
//
// Vive en el servidor por dos motivos:
//   1. La tabla childCodes/{code} → uid es, literalmente, un llavero de todas
//      las cuentas. firestore.rules la cierra a cal y canto al cliente, así que
//      solo Admin puede escribirla.
//   2. Rotar tiene que ser atómico de cara al usuario: el código viejo deja de
//      valer en el mismo momento en que aparece el nuevo.
//
// Autenticación: Bearer con el ID token del PADRE. Una sesión de hijo se
// rechaza aunque el uid sea el mismo — es exactamente para esto que existe el
// claim childMode. Si no se comprobara, el niño podría rotar el código (y
// dejar fuera a sus hermanos) o simplemente leerlo desde la consola.
import { randomInt } from 'node:crypto'
import { db, adminAuth, CODE_ALPHABET, CODE_LENGTH } from './_admin.js'

// randomInt en vez de Math.random: esto es una credencial, y Math.random no es
// criptográficamente seguro (su secuencia es predecible si se conoce el
// estado). randomInt además no tiene el sesgo del clásico % ALPHABET.length.
function generateCode() {
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]
  }
  return code
}

async function generateUniqueCode() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode()
    const snap = await db.doc(`childCodes/${code}`).get()
    if (!snap.exists) return code
  }
  // 31^12 combinaciones: cinco colisiones seguidas significa que algo va mal,
  // no mala suerte.
  throw new Error('could_not_generate_code')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })

  const authHeader = String(req.headers.authorization ?? '')
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' })

  let decoded
  try {
    decoded = await adminAuth.verifyIdToken(authHeader.slice(7))
  } catch {
    return res.status(401).json({ error: 'unauthorized' })
  }

  // El punto entero del modo niño: misma cuenta, permisos distintos.
  if (decoded.childMode === true) return res.status(403).json({ error: 'child_session' })

  const uid = decoded.uid
  const rotate = req.body?.rotate === true

  try {
    const userRef = db.doc(`users/${uid}`)
    const userSnap = await userRef.get()
    const current = userSnap.exists ? userSnap.data().childCode : null

    if (current && !rotate) return res.status(200).json({ code: current })

    const code = await generateUniqueCode()

    const batch = db.batch()
    batch.set(db.doc(`childCodes/${code}`), {
      uid,
      createdAt: new Date(),
    })
    // El código viejo se borra, no se marca: dejarlo por ahí solo sirve para
    // que siga funcionando si algún día se olvida comprobar `revoked`.
    if (current) batch.delete(db.doc(`childCodes/${current}`))
    batch.set(userRef, { childCode: code }, { merge: true })
    await batch.commit()

    return res.status(200).json({ code })
  } catch (err) {
    console.error('child-code error:', err)
    return res.status(500).json({ error: 'unknown' })
  }
}
