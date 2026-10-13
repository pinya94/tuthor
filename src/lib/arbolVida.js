// Árbol de la Vida (biología · evolución, 4.º de ESO y Bachillerato).
//
// Un juego de colocar y ordenar, no de elegir respuestas:
//   rasgos     cladograma en escalera: cada rasgo, en el tramo donde aparece
//   especies   al revés: los rasgos están puestos y se colocan los seres vivos
//   ancestro   tocar el antepasado común de dos especies en un árbol
//              (la ballena es más pariente nuestra que del atún)
//   ordena     tocar los grupos en el orden en que aparecieron
//   clasifica  tarjetas a su caja: Darwin o Lamarck, homólogos/análogos/
//              vestigiales, tipos de prueba de la evolución
//
// Solo relaciones de parentesco bien establecidas y textos de libro de ESO.

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)

export const SERES = {
  humano: { e: '🧑', n: T('el ser humano', 'humans', 'l’ésser humà') },
  chimpance: { e: '🐒', n: T('el chimpancé', 'the chimpanzee', 'el ximpanzé') },
  gorila: { e: '🦍', n: T('el gorila', 'the gorilla', 'el goril·la') },
  orangutan: { e: '🐵', n: T('el orangután', 'the orangutan', 'l’orangutan') },
  raton: { e: '🐭', n: T('el ratón', 'the mouse', 'el ratolí') },
  pollo: { e: '🐔', n: T('la gallina', 'the chicken', 'la gallina') },
  salmon: { e: '🐟', n: T('el salmón', 'the salmon', 'el salmó') },
  tiburon: { e: '🦈', n: T('el tiburón', 'the shark', 'el tauró') },
  rana: { e: '🐸', n: T('la rana', 'the frog', 'la granota') },
  ballena: { e: '🐋', n: T('la ballena', 'the whale', 'la balena') },
  atun: { e: '🐠', n: T('el atún', 'the tuna', 'la tonyina') },
  cocodrilo: { e: '🐊', n: T('el cocodrilo', 'the crocodile', 'el cocodril') },
  ave: { e: '🐦', n: T('el pájaro', 'the bird', 'l’ocell') },
  tortuga: { e: '🐢', n: T('la tortuga', 'the turtle', 'la tortuga') },
  lagarto: { e: '🦎', n: T('el lagarto', 'the lizard', 'el llangardaix') },
  murcielago: { e: '🦇', n: T('el murciélago', 'the bat', 'el ratpenat') },
}

// Árboles reales: [[a, b], c] significa que a y b son hermanos y c, el grupo externo.
export const ARBOLES = [
  [[[['humano', 'chimpance'], 'gorila'], 'orangutan']],
  [[[['humano', 'raton'], 'pollo'], 'salmon']],
  [[[['rana', 'humano'], 'salmon'], 'tiburon']],
  [[[['ballena', 'humano'], 'pollo'], 'atun']],
  [[[['cocodrilo', 'ave'], 'tortuga'], 'lagarto']],
  [[['murcielago', 'raton'], ['ave', 'lagarto']]],
].map(a => a[0])

// Hojas de un árbol en orden.
export const hojas = t => (typeof t === 'string' ? [t] : t.flatMap(hojas))
// El pariente (o parientes) más cercanos de x: las hojas del hermano de la rama más baja que contiene a x.
export function masCercanos(t, x) {
  if (typeof t === 'string') return null
  const [a, b] = t
  const enA = hojas(a).includes(x)
  const rama = enA ? a : b, otra = enA ? b : a
  if (typeof rama === 'string') return hojas(otra)
  return masCercanos(rama, x)
}

