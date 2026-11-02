// Verbos Irregulares (inglés): infinitivo, pasado y participio.
//
// Solo verbos con UNA forma aceptada en inglés británico: fuera learn
// (learnt/learned), dream, burn, show, hang, lie/lay, light, fit, bet, quit,
// dive, shine, beat (A-A-B)… En un juego que corrige letra a letra, un verbo
// con dos formas válidas daría por mala una respuesta buena. «get» se queda
// (sale en todas las listas) con `tambien: ['gotten']` al teclear y fuera de
// los patrones, porque en EE. UU. su participio es otro.
//
// Mecánicas (nada de elegir entre cuatro):
//   forja      el infinitivo y dos huecos (pasado, participio): se rellenan
//              con fichas, entre ellas la forma regular inventada (goed) y las
//              trampas de verdad (bought/brought)
//   patrones   cuatro verbos a sus cajas: A-A-A, A-B-B, A-B-C o A-B-A
//   teclea     escribir la forma que falta (en difícil, las dos)
//   frase      dos frases del mismo verbo: una pide el pasado y otra el
//              participio; se coloca cada forma en su hueco

export const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => ({ es, en, ca })[l] ?? es

// [infinitivo, pasado, participio, significado es, significado ca, nivel, extra]
// nivel 1 = Primaria / 1.º ESO, 2 = ESO, 3 = Bachillerato
const V = (inf, past, pp, es, ca, nivel, extra = {}) => ({ id: inf, inf, past, pp, sig: { es, ca }, nivel, ...extra })

