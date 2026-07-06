// ── Marcos (círculo de avatar) ─────────────────────────────────────────────
// style: applied to wrapper div (padding + borderRadius: 50%)
// animated: adds .frame-animated class

export const FRAMES = [
  {
    id: 'default',
    name: { es: 'Violeta', en: 'Violet', ca: 'Violeta' },
    emoji: '💜',
    price: 0,
    style: { background: 'rgba(139,92,246,0.5)' },
  },
  {
    id: 'silver',
    name: { es: 'Plata', en: 'Silver', ca: 'Plata' },
    emoji: '🥈',
    price: 1000,
    style: { background: 'linear-gradient(135deg, #94a3b8, #cbd5e1, #64748b)' },
  },
  {
    id: 'red',
    name: { es: 'Rojo', en: 'Red', ca: 'Vermell' },
    emoji: '❤️',
    price: 7500,
    style: { background: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
  },
  {
    id: 'blue',
    name: { es: 'Azul', en: 'Blue', ca: 'Blau' },
    emoji: '💙',
    price: 7500,
    style: { background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
  },
  {
    id: 'green',
    name: { es: 'Verde', en: 'Green', ca: 'Verd' },
    emoji: '💚',
    price: 7500,
    style: { background: 'linear-gradient(135deg, #22c55e, #15803d)' },
  },
  {
    id: 'gold',
    name: { es: 'Dorado', en: 'Gold', ca: 'Daurat' },
    emoji: '💛',
    price: 7500,
    style: { background: 'linear-gradient(135deg, #f59e0b, #d97706, #fbbf24)' },
  },
  {
    id: 'pink',
    name: { es: 'Rosa', en: 'Pink', ca: 'Rosa' },
    emoji: '🩷',
    price: 7500,
    style: { background: 'linear-gradient(135deg, #ec4899, #be185d)' },
  },
  {
    id: 'cyan',
    name: { es: 'Cian', en: 'Cyan', ca: 'Cian' },
    emoji: '🩵',
    price: 7500,
    style: { background: 'linear-gradient(135deg, #06b6d4, #0e7490)' },
  },
  {
    id: 'orange',
    name: { es: 'Naranja', en: 'Orange', ca: 'Taronja' },
    emoji: '🧡',
    price: 7500,
    style: { background: 'linear-gradient(135deg, #f97316, #c2410c)' },
  },
  {
    id: 'rainbow',
    name: { es: 'Arcoíris', en: 'Rainbow', ca: 'Arc de Sant Martí' },
    emoji: '🌈',
    price: 35000,
    animated: true,
    style: { background: 'linear-gradient(270deg, #ff0000, #ff8800, #ffff00, #00ff00, #00ffff, #0000ff, #cc00ff, #ff0000)' },
  },
  {
    id: 'fire',
    name: { es: 'Fuego', en: 'Fire', ca: 'Foc' },
    emoji: '🔥',
    price: 35000,
    animated: true,
    style: { background: 'linear-gradient(270deg, #ff0000, #ff4400, #ff8800, #ffcc00, #ff4400, #ff0000)' },
  },
  {
    id: 'galaxy',
    name: { es: 'Galaxia', en: 'Galaxy', ca: 'Galàxia' },
    emoji: '🌌',
    price: 35000,
    animated: true,
    style: { background: 'linear-gradient(270deg, #0f0c29, #7c3aed, #a78bfa, #ec4899, #7c3aed, #302b63)' },
  },
  {
    id: 'neon',
    name: { es: 'Neón', en: 'Neon', ca: 'Neó' },
    emoji: '⚡',
    price: 35000,
    animated: true,
    style: { background: 'linear-gradient(270deg, #00ff41, #00ffff, #ff00ff, #00ffff, #00ff41)' },
  },
]

export const FRAME_BY_ID = Object.fromEntries(FRAMES.map(f => [f.id, f]))

// ── Banners (fondo de fila en el ranking) ──────────────────────────────────
// bg: CSS background applied to the leaderboard row
// border: left-border color accent
// animated: reuses .frame-animated (background-position animation)

export const BANNERS = [
  {
    id: 'banner_default',
    name: { es: 'Sin banner', en: 'No banner', ca: 'Sense banner' },
    emoji: '⬜',
    price: 0,
    bg: null,
    border: null,
  },
  {
    id: 'banner_crimson',
    name: { es: 'Carmesí', en: 'Crimson', ca: 'Carmesí' },
    emoji: '🔴',
    price: 7500,
    bg: 'linear-gradient(90deg, rgba(220,38,38,0.35) 0%, rgba(220,38,38,0.08) 70%, transparent 100%)',
    border: '#dc2626',
  },
  {
    id: 'banner_ocean',
    name: { es: 'Océano', en: 'Ocean', ca: 'Oceà' },
    emoji: '🔵',
    price: 7500,
    bg: 'linear-gradient(90deg, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0.08) 70%, transparent 100%)',
    border: '#2563eb',
  },
  {
    id: 'banner_forest',
    name: { es: 'Bosque', en: 'Forest', ca: 'Bosc' },
    emoji: '🟢',
    price: 7500,
    bg: 'linear-gradient(90deg, rgba(22,163,74,0.35) 0%, rgba(22,163,74,0.08) 70%, transparent 100%)',
    border: '#16a34a',
  },
  {
    id: 'banner_amber',
    name: { es: 'Ámbar', en: 'Amber', ca: 'Ambre' },
    emoji: '🟡',
    price: 7500,
    bg: 'linear-gradient(90deg, rgba(217,119,6,0.35) 0%, rgba(217,119,6,0.08) 70%, transparent 100%)',
    border: '#d97706',
  },
  {
    id: 'banner_dusk',
    name: { es: 'Crepúsculo', en: 'Dusk', ca: 'Crepuscle' },
    emoji: '🟣',
    price: 7500,
    bg: 'linear-gradient(90deg, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.08) 70%, transparent 100%)',
    border: '#7c3aed',
  },
  {
    id: 'banner_sunset',
    name: { es: 'Atardecer', en: 'Sunset', ca: 'Posta de sol' },
    emoji: '🌅',
    price: 7500,
    bg: 'linear-gradient(90deg, rgba(249,115,22,0.4) 0%, rgba(236,72,153,0.25) 50%, transparent 100%)',
    border: '#f97316',
  },
  {
    id: 'banner_aurora',
    name: { es: 'Aurora', en: 'Aurora', ca: 'Aurora' },
    emoji: '🌌',
    price: 7500,
    bg: 'linear-gradient(90deg, rgba(6,182,212,0.4) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)',
    border: '#06b6d4',
  },
  {
    id: 'banner_fire',
    name: { es: 'Fuego', en: 'Fire', ca: 'Foc' },
    emoji: '🔥',
    price: 35000,
    animated: true,
    bg: 'linear-gradient(270deg, rgba(255,0,0,0.4), rgba(255,136,0,0.4), rgba(255,204,0,0.3), rgba(255,68,0,0.4), rgba(255,0,0,0.4))',
    border: '#ff4400',
  },
  {
    id: 'banner_galaxy',
    name: { es: 'Galaxia', en: 'Galaxy', ca: 'Galàxia' },
    emoji: '🌌',
    price: 35000,
    animated: true,
    bg: 'linear-gradient(270deg, rgba(15,12,41,0.8), rgba(124,58,237,0.5), rgba(167,139,250,0.4), rgba(236,72,153,0.4), rgba(124,58,237,0.5))',
    border: '#a78bfa',
  },
  {
    id: 'banner_neon',
    name: { es: 'Neón', en: 'Neon', ca: 'Neó' },
    emoji: '⚡',
    price: 35000,
    animated: true,
    bg: 'linear-gradient(270deg, rgba(0,255,65,0.4), rgba(0,255,255,0.4), rgba(255,0,255,0.4), rgba(0,255,255,0.4), rgba(0,255,65,0.4))',
    border: '#00ff41',
  },
  {
    id: 'banner_rainbow',
    name: { es: 'Arcoíris', en: 'Rainbow', ca: 'Arc de Sant Martí' },
    emoji: '🌈',
    price: 35000,
    animated: true,
    bg: 'linear-gradient(270deg, rgba(255,0,0,0.35), rgba(255,136,0,0.35), rgba(255,255,0,0.3), rgba(0,255,0,0.3), rgba(0,255,255,0.3), rgba(0,0,255,0.35), rgba(204,0,255,0.35))',
    border: '#ff8800',
  },
]

export const BANNER_BY_ID = Object.fromEntries(BANNERS.map(b => [b.id, b]))

// ── Avatares (emoji en vez de inicial) ────────────────────────────────────────
// Visibles en rankings y perfil para usuarios sin foto de Google
export const DEFAULT_AVATAR_EMOJI = '🦉'

export const AVATARS = [
  { id: 'av_default', emoji: '🦉', name: { es: 'Búho',      en: 'Owl',      ca: 'Mussol'   }, price: 0 },
  { id: 'av_cat',     emoji: '🐱', name: { es: 'Gato',      en: 'Cat',      ca: 'Gat'      }, price: 3000 },
  { id: 'av_dog',     emoji: '🐶', name: { es: 'Perro',     en: 'Dog',      ca: 'Gos'      }, price: 3000 },
  { id: 'av_fox',     emoji: '🦊', name: { es: 'Zorro',     en: 'Fox',      ca: 'Guineu'   }, price: 3000 },
  { id: 'av_bear',    emoji: '🐻', name: { es: 'Oso',       en: 'Bear',     ca: 'Ós'       }, price: 3000 },
  { id: 'av_panda',   emoji: '🐼', name: { es: 'Panda',     en: 'Panda',    ca: 'Panda'    }, price: 3000 },
  { id: 'av_lion',    emoji: '🦁', name: { es: 'León',      en: 'Lion',     ca: 'Lleó'     }, price: 3000 },
  { id: 'av_frog',    emoji: '🐸', name: { es: 'Rana',      en: 'Frog',     ca: 'Granota'  }, price: 3000 },
  { id: 'av_penguin', emoji: '🐧', name: { es: 'Pingüino',  en: 'Penguin',  ca: 'Pingüí'   }, price: 7500 },
  { id: 'av_dragon',  emoji: '🐲', name: { es: 'Dragón',    en: 'Dragon',   ca: 'Drac'     }, price: 7500 },
  { id: 'av_uni',     emoji: '🦄', name: { es: 'Unicornio', en: 'Unicorn',  ca: 'Unicorn'  }, price: 7500 },
  { id: 'av_shark',   emoji: '🦈', name: { es: 'Tiburón',   en: 'Shark',    ca: 'Tauró'    }, price: 7500 },
  { id: 'av_robot',   emoji: '🤖', name: { es: 'Robot',     en: 'Robot',    ca: 'Robot'    }, price: 35000 },
  { id: 'av_ghost',   emoji: '👻', name: { es: 'Fantasma',  en: 'Ghost',    ca: 'Fantasma' }, price: 35000 },
  { id: 'av_alien',   emoji: '👽', name: { es: 'Alien',     en: 'Alien',    ca: 'Alien'    }, price: 35000 },
  { id: 'av_wizard',  emoji: '🧙', name: { es: 'Mago',      en: 'Wizard',   ca: 'Mag'      }, price: 35000 },
  { id: 'av_wolf',    emoji: '🐺', name: { es: 'Lobo',      en: 'Wolf',     ca: 'Llop'     }, price: 35000 },
  { id: 'av_fire',    emoji: '🔥', name: { es: 'Fuego',     en: 'Fire',     ca: 'Foc'      }, price: 35000 },
  { id: 'av_star',    emoji: '⭐', name: { es: 'Estrella',  en: 'Star',     ca: 'Estrella' }, price: 35000 },
  { id: 'av_diamond', emoji: '💎', name: { es: 'Diamante',  en: 'Diamond',  ca: 'Diamant'  }, price: 35000 },
]

export const AVATAR_BY_ID = Object.fromEntries(AVATARS.map(a => [a.id, a]))
