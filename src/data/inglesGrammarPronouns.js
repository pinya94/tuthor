// Questions and options always in English (an English exam is not translated).
const EN = s => ({ es: s, en: s, ca: s })
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('pro-01', 'primaria', EN('Which word is a pronoun?'),
    O(['dog', 'she', 'table', 'blue']), 1, '🙋',
    EN('A pronoun replaces a noun. "She" stands for a person → pronoun.')),

  q('pro-02', 'primaria', EN('Replace "Tom": "___ is my friend."'),
    O(['He', 'Him', 'His', "He's"]), 0, '👦',
    EN('The subject pronoun for a boy is "he": He is my friend. "Him" is the object form.')),

  q('pro-03', 'primaria', EN('What is the object pronoun for "I"?'),
    O(['I', 'me', 'my', 'mine']), 1, '🎯',
    EN('"I" is the subject; "me" is the object: She saw me. "My" and "mine" show possession.')),

  q('pro-04', 'primaria', EN('Complete: "This book is ___." (it belongs to me)'),
    O(['my', 'mine', 'me', 'I']), 1, '📗',
    EN('"Mine" is a possessive pronoun and stands alone: This book is mine. "My" needs a noun after it: my book.')),

  q('pro-05', 'primaria', EN('Complete: "Tom and ___ are friends."'),
    O(['me', 'I', 'my', 'mine']), 1, '👬',
    EN('As part of the subject, use "I": Tom and I are friends. (Trick: remove "Tom and" → "I am", not "me am".)')),

  q('pro-06', 'primaria', EN('What is the reflexive pronoun for "she"?'),
    O(['she', 'her', 'herself', 'hers']), 2, '👤',
    EN('Reflexive pronouns end in -self/-selves: myself, yourself, himself, herself, ourselves.')),

  q('pro-07', 'eso', EN('Which of these is a relative pronoun?'),
    O(['who', 'and', 'very', 'the']), 0, '🔗',
    EN('Relative pronouns join clauses and refer to a noun: who, which, that, whose, where. "The man who called…".')),

  q('pro-08', 'eso', EN('Complete: "The book ___ I read was great."'),
    O(['who', 'which', 'whose', 'where']), 1, '📖',
    EN('Use "which" (or "that") for things and "who" for people. "The book which/that I read…".')),

  q('pro-09', 'eso', EN('Which is a demonstrative pronoun for things that are far and plural?'),
    O(['this', 'that', 'these', 'those']), 3, '👉',
    EN('Demonstratives: this/these (near), that/those (far). "Those" is far + plural.')),

  q('pro-10', 'eso', EN('Which of these is an interrogative pronoun?'),
    O(['what', 'the', 'very', 'and']), 0, '❓',
    EN('Interrogative pronouns ask questions: what, who, which, whose, whom. "What do you want?".')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
