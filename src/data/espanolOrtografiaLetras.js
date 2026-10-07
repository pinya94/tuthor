import { opcionesDeExamen, correctaDeExamen, preguntaDeExamen } from './espanolMaterial'

// Ortografía: H, LL/Y y C/Z — primaria + ESO
//
// El cuarto tema de letras del bloque, junto a acentuación, b/v y g/j: las
// otras tres dudas que más se repiten en las redacciones (y que Corrige el
// Texto ya busca como familias «h» y «lly»). Reglas de la RAE con sus
// homófonos (hay/ay/ahí, haya/halla, vaya/valla/baya, cayó/calló, a ver/haber,
// hecho/echo) y los plurales en -ces.
//
// Cuando una frase admite dos palabras con sentido (se cayó / se calló), el
// enunciado dice de qué verbo se trata: solo puede haber una buena.
// Las palabras que se analizan no se traducen (espanolMaterial.js). La buena
// va la PRIMERA; ExamenMC baraja el orden.
function q(id, nivel, emoji, pregunta, opciones, explicacion) {
  const correcta = { es: opciones.es[0], en: opciones.en[0], ca: opciones.ca[0] }
  return { id, nivel, pregunta: preguntaDeExamen(pregunta), opciones: opcionesDeExamen(opciones), correcta: correctaDeExamen(opciones, correcta), emoji, explicacion }
}
const T = (es, en, ca) => ({ es, en, ca })
const W = (...xs) => ({ es: xs, en: xs, ca: xs })

