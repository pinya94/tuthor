import { db } from './firebase'
import {
  doc, collection, addDoc, setDoc, getDoc, updateDoc,
  serverTimestamp, increment
} from 'firebase/firestore'

function todayStr() {
  return new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

function calcStreak(lastActiveDate, currentStreak) {
  const today = todayStr()
  if (lastActiveDate === today) return currentStreak // ya contado hoy
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (lastActiveDate === yesterday) return (currentStreak || 0) + 1
  return 1 // racha rota
}

// Guarda una actividad completada
export async function saveActivity(uid, data) {
  // data: { type, game, category, score, passed, timeSpent }
  await addDoc(collection(db, 'users', uid, 'activity'), {
    ...data,
    createdAt: serverTimestamp(),
  })

  // Actualiza stats globales del usuario
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  const snap = await getDoc(statsRef)
  const today = todayStr()

  if (!snap.exists()) {
    await setDoc(statsRef, {
      totalTime: data.timeSpent || 0,
      gamesPlayed: 1,
      examsPassed: data.passed ? 1 : 0,
      bestScores: data.score ? { [data.game]: data.score } : {},
      streak: 1,
      lastActiveDate: today,
    })
  } else {
    const current = snap.data()
    const newStreak = calcStreak(current.lastActiveDate, current.streak || 0)
    const updates = {
      totalTime: increment(data.timeSpent || 0),
      gamesPlayed: increment(1),
      examsPassed: data.passed ? increment(1) : increment(0),
      streak: newStreak,
      lastActiveDate: today,
    }
    if (data.score) {
      const currentBest = current.bestScores?.[data.game] || 0
      if (data.score > currentBest) {
        updates[`bestScores.${data.game}`] = data.score
      }
    }
    await updateDoc(statsRef, updates)
  }
}

// Obtiene las stats globales del usuario
export async function getStats(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'stats', 'global'))
  return snap.exists() ? snap.data() : null
}

// Crea o actualiza el perfil del usuario
export async function upsertUserProfile(user) {
  await setDoc(doc(db, 'users', user.uid), {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLogin: serverTimestamp(),
  }, { merge: true })
}

export function formatTime(seconds) {
  if (!seconds) return '0 min'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}min`
  return `${m} min`
}
