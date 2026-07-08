import { db } from './firebase'
import {
  doc, collection, addDoc, setDoc, getDoc, updateDoc,
  serverTimestamp, increment
} from 'firebase/firestore'

// ── Leaderboard helpers ──────────────────────────────────────────────────────

async function updateLeaderboard(game, uid, name, photoURL, score, avatarEmoji, bannerId, frameId) {
  const lbRef = doc(db, '_stats', `leaderboard_${game}`)
  try {
    const snap = await getDoc(lbRef)
    const top  = snap.exists() ? (snap.data().top ?? []) : []
    const rest = top.filter(e => e.uid !== uid)
    const entry = { uid, name: name || 'Anónimo', photoURL: photoURL || null, score }
    if (avatarEmoji) entry.avatarEmoji = avatarEmoji
    if (bannerId && bannerId !== 'banner_default') entry.bannerId = bannerId
    if (frameId && frameId !== 'default') entry.frameId = frameId
    rest.push(entry)
    const sorted = rest.sort((a, b) => b.score - a.score)
    await setDoc(lbRef, { top: sorted, updatedAt: serverTimestamp() })
  } catch { /* non-critical */ }
}

export async function getLeaderboard(game) {
  try {
    const snap = await getDoc(doc(db, '_stats', `leaderboard_${game}`))
    return snap.exists() ? (snap.data().top ?? []) : []
  } catch { return [] }
}

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
// data: { type, game, category, score, passed, timeSpent, bonusCoins?, userName?, userPhoto? }
export async function saveActivity(uid, data) {
  await addDoc(collection(db, 'users', uid, 'activity'), {
    type: data.type, game: data.game, category: data.category,
    score: data.score, passed: data.passed, timeSpent: data.timeSpent,
    createdAt: serverTimestamp(),
  })

  const today = todayStr()
  incrementGlobalStats(data.game, today).catch(() => {})

  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  const snap = await getDoc(statsRef)
  const t = data.timeSpent || 0

  const coinsEarned = data.coinsEarned !== undefined
    ? Math.min(Math.max(0, Math.round(data.coinsEarned)), 500)
    : Math.min(Math.floor((data.score || 0) / 10), 200)

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
      coins: coinsEarned,
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
      ...(data.passed && { examsPassed: increment(1) }),
      coins: increment(coinsEarned),
      streak: newStreak,
      lastActiveDate: today,
      [`statsByGame.${data.game}.plays`]: increment(1),
      [`statsByGame.${data.game}.timeSpent`]: increment(t),
    }
    if (data.score) {
      const currentBest = current.bestScores?.[data.game] || 0
      if (data.score > currentBest) {
        updates[`bestScores.${data.game}`] = data.score
        const photo = current.hidePhoto ? null : (data.userPhoto || null)
        updateLeaderboard(data.game, uid, data.userName, photo, data.score, current.equippedAvatar || null, current.equippedBanner || null, current.equippedFrame || null).catch(() => {})
      }
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

  const dailyCoins = 1000

  if (!snap.exists()) {
    await setDoc(statsRef, {
      totalTime: 0, gamesPlayed: 1, examsPassed: 0, bestScores: {},
      coins: dailyCoins,
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
      coins: increment(dailyCoins),
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

// ── Cosmetics ────────────────────────────────────────────────

// Returns { coins, ownedFrames, equippedFrame, ownedBanners, equippedBanner, ownedAvatars, equippedAvatar, hidePhoto } in one read
export async function getStatsAndCosmetics(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'stats', 'global'))
  if (!snap.exists()) return {
    coins: 0,
    ownedFrames: ['default'], equippedFrame: 'default',
    ownedBanners: ['banner_default'], equippedBanner: 'banner_default',
    ownedAvatars: [], equippedAvatar: null,
    hidePhoto: false,
  }
  const d = snap.data()
  return {
    ...d,
    coins: d.coins ?? 0,
    ownedFrames:    d.ownedFrames    ?? ['default'],
    equippedFrame:  d.equippedFrame  ?? 'default',
    ownedBanners:   d.ownedBanners   ?? ['banner_default'],
    equippedBanner: d.equippedBanner ?? 'banner_default',
    ownedAvatars:   d.ownedAvatars   ?? [],
    equippedAvatar: d.equippedAvatar ?? null,
    hidePhoto:      d.hidePhoto      ?? false,
  }
}

export async function setHidePhoto(uid, val) {
  await updateDoc(doc(db, 'users', uid, 'stats', 'global'), { hidePhoto: val })
}

// Returns { ownedFrames, equippedFrame, ownedBanners, equippedBanner }
export async function getCosmetics(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'stats', 'global'))
  if (!snap.exists()) return {
    ownedFrames: ['default'], equippedFrame: 'default',
    ownedBanners: ['banner_default'], equippedBanner: 'banner_default',
  }
  const d = snap.data()
  return {
    ownedFrames:    d.ownedFrames    ?? ['default'],
    equippedFrame:  d.equippedFrame  ?? 'default',
    ownedBanners:   d.ownedBanners   ?? ['banner_default'],
    equippedBanner: d.equippedBanner ?? 'banner_default',
  }
}

