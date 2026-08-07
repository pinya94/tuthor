import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  onAuthStateChanged, signInWithPopup, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithCustomToken, sendPasswordResetEmail, updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { upsertUserProfile } from '../lib/activity'

const AuthContext = createContext({ user: undefined, logout: () => {} })

// Convierte username en email interno — nunca se muestra al usuario.
// OJO: las cuentas creadas así NO tienen email real, así que no pueden
// recuperar la contraseña ni recibir una factura. Sirven para un alumno, no
// para quien paga: el carril de pago exige registerWithEmail().
function usernameToEmail(username) {
  return `${username.toLowerCase()}@tuthor.app`
}

// hasRealEmail() y authErrorKey() viven en src/lib/authErrors.js

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = cargando
  // true = sesión abierta con el código del hijo. Padre e hijo comparten uid,
  // así que esto es lo ÚNICO que los distingue. Sale del claim childMode que
  // pone api/child-login.js dentro del token, no de nada que el cliente pueda
  // inventarse: firestore.rules lee ese mismo claim.
  const [childMode, setChildMode] = useState(false)
  const lastUpsertedUid = useRef(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)

      let isChild = false
      if (u) {
        // Si la lectura del token falla, se asume modo niño: el fallo seguro
        // aquí es restringir de más, nunca abrir los ajustes o la facturación
        // por un error de red.
        try {
          const result = await u.getIdTokenResult()
          isChild = result.claims.childMode === true
        } catch { isChild = true }
      }
      setChildMode(isChild)

      // El upsert se salta en modo niño a propósito: una sesión de custom
      // token no lleva email/displayName/photoURL, y reescribir el perfil con
      // huecos pisaría los datos del padre.
      if (u && !isChild && u.uid !== lastUpsertedUid.current) {
        lastUpsertedUid.current = u.uid
        await upsertUserProfile(u)
      }
    })
    return unsub
  }, [])

  async function loginWithGoogle() {
    await signInWithPopup(auth, googleProvider)
  }

  async function registerWithUsername(username, password) {
    const email = usernameToEmail(username)
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: username })
    // Forzamos que el contexto vea el displayName actualizado
    setUser({ ...cred.user, displayName: username })
  }

  async function loginWithUsername(username, password) {
    const email = usernameToEmail(username)
    await signInWithEmailAndPassword(auth, email, password)
  }

  // ── Carril de email real ───────────────────────────────────────────────────
  // El que usa quien paga: hace falta un email de verdad para la factura de
  // Stripe, los avisos de renovación y poder recuperar la contraseña. Google
  // sigue valiendo (también da email real); esto es para quien no lo quiere.

  async function registerWithEmail(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
    if (displayName) {
      await updateProfile(cred.user, { displayName })
      // onAuthStateChanged ya disparó con el usuario SIN displayName (el
      // updateProfile es posterior), así que el contexto se quedaría con el
      // nombre vacío hasta el siguiente refresco. Lo empujamos a mano, igual
      // que hace registerWithUsername.
      setUser({ ...cred.user, displayName })
    }
    return cred.user
  }

  async function loginWithEmail(email, password) {
    await signInWithEmailAndPassword(auth, email.trim(), password)
  }

  // No revela si el email existe: Firebase responde igual en ambos casos y la
  // UI dice siempre "si esa cuenta existe, te hemos enviado un correo".
  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email.trim())
  }

  // ── Entrada del hijo con el código del padre ───────────────────────────────
  // El niño no tiene email ni contraseña: escribe el código y entra en la
  // cuenta del padre en modo restringido. El token lo mintea el servidor
  // (api/child-login.js) con el claim childMode; aquí solo se canjea.
  async function loginWithChildCode(code) {
    let res
    try {
      res = await fetch('/api/child-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
    } catch {
      const err = new Error('network'); err.code = 'auth/network-request-failed'; throw err
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      const err = new Error(body.error ?? 'unknown')
      err.code = body.error ?? 'unknown'
      throw err
    }

    const { token } = await res.json()
    await signInWithCustomToken(auth, token)
  }

  async function logout() {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{
      user, childMode, logout,
      loginWithGoogle,
      registerWithUsername, loginWithUsername,
      registerWithEmail, loginWithEmail, resetPassword,
      loginWithChildCode,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
