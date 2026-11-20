// Escape room «El Códice Robado» (Historia de España · ESO). Todo el guion y
// los datos de las salas; la mecánica está en components/escape/.
//
// Reglas de contenido (las de siempre en Tuthor): solo datos indiscutibles,
// nada que un libro de texto aceptaría como bueno puede contar como fallo.
// Las trampas son de verdad trampas (la imprenta SÍ existía en 1492; «alma»
// empieza por al- y es latina).
//
// Sospechosos: cada sala da una pista que descarta exactamente a UNO (cada
// sospechoso falla un único rasgo y el culpable los cumple todos), así que las
// salas se pueden jugar en cualquier orden. El test lo comprueba.

export const GUIA = 'Fray Anselmo'
export const MINUTOS = 45
export const PENALIZACION = 30 // segundos por comprobar mal
export const PENALIZACION_ACUSAR = 120

// Expresiones del guía: public/escape/monje-<cara>.webp
export const CARAS = ['habla', 'feliz', 'preocupado', 'senala']

const HABITO_NEGRO = '#1F2937', HABITO_MARRON = '#8A5A2B'

// rasgos → los dibuja quienEsQuien/Retrato. `tit`: Fray / Hermano.
export const SOSPECHOSOS = [
  { id: 'damian', tit: 'Hermano', nombre: 'Damián', oficio: 'El hortelano. Siempre huele a cebolla.',
    rasgos: { piel: 1, pelo: 'tonsura', cpelo: 'castano', gafas: 'redondas', ropa: 'habito', cropa: HABITO_MARRON },
    hechos: { habito: 'marron', gafas: true, barba: false, canas: false, hermano: true } },
  { id: 'lucas', tit: 'Hermano', nombre: 'Lucas', oficio: 'El novicio más joven. Llega tarde a todo.',
    rasgos: { piel: 2, pelo: 'flequillo', cpelo: 'negro', ropa: 'habito', cropa: HABITO_NEGRO },
    hechos: { habito: 'negro', gafas: false, barba: false, canas: false, hermano: true } },
  { id: 'bruno', tit: 'Hermano', nombre: 'Bruno', oficio: 'El campanero. Ronca en el coro.',
    rasgos: { piel: 0, pelo: 'tonsura', cpelo: 'castano', barba: 'larga', gafas: 'redondas', ropa: 'habito', cropa: HABITO_NEGRO },
    hechos: { habito: 'negro', gafas: true, barba: true, canas: false, hermano: true } },
  { id: 'gil', tit: 'Hermano', nombre: 'Gil', oficio: 'El portero. Lleva cuarenta años abriendo la puerta.',
    rasgos: { piel: 0, pelo: 'tonsura', cpelo: 'canoso', gafas: 'redondas', ropa: 'habito', cropa: HABITO_NEGRO },
    hechos: { habito: 'negro', gafas: true, barba: false, canas: true, hermano: true } },
  { id: 'tomas', tit: 'Fray', nombre: 'Tomás', oficio: 'El bibliotecario. No deja tocar ni un libro.',
    rasgos: { piel: 1, pelo: 'raya', cpelo: 'negro', gafas: 'redondas', ropa: 'habito', cropa: HABITO_NEGRO },
    hechos: { habito: 'negro', gafas: true, barba: false, canas: false, hermano: false } },
  { id: 'inigo', tit: 'Hermano', nombre: 'Íñigo', oficio: 'El ayudante del archivo. Muy aplicado… demasiado.',
    rasgos: { piel: 0, pelo: 'alborotado', cpelo: 'castano', gafas: 'redondas', ropa: 'habito', cropa: HABITO_NEGRO },
    hechos: { habito: 'negro', gafas: true, barba: false, canas: false, hermano: true } },
]
export const CULPABLE = 'inigo'

// Lo que dice cada pista sobre el ladrón (lo comprueba el test)
export const PISTAS_LADRON = {
  cripta: { texto: 'Lleva hábito negro: había un hilo negro enganchado en la roca.', cumple: h => h.habito === 'negro' },
  mapas: { texto: 'Lleva gafas: junto al mapa había un cristal de gafas roto.', cumple: h => h.gafas },
  palabras: { texto: 'No tiene barba: el cocinero lo vio de lejos y dice que iba bien afeitado.', cumple: h => !h.barba },
  scriptorium: { texto: 'No tiene canas: en el lacre de la carta quedó pegado un pelo oscuro.', cumple: h => !h.canas },
  galeria: { texto: 'Es «hermano», no «fray»: firmó la nota del cuadro como «Hermano…».', cumple: h => h.hermano },
  torre: { texto: 'Desde la torre se le ve correr hacia el establo con un fardo. ¡Es ahora o nunca!', cumple: () => true },
}

