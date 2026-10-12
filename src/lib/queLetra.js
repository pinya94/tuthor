// ¿Qué Letra Va? (lengua · ortografía: B/V, G/J, H, LL/Y y C/Z).
//
// Sale una palabra con un hueco y dos (o tres) maneras de escribirla. Al
// corregir aparece la regla que la explica, o el aviso de que es una
// excepción. Es un examen DE castellano: las palabras van siempre en
// castellano, también con la interfaz en inglés o en catalán (solo se
// traducen las explicaciones). Ver la nota de «Español: material vs prosa».
//
// Las palabras están elegidas a mano y NUNCA se usa una cuya otra escritura
// también exista (vaca/baca, tubo/tuvo, echo/hecho, rayo/rallo, ola/hola,
// hierba/yerba, cebra/zebra…): la respuesta tiene que ser indiscutible.

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es

export const REGLAS = {
  bir: T('Los verbos terminados en -bir se escriben con b (escribir, recibir, subir…). Excepciones: hervir, servir y vivir.', 'Verbs ending in -bir are spelt with b (escribir, recibir, subir…). Exceptions: hervir, servir and vivir.', 'En castellà, els verbs acabats en -bir s’escriuen amb b (escribir, recibir, subir…). Excepcions: hervir, servir i vivir.'),
  birExc: T('Excepción a la regla de -bir: hervir, servir y vivir se escriben con v (y sus formas: vivimos, sirve, hierve).', 'Exception to the -bir rule: hervir, servir and vivir are spelt with v (and their forms: vivimos, sirve, hierve).', 'Excepció a la regla de -bir: hervir, servir i vivir s’escriuen amb v (i les seves formes: vivimos, sirve, hierve).'),
  mb: T('Después de m siempre se escribe b (hombre, cambio, tambor), y después de n, v (invierno, enviar, convencer).', 'After m you always write b (hombre, cambio, tambor), and after n, v (invierno, enviar, convencer).', 'Després de m sempre s’escriu b (hombre, cambio, tambor), i després de n, v (invierno, enviar, convencer).'),
  aba: T('Las terminaciones -aba, -abas, -ábamos del pretérito imperfecto se escriben con b (cantaba, jugábamos).', 'The past imperfect endings -aba, -abas, -ábamos are spelt with b (cantaba, jugábamos).', 'Les terminacions -aba, -abas, -ábamos del pretèrit imperfet s’escriuen amb b (cantaba, jugábamos).'),
  blbr: T('Delante de l y de r se escribe b: bl, br (blanco, brazo, libro, hablar).', 'Before l and r you write b: bl, br (blanco, brazo, libro, hablar).', 'Davant de l i de r s’escriu b: bl, br (blanco, brazo, libro, hablar).'),
  ivo: T('Los adjetivos terminados en -ivo, -iva se escriben con v (activo, positiva, decisivo).', 'Adjectives ending in -ivo, -iva are spelt with v (activo, positiva, decisivo).', 'Els adjectius acabats en -ivo, -iva s’escriuen amb v (activo, positiva, decisivo).'),
  bilidad: T('Las palabras terminadas en -bilidad se escriben con b (amabilidad, posibilidad). Excepciones: movilidad y civilidad.', 'Words ending in -bilidad are spelt with b (amabilidad, posibilidad). Exceptions: movilidad and civilidad.', 'Les paraules acabades en -bilidad s’escriuen amb b (amabilidad, posibilidad). Excepcions: movilidad i civilidad.'),
  bilidadExc: T('Excepción a la regla de -bilidad: movilidad y civilidad se escriben con v, porque vienen de móvil y civil.', 'Exception to the -bilidad rule: movilidad and civilidad are spelt with v, because they come from móvil and civil.', 'Excepció a la regla de -bilidad: movilidad i civilidad s’escriuen amb v, perquè vénen de móvil i civil.'),
  bi: T('Los prefijos bi-, bis-, biz- (dos) y bio- (vida) se escriben con b (bicicleta, bisabuelo, biología).', 'The prefixes bi-, bis-, biz- (two) and bio- (life) are spelt with b (bicicleta, bisabuelo, biología).', 'Els prefixos bi-, bis-, biz- (dos) i bio- (vida) s’escriuen amb b (bicicleta, bisabuelo, biología).'),
  eva: T('Después de eva-, eve-, evi-, evo- se escribe v (evitar, nuevo, llevar, evolución). Excepciones: ébano y ebanista.', 'After eva-, eve-, evi-, evo- you write v (evitar, nuevo, llevar, evolución). Exceptions: ébano and ebanista.', 'Després de eva-, eve-, evi-, evo- s’escriu v (evitar, nuevo, llevar, evolución). Excepcions: ébano i ebanista.'),
  uve: T('Los pretéritos de tener, estar y andar llevan v: tuve, estuve, anduve (y tuvimos, estuvieron…).', 'The past tenses of tener, estar and andar have v: tuve, estuve, anduve (and tuvimos, estuvieron…).', 'Els pretèrits de tener, estar i andar porten v: tuve, estuve, anduve (i tuvimos, estuvieron…).'),
  ger: T('Los verbos terminados en -ger y -gir se escriben con g (coger, elegir, proteger). Excepciones: tejer y crujir.', 'Verbs ending in -ger and -gir are spelt with g (coger, elegir, proteger). Exceptions: tejer and crujir.', 'Els verbs acabats en -ger i -gir s’escriuen amb g (coger, elegir, proteger). Excepcions: tejer i crujir.'),
  gerExc: T('Excepción a la regla de -ger/-gir: tejer y crujir se escriben con j.', 'Exception to the -ger/-gir rule: tejer and crujir are spelt with j.', 'Excepció a la regla de -ger/-gir: tejer i crujir s’escriuen amb j.'),
  geo: T('Se escriben con g las palabras con geo- (tierra), gen y -logía (geografía, gente, biología).', 'Words with geo- (earth), gen and -logía are spelt with g (geografía, gente, biología).', 'S’escriuen amb g les paraules amb geo- (terra), gen i -logía (geografía, gente, biología).'),
  aje: T('Las palabras terminadas en -aje se escriben con j (viaje, paisaje, mensaje, garaje).', 'Words ending in -aje are spelt with j (viaje, paisaje, mensaje, garaje).', 'Les paraules acabades en -aje s’escriuen amb j (viaje, paisaje, mensaje, garaje).'),
  jero: T('Las terminaciones -jero, -jera y -jería se escriben con j (extranjero, cerrajero, relojería).', 'The endings -jero, -jera and -jería are spelt with j (extranjero, cerrajero, relojería).', 'Les terminacions -jero, -jera i -jería s’escriuen amb j (extranjero, cerrajero, relojería).'),
  dije: T('Los verbos que en infinitivo no tienen g ni j y en pasado tienen el sonido «je» lo escriben con j: dijeron (decir), trajeron (traer), condujeron (conducir).', 'Verbs with no g or j in the infinitive that have the «je» sound in the past write it with j: dijeron (decir), trajeron (traer), condujeron (conducir).', 'Els verbs que en infinitiu no tenen g ni j i en passat tenen el so «je» l’escriuen amb j: dijeron (decir), trajeron (traer), condujeron (conducir).'),
  dieresis: T('Para que suene la u en gue, gui se le ponen dos puntos (diéresis): pingüino, cigüeña, vergüenza.', 'To make the u sound in gue, gui it gets two dots (a diaeresis): pingüino, cigüeña, vergüenza.', 'Perquè soni la u en gue, gui s’hi posa dièresi: pingüino, cigüeña, vergüenza.'),
  gue: T('Para el sonido «gue», «gui» suave se escribe gu: guerra, guitarra (sin la u, ge y gi suenan como j).', 'For the soft «gue», «gui» sound you write gu: guerra, guitarra (without the u, ge and gi sound like j).', 'Per al so «gue», «gui» suau s’escriu gu: guerra, guitarra (sense la u, ge i gi sonen com j).'),
  hue: T('Se escriben con h las palabras que empiezan por hie- y hue- (hielo, hueso, huevo, huerto).', 'Words beginning with hie- and hue- are spelt with h (hielo, hueso, huevo, huerto).', 'S’escriuen amb h les paraules que comencen per hie- i hue- (hielo, hueso, huevo, huerto).'),
  hum: T('Se escriben con h las palabras que empiezan por hum- seguido de vocal (humo, humano, humedad).', 'Words beginning with hum- followed by a vowel are spelt with h (humo, humano, humedad).', 'S’escriuen amb h les paraules que comencen per hum- seguit de vocal (humo, humano, humedad).'),
  haber: T('Todas las formas de los verbos haber y hacer llevan h (había, hizo, hacemos).', 'All forms of the verbs haber and hacer have an h (había, hizo, hacemos).', 'Totes les formes dels verbs haber i hacer porten h (había, hizo, hacemos).'),
  hidro: T('Los prefijos griegos hidr-, hiper-, hipo-, hexa- y hemi- se escriben con h (hidrógeno, hipermercado, hexágono).', 'The Greek prefixes hidr-, hiper-, hipo-, hexa- and hemi- are spelt with h (hidrógeno, hipermercado, hexágono).', 'Els prefixos grecs hidr-, hiper-, hipo-, hexa- i hemi- s’escriuen amb h (hidrógeno, hipermercado, hexágono).'),
  hInter: T('Hay palabras con h en medio (h intercalada) que no se oye: ahora, almohada, zanahoria, búho, prohibir. Hay que aprenderlas.', 'Some words have a silent h in the middle: ahora, almohada, zanahoria, búho, prohibir. They have to be learnt.', 'Hi ha paraules amb h al mig (h intercalada) que no se sent: ahora, almohada, zanahoria, búho, prohibir. Cal aprendre-les.'),
  illo: T('Las terminaciones -illo, -illa se escriben con ll (pasillo, ardilla, bolsillo, mantequilla).', 'The endings -illo, -illa are spelt with ll (pasillo, ardilla, bolsillo, mantequilla).', 'Les terminacions -illo, -illa s’escriuen amb ll (pasillo, ardilla, bolsillo, mantequilla).'),
  yFinal: T('Al final de palabra, después de vocal, el sonido «i» sin tilde se escribe con y (rey, hoy, muy, estoy).', 'At the end of a word, after a vowel, the unstressed «i» sound is spelt y (rey, hoy, muy, estoy).', 'A final de paraula, després de vocal, el so «i» sense accent s’escriu amb y (rey, hoy, muy, estoy).'),
  yVerbo: T('Se escriben con y las formas verbales con ese sonido cuyo infinitivo no lleva ll ni y: leyendo (leer), cayó (caer), oyeron (oír).', 'Verb forms with that sound whose infinitive has no ll or y are spelt with y: leyendo (leer), cayó (caer), oyeron (oír).', 'S’escriuen amb y les formes verbals amb aquest so l’infinitiu de les quals no porta ll ni y: leyendo (leer), cayó (caer), oyeron (oír).'),
  llPalabra: T('Esta palabra se escribe con ll y no sigue una regla fija: hay que aprenderla (lluvia, llave, calle, caballo).', 'This word is spelt with ll and follows no fixed rule: it has to be learnt (lluvia, llave, calle, caballo).', 'Aquesta paraula s’escriu amb ll i no segueix cap regla fixa: cal aprendre-la (lluvia, llave, calle, caballo).'),
  zPlural: T('Las palabras que acaban en z hacen el plural en -ces: pez → peces, lápiz → lápices, luz → luces.', 'Words ending in z make their plural in -ces: pez → peces, lápiz → lápices, luz → luces.', 'Les paraules acabades en z fan el plural en -ces: pez → peces, lápiz → lápices, luz → luces.'),
  ceci: T('El sonido «z» delante de e, i se escribe con c: cielo, cereza, cine (ze y zi casi no existen en castellano).', 'The «th» sound before e and i is spelt c: cielo, cereza, cine (ze and zi barely exist in Spanish).', 'El so «z» davant de e, i s’escriu amb c: cielo, cereza, cine (ze i zi gairebé no existeixen en castellà).'),
}

