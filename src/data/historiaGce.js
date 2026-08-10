// Guerra Civil Española — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-guerra-civil.js)
// para que examen y ficha cuenten la misma historia.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('gce-01', 'eso',
    { es: '¿Cuándo empezó la Guerra Civil Española?', en: 'When did the Spanish Civil War begin?', ca: 'Quan va començar la Guerra Civil Espanyola?' },
    { es: ['17-18 de julio de 1936', '1 de abril de 1939', '1931', '1975'], en: ['17-18 July 1936', '1 April 1939', '1931', '1975'], ca: ['17-18 de juliol de 1936', '1 d\'abril de 1939', '1931', '1975'] },
    { es: '17-18 de julio de 1936', en: '17-18 July 1936', ca: '17-18 de juliol de 1936' },
    '⚔️',
    { es: 'El golpe de estado militar liderado por Mola y Franco los días 17 y 18 de julio de 1936 fracasó solo parcialmente: dividió España en dos y dio comienzo a la guerra.', en: 'The military coup led by Mola and Franco on 17–18 July 1936 only partly failed: it split Spain in two and started the war.', ca: 'El cop d\'estat militar liderat per Mola i Franco els dies 17 i 18 de juliol de 1936 va fracassar només parcialment: va dividir Espanya en dos i va començar la guerra.' }),

  q('gce-02', 'eso',
    { es: '¿Quién lideró el bando sublevado (nacional)?', en: 'Who led the rebel (Nationalist) side?', ca: 'Qui va liderar el bàndol revoltat (nacional)?' },
    { es: ['Francisco Franco', 'Manuel Azaña', 'Largo Caballero', 'Juan Negrín'], en: ['Francisco Franco', 'Manuel Azaña', 'Largo Caballero', 'Juan Negrín'], ca: ['Francisco Franco', 'Manuel Azaña', 'Largo Caballero', 'Juan Negrín'] },
    { es: 'Francisco Franco', en: 'Francisco Franco', ca: 'Francisco Franco' },
    '🎖️',
    { es: 'El general Francisco Franco lideró el bando nacional sublevado contra el gobierno legítimo de la Segunda República y gobernó España como dictador desde el fin de la guerra hasta 1975.', en: 'General Francisco Franco led the rebel Nationalist side against the legitimate government of the Second Republic and ruled Spain as dictator from the end of the war until 1975.', ca: 'El general Francisco Franco va liderar el bàndol nacional revoltat contra el govern legítim de la Segona República i va governar Espanya com a dictador des del final de la guerra fins al 1975.' }),

  q('gce-03', 'eso',
    { es: '¿Qué ciudad resistió durante toda la guerra bajo el lema "¡No pasarán!"?', en: 'Which city held out throughout the war under the slogan "They shall not pass!"?', ca: 'Quina ciutat va resistir durant tota la guerra sota el lema "No pasaran!"?' },
    { es: ['Madrid', 'Barcelona', 'Sevilla', 'Bilbao'], en: ['Madrid', 'Barcelona', 'Seville', 'Bilbao'], ca: ['Madrid', 'Barcelona', 'Sevilla', 'Bilbao'] },
    { es: 'Madrid', en: 'Madrid', ca: 'Madrid' },
    '🏙️',
    { es: 'Madrid resistió el asedio de las tropas franquistas desde noviembre de 1936 hasta el final mismo de la guerra, en 1939.', en: 'Madrid withstood the siege by Francoist troops from November 1936 until the very end of the war in 1939.', ca: 'Madrid va resistir el setge de les tropes franquistes des del novembre de 1936 fins al final mateix de la guerra, el 1939.' }),

  q('gce-04', 'eso',
    { es: '¿Qué pueblo fue bombardeado por la Legión Cóndor alemana en 1937?', en: 'Which town was bombed by the German Condor Legion in 1937?', ca: 'Quin poble va ser bombardejat per la Legió Còndor alemanya el 1937?' },
    { es: ['Guernica', 'Toledo', 'Teruel', 'Badajoz'], en: ['Guernica', 'Toledo', 'Teruel', 'Badajoz'], ca: ['Guernica', 'Toledo', 'Teruel', 'Badajoz'] },
    { es: 'Guernica', en: 'Guernica', ca: 'Guernica' },
    '💥',
    { es: 'El bombardeo de Guernica, en abril de 1937, se convirtió en símbolo del horror de la guerra e inspiró el famoso cuadro de Pablo Picasso.', en: 'The bombing of Guernica in April 1937 became a symbol of the horror of the war and inspired Pablo Picasso\'s famous painting.', ca: 'El bombardeig de Gernika, l\'abril de 1937, es va convertir en símbol de l\'horror de la guerra i va inspirar el famós quadre de Pablo Picasso.' }),

  q('gce-05', 'eso',
    { es: '¿Cuál fue la batalla más larga y sangrienta de la Guerra Civil?', en: 'What was the longest and bloodiest battle of the Civil War?', ca: 'Quina va ser la batalla més llarga i sagnant de la Guerra Civil?' },
    { es: ['Batalla del Ebro', 'Batalla de Madrid', 'Batalla de Teruel', 'Batalla de Guadalajara'], en: ['Battle of the Ebro', 'Battle of Madrid', 'Battle of Teruel', 'Battle of Guadalajara'], ca: ['Batalla de l\'Ebre', 'Batalla de Madrid', 'Batalla de Terol', 'Batalla de Guadalajara'] },
    { es: 'Batalla del Ebro', en: 'Battle of the Ebro', ca: 'Batalla de l\'Ebre' },
    '🌊',
    { es: 'La Batalla del Ebro (1938) fue la más larga y sangrienta del conflicto; el desgaste del bando republicano tras ella resultó decisivo para el desenlace de la guerra.', en: 'The Battle of the Ebro (1938) was the longest and bloodiest of the conflict; the Republican attrition that followed proved decisive for the outcome of the war.', ca: 'La Batalla de l\'Ebre (1938) va ser la més llarga i sagnant del conflicte; el desgast del bàndol republicà després d\'aquesta va resultar decisiu per al desenllaç de la guerra.' }),

  q('gce-06', 'eso',
    { es: '¿Cuándo terminó la guerra y comenzó la dictadura franquista?', en: 'When did the war end and the Francoist dictatorship begin?', ca: 'Quan va acabar la guerra i va començar la dictadura franquista?' },
    { es: ['1 de abril de 1939', '18 de julio de 1936', '1975', '1931'], en: ['1 April 1939', '18 July 1936', '1975', '1931'], ca: ['1 d\'abril de 1939', '18 de juliol de 1936', '1975', '1931'] },
    { es: '1 de abril de 1939', en: '1 April 1939', ca: '1 d\'abril de 1939' },
    '📅',
    { es: 'Franco declaró el fin de la guerra el 1 de abril de 1939 y a partir de ahí comenzó una dictadura que duraría casi cuarenta años, hasta su muerte en 1975.', en: 'Franco declared the end of the war on 1 April 1939, beginning a dictatorship that would last almost forty years, until his death in 1975.', ca: 'Franco va declarar el final de la guerra l\'1 d\'abril de 1939 i a partir d\'aquí va començar una dictadura que duraria gairebé quaranta anys, fins a la seva mort el 1975.' }),

  q('gce-07', 'eso',
    { es: '¿Cómo se llamaba el gobierno legítimo al que se enfrentaban los sublevados?', en: 'What was the legitimate government the rebels fought against called?', ca: 'Com es deia el govern legítim al qual s\'enfrontaven els revoltats?' },
    { es: ['Segunda República', 'Primera República', 'Monarquía Constitucional', 'Directorio Militar'], en: ['The Second Republic', 'The First Republic', 'Constitutional Monarchy', 'Military Directory'], ca: ['Segona República', 'Primera República', 'Monarquia Constitucional', 'Directori Militar'] },
    { es: 'Segunda República', en: 'The Second Republic', ca: 'Segona República' },
    '🏛️',
    { es: 'La Segunda República era el gobierno legítimo de España, proclamado en 1931, al que se enfrentó el bando nacional sublevado en 1936.', en: 'The Second Republic was the legitimate government of Spain, proclaimed in 1931, which the rebel Nationalist side fought against in 1936.', ca: 'La Segona República era el govern legítim d\'Espanya, proclamat el 1931, al qual es va enfrontar el bàndol nacional revoltat el 1936.' }),

  q('gce-08', 'eso',
    { es: '¿Qué pintor retrató el horror del bombardeo de Guernica en un cuadro famoso?', en: 'Which painter depicted the horror of the bombing of Guernica in a famous painting?', ca: 'Quin pintor va retratar l\'horror del bombardeig de Gernika en un quadre famós?' },
    { es: ['Pablo Picasso', 'Salvador Dalí', 'Francisco de Goya', 'Joan Miró'], en: ['Pablo Picasso', 'Salvador Dalí', 'Francisco de Goya', 'Joan Miró'], ca: ['Pablo Picasso', 'Salvador Dalí', 'Francisco de Goya', 'Joan Miró'] },
    { es: 'Pablo Picasso', en: 'Pablo Picasso', ca: 'Pablo Picasso' },
    '🎨',
    { es: 'El "Guernica" de Picasso, pintado en 1937, es una de las obras más famosas del arte del siglo XX y un alegato contra los horrores de la guerra.', en: 'Picasso\'s "Guernica", painted in 1937, is one of the most famous works of 20th-century art and a statement against the horrors of war.', ca: 'El "Guernica" de Picasso, pintat el 1937, és una de les obres més famoses de l\'art del segle XX i un al·legat contra els horrors de la guerra.' }),

  // ── Bachillerato: además de lo anterior, causas estructurales y contexto internacional ──
  q('gce-09', 'bachillerato',
    { es: '¿Qué dos países apoyaron militarmente al bando nacional?', en: 'Which two countries gave the Nationalist side military support?', ca: 'Quins dos països van donar suport militar al bàndol nacional?' },
    { es: ['Alemania nazi e Italia fascista', 'Reino Unido y Francia', 'Estados Unidos y Portugal', 'URSS y México'], en: ['Nazi Germany and Fascist Italy', 'Britain and France', 'The USA and Portugal', 'The USSR and Mexico'], ca: ['Alemanya nazi i Itàlia feixista', 'Regne Unit i França', 'Estats Units i Portugal', 'URSS i Mèxic'] },
    { es: 'Alemania nazi e Italia fascista', en: 'Nazi Germany and Fascist Italy', ca: 'Alemanya nazi i Itàlia feixista' },
    '🌍',
    { es: 'La Alemania nazi y la Italia fascista apoyaron a los sublevados con aviación y tropas, convirtiendo la guerra en un ensayo de lo que sería la Segunda Guerra Mundial.', en: 'Nazi Germany and Fascist Italy backed the rebels with aircraft and troops, turning the war into a rehearsal for what would become the Second World War.', ca: 'L\'Alemanya nazi i la Itàlia feixista van donar suport als revoltats amb aviació i tropes, convertint la guerra en un assaig del que seria la Segona Guerra Mundial.' }),

  q('gce-10', 'bachillerato',
    { es: '¿Qué voluntarios extranjeros lucharon junto al bando republicano?', en: 'Which foreign volunteers fought alongside the Republican side?', ca: 'Quins voluntaris estrangers van lluitar al costat del bàndol republicà?' },
    { es: ['Las Brigadas Internacionales', 'La Legión Cóndor', 'Los Camisas Negras', 'La Legión Extranjera'], en: ['The International Brigades', 'The Condor Legion', 'The Blackshirts', 'The Foreign Legion'], ca: ['Les Brigades Internacionals', 'La Legió Còndor', 'Les Camises Negres', 'La Legió Estrangera'] },
    { es: 'Las Brigadas Internacionales', en: 'The International Brigades', ca: 'Les Brigades Internacionals' },
    '🌐',
    { es: 'Miles de voluntarios de todo el mundo, organizados en las Brigadas Internacionales, viajaron a España para luchar junto a la República, con el apoyo también de la Unión Soviética.', en: 'Thousands of volunteers from around the world, organised into the International Brigades, travelled to Spain to fight alongside the Republic, with additional support from the Soviet Union.', ca: 'Milers de voluntaris de tot el món, organitzats a les Brigades Internacionals, van viatjar a Espanya per lluitar al costat de la República, amb el suport també de la Unió Soviètica.' }),

  q('gce-11', 'bachillerato',
    { es: '¿En qué año se proclamó la Segunda República española?', en: 'In what year was the Spanish Second Republic proclaimed?', ca: 'En quin any es va proclamar la Segona República espanyola?' },
    { es: ['1931', '1936', '1923', '1898'], en: ['1931', '1936', '1923', '1898'], ca: ['1931', '1936', '1923', '1898'] },
    { es: '1931', en: '1931', ca: '1931' },
    '🗳️',
    { es: 'La Segunda República se proclamó en 1931 tras las elecciones municipales, abriendo un periodo de reformas y de fuerte polarización política que desembocaría en la guerra.', en: 'The Second Republic was proclaimed in 1931 after the municipal elections, opening a period of reform and intense political polarisation that would lead to the war.', ca: 'La Segona República es va proclamar el 1931 després de les eleccions municipals, obrint un període de reformes i de forta polarització política que desembocaria en la guerra.' }),

  q('gce-12', 'bachillerato',
    { es: '¿Qué coalición ganó las elecciones de febrero de 1936, disparando la tensión política?', en: 'Which coalition won the February 1936 elections, sending political tension soaring?', ca: 'Quina coalició va guanyar les eleccions de febrer de 1936, disparant la tensió política?' },
    { es: ['El Frente Popular', 'La CEDA', 'El Frente Nacional', 'La Falange'], en: ['The Popular Front', 'The CEDA', 'The National Front', 'The Falange'], ca: ['El Front Popular', 'La CEDA', 'El Front Nacional', 'La Falange'] },
    { es: 'El Frente Popular', en: 'The Popular Front', ca: 'El Front Popular' },
    '🗳️',
    { es: 'El Frente Popular, una coalición de izquierdas, ganó las elecciones de febrero de 1936. Es fácil confundirlo con el "Frente Nacional" de los sublevados, pero son bandos opuestos.', en: 'The Popular Front, a left-wing coalition, won the February 1936 elections. It is easy to confuse it with the rebels\' "National Front", but they were opposing sides.', ca: 'El Front Popular, una coalició d\'esquerres, va guanyar les eleccions de febrer de 1936. És fàcil confondre\'l amb el "Front Nacional" dels revoltats, però són bàndols oposats.' }),

  q('gce-13', 'bachillerato',
    { es: '¿Cómo se conoce popularmente a Dolores Ibárruri, destacada oradora del bando republicano?', en: 'What is Dolores Ibárruri, a prominent Republican orator, popularly known as?', ca: 'Com es coneix popularment Dolores Ibárruri, destacada oradora del bàndol republicà?' },
    { es: ['La Pasionaria', 'La Dama de Elche', 'La Bella Otero', 'La Malinche'], en: ['La Pasionaria', 'La Dama de Elche', 'La Bella Otero', 'La Malinche'], ca: ['La Pasionaria', 'La Dama d\'Elx', 'La Bella Otero', 'La Malinche'] },
    { es: 'La Pasionaria', en: 'La Pasionaria', ca: 'La Pasionaria' },
    '📢',
    { es: 'Dolores Ibárruri, conocida como "La Pasionaria", fue una destacada dirigente comunista y una de las voces más reconocibles del bando republicano.', en: 'Dolores Ibárruri, known as "La Pasionaria", was a prominent Communist leader and one of the most recognisable voices of the Republican side.', ca: 'Dolores Ibárruri, coneguda com "La Pasionaria", va ser una destacada dirigent comunista i una de les veus més reconeixibles del bàndol republicà.' }),

  q('gce-14', 'bachillerato',
    { es: '¿Qué revuelta de 1934 anticipó la polarización que llevaría a la guerra?', en: 'Which 1934 uprising foreshadowed the polarisation that would lead to the war?', ca: 'Quina revolta del 1934 va anticipar la polarització que portaria a la guerra?' },
    { es: ['La Revolución de Asturias', 'El Motín de Aranjuez', 'La Semana Trágica', 'El Pronunciamiento de Sagunto'], en: ['The Asturian Revolution', 'The Aranjuez Mutiny', 'Tragic Week', 'The Sagunto Pronouncement'], ca: ['La Revolució d\'Astúries', 'El Motí d\'Aranjuez', 'La Setmana Tràgica', 'El Pronunciament de Sagunt'] },
    { es: 'La Revolución de Asturias', en: 'The Asturian Revolution', ca: 'La Revolució d\'Astúries' },
    '⛏️',
    { es: 'La Revolución de Asturias de 1934, una insurrección obrera duramente reprimida, es una de las causas estructurales que los historiadores señalan como antecedente de la polarización de 1936.', en: 'The 1934 Asturian Revolution, a workers\' uprising that was harshly repressed, is one of the structural causes historians point to as a precursor of the 1936 polarisation.', ca: 'La Revolució d\'Astúries de 1934, una insurrecció obrera durament reprimida, és una de les causes estructurals que els historiadors assenyalen com a antecedent de la polarització de 1936.' }),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
