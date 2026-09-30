// Los textos — Lengua castellana, Primaria + ESO. La comunicación y sus
// elementos, las tipologías textuales (narración, descripción, diálogo,
// exposición, argumentación, instrucción), las funciones del lenguaje y las
// propiedades del texto (adecuación, coherencia, cohesión).
//
// Es un examen DE castellano: los fragmentos de ejemplo van en español en los
// tres idiomas (solo se traducen el enunciado y la explicación). Ver memoria
// «espanol-material»: traducir el material volvía falsas las preguntas.
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
// Las opciones que son material lingüístico (términos sueltos: «Emisor»,
// «Narración», «Fática»…) se enseñan en castellano en los tres idiomas; las
// frases explicativas conservan su traducción. Misma regla que vigila
// espanolMaterial.test.js.
const O = (es, en, ca) => (esMaterialEspanol(es) ? { es, en: es, ca: es } : { es, en, ca })

export const PREGUNTAS = [
  // ── Primaria ────────────────────────────────────────────────────────────
  q('tx-01', 'primaria', '📨',
    T("En la comunicación, ¿cómo se llama quien envía el mensaje?", "In communication, what is the person who sends the message called?", "En la comunicació, com s'anomena qui envia el missatge?"),
    O(["Emisor", "Receptor", "Canal", "Código"],
      ["Sender (emisor)", "Receiver (receptor)", "Channel (canal)", "Code (código)"],
      ["Emissor", "Receptor", "Canal", "Codi"]),
    T("El emisor produce el mensaje y el receptor lo recibe. El canal es el medio (el aire, el papel, el móvil) y el código, el sistema de signos que comparten (por ejemplo, el castellano).",
      "The sender produces the message and the receiver takes it in. The channel is the medium (air, paper, a phone) and the code is the shared system of signs (for example, Spanish).",
      "L'emissor produeix el missatge i el receptor el rep. El canal és el mitjà (l'aire, el paper, el mòbil) i el codi, el sistema de signes que comparteixen (per exemple, el castellà).")),

  q('tx-02', 'primaria', '📖',
    T("¿Qué tipo de texto cuenta hechos que les pasan a unos personajes en un lugar y un tiempo?", "Which type of text tells events that happen to characters in a place and time?", "Quin tipus de text explica fets que els passen a uns personatges en un lloc i un temps?"),
    O(["La narración", "La descripción", "La instrucción", "La argumentación"],
      ["Narration", "Description", "Instructions", "Argument"],
      ["La narració", "La descripció", "La instrucció", "L'argumentació"]),
    T("Una narración cuenta una historia: tiene narrador, personajes, acciones, un espacio y un tiempo. Los cuentos, las novelas y las noticias son textos narrativos.",
      "A narrative tells a story: it has a narrator, characters, actions, a setting and a time. Tales, novels and news stories are narrative texts.",
      "Una narració explica una història: té narrador, personatges, accions, un espai i un temps. Els contes, les novel·les i les notícies són textos narratius.")),

  q('tx-03', 'primaria', '🖼️',
    T("«Era una casa pequeña, de paredes blancas y ventanas azules, rodeada de geranios.» ¿Qué tipo de texto es?", "'Era una casa pequeña, de paredes blancas y ventanas azules, rodeada de geranios.' What type of text is it?", "«Era una casa pequeña, de paredes blancas y ventanas azules, rodeada de geranios.» Quin tipus de text és?"),
    O(["Descripción", "Narración", "Diálogo", "Instrucción"],
      ["Description", "Narration", "Dialogue", "Instructions"],
      ["Descripció", "Narració", "Diàleg", "Instrucció"]),
    T("Describir es decir cómo es algo o alguien: tamaño, color, forma, rasgos. Por eso abundan los adjetivos (pequeña, blancas, azules).",
      "Describing means saying what something or someone is like: size, colour, shape, features. That is why it is full of adjectives (pequeña, blancas, azules).",
      "Descriure és dir com és alguna cosa o algú: mida, color, forma, trets. Per això hi abunden els adjectius (pequeña, blancas, azules).")),

  q('tx-04', 'primaria', '🍳',
    T("Una receta de cocina, con sus pasos numerados, es un texto…", "A cooking recipe, with its numbered steps, is a text that is…", "Una recepta de cuina, amb els passos numerats, és un text…"),
    O(["Instructivo", "Narrativo", "Poético", "Argumentativo"],
      ["Instructive", "Narrative", "Poetic", "Argumentative"],
      ["Instructiu", "Narratiu", "Poètic", "Argumentatiu"]),
    T("Los textos instructivos explican cómo hacer algo paso a paso: recetas, instrucciones de un juego, manuales. Usan verbos en imperativo o en infinitivo (bate, añadir).",
      "Instructive texts explain how to do something step by step: recipes, game rules, manuals. They use verbs in the imperative or infinitive (bate, añadir).",
      "Els textos instructius expliquen com fer alguna cosa pas a pas: receptes, instruccions d'un joc, manuals. Fan servir verbs en imperatiu o en infinitiu (bate, añadir).")),

  q('tx-05', 'primaria', '💬',
    T("¿Qué signo se usa en castellano para marcar lo que dice cada personaje en un diálogo?", "Which mark is used in Spanish to show what each character says in a dialogue?", "Quin signe es fa servir en castellà per marcar el que diu cada personatge en un diàleg?"),
    O(["La raya (—)", "El punto y coma (;)", "Los paréntesis ( )", "El asterisco (*)"],
      ["The dash (—)", "The semicolon (;)", "Brackets ( )", "The asterisk (*)"],
      ["La ratlla (—)", "El punt i coma (;)", "Els parèntesis ( )", "L'asterisc (*)"]),
    T("En los diálogos escritos cada intervención empieza en una línea nueva con raya: —¿Vienes? —Ahora voy. La raya también separa los comentarios del narrador.",
      "In written dialogue each turn starts on a new line with a dash: —¿Vienes? —Ahora voy. The dash also separates the narrator's comments.",
      "En els diàlegs escrits cada intervenció comença en una línia nova amb ratlla: —¿Vienes? —Ahora voy. La ratlla també separa els comentaris del narrador.")),

  q('tx-06', 'primaria', '🎯',
    T("¿Cuáles son las tres partes de una narración?", "What are the three parts of a narrative?", "Quines són les tres parts d'una narració?"),
    O(["Planteamiento, nudo y desenlace", "Título, autor y fecha", "Introducción, pregunta y respuesta", "Sujeto, verbo y complemento"],
      ["Opening, conflict and resolution (planteamiento, nudo y desenlace)", "Title, author and date", "Introduction, question and answer", "Subject, verb and object"],
      ["Plantejament, nus i desenllaç", "Títol, autor i data", "Introducció, pregunta i resposta", "Subjecte, verb i complement"]),
    T("En el planteamiento se presentan los personajes y la situación; en el nudo aparece el problema o conflicto; en el desenlace se resuelve.",
      "The opening introduces the characters and situation; the conflict is where the problem appears; the resolution is where it is solved.",
      "En el plantejament es presenten els personatges i la situació; en el nus apareix el problema o conflicte; en el desenllaç es resol.")),

  q('tx-07', 'primaria', '🗣️',
    T("En una conversación cara a cara, ¿cuál es el canal?", "In a face-to-face conversation, what is the channel?", "En una conversa cara a cara, quin és el canal?"),
    O(["El aire, por el que viaja el sonido de la voz", "El papel", "El idioma que se habla", "La persona que escucha"],
      ["The air, through which the sound of the voice travels", "Paper", "The language being spoken", "The person listening"],
      ["L'aire, per on viatja el so de la veu", "El paper", "L'idioma que es parla", "La persona que escolta"]),
    T("El canal es el medio físico por el que va el mensaje. Hablando, es el aire; en una carta, el papel; en un mensaje del móvil, la pantalla y la red.",
      "The channel is the physical medium the message travels through. Speaking, it is the air; in a letter, paper; in a phone message, the screen and the network.",
      "El canal és el mitjà físic per on va el missatge. Parlant, és l'aire; en una carta, el paper; en un missatge del mòbil, la pantalla i la xarxa.")),

  q('tx-08', 'primaria', '📰',
    T("¿Qué pregunta responde el titular y el primer párrafo de una noticia?", "Which questions do a news story's headline and first paragraph answer?", "Quines preguntes responen el titular i el primer paràgraf d'una notícia?"),
    O(["Qué pasó, quién, cuándo, dónde, cómo y por qué", "Qué opina el periodista", "Cuánto cuesta el periódico", "Cómo termina el cuento"],
      ["What happened, who, when, where, how and why", "What the journalist thinks", "How much the newspaper costs", "How the story ends"],
      ["Què va passar, qui, quan, on, com i per què", "Què opina el periodista", "Quant costa el diari", "Com acaba el conte"]),
    T("La noticia informa de un hecho real y reciente. Lo más importante va al principio (las «seis preguntas»); los detalles, después.",
      "A news story reports a real, recent event. The most important information comes first (the 'five Ws and one H'); the details come later.",
      "La notícia informa d'un fet real i recent. El més important va al principi (les «sis preguntes»); els detalls, després.")),

  q('tx-09', 'primaria', '🤔',
    T("«Creo que deberíamos tener más recreo porque jugar nos ayuda a concentrarnos después.» ¿Qué hace este texto?", "'Creo que deberíamos tener más recreo porque jugar nos ayuda a concentrarnos después.' What does this text do?", "«Creo que deberíamos tener más recreo porque jugar nos ayuda a concentrarnos después.» Què fa aquest text?"),
    O(["Da una opinión y la defiende con una razón (argumenta)", "Describe un lugar", "Cuenta un cuento", "Da instrucciones para un juego"],
      ["It gives an opinion and backs it with a reason (it argues)", "It describes a place", "It tells a story", "It gives instructions for a game"],
      ["Dona una opinió i la defensa amb una raó (argumenta)", "Descriu un lloc", "Explica un conte", "Dona instruccions per a un joc"]),
    T("Argumentar es defender una opinión (la tesis: más recreo) con razones o argumentos (jugar ayuda a concentrarse). Palabras como «creo que» o «porque» lo delatan.",
      "Arguing means defending an opinion (the thesis: more break time) with reasons or arguments (playing helps concentration). Words like «creo que» or «porque» give it away.",
      "Argumentar és defensar una opinió (la tesi: més pati) amb raons o arguments (jugar ajuda a concentrar-se). Paraules com «creo que» o «porque» ho delaten.")),

  q('tx-10', 'primaria', '🔤',
    T("En una conversación entre dos personas que hablan castellano, ¿qué es el código?", "In a conversation between two people speaking Spanish, what is the code?", "En una conversa entre dues persones que parlen castellà, què és el codi?"),
    O(["La lengua castellana que los dos conocen", "El número de teléfono", "El tema del que hablan", "El lugar donde están"],
      ["The Spanish language they both know", "The phone number", "The topic they are discussing", "The place where they are"],
      ["La llengua castellana que tots dos coneixen", "El número de telèfon", "El tema del qual parlen", "El lloc on són"]),
    T("El código es el sistema de signos y reglas que emisor y receptor comparten. Si no lo comparten (por ejemplo, idiomas distintos), la comunicación falla.",
      "The code is the system of signs and rules shared by sender and receiver. If they do not share it (for example, different languages), communication breaks down.",
      "El codi és el sistema de signes i regles que emissor i receptor comparteixen. Si no el comparteixen (per exemple, idiomes diferents), la comunicació falla.")),

  q('tx-11', 'primaria', '📚',
    T("¿Qué tipo de texto es una página del libro de Ciencias que explica cómo respiran los peces?", "What type of text is a science textbook page explaining how fish breathe?", "Quin tipus de text és una pàgina del llibre de Ciències que explica com respiren els peixos?"),
    O(["Expositivo", "Narrativo", "Dialogado", "Poético"],
      ["Expository", "Narrative", "Dialogue", "Poetic"],
      ["Expositiu", "Narratiu", "Dialogat", "Poètic"]),
    T("Los textos expositivos explican un tema de forma clara y objetiva para que el lector lo entienda. Son los de los libros de texto, las enciclopedias o los folletos informativos.",
      "Expository texts explain a subject clearly and objectively so the reader understands it. They are the texts in textbooks, encyclopaedias and information leaflets.",
      "Els textos expositius expliquen un tema de manera clara i objectiva perquè el lector l'entengui. Són els dels llibres de text, les enciclopèdies o els fullets informatius.")),

  q('tx-12', 'primaria', '👤',
    T("Si el narrador dice «Yo entré en la cueva sin hacer ruido», ¿en qué persona narra?", "If the narrator says «Yo entré en la cueva sin hacer ruido», which person is it told in?", "Si el narrador diu «Yo entré en la cueva sin hacer ruido», en quina persona narra?"),
    O(["En primera persona", "En segunda persona", "En tercera persona", "No hay narrador"],
      ["First person", "Second person", "Third person", "There is no narrator"],
      ["En primera persona", "En segona persona", "En tercera persona", "No hi ha narrador"]),
    T("Con «yo» el narrador es un personaje que cuenta lo que le pasa (primera persona). Si contara «Él entró en la cueva», sería tercera persona, un narrador de fuera de la historia.",
      "With «yo» the narrator is a character telling what happens to them (first person). If it said «Él entró en la cueva», it would be third person, a narrator outside the story.",
      "Amb «yo» el narrador és un personatge que explica el que li passa (primera persona). Si digués «Él entró en la cueva», seria tercera persona, un narrador de fora de la història.")),

  // ── ESO ─────────────────────────────────────────────────────────────────
  q('tx-13', 'eso', '📣',
    T("«¡Cierra la ventana, por favor!» ¿Qué función del lenguaje predomina?", "«¡Cierra la ventana, por favor!» Which function of language dominates?", "«¡Cierra la ventana, por favor!» Quina funció del llenguatge hi predomina?"),
    O(["Apelativa (o conativa)", "Referencial", "Poética", "Fática"],
      ["Conative (appellative)", "Referential", "Poetic", "Phatic"],
      ["Apel·lativa (o conativa)", "Referencial", "Poètica", "Fàtica"]),
    T("La función apelativa se centra en el receptor: busca que haga algo o cambie de actitud. Son típicos el imperativo, los vocativos y las preguntas.",
      "The conative function focuses on the receiver: it tries to get them to do something or change their attitude. Imperatives, vocatives and questions are typical.",
      "La funció apel·lativa se centra en el receptor: busca que faci alguna cosa o canviï d'actitud. Hi són típics l'imperatiu, els vocatius i les preguntes.")),

  q('tx-14', 'eso', '😢',
    T("«¡Qué pena tan grande siento hoy!» ¿Qué función del lenguaje predomina?", "«¡Qué pena tan grande siento hoy!» Which function of language dominates?", "«¡Qué pena tan grande siento hoy!» Quina funció del llenguatge hi predomina?"),
    O(["Expresiva (o emotiva)", "Apelativa", "Metalingüística", "Referencial"],
      ["Expressive (emotive)", "Conative", "Metalinguistic", "Referential"],
      ["Expressiva (o emotiva)", "Apel·lativa", "Metalingüística", "Referencial"]),
    T("La función expresiva se centra en el emisor: manifiesta sus sentimientos u opiniones. Las exclamaciones y la primera persona son sus marcas habituales.",
      "The expressive function focuses on the sender: it shows their feelings or opinions. Exclamations and the first person are its usual markers.",
      "La funció expressiva se centra en l'emissor: manifesta els seus sentiments o opinions. Les exclamacions i la primera persona en són les marques habituals.")),

  q('tx-15', 'eso', '🔍',
    T("«“Casa” es un sustantivo femenino.» ¿Qué función del lenguaje predomina?", "«“Casa” es un sustantivo femenino.» Which function of language dominates?", "«“Casa” es un sustantivo femenino.» Quina funció del llenguatge hi predomina?"),
    O(["Metalingüística", "Poética", "Fática", "Expresiva"],
      ["Metalinguistic", "Poetic", "Phatic", "Expressive"],
      ["Metalingüística", "Poètica", "Fàtica", "Expressiva"]),
    T("La función metalingüística usa la lengua para hablar de la propia lengua: definiciones, gramática, preguntas como «¿cómo se escribe…?».",
      "The metalinguistic function uses language to talk about language itself: definitions, grammar, questions like «¿cómo se escribe…?».",
      "La funció metalingüística fa servir la llengua per parlar de la mateixa llengua: definicions, gramàtica, preguntes com «¿cómo se escribe…?».")),

  q('tx-16', 'eso', '📞',
    T("Al teléfono: «¿Me oyes? ¿Sigues ahí?» ¿Qué función del lenguaje predomina?", "On the phone: «¿Me oyes? ¿Sigues ahí?» Which function of language dominates?", "Al telèfon: «¿Me oyes? ¿Sigues ahí?» Quina funció del llenguatge hi predomina?"),
    O(["Fática", "Poética", "Referencial", "Metalingüística"],
      ["Phatic", "Poetic", "Referential", "Metalinguistic"],
      ["Fàtica", "Poètica", "Referencial", "Metalingüística"]),
    T("La función fática se centra en el canal: sirve para abrir, mantener o cerrar la comunicación y comprobar que funciona («¿Me oyes?», «Hola», «Bueno, adiós»).",
      "The phatic function focuses on the channel: it opens, keeps up or closes communication and checks it is working («¿Me oyes?», «Hola», «Bueno, adiós»).",
      "La funció fàtica se centra en el canal: serveix per obrir, mantenir o tancar la comunicació i comprovar que funciona («¿Me oyes?», «Hola», «Bueno, adiós»).")),

  q('tx-17', 'eso', '🌡️',
    T("«El agua hierve a 100 °C al nivel del mar.» ¿Qué función del lenguaje predomina?", "«El agua hierve a 100 °C al nivel del mar.» Which function of language dominates?", "«El agua hierve a 100 °C al nivel del mar.» Quina funció del llenguatge hi predomina?"),
    O(["Referencial (o representativa)", "Expresiva", "Apelativa", "Fática"],
      ["Referential (representative)", "Expressive", "Conative", "Phatic"],
      ["Referencial (o representativa)", "Expressiva", "Apel·lativa", "Fàtica"]),
    T("La función referencial transmite información objetiva sobre la realidad. Predomina en noticias, textos científicos y expositivos, con modo indicativo y tercera persona.",
      "The referential function conveys objective information about reality. It dominates news, scientific and expository texts, with the indicative mood and third person.",
      "La funció referencial transmet informació objectiva sobre la realitat. Predomina en notícies, textos científics i expositius, amb mode indicatiu i tercera persona.")),

  q('tx-18', 'eso', '🎨',
    T("En un poema o un eslogan que cuida el ritmo, la rima y las figuras, ¿qué función predomina?", "In a poem or slogan that cares about rhythm, rhyme and figures of speech, which function dominates?", "En un poema o un eslògan que cuida el ritme, la rima i les figures, quina funció hi predomina?"),
    O(["Poética (o estética)", "Referencial", "Fática", "Metalingüística"],
      ["Poetic (aesthetic)", "Referential", "Phatic", "Metalinguistic"],
      ["Poètica (o estètica)", "Referencial", "Fàtica", "Metalingüística"]),
    T("La función poética se centra en el propio mensaje: importa cómo se dice. Aparece en la literatura, pero también en los eslóganes de la publicidad.",
      "The poetic function focuses on the message itself: how it is said matters. It appears in literature but also in advertising slogans.",
      "La funció poètica se centra en el mateix missatge: importa com es diu. Apareix a la literatura, però també a la publicitat.")),

  q('tx-19', 'eso', '🧩',
    T("¿Qué propiedad del texto se incumple si un escrito salta de un tema a otro sin relación?", "Which property of a text is broken if a piece of writing jumps between unrelated topics?", "Quina propietat del text s'incompleix si un escrit salta d'un tema a un altre sense relació?"),
    O(["La coherencia", "La adecuación", "La ortografía", "La rima"],
      ["Coherence", "Appropriateness", "Spelling", "Rhyme"],
      ["La coherència", "L'adequació", "L'ortografia", "La rima"]),
    T("Un texto es coherente cuando tiene un tema central y las ideas se ordenan con lógica y sin contradicciones. Saltar de un asunto a otro rompe la coherencia.",
      "A text is coherent when it has a central topic and the ideas follow logically without contradictions. Jumping from one subject to another breaks coherence.",
      "Un text és coherent quan té un tema central i les idees s'ordenen amb lògica i sense contradiccions. Saltar d'un assumpte a un altre trenca la coherència.")),

  q('tx-20', 'eso', '🔗',
    T("¿Qué mecanismo de cohesión se usa en «Compré un libro. Lo leí en dos días»?", "Which cohesion device is used in «Compré un libro. Lo leí en dos días»?", "Quin mecanisme de cohesió es fa servir a «Compré un libro. Lo leí en dos días»?"),
    O(["La referencia: el pronombre «lo» remite a «un libro»", "La rima", "La exclamación", "El diálogo"],
      ["Reference: the pronoun «lo» points back to «un libro»", "Rhyme", "Exclamation", "Dialogue"],
      ["La referència: el pronom «lo» remet a «un libro»", "La rima", "L'exclamació", "El diàleg"]),
    T("La cohesión son los recursos que enlazan las oraciones: pronombres que sustituyen palabras ya dichas, sinónimos, elipsis y conectores (además, sin embargo, por tanto).",
      "Cohesion is the set of devices that link sentences: pronouns replacing words already used, synonyms, ellipsis and connectors (además, sin embargo, por tanto).",
      "La cohesió són els recursos que enllacen les oracions: pronoms que substitueixen paraules ja dites, sinònims, el·lipsis i connectors (además, sin embargo, por tanto).")),

  q('tx-21', 'eso', '👔',
    T("Escribir «Hola, profe, ¿qué pasa?» en una carta formal al director incumple…", "Writing «Hola, profe, ¿qué pasa?» in a formal letter to the head teacher breaks…", "Escriure «Hola, profe, ¿qué pasa?» en una carta formal al director incompleix…"),
    O(["La adecuación: el registro no encaja con la situación", "La coherencia", "La cohesión", "La ortografía"],
      ["Appropriateness: the register does not fit the situation", "Coherence", "Cohesion", "Spelling"],
      ["L'adequació: el registre no encaixa amb la situació", "La coherència", "La cohesió", "L'ortografia"]),
    T("Un texto es adecuado cuando se ajusta a la situación, al receptor y a la intención. Una carta formal pide registro formal: «Estimado señor director…».",
      "A text is appropriate when it fits the situation, the receiver and the purpose. A formal letter calls for a formal register: «Estimado señor director…».",
      "Un text és adequat quan s'ajusta a la situació, al receptor i a la intenció. Una carta formal demana registre formal: «Estimado señor director…».")),

  q('tx-22', 'eso', '⚖️',
    T("En un texto argumentativo, ¿qué es la tesis?", "In an argumentative text, what is the thesis?", "En un text argumentatiu, què és la tesi?"),
    O(["La idea u opinión principal que el autor defiende", "El título del texto", "Un ejemplo concreto", "La última palabra del texto"],
      ["The main idea or opinion the author defends", "The title of the text", "A specific example", "The last word of the text"],
      ["La idea o opinió principal que l'autor defensa", "El títol del text", "Un exemple concret", "L'última paraula del text"]),
    T("La tesis es lo que el autor quiere demostrar; los argumentos (datos, ejemplos, citas de autoridad, causas y consecuencias) la apoyan, y la conclusión la refuerza al final.",
      "The thesis is what the author wants to prove; the arguments (data, examples, expert quotes, causes and consequences) support it, and the conclusion reinforces it at the end.",
      "La tesi és el que l'autor vol demostrar; els arguments (dades, exemples, cites d'autoritat, causes i conseqüències) la recolzen, i la conclusió la reforça al final.")),

  q('tx-23', 'eso', '🗞️',
    T("¿Qué diferencia a un artículo de opinión de una noticia?", "What distinguishes an opinion piece from a news story?", "Què diferencia un article d'opinió d'una notícia?"),
    O(["El artículo de opinión es subjetivo y va firmado; la noticia informa de forma objetiva", "La noticia siempre es más larga", "El artículo de opinión no se publica en periódicos", "No hay ninguna diferencia"],
      ["An opinion piece is subjective and signed; a news story informs objectively", "News stories are always longer", "Opinion pieces are not published in newspapers", "There is no difference"],
      ["L'article d'opinió és subjectiu i va signat; la notícia informa de manera objectiva", "La notícia sempre és més llarga", "L'article d'opinió no es publica als diaris", "No hi ha cap diferència"]),
    T("Los géneros periodísticos se dividen en informativos (noticia, reportaje) y de opinión (editorial, artículo, columna, carta al director). La entrevista y la crónica mezclan ambos.",
      "Journalistic genres split into informative ones (news story, feature) and opinion ones (editorial, article, column, letter to the editor). Interviews and chronicles mix both.",
      "Els gèneres periodístics es divideixen en informatius (notícia, reportatge) i d'opinió (editorial, article, columna, carta al director). L'entrevista i la crònica barregen tots dos.")),

  q('tx-24', 'eso', '🔀',
    T("En «Estudió mucho; sin embargo, suspendió», ¿qué relación expresa el conector?", "In «Estudió mucho; sin embargo, suspendió», what relation does the connector express?", "A «Estudió mucho; sin embargo, suspendió», quina relació expressa el connector?"),
    O(["Oposición o contraste", "Causa", "Orden temporal", "Ejemplo"],
      ["Contrast or opposition", "Cause", "Time order", "Example"],
      ["Oposició o contrast", "Causa", "Ordre temporal", "Exemple"]),
    T("«Sin embargo», «pero» o «no obstante» oponen dos ideas. Otros conectores expresan causa (porque, ya que), consecuencia (por tanto, así que) u orden (primero, después, por último).",
      "«Sin embargo», «pero» or «no obstante» set two ideas against each other. Other connectors express cause (porque, ya que), consequence (por tanto, así que) or order (primero, después, por último).",
      "«Sin embargo», «pero» o «no obstante» oposen dues idees. Altres connectors expressen causa (porque, ya que), conseqüència (por tanto, así que) o ordre (primero, después, por último).")),
]

// Convención de src/data: el nivel bajo se filtra y el alto usa el banco
// ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
export const PREGUNTAS_ESO = PREGUNTAS
