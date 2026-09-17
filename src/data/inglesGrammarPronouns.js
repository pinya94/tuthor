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
  q('pro-11', 'primaria', EN('Complete: "Anna and I are here. ___ are friends."'),
    O(['We', 'Us', 'Our', 'They']), 0, '👥',
    EN('"We" is the subject pronoun for a group that includes you: We are friends.')),

  q('pro-12', 'primaria', EN('Complete: "Give the ball to ___." (Tom)'),
    O(['he', 'him', 'his', 'himself']), 1, '⚽',
    EN('After a preposition ("to"), use the object pronoun: to him, to her, to us.')),

  q('pro-13', 'eso', EN('What is the possessive pronoun for "we"?'),
    O(['our', 'ours', 'us', 'we']), 1, '🔑',
    EN('"Ours" stands alone: This house is ours. "Our" needs a noun after it: our house.')),

  q('pro-14', 'eso', EN('Complete: "___ is your name?"'),
    O(['What', 'Which', 'Who', 'Whose']), 0, '❓',
    EN('Use "what" to ask for information with no fixed options: What is your name?')),

  q('pro-15', 'eso', EN('What is the reflexive pronoun for "they"?'),
    O(['them', 'themself', 'themselves', 'theirs']), 2, '👫',
    EN('The plural reflexive pronoun is "themselves": They enjoyed themselves.')),

  q('pro-16', 'eso', EN('Complete: "The people ___ live here are kind."'),
    O(['which', 'who', 'whose', 'where']), 1, '🏘️',
    EN('Use "who" for people and "which/that" for things: the people who live here.')),
  q('pro-17', 'primaria', EN('Which word is a pronoun?'),
    O(['table', 'it', 'run', 'red']), 1, '👉',
    EN('A pronoun replaces a noun. "It" can stand for a thing → pronoun.')),

  q('pro-18', 'primaria', EN('Replace "the dog": "___ barks."'),
    O(['It', 'He', 'She', 'They']), 0, '🐕',
    EN('For an animal or thing we usually use "it": The dog barks → It barks.')),

  q('pro-19', 'primaria', EN('Replace "Anna": "___ is happy."'),
    O(['He', 'She', 'It', 'They']), 1, '👧',
    EN('"She" is the subject pronoun for a girl or woman: Anna is happy → She is happy.')),

  q('pro-20', 'primaria', EN('Replace "the boys": "___ play football."'),
    O(['He', 'She', 'It', 'They']), 3, '👦',
    EN('"They" replaces a plural noun (two or more): The boys play → They play.')),

  q('pro-21', 'primaria', EN('Which word is a pronoun?'),
    O(['you', 'cat', 'blue', 'run']), 0, '🙋',
    EN('"You" is a personal pronoun: I, you, he, she, it, we, they.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
