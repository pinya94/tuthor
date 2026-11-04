// Títulos SEO de los exámenes. En Search Console (nov-2026) ninguna de las
// 1.000 búsquedas con impresiones decía «ejercicios» ni «actividades»: los
// títulos solo decían «Examen de…», y así Google no nos enseñaba para lo que
// escriben alumnos y profes («ejercicios de la Edad Media con soluciones»).
// Los cambios AÑADEN palabras: no quitan ninguna de las que ya traen visitas.

// «de» + nombre del tema con su artículo bien puesto:
//   es: «La Unión Europea» → «de la Unión Europea», «El Mercado» → «del Mercado»
//   ca: «La Constitució» → «de la Constitució», «Àcids» → «d’Àcids», «El Mercat» → «del Mercat»
export function deTema(titulo, l) {
  let t = titulo
  if (l !== 'en') t = t.replace(/^(El|La|Los|Las|Els|Les|L’|L')(?=[\s’'A-ZÀ-Ý])/, a => a.toLowerCase())
  if (l === 'es') return /^el /.test(t) ? `del ${t.slice(3)}` : `de ${t}`
  if (l === 'ca') {
    if (/^el /.test(t)) return `del ${t.slice(3)}`
    if (/^els /.test(t)) return `dels ${t.slice(4)}`
    if (/^[AEIOUÀÈÉÍÒÓÚH]/i.test(t) && !/^(l’|l')/.test(t)) return `d’${t}`
    return `de ${t}`
  }
  return t
}

const DICE_EJERCICIOS = /ejercicio|exercici|practice questions|exercises/i

// Título de un examen tipo test (ExamenMC)
export function tituloExamenMC(titulo, l) {
  if (l === 'en') return `${titulo} Exam: multiple-choice practice questions with answers`
  if (l === 'ca') return `Examen ${deTema(titulo, 'ca')}: exercicis tipus test amb solucions`
  return `Examen ${deTema(titulo, 'es')}: ejercicios tipo test con soluciones`
}

export function descExamenMC(titulo, l, niveles) {
  const n = niveles.length ? ` (${niveles.join(', ')})` : ''
  if (l === 'en') return `${titulo} practice questions with answers${n}: an interactive 10-question multiple-choice test with instant marking and an explanation for every answer.`
  if (l === 'ca') return `Exercicis tipus test ${deTema(titulo, 'ca')} amb solucions${n}: examen interactiu de 10 preguntes, correcció a l’instant i explicació de cada resposta.`
  return `Ejercicios tipo test ${deTema(titulo, 'es')} con soluciones${n}: examen interactivo de 10 preguntas, corrección al instante y explicación de cada respuesta.`
}

// Exámenes con la mecánica de un juego (MechanicExam): su título está escrito a
// mano; si no dice ya «ejercicios», se le añade al final.
export function conEjercicios(titulo, l) {
  if (DICE_EJERCICIOS.test(titulo)) return titulo
  if (l === 'en') return `${titulo} — practice questions with answers`
  if (l === 'ca') return `${titulo} — exercicis amb solució`
  return `${titulo} — ejercicios con solución`
}
