// Invariantes del banco de frases de La Pieza que Falta.
// Lo que de verdad vigilan: que la solución esté SIEMPRE entre las fichas y una
// sola vez (un distractor idéntico a una pieza de la solución haría que colocar
// 'la otra' contase como fallo sin serlo) y que la pista exista de verdad dentro
// del texto (si no, no se subraya nada y la frase pierde lo que enseña).
import { it, expect } from 'vitest'
import { FRASES, TEMA_IDS, MEZCLA, genRound, esCorrecta, solucionTexto } from '../piezaQueFalta'

it('el banco de frases es coherente', () => {
  const ids = new Set()
  for (const f of FRASES) {
    expect(ids.has(f.id), `id repetido: ${f.id}`).toBe(false)
    ids.add(f.id)
    expect(TEMA_IDS, `tema desconocido en ${f.id}`).toContain(f.tema)
    expect(f.texto.split('___').length, `${f.id} debe tener exactamente un hueco`).toBe(2)
    if (f.pista) expect(f.texto.includes(f.pista), `${f.id}: la pista no está en el texto`).toBe(true)
    expect(f.sol.length, `${f.id} sin solución`).toBeGreaterThan(0)
    expect(f.dis.length, `${f.id} sin distractores`).toBeGreaterThan(0)
    expect(f.rule?.es, `${f.id} sin regla`).toBeTruthy()
    expect(f.rule?.en && f.rule?.ca, `${f.id} regla incompleta`).toBeTruthy()
  }
  // El juego mezcla los cinco temas y dura 45 s, así que en una partida buena
  // se ven ~15 frases. El mínimo alto es para el otro sitio donde se usan: el
  // examen por tema saca 10 frases de UN solo tema, y con pocas se repetiría.
  for (const t of TEMA_IDS) {
    expect(FRASES.filter(f => f.tema === t).length, `pocas frases en ${t}`).toBeGreaterThanOrEqual(50)
  }
})

it('una ronda siempre se puede resolver con sus fichas', () => {
  for (const t of [...TEMA_IDS, MEZCLA]) {
    for (let i = 0; i < 200; i++) {
      const r = genRound(t)
      expect(r).toBeTruthy()
      // La solución tiene que estar entera entre las fichas, y una sola vez
      for (const p of r.sol) expect(r.chips.filter(c => c === p).length, `${r.id}: ficha ${p}`).toBe(1)
      const idx = r.sol.map(p => r.chips.indexOf(p))
      expect(esCorrecta(r, idx.map(i2 => r.chips[i2])), `${r.id} no se valida`).toBe(true)
      expect(solucionTexto(r)).not.toMatch(/ {2}| \.|___/)
    }
  }
})

// Los dos modos que existen, y que de verdad son distintos: jugando se mezcla
// todo, y una tarea del profesor filtra por su tema. Si el filtro se rompiera,
// la tarea de "Present Perfect" pasaría a preguntar de artículos en silencio.
it('mezcla saca de todos los temas y un tema asignado solo del suyo', () => {
  const vistos = new Set()
  for (let i = 0; i < 600; i++) vistos.add(genRound(MEZCLA).tema)
  expect([...vistos].sort(), 'la mezcla debería llegar a los cinco temas').toEqual([...TEMA_IDS].sort())

  for (const t of TEMA_IDS) {
    for (let i = 0; i < 200; i++) {
      expect(genRound(t).tema, `el tema ${t} ha sacado otra cosa`).toBe(t)
    }
  }
})