export const VERBOS = [
  V('buy', 'bought', 'bought', 'comprar', 'comprar', 1, { falsas: ['buyed', 'brought'] }),
  V('come', 'came', 'come', 'venir', 'venir', 1, { falsas: ['comed', 'camed'], obj: 'home late' }),
  V('do', 'did', 'done', 'hacer', 'fer', 1, { falsas: ['doed', 'maked'], obj: 'the washing-up' }),
  V('drink', 'drank', 'drunk', 'beber', 'beure', 1, { falsas: ['drinked', 'drinken'], obj: 'coconut milk' }),
  V('eat', 'ate', 'eaten', 'comer', 'menjar', 1, { falsas: ['eated', 'eat'], obj: 'sushi' }),
  V('find', 'found', 'found', 'encontrar', 'trobar', 1, { falsas: ['finded', 'fund'] }),
  V('give', 'gave', 'given', 'dar', 'donar', 1, { falsas: ['gived', 'gaven'], obj: 'a speech' }),
  V('go', 'went', 'gone', 'ir', 'anar', 1, { falsas: ['goed', 'wented'], obj: 'home early' }),
  V('have', 'had', 'had', 'tener', 'tenir', 1, { falsas: ['haved', 'has'] }),
  V('make', 'made', 'made', 'hacer, fabricar', 'fer, fabricar', 1, { falsas: ['maked', 'did'] }),
  V('put', 'put', 'put', 'poner', 'posar', 1, { falsas: ['putted', 'puted'] }),
  V('read', 'read', 'read', 'leer', 'llegir', 1, { falsas: ['readed', 'red'] }),
  V('run', 'ran', 'run', 'correr', 'córrer', 1, { falsas: ['runned', 'runed'], obj: 'a marathon' }),
  V('say', 'said', 'said', 'decir', 'dir', 1, { falsas: ['sayed', 'told'] }),
  V('see', 'saw', 'seen', 'ver', 'veure', 1, { falsas: ['seed', 'sawn'], obj: 'a shooting star' }),
  V('sing', 'sang', 'sung', 'cantar', 'cantar', 1, { falsas: ['singed', 'sinked'], obj: 'in a choir' }),
  V('sit', 'sat', 'sat', 'sentarse', 'seure', 1, { falsas: ['sitted', 'seat'] }),
  V('sleep', 'slept', 'slept', 'dormir', 'dormir', 1, { falsas: ['sleeped', 'slep'] }),
  V('speak', 'spoke', 'spoken', 'hablar', 'parlar', 1, { falsas: ['speaked', 'spoked'], obj: 'to the head teacher' }),
  V('swim', 'swam', 'swum', 'nadar', 'nedar', 1, { falsas: ['swimmed', 'swimed'], obj: 'in the sea' }),
  V('take', 'took', 'taken', 'coger, llevar', 'agafar, portar', 1, { falsas: ['taked', 'tooken'], obj: 'a taxi' }),
  V('tell', 'told', 'told', 'contar, decir', 'explicar, dir', 1, { falsas: ['telled', 'said'] }),
  V('think', 'thought', 'thought', 'pensar', 'pensar', 1, { falsas: ['thinked', 'thank'] }),
  V('write', 'wrote', 'written', 'escribir', 'escriure', 1, { falsas: ['writed', 'writen'], obj: 'a poem' }),
  V('cut', 'cut', 'cut', 'cortar', 'tallar', 1, { falsas: ['cutted', 'cuted'] }),
  V('draw', 'drew', 'drawn', 'dibujar', 'dibuixar', 1, { falsas: ['drawed', 'drewn'], obj: 'a map' }),
  V('fly', 'flew', 'flown', 'volar', 'volar', 1, { falsas: ['flied', 'flewn'], obj: 'a kite' }),
  V('get', 'got', 'got', 'conseguir, obtener', 'aconseguir, obtenir', 1, { falsas: ['getted', 'gat'], tambien: ['gotten'], sinPatron: true, nota: { es: 'En inglés americano el participio es «gotten».', en: 'In American English the past participle is “gotten”.', ca: 'En anglès americà el participi és «gotten».' } }),
  V('leave', 'left', 'left', 'irse, dejar', 'marxar, deixar', 1, { falsas: ['leaved', 'lefted'] }),
  V('meet', 'met', 'met', 'conocer, quedar', 'conèixer, quedar', 1, { falsas: ['meeted', 'meat'] }),
  V('win', 'won', 'won', 'ganar', 'guanyar', 1, { falsas: ['winned', 'wan'] }),
  V('lose', 'lost', 'lost', 'perder', 'perdre', 1, { falsas: ['losed', 'loosed'] }),

  V('become', 'became', 'become', 'convertirse en', 'convertir-se en', 2, { falsas: ['becomed', 'becamed'], obj: 'a teacher' }),
  V('begin', 'began', 'begun', 'empezar', 'començar', 2, { falsas: ['beginned', 'begined'], obj: 'a new book' }),
  V('bring', 'brought', 'brought', 'traer', 'portar', 2, { falsas: ['bringed', 'bought', 'brang'] }),
  V('build', 'built', 'built', 'construir', 'construir', 2, { falsas: ['builded', 'build'] }),
  V('catch', 'caught', 'caught', 'atrapar', 'atrapar', 2, { falsas: ['catched', 'cought'] }),
  V('choose', 'chose', 'chosen', 'elegir', 'triar', 2, { falsas: ['choosed', 'choosen'], obj: 'a team captain' }),
  V('cost', 'cost', 'cost', 'costar', 'costar', 2, { falsas: ['costed', 'cast'] }),
  V('drive', 'drove', 'driven', 'conducir', 'conduir', 2, { falsas: ['drived', 'droven'], obj: 'a bus' }),
  V('fall', 'fell', 'fallen', 'caer', 'caure', 2, { falsas: ['falled', 'felt'], obj: 'off a bike' }),
  V('feel', 'felt', 'felt', 'sentir', 'sentir', 2, { falsas: ['feeled', 'fell'] }),
  V('fight', 'fought', 'fought', 'luchar', 'lluitar', 2, { falsas: ['fighted', 'fighten'] }),
  V('forget', 'forgot', 'forgotten', 'olvidar', 'oblidar', 2, { falsas: ['forgetted', 'forgeted'], obj: 'the keys' }),
  V('hear', 'heard', 'heard', 'oír', 'sentir (oir)', 2, { falsas: ['heared', 'herd'] }),
  V('hit', 'hit', 'hit', 'golpear', 'colpejar', 2, { falsas: ['hitted', 'hat'] }),
  V('hold', 'held', 'held', 'sostener', 'aguantar', 2, { falsas: ['holded', 'hold'] }),
  V('hurt', 'hurt', 'hurt', 'hacer daño', 'fer mal', 2, { falsas: ['hurted', 'hurten'] }),
  V('keep', 'kept', 'kept', 'guardar, mantener', 'guardar, mantenir', 2, { falsas: ['keeped', 'kep'] }),
  V('let', 'let', 'let', 'dejar, permitir', 'deixar, permetre', 2, { falsas: ['letted', 'lat'] }),
  V('lend', 'lent', 'lent', 'prestar', 'deixar (prestar)', 2, { falsas: ['lended', 'lend'] }),
  V('mean', 'meant', 'meant', 'significar', 'significar', 2, { falsas: ['meaned', 'ment'] }),
  V('pay', 'paid', 'paid', 'pagar', 'pagar', 2, { falsas: ['payed', 'payd'] }),
  V('ride', 'rode', 'ridden', 'montar (en bici, a caballo)', 'muntar (en bici, a cavall)', 2, { falsas: ['rided', 'roden'], obj: 'a horse' }),
  V('ring', 'rang', 'rung', 'sonar, llamar', 'sonar, trucar', 2, { falsas: ['ringed', 'runged'], obj: 'the bell' }),
  V('sell', 'sold', 'sold', 'vender', 'vendre', 2, { falsas: ['selled', 'sald'] }),
  V('send', 'sent', 'sent', 'enviar', 'enviar', 2, { falsas: ['sended', 'send'] }),
  V('shut', 'shut', 'shut', 'cerrar', 'tancar', 2, { falsas: ['shutted', 'shot'] }),
  V('spend', 'spent', 'spent', 'gastar, pasar (tiempo)', 'gastar, passar (temps)', 2, { falsas: ['spended', 'spend'] }),
  V('stand', 'stood', 'stood', 'estar de pie', 'estar dret', 2, { falsas: ['standed', 'stand'] }),
  V('steal', 'stole', 'stolen', 'robar', 'robar', 2, { falsas: ['stealed', 'stealen'], obj: 'a biscuit' }),
  V('teach', 'taught', 'taught', 'enseñar', 'ensenyar', 2, { falsas: ['teached', 'thought'] }),
  V('throw', 'threw', 'thrown', 'lanzar', 'llançar', 2, { falsas: ['throwed', 'threwn'], obj: 'a snowball' }),
  V('understand', 'understood', 'understood', 'entender', 'entendre', 2, { falsas: ['understanded', 'understand'] }),
  V('wear', 'wore', 'worn', 'llevar puesto', 'portar (roba)', 2, { falsas: ['weared', 'woren'], obj: 'a kilt' }),
  V('break', 'broke', 'broken', 'romper', 'trencar', 2, { falsas: ['breaked', 'broked'], obj: 'a window' }),
  V('forgive', 'forgave', 'forgiven', 'perdonar', 'perdonar', 2, { falsas: ['forgived', 'forgaven'], obj: 'a friend' }),
  V('hide', 'hid', 'hidden', 'esconder', 'amagar', 2, { falsas: ['hided', 'hiden'], obj: 'a present' }),
  V('grow', 'grew', 'grown', 'crecer, cultivar', 'créixer, conrear', 2, { falsas: ['growed', 'grewn'], obj: 'tomatoes' }),
  V('blow', 'blew', 'blown', 'soplar', 'bufar', 2, { falsas: ['blowed', 'blewn'], obj: 'out the candles' }),
  V('set', 'set', 'set', 'colocar, fijar', 'col·locar, fixar', 2, { falsas: ['setted', 'sat'] }),

  V('arise', 'arose', 'arisen', 'surgir', 'sorgir', 3, { falsas: ['arised', 'arosen'] }),
  V('bend', 'bent', 'bent', 'doblar', 'doblegar', 3, { falsas: ['bended', 'bend'] }),
  V('bind', 'bound', 'bound', 'atar', 'lligar', 3, { falsas: ['binded', 'band'] }),
  V('bite', 'bit', 'bitten', 'morder', 'mossegar', 3, { falsas: ['bited', 'biten'], obj: 'a pencil' }),
  V('bleed', 'bled', 'bled', 'sangrar', 'sagnar', 3, { falsas: ['bleeded', 'blood'] }),
  V('breed', 'bred', 'bred', 'criar', 'criar', 3, { falsas: ['breeded', 'bread'] }),
  V('burst', 'burst', 'burst', 'reventar', 'rebentar', 3, { falsas: ['bursted', 'borst'] }),
  V('deal', 'dealt', 'dealt', 'tratar, repartir', 'tractar, repartir', 3, { falsas: ['dealed', 'delt'] }),
  V('dig', 'dug', 'dug', 'cavar', 'cavar', 3, { falsas: ['digged', 'dag'] }),
  V('feed', 'fed', 'fed', 'alimentar', 'alimentar', 3, { falsas: ['feeded', 'food'] }),
  V('flee', 'fled', 'fled', 'huir', 'fugir', 3, { falsas: ['fleed', 'flew'] }),
  V('freeze', 'froze', 'frozen', 'congelar', 'congelar', 3, { falsas: ['freezed', 'frozed'], obj: 'some soup' }),
  V('grind', 'ground', 'ground', 'moler', 'moldre', 3, { falsas: ['grinded', 'grund'] }),
  V('lead', 'led', 'led', 'guiar, dirigir', 'guiar, dirigir', 3, { falsas: ['leaded', 'lead'] }),
  V('mistake', 'mistook', 'mistaken', 'confundir', 'confondre', 3, { falsas: ['mistaked', 'mistooken'] }),
  V('overcome', 'overcame', 'overcome', 'superar', 'superar', 3, { falsas: ['overcomed', 'overcamed'], obj: 'a fear of heights' }),
  V('seek', 'sought', 'sought', 'buscar', 'cercar', 3, { falsas: ['seeked', 'saught'] }),
  V('shake', 'shook', 'shaken', 'agitar, sacudir', 'sacsejar', 3, { falsas: ['shaked', 'shooken'], obj: 'hands with a famous actor' }),
  V('shoot', 'shot', 'shot', 'disparar', 'disparar', 3, { falsas: ['shooted', 'shut'] }),
  V('sink', 'sank', 'sunk', 'hundir(se)', 'enfonsar(-se)', 3, { falsas: ['sinked', 'sinken'] }),
  V('slide', 'slid', 'slid', 'deslizar(se)', 'lliscar', 3, { falsas: ['slided', 'slidden'] }),
  V('spin', 'spun', 'spun', 'girar', 'girar', 3, { falsas: ['spinned', 'span'] }),
  V('spread', 'spread', 'spread', 'extender, untar', 'estendre, untar', 3, { falsas: ['spreaded', 'sprod'] }),
  V('spring', 'sprang', 'sprung', 'saltar, brotar', 'saltar, brotar', 3, { falsas: ['springed', 'sprong'] }),
  V('stick', 'stuck', 'stuck', 'pegar, clavar', 'enganxar, clavar', 3, { falsas: ['sticked', 'stack'] }),
  V('sting', 'stung', 'stung', 'picar (un insecto)', 'picar (un insecte)', 3, { falsas: ['stinged', 'stang'] }),
  V('strike', 'struck', 'struck', 'golpear, dar (la hora)', 'colpejar, tocar (l’hora)', 3, { falsas: ['striked', 'stroke'] }),
  V('swear', 'swore', 'sworn', 'jurar', 'jurar', 3, { falsas: ['sweared', 'swored'], obj: 'an oath' }),
  V('swing', 'swung', 'swung', 'balancear(se)', 'gronxar(se)', 3, { falsas: ['swinged', 'swang'] }),
  V('tear', 'tore', 'torn', 'rasgar, romper', 'estripar', 3, { falsas: ['teared', 'toren'], obj: 'a page out of the book' }),
  V('upset', 'upset', 'upset', 'disgustar', 'disgustar', 3, { falsas: ['upsetted', 'upsat'] }),
  V('wake', 'woke', 'woken', 'despertar(se)', 'despertar(se)', 3, { falsas: ['waked', 'woked'], obj: 'up before sunrise' }),
  V('weep', 'wept', 'wept', 'llorar', 'plorar', 3, { falsas: ['weeped', 'wep'] }),
  V('withdraw', 'withdrew', 'withdrawn', 'retirar', 'retirar', 3, { falsas: ['withdrawed', 'withdrewn'], obj: 'some money' }),
]
export const verbo = id => VERBOS.find(v => v.id === id)

