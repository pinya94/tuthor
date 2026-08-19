// Cadena Alimentaria — datos puros (sin lógica) de los organismos y los
// niveles tróficos que usa el juego (src/pages/CadenaAlimentaria.jsx) y su
// examen (CadenaAlimentariaExamen.jsx). Distinto de src/data/ecosistemas.js,
// que es el banco de preguntas del examen de TEORÍA del mismo tema — aquí
// solo hay organismos + su rol trófico, la lógica de ronda vive en
// src/lib/cadenaAlimentaria.js.
//
// Los 5 roles y sus ejemplos siguen exactamente la misma jerarquía que ya
// enseña el examen de teoría de Ecosistemas (ver ecosistemas.js, pregunta
// 'ec-03': hierba → conejo → zorro → águila), para que juego y examen de
// teoría no se contradigan sobre qué rol tiene cada especie.
export const ROLES = {
  productor: {
    emoji: '🌱',
    label: { es: 'Productor', en: 'Producer', ca: 'Productor' },
    explicacion: {
      es: 'Fabrica su propio alimento con la luz del sol (fotosíntesis). Es la base de la cadena.',
      en: 'Makes its own food from sunlight (photosynthesis). It is the base of the chain.',
      ca: 'Fabrica el seu propi aliment amb la llum del sol (fotosíntesi). És la base de la cadena.',
    },
  },
  'consumidor-primario': {
    emoji: '🐰',
    label: { es: 'Consumidor primario', en: 'Primary consumer', ca: 'Consumidor primari' },
    explicacion: {
      es: 'Se alimenta directamente de los productores: es herbívoro.',
      en: 'Feeds directly on producers: it is a herbivore.',
      ca: 'S\'alimenta directament dels productors: és herbívor.',
    },
  },
  'consumidor-secundario': {
    emoji: '🦊',
    label: { es: 'Consumidor secundario', en: 'Secondary consumer', ca: 'Consumidor secundari' },
    explicacion: {
      es: 'Caza y se come a los consumidores primarios.',
      en: 'Hunts and eats primary consumers.',
      ca: 'Caça i es menja els consumidors primaris.',
    },
  },
  'consumidor-terciario': {
    emoji: '🦅',
    label: { es: 'Consumidor terciario', en: 'Tertiary consumer', ca: 'Consumidor terciari' },
    explicacion: {
      es: 'Está en la cima de la cadena: caza a otros consumidores. Hay pocos, porque en cada eslabón se pierde energía.',
      en: 'At the top of the chain: it hunts other consumers. There are few of them, because energy is lost at every link.',
      ca: 'Està al cim de la cadena: caça altres consumidors. N\'hi ha pocs, perquè en cada baula es perd energia.',
    },
  },
  descomponedor: {
    emoji: '🍄',
    label: { es: 'Descomponedor', en: 'Decomposer', ca: 'Descomponedor' },
    explicacion: {
      es: 'Descompone la materia orgánica muerta y devuelve nutrientes al suelo.',
      en: 'Breaks down dead organic matter and returns nutrients to the soil.',
      ca: 'Descompon la matèria orgànica morta i retorna nutrients al sòl.',
    },
  },
}

// Orden fijo en el que se muestran los botones de rol (independiente del
// orden de aparición de cada organismo).
export const ROLE_ORDER = ['productor', 'consumidor-primario', 'consumidor-secundario', 'consumidor-terciario', 'descomponedor']

function o(id, nombre, nombreEn, nombreCa, emoji, rol, dificultad, dato, datoEn, datoCa) {
  return { id, nombre, nombreEn, nombreCa, emoji, rol, dificultad, dato, datoEn, datoCa }
}

