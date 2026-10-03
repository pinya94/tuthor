// Figuras literarias — Lengua castellana, ESO + Bachillerato. Reconocer la
// figura en un fragmento: comparación, metáfora, personificación, hipérbole,
// anáfora, aliteración, antítesis, paralelismo… y en Bachillerato oxímoron,
// hipérbaton, sinestesia, polisíndeton, asíndeton, metonimia, sinécdoque,
// retruécano, paradoja y elipsis.
//
// El examen de Literatura ya define cinco o seis figuras; este va de
// IDENTIFICARLAS en versos y frases, que es como se preguntan en clase. Los
// versos citados son de autores clásicos en dominio público (Garcilaso, Fray
// Luis, Santa Teresa, Góngora, Gracián, Bécquer); el resto son
// frases de ejemplo propias.
//
// Es un examen DE castellano: los fragmentos y los nombres de las figuras van
// en español en los tres idiomas (memoria «espanol-material»); solo se
// traducen el enunciado y la explicación.
//
// La respuesta buena va siempre la PRIMERA en `opciones`: ExamenMC baraja el
// orden al servir cada pregunta (lib/ordenOpciones.js).
import { esMaterialEspanol } from './espanolMaterial'

function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  // La correcta se guarda como TEXTO (lo que leen ExamenMC y las tarjetas
  // imprimibles de lib/tarjetasExamen.js): el de la primera opción.
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, emoji, pregunta, opciones, correcta, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
// Los nombres de figura son material: castellano en los tres idiomas.
const O = (es, en, ca) => (esMaterialEspanol(es) ? { es, en: es, ca: es } : { es, en, ca })
const F = (...nombres) => O(nombres, nombres, nombres)
// «¿Qué figura hay en…?» con el fragmento citado igual en los tres idiomas.
const QUE = frag => T(`¿Qué figura literaria hay en ${frag}?`, `Which figure of speech is in ${frag}?`, `Quina figura literària hi ha a ${frag}?`)