// Diálogos: [cara, texto]
export const INTRO = [
  ['habla', '¡Pax vobiscum! ¿Me oís? ¿Esto funciona?'],
  ['preocupado', `Soy ${GUIA}, el archivero del monasterio. Y tengo un problema enorme.`],
  ['senala', 'Esta noche alguien ha robado las seis páginas de la Gran Crónica de Hispania.'],
  ['preocupado', 'Y sin ellas pasa algo terrible: la historia de España se está borrando. Mirad la línea del tiempo de arriba: ¡se ha quedado en gris!'],
  ['habla', 'El ladrón ha escondido cada página en una sala del monasterio, y en cada sala ha dejado una prueba que solo resuelve quien sabe historia.'],
  ['senala', 'Cada página que recuperéis trae una cifra del cofre donde ha guardado el Códice… y una pista sobre quién es.'],
  ['habla', 'Los sospechosos son seis hermanos del monasterio. Están en el Cuaderno, arriba a la derecha: id tachando a los que queden descartados.'],
  ['preocupado', `Tenéis ${MINUTOS} minutos antes de que toquen a vísperas y el ladrón saque el Códice del monasterio. Si os atascáis, pedid una pista: cada sala tiene tres.`],
  ['feliz', 'Que alguien maneje el ordenador y que el resto piense en voz alta. Aquí tenéis el plano del monasterio: ¡empezad por la sala que queráis!'],
]

