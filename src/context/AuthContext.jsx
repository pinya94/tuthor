import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged, signInWithPopup, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { upsertUserProfile } from '../lib/activity'

const AuthContext = createContext(null)

// Convierte username en email interno — nunca se muestra al usuario
function usernameToEmail(username) {
  return `${username.toLowerCase()}@tuthor.app`
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = cargando

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) await upsertUserProfile(u)
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

  async function logout() {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, registerWithUsername, loginWithUsername, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