export const PREGUNTAS = [
  // ── ESO ─────────────────────────────────────────────────────────────────
  q('fl-01', 'eso', '👀',
    QUE('«Tus ojos brillan como dos luceros»'),
    F('Comparación', 'Metáfora', 'Hipérbole', 'Personificación'),
    T("Es una comparación (o símil): se relacionan dos cosas con un nexo a la vista, «como». Sin el nexo, «tus ojos son dos luceros», sería una metáfora.",
      "It is a simile (comparación): two things are linked with a visible connector, «como» (like). Without it, «tus ojos son dos luceros» would be a metaphor.",
      "És una comparació (o símil): es relacionen dues coses amb un nexe a la vista, «como». Sense el nexe, «tus ojos son dos luceros», seria una metàfora.")),

  q('fl-02', 'eso', '🦷',
    QUE('«Sus dientes son perlas»'),
    F('Metáfora', 'Comparación', 'Onomatopeya', 'Anáfora'),
    T("Metáfora: se identifica algo real (los dientes) con algo imaginario (las perlas) sin ningún nexo, por su parecido: blancos y brillantes.",
      "Metaphor: something real (teeth) is identified with something imaginary (pearls) with no connector, because they look alike: white and shiny.",
      "Metàfora: s’identifica una cosa real (les dents) amb una d’imaginària (les perles) sense cap nexe, per la seva semblança: blanques i brillants.")),

  q('fl-03', 'eso', '🌬️',
    QUE('«El viento susurraba secretos a los árboles»'),
    F('Personificación', 'Hipérbole', 'Epíteto', 'Comparación'),
    T("Personificación: se dan a algo que no es humano (el viento) acciones de persona (susurrar secretos).",
      "Personification: something non-human (the wind) is given human actions (whispering secrets).",
      "Personificació: es donen a una cosa que no és humana (el vent) accions de persona (xiuxiuejar secrets).")),

  q('fl-04', 'eso', '💯',
    QUE('«Te lo he dicho un millón de veces»'),
    F('Hipérbole', 'Metáfora', 'Personificación', 'Paralelismo'),
    T("Hipérbole: una exageración evidente para dar fuerza a lo que se dice. Nadie lo ha repetido de verdad un millón de veces.",
      "Hyperbole: an obvious exaggeration to give force to what is said. Nobody has really repeated it a million times.",
      "Hipèrbole: una exageració evident per donar força al que es diu. Ningú no ho ha repetit de debò un milió de vegades.")),

  q('fl-05', 'eso', '⏰',
    QUE('«Solo se oía el tictac del reloj»'),
    F('Onomatopeya', 'Aliteración', 'Anáfora', 'Hipérbole'),
    T("Onomatopeya: una palabra que imita el sonido que nombra, como «tictac», «guau», «zas» o «miau».",
      "Onomatopoeia: a word that imitates the sound it names, such as «tictac», «guau», «zas» or «miau».",
      "Onomatopeia: una paraula que imita el so que anomena, com «tictac», «guau», «zas» o «miau».")),

  q('fl-06', 'eso', '🔁',
    QUE('«Mañana es fiesta, / mañana hay feria, / mañana vienes tú»'),
    F('Anáfora', 'Hipérbole', 'Onomatopeya', 'Epíteto'),
    T("Anáfora: se repite la misma palabra al principio de varios versos o frases seguidos, aquí «mañana».",
      "Anaphora: the same word is repeated at the start of several lines or clauses in a row, here «mañana».",
      "Anàfora: es repeteix la mateixa paraula al principi de diversos versos o frases seguits, aquí «mañana».")),

  q('fl-07', 'eso', '🐝',
    T("En estos versos de Garcilaso, ¿qué figura hay? «En el silencio solo se escuchaba / un susurro de abejas que sonaba»", "In these lines by Garcilaso, which figure is there? «En el silencio solo se escuchaba / un susurro de abejas que sonaba»", "En aquests versos de Garcilaso, quina figura hi ha? «En el silencio solo se escuchaba / un susurro de abejas que sonaba»"),
    F('Aliteración', 'Anáfora', 'Hipérbole', 'Antítesis'),
    T("Aliteración: se repite un sonido, aquí la «s», para imitar el zumbido suave de las abejas. Es uno de los ejemplos más citados de la lengua.",
      "Alliteration: a sound is repeated, here «s», to imitate the soft buzzing of the bees. It is one of the most quoted examples in Spanish.",
      "Al·literació: es repeteix un so, aquí la «s», per imitar el brunzit suau de les abelles. És un dels exemples més citats de la llengua.")),

  q('fl-08', 'eso', '🌹',
    T("Góngora le dice a una rosa: «Ayer naciste, y morirás mañana». ¿Qué figura es?", "Góngora tells a rose: «Ayer naciste, y morirás mañana». Which figure is it?", "Góngora diu a una rosa: «Ayer naciste, y morirás mañana». Quina figura és?"),
    F('Antítesis', 'Comparación', 'Onomatopeya', 'Epíteto'),
    T("Antítesis: se enfrentan ideas contrarias (ayer / mañana, nacer / morir) para resaltar lo breve que es la vida de la rosa.",
      "Antithesis: opposite ideas are set against each other (yesterday / tomorrow, be born / die) to stress how short the rose’s life is.",
      "Antítesi: s’enfronten idees contràries (ahir / demà, néixer / morir) per remarcar com és de breu la vida de la rosa.")),

  q('fl-09', 'eso', '❓',
    QUE('«¿Hasta cuándo vamos a soportar esta injusticia?»'),
    F('Interrogación retórica', 'Hipérbole', 'Metáfora', 'Anáfora'),
    T("Interrogación retórica: una pregunta que no espera respuesta. Sirve para protestar o para que el lector piense, no para pedir información.",
      "Rhetorical question: a question that expects no answer. It is used to protest or make the reader think, not to ask for information.",
      "Interrogació retòrica: una pregunta que no espera resposta. Serveix per protestar o perquè el lector pensi, no per demanar informació.")),

  q('fl-10', 'eso', '❄️',
    QUE('«La blanca nieve cubría los tejados»'),
    F('Epíteto', 'Hipérbole', 'Personificación', 'Aliteración'),
    T("Epíteto: un adjetivo que expresa una cualidad que el sustantivo ya tiene (la nieve siempre es blanca). No informa: embellece y subraya.",
      "Epithet: an adjective expressing a quality the noun already has (snow is always white). It adds no information: it embellishes and emphasises.",
      "Epítet: un adjectiu que expressa una qualitat que el substantiu ja té (la neu sempre és blanca). No informa: embelleix i subratlla.")),

  q('fl-11', 'eso', '🔍',
    T("¿En qué se diferencian la comparación y la metáfora?", "What is the difference between a simile and a metaphor?", "En què es diferencien la comparació i la metàfora?"),
    O(["La comparación usa un nexo (como, cual, parece); la metáfora identifica las dos cosas sin nexo", "La metáfora siempre exagera y la comparación no", "La comparación solo aparece en poesía", "No hay diferencia: son la misma figura"],
      ["A simile uses a connector (como, cual, parece); a metaphor identifies the two things without one", "A metaphor always exaggerates and a simile does not", "A simile only appears in poetry", "There is no difference: they are the same figure"],
      ["La comparació fa servir un nexe (como, cual, parece); la metàfora identifica les dues coses sense nexe", "La metàfora sempre exagera i la comparació no", "La comparació només apareix en poesia", "No hi ha diferència: són la mateixa figura"]),
    T("«Tu pelo es como el oro» es una comparación; «tu pelo es oro», una metáfora. Quitar el nexo convierte la una en la otra.",
      "«Tu pelo es como el oro» is a simile; «tu pelo es oro» is a metaphor. Removing the connector turns one into the other.",
      "«Tu pelo es como el oro» és una comparació; «tu pelo es oro», una metàfora. Treure el nexe converteix l’una en l’altra.")),

  q('fl-12', 'eso', '🎭',
    T("En estos versos de Bécquer, ¿qué figura domina? «Por una mirada, un mundo; / por una sonrisa, un cielo»", "In these lines by Bécquer, which figure dominates? «Por una mirada, un mundo; / por una sonrisa, un cielo»", "En aquests versos de Bécquer, quina figura domina? «Por una mirada, un mundo; / por una sonrisa, un cielo»"),
    F('Paralelismo', 'Hipérbole', 'Onomatopeya', 'Epíteto'),
    T("Paralelismo: dos versos repiten la misma estructura (por + una + sustantivo, un + sustantivo). Esa simetría da ritmo y une las dos ideas.",
      "Parallelism: two lines repeat the same structure (por + una + noun, un + noun). That symmetry creates rhythm and links the two ideas.",
      "Paral·lelisme: dos versos repeteixen la mateixa estructura (por + una + substantiu, un + substantiu). Aquesta simetria dona ritme i uneix les dues idees.")),

  q('fl-13', 'eso', '🎒',
    QUE('«En la mesa había libros, cuadernos, lápices, mapas y papeles»'),
    F('Enumeración', 'Antítesis', 'Personificación', 'Onomatopeya'),
    T("Enumeración: se acumulan varios elementos seguidos que juntos dan una imagen, aquí la de una mesa llena y desordenada.",
      "Enumeration: several elements are listed one after another to build a single picture, here a full, messy table.",
      "Enumeració: s’acumulen diversos elements seguits que junts donen una imatge, aquí la d’una taula plena i desordenada.")),

  q('fl-14', 'eso', '🐦',
    T("Bécquer escribe: «Volverán las oscuras golondrinas / en tu balcón sus nidos a colgar». ¿Qué figura hay en el segundo verso?", "Bécquer writes: «Volverán las oscuras golondrinas / en tu balcón sus nidos a colgar». Which figure is in the second line?", "Bécquer escriu: «Volverán las oscuras golondrinas / en tu balcón sus nidos a colgar». Quina figura hi ha al segon vers?"),
    F('Hipérbaton', 'Hipérbole', 'Anáfora', 'Onomatopeya'),
    T("Hipérbaton: se altera el orden habitual de la frase. Lo normal sería «a colgar sus nidos en tu balcón»; el poeta lo desordena para el ritmo y la rima.",
      "Hyperbaton: the usual word order is changed. The normal order would be «a colgar sus nidos en tu balcón»; the poet rearranges it for rhythm and rhyme.",
      "Hipèrbaton: s’altera l’ordre habitual de la frase. El normal seria «a colgar sus nidos en tu balcón»; el poeta el desordena pel ritme i la rima.")),

  // ── Bachillerato ────────────────────────────────────────────────────────
  q('fl-15', 'bachillerato', '🔇',
    QUE('«Un silencio atronador llenó la sala»'),
    F('Oxímoron', 'Polisíndeton', 'Sinécdoque', 'Elipsis'),
    T("Oxímoron: se juntan dos palabras de significado opuesto (silencio / atronador) en una sola expresión. Es una antítesis condensada en dos palabras pegadas.",
      "Oxymoron: two words with opposite meanings (silence / thunderous) are joined in a single expression. It is an antithesis squeezed into two adjacent words.",
      "Oxímoron: s’ajunten dues paraules de significat oposat (silencio / atronador) en una sola expressió. És una antítesi condensada en dues paraules enganxades.")),

  q('fl-16', 'bachillerato', '🎨',
    QUE('«Llevaba una camiseta de un verde chillón»'),
    F('Sinestesia', 'Metonimia', 'Paradoja', 'Asíndeton'),
    T("Sinestesia: se mezclan sensaciones de sentidos distintos. Un color (vista) se describe con algo que se oye (chillón). Igual que «voz dulce» o «sonido áspero».",
      "Synaesthesia: sensations from different senses are mixed. A colour (sight) is described with something heard (chillón, ‘screaming’). Like «voz dulce» or «sonido áspero».",
      "Sinestèsia: es barregen sensacions de sentits diferents. Un color (vista) es descriu amb una cosa que se sent (chillón). Igual que «voz dulce» o «sonido áspero».")),

  q('fl-17', 'bachillerato', '➕',
    QUE('«Y corre, y salta, y grita, y ríe»'),
    F('Polisíndeton', 'Asíndeton', 'Elipsis', 'Retruécano'),
    T("Polisíndeton: se repite la conjunción («y») más de lo necesario. El efecto es de acumulación y de movimiento que no para.",
      "Polysyndeton: the conjunction («y», and) is repeated more than necessary. The effect is one of piling up and non-stop movement.",
      "Polisíndeton: es repeteix la conjunció («y») més del necessari. L’efecte és d’acumulació i de moviment que no s’atura.")),

  q('fl-18', 'bachillerato', '🏃',
    T("Fray Luis de León escribe: «Acude, corre, vuela, / traspasa la alta sierra». ¿Qué figura es?", "Fray Luis de León writes: «Acude, corre, vuela, / traspasa la alta sierra». Which figure is it?", "Fray Luis de León escriu: «Acude, corre, vuela, / traspasa la alta sierra». Quina figura és?"),
    F('Asíndeton', 'Polisíndeton', 'Sinestesia', 'Oxímoron'),
    T("Asíndeton: se suprimen las conjunciones entre los elementos y se separan solo con comas. Da sensación de rapidez y urgencia, justo lo contrario del polisíndeton.",
      "Asyndeton: the conjunctions between elements are left out and only commas separate them. It gives a sense of speed and urgency, the opposite of polysyndeton.",
      "Asíndeton: se suprimeixen les conjuncions entre els elements i se separen només amb comes. Dona sensació de rapidesa i urgència, just el contrari del polisíndeton.")),

  q('fl-19', 'bachillerato', '📚',
    QUE('«Este verano he leído a Cervantes»'),
    F('Metonimia', 'Sinécdoque', 'Metáfora', 'Hipérbaton'),
    T("Metonimia: se nombra una cosa con el nombre de otra con la que tiene una relación real, aquí el autor por su obra. Otras: «se bebió dos vasos» (el continente por el contenido).",
      "Metonymy: one thing is named after another it is really connected to, here the author for the work. Others: «se bebió dos vasos» (the container for the contents).",
      "Metonímia: s’anomena una cosa amb el nom d’una altra amb què té una relació real, aquí l’autor per l’obra. Altres: «se bebió dos vasos» (el continent pel contingut).")),

  q('fl-20', 'bachillerato', '🍽️',
    QUE('«En esa casa hay cuatro bocas que alimentar»'),
    F('Sinécdoque', 'Metonimia', 'Paradoja', 'Epíteto'),
    T("Sinécdoque: se nombra la parte por el todo (las bocas por las personas) o el todo por la parte. Es un tipo especial de metonimia, basado en la relación parte-todo.",
      "Synecdoche: the part is named for the whole (mouths for people) or the whole for the part. It is a special kind of metonymy, based on the part-whole relationship.",
      "Sinècdoque: s’anomena la part pel tot (les boques per les persones) o el tot per la part. És un tipus especial de metonímia, basat en la relació part-tot.")),

  q('fl-21', 'bachillerato', '🔄',
    QUE('«Ni son todos los que están, ni están todos los que son»'),
    F('Retruécano', 'Anáfora', 'Sinestesia', 'Hipérbole'),
    T("Retruécano: se repite una frase con las palabras invertidas, y el cambio de orden cambia el sentido. Aquí: no todos los que están dentro deberían estar, y faltan otros.",
      "Chiasmus-like wordplay (retruécano): a phrase is repeated with its words swapped, and the new order changes the meaning. Here: not everyone inside should be there, and others are missing.",
      "Retruècac: es repeteix una frase amb les paraules invertides, i el canvi d’ordre en canvia el sentit. Aquí: no tots els que hi són hi haurien de ser, i en falten d’altres.")),

  q('fl-22', 'bachillerato', '🕯️',
    T("Santa Teresa escribe: «Vivo sin vivir en mí, / y tan alta vida espero / que muero porque no muero». ¿Qué figura es?", "Saint Teresa writes: «Vivo sin vivir en mí, / y tan alta vida espero / que muero porque no muero». Which figure is it?", "Santa Teresa escriu: «Vivo sin vivir en mí, / y tan alta vida espero / que muero porque no muero». Quina figura és?"),
    F('Paradoja', 'Hipérbaton', 'Polisíndeton', 'Metonimia'),
    T("Paradoja: una idea que parece absurda o contradictoria pero que encierra un sentido profundo. La mística desea tanto la vida eterna que vivir aquí le parece una muerte.",
      "Paradox: an idea that seems absurd or self-contradictory but holds a deeper meaning. The mystic longs so much for eternal life that living here feels like death.",
      "Paradoxa: una idea que sembla absurda o contradictòria però que amaga un sentit profund. La mística desitja tant la vida eterna que viure aquí li sembla una mort.")),

  q('fl-23', 'bachillerato', '✂️',
    T("Gracián escribe: «Lo bueno, si breve, dos veces bueno». ¿Qué figura hay?", "Gracián writes: «Lo bueno, si breve, dos veces bueno». Which figure is there?", "Gracián escriu: «Lo bueno, si breve, dos veces bueno». Quina figura hi ha?"),
    F('Elipsis', 'Asíndeton', 'Oxímoron', 'Sinestesia'),
    T("Elipsis: se omite una palabra que se entiende por el contexto, aquí el verbo «ser»: «lo bueno, si es breve, es dos veces bueno». La frase gana rapidez y fuerza.",
      "Ellipsis: a word that is understood from context is left out, here the verb «ser» (to be): «lo bueno, si es breve, es dos veces bueno». The sentence gains speed and punch.",
      "El·lipsi: s’omet una paraula que s’entén pel context, aquí el verb «ser»: «lo bueno, si es breve, es dos veces bueno». La frase guanya rapidesa i força.")),

  q('fl-24', 'bachillerato', '🧠',
    T("¿Qué diferencia hay entre antítesis y paradoja?", "What is the difference between antithesis and paradox?", "Quina diferència hi ha entre antítesi i paradoxa?"),
    O(["La antítesis contrapone dos ideas opuestas; la paradoja las une en una afirmación que parece imposible pero tiene sentido", "Son la misma figura con dos nombres", "La paradoja solo se usa en prosa y la antítesis en verso", "La antítesis exagera y la paradoja no"],
      ["Antithesis sets two opposite ideas against each other; paradox joins them in a statement that seems impossible but makes sense", "They are the same figure with two names", "Paradox is only used in prose and antithesis in verse", "Antithesis exaggerates and paradox does not"],
      ["L’antítesi contraposa dues idees oposades; la paradoxa les uneix en una afirmació que sembla impossible però té sentit", "Són la mateixa figura amb dos noms", "La paradoxa només es fa servir en prosa i l’antítesi en vers", "L’antítesi exagera i la paradoxa no"]),
    T("«Ayer naciste, y morirás mañana» pone frente a frente dos contrarios: antítesis. «Muero porque no muero» los funde en una sola afirmación aparentemente absurda: paradoja.",
      "«Ayer naciste, y morirás mañana» sets two opposites face to face: antithesis. «Muero porque no muero» fuses them into one apparently absurd statement: paradox.",
      "«Ayer naciste, y morirás mañana» posa cara a cara dos contraris: antítesi. «Muero porque no muero» els fon en una sola afirmació aparentment absurda: paradoxa.")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
