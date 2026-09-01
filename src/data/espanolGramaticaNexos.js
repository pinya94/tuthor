function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('nex-01', 'primaria',
    { es: '¿Cuál de estas palabras es una preposición?', en: 'Which of these words is a preposition?', ca: 'Quina d\'aquestes paraules és una preposició?' },
    { es: ['casa', 'con', 'corre', 'rojo'], en: ['casa', 'con (with)', 'corre', 'rojo'], ca: ['casa', 'amb', 'corre', 'vermell'] },
    1, '🔗',
    { es: 'Las preposiciones enlazan palabras: a, ante, bajo, con, de, en, para, por, sin, sobre… "Voy con Ana".', en: 'Prepositions link words: a, con, de, en, para, por, sin, sobre…', ca: 'Les preposicions enllacen paraules: a, amb, de, en, per, sobre…' }),

  q('nex-02', 'primaria',
    { es: '¿Cuál de estas palabras es una conjunción?', en: 'Which of these words is a conjunction?', ca: 'Quina d\'aquestes paraules és una conjunció?' },
    { es: ['mesa', 'y', 'salta', 'aquí'], en: ['mesa', 'y (and)', 'salta', 'aquí'], ca: ['taula', 'i', 'salta', 'aquí'] },
    1, '➕',
    { es: 'Las conjunciones unen palabras u oraciones: y, o, pero, porque, aunque. "Pan y agua".', en: 'Conjunctions join words or clauses: y, o, pero, porque.', ca: 'Les conjuncions uneixen paraules o oracions: i, o, però, perquè.' }),

  q('nex-03', 'primaria',
    { es: 'En "un libro de aventuras", ¿cuál es la preposición?', en: 'In "un libro de aventuras", which is the preposition?', ca: 'A "un llibre d\'aventures", quina és la preposició?' },
    { es: ['libro', 'de', 'aventuras', 'un'], en: ['libro', 'de', 'aventuras', 'un'], ca: ['llibre', 'de', 'aventures', 'un'] },
    1, '📘',
    { es: '"De" es una preposición que enlaza "libro" con "aventuras" e indica el tipo de libro.', en: '"De" (of) is a preposition linking "libro" with "aventuras".', ca: '"De" és una preposició que enllaça "llibre" amb "aventures".' }),

  q('nex-04', 'primaria',
    { es: '¿Qué conjunción indica oposición?', en: 'Which conjunction shows opposition?', ca: 'Quina conjunció indica oposició?' },
    { es: ['y', 'pero', 'o', 'ni'], en: ['y (and)', 'pero (but)', 'o (or)', 'ni (nor)'], ca: ['i', 'però', 'o', 'ni'] },
    1, '↔️',
    { es: '"Pero" es una conjunción adversativa: indica oposición o contraste. "Quiero ir pero no puedo".', en: '"Pero" (but) is adversative: it shows opposition. "Quiero ir pero no puedo".', ca: '"Però" és adversativa: indica oposició. "Vull anar-hi però no puc".' }),

  q('nex-05', 'primaria',
    { es: 'Ante palabra que empieza por "i-", "y" se convierte en…', en: 'Before a word starting with "i-", "y" becomes…', ca: 'Davant de paraula que comença per "i-", "i" es converteix en…' },
    { es: ['e', 'u', 'o', 'a'], en: ['e', 'u', 'o', 'a'], ca: ['e', 'u', 'o', 'a'] },
    0, '🔤',
    { es: 'Para evitar dos sonidos "i" seguidos, "y" cambia a "e": "padre e hijo", "agujas e hilo". Igual, "o" → "u" ante "o-": "siete u ocho".', en: '"Y" changes to "e" before "i-": "padre e hijo". Likewise "o" → "u" before "o-".', ca: '"I" canvia a "e" davant "i-": "pare e fill".' }),

  q('nex-06', 'primaria',
    { es: 'En "estudia porque quiere aprobar", ¿cuál es la conjunción?', en: 'In "estudia porque quiere aprobar", which is the conjunction?', ca: 'A "estudia perquè vol aprovar", quina és la conjunció?' },
    { es: ['estudia', 'porque', 'quiere', 'aprobar'], en: ['estudia', 'porque', 'quiere', 'aprobar'], ca: ['estudia', 'perquè', 'vol', 'aprovar'] },
    1, '🎯',
    { es: '"Porque" es una conjunción que introduce la causa. Une las dos partes de la oración.', en: '"Porque" (because) is a conjunction introducing the cause.', ca: '"Perquè" és una conjunció que introdueix la causa.' }),

  q('nex-07', 'eso',
    { es: '¿Qué tipo de conjunción es "aunque"?', en: 'What type of conjunction is "aunque"?', ca: 'Quin tipus de conjunció és "encara que"?' },
    { es: ['Coordinante copulativa', 'Subordinante concesiva', 'Coordinante disyuntiva', 'Preposición'], en: ['Coordinating (copulative)', 'Subordinating (concessive)', 'Coordinating (disjunctive)', 'Preposition'], ca: ['Coordinant copulativa', 'Subordinant concessiva', 'Coordinant disjuntiva', 'Preposició'] },
    1, '🔀',
    { es: '"Aunque" es una conjunción subordinante concesiva: expresa una objeción que no impide la acción. "Aunque llueve, salgo".', en: '"Aunque" (although) is a concessive subordinating conjunction.', ca: '"Encara que" és una conjunció subordinant concessiva.' }),

  q('nex-08', 'eso',
    { es: '"O" es una conjunción coordinante…', en: '"O" (or) is a coordinating conjunction that is…', ca: '"O" és una conjunció coordinant…' },
    { es: ['Copulativa', 'Adversativa', 'Disyuntiva', 'Ilativa'], en: ['Copulative', 'Adversative', 'Disjunctive', 'Illative'], ca: ['Copulativa', 'Adversativa', 'Disjuntiva', 'Il·lativa'] },
    2, '🔀',
    { es: 'Las disyuntivas (o, u) expresan alternativa o elección: "¿café o té?". Las copulativas (y, e, ni) suman; las adversativas (pero, sino) oponen.', en: 'Disjunctive conjunctions (o, u) express choice: "¿café o té?".', ca: 'Les disjuntives (o, u) expressen alternativa: "cafè o te?".' }),

  q('nex-09', 'eso',
    { es: '¿Cuántas preposiciones hay en "voy a casa de mi amigo por la tarde"?', en: 'How many prepositions are in "voy a casa de mi amigo por la tarde"?', ca: 'Quantes preposicions hi ha a "vaig a casa del meu amic per la tarda"?' },
    { es: ['Una', 'Dos', 'Tres', 'Cuatro'], en: ['One', 'Two', 'Three', 'Four'], ca: ['Una', 'Dues', 'Tres', 'Quatre'] },
    2, '🔢',
    { es: 'Tres preposiciones: "a" (casa), "de" (mi amigo) y "por" (la tarde). Las preposiciones son palabras invariables.', en: 'Three prepositions: "a", "de" and "por".', ca: 'Tres preposicions: "a", "de" (del) i "per".' }),

  q('nex-10', 'eso',
    { es: 'La diferencia entre preposición y conjunción es que la conjunción…', en: 'The difference between preposition and conjunction is that the conjunction…', ca: 'La diferència entre preposició i conjunció és que la conjunció…' },
    { es: ['Une elementos del mismo nivel o dos oraciones', 'Solo va al final', 'Se conjuga', 'Nombra cosas'], en: ['Joins elements of the same level or two clauses', 'Only goes at the end', 'Conjugates', 'Names things'], ca: ['Uneix elements del mateix nivell o dues oracions', 'Només va al final', 'Es conjuga', 'Anomena coses'] },
    0, '🔗',
    { es: 'La conjunción une palabras del mismo nivel u oraciones ("pan y queso", "vino pero se fue"); la preposición subordina un elemento a otro ("casa de piedra").', en: 'Conjunctions join equal elements or clauses; prepositions subordinate one element to another.', ca: 'La conjunció uneix elements iguals o oracions; la preposició subordina un element a un altre.' }),

  q('nex-11', 'primaria',
    { es: "¿Cuál de estas palabras es una conjunción?", en: "Which of these words is a conjunction?", ca: "Quina d'aquestes paraules és una conjunció?" },
    { es: ["casa","pero","rápido","correr"], en: ["casa","pero","rápido","correr"], ca: ["casa","però","ràpid","córrer"] },
    1, '🔗',
    { es: "\"Pero\" une dos ideas y marca oposición. Las conjunciones no nombran nada: enlazan.", en: "\"Pero\" (but) joins two ideas and marks contrast. Conjunctions link, they do not name.", ca: "\"Però\" uneix dues idees i marca oposició. Les conjuncions enllacen." }),

  q('nex-12', 'primaria',
    { es: "Completa: \"Quiero ir ___ no puedo.\"", en: "Complete: \"Quiero ir ___ no puedo.\"", ca: "Completa: \"Vull anar-hi ___ no puc.\"" },
    { es: ["y","pero","o","porque"], en: ["y","pero","o","porque"], ca: ["i","però","o","perquè"] },
    1, '🚧',
    { es: "Las dos ideas se oponen (querer / no poder), así que el nexo es \"pero\".", en: "The two ideas contrast, so the linker is \"pero\" (but).", ca: "Les dues idees s'oposen, així que el nexe és \"però\"." }),

  q('nex-13', 'primaria',
    { es: "¿Qué nexo indica una causa?", en: "Which linker shows a cause?", ca: "Quin nexe indica una causa?" },
    { es: ["y","o","porque","pero"], en: ["y","o","porque","pero"], ca: ["i","o","perquè","però"] },
    2, '❓',
    { es: "\"Porque\" responde a por qué: introduce la causa. \"No salí porque llovía\".", en: "\"Porque\" (because) introduces the cause.", ca: "\"Perquè\" respon a per què: introdueix la causa." }),

  q('nex-14', 'primaria',
    { es: "En \"café o té\", ¿qué expresa \"o\"?", en: "In \"café o té\", what does \"o\" express?", ca: "A \"cafè o te\", què expressa \"o\"?" },
    { es: ["Suma","Elección entre dos","Oposición","Causa"], en: ["Suma","Elección entre dos","Oposición","Causa"], ca: ["Suma","Elecció entre dos","Oposició","Causa"] },
    1, '☕',
    { es: "\"O\" es una conjunción disyuntiva: presenta alternativas de las que se elige una.", en: "\"O\" (or) is disjunctive: it presents alternatives.", ca: "\"O\" és una conjunció disjuntiva: presenta alternatives." }),

  q('nex-15', 'primaria',
    { es: "¿Cuál de estas es una preposición?", en: "Which of these is a preposition?", ca: "Quina d'aquestes és una preposició?" },
    { es: ["sobre","canta","bonito","ellos"], en: ["sobre","canta","bonito","ellos"], ca: ["sobre","canta","bonic","ells"] },
    0, '📦',
    { es: "\"Sobre\" relaciona palabras dentro de la oración: \"el libro sobre la mesa\". Es una preposición.", en: "\"Sobre\" (on) relates words within the sentence: a preposition.", ca: "\"Sobre\" relaciona paraules dins l'oració: és una preposició." }),

  q('nex-16', 'primaria',
    { es: "Completa: \"Fui al cine ___ vi una película.\"", en: "Complete: \"Fui al cine ___ vi una película.\"", ca: "Completa: \"Vaig anar al cine ___ vaig veure una pel·lícula.\"" },
    { es: ["y","pero","aunque","sino"], en: ["y","pero","aunque","sino"], ca: ["i","però","encara que","sinó"] },
    0, '🎬',
    { es: "Las dos acciones se suman, no se oponen: el nexo es \"y\" (copulativo).", en: "The two actions add up rather than contrast: the linker is \"y\" (and).", ca: "Les dues accions se sumen, no s'oposen: el nexe és \"i\"." }),

  q('nex-17', 'eso',
    { es: "¿Qué diferencia hay entre una conjunción coordinante y una subordinante?", en: "What is the difference between a coordinating and a subordinating conjunction?", ca: "Quina diferència hi ha entre una conjunció coordinant i una de subordinant?" },
    { es: ["Ninguna","La coordinante une elementos del mismo nivel; la subordinante mete una oración dentro de otra","La coordinante va siempre al final","La subordinante solo une sustantivos"], en: ["Ninguna","La coordinante une elementos del mismo nivel; la subordinante mete una oración dentro de otra","La coordinante va siempre al final","La subordinante solo une sustantivos"], ca: ["Cap","La coordinant uneix elements del mateix nivell; la subordinant fica una oració dins d'una altra","La coordinant va sempre al final","La subordinant només uneix substantius"] },
    1, '🧱',
    { es: "\"Vino y se fue\": dos oraciones al mismo nivel. \"Dijo que vendría\": la segunda depende de la primera, es subordinada.", en: "\"Vino y se fue\": same level. \"Dijo que vendría\": the second depends on the first.", ca: "\"Va venir i se'n va anar\": mateix nivell. \"Va dir que vindria\": la segona depèn de la primera." }),

  q('nex-18', 'eso',
    { es: "En \"no es rojo sino azul\", ¿qué expresa \"sino\"?", en: "In \"no es rojo sino azul\", what does \"sino\" express?", ca: "A \"no és vermell sinó blau\", què expressa \"sinó\"?" },
    { es: ["Adición","Corrección de lo negado antes","Causa","Consecuencia"], en: ["Adición","Corrección de lo negado antes","Causa","Consecuencia"], ca: ["Addició","Correcció del que s'ha negat abans","Causa","Conseqüència"] },
    1, '🎨',
    { es: "\"Sino\" es adversativo: corrige lo que se acaba de negar. No confundir con \"si no\" (condición): \"si no vienes, me voy\".", en: "\"Sino\" corrects what was just denied. Do not confuse it with \"si no\" (if not).", ca: "\"Sinó\" corregeix allò que s'acaba de negar. No confondre amb \"si no\"." }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(x => x.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
