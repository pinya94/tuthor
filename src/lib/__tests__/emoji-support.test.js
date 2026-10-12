// Invariante de compatibilidad de emojis: el build compila igual con emojis
// que Windows 10 no sabe pintar, pero el usuario ve un tofu (▯). Este test
// caza esa clase de bug antes de desplegar.
//
// Windows 10 hasta la 1809 (y la LTSC 2019, habitual en los ordenadores de
// los colegios) trae Segoe UI Emoji con Emoji 11: todo lo de Unicode 12 o
// posterior sale como tofu. Las versiones posteriores añadieron Emoji 12, pero
// nada de Unicode 13 en adelante (🦭 🦬 🛟 🟰 salen en tofu incluso en 22H2).
// Regla: no usar emojis de Unicode 12 o posterior; elegir un equivalente de
// Unicode 11 o anterior (🧍 → 🧑, 🟢 → 💚, 🧊 → ❄️, 🦬 → 🐃…).
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

// Huecos de los bloques de emoji que se rellenaron en Unicode 12 o después.
// Todo lo que queda fuera de estos rangos en esos bloques es de Unicode ≤ 11.
const RANGOS_NUEVOS = [
  [0x1f6d5, 0x1f6df], // 🛕 hindu temple (12) … 🛝🛞🛟 (14)
  [0x1f6fa, 0x1f6ff], // 🛺 auto rickshaw (12), 🛻 🛼 (13)
  [0x1f7e0, 0x1f7ff], // 🟠🟡🟢🟣🟤 círculos y 🟥🟧🟨🟩🟦🟪🟫 cuadrados (12), 🟰 (14)
  [0x1f90c, 0x1f90f], // 🤌 (13), 🤍 🤎 🤏 (12)
  [0x1f93f, 0x1f93f], // 🤿 diving mask (12)
  [0x1f971, 0x1f972], // 🥱 (12), 🥲 (13)
  [0x1f977, 0x1f979], // 🥷 🥸 (13), 🥹 (14)
  [0x1f97b, 0x1f97b], // 🥻 sari (12)
  [0x1f9a3, 0x1f9af], // 🦣 🦤 (13), 🦥 🦦 🦧 🦨 🦩 🦪 (12), 🦫 🦬 🦭 (13), 🦮 🦯 (12)
  [0x1f9ba, 0x1f9bf], // 🦺 🦻 🦼 🦽 🦾 🦿 (12)
  [0x1f9c3, 0x1f9cf], // 🧃 … 🧊 (12), 🧋 (13), 🧌 (14), 🧍 🧎 🧏 (12)
  [0x1fa70, 0x1faff], // Symbols & Pictographs Extended-A entero (12+)
]
const isWin10Missing = cp => RANGOS_NUEVOS.some(([a, b]) => cp >= a && cp <= b)

// Secuencias ZWJ que no existían en Emoji 11: Windows las pinta como dos
// emojis sueltos (🐻‍❄️ → 🐻❄️). Sus componentes son antiguos, así que el
// veto por code point no las ve. Las de Emoji ≤ 11 (👨‍⚕️, 👩‍🏫, 🏳️‍🌈,
// 👨‍👩‍👧, 🚶‍♀️…) siguen permitidas.
const ZWJ_NUEVAS = [
  [/\u{1F9D1}[\u{1F3FB}-\u{1F3FF}]?‍|‍\u{1F9D1}/u, 'persona neutra 🧑‍… (12.1+): usa 👨‍… o 👩‍…'],
  [/‍(?:\u{1F91D}|\u{1F37C}|⬛|⚧|➡|↔|↕)/u, 'ZWJ con 🤝 🍼 ⬛ ⚧ ➡ ↔ ↕ (12+)'],
  [/\u{1F43B}‍❄/u, '🐻‍❄️ oso polar (13)'],
  [/❤️?‍\u{1F525}/u, '❤️‍🔥 (13.1)'],
  [/\u{1F62E}‍\u{1F4A8}|\u{1F635}‍\u{1F4AB}/u, '😮‍💨 / 😵‍💫 (13.1)'],
  [/⛓️?‍\u{1F4A5}/u, '⛓️‍💥 (15.1)'],
]

describe('compatibilidad de emojis en Windows 10', () => {
  it('ningún fichero fuente usa emojis de Unicode 12 o posterior (tofu en Win10)', () => {
    const offenders = []
    for (const file of walk(SRC)) {
      const txt = readFileSync(file, 'utf8')
      const rel = file.slice(file.indexOf('src'))
      for (const ch of txt) {
        const cp = ch.codePointAt(0)
        if (isWin10Missing(cp)) {
          offenders.push(`${rel} → ${ch} (U+${cp.toString(16).toUpperCase()})`)
        }
      }
      if (txt.includes('‍')) {
        for (const [re, nombre] of ZWJ_NUEVAS) {
          if (re.test(txt)) offenders.push(`${rel} → secuencia ZWJ nueva: ${nombre}`)
        }
      }
    }
    const unique = [...new Set(offenders)]
    expect(
      unique,
      `Emojis no soportados en Windows 10 (usa un equivalente de Unicode 11 o anterior):\n${unique.join('\n')}`,
    ).toEqual([])
    // Recorre src entero carácter a carácter, y src no para de crecer: sola
    // tarda medio segundo, pero con la suite completa por delante se pasaba
    // del límite de 5 s por defecto y fallaba por tiempo, no por un emoji.
  }, 30000)

  it('el veto distingue emojis nuevos de los antiguos', () => {
    const nuevos = ['🧍', '🟢', '🟡', '🧊', '🦭', '🦬', '🛟', '🟰', '🩰', '🤿', '🧃']
    const antiguos = ['🧑', '🚶', '💚', '💛', '🧡', '🔴', '❄️', '🐃', '🦕', '🥰', '🧿', '🧀', '🦝', '🧬', '🧱']
    for (const e of nuevos) expect(isWin10Missing(e.codePointAt(0)), e).toBe(true)
    for (const e of antiguos) expect(isWin10Missing(e.codePointAt(0)), e).toBe(false)
    const zwjVetada = s => ZWJ_NUEVAS.some(([re]) => re.test(s))
    for (const s of ['🐻‍❄️', '🧑‍⚖️', '🧑‍🔬', '🧑🏽‍💻', '❤️‍🔥', '🐈‍⬛', '🚶‍➡️']) expect(zwjVetada(s), s).toBe(true)
    for (const s of ['👨‍⚖️', '👩‍🔬', '👨‍👩‍👧', '🚶‍♀️', '🏳️‍🌈', '🏴‍☠️', '👁️‍🗨️']) expect(zwjVetada(s), s).toBe(false)
  })
})
