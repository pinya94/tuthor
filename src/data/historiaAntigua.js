// Edad Antigua (Mesopotamia, Egipto, Grecia, Roma) — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-antigua.js).
// Roma tiene su propio examen en profundidad (historiaRoma.js) — aquí solo el
// panorama general, para no duplicar contenido.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('an-01', 'primaria',
    { es: '¿Qué invento marca tradicionalmente el final de la Prehistoria y el inicio de la Edad Antigua?', en: 'What invention traditionally marks the end of Prehistory and the start of Antiquity?', ca: 'Quin invent marca tradicionalment el final de la Prehistòria i l\'inici de l\'Edat Antiga?' },
    { es: ['La escritura', 'La rueda', 'El fuego', 'La agricultura'], en: ['Writing', 'The wheel', 'Fire', 'Agriculture'], ca: ['L\'escriptura', 'La roda', 'El foc', 'L\'agricultura'] },
    { es: 'La escritura', en: 'Writing', ca: 'L\'escriptura' },
    '📜',
    { es: 'La invención de la escritura, hacia el 3000 a. C. en Mesopotamia, marca el final de la Prehistoria: a partir de ahí hay documentos escritos y hablamos de Historia.', en: 'The invention of writing, around 3000 BC in Mesopotamia, marks the end of Prehistory: from then on there are written records, and we speak of History.', ca: 'La invenció de l\'escriptura, cap al 3000 aC a Mesopotàmia, marca el final de la Prehistòria: a partir d\'aquí hi ha documents escrits i parlem d\'Història.' }),

  q('an-02', 'primaria',
    { es: '¿Para qué se construyeron las pirámides de Egipto?', en: 'What were the pyramids of Egypt built for?', ca: 'Per a què es van construir les piràmides d\'Egipte?' },
    { es: ['Como tumbas para los faraones', 'Como templos para el pueblo', 'Como palacios donde vivir', 'Como torres de vigilancia'], en: ['As tombs for the pharaohs', 'As temples for the people', 'As palaces to live in', 'As watchtowers'], ca: ['Com a tombes per als faraons', 'Com a temples per al poble', 'Com a palaus on viure', 'Com a torres de vigilància'] },
    { es: 'Como tumbas para los faraones', en: 'As tombs for the pharaohs', ca: 'Com a tombes per als faraons' },
    '🐫',
    { es: 'Las pirámides de Guiza son tumbas monumentales construidas para los faraones, con todo lo que —según creían los egipcios— necesitarían en la vida después de la muerte.', en: 'The pyramids of Giza are monumental tombs built for the pharaohs, containing everything the Egyptians believed they would need in the afterlife.', ca: 'Les piràmides de Giza són tombes monumentals construïdes per als faraons, amb tot allò que —segons creien els egipcis— necessitarien a la vida després de la mort.' }),

  q('an-03', 'primaria',
    { es: '¿Qué río fue fundamental para la civilización del Antiguo Egipto?', en: 'Which river was essential to the civilisation of Ancient Egypt?', ca: 'Quin riu va ser fonamental per a la civilització de l\'Antic Egipte?' },
    { es: ['El Nilo', 'El Éufrates', 'El Tíber', 'El Jordán'], en: ['The Nile', 'The Euphrates', 'The Tiber', 'The Jordan'], ca: ['El Nil', 'L\'Èufrates', 'El Tíber', 'El Jordà'] },
    { es: 'El Nilo', en: 'The Nile', ca: 'El Nil' },
    '🌊',
    { es: 'El Nilo inundaba sus orillas cada año dejando tierra fértil, lo que permitió la agricultura y el nacimiento de la civilización egipcia en pleno desierto.', en: 'The Nile flooded its banks every year, leaving fertile soil behind, which allowed agriculture and the birth of Egyptian civilisation in the middle of the desert.', ca: 'El Nil inundava les seves ribes cada any deixant terra fèrtil, cosa que va permetre l\'agricultura i el naixement de la civilització egípcia en ple desert.' }),

  q('an-04', 'primaria',
    { es: '¿En qué ciudad griega nació la democracia?', en: 'In which Greek city was democracy born?', ca: 'A quina ciutat grega va néixer la democràcia?' },
    { es: ['Atenas', 'Esparta', 'Corinto', 'Tebas'], en: ['Athens', 'Sparta', 'Corinth', 'Thebes'], ca: ['Atenes', 'Esparta', 'Corint', 'Tebes'] },
    { es: 'Atenas', en: 'Athens', ca: 'Atenes' },
    '🏛️',
    { es: 'En Atenas, hacia el 500 a. C., los ciudadanos varones libres votaban directamente las leyes de la ciudad: fue la primera democracia de la historia, aunque muy limitada para los estándares actuales.', en: 'In Athens, around 500 BC, free male citizens voted directly on the city\'s laws: it was the first democracy in history, though very limited by today\'s standards.', ca: 'A Atenes, cap al 500 aC, els ciutadans homes lliures votaven directament les lleis de la ciutat: va ser la primera democràcia de la història, tot i que molt limitada per als estàndards actuals.' }),

  q('an-05', 'primaria',
    { es: '¿Cada cuántos años se celebraban los Juegos Olímpicos en la Antigua Grecia?', en: 'How often were the Olympic Games held in Ancient Greece?', ca: 'Cada quants anys se celebraven els Jocs Olímpics a l\'Antiga Grècia?' },
    { es: ['Cada 4 años', 'Cada año', 'Cada 10 años', 'Cada 2 años'], en: ['Every 4 years', 'Every year', 'Every 10 years', 'Every 2 years'], ca: ['Cada 4 anys', 'Cada any', 'Cada 10 anys', 'Cada 2 anys'] },
    { es: 'Cada 4 años', en: 'Every 4 years', ca: 'Cada 4 anys' },
    '🏆',
    { es: 'Los Juegos Olímpicos antiguos se celebraban cada 4 años en Olimpia en honor a Zeus, y durante ellos se detenían las guerras entre ciudades griegas: la "tregua olímpica".', en: 'The ancient Olympic Games were held every 4 years at Olympia in honour of Zeus, and during them wars between Greek cities were paused: the "Olympic truce".', ca: 'Els Jocs Olímpics antics se celebraven cada 4 anys a Olímpia en honor a Zeus, i durant ells s\'aturaven les guerres entre ciutats gregues: la "treva olímpica".' }),

  q('an-06', 'primaria',
    { es: '¿Cómo se llama la escritura que usaban los antiguos egipcios, hecha con dibujos y símbolos?', en: 'What is the writing used by the ancient Egyptians, made of pictures and symbols, called?', ca: 'Com es diu l\'escriptura que feien servir els antics egipcis, feta amb dibuixos i símbols?' },
    { es: ['Jeroglíficos', 'Cuneiforme', 'Alfabeto latino', 'Runas'], en: ['Hieroglyphics', 'Cuneiform', 'Latin alphabet', 'Runes'], ca: ['Jeroglífics', 'Cuneïforme', 'Alfabet llatí', 'Runes'] },
    { es: 'Jeroglíficos', en: 'Hieroglyphics', ca: 'Jeroglífics' },
    '📜',
    { es: 'Los jeroglíficos egipcios combinaban dibujos que representaban objetos, sonidos e ideas. Durante siglos nadie supo leerlos, hasta que se descifraron en el siglo XIX.', en: 'Egyptian hieroglyphics combined pictures representing objects, sounds and ideas. For centuries nobody could read them, until they were deciphered in the 19th century.', ca: 'Els jeroglífics egipcis combinaven dibuixos que representaven objectes, sons i idees. Durant segles ningú va saber llegir-los, fins que es van desxifrar al segle XIX.' }),

  q('an-07', 'primaria',
    { es: '¿Cómo se llamaba el gobernante supremo del Antiguo Egipto?', en: 'What was the supreme ruler of Ancient Egypt called?', ca: 'Com s\'anomenava el governant suprem de l\'Antic Egipte?' },
    { es: ['Faraón', 'Emperador', 'César', 'Sultán'], en: ['Pharaoh', 'Emperor', 'Caesar', 'Sultan'], ca: ['Faraó', 'Emperador', 'Cèsar', 'Sultà'] },
    { es: 'Faraón', en: 'Pharaoh', ca: 'Faraó' },
    '👑',
    { es: 'El faraón gobernaba Egipto con poder absoluto y se le consideraba un dios en la tierra. Tutankamón, Ramsés II y Cleopatra fueron faraones famosos, en épocas muy distintas entre sí.', en: 'The pharaoh ruled Egypt with absolute power and was considered a living god. Tutankhamun, Ramesses II and Cleopatra were famous pharaohs, from very different periods.', ca: 'El faraó governava Egipte amb poder absolut i era considerat un déu a la terra. Tutankamon, Ramsès II i Cleòpatra van ser faraons famosos, en èpoques molt diferents entre si.' }),

  q('an-08', 'primaria',
    { es: '¿En qué región de Oriente Próximo surgieron las primeras ciudades y la primera escritura del mundo?', en: 'In which Near Eastern region did the world\'s first cities and writing appear?', ca: 'A quina regió de l\'Orient Pròxim van sorgir les primeres ciutats i la primera escriptura del món?' },
    { es: ['Mesopotamia', 'La península ibérica', 'Escandinavia', 'Los Andes'], en: ['Mesopotamia', 'The Iberian Peninsula', 'Scandinavia', 'The Andes'], ca: ['Mesopotàmia', 'La península Ibèrica', 'Escandinàvia', 'Els Andes'] },
    { es: 'Mesopotamia', en: 'Mesopotamia', ca: 'Mesopotàmia' },
    '🏺',
    { es: 'Mesopotamia, la tierra entre los ríos Tigris y Éufrates (actual Irak), es conocida como "cuna de la civilización": ahí surgieron las primeras ciudades, la rueda y la escritura.', en: 'Mesopotamia, the land between the Tigris and Euphrates rivers (present-day Iraq), is known as the "cradle of civilisation": the first cities, the wheel and writing all appeared there.', ca: 'Mesopotàmia, la terra entre els rius Tigris i Èufrates (l\'actual Iraq), és coneguda com a "bressol de la civilització": allà van sorgir les primeres ciutats, la roda i l\'escriptura.' }),

  q('an-09', 'eso',
    { es: '¿Qué imperio conquistó Alejandro Magno, extendiéndolo desde Grecia hasta la India?', en: 'What empire did Alexander the Great conquer, extending it from Greece to India?', ca: 'Quin imperi va conquerir Alexandre Magne, estenent-lo des de Grècia fins a l\'Índia?' },
    { es: ['Un imperio que abarcó Grecia, Persia y Egipto', 'El Imperio romano', 'El Imperio otomano', 'El Imperio chino'], en: ['An empire spanning Greece, Persia and Egypt', 'The Roman Empire', 'The Ottoman Empire', 'The Chinese Empire'], ca: ['Un imperi que va abastar Grècia, Pèrsia i Egipte', 'L\'Imperi romà', 'L\'Imperi otomà', 'L\'Imperi xinès'] },
    { es: 'Un imperio que abarcó Grecia, Persia y Egipto', en: 'An empire spanning Greece, Persia and Egypt', ca: 'Un imperi que va abastar Grècia, Pèrsia i Egipte' },
    '⚔️',
    { es: 'Alejandro Magno, rey de Macedonia, conquistó en poco más de una década un imperio que iba desde Grecia hasta la India, pasando por Persia y Egipto, difundiendo la cultura griega por todo Oriente.', en: 'Alexander the Great, king of Macedon, conquered in just over a decade an empire stretching from Greece to India, through Persia and Egypt, spreading Greek culture across the East.', ca: 'Alexandre Magne, rei de Macedònia, va conquerir en poc més d\'una dècada un imperi que anava des de Grècia fins a l\'Índia, passant per Pèrsia i Egipte, difonent la cultura grega per tot l\'Orient.' }),

  q('an-10', 'eso',
    { es: '¿Qué faraón egipcio se hizo mundialmente famoso en 1922 al descubrirse su tumba casi intacta?', en: 'Which Egyptian pharaoh became world-famous in 1922 when his tomb was found almost intact?', ca: 'Quin faraó egipci es va fer mundialment famós el 1922 en descobrir-se la seva tomba gairebé intacta?' },
    { es: ['Tutankamón', 'Ramsés II', 'Keops', 'Akenatón'], en: ['Tutankhamun', 'Ramesses II', 'Khufu', 'Akhenaten'], ca: ['Tutankamon', 'Ramsès II', 'Kheops', 'Akhenatón'] },
    { es: 'Tutankamón', en: 'Tutankhamun', ca: 'Tutankamon' },
    '⚱️',
    { es: 'El arqueólogo Howard Carter descubrió en 1922 la tumba de Tutankamón en el Valle de los Reyes, casi intacta y llena de tesoros —un faraón secundario que reinó poco, pero el hallazgo más famoso de la egiptología.', en: 'Archaeologist Howard Carter discovered Tutankhamun\'s tomb in the Valley of the Kings in 1922, almost intact and full of treasures — a minor pharaoh who reigned briefly, but Egyptology\'s most famous find.', ca: 'L\'arqueòleg Howard Carter va descobrir el 1922 la tomba de Tutankamon a la Vall dels Reis, gairebé intacta i plena de tresors —un faraó secundari que va regnar poc, però la troballa més famosa de l\'egiptologia.' }),

  q('an-11', 'eso',
    { es: '¿Qué pueblo de Mesopotamia inventó la escritura cuneiforme?', en: 'Which Mesopotamian people invented cuneiform writing?', ca: 'Quin poble de Mesopotàmia va inventar l\'escriptura cuneïforme?' },
    { es: ['Los sumerios', 'Los fenicios', 'Los hititas', 'Los persas'], en: ['The Sumerians', 'The Phoenicians', 'The Hittites', 'The Persians'], ca: ['Els sumeris', 'Els fenicis', 'Els hitites', 'Els perses'] },
    { es: 'Los sumerios', en: 'The Sumerians', ca: 'Els sumeris' },
    '🏺',
    { es: 'Los sumerios, en el sur de Mesopotamia, crearon hacia el 3000 a. C. la escritura cuneiforme, marcando símbolos en forma de cuña sobre tablillas de arcilla húmeda con un punzón.', en: 'The Sumerians, in southern Mesopotamia, created cuneiform writing around 3000 BC, pressing wedge-shaped marks into wet clay tablets with a stylus.', ca: 'Els sumeris, al sud de Mesopotàmia, van crear cap al 3000 aC l\'escriptura cuneïforme, marcant símbols en forma de falca sobre tauletes d\'argila humida amb un punxó.' }),

  q('an-12', 'eso',
    { es: '¿Qué objeto, hallado en Egipto en 1799, permitió finalmente descifrar los jeroglíficos?', en: 'What object, found in Egypt in 1799, finally allowed hieroglyphics to be deciphered?', ca: 'Quin objecte, trobat a Egipte el 1799, va permetre finalment desxifrar els jeroglífics?' },
    { es: ['La piedra de Rosetta', 'La máscara de Tutankamón', 'El Papiro de Ani', 'La Esfinge'], en: ['The Rosetta Stone', 'Tutankhamun\'s mask', 'The Papyrus of Ani', 'The Sphinx'], ca: ['La pedra de Rosetta', 'La màscara de Tutankamon', 'El Papir d\'Ani', 'L\'Esfinx'] },
    { es: 'La piedra de Rosetta', en: 'The Rosetta Stone', ca: 'La pedra de Rosetta' },
    '🗿',
    { es: 'La piedra de Rosetta tenía el mismo texto escrito en jeroglíficos, en escritura demótica egipcia y en griego antiguo. Comparando las tres versiones, Jean-François Champollion logró descifrar los jeroglíficos en 1822.', en: 'The Rosetta Stone had the same text written in hieroglyphics, Egyptian demotic script and ancient Greek. By comparing the three versions, Jean-François Champollion managed to decipher hieroglyphics in 1822.', ca: 'La pedra de Rosetta tenia el mateix text escrit en jeroglífics, en escriptura demòtica egípcia i en grec antic. Comparant les tres versions, Jean-François Champollion va aconseguir desxifrar els jeroglífics el 1822.' }),

  q('an-13', 'eso',
    { es: '¿En qué año cayó el Imperio romano de Occidente, marcando tradicionalmente el final de la Edad Antigua?', en: 'In what year did the Western Roman Empire fall, traditionally marking the end of Antiquity?', ca: 'En quin any va caure l\'Imperi romà d\'Occident, marcant tradicionalment el final de l\'Edat Antiga?' },
    { es: ['476', '1492', '146 a. C.', '1000'], en: ['476', '1492', '146 BC', '1000'], ca: ['476', '1492', '146 aC', '1000'] },
    { es: '476', en: '476', ca: '476' },
    '📅',
    { es: 'En el año 476 d. C., el último emperador romano de Occidente fue depuesto. Esa fecha se usa tradicionalmente para marcar el final de la Edad Antigua y el comienzo de la Edad Media.', en: 'In AD 476, the last Western Roman emperor was deposed. That date is traditionally used to mark the end of Antiquity and the start of the Middle Ages.', ca: 'L\'any 476 dC, l\'últim emperador romà d\'Occident va ser deposat. Aquesta data s\'utilitza tradicionalment per marcar el final de l\'Edat Antiga i el començament de l\'Edat Mitjana.' }),

  q('an-14', 'eso',
    { es: '¿Qué tenían en común Mesopotamia, Egipto, el valle del Indo y China antigua como primeras grandes civilizaciones?', en: 'What did Mesopotamia, Egypt, the Indus Valley and ancient China have in common as the first great civilisations?', ca: 'Què tenien en comú Mesopotàmia, Egipte, la vall de l\'Indus i la Xina antiga com a primeres grans civilitzacions?' },
    { es: ['Se desarrollaron junto a grandes ríos', 'Estaban todas en el mismo continente', 'Hablaban el mismo idioma', 'Todas tenían faraones'], en: ['They developed alongside great rivers', 'They were all on the same continent', 'They spoke the same language', 'They all had pharaohs'], ca: ['Es van desenvolupar al costat de grans rius', 'Estaven totes al mateix continent', 'Parlaven el mateix idioma', 'Totes tenien faraons'] },
    { es: 'Se desarrollaron junto a grandes ríos', en: 'They developed alongside great rivers', ca: 'Es van desenvolupar al costat de grans rius' },
    '🌊',
    { es: 'Mesopotamia (Tigris y Éufrates), Egipto (Nilo), el valle del Indo (Indo) y China (Huang He) nacieron todas junto a grandes ríos, cuyas inundaciones fertilizaban la tierra y permitían alimentar a poblaciones grandes.', en: 'Mesopotamia (Tigris and Euphrates), Egypt (Nile), the Indus Valley (Indus) and China (Yellow River) all arose beside great rivers, whose floods fertilised the land and allowed large populations to be fed.', ca: 'Mesopotàmia (Tigris i Èufrates), Egipte (Nil), la vall de l\'Indus (Indus) i la Xina (Huang He) van néixer totes al costat de grans rius, les inundacions dels quals fertilitzaven la terra i permetien alimentar poblacions grans.' }),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