export const SALAS = [
  {
    id: 'cripta', epoca: 'Prehistoria', nombre: 'La cripta', emoji: '🔦', orden: 1,
    antes: [
      ['habla', 'Bajo el monasterio hay una cueva con pinturas en las paredes. Ahí guardamos la colección de objetos prehistóricos…'],
      ['preocupado', '¡Y el ladrón la ha revuelto entera! Colocad cada objeto en la etapa a la que pertenece. Si todo está en su sitio, la cueva os enseñará la página.'],
    ],
    pistas: [
      'En el Paleolítico se cazaba y se tallaba la piedra golpeándola. En el Neolítico se cultivaba: se pulía la piedra, se molía el grano y se hacía cerámica.',
      'Todo lo que sea de metal (cobre, bronce o hierro) va a la Edad de los Metales. El bisonte es de Altamira, del Paleolítico.',
      'Paleolítico: bifaz, arpón de hueso y bisonte pintado. Neolítico: vasija de cerámica, hacha pulimentada y molino de mano. Metales: espada de bronce, molde de fundición y punta de lanza de hierro.',
    ],
    despues: [
      ['feliz', '¡La pared se ha abierto! Y detrás estaba la primera página.'],
      ['senala', 'Mirad: un hilo negro enganchado en la roca. El ladrón lleva hábito negro. ¡Al Cuaderno!'],
    ],
  },
  {
    id: 'mapas', epoca: 'Hispania romana', nombre: 'La sala de mapas', emoji: '🗺️', orden: 2,
    antes: [
      ['habla', 'En la sala de mapas, el ladrón ha dejado una nota con su viaje por Hispania… pero con los nombres en latín, como en tiempos de Roma.'],
      ['senala', 'Cada ciudad del mapa esconde una letra. Tocad las ciudades en el orden del viaje y las letras os dirán dónde está la página.'],
    ],
    pistas: [
      'Muchos nombres latinos se parecen al actual: Corduba, Barcino, Tarraco, Toletum…',
      'Gades es Cádiz e Hispalis es Sevilla. Caesaraugusta, la ciudad del emperador César Augusto, es Zaragoza.',
      'El viaje: Cádiz → Sevilla → Córdoba → Toledo → Zaragoza → Tarragona → Barcelona. Sale LUCERNA.',
    ],
    despues: [
      ['feliz', '¡LUCERNA! Una lucerna es una lámpara de aceite romana… ¡y la página estaba debajo!'],
      ['senala', 'Y junto al mapa, un cristal de gafas roto. El ladrón lleva gafas.'],
    ],
  },
  {
    id: 'palabras', epoca: 'Al-Ándalus', nombre: 'El arcón de las palabras', emoji: '📦', orden: 3,
    antes: [
      ['habla', 'Durante casi ocho siglos se habló árabe en al-Ándalus, y el castellano se quedó con miles de palabras suyas.'],
      ['senala', 'Este arcón solo se abre si tocáis las palabras que vienen del árabe, y ninguna más. Cuidado: no basta con que empiecen por «al-».'],
    ],
    pistas: [
      'Muchos arabismos empiezan por «al-» o «a-» (el artículo árabe), pero no todas las palabras que empiezan así son árabes.',
      '«Alma» y «altar» vienen del latín. «Ventana», «puerta», «iglesia» y «castillo» tampoco son árabes.',
      'Son árabes: aceite, almohada, alcalde, azúcar, ojalá y alfombra.',
    ],
    despues: [
      ['feliz', '¡Clac! El arcón se ha abierto. Tercera página.'],
      ['habla', 'Y el hermano cocinero dice que vio al ladrón de lejos: iba bien afeitado. No tiene barba.'],
    ],
  },
  {
    id: 'scriptorium', epoca: 'Reyes Católicos', nombre: 'El scriptorium', emoji: '✒️', orden: 4,
    antes: [
      ['preocupado', 'En el scriptorium ha aparecido una carta «de la reina Isabel», escrita en enero de 1492. ¡Pero es falsa!'],
      ['senala', 'El ladrón la escribió con prisas y se le colaron cosas que en 1492 aún no habían pasado. Marcad todas las frases imposibles, y solo esas.'],
    ],
    pistas: [
      'Pensad en qué sabían los Reyes Católicos en enero de 1492: Colón aún no había llegado a América.',
      'Ojo con lo que vino de América, con la capital y con la familia: Carlos, el nieto de los Reyes, nació en el año 1500.',
      'Las frases falsas son: la tortilla de patatas, Colón ya ha vuelto de América, Madrid capital del reino y el nieto Carlos.',
    ],
    despues: [
      ['feliz', '¡Bien visto! Detrás del sello estaba la cuarta página.'],
      ['senala', 'Y en el lacre se quedó pegado un pelo oscuro. El ladrón no tiene canas.'],
    ],
  },
  {
    id: 'galeria', epoca: 'Austrias y Borbones', nombre: 'La galería de retratos', emoji: '🖼️', orden: 5,
    antes: [
      ['habla', 'En el claustro tenemos los retratos de los reyes, de los Austrias al primer Borbón. El ladrón los ha cambiado de sitio y les ha quitado los nombres.'],
      ['senala', 'Ordenadlos del más antiguo al más moderno, de izquierda a derecha. Tocad dos cuadros para cambiarlos de sitio.'],
    ],
    pistas: [
      'El primero heredó un imperio enorme; el último de los Austrias murió sin hijos, y después llegó el primer Borbón.',
      'La Armada Invencible es de 1588, la expulsión de los moriscos de 1609 y Las Meninas de 1656.',
      'El orden: Carlos I, Felipe II, Felipe III, Felipe IV, Carlos II y Felipe V.',
    ],
    despues: [
      ['feliz', '¡Los reyes están en su sitio! Detrás del último cuadro había una página… y una nota.'],
      ['senala', 'La nota está firmada «Hermano…». El ladrón es hermano, no fray.'],
    ],
  },
  {
    id: 'torre', epoca: 'Siglos XIX y XX', nombre: 'La torre del reloj', emoji: '🕰️', orden: 6,
    antes: [
      ['preocupado', 'El reloj de la torre se ha vuelto loco: el ladrón ha desordenado las fechas de los últimos dos siglos.'],
      ['senala', 'Poned cada acontecimiento en su año. Cuando estén todos bien, el reloj volverá a andar.'],
    ],
    pistas: [
      'Las dos primeras fechas son de la lucha contra Napoleón; las dos últimas, del final del franquismo y la Transición.',
      'La Segunda República llegó en 1931 y la Guerra Civil empezó cinco años después. La Constitución de Cádiz es de 1812.',
      '1808 Guerra de la Independencia · 1812 la Pepa · 1931 Segunda República · 1936 Guerra Civil · 1975 muere Franco · 1978 Constitución actual.',
    ],
    despues: [
      ['feliz', '¡Tic, tac! El reloj anda otra vez. Sexta página.'],
      ['senala', 'Y desde aquí arriba lo veo: ¡alguien corre hacia el establo con un fardo! Es ahora o nunca.'],
    ],
  },
]

