// Formulación y nomenclatura inorgánica
//
// El otro hueco grande de ciencias, buscado igual que el de presión: en los
// cinco bancos de química no hay ni una pregunta de valencias, de cómo se
// escribe una fórmula ni de cómo se nombra un compuesto. Lo único que salía al
// buscar "óxido" o "hidróxido" eran menciones de paso dentro de preguntas de
// ácidos y bases ("neutralizar con hidróxido de sodio"), no el tema en sí.
//
// Se usa la nomenclatura de la IUPAC de 2005, que es la que piden los libros
// actuales: sistemática con prefijos (dióxido de carbono) y de composición con
// número de oxidación entre paréntesis, la llamada "de Stock" (óxido de
// hierro(III)). La tradicional —ácido sulfúrico, ácido clorhídrico— aparece
// solo donde sigue siendo el nombre de uso corriente, que es como la tratan
// las editoriales.
//
// Las fórmulas van con subíndices Unicode (H₂O, CO₂) y no con HTML: estas
// preguntas se sirven también en las tarjetas de repaso impresas, donde no hay
// etiquetas que valgan.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── LEER UNA FÓRMULA ────────────────────────────────────────────────────
  q('fq-01', 'primaria',
    { es: 'En la fórmula H₂O, ¿qué indica el 2 pequeño?', en: 'In the formula H₂O, what does the small 2 mean?', ca: 'A la fórmula H₂O, què indica el 2 petit?' },
    { es: ['Que hay 2 átomos de hidrógeno en la molécula', 'Que hay 2 moléculas de agua', 'Que el hidrógeno pesa 2', 'Que hay 2 átomos de oxígeno'], en: ['There are 2 hydrogen atoms in the molecule', 'There are 2 water molecules', 'Hydrogen weighs 2', 'There are 2 oxygen atoms'], ca: ['Que hi ha 2 àtoms d\'hidrogen a la molècula', 'Que hi ha 2 molècules d\'aigua', 'Que l\'hidrogen pesa 2', 'Que hi ha 2 àtoms d\'oxigen'] },
    { es: 'Que hay 2 átomos de hidrógeno en la molécula', en: 'There are 2 hydrogen atoms in the molecule', ca: 'Que hi ha 2 àtoms d\'hidrogen a la molècula' },
    '💧',
    { es: 'El subíndice afecta SOLO al símbolo que tiene delante y cuenta átomos dentro de una molécula. El número de moléculas se escribe delante y grande: 2 H₂O son dos moléculas de agua, con cuatro hidrógenos en total.', en: 'The subscript affects ONLY the symbol before it and counts atoms within one molecule. The number of molecules goes in front, full size: 2 H₂O is two water molecules.', ca: 'El subíndex afecta NOMÉS el símbol que té davant i compta àtoms dins d\'una molècula.' }),

  q('fq-02', 'primaria',
    { es: '¿Cuántos átomos en total hay en una molécula de H₂SO₄?', en: 'How many atoms are there in total in one molecule of H₂SO₄?', ca: 'Quants àtoms en total hi ha en una molècula de H₂SO₄?' },
    { es: ['7', '4', '3', '8'], en: ['7', '4', '3', '8'], ca: ['7', '4', '3', '8'] },
    { es: '7', en: '7', ca: '7' },
    '🔢',
    { es: '2 hidrógenos + 1 azufre + 4 oxígenos = 7 átomos. El azufre no lleva subíndice, y eso significa uno, no ninguno: un símbolo sin número es siempre un átomo.', en: '2 hydrogens + 1 sulphur + 4 oxygens = 7 atoms. Sulphur has no subscript, and that means one, not none: a symbol with no number is always one atom.', ca: '2 hidrògens + 1 sofre + 4 oxígens = 7 àtoms. Un símbol sense número és sempre un àtom.' }),

  q('fq-03', 'eso',
    { es: '¿Cuántos átomos de oxígeno hay en Ca(OH)₂?', en: 'How many oxygen atoms are there in Ca(OH)₂?', ca: 'Quants àtoms d\'oxigen hi ha a Ca(OH)₂?' },
    { es: ['2, porque el paréntesis multiplica todo lo de dentro', '1', '4', 'Ninguno'], en: ['2, because the bracket multiplies everything inside', '1', '4', 'None'], ca: ['2, perquè el parèntesi multiplica tot el que hi ha dins', '1', '4', 'Cap'] },
    { es: '2, porque el paréntesis multiplica todo lo de dentro', en: '2, because the bracket multiplies everything inside', ca: '2, perquè el parèntesi multiplica tot el que hi ha dins' },
    '🔠',
    { es: 'El subíndice de fuera afecta al grupo entero: hay 2 oxígenos y 2 hidrógenos, además de 1 calcio. Sin el paréntesis, CaOH₂ significaría otra cosa completamente distinta — de ahí que el paréntesis no sea decorativo.', en: 'The outside subscript applies to the whole group: 2 oxygens and 2 hydrogens, plus 1 calcium. Without brackets, CaOH₂ would mean something else entirely.', ca: 'El subíndex de fora afecta el grup sencer: hi ha 2 oxígens i 2 hidrògens, a més d\'1 calci.' }),

  q('fq-04', 'eso',
    { es: '¿Qué diferencia hay entre 2 CO y CO₂?', en: 'What is the difference between 2 CO and CO₂?', ca: 'Quina diferència hi ha entre 2 CO i CO₂?' },
    { es: ['2 CO son dos moléculas de monóxido; CO₂ es una molécula con dos oxígenos', 'Son lo mismo escrito de dos formas', '2 CO tiene más oxígeno que CO₂', 'CO₂ son dos moléculas de CO'], en: ['2 CO is two monoxide molecules; CO₂ is one molecule with two oxygens', 'They are the same thing written twice', '2 CO has more oxygen than CO₂', 'CO₂ is two CO molecules'], ca: ['2 CO són dues molècules de monòxid; CO₂ és una molècula amb dos oxígens', 'Són el mateix escrit de dues formes', '2 CO té més oxigen que CO₂', 'CO₂ són dues molècules de CO'] },
    { es: '2 CO son dos moléculas de monóxido; CO₂ es una molécula con dos oxígenos', en: '2 CO is two monoxide molecules; CO₂ is one molecule with two oxygens', ca: '2 CO són dues molècules de monòxid; CO₂ és una molècula amb dos oxígens' },
    '⚖️',
    { es: 'El número de delante (coeficiente) cuenta moléculas enteras; el de abajo (subíndice) cuenta átomos dentro de una. Y son sustancias distintas: el monóxido de carbono es un veneno mortal y el dióxido es lo que exhalas al respirar.', en: 'The number in front counts whole molecules; the one below counts atoms inside one. And they are different substances: carbon monoxide is a deadly poison, carbon dioxide is what you breathe out.', ca: 'El número de davant compta molècules senceres; el de sota compta àtoms dins d\'una.' }),

  // ── VALENCIAS Y NÚMEROS DE OXIDACIÓN ────────────────────────────────────
  q('fq-05', 'eso',
    { es: '¿Qué es la valencia de un elemento?', en: 'What is the valency of an element?', ca: 'Què és la valència d\'un element?' },
    { es: ['El número de enlaces que puede formar con otros átomos', 'Su masa atómica', 'El número de protones que tiene', 'Su posición en la tabla'], en: ['The number of bonds it can form with other atoms', 'Its atomic mass', 'Its number of protons', 'Its position in the table'], ca: ['El nombre d\'enllaços que pot formar amb altres àtoms', 'La seva massa atòmica', 'El nombre de protons que té', 'La seva posició a la taula'] },
    { es: 'El número de enlaces que puede formar con otros átomos', en: 'The number of bonds it can form with other atoms', ca: 'El nombre d\'enllaços que pot formar amb altres àtoms' },
    '🔗',
    { es: 'Es cuántas "manos" tiene el átomo para agarrarse. El oxígeno tiene dos y el hidrógeno una, así que hacen falta dos hidrógenos para ocupar las dos manos del oxígeno: H₂O. Formular es, en el fondo, no dejar ninguna mano suelta.', en: 'It is how many "hands" the atom has to hold on with. Oxygen has two and hydrogen one, so two hydrogens are needed: H₂O. Formulating is, at heart, leaving no hand free.', ca: 'És quantes "mans" té l\'àtom per agafar-se. L\'oxigen en té dues i l\'hidrogen una: H₂O.' }),

  q('fq-06', 'eso',
    { es: '¿Cuál es la valencia habitual del oxígeno en sus compuestos?', en: 'What is oxygen\'s usual valency in its compounds?', ca: 'Quina és la valència habitual de l\'oxigen als seus compostos?' },
    { es: ['2', '1', '3', '4'], en: ['2', '1', '3', '4'], ca: ['2', '1', '3', '4'] },
    { es: '2', en: '2', ca: '2' },
    '🅾️',
    { es: 'Con número de oxidación −2 en casi todo (salvo en los peróxidos). Es el dato que más se usa: sabiendo que el oxígeno vale 2, se deduce la valencia del otro elemento de cualquier óxido con solo mirar la fórmula.', en: 'With oxidation number −2 in nearly everything (except peroxides). It is the most useful single fact: knowing oxygen is 2, you can deduce the other element\'s valency in any oxide.', ca: 'Amb número d\'oxidació −2 en gairebé tot (llevat dels peròxids).' }),

  q('fq-07', 'eso',
    { es: 'En el compuesto Fe₂O₃, ¿cuál es el número de oxidación del hierro?', en: 'In Fe₂O₃, what is the oxidation number of iron?', ca: 'Al compost Fe₂O₃, quin és el número d\'oxidació del ferro?' },
    { es: ['+3', '+2', '+1', '+6'], en: ['+3', '+2', '+1', '+6'], ca: ['+3', '+2', '+1', '+6'] },
    { es: '+3', en: '+3', ca: '+3' },
    '🧲',
    { es: 'Los tres oxígenos suman −6, y como la molécula es neutra los dos hierros tienen que sumar +6: cada uno vale +3. Es el método general — se conoce el oxígeno y se despeja lo demás.', en: 'Three oxygens add to −6, and since the molecule is neutral the two irons must add to +6: each is +3. That is the general method — you know oxygen and solve for the rest.', ca: 'Els tres oxígens sumen −6 i els dos ferros han de sumar +6: cadascun val +3.' }),

  q('fq-08', 'eso',
    { es: 'El sodio (Na) tiene valencia 1 y el cloro (Cl) también. ¿Cuál es la fórmula de su compuesto?', en: 'Sodium (Na) has valency 1 and chlorine (Cl) also 1. What is the formula of their compound?', ca: 'El sodi (Na) té valència 1 i el clor (Cl) també. Quina és la fórmula del seu compost?' },
    { es: ['NaCl', 'Na₂Cl', 'NaCl₂', 'Na₂Cl₂'], en: ['NaCl', 'Na₂Cl', 'NaCl₂', 'Na₂Cl₂'], ca: ['NaCl', 'Na₂Cl', 'NaCl₂', 'Na₂Cl₂'] },
    { es: 'NaCl', en: 'NaCl', ca: 'NaCl' },
    '🧂',
    { es: 'Una mano contra una mano: se emparejan uno a uno y no hace falta ningún subíndice. Es la sal de mesa. Cuando las valencias coinciden, la fórmula es siempre la más simple posible.', en: 'One hand against one hand: they pair up one to one and no subscript is needed. It is table salt.', ca: 'Una mà contra una mà: s\'emparellen un a un i no cal cap subíndex. És la sal de taula.' }),

  q('fq-09', 'eso',
    { es: 'El calcio tiene valencia 2 y el cloro 1. ¿Cuál es la fórmula del cloruro de calcio?', en: 'Calcium has valency 2 and chlorine 1. What is the formula of calcium chloride?', ca: 'El calci té valència 2 i el clor 1. Quina és la fórmula del clorur de calci?' },
    { es: ['CaCl₂', 'CaCl', 'Ca₂Cl', 'Ca₂Cl₂'], en: ['CaCl₂', 'CaCl', 'Ca₂Cl', 'Ca₂Cl₂'], ca: ['CaCl₂', 'CaCl', 'Ca₂Cl', 'Ca₂Cl₂'] },
    { es: 'CaCl₂', en: 'CaCl₂', ca: 'CaCl₂' },
    '❄️',
    { es: 'El calcio tiene dos manos y cada cloro solo una, así que hacen falta dos cloros. La regla práctica: la valencia de cada uno baja como subíndice del OTRO. Es la sal que se echa a las carreteras heladas.', en: 'Calcium has two hands and each chlorine only one, so two chlorines are needed. Practical rule: each one\'s valency drops as the OTHER\'s subscript.', ca: 'El calci té dues mans i cada clor només una: calen dos clors.' }),

  // ── ÓXIDOS ──────────────────────────────────────────────────────────────
  q('fq-10', 'primaria',
    { es: '¿Qué es un óxido?', en: 'What is an oxide?', ca: 'Què és un òxid?' },
    { es: ['Un compuesto de oxígeno con otro elemento', 'Cualquier compuesto que contenga hidrógeno', 'Una mezcla de metales', 'Una sustancia que siempre es un ácido'], en: ['A compound of oxygen with another element', 'Any compound containing hydrogen', 'A mixture of metals', 'A substance that is always an acid'], ca: ['Un compost d\'oxigen amb un altre element', 'Qualsevol compost que contingui hidrogen', 'Una mescla de metalls', 'Una substància que sempre és un àcid'] },
    { es: 'Un compuesto de oxígeno con otro elemento', en: 'A compound of oxygen with another element', ca: 'Un compost d\'oxigen amb un altre element' },
    '🔥',
    { es: 'La herrumbre del hierro es un óxido, y también lo son el CO₂ que exhalas y la cal viva. Es la familia más numerosa porque el oxígeno reacciona con casi todo.', en: 'Rust is an oxide, and so are the CO₂ you breathe out and quicklime. It is the biggest family because oxygen reacts with nearly everything.', ca: 'El rovell del ferro és un òxid, i també ho són el CO₂ que exhales i la calç viva.' }),

  q('fq-11', 'eso',
    { es: '¿Cómo se nombra CO₂ en la nomenclatura sistemática con prefijos?', en: 'What is CO₂ called in systematic (prefix) nomenclature?', ca: 'Com s\'anomena CO₂ en la nomenclatura sistemàtica amb prefixos?' },
    { es: ['Dióxido de carbono', 'Óxido de carbono(II)', 'Monóxido de carbono', 'Carbonato'], en: ['Carbon dioxide', 'Carbon(II) oxide', 'Carbon monoxide', 'Carbonate'], ca: ['Diòxid de carboni', 'Òxid de carboni(II)', 'Monòxid de carboni', 'Carbonat'] },
    { es: 'Dióxido de carbono', en: 'Carbon dioxide', ca: 'Diòxid de carboni' },
    '🌫️',
    { es: 'El prefijo cuenta los oxígenos: di- son dos. Se lee al revés que se escribe — primero el oxígeno y luego el otro elemento con "de" delante. CO, con un solo oxígeno, es monóxido de carbono.', en: 'The prefix counts the oxygens: di- is two. You read it backwards from how you write it. CO, with one oxygen, is carbon monoxide.', ca: 'El prefix compta els oxígens: di- són dos. Es llegeix a l\'inrevés de com s\'escriu.' }),

  q('fq-12', 'eso',
    { es: '¿Cuál es la fórmula del óxido de hierro(III)?', en: 'What is the formula of iron(III) oxide?', ca: 'Quina és la fórmula de l\'òxid de ferro(III)?' },
    { es: ['Fe₂O₃', 'FeO', 'Fe₃O₂', 'FeO₃'], en: ['Fe₂O₃', 'FeO', 'Fe₃O₂', 'FeO₃'], ca: ['Fe₂O₃', 'FeO', 'Fe₃O₂', 'FeO₃'] },
    { es: 'Fe₂O₃', en: 'Fe₂O₃', ca: 'Fe₂O₃' },
    '🔩',
    { es: 'El (III) dice que el hierro actúa con valencia 3, y el oxígeno siempre con 2: se cruzan y salen Fe₂O₃. El paréntesis existe justo porque el hierro puede actuar con 2 o con 3, y sin él no se sabría de cuál se habla.', en: 'The (III) says iron acts with valency 3, oxygen always with 2: cross them and you get Fe₂O₃. The bracket exists because iron can act with 2 or 3.', ca: 'El (III) diu que el ferro actua amb valència 3 i l\'oxigen sempre amb 2: es creuen i surt Fe₂O₃.' }),

  q('fq-13', 'eso',
    { es: '¿Para qué sirve el número romano entre paréntesis en "óxido de cobre(II)"?', en: 'What is the Roman numeral for in "copper(II) oxide"?', ca: 'Per a què serveix el número romà entre parèntesis a "òxid de coure(II)"?' },
    { es: ['Para decir con qué valencia actúa el elemento, que puede tener varias', 'Para indicar cuántos oxígenos hay', 'Para numerar los compuestos por orden', 'Para señalar que es un metal'], en: ['To state which valency the element is using, as it can have several', 'To say how many oxygens there are', 'To number compounds in order', 'To mark it as a metal'], ca: ['Per dir amb quina valència actua l\'element, que en pot tenir diverses', 'Per indicar quants oxígens hi ha', 'Per numerar els compostos per ordre', 'Per assenyalar que és un metall'] },
    { es: 'Para decir con qué valencia actúa el elemento, que puede tener varias', en: 'To state which valency the element is using, as it can have several', ca: 'Per dir amb quina valència actua l\'element, que en pot tenir diverses' },
    '🔢',
    { es: 'Es la nomenclatura de Stock. El cobre puede actuar con 1 o con 2, así que "óxido de cobre" a secas sería ambiguo: Cu₂O y CuO son sustancias distintas. Los elementos con una sola valencia, como el sodio, no llevan paréntesis.', en: 'This is Stock nomenclature. Copper can act with 1 or 2, so plain "copper oxide" would be ambiguous: Cu₂O and CuO are different substances.', ca: 'És la nomenclatura de Stock. El coure pot actuar amb 1 o amb 2, així que "òxid de coure" sol seria ambigu.' }),

  q('fq-14', 'eso',
    { es: '¿Cuál es la fórmula del óxido de aluminio, si el aluminio tiene valencia 3?', en: 'What is the formula of aluminium oxide, if aluminium has valency 3?', ca: 'Quina és la fórmula de l\'òxid d\'alumini, si l\'alumini té valència 3?' },
    { es: ['Al₂O₃', 'AlO', 'Al₃O₂', 'AlO₃'], en: ['Al₂O₃', 'AlO', 'Al₃O₂', 'AlO₃'], ca: ['Al₂O₃', 'AlO', 'Al₃O₂', 'AlO₃'] },
    { es: 'Al₂O₃', en: 'Al₂O₃', ca: 'Al₂O₃' },
    '🥫',
    { es: 'Aluminio 3, oxígeno 2: cruzados dan Al₂O₃. Esta capa de óxido es la que protege el aluminio y hace que no se corroa como el hierro, aunque el aluminio sea el metal más reactivo de los dos.', en: 'Aluminium 3, oxygen 2: crossed over they give Al₂O₃. This oxide layer is what protects aluminium from corroding like iron does.', ca: 'Alumini 3, oxigen 2: creuats donen Al₂O₃.' }),

  // ── HIDRUROS Y COMPUESTOS CON HIDRÓGENO ─────────────────────────────────
  q('fq-15', 'eso',
    { es: '¿Cuál es la fórmula del amoniaco?', en: 'What is the formula of ammonia?', ca: 'Quina és la fórmula de l\'amoníac?' },
    { es: ['NH₃', 'NH₄', 'N₂H', 'NH'], en: ['NH₃', 'NH₄', 'N₂H', 'NH'], ca: ['NH₃', 'NH₄', 'N₂H', 'NH'] },
    { es: 'NH₃', en: 'NH₃', ca: 'NH₃' },
    '🧴',
    { es: 'El nitrógeno actúa con valencia 3 frente al hidrógeno, así que se lleva tres. Es uno de los compuestos que conservan nombre propio: nadie lo llama "trihidruro de nitrógeno" aunque sea correcto.', en: 'Nitrogen acts with valency 3 against hydrogen, so it takes three. It is one of the compounds that keep a common name.', ca: 'El nitrogen actua amb valència 3 davant l\'hidrogen, així que se n\'emporta tres.' }),

  q('fq-16', 'eso',
    { es: '¿Cuál es la fórmula del metano?', en: 'What is the formula of methane?', ca: 'Quina és la fórmula del metà?' },
    { es: ['CH₄', 'CH₃', 'C₂H₄', 'CH₂'], en: ['CH₄', 'CH₃', 'C₂H₄', 'CH₂'], ca: ['CH₄', 'CH₃', 'C₂H₄', 'CH₂'] },
    { es: 'CH₄', en: 'CH₄', ca: 'CH₄' },
    '🔥',
    { es: 'El carbono tiene cuatro manos y las llena con cuatro hidrógenos. Es el gas natural que se quema en la cocina y el principal gas de efecto invernadero después del CO₂.', en: 'Carbon has four hands and fills them with four hydrogens. It is the natural gas burnt in kitchens.', ca: 'El carboni té quatre mans i les omple amb quatre hidrògens.' }),

  q('fq-17', 'eso',
    { es: 'El ácido clorhídrico es HCl. ¿Qué valencia tiene el cloro en él?', en: 'Hydrochloric acid is HCl. What valency does chlorine have in it?', ca: 'L\'àcid clorhídric és HCl. Quina valència té el clor?' },
    { es: ['1', '2', '3', '7'], en: ['1', '2', '3', '7'], ca: ['1', '2', '3', '7'] },
    { es: '1', en: '1', ca: '1' },
    '🧪',
    { es: 'Hay un solo hidrógeno, que vale 1, así que el cloro también actúa con 1. Es el ácido de los jugos gástricos del estómago y el que se vende como salfumán.', en: 'There is a single hydrogen, worth 1, so chlorine also acts with 1. It is the acid in stomach juices.', ca: 'Hi ha un sol hidrogen, que val 1, així que el clor també actua amb 1.' }),

  // ── HIDRÓXIDOS Y SALES ──────────────────────────────────────────────────
  q('fq-18', 'eso',
    { es: '¿Qué grupo de átomos caracteriza a un hidróxido?', en: 'Which group of atoms characterises a hydroxide?', ca: 'Quin grup d\'àtoms caracteritza un hidròxid?' },
    { es: ['El grupo OH', 'El grupo CO₃', 'El grupo SO₄', 'El grupo NH₄'], en: ['The OH group', 'The CO₃ group', 'The SO₄ group', 'The NH₄ group'], ca: ['El grup OH', 'El grup CO₃', 'El grup SO₄', 'El grup NH₄'] },
    { es: 'El grupo OH', en: 'The OH group', ca: 'El grup OH' },
    '🧼',
    { es: 'El grupo hidroxilo actúa siempre como un bloque de valencia 1. Los hidróxidos son las bases típicas: la sosa (NaOH) de los desatascadores y la cal apagada (Ca(OH)₂) de la construcción.', en: 'The hydroxyl group always acts as a single block with valency 1. Hydroxides are the typical bases: caustic soda and slaked lime.', ca: 'El grup hidroxil actua sempre com un bloc de valència 1.' }),

  q('fq-19', 'eso',
    { es: '¿Cuál es la fórmula del hidróxido de sodio, si el sodio tiene valencia 1?', en: 'What is the formula of sodium hydroxide, if sodium has valency 1?', ca: 'Quina és la fórmula de l\'hidròxid de sodi, si el sodi té valència 1?' },
    { es: ['NaOH', 'Na(OH)₂', 'Na₂OH', 'NaO'], en: ['NaOH', 'Na(OH)₂', 'Na₂OH', 'NaO'], ca: ['NaOH', 'Na(OH)₂', 'Na₂OH', 'NaO'] },
    { es: 'NaOH', en: 'NaOH', ca: 'NaOH' },
    '⚗️',
    { es: 'Valencia 1 contra el bloque OH, que también vale 1: uno con uno y sin paréntesis, porque no hace falta multiplicar nada. El paréntesis solo se pone cuando hay más de un grupo OH.', en: 'Valency 1 against the OH block, also 1: one to one and no brackets, because there is nothing to multiply. Brackets appear only with more than one OH.', ca: 'València 1 contra el bloc OH, que també val 1: un amb un i sense parèntesis.' }),

  q('fq-20', 'eso',
    { es: '¿Cómo se llama el compuesto NaCl en nomenclatura actual?', en: 'What is NaCl called in current nomenclature?', ca: 'Com s\'anomena el compost NaCl en nomenclatura actual?' },
    { es: ['Cloruro de sodio', 'Clorato de sodio', 'Ácido clórico', 'Óxido de sodio'], en: ['Sodium chloride', 'Sodium chlorate', 'Chloric acid', 'Sodium oxide'], ca: ['Clorur de sodi', 'Clorat de sodi', 'Àcid clòric', 'Òxid de sodi'] },
    { es: 'Cloruro de sodio', en: 'Sodium chloride', ca: 'Clorur de sodi' },
    '🧂',
    { es: 'La terminación -uro es la de las sales binarias: cloruro, sulfuro, fluoruro. Cuando además hay oxígeno la terminación cambia a -ato o -ito, que es lo que distingue el cloruro del clorato.', en: 'The -ide ending marks binary salts: chloride, sulphide, fluoride. With oxygen in the mix the ending becomes -ate or -ite.', ca: 'La terminació -ur és la de les sals binàries: clorur, sulfur, fluorur.' }),

  q('fq-21', 'eso',
    { es: 'La terminación -uro en un nombre como "sulfuro de hierro" indica que el compuesto…', en: 'The -ide ending in a name like "iron sulphide" tells you the compound…', ca: 'La terminació -ur en un nom com "sulfur de ferro" indica que el compost…' },
    { es: ['Está formado por dos elementos y ninguno es oxígeno', 'Contiene oxígeno', 'Es un ácido', 'Es un metal puro'], en: ['Is made of two elements and neither is oxygen', 'Contains oxygen', 'Is an acid', 'Is a pure metal'], ca: ['Està format per dos elements i cap és oxigen', 'Conté oxigen', 'És un àcid', 'És un metall pur'] },
    { es: 'Está formado por dos elementos y ninguno es oxígeno', en: 'Is made of two elements and neither is oxygen', ca: 'Està format per dos elements i cap és oxigen' },
    '⛓️',
    { es: 'Las terminaciones son un mapa: -uro para las sales de dos elementos sin oxígeno, -ido/-oso para óxidos y ácidos, y -ato/-ito cuando hay oxígeno dentro de la sal. Leer la terminación ya te dice medio compuesto.', en: 'Endings are a map: -ide for two-element salts without oxygen, -ate/-ite when oxygen is inside the salt. Reading the ending already tells you half the compound.', ca: 'Les terminacions són un mapa: -ur per a les sals de dos elements sense oxigen.' }),

  // ── SUSTANCIAS DE CADA DÍA ──────────────────────────────────────────────
  q('fq-22', 'primaria',
    { es: '¿Cuál es la fórmula del agua?', en: 'What is the formula of water?', ca: 'Quina és la fórmula de l\'aigua?' },
    { es: ['H₂O', 'HO₂', 'H₂O₂', 'OH'], en: ['H₂O', 'HO₂', 'H₂O₂', 'OH'], ca: ['H₂O', 'HO₂', 'H₂O₂', 'OH'] },
    { es: 'H₂O', en: 'H₂O', ca: 'H₂O' },
    '💧',
    { es: 'Dos hidrógenos y un oxígeno. Cuidado con H₂O₂, que se parece muchísimo y es agua oxigenada: un átomo de oxígeno de más cambia por completo la sustancia.', en: 'Two hydrogens and one oxygen. Careful with H₂O₂, which looks almost the same and is hydrogen peroxide: one extra oxygen changes the substance completely.', ca: 'Dos hidrògens i un oxigen. Compte amb H₂O₂, que és aigua oxigenada.' }),

  q('fq-23', 'primaria',
    { es: '¿Qué sustancia es el CO₂?', en: 'What substance is CO₂?', ca: 'Quina substància és el CO₂?' },
    { es: ['Dióxido de carbono, el gas que exhalamos al respirar', 'Oxígeno puro', 'Monóxido de carbono', 'Carbón sólido'], en: ['Carbon dioxide, the gas we breathe out', 'Pure oxygen', 'Carbon monoxide', 'Solid coal'], ca: ['Diòxid de carboni, el gas que exhalem en respirar', 'Oxigen pur', 'Monòxid de carboni', 'Carbó sòlid'] },
    { es: 'Dióxido de carbono, el gas que exhalamos al respirar', en: 'Carbon dioxide, the gas we breathe out', ca: 'Diòxid de carboni, el gas que exhalem en respirar' },
    '🌫️',
    { es: 'Es también el gas de las bebidas con burbujas y el principal gas de efecto invernadero de origen humano. No confundir con el monóxido (CO), que tiene un oxígeno menos y es mortal.', en: 'It is also the gas in fizzy drinks and the main human-made greenhouse gas. Not to be confused with monoxide (CO), one oxygen fewer and deadly.', ca: 'És també el gas de les begudes amb bombolles i el principal gas d\'efecte hivernacle.' }),

  q('fq-24', 'primaria',
    { es: '¿Qué elemento representa el símbolo Fe?', en: 'Which element does the symbol Fe stand for?', ca: 'Quin element representa el símbol Fe?' },
    { es: ['El hierro', 'El flúor', 'El fósforo', 'El fermio'], en: ['Iron', 'Fluorine', 'Phosphorus', 'Fermium'], ca: ['El ferro', 'El fluor', 'El fòsfor', 'El fermi'] },
    { es: 'El hierro', en: 'Iron', ca: 'El ferro' },
    '🔩',
    { es: 'Viene del latín ferrum, no del nombre en castellano. Pasa con varios de los metales conocidos desde la antigüedad: Na de natrium (sodio), K de kalium (potasio), Pb de plumbum (plomo) y Au de aurum (oro).', en: 'It comes from Latin ferrum, not the English name. The same happens with several metals known since antiquity: Na, K, Pb, Au.', ca: 'Ve del llatí ferrum, no del nom en català.' }),

  q('fq-25', 'eso',
    { es: '¿Por qué en una fórmula se escribe primero el metal y después el no metal?', en: 'Why is the metal written first and the non-metal second in a formula?', ca: 'Per què en una fórmula s\'escriu primer el metall i després el no metall?' },
    { es: ['Por convenio: primero el elemento menos electronegativo, que cede electrones', 'Porque el metal pesa más', 'Por orden alfabético', 'Porque el metal es más abundante'], en: ['By convention: the less electronegative element, which gives up electrons, goes first', 'Because the metal is heavier', 'Alphabetical order', 'Because the metal is more abundant'], ca: ['Per conveni: primer l\'element menys electronegatiu, que cedeix electrons', 'Perquè el metall pesa més', 'Per ordre alfabètic', 'Perquè el metall és més abundant'] },
    { es: 'Por convenio: primero el elemento menos electronegativo, que cede electrones', en: 'By convention: the less electronegative element, which gives up electrons, goes first', ca: 'Per conveni: primer l\'element menys electronegatiu, que cedeix electrons' },
    '➡️',
    { es: 'Se escribe NaCl y no ClNa. Y al NOMBRARLO se hace al revés: primero el segundo elemento ("cloruro") y luego el primero ("de sodio"). Ese cruce entre cómo se escribe y cómo se lee es lo que más despista al empezar.', en: 'You write NaCl, not ClNa. And you NAME it the other way round: the second element first ("chloride"), then the first ("of sodium"). That crossover is what confuses beginners most.', ca: 'S\'escriu NaCl i no ClNa. I en ANOMENAR-LO es fa a l\'inrevés.' }),

  q('fq-26', 'eso',
    { es: '¿Qué representa el subíndice en el gas oxígeno, O₂?', en: 'What does the subscript in oxygen gas, O₂, represent?', ca: 'Què representa el subíndex al gas oxigen, O₂?' },
    { es: ['Que en la naturaleza el oxígeno forma moléculas de dos átomos', 'Que hay dos clases de oxígeno', 'Que su valencia es 2', 'Que pesa el doble'], en: ['That in nature oxygen forms two-atom molecules', 'That there are two kinds of oxygen', 'That its valency is 2', 'That it weighs twice as much'], ca: ['Que a la natura l\'oxigen forma molècules de dos àtoms', 'Que hi ha dues classes d\'oxigen', 'Que la seva valència és 2', 'Que pesa el doble'] },
    { es: 'Que en la naturaleza el oxígeno forma moléculas de dos átomos', en: 'That in nature oxygen forms two-atom molecules', ca: 'Que a la natura l\'oxigen forma molècules de dos àtoms' },
    '💨',
    { es: 'Es una molécula diatómica, como el hidrógeno (H₂), el nitrógeno (N₂) y los halógenos. Por eso las ecuaciones se ajustan con O₂ y no con O suelto: el oxígeno atómico casi no existe libre.', en: 'It is a diatomic molecule, like hydrogen (H₂), nitrogen (N₂) and the halogens. That is why equations are balanced with O₂ and not lone O.', ca: 'És una molècula diatòmica, com l\'hidrogen (H₂) i el nitrogen (N₂).' }),

  q('fq-27', 'eso',
    { es: '¿Cuál de estas fórmulas es la del ácido sulfúrico?', en: 'Which of these is the formula of sulphuric acid?', ca: 'Quina d\'aquestes fórmules és la de l\'àcid sulfúric?' },
    { es: ['H₂SO₄', 'HSO₄', 'H₂SO₃', 'HS₂O₄'], en: ['H₂SO₄', 'HSO₄', 'H₂SO₃', 'HS₂O₄'], ca: ['H₂SO₄', 'HSO₄', 'H₂SO₃', 'HS₂O₄'] },
    { es: 'H₂SO₄', en: 'H₂SO₄', ca: 'H₂SO₄' },
    '🔋',
    { es: 'Es el ácido de las baterías de coche y el compuesto químico más fabricado del mundo. Con un oxígeno menos, H₂SO₃, es el ácido sulfuroso: la terminación -oso avisa de que tiene menos oxígeno que el -ico.', en: 'It is car battery acid and the most manufactured chemical in the world. With one oxygen fewer, H₂SO₃, it is sulphurous acid: the -ous ending flags less oxygen than -ic.', ca: 'És l\'àcid de les bateries de cotxe i el compost químic més fabricat del món.' }),

  q('fq-28', 'eso',
    { es: 'Al escribir una fórmula, ¿qué significa que un símbolo NO lleve subíndice?', en: 'In a formula, what does it mean when a symbol has NO subscript?', ca: 'En escriure una fórmula, què significa que un símbol NO porti subíndex?' },
    { es: ['Que hay exactamente un átomo de ese elemento', 'Que no hay ninguno', 'Que puede haber cualquier cantidad', 'Que es un error de escritura'], en: ['There is exactly one atom of that element', 'There are none', 'There could be any number', 'It is a typo'], ca: ['Que hi ha exactament un àtom d\'aquest element', 'Que no n\'hi ha cap', 'Que n\'hi pot haver qualsevol quantitat', 'Que és un error d\'escriptura'] },
    { es: 'Que hay exactamente un átomo de ese elemento', en: 'There is exactly one atom of that element', ca: 'Que hi ha exactament un àtom d\'aquest element' },
    '1️⃣',
    { es: 'El 1 nunca se escribe, ni como subíndice ni como coeficiente. Por eso H₂O tiene un oxígeno aunque no aparezca ningún número junto a la O.', en: 'The 1 is never written, neither as subscript nor coefficient. That is why H₂O has one oxygen even with no number next to the O.', ca: 'L\'1 no s\'escriu mai, ni com a subíndex ni com a coeficient.' }),

  q('fq-29', 'eso',
    { es: 'El símbolo del sodio es Na. ¿De dónde viene?', en: 'Sodium\'s symbol is Na. Where does it come from?', ca: 'El símbol del sodi és Na. D\'on ve?' },
    { es: ['De su nombre en latín, natrium', 'De las dos primeras letras de "sodio" en inglés', 'Del apellido de quien lo descubrió', 'Es una letra elegida al azar'], en: ['From its Latin name, natrium', 'From the first two letters of "sodium"', 'From its discoverer\'s surname', 'It was chosen at random'], ca: ['Del seu nom en llatí, natrium', 'De les dues primeres lletres de "sodi"', 'Del cognom de qui el va descobrir', 'És una lletra triada a l\'atzar'] },
    { es: 'De su nombre en latín, natrium', en: 'From its Latin name, natrium', ca: 'Del seu nom en llatí, natrium' },
    '🔤',
    { es: 'Los símbolos son internacionales precisamente porque no dependen del idioma de cada país: un químico japonés y uno español escriben los dos Na. Ese es el motivo de que se fijaran en latín.', en: 'Symbols are international precisely because they do not depend on each country\'s language: a Japanese and a Spanish chemist both write Na.', ca: 'Els símbols són internacionals precisament perquè no depenen de l\'idioma de cada país.' }),

  q('fq-30', 'eso',
    { es: '¿Cuál es la fórmula del óxido de calcio (cal viva), si el calcio tiene valencia 2?', en: 'What is the formula of calcium oxide (quicklime), if calcium has valency 2?', ca: 'Quina és la fórmula de l\'òxid de calci (calç viva), si el calci té valència 2?' },
    { es: ['CaO', 'Ca₂O', 'CaO₂', 'Ca₂O₃'], en: ['CaO', 'Ca₂O', 'CaO₂', 'Ca₂O₃'], ca: ['CaO', 'Ca₂O', 'CaO₂', 'Ca₂O₃'] },
    { es: 'CaO', en: 'CaO', ca: 'CaO' },
    '🏗️',
    { es: 'Calcio 2 y oxígeno 2: al cruzarlos saldría Ca₂O₂, pero las fórmulas se escriben siempre simplificadas, así que queda CaO. Ese paso de simplificar es el que más se olvida cuando las dos valencias coinciden.', en: 'Calcium 2 and oxygen 2: crossing them would give Ca₂O₂, but formulas are always written simplified, so CaO. That simplifying step is the one most often forgotten.', ca: 'Calci 2 i oxigen 2: en creuar-los sortiria Ca₂O₂, però les fórmules s\'escriuen sempre simplificades.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 24 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
