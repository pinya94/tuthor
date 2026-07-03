const EN = s => ({ es: s, en: s, ca: s })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('ar-01', 'primaria', EN('Choose the correct article: "___ apple a day keeps the doctor away."'),
    { es: ['A', 'An', 'The', '—'], en: ['A', 'An', 'The', '—'], ca: ['A', 'An', 'The', '—'] },
    1, '🍎', EN('Use "an" before words starting with a vowel SOUND: an apple, an egg, an orange. The word "apple" starts with the vowel /æ/.')),

  q('ar-02', 'primaria', EN('Choose: "___ cat is sleeping on ___ sofa."'),
    { es: ['A / a', 'The / the', 'A / the', 'An / a'], en: ['A / a', 'The / the', 'A / the', 'An / a'], ca: ['A / a', 'The / the', 'A / the', 'An / a'] },
    1, '🐱', EN('Use "the" when referring to something already known or specific. If you say "the cat / the sofa", the listener knows which one you mean.')),

  q('ar-03', 'primaria', EN('"I saw ___ dog in the park. ___ dog was very friendly."'),
    { es: ['the / A', 'a / The', 'a / A', 'the / The'], en: ['the / A', 'a / The', 'a / A', 'the / The'], ca: ['the / A', 'a / The', 'a / A', 'the / The'] },
    1, '🐶', EN('First mention (unknown): "a dog". Second mention (now known): "the dog". This is the classic a → the rule.')),

  q('ar-04', 'primaria', EN('Which sentence is correct?'),
    { es: ['She is a honest person.', 'She is an honest person.', 'She is the honest person.', 'She is honest person.'], en: ['She is a honest person.', 'She is an honest person.', 'She is the honest person.', 'She is honest person.'], ca: ['She is a honest person.', 'She is an honest person.', 'She is the honest person.', 'She is honest person.'] },
    1, '🤝', EN('"Honest" starts with a silent H — the first SOUND is a vowel /ɒ/. So use "an": an honest person, an hour, an honour.')),

  q('ar-05', 'primaria', EN('Which sentence uses "a/an" correctly?'),
    { es: ['He is an doctor.', 'He is a engineer.', 'He is an engineer.', 'He is the engineer.'], en: ['He is an doctor.', 'He is a engineer.', 'He is an engineer.', 'He is the engineer.'], ca: ['He is an doctor.', 'He is a engineer.', 'He is an engineer.', 'He is the engineer.'] },
    2, '👷', EN('"Engineer" starts with the vowel sound /e/, so use "an". Use a/an with jobs when not referring to a specific person: "She is a teacher."')),

  q('ar-06', 'primaria', EN('Which sentence has NO article (zero article)?'),
    { es: ['I like the music.', 'I like a music.', 'I like music.', 'I like an music.'], en: ['I like the music.', 'I like a music.', 'I like music.', 'I like an music.'], ca: ['I like the music.', 'I like a music.', 'I like music.', 'I like an music.'] },
    2, '🎵', EN('No article with uncountable nouns used in a general sense: "I like music", "I love coffee", "Water is important". Use "the" only when specific: "The music at the party was loud."')),

  q('ar-07', 'eso', EN('"___ sun rises in ___ east." Choose correctly.'),
    { es: ['A / the', 'The / the', 'The / an', 'A / an'], en: ['A / the', 'The / the', 'The / an', 'A / an'], ca: ['A / the', 'The / the', 'The / an', 'A / an'] },
    1, '🌅', EN('Use "the" with: unique things (the sun, the moon, the sky), directions (the north, the east), oceans and rivers (the Thames).')),

  q('ar-08', 'eso', EN('"She plays ___ piano." vs "She plays ___ football." Choose correctly.'),
    { es: ['the / the', 'a / a', 'the / —', '— / the'], en: ['the / the', 'a / a', 'the / —', '— / the'], ca: ['the / the', 'a / a', 'the / —', '— / the'] },
    2, '🎹', EN('Musical instruments: use "the" (play the piano, the guitar). Sports and games: no article (play football, play chess, play tennis).')),

  q('ar-09', 'eso', EN('"___ Amazon is ___ longest river in South America."'),
    { es: ['An / a', 'The / the', 'A / the', 'The / a'], en: ['An / a', 'The / the', 'A / the', 'The / a'], ca: ['An / a', 'The / the', 'A / the', 'The / a'] },
    1, '🌊', EN('"The" with rivers (the Amazon, the Nile) and with superlatives (the longest, the best, the most expensive).')),

  q('ar-10', 'eso', EN('Which sentence is correct?'),
    { es: ['I speak the Spanish.', 'I speak a Spanish.', 'I speak Spanish.', 'I speak an Spanish.'], en: ['I speak the Spanish.', 'I speak a Spanish.', 'I speak Spanish.', 'I speak an Spanish.'], ca: ['I speak the Spanish.', 'I speak a Spanish.', 'I speak Spanish.', 'I speak an Spanish.'] },
    2, '🗣️', EN('No article with languages: "I speak Spanish/English/French." Also no article with subjects: "I study maths/history/science."')),

  q('ar-11', 'eso', EN('"I had ___ breakfast and then went to ___ school."'),
    { es: ['a / the', 'the / the', '— / —', 'a / a'], en: ['a / the', 'the / the', '— / —', 'a / a'], ca: ['a / the', 'the / the', '— / —', 'a / a'] },
    2, '🏫', EN('No article with meals (breakfast, lunch, dinner) or institutions used for their purpose (school, hospital, prison, church, university): "go to school", "go to hospital".')),

  q('ar-12', 'eso', EN('"It is ___ university in ___ United Kingdom."'),
    { es: ['an / the', 'a / the', 'the / the', 'a / a'], en: ['an / the', 'a / the', 'the / the', 'a / a'], ca: ['an / the', 'a / the', 'the / the', 'a / a'] },
    1, '🎓', EN('"University" starts with the sound /juː/ (a consonant sound, like "you"), so use "a". Countries with "Kingdom/States/Republic/Union" take "the": the United Kingdom, the USA.')),

  q('ar-13', 'eso', EN('Which noun NEEDS "the"?'),
    { es: ['Nile (river)', 'Mount Everest', 'Italy', 'London'], en: ['Nile (river)', 'Mount Everest', 'Italy', 'London'], ca: ['Nile (river)', 'Mount Everest', 'Italy', 'London'] },
    0, '🏞️', EN('Rivers take "the": the Nile, the Amazon, the Thames. Single mountains: no article (Mount Everest, Ben Nevis). Countries/cities: no article (Italy, London).')),

  q('ar-14', 'eso', EN('"___ rich should pay more taxes." (general statement about rich people)'),
    { es: ['A', 'An', 'The', '—'], en: ['A', 'An', 'The', '—'], ca: ['A', 'An', 'The', '—'] },
    2, '💰', EN('"The" + adjective can refer to a whole group of people: the rich (=rich people), the poor, the elderly, the unemployed. This is always plural in meaning.')),

  q('ar-15', 'eso', EN('"___ Eiffel Tower is in Paris." Choose the article.'),
    { es: ['A', 'An', 'The', '—'], en: ['A', 'An', 'The', '—'], ca: ['A', 'An', 'The', '—'] },
    2, '🗼', EN('"The" is used with named landmarks and unique buildings: the Eiffel Tower, the Colosseum, the Louvre, the White House. There is only one, so it is "the".')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
