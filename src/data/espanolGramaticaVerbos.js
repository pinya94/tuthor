function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

const TODAS = [
  q('vb-01', 'primaria',
    { es: '¿Cuál de estas palabras es un verbo?', en: 'Which of these words is a verb?', ca: 'Quina d\'aquestes paraules és un verb?' },
    { es: ['rápido', 'correr', 'mesa', 'azul'], en: ['fast', 'to run', 'table', 'blue'], ca: ['ràpid', 'córrer', 'taula', 'blau'] },
    1, '🏃',
    { es: 'Los verbos expresan acciones, estados o procesos. "Correr" es una acción → verbo. Los verbos en infinitivo terminan en -ar, -er o -ir.', en: '"Correr" (to run) is an action → verb. Infinitives end in -ar, -er or -ir.', ca: '"Córrer" és una acció → verb. Els infinitius acaben en -ar, -er/-re o -ir.' }),

  q('vb-02', 'primaria',
    { es: 'Conjuga "hablar" en 3ª persona del singular del presente de indicativo.', en: 'Conjugate "hablar" in the 3rd person singular present indicative.', ca: 'Conjuga "hablar" en 3a persona del singular del present d\'indicatiu.' },
    { es: ['hablo', 'hablas', 'habla', 'hablan'], en: ['hablo', 'hablas', 'habla', 'hablan'], ca: ['parlo', 'parles', 'parla', 'parlen'] },
    2, '🗣️',
    { es: 'Presente de indicativo de -AR: yo hablo, tú hablas, él/ella habla, nosotros hablamos, vosotros habláis, ellos hablan.', en: 'Present indicative -AR: yo hablo, tú hablas, él habla, nosotros hablamos, vosotros habláis, ellos hablan.', ca: 'Present indicatiu parlar: jo parlo, tu parles, ell parla, nosaltres parlem, vosaltres parleu, ells parlen.' }),

  q('vb-03', 'primaria',
    { es: '¿Cuál es el pretérito indefinido de "ir" en 1ª persona del singular?', en: 'What is the preterite of "ir" for 1st person singular?', ca: 'Quin és el pretèrit indefinit de "ir" en 1a persona del singular?' },
    { es: ['iba', 'fui', 'voy', 'iré'], en: ['iba', 'fui', 'voy', 'iré'], ca: ['anava', 'vaig anar', 'vaig', 'aniré'] },
    1, '🚶',
    { es: '"Ir" y "ser" comparten el mismo pretérito indefinido: fui, fuiste, fue, fuimos, fuisteis, fueron. El contexto indica de cuál se trata.', en: '"Ir" and "ser" share the same preterite: fui, fuiste, fue, fuimos, fuisteis, fueron.', ca: '"Anar" en pretèrit perfet simple: vaig anar, vas anar, va anar...' }),

  q('vb-04', 'primaria',
    { es: '¿Cuál es la diferencia entre "ser" y "estar"?', en: 'What is the difference between "ser" and "estar"?', ca: 'Quina és la diferència entre "ser" i "estar"?' },
    { es: ['Son sinónimos', '"Ser" para rasgos permanentes; "estar" para estados temporales', '"Ser" para estados; "estar" para profesiones', 'No existe diferencia gramatical'], en: ['They are synonyms', '"Ser" for permanent traits; "estar" for temporary states', '"Ser" for states; "estar" for professions', 'No grammatical difference'], ca: ['Són sinònims', '"Ser" per a trets permanents; "estar" per a estats temporals', '"Ser" per a estats; "estar" per a professions', 'No hi ha diferència'] },
    1, '⚖️',
    { es: '"Ser" = identidad/rasgos permanentes (soy médico, es inteligente). "Estar" = estados temporales/ubicación (estoy cansado, está en Madrid).', en: '"Ser" = identity/permanent traits. "Estar" = temporary states/location.', ca: '"Ser" = identitat/trets permanents. "Estar" = estats temporals/ubicació.' }),

  q('vb-05', 'primaria',
    { es: '"Él ___ (hacer) los deberes ahora." ¿Qué forma es correcta?', en: '"He ___ (hacer) his homework now." Which form is correct?', ca: '"Ell ___ (fer) els deures ara." Quina forma és correcta?' },
    { es: ['hace', 'hacía', 'ha hecho', 'hará'], en: ['hace', 'hacía', 'ha hecho', 'hará'], ca: ['fa', 'feia', 'ha fet', 'farà'] },
    0, '📚',
    { es: '"Ahora" indica presente de indicativo. "Hace" es la forma correcta de "hacer" en 3ª pers. sing. del presente. Es un verbo irregular (yo hago, tú haces...).', en: '"Now" indicates present tense. "Hace" is the 3rd person singular present of "hacer" (irregular: yo hago).', ca: '"Ara" indica present. "Fa" és la 3a persona del singular del present de "fer".' }),

  q('vb-06', 'eso',
    { es: '¿Cuál es la diferencia entre pretérito indefinido e imperfecto?', en: 'What is the difference between "pretérito indefinido" and "imperfecto"?', ca: 'Quina és la diferència entre pretèrit indefinit i imperfet?' },
    { es: ['Son el mismo tiempo verbal', 'Indefinido = acción puntual terminada; imperfecto = acción habitual o en progreso', 'Imperfecto = acción puntual; indefinido = descripción', 'El indefinido solo se usa en literatura'], en: ['They are the same tense', 'Indefinido = completed single action; imperfecto = habit or ongoing action', 'Imperfecto = single action; indefinido = description', 'Indefinido is only used in literature'], ca: ['Són el mateix temps', 'Indefinit = acció puntual; imperfet = hàbit o acció en curs', 'Imperfet = acció puntual; indefinit = descripció', 'L\'indefinit només s\'usa en literatura'] },
    1, '⏳',
    { es: 'Indefinido: acción puntual y terminada ("Ayer comí pizza"). Imperfecto: hábito pasado o descripción ("De niño comía pizza todos los viernes").', en: 'Indefinido: single completed past action. Imperfecto: past habit or ongoing state.', ca: 'Indefinit: acció puntual acabada. Imperfet: hàbit passat o descripció.' }),

  q('vb-07', 'eso',
    { es: 'Conjuga "tener" en 1ª persona del singular del presente de indicativo.', en: 'Conjugate "tener" in the 1st person singular present indicative.', ca: 'Conjuga "tener" en 1a persona del singular del present.' },
    { es: ['teno', 'tengo', 'tiene', 'tenemos'], en: ['teno', 'tengo', 'tiene', 'tenemos'], ca: ['tinc', 'tengo', 'té', 'tenim'] },
    1, '✋',
    { es: '"Tener" es irregular en 1ª persona del singular: yo tengo. Igual que otros verbos con -go: poner→pongo, valer→valgo, salir→salgo, hacer→hago.', en: '"Tener" is irregular in 1st sg: yo tengo. Other -go verbs: poner→pongo, hacer→hago, salir→salgo.', ca: '"Tenir" → jo tinc (irregular). Altres: posar→poso, valer→valc, sortir→surto.' }),

  q('vb-08', 'eso',
    { es: '¿Cuándo se usa el futuro simple?', en: 'When is the simple future used?', ca: 'Quan s\'usa el futur simple?' },
    { es: ['Para hablar del pasado', 'Para expresar acciones futuras o hipótesis sobre el presente', 'Para describir hábitos presentes', 'Para expresar mandatos'], en: ['To talk about the past', 'To express future actions or hypotheses about the present', 'To describe present habits', 'To express commands'], ca: ['Per parlar del passat', 'Per expressar accions futures o hipòtesis sobre el present', 'Per descriure hàbits presents', 'Per expressar ordres'] },
    1, '🔮',
    { es: 'Futuro simple: acciones futuras ("Mañana estudiaré") o hipótesis sobre el presente ("Serán las 3, más o menos").', en: 'Simple future: future actions or present hypotheses. "Mañana estudiaré" / "Serán las 3"', ca: 'Futur simple: accions futures o hipòtesis sobre el present.' }),

  q('vb-09', 'eso',
    { es: '¿Cuál es el condicional simple de "poder" en 1ª persona?', en: 'What is the conditional of "poder" for 1st person singular?', ca: 'Quin és el condicional simple de "poder" en 1a persona?' },
    { es: ['podré', 'puedo', 'pudiera', 'podría'], en: ['podré', 'puedo', 'pudiera', 'podría'], ca: ['podré', 'puc', 'pogués', 'podria'] },
    3, '💭',
    { es: '"Podría" es el condicional simple de "poder". El condicional expresa posibilidad o hipótesis: "Podría ir, pero no sé si tengo tiempo."', en: '"Podría" is the conditional of "poder". Conditional expresses possibility or hypothesis.', ca: '"Podria" és el condicional de "poder". Expressa possibilitat o hipòtesi.' }),

  q('vb-10', 'eso',
    { es: '"Si tuviera dinero, ___ (comprar) esa casa." ¿Qué tiempo usamos?', en: '"If I had money, I ___ (buy) that house." What tense?', ca: '"Si tingués diners, ___ (comprar) aquella casa." Quin temps?' },
    { es: ['compraré', 'compraría', 'compre', 'comprara'], en: ['compraré', 'compraría', 'compre', 'comprara'], ca: ['compraré', 'compraria', 'compri', 'comprés'] },
    1, '🏡',
    { es: 'Oraciones condicionales de 2º tipo (improbable): si + imperfecto de subjuntivo → condicional simple. "Si tuviera dinero, compraría esa casa."', en: 'Type 2 conditional (unlikely): si + imperfect subjunctive → conditional. "Si tuviera…compraría."', ca: 'Condicional de 2n tipus: si + imperfet de subjuntiu → condicional simple.' }),

  q('vb-11', 'eso',
    { es: '¿Cuál es el participio de "escribir"?', en: 'What is the past participle of "escribir"?', ca: 'Quin és el participi de "escribir"?' },
    { es: ['escribido', 'escrito', 'escribto', 'escribiendo'], en: ['escribido', 'escrito', 'escribto', 'escribiendo'], ca: ['escrigut', 'escrit', 'escribto', 'escrivint'] },
    1, '✍️',
    { es: '"Escribir" tiene participio irregular: escrito. Otros irregulares: ver→visto, volver→vuelto, hacer→hecho, decir→dicho, poner→puesto, morir→muerto.', en: '"Escribir" has an irregular participle: escrito. Others: ver→visto, hacer→hecho, decir→dicho.', ca: '"Escriure" → participi "escrit". Altres irregulars: veure→vist, fer→fet, dir→dit.' }),

  q('vb-12', 'eso',
    { es: '¿Qué es un verbo pronominal?', en: 'What is a pronominal verb?', ca: 'Què és un verb pronominal?' },
    { es: ['Un verbo que solo se conjuga en 3ª persona', 'Un verbo que se conjuga siempre con un pronombre reflexivo', 'Un verbo sin sujeto', 'Un verbo solo usado en plural'], en: ['A verb only conjugated in 3rd person', 'A verb always conjugated with a reflexive pronoun', 'A verb without a subject', 'A verb only used in plural'], ca: ['Un verb que només es conjuga en 3a persona', 'Un verb que es conjuga sempre amb un pronom reflexiu', 'Un verb sense subjecte', 'Un verb només usat en plural'] },
    1, '🔄',
    { es: 'Los verbos pronominales se conjugan con pronombres reflexivos: yo me lavo, tú te lavas, él se lava... Ej.: lavarse, peinarse, vestirse, levantarse.', en: 'Pronominal verbs conjugate with reflexive pronouns: me, te, se, nos, os, se. E.g.: lavarse, levantarse.', ca: 'Els verbs pronominals es conjuguen amb pronoms reflexius: jo em rento, tu et rentes, ell es renta...' }),

  q('vb-13', 'eso',
    { es: '¿Cuál es el imperativo de "venir" en 2ª persona del singular (tú)?', en: 'What is the imperative of "venir" for 2nd person singular (tú)?', ca: 'Quin és l\'imperatiu de "venir" en 2a persona del singular (tú)?' },
    { es: ['venes', 'viene', 'ven', 'venid'], en: ['venes', 'viene', 'ven', 'venid'], ca: ['véns', 'véns', 'vine', 'veniu'] },
    2, '👋',
    { es: '"Ven" es el imperativo irregular de "venir" en tú. Imperativos irregulares: ven, di, haz, sé, ten, pon, sal, ve (de ir).', en: '"Ven" is the irregular imperative of "venir" for tú. Irregular imperatives: ven, di, haz, sé, ten, pon, sal, ve.', ca: '"Vine" és l\'imperatiu de "venir" en tu. Imperatius irregulars en català: vine, digues, fes, sigues, tingues, posa, surt, ves.' }),

  q('vb-14', 'eso',
    { es: '¿Qué expresa el pretérito perfecto compuesto (he comido)?', en: 'What does the pretérito perfecto compuesto express (he comido)?', ca: 'Què expressa el pretèrit perfet compost (he menjat)?' },
    { es: ['Una acción habitual del pasado', 'Una acción pasada con relevancia en el presente', 'Una acción futura', 'Una descripción del pasado'], en: ['A past habitual action', 'A past action with relevance to the present', 'A future action', 'A description of the past'], ca: ['Una acció habitual del passat', 'Una acció passada amb rellevància en el present', 'Una acció futura', 'Una descripció del passat'] },
    1, '🔗',
    { es: 'El pretérito perfecto compuesto (haber + participio) expresa acciones pasadas que tienen relación con el presente: "He perdido las llaves" (y ahora no las encuentro).', en: 'Pretérito perfecto compuesto = past action linked to the present: "He perdido las llaves" (I have lost the keys — still relevant now).', ca: 'Pretèrit perfet compost = acció passada amb rellevància present: "He perdut les claus".' }),

  q('vb-15', 'eso',
    { es: '¿En qué modo verbal están los verbos en oraciones como "Espero que llegues pronto"?', en: 'In which verbal mood are verbs in sentences like "Espero que llegues pronto"?', ca: 'En quin mode verbal estan els verbs en oracions com "Espero que arribis aviat"?' },
    { es: ['Indicativo', 'Imperativo', 'Subjuntivo', 'Infinitivo'], en: ['Indicative', 'Imperative', 'Subjunctive', 'Infinitive'], ca: ['Indicatiu', 'Imperatiu', 'Subjuntiu', 'Infinitiu'] },
    2, '🤞',
    { es: 'El subjuntivo expresa deseo, duda, emoción o posibilidad. Se usa tras verbos de deseo (esperar, querer), emoción (alegrarse, temer) y duda con "que".', en: 'Subjunctive expresses wish, doubt, emotion or possibility. After: esperar, querer, alegrarse, temer + que.', ca: 'El subjuntiu expressa desig, dubte, emoció o possibilitat. S\'usa darrere de: esperar, voler, alegrar-se + que.' }),
]

export const PREGUNTAS_PRIMARIA = TODAS.filter(q => q.nivel === 'primaria')
export const PREGUNTAS_ESO = TODAS
