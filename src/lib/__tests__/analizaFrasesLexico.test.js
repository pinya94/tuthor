// Analiza la Frase: las frases generadas respetan el léxico (frasesLexico.js).
// Se generan miles por idioma y se audita cada combinación con los `lex` que
// el motor deja en cada palabra: verbo → objeto, adjetivo → sustantivo,
// verbo → adverbio, verbo → lugar/compañía, lugar → sujeto.
import { describe, it, expect } from 'vitest'
import { NOMBRES, ADJETIVOS, ADVERBIOS, TRANSITIVOS, DITRANSITIVOS, INTRANSITIVOS, COPULATIVOS } from '../../data/frasesLexico'
import { makeTemplates, encaja, claseSujeto, contract, elide } from '../grammarGen'
import { genRound } from '../analizaFrases'

const LANGS = ['es', 'ca', 'en']
const byId = list => Object.fromEntries(list.map(x => [x.id, x]))
const N = byId(NOMBRES), A = byId(ADJETIVOS), ADV = byId(ADVERBIOS)
const VT = byId([...TRANSITIVOS, ...DITRANSITIVOS]), VI = byId(INTRANSITIVOS), VC = byId(COPULATIVOS)
const esSujeto = (v, n) => v.suj.some(e => e === claseSujeto(n) || n.tags.includes(e))

// Generador determinista para que un fallo se pueda reproducir
function semilla(s) { return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 } }

function frases(lang, n = 1500) {
  const rand = semilla(42)
  const out = []
  for (const t of makeTemplates(lang)) for (let i = 0; i < n; i++) out.push({ id: t.id, units: t.build(rand) })
  return out
}