export const ESCENARIOS = [
  { id: 'jirafa', e: '🦒',
    q: T('Las jirafas tienen el cuello largo.', 'Giraffes have long necks.', 'Les girafes tenen el coll llarg.'),
    darwin: T('Entre las jirafas había unas con el cuello más largo que otras; esas comían más, sobrevivían más y lo heredaron sus crías.', 'Some giraffes had longer necks than others; they ate more, survived more and passed it on to their young.', 'Entre les girafes n’hi havia amb el coll més llarg que d’altres; aquestes menjaven més, sobrevivien més i ho van heretar les cries.'),
    lamarck: T('Estiraban el cuello para llegar a las hojas altas, se les alargó y heredaron ese cuello estirado.', 'They stretched their necks to reach high leaves, their necks grew longer and their young inherited the stretched neck.', 'Estiraven el coll per arribar a les fulles altes, se’ls va allargar i van heretar aquest coll estirat.'),
    otras: [T('Siempre han sido exactamente iguales, desde que aparecieron.', 'They have always been exactly the same, ever since they appeared.', 'Sempre han estat exactament iguals, des que van aparèixer.'), T('Lo necesitaban, y por eso todas a la vez desarrollaron el cuello largo.', 'They needed it, so they all developed long necks at the same time.', 'Ho necessitaven, i per això totes alhora van desenvolupar el coll llarg.')] },
  { id: 'polilla', e: '🦋',
    q: T('En la Inglaterra industrial, las polillas oscuras se hicieron mucho más abundantes que las claras.', 'In industrial England, dark moths became far more common than pale ones.', 'A l’Anglaterra industrial, les arnes fosques es van fer molt més abundants que les clares.'),
    darwin: T('Con el hollín, las claras se veían sobre los troncos y se las comían los pájaros; las oscuras sobrevivían y tenían más crías.', 'With the soot, pale moths stood out on the tree trunks and birds ate them; dark ones survived and had more young.', 'Amb el sutge, les clares es veien sobre els troncs i se les menjaven els ocells; les fosques sobrevivien i tenien més cries.'),
    lamarck: T('Las polillas se fueron oscureciendo al vivir entre el hollín y transmitieron ese color a sus crías.', 'The moths gradually darkened from living among the soot and passed that colour on to their young.', 'Les arnes es van anar enfosquint en viure entre el sutge i van transmetre aquest color a les cries.'),
    otras: [T('El hollín las teñía y por eso parecían más oscuras.', 'The soot stained them, so they just looked darker.', 'El sutge les tenyia i per això semblaven més fosques.'), T('Las claras emigraron a otros países.', 'The pale ones migrated to other countries.', 'Les clares van emigrar a altres països.')] },
  { id: 'bacterias', e: '🦠',
    q: T('Cada vez hay más bacterias resistentes a los antibióticos.', 'There are more and more bacteria resistant to antibiotics.', 'Cada vegada hi ha més bacteris resistents als antibiòtics.'),
    darwin: T('Algunas bacterias ya eran resistentes por una mutación; el antibiótico mata a las demás y ellas se multiplican.', 'A few bacteria were already resistant because of a mutation; the antibiotic kills the rest and they multiply.', 'Alguns bacteris ja eren resistents per una mutació; l’antibiòtic mata els altres i ells es multipliquen.'),
    lamarck: T('Las bacterias se acostumbran al antibiótico y transmiten esa costumbre a sus descendientes.', 'Bacteria get used to the antibiotic and pass that habit on to their descendants.', 'Els bacteris s’acostumen a l’antibiòtic i transmeten aquest costum als descendents.'),
    otras: [T('El antibiótico se estropea con el tiempo y deja de funcionar.', 'The antibiotic goes off over time and stops working.', 'L’antibiòtic es fa malbé amb el temps i deixa de funcionar.'), T('Las personas se vuelven resistentes, no las bacterias.', 'People become resistant, not the bacteria.', 'Les persones es tornen resistents, no els bacteris.')] },
  { id: 'osos', e: '🐻',
    q: T('Los osos polares son blancos.', 'Polar bears are white.', 'Els óssos polars són blancs.'),
    darwin: T('Los osos de pelaje más claro cazaban mejor sin ser vistos sobre la nieve, sobrevivían más y tenían más crías.', 'Bears with paler fur hunted better unseen on the snow, survived more and had more cubs.', 'Els óssos de pelatge més clar caçaven millor sense ser vistos sobre la neu, sobrevivien més i tenien més cries.'),
    lamarck: T('Al vivir en la nieve se les fue aclarando el pelo y lo transmitieron a sus crías.', 'Living in the snow, their fur gradually lightened and they passed it on to their cubs.', 'En viure a la neu se’ls va anar aclarint el pèl i ho van transmetre a les cries.'),
    otras: [T('El frío les decolora el pelo cada invierno.', 'The cold bleaches their fur every winter.', 'El fred els decolora el pèl cada hivern.'), T('Decidieron ser blancos para camuflarse.', 'They decided to be white to camouflage themselves.', 'Van decidir ser blancs per camuflar-se.')] },
]