export const FINAL_ACUSAR = [
  ['senala', '¡Ya tenéis las seis páginas! Mirad el Cuaderno: ¿quién es el ladrón? Decididlo entre todos, que acusar a un inocente cuesta dos minutos.'],
]
export const ACUSACION_MAL = ['preocupado', '¡Ese hermano es inocente! Volved a mirar las pistas del Cuaderno.']
export const FINAL_COFRE = [
  ['feliz', '¡HERMANO ÍÑIGO! ¡Mi propio ayudante! Y yo que le dejaba las llaves del archivo…'],
  ['senala', 'Ha confesado: el Códice está en un cofre del establo. Se abre con las seis cifras de las páginas…'],
  ['habla', '…ordenadas de la época más antigua a la más moderna. Las tenéis en el Cuaderno.'],
]
export const COFRE_MAL = ['preocupado', 'El cofre no se abre. ¿Están las cifras en orden, de la Prehistoria al siglo XX?']
export const FINAL = [
  ['feliz', '¡El Códice! Con todas sus páginas. Mirad arriba: la historia de España vuelve a tener color.'],
  ['habla', 'Íñigo dice que solo quería leerlo entero de una sentada. Le he puesto a copiarlo a mano. Entero. Dos veces.'],
  ['feliz', '¡Gracias, archiveros! Sois la mejor clase que ha pasado por este monasterio.'],
]
export const SIN_TIEMPO = ['preocupado', '¡Han tocado a vísperas! El ladrón se nos escapa… Pero no os rindáis: podéis seguir sin reloj y recuperar el Códice igualmente.']

// ── Datos de cada sala ──────────────────────────────────────────────────────

export const ETAPAS_CRIPTA = [
  { id: 'paleo', nombre: 'Paleolítico' },
  { id: 'neo', nombre: 'Neolítico' },
  { id: 'metales', nombre: 'Edad de los Metales' },
]
export const OBJETOS_CRIPTA = [
  { id: 'bifaz', nombre: 'Bifaz de piedra tallada', etapa: 'paleo' },
  { id: 'arpon', nombre: 'Arpón de hueso', etapa: 'paleo' },
  { id: 'bisonte', nombre: 'Bisonte pintado (Altamira)', etapa: 'paleo' },
  { id: 'vasija', nombre: 'Vasija de cerámica', etapa: 'neo' },
  { id: 'hacha', nombre: 'Hacha de piedra pulimentada', etapa: 'neo' },
  { id: 'molino', nombre: 'Molino de mano', etapa: 'neo' },
  { id: 'espada', nombre: 'Espada de bronce', etapa: 'metales' },
  { id: 'molde', nombre: 'Molde de fundición', etapa: 'metales' },
  { id: 'lanza', nombre: 'Punta de lanza de hierro', etapa: 'metales' },
]

// Ciudades del mapa: nombre actual, latino, coordenadas [lon, lat] y su letra
export const CIUDADES = [
  { id: 'cadiz', hoy: 'Cádiz', latin: 'Gades', c: [-6.29, 36.53], letra: 'L', bajo: true },
  { id: 'sevilla', hoy: 'Sevilla', latin: 'Hispalis', c: [-5.98, 37.39], letra: 'U' },
  { id: 'cordoba', hoy: 'Córdoba', latin: 'Corduba', c: [-4.78, 37.89], letra: 'C' },
  { id: 'toledo', hoy: 'Toledo', latin: 'Toletum', c: [-4.02, 39.86], letra: 'E' },
  { id: 'zaragoza', hoy: 'Zaragoza', latin: 'Caesaraugusta', c: [-0.88, 41.65], letra: 'R' },
  { id: 'tarragona', hoy: 'Tarragona', latin: 'Tarraco', c: [1.25, 41.12], letra: 'N', bajo: true },
  { id: 'barcelona', hoy: 'Barcelona', latin: 'Barcino', c: [2.17, 41.39], letra: 'A' },
  { id: 'merida', hoy: 'Mérida', latin: 'Emerita Augusta', c: [-6.34, 38.92], letra: 'S' },
  { id: 'lugo', hoy: 'Lugo', latin: 'Lucus Augusti', c: [-7.56, 43.01], letra: 'O' },
  { id: 'astorga', hoy: 'Astorga', latin: 'Asturica Augusta', c: [-6.06, 42.46], letra: 'M' },
]
export const VIAJE = ['cadiz', 'sevilla', 'cordoba', 'toledo', 'zaragoza', 'tarragona', 'barcelona']
export const PALABRA_MAPA = 'LUCERNA'

