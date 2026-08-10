// Antigua Roma — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-antigua-roma.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('roma-01', 'eso',
    { es: '¿Quién fundó Roma según la leyenda?', en: 'Who founded Rome, according to legend?', ca: 'Qui va fundar Roma segons la llegenda?' },
    { es: ['Rómulo', 'Julio César', 'Augusto', 'Eneas'], en: ['Romulus', 'Julius Caesar', 'Augustus', 'Aeneas'], ca: ['Ròmul', 'Juli Cèsar', 'August', 'Eneas'] },
    { es: 'Rómulo', en: 'Romulus', ca: 'Ròmul' },
    '🏛️',
    { es: 'La fundación mítica de Roma se atribuye a Rómulo en el año 753 a.C. — la fecha con la que arranca toda la cronología romana.', en: 'The mythical founding of Rome is attributed to Romulus in 753 BC — the date that begins the whole Roman chronology.', ca: 'La fundació mítica de Roma s\'atribueix a Ròmul l\'any 753 aC — la data amb què arrenca tota la cronologia romana.' }),

  q('roma-02', 'eso',
    { es: '¿En qué orden se sucedieron los tres periodos de la historia de Roma?', en: 'In what order did the three periods of Roman history follow one another?', ca: 'En quin ordre es van succeir els tres períodes de la història de Roma?' },
    { es: ['Monarquía → República → Imperio', 'Imperio → República → Monarquía', 'República → Monarquía → Imperio', 'Monarquía → Imperio → República'], en: ['Kingdom → Republic → Empire', 'Empire → Republic → Kingdom', 'Republic → Kingdom → Empire', 'Kingdom → Empire → Republic'], ca: ['Monarquia → República → Imperi', 'Imperi → República → Monarquia', 'República → Monarquia → Imperi', 'Monarquia → Imperi → República'] },
    { es: 'Monarquía → República → Imperio', en: 'Kingdom → Republic → Empire', ca: 'Monarquia → República → Imperi' },
    '📜',
    { es: 'Los tres periodos de Roma van en este orden: Monarquía (753-509 a.C.), República (509-27 a.C.) e Imperio (27 a.C.-476 d.C.). Saber en qué periodo encuadrar cada evento es la base del temario.', en: 'Rome\'s three periods follow this order: Kingdom (753-509 BC), Republic (509-27 BC) and Empire (27 BC-AD 476). Knowing which period each event belongs to is the basis of the syllabus.', ca: 'Els tres períodes de Roma van en aquest ordre: Monarquia (753-509 aC), República (509-27 aC) i Imperi (27 aC-476 dC). Saber en quin període enquadrar cada esdeveniment és la base del temari.' }),

  q('roma-03', 'eso',
    { es: '¿Contra qué ciudad luchó Roma en las Guerras Púnicas?', en: 'Which city did Rome fight against in the Punic Wars?', ca: 'Contra quina ciutat va lluitar Roma a les Guerres Púniques?' },
    { es: ['Cartago', 'Atenas', 'Esparta', 'Alejandría'], en: ['Carthage', 'Athens', 'Sparta', 'Alexandria'], ca: ['Cartago', 'Atenes', 'Esparta', 'Alexandria'] },
    { es: 'Cartago', en: 'Carthage', ca: 'Cartago' },
    '🐘',
    { es: 'Las Guerras Púnicas (264-146 a.C.) enfrentaron a Roma con Cartago, cuyo general más famoso, Aníbal, cruzó los Alpes con elefantes para atacar Italia.', en: 'The Punic Wars (264-146 BC) pitted Rome against Carthage, whose most famous general, Hannibal, crossed the Alps with elephants to attack Italy.', ca: 'Les Guerres Púniques (264-146 aC) van enfrontar Roma amb Cartago, el general més famós de la qual, Anníbal, va creuar els Alps amb elefants per atacar Itàlia.' }),

  q('roma-04', 'eso',
    { es: '¿Quién fue el primer emperador de Roma?', en: 'Who was the first Roman emperor?', ca: 'Qui va ser el primer emperador de Roma?' },
    { es: ['Augusto', 'Julio César', 'Nerón', 'Trajano'], en: ['Augustus', 'Julius Caesar', 'Nero', 'Trajan'], ca: ['August', 'Juli Cèsar', 'Neró', 'Trajà'] },
    { es: 'Augusto', en: 'Augustus', ca: 'August' },
    '👑',
    { es: 'Augusto se convirtió en el primer emperador en el 27 a.C., tras el asesinato de Julio César, dando comienzo al Imperio Romano. Julio César nunca llegó a ser emperador.', en: 'Augustus became the first emperor in 27 BC, after the assassination of Julius Caesar, marking the start of the Roman Empire. Julius Caesar himself never became emperor.', ca: 'August es va convertir en el primer emperador el 27 aC, després de l\'assassinat de Juli Cèsar, donant inici a l\'Imperi Romà. Juli Cèsar mai va arribar a ser emperador.' }),

  q('roma-05', 'eso',
    { es: '¿Cuándo y cómo murió Julio César?', en: 'When and how did Julius Caesar die?', ca: 'Quan i com va morir Juli Cèsar?' },
    { es: ['Asesinado en el 44 a.C., en los Idus de marzo', 'De muerte natural en el 27 a.C.', 'En batalla contra Cartago', 'Ejecutado por Augusto'], en: ['Assassinated in 44 BC, on the Ides of March', 'Of natural causes in 27 BC', 'In battle against Carthage', 'Executed by Augustus'], ca: ['Assassinat el 44 aC, als Idus de març', 'De mort natural el 27 aC', 'En batalla contra Cartago', 'Executat per August'] },
    { es: 'Asesinado en el 44 a.C., en los Idus de marzo', en: 'Assassinated in 44 BC, on the Ides of March', ca: 'Assassinat el 44 aC, als Idus de març' },
    '🗡️',
    { es: 'Julio César fue asesinado por un grupo de senadores en los Idus de marzo (15 de marzo) del 44 a.C., mientras aún gobernaba como dictador de la República.', en: 'Julius Caesar was assassinated by a group of senators on the Ides of March (15 March) 44 BC, while he was still ruling as dictator of the Republic.', ca: 'Juli Cèsar va ser assassinat per un grup de senadors als Idus de març (15 de març) del 44 aC, mentre encara governava com a dictador de la República.' }),

  q('roma-06', 'eso',
    { es: '¿En qué año cayó el Imperio Romano de Occidente?', en: 'In what year did the Western Roman Empire fall?', ca: 'En quin any va caure l\'Imperi Romà d\'Occident?' },
    { es: ['476 d.C.', '27 a.C.', '509 a.C.', '1453 d.C.'], en: ['AD 476', '27 BC', '509 BC', 'AD 1453'], ca: ['476 dC', '27 aC', '509 aC', '1453 dC'] },
    { es: '476 d.C.', en: 'AD 476', ca: '476 dC' },
    '🏚️',
    { es: 'El Imperio Romano de Occidente cayó en el 476 d.C. ante los pueblos germánicos. El Imperio de Oriente (Bizancio) sobrevivió hasta 1453.', en: 'The Western Roman Empire fell in AD 476 to the Germanic peoples. The Eastern Empire (Byzantium) survived until 1453.', ca: 'L\'Imperi Romà d\'Occident va caure el 476 dC davant els pobles germànics. L\'Imperi d\'Orient (Bizanci) va sobreviure fins al 1453.' }),

  q('roma-07', 'eso',
    { es: '¿Qué emperador llevó el Imperio Romano a su máxima extensión?', en: 'Which emperor brought the Roman Empire to its greatest extent?', ca: 'Quin emperador va portar l\'Imperi Romà a la seva màxima extensió?' },
    { es: ['Trajano', 'Nerón', 'Calígula', 'Rómulo Augústulo'], en: ['Trajan', 'Nero', 'Caligula', 'Romulus Augustulus'], ca: ['Trajà', 'Neró', 'Calígula', 'Ròmul Augústul'] },
    { es: 'Trajano', en: 'Trajan', ca: 'Trajà' },
    '🗺️',
    { es: 'Trajano gobernó entre el 98 y el 117 d.C. y llevó el Imperio Romano a su máxima extensión territorial, abarcando desde Britania hasta Mesopotamia.', en: 'Trajan ruled from AD 98 to 117 and brought the Roman Empire to its greatest territorial extent, stretching from Britain to Mesopotamia.', ca: 'Trajà va governar entre el 98 i el 117 dC i va portar l\'Imperi Romà a la seva màxima extensió territorial, des de Britània fins a Mesopotàmia.' }),

  q('roma-08', 'eso',
    { es: '¿Cómo se llama el sistema de escritura de números que usaban los romanos?', en: 'What is the numeral system the Romans used called?', ca: 'Com es diu el sistema d\'escriptura de nombres que feien servir els romans?' },
    { es: ['Números romanos', 'Números arábigos', 'Sistema decimal', 'Numeración egipcia'], en: ['Roman numerals', 'Arabic numerals', 'The decimal system', 'Egyptian numerals'], ca: ['Nombres romans', 'Nombres aràbics', 'Sistema decimal', 'Numeració egípcia'] },
    { es: 'Números romanos', en: 'Roman numerals', ca: 'Nombres romans' },
    '🔢',
    { es: 'Los números romanos (I, V, X, L, C, D, M) es el sistema de numeración que Roma dejó como legado y que todavía se usa hoy en relojes o para numerar siglos.', en: 'Roman numerals (I, V, X, L, C, D, M) are the numbering system Rome left as a legacy, still used today on clocks or to number centuries.', ca: 'Els nombres romans (I, V, X, L, C, D, M) és el sistema de numeració que Roma va deixar com a llegat i que encara s\'usa avui en rellotges o per numerar segles.' }),

  // ── Bachillerato: instituciones republicanas y figuras adicionales ──
  q('roma-09', 'bachillerato',
    { es: '¿Qué institución era el órgano político más poderoso de la República romana?', en: 'Which institution was the most powerful political body of the Roman Republic?', ca: 'Quina institució era l\'òrgan polític més poderós de la República romana?' },
    { es: ['El Senado', 'El Coliseo', 'El Foro', 'El Panteón'], en: ['The Senate', 'The Colosseum', 'The Forum', 'The Pantheon'], ca: ['El Senat', 'El Colosseu', 'El Fòrum', 'El Panteó'] },
    { es: 'El Senado', en: 'The Senate', ca: 'El Senat' },
    '🏛️',
    { es: 'El Senado, formado por la aristocracia romana, era el órgano político más poderoso de la República, base histórica del derecho occidental.', en: 'The Senate, made up of the Roman aristocracy, was the most powerful political body of the Republic, a historical foundation of Western law.', ca: 'El Senat, format per l\'aristocràcia romana, era l\'òrgan polític més poderós de la República, base històrica del dret occidental.' }),

  q('roma-10', 'bachillerato',
    { es: '¿Cómo se llamaban los dos magistrados que gobernaban Roma cada año durante la República?', en: 'What were the two magistrates who governed Rome each year during the Republic called?', ca: 'Com es deien els dos magistrats que governaven Roma cada any durant la República?' },
    { es: ['Cónsules', 'Emperadores', 'Tribunos militares', 'Procónsules'], en: ['Consuls', 'Emperors', 'Military tribunes', 'Proconsuls'], ca: ['Cònsols', 'Emperadors', 'Tribuns militars', 'Procònsols'] },
    { es: 'Cónsules', en: 'Consuls', ca: 'Cònsols' },
    '⚖️',
    { es: 'Cada año, la República elegía a dos cónsules, que gobernaban conjuntamente durante un año — un sistema pensado para evitar que nadie concentrara demasiado poder.', en: 'Each year the Republic elected two consuls, who governed jointly for a year — a system designed to prevent anyone from concentrating too much power.', ca: 'Cada any, la República elegia dos cònsols, que governaven conjuntament durant un any — un sistema pensat per evitar que ningú concentrés massa poder.' }),

  q('roma-11', 'bachillerato',
    { es: '¿Qué magistratura defendía los intereses del pueblo llano (la plebe)?', en: 'Which magistracy defended the interests of the common people (the plebs)?', ca: 'Quina magistratura defensava els interessos del poble pla (la plebs)?' },
    { es: ['El tribuno de la plebe', 'El cónsul', 'El censor', 'El pretor'], en: ['The tribune of the plebs', 'The consul', 'The censor', 'The praetor'], ca: ['El tribú de la plebs', 'El cònsol', 'El censor', 'El pretor'] },
    { es: 'El tribuno de la plebe', en: 'The tribune of the plebs', ca: 'El tribú de la plebs' },
    '✊',
    { es: 'El tribuno de la plebe era el magistrado encargado de defender los derechos de los plebeyos frente al poder de la aristocracia patricia.', en: 'The tribune of the plebs was the magistrate responsible for defending the rights of the plebeians against the power of the patrician aristocracy.', ca: 'El tribú de la plebs era el magistrat encarregat de defensar els drets dels plebeus davant el poder de l\'aristocràcia patrícia.' }),

  q('roma-12', 'bachillerato',
    { es: '¿Cuál fue el primer código de leyes escritas de Roma?', en: 'What was Rome\'s first code of written laws?', ca: 'Quin va ser el primer codi de lleis escrites de Roma?' },
    { es: ['La Ley de las XII Tablas', 'El Código de Justiniano', 'La Lex Canuleia', 'Las Doce Tribus'], en: ['The Law of the Twelve Tables', 'The Code of Justinian', 'The Lex Canuleia', 'The Twelve Tribes'], ca: ['La Llei de les XII Taules', 'El Codi de Justinià', 'La Lex Canuleia', 'Les Dotze Tribus'] },
    { es: 'La Ley de las XII Tablas', en: 'The Law of the Twelve Tables', ca: 'La Llei de les XII Taules' },
    '📜',
    { es: 'La Ley de las XII Tablas (siglo V a.C.) fue el primer código de leyes escritas de Roma, base de todo el derecho romano posterior.', en: 'The Law of the Twelve Tables (5th century BC) was Rome\'s first code of written laws, the foundation of all later Roman law.', ca: 'La Llei de les XII Taules (segle V aC) va ser el primer codi de lleis escrites de Roma, base de tot el dret romà posterior.' }),

  q('roma-13', 'bachillerato',
    { es: '¿Quién depuso al último emperador romano de Occidente, Rómulo Augústulo?', en: 'Who deposed Romulus Augustulus, the last Western Roman emperor?', ca: 'Qui va deposar l\'últim emperador romà d\'Occident, Ròmul Augústul?' },
    { es: ['Odoacro', 'Atila', 'Alarico', 'Genserico'], en: ['Odoacer', 'Attila', 'Alaric', 'Genseric'], ca: ['Odoacre', 'Àtila', 'Alaric', 'Genseric'] },
    { es: 'Odoacro', en: 'Odoacer', ca: 'Odoacre' },
    '🛡️',
    { es: 'En el 476 d.C., el caudillo germánico Odoacro depuso a Rómulo Augústulo, el último emperador romano de Occidente, marcando el final del Imperio Romano de Occidente.', en: 'In AD 476, the Germanic chieftain Odoacer deposed Romulus Augustulus, the last Western Roman emperor, marking the end of the Western Roman Empire.', ca: 'El 476 dC, el cabdill germànic Odoacre va deposar Ròmul Augústul, l\'últim emperador romà d\'Occident, marcant el final de l\'Imperi Romà d\'Occident.' }),

  q('roma-14', 'bachillerato',
    { es: '¿Qué emperador convirtió el cristianismo en religión tolerada del Imperio?', en: 'Which emperor made Christianity a tolerated religion of the Empire?', ca: 'Quin emperador va convertir el cristianisme en religió tolerada de l\'Imperi?' },
    { es: ['Constantino', 'Nerón', 'Diocleciano', 'Augusto'], en: ['Constantine', 'Nero', 'Diocletian', 'Augustus'], ca: ['Constantí', 'Neró', 'Dioclecià', 'August'] },
    { es: 'Constantino', en: 'Constantine', ca: 'Constantí' },
    '✝️',
    { es: 'El emperador Constantino, con el Edicto de Milán (313 d.C.), puso fin a las persecuciones y toleró el cristianismo, que acabaría convirtiéndose en religión oficial del Imperio.', en: 'Emperor Constantine, with the Edict of Milan (AD 313), ended the persecutions and tolerated Christianity, which would go on to become the Empire\'s official religion.', ca: 'L\'emperador Constantí, amb l\'Edicte de Milà (313 dC), va posar fi a les persecucions i va tolerar el cristianisme, que acabaria convertint-se en religió oficial de l\'Imperi.' }),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
