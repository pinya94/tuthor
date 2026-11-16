// Sexta tanda (16-nov-2026): las páginas finas de física y química que más
// impresiones tienen en Search Console (calor y temperatura 326, formulación
// ~150, enlace químico 104, química orgánica 50, máquinas 50, estequiometría
// 45, tabla periódica 43, átomos y moléculas 31). Se suman en AMPLIACION.
// Formulación sigue las reglas de Nombra el Compuesto (Stock y prefijos,
// tradicional en oxoácidos, nada de óxidos de cloro); enlace, las de ¿Qué
// Enlace? (sin casos dudosos como el AlCl₃).
const T = (es, en, ca) => ({ es, en, ca })
const L = T

const calor = {
  metaTitle: L('Calor y temperatura: diferencia, escalas Celsius, Kelvin y Fahrenheit, Q = m · c · ΔT — resumen y ejercicios', 'Heat and temperature: the difference, Celsius, Kelvin and Fahrenheit, Q = m · c · ΔT — summary and practice', 'Calor i temperatura: diferència, escales Celsius, Kelvin i Fahrenheit, Q = m · c · ΔT — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las escalas de temperatura', 'Temperature scales', 'Les escales de temperatura'),
      tabla: {
        columnas: L(['Escala', 'El agua se congela', 'El agua hierve', 'Para pasar desde °C'], ['Scale', 'Water freezes', 'Water boils', 'From °C'], ['Escala', 'L’aigua es congela', 'L’aigua bull', 'Per passar des de °C']),
        filas: [
          ['Celsius (°C)', '0 °C', '100 °C', '—'],
          ['Kelvin (K)', '273 K', '373 K', L('K = °C + 273 (273,15 exactos)', 'K = °C + 273 (273.15 exactly)', 'K = °C + 273 (273,15 exactes)')],
          ['Fahrenheit (°F)', '32 °F', '212 °F', '°F = 1,8 · °C + 32'],
        ],
      },
      texto: L(
        ['La temperatura mide lo deprisa que se mueven, de media, las partículas de un cuerpo; el calor es la energía que pasa de un cuerpo caliente a uno frío hasta que igualan su temperatura (equilibrio térmico). Por eso un cuerpo «tiene» temperatura, pero no «tiene» calor: el calor solo existe mientras pasa. En el cero absoluto (0 K = −273,15 °C) las partículas apenas se moverían, y no se puede bajar de ahí.'],
        ['Temperature measures how fast, on average, the particles in an object are moving; heat is the energy that flows from a hot object to a cold one until they reach the same temperature (thermal equilibrium). So an object «has» a temperature, but it does not «have» heat: heat only exists while it is flowing. At absolute zero (0 K = −273.15 °C) particles would barely move, and nothing can get colder.'],
        ['La temperatura mesura com de pressa es mouen, de mitjana, les partícules d’un cos; la calor és l’energia que passa d’un cos calent a un de fred fins que igualen la temperatura (equilibri tèrmic). Per això un cos «té» temperatura, però no «té» calor: la calor només existeix mentre passa. Al zero absolut (0 K = −273,15 °C) les partícules gairebé no es mourien, i no es pot baixar més.'],
      ),
    },
    {
      titulo: L('Fórmulas del calor', 'Heat formulas', 'Fórmules de la calor'),
      tabla: {
        columnas: L(['Qué se calcula', 'Fórmula', 'Datos útiles'], ['What you work out', 'Formula', 'Useful data'], ['Què es calcula', 'Fórmula', 'Dades útils']),
        filas: [
          [L('Calor para cambiar la temperatura', 'Heat to change temperature', 'Calor per canviar la temperatura'), 'Q = m · c · ΔT', L('c del agua = 4.180 J/(kg · °C)', 'c of water = 4,180 J/(kg · °C)', 'c de l’aigua = 4.180 J/(kg · °C)')],
          [L('Calor para cambiar de estado', 'Heat to change state', 'Calor per canviar d’estat'), 'Q = m · L', L('fusión del hielo: 334.000 J/kg', 'melting ice: 334,000 J/kg', 'fusió del gel: 334.000 J/kg')],
          [L('Equilibrio al mezclar', 'Equilibrium when mixing', 'Equilibri en barrejar'), L('calor que cede el caliente = calor que gana el frío', 'heat lost by the hot one = heat gained by the cold one', 'calor que cedeix el calent = calor que guanya el fred'), L('con la misma sustancia y masa, la final es la media', 'same substance and mass: the final temperature is the average', 'amb la mateixa substància i massa, la final és la mitjana')],
        ],
      },
      lista: L(
        ['Conducción: el calor pasa por contacto, de partícula en partícula (una cuchara en la sopa). Los metales conducen bien; la madera y el aire, mal (aislantes).', 'Convección: el fluido caliente sube y el frío baja (el agua de una olla, el aire de un radiador).', 'Radiación: el calor viaja como ondas, incluso por el vacío (el calor del Sol).'],
        ['Conduction: heat passes by contact, particle to particle (a spoon in soup). Metals conduct well; wood and air conduct poorly (insulators).', 'Convection: hot fluid rises and cold fluid sinks (water in a pan, air from a radiator).', 'Radiation: heat travels as waves, even through a vacuum (heat from the Sun).'],
        ['Conducció: la calor passa per contacte, de partícula en partícula (una cullera a la sopa). Els metalls condueixen bé; la fusta i l’aire, malament (aïllants).', 'Convecció: el fluid calent puja i el fred baixa (l’aigua d’una olla, l’aire d’un radiador).', 'Radiació: la calor viatja com a ones, fins i tot pel buit (la calor del Sol).'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Pasa 25 °C a kelvin y 100 °F a grados Celsius.', 'Convert 25 °C to kelvin and 100 °F to degrees Celsius.', 'Passa 25 °C a kelvin i 100 °F a graus Celsius.'),
      s: T('25 + 273 = 298 K. °C = (100 − 32) / 1,8 ≈ 37,8 °C.', '25 + 273 = 298 K. °C = (100 − 32) / 1.8 ≈ 37.8 °C.', '25 + 273 = 298 K. °C = (100 − 32) / 1,8 ≈ 37,8 °C.') },
    { e: T('¿Cuánto calor hace falta para calentar 2 kg de agua de 20 °C a 70 °C?', 'How much heat is needed to warm 2 kg of water from 20 °C to 70 °C?', 'Quanta calor cal per escalfar 2 kg d’aigua de 20 °C a 70 °C?'),
      s: T('Q = 2 · 4.180 · 50 = 418.000 J.', 'Q = 2 · 4,180 · 50 = 418,000 J.', 'Q = 2 · 4.180 · 50 = 418.000 J.') },
    { e: T('Se mezcla 1 kg de agua a 80 °C con 1 kg de agua a 20 °C. ¿A qué temperatura queda?', '1 kg of water at 80 °C is mixed with 1 kg of water at 20 °C. What is the final temperature?', 'Es barreja 1 kg d’aigua a 80 °C amb 1 kg d’aigua a 20 °C. A quina temperatura queda?'),
      s: T('Misma sustancia y misma masa: la media, (80 + 20) / 2 = 50 °C.', 'Same substance and same mass: the average, (80 + 20) / 2 = 50 °C.', 'Mateixa substància i mateixa massa: la mitjana, (80 + 20) / 2 = 50 °C.') },
    { e: T('¿Cuánto calor hace falta para fundir 200 g de hielo a 0 °C?', 'How much heat is needed to melt 200 g of ice at 0 °C?', 'Quanta calor cal per fondre 200 g de gel a 0 °C?'),
      s: T('Q = m · L = 0,2 · 334.000 = 66.800 J. Mientras se funde, la temperatura sigue en 0 °C.', 'Q = m · L = 0.2 · 334,000 = 66,800 J. While it melts, the temperature stays at 0 °C.', 'Q = m · L = 0,2 · 334.000 = 66.800 J. Mentre es fon, la temperatura es manté a 0 °C.') },
  ],
}

