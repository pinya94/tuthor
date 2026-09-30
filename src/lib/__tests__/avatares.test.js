import { describe, it, expect } from 'vitest'
import { AVATARS, DEFAULT_AVATAR_EMOJI } from '../../data/cosmetics'
import { AVATAR_SVG } from '../../components/avatares/AvatarDibujo'

// El avatar se guarda como emoji y se pinta con su dibujo: uno sin dibujo
// saldría como emoji suelto en perfil, tienda y rankings.
describe('avatares', () => {
  it('cada avatar de la tienda tiene su dibujo', () => {
    const sinDibujo = AVATARS.filter(a => !AVATAR_SVG[a.emoji]).map(a => a.id)
    expect(sinDibujo).toEqual([])
  })

  it('ids y emojis únicos (el emoji es la clave que se guarda)', () => {
    expect(new Set(AVATARS.map(a => a.id)).size).toBe(AVATARS.length)
    expect(new Set(AVATARS.map(a => a.emoji)).size).toBe(AVATARS.length)
  })

  it('el avatar por defecto es gratis y cabe en la regla de Firestore (≤16)', () => {
    expect(AVATARS.find(a => a.emoji === DEFAULT_AVATAR_EMOJI)?.price).toBe(0)
    for (const a of AVATARS) expect(a.emoji.length).toBeLessThanOrEqual(16)
  })
})
