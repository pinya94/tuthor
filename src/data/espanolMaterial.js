// ── Qué se traduce y qué no en un examen DE castellano ──────────────────────
//
// Los exámenes de lengua española están traducidos a inglés y catalán, y esa
// traducción llegó demasiado lejos: además del enunciado y la explicación, se
// tradujeron las OPCIONES, que en estos exámenes no son respuestas cualquiera
// sino el material que se analiza.
//
// El resultado no era "está en castellano igual": era que la pregunta pasaba a
// ser falsa. Dos casos reales de los que había:
//
//   · "¿Cuál de estas palabras lleva tilde?" con las opciones traducidas al
//     catalán daba cafe / taula / arbre / llibre, y la marcada como correcta
//     era "arbre", que en catalán NO lleva acento. La respuesta buena habría
//     sido "cafè", que ni siquiera estaba bien escrita.
//   · "¿Cuál es el plural de feliz?" daba feliços / felices / feliçs / feliç,
//     con "felices" marcada como correcta: es el plural castellano de feliz,
//     no el catalán de feliç, que es "feliços".
//
// La regla, que es la de cualquier libro de español para extranjeros: el
// enunciado y la explicación van en el idioma del lector, y las palabras
// castellanas que se están estudiando se quedan en castellano. Traducir
// "verde" a "verd" en una pregunta sobre adjetivos españoles no ayuda a nadie:
// cambia de qué va la pregunta.
//
// Las opciones que son PROSA —afirmaciones que el alumno lee y juzga— sí se
// traducen, porque ahí el idioma es el vehículo y no el contenido.

// Respuestas cortas que no son material lingüístico aunque lo parezcan por lo
// breves: sí/no, verdadero/falso, contar cuántos hay. Estas se traducen.
const RESPUESTAS_CORTAS = new Set([
  'sí', 'no', 'verdadero', 'falso', 'ninguno', 'ninguna', 'todos', 'todas',
  'ambas', 'ambos', 'cero', 'uno', 'una', 'dos', 'tres', 'cuatro', 'cinco',
  'seis', 'siete', 'ocho', 'nueve', 'diez', 'siempre', 'nunca', 'a veces',
  'depende', 'las dos', 'los dos', 'otra cosa',
])

const normaliza = s => String(s).trim().toLowerCase().replace(/[.…]+$/, '')

// Material lingüístico: palabras o formas sueltas que la pregunta analiza
// (verde, felices, tú, más… que). Prosa: cualquier cosa con puntuación de
// frase o de más de tres palabras.
export function esMaterialEspanol(opciones = []) {
  if (!Array.isArray(opciones) || opciones.length === 0) return false
  if (opciones.every(o => RESPUESTAS_CORTAS.has(normaliza(o)))) return false
  return opciones.every(o => {
    const t = String(o).trim()
    return t.split(/\s+/).length <= 3 && !/[.;:¿?!]/.test(t)
  })
}

// Se llama desde el factory `q()` de cada banco. Si las opciones son material,
// las tres versiones enseñan las mismas palabras castellanas; si son prosa, se
// respeta la traducción que ya había.
export function opcionesDeExamen(opciones) {
  if (!opciones?.es || !esMaterialEspanol(opciones.es)) return opciones
  return { ...opciones, en: opciones.es, ca: opciones.es }
}

// Y la respuesta correcta tiene que acompañar. Los bancos la guardan de dos
// formas y las dos siguen vivas:
//
//   · un ÍNDICE (la mayoría). Copiar las opciones castellanas no cambia ni el
//     orden ni cuántas hay, así que el índice sigue apuntando a lo mismo.
//   · el TEXTO de la respuesta en cada idioma (ortografía G/J, puntuación y
//     literatura). Aquí sí hay que copiar: si las opciones pasan a estar en
//     castellano y la correcta se queda en catalán, la respuesta buena deja de
//     estar entre las opciones y la pregunta se vuelve imposible.
//
// Se mira `opciones` sin tocar, antes de la copia, porque la regla se decide
// igual con las de castellano.
// El enunciado tiene el mismo problema una capa más arriba: las palabras que
// la pregunta CITA entre comillas también se tradujeron. Quedaban preguntas
// que se contradicen solas, porque las opciones ya están en castellano:
//
//   ca: Quin és el plural de "feliç"?   →  felizes / felices / felizs / feliz
//   en: "He ___ (hacer) his homework."  →  hace / hago / haces / hacemos
//
// La segunda es la peor: pide conjugar un verbo castellano dentro de una frase
// en inglés, cosa que no se puede hacer.
//
// Se sustituye lo que va entre comillas por lo que hay entre comillas en
// castellano, y solo cuando hay el mismo número en las dos versiones: si no
// coinciden no se sabe qué va con qué, y es mejor dejarlo como está que
// emparejarlo mal.
export function preguntaDeExamen(pregunta) {
  if (!pregunta?.es) return pregunta
  const enCastellano = [...pregunta.es.matchAll(/"([^"]*)"/g)].map(m => m[1])
  if (enCastellano.length === 0) return pregunta
  const alinea = t => {
    if (typeof t !== 'string') return t
    if ([...t.matchAll(/"([^"]*)"/g)].length !== enCastellano.length) return t
    let i = 0
    return t.replace(/"([^"]*)"/g, () => `"${enCastellano[i++]}"`)
  }
  return { ...pregunta, en: alinea(pregunta.en), ca: alinea(pregunta.ca) }
}

export function correctaDeExamen(opciones, correcta) {
  if (typeof correcta !== 'object' || correcta === null) return correcta
  if (!opciones?.es || !esMaterialEspanol(opciones.es)) return correcta
  return { ...correcta, en: correcta.es, ca: correcta.es }
}