// dificultad: 'facil' | 'medio' | 'dificil' — acumulativo, igual que en
// encuentraElemento.js (el pool de "medio" incluye los "facil"). El rol
// consumidor-terciario no aparece hasta "medio" a propósito: en Primaria/
// facil solo se juega con los 4 roles más simples.
export const ORGANISMOS = [
  // ── PRODUCTORES ──────────────────────────────────────────────────────────
  o('hierba', 'Hierba', 'Grass', 'Herba', '🌾', 'productor', 'facil',
    'Crece en prados y praderas. Como toda planta, hace su propio alimento con la luz del sol: es la base de casi todas las cadenas alimentarias terrestres.',
    'It grows in meadows and grasslands. Like every plant, it makes its own food from sunlight: it is the base of almost every land food chain.',
    'Creix en prats i praderes. Com tota planta, fa el seu propi aliment amb la llum del sol: és la base de gairebé totes les cadenes alimentàries terrestres.'),
  o('roble', 'Roble', 'Oak tree', 'Roure', '🌳', 'productor', 'facil',
    'Un árbol que puede vivir cientos de años. Fabrica su alimento mediante la fotosíntesis, igual que cualquier planta.',
    'A tree that can live for hundreds of years. It makes its own food through photosynthesis, like any plant.',
    'Un arbre que pot viure centenars d\'anys. Fabrica el seu aliment mitjançant la fotosíntesi, igual que qualsevol planta.'),
  o('trigo', 'Trigo', 'Wheat', 'Blat', '🌿', 'productor', 'medio',
    'Uno de los cultivos más importantes del mundo. Convierte luz solar, agua y CO₂ en alimento.',
    'One of the world\'s most important crops. It turns sunlight, water and CO₂ into food.',
    'Un dels cultius més importants del món. Converteix llum solar, aigua i CO₂ en aliment.'),
  o('alga', 'Alga', 'Algae', 'Alga', '🍃', 'productor', 'medio',
    'Vive en el agua, pero como las plantas terrestres, también hace la fotosíntesis. Produce buena parte del oxígeno del planeta.',
    'It lives in water, but like land plants, it also photosynthesises. It produces a large share of the planet\'s oxygen.',
    'Viu a l\'aigua, però com les plantes terrestres, també fa la fotosíntesi. Produeix bona part de l\'oxigen del planeta.'),
  o('cactus', 'Cactus', 'Cactus', 'Cactus', '🌵', 'productor', 'dificil',
    'Vive en el desierto, con muy poca agua, pero sigue haciendo fotosíntesis como cualquier otra planta.',
    'It lives in the desert with very little water, but it still photosynthesises like any other plant.',
    'Viu al desert, amb molt poca aigua, però continua fent fotosíntesi com qualsevol altra planta.'),
  o('fitoplancton', 'Fitoplancton', 'Phytoplankton', 'Fitoplàncton', '🌊', 'productor', 'dificil',
    'Diminutos organismos que flotan cerca de la superficie del mar y hacen fotosíntesis: son la base de casi toda cadena alimentaria marina.',
    'Tiny organisms that float near the sea surface and photosynthesise: they are the base of almost every marine food chain.',
    'Organismes diminuts que floten prop de la superfície del mar i fan fotosíntesi: són la base de gairebé tota cadena alimentària marina.'),

  // ── CONSUMIDORES PRIMARIOS ───────────────────────────────────────────────
  o('conejo', 'Conejo', 'Rabbit', 'Conill', '🐇', 'consumidor-primario', 'facil',
    'Come hierba y otras plantas: se alimenta directamente de los productores.',
    'It eats grass and other plants: it feeds directly on producers.',
    'Menja herba i altres plantes: s\'alimenta directament dels productors.'),
  o('vaca', 'Vaca', 'Cow', 'Vaca', '🐄', 'consumidor-primario', 'facil',
    'Se alimenta solo de hierba y otras plantas: es herbívora.',
    'It only eats grass and other plants: it is a herbivore.',
    'S\'alimenta només d\'herba i altres plantes: és herbívora.'),
  o('oveja', 'Oveja', 'Sheep', 'Ovella', '🐑', 'consumidor-primario', 'medio',
    'Pasta hierba todo el día: un herbívoro típico.',
    'It grazes on grass all day: a typical herbivore.',
    'Pastura herba tot el dia: un herbívor típic.'),
  o('ciervo', 'Ciervo', 'Deer', 'Cérvol', '🦌', 'consumidor-primario', 'medio',
    'Se alimenta de hojas, hierba y brotes: no caza a otros animales.',
    'It feeds on leaves, grass and shoots: it does not hunt other animals.',
    'S\'alimenta de fulles, herba i brots: no caça altres animals.'),
  o('saltamontes', 'Saltamontes', 'Grasshopper', 'Saltamartí', '🦗', 'consumidor-primario', 'dificil',
    'Aunque es un insecto, también es herbívoro: se come las hojas de las plantas.',
    'Even though it is an insect, it is also a herbivore: it eats plant leaves.',
    'Encara que és un insecte, també és herbívor: es menja les fulles de les plantes.'),
  o('pez-pequeno', 'Pez pequeño', 'Small fish', 'Peix petit', '🐟', 'consumidor-primario', 'dificil',
    'Se alimenta de fitoplancton: es el primer eslabón animal de muchas cadenas marinas.',
    'It feeds on phytoplankton: it is the first animal link in many marine chains.',
    'S\'alimenta de fitoplàncton: és el primer baula animal de moltes cadenes marines.'),

  // ── CONSUMIDORES SECUNDARIOS ─────────────────────────────────────────────
  o('zorro', 'Zorro', 'Fox', 'Guineu', '🦊', 'consumidor-secundario', 'facil',
    'Caza conejos y otros animales pequeños que a su vez comen plantas.',
    'It hunts rabbits and other small animals that in turn eat plants.',
    'Caça conills i altres animals petits que al seu torn mengen plantes.'),
  o('leon', 'León', 'Lion', 'Lleó', '🦁', 'consumidor-secundario', 'facil',
    'Caza herbívoros como cebras o antílopes: es un carnívoro.',
    'It hunts herbivores like zebras or antelopes: it is a carnivore.',
    'Caça herbívors com zebres o antílops: és un carnívor.'),
  o('lobo', 'Lobo', 'Wolf', 'Llop', '🐺', 'consumidor-secundario', 'medio',
    'Caza en manada a herbívoros como los ciervos.',
    'It hunts herbivores like deer in packs.',
    'Caça en manada herbívors com els cérvols.'),
  o('rana', 'Rana', 'Frog', 'Granota', '🐸', 'consumidor-secundario', 'dificil',
    'Caza insectos herbívoros con la lengua: también es un consumidor que come animales.',
    'It hunts herbivorous insects with its tongue: it is also a consumer that eats animals.',
    'Caça insectes herbívors amb la llengua: també és un consumidor que menja animals.'),
  o('arana', 'Araña', 'Spider', 'Aranya', '🕷️', 'consumidor-secundario', 'dificil',
    'Teje una tela para atrapar insectos herbívoros y comérselos.',
    'It weaves a web to trap herbivorous insects and eat them.',
    'Teixeix una teranyina per atrapar insectes herbívors i menjar-se\'ls.'),
  o('foca', 'Foca', 'Seal', 'Foca', '🦭', 'consumidor-secundario', 'dificil',
    'Caza peces que se alimentan de fitoplancton.',
    'It hunts fish that feed on phytoplankton.',
    'Caça peixos que s\'alimenten de fitoplàncton.'),

  // ── CONSUMIDORES TERCIARIOS ──────────────────────────────────────────────
  o('aguila', 'Águila', 'Eagle', 'Àliga', '🦅', 'consumidor-terciario', 'medio',
    'En la cadena hierba → conejo → zorro → águila, caza al zorro: está en la cima, por eso es un consumidor terciario.',
    'In the chain grass → rabbit → fox → eagle, it hunts the fox: it is at the top, which is why it is a tertiary consumer.',
    'En la cadena herba → conill → guineu → àliga, caça la guineu: és al cim, per això és un consumidor terciari.'),
  o('orca', 'Orca', 'Orca', 'Orca', '🐋', 'consumidor-terciario', 'medio',
    'En la cadena marina fitoplancton → pez → foca → orca, caza a la foca: no tiene depredadores naturales.',
    'In the marine chain phytoplankton → fish → seal → orca, it hunts the seal: it has no natural predators.',
    'En la cadena marina fitoplàncton → peix → foca → orca, caça la foca: no té depredadors naturals.'),
  o('tiburon', 'Tiburón', 'Shark', 'Tauró', '🦈', 'consumidor-terciario', 'dificil',
    'Caza a otros depredadores marinos, como focas: está en la cima de su cadena alimentaria.',
    'It hunts other marine predators, like seals: it is at the top of its food chain.',
    'Caça altres depredadors marins, com foques: és al cim de la seva cadena alimentària.'),

  // ── DESCOMPONEDORES ──────────────────────────────────────────────────────
  o('seta', 'Seta', 'Mushroom', 'Bolet', '🍄', 'descomponedor', 'facil',
    'Se alimenta de madera y hojas muertas, descomponiéndolas y devolviendo nutrientes al suelo.',
    'It feeds on dead wood and leaves, breaking them down and returning nutrients to the soil.',
    'S\'alimenta de fusta i fulles mortes, descomponent-les i retornant nutrients al sòl.'),
  o('lombriz', 'Lombriz de tierra', 'Earthworm', 'Cuc de terra', '🟤', 'descomponedor', 'facil',
    'Descompone materia orgánica muerta en el suelo y lo hace más fértil para las plantas.',
    'It breaks down dead organic matter in the soil, making it more fertile for plants.',
    'Descompon matèria orgànica morta al sòl i el fa més fèrtil per a les plantes.'),
  o('moho', 'Moho', 'Mould', 'Floridura', '🦠', 'descomponedor', 'medio',
    'Crece sobre restos de comida o materia orgánica muerta y la descompone.',
    'It grows on food scraps or dead organic matter and breaks it down.',
    'Creix sobre restes de menjar o matèria orgànica morta i la descompon.'),
  o('bacteria', 'Bacteria', 'Bacteria', 'Bacteri', '🧫', 'descomponedor', 'dificil',
    'Microorganismos invisibles a simple vista que descomponen materia orgánica muerta a nivel microscópico.',
    'Microorganisms invisible to the naked eye that break down dead organic matter at a microscopic level.',
    'Microorganismes invisibles a simple vista que descomponen matèria orgànica morta a nivell microscòpic.'),
]