// ok: la buena; mal: las escrituras incorrectas; r: regla; n: nivel mínimo (1 fácil, 2 medio, 3 difícil); g: grupo.
export const PALABRAS = [
  // B/V
  { ok: 'escribir', mal: ['escrivir'], r: 'bir', n: 1, g: 'bv' }, { ok: 'recibir', mal: ['recivir'], r: 'bir', n: 1, g: 'bv' },
  { ok: 'subir', mal: ['suvir'], r: 'bir', n: 1, g: 'bv' }, { ok: 'prohibir', mal: ['prohivir'], r: 'bir', n: 2, g: 'bv' },
  { ok: 'describir', mal: ['descrivir'], r: 'bir', n: 2, g: 'bv' },
  { ok: 'vivir', mal: ['vibir', 'bibir'], r: 'birExc', n: 3, g: 'bv' }, { ok: 'hervir', mal: ['herbir'], r: 'birExc', n: 3, g: 'bv' },
  { ok: 'servir', mal: ['serbir'], r: 'birExc', n: 3, g: 'bv' },
  { ok: 'hombre', mal: ['homvre'], r: 'mb', n: 1, g: 'bv' }, { ok: 'cambio', mal: ['camvio'], r: 'mb', n: 1, g: 'bv' },
  { ok: 'tambor', mal: ['tamvor'], r: 'mb', n: 1, g: 'bv' }, { ok: 'invierno', mal: ['inbierno'], r: 'mb', n: 1, g: 'bv' },
  { ok: 'enviar', mal: ['enbiar'], r: 'mb', n: 1, g: 'bv' }, { ok: 'invitar', mal: ['inbitar'], r: 'mb', n: 1, g: 'bv' },
  { ok: 'convencer', mal: ['conbencer'], r: 'mb', n: 2, g: 'bv' },
  { ok: 'cantaba', mal: ['cantava'], r: 'aba', n: 1, g: 'bv' }, { ok: 'jugábamos', mal: ['jugávamos'], r: 'aba', n: 1, g: 'bv' },
  { ok: 'estaba', mal: ['estava'], r: 'aba', n: 1, g: 'bv' }, { ok: 'andabas', mal: ['andavas'], r: 'aba', n: 2, g: 'bv' },
  { ok: 'blanco', mal: ['vlanco'], r: 'blbr', n: 1, g: 'bv' }, { ok: 'brazo', mal: ['vrazo'], r: 'blbr', n: 1, g: 'bv' },
  { ok: 'libro', mal: ['livro'], r: 'blbr', n: 1, g: 'bv' }, { ok: 'hablar', mal: ['havlar'], r: 'blbr', n: 1, g: 'bv' },
  { ok: 'activo', mal: ['actibo'], r: 'ivo', n: 2, g: 'bv' }, { ok: 'positiva', mal: ['positiba'], r: 'ivo', n: 2, g: 'bv' },
  { ok: 'decisivo', mal: ['decisibo'], r: 'ivo', n: 2, g: 'bv' }, { ok: 'llamativo', mal: ['llamatibo'], r: 'ivo', n: 2, g: 'bv' },
  { ok: 'amabilidad', mal: ['amavilidad'], r: 'bilidad', n: 2, g: 'bv' }, { ok: 'posibilidad', mal: ['posivilidad'], r: 'bilidad', n: 2, g: 'bv' },
  { ok: 'responsabilidad', mal: ['responsavilidad'], r: 'bilidad', n: 2, g: 'bv' },
  { ok: 'movilidad', mal: ['mobilidad'], r: 'bilidadExc', n: 3, g: 'bv' },
  { ok: 'bicicleta', mal: ['vicicleta'], r: 'bi', n: 1, g: 'bv' }, { ok: 'bisabuelo', mal: ['visabuelo'], r: 'bi', n: 2, g: 'bv' },
  { ok: 'biología', mal: ['viología'], r: 'bi', n: 2, g: 'bv' },
  { ok: 'nuevo', mal: ['nuebo'], r: 'eva', n: 2, g: 'bv' }, { ok: 'llevar', mal: ['llebar'], r: 'eva', n: 2, g: 'bv' },
  { ok: 'evitar', mal: ['ebitar'], r: 'eva', n: 2, g: 'bv' }, { ok: 'evolución', mal: ['ebolución'], r: 'eva', n: 2, g: 'bv' },
  { ok: 'tuve', mal: ['tube'], r: 'uve', n: 3, g: 'bv' }, { ok: 'estuve', mal: ['estube'], r: 'uve', n: 3, g: 'bv' },
  { ok: 'anduvimos', mal: ['andubimos'], r: 'uve', n: 3, g: 'bv' },
  // G/J
  { ok: 'coger', mal: ['cojer'], r: 'ger', n: 1, g: 'gj' }, { ok: 'elegir', mal: ['elejir'], r: 'ger', n: 1, g: 'gj' },
  { ok: 'proteger', mal: ['protejer'], r: 'ger', n: 1, g: 'gj' }, { ok: 'dirigir', mal: ['dirijir'], r: 'ger', n: 2, g: 'gj' },
  { ok: 'recoger', mal: ['recojer'], r: 'ger', n: 1, g: 'gj' },
  { ok: 'tejer', mal: ['teger'], r: 'gerExc', n: 3, g: 'gj' }, { ok: 'crujir', mal: ['crugir'], r: 'gerExc', n: 3, g: 'gj' },
  { ok: 'geografía', mal: ['jeografía'], r: 'geo', n: 1, g: 'gj' }, { ok: 'geometría', mal: ['jeometría'], r: 'geo', n: 1, g: 'gj' },
  { ok: 'gente', mal: ['jente'], r: 'geo', n: 1, g: 'gj' }, { ok: 'urgente', mal: ['urjente'], r: 'geo', n: 2, g: 'gj' },
  { ok: 'zoología', mal: ['zoolojía'], r: 'geo', n: 2, g: 'gj' },
  { ok: 'viaje', mal: ['viage'], r: 'aje', n: 1, g: 'gj' }, { ok: 'paisaje', mal: ['paisage'], r: 'aje', n: 1, g: 'gj' },
  { ok: 'mensaje', mal: ['mensage'], r: 'aje', n: 1, g: 'gj' }, { ok: 'garaje', mal: ['garage'], r: 'aje', n: 2, g: 'gj' },
  { ok: 'extranjero', mal: ['extrangero'], r: 'jero', n: 2, g: 'gj' }, { ok: 'cerrajero', mal: ['cerragero'], r: 'jero', n: 2, g: 'gj' },
  { ok: 'relojería', mal: ['relogería'], r: 'jero', n: 2, g: 'gj' },
  { ok: 'dijeron', mal: ['digeron'], r: 'dije', n: 3, g: 'gj' }, { ok: 'trajeron', mal: ['trageron'], r: 'dije', n: 3, g: 'gj' },
  { ok: 'condujeron', mal: ['condugeron'], r: 'dije', n: 3, g: 'gj' },
  { ok: 'guerra', mal: ['gerra'], r: 'gue', n: 1, g: 'gj' }, { ok: 'guitarra', mal: ['gitarra'], r: 'gue', n: 1, g: 'gj' },
  { ok: 'pingüino', mal: ['pinguino'], r: 'dieresis', n: 3, g: 'gj' }, { ok: 'cigüeña', mal: ['cigueña'], r: 'dieresis', n: 3, g: 'gj' },
  { ok: 'vergüenza', mal: ['verguenza'], r: 'dieresis', n: 3, g: 'gj' },
  // H
  { ok: 'hielo', mal: ['ielo'], r: 'hue', n: 1, g: 'h' }, { ok: 'hueso', mal: ['ueso'], r: 'hue', n: 1, g: 'h' },
  { ok: 'huevo', mal: ['uevo'], r: 'hue', n: 1, g: 'h' }, { ok: 'huerto', mal: ['uerto'], r: 'hue', n: 1, g: 'h' },
  { ok: 'hiena', mal: ['iena'], r: 'hue', n: 2, g: 'h' },
  { ok: 'humo', mal: ['umo'], r: 'hum', n: 1, g: 'h' }, { ok: 'humano', mal: ['umano'], r: 'hum', n: 2, g: 'h' },
  { ok: 'humedad', mal: ['umedad'], r: 'hum', n: 2, g: 'h' },
  { ok: 'había', mal: ['abía'], r: 'haber', n: 1, g: 'h' }, { ok: 'hizo', mal: ['izo'], r: 'haber', n: 1, g: 'h' },
  { ok: 'hacemos', mal: ['acemos'], r: 'haber', n: 1, g: 'h' },
  { ok: 'hidrógeno', mal: ['idrógeno'], r: 'hidro', n: 2, g: 'h' }, { ok: 'hipopótamo', mal: ['ipopótamo'], r: 'hidro', n: 2, g: 'h' },
  { ok: 'hexágono', mal: ['exágono'], r: 'hidro', n: 2, g: 'h' }, { ok: 'hipermercado', mal: ['ipermercado'], r: 'hidro', n: 2, g: 'h' },
  { ok: 'ahora', mal: ['aora'], r: 'hInter', n: 2, g: 'h' }, { ok: 'almohada', mal: ['almoada'], r: 'hInter', n: 3, g: 'h' },
  { ok: 'zanahoria', mal: ['zanaoria'], r: 'hInter', n: 3, g: 'h' }, { ok: 'búho', mal: ['búo'], r: 'hInter', n: 3, g: 'h' },
  // LL/Y
  { ok: 'pasillo', mal: ['pasiyo'], r: 'illo', n: 1, g: 'lly' }, { ok: 'ardilla', mal: ['ardiya'], r: 'illo', n: 1, g: 'lly' },
  { ok: 'bolsillo', mal: ['bolsiyo'], r: 'illo', n: 1, g: 'lly' }, { ok: 'mantequilla', mal: ['mantequiya'], r: 'illo', n: 2, g: 'lly' },
  { ok: 'rey', mal: ['rei'], r: 'yFinal', n: 1, g: 'lly' }, { ok: 'hoy', mal: ['hoi'], r: 'yFinal', n: 1, g: 'lly' },
  { ok: 'muy', mal: ['mui'], r: 'yFinal', n: 1, g: 'lly' }, { ok: 'estoy', mal: ['estoi'], r: 'yFinal', n: 2, g: 'lly' },
  { ok: 'leyendo', mal: ['lellendo', 'leiendo'], r: 'yVerbo', n: 3, g: 'lly' }, { ok: 'oyeron', mal: ['olleron'], r: 'yVerbo', n: 3, g: 'lly' },
  { ok: 'cayeron', mal: ['calleron'], r: 'yVerbo', n: 3, g: 'lly' },
  { ok: 'lluvia', mal: ['yuvia'], r: 'llPalabra', n: 1, g: 'lly' }, { ok: 'llave', mal: ['yave'], r: 'llPalabra', n: 1, g: 'lly' },
  { ok: 'caballo', mal: ['cabayo'], r: 'llPalabra', n: 1, g: 'lly' }, { ok: 'gallina', mal: ['gayina'], r: 'llPalabra', n: 2, g: 'lly' },
  // C/Z
  { ok: 'peces', mal: ['pezes'], r: 'zPlural', n: 1, g: 'cz' }, { ok: 'lápices', mal: ['lápizes'], r: 'zPlural', n: 1, g: 'cz' },
  { ok: 'luces', mal: ['luzes'], r: 'zPlural', n: 1, g: 'cz' }, { ok: 'voces', mal: ['vozes'], r: 'zPlural', n: 2, g: 'cz' },
  { ok: 'veces', mal: ['vezes'], r: 'zPlural', n: 2, g: 'cz' }, { ok: 'felices', mal: ['felizes'], r: 'zPlural', n: 2, g: 'cz' },
  { ok: 'cielo', mal: ['zielo'], r: 'ceci', n: 1, g: 'cz' }, { ok: 'cereza', mal: ['zereza'], r: 'ceci', n: 2, g: 'cz' },
  { ok: 'cine', mal: ['zine'], r: 'ceci', n: 1, g: 'cz' }, { ok: 'cocina', mal: ['cozina'], r: 'ceci', n: 1, g: 'cz' },
  { ok: 'cebolla', mal: ['zebolla'], r: 'ceci', n: 2, g: 'cz' }, { ok: 'nueces', mal: ['nuezes'], r: 'zPlural', n: 2, g: 'cz' },
]

