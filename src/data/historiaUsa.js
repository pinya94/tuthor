// Independencia Americana — banco de preguntas del examen de teoría (Bachillerato).
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-independencia-americana.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('usa-01', 'bachillerato',
    { es: '¿Qué protesta de 1773 se hizo contra el monopolio británico del té?', en: 'What 1773 protest was staged against the British tea monopoly?', ca: 'Quina protesta del 1773 es va fer contra el monopoli britànic del te?' },
    { es: ['El Motín del Té de Boston', 'La Masacre de Boston', 'La Marcha de la Sal', 'El Motín del Whisky'], en: ['The Boston Tea Party', 'The Boston Massacre', 'The Salt March', 'The Whiskey Rebellion'], ca: ['El Motí del Te de Boston', 'La Massacre de Boston', 'La Marxa de la Sal', 'El Motí del Whisky'] },
    { es: 'El Motín del Té de Boston', en: 'The Boston Tea Party', ca: 'El Motí del Te de Boston' },
    '🍵',
    { es: 'En 1773, colonos disfrazados arrojaron cargamentos de té al mar en el puerto de Boston para protestar contra el monopolio británico y los impuestos sin representación.', en: 'In 1773, colonists in disguise threw shipments of tea into the sea in Boston harbour to protest against the British monopoly and taxation without representation.', ca: 'El 1773, colons disfressats van llançar carregaments de te al mar al port de Boston per protestar contra el monopoli britànic i els impostos sense representació.' }),

  q('usa-02', 'bachillerato',
    { es: '¿Qué frase resume la causa principal del conflicto?', en: 'Which phrase sums up the main cause of the conflict?', ca: 'Quina frase resumeix la causa principal del conflicte?' },
    { es: ['"No taxation without representation"', '"Give me liberty or give me death"', '"We hold these truths"', '"Don\'t tread on me"'], en: ['"No taxation without representation"', '"Give me liberty or give me death"', '"We hold these truths"', '"Don\'t tread on me"'], ca: ['"No taxation without representation"', '"Give me liberty or give me death"', '"We hold these truths"', '"Don\'t tread on me"'] },
    { es: '"No taxation without representation"', en: '"No taxation without representation"', ca: '"No taxation without representation"' },
    '💬',
    { es: '"No taxation without representation" (no a los impuestos sin representación) resume el malestar colonial: Gran Bretaña les cobraba impuestos sin darles voz en el Parlamento.', en: '"No taxation without representation" sums up colonial grievances: Britain taxed them without giving them a voice in Parliament.', ca: '"No taxation without representation" (no als impostos sense representació) resumeix el malestar colonial: la Gran Bretanya els cobrava impostos sense donar-los veu al Parlament.' }),

  q('usa-03', 'bachillerato',
    { es: '¿Cuándo se aprobó la Declaración de Independencia?', en: 'When was the Declaration of Independence adopted?', ca: 'Quan es va aprovar la Declaració d\'Independència?' },
    { es: ['4 de julio de 1776', '17 de junio de 1775', '3 de septiembre de 1783', '17 de septiembre de 1787'], en: ['4 July 1776', '17 June 1775', '3 September 1783', '17 September 1787'], ca: ['4 de juliol de 1776', '17 de juny de 1775', '3 de setembre de 1783', '17 de setembre de 1787'] },
    { es: '4 de julio de 1776', en: '4 July 1776', ca: '4 de juliol de 1776' },
    '📜',
    { es: 'El 4 de julio de 1776 se aprobó la Declaración de Independencia, redactada principalmente por Thomas Jefferson. Esta fecha se celebra hoy como el día nacional de EE. UU.', en: 'On 4 July 1776 the Declaration of Independence, drafted mainly by Thomas Jefferson, was adopted. This date is celebrated today as the US national day.', ca: 'El 4 de juliol de 1776 es va aprovar la Declaració d\'Independència, redactada principalment per Thomas Jefferson. Aquesta data se celebra avui com el dia nacional dels EUA.' }),

  q('usa-04', 'bachillerato',
    { es: '¿Quién redactó principalmente la Declaración de Independencia?', en: 'Who was the main author of the Declaration of Independence?', ca: 'Qui va redactar principalment la Declaració d\'Independència?' },
    { es: ['Thomas Jefferson', 'George Washington', 'Benjamin Franklin', 'John Adams'], en: ['Thomas Jefferson', 'George Washington', 'Benjamin Franklin', 'John Adams'], ca: ['Thomas Jefferson', 'George Washington', 'Benjamin Franklin', 'John Adams'] },
    { es: 'Thomas Jefferson', en: 'Thomas Jefferson', ca: 'Thomas Jefferson' },
    '✍️',
    { es: 'Thomas Jefferson fue el redactor principal de la Declaración de Independencia, aunque Franklin y Adams también participaron en su revisión.', en: 'Thomas Jefferson was the main author of the Declaration of Independence, although Franklin and Adams also helped revise it.', ca: 'Thomas Jefferson va ser el redactor principal de la Declaració d\'Independència, encara que Franklin i Adams també van participar en la seva revisió.' }),

  q('usa-05', 'bachillerato',
    { es: '¿Qué país europeo se alió con los colonos tras la victoria de Saratoga (1777)?', en: 'Which European country allied with the colonists after the victory at Saratoga (1777)?', ca: 'Quin país europeu es va aliar amb els colons després de la victòria de Saratoga (1777)?' },
    { es: ['Francia', 'España', 'Países Bajos', 'Prusia'], en: ['France', 'Spain', 'The Netherlands', 'Prussia'], ca: ['França', 'Espanya', 'Països Baixos', 'Prússia'] },
    { es: 'Francia', en: 'France', ca: 'França' },
    '🇫🇷',
    { es: 'Tras la victoria colonial en Saratoga en 1777, Francia decidió aliarse abiertamente con los colonos, aportando tropas y flota que resultarían decisivas.', en: 'After the colonial victory at Saratoga in 1777, France decided to openly ally with the colonists, providing troops and a fleet that would prove decisive.', ca: 'Després de la victòria colonial a Saratoga el 1777, França va decidir aliar-se obertament amb els colons, aportant tropes i flota que resultarien decisives.' }),

  q('usa-06', 'bachillerato',
    { es: '¿Dónde se rindieron definitivamente las tropas británicas?', en: 'Where did British troops finally surrender?', ca: 'On es van rendir definitivament les tropes britàniques?' },
    { es: ['Yorktown', 'Filadelfia', 'Lexington', 'Nueva York'], en: ['Yorktown', 'Philadelphia', 'Lexington', 'New York'], ca: ['Yorktown', 'Filadèlfia', 'Lexington', 'Nova York'] },
    { es: 'Yorktown', en: 'Yorktown', ca: 'Yorktown' },
    '🏳️',
    { es: 'La rendición británica en Yorktown en 1781, con apoyo decisivo de las tropas francesas, puso fin a los combates principales de la guerra.', en: 'The British surrender at Yorktown in 1781, with decisive support from French troops, put an end to the main fighting of the war.', ca: 'La rendició britànica a Yorktown el 1781, amb suport decisiu de les tropes franceses, va posar fi als combats principals de la guerra.' }),

  q('usa-07', 'bachillerato',
    { es: '¿Qué tratado de 1783 puso fin formalmente a la guerra?', en: 'Which 1783 treaty formally ended the war?', ca: 'Quin tractat del 1783 va posar fi formalment a la guerra?' },
    { es: ['El Tratado de París', 'El Tratado de Versalles', 'El Tratado de Utrecht', 'El Tratado de Gante'], en: ['The Treaty of Paris', 'The Treaty of Versailles', 'The Treaty of Utrecht', 'The Treaty of Ghent'], ca: ['El Tractat de París', 'El Tractat de Versalles', 'El Tractat d\'Utrecht', 'El Tractat de Gant'] },
    { es: 'El Tratado de París', en: 'The Treaty of Paris', ca: 'El Tractat de París' },
    '🤝',
    { es: 'El Tratado de París de 1783 selló la victoria: Gran Bretaña reconoció formalmente la independencia de los Estados Unidos.', en: 'The 1783 Treaty of Paris sealed the victory: Britain formally recognised the independence of the United States.', ca: 'El Tractat de París de 1783 va segellar la victòria: la Gran Bretanya va reconèixer formalment la independència dels Estats Units.' }),

  q('usa-08', 'bachillerato',
    { es: '¿En qué año se aprobó la Constitución de los Estados Unidos?', en: 'In what year was the US Constitution adopted?', ca: 'En quin any es va aprovar la Constitució dels Estats Units?' },
    { es: ['1787', '1776', '1783', '1791'], en: ['1787', '1776', '1783', '1791'], ca: ['1787', '1776', '1783', '1791'] },
    { es: '1787', en: '1787', ca: '1787' },
    '📘',
    { es: 'La Constitución de 1787 estableció la separación de poderes que todavía rige en Estados Unidos: legislativo, ejecutivo y judicial.', en: 'The 1787 Constitution established the separation of powers that still governs the United States today: legislative, executive and judicial.', ca: 'La Constitució de 1787 va establir la separació de poders que encara regeix als Estats Units: legislatiu, executiu i judicial.' }),

  q('usa-09', 'bachillerato',
    { es: '¿Cuántas colonias británicas originales se independizaron?', en: 'How many original British colonies gained independence?', ca: 'Quantes colònies britàniques originals es van independitzar?' },
    { es: ['13', '10', '15', '20'], en: ['13', '10', '15', '20'], ca: ['13', '10', '15', '20'] },
    { es: '13', en: '13', ca: '13' },
    '⭐',
    { es: 'Las Trece Colonias británicas de Norteamérica se convirtieron en los primeros 13 estados de EE. UU. — de ahí las 13 franjas de la bandera estadounidense.', en: 'The Thirteen British Colonies of North America became the first 13 US states — hence the 13 stripes on the American flag.', ca: 'Les Tretze Colònies britàniques de Nord-amèrica es van convertir en els primers 13 estats dels EUA — d\'aquí les 13 franges de la bandera nord-americana.' }),

  q('usa-10', 'bachillerato',
    { es: '¿Qué impuesto de 1765 provocó las primeras protestas coloniales serias?', en: 'Which 1765 tax sparked the first serious colonial protests?', ca: 'Quin impost del 1765 va provocar les primeres protestes colonials serioses?' },
    { es: ['La Ley del Timbre', 'El impuesto al tabaco', 'La Ley del Azúcar', 'El impuesto a la sal'], en: ['The Stamp Act', 'The tobacco tax', 'The Sugar Act', 'The salt tax'], ca: ['La Llei del Segell', 'L\'impost al tabac', 'La Llei del Sucre', 'L\'impost a la sal'] },
    { es: 'La Ley del Timbre', en: 'The Stamp Act', ca: 'La Llei del Segell' },
    '📮',
    { es: 'La Ley del Timbre de 1765 gravaba todo tipo de documentos impresos en las colonias y desencadenó las primeras protestas serias contra los impuestos sin representación.', en: 'The 1765 Stamp Act taxed all kinds of printed documents in the colonies and triggered the first serious protests against taxation without representation.', ca: 'La Llei del Segell de 1765 gravava tota mena de documents impresos a les colònies i va desencadenar les primeres protestes serioses contra els impostos sense representació.' }),

  q('usa-11', 'bachillerato',
    { es: '¿Quién comandó el ejército continental durante la guerra?', en: 'Who commanded the Continental Army during the war?', ca: 'Qui va comandar l\'exèrcit continental durant la guerra?' },
    { es: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'John Adams'], en: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'John Adams'], ca: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'John Adams'] },
    { es: 'George Washington', en: 'George Washington', ca: 'George Washington' },
    '🎖️',
    { es: 'George Washington comandó el ejército continental durante toda la guerra y se convertiría después en el primer presidente de los Estados Unidos.', en: 'George Washington commanded the Continental Army throughout the war and would go on to become the first President of the United States.', ca: 'George Washington va comandar l\'exèrcit continental durant tota la guerra i es convertiria després en el primer president dels Estats Units.' }),

  q('usa-12', 'bachillerato',
    { es: '¿Qué otro país europeo, además de Francia, ayudó a los colonos por interés en debilitar a Gran Bretaña?', en: 'Which other European country, besides France, helped the colonists in order to weaken Britain?', ca: 'Quin altre país europeu, a més de França, va ajudar els colons per interès a debilitar la Gran Bretanya?' },
    { es: ['España', 'Portugal', 'Rusia', 'Austria'], en: ['Spain', 'Portugal', 'Russia', 'Austria'], ca: ['Espanya', 'Portugal', 'Rússia', 'Àustria'] },
    { es: 'España', en: 'Spain', ca: 'Espanya' },
    '🇪🇸',
    { es: 'España, junto con Francia, apoyó a los colonos como forma de debilitar a su rival Gran Bretaña, aunque sin llegar a una alianza formal tan estrecha como la francesa.', en: 'Spain, alongside France, supported the colonists as a way of weakening its rival Britain, though without as close a formal alliance as France\'s.', ca: 'Espanya, juntament amb França, va donar suport als colons com a forma de debilitar el seu rival la Gran Bretanya, encara que sense arribar a una aliança formal tan estreta com la francesa.' }),
]

export const PREGUNTAS_ESO = []
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
