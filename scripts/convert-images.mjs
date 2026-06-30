import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const publicDir = './public'
const targets = ['estudio.png', 'juegos.png', 'racha.png', 'fondo.png']

for (const file of targets) {
  const input = join(publicDir, file)
  const output = join(publicDir, file.replace('.png', '.webp'))
  const beforeKB = Math.round(statSync(input).size / 1024)
  await sharp(input)
    .webp({ quality: 82 })
    .toFile(output)
  const afterKB = Math.round(statSync(output).size / 1024)
  console.log(`${file}: ${beforeKB}KB → ${afterKB}KB webp (${Math.round((1 - afterKB/beforeKB)*100)}% menor)`)
}
