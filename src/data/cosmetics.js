// Frame cosmetics catalog
// style: { background, padding, borderRadius } applied to the wrapper div
// animated: adds .frame-animated class (CSS keyframe animation)

export const FRAMES = [
  {
    id: 'default',
    name: { es: 'Violeta', en: 'Violet', ca: 'Violeta' },
    emoji: '💜',
    price: 0,
    tier: 'free',
    style: { background: 'rgba(139,92,246,0.5)' },
  },
  {
    id: 'silver',
    name: { es: 'Plata', en: 'Silver', ca: 'Plata' },
    emoji: '🩶',
    price: 1000,
    tier: 'basic',
    style: { background: 'linear-gradient(135deg, #94a3b8, #cbd5e1, #64748b)' },
  },
  // ── 7 500 — color ─────────────────────────────────────────
  {
    id: 'red',
    name: { es: 'Rojo', en: 'Red', ca: 'Vermell' },
    emoji: '❤️',
    price: 7500,
    tier: 'color',
    style: { background: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
  },
  {
    id: 'blue',
    name: { es: 'Azul', en: 'Blue', ca: 'Blau' },
    emoji: '💙',
    price: 7500,
    tier: 'color',
    style: { background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
  },
  {
    id: 'green',
    name: { es: 'Verde', en: 'Green', ca: 'Verd' },
    emoji: '💚',
    price: 7500,
    tier: 'color',
    style: { background: 'linear-gradient(135deg, #22c55e, #15803d)' },
  },
  {
    id: 'gold',
    name: { es: 'Dorado', en: 'Gold', ca: 'Daurat' },
    emoji: '💛',
    price: 7500,
    tier: 'color',
    style: { background: 'linear-gradient(135deg, #f59e0b, #d97706, #fbbf24)' },
  },
  {
    id: 'pink',
    name: { es: 'Rosa', en: 'Pink', ca: 'Rosa' },
    emoji: '🩷',
    price: 7500,
    tier: 'color',
    style: { background: 'linear-gradient(135deg, #ec4899, #be185d)' },
  },
  {
    id: 'cyan',
    name: { es: 'Cian', en: 'Cyan', ca: 'Cian' },
    emoji: '🩵',
    price: 7500,
    tier: 'color',
    style: { background: 'linear-gradient(135deg, #06b6d4, #0e7490)' },
  },
  {
    id: 'orange',
    name: { es: 'Naranja', en: 'Orange', ca: 'Taronja' },
    emoji: '🧡',
    price: 7500,
    tier: 'color',
    style: { background: 'linear-gradient(135deg, #f97316, #c2410c)' },
  },
  // ── 35 000 — holográfico / diseño ─────────────────────────
  {
    id: 'rainbow',
    name: { es: 'Arcoíris', en: 'Rainbow', ca: 'Arc de Sant Martí' },
    emoji: '🌈',
    price: 35000,
    tier: 'holo',
    animated: true,
    style: { background: 'linear-gradient(270deg, #ff0000, #ff8800, #ffff00, #00ff00, #00ffff, #0000ff, #cc00ff, #ff0000)' },
  },
  {
    id: 'fire',
    name: { es: 'Fuego', en: 'Fire', ca: 'Foc' },
    emoji: '🔥',
    price: 35000,
    tier: 'holo',
    animated: true,
    style: { background: 'linear-gradient(270deg, #ff0000, #ff4400, #ff8800, #ffcc00, #ff4400, #ff0000)' },
  },
  {
    id: 'galaxy',
    name: { es: 'Galaxia', en: 'Galaxy', ca: 'Galàxia' },
    emoji: '🌌',
    price: 35000,
    tier: 'holo',
    animated: true,
    style: { background: 'linear-gradient(270deg, #0f0c29, #7c3aed, #a78bfa, #ec4899, #7c3aed, #302b63)' },
  },
  {
    id: 'neon',
    name: { es: 'Neón', en: 'Neon', ca: 'Neó' },
    emoji: '⚡',
    price: 35000,
    tier: 'holo',
    animated: true,
    style: { background: 'linear-gradient(270deg, #00ff41, #00ffff, #ff00ff, #00ffff, #00ff41)' },
  },
]

export const FRAME_BY_ID = Object.fromEntries(FRAMES.map(f => [f.id, f]))

export const TIER_LABELS = {
  free:  { es: 'Gratis',       en: 'Free',        ca: 'Gratis' },
  basic: { es: 'Básico',       en: 'Basic',       ca: 'Bàsic' },
  color: { es: 'Color',        en: 'Color',       ca: 'Color' },
  holo:  { es: 'Holográfico',  en: 'Holographic', ca: 'Hologràfic' },
}
