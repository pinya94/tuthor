// Páginas de estudio de gramática inglesa: /estudiar/idiomas/ingles/grammar/<slug>.
// Hasta nov-2026 solo había un índice con exámenes, y el autocompletado de
// Google enseña mucha demanda («present simple exercises», «comparativos y
// superlativos inglés ejercicios», «verbos irregulares inglés pdf», «modal
// verbs wordwall»…) donde Tuthor no aparecía.
//
// Se fusiona en CONTENIDO_TEMA con la clave = slug. El material (frases y
// formas) va en inglés en los tres idiomas; la prosa se traduce. En inglés,
// ortografía británica.
import { VERBOS, patron, PATRONES } from '../lib/verbosIrregulares.js'

const T = (es, en, ca) => ({ es, en, ca })
const L = T

const presentSimple = {
  metaTitle: L('Present simple y present continuous en inglés: reglas, diferencias y ejemplos — resumen y ejercicios', 'Present simple and present continuous: rules, differences and examples — summary and practice questions', 'Present simple i present continuous en anglès: regles, diferències i exemples — resum i exercicis'),
  metaDesc: L('Cómo se forma el present simple (afirmativa, negativa, pregunta), la -s de la 3.ª persona, los adverbios de frecuencia y cuándo usar el present continuous. Con ejercicios.', 'How to form the present simple (positive, negative, question), third-person -s, adverbs of frequency and when to use the present continuous. With practice questions.', 'Com es forma el present simple (afirmativa, negativa, pregunta), la -s de la 3a persona, els adverbis de freqüència i quan fer servir el present continuous. Amb exercicis.'),
  resumen: L(
    ['El present simple sirve para hábitos y rutinas (I get up at seven), verdades generales (Water boils at 100 °C) y horarios (The train leaves at nine). Se forma con el verbo tal cual, salvo en la 3.ª persona del singular (he, she, it), que añade -s: she works.', 'Para negar y preguntar se usa el auxiliar do (does en la 3.ª persona), y entonces el verbo vuelve a su forma base: she doesn’t work, does she work? El present continuous (am/is/are + -ing) se usa, en cambio, para lo que está pasando ahora: She is working now.'],
    ['The present simple is for habits and routines (I get up at seven), general truths (Water boils at 100 °C) and timetables (The train leaves at nine). It uses the base form of the verb, except in the third person singular (he, she, it), which adds -s: she works.', 'Negatives and questions use the auxiliary do (does in the third person), and the verb goes back to its base form: she doesn’t work, does she work? The present continuous (am/is/are + -ing), on the other hand, is for what is happening now: She is working now.'],
    ['El present simple serveix per a hàbits i rutines (I get up at seven), veritats generals (Water boils at 100 °C) i horaris (The train leaves at nine). Es forma amb el verb tal qual, llevat de la 3a persona del singular (he, she, it), que afegeix -s: she works.', 'Per negar i preguntar es fa servir l’auxiliar do (does a la 3a persona), i aleshores el verb torna a la forma base: she doesn’t work, does she work? El present continuous (am/is/are + -ing) s’usa, en canvi, per al que està passant ara: She is working now.'],
  ),
  puntosClave: L(
    ['Uso: hábitos, verdades generales y horarios.', 'He, she, it: verbo + -s (works, goes, studies).', 'Negativa: don’t / doesn’t + verbo base (she doesn’t like).', 'Pregunta: Do / Does + sujeto + verbo base (Does he play?).', 'Adverbios de frecuencia antes del verbo, pero después de be (I always walk / I am always late).', 'Present continuous (am/is/are + -ing) para lo que pasa ahora.'],
    ['Use: habits, general truths and timetables.', 'He, she, it: verb + -s (works, goes, studies).', 'Negative: don’t / doesn’t + base verb (she doesn’t like).', 'Question: Do / Does + subject + base verb (Does he play?).', 'Adverbs of frequency go before the verb but after be (I always walk / I am always late).', 'Present continuous (am/is/are + -ing) for what is happening now.'],
    ['Ús: hàbits, veritats generals i horaris.', 'He, she, it: verb + -s (works, goes, studies).', 'Negativa: don’t / doesn’t + verb base (she doesn’t like).', 'Pregunta: Do / Does + subjecte + verb base (Does he play?).', 'Adverbis de freqüència davant del verb, però darrere de be (I always walk / I am always late).', 'Present continuous (am/is/are + -ing) per al que passa ara.'],
  ),
  secciones: [
    {
      titulo: L('Cómo se forma el present simple', 'How the present simple is formed', 'Com es forma el present simple'),
      tabla: {
        columnas: L(['Sujeto', 'Afirmativa', 'Negativa', 'Pregunta'], ['Subject', 'Positive', 'Negative', 'Question'], ['Subjecte', 'Afirmativa', 'Negativa', 'Pregunta']),
        filas: [
          ['I / you / we / they', 'I work', 'I don’t work', 'Do you work?'],
          ['he / she / it', 'she works', 'she doesn’t work', 'Does she work?'],
        ],
      },
      lista: L(
        ['Ortografía de la -s: -es tras s, sh, ch, x, o (watches, goes, fixes); consonante + y → -ies (study → studies), pero vocal + y → -s (play → plays); have → has.', 'En negativa y pregunta la -s se va al auxiliar: «she doesn’t likes» es incorrecto; lo correcto es «she doesn’t like».'],
        ['Spelling of the -s: -es after s, sh, ch, x, o (watches, goes, fixes); consonant + y → -ies (study → studies), but vowel + y → -s (play → plays); have → has.', 'In negatives and questions the -s moves to the auxiliary: «she doesn’t likes» is wrong; the correct form is «she doesn’t like».'],
        ['Ortografia de la -s: -es després de s, sh, ch, x, o (watches, goes, fixes); consonant + y → -ies (study → studies), però vocal + y → -s (play → plays); have → has.', 'En negativa i pregunta la -s passa a l’auxiliar: «she doesn’t likes» és incorrecte; el correcte és «she doesn’t like».'],
      ),
    },
    {
      titulo: L('Present simple o present continuous', 'Present simple or present continuous', 'Present simple o present continuous'),
      tabla: {
        columnas: L(['', 'Present simple', 'Present continuous'], ['', 'Present simple', 'Present continuous'], ['', 'Present simple', 'Present continuous']),
        filas: [
          [L('Forma', 'Form', 'Forma'), 'I play / she plays', 'I am playing / she is playing'],
          [L('Uso', 'Use', 'Ús'), L('hábitos y verdades', 'habits and facts', 'hàbits i veritats'), L('lo que pasa ahora o estos días', 'what is happening now or around now', 'el que passa ara o aquests dies')],
          [L('Palabras pista', 'Signal words', 'Paraules pista'), 'always, usually, often, every day, on Mondays', 'now, right now, at the moment, today, Look!'],
          [L('Ejemplo', 'Example', 'Exemple'), 'She plays tennis every Sunday.', 'She is playing tennis now.'],
        ],
      },
      lista: L(
        ['Los verbos de estado (know, like, love, want, need, believe) casi nunca van en continuous: «I know», no «I am knowing».'],
        ['State verbs (know, like, love, want, need, believe) are hardly ever used in the continuous: «I know», not «I am knowing».'],
        ['Els verbs d’estat (know, like, love, want, need, believe) gairebé mai no van en continuous: «I know», no «I am knowing».'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Cuándo se usa el present simple?', 'When is the present simple used?', 'Quan es fa servir el present simple?'),
      r: T('Para cosas que pasan habitualmente (I walk to school), que son siempre verdad (The sun rises in the east) o que siguen un horario (The film starts at eight).', 'For things that happen regularly (I walk to school), are always true (The sun rises in the east) or follow a timetable (The film starts at eight).', 'Per a coses que passen habitualment (I walk to school), que són sempre veritat (The sun rises in the east) o que segueixen un horari (The film starts at eight).') },
    { p: T('¿Dónde va el adverbio de frecuencia?', 'Where does the adverb of frequency go?', 'On va l’adverbi de freqüència?'),
      r: T('Delante del verbo principal (She often reads) pero detrás del verbo be (She is often late).', 'Before the main verb (She often reads) but after the verb be (She is often late).', 'Davant del verb principal (She often reads) però darrere del verb be (She is often late).') },
  ],
  ejercicios: [
    { e: 'She ___ (play) tennis every Sunday.', s: T('plays: es un hábito y el sujeto es she (3.ª persona).', 'plays: it is a habit and the subject is she (third person).', 'plays: és un hàbit i el subjecte és she (3a persona).') },
    { e: T('Pon en negativa: «He likes coffee».', 'Make it negative: «He likes coffee».', 'Posa-ho en negativa: «He likes coffee».'), s: 'He doesn’t like coffee. (not «doesn’t likes»)' },
    { e: T('Haz la pregunta: you / live / here.', 'Make the question: you / live / here.', 'Fes la pregunta: you / live / here.'), s: 'Do you live here?' },
    { e: T('Escribe la 3.ª persona: watch, study, go, play, have.', 'Write the third person: watch, study, go, play, have.', 'Escriu la 3a persona: watch, study, go, play, have.'), s: 'watches, studies, goes, plays, has' },
    { e: 'Listen! The baby ___ (cry).', s: T('is crying: «Listen!» indica que pasa ahora, así que va en present continuous.', 'is crying: «Listen!» shows it is happening now, so it takes the present continuous.', 'is crying: «Listen!» indica que passa ara, així que va en present continuous.') },
    { e: T('Coloca «always»: «I am late» y «I walk to school».', 'Place «always»: «I am late» and «I walk to school».', 'Col·loca «always»: «I am late» i «I walk to school».'), s: 'I am always late. / I always walk to school.' },
  ],
}

const pastSimple = {
  metaTitle: L('Past simple en inglés: verbos regulares e irregulares, negativa y pregunta — resumen y ejercicios', 'The past simple: regular and irregular verbs, negatives and questions — summary and practice questions', 'Past simple en anglès: verbs regulars i irregulars, negativa i pregunta — resum i exercicis'),
  metaDesc: L('Cómo se forma el past simple: -ed y su ortografía, verbos irregulares, did / didn’t, la pronunciación de -ed y la diferencia con el past continuous. Con ejercicios.', 'How to form the past simple: -ed and its spelling, irregular verbs, did / didn’t, how to pronounce -ed and how it differs from the past continuous. With practice questions.', 'Com es forma el past simple: -ed i la seva ortografia, verbs irregulars, did / didn’t, la pronunciació de -ed i la diferència amb el past continuous. Amb exercicis.'),
  resumen: L(
    ['El past simple cuenta acciones terminadas en un momento del pasado: I visited Rome last year. Los verbos regulares añaden -ed (work → worked) y los irregulares tienen una forma propia que hay que aprender (go → went, buy → bought).', 'En negativa y pregunta se usa did / didn’t con el verbo en su forma base, también en los irregulares: I didn’t go, did you see it? El past continuous (was/were + -ing) describe lo que estaba pasando: I was reading when the phone rang.'],
    ['The past simple tells about finished actions at a point in the past: I visited Rome last year. Regular verbs add -ed (work → worked) and irregular verbs have their own form, which has to be learnt (go → went, buy → bought).', 'Negatives and questions use did / didn’t with the base form of the verb, irregular ones included: I didn’t go, did you see it? The past continuous (was/were + -ing) describes what was going on: I was reading when the phone rang.'],
    ['El past simple explica accions acabades en un moment del passat: I visited Rome last year. Els verbs regulars afegeixen -ed (work → worked) i els irregulars tenen una forma pròpia que cal aprendre (go → went, buy → bought).', 'En negativa i pregunta es fa servir did / didn’t amb el verb en forma base, també en els irregulars: I didn’t go, did you see it? El past continuous (was/were + -ing) descriu el que estava passant: I was reading when the phone rang.'],
  ),
  puntosClave: L(
    ['Acciones terminadas en el pasado: yesterday, last week, in 2020, two days ago.', 'Regulares: -ed (worked, played); irregulares: forma propia (went, saw).', 'Negativa: didn’t + verbo base (I didn’t go).', 'Pregunta: Did + sujeto + verbo base (Did you go?).', 'Was / were para el verbo be (I was, they were).', 'Past continuous: was/were + -ing, la acción en curso.'],
    ['Finished actions in the past: yesterday, last week, in 2020, two days ago.', 'Regular: -ed (worked, played); irregular: own form (went, saw).', 'Negative: didn’t + base verb (I didn’t go).', 'Question: Did + subject + base verb (Did you go?).', 'Was / were for the verb be (I was, they were).', 'Past continuous: was/were + -ing, the action in progress.'],
    ['Accions acabades en el passat: yesterday, last week, in 2020, two days ago.', 'Regulars: -ed (worked, played); irregulars: forma pròpia (went, saw).', 'Negativa: didn’t + verb base (I didn’t go).', 'Pregunta: Did + subjecte + verb base (Did you go?).', 'Was / were per al verb be (I was, they were).', 'Past continuous: was/were + -ing, l’acció en curs.'],
  ),
  secciones: [
    {
      titulo: L('Forma y ortografía de -ed', 'Form and -ed spelling', 'Forma i ortografia de -ed'),
      tabla: {
        columnas: L(['Caso', 'Regla', 'Ejemplos'], ['Case', 'Rule', 'Examples'], ['Cas', 'Regla', 'Exemples']),
        filas: [
          [L('General', 'General', 'General'), '+ -ed', 'work → worked, play → played'],
          [L('Acaba en -e', 'Ends in -e', 'Acaba en -e'), '+ -d', 'like → liked, live → lived'],
          [L('Consonante + y', 'Consonant + y', 'Consonant + y'), 'y → -ied', 'study → studied, try → tried'],
          [L('Consonante-vocal-consonante tónica', 'Stressed consonant-vowel-consonant', 'Consonant-vocal-consonant tònica'), L('dobla la última', 'double the last letter', 'dobla l’última'), 'stop → stopped, plan → planned'],
          [L('Irregulares', 'Irregular', 'Irregulars'), L('forma propia', 'own form', 'forma pròpia'), 'go → went, see → saw, buy → bought'],
        ],
      },
      lista: L(
        ['La -ed se pronuncia de tres maneras: /t/ tras sonidos sordos (worked, watched), /d/ tras sonoros (played, lived) e /ɪd/ tras t o d (wanted, needed).', 'Negativa y pregunta: I didn’t work / Did you work? — con el verbo base, nunca «didn’t went».'],
        ['The -ed is pronounced three ways: /t/ after voiceless sounds (worked, watched), /d/ after voiced ones (played, lived) and /ɪd/ after t or d (wanted, needed).', 'Negative and question: I didn’t work / Did you work? — with the base verb, never «didn’t went».'],
        ['La -ed es pronuncia de tres maneres: /t/ després de sons sords (worked, watched), /d/ després de sonors (played, lived) i /ɪd/ després de t o d (wanted, needed).', 'Negativa i pregunta: I didn’t work / Did you work? — amb el verb base, mai «didn’t went».'],
      ),
    },
    {
      titulo: L('Past simple o past continuous', 'Past simple or past continuous', 'Past simple o past continuous'),
      tabla: {
        columnas: L(['', 'Past simple', 'Past continuous'], ['', 'Past simple', 'Past continuous'], ['', 'Past simple', 'Past continuous']),
        filas: [
          [L('Forma', 'Form', 'Forma'), 'I played', 'I was playing / they were playing'],
          [L('Uso', 'Use', 'Ús'), L('acción terminada', 'finished action', 'acció acabada'), L('acción en curso en un momento del pasado', 'action in progress at a point in the past', 'acció en curs en un moment del passat')],
          [L('Juntos', 'Together', 'Junts'), 'The phone rang…', '…while I was having a shower.'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Cómo sé si un verbo es irregular?', 'How do I know whether a verb is irregular?', 'Com sé si un verb és irregular?'),
      r: T('No hay regla: hay que aprenderlos. Ayuda agruparlos por cómo cambian (cut-cut-cut, buy-bought-bought, go-went-gone). En la página de verbos irregulares están los más frecuentes.', 'There is no rule: you have to learn them. Grouping them by how they change helps (cut-cut-cut, buy-bought-bought, go-went-gone). The irregular verbs page has the most common ones.', 'No hi ha regla: cal aprendre’ls. Ajuda agrupar-los per com canvien (cut-cut-cut, buy-bought-bought, go-went-gone). A la pàgina de verbs irregulars hi ha els més freqüents.') },
  ],
  ejercicios: [
    { e: 'We ___ (visit) our grandparents last Sunday.', s: 'visited' },
    { e: T('Escribe el pasado: stop, study, like, go, buy.', 'Write the past: stop, study, like, go, buy.', 'Escriu el passat: stop, study, like, go, buy.'), s: 'stopped, studied, liked, went, bought' },
    { e: T('Corrige: «I didn’t went to the party».', 'Correct: «I didn’t went to the party».', 'Corregeix: «I didn’t went to the party».'), s: T('I didn’t go to the party: tras didn’t, el verbo va en forma base.', 'I didn’t go to the party: after didn’t the verb is in its base form.', 'I didn’t go to the party: després de didn’t, el verb va en forma base.') },
    { e: T('Haz la pregunta: she / see / the film.', 'Make the question: she / see / the film.', 'Fes la pregunta: she / see / the film.'), s: 'Did she see the film?' },
    { e: 'I ___ (read) when the lights ___ (go) out.', s: T('was reading / went: la acción larga en past continuous y la que la interrumpe en past simple.', 'was reading / went: the longer action in the past continuous and the interruption in the past simple.', 'was reading / went: l’acció llarga en past continuous i la que la interromp en past simple.') },
    { e: T('¿Cómo suena -ed en wanted, played y watched?', 'How is -ed pronounced in wanted, played and watched?', 'Com sona -ed a wanted, played i watched?'), s: 'wanted /ɪd/, played /d/, watched /t/' },
  ],
}

const presentPerfect = {
  metaTitle: L('Present perfect en inglés: usos, for y since, already y yet, y diferencia con el past simple — ejercicios', 'The present perfect: uses, for and since, already and yet, and the difference from the past simple — practice', 'Present perfect en anglès: usos, for i since, already i yet, i diferència amb el past simple — exercicis'),
  metaDesc: L('Cómo se forma el present perfect (have/has + participio), cuándo se usa, for / since, ever, never, just, already, yet, been y gone, y cuándo va el past simple. Con ejercicios.', 'How to form the present perfect (have/has + past participle), when to use it, for and since, ever, never, just, already, yet, been and gone, and how it differs from the past.', 'Com es forma el present perfect (have/has + participi), quan s’usa, for / since, ever, never, just, already, yet, been i gone, i quan va el past simple. Amb exercicis.'),
  resumen: L(
    ['El present perfect se forma con have / has + participio (I have seen, she has finished) y une el pasado con el presente: experiencias de la vida sin decir cuándo (I have been to Paris), cosas que acaban de pasar (She has just left) y situaciones que empezaron antes y siguen (I have lived here for five years).', 'Si se dice cuándo pasó algo terminado (yesterday, in 2019, last week), no se usa el present perfect sino el past simple: I saw that film yesterday. Es la diferencia que más se pregunta en los exámenes.'],
    ['The present perfect is formed with have / has + past participle (I have seen, she has finished) and links the past to the present: life experiences without saying when (I have been to Paris), things that have just happened (She has just left) and situations that started before and continue (I have lived here for five years).', 'If you say when something finished happened (yesterday, in 2019, last week), you use the past simple instead: I saw that film yesterday. It is the difference exam questions ask about most.'],
    ['El present perfect es forma amb have / has + participi (I have seen, she has finished) i uneix el passat amb el present: experiències de la vida sense dir quan (I have been to Paris), coses que acaben de passar (She has just left) i situacions que van començar abans i continuen (I have lived here for five years).', 'Si es diu quan va passar una cosa acabada (yesterday, in 2019, last week), no es fa servir el present perfect sinó el past simple: I saw that film yesterday. És la diferència que més es pregunta als exàmens.'],
  ),
  puntosClave: L(
    ['Forma: have / has + participio (I have eaten, he has gone).', 'Experiencias: ever, never (Have you ever been…? I have never seen…).', 'Recientes: just (She has just arrived).', 'Already en afirmativa; yet en negativa y pregunta, al final.', 'For + periodo (for two years); since + punto de inicio (since 2020).', 'Con un tiempo terminado (yesterday, ago): past simple.'],
    ['Form: have / has + past participle (I have eaten, he has gone).', 'Experience: ever, never (Have you ever been…? I have never seen…).', 'Recent: just (She has just arrived).', 'Already in positive sentences; yet in negatives and questions, at the end.', 'For + period (for two years); since + starting point (since 2020).', 'With a finished time (yesterday, ago): past simple.'],
    ['Forma: have / has + participi (I have eaten, he has gone).', 'Experiències: ever, never (Have you ever been…? I have never seen…).', 'Recents: just (She has just arrived).', 'Already en afirmativa; yet en negativa i pregunta, al final.', 'For + període (for two years); since + punt d’inici (since 2020).', 'Amb un temps acabat (yesterday, ago): past simple.'],
  ),
  secciones: [
    {
      titulo: L('For o since', 'For or since', 'For o since'),
      tabla: {
        columnas: L(['', 'Con qué va', 'Ejemplos'], ['', 'What follows', 'Examples'], ['', 'Amb què va', 'Exemples']),
        filas: [
          ['for', L('un periodo de tiempo', 'a period of time', 'un període de temps'), 'for three years, for a week, for ages'],
          ['since', L('el momento en que empezó', 'the moment it started', 'el moment en què va començar'), 'since 2020, since Monday, since I was a child'],
        ],
      },
    },
    {
      titulo: L('Present perfect o past simple', 'Present perfect or past simple', 'Present perfect o past simple'),
      tabla: {
        columnas: L(['Present perfect', 'Past simple'], ['Present perfect', 'Past simple'], ['Present perfect', 'Past simple']),
        filas: [
          ['I have visited Rome. (some time in my life)', 'I visited Rome in 2019. (a finished time)'],
          ['She has lost her keys. (she still hasn’t got them)', 'She lost her keys yesterday.'],
          ['Have you finished your homework yet?', 'Did you finish it last night?'],
        ],
      },
      lista: L(
        ['Been y gone: «She has been to London» (fue y ya ha vuelto); «She has gone to London» (se ha ido y está allí).'],
        ['Been and gone: «She has been to London» (she went and has come back); «She has gone to London» (she has left and is there now).'],
        ['Been i gone: «She has been to London» (hi va anar i ja ha tornat); «She has gone to London» (se n’ha anat i és allà).'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Por qué «I have seen it yesterday» está mal?', 'Why is «I have seen it yesterday» wrong?', 'Per què «I have seen it yesterday» està malament?'),
      r: T('Porque yesterday es un tiempo terminado, y con un tiempo terminado va el past simple: I saw it yesterday.', 'Because yesterday is a finished time, and a finished time takes the past simple: I saw it yesterday.', 'Perquè yesterday és un temps acabat, i amb un temps acabat va el past simple: I saw it yesterday.') },
  ],
  ejercicios: [
    { e: 'I ___ (never / be) to London.', s: 'I have never been to London.' },
    { e: 'She ___ (live) here since 2020.', s: T('has lived: empezó en 2020 y sigue.', 'has lived: it started in 2020 and still continues.', 'has lived: va començar el 2020 i continua.') },
    { e: T('¿Saw o have seen? «I ___ that film yesterday».', 'Saw or have seen? «I ___ that film yesterday».', 'Saw o have seen? «I ___ that film yesterday».'), s: T('saw: yesterday pide past simple.', 'saw: yesterday needs the past simple.', 'saw: yesterday demana past simple.') },
    { e: T('¿For o since? ___ three years / ___ Monday / ___ I was ten.', 'For or since? ___ three years / ___ Monday / ___ I was ten.', 'For o since? ___ three years / ___ Monday / ___ I was ten.'), s: 'for three years / since Monday / since I was ten' },
    { e: T('¿Already o yet? «Have you finished ___?» y «I have ___ done it».', 'Already or yet? «Have you finished ___?» and «I have ___ done it».', 'Already o yet? «Have you finished ___?» i «I have ___ done it».'), s: 'Have you finished yet? / I have already done it.' },
  ],
}

const modals = {
  metaTitle: L('Los modal verbs en inglés: can, could, must, have to, should, may, might — resumen y ejercicios', 'Modal verbs: can, could, must, have to, should, may, might — summary and practice questions', 'Els modal verbs en anglès: can, could, must, have to, should, may, might — resum i exercicis'),
  metaDesc: L('Qué expresa cada verbo modal (capacidad, permiso, obligación, consejo, posibilidad), sus reglas (sin -s, sin to) y la diferencia entre mustn’t y don’t have to. Con ejercicios.', 'What each modal verb expresses (ability, permission, obligation, advice, possibility), their rules (no -s, no to) and mustn’t versus don’t have to. With practice.', 'Què expressa cada verb modal (capacitat, permís, obligació, consell, possibilitat), les seves regles (sense -s, sense to) i mustn’t davant de don’t have to. Amb exercicis.'),
  resumen: L(
    ['Los verbos modales (can, could, must, should, may, might, will, would) acompañan a otro verbo para añadir capacidad, permiso, obligación, consejo o posibilidad. Tienen reglas propias: no llevan -s en la 3.ª persona (she can), el verbo que los sigue va sin to (I must go) y niegan y preguntan solos, sin do (I can’t, can you?).', 'Have to no es modal (lleva -s y usa do: she has to, does she have to?), pero se estudia con ellos porque también expresa obligación. Y cuidado: mustn’t significa «está prohibido», mientras que don’t have to significa «no hace falta».'],
    ['Modal verbs (can, could, must, should, may, might, will, would) go with another verb to add ability, permission, obligation, advice or possibility. They have their own rules: no -s in the third person (she can), the verb after them has no to (I must go) and they make negatives and questions on their own, without do (I can’t, can you?).', 'Have to is not a modal (it takes -s and uses do: she has to, does she have to?), but it is studied with them because it also expresses obligation. And careful: mustn’t means «it is not allowed», while don’t have to means «it is not necessary».'],
    ['Els verbs modals (can, could, must, should, may, might, will, would) acompanyen un altre verb per afegir capacitat, permís, obligació, consell o possibilitat. Tenen regles pròpies: no porten -s a la 3a persona (she can), el verb que els segueix va sense to (I must go) i neguen i pregunten sols, sense do (I can’t, can you?).', 'Have to no és modal (porta -s i fa servir do: she has to, does she have to?), però s’estudia amb ells perquè també expressa obligació. I compte: mustn’t vol dir «està prohibit», mentre que don’t have to vol dir «no cal».'],
  ),
  puntosClave: L(
    ['Sin -s: she can swim (no «cans»).', 'Verbo sin to detrás: I must go (no «must to go»).', 'Negativa y pregunta sin do: I can’t, should we…?', 'Mustn’t = prohibido; don’t have to = no hace falta.', 'Consejo: should. Posibilidad: may, might, could.', 'Pasado de can: could; de must (obligación): had to.'],
    ['No -s: she can swim (not «cans»).', 'Verb after it without to: I must go (not «must to go»).', 'Negatives and questions without do: I can’t, should we…?', 'Mustn’t = not allowed; don’t have to = not necessary.', 'Advice: should. Possibility: may, might, could.', 'Past of can: could; of must (obligation): had to.'],
    ['Sense -s: she can swim (no «cans»).', 'Verb sense to darrere: I must go (no «must to go»).', 'Negativa i pregunta sense do: I can’t, should we…?', 'Mustn’t = prohibit; don’t have to = no cal.', 'Consell: should. Possibilitat: may, might, could.', 'Passat de can: could; de must (obligació): had to.'],
  ),
  secciones: [
    {
      titulo: L('Qué expresa cada modal', 'What each modal expresses', 'Què expressa cada modal'),
      tabla: {
        columnas: L(['Modal', 'Expresa', 'Ejemplo'], ['Modal', 'Expresses', 'Example'], ['Modal', 'Expressa', 'Exemple']),
        filas: [
          ['can / can’t', L('capacidad, permiso', 'ability, permission', 'capacitat, permís'), 'I can swim. Can I open the window?'],
          ['could', L('capacidad en pasado, petición educada, posibilidad', 'past ability, polite request, possibility', 'capacitat en passat, petició educada, possibilitat'), 'I could read at four. Could you help me?'],
          ['must', L('obligación (la impone quien habla), deducción', 'obligation (from the speaker), deduction', 'obligació (la imposa qui parla), deducció'), 'I must study. She must be tired.'],
          ['mustn’t', L('prohibición', 'prohibition', 'prohibició'), 'You mustn’t smoke here.'],
          ['have to', L('obligación externa (normas)', 'external obligation (rules)', 'obligació externa (normes)'), 'We have to wear a uniform.'],
          ['don’t have to', L('no es necesario', 'not necessary', 'no cal'), 'You don’t have to come.'],
          ['should', L('consejo', 'advice', 'consell'), 'You should see a doctor.'],
          ['may / might', L('posibilidad; may también permiso formal', 'possibility; may also formal permission', 'possibilitat; may també permís formal'), 'It might rain. May I come in?'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Qué diferencia hay entre «mustn’t» y «don’t have to»?', 'What is the difference between «mustn’t» and «don’t have to»?', 'Quina diferència hi ha entre «mustn’t» i «don’t have to»?'),
      r: T('You mustn’t go: no puedes ir, está prohibido. You don’t have to go: no estás obligado, puedes ir si quieres.', 'You mustn’t go: you are not allowed to go. You don’t have to go: you are not obliged, but you can if you want.', 'You mustn’t go: no hi pots anar, està prohibit. You don’t have to go: no hi estàs obligat, hi pots anar si vols.') },
  ],
  ejercicios: [
    { e: T('Corrige: «She can swims very well».', 'Correct: «She can swims very well».', 'Corregeix: «She can swims very well».'), s: 'She can swim very well. (no -s after a modal)' },
    { e: T('¿Mustn’t o don’t have to? «It’s Sunday: you ___ get up early» y «You ___ touch that cable!».', 'Mustn’t or don’t have to? «It’s Sunday: you ___ get up early» and «You ___ touch that cable!».', 'Mustn’t o don’t have to? «It’s Sunday: you ___ get up early» i «You ___ touch that cable!».'), s: 'don’t have to (not necessary) / mustn’t (forbidden)' },
    { e: T('Da un consejo a alguien que tiene fiebre.', 'Give advice to someone with a temperature.', 'Dona un consell a algú que té febre.'), s: 'You should see a doctor. / You should stay in bed.' },
    { e: T('Pasa al pasado: «I can ride a bike» y «I must work late».', 'Put into the past: «I can ride a bike» and «I must work late».', 'Passa-ho al passat: «I can ride a bike» i «I must work late».'), s: 'I could ride a bike. / I had to work late.' },
    { e: T('Corrige: «You must to wear a helmet».', 'Correct: «You must to wear a helmet».', 'Corregeix: «You must to wear a helmet».'), s: 'You must wear a helmet. (no to after a modal)' },
  ],
}

const conditionals = {
  metaTitle: L('Los condicionales en inglés: zero, first, second y third conditional — resumen y ejercicios', 'Conditionals: zero, first, second and third conditional, and wish — summary and practice questions', 'Els condicionals en anglès: zero, first, second i third conditional — resum i exercicis'),
  metaDesc: L('Los cuatro condicionales en inglés con su estructura (if + …), cuándo se usa cada uno, unless, «If I were you» y wish, con una tabla y ejercicios resueltos.', 'The four conditionals with their structure (if + …), when to use each one, unless, «If I were you» and wish, with a table and practice questions with answers.', 'Els quatre condicionals en anglès amb la seva estructura (if + …), quan s’usa cadascun, unless, «If I were you» i wish, amb una taula i exercicis resolts.'),
  resumen: L(
    ['Una oración condicional tiene dos partes: la condición, con if, y el resultado. En inglés hay cuatro tipos según lo probable que sea la condición: siempre se cumple (zero), es posible en el futuro (first), es imaginaria en el presente (second) o ya no puede cumplirse porque es pasado (third).', 'El truco está en los tiempos verbales de cada parte. Y la parte con if puede ir delante (con coma) o detrás (sin coma): If it rains, we’ll stay in / We’ll stay in if it rains.'],
    ['A conditional sentence has two parts: the condition, with if, and the result. English has four types depending on how likely the condition is: it is always true (zero), possible in the future (first), imaginary in the present (second) or impossible because it is in the past (third).', 'The trick lies in the tenses of each part. The if-clause can come first (with a comma) or second (without one): If it rains, we’ll stay in / We’ll stay in if it rains.'],
    ['Una oració condicional té dues parts: la condició, amb if, i el resultat. En anglès n’hi ha quatre tipus segons com de probable sigui la condició: sempre es compleix (zero), és possible en el futur (first), és imaginària en el present (second) o ja no es pot complir perquè és passat (third).', 'El truc és en els temps verbals de cada part. I la part amb if pot anar davant (amb coma) o darrere (sense coma): If it rains, we’ll stay in / We’ll stay in if it rains.'],
  ),
  puntosClave: L(
    ['Zero: if + presente, presente (If you heat ice, it melts).', 'First: if + presente, will + verbo (If it rains, I will stay).', 'Second: if + pasado, would + verbo (If I had money, I would travel).', 'Third: if + had + participio, would have + participio.', '«If I were you…»: were para todas las personas al dar un consejo.', 'Unless = if … not (Unless you hurry, you’ll miss the bus).'],
    ['Zero: if + present, present (If you heat ice, it melts).', 'First: if + present, will + verb (If it rains, I will stay).', 'Second: if + past, would + verb (If I had money, I would travel).', 'Third: if + had + past participle, would have + past participle.', '«If I were you…»: were for every person when giving advice.', 'Unless = if … not (Unless you hurry, you’ll miss the bus).'],
    ['Zero: if + present, present (If you heat ice, it melts).', 'First: if + present, will + verb (If it rains, I will stay).', 'Second: if + passat, would + verb (If I had money, I would travel).', 'Third: if + had + participi, would have + participi.', '«If I were you…»: were per a totes les persones en donar un consell.', 'Unless = if … not (Unless you hurry, you’ll miss the bus).'],
  ),
  secciones: [
    {
      titulo: L('Los cuatro condicionales', 'The four conditionals', 'Els quatre condicionals'),
      tabla: {
        columnas: L(['Tipo', 'Condición (if)', 'Resultado', 'Ejemplo'], ['Type', 'Condition (if)', 'Result', 'Example'], ['Tipus', 'Condició (if)', 'Resultat', 'Exemple']),
        filas: [
          ['Zero', 'present simple', 'present simple', 'If you heat ice, it melts.'],
          ['First', 'present simple', 'will + verb', 'If it rains, I will stay at home.'],
          ['Second', 'past simple', 'would + verb', 'If I won the lottery, I would buy a house.'],
          ['Third', 'past perfect', 'would have + participle', 'If she had studied, she would have passed.'],
        ],
      },
      lista: L(
        ['Wish: para desear que el presente fuera distinto, wish + pasado (I wish I had a dog); para lamentar el pasado, wish + past perfect (I wish I had studied more).'],
        ['Wish: to want the present to be different, wish + past (I wish I had a dog); to regret the past, wish + past perfect (I wish I had studied more).'],
        ['Wish: per desitjar que el present fos diferent, wish + passat (I wish I had a dog); per lamentar el passat, wish + past perfect (I wish I had studied more).'],
      ),
    },
  ],
  preguntas: [
    { p: T('¿Se puede poner will después de if?', 'Can will go after if?', 'Es pot posar will després d’if?'),
      r: T('En la condición normal, no: «If it will rain» es incorrecto; se dice «If it rains, we will…». El will va en la otra parte.', 'Not in a normal condition: «If it will rain» is wrong; you say «If it rains, we will…». Will goes in the other half.', 'En la condició normal, no: «If it will rain» és incorrecte; es diu «If it rains, we will…». El will va a l’altra part.') },
  ],
  ejercicios: [
    { e: 'If it ___ (rain) tomorrow, I ___ (stay) at home.', s: T('rains / will stay (first conditional: algo posible en el futuro).', 'rains / will stay (first conditional: something possible in the future).', 'rains / will stay (first conditional: una cosa possible en el futur).') },
    { e: 'If you heat ice, it ___ (melt).', s: T('melts (zero conditional: siempre se cumple).', 'melts (zero conditional: always true).', 'melts (zero conditional: sempre es compleix).') },
    { e: 'If I ___ (be) you, I ___ (tell) her the truth.', s: 'were / would tell (second conditional; «If I were you»)' },
    { e: 'If she ___ (study) harder, she ___ (pass) the exam.', s: T('had studied / would have passed (third: el pasado ya no se puede cambiar).', 'had studied / would have passed (third: the past can no longer be changed).', 'had studied / would have passed (third: el passat ja no es pot canviar).') },
    { e: 'I wish I ___ (have) more free time.', s: 'had' },
  ],
}

const passive = {
  metaTitle: L('La voz pasiva en inglés: cómo se forma en cada tiempo y cuándo se usa — resumen y ejercicios', 'The passive voice: how to form it in every tense and when to use it — summary and practice questions', 'La veu passiva en anglès: com es forma en cada temps i quan s’usa — resum i exercicis'),
  metaDesc: L('Cómo pasar de activa a pasiva en inglés (be + participio) en presente, pasado, present perfect y futuro, cuándo se pone by y cuándo se usa la pasiva. Con ejercicios.', 'How to change active into passive (be + past participle) in the present, past, present perfect and future, when to add by and when the passive is used. With practice questions.', 'Com passar d’activa a passiva en anglès (be + participi) en present, passat, present perfect i futur, quan es posa by i quan s’usa la passiva. Amb exercicis.'),
  resumen: L(
    ['La voz pasiva pone en primer plano lo que recibe la acción, no quién la hace: «Shakespeare wrote Hamlet» (activa) pasa a «Hamlet was written by Shakespeare» (pasiva). Se forma con el verbo be en el mismo tiempo que el verbo activo, más el participio.', 'Se usa cuando no sabemos quién hace la acción, no importa o es evidente: «My bike was stolen», «English is spoken here». Si se quiere decir quién la hace, se añade by.'],
    ['The passive voice puts the focus on what receives the action, not on who does it: «Shakespeare wrote Hamlet» (active) becomes «Hamlet was written by Shakespeare» (passive). It is formed with be in the same tense as the active verb, plus the past participle.', 'It is used when we do not know who does the action, it does not matter or it is obvious: «My bike was stolen», «English is spoken here». To say who does it, add by.'],
    ['La veu passiva posa en primer pla el que rep l’acció, no qui la fa: «Shakespeare wrote Hamlet» (activa) passa a «Hamlet was written by Shakespeare» (passiva). Es forma amb el verb be en el mateix temps que el verb actiu, més el participi.', 'S’usa quan no sabem qui fa l’acció, no importa o és evident: «My bike was stolen», «English is spoken here». Si es vol dir qui la fa, s’hi afegeix by.'],
  ),
  puntosClave: L(
    ['Pasiva = be (en el tiempo del verbo activo) + participio.', 'El complemento de la activa pasa a ser el sujeto.', 'Quien hace la acción, con by (si importa).', 'Present: is made. Past: was made. Present perfect: has been made.', 'Future: will be made. Continuous: is being made.', 'Se usa cuando importa más la acción que quien la hace.'],
    ['Passive = be (in the tense of the active verb) + past participle.', 'The object of the active sentence becomes the subject.', 'Who does the action goes with by (if it matters).', 'Present: is made. Past: was made. Present perfect: has been made.', 'Future: will be made. Continuous: is being made.', 'Used when the action matters more than who does it.'],
    ['Passiva = be (en el temps del verb actiu) + participi.', 'El complement de l’activa passa a ser el subjecte.', 'Qui fa l’acció, amb by (si importa).', 'Present: is made. Past: was made. Present perfect: has been made.', 'Future: will be made. Continuous: is being made.', 'S’usa quan importa més l’acció que qui la fa.'],
  ),
  secciones: [
    {
      titulo: L('La pasiva en cada tiempo', 'The passive in each tense', 'La passiva en cada temps'),
      tabla: {
        columnas: L(['Tiempo', 'Activa', 'Pasiva'], ['Tense', 'Active', 'Passive'], ['Temps', 'Activa', 'Passiva']),
        filas: [
          ['Present simple', 'They make cars here.', 'Cars are made here.'],
          ['Present continuous', 'They are painting the house.', 'The house is being painted.'],
          ['Past simple', 'They built the bridge in 1990.', 'The bridge was built in 1990.'],
          ['Present perfect', 'They have sold the house.', 'The house has been sold.'],
          ['Future (will)', 'They will open a new school.', 'A new school will be opened.'],
          ['Modal', 'You must wear a helmet.', 'A helmet must be worn.'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Siempre hay que poner «by»?', 'Do you always have to add «by»?', 'Sempre cal posar «by»?'),
      r: T('No. Solo si es importante decir quién hizo la acción. «My phone was stolen» no lo necesita; «Hamlet was written by Shakespeare», sí.', 'No. Only if it matters who did the action. «My phone was stolen» does not need it; «Hamlet was written by Shakespeare» does.', 'No. Només si és important dir qui ha fet l’acció. «My phone was stolen» no el necessita; «Hamlet was written by Shakespeare», sí.') },
  ],
  ejercicios: [
    { e: T('Pasa a pasiva: «They built the bridge in 1990».', 'Make it passive: «They built the bridge in 1990».', 'Passa-ho a passiva: «They built the bridge in 1990».'), s: 'The bridge was built in 1990.' },
    { e: T('Pasa a pasiva con by: «Shakespeare wrote Hamlet».', 'Make it passive with by: «Shakespeare wrote Hamlet».', 'Passa-ho a passiva amb by: «Shakespeare wrote Hamlet».'), s: 'Hamlet was written by Shakespeare.' },
    { e: T('¿Is spoken o speaks? «English ___ in many countries».', 'Is spoken or speaks? «English ___ in many countries».', 'Is spoken o speaks? «English ___ in many countries».'), s: T('is spoken: el inglés no habla, se habla.', 'is spoken: English does not speak; it is spoken.', 'is spoken: l’anglès no parla, es parla.') },
    { e: T('Pasa a pasiva: «They have sold the house».', 'Make it passive: «They have sold the house».', 'Passa-ho a passiva: «They have sold the house».'), s: 'The house has been sold.' },
    { e: T('Pasa a pasiva: «They are painting my room».', 'Make it passive: «They are painting my room».', 'Passa-ho a passiva: «They are painting my room».'), s: 'My room is being painted.' },
  ],
}

const adjectives = {
  metaTitle: L('Comparativos y superlativos en inglés: reglas, irregulares y as…as — resumen y ejercicios', 'Comparatives and superlatives: rules, irregular forms and as…as — summary and practice questions', 'Comparatius i superlatius en anglès: regles, irregulars i as…as — resum i exercicis'),
  metaDesc: L('Cómo se forman los comparativos y superlativos en inglés: -er/-est, more/the most, cambios de ortografía, good-better-best, than y as…as. Con tabla y ejercicios resueltos.', 'How to form comparatives and superlatives: -er/-est, more/the most, spelling changes, good-better-best, than and as…as. With a table and practice questions with answers.', 'Com es formen els comparatius i superlatius en anglès: -er/-est, more/the most, canvis d’ortografia, good-better-best, than i as…as. Amb taula i exercicis resolts.'),
  resumen: L(
    ['Para comparar dos cosas se usa el comparativo + than (Tom is taller than Ana) y para destacar una entre varias, el superlativo con the (Tom is the tallest in the class). Los adjetivos cortos añaden -er y -est; los largos usan more y the most.', 'Algunos cambian de ortografía (big → bigger, happy → happier) y unos pocos son irregulares (good → better → the best). Para decir que dos cosas son iguales se usa as … as: Ana is as tall as Tom.'],
    ['To compare two things you use the comparative + than (Tom is taller than Ana), and to single one out of several, the superlative with the (Tom is the tallest in the class). Short adjectives add -er and -est; long ones use more and the most.', 'Some change their spelling (big → bigger, happy → happier) and a few are irregular (good → better → the best). To say two things are equal you use as … as: Ana is as tall as Tom.'],
    ['Per comparar dues coses s’usa el comparatiu + than (Tom is taller than Ana) i per destacar-ne una entre diverses, el superlatiu amb the (Tom is the tallest in the class). Els adjectius curts afegeixen -er i -est; els llargs fan servir more i the most.', 'Alguns canvien d’ortografia (big → bigger, happy → happier) i uns quants són irregulars (good → better → the best). Per dir que dues coses són iguals s’usa as … as: Ana is as tall as Tom.'],
  ),
  puntosClave: L(
    ['Cortos (1 sílaba): -er, the -est (tall, taller, the tallest).', 'Largos (2+ sílabas): more, the most (more expensive).', 'Acabados en -y: -ier, -iest (happy, happier, the happiest).', 'Consonante-vocal-consonante: se dobla (big, bigger, the biggest).', 'Irregulares: good-better-best, bad-worse-worst.', 'Igualdad: as … as; comparativo + than.'],
    ['Short (1 syllable): -er, the -est (tall, taller, the tallest).', 'Long (2+ syllables): more, the most (more expensive).', 'Ending in -y: -ier, -iest (happy, happier, the happiest).', 'Consonant-vowel-consonant: double it (big, bigger, the biggest).', 'Irregular: good-better-best, bad-worse-worst.', 'Equality: as … as; comparative + than.'],
    ['Curts (1 síl·laba): -er, the -est (tall, taller, the tallest).', 'Llargs (2+ síl·labes): more, the most (more expensive).', 'Acabats en -y: -ier, -iest (happy, happier, the happiest).', 'Consonant-vocal-consonant: es dobla (big, bigger, the biggest).', 'Irregulars: good-better-best, bad-worse-worst.', 'Igualtat: as … as; comparatiu + than.'],
  ),
  secciones: [
    {
      titulo: L('Tabla de reglas', 'Rules table', 'Taula de regles'),
      tabla: {
        columnas: L(['Adjetivo', 'Regla', 'Comparativo', 'Superlativo'], ['Adjective', 'Rule', 'Comparative', 'Superlative'], ['Adjectiu', 'Regla', 'Comparatiu', 'Superlatiu']),
        filas: [
          ['tall', L('1 sílaba: -er / -est', '1 syllable: -er / -est', '1 síl·laba: -er / -est'), 'taller', 'the tallest'],
          ['large', L('acaba en -e: -r / -st', 'ends in -e: -r / -st', 'acaba en -e: -r / -st'), 'larger', 'the largest'],
          ['big', L('consonante-vocal-consonante: dobla', 'consonant-vowel-consonant: double', 'consonant-vocal-consonant: dobla'), 'bigger', 'the biggest'],
          ['happy', L('consonante + y: -ier / -iest', 'consonant + y: -ier / -iest', 'consonant + y: -ier / -iest'), 'happier', 'the happiest'],
          ['expensive', L('2 o más sílabas: more / the most', '2 or more syllables: more / the most', '2 o més síl·labes: more / the most'), 'more expensive', 'the most expensive'],
          ['good', L('irregular', 'irregular', 'irregular'), 'better', 'the best'],
          ['bad', L('irregular', 'irregular', 'irregular'), 'worse', 'the worst'],
          ['far', L('irregular (dos formas)', 'irregular (two forms)', 'irregular (dues formes)'), 'further / farther', 'the furthest / the farthest'],
        ],
      },
    },
  ],
  preguntas: [
    { p: T('¿Se puede decir «more taller»?', 'Can you say «more taller»?', 'Es pot dir «more taller»?'),
      r: T('No: es una cosa o la otra. Taller ya es comparativo; more solo va con adjetivos largos (more interesting).', 'No: it is one or the other. Taller is already a comparative; more only goes with long adjectives (more interesting).', 'No: és una cosa o l’altra. Taller ja és comparatiu; more només va amb adjectius llargs (more interesting).') },
  ],
  ejercicios: [
    { e: T('Escribe el comparativo: tall, big, happy, beautiful, good.', 'Write the comparative: tall, big, happy, beautiful, good.', 'Escriu el comparatiu: tall, big, happy, beautiful, good.'), s: 'taller, bigger, happier, more beautiful, better' },
    { e: T('Escribe el superlativo: hot, easy, interesting, bad.', 'Write the superlative: hot, easy, interesting, bad.', 'Escriu el superlatiu: hot, easy, interesting, bad.'), s: 'the hottest, the easiest, the most interesting, the worst' },
    { e: T('Corrige: «My brother is more taller than me».', 'Correct: «My brother is more taller than me».', 'Corregeix: «My brother is more taller than me».'), s: 'My brother is taller than me.' },
    { e: 'Ana is 1.60 m and Tom is 1.60 m. Ana is ___ Tom.', s: 'as tall as' },
    { e: 'This is ___ (good) pizza in the town.', s: 'the best' },
  ],
}

// Verbos irregulares: la tabla sale de la lista del juego (lib/verbosIrregulares),
// que solo trae verbos con una forma aceptada en inglés británico.
const POR_PATRON = Object.keys(PATRONES).map(p => ({
  p,
  verbos: VERBOS.filter(v => patron(v) === p).sort((a, b) => a.inf.localeCompare(b.inf)),
}))
const filaVerbo = v => [v.inf, v.past, v.pp, { es: v.sig.es, en: `to ${v.inf}`, ca: v.sig.ca }]

const irregularVerbs = {
  metaTitle: L('Lista de verbos irregulares en inglés con su significado (por grupos) — ejercicios', 'Irregular verbs list: infinitive, past simple and past participle, by pattern — practice', 'Llista de verbs irregulars en anglès amb el significat (per grups) — exercicis'),
  metaDesc: L(`Los ${VERBOS.length} verbos irregulares más usados en inglés con infinitivo, pasado, participio y significado, agrupados por cómo cambian para aprenderlos antes. Y ejercicios.`, `The ${VERBOS.length} most common irregular verbs with infinitive, past simple and past participle, grouped by how they change so they are quicker to learn. With practice.`, `Els ${VERBOS.length} verbs irregulars més usats en anglès amb infinitiu, passat, participi i significat, agrupats per com canvien per aprendre’ls abans. I exercicis.`),
  resumen: L(
    ['Los verbos irregulares no forman el pasado y el participio con -ed, sino con formas propias: go → went → gone. Son pocos, pero son los más usados del idioma, así que aparecen en casi todas las frases.', 'La forma más rápida de aprenderlos es agruparlos por cómo cambian: los que no cambian (cut-cut-cut), los que repiten pasado y participio (buy-bought-bought), los que tienen las tres formas distintas (go-went-gone) y los que repiten el infinitivo en el participio (come-came-come).'],
    ['Irregular verbs do not form their past and past participle with -ed, but with their own forms: go → went → gone. There are not many, but they are the most used verbs in the language, so they turn up in almost every sentence.', 'The quickest way to learn them is to group them by how they change: those that stay the same (cut-cut-cut), those with the same past and participle (buy-bought-bought), those with three different forms (go-went-gone) and those whose participle repeats the infinitive (come-came-come).'],
    ['Els verbs irregulars no formen el passat i el participi amb -ed, sinó amb formes pròpies: go → went → gone. Són pocs, però són els més usats de l’idioma, així que surten en gairebé totes les frases.', 'La manera més ràpida d’aprendre’ls és agrupar-los per com canvien: els que no canvien (cut-cut-cut), els que repeteixen passat i participi (buy-bought-bought), els que tenen les tres formes diferents (go-went-gone) i els que repeteixen l’infinitiu al participi (come-came-come).'],
  ),
  puntosClave: L(
    ['Tres formas: infinitivo, pasado (past simple) y participio (past participle).', 'El pasado va solo: I went. El participio, con have o en pasiva: I have gone, it was written.', 'Ojo con las parejas que se confunden: buy-bought / bring-brought.', 'Para negar y preguntar en pasado se usa did + infinitivo: I didn’t go.'],
    ['Three forms: infinitive, past simple and past participle.', 'The past stands alone: I went. The participle goes with have or in the passive: I have gone, it was written.', 'Watch out for pairs that get mixed up: buy-bought / bring-brought.', 'Past negatives and questions use did + infinitive: I didn’t go.'],
    ['Tres formes: infinitiu, passat (past simple) i participi (past participle).', 'El passat va sol: I went. El participi, amb have o en passiva: I have gone, it was written.', 'Compte amb les parelles que es confonen: buy-bought / bring-brought.', 'Per negar i preguntar en passat es fa servir did + infinitiu: I didn’t go.'],
  ),
  secciones: POR_PATRON.map(({ p, verbos }) => ({
    titulo: {
      es: `${PATRONES[p].letras}: ${PATRONES[p].nombre.es.toLowerCase()} (${verbos.length} verbos)`,
      en: `${PATRONES[p].letras}: ${PATRONES[p].nombre.en.toLowerCase()} (${verbos.length} verbs)`,
      ca: `${PATRONES[p].letras}: ${PATRONES[p].nombre.ca.toLowerCase()} (${verbos.length} verbs)`,
    },
    tabla: {
      columnas: L(['Infinitivo', 'Pasado', 'Participio', 'Significado'], ['Infinitive', 'Past simple', 'Past participle', 'Meaning'], ['Infinitiu', 'Passat', 'Participi', 'Significat']),
      filas: verbos.map(filaVerbo),
    },
  })),
  ejercicios: [
    { e: T('Escribe el pasado y el participio de go, buy, bring, write.', 'Write the past and the participle of go, buy, bring, write.', 'Escriu el passat i el participi de go, buy, bring, write.'), s: 'went – gone, bought – bought, brought – brought, wrote – written' },
    { e: 'I have ___ (write) three emails today.', s: T('written: con have va el participio.', 'written: have takes the participle.', 'written: amb have va el participi.') },
    { e: 'Yesterday she ___ (eat) sushi for the first time.', s: T('ate: yesterday pide past simple.', 'ate: yesterday needs the past simple.', 'ate: yesterday demana past simple.') },
    { e: T('¿A qué grupo pertenecen cut, put y hit?', 'Which group do cut, put and hit belong to?', 'A quin grup pertanyen cut, put i hit?'), s: T('A-A-A: las tres formas son iguales (cut-cut-cut).', 'A-A-A: all three forms are the same (cut-cut-cut).', 'A-A-A: les tres formes són iguals (cut-cut-cut).') },
    { e: T('Corrige: «He buyed a new phone».', 'Correct: «He buyed a new phone».', 'Corregeix: «He buyed a new phone».'), s: 'He bought a new phone.' },
  ],
}

export const INGLES_TEMA = {
  'present-simple': presentSimple,
  'past-simple': pastSimple,
  'present-perfect': presentPerfect,
  modals,
  conditionals,
  passive,
  adjectives,
  'irregular-verbs': irregularVerbs,
}