export const ORGANOS = [
  { a: T('El brazo humano y el ala del murciélago', 'The human arm and the bat’s wing', 'El braç humà i l’ala del ratpenat'), tipo: 'homologo' },
  { a: T('La aleta de la ballena y la pata del caballo', 'The whale’s flipper and the horse’s leg', 'L’aleta de la balena i la pota del cavall'), tipo: 'homologo' },
  { a: T('El ala de un pájaro y la pata delantera de un gato', 'A bird’s wing and a cat’s front leg', 'L’ala d’un ocell i la pota del davant d’un gat'), tipo: 'homologo' },
  { a: T('El ala de una mariposa y el ala de un pájaro', 'A butterfly’s wing and a bird’s wing', 'L’ala d’una papallona i l’ala d’un ocell'), tipo: 'analogo' },
  { a: T('La aleta de un tiburón y la aleta de un delfín', 'A shark’s fin and a dolphin’s fin', 'L’aleta d’un tauró i l’aleta d’un dofí'), tipo: 'analogo' },
  { a: T('El ojo del pulpo y el ojo humano', 'The octopus eye and the human eye', 'L’ull del pop i l’ull humà'), tipo: 'analogo' },
  { a: T('El coxis humano (restos de una cola)', 'The human coccyx (remains of a tail)', 'El còccix humà (restes d’una cua)'), tipo: 'vestigial' },
  { a: T('Los huesos de la cadera de la ballena', 'The hip bones of a whale', 'Els ossos del maluc de la balena'), tipo: 'vestigial' },
  { a: T('Las alas del avestruz, que no le sirven para volar', 'The ostrich’s wings, which it cannot fly with', 'Les ales de l’estruç, que no li serveixen per volar'), tipo: 'vestigial' },
]
export const TIPOS_ORGANO = {
  homologo: T('Homólogos', 'Homologous', 'Homòlegs'),
  analogo: T('Análogos', 'Analogous', 'Anàlegs'),
  vestigial: T('Vestigial', 'Vestigial', 'Vestigial'),
}

export const PRUEBAS = {
  fosiles: T('Fósiles (paleontología)', 'Fossils (palaeontology)', 'Fòssils (paleontologia)'),
  anatomia: T('Anatomía comparada', 'Comparative anatomy', 'Anatomia comparada'),
  embriologia: T('Embriología', 'Embryology', 'Embriologia'),
  adn: T('ADN y bioquímica', 'DNA and biochemistry', 'ADN i bioquímica'),
  biogeografia: T('Biogeografía', 'Biogeography', 'Biogeografia'),
}
export const DATOS_PRUEBA = [
  { p: 'fosiles', t: T('El Archaeopteryx tenía plumas como un ave y dientes y cola como un dinosaurio.', 'Archaeopteryx had feathers like a bird and teeth and a tail like a dinosaur.', 'L’Archaeopteryx tenia plomes com un ocell i dents i cua com un dinosaure.') },
  { p: 'fosiles', t: T('En las rocas más antiguas solo hay restos de seres sencillos; los mamíferos aparecen en capas mucho más recientes.', 'The oldest rocks contain only simple organisms; mammals appear in much more recent layers.', 'A les roques més antigues només hi ha restes d’éssers senzills; els mamífers apareixen en capes molt més recents.') },
  { p: 'anatomia', t: T('El brazo humano, la aleta de la ballena y el ala del murciélago tienen los mismos huesos colocados igual.', 'The human arm, the whale’s flipper and the bat’s wing have the same bones arranged the same way.', 'El braç humà, l’aleta de la balena i l’ala del ratpenat tenen els mateixos ossos col·locats igual.') },
  { p: 'embriologia', t: T('Los embriones de pez, gallina y ser humano se parecen mucho al principio y tienen hendiduras en el cuello.', 'Fish, chicken and human embryos look very alike early on and have slits in the neck.', 'Els embrions de peix, gallina i ésser humà s’assemblen molt al principi i tenen esquerdes al coll.') },
  { p: 'adn', t: T('El ADN del chimpancé y el humano coincide en un 98 %, mucho más que con el de un ratón.', 'Chimpanzee and human DNA match by about 98%, far more than with a mouse’s.', 'L’ADN del ximpanzé i l’humà coincideix en un 98 %, molt més que amb el d’un ratolí.') },
  { p: 'biogeografia', t: T('Los marsupiales, como el canguro, viven casi solo en Australia, que lleva millones de años aislada.', 'Marsupials, like the kangaroo, live almost only in Australia, which has been isolated for millions of years.', 'Els marsupials, com el cangur, viuen gairebé només a Austràlia, que fa milions d’anys que està aïllada.') },
  { p: 'biogeografia', t: T('Cada isla de las Galápagos tiene su propia especie de pinzón, con un pico distinto.', 'Each Galápagos island has its own species of finch, with a different beak.', 'Cada illa de les Galápagos té la seva pròpia espècie de pinsà, amb un bec diferent.') },
]

