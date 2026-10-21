// Rasgos para dibujar a cada personaje de ¿Quién es Quién? (ver
// src/components/quienEsQuien/Retrato.jsx). Lo que lo hace reconocible:
// bigote de cepillo, chistera y barba sin bigote, gafas redondas, peluca
// empolvada, corona, casco… Un test exige que todo personaje tenga entrada.
//
//   piel    0 clara … 4 oscura
//   pelo    corto · raya · atras · entradas · flequillo · rizado · alborotado ·
//           calvo · calvo_lados · calvo_largo · tonsura · largo_h · peluca ·
//           peluca_larga · melena · largo · corto_m · moño · recogido
//   cpelo   negro · castano · rubio · pelirrojo · canoso · blanco (cbarba si difiere)
//   bigote  fino · cepillo · grueso · poblado
//   barba   corta · larga · puntiaguda · perilla · collar (sin bigote)
//   gafas   redondas · pasta
//   som     gorra · kepi · boina · bicornio · tricornio · chistera · fedora ·
//           corona · laurel · casco · tocado · toca · toca_fr · gorro · pluma
//   ropa    traje · pajarita · uniforme · casaca · gorguera · armadura · toga ·
//           manto · habito · bata · estampada · vestido · camisa (cropa = color)
//   ext     cigarro · perlas · collar_egipcio · gafas_piloto · sin_pendientes
//   cejas, sonrisa

const KAKI = '#6B6A4A', GRIS_CAMPO = '#5B6670', AZUL = '#1E3A8A', NEGRO = '#111827', ROJO = '#7F1D1D'

const FRANCO = { piel: 1, pelo: 'entradas', cpelo: 'negro', bigote: 'fino', ropa: 'uniforme', cropa: KAKI }
const MONTSENY = { pelo: 'corto_m', cpelo: 'negro', gafas: 'redondas', ropa: 'vestido', cropa: '#374151' }
const PILAR = { pelo: 'recogido', cpelo: 'castano', ropa: 'vestido', cropa: AZUL }
const WASHINGTON = { pelo: 'peluca', cpelo: 'blanco', ropa: 'casaca', cropa: AZUL }

