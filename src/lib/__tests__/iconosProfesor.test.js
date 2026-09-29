// Cada módulo del aula (lib/teacherModules.js) tiene su icono dibujado en
// IconosProfesor.jsx: la barra de pestañas y los ajustes lo pintan. Un módulo
// nuevo sin icono saldría como pestaña sin dibujo.
import { describe, it, expect } from 'vitest'
import { MODULE_IDS } from '../teacherModules.js'
import { ICONO_MODULO } from '../../components/IconosProfesor.jsx'

describe('iconos del profesor', () => {
  it('cada módulo del aula tiene su icono, y ninguno sobra', () => {
    expect(MODULE_IDS.filter(id => !ICONO_MODULO[id]), 'módulos sin icono').toEqual([])
    expect(Object.keys(ICONO_MODULO).filter(id => !MODULE_IDS.includes(id)), 'iconos sin módulo').toEqual([])
    for (const [id, Icono] of Object.entries(ICONO_MODULO)) expect(() => Icono({}), id).not.toThrow()
  })
})
