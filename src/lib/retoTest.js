// Retos con exámenes tipo test (los bancos de ExamenMC): la forma que espera
// un reto (ver components/reto/ExamenReto): niveles, genRound e isCorrect. La
// pregunta se pinta con components/reto/PreguntaTest.
import { ordenOpciones } from './ordenOpciones'

export const get = (o, l) => (o ? o[l] ?? o.es : '')
// Índice de la correcta en las opciones originales
export function indiceCorrecto(q) {
  if (typeof q.correcta === 'number') return q.correcta
  return get(q.opciones, 'es').indexOf(get(q.correcta, 'es'))
}

// Los niveles de un nivelInfo de ExamenMC, como los de MechanicExam
export const nivelesDeTest = nivelInfo => Object.entries(nivelInfo).map(([key, v]) => ({ key, difficulty: key, label: v.label }))

// genRound sin repetir pregunta mientras queden en el banco
export function generadorTest(nivelInfo) {
  const vistas = new Set()
  return nivel => {
    const banco = (nivelInfo[nivel] ?? Object.values(nivelInfo)[0]).pool()
    let libres = banco.filter(q => !vistas.has(q.id ?? get(q.pregunta, 'es')))
    if (!libres.length) { vistas.clear(); libres = banco }
    const q = libres[Math.floor(Math.random() * libres.length)]
    vistas.add(q.id ?? get(q.pregunta, 'es'))
    return { q, orden: ordenOpciones(get(q.opciones, 'es').length) }
  }
}
export const esCorrectaTest = (ronda, respuesta) => respuesta === indiceCorrecto(ronda.q)