// Patrones: qué formas coinciden.
export const PATRONES = {
  AAA: { letras: 'A · A · A', nombre: { es: 'Las tres iguales', en: 'All three the same', ca: 'Les tres iguals' } },
  ABB: { letras: 'A · B · B', nombre: { es: 'Pasado = participio', en: 'Past = participle', ca: 'Passat = participi' } },
  ABC: { letras: 'A · B · C', nombre: { es: 'Las tres distintas', en: 'All three different', ca: 'Les tres diferents' } },
  ABA: { letras: 'A · B · A', nombre: { es: 'Participio = infinitivo', en: 'Participle = infinitive', ca: 'Participi = infinitiu' } },
}
// El ejemplo de cada caja nunca es un verbo de la ronda (si no, se regala).
const EJEMPLOS = { AAA: ['cut', 'put', 'hit', 'let'], ABB: ['buy', 'make', 'sleep', 'tell'], ABC: ['go', 'eat', 'see', 'write'], ABA: ['come', 'run', 'become'] }
export function ejemploPatron(p, enRonda = []) {
  const id = EJEMPLOS[p].find(x => !enRonda.includes(x)) ?? EJEMPLOS[p][0]
  return tresFormas(verbo(id))
}
export function patron(v) {
  if (v.inf === v.past && v.past === v.pp) return 'AAA'
  if (v.past === v.pp) return 'ABB'
  if (v.inf === v.pp) return 'ABA'
  return 'ABC'
}

