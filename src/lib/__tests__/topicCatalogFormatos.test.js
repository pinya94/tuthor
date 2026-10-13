// Un tema que declara un formato que su materia no define desaparece en
// silencio de la página del tema y del selector de tareas del profesor.
// Le pasó a ¿Qué Letra Va? (formato `letra` sin definir hasta 2026-10-13).
import { it, expect } from 'vitest'
import { TOPIC_CATALOG } from '../topicCatalog'

it('todo formato declarado por un tema existe en su materia', () => {
  for (const [materia, subj] of Object.entries(TOPIC_CATALOG)) {
    for (const [tema, cfg] of Object.entries(subj.temas ?? {})) {
      for (const id of Object.keys(cfg.formatos ?? {})) {
        expect(subj.formatos?.[id], `${materia}/${tema} usa el formato «${id}», que ${materia} no define`).toBeTruthy()
      }
    }
  }
})