// Millones de años desde que apareció cada grupo (aproximado, cifras de libro).
export const APARICION = {
  bacterias: { ma: 3500, e: '🦠', n: T('Las primeras bacterias', 'The first bacteria', 'Els primers bacteris') },
  peces: { ma: 500, e: '🐟', n: T('Los peces', 'Fish', 'Els peixos') },
  plantas: { ma: 470, e: '🌿', n: T('Las plantas terrestres', 'Land plants', 'Les plantes terrestres') },
  anfibios: { ma: 370, e: '🐸', n: T('Los anfibios', 'Amphibians', 'Els amfibis') },
  reptiles: { ma: 320, e: '🦎', n: T('Los reptiles', 'Reptiles', 'Els rèptils') },
  dinosaurios: { ma: 230, e: '🦖', n: T('Los dinosaurios', 'Dinosaurs', 'Els dinosaures') },
  mamiferos: { ma: 200, e: '🐭', n: T('Los mamíferos', 'Mammals', 'Els mamífers') },
  aves: { ma: 150, e: '🐦', n: T('Las aves', 'Birds', 'Els ocells') },
  flores: { ma: 130, e: '🌸', n: T('Las plantas con flores', 'Flowering plants', 'Les plantes amb flors') },
  humanos: { ma: 0.3, e: '🧑', n: T('Homo sapiens', 'Homo sapiens', 'Homo sapiens') },
}

// ── Cladogramas en escalera (rasgo → tramo del tronco) ────────────────────
// taxa del grupo externo al más interno. rasgos[k] aparece en el tramo k:
// lo tienen todos los taxa desde el k hasta el último (el último tramo es la
// rama terminal del último taxón).
export const PLANTAS = {
  musgo: { e: '🌱', n: T('el musgo', 'the moss', 'la molsa') },
  helecho: { e: '🌿', n: T('el helecho', 'the fern', 'la falguera') },
  pino: { e: '🌲', n: T('el pino', 'the pine', 'el pi') },
  tulipan: { e: '🌷', n: T('el tulipán', 'the tulip', 'la tulipa') },
}
export const ser = (x, l) => tx((SERES[x] ?? PLANTAS[x]).n, l)
export const emo = x => (SERES[x] ?? PLANTAS[x]).e

export const RASGOS = {
  vertebras: T('Columna vertebral', 'Backbone', 'Columna vertebral'),
  hueso: T('Esqueleto de hueso', 'Bony skeleton', 'Esquelet d’os'),
  patas: T('Cuatro patas', 'Four limbs', 'Quatre potes'),
  amnios: T('Huevo con cáscara', 'Shelled egg', 'Ou amb closca'),
  pelo: T('Pelo y leche', 'Hair and milk', 'Pèl i llet'),
  corazon: T('Corazón de 4 cavidades', '4-chambered heart', 'Cor de 4 cavitats'),
  plumas: T('Plumas', 'Feathers', 'Plomes'),
  tierra: T('Viven en tierra firme', 'Live on land', 'Viuen a terra ferma'),
  vasos: T('Vasos conductores', 'Vascular tissue', 'Vasos conductors'),
  semillas: T('Semillas', 'Seeds', 'Llavors'),
  flores: T('Flores y frutos', 'Flowers and fruit', 'Flors i fruits'),
}
export const ESCALERAS = [
  { id: 'vert4', taxa: ['salmon', 'rana', 'lagarto', 'raton'], rasgos: ['vertebras', 'patas', 'amnios', 'pelo'] },
  { id: 'vert5', taxa: ['tiburon', 'salmon', 'rana', 'lagarto', 'raton'], rasgos: ['vertebras', 'hueso', 'patas', 'amnios', 'pelo'] },
  { id: 'plantas', taxa: ['musgo', 'helecho', 'pino', 'tulipan'], rasgos: ['tierra', 'vasos', 'semillas', 'flores'] },
  { id: 'arcosaurios', taxa: ['lagarto', 'cocodrilo', 'ave'], rasgos: ['amnios', 'corazon', 'plumas'] },
]
export const escalera = id => ESCALERAS.find(e => e.id === id)

