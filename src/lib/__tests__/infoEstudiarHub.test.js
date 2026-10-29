// El hub /info/estudiar es la única puerta a las fichas de estudio: una ficha
// que no aparece en su lista es una página a la que no se llega haciendo clic
// (ni Google ni nadie). Cada fichero de src/data/fichasEstudiar/ tiene que
// estar listado en los tres idiomas.
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const raiz = path.resolve(__dirname, '../..')
const hub = fs.readFileSync(path.join(raiz, 'pages/InfoEstudiar.jsx'), 'utf8')
const fichas = fs.readdirSync(path.join(raiz, 'data/fichasEstudiar')).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, ''))

describe('hub /info/estudiar', () => {
  it('lista cada ficha de estudio en es, en y ca', () => {
    const faltan = fichas.filter(s => (hub.match(new RegExp(`slug: '${s}'`, 'g')) ?? []).length < 3)
    expect(faltan).toEqual([])
  })
})
