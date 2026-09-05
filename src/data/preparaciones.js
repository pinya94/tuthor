// Preparaciones reales del microscopio: una FOTO con zonas señaladas.
//
// Por qué esto no reabre el infierno de calibración de Rayos X (ver
// rayos-x): allí había que ACERTAR el clic sobre una foto, así que cada
// órgano necesitaba su radio de tolerancia ajustado a ojo. Aquí la zona
// viene ya marcada con un círculo y lo que se pide es IDENTIFICARLA entre
// varias opciones. El círculo es un señalador, no una diana: que esté un 5%
// desplazado no rompe nada, mientras rodee lo que tiene que rodear.
//
// Las fotos NO se modifican nunca: la marca se dibuja encima en SVG en
// tiempo de ejecución. Además de ser más simple, evita crear una obra
// derivada de la imagen original (ver public/microscopio/PROCEDENCIA.md).
//
// `marca` va en porcentaje del ancho/alto de la foto (0-100), no en píxeles,
// para que no dependa del tamaño al que se sirva la imagen.

export const GRUPOS = {
  bichos:    { emoji: '🐛', label: { es: 'Bichos', en: 'Critters', ca: 'Bestioles' } },
  cuerpo:    { emoji: '👤', label: { es: 'Cuerpo', en: 'Body', ca: 'Cos' } },
  vegetal:   { emoji: '🌿', label: { es: 'Plantas', en: 'Plants', ca: 'Plantes' } },
  cristales: { emoji: '💎', label: { es: 'Cristales', en: 'Crystals', ca: 'Cristalls' } },
}

