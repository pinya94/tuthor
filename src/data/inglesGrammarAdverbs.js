// Questions and options always in English (an English exam is not translated).
const EN = s => ({ es: s, en: s, ca: s })
const O = a => ({ es: a, en: a, ca: a })
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('adv-01', 'primaria', EN('Which word is an adverb?'),
    O(['slow', 'slowly', 'slower', 'slowness']), 1, '🐢',
    EN('An adverb tells how, when or where something happens. "Slowly" describes how → adverb.')),

  q('adv-02', 'primaria', EN('What is the adverb from "happy"?'),
    O(['happy', 'happyly', 'happily', 'happiness']), 2, '😊',
    EN('Adjectives ending in consonant + y change y→i and add -ly: happy→happily, easy→easily.')),

  q('adv-03', 'primaria', EN('In "She sings well", which word is the adverb?'),
    O(['She', 'sings', 'well', 'songs']), 2, '🎤',
    EN('"Well" tells us how she sings → adverb. It is the irregular adverb of "good".')),

  q('adv-04', 'primaria', EN('Which is an adverb of frequency?'),
    O(['always', 'quickly', 'here', 'very']), 0, '🔁',
    EN('Adverbs of frequency say how often: always, usually, often, sometimes, never.')),

  q('adv-05', 'primaria', EN('Which is an adverb of place?'),
    O(['now', 'here', 'slowly', 'very']), 1, '📍',
    EN('Adverbs of place say where: here, there, everywhere, outside, nearby.')),

  q('adv-06', 'primaria', EN('Which sentence puts the adverb in the right place?'),
    O(['She always is late', 'She is always late', 'Always she is late', 'She is late always']), 1, '⏰',
    EN('Adverbs of frequency go after the verb "to be": She is always late. (But before other verbs: She always arrives late.)')),

  q('adv-07', 'eso', EN('What is the adverb from "good"?'),
    O(['goodly', 'well', 'good', 'better']), 1, '👍',
    EN('"Good" is an adjective; its adverb is the irregular "well": She plays well (not "good").')),

  q('adv-08', 'eso', EN('Which does an adverb NOT normally modify?'),
    O(['a verb', 'an adjective', 'another adverb', 'a noun']), 3, '🚫',
    EN('Adverbs modify verbs, adjectives or other adverbs — but not nouns. Nouns are described by adjectives.')),

  q('adv-09', 'eso', EN('Complete: "He works ___ every day." (a lot)'),
    O(['hard', 'hardly', 'harder', 'hardness']), 0, '💪',
    EN('"Hard" as an adverb means "with effort". "Hardly" is different: it means "almost not" (he hardly works = he barely works).')),

  q('adv-10', 'eso', EN('Which is an adverb of degree?'),
    O(['very', 'here', 'yesterday', 'loudly']), 0, '📈',
    EN('Adverbs of degree say how much: very, quite, too, really, extremely. "Very tall", "quite good".')),
  q('adv-11', 'primaria', EN('What is the adverb from "quick"?'),
    O(['quick', 'quickly', 'quicker', 'quickness']), 1, '⚡',
    EN('Most adverbs of manner add -ly to the adjective: quick→quickly, bad→badly, nice→nicely.')),

  q('adv-12', 'primaria', EN('Which is an adverb of time?'),
    O(['here', 'yesterday', 'quickly', 'very']), 1, '📅',
    EN('Adverbs of time say when: yesterday, today, soon, later, now.')),

  q('adv-13', 'eso', EN('What is the adverb from "careful"?'),
    O(['carefuly', 'carefully', 'careful', 'carefulness']), 1, '⚠️',
    EN('Adjectives ending in -ful add -ly (keeping the double l): careful→carefully, hopeful→hopefully.')),

  q('adv-14', 'eso', EN('What is the adverb form of "fast"?'),
    O(['fastly', 'fast', 'fastily', 'faster']), 1, '🏎️',
    EN('Some words are the same as adjective and adverb: fast, hard, late, early. "She drives fast" (not "fastly").')),

  q('adv-15', 'eso', EN('Complete: "He runs ___ than me." (fast)'),
    O(['faster', 'more fast', 'fastest', 'fastly']), 0, '🏃',
    EN('Short adverbs form the comparative with -er: faster, harder, sooner. Longer ones use "more" (more slowly).')),

  q('adv-16', 'eso', EN('Which sentence places "never" correctly?'),
    O(['I never eat meat', 'I eat never meat', 'Never I eat meat', 'I eat meat never']), 0, '🍖',
    EN('Adverbs of frequency go before the main verb: I never eat meat, She always helps.')),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