// Cadenas reales (secuencias completas "quién se come a quién", del
// productor a la cima) que usa el JUEGO — a diferencia del examen, que
// clasifica organismos sueltos, el juego reconstruye la cadena entera. Cada
// eslabón es un id real de ORGANISMOS y cada relación depredador→presa es
// consistente con el `dato` que ya tiene ese organismo más arriba (p. ej.
// 'lobo' ya dice que caza ciervos, así que la cadena bosque = roble→ciervo→lobo).
// dificultad 'facil' = 3 eslabones (sin consumidor terciario); 'medio' añade
// las dos cadenas de 4 eslabones. No hay pool 'dificil' propio: en su lugar,
// el juego reutiliza el pool de 'medio' pero pide construir la cadena AL
// REVÉS (de la cima al productor) — mismo contenido, reto distinto.
export const CADENAS = [
  { id: 'bosque', nombre: 'Bosque', nombreEn: 'Forest', nombreCa: 'Bosc', emoji: '🌳', dificultad: 'facil',
    eslabones: ['roble', 'ciervo', 'lobo'] },
  { id: 'prado-insectos', nombre: 'Prado', nombreEn: 'Meadow', nombreCa: 'Prat', emoji: '🦗', dificultad: 'facil',
    eslabones: ['hierba', 'saltamontes', 'rana'] },
  { id: 'sabana', nombre: 'Sabana', nombreEn: 'Savannah', nombreCa: 'Sabana', emoji: '🦁', dificultad: 'facil',
    eslabones: ['hierba', 'conejo', 'leon'] },
  { id: 'pradera', nombre: 'Pradera', nombreEn: 'Grassland', nombreCa: 'Prada', emoji: '🦅', dificultad: 'medio',
    eslabones: ['hierba', 'conejo', 'zorro', 'aguila'] },
  { id: 'oceano', nombre: 'Océano', nombreEn: 'Ocean', nombreCa: 'Oceà', emoji: '🐋', dificultad: 'medio',
    eslabones: ['fitoplancton', 'pez-pequeno', 'foca', 'orca'] },
]