export const RASGOS = {
  // Guerra Civil
  franco: FRANCO,
  'ibárruri': { piel: 1, pelo: 'recogido', cpelo: 'negro', ropa: 'vestido', cropa: NEGRO },
  lorca: { piel: 1, pelo: 'atras', cpelo: 'negro', ropa: 'traje', cropa: '#44403C', sonrisa: true },
  'azaña': { pelo: 'calvo_lados', cpelo: 'canoso', ropa: 'traje' },
  jose_antonio: { pelo: 'atras', cpelo: 'negro', ropa: 'camisa', cropa: '#1E3A8A' },
  mola: { pelo: 'calvo', gafas: 'redondas', ropa: 'uniforme', cropa: KAKI },
  durruti: { piel: 1, pelo: 'atras', cpelo: 'negro', ropa: 'camisa', cropa: '#3F3F46', cejas: true },
  companys: { pelo: 'atras', cpelo: 'negro', ropa: 'traje', cropa: '#334155' },
  machado: { pelo: 'corto', cpelo: 'canoso', som: 'fedora', ropa: 'traje', cropa: '#292524' },
  queipo: { pelo: 'atras', cpelo: 'canoso', bigote: 'grueso', ropa: 'uniforme', cropa: KAKI },
  'negrín': { pelo: 'calvo', gafas: 'redondas', ropa: 'traje', cropa: '#1F2937' },
  pilar: PILAR,
  federica: MONTSENY,
  kent: { pelo: 'corto_m', cpelo: 'negro', ropa: 'vestido', cropa: '#581C87' },

  // Segunda Guerra Mundial
  hitler: { pelo: 'flequillo', cpelo: 'castano', bigote: 'cepillo', ropa: 'uniforme', cropa: '#78716C' },
  churchill: { pelo: 'calvo_lados', cpelo: 'pelirrojo', ropa: 'pajarita', cropa: NEGRO, ext: ['cigarro'] },
  roosevelt: { pelo: 'raya', cpelo: 'canoso', gafas: 'redondas', ropa: 'traje', cropa: '#334155', sonrisa: true },
  stalin: { piel: 1, pelo: 'atras', cpelo: 'negro', bigote: 'grueso', ropa: 'uniforme', cropa: '#A8A29E' },
  mussolini: { piel: 1, pelo: 'calvo', ropa: 'uniforme', cropa: NEGRO },
  rommel: { pelo: 'corto', som: 'gorra', ropa: 'uniforme', cropa: GRIS_CAMPO, ext: ['gafas_piloto'] },
  eisenhower: { pelo: 'calvo_lados', cpelo: 'rubio', ropa: 'uniforme', cropa: KAKI, sonrisa: true },
  anne_frank: { pelo: 'melena', cpelo: 'castano', ropa: 'vestido', cropa: '#B91C1C', sonrisa: true },
  de_gaulle: { pelo: 'corto', som: 'kepi', bigote: 'fino', ropa: 'uniforme', cropa: KAKI },
  himmler: { pelo: 'corto', cpelo: 'castano', gafas: 'redondas', bigote: 'fino', ropa: 'uniforme', cropa: NEGRO },
  montgomery: { pelo: 'corto', som: 'boina', bigote: 'fino', ropa: 'uniforme', cropa: KAKI },
  curie_irene: { pelo: 'corto_m', cpelo: 'castano', ropa: 'bata', cropa: '#475569' },

  // Personajes de todas las épocas
  napoleon: { pelo: 'corto', cpelo: 'castano', som: 'bicornio', ropa: 'uniforme', cropa: AZUL },
  robespierre: { pelo: 'peluca', cpelo: 'blanco', ropa: 'casaca', cropa: '#065F46' },
  cesar: { pelo: 'corto', cpelo: 'castano', som: 'laurel', ropa: 'toga' },
  cleopatra: { piel: 2, pelo: 'corto_m', cpelo: 'negro', som: 'tocado', ropa: 'vestido', cropa: '#F5F5F4', ext: ['collar_egipcio'] },
  alejandro: { pelo: 'rizado', cpelo: 'rubio', ropa: 'armadura' },
  washington: WASHINGTON,
  marie_curie: { pelo: 'recogido', cpelo: 'canoso', ropa: 'vestido', cropa: NEGRO },
  lincoln: { pelo: 'corto', cpelo: 'negro', barba: 'collar', som: 'chistera', ropa: 'traje', cropa: NEGRO },
  lenin: { pelo: 'calvo_lados', cpelo: 'pelirrojo', barba: 'perilla', ropa: 'traje', cropa: '#374151' },
  gandhi: { piel: 3, pelo: 'calvo', gafas: 'redondas', ropa: 'toga', sonrisa: true },
  eleonor: { pelo: 'recogido', cpelo: 'castano', ropa: 'vestido', cropa: '#1E3A8A', ext: ['perlas'], sonrisa: true },
  mandela: { piel: 4, pelo: 'rizado', cpelo: 'canoso', ropa: 'estampada', sonrisa: true },

  // Independencia americana
  washington_usa: WASHINGTON,
  jefferson: { pelo: 'peluca', cpelo: 'pelirrojo', ropa: 'casaca', cropa: '#44403C' },
  franklin: { pelo: 'calvo_largo', cpelo: 'canoso', gafas: 'redondas', ropa: 'casaca', cropa: '#78350F' },
  hamilton: { pelo: 'peluca', cpelo: 'canoso', ropa: 'casaca', cropa: '#065F46' },
  adams_john: { pelo: 'calvo_lados', cpelo: 'blanco', ropa: 'casaca', cropa: NEGRO },
  paine: { pelo: 'raya', cpelo: 'canoso', ropa: 'casaca', cropa: '#57534E' },
  samuel_adams: { pelo: 'peluca', cpelo: 'canoso', ropa: 'casaca', cropa: ROJO },
  patrick_henry: { pelo: 'peluca', cpelo: 'castano', gafas: 'redondas', ropa: 'casaca', cropa: NEGRO },
  paul_revere: { pelo: 'largo_h', cpelo: 'castano', som: 'tricornio', ropa: 'camisa', cropa: '#F5F5F4' },
  hancock: { pelo: 'peluca', cpelo: 'blanco', ropa: 'casaca', cropa: '#9F1239' },
  benedict_arnold: { pelo: 'peluca', cpelo: 'castano', som: 'tricornio', ropa: 'uniforme', cropa: AZUL },
  lafayette: { pelo: 'peluca', cpelo: 'pelirrojo', ropa: 'uniforme', cropa: AZUL },

  // Franquismo
  franco_qq: FRANCO,
  carrero_blanco: { pelo: 'calvo_lados', cpelo: 'negro', cejas: true, ropa: 'uniforme', cropa: NEGRO },
  grimau: { pelo: 'raya', cpelo: 'negro', ropa: 'traje', cropa: '#374151' },
  carrillo: { pelo: 'calvo_lados', cpelo: 'canoso', gafas: 'pasta', ropa: 'traje', cropa: '#44403C', ext: ['cigarro'] },
  montseny: MONTSENY,
  alberti: { pelo: 'largo_h', cpelo: 'blanco', ropa: 'camisa', cropa: '#0E7490' },
  cela: { pelo: 'calvo_lados', cpelo: 'castano', cejas: true, ropa: 'traje', cropa: '#1F2937' },
  tierno_galvan: { pelo: 'atras', cpelo: 'canoso', gafas: 'pasta', ropa: 'traje', cropa: '#1F2937' },
  fraga: { pelo: 'corto', cpelo: 'canoso', cejas: true, ropa: 'traje', cropa: '#334155' },
  primo_pilar: PILAR,
  lister: { piel: 1, pelo: 'atras', cpelo: 'negro', ropa: 'uniforme', cropa: KAKI },
  suarez: { pelo: 'raya', cpelo: 'negro', ropa: 'traje', cropa: '#1E3A8A', sonrisa: true },
  ochoa: { pelo: 'atras', cpelo: 'canoso', ropa: 'bata', cropa: '#1F2937' },

  // Edad Media
  cid: { pelo: 'corto', cpelo: 'castano', barba: 'larga', som: 'casco', ropa: 'armadura' },
  carlomagno_qq: { pelo: 'largo_h', cpelo: 'blanco', barba: 'larga', som: 'corona', ropa: 'manto', cropa: AZUL },
  alfonso_x: { pelo: 'largo_h', cpelo: 'castano', som: 'corona', ropa: 'manto', cropa: ROJO },
  leonor_aquitania: { pelo: 'recogido', som: 'toca', ropa: 'vestido', cropa: '#9D174D', ext: ['sin_pendientes'] },
  ricardo_leon: { pelo: 'corto', cpelo: 'pelirrojo', barba: 'corta', som: 'corona', ropa: 'armadura', cropa: '#DC2626' },
  guillermo_conq: { pelo: 'corto', som: 'casco', ropa: 'armadura' },
  juana_arco: { pelo: 'corto_m', cpelo: 'castano', ropa: 'armadura', ext: ['sin_pendientes'] },
  tomas_aquino: { pelo: 'tonsura', cpelo: 'negro', ropa: 'habito', cropa: '#F5F5F4' },
  godofredo: { pelo: 'corto', cpelo: 'rubio', barba: 'corta', som: 'casco', ropa: 'armadura', cropa: '#DC2626' },
  barbarroja: { pelo: 'corto', cpelo: 'pelirrojo', barba: 'corta', som: 'corona', ropa: 'manto', cropa: '#1C1917' },
  fibonacci: { pelo: 'largo_h', cpelo: 'castano', som: 'gorro', ropa: 'manto', cropa: '#0E7490' },
  pedro_cruel: { pelo: 'largo_h', cpelo: 'rubio', som: 'corona', ropa: 'manto', cropa: '#1C1917', cejas: true },

  // Edad Moderna
  colon: { pelo: 'largo_h', cpelo: 'canoso', som: 'gorro', ropa: 'manto', cropa: '#44403C' },
  isabel_catolica: { pelo: 'recogido', cpelo: 'pelirrojo', som: 'corona', ropa: 'vestido', cropa: '#7F1D1D', ext: ['sin_pendientes'] },
  cortes: { pelo: 'corto', cpelo: 'negro', barba: 'corta', ropa: 'armadura' },
  pizarro: { pelo: 'corto', cpelo: 'canoso', barba: 'puntiaguda', som: 'pluma', ropa: 'armadura' },
  lutero: { pelo: 'corto', cpelo: 'castano', som: 'gorro', ropa: 'habito', cropa: NEGRO },
  carlos_i: { pelo: 'corto', cpelo: 'castano', barba: 'corta', ropa: 'armadura', cropa: '#B91C1C' },
  felipe_ii: { pelo: 'corto', cpelo: 'rubio', barba: 'puntiaguda', som: 'gorro', ropa: 'gorguera', cropa: NEGRO },
  isabel_inglat: { pelo: 'rizado', cpelo: 'pelirrojo', som: 'corona', ropa: 'gorguera', cropa: '#7C3AED', ext: ['perlas'] },
  cervantes: { pelo: 'entradas', cpelo: 'canoso', barba: 'perilla', ropa: 'gorguera', cropa: NEGRO },
  galileo: { pelo: 'calvo_lados', cpelo: 'canoso', barba: 'corta', ropa: 'manto', cropa: NEGRO },
  magallanes: { pelo: 'corto', cpelo: 'negro', barba: 'larga', som: 'gorro', ropa: 'manto', cropa: '#78350F' },
  luis_xiv: { pelo: 'peluca_larga', cpelo: 'castano', bigote: 'fino', ropa: 'manto', cropa: '#1E3A8A' },
  ana_bolena: { pelo: 'recogido', cpelo: 'castano', som: 'toca_fr', ropa: 'vestido', cropa: NEGRO, ext: ['perlas'] },

  // Ciencia
  newton: { pelo: 'peluca_larga', cpelo: 'canoso', ropa: 'casaca', cropa: '#7F1D1D' },
  einstein: { pelo: 'alborotado', cpelo: 'blanco', bigote: 'poblado', ropa: 'camisa', cropa: '#57534E', sonrisa: true },
  darwin: { pelo: 'calvo_lados', cpelo: 'blanco', barba: 'larga', cejas: true, ropa: 'traje', cropa: NEGRO },
  lovelace: { pelo: 'recogido', cpelo: 'negro', ropa: 'vestido', cropa: '#4C1D95' },
  cajal: { pelo: 'calvo_lados', cpelo: 'canoso', barba: 'puntiaguda', cbarba: 'canoso', ropa: 'traje', cropa: '#1F2937' },
  hipatia: { piel: 2, pelo: 'moño', cpelo: 'negro', ropa: 'toga' },
  arquimedes: { piel: 1, pelo: 'rizado', cpelo: 'canoso', barba: 'larga', ropa: 'toga', cropa: '#E7E5E4' },
  lavoisier: { pelo: 'peluca', cpelo: 'blanco', ropa: 'casaca', cropa: NEGRO },
  rosalind_franklin: { pelo: 'corto_m', cpelo: 'negro', ropa: 'bata', cropa: '#1E3A8A' },
  pasteur: { pelo: 'entradas', cpelo: 'castano', barba: 'corta', cbarba: 'canoso', ropa: 'traje', cropa: NEGRO },
  copernico: { pelo: 'largo_h', cpelo: 'castano', ropa: 'manto', cropa: '#7F1D1D' },
  margarita_salas: { pelo: 'corto_m', cpelo: 'canoso', ropa: 'bata', cropa: '#9D174D', sonrisa: true },
  fleming: { pelo: 'atras', cpelo: 'canoso', ropa: 'pajarita', cropa: '#334155' },
  mendel: { pelo: 'corto', cpelo: 'canoso', gafas: 'redondas', ropa: 'habito', cropa: NEGRO },
  mendeleiev: { pelo: 'largo_h', cpelo: 'blanco', barba: 'larga', ropa: 'traje', cropa: '#44403C' },
  levi_montalcini: { pelo: 'recogido', cpelo: 'blanco', ropa: 'vestido', cropa: '#0F766E', ext: ['perlas'] },
}