// ── Antepasado común en los árboles ramificados ───────────────────────────
// Clave de un nodo interno: sus hojas ordenadas, unidas por «+».
export const claveNodo = t => hojas(t).slice().sort().join('+')
export function nodosInternos(t) {
  if (typeof t === 'string') return []
  return [t, ...nodosInternos(t[0]), ...nodosInternos(t[1])]
}
// El nodo más bajo que contiene a los dos.
export function ancestroComun(t, a, b) {
  const cands = nodosInternos(t).filter(n => hojas(n).includes(a) && hojas(n).includes(b))
  return cands.sort((x, y) => hojas(x).length - hojas(y).length)[0]
}

export const NIVELES = {
  facil:   { tipos: ['rasgos', 'rasgos', 'ordena', 'clasifica'], escaleras: ['vert4', 'plantas', 'arcosaurios'], clasifica: ['teorias'], ordena: 'facil' },
  medio:   { tipos: ['rasgos', 'especies', 'ancestro', 'ordena', 'clasifica'], escaleras: ['vert4', 'vert5', 'plantas', 'arcosaurios'], clasifica: ['teorias', 'organos'], ordena: 'medio' },
  dificil: { tipos: ['rasgos', 'especies', 'ancestro', 'ancestro', 'ordena', 'clasifica'], escaleras: ['vert5', 'plantas', 'arcosaurios'], clasifica: ['organos', 'pruebas'], ordena: 'dificil' },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, cfg, rand)
    if (intento < 20 && recientes.includes(r.clave)) continue
    recientes.push(r.clave)
    if (recientes.length > 4) recientes.shift()
    return r
  }
}

function genUna(nivel, cfg, rand) {
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'rasgos' || tipo === 'especies') {
      const e = escalera(elige(rand, cfg.escaleras))
      const fichas = baraja(rand, tipo === 'rasgos' ? e.rasgos : e.taxa)
      return { ...base, clave: `${tipo}${e.id}`, escalera: e.id, fichas, bueno: `${tipo}:0` }
    }

    if (tipo === 'ancestro') {
      const i = Math.floor(rand() * ARBOLES.length)
      const t = ARBOLES[i]
      const [a, b] = baraja(rand, hojas(t))
      const anc = ancestroComun(t, a, b)
      // Que no sea siempre la raíz: en difícil, sobre todo nodos internos.
      if (anc === t && rand() < (nivel === 'dificil' ? 0.8 : 0.5)) continue
      return { ...base, clave: `anc${i}${a}${b}`, arbol: i, a, b, bueno: claveNodo(anc) }
    }

    if (tipo === 'ordena') {
      const ids = Object.keys(APARICION)
      let grupo = baraja(rand, ids).slice(0, 4)
      if (cfg.ordena === 'facil') grupo = baraja(rand, ['bacterias', 'peces', 'reptiles', 'mamiferos', 'humanos', 'plantas']).slice(0, 4)
      if (cfg.ordena === 'dificil' && rand() < 0.5) grupo = baraja(rand, ['dinosaurios', 'mamiferos', 'aves', 'flores'])
      if (new Set(grupo.map(g => APARICION[g].ma)).size < 4) continue
      const orden = [...grupo].sort((x, y) => APARICION[y].ma - APARICION[x].ma)
      return { ...base, clave: `ord${orden.join()}`, grupo, bueno: orden.join(',') }
    }

    // clasifica
    const variante = elige(rand, cfg.clasifica)
    if (variante === 'teorias') {
      const [e1, e2] = baraja(rand, ESCENARIOS)
      const items = baraja(rand, [`t:${e1.id}:darwin`, `t:${e1.id}:lamarck`, `t:${e2.id}:darwin`, `t:${e2.id}:lamarck`])
      return { ...base, clave: `cl${e1.id}${e2.id}`, variante, items, cajas: ['darwin', 'lamarck'], bueno: 'clasifica:0' }
    }
    if (variante === 'organos') {
      const items = baraja(rand, ORGANOS.map((_, i) => `o:${i}`)).slice(0, 4)
      if (new Set(items.map(cajaDe)).size < 2) continue
      return { ...base, clave: `cl${items.join()}`, variante, items, cajas: Object.keys(TIPOS_ORGANO), bueno: 'clasifica:0' }
    }
    const items = baraja(rand, DATOS_PRUEBA.map((_, i) => `p:${i}`)).slice(0, 4)
    if (new Set(items.map(cajaDe)).size < 3) continue
    return { ...base, clave: `cl${items.join()}`, variante, items, cajas: Object.keys(PRUEBAS), bueno: 'clasifica:0' }
  }
}

