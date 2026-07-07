// Script de un solo uso: dar todos los cosméticos al admin
// Ejecutar: node scripts/give-all-cosmetics.mjs

const PROJECT_ID = 'consigueviajareneltiempogratis'
const API_KEY = 'AIzaSyDmrfNpR4qM3Ko87i_o0HKQXbZ7iNsucpY'
const TARGET_EMAIL = 'consiguetualgogratis@gmail.com'

const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

const ALL_FRAMES   = ['default','silver','red','blue','green','gold','pink','cyan','orange','rainbow','fire','galaxy','neon']
const ALL_BANNERS  = ['banner_default','banner_crimson','banner_ocean','banner_forest','banner_amber','banner_dusk','banner_sunset','banner_aurora','banner_fire','banner_galaxy','banner_neon','banner_rainbow']
const ALL_AVATARS  = ['av_default','av_cat','av_dog','av_fox','av_bear','av_panda','av_lion','av_frog','av_penguin','av_dragon','av_uni','av_shark','av_robot','av_ghost','av_alien','av_wizard','av_wolf','av_fire','av_star','av_diamond']

// Firestore REST helpers
function toValue(val) {
  if (typeof val === 'string') return { stringValue: val }
  if (typeof val === 'number') return { integerValue: String(val) }
  if (typeof val === 'boolean') return { booleanValue: val }
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toValue) } }
  if (val === null) return { nullValue: null }
  return { stringValue: String(val) }
}

function toFields(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, toValue(v)]))
}

async function getDoc(path) {
  const res = await fetch(`${BASE}/${path}?key=${API_KEY}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GET ${path}: ${res.status} ${await res.text()}`)
  return res.json()
}

async function queryCollection(collection, fieldPath, op, value) {
  const res = await fetch(`https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: collection }],
        where: { fieldFilter: { field: { fieldPath }, op, value: toValue(value) } },
        limit: 5,
      }
    })
  })
  if (!res.ok) throw new Error(`Query ${collection}: ${res.status} ${await res.text()}`)
  return res.json()
}

async function patchDoc(path, fields, updateMask) {
  const params = updateMask.map(f => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join('&')
  const res = await fetch(`${BASE}/${path}?key=${API_KEY}&${params}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: toFields(fields) })
  })
  if (!res.ok) throw new Error(`PATCH ${path}: ${res.status} ${await res.text()}`)
  return res.json()
}

async function main() {
  console.log(`Buscando usuario con email: ${TARGET_EMAIL}`)

  // 1. Buscar UID en la colección 'users'
  const results = await queryCollection('users', 'email', 'EQUAL', TARGET_EMAIL)
  const found = results.find(r => r.document)
  if (!found) {
    console.error('Usuario no encontrado en Firestore. Asegúrate de haber iniciado sesión al menos una vez.')
    process.exit(1)
  }
  const docName = found.document.name // projects/.../documents/users/UID
  const uid = docName.split('/').pop()
  console.log(`✓ UID encontrado: ${uid}`)

  // 2. Actualizar stats/global con todos los cosméticos
  const statsPath = `users/${uid}/stats/global`
  const fields = {
    ownedFrames:   ALL_FRAMES,
    equippedFrame: 'default',
    ownedBanners:  ALL_BANNERS,
    equippedBanner: 'banner_default',
    ownedAvatars:  ALL_AVATARS,
    equippedAvatar: '🦉',
    coins: 999999,
  }
  const mask = Object.keys(fields)

  await patchDoc(statsPath, fields, mask)
  console.log(`✓ Todos los cosméticos asignados a ${uid}`)
  console.log(`  Frames:  ${ALL_FRAMES.length}`)
  console.log(`  Banners: ${ALL_BANNERS.length}`)
  console.log(`  Avatars: ${ALL_AVATARS.length}`)
  console.log(`  Coins:   999999`)
}

main().catch(err => { console.error(err); process.exit(1) })
