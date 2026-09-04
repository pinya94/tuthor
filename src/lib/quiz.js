// Exámenes propios del profesor: preguntas de opción múltiple sencillas,
// escritas una vez dentro de la propia tarea — no un banco reutilizable entre
// tareas ni cursos (eso sería otra pieza, más grande). El array de preguntas
// vive DENTRO del documento de la tarea (assignments/{id}.quiz), legible por
// los alumnos asignados igual que cualquier otro campo de la tarea.
//
// Eso significa que la respuesta correcta viaja al navegador del alumno antes
// de que responda. No es un modelo de confianza nuevo: los bancos de
// preguntas de los exámenes de Tuthor (ExamenMC, MechanicExam) ya viajan
// enteros —con la respuesta correcta incluida— dentro del bundle de
// JavaScript que carga cualquiera. Esconder la respuesta exigiría un
// servidor que corrija y nunca entregue el banco entero, que es una pieza
// bastante más grande que "preguntas sencillas para enviar".

export const MIN_PREGUNTAS = 1
export const MAX_PREGUNTAS = 10
export const MIN_OPCIONES = 2
export const MAX_OPCIONES = 4
export const TEXTO_PREGUNTA_MAX = 300
export const TEXTO_OPCION_MAX = 150

export function preguntaVacia() {
  return { text: '', options: ['', ''], correctIndex: 0 }
}

export function preguntaValida(p) {
  const texto = (p?.text ?? '').trim()
  if (!texto || texto.length > TEXTO_PREGUNTA_MAX) return false
  const opciones = p?.options ?? []
  if (opciones.length < MIN_OPCIONES || opciones.length > MAX_OPCIONES) return false
  if (opciones.some(o => !(o ?? '').trim() || o.trim().length > TEXTO_OPCION_MAX)) return false
  if (!Number.isInteger(p?.correctIndex) || p.correctIndex < 0 || p.correctIndex >= opciones.length) return false
  return true
}

export function quizValido(preguntas) {
  return Array.isArray(preguntas)
    && preguntas.length >= MIN_PREGUNTAS && preguntas.length <= MAX_PREGUNTAS
    && preguntas.every(preguntaValida)
}

// Recorta los espacios de más antes de guardar: un espacio de sobra en un
// input no debería hacer que dos preguntas "iguales" cuenten como distintas.
export function limpiarQuiz(preguntas) {
  return preguntas.map(p => ({
    text: p.text.trim(),
    options: p.options.map(o => o.trim()),
    correctIndex: p.correctIndex,
  }))
}

// Corrige un intento. `respuestas` es un array paralelo a `quiz`, con el
// índice de la opción elegida en cada pregunta (o null si se dejó en blanco).
// Mismo criterio de aprobado que el resto de la app (ExamenMC, MechanicExam):
// score en porcentaje, aprobado con al menos la mitad de aciertos.
export function corregirQuiz(quiz, respuestas) {
  const total = quiz.length
  const aciertos = quiz.reduce((acc, p, i) => acc + (respuestas[i] === p.correctIndex ? 1 : 0), 0)
  const score = total > 0 ? Math.round((aciertos / total) * 100) : 0
  const passed = aciertos >= Math.ceil(total / 2)
  return { aciertos, total, score, passed }
}
