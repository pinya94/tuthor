// Invariantes del registro de módulos del aula.
//
// El que de verdad importa es el último: un módulo registrado sin su caso en
// ProfesorClase.jsx sale como pestaña y no pinta NADA al tocarlo. Es un fallo
// invisible en el build y en los tests de unidad —la página compila igual—,
// así que se comprueba leyendo el fuente.
import { readFileSync } from 'node:fs'
import { it, expect } from 'vitest'
import {
  TEACHER_MODULES, MODULE_IDS, MODULOS_POR_DEFECTO, moduleEnabled, enabledModuleIds,
} from '../teacherModules'

const PAGINA = new URL('../../pages/ProfesorClase.jsx', import.meta.url)

it('cada módulo tiene etiqueta y descripción en los tres idiomas', () => {
  for (const [id, m] of Object.entries(TEACHER_MODULES)) {
    for (const lang of ['es', 'en', 'ca']) {
      expect(m.label?.[lang], `${id}: falta label.${lang}`).toBeTruthy()
      expect(m.desc?.[lang], `${id}: falta desc.${lang}`).toBeTruthy()
    }
    expect(m.emoji, `${id}: falta emoji`).toBeTruthy()
  }
})

it('los módulos de núcleo no se pueden apagar', () => {
  for (const id of MODULE_IDS) {
    if (!TEACHER_MODULES[id].nucleo) continue
    expect(moduleEnabled({ modules: { [id]: false } }, id), `${id} es núcleo y se ha apagado`).toBe(true)
  }
})

it('una clase sin ajustes usa los valores por defecto', () => {
  expect(enabledModuleIds({})).toEqual(MODULE_IDS.filter(id => MODULOS_POR_DEFECTO[id]))
  expect(enabledModuleIds(undefined)).toEqual(MODULE_IDS.filter(id => MODULOS_POR_DEFECTO[id]))
})

it('las pestañas salen siempre en el orden del registro, no en el de activación', () => {
  const alReves = Object.fromEntries([...MODULE_IDS].reverse().map(id => [id, true]))
  expect(enabledModuleIds({ modules: alReves })).toEqual(MODULE_IDS)
})

it('un módulo desconocido no se cuela como pestaña', () => {
  expect(enabledModuleIds({ modules: { inventado: true } })).not.toContain('inventado')
  expect(moduleEnabled({ modules: { inventado: true } }, 'inventado')).toBe(false)
})

it('cada módulo registrado tiene su caso en ProfesorClase.jsx', () => {
  const fuente = readFileSync(PAGINA, 'utf8')
  for (const id of MODULE_IDS) {
    expect(fuente.includes(`tab === '${id}'`), `el módulo "${id}" no se pinta en ProfesorClase.jsx`).toBe(true)
  }
})
