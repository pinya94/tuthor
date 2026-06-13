import { db } from './firebase'
import {
  doc, collection, addDoc, setDoc, getDoc, updateDoc,
  serverTimestamp, increment
} from 'firebase/firestore'

// Actualiza contadores globales (sin datos personales)
async function incrementGlobalStats(game, today) {
  const ref = doc(db, '_stats', 'global')
  try {
    await updateDoc(ref, {
      totalSessions: increment(1),
      [`playsByGame.${game}`]: increment(1),
      [`dailySessions.${today}`]: increment(1),
    })
  } catch {
    // Documento no existe aún → crearlo
    await setDoc(ref, {
      totalUsers: 0,
      totalSessions: 1,
      playsByGame: { [game]: 1 },
      dailySessions: { [today]: 1 },
    })
  }
}

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

  const today = todayStr()
  incrementGlobalStats(data.game, today).catch(() => {})

  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  const snap = await getDoc(statsRef)
  const t = data.timeSpent || 0

  if (!snap.exists()) {
    const byGame = { [data.game]: { plays: 1, timeSpent: t, bestScore: data.score || 0 } }
    const byCategory = data.category
      ? { [data.category]: { plays: 1, timeSpent: t, examsPassed: data.passed ? 1 : 0 } }
      : {}
    await setDoc(statsRef, {
      totalTime: t,
      gamesPlayed: 1,
      examsPassed: data.passed ? 1 : 0,
      bestScores: data.score ? { [data.game]: data.score } : {},
      streak: 1,
      lastActiveDate: today,
      statsByGame: byGame,
      statsByCategory: byCategory,
    })
  } else {
    const current = snap.data()
    const newStreak = calcStreak(current.lastActiveDate, current.streak || 0)
    const updates = {
      totalTime: increment(t),
      gamesPlayed: increment(1),
      examsPassed: data.passed ? increment(1) : increment(0),
      streak: newStreak,
      lastActiveDate: today,
      [`statsByGame.${data.game}.plays`]: increment(1),
      [`statsByGame.${data.game}.timeSpent`]: increment(t),
    }
    if (data.score) {
      const currentBest = current.bestScores?.[data.game] || 0
      if (data.score > currentBest) updates[`bestScores.${data.game}`] = data.score
      const currentGameBest = current.statsByGame?.[data.game]?.bestScore || 0
      if (data.score > currentGameBest) updates[`statsByGame.${data.game}.bestScore`] = data.score
    }
    if (data.category) {
      updates[`statsByCategory.${data.category}.plays`] = increment(1)
      updates[`statsByCategory.${data.category}.timeSpent`] = increment(t)
      if (data.passed) updates[`statsByCategory.${data.category}.examsPassed`] = increment(1)
    }
    await updateDoc(statsRef, updates)
  }
}

// Guarda el resultado del reto diario (solo una vez por día)
export async function saveDailyChallenge(uid, passed) {
  const today = todayStr()
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  const snap = await getDoc(statsRef)

  if (snap.exists() && snap.data().lastDailyDate === today) return false // ya hecho

  await addDoc(collection(db, 'users', uid, 'activity'), {
    type: 'daily', game: 'pregunta-diaria', passed, createdAt: serverTimestamp(),
  })

  if (!snap.exists()) {
    await setDoc(statsRef, {
      totalTime: 0, gamesPlayed: 1, examsPassed: 0, bestScores: {},
      streak: 1, lastActiveDate: today,
      dailyStreak: 1, lastDailyDate: today, dailyTotal: 1,
    })
  } else {
    const current = snap.data()
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const currentDailyStreak = current.dailyStreak || 0
    const newDailyStreak = current.lastDailyDate === yesterday ? currentDailyStreak + 1 : 1
    const newStreak = calcStreak(current.lastActiveDate, current.streak || 0)
    await updateDoc(statsRef, {
      gamesPlayed: increment(1),
      streak: newStreak, lastActiveDate: today,
      dailyStreak: newDailyStreak, lastDailyDate: today,
      dailyTotal: increment(1),
    })
  }
  return true
}

// Comprueba si el usuario ya hizo el reto de hoy
export async function getDailyStatus(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'stats', 'global'))
  if (!snap.exists()) return { done: false, streak: 0 }
  const d = snap.data()
  return { done: d.lastDailyDate === todayStr(), streak: d.dailyStreak || 0 }
}

// Obtiene las stats globales del usuario
export async function getStats(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'stats', 'global'))
  return snap.exists() ? snap.data() : null
}

// Crea o actualiza el perfil del usuario
export async function upsertUserProfile(user) {
  const userRef = doc(db, 'users', user.uid)
  const snap = await getDoc(userRef)
  const isNew = !snap.exists()

  await setDoc(userRef, {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLogin: serverTimestamp(),
    ...(isNew ? { createdAt: serverTimestamp() } : {}),
  }, { merge: true })

  if (isNew) {
    const statsRef = doc(db, '_stats', 'global')
    try {
      await updateDoc(statsRef, { totalUsers: increment(1) })
    } catch {
      await setDoc(statsRef, { totalUsers: 1, totalSessions: 0, playsByGame: {}, dailySessions: {} })
    }
  }
}

export function formatTime(seconds) {
  if (!seconds) return '0 min'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}min`
  return `${m} min`
}