// A qué caja va cada tarjeta.
export function cajaDe(item) {
  const [k, a, b] = item.split(':')
  if (k === 't') return b
  if (k === 'o') return ORGANOS[+a].tipo
  return DATOS_PRUEBA[+a].p
}
export function textoItem(item, l) {
  const [k, a, b] = item.split(':')
  if (k === 't') { const e = ESCENARIOS.find(x => x.id === a); return `${e.e} ${tx(e[b], l)}` }
  if (k === 'o') return tx(ORGANOS[+a].a, l)
  return tx(DATOS_PRUEBA[+a].t, l)
}
export const TEORIAS = { darwin: T('Darwin (selección natural)', 'Darwin (natural selection)', 'Darwin (selecció natural)'), lamarck: T('Lamarck', 'Lamarck', 'Lamarck') }
export function textoCaja(r, c, l) {
  if (r.variante === 'teorias') return tx(TEORIAS[c], l)
  if (r.variante === 'organos') return tx(TIPOS_ORGANO[c], l)
  return tx(PRUEBAS[c], l)
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: rasgos/especies «tipo:fallos»; ancestro, la clave del nodo
// tocado; ordena, los grupos en el orden tocado; clasifica «clasifica:fallos».
export const esCorrecta = (r, o) => String(o) === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const cap = t => t.charAt(0).toUpperCase() + t.slice(1)

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'rasgos': return s(l, 'Coloca cada rasgo en el tramo del árbol donde aparece', 'Place each trait on the part of the tree where it appears', 'Col·loca cada tret al tram de l’arbre on apareix')
    case 'especies': return s(l, 'Coloca cada ser vivo en su rama, según los rasgos del árbol', 'Place each living thing on its branch, using the traits on the tree', 'Col·loca cada ésser viu a la seva branca, segons els trets de l’arbre')
    case 'ancestro': return s(l, `Toca el antepasado común más reciente ${de(r.a, l)} y ${ser(r.b, l)}`, `Tap the most recent common ancestor of ${ser(r.a, l)} and ${ser(r.b, l)}`, `Toca l’avantpassat comú més recent ${de(r.a, l)} i ${de(r.b, l).replace(/^de l’|^del |^de /, m => m === 'del ' ? 'el ' : m === 'de l’' ? 'l’' : '')}`)
    case 'ordena': return s(l, 'Toca los grupos en el orden en que aparecieron, del más antiguo al más reciente', 'Tap the groups in the order they appeared, oldest first', 'Toca els grups en l’ordre en què van aparèixer, del més antic al més recent')
    default: return r.variante === 'teorias'
      ? s(l, '¿Cada explicación es de Darwin o de Lamarck?', 'Is each explanation Darwin’s or Lamarck’s?', 'Cada explicació és de Darwin o de Lamarck?')
      : r.variante === 'organos'
        ? s(l, 'Clasifica cada pareja de órganos', 'Classify each pair of organs', 'Classifica cada parella d’òrgans')
        : s(l, '¿Qué tipo de prueba de la evolución es cada dato?', 'What kind of evidence for evolution is each fact?', 'Quin tipus de prova de l’evolució és cada dada?')
  }
}
// «de el ser humano» → «del ser humano» (es y ca).
const de = (x, l) => { const n = ser(x, l); return n.startsWith('el ') ? `del ${n.slice(3)}` : `de ${n}` }

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'rasgos': case 'especies': {
      const e = escalera(r.escalera)
      const pasos = e.rasgos.map((g, k) => `${tx(RASGOS[g], l)}: ${e.taxa.slice(k).map(x => emo(x)).join('')}`).join(' · ')
      return s(l,
        `Cada rasgo aparece una vez y lo heredan todos los que salen después en el árbol: ${pasos}. Por eso, cuanto más arriba se separa una rama, más rasgos comparte con el último.`,
        `Each trait appears once and everything branching off after it inherits it: ${pasos}. So the higher up a branch splits off, the more traits it shares with the last one.`,
        `Cada tret apareix una vegada i l’hereten tots els que surten després a l’arbre: ${pasos}. Per això, com més amunt se separa una branca, més trets comparteix amb l’última.`) + (e.id === 'arcosaurios' ? s(l, ' El cocodrilo parece un lagarto, pero su pariente vivo más cercano son las aves.', ' The crocodile looks like a lizard, but its closest living relatives are birds.', ' El cocodril sembla un llangardaix, però el seu parent viu més proper són els ocells.') : '')
    }
    case 'ancestro': {
      const t = ARBOLES[r.arbol]
      const nota = [r.a, r.b].includes('ballena')
        ? s(l, ' La ballena parece un pez, pero es un mamífero, como nosotros.', ' A whale looks like a fish, but it is a mammal, like us.', ' La balena sembla un peix, però és un mamífer, com nosaltres.')
        : [r.a, r.b].includes('cocodrilo') && [r.a, r.b].includes('ave')
          ? s(l, ' El cocodrilo y las aves comparten un antepasado más reciente que el que tienen con el lagarto.', ' Crocodiles and birds share a more recent ancestor than either does with lizards.', ' El cocodril i els ocells comparteixen un avantpassat més recent que el que tenen amb el llangardaix.')
          : ''
      const anc = ancestroComun(t, r.a, r.b)
      const dentro = hojas(anc).map(x => emo(x)).join('')
      return s(l,
        `Se sube por las dos ramas hasta el primer punto donde se juntan: ese es su antepasado común más reciente, y de él descienden ${dentro}. Cuanto más abajo está ese punto, más lejano es el parentesco. Lo que cuenta es la rama, no el parecido.${nota}`,
        `Follow both branches down until they first meet: that is their most recent common ancestor, and ${dentro} descend from it. The lower that point, the more distant the relationship. Branching counts, not looks.${nota}`,
        `Es baixa per les dues branques fins al primer punt on s’ajunten: aquest és el seu avantpassat comú més recent, i en descendeixen ${dentro}. Com més avall és aquest punt, més llunyà és el parentiu. El que compta és la branca, no la semblança.${nota}`)
    }
    case 'ordena': {
      const orden = r.bueno.split(',')
      const fmt = g => `${tx(APARICION[g].n, l)} (${APARICION[g].ma >= 1 ? `${APARICION[g].ma.toLocaleString(l === 'en' ? 'en-GB' : 'es-ES')} M` : s(l, '300 000 años', '300,000 years', '300 000 anys')})`
      const nota = r.grupo.includes('mamiferos') && r.grupo.includes('dinosaurios')
        ? s(l, ' Los mamíferos aparecieron casi a la vez que los dinosaurios y convivieron con ellos toda su época.', ' Mammals appeared at almost the same time as dinosaurs and lived alongside them throughout their era.', ' Els mamífers van aparèixer gairebé alhora que els dinosaures i hi van conviure tota la seva època.')
        : ''
      return `${s(l, 'De más antiguo a más reciente', 'From oldest to most recent', 'De més antic a més recent')}: ${orden.map(fmt).join(' → ')}.${nota}`
    }
    default:
      if (r.variante === 'teorias') return s(l, 'Darwin: hay variación, los mejor adaptados sobreviven y tienen más crías, y heredan el rasgo. Lamarck: el uso cambia el cuerpo en vida y ese cambio se hereda, y eso no ocurre: lo que se hereda son los genes.', 'Darwin: there is variation, the best adapted survive and have more young, who inherit the trait. Lamarck: use changes the body during life and that change is inherited, which does not happen: genes are what is inherited.', 'Darwin: hi ha variació, els més ben adaptats sobreviuen i tenen més cries, i hereten el tret. Lamarck: l’ús canvia el cos en vida i aquest canvi s’hereta, i això no passa: el que s’hereta són els gens.')
      if (r.variante === 'organos') return s(l, 'Homólogos: mismo origen y mismos huesos, aunque sirvan para otra cosa (antepasado común). Análogos: misma función, origen distinto. Vestigiales: restos que ya no cumplen su función.', 'Homologous: same origin and bones, even if used differently (common ancestor). Analogous: same function, different origin. Vestigial: leftovers that no longer do their job.', 'Homòlegs: mateix origen i mateixos ossos, encara que serveixin per a una altra cosa (avantpassat comú). Anàlegs: mateixa funció, origen diferent. Vestigials: restes que ja no fan la seva funció.')
      return r.items.map(i => `${tx(PRUEBAS[cajaDe(i)], l)}`).join(' · ') + '. ' + s(l, 'Fósiles: seres del pasado; anatomía: órganos comparados; embriología: embriones; ADN: genes comparados; biogeografía: dónde vive cada especie.', 'Fossils: past organisms; anatomy: compared organs; embryology: embryos; DNA: compared genes; biogeography: where each species lives.', 'Fòssils: éssers del passat; anatomia: òrgans comparats; embriologia: embrions; ADN: gens comparats; biogeografia: on viu cada espècie.')
  }
}