// Generic buy helper for frames and banners
async function buyCosmeticItem(uid, itemId, price, ownedKey, statsRef, snap) {
  const d = snap.data()
  const defaultOwned = ownedKey === 'ownedFrames' ? ['default'] : ownedKey === 'ownedBanners' ? ['banner_default'] : []
  const owned = d[ownedKey] ?? defaultOwned
  if (owned.includes(itemId)) return { ok: false, reason: 'already_owned' }
  if ((d.coins ?? 0) < price) return { ok: false, reason: 'not_enough_coins' }
  await updateDoc(statsRef, { coins: increment(-price), [ownedKey]: [...owned, itemId] })
  return { ok: true }
}

export async function buyFrame(uid, frameId, price) {
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  const snap = await getDoc(statsRef)
  if (!snap.exists()) return { ok: false, reason: 'not_enough_coins' }
  return buyCosmeticItem(uid, frameId, price, 'ownedFrames', statsRef, snap)
}

export async function buyBanner(uid, bannerId, price) {
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  const snap = await getDoc(statsRef)
  if (!snap.exists()) return { ok: false, reason: 'not_enough_coins' }
  return buyCosmeticItem(uid, bannerId, price, 'ownedBanners', statsRef, snap)
}

export async function equipFrame(uid, frameId) {
  await updateDoc(doc(db, 'users', uid, 'stats', 'global'), { equippedFrame: frameId })
}

export async function buyAvatar(uid, avatarId, price) {
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  const snap = await getDoc(statsRef)
  if (!snap.exists()) return { ok: false, reason: 'not_enough_coins' }
  return buyCosmeticItem(uid, avatarId, price, 'ownedAvatars', statsRef, snap)
}

export async function equipAvatar(uid, avatarEmoji) {
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  await updateDoc(statsRef, { equippedAvatar: avatarEmoji })
  // Sync to all leaderboard entries this user appears in
  const snap = await getDoc(statsRef)
  const bestScores = snap.data()?.bestScores ?? {}
  await Promise.all(Object.keys(bestScores).map(async game => {
    try {
      const lbRef = doc(db, '_stats', `leaderboard_${game}`)
      const lbSnap = await getDoc(lbRef)
      if (!lbSnap.exists()) return
      const top = lbSnap.data().top ?? []
      const idx = top.findIndex(e => e.uid === uid)
      if (idx === -1) return
      top[idx] = { ...top[idx], avatarEmoji: avatarEmoji || null }
      await updateDoc(lbRef, { top })
    } catch { /* non-critical */ }
  }))
}

export async function equipBanner(uid, bannerId) {
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  await updateDoc(statsRef, { equippedBanner: bannerId })
  // Sync banner to all leaderboard entries this user appears in
  const snap = await getDoc(statsRef)
  const bestScores = snap.data()?.bestScores ?? {}
  await Promise.all(Object.keys(bestScores).map(async game => {
    try {
      const lbRef = doc(db, '_stats', `leaderboard_${game}`)
      const lbSnap = await getDoc(lbRef)
      if (!lbSnap.exists()) return
      const top = lbSnap.data().top ?? []
      const idx = top.findIndex(e => e.uid === uid)
      if (idx === -1) return
      top[idx] = { ...top[idx], bannerId }
      await updateDoc(lbRef, { top })
    } catch { /* non-critical */ }
  }))
}

export function formatTime(seconds) {
  if (!seconds) return '0 min'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}min`
  return `${m} min`
}