// La forma regular que se inventaría quien no se sabe el verbo (goed, runned…).
export function regular(inf) {
  if (inf.endsWith('e')) return inf + 'd'
  if (/[^aeiou]y$/.test(inf)) return inf.slice(0, -1) + 'ied'
  if (inf.length <= 4 && /[^aeiou][aeiou][bdgmnprt]$/.test(inf)) return inf + inf.at(-1) + 'ed'
  return inf + 'ed'
}

export const NIVELES = {
  facil:   { maxNivel: 1, tipos: ['forja', 'forja', 'patrones'] },
  medio:   { maxNivel: 2, tipos: ['forja', 'patrones', 'teclea', 'frase'] },
  dificil: { maxNivel: 3, tipos: ['teclea', 'teclea', 'frase', 'patrones', 'forja'] },
}

// Frases: el mismo complemento vale con el pasado y con el participio.
const FRASES_PASADO = ['Yesterday, Tom ___ {o}.', 'Last week, my sister ___ {o}.', 'Two days ago, Anna ___ {o}.']
const FRASES_PARTICIPIO = ['Tom has never ___ {o}.', 'My sister has just ___ {o}.', 'Have you ever ___ {o}?']

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []

const pool = nivel => {
  const todos = VERBOS.filter(v => v.nivel <= (NIVELES[nivel] ?? NIVELES.facil).maxNivel)
  const frescos = todos.filter(v => !recientes.includes(v.id))
  return frescos.length >= 12 ? frescos : todos
}