export const GRUPOS = { bv: 'B / V', gj: 'G / J', h: 'H', lly: 'LL / Y', cz: 'C / Z' }

export const NIVELES = {
  facil: { max: 1 },
  medio: { max: 2 },
  dificil: { max: 3, minimo: 2 },
}

const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

// El hueco: lo que difiere entre la buena y la primera mala (prefijo y sufijo comunes fuera).
export function hueco(ok, mal) {
  let p = 0
  while (p < ok.length && p < mal.length && ok[p] === mal[p]) p++
  let s = 0
  while (s < ok.length - p && s < mal.length - p && ok[ok.length - 1 - s] === mal[mal.length - 1 - s]) s++
  return { antes: ok.slice(0, p), despues: ok.slice(ok.length - s), letra: ok.slice(p, ok.length - s) }
}

let seq = 0
let ultima = null

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const pool = PALABRAS.filter(p => p.n <= cfg.max && p.n >= (cfg.minimo ?? 1))
  for (;;) {
    const p = pool[Math.floor(rand() * pool.length)]
    if (p.ok === ultima && pool.length > 1) continue
    ultima = p.ok
    return { id: ++seq, nivel, tipo: 'letra', palabra: p.ok, bueno: p.ok, opciones: baraja(rand, [p.ok, ...p.mal]) }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

const datos = r => PALABRAS.find(p => p.ok === r.palabra)
export const textoOpcion = o => o
export const grupoDe = r => GRUPOS[datos(r).g]
export const huecoDe = r => hueco(r.palabra, datos(r).mal[0])

export function enunciado(r, l) {
  return tx(T('¿Cómo se escribe?', 'How is it spelt?', 'Com s’escriu?'), l)
}

export function explicacion(r, l) {
  const d = datos(r)
  return `${r.palabra}: ${tx(REGLAS[d.r], l)}`
}

export function schemaQuestion(r, l) {
  const h = huecoDe(r)
  return {
    question: `${enunciado(r, l)} ${h.antes}_${h.despues} (${grupoDe(r)})`,
    correctAnswer: r.bueno,
    wrongAnswers: r.opciones.filter(o => o !== r.bueno),
  }
}
