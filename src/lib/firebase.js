import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDmrfNpR4qM3Ko87i_o0HKQXbZ7iNsucpY",
  authDomain: "consigueviajareneltiempogratis.firebaseapp.com",
  projectId: "consigueviajareneltiempogratis",
  storageBucket: "consigueviajareneltiempogratis.firebasestorage.app",
  messagingSenderId: "431571381627",
  appId: "1:431571381627:web:5f738d0b35ddbc214ce1de"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// ignoreUndefinedProperties: los campos undefined se omiten en vez de lanzar
// excepción. Sin esto, saveActivity reventaba (y el .catch lo tragaba) en
// juegos que no pasan `category` (El Intruso, NumPath, GeoMapa, Línea Temporal),
// que no guardaban ni monedas ni stats.
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true })
export const googleProvider = new GoogleAuthProvider()