export const PALABRAS = [
  { p: 'aceite', arabe: true }, { p: 'alma', arabe: false }, { p: 'almohada', arabe: true },
  { p: 'ventana', arabe: false }, { p: 'alcalde', arabe: true }, { p: 'altar', arabe: false },
  { p: 'azúcar', arabe: true }, { p: 'iglesia', arabe: false }, { p: 'ojalá', arabe: true },
  { p: 'castillo', arabe: false }, { p: 'alfombra', arabe: true }, { p: 'puerta', arabe: false },
]

export const CARTA = {
  cabecera: 'Granada, a 2 de enero de 1492',
  frases: [
    { t: 'Hoy Fernando y yo hemos entrado en la Alhambra: el rey Boabdil nos ha entregado las llaves de la ciudad.', mal: false },
    { t: 'Para celebrarlo, en la cocina nos han preparado una tortilla de patatas.', mal: true, por: 'La patata vino de América, que en enero de 1492 aún no se conocía en Europa.' },
    { t: 'Un navegante, Cristóbal Colón, insiste en que le demos barcos para llegar a las Indias navegando hacia el oeste.', mal: false },
    { t: 'Le he dicho que espere: acaba de volver de América cargado de oro y no para de presumir.', mal: true, por: 'Colón llegó a América el 12 de octubre de 1492 y volvió en 1493.' },
    { t: 'El sabio Antonio de Nebrija está terminando una gramática de la lengua castellana.', mal: false },
    { t: 'Mañana partiremos hacia Madrid, la capital del reino.', mal: true, por: 'Madrid no fue la capital hasta 1561, con Felipe II. Los Reyes Católicos no tenían una capital fija.' },
    { t: 'Nuestro nieto Carlos ya sabe montar a caballo.', mal: true, por: 'Carlos, el futuro Carlos I, nació en el año 1500.' },
    { t: 'Haremos copias de esta carta en la imprenta para que se lea en todo el reino.', mal: false },
  ],
  firma: 'Isabel, reina de Castilla',
}

export const REYES = [
  { id: 'carlos1', nombre: 'Carlos I', hecho: 'Rey de España y emperador del Sacro Imperio: en sus dominios «no se ponía el sol».',
    rasgos: { pelo: 'corto', cpelo: 'castano', barba: 'corta', ropa: 'armadura', cropa: '#B91C1C' } },
  { id: 'felipe2', nombre: 'Felipe II', hecho: 'Llevó la corte a Madrid y perdió la Armada Invencible contra Inglaterra.',
    rasgos: { pelo: 'corto', cpelo: 'rubio', barba: 'puntiaguda', som: 'gorro', ropa: 'gorguera', cropa: '#111827' } },
  { id: 'felipe3', nombre: 'Felipe III', hecho: 'Ordenó la expulsión de los moriscos de sus reinos (1609).',
    rasgos: { pelo: 'raya', cpelo: 'rubio', bigote: 'fino', barba: 'perilla', ropa: 'gorguera', cropa: '#1E3A8A' } },
  { id: 'felipe4', nombre: 'Felipe IV', hecho: 'Su pintor, Velázquez, pintó Las Meninas, y en su reinado Portugal se separó (1640).',
    rasgos: { pelo: 'largo_h', cpelo: 'rubio', bigote: 'poblado', ropa: 'traje', cropa: '#111827' } },
  { id: 'carlos2', nombre: 'Carlos II', hecho: 'El último de los Austrias: murió sin hijos y su muerte desató una guerra.',
    rasgos: { pelo: 'melena', cpelo: 'rubio', ropa: 'traje', cropa: '#3F3F46' } },
  { id: 'felipe5', nombre: 'Felipe V', hecho: 'El primer Borbón: ganó la Guerra de Sucesión.',
    rasgos: { pelo: 'peluca_larga', cpelo: 'blanco', ropa: 'casaca', cropa: '#1E3A8A' } },
]

export const SUCESOS = [
  { anio: 1808, t: 'Empieza la Guerra de la Independencia contra Napoleón' },
  { anio: 1812, t: 'Las Cortes de Cádiz aprueban «la Pepa», la primera Constitución' },
  { anio: 1931, t: 'Se proclama la Segunda República' },
  { anio: 1936, t: 'Empieza la Guerra Civil' },
  { anio: 1975, t: 'Muere Franco' },
  { anio: 1978, t: 'Se aprueba la Constitución actual' },
]
