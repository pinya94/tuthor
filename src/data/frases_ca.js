// Català — bosses de paraules (etiquetades) + plantilles (mateixa fàbrica que l'espanyol).
import { makeGenderedTemplates } from '../lib/grammarGen'

const P = {
  det: {
    def: { ms: 'el', fs: 'la', mp: 'els', fp: 'les' },
    ind: { ms: 'un', fs: 'una', mp: 'uns', fp: 'unes' },
    dem: { ms: 'aquest', fs: 'aquesta', mp: 'aquests', fp: 'aquestes' },
  },
  // Coses: objectes i llocs (mai subjecte d'un verb d'acció).
  sustCosa: [
    { forms: { sg: 'casa', pl: 'cases' }, gen: 'f' },
    { forms: { sg: 'cotxe', pl: 'cotxes' }, gen: 'm' },
    { forms: { sg: 'taula', pl: 'taules' }, gen: 'f' },
    { forms: { sg: 'llibre', pl: 'llibres' }, gen: 'm' },
    { forms: { sg: 'poma', pl: 'pomes' }, gen: 'f' },
    { forms: { sg: 'carta', pl: 'cartes' }, gen: 'f' },
    { forms: { sg: 'flor', pl: 'flors' }, gen: 'f' },
    { forms: { sg: 'arbre', pl: 'arbres' }, gen: 'm' },
    { forms: { sg: 'pilota', pl: 'pilotes' }, gen: 'f' },
    { forms: { sg: 'regal', pl: 'regals' }, gen: 'm' },
    { forms: { sg: 'cadira', pl: 'cadires' }, gen: 'f' },
  ],
  // Animals: només com a subjecte de verbs d'acció.
  sustAnimal: [
    { forms: { sg: 'gos', pl: 'gossos' }, gen: 'm' },
    { forms: { sg: 'gat', pl: 'gats' }, gen: 'm' },
    { forms: { sg: 'gata', pl: 'gates' }, gen: 'f' },
    { forms: { sg: 'cavall', pl: 'cavalls' }, gen: 'm' },
    { forms: { sg: 'vaca', pl: 'vaques' }, gen: 'f' },
  ],
  sustPer: [
    { forms: { sg: 'nen', pl: 'nens' }, gen: 'm' },
    { forms: { sg: 'nena', pl: 'nenes' }, gen: 'f' },
    { forms: { sg: 'professor', pl: 'professors' }, gen: 'm' },
    { forms: { sg: 'professora', pl: 'professores' }, gen: 'f' },
    { forms: { sg: 'amic', pl: 'amics' }, gen: 'm' },
    { forms: { sg: 'amiga', pl: 'amigues' }, gen: 'f' },
    { forms: { sg: 'alumne', pl: 'alumnes' }, gen: 'm' },
    { forms: { sg: 'alumna', pl: 'alumnes' }, gen: 'f' },
  ],
  adj: [
    { forms: { ms: 'vermell', fs: 'vermella', mp: 'vermells', fp: 'vermelles' } },
    { forms: { ms: 'petit', fs: 'petita', mp: 'petits', fp: 'petites' } },
    { forms: { ms: 'bonic', fs: 'bonica', mp: 'bonics', fp: 'boniques' } },
    { forms: { ms: 'vell', fs: 'vella', mp: 'vells', fp: 'velles' } },
    { forms: { ms: 'nou', fs: 'nova', mp: 'nous', fp: 'noves' } },
    { forms: { ms: 'alt', fs: 'alta', mp: 'alts', fp: 'altes' } },
    { forms: { ms: 'ràpid', fs: 'ràpida', mp: 'ràpids', fp: 'ràpides' } },
    { forms: { ms: 'blanc', fs: 'blanca', mp: 'blancs', fp: 'blanques' } },
    { forms: { ms: 'gran', fs: 'gran', mp: 'grans', fp: 'grans' } },
    { forms: { ms: 'blau', fs: 'blava', mp: 'blaus', fp: 'blaves' } },
  ],
  // Adjectius aptes per a persones/animals (sense colors).
  adjPer: [
    { forms: { ms: 'petit', fs: 'petita', mp: 'petits', fp: 'petites' } },
    { forms: { ms: 'bonic', fs: 'bonica', mp: 'bonics', fp: 'boniques' } },
    { forms: { ms: 'vell', fs: 'vella', mp: 'vells', fp: 'velles' } },
    { forms: { ms: 'nou', fs: 'nova', mp: 'nous', fp: 'noves' } },
    { forms: { ms: 'alt', fs: 'alta', mp: 'alts', fp: 'altes' } },
    { forms: { ms: 'ràpid', fs: 'ràpida', mp: 'ràpids', fp: 'ràpides' } },
    { forms: { ms: 'gran', fs: 'gran', mp: 'grans', fp: 'grans' } },
  ],
  verbTr: [
    { forms: { sg: 'menja', pl: 'mengen' } },
    { forms: { sg: 'llegeix', pl: 'llegeixen' } },
    { forms: { sg: 'compra', pl: 'compren' } },
    { forms: { sg: 'pinta', pl: 'pinten' } },
    { forms: { sg: 'guarda', pl: 'guarden' } },
    { forms: { sg: 'trenca', pl: 'trenquen' } },
  ],
  // Intransitius vàlids per a persones i animals.
  verbIntr: [
    { forms: { sg: 'corre', pl: 'corren' } },
    { forms: { sg: 'salta', pl: 'salten' } },
    { forms: { sg: 'dorm', pl: 'dormen' } },
    { forms: { sg: 'juga', pl: 'juguen' } },
    { forms: { sg: 'passeja', pl: 'passegen' } },
    { forms: { sg: 'descansa', pl: 'descansen' } },
  ],
  verbCop: [
    { forms: { sg: 'és', pl: 'són' } },
    { forms: { sg: 'està', pl: 'estan' } },
    { forms: { sg: 'sembla', pl: 'semblen' } },
  ],
  verbDitr: [
    { forms: { sg: 'dona', pl: 'donen' } },
    { forms: { sg: 'regala', pl: 'regalen' } },
    { forms: { sg: 'envia', pl: 'envien' } },
    { forms: { sg: 'deixa', pl: 'deixen' } },
  ],
  pronSuj: [
    { t: 'Ell', gen: 'm', num: 'sg' }, { t: 'Ella', gen: 'f', num: 'sg' },
    { t: 'Ells', gen: 'm', num: 'pl' }, { t: 'Elles', gen: 'f', num: 'pl' },
  ],
  adv: ['avui', 'ahir', 'ara', 'sempre', 'lluny', 'sovint', 'aviat', 'tard', 'ràpidament', 'lentament'],
  prepCC: ['sobre', 'amb', 'per', 'a'],
}

export const TEMPLATES_CA = makeGenderedTemplates(P)
