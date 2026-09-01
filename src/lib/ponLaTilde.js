// Pon la Tilde (lengua · acentuación) — lógica pura, sin React.
//
// Cada ronda son DOS decisiones, en el orden en que se piensan de verdad:
//   1. ¿en qué sílaba cae el golpe de voz?
//   2. ¿por eso lleva tilde o no?
//
// Ese orden es el juego entero. Un test tipo "¿lleva tilde 'arbol'?" se acierta
// por oído sin saber ninguna regla; en cambio, obligar a señalar la sílaba
// tónica primero hace visible el paso que el alumno se salta, que es el que
// decide todo lo demás.

import { PALABRAS } from '../data/palabrasTilde'

export const TIPOS = {
  aguda: {
    label: { es: 'Aguda', en: 'Aguda (last syllable)', ca: 'Aguda' },
    regla: {
      es: 'La fuerza cae en la ÚLTIMA sílaba. Lleva tilde si acaba en vocal, n o s.',
      en: 'The stress falls on the LAST syllable. It takes an accent if it ends in a vowel, n or s.',
      ca: 'La força cau a l\'ÚLTIMA síl·laba. Porta accent si acaba en vocal, n o s.',
    },
  },
  llana: {
    label: { es: 'Llana', en: 'Llana (second-to-last)', ca: 'Plana' },
    regla: {
      es: 'La fuerza cae en la PENÚLTIMA sílaba. Lleva tilde si NO acaba en vocal, n ni s: justo al revés que las agudas.',
      en: 'The stress falls on the SECOND-TO-LAST syllable. It takes an accent if it does NOT end in a vowel, n or s — the opposite of agudas.',
      ca: 'La força cau a la PENÚLTIMA síl·laba. Porta accent si NO acaba en vocal, n ni s.',
    },
  },
  esdrujula: {
    label: { es: 'Esdrújula', en: 'Esdrújula (third-to-last)', ca: 'Esdrúixola' },
    regla: {
      es: 'La fuerza cae en la ANTEPENÚLTIMA sílaba. Todas llevan tilde, sin excepción.',
      en: 'The stress falls on the THIRD-TO-LAST syllable. They all take an accent, without exception.',
      ca: 'La força cau a l\'ANTEPENÚLTIMA síl·laba. Totes porten accent, sense excepció.',
    },
  },
  sobresdrujula: {
    label: { es: 'Sobresdrújula', en: 'Sobresdrújula (before that)', ca: 'Sobreesdrúixola' },
    regla: {
      es: 'La fuerza cae antes de la antepenúltima. Todas llevan tilde, y casi siempre son verbos con pronombres pegados.',
      en: 'The stress falls before the third-to-last syllable. They all take an accent, and are nearly always verbs with attached pronouns.',
      ca: 'La força cau abans de l\'antepenúltima. Totes porten accent.',
    },
  },
}

const HIATO = {
  es: 'Esta lleva tilde por otro motivo: rompe un diptongo (hiato). La i o la u tónicas se acentúan aunque la regla general diga que no.',
  en: 'This one takes an accent for a different reason: it breaks a diphthong (hiatus). A stressed i or u is accented even when the general rule says otherwise.',
  ca: 'Aquesta porta accent per un altre motiu: trenca un diftong (hiat). La i o la u tòniques s\'accentuen encara que la regla general digui que no.',
}

// El tipo sale de dónde cae la tónica: no se guarda en los datos, se deduce.
// Así no puede haber una palabra marcada como esdrújula con la tónica en otro
// sitio.
export function tipoDe(silabas, tonica) {
  const desdeElFinal = silabas.length - 1 - tonica
  if (desdeElFinal === 0) return 'aguda'
  if (desdeElFinal === 1) return 'llana'
  if (desdeElFinal === 2) return 'esdrujula'
  return 'sobresdrujula'
}

// Si lleva tilde se deduce comparando con la forma correcta: los datos no
// pueden contradecir a la ortografía porque no hay un campo aparte que
// mantener sincronizado.
export const llevaTilde = p => p.escrita !== p.palabra

// La regla general, para el texto de la explicación y para el test que
// comprueba que los datos la cumplen (salvo los hiatos, que van marcados).
export function tildeSegunRegla(palabra, silabas, tonica) {
  const tipo = tipoDe(silabas, tonica)
  if (tipo === 'esdrujula' || tipo === 'sobresdrujula') return true
  const ultima = palabra[palabra.length - 1]
  const acabaEnVocalNS = 'aeiouns'.includes(ultima)
  return tipo === 'aguda' ? acabaEnVocalNS : !acabaEnVocalNS
}

const elegir = (arr, rand) => arr[Math.floor(rand() * arr.length)]

export function genRound({ rand = Math.random, evitar = [] } = {}) {
  const frescas = PALABRAS.filter(p => !evitar.includes(p.palabra))
  const p = elegir(frescas.length ? frescas : PALABRAS, rand)
  return {
    ...p,
    tipo: tipoDe(p.silabas, p.tonica),
    lleva: llevaTilde(p),
  }
}

// La explicación que se muestra al revelar: la regla del tipo que ha salido y,
// si es hiato, por qué esa palabra se sale de la regla.
export function explicacion(round, l) {
  const regla = TIPOS[round.tipo].regla
  const base = regla[l] ?? regla.es
  return round.hiato ? `${base} ${HIATO[l] ?? HIATO.es}` : base
}

export const TOTAL_PALABRAS = PALABRAS.length
