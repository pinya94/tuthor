// Datos de los 7 órganos para el juego Rayos X (src/pages/RayosX.jsx) y su
// lógica (src/lib/rayosX.js). Mismo espíritu que planetas.js para Órbita: el
// `dato` es un hecho concreto y verificable, no una curiosidad vaga.
//
// Posición (x,y) en el sistema de coordenadas de SiluetaCuerpo.jsx —
// coincide con el viewBox nativo de public/img/cuerpo-humano.svg
// (0 0 147.998 318.455, vista frontal real, no un dibujo a mano). Cubren
// los 4 sistemas que ya trata el examen teórico de Cuerpo Humano
// (src/data/cuerpoHumano.js): nervioso, circulatorio, respiratorio y
// digestivo.
function organo(id, sistema, x, y, color, nombre, funcion, dato) {
  return { id, sistema, x, y, color, nombre, funcion, dato }
}

export const SISTEMAS = {
  nervioso:     { es: 'Sistema Nervioso',     en: 'Nervous System',     ca: 'Sistema Nerviós' },
  circulatorio: { es: 'Sistema Circulatorio', en: 'Circulatory System', ca: 'Sistema Circulatori' },
  respiratorio: { es: 'Sistema Respiratorio', en: 'Respiratory System', ca: 'Sistema Respiratori' },
  digestivo:    { es: 'Sistema Digestivo',    en: 'Digestive System',   ca: 'Sistema Digestiu' },
}

// Orden de arriba abajo del cuerpo (cabeza → pecho → abdomen), como los
// planetas van de más cerca a más lejos del Sol.
export const ORGANOS = [
  organo('cerebro', 'nervioso', 74, 25.5, '#a78bfa',
    { es: 'Cerebro', en: 'Brain', ca: 'Cervell' },
    { es: 'Controla todo el cuerpo y procesa la información de los sentidos.', en: 'Controls the whole body and processes information from the senses.', ca: 'Controla tot el cos i processa la informació dels sentits.' },
    { es: 'Consume cerca del 20% de la energía diaria del cuerpo aunque pesa solo un 2% del peso corporal.', en: 'It uses about 20% of the body\'s daily energy despite weighing only 2% of body weight.', ca: 'Consumeix prop del 20% de l\'energia diària del cos tot i pesar només un 2% del pes corporal.' }),

  organo('pulmones', 'respiratorio', 74, 68.8, '#60a5fa',
    { es: 'Pulmones', en: 'Lungs', ca: 'Pulmons' },
    { es: 'Intercambian oxígeno y dióxido de carbono con la sangre al respirar.', en: 'Exchange oxygen and carbon dioxide with the blood when breathing.', ca: 'Intercanvien oxigen i diòxid de carboni amb la sang en respirar.' },
    { es: 'Si se estirara toda su superficie interna, cubriría casi una pista de tenis: unos 70 metros cuadrados.', en: 'If their whole inner surface were unfolded, it would cover almost a tennis court: about 70 square metres.', ca: 'Si s\'estirés tota la seva superfície interna, cobriria gairebé una pista de tennis: uns 70 metres quadrats.' }),

  organo('corazon', 'circulatorio', 62.2, 88.2, '#f87171',
    { es: 'Corazón', en: 'Heart', ca: 'Cor' },
    { es: 'Bombea la sangre por todo el cuerpo a través de venas y arterias.', en: 'Pumps blood around the whole body through veins and arteries.', ca: 'Bombeja la sang per tot el cos a través de venes i artèries.' },
    { es: 'Late unas 100.000 veces al día, bombeando la sangre a través de casi 100.000 km de vasos sanguíneos.', en: 'It beats around 100,000 times a day, pumping blood through nearly 100,000 km of blood vessels.', ca: 'Batega unes 100.000 vegades al dia, bombejant la sang a través de gairebé 100.000 km de vasos sanguinis.' }),

  organo('diafragma', 'respiratorio', 74, 108, '#38bdf8',
    { es: 'Diafragma', en: 'Diaphragm', ca: 'Diafragma' },
    { es: 'Músculo que se contrae y relaja para impulsar la respiración.', en: 'Muscle that contracts and relaxes to drive breathing.', ca: 'Múscul que es contrau i relaxa per impulsar la respiració.' },
    { es: 'Al contraerse baja y aplana su forma de cúpula, dejando más espacio a los pulmones para llenarse de aire.', en: 'When it contracts it flattens its dome shape, leaving more room for the lungs to fill with air.', ca: 'En contraure\'s baixa i aplana la seva forma de cúpula, deixant més espai als pulmons per omplir-se d\'aire.' }),

  organo('estomago', 'digestivo', 59.2, 120.7, '#fb923c',
    { es: 'Estómago', en: 'Stomach', ca: 'Estómac' },
    { es: 'Descompone los alimentos con ácido y enzimas digestivas.', en: 'Breaks down food with acid and digestive enzymes.', ca: 'Descompon els aliments amb àcid i enzims digestius.' },
    { es: 'Su ácido gástrico tiene un pH tan bajo como 1,5 — capaz de disolver metal, aunque el propio estómago se protege con una capa de moco.', en: 'Its gastric acid can have a pH as low as 1.5 — strong enough to dissolve metal, though the stomach itself is protected by a layer of mucus.', ca: 'El seu àcid gàstric pot tenir un pH tan baix com 1,5 — capaç de dissoldre metall, tot i que el mateix estómac es protegeix amb una capa de moc.' }),

  organo('higado', 'digestivo', 88.8, 120.7, '#c2884d',
    { es: 'Hígado', en: 'Liver', ca: 'Fetge' },
    { es: 'Filtra la sangre y produce bilis para digerir las grasas.', en: 'Filters the blood and produces bile to digest fats.', ca: 'Filtra la sang i produeix bilis per digerir els greixos.' },
    { es: 'Es el único órgano interno capaz de regenerarse: puede recuperar su tamaño incluso perdiendo hasta un 75%.', en: 'It is the only internal organ that can regenerate: it can recover its size even after losing up to 75% of it.', ca: 'És l\'únic òrgan intern capaç de regenerar-se: pot recuperar la seva mida encara que en perdi fins a un 75%.' }),

  organo('intestinos', 'digestivo', 74, 153.1, '#fbbf24',
    { es: 'Intestinos', en: 'Intestines', ca: 'Intestins' },
    { es: 'Absorben los nutrientes y el agua de los alimentos ya digeridos.', en: 'Absorb nutrients and water from already-digested food.', ca: 'Absorbeixen els nutrients i l\'aigua dels aliments ja digerits.' },
    { es: 'El intestino delgado mide unos 6-7 metros — más largo que el propio cuerpo, enrollado para caber en el abdomen.', en: 'The small intestine is about 6-7 metres long — longer than the body itself, coiled up to fit inside the abdomen.', ca: 'L\'intestí prim fa uns 6-7 metres — més llarg que el propi cos, enrotllat per cabre dins l\'abdomen.' }),
]

export function getOrgano(id) {
  return ORGANOS.find(o => o.id === id)
}