const formulacion = {
  metaTitle: L('Formulación inorgánica: óxidos, hidruros, hidróxidos, ácidos y sales (Stock y prefijos) — resumen y ejercicios', 'Inorganic nomenclature: oxides, hydrides, hydroxides, acids and salts — summary and practice questions', 'Formulació inorgànica: òxids, hidrurs, hidròxids, àcids i sals (Stock i prefixos) — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los tipos de compuestos', 'Types of compound', 'Els tipus de compostos'),
      tabla: {
        columnas: L(['Tipo', 'Qué lleva', 'Ejemplo', 'Nombre'], ['Type', 'What it contains', 'Example', 'Name'], ['Tipus', 'Què porta', 'Exemple', 'Nom']),
        filas: [
          [L('Óxido metálico', 'Metal oxide', 'Òxid metàl·lic'), L('metal + oxígeno', 'metal + oxygen', 'metall + oxigen'), 'Fe₂O₃', L('óxido de hierro(III) o trióxido de dihierro', 'iron(III) oxide', 'òxid de ferro(III) o triòxid de diferro')],
          [L('Óxido no metálico', 'Non-metal oxide', 'Òxid no metàl·lic'), L('no metal + oxígeno', 'non-metal + oxygen', 'no metall + oxigen'), 'CO₂', L('dióxido de carbono', 'carbon dioxide', 'diòxid de carboni')],
          [L('Hidruro metálico', 'Metal hydride', 'Hidrur metàl·lic'), L('metal + hidrógeno', 'metal + hydrogen', 'metall + hidrogen'), 'NaH', L('hidruro de sodio', 'sodium hydride', 'hidrur de sodi')],
          [L('Hidrácido', 'Hydrogen halide / acid', 'Hidràcid'), L('hidrógeno + F, Cl, Br, I o S', 'hydrogen + F, Cl, Br, I or S', 'hidrogen + F, Cl, Br, I o S'), 'HCl', L('cloruro de hidrógeno (en agua, ácido clorhídrico)', 'hydrogen chloride (in water, hydrochloric acid)', 'clorur d’hidrogen (en aigua, àcid clorhídric)')],
          [L('Hidróxido', 'Hydroxide', 'Hidròxid'), L('metal + grupo OH', 'metal + OH group', 'metall + grup OH'), 'Ca(OH)₂', L('hidróxido de calcio', 'calcium hydroxide', 'hidròxid de calci')],
          [L('Oxoácido', 'Oxoacid', 'Oxoàcid'), L('hidrógeno + no metal + oxígeno', 'hydrogen + non-metal + oxygen', 'hidrogen + no metall + oxigen'), 'H₂SO₄', L('ácido sulfúrico', 'sulfuric acid', 'àcid sulfúric')],
          [L('Sal binaria', 'Binary salt', 'Sal binària'), L('metal + no metal', 'metal + non-metal', 'metall + no metall'), 'NaCl', L('cloruro de sodio', 'sodium chloride', 'clorur de sodi')],
          [L('Oxisal', 'Oxysalt', 'Oxisal'), L('metal + anión de un oxoácido', 'metal + anion of an oxoacid', 'metall + anió d’un oxoàcid'), 'CaCO₃', L('carbonato de calcio', 'calcium carbonate', 'carbonat de calci')],
        ],
      },
    },
    {
      titulo: L('Cómo se escribe la fórmula: el cruce de valencias', 'How to write the formula: crossing over the valencies', 'Com s’escriu la fórmula: l’encreuament de valències'),
      lista: L(
        ['Se escribe primero el elemento menos electronegativo (el metal) y después el más electronegativo (el oxígeno o el no metal).', 'La valencia de cada uno pasa como subíndice al otro: Al (3) y O (2) → Al₂O₃.', 'Si los dos subíndices se pueden dividir, se simplifican: Ca (2) y O (2) → Ca₂O₂ → CaO. En los peróxidos (H₂O₂) no se simplifica.', 'En Stock, la valencia del metal va en números romanos solo si tiene más de una: óxido de hierro(III), pero óxido de sodio.', 'Valencias más usadas: Na, K, Ag 1; Ca, Mg, Zn 2; Al 3; Fe 2 y 3; Cu 1 y 2; O −2; Cl, Br, I −1 (con metales); S −2 (con metales).'],
        ['Write the less electronegative element first (the metal), then the more electronegative one (oxygen or the non-metal).', 'Each element’s valency becomes the other’s subscript: Al (3) and O (2) → Al₂O₃.', 'If both subscripts can be divided, simplify: Ca (2) and O (2) → Ca₂O₂ → CaO. Peroxides (H₂O₂) are not simplified.', 'In Stock naming, the metal’s valency goes in Roman numerals only if it has more than one: iron(III) oxide, but sodium oxide.', 'Most common valencies: Na, K, Ag 1; Ca, Mg, Zn 2; Al 3; Fe 2 and 3; Cu 1 and 2; O −2; Cl, Br, I −1 (with metals); S −2 (with metals).'],
        ['S’escriu primer l’element menys electronegatiu (el metall) i després el més electronegatiu (l’oxigen o el no metall).', 'La valència de cadascun passa com a subíndex a l’altre: Al (3) i O (2) → Al₂O₃.', 'Si els dos subíndexs es poden dividir, se simplifiquen: Ca (2) i O (2) → Ca₂O₂ → CaO. En els peròxids (H₂O₂) no se simplifica.', 'En Stock, la valència del metall va en nombres romans només si en té més d’una: òxid de ferro(III), però òxid de sodi.', 'Valències més usades: Na, K, Ag 1; Ca, Mg, Zn 2; Al 3; Fe 2 i 3; Cu 1 i 2; O −2; Cl, Br, I −1 (amb metalls); S −2 (amb metalls).'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Formula el óxido de aluminio.', 'Write the formula of aluminium oxide.', 'Formula l’òxid d’alumini.'),
      s: T('Al (3) y O (2): se cruzan → Al₂O₃.', 'Al (3) and O (2) cross over → Al₂O₃.', 'Al (3) i O (2): s’encreuen → Al₂O₃.') },
    { e: T('Nombra FeCl₃ de dos formas.', 'Name FeCl₃.', 'Anomena FeCl₃ de dues maneres.'),
      s: T('Cloruro de hierro(III) (Stock) o tricloruro de hierro (prefijos). El hierro actúa con valencia 3 porque hay tres Cl de valencia 1.', 'Iron(III) chloride. Iron has valency 3 here because there are three Cl atoms of valency 1.', 'Clorur de ferro(III) (Stock) o triclorur de ferro (prefixos). El ferro actua amb valència 3 perquè hi ha tres Cl de valència 1.') },
    { e: T('Formula el hidróxido de sodio y el sulfuro de hierro(II).', 'Write the formulas of sodium hydroxide and iron(II) sulfide.', 'Formula l’hidròxid de sodi i el sulfur de ferro(II).'),
      s: T('NaOH (Na 1 y OH 1). FeS (Fe 2 y S 2 → Fe₂S₂ → simplificado FeS).', 'NaOH (Na 1 and OH 1). FeS (Fe 2 and S 2 → Fe₂S₂ → simplified to FeS).', 'NaOH (Na 1 i OH 1). FeS (Fe 2 i S 2 → Fe₂S₂ → simplificat FeS).') },
    { e: T('Nombra con prefijos N₂O₅.', 'Name N₂O₅.', 'Anomena amb prefixos N₂O₅.'),
      s: T('Pentaóxido de dinitrógeno.', 'Dinitrogen pentoxide.', 'Pentaòxid de dinitrogen.') },
    { e: T('Nombra CuO.', 'Name CuO.', 'Anomena CuO.'),
      s: T('Óxido de cobre(II): el cobre tiene valencias 1 y 2, y aquí actúa con 2 (CuO viene de Cu₂O₂ simplificado).', 'Copper(II) oxide: copper has valencies 1 and 2, and here it uses 2 (CuO comes from Cu₂O₂ simplified).', 'Òxid de coure(II): el coure té valències 1 i 2, i aquí actua amb 2 (CuO ve de Cu₂O₂ simplificat).') },
  ],
}

