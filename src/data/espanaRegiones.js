// Spain's autonomous communities
// geoName matches geo.properties.name in the click_that_hood GeoJSON (no accents, simplified)
export const COMUNIDADES = [
  { geoName: 'Andalucia',       nombre: 'Andalucía',        nombreEn: 'Andalusia',         nombreCa: 'Andalusia',         capital: 'Sevilla',                capitalEn: 'Seville' },
  { geoName: 'Aragon',          nombre: 'Aragón',            nombreEn: 'Aragon',            nombreCa: 'Aragó',             capital: 'Zaragoza',               capitalEn: 'Zaragoza' },
  { geoName: 'Asturias',        nombre: 'Asturias',          nombreEn: 'Asturias',          nombreCa: 'Astúries',          capital: 'Oviedo',                 capitalEn: 'Oviedo' },
  // Baleares y Canarias excluidas: quedan fuera del viewport del mapa de la península
  { geoName: 'Cantabria',       nombre: 'Cantabria',         nombreEn: 'Cantabria',         nombreCa: 'Cantàbria',         capital: 'Santander',              capitalEn: 'Santander' },
  { geoName: 'Castilla-La Mancha', nombre: 'Castilla-La Mancha', nombreEn: 'Castilla-La Mancha', nombreCa: 'Castella-La Manxa', capital: 'Toledo',            capitalEn: 'Toledo' },
  { geoName: 'Castilla-Leon',   nombre: 'Castilla y León',  nombreEn: 'Castile and León',  nombreCa: 'Castella i Lleó',   capital: 'Valladolid',             capitalEn: 'Valladolid' },
  { geoName: 'Cataluña',        nombre: 'Cataluña',          nombreEn: 'Catalonia',         nombreCa: 'Catalunya',         capital: 'Barcelona',              capitalEn: 'Barcelona' },
  { geoName: 'Extremadura',     nombre: 'Extremadura',       nombreEn: 'Extremadura',       nombreCa: 'Extremadura',       capital: 'Mérida',                 capitalEn: 'Mérida' },
  { geoName: 'Galicia',         nombre: 'Galicia',           nombreEn: 'Galicia',           nombreCa: 'Galícia',           capital: 'Santiago de Compostela', capitalEn: 'Santiago de Compostela' },
  { geoName: 'La Rioja',        nombre: 'La Rioja',          nombreEn: 'La Rioja',          nombreCa: 'La Rioja',          capital: 'Logroño',                capitalEn: 'Logroño' },
  { geoName: 'Madrid',          nombre: 'Madrid',            nombreEn: 'Madrid',            nombreCa: 'Madrid',            capital: 'Madrid',                 capitalEn: 'Madrid' },
  { geoName: 'Murcia',          nombre: 'Murcia',            nombreEn: 'Murcia',            nombreCa: 'Múrcia',            capital: 'Murcia',                 capitalEn: 'Murcia' },
  { geoName: 'Navarra',         nombre: 'Navarra',           nombreEn: 'Navarre',           nombreCa: 'Navarra',           capital: 'Pamplona',               capitalEn: 'Pamplona' },
  { geoName: 'Pais Vasco',      nombre: 'País Vasco',        nombreEn: 'Basque Country',    nombreCa: 'País Basc',         capital: 'Vitoria-Gasteiz',        capitalEn: 'Vitoria-Gasteiz' },
  { geoName: 'Valencia',        nombre: 'Valencia',          nombreEn: 'Valencia',          nombreCa: 'País Valencià',     capital: 'Valencia',               capitalEn: 'Valencia' },
]

export const NOMBRES_COMUNIDADES    = COMUNIDADES.map(c => c.nombre)
export const NOMBRES_COMUNIDADES_EN = COMUNIDADES.map(c => c.nombreEn)
export const NOMBRES_COMUNIDADES_CA = COMUNIDADES.map(c => c.nombreCa)
