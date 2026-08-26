import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  onAuthStateChanged, signInWithPopup, signOut, signInWithCustomToken, getAdditionalUserInfo,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { upsertUserProfile } from '../lib/activity'
import { trackEvent } from '../lib/analytics'

const AuthContext = createContext({ user: undefined, logout: () => {} })

// Solo hay dos formas de entrar:
//   · Google — el adulto. Trae email real, necesario para la factura de Stripe
//     y para recuperar la cuenta.
//   · Código de hijo — entra en la misma cuenta, en modo restringido.
// No hay email+contraseña ni usuario+contraseña: una credencial más que
// recordar, que recuperar y que acaba compartida con el crío.
//
// authErrorKey() vive en src/lib/authErrors.js

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
    const cred = await signInWithPopup(auth, googleProvider)
    // isNewUser viene de Firebase, no de nada que se pueda falsear desde
    // aquí: es la señal correcta para "sign_up" (cuenta creada de verdad),
    // no "cualquier inicio de sesión" — si no, cada vuelta contaría como
    // un registro nuevo.
    if (getAdditionalUserInfo(cred)?.isNewUser) {
      trackEvent('sign_up', { method: 'google' })
    }
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
      loginWithGoogle, loginWithChildCode,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