export const PREPARACIONES = [
  {
    id: 'piojo',
    grupo: 'bichos',
    foto: '/microscopio/piojo.jpg',
    titulo: { es: 'Piojo humano', en: 'Human louse', ca: 'Poll humà' },
    credito: 'CDC / Janice Harney Carr · dominio público',
    zonas: [
      {
        id: 'pata',
        marca: { cx: 20, cy: 34, r: 11 },
        nombre: { es: 'Pata del piojo', en: 'Louse leg', ca: 'Pota del poll' },
        dato: {
          es: 'Cada pata acaba en una garra curva del grosor justo de un pelo. Por eso no se cae aunque te muevas.',
          en: 'Each leg ends in a curved claw exactly as wide as a hair. That is why it does not fall off when you move.',
          ca: 'Cada pota acaba en una urpa corba del gruix just d\'un cabell. Per això no cau encara que et moguis.',
        },
      },
      {
        id: 'abdomen',
        marca: { cx: 50, cy: 72, r: 15 },
        nombre: { es: 'Abdomen del piojo', en: 'Louse abdomen', ca: 'Abdomen del poll' },
        dato: {
          es: 'Se ve rojo porque está lleno de sangre recién chupada: es lo único de lo que se alimenta.',
          en: 'It looks red because it is full of freshly sucked blood: that is all it feeds on.',
          ca: 'Es veu vermell perquè és ple de sang acabada de xuclar: és l\'únic de què s\'alimenta.',
        },
      },
      {
        id: 'cabeza',
        marca: { cx: 50, cy: 19, r: 8 },
        nombre: { es: 'Cabeza del piojo', en: 'Louse head', ca: 'Cap del poll' },
        dato: {
          es: 'Más estrecha que el tórax y con el aparato picador escondido dentro hasta que pica.',
          en: 'Narrower than the thorax, with the piercing mouthparts tucked inside until it bites.',
          ca: 'Més estreta que el tòrax i amb l\'aparell picador amagat dins fins que pica.',
        },
      },
    ],
  },

  {
    id: 'pulga',
    grupo: 'bichos',
    foto: '/microscopio/pulga.jpg',
    titulo: { es: 'Pulga', en: 'Flea', ca: 'Puça' },
    credito: 'CDC / Janice Haney Carr · dominio público',
    zonas: [
      {
        id: 'pata-salto',
        marca: { cx: 30, cy: 72, r: 16 },
        nombre: { es: 'Pata de la pulga', en: 'Flea leg', ca: 'Pota de la puça' },
        dato: {
          es: 'La pata trasera es enorme comparada con el cuerpo: le deja saltar más de cien veces su tamaño.',
          en: 'The hind leg is huge next to the body: it lets the flea jump over a hundred times its own size.',
          ca: 'La pota del darrere és enorme comparada amb el cos: la deixa saltar més de cent vegades la seva mida.',
        },
      },
      {
        id: 'cuerpo-aplanado',
        marca: { cx: 55, cy: 27, r: 15 },
        nombre: { es: 'Cuerpo de la pulga', en: 'Flea body', ca: 'Cos de la puça' },
        dato: {
          es: 'Está aplastado de lado, no de arriba abajo: así se cuela entre los pelos como una carta entre páginas.',
          en: 'It is flattened side to side, not top to bottom: it slips between hairs like a card between pages.',
          ca: 'És aplatat de costat, no de dalt a baix: així s\'esmuny entre els pèls com una carta entre pàgines.',
        },
      },
      {
        id: 'espinas',
        marca: { cx: 34, cy: 18, r: 10 },
        nombre: { es: 'Espinas de la pulga', en: 'Flea spines', ca: 'Espines de la puça' },
        dato: {
          es: 'Todas apuntan hacia atrás. Dejan avanzar entre el pelo pero hacen dificilísimo sacarla tirando.',
          en: 'They all point backwards. They let it move forward through hair but make pulling it out very hard.',
          ca: 'Totes apunten cap enrere. Deixen avançar entre el pèl però fan dificilíssim treure-la estirant.',
        },
      },
    ],
  },

  {
    id: 'hoja',
    grupo: 'vegetal',
    foto: '/microscopio/hoja.jpg',
    titulo: { es: 'Epidermis de una hoja', en: 'Leaf epidermis', ca: 'Epidermis d\'una fulla' },
    credito: 'Louisa Howard, Dartmouth · dominio público',
    zonas: [
      {
        id: 'estoma',
        marca: { cx: 43, cy: 40, r: 7 },
        nombre: { es: 'Estoma de la hoja', en: 'Leaf stoma', ca: 'Estoma de la fulla' },
        dato: {
          es: 'Es la boca por la que la hoja respira: dos células la abren y la cierran para dejar entrar CO₂ sin perder agua.',
          en: 'The mouth the leaf breathes through: two cells open and close it to let CO₂ in without losing water.',
          ca: 'És la boca per la qual la fulla respira: dues cèl·lules l\'obren i la tanquen per deixar entrar CO₂ sense perdre aigua.',
        },
      },
      {
        id: 'tricoma',
        marca: { cx: 52, cy: 46, r: 13 },
        nombre: { es: 'Pelo de la hoja', en: 'Leaf hair', ca: 'Pèl de la fulla' },
        dato: {
          es: 'Los pelos de la hoja. En la ortiga son agujas huecas que se rompen al tocarlas y sueltan el líquido que escuece.',
          en: 'The leaf hairs. In a nettle they are hollow needles that snap when touched and release the stinging fluid.',
          ca: 'Els pèls de la fulla. A l\'ortiga són agulles buides que es trenquen en tocar-les i deixen anar el líquid que cou.',
        },
      },
    ],
  },

  {
    id: 'sangre',
    grupo: 'cuerpo',
    foto: '/microscopio/sangre.jpg',
    titulo: { es: 'Gota de sangre', en: 'Drop of blood', ca: 'Gota de sang' },
    credito: 'MichaelZahniser · dominio público',
    zonas: [
      {
        id: 'globulo-rojo',
        marca: { cx: 28, cy: 52, r: 6 },
        nombre: { es: 'Glóbulo rojo', en: 'Red blood cell', ca: 'Glòbul vermell' },
        dato: {
          es: 'Se ve más claro en el centro porque tiene forma de donut sin agujero: hundido por las dos caras para llevar más oxígeno.',
          en: 'It looks paler in the middle because it is shaped like a doughnut with no hole: dented on both sides to carry more oxygen.',
          ca: 'Es veu més clar al centre perquè té forma de dònut sense forat: enfonsat per les dues cares per portar més oxigen.',
        },
      },
      {
        id: 'parasito',
        marca: { cx: 34, cy: 41, r: 6 },
        nombre: { es: 'Parásito en la sangre', en: 'Parasite in the blood', ca: 'Paràsit a la sang' },
        dato: {
          es: 'Los puntos morados son parásitos metidos DENTRO de los glóbulos rojos. Así se ve la malaria al microscopio.',
          en: 'The purple dots are parasites living INSIDE the red blood cells. This is what malaria looks like under the microscope.',
          ca: 'Els punts morats són paràsits ficats DINS dels glòbuls vermells. Així es veu la malària al microscopi.',
        },
      },
    ],
  },

  {
    id: 'sal',
    grupo: 'cristales',
    foto: '/microscopio/sal.jpg',
    titulo: { es: 'Cristales de sal', en: 'Salt crystals', ca: 'Cristalls de sal' },
    credito: 'McSquare1337 · CC0',
    zonas: [
      {
        id: 'cubo',
        marca: { cx: 46, cy: 55, r: 9 },
        nombre: { es: 'Cristal de sal', en: 'Salt crystal', ca: 'Cristall de sal' },
        dato: {
          es: 'La sal siempre forma cubos, no por casualidad: sus átomos de sodio y cloro se colocan en una rejilla cúbica.',
          en: 'Salt always forms cubes, and not by chance: its sodium and chlorine atoms sit in a cubic grid.',
          ca: 'La sal sempre forma cubs, i no per casualitat: els seus àtoms de sodi i clor es col·loquen en una reixa cúbica.',
        },
      },
      {
        id: 'campo',
        marca: { cx: 50, cy: 50, r: 40 },
        nombre: { es: 'Campo del microscopio', en: 'Microscope field', ca: 'Camp del microscopi' },
        dato: {
          es: 'El círculo iluminado es todo lo que se ve por el ocular. Fuera de él no hay nada que mirar: es el borde de la lente.',
          en: 'The lit circle is everything you can see through the eyepiece. Outside it there is nothing to look at: that is the edge of the lens.',
          ca: 'El cercle il·luminat és tot el que es veu per l\'ocular. Fora no hi ha res a mirar: és la vora de la lent.',
        },
      },
    ],
  },
]