export function schemaQuestion(r, l) {
  switch (r.tipo) {
    case 'rasgos': case 'especies': {
      const e = escalera(r.escalera)
      const k = e.rasgos.length - 1
      return { question: s(l, `En un árbol evolutivo de ${e.taxa.map(x => ser(x, l)).join(', ')}, ¿qué rasgo tiene solo ${ser(e.taxa[k], l)}?`, `In an evolutionary tree of ${e.taxa.map(x => ser(x, l)).join(', ')}, which trait does only ${ser(e.taxa[k], l)} have?`, `En un arbre evolutiu de ${e.taxa.map(x => ser(x, l)).join(', ')}, quin tret té només ${ser(e.taxa[k], l)}?`), correctAnswer: tx(RASGOS[e.rasgos[k]], l), wrongAnswers: e.rasgos.slice(0, k).map(g => tx(RASGOS[g], l)) }
    }
    case 'ancestro': {
      const t = ARBOLES[r.arbol]
      // Una especie con un único pariente más cercano (el grupo externo no lo tiene).
      const x = [r.a, r.b, ...hojas(t)].find(h => masCercanos(t, h).length === 1)
      const cerc = masCercanos(t, x)
      const otros = hojas(t).filter(h => h !== x && !cerc.includes(h))
      return { question: s(l, `Según el árbol evolutivo, ¿cuál es el pariente más cercano ${de(x, l)}?`, `According to the evolutionary tree, which is the closest relative of ${ser(x, l)}?`, `Segons l’arbre evolutiu, quin és el parent més proper ${de(x, l)}?`), correctAnswer: cap(cerc.map(x => ser(x, l)).join(', ')), wrongAnswers: otros.map(x => cap(ser(x, l))) }
    }
    case 'ordena': {
      const orden = r.bueno.split(',')
      return { question: s(l, '¿Cuál de estos grupos apareció antes en la Tierra?', 'Which of these groups appeared first on Earth?', 'Quin d’aquests grups va aparèixer abans a la Terra?'), correctAnswer: tx(APARICION[orden[0]].n, l), wrongAnswers: orden.slice(1).map(g => tx(APARICION[g].n, l)) }
    }
    default: {
      const it = r.items[0]
      const c = cajaDe(it)
      return { question: `«${textoItem(it, l)}» ${r.variante === 'teorias' ? s(l, '¿De quién es esta explicación?', 'Whose explanation is this?', 'De qui és aquesta explicació?') : r.variante === 'organos' ? s(l, '¿Qué tipo de órganos son?', 'What kind of organs are they?', 'Quin tipus d’òrgans són?') : s(l, '¿Qué tipo de prueba es?', 'What kind of evidence is it?', 'Quin tipus de prova és?')}`, correctAnswer: textoCaja(r, c, l), wrongAnswers: r.cajas.filter(x => x !== c).map(x => textoCaja(r, x, l)) }
    }
  }
}