export const PREGUNTAS = [
  // ── Primaria ──
  q('lt-01', 'primaria', '❄️',
    T('¿Cuál está bien escrita?', 'Which one is spelt correctly?', 'Quina està ben escrita?'),
    W('hielo', 'ielo', 'gielo', 'hyelo'),
    T('Las palabras que empiezan por hie-, hue-, hui- y hia- llevan h: hielo, hierba, hueso, huevo, huir.', 'Words beginning with hie-, hue-, hui- and hia- take an h: hielo, hierba, hueso, huevo, huir.', 'Les paraules que comencen per hie-, hue-, hui- i hia- porten h: hielo, hierba, hueso, huevo, huir.')),
  q('lt-02', 'primaria', '🥚',
    T('Las palabras que empiezan por «hue-», como «huevo» o «huerto», se escriben…', 'Spanish words beginning with "hue-", such as "huevo" or "huerto", are written…', 'Les paraules que comencen per «hue-», com «huevo» o «huerto», s’escriuen…'),
    T(['siempre con h', 'siempre sin h', 'con h solo si son verbos', 'con g: güevo, güerto'], ['always with an h', 'always without an h', 'with an h only if they are verbs', 'with a g: güevo, güerto'], ['sempre amb h', 'sempre sense h', 'amb h només si són verbs', 'amb g: güevo, güerto']),
    T('Es una de las reglas más fiables: hue-, hie-, hui- y hia- al principio de palabra van con h. Escribir «güevo» es un vulgarismo.', 'It is one of the most reliable rules: hue-, hie-, hui- and hia- at the start of a word take an h. Writing "güevo" is a non-standard form.', 'És una de les regles més fiables: hue-, hie-, hui- i hia- al començament de paraula van amb h. Escriure «güevo» és un vulgarisme.')),
  q('lt-03', 'primaria', '💨',
    T('¿Cuál está bien escrita?', 'Which one is spelt correctly?', 'Quina està ben escrita?'),
    W('humedad', 'umedad', 'humedá', 'húmedad'),
    T('Las palabras que empiezan por hum- seguido de vocal llevan h: humo, humano, humedad, humilde. La -d final se escribe aunque a veces no se pronuncie.', 'Words beginning with hum- followed by a vowel take an h: humo, humano, humedad, humilde. The final -d is written even if it is sometimes not pronounced.', 'Les paraules que comencen per hum- seguit de vocal porten h: humo, humano, humedad, humilde. La -d final s’escriu encara que de vegades no es pronunciï.')),
  q('lt-04', 'primaria', '🎬',
    T('Completa: «¿___ visto la película?»', 'Complete: "¿___ visto la película?"', 'Completa: «¿___ visto la película?»'),
    W('Has', 'As', 'Haz', 'Az'),
    T('Es el verbo haber (tú has visto), y todas sus formas llevan h. «As» es la carta o el campeón, y «haz» viene de hacer: «haz los deberes».', 'It is the verb haber (tú has visto), and all its forms take an h. "As" is the ace card or champion, and "haz" comes from hacer: "haz los deberes".', 'És el verb haber (tú has visto), i totes les seves formes porten h. «As» és la carta o el campió, i «haz» ve de hacer: «haz los deberes».')),
  q('lt-05', 'primaria', '🤕',
    T('Completa: «¡___! Me he dado un golpe.»', 'Complete: "¡___! Me he dado un golpe."', 'Completa: «¡___! Me he dado un golpe.»'),
    W('Ay', 'Hay', 'Ahí', 'Ai'),
    T('«Ay» expresa dolor o pena. «Hay» es del verbo haber (hay pan) y «ahí» indica un lugar (está ahí).', '"Ay" expresses pain or sorrow. "Hay" is from the verb haber (hay pan, there is bread) and "ahí" indicates a place (está ahí, it’s there).', '«Ay» expressa dolor o pena. «Hay» és del verb haber (hay pan) i «ahí» indica un lloc (está ahí).')),
  q('lt-06', 'primaria', '🍽️',
    T('Completa: «No sé si ___ algún restaurante abierto.»', 'Complete: "No sé si ___ algún restaurante abierto."', 'Completa: «No sé si ___ algún restaurante abierto.»'),
    W('haya', 'halla', 'aya', 'alla'),
    T('Es el verbo haber: «que haya». «Halla» viene de hallar, encontrar («halla la solución»), y un «haya» también es un árbol; «aya» es una niñera antigua.', 'It is the verb haber: "que haya". "Halla" comes from hallar, to find ("halla la solución"), and a "haya" is also a beech tree; "aya" is an old word for a nanny.', 'És el verb haber: «que haya». «Halla» ve de hallar, trobar («halla la solución»), i un «haya» també és un faig; «aya» és una mainadera antiga.')),
  q('lt-07', 'primaria', '👑',
    T('¿Cuál es el plural de «rey»?', 'What is the plural of "rey"?', 'Quin és el plural de «rey»?'),
    W('reyes', 'reys', 'relles', 'reies'),
    T('Las palabras que acaban en -y forman el plural con -yes: rey → reyes, ley → leyes, buey → bueyes. La y se queda.', 'Words ending in -y make their plural with -yes: rey → reyes, ley → leyes, buey → bueyes. The y stays.', 'Les paraules acabades en -y fan el plural amb -yes: rey → reyes, ley → leyes, buey → bueyes. La y es queda.')),
  q('lt-08', 'primaria', '⚖️',
    T('Cuando una palabra termina en el sonido «i» detrás de otra vocal, como «rey», «hoy» o «muy», ¿con qué letra se escribe ese sonido?', 'When a Spanish word ends in an "i" sound after another vowel, like "rey", "hoy" or "muy", which letter is that sound written with?', 'Quan una paraula acaba en el so «i» darrere d’una altra vocal, com «rey», «hoy» o «muy», amb quina lletra s’escriu aquest so?'),
    W('y', 'i', 'll', 'hi'),
    T('Al final de palabra y detrás de vocal, ese sonido se escribe con y: rey, ley, hoy, muy, estoy. Si lleva tilde, va con i: «bonsái».', 'At the end of a word and after a vowel, that sound is written with y: rey, ley, hoy, muy, estoy. If it carries an accent, it is written with i: "bonsái".', 'Al final de paraula i darrere de vocal, aquest so s’escriu amb y: rey, ley, hoy, muy, estoy. Si porta accent, va amb i: «bonsái».')),
  q('lt-09', 'primaria', '🐿️',
    T('¿Cuál está bien escrita?', 'Which one is spelt correctly?', 'Quina està ben escrita?'),
    W('ardilla', 'ardiya', 'hardilla', 'ardila'),
    T('Las palabras terminadas en -illo, -illa se escriben con ll: ardilla, pasillo, bombilla, mantequilla.', 'Words ending in -illo, -illa are written with ll: ardilla, pasillo, bombilla, mantequilla.', 'Les paraules acabades en -illo, -illa s’escriuen amb ll: ardilla, pasillo, bombilla, mantequilla.')),
  q('lt-10', 'primaria', '✏️',
    T('¿Cuál es el plural de «lápiz»?', 'What is the plural of "lápiz"?', 'Quin és el plural de «lápiz»?'),
    W('lápices', 'lápizes', 'lápises', 'lapices'),
    T('Las palabras que acaban en -z hacen el plural en -ces: lápiz → lápices, pez → peces, luz → luces. Y «lápices» es esdrújula, así que lleva tilde.', 'Words ending in -z make the plural in -ces: lápiz → lápices, pez → peces, luz → luces. And "lápices" is stressed on the third-to-last syllable, so it carries an accent.', 'Les paraules acabades en -z fan el plural en -ces: lápiz → lápices, pez → peces, luz → luces. I «lápices» és esdrúixola, així que porta accent.')),
  q('lt-11', 'primaria', '🔤',
    T('En castellano, delante de «e» y de «i», el sonido de la «z» se escribe normalmente con…', 'In Spanish, before "e" and "i", the "z" sound is normally written with…', 'En castellà, davant de «e» i d’«i», el so de la «z» s’escriu normalment amb…'),
    T(['c (cena, cine)', 'z (zena, zine)', 's (sena, sine)', 'k (kena, kine)'], ['c (cena, cine)', 'z (zena, zine)', 's (sena, sine)', 'k (kena, kine)'], ['c (cena, cine)', 'z (zena, zine)', 's (sena, sine)', 'k (kena, kine)']),
    T('Za, zo, zu, pero ce, ci: zapato, zorro, zumo; cena, cine. Hay pocas excepciones, como «zeta» o «zigzag».', 'Za, zo, zu, but ce, ci: zapato, zorro, zumo; cena, cine. There are few exceptions, such as "zeta" or "zigzag".', 'Za, zo, zu, però ce, ci: zapato, zorro, zumo; cena, cine. Hi ha poques excepcions, com «zeta» o «zigzag».')),
  q('lt-12', 'primaria', '👟',
    T('¿Cuál está bien escrita?', 'Which one is spelt correctly?', 'Quina està ben escrita?'),
    W('zapato', 'capato', 'sapato', 'zsapato'),
    T('Delante de a, o, u el sonido se escribe con z: zapato, pozo, azul. «Capato» sonaría con k.', 'Before a, o, u the sound is written with z: zapato, pozo, azul. "Capato" would sound with a k.', 'Davant d’a, o, u el so s’escriu amb z: zapato, pozo, azul. «Capato» sonaria amb k.')),

  // ── ESO ──
  q('lt-13', 'eso', '⬇️',
    T('Completa con el verbo «caer»: «Ayer el perro se ___ por la escalera.»', 'Complete with the verb "caer" (to fall): "Ayer el perro se ___ por la escalera."', 'Completa amb el verb «caer»: «Ayer el perro se ___ por la escalera.»'),
    W('cayó', 'calló', 'cayo', 'callo'),
    T('Las formas de «caer» llevan y: cayó, cayeron. «Calló» es de «callar» (guardar silencio), y «cayo» y «callo», sin tilde, son una isla pequeña y una dureza de la piel.', 'The forms of "caer" take a y: cayó, cayeron. "Calló" is from "callar" (to go quiet), and "cayo" and "callo", without an accent, are a small island and a hard patch of skin.', 'Les formes de «caer» porten y: cayó, cayeron. «Calló» és de «callar» (callar), i «cayo» i «callo», sense accent, són una illa petita i una durícia de la pell.')),
  q('lt-14', 'eso', '🤫',
    T('Completa con el verbo «callar»: «Cuando le pidieron silencio, Ana se ___.»', 'Complete with the verb "callar" (to go quiet): "Cuando le pidieron silencio, Ana se ___."', 'Completa amb el verb «callar»: «Cuando le pidieron silencio, Ana se ___.»'),
    W('calló', 'cayó', 'callo', 'cayo'),
    T('«Callar» lleva ll en todas sus formas: calló, callaron. Se pronuncia igual que «cayó» en casi toda España (yeísmo), por eso hay que fijarse en el verbo.', '"Callar" takes ll in all its forms: calló, callaron. In most of Spain it sounds the same as "cayó" (yeísmo), which is why you have to look at the verb.', '«Callar» porta ll en totes les seves formes: calló, callaron. Es pronuncia igual que «cayó» a gairebé tot Espanya (ieisme), per això cal fixar-se en el verb.')),
  q('lt-15', 'eso', '🏗️',
    T('¿Qué forma del verbo «construir» está bien escrita?', 'Which form of the verb "construir" is spelt correctly?', 'Quina forma del verb «construir» està ben escrita?'),
    W('construyó', 'construlló', 'construió', 'contruyó'),
    T('Los verbos que no tienen ll ni y en el infinitivo (construir, leer, oír, huir) usan y cuando aparece ese sonido: construyó, leyó, oyó, huyó.', 'Verbs with no ll or y in the infinitive (construir, leer, oír, huir) use y when that sound appears: construyó, leyó, oyó, huyó.', 'Els verbs que no tenen ll ni y a l’infinitiu (construir, leer, oír, huir) fan servir y quan apareix aquest so: construyó, leyó, oyó, huyó.')),
  q('lt-16', 'eso', '👋',
    T('Completa: «¡Que te ___ bien en el examen!»', 'Complete: "¡Que te ___ bien en el examen!"', 'Completa: «¡Que te ___ bien en el examen!»'),
    W('vaya', 'valla', 'baya', 'balla'),
    T('Es el verbo «ir»: que te vaya bien. «Valla» es una cerca y «baya» un fruto pequeño como el arándano.', 'It is the verb "ir" (to go): que te vaya bien. "Valla" is a fence and "baya" a small fruit like the blueberry.', 'És el verb «ir»: que te vaya bien. «Valla» és una tanca i «baya» un fruit petit com el nabiu.')),
  q('lt-17', 'eso', '🚧',
    T('Completa: «Han puesto una ___ alrededor del campo de fútbol.»', 'Complete: "Han puesto una ___ alrededor del campo de fútbol."', 'Completa: «Han puesto una ___ alrededor del campo de fútbol.»'),
    W('valla', 'vaya', 'baya', 'balla'),
    T('«Valla» es una cerca, y también un cartel publicitario grande. Se escribe con v y ll.', '"Valla" is a fence, and also a large advertising billboard. It is written with v and ll.', '«Valla» és una tanca, i també un cartell publicitari gran. S’escriu amb v i ll.')),
  q('lt-18', 'eso', '🦴',
    T('«Hueso» lleva h, pero «óseo» no. ¿Por qué?', '"Hueso" has an h, but "óseo" does not. Why?', '«Hueso» porta h, però «óseo» no. Per què?'),
    T(['Porque la h solo aparece cuando la palabra empieza por «hue-»', 'Porque «óseo» es una falta que la RAE acepta', 'Porque «óseo» viene del inglés', 'Porque las esdrújulas no llevan h'], ['Because the h only appears when the word starts with "hue-"', 'Because "óseo" is a mistake the RAE accepts', 'Because "óseo" comes from English', 'Because words stressed on the third-to-last syllable never take h'], ['Perquè la h només apareix quan la paraula comença per «hue-»', 'Perquè «óseo» és una falta que la RAE accepta', 'Perquè «óseo» ve de l’anglès', 'Perquè les esdrúixoles no porten h']),
    T('La h se puso delante del diptongo ue. Cuando la familia pierde el diptongo, pierde la h: hueso → óseo, huevo → óvulo, hueco → oquedad, huérfano → orfanato.', 'The h was placed before the diphthong ue. When the word family loses the diphthong, it loses the h: hueso → óseo, huevo → óvulo, hueco → oquedad, huérfano → orfanato.', 'La h es va posar davant del diftong ue. Quan la família perd el diftong, perd la h: hueso → óseo, huevo → óvulo, hueco → oquedad, huérfano → orfanato.')),
  q('lt-19', 'eso', '💧',
    T('¿Cuál está bien escrita?', 'Which one is spelt correctly?', 'Quina està ben escrita?'),
    W('hidratar', 'idratar', 'hidrathar', 'hidrratar'),
    T('Los prefijos griegos hidr- (agua), hiper-, hipo-, hemi-, hexa-, hepta- llevan h: hidratar, hipermercado, hipopótamo, hemisferio.', 'The Greek prefixes hidr- (water), hiper-, hipo-, hemi-, hexa-, hepta- take an h: hidratar, hipermercado, hipopótamo, hemisferio.', 'Els prefixos grecs hidr- (aigua), hiper-, hipo-, hemi-, hexa-, hepta- porten h: hidratar, hipermercado, hipopótamo, hemisferio.')),
  q('lt-20', 'eso', '👀',
    T('Completa: «Vamos ___ qué ha pasado.»', 'Complete: "Vamos ___ qué ha pasado."', 'Completa: «Vamos ___ qué ha pasado.»'),
    W('a ver', 'haber', 'aver', 'a haber'),
    T('«A ver» es la preposición a + el verbo ver: vamos a ver, a ver qué pasa. «Haber» es el infinitivo de haber: «tiene que haber una solución». «Aver» no existe.', '"A ver" is the preposition a + the verb ver (to see): vamos a ver, a ver qué pasa. "Haber" is the infinitive of haber: "tiene que haber una solución". "Aver" does not exist.', '«A ver» és la preposició a + el verb ver: vamos a ver, a ver qué pasa. «Haber» és l’infinitiu de haber: «tiene que haber una solución». «Aver» no existeix.')),
  q('lt-21', 'eso', '👥',
    T('Completa: «Debe de ___ más gente en la sala.»', 'Complete: "Debe de ___ más gente en la sala."', 'Completa: «Debe de ___ más gente en la sala.»'),
    W('haber', 'a ver', 'aver', 'a haber'),
    T('Detrás de «debe de», «tiene que» o «puede» va un infinitivo: debe de haber gente. Truco: si se puede cambiar por «existir», es «haber».', 'After "debe de", "tiene que" or "puede" comes an infinitive: debe de haber gente. Tip: if it can be replaced by "existir", it is "haber".', 'Darrere de «debe de», «tiene que» o «puede» va un infinitiu: debe de haber gente. Truc: si es pot canviar per «existir», és «haber».')),
  q('lt-22', 'eso', '📒',
    T('Completa: «Ya he ___ los deberes.»', 'Complete: "Ya he ___ los deberes."', 'Completa: «Ya he ___ los deberes.»'),
    W('hecho', 'echo', 'eho', 'hecjo'),
    T('«Hecho» es el participio de «hacer» (he hecho) y lleva h, como todo el verbo. «Echo» es de «echar»: «echo sal a la sopa».', '"Hecho" is the past participle of "hacer" (he hecho) and takes an h, like the whole verb. "Echo" is from "echar" (to put/throw): "echo sal a la sopa".', '«Hecho» és el participi de «hacer» (he hecho) i porta h, com tot el verb. «Echo» és de «echar»: «echo sal a la sopa».')),
  q('lt-23', 'eso', '🤝',
    T('¿Qué forma del verbo «conocer» está bien escrita?', 'Which form of the verb "conocer" is spelt correctly?', 'Quina forma del verb «conocer» està ben escrita?'),
    W('conozco', 'conosco', 'conozo', 'conoszco'),
    T('Los verbos acabados en -cer y -cir hacen -zco en la primera persona: conocer → conozco, parecer → parezco, conducir → conduzco.', 'Verbs ending in -cer and -cir take -zco in the first person: conocer → conozco, parecer → parezco, conducir → conduzco.', 'Els verbs acabats en -cer i -cir fan -zco a la primera persona: conocer → conozco, parecer → parezco, conducir → conduzco.')),
  q('lt-24', 'eso', '🧭',
    T('¿Cuál está bien escrita?', 'Which one is spelt correctly?', 'Quina està ben escrita?'),
    W('dirección', 'direción', 'dirreción', 'direcsión'),
    T('Se escribe -cción cuando en la familia hay -ct-: director, directo → dirección; acto → acción. Si no lo hay, -ción: relación, canción.', 'It is written -cción when the word family has -ct-: director, directo → dirección; acto → acción. If not, -ción: relación, canción.', 'S’escriu -cción quan a la família hi ha -ct-: director, directo → dirección; acto → acción. Si no n’hi ha, -ción: relación, canción.')),
]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO (ver memoria «bancos-examen»).
export const PREGUNTAS_ESO = PREGUNTAS
