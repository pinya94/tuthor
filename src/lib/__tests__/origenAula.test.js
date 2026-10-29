import { describe, it, expect } from 'vitest'
import { esAula } from '../origenAula'
import { examenDeReto, RETOS_TODOS } from '../../data/retosExamenes'

describe('visitas desde el aula virtual de un colegio', () => {
  it('reconoce las aulas que se han visto en Analytics y las habituales', () => {
    for (const r of [
      'https://classroom.google.com/u/0/c/NjQ',
      'https://colegiocastilla.alexiaclassroom.com/',
      'https://teams.microsoft.com/',
      'https://moodle.iesejemplo.es/course/view.php?id=3',
      'https://aulavirtual.educa.jcyl.es/',
      'https://educa.madrid.org/',
    ]) expect(esAula(r), r).toBe(true)
  })
  it('no confunde un buscador, una red social ni un referrer vacío', () => {
    for (const r of ['https://www.google.com/', 'https://www.bing.com/', 'https://chatgpt.com/', 'https://www.youtube.com/', '', 'no-es-una-url'])
      expect(esAula(r), r).toBe(false)
  })
})

describe('examenDeReto', () => {
  it('da el examen de reto de un juego o de un examen, o null', () => {
    expect(examenDeReto('nombra-compuesto')).toBe('nombra-compuesto-test')
    expect(examenDeReto('nombra-compuesto-test')).toBe('nombra-compuesto-test')
    expect(examenDeReto('no-existe')).toBe(null)
    expect(examenDeReto(null)).toBe(null)
    for (const id of RETOS_TODOS) expect(examenDeReto(id)).toBe(id)
  })
})