describe('léxico de Analiza la Frase', () => {
  it('cada concepto tiene las formas bien formadas en cada idioma', () => {
    for (const n of NOMBRES) for (const l of LANGS) {
      const f = n[l]
      expect(f, `${n.id}.${l}`).toBeTruthy()
      expect(f.length, `${n.id}.${l}`).toBe(l === 'en' ? 2 : 3)
      if (l !== 'en') expect(['m', 'f'], `${n.id}.${l}`).toContain(f[2])
    }
    for (const a of ADJETIVOS) for (const l of ['es', 'ca']) expect(a[l].length, `${a.id}.${l}`).toBe(4)
    for (const n of NOMBRES.filter(x => x.tags.includes('lugar'))) {
      expect(n.caben?.length, n.id).toBeGreaterThan(0)
      expect(['in', 'on'], n.id).toContain(n.enEn)
    }
  })

  it('cada verbo y adjetivo tiene al menos una pareja posible', () => {
    for (const v of [...TRANSITIVOS, ...DITRANSITIVOS]) expect(NOMBRES.filter(n => n.tipo === 'cosa' && encaja(n, v.obj)).length, v.id).toBeGreaterThan(0)
    for (const v of INTRANSITIVOS) expect(NOMBRES.filter(n => esSujeto(v, n)).length, v.id).toBeGreaterThan(0)
    for (const a of ADJETIVOS) expect(NOMBRES.filter(n => encaja(n, a.para)).length, a.id).toBeGreaterThan(0)
    for (const v of INTRANSITIVOS) for (const id of v.adv) expect(ADV[id], `${v.id} → ${id}`).toBeTruthy()
  })

  for (const lang of LANGS) {
    it(`${lang}: todas las combinaciones generadas están permitidas`, () => {
      for (const { id, units } of frases(lang)) {
        const txt = units.map(u => u.text).join(' ')
        const verbo = units.find(u => u.classes.includes('verbo'))
        const sujeto = units.find(u => u.roles.includes('sujeto') && u.classes.includes('sustantivo'))
        // Adjetivo ↔ sustantivo (dentro del grupo o como atributo)
        units.forEach((u, i) => {
          if (!u.classes.includes('adjetivo')) return
          const a = A[u.lex]
          const nuc = u.roles.includes('atributo') ? sujeto
            : units.slice(Math.max(0, i - 2), i + 3).find(x => x.classes.includes('sustantivo') && x.roles.join() === u.roles.join() && !x.roles.includes('nucleo-sujeto') === !u.roles.includes('nucleo-sujeto'))
            ?? units.slice(Math.max(0, i - 2), i + 3).find(x => x.classes.includes('sustantivo'))
          if (!nuc) return // atributo de un pronombre: no hay sustantivo
          expect(encaja(N[nuc.lex], a.para), `${txt} (${a.id} con ${nuc.lex})`).toBe(true)
          if (u.roles.includes('atributo')) {
            const admite = VC[verbo.lex][lang][2]
            if (admite !== 'ambos') expect(a.clase, `${txt}`).toBe(admite)
          } else expect(a.clase, `${txt}: «${a.id}» es de estado, no va dentro del grupo`).toBe('cualidad')
        })
        // Verbo transitivo ↔ objeto
        const cd = units.find(u => u.roles.includes('cd') && u.classes.includes('sustantivo'))
        if (cd) expect(encaja(N[cd.lex], VT[verbo.lex].obj), `${txt}`).toBe(true)
        // Intransitivo ↔ sujeto, adverbio, lugar y compañía
        if (VI[verbo.lex]) {
          const v = VI[verbo.lex]
          if (sujeto) expect(esSujeto(v, N[sujeto.lex]), `${txt}`).toBe(true)
          const adv = units.find(u => u.classes.includes('adverbio'))
          if (adv) expect(v.adv, `${txt}`).toContain(adv.lex)
          const prep = units.find(u => u.classes.includes('preposicion') && u.roles.includes('cc'))
          if (prep) {
            const otro = units[units.indexOf(prep) + (units[units.indexOf(prep) + 1]?.classes.includes('sustantivo') ? 1 : 2)]
            const cc = v.cc.find(c => c.prep === prep.lex && (c.lugar ? N[otro.lex].tags.includes('lugar') : !N[otro.lex].tags.includes('lugar')))
            expect(cc, `${txt}`).toBeTruthy()
            if (cc.lugar) {
              expect(encaja(N[otro.lex], cc.lugar), `${txt}`).toBe(true)
              expect(N[otro.lex].caben, `${txt}`).toContain(claseSujeto(N[sujeto.lex]))
            } else {
              expect(cc.comp, `${txt}`).toContain(claseSujeto(N[otro.lex]))
            }
          }
        }
        // Lugares de la frase larga: siempre caben personas
        if (id === 'g-svo-cc') {
          const sitio = units[units.length - 1]
          expect(N[sitio.lex].caben, txt).toContain('persona')
        }
      }
    })

    it(`${lang}: sin adverbios de pasado ni palabras vetadas`, () => {
      const vetadas = /\b(ayer|ahir|yesterday|always|It)\b/
      for (const { units } of frases(lang, 300)) expect(units.map(u => u.text).join(' ')).not.toMatch(vetadas)
    })

    it(`${lang}: todos los verbos, adjetivos y adverbios del idioma acaban saliendo`, () => {
      const vistos = new Set()
      for (const { units } of frases(lang)) for (const u of units) if (u.lex) vistos.add(u.lex)
      const deberian = [...TRANSITIVOS, ...DITRANSITIVOS, ...INTRANSITIVOS, ...COPULATIVOS, ...ADJETIVOS, ...ADVERBIOS, ...NOMBRES].filter(x => x[lang]).map(x => x.id)
      const nunca = deberian.filter(id => !vistos.has(id))
      expect(nunca, `nunca salen en ${lang}`).toEqual([])
    })
  }

  it('en inglés: a/an según la palabra siguiente', () => {
    for (const { units } of frases('en', 500)) {
      units.forEach((u, i) => {
        if (u.text.toLowerCase() === 'a') expect(units[i + 1].text, units.map(x => x.text).join(' ')).toMatch(/^[^aeiou]/i)
        if (u.text.toLowerCase() === 'an') expect(units[i + 1].text).toMatch(/^[aeiou]/i)
      })
    }
  })

  it('catalán: contracciones y apóstrofos bien hechos', () => {
    for (const { units } of frases('ca', 500)) {
      const txt = contract(elide(units, 'ca'), 'ca').map(u => u.text).join(' ')
      expect(txt).not.toMatch(/\b(a el|a els|per el|per els)\b/)
      expect(txt).not.toMatch(/\b[Ll]a [aeiouàèéíòóú]/)
    }
  })

  it('cada filtro de los temas de gramática da frases de ese tema', () => {
    const casos = [['sustantivo'], ['adjetivo'], ['verbo'], ['pronombre'], ['adverbio'], ['preposicion', 'conjuncion'], ['articulo', 'determinante'], ['sujeto', 'predicado']]
    for (const lang of LANGS) for (const f of casos) for (let i = 0; i < 20; i++) {
      expect(f, `${lang} ${f}`).toContain(genRound({ lang, level: 'eso', filter: f }).find)
    }
  })
})
