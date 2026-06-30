import sharp from 'sharp'
import { statSync } from 'fs'
import { join } from 'path'

const publicDir = './public'

const tasks = [
  // Full-size WebP (already done, skip if exists)
  { in: 'estudio.png',  out: 'estudio.webp',    width: null, quality: 82 },
  { in: 'juegos.png',   out: 'juegos.webp',     width: null, quality: 82 },
  { in: 'racha.png',    out: 'racha.webp',      width: null, quality: 82 },
  { in: 'fondo.png',    out: 'fondo.webp',      width: null, quality: 82 },
  // Mobile-sized (400px wide)
  { in: 'estudio.png',  out: 'estudio-sm.webp', width: 400,  quality: 75 },
  { in: 'juegos.png',   out: 'juegos-sm.webp',  width: 400,  quality: 75 },
  { in: 'racha.png',    out: 'racha-sm.webp',   width: 400,  quality: 75 },
]

for (const t of tasks) {
  const input = join(publicDir, t.in)
  const output = join(publicDir, t.out)
  const beforeKB = Math.round(statSync(input).size / 1024)
  const s = sharp(input).webp({ quality: t.quality })
  if (t.width) s.resize(t.width)
  await s.toFile(output)
  const afterKB = Math.round(statSync(output).size / 1024)
  console.log(`${t.in} → ${t.out}: ${beforeKB}KB → ${afterKB}KB`)
}
