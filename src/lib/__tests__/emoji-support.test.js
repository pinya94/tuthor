// Invariante de compatibilidad de emojis: el build compila igual con emojis
// que Windows 10 no sabe pintar, pero el usuario ve un tofu (▯). Este test
// caza esa clase de bug antes de desplegar.
//
// Windows 10 (Segoe UI Emoji) NO incluye el bloque Unicode "Symbols &
// Pictographs Extended-A" (U+1FA70–1FAFF, añadido 2019–2021) ni el "heavy
// equals sign" (U+1F7F0, Emoji 14.0). Esos glifos se añadieron en Windows 11.
// Regla: no usar esos emojis en código; elegir un equivalente pre-2016.
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

function walk(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '__tests__' || e.name === 'node_modules') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (/\.(jsx?|tsx?)$/.test(e.name)) out.push(p)
  }
  return out
}

// true si el code point es un emoji que Windows 10 no puede renderizar
const isWin10Missing = cp => cp === 0x1f7f0 || (cp >= 0x1fa70 && cp <= 0x1faff)

describe('compatibilidad de emojis en Windows 10', () => {
  it('ningún fichero fuente usa emojis del bloque Extended-A ni heavy-equals (tofu en Win10)', () => {
    const offenders = []
    for (const file of walk(SRC)) {
      const txt = readFileSync(file, 'utf8')
      for (const ch of txt) {
        const cp = ch.codePointAt(0)
        if (isWin10Missing(cp)) {
          offenders.push(`${file.slice(file.indexOf('src'))} → ${ch} (U+${cp.toString(16).toUpperCase()})`)
        }
      }
    }
    const unique = [...new Set(offenders)]
    expect(
      unique,
      `Emojis no soportados en Windows 10 (usa un equivalente pre-2016):\n${unique.join('\n')}`,
    ).toEqual([])
  })
})