const enlace = {
  metaTitle: L('El enlace químico: iónico, covalente y metálico, regla del octeto y propiedades — resumen y ejercicios', 'Chemical bonding: ionic, covalent and metallic bonds, the octet rule and properties — summary and practice', 'L’enllaç químic: iònic, covalent i metàl·lic, regla de l’octet i propietats — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los tipos de enlace', 'Types of bond', 'Els tipus d’enllaç'),
      tabla: {
        columnas: L(['Enlace', 'Entre', 'Cómo se forma', 'Propiedades', 'Ejemplos'], ['Bond', 'Between', 'How it forms', 'Properties', 'Examples'], ['Enllaç', 'Entre', 'Com es forma', 'Propietats', 'Exemples']),
        filas: [
          [L('Iónico', 'Ionic', 'Iònic'), L('metal y no metal', 'metal and non-metal', 'metall i no metall'), L('el metal cede electrones y el no metal los gana: iones que se atraen', 'the metal gives electrons and the non-metal takes them: ions that attract', 'el metall cedeix electrons i el no metall els guanya: ions que s’atreuen'), L('sólidos cristalinos, punto de fusión alto, solubles en agua; conducen fundidos o disueltos', 'crystalline solids, high melting point, soluble in water; conduct when molten or dissolved', 'sòlids cristal·lins, punt de fusió alt, solubles en aigua; condueixen fosos o dissolts'), 'NaCl, MgO, CaF₂'],
          [L('Covalente (moléculas)', 'Covalent (molecules)', 'Covalent (molècules)'), L('no metales', 'non-metals', 'no metalls'), L('comparten pares de electrones', 'they share pairs of electrons', 'comparteixen parells d’electrons'), L('gases, líquidos o sólidos blandos; puntos de fusión bajos; no conducen', 'gases, liquids or soft solids; low melting points; do not conduct', 'gasos, líquids o sòlids tous; punts de fusió baixos; no condueixen'), 'H₂O, CO₂, O₂, CH₄'],
          [L('Covalente (redes)', 'Covalent (giant structures)', 'Covalent (xarxes)'), L('no metales en red', 'non-metals in a lattice', 'no metalls en xarxa'), L('enlaces covalentes en todas direcciones', 'covalent bonds in every direction', 'enllaços covalents en totes direccions'), L('durísimos, punto de fusión altísimo, no conducen (salvo el grafito)', 'very hard, very high melting point, do not conduct (except graphite)', 'duríssims, punt de fusió altíssim, no condueixen (excepte el grafit)'), L('diamante, cuarzo (SiO₂)', 'diamond, quartz (SiO₂)', 'diamant, quars (SiO₂)')],
          [L('Metálico', 'Metallic', 'Metàl·lic'), L('metales', 'metals', 'metalls'), L('iones positivos en una «nube» de electrones libres', 'positive ions in a «sea» of free electrons', 'ions positius en un «núvol» d’electrons lliures'), L('conducen la electricidad y el calor, brillan, se estiran en hilos y láminas', 'conduct electricity and heat, shiny, can be drawn into wires and sheets', 'condueixen l’electricitat i la calor, brillen, s’estiren en fils i làmines'), 'Fe, Cu, Al'],
        ],
      },
      lista: L(
        ['Regla del octeto: los átomos tienden a quedarse con 8 electrones en su última capa, como los gases nobles (el hidrógeno, con 2).', 'Los metales tienen pocos electrones de valencia y tienden a perderlos (cationes); los no metales tienen muchos y tienden a ganarlos (aniones) o a compartirlos.', 'En un diagrama de Lewis cada electrón de valencia es un punto, y cada par compartido, una raya: H–O–H.'],
        ['Octet rule: atoms tend to end up with 8 electrons in their outer shell, like the noble gases (hydrogen, with 2).', 'Metals have few valence electrons and tend to lose them (cations); non-metals have many and tend to gain them (anions) or share them.', 'In a Lewis diagram each valence electron is a dot, and each shared pair a line: H–O–H.'],
        ['Regla de l’octet: els àtoms tendeixen a quedar-se amb 8 electrons a l’última capa, com els gasos nobles (l’hidrogen, amb 2).', 'Els metalls tenen pocs electrons de valència i tendeixen a perdre’ls (cations); els no metalls en tenen molts i tendeixen a guanyar-los (anions) o a compartir-los.', 'En un diagrama de Lewis cada electró de valència és un punt, i cada parell compartit, una ratlla: H–O–H.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Qué tipo de enlace tiene cada sustancia? KCl, CH₄, Cu, diamante.', 'What type of bonding does each substance have? KCl, CH₄, Cu, diamond.', 'Quin tipus d’enllaç té cada substància? KCl, CH₄, Cu, diamant.'),
      s: T('KCl: iónico (metal + no metal). CH₄: covalente, molecular. Cu: metálico. Diamante: covalente en red.', 'KCl: ionic (metal + non-metal). CH₄: covalent, molecular. Cu: metallic. Diamond: giant covalent.', 'KCl: iònic (metall + no metall). CH₄: covalent, molecular. Cu: metàl·lic. Diamant: covalent en xarxa.') },
    { e: T('El magnesio (2 electrones de valencia) se une al cloro (7). ¿Qué fórmula sale?', 'Magnesium (2 valence electrons) bonds with chlorine (7). What formula results?', 'El magnesi (2 electrons de valència) s’uneix al clor (7). Quina fórmula en surt?'),
      s: T('El Mg cede sus 2 electrones y se queda Mg²⁺; cada Cl solo acepta 1 (Cl⁻), así que hacen falta dos: MgCl₂.', 'Mg gives up its 2 electrons and becomes Mg²⁺; each Cl only takes 1 (Cl⁻), so two are needed: MgCl₂.', 'El Mg cedeix els 2 electrons i es queda Mg²⁺; cada Cl només n’accepta 1 (Cl⁻), així que en calen dos: MgCl₂.') },
    { e: T('¿Por qué la sal disuelta en agua conduce la electricidad y el azúcar disuelto no?', 'Why does dissolved salt conduct electricity while dissolved sugar does not?', 'Per què la sal dissolta en aigua condueix l’electricitat i el sucre dissolt no?'),
      s: T('La sal es iónica: al disolverse, sus iones quedan libres y se mueven. El azúcar es covalente: se disuelve en moléculas sin carga.', 'Salt is ionic: when it dissolves, its ions are free to move. Sugar is covalent: it dissolves as uncharged molecules.', 'La sal és iònica: en dissoldre’s, els ions queden lliures i es mouen. El sucre és covalent: es dissol en molècules sense càrrega.') },
    { e: T('¿Cuántos enlaces hay entre los dos átomos de N₂ y por qué?', 'How many bonds are there between the two atoms in N₂, and why?', 'Quants enllaços hi ha entre els dos àtoms de N₂ i per què?'),
      s: T('Un enlace triple: cada N tiene 5 electrones de valencia y necesita 3 más para el octeto, así que comparten tres pares (N≡N).', 'A triple bond: each N has 5 valence electrons and needs 3 more for an octet, so they share three pairs (N≡N).', 'Un enllaç triple: cada N té 5 electrons de valència i en necessita 3 més per a l’octet, així que comparteixen tres parells (N≡N).') },
  ],
}

