// Spain's 17 Autonomous Communities
// geoName must match geo.properties.name in the GeoJSON
export const COMUNIDADES = [
  { geoName: 'Andalucía',               nombre: 'Andalucía',              nombreEn: 'Andalusia',            nombreCa: 'Andalusia',         capital: 'Sevilla',          capitalEn: 'Seville' },
  { geoName: 'Aragón',                  nombre: 'Aragón',                  nombreEn: 'Aragon',               nombreCa: 'Aragó',             capital: 'Zaragoza',         capitalEn: 'Zaragoza' },
  { geoName: 'Principado de Asturias',  nombre: 'Asturias',               nombreEn: 'Asturias',             nombreCa: 'Astúries',          capital: 'Oviedo',           capitalEn: 'Oviedo' },
  { geoName: 'Islas Baleares',          nombre: 'Islas Baleares',         nombreEn: 'Balearic Islands',     nombreCa: 'Illes Balears',     capital: 'Palma',            capitalEn: 'Palma' },
  { geoName: 'Islas Canarias',          nombre: 'Islas Canarias',         nombreEn: 'Canary Islands',       nombreCa: 'Illes Canàries',    capital: 'Las Palmas / S/C', capitalEn: 'Las Palmas / S/C' },
  { geoName: 'Cantabria',               nombre: 'Cantabria',              nombreEn: 'Cantabria',            nombreCa: 'Cantàbria',         capital: 'Santander',        capitalEn: 'Santander' },
  { geoName: 'Castilla-La Mancha',      nombre: 'Castilla-La Mancha',     nombreEn: 'Castilla-La Mancha',   nombreCa: 'Castella-La Manxa', capital: 'Toledo',           capitalEn: 'Toledo' },
  { geoName: 'Castilla y León',         nombre: 'Castilla y León',        nombreEn: 'Castile and León',     nombreCa: 'Castella i Lleó',   capital: 'Valladolid',       capitalEn: 'Valladolid' },
  { geoName: 'Cataluña',                nombre: 'Cataluña',               nombreEn: 'Catalonia',            nombreCa: 'Catalunya',         capital: 'Barcelona',        capitalEn: 'Barcelona' },
  { geoName: 'Extremadura',             nombre: 'Extremadura',            nombreEn: 'Extremadura',          nombreCa: 'Extremadura',       capital: 'Mérida',           capitalEn: 'Mérida' },
  { geoName: 'Galicia',                 nombre: 'Galicia',                nombreEn: 'Galicia',              nombreCa: 'Galícia',           capital: 'Santiago de Compostela', capitalEn: 'Santiago de Compostela' },
  { geoName: 'La Rioja',               nombre: 'La Rioja',               nombreEn: 'La Rioja',             nombreCa: 'La Rioja',          capital: 'Logroño',          capitalEn: 'Logroño' },
  { geoName: 'Comunidad de Madrid',     nombre: 'Madrid',                 nombreEn: 'Madrid',               nombreCa: 'Madrid',            capital: 'Madrid',           capitalEn: 'Madrid' },
  { geoName: 'Región de Murcia',        nombre: 'Murcia',                 nombreEn: 'Murcia',               nombreCa: 'Múrcia',            capital: 'Murcia',           capitalEn: 'Murcia' },
  { geoName: 'Comunidad Foral de Navarra', nombre: 'Navarra',             nombreEn: 'Navarre',              nombreCa: 'Navarra',           capital: 'Pamplona',         capitalEn: 'Pamplona' },
  { geoName: 'País Vasco',              nombre: 'País Vasco',             nombreEn: 'Basque Country',       nombreCa: 'País Basc',         capital: 'Vitoria-Gasteiz',  capitalEn: 'Vitoria-Gasteiz' },
  { geoName: 'Comunidad Valenciana',    nombre: 'Valencia',               nombreEn: 'Valencia',             nombreCa: 'País Valencià',     capital: 'Valencia',         capitalEn: 'Valencia' },
]

export const NOMBRES_COMUNIDADES    = COMUNIDADES.map(c => c.nombre)
export const NOMBRES_COMUNIDADES_EN = COMUNIDADES.map(c => c.nombreEn)
export const NOMBRES_COMUNIDADES_CA = COMUNIDADES.map(c => c.nombreCa)