// Los verbos recientes se quitan del sorteo (no se descarta la ronda: una de
// patrones lleva cuatro verbos y casi siempre tocaría alguno reciente).
export function genRonda(nivel = 'facil', opts = {}) {
  const r = genUna(nivel, opts)
  recientes.push(...r.verbos)
  while (recientes.length > 10) recientes.shift()
  return r
}

// Fichas falsas: nunca una forma buena del verbo.
function falsasDe(v, rand, n) {
  const buenas = new Set([v.past, v.pp])
  const cand = [...new Set([...(v.falsas ?? []), regular(v.inf), v.inf])].filter(f => !buenas.has(f))
  const otras = baraja(rand, VERBOS.filter(o => o.id !== v.id).map(o => o.past)).filter(f => !buenas.has(f))
  return [...baraja(rand, cand), ...otras].filter((f, i, a) => a.indexOf(f) === i).slice(0, n)
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const verbos = pool(nivel)
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'forja') {
      const v = elige(rand, verbos)
      // Si pasado y participio coinciden, la ficha sale dos veces.
      const fichas = baraja(rand, [v.past, v.pp, ...falsasDe(v, rand, nivel === 'facil' ? 2 : 3)])
      return { ...base, verbos: [v.id], fichas, bueno: `forja:${v.past}|${v.pp}` }
    }

    if (tipo === 'patrones') {
      // Se vuelve a barajar aquí (no se sortea otro tipo, que sesgaría contra patrones)
      // (si los recientes se han llevado los de algún patrón, se sortea entre todos).
      let vs
      for (let k = 0; ; k++) {
        const de = k < 30 ? verbos : VERBOS.filter(v => v.nivel <= cfg.maxNivel)
        vs = baraja(rand, de.filter(v => !v.sinPatron)).slice(0, 4)
        if (new Set(vs.map(patron)).size >= 3) break
      }
      return { ...base, verbos: vs.map(v => v.id), formas: nivel === 'facil', bueno: 'patrones:0' }
    }

    if (tipo === 'teclea') {
      const v = elige(rand, verbos)
      const huecos = nivel === 'dificil' ? ['past', 'pp'] : [elige(rand, ['past', 'pp'])]
      return { ...base, verbos: [v.id], huecos, bueno: 'teclea:ok' }
    }

    // frase: un verbo con pasado y participio distintos y un complemento que valga para las dos
    const v = elige(rand, verbos.filter(x => x.obj && x.past !== x.pp))
    if (!v) continue
    const frases = baraja(rand, [
      { forma: 'past', texto: elige(rand, FRASES_PASADO).replace('{o}', v.obj) },
      { forma: 'pp', texto: elige(rand, FRASES_PARTICIPIO).replace('{o}', v.obj) },
    ])
    const fichas = baraja(rand, [v.past, v.pp, ...[v.inf, regular(v.inf)].filter(f => f !== v.past && f !== v.pp).slice(0, 1)])
    return { ...base, verbos: [v.id], frases, fichas, bueno: 'frase:0' }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «forja:pasado|participio», «patrones:fallos», «teclea:ok|mal», «frase:fallos».
