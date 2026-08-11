// ¿Qué Época Es? — banco de imágenes reales (dominio público) para adivinar
// la época histórica que retratan.
//
// IMPORTANTE sobre lo que se pregunta: siempre la ÉPOCA QUE RETRATA la
// imagen, nunca cuándo se hizo la fotografía. Con Tutankamón, por ejemplo,
// la respuesta correcta es "Edad Antigua" aunque la foto la hiciera Harry
// Burton en 1922 durante la excavación — ese dato (fotógrafo, año de la
// foto) va solo en la explicación, como contexto, nunca como lo que hay
// que acertar.
//
// `fecha` es el momento o rango histórico real que retrata la imagen (con
// "hacia"/"c." cuando no hay certeza exacta, como en el Egipto faraónico) —
// no la fecha de la fotografía. Se guarda con precisión aunque hoy el juego
// solo pregunte por la época amplia: es la pieza que hará falta el día que
// haya examen específico de una época (ej. distinguir 1941 de 1945 dentro
// de la Segunda Guerra Mundial).
//
// `credito` recoge la procedencia y licencia de cada imagen — todas de
// dominio público, verificadas una a una en su página de Wikimedia Commons
// antes de subirlas (no vale fiarse de una categoría a ciegas).
function foto(id, src, epoca, tema, fecha, explicacion, credito, emoji) {
  return { id, src, epoca, tema, fecha, explicacion, credito, emoji }
}

// Las 5 épocas amplias — mismas que ya usa el resto de Historia en la
// plataforma (topicCatalog.js), así que a esto le siguen encajando los
// exámenes por tema que ya existen (Prehistoria, Edad Media, Antigua Roma,
// Edad Moderna, y dentro de la Contemporánea: Guerra Civil, 2GM, Franquismo).
export const EPOCAS = {
  prehistoria:    { es: 'Prehistoria',          en: 'Prehistory',            ca: 'Prehistòria' },
  antigua:        { es: 'Edad Antigua',         en: 'Antiquity',             ca: 'Edat Antiga' },
  'edad-media':   { es: 'Edad Media',           en: 'The Middle Ages',       ca: 'Edat Mitjana' },
  'edad-moderna': { es: 'Edad Moderna',         en: 'The Early Modern Period', ca: 'Edat Moderna' },
  contemporanea:  { es: 'Edad Contemporánea',   en: 'The Contemporary Age',  ca: 'Edat Contemporània' },
}

export const FOTOS = [
  foto(
    'wwii-dday-omaha',
    '/games/epocas/wwii-dday-omaha.jpg',
    'contemporanea',
    { es: 'Desembarco de Normandía (Día D)', en: 'D-Day landings', ca: 'Desembarcament de Normandia (Dia D)' },
    { es: '6 de junio de 1944', en: '6 June 1944', ca: '6 de juny de 1944' },
    {
      es: 'Soldados estadounidenses vadeando hacia la playa de Omaha durante el desembarco de Normandía, el 6 de junio de 1944 — el mayor desembarco militar de la historia y el inicio de la liberación de la Europa ocupada por la Alemania nazi.',
      en: 'American soldiers wading ashore at Omaha Beach during the Normandy landings on 6 June 1944 — the largest military landing in history and the start of the liberation of Nazi-occupied Europe.',
      ca: 'Soldats nord-americans vadejant cap a la platja d\'Omaha durant el desembarcament de Normandia, el 6 de juny de 1944 — el desembarcament militar més gran de la història i l\'inici de l\'alliberament de l\'Europa ocupada per l\'Alemanya nazi.',
    },
    'Robert F. Sargent, Guardia Costera de EE. UU. — Archivos Nacionales de EE. UU. (NARA), dominio público',
    '⚓',
  ),
  foto(
    'wwii-pow-ruhr',
    '/games/epocas/wwii-pow-ruhr.jpg',
    'contemporanea',
    { es: 'Frente occidental europeo', en: 'The Western European Front', ca: 'Front occidental europeu' },
    { es: '1945', en: '1945', ca: '1945' },
    {
      es: 'Prisioneros de guerra alemanes capturados por tropas aerotransportadas estadounidenses en la región del Ruhr, en la fase final de la guerra en Europa, en 1945.',
      en: 'German prisoners of war captured by American airborne troops in the Ruhr region, during the final phase of the war in Europe, in 1945.',
      ca: 'Presoners de guerra alemanys capturats per tropes aerotransportades nord-americanes a la regió del Ruhr, en la fase final de la guerra a Europa, el 1945.',
    },
    'Fotógrafo del Ejército de EE. UU. — Archivos Nacionales de EE. UU. (NARA), dominio público',
    '🎖️',
  ),
  foto(
    'egipto-tutankamon-mascara',
    '/games/epocas/egipto-tutankamon-mascara.jpg',
    'antigua',
    { es: 'Antiguo Egipto', en: 'Ancient Egypt', ca: 'Antic Egipte' },
    { es: 'hacia 1332–1323 a. C. (reinado de Tutankamón)', en: 'c. 1332–1323 BC (Tutankhamun\'s reign)', ca: 'cap al 1332–1323 aC (regnat de Tutankamon)' },
    {
      es: 'La máscara funeraria de Tutankamón, dentro de su sarcófago, fotografiada durante la excavación de su tumba en el Valle de los Reyes. El faraón reinó en el Antiguo Egipto hacia el 1332–1323 a. C. — la fotografía en sí es de 1925, pero lo que retrata es mucho más antiguo.',
      en: 'Tutankhamun\'s funerary mask inside his sarcophagus, photographed during the excavation of his tomb in the Valley of the Kings. The pharaoh reigned in Ancient Egypt around 1332–1323 BC — the photograph itself dates from 1925, but what it shows is far older.',
      ca: 'La màscara funerària de Tutankamon, dins del seu sarcòfag, fotografiada durant l\'excavació de la seva tomba a la Vall dels Reis. El faraó va regnar a l\'Antic Egipte cap al 1332–1323 aC — la fotografia en si és del 1925, però el que retrata és molt més antic.',
    },
    'Harry Burton, 1925 — Griffith Institute / Archivo Howard Carter, dominio público',
    '👑',
  ),
  foto(
    'egipto-tutankamon-tumba',
    '/games/epocas/egipto-tutankamon-tumba.jpg',
    'antigua',
    { es: 'Antiguo Egipto', en: 'Ancient Egypt', ca: 'Antic Egipte' },
    { es: 'hacia 1332–1323 a. C. (reinado de Tutankamón)', en: 'c. 1332–1323 BC (Tutankhamun\'s reign)', ca: 'cap al 1332–1323 aC (regnat de Tutankamon)' },
    {
      es: 'Objetos funerarios hallados en la tumba de Tutankamón, en el Valle de los Reyes. La tumba se descubrió casi intacta en 1922, pero los objetos y el propio faraón pertenecen al Antiguo Egipto, más de tres mil años antes.',
      en: 'Funerary objects found in Tutankhamun\'s tomb, in the Valley of the Kings. The tomb was discovered almost intact in 1922, but the objects and the pharaoh himself belong to Ancient Egypt, more than three thousand years earlier.',
      ca: 'Objectes funeraris trobats a la tomba de Tutankamon, a la Vall dels Reis. La tomba es va descobrir gairebé intacta el 1922, però els objectes i el mateix faraó pertanyen a l\'Antic Egipte, més de tres mil anys abans.',
    },
    'Harry Burton, 1922 — Griffith Institute / Archivo Howard Carter, dominio público',
    '⚱️',
  ),
]
