// Árbol de la Vida (biología · evolución, 4.º de ESO y Bachillerato).
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   arbol      árbol evolutivo dibujado: ¿cuál es el pariente más cercano?
//              (la ballena es más pariente nuestra que del atún; el cocodrilo, de las aves)
//   darwin     qué explicación es la de Darwin (o la de Lamarck)  (heredar lo que se usa)
//   organos    homólogos, análogos o vestigiales                 (parecerse ≠ venir del mismo antepasado)
//   prueba     qué tipo de prueba de la evolución es              (fósiles, anatomía, embriología, ADN, biogeografía)
//   tiempo     qué apareció antes                                  (mamíferos y dinosaurios convivieron)
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

export const NIVELES = {
  facil:   { tipos: ['darwin', 'darwin', 'prueba', 'tiempo', 'arbol'] },
  medio:   { tipos: ['arbol', 'arbol', 'darwin', 'organos', 'organos', 'prueba'] },
  dificil: { tipos: ['arbol', 'arbol', 'organos', 'tiempo', 'tiempo', 'darwin'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'arbol') {
      const i = Math.floor(rand() * ARBOLES.length)
      const t = ARBOLES[i]
      const x = elige(rand, hojas(t))
      const cercanos = masCercanos(t, x)
      if (cercanos.length !== 1) continue // solo preguntas con un único pariente más cercano
      return { ...base, arbol: i, x, bueno: cercanos[0], opciones: baraja(rand, hojas(t).filter(h => h !== x)) }
    }

    if (tipo === 'darwin') {
      const esc = elige(rand, ESCENARIOS)
      const pide = nivel === 'facil' || rand() < 0.65 ? 'darwin' : 'lamarck'
      return { ...base, escenario: esc.id, pide, bueno: pide, opciones: baraja(rand, ['darwin', 'lamarck', 'otra0', 'otra1']) }
    }

    if (tipo === 'organos') {
      const o = Math.floor(rand() * ORGANOS.length)
      return { ...base, organo: o, bueno: ORGANOS[o].tipo, opciones: Object.keys(TIPOS_ORGANO) }
    }

    if (tipo === 'prueba') {
      const d = Math.floor(rand() * DATOS_PRUEBA.length)
      const bueno = DATOS_PRUEBA[d].p
      return { ...base, dato: d, bueno, opciones: baraja(rand, [bueno, ...baraja(rand, Object.keys(PRUEBAS).filter(p => p !== bueno)).slice(0, 3)]) }
    }

    // tiempo: cuál de cuatro apareció antes. En difícil, parejas que se suelen confundir.
    const ids = Object.keys(APARICION)
    let grupo = baraja(rand, ids).slice(0, 4)
    if (nivel === 'dificil' && rand() < 0.5) grupo = baraja(rand, ['dinosaurios', 'mamiferos', 'aves', 'flores'])
    const bueno = grupo.reduce((m, g) => (APARICION[g].ma > APARICION[m].ma ? g : m))
    // Que no haya empates.
    if (new Set(grupo.map(g => APARICION[g].ma)).size < 4) continue
    return { ...base, grupo, bueno, opciones: grupo }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const ser = (x, l) => tx(SERES[x].n, l)
const cap = t => t.charAt(0).toUpperCase() + t.slice(1)
// «de el ser humano» → «del ser humano» (es y ca).
const de = (x, l) => { const n = ser(x, l); return n.startsWith('el ') ? `del ${n.slice(3)}` : `de ${n}` }
const esc = r => ESCENARIOS.find(e => e.id === r.escenario)

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'arbol': return `${SERES[o].e} ${cap(ser(o, l))}`
    case 'darwin': { const e = esc(r); return tx(o === 'darwin' ? e.darwin : o === 'lamarck' ? e.lamarck : e.otras[+o.slice(-1)], l) }
    case 'organos': return tx(TIPOS_ORGANO[o], l)
    case 'prueba': return tx(PRUEBAS[o], l)
    default: return `${APARICION[o].e} ${tx(APARICION[o].n, l)}`
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'arbol': return s(l, `Según el árbol, ¿cuál es el pariente más cercano ${de(r.x, l)}?`, `According to the tree, which is the closest relative of ${ser(r.x, l)}?`, `Segons l’arbre, quin és el parent més proper ${de(r.x, l)}?`)
    case 'darwin': return `${tx(esc(r).q, l)} ${r.pide === 'darwin' ? s(l, '¿Cómo lo explica Darwin (selección natural)?', 'How does Darwin explain it (natural selection)?', 'Com ho explica Darwin (selecció natural)?') : s(l, '¿Cómo lo explicaría Lamarck?', 'How would Lamarck explain it?', 'Com ho explicaria Lamarck?')}`
    case 'organos': return `${tx(ORGANOS[r.organo].a, l)}: ${s(l, '¿qué tipo de órganos son?', 'what kind of organs are they?', 'quin tipus d’òrgans són?')}`
    case 'prueba': return `«${tx(DATOS_PRUEBA[r.dato].t, l)}» ${s(l, '¿Qué tipo de prueba de la evolución es?', 'What kind of evidence for evolution is this?', 'Quin tipus de prova de l’evolució és?')}`
    default: return s(l, '¿Cuál de estos grupos apareció antes en la Tierra?', 'Which of these groups appeared first on Earth?', 'Quin d’aquests grups va aparèixer abans a la Terra?')
  }
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'arbol': {
      // La nota sobre el parecido, solo donde el parecido engaña.
      const h = hojas(ARBOLES[r.arbol])
      const nota = h.includes('ballena') && [r.x, r.bueno].includes('ballena')
        ? s(l, ' La ballena parece un pez, pero es un mamífero, como nosotros.', ' A whale looks like a fish, but it is a mammal, like us.', ' La balena sembla un peix, però és un mamífer, com nosaltres.')
        : h.includes('cocodrilo') && [r.x, r.bueno].includes('cocodrilo')
          ? s(l, ' El cocodrilo se parece más a un lagarto, pero su pariente vivo más cercano son las aves: ambos vienen de los arcosaurios, como los dinosaurios.', ' The crocodile looks more like a lizard, but its closest living relatives are birds: both come from the archosaurs, like dinosaurs.', ' El cocodril s’assembla més a un llangardaix, però el seu parent viu més proper són els ocells: tots dos vénen dels arcosaures, com els dinosaures.')
          : h.includes('rana') && [r.x, r.bueno].includes('rana')
            ? s(l, ' La rana y nosotros somos tetrápodos (cuatro extremidades): salimos de un mismo antepasado que dejó el agua.', ' Frogs and humans are tetrapods (four limbs): we come from the same ancestor that left the water.', ' La granota i nosaltres som tetràpodes (quatre extremitats): sortim d’un mateix avantpassat que va deixar l’aigua.')
            : ''
      return s(l,
        `En un árbol evolutivo, dos especies son más parientes cuanto más reciente es el antepasado común que comparten (el punto donde se separan sus ramas). ${cap(ser(r.x, l))} y ${ser(r.bueno, l)} salen de la misma bifurcación: comparten el antepasado más reciente. Lo que cuenta es la rama, no el parecido.${nota}`,
        `In an evolutionary tree, two species are more closely related the more recent the common ancestor they share (the point where their branches split). ${cap(ser(r.x, l))} and ${ser(r.bueno, l)} come from the same fork: they share the most recent ancestor. What matters is the branching, not how alike they look.${nota}`,
        `En un arbre evolutiu, dues espècies són més parentes com més recent és l’avantpassat comú que comparteixen (el punt on se separen les branques). ${cap(ser(r.x, l))} i ${ser(r.bueno, l)} surten de la mateixa bifurcació: comparteixen l’avantpassat més recent. El que compta és la branca, no la semblança.${nota}`)
    }
    case 'darwin': return r.pide === 'darwin'
      ? s(l, 'Selección natural (Darwin): dentro de una especie hay variación; los individuos con rasgos más ventajosos sobreviven y se reproducen más, y transmiten esos rasgos. Lamarck pensaba que se heredan los cambios que un ser adquiere en vida por usar un órgano, y eso no ocurre.', 'Natural selection (Darwin): there is variation within a species; individuals with more useful traits survive and reproduce more, and pass those traits on. Lamarck thought that changes an organism acquires in its lifetime by using an organ are inherited, and that does not happen.', 'Selecció natural (Darwin): dins d’una espècie hi ha variació; els individus amb trets més avantatjosos sobreviuen i es reprodueixen més, i transmeten aquests trets. Lamarck pensava que s’hereten els canvis que un ésser adquireix en vida per fer servir un òrgan, i això no passa.')
      : s(l, 'Lamarck defendía la herencia de los caracteres adquiridos: el uso o desuso de un órgano lo cambia durante la vida y ese cambio pasa a los hijos. Hoy sabemos que no: lo que se hereda son los genes, y la explicación correcta es la selección natural de Darwin.', 'Lamarck argued for the inheritance of acquired characteristics: using or not using an organ changes it during life and that change passes to the offspring. We now know it does not: genes are what is inherited, and the right explanation is Darwin’s natural selection.', 'Lamarck defensava l’herència dels caràcters adquirits: l’ús o el desús d’un òrgan el canvia durant la vida i aquest canvi passa als fills. Avui sabem que no: el que s’hereta són els gens, i l’explicació correcta és la selecció natural de Darwin.')
    case 'organos': return {
      homologo: s(l, 'Homólogos: tienen el mismo origen y la misma estructura interna (los mismos huesos), aunque sirvan para cosas distintas. Indican un antepasado común.', 'Homologous: same origin and the same internal structure (the same bones), even if they are used for different things. They point to a common ancestor.', 'Homòlegs: tenen el mateix origen i la mateixa estructura interna (els mateixos ossos), encara que serveixin per a coses diferents. Indiquen un avantpassat comú.'),
      analogo: s(l, 'Análogos: hacen la misma función y se parecen por fuera, pero tienen un origen y una estructura distintos. Aparecen por separado al adaptarse a lo mismo, no por un antepasado común.', 'Analogous: they do the same job and look alike outside, but have a different origin and structure. They arose separately by adapting to the same thing, not from a common ancestor.', 'Anàlegs: fan la mateixa funció i s’assemblen per fora, però tenen un origen i una estructura diferents. Apareixen per separat en adaptar-se a la mateixa cosa, no per un avantpassat comú.'),
      vestigial: s(l, 'Vestigial: un órgano reducido que ya no cumple su función original, resto de un antepasado que sí lo usaba. Es una de las pruebas de la evolución.', 'Vestigial: a reduced organ that no longer does its original job, left over from an ancestor that did use it. It is one of the pieces of evidence for evolution.', 'Vestigial: un òrgan reduït que ja no fa la seva funció original, resta d’un avantpassat que sí que el feia servir. És una de les proves de l’evolució.'),
    }[r.bueno]
    case 'prueba': return {
      fosiles: s(l, 'Los fósiles muestran cómo eran los seres vivos del pasado y en qué orden aparecieron, incluidas formas intermedias entre grupos.', 'Fossils show what living things of the past were like and in what order they appeared, including intermediate forms between groups.', 'Els fòssils mostren com eren els éssers vius del passat i en quin ordre van aparèixer, incloent-hi formes intermèdies entre grups.'),
      anatomia: s(l, 'La anatomía comparada estudia órganos de especies distintas: los homólogos revelan un antepasado común.', 'Comparative anatomy studies organs in different species: homologous ones reveal a common ancestor.', 'L’anatomia comparada estudia òrgans d’espècies diferents: els homòlegs revelen un avantpassat comú.'),
      embriologia: s(l, 'La embriología compara cómo se desarrollan los embriones: los de vertebrados muy distintos se parecen al principio.', 'Embryology compares how embryos develop: those of very different vertebrates look alike at first.', 'L’embriologia compara com es desenvolupen els embrions: els de vertebrats molt diferents s’assemblen al principi.'),
      adn: s(l, 'Comparar el ADN y las proteínas mide el parentesco: cuanto más parecido, más reciente es el antepasado común.', 'Comparing DNA and proteins measures relatedness: the more alike, the more recent the common ancestor.', 'Comparar l’ADN i les proteïnes mesura el parentiu: com més semblant, més recent és l’avantpassat comú.'),
      biogeografia: s(l, 'La biogeografía estudia dónde vive cada especie: en lugares aislados, como islas o continentes separados, evolucionan especies propias.', 'Biogeography studies where each species lives: isolated places, like islands or separate continents, evolve their own species.', 'La biogeografia estudia on viu cada espècie: en llocs aïllats, com illes o continents separats, evolucionen espècies pròpies.'),
    }[r.bueno]
    default: {
      const orden = [...r.grupo].sort((a, b) => APARICION[b].ma - APARICION[a].ma)
      const fmt = g => `${tx(APARICION[g].n, l)} (${APARICION[g].ma >= 1 ? `${APARICION[g].ma.toLocaleString(l === 'en' ? 'en-GB' : 'es-ES')} M` : s(l, '300 000 años', '300,000 years', '300 000 anys')})`
      const nota = r.grupo.includes('mamiferos') && r.grupo.includes('dinosaurios')
        ? s(l, ' Los mamíferos aparecieron casi a la vez que los dinosaurios y convivieron con ellos toda su época.', ' Mammals appeared at almost the same time as dinosaurs and lived alongside them throughout their era.', ' Els mamífers van aparèixer gairebé alhora que els dinosaures i hi van conviure tota la seva època.')
        : ''
      return `${s(l, 'De más antiguo a más reciente', 'From oldest to most recent', 'De més antic a més recent')}: ${orden.map(fmt).join(' → ')}.${nota}`
    }
  }
}

export function schemaQuestion(r, l) {
  return {
    question: enunciado(r, l),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
