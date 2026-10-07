// Versos para Mide el verso. Solo autores de dominio público en España
// (muertos antes de 1946: vida + 80 años; ver memoria «examenes-oct-2026»).
//
// Cada fragmento lleva el metro CONOCIDO de sus versos (`metro`: un número o
// uno por verso) y, si los cuatro forman una estrofa de libro, `estrofa`. El
// test comprueba que lib/metrica.js mide cada verso exactamente así y que
// reconoce la estrofa: si un verso necesita una licencia que la regla
// general no prevé (una dialefa, por ejemplo), el test falla y el verso no
// entra. La cesura de los alejandrinos va marcada con «|».
//
// Los versos son el MATERIAL del ejercicio y no se traducen (ver memoria
// «espanol-material»): se mide la métrica española.
export const FRAGMENTOS = [
  {
    id: 'pirata', autor: 'José de Espronceda', obra: 'Canción del pirata', metro: 8,
    versos: ['Con diez cañones por banda,', 'viento en popa, a toda vela,', 'no corta el mar, sino vuela', 'un velero bergantín;'],
  },
  {
    id: 'tenorio', autor: 'José Zorrilla', obra: 'Don Juan Tenorio', metro: 8, estrofa: 'redondilla',
    versos: ['¡Cuán gritan esos malditos!', 'Pero ¡mal rayo me parta', 'si en concluyendo la carta', 'no pagan caros sus gritos!'],
  },
  {
    id: 'sor-juana', autor: 'Sor Juana Inés de la Cruz', obra: 'Hombres necios que acusáis', metro: 8, estrofa: 'redondilla',
    versos: ['Hombres necios que acusáis', 'a la mujer sin razón,', 'sin ver que sois la ocasión', 'de lo mismo que culpáis:'],
  },
  {
    id: 'machado-caminos', autor: 'Antonio Machado', obra: 'Soledades', metro: 8, estrofa: 'cuarteta',
    versos: ['Yo voy soñando caminos', 'de la tarde. ¡Las colinas', 'doradas, los verdes pinos,', 'las polvorientas encinas!'],
  },
  {
    id: 'machado-primavera', autor: 'Antonio Machado', obra: 'Soledades', metro: 8, estrofa: 'cuarteta',
    versos: ['La primavera besaba', 'suavemente la arboleda,', 'y el verde nuevo brotaba', 'como una verde humareda.'],
  },
  {
    id: 'machado-caminante', autor: 'Antonio Machado', obra: 'Proverbios y cantares', metro: 8, estrofa: 'romance',
    versos: ['Caminante, son tus huellas', 'el camino y nada más;', 'caminante, no hay camino,', 'se hace camino al andar.'],
  },
  {
    id: 'machado-andado', autor: 'Antonio Machado', obra: 'Proverbios y cantares', metro: 8, estrofa: 'romance',
    versos: ['He andado muchos caminos,', 'he abierto muchas veredas;', 'he navegado en cien mares,', 'y atracado en cien riberas.'],
  },
  {
    id: 'lorca-sonambulo', autor: 'Federico García Lorca', obra: 'Romance sonámbulo', metro: 8, estrofa: 'romance',
    versos: ['Verde que te quiero verde.', 'Verde viento. Verdes ramas.', 'El barco sobre la mar', 'y el caballo en la montaña.'],
  },
  {
    id: 'lorca-luna', autor: 'Federico García Lorca', obra: 'Romance de la luna, luna', metro: 8, estrofa: 'romance',
    versos: ['La luna vino a la fragua', 'con su polisón de nardos.', 'El niño la mira, mira.', 'El niño la está mirando.'],
  },
  {
    id: 'gongora', autor: 'Luis de Góngora', obra: 'Mientras por competir con tu cabello', metro: 11, estrofa: 'cuarteto',
    versos: ['Mientras por competir con tu cabello,', 'oro bruñido al sol relumbra en vano;', 'mientras con menosprecio en medio el llano', 'mira tu blanca frente el lilio bello;'],
  },
  {
    id: 'quevedo', autor: 'Francisco de Quevedo', obra: 'Amor constante más allá de la muerte', metro: 11, estrofa: 'cuarteto',
    versos: ['Cerrar podrá mis ojos la postrera', 'sombra que me llevare el blanco día,', 'y podrá desatar esta alma mía', 'hora a su afán ansioso lisonjera;'],
  },
  {
    id: 'lope', autor: 'Lope de Vega', obra: 'Soneto de repente', metro: 11, estrofa: 'cuarteto',
    versos: ['Un soneto me manda hacer Violante,', 'que en mi vida me he visto en tanto aprieto;', 'catorce versos dicen que es soneto;', 'burla burlando van los tres delante.'],
  },
  {
    id: 'garcilaso-egloga', autor: 'Garcilaso de la Vega', obra: 'Égloga I', metro: 11,
    versos: ['Corrientes aguas, puras, cristalinas,', 'árboles que os estáis mirando en ellas,', 'verde prado de fresca sombra lleno,', 'aves que aquí sembráis vuestras querellas,'],
  },
  {
    id: 'becquer-golondrinas', autor: 'Gustavo Adolfo Bécquer', obra: 'Rima LIII', metro: [11, 11, 11, 7],
    versos: ['Volverán las oscuras golondrinas', 'en tu balcón sus nidos a colgar,', 'y otra vez con el ala a sus cristales', 'jugando llamarán.'],
  },
  {
    id: 'becquer-poesia', autor: 'Gustavo Adolfo Bécquer', obra: 'Rima XXI', metro: [11, 11, 11, 7],
    versos: ['¿Qué es poesía?, dices mientras clavas', 'en mi pupila tu pupila azul.', '¿Qué es poesía? ¿Y tú me lo preguntas?', 'Poesía... eres tú.'],
  },
  {
    id: 'dario-otono', autor: 'Rubén Darío', obra: 'Canción de otoño en primavera', metro: 9,
    versos: ['Juventud, divino tesoro,', '¡ya te vas para no volver!', 'Cuando quiero llorar, no lloro...', 'y a veces lloro sin querer...'],
  },
  {
    id: 'dario-sonatina', autor: 'Rubén Darío', obra: 'Sonatina', metro: 14,
    versos: ['La princesa está triste... | ¿qué tendrá la princesa?', 'Los suspiros se escapan | de su boca de fresa,', 'que ha perdido la risa, | que ha perdido el color.'],
  },
  {
    id: 'san-juan', autor: 'San Juan de la Cruz', obra: 'Noche oscura del alma', metro: [7, 11, 7, 7],
    versos: ['En una noche oscura,', 'con ansias, en amores inflamada,', '¡oh dichosa ventura!,', 'salí sin ser notada,'],
  },
]
