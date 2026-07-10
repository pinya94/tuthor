import { db } from './firebase'
import {
  doc, collection, addDoc, setDoc, getDoc, updateDoc,
  serverTimestamp, increment,
  query, orderBy, limit, where, getDocs, getCountFromServer,
} from 'firebase/firestore'
import { isKnownGame } from './games'

// ── Leaderboard helpers ──────────────────────────────────────────────────────
// Cada jugador tiene su propio documento en leaderboards/{game}/entries/{uid}:
// sin límite de tamaño, sin carreras (cada uno escribe solo el suyo) y el
// ranking se consulta con orderBy/count sin descargar la lista entera.

const lbEntryRef = (game, uid) => doc(db, 'leaderboards', game, 'entries', uid)
const lbEntriesCol = game => collection(db, 'leaderboards', game, 'entries')

async function updateLeaderboard(game, uid, name, photoURL, score, avatarEmoji, bannerId, frameId) {
  try {
    const entry = {
      name: name || 'Anónimo',
      photoURL: photoURL || null,
      score,
      updatedAt: serverTimestamp(),
    }
    if (avatarEmoji) entry.avatarEmoji = avatarEmoji
    if (bannerId && bannerId !== 'banner_default') entry.bannerId = bannerId
    if (frameId && frameId !== 'default') entry.frameId = frameId
    await setDoc(lbEntryRef(game, uid), entry)
  } catch { /* non-critical */ }
}

// Top-N del ranking. Si la subcolección aún está vacía, cae al documento
// legacy (_stats/leaderboard_{game}) para no perder los rankings antiguos.
export async function getLeaderboard(game, topN = 10) {
  try {
    const snap = await getDocs(query(lbEntriesCol(game), orderBy('score', 'desc'), limit(topN)))
    if (!snap.empty) return snap.docs.map(d => ({ uid: d.id, ...d.data() }))
    const legacy = await getDoc(doc(db, '_stats', `leaderboard_${game}`))
    return legacy.exists() ? (legacy.data().top ?? []).slice(0, topN) : []
  } catch { return [] }
}

// Posición exacta del jugador: cuenta cuántos scores hay por encima del suyo.
// Dos counts agregados — no descarga entradas. Si la subcolección aún está
// vacía, cae al array legacy para no perder los rankings antiguos.
// Devuelve { rank, total } o null.
export async function getUserRank(game, score) {
  if (score === undefined || score === null) return null
  try {
    const total = await getCountFromServer(lbEntriesCol(game))
    const t = total.data().count
    if (t > 0) {
      const above = await getCountFromServer(query(lbEntriesCol(game), where('score', '>', score)))
      return { rank: above.data().count + 1, total: t }
    }
    // Fallback legacy: rank calculado sobre el array congelado
    const legacy = await getDoc(doc(db, '_stats', `leaderboard_${game}`))
    if (!legacy.exists()) return null
    const top = legacy.data().top ?? []
    if (top.length === 0) return null
    const above = top.filter(e => (e.score ?? 0) > score).length
    return { rank: above + 1, total: top.length }
  } catch { return null }
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

// Forma completa del documento de stats de un usuario nuevo. Única definición:
// la usan saveActivity y saveDailyChallenge para que el doc nunca nazca
// incompleto sea cual sea la primera actividad del usuario.
function newStatsDoc(today) {
  return {
    totalTime: 0,
    gamesPlayed: 0,
    examsPassed: 0,
    bestScores: {},
    coins: 0,
    streak: 1,
    lastActiveDate: today,
    statsByGame: {},
    statsByCategory: {},
  }
}

// Guarda una actividad completada
// data: { type, game, category, score, passed, timeSpent, bonusCoins?, userName?, userPhoto? }
export async function saveActivity(uid, data) {
  // Los juegos deben estar en el registro (src/lib/games.js) para aparecer en
  // el perfil. Los exámenes (type 'examen'/'daily') tienen sus propios IDs.
  if (import.meta.env.DEV && data.type === 'juego' && !isKnownGame(data.game)) {
    console.warn(`[saveActivity] gameId '${data.game}' no está en el registro de src/lib/games.js — no aparecerá en el perfil`)
  }
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
    await setDoc(statsRef, {
      ...newStatsDoc(today),
      totalTime: t,
      gamesPlayed: 1,
      examsPassed: data.passed ? 1 : 0,
      bestScores: (data.type === 'juego' && data.score) ? { [data.game]: data.score } : {},
      coins: coinsEarned,
      statsByGame: { [data.game]: { plays: 1, timeSpent: t, bestScore: data.type === 'juego' ? (data.score || 0) : 0 } },
      statsByCategory: data.category
        ? { [data.category]: { plays: 1, timeSpent: t, examsPassed: data.passed ? 1 : 0 } }
        : {},
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
    // Récord y leaderboard SOLO para juegos. Los exámenes son para estudiar
    // (máx 10 aciertos): no compiten en ranking, solo cuentan partidas,
    // minutos y aprobados para el perfil.
    if (data.type === 'juego' && data.score) {
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

  // Equiparado a la partida perfecta de un juego (tope 200) para no
  // desequilibrar la economía de monedas.
  const dailyCoins = 200

  if (!snap.exists()) {
    await setDoc(statsRef, {
      ...newStatsDoc(today),
      gamesPlayed: 1,
      coins: dailyCoins,
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

// Sincroniza un campo cosmético en todas las entradas de leaderboard del usuario.
// Cada entrada es un doc propio: un updateDoc por juego jugado, sin leer nada.
async function syncCosmeticToLeaderboards(uid, fields) {
  const snap = await getDoc(doc(db, 'users', uid, 'stats', 'global'))
  const bestScores = snap.data()?.bestScores ?? {}
  await Promise.all(Object.keys(bestScores).map(game =>
    updateDoc(lbEntryRef(game, uid), fields).catch(() => { /* entrada aún no existe */ })
  ))
}

export async function equipAvatar(uid, avatarEmoji) {
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  await updateDoc(statsRef, { equippedAvatar: avatarEmoji })
  await syncCosmeticToLeaderboards(uid, { avatarEmoji: avatarEmoji || null })
}

export async function equipBanner(uid, bannerId) {
  const statsRef = doc(db, 'users', uid, 'stats', 'global')
  await updateDoc(statsRef, { equippedBanner: bannerId })
  await syncCosmeticToLeaderboards(uid, { bannerId })
}

export function formatTime(seconds) {
  if (!seconds) return '0 min'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}min`
  return `${m} min`
}