export const esCorrecta = (r, o) => o === r.bueno

const limpia = t => t.trim().toLowerCase().replace(/\s+/g, ' ')
export function vale(v, forma, escrito) {
  const e = limpia(escrito)
  return e === v[forma] || (forma === 'pp' && (v.tambien ?? []).includes(e))
}

// ── Textos ────────────────────────────────────────────────────────────────
export const FORMA = {
  inf: { es: 'Infinitivo', en: 'Infinitive', ca: 'Infinitiu' },
  past: { es: 'Pasado', en: 'Past simple', ca: 'Passat' },
  pp: { es: 'Participio', en: 'Past participle', ca: 'Participi' },
}
export const significado = (v, l) => (l === 'en' ? null : tx(v.sig, l))
export const tresFormas = v => `${v.inf} · ${v.past} · ${v.pp}`

export function enunciado(r, l) {
  if (r.tipo === 'forja') return s(l, 'Forja el pasado y el participio', 'Build the past simple and the past participle', 'Forja el passat i el participi')
  if (r.tipo === 'patrones') return s(l, 'Cada verbo a su patrón', 'Put each verb in its pattern', 'Cada verb al seu patró')
  if (r.tipo === 'teclea') return r.huecos.length === 2
    ? s(l, 'Escribe el pasado y el participio', 'Write the past simple and the past participle', 'Escriu el passat i el participi')
    : s(l, `Escribe el ${r.huecos[0] === 'past' ? 'pasado' : 'participio'}`, `Write the ${r.huecos[0] === 'past' ? 'past simple' : 'past participle'}`, `Escriu el ${r.huecos[0] === 'past' ? 'passat' : 'participi'}`)
  return s(l, 'Pon cada forma en su frase', 'Put each form in the right sentence', 'Posa cada forma a la seva frase')
}

export function explicacion(r, l) {
  const vs = r.verbos.map(verbo)
  if (r.tipo === 'patrones') return vs.map(v => `${tresFormas(v)} (${PATRONES[patron(v)].letras})`).join(' · ') + '.'
  const v = vs[0]
  const sig = significado(v, l)
  let t = `${tresFormas(v)}${sig ? ` (${sig})` : ''}.`
  if (r.tipo === 'frase') t += ' ' + s(l,
    `Con una fecha del pasado (yesterday, last week, ago) va el pasado, «${v.past}»; detrás de have/has, el participio, «${v.pp}».`,
    `With a finished time (yesterday, last week, ago) use the past simple, “${v.past}”; after have/has, the past participle, “${v.pp}”.`,
    `Amb una data del passat (yesterday, last week, ago) va el passat, «${v.past}»; darrere de have/has, el participi, «${v.pp}».`)
  else if (patron(v) === 'ABC' || patron(v) === 'ABA') t += ' ' + s(l, 'El participio es el que va con have: «I have ' + v.pp + '».', 'The participle is the one that goes with have: “I have ' + v.pp + '”.', 'El participi és el que va amb have: «I have ' + v.pp + '».')
  if (v.nota) t += ' ' + tx(v.nota, l)
  return t
}

// Para los buscadores y el examen en texto.
export function schemaQuestion(r, l) {
  const v = verbo(r.verbos[0])
  const forma = r.tipo === 'teclea' ? r.huecos[0] : 'past'
  const buena = v[forma]
  const malas = [...new Set([...(v.falsas ?? []), regular(v.inf), v.inf, v.past, v.pp])].filter(f => f !== buena).slice(0, 3)
  const nombre = forma === 'past'
    ? s(l, 'el pasado', 'the past simple', 'el passat')
    : s(l, 'el participio', 'the past participle', 'el participi')
  return { question: s(l, `¿Cuál es ${nombre} de «${v.inf}»?`, `What is ${nombre} of “${v.inf}”?`, `Quin és ${nombre} de «${v.inf}»?`), correctAnswer: buena, wrongAnswers: malas }
}