const organica = {
  metaTitle: L('Química orgánica: hidrocarburos, grupos funcionales y cómo nombrar compuestos del carbono — resumen y ejercicios', 'Organic chemistry: hydrocarbons, functional groups and how to name carbon compounds — summary and practice', 'Química orgànica: hidrocarburs, grups funcionals i com anomenar compostos del carboni — resum i exercicis'),
  secciones: [
    {
      titulo: L('El número de carbonos: los prefijos', 'Number of carbons: the prefixes', 'El nombre de carbonis: els prefixos'),
      tabla: {
        columnas: L(['Carbonos', 'Prefijo', 'Alcano'], ['Carbons', 'Prefix', 'Alkane'], ['Carbonis', 'Prefix', 'Alcà']),
        filas: [['1', 'met-', L('metano', 'methane', 'metà')], ['2', 'et-', L('etano', 'ethane', 'età')], ['3', 'prop-', L('propano', 'propane', 'propà')], ['4', 'but-', L('butano', 'butane', 'butà')], ['5', 'pent-', L('pentano', 'pentane', 'pentà')], ['6', 'hex-', L('hexano', 'hexane', 'hexà')]],
      },
    },
    {
      titulo: L('Las familias (grupos funcionales)', 'The families (functional groups)', 'Les famílies (grups funcionals)'),
      tabla: {
        columnas: L(['Familia', 'Grupo', 'Terminación', 'Ejemplo'], ['Family', 'Group', 'Ending', 'Example'], ['Família', 'Grup', 'Terminació', 'Exemple']),
        filas: [
          [L('Alcanos', 'Alkanes', 'Alcans'), L('solo enlaces simples C–C', 'single C–C bonds only', 'només enllaços simples C–C'), '-ano', L('CH₃–CH₃, etano', 'CH₃–CH₃, ethane', 'CH₃–CH₃, età')],
          [L('Alquenos', 'Alkenes', 'Alquens'), 'C=C', '-eno', L('CH₂=CH₂, eteno', 'CH₂=CH₂, ethene', 'CH₂=CH₂, etè')],
          [L('Alquinos', 'Alkynes', 'Alquins'), 'C≡C', '-ino', L('HC≡CH, etino', 'HC≡CH, ethyne', 'HC≡CH, etí')],
          [L('Alcoholes', 'Alcohols', 'Alcohols'), '–OH', '-ol', L('CH₃–CH₂OH, etanol', 'CH₃–CH₂OH, ethanol', 'CH₃–CH₂OH, etanol')],
          [L('Aldehídos', 'Aldehydes', 'Aldehids'), '–CHO', '-al', L('CH₃–CHO, etanal', 'CH₃–CHO, ethanal', 'CH₃–CHO, etanal')],
          [L('Cetonas', 'Ketones', 'Cetones'), L('C=O en medio de la cadena', 'C=O in the middle of the chain', 'C=O al mig de la cadena'), '-ona', L('CH₃–CO–CH₃, propanona', 'CH₃–CO–CH₃, propanone', 'CH₃–CO–CH₃, propanona')],
          [L('Ácidos carboxílicos', 'Carboxylic acids', 'Àcids carboxílics'), '–COOH', L('ácido …-oico', '…-oic acid', 'àcid …-oic'), L('CH₃–COOH, ácido etanoico', 'CH₃–COOH, ethanoic acid', 'CH₃–COOH, àcid etanoic')],
          [L('Ésteres', 'Esters', 'Èsters'), '–COO–', L('…-oato de …-ilo', '…-yl …-oate', '…-oat de …-il'), L('CH₃–COO–CH₃, etanoato de metilo', 'CH₃–COO–CH₃, methyl ethanoate', 'CH₃–COO–CH₃, etanoat de metil')],
          [L('Aminas', 'Amines', 'Amines'), '–NH₂', '-amina', L('CH₃–NH₂, metilamina', 'CH₃–NH₂, methylamine', 'CH₃–NH₂, metilamina')],
        ],
      },
      lista: L(
        ['La cadena principal es la más larga que contiene el grupo funcional, y se numera para que el grupo funcional (o el doble o triple enlace) tenga el localizador más bajo.', 'Las ramificaciones se nombran delante con su número y terminación -il: CH₃–CH(CH₃)–CH₂–CH₃ es el 2-metilbutano.', 'Se acepta «but-2-eno» (norma IUPAC actual) y también «2-buteno», que aún usan muchos libros.'],
        ['The main chain is the longest one containing the functional group, and it is numbered so that the functional group (or the double or triple bond) gets the lowest locant.', 'Branches are named first with their number and the ending -yl: CH₃–CH(CH₃)–CH₂–CH₃ is 2-methylbutane.', 'Both «but-2-ene» (current IUPAC) and «2-butene», still used in many textbooks, are accepted.'],
        ['La cadena principal és la més llarga que conté el grup funcional, i es numera perquè el grup funcional (o el doble o triple enllaç) tingui el localitzador més baix.', 'Les ramificacions s’anomenen al davant amb el seu número i la terminació -il: CH₃–CH(CH₃)–CH₂–CH₃ és el 2-metilbutà.', 'S’accepta «but-2-è» (norma IUPAC actual) i també «2-butè», que encara fan servir molts llibres.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('Nombra: CH₃–CH₂–CH₃ y CH₃–CH=CH–CH₃.', 'Name: CH₃–CH₂–CH₃ and CH₃–CH=CH–CH₃.', 'Anomena: CH₃–CH₂–CH₃ i CH₃–CH=CH–CH₃.'),
      s: T('Propano (3 C, solo enlaces simples). But-2-eno (4 C, doble enlace en el carbono 2).', 'Propane (3 C, single bonds only). But-2-ene (4 C, double bond at carbon 2).', 'Propà (3 C, només enllaços simples). But-2-è (4 C, doble enllaç al carboni 2).') },
    { e: T('Nombra: CH₃–CH₂–CH₂OH.', 'Name: CH₃–CH₂–CH₂OH.', 'Anomena: CH₃–CH₂–CH₂OH.'),
      s: T('Propan-1-ol (o 1-propanol): 3 carbonos y el –OH en el carbono 1.', 'Propan-1-ol: 3 carbons and the –OH on carbon 1.', 'Propan-1-ol (o 1-propanol): 3 carbonis i l’–OH al carboni 1.') },
    { e: T('Los alcanos siguen la fórmula CₙH₂ₙ₊₂. ¿Cuál es la fórmula del pentano?', 'Alkanes follow the formula CₙH₂ₙ₊₂. What is the formula of pentane?', 'Els alcans segueixen la fórmula CₙH₂ₙ₊₂. Quina és la fórmula del pentà?'),
      s: T('n = 5 → C₅H₁₂.', 'n = 5 → C₅H₁₂.', 'n = 5 → C₅H₁₂.') },
    { e: T('¿A qué familia pertenece CH₃–COOH y cómo se llama?', 'Which family does CH₃–COOH belong to, and what is it called?', 'A quina família pertany CH₃–COOH i com s’anomena?'),
      s: T('Es un ácido carboxílico: ácido etanoico (el ácido acético del vinagre).', 'It is a carboxylic acid: ethanoic acid (the acetic acid in vinegar).', 'És un àcid carboxílic: àcid etanoic (l’àcid acètic del vinagre).') },
  ],
}

const maquinas = {
  metaTitle: L('Las máquinas simples: palanca y sus tres géneros, polea, plano inclinado y rueda — resumen y ejercicios', 'Simple machines: levers and their three classes, pulleys, inclined planes and wheels — summary and practice', 'Les màquines simples: palanca i els tres gèneres, politja, pla inclinat i roda — resum i exercicis'),
  secciones: [
    {
      titulo: L('La palanca', 'The lever', 'La palanca'),
      tabla: {
        columnas: L(['Género', 'Qué queda en medio', 'Ejemplos'], ['Class', 'What is in the middle', 'Examples'], ['Gènere', 'Què queda al mig', 'Exemples']),
        filas: [
          [L('Primer género', 'First class', 'Primer gènere'), L('el punto de apoyo (fulcro)', 'the fulcrum', 'el punt de suport (fulcre)'), L('balancín, tijeras, alicates', 'seesaw, scissors, pliers', 'balancí, tisores, alicates')],
          [L('Segundo género', 'Second class', 'Segon gènere'), L('la resistencia (la carga)', 'the load', 'la resistència (la càrrega)'), L('carretilla, cascanueces, abrebotellas', 'wheelbarrow, nutcracker, bottle opener', 'carretó, trencanous, obreampolles')],
          [L('Tercer género', 'Third class', 'Tercer gènere'), L('la potencia (la fuerza que se hace)', 'the effort', 'la potència (la força que es fa)'), L('pinzas, caña de pescar, el antebrazo', 'tweezers, fishing rod, the forearm', 'pinces, canya de pescar, l’avantbraç')],
        ],
      },
      texto: L(
        ['Ley de la palanca: F · BF = R · BR, donde F es la fuerza que hacemos (potencia), R la carga (resistencia) y BF y BR sus distancias al punto de apoyo (brazos). Cuanto más largo es el brazo de la potencia, menos fuerza hace falta. Las de tercer género no ahorran fuerza, pero dan rapidez y precisión.'],
        ['Law of the lever: F · dF = R · dR, where F is the effort, R the load and dF and dR their distances from the fulcrum. The longer the effort arm, the less force is needed. Third-class levers do not save force, but they give speed and precision.'],
        ['Llei de la palanca: F · BF = R · BR, on F és la força que fem (potència), R la càrrega (resistència) i BF i BR les seves distàncies al punt de suport (braços). Com més llarg és el braç de la potència, menys força cal. Les de tercer gènere no estalvien força, però donen rapidesa i precisió.'],
      ),
    },
    {
      titulo: L('Otras máquinas simples', 'Other simple machines', 'Altres màquines simples'),
      tabla: {
        columnas: L(['Máquina', 'Fuerza necesaria', 'Para qué sirve'], ['Machine', 'Force needed', 'What it is for'], ['Màquina', 'Força necessària', 'Per a què serveix']),
        filas: [
          [L('Polea fija', 'Fixed pulley', 'Politja fixa'), 'F = R', L('cambia la dirección de la fuerza (tirar hacia abajo para subir algo)', 'changes the direction of the force (pull down to lift something)', 'canvia la direcció de la força (estirar avall per pujar una cosa)')],
          [L('Polea móvil', 'Movable pulley', 'Politja mòbil'), 'F = R / 2', L('reduce la fuerza a la mitad, pero hay que tirar del doble de cuerda', 'halves the force, but you pull twice as much rope', 'redueix la força a la meitat, però cal estirar el doble de corda')],
          [L('Plano inclinado', 'Inclined plane', 'Pla inclinat'), L('F = P · altura / longitud (sin rozamiento)', 'F = W · height / length (no friction)', 'F = P · alçada / longitud (sense fregament)'), L('subir peso con menos fuerza: rampas, carreteras de montaña', 'raise loads with less force: ramps, mountain roads', 'pujar pes amb menys força: rampes, carreteres de muntanya')],
          [L('Torno o rueda y eje', 'Wheel and axle', 'Torn o roda i eix'), L('F · radio de la manivela = R · radio del eje', 'F · handle radius = R · axle radius', 'F · radi de la maneta = R · radi de l’eix'), L('pozos, volantes, destornilladores', 'wells, steering wheels, screwdrivers', 'pous, volants, tornavisos')],
        ],
      },
    },
  ],
  ejercicios: [
    { e: T('Con una palanca quieres levantar 400 N que están a 0,5 m del apoyo, empujando a 2 m. ¿Qué fuerza necesitas?', 'With a lever you want to lift 400 N at 0.5 m from the fulcrum, pushing at 2 m. What force do you need?', 'Amb una palanca vols aixecar 400 N que són a 0,5 m del suport, empenyent a 2 m. Quina força necessites?'),
      s: T('F · 2 = 400 · 0,5 → F = 200 / 2 = 100 N.', 'F · 2 = 400 · 0.5 → F = 200 / 2 = 100 N.', 'F · 2 = 400 · 0,5 → F = 200 / 2 = 100 N.') },
    { e: T('¿De qué género es una carretilla y por qué ahorra fuerza?', 'What class of lever is a wheelbarrow, and why does it save force?', 'De quin gènere és un carretó i per què estalvia força?'),
      s: T('De segundo género: el apoyo es la rueda, la carga va en medio y empujamos desde los mangos, más lejos. El brazo de la potencia es mayor que el de la resistencia.', 'Second class: the fulcrum is the wheel, the load is in the middle and we push from the handles, further away. The effort arm is longer than the load arm.', 'De segon gènere: el suport és la roda, la càrrega va al mig i empenyem des dels mànecs, més lluny. El braç de la potència és més gran que el de la resistència.') },
    { e: T('Con una polea móvil se sube un saco de 300 N. ¿Con qué fuerza hay que tirar?', 'A 300 N sack is lifted with a movable pulley. How hard do you have to pull?', 'Amb una politja mòbil es puja un sac de 300 N. Amb quina força cal estirar?'),
      s: T('F = 300 / 2 = 150 N (sin contar el peso de la polea ni el rozamiento).', 'F = 300 / 2 = 150 N (ignoring the weight of the pulley and friction).', 'F = 300 / 2 = 150 N (sense comptar el pes de la politja ni el fregament).') },
    { e: T('Una rampa mide 4 m de largo y sube 1 m. ¿Qué fuerza hace falta para subir por ella una caja de 800 N?', 'A ramp is 4 m long and rises 1 m. What force is needed to push an 800 N box up it?', 'Una rampa fa 4 m de llarg i puja 1 m. Quina força cal per pujar-hi una caixa de 800 N?'),
      s: T('F = 800 · 1 / 4 = 200 N, sin rozamiento: la cuarta parte que levantándola en vertical.', 'F = 800 · 1 / 4 = 200 N, without friction: a quarter of lifting it straight up.', 'F = 800 · 1 / 4 = 200 N, sense fregament: la quarta part que aixecant-la en vertical.') },
  ],
}

const estequiometria = {
  secciones: [
    {
      titulo: L('El mol y sus fórmulas', 'The mole and its formulas', 'El mol i les seves fórmules'),
      tabla: {
        columnas: L(['Concepto', 'Fórmula o valor', 'Ejemplo'], ['Concept', 'Formula or value', 'Example'], ['Concepte', 'Fórmula o valor', 'Exemple']),
        filas: [
          [L('Mol', 'Mole', 'Mol'), L('6,022 · 10²³ partículas (número de Avogadro)', '6.022 · 10²³ particles (Avogadro’s number)', '6,022 · 10²³ partícules (nombre d’Avogadro)'), L('1 mol de agua = 6,022 · 10²³ moléculas', '1 mol of water = 6.022 · 10²³ molecules', '1 mol d’aigua = 6,022 · 10²³ molècules')],
          [L('Masa molar (M)', 'Molar mass (M)', 'Massa molar (M)'), L('la masa de 1 mol, en g/mol: suma de masas atómicas', 'the mass of 1 mol, in g/mol: sum of atomic masses', 'la massa d’1 mol, en g/mol: suma de masses atòmiques'), L('H₂O: 2 · 1 + 16 = 18 g/mol', 'H₂O: 2 · 1 + 16 = 18 g/mol', 'H₂O: 2 · 1 + 16 = 18 g/mol')],
          [L('Moles a partir de la masa', 'Moles from mass', 'Mols a partir de la massa'), 'n = m / M', L('36 g de H₂O → 2 mol', '36 g of H₂O → 2 mol', '36 g de H₂O → 2 mol')],
          [L('Gases', 'Gases', 'Gasos'), L('p · V = n · R · T; 1 mol ocupa 22,4 L a 0 °C y 1 atm', 'p · V = n · R · T; 1 mol takes up 22.4 L at 0 °C and 1 atm', 'p · V = n · R · T; 1 mol ocupa 22,4 L a 0 °C i 1 atm'), L('2 mol → 44,8 L en esas condiciones', '2 mol → 44.8 L under those conditions', '2 mol → 44,8 L en aquestes condicions')],
        ],
      },
      lista: L(
        ['Para un problema de estequiometría: 1) ajusta la ecuación; 2) pasa los datos a moles; 3) usa la proporción de los coeficientes; 4) pasa el resultado a gramos, litros o lo que te pidan.', 'Reactivo limitante: el que se acaba primero; marca cuánto producto se forma. El otro está en exceso y sobra.'],
        ['For a stoichiometry problem: 1) balance the equation; 2) convert the data to moles; 3) use the ratio of the coefficients; 4) convert the answer to grams, litres or whatever is asked.', 'Limiting reactant: the one that runs out first; it sets how much product forms. The other is in excess and some is left over.'],
        ['Per a un problema d’estequiometria: 1) ajusta l’equació; 2) passa les dades a mols; 3) fes servir la proporció dels coeficients; 4) passa el resultat a grams, litres o el que et demanin.', 'Reactiu limitant: el que s’acaba primer; marca quant producte es forma. L’altre és en excés i en sobra.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('¿Cuántos moles y cuántas moléculas hay en 36 g de agua?', 'How many moles and how many molecules are there in 36 g of water?', 'Quants mols i quantes molècules hi ha en 36 g d’aigua?'),
      s: T('n = 36 / 18 = 2 mol. Moléculas = 2 · 6,022 · 10²³ ≈ 1,2 · 10²⁴.', 'n = 36 / 18 = 2 mol. Molecules = 2 · 6.022 · 10²³ ≈ 1.2 · 10²⁴.', 'n = 36 / 18 = 2 mol. Molècules = 2 · 6,022 · 10²³ ≈ 1,2 · 10²⁴.') },
    { e: T('En 2 H₂ + O₂ → 2 H₂O, ¿cuánta agua se forma con 4 g de hidrógeno?', 'In 2 H₂ + O₂ → 2 H₂O, how much water forms from 4 g of hydrogen?', 'En 2 H₂ + O₂ → 2 H₂O, quanta aigua es forma amb 4 g d’hidrogen?'),
      s: T('4 g de H₂ = 2 mol (M = 2 g/mol). La proporción H₂ : H₂O es 2 : 2, así que salen 2 mol de agua = 36 g.', '4 g of H₂ = 2 mol (M = 2 g/mol). The H₂ : H₂O ratio is 2 : 2, so 2 mol of water form = 36 g.', '4 g de H₂ = 2 mol (M = 2 g/mol). La proporció H₂ : H₂O és 2 : 2, així que en surten 2 mol d’aigua = 36 g.') },
    { e: T('Se mezclan 4 mol de H₂ con 1 mol de O₂ (2 H₂ + O₂ → 2 H₂O). ¿Cuál es el limitante y qué sobra?', '4 mol of H₂ are mixed with 1 mol of O₂ (2 H₂ + O₂ → 2 H₂O). Which is limiting and what is left over?', 'Es barregen 4 mol de H₂ amb 1 mol de O₂ (2 H₂ + O₂ → 2 H₂O). Quin és el limitant i què en sobra?'),
      s: T('1 mol de O₂ solo gasta 2 mol de H₂: el O₂ es el limitante. Se forman 2 mol de agua y sobran 2 mol de H₂.', '1 mol of O₂ only uses 2 mol of H₂: O₂ is limiting. 2 mol of water form and 2 mol of H₂ are left over.', '1 mol d’O₂ només gasta 2 mol de H₂: l’O₂ és el limitant. Es formen 2 mol d’aigua i sobren 2 mol de H₂.') },
    { e: T('¿Qué volumen ocupan 2 mol de CO₂ a 0 °C y 1 atm?', 'What volume do 2 mol of CO₂ take up at 0 °C and 1 atm?', 'Quin volum ocupen 2 mol de CO₂ a 0 °C i 1 atm?'),
      s: T('2 · 22,4 = 44,8 L.', '2 · 22.4 = 44.8 L.', '2 · 22,4 = 44,8 L.') },
  ],
}

const tablaPeriodica = {
  metaTitle: L('La tabla periódica: grupos, periodos, metales y no metales y propiedades periódicas — resumen y ejercicios', 'The periodic table: groups, periods, metals and non-metals, and periodic trends — summary and practice', 'La taula periòdica: grups, períodes, metalls i no metalls i propietats periòdiques — resum i exercicis'),
  secciones: [
    {
      titulo: L('Los grupos principales', 'The main groups', 'Els grups principals'),
      tabla: {
        columnas: L(['Grupo', 'Nombre', 'Electrones de valencia', 'Ejemplos', 'Cómo son'], ['Group', 'Name', 'Valence electrons', 'Examples', 'What they are like'], ['Grup', 'Nom', 'Electrons de valència', 'Exemples', 'Com són']),
        filas: [
          ['1', L('Alcalinos', 'Alkali metals', 'Alcalins'), '1', 'Li, Na, K', L('metales muy reactivos (el H está arriba, pero es un no metal)', 'very reactive metals (H sits on top but is a non-metal)', 'metalls molt reactius (l’H és a dalt, però és un no metall)')],
          ['2', L('Alcalinotérreos', 'Alkaline earth metals', 'Alcalinoterris'), '2', 'Be, Mg, Ca', L('metales reactivos', 'reactive metals', 'metalls reactius')],
          ['3-12', L('Metales de transición', 'Transition metals', 'Metalls de transició'), '—', 'Fe, Cu, Zn, Au', L('metales, a menudo con varias valencias', 'metals, often with several valencies', 'metalls, sovint amb diverses valències')],
          ['17', L('Halógenos', 'Halogens', 'Halògens'), '7', 'F, Cl, Br, I', L('no metales muy reactivos', 'very reactive non-metals', 'no metalls molt reactius')],
          ['18', L('Gases nobles', 'Noble gases', 'Gasos nobles'), L('8 (el He, 2)', '8 (He, 2)', '8 (l’He, 2)'), 'He, Ne, Ar', L('casi no reaccionan', 'hardly react at all', 'gairebé no reaccionen')],
        ],
      },
      lista: L(
        ['Los elementos van ordenados por su número atómico Z (los protones).', 'Las filas son periodos: el número de periodo es el número de capas con electrones. Las columnas son grupos: los de un mismo grupo tienen los mismos electrones de valencia y se parecen.', 'Metales a la izquierda y en el centro; no metales arriba a la derecha; entre ellos, en escalera, los semimetales (B, Si, Ge, As, Sb, Te).', 'El radio atómico crece hacia abajo y hacia la izquierda; la electronegatividad (las ganas de quedarse electrones) crece hacia arriba y hacia la derecha: el flúor es el más electronegativo.'],
        ['Elements are ordered by atomic number Z (the protons).', 'Rows are periods: the period number is the number of shells with electrons. Columns are groups: elements in the same group have the same number of valence electrons and behave alike.', 'Metals on the left and in the middle; non-metals at the top right; between them, in a staircase, the metalloids (B, Si, Ge, As, Sb, Te).', 'Atomic radius increases going down and to the left; electronegativity (how strongly an atom holds on to electrons) increases going up and to the right: fluorine is the most electronegative.'],
        ['Els elements van ordenats pel nombre atòmic Z (els protons).', 'Les files són períodes: el número de període és el nombre de capes amb electrons. Les columnes són grups: els d’un mateix grup tenen els mateixos electrons de valència i s’assemblen.', 'Metalls a l’esquerra i al centre; no metalls a dalt a la dreta; entre ells, en escala, els semimetalls (B, Si, Ge, As, Sb, Te).', 'El radi atòmic creix cap avall i cap a l’esquerra; l’electronegativitat (les ganes de quedar-se electrons) creix cap amunt i cap a la dreta: el fluor és el més electronegatiu.'],
      ),
    },
  ],
  ejercicios: [
    { e: T('El magnesio tiene Z = 12. ¿En qué periodo y grupo está?', 'Magnesium has Z = 12. Which period and group is it in?', 'El magnesi té Z = 12. En quin període i grup és?'),
      s: T('Sus electrones se reparten 2, 8, 2: tres capas → periodo 3; 2 electrones de valencia → grupo 2.', 'Its electrons are arranged 2, 8, 2: three shells → period 3; 2 valence electrons → group 2.', 'Els electrons es reparteixen 2, 8, 2: tres capes → període 3; 2 electrons de valència → grup 2.') },
    { e: T('¿Qué elemento está en el periodo 3 y el grupo 17?', 'Which element is in period 3, group 17?', 'Quin element és al període 3 i el grup 17?'),
      s: T('El cloro (Cl, Z = 17), un halógeno.', 'Chlorine (Cl, Z = 17), a halogen.', 'El clor (Cl, Z = 17), un halogen.') },
    { e: T('¿Quién es más electronegativo, el O o el S? ¿Quién tiene más radio, el Na o el Cl?', 'Which is more electronegative, O or S? Which has the larger radius, Na or Cl?', 'Qui és més electronegatiu, l’O o l’S? Qui té més radi, el Na o el Cl?'),
      s: T('El O (está más arriba en el mismo grupo). El Na (están en el mismo periodo y el Na está más a la izquierda).', 'O (it is higher up in the same group). Na (they are in the same period and Na is further left).', 'L’O (és més amunt al mateix grup). El Na (són al mateix període i el Na és més a l’esquerra).') },
  ],
}

const atomos = {
  metaTitle: L('Átomos y moléculas: protones, neutrones y electrones, número atómico y másico, isótopos e iones — resumen', 'Atoms and molecules: protons, neutrons and electrons, atomic and mass number, isotopes and ions — summary', 'Àtoms i molècules: protons, neutrons i electrons, nombre atòmic i màssic, isòtops i ions — resum i exercicis'),
  secciones: [
    {
      titulo: L('Las partículas del átomo', 'The particles of the atom', 'Les partícules de l’àtom'),
      tabla: {
        columnas: L(['Partícula', 'Carga', 'Masa', 'Dónde está'], ['Particle', 'Charge', 'Mass', 'Where it is'], ['Partícula', 'Càrrega', 'Massa', 'On és']),
        filas: [
          [L('Protón', 'Proton', 'Protó'), '+1', L('≈ 1 u', '≈ 1 u', '≈ 1 u'), L('núcleo', 'nucleus', 'nucli')],
          [L('Neutrón', 'Neutron', 'Neutró'), '0', L('≈ 1 u', '≈ 1 u', '≈ 1 u'), L('núcleo', 'nucleus', 'nucli')],
          [L('Electrón', 'Electron', 'Electró'), '−1', L('unas 1.836 veces menos', 'about 1,836 times less', 'unes 1.836 vegades menys'), L('corteza', 'shells around the nucleus', 'escorça')],
        ],
      },
      lista: L(
        ['Número atómico Z = protones (dice qué elemento es). Número másico A = protones + neutrones. Neutrones = A − Z.', 'Un átomo neutro tiene tantos electrones como protones.', 'Isótopos: mismo elemento (mismo Z) con distinto número de neutrones: carbono-12 y carbono-14.', 'Iones: átomos que han ganado electrones (aniones, negativos: Cl⁻) o los han perdido (cationes, positivos: Na⁺).', 'Una molécula es un grupo de átomos unidos: si son iguales, es un elemento (O₂); si son distintos, un compuesto (H₂O).'],
        ['Atomic number Z = protons (it tells you which element it is). Mass number A = protons + neutrons. Neutrons = A − Z.', 'A neutral atom has as many electrons as protons.', 'Isotopes: the same element (same Z) with different numbers of neutrons: carbon-12 and carbon-14.', 'Ions: atoms that have gained electrons (anions, negative: Cl⁻) or lost them (cations, positive: Na⁺).', 'A molecule is a group of bonded atoms: if they are the same, it is an element (O₂); if different, a compound (H₂O).'],
        ['Nombre atòmic Z = protons (diu quin element és). Nombre màssic A = protons + neutrons. Neutrons = A − Z.', 'Un àtom neutre té tants electrons com protons.', 'Isòtops: mateix element (mateix Z) amb nombre diferent de neutrons: carboni-12 i carboni-14.', 'Ions: àtoms que han guanyat electrons (anions, negatius: Cl⁻) o els han perdut (cations, positius: Na⁺).', 'Una molècula és un grup d’àtoms units: si són iguals, és un element (O₂); si són diferents, un compost (H₂O).'],
      ),
    },
  ],
  ejercicios: [
    { e: T('El sodio tiene Z = 11 y A = 23. ¿Cuántos protones, neutrones y electrones tiene un átomo neutro?', 'Sodium has Z = 11 and A = 23. How many protons, neutrons and electrons does a neutral atom have?', 'El sodi té Z = 11 i A = 23. Quants protons, neutrons i electrons té un àtom neutre?'),
      s: T('11 protones, 23 − 11 = 12 neutrones y 11 electrones.', '11 protons, 23 − 11 = 12 neutrons and 11 electrons.', '11 protons, 23 − 11 = 12 neutrons i 11 electrons.') },
    { e: T('¿Cuántos electrones tienen el ion Cl⁻ (Z = 17) y el ion Mg²⁺ (Z = 12)?', 'How many electrons do the ions Cl⁻ (Z = 17) and Mg²⁺ (Z = 12) have?', 'Quants electrons tenen l’ió Cl⁻ (Z = 17) i l’ió Mg²⁺ (Z = 12)?'),
      s: T('Cl⁻ ha ganado 1: 18 electrones. Mg²⁺ ha perdido 2: 10 electrones.', 'Cl⁻ has gained 1: 18 electrons. Mg²⁺ has lost 2: 10 electrons.', 'Cl⁻ n’ha guanyat 1: 18 electrons. Mg²⁺ n’ha perdut 2: 10 electrons.') },
    { e: T('¿Átomo, molécula de un elemento o molécula de un compuesto? He, O₂, H₂O, N₂, CO₂.', 'Atom, molecule of an element or molecule of a compound? He, O₂, H₂O, N₂, CO₂.', 'Àtom, molècula d’un element o molècula d’un compost? He, O₂, H₂O, N₂, CO₂.'),
      s: T('He: átomo suelto (gas noble). O₂ y N₂: moléculas de un elemento. H₂O y CO₂: moléculas de compuestos.', 'He: a single atom (noble gas). O₂ and N₂: molecules of an element. H₂O and CO₂: molecules of compounds.', 'He: àtom sol (gas noble). O₂ i N₂: molècules d’un element. H₂O i CO₂: molècules de compostos.') },
  ],
}

export const AMPLIACION_T6 = {
  'calor-temperatura': calor, formulacion, 'enlace-quimico': enlace, 'quimica-organica': organica,
  maquinas, estequiometria, 'tabla-periodica': tablaPeriodica, 'atomos-moleculas': atomos,
}
