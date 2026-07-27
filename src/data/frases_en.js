// English — word pools + templates. No grammatical gender (so the feminine/
// masculine tasks never appear in EN); number (singular/plural) does apply.
import { npEn, pick } from '../lib/grammarGen'

const P = {
  det: { def: { sg: 'the', pl: 'the' } },
  sust: [
    { forms: { sg: 'dog', pl: 'dogs' } }, { forms: { sg: 'cat', pl: 'cats' } },
    { forms: { sg: 'house', pl: 'houses' } }, { forms: { sg: 'car', pl: 'cars' } },
    { forms: { sg: 'table', pl: 'tables' } }, { forms: { sg: 'book', pl: 'books' } },
    { forms: { sg: 'ball', pl: 'balls' } }, { forms: { sg: 'gift', pl: 'gifts' } },
    { forms: { sg: 'flower', pl: 'flowers' } }, { forms: { sg: 'letter', pl: 'letters' } },
  ],
  sustPer: [
    { forms: { sg: 'boy', pl: 'boys' } }, { forms: { sg: 'girl', pl: 'girls' } },
    { forms: { sg: 'teacher', pl: 'teachers' } }, { forms: { sg: 'friend', pl: 'friends' } },
    { forms: { sg: 'student', pl: 'students' } },
  ],
  adj: ['red', 'small', 'nice', 'old', 'new', 'tall', 'fast', 'white', 'big', 'blue'],
  verbTr: [
    { forms: { sg: 'eats', pl: 'eat' } }, { forms: { sg: 'reads', pl: 'read' } },
    { forms: { sg: 'buys', pl: 'buy' } }, { forms: { sg: 'paints', pl: 'paint' } },
    { forms: { sg: 'keeps', pl: 'keep' } }, { forms: { sg: 'breaks', pl: 'break' } },
  ],
  verbIntr: [
    { forms: { sg: 'barks', pl: 'bark' } }, { forms: { sg: 'runs', pl: 'run' } },
    { forms: { sg: 'jumps', pl: 'jump' } }, { forms: { sg: 'sleeps', pl: 'sleep' } },
    { forms: { sg: 'shines', pl: 'shine' } }, { forms: { sg: 'works', pl: 'work' } },
  ],
  verbCop: [
    { forms: { sg: 'is', pl: 'are' } }, { forms: { sg: 'seems', pl: 'seem' } },
    { forms: { sg: 'looks', pl: 'look' } },
  ],
  verbDitr: [
    { forms: { sg: 'gives', pl: 'give' } }, { forms: { sg: 'sends', pl: 'send' } },
    { forms: { sg: 'lends', pl: 'lend' } }, { forms: { sg: 'shows', pl: 'show' } },
  ],
  pronSuj: [
    { t: 'He', num: 'sg' }, { t: 'She', num: 'sg' }, { t: 'It', num: 'sg' }, { t: 'They', num: 'pl' },
  ],
  adv: ['today', 'yesterday', 'now', 'always', 'quickly', 'slowly', 'far', 'here', 'outside', 'soon'],
  prepCC: ['in', 'on', 'with', 'near'],
}

const cap = u => { u.text = u.text.charAt(0).toUpperCase() + u.text.slice(1); return u }
const verbU = (v, num) => ({ text: v.forms[num], classes: ['verbo'], roles: ['predicado'] })

export const TEMPLATES_EN = [
  { id: 'en-svo', rank: 0, build(rand) {
    const s = npEn(P, rand, { det: 'def', adj: rand() < 0.4, role: ['sujeto'], nucleo: true })
    cap(s.units[0])
    const cd = npEn(P, rand, { det: 'def', adj: rand() < 0.4, role: ['predicado', 'cd'] })
    return [...s.units, verbU(pick(P.verbTr, rand), s.num), ...cd.units]
  } },
  { id: 'en-sv-adj', rank: 0, build(rand) {
    const s = npEn(P, rand, { det: 'def', adj: true, role: ['sujeto'], nucleo: true })
    cap(s.units[0])
    return [...s.units, verbU(pick(P.verbIntr, rand), s.num)]
  } },
  { id: 'en-sv-adv', rank: 0, build(rand) {
    const s = npEn(P, rand, { det: 'def', role: ['sujeto'], nucleo: true })
    cap(s.units[0])
    const adv = { text: pick(P.adv, rand), classes: ['adverbio'], roles: ['predicado', 'cc'] }
    return [...s.units, verbU(pick(P.verbIntr, rand), s.num), adv]
  } },
  { id: 'en-sv-cc', rank: 1, build(rand) {
    const s = npEn(P, rand, { det: 'def', role: ['sujeto'], nucleo: true })
    cap(s.units[0])
    const prep = { text: pick(P.prepCC, rand), classes: ['preposicion'], roles: ['predicado', 'cc'] }
    const place = npEn(P, rand, { det: 'def', role: ['predicado', 'cc'] })
    return [...s.units, verbU(pick(P.verbIntr, rand), s.num), prep, ...place.units]
  } },
  { id: 'en-cop', rank: 1, build(rand) {
    const s = npEn(P, rand, { det: 'def', role: ['sujeto'], nucleo: true })
    cap(s.units[0])
    const v = pick(P.verbCop, rand)
    const attr = { text: pick(P.adj, rand), classes: ['adjetivo'], roles: ['predicado', 'atributo'] }
    return [...s.units, { text: v.forms[s.num], classes: ['verbo'], roles: ['predicado'] }, attr]
  } },
  { id: 'en-ditr', rank: 1, build(rand) {
    const s = npEn(P, rand, { det: 'def', role: ['sujeto'], nucleo: true })
    cap(s.units[0])
    const cd = npEn(P, rand, { det: 'def', role: ['predicado', 'cd'] })
    const toU = { text: 'to', classes: ['preposicion'], roles: ['predicado', 'ci'] }
    const ci = npEn(P, rand, { pool: P.sustPer, det: 'def', num: 'sg', role: ['predicado', 'ci'] })
    return [...s.units, verbU(pick(P.verbDitr, rand), s.num), ...cd.units, toU, ...ci.units]
  } },
  { id: 'en-pron-svo', rank: 1, build(rand) {
    const pr = pick(P.pronSuj, rand)
    const pron = { text: pr.t, classes: ['pronombre'], roles: ['sujeto', 'nucleo-sujeto'], num: pr.num }
    const cd = npEn(P, rand, { det: 'def', adj: rand() < 0.3, role: ['predicado', 'cd'] })
    return [pron, verbU(pick(P.verbTr, rand), pr.num), ...cd.units]
  } },
  { id: 'en-svo-cc', rank: 2, build(rand) {
    const s = npEn(P, rand, { det: 'def', adj: true, role: ['sujeto'], nucleo: true })
    cap(s.units[0])
    const cd = npEn(P, rand, { det: 'def', adj: rand() < 0.5, role: ['predicado', 'cd'] })
    const prep = { text: pick(P.prepCC, rand), classes: ['preposicion'], roles: ['predicado', 'cc'] }
    const place = npEn(P, rand, { det: 'def', role: ['predicado', 'cc'] })
    return [...s.units, verbU(pick(P.verbTr, rand), s.num), ...cd.units, prep, ...place.units]
  } },
]
