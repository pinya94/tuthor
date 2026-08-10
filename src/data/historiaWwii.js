// Segunda Guerra Mundial — banco de preguntas del examen de teoría.
// Mismos hechos que la ficha de estudio (src/data/fichasEstudiar/historia-segunda-guerra-mundial.js).
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [
  q('wwii-01', 'eso',
    { es: '¿Qué invasión marca el inicio de la Segunda Guerra Mundial?', en: 'Which invasion marks the start of the Second World War?', ca: 'Quina invasió marca l\'inici de la Segona Guerra Mundial?' },
    { es: ['La invasión alemana de Polonia', 'La invasión de Francia', 'La invasión de la URSS', 'El ataque a Pearl Harbor'], en: ['The German invasion of Poland', 'The invasion of France', 'The invasion of the USSR', 'The attack on Pearl Harbor'], ca: ['La invasió alemanya de Polònia', 'La invasió de França', 'La invasió de l\'URSS', 'L\'atac a Pearl Harbor'] },
    { es: 'La invasión alemana de Polonia', en: 'The German invasion of Poland', ca: 'La invasió alemanya de Polònia' },
    '⚔️',
    { es: 'Alemania invadió Polonia el 1 de septiembre de 1939. Reino Unido y Francia respondieron declarando la guerra, dando comienzo al conflicto.', en: 'Germany invaded Poland on 1 September 1939. Britain and France responded by declaring war, starting the conflict.', ca: 'Alemanya va envair Polònia l\'1 de setembre de 1939. El Regne Unit i França van respondre declarant la guerra, començant el conflicte.' }),

  q('wwii-02', 'eso',
    { es: '¿Qué países formaban las potencias del Eje?', en: 'Which countries made up the Axis powers?', ca: 'Quins països formaven les potències de l\'Eix?' },
    { es: ['Alemania, Italia y Japón', 'Reino Unido, Francia y la URSS', 'Alemania, España y Portugal', 'Italia, Francia y Japón'], en: ['Germany, Italy and Japan', 'Britain, France and the USSR', 'Germany, Spain and Portugal', 'Italy, France and Japan'], ca: ['Alemanya, Itàlia i el Japó', 'Regne Unit, França i l\'URSS', 'Alemanya, Espanya i Portugal', 'Itàlia, França i el Japó'] },
    { es: 'Alemania, Italia y Japón', en: 'Germany, Italy and Japan', ca: 'Alemanya, Itàlia i el Japó' },
    '🎌',
    { es: 'Las potencias del Eje eran la Alemania nazi de Hitler, la Italia fascista y el Japón imperial, enfrentadas a los Aliados.', en: 'The Axis powers were Hitler\'s Nazi Germany, Fascist Italy and Imperial Japan, fighting against the Allies.', ca: 'Les potències de l\'Eix eren l\'Alemanya nazi de Hitler, la Itàlia feixista i el Japó imperial, enfrontades als Aliats.' }),

  q('wwii-03', 'eso',
    { es: '¿Qué ataque hizo que Estados Unidos entrara en la guerra?', en: 'Which attack brought the United States into the war?', ca: 'Quin atac va fer que els Estats Units entressin a la guerra?' },
    { es: ['El ataque japonés a Pearl Harbor', 'La invasión de Polonia', 'La Batalla de Inglaterra', 'La Operación Barbarroja'], en: ['The Japanese attack on Pearl Harbor', 'The invasion of Poland', 'The Battle of Britain', 'Operation Barbarossa'], ca: ['L\'atac japonès a Pearl Harbor', 'La invasió de Polònia', 'La Batalla d\'Anglaterra', 'L\'Operació Barbarroja'] },
    { es: 'El ataque japonés a Pearl Harbor', en: 'The Japanese attack on Pearl Harbor', ca: 'L\'atac japonès a Pearl Harbor' },
    '💥',
    { es: 'El 7 de diciembre de 1941, Japón atacó la base naval estadounidense de Pearl Harbor. Al día siguiente, Estados Unidos declaró la guerra a Japón y entró en el conflicto.', en: 'On 7 December 1941, Japan attacked the US naval base at Pearl Harbor. The next day, the United States declared war on Japan and entered the conflict.', ca: 'El 7 de desembre de 1941, el Japó va atacar la base naval nord-americana de Pearl Harbor. L\'endemà, els Estats Units van declarar la guerra al Japó i van entrar al conflicte.' }),

  q('wwii-04', 'eso',
    { es: '¿Qué nombre recibe el desembarco aliado en Normandía de junio de 1944?', en: 'What is the June 1944 Allied landing in Normandy known as?', ca: 'Quin nom rep el desembarcament aliat a Normandia del juny de 1944?' },
    { es: ['Día D', 'Operación Barbarroja', 'Operación Torch', 'Batalla de las Ardenas'], en: ['D-Day', 'Operation Barbarossa', 'Operation Torch', 'Battle of the Bulge'], ca: ['Dia D', 'Operació Barbarroja', 'Operació Torch', 'Batalla de les Ardenes'] },
    { es: 'Día D', en: 'D-Day', ca: 'Dia D' },
    '🚢',
    { es: 'El 6 de junio de 1944, conocido como el Día D, los Aliados desembarcaron en las playas de Normandía, abriendo un segundo frente decisivo en Europa occidental.', en: '6 June 1944, known as D-Day, saw the Allies land on the beaches of Normandy, opening a decisive second front in Western Europe.', ca: 'El 6 de juny de 1944, conegut com el Dia D, els Aliats van desembarcar a les platges de Normandia, obrint un segon front decisiu a l\'Europa occidental.' }),

  q('wwii-05', 'eso',
    { es: '¿Sobre qué dos ciudades japonesas cayeron las bombas atómicas en agosto de 1945?', en: 'Which two Japanese cities were the atomic bombs dropped on in August 1945?', ca: 'Sobre quines dues ciutats japoneses van caure les bombes atòmiques a l\'agost de 1945?' },
    { es: ['Hiroshima y Nagasaki', 'Tokio y Osaka', 'Kioto y Nagoya', 'Hiroshima y Tokio'], en: ['Hiroshima and Nagasaki', 'Tokyo and Osaka', 'Kyoto and Nagoya', 'Hiroshima and Tokyo'], ca: ['Hiroshima i Nagasaki', 'Tòquio i Osaka', 'Kyoto i Nagoya', 'Hiroshima i Tòquio'] },
    { es: 'Hiroshima y Nagasaki', en: 'Hiroshima and Nagasaki', ca: 'Hiroshima i Nagasaki' },
    '☢️',
    { es: 'En agosto de 1945, Estados Unidos lanzó bombas atómicas sobre Hiroshima y Nagasaki, precipitando la rendición de Japón y el fin de la Segunda Guerra Mundial.', en: 'In August 1945, the United States dropped atomic bombs on Hiroshima and Nagasaki, hastening Japan\'s surrender and the end of the Second World War.', ca: 'A l\'agost de 1945, els Estats Units van llançar bombes atòmiques sobre Hiroshima i Nagasaki, precipitant la rendició del Japó i el final de la Segona Guerra Mundial.' }),

  q('wwii-06', 'eso',
    { es: '¿Qué fue el Holocausto?', en: 'What was the Holocaust?', ca: 'Què va ser l\'Holocaust?' },
    { es: ['El exterminio sistemático de seis millones de judíos', 'La destrucción de Londres por bombardeos', 'La rendición de Francia', 'La ocupación de Polonia'], en: ['The systematic extermination of six million Jews', 'The destruction of London by bombing', 'The surrender of France', 'The occupation of Poland'], ca: ['L\'extermini sistemàtic de sis milions de jueus', 'La destrucció de Londres per bombardeigs', 'La rendició de França', 'L\'ocupació de Polònia'] },
    { es: 'El exterminio sistemático de seis millones de judíos', en: 'The systematic extermination of six million Jews', ca: 'L\'extermini sistemàtic de sis milions de jueus' },
    '🕯️',
    { es: 'El Holocausto fue el exterminio sistemático de seis millones de judíos por la Alemania nazi, uno de los mayores crímenes de la historia de la humanidad.', en: 'The Holocaust was the systematic extermination of six million Jews by Nazi Germany, one of the greatest crimes in human history.', ca: 'L\'Holocaust va ser l\'extermini sistemàtic de sis milions de jueus per l\'Alemanya nazi, un dels majors crims de la història de la humanitat.' }),

  q('wwii-07', 'eso',
    { es: '¿Quién era el líder de la Alemania nazi durante la guerra?', en: 'Who was the leader of Nazi Germany during the war?', ca: 'Qui era el líder de l\'Alemanya nazi durant la guerra?' },
    { es: ['Adolf Hitler', 'Winston Churchill', 'Iósif Stalin', 'Benito Mussolini'], en: ['Adolf Hitler', 'Winston Churchill', 'Joseph Stalin', 'Benito Mussolini'], ca: ['Adolf Hitler', 'Winston Churchill', 'Ióssif Stalin', 'Benito Mussolini'] },
    { es: 'Adolf Hitler', en: 'Adolf Hitler', ca: 'Adolf Hitler' },
    '🎖️',
    { es: 'Adolf Hitler lideró la Alemania nazi y desencadenó la guerra con la invasión de Polonia en 1939.', en: 'Adolf Hitler led Nazi Germany and triggered the war with the invasion of Poland in 1939.', ca: 'Adolf Hitler va liderar l\'Alemanya nazi i va desencadenar la guerra amb la invasió de Polònia el 1939.' }),

  q('wwii-08', 'eso',
    { es: '¿En qué año terminó la Segunda Guerra Mundial?', en: 'In what year did the Second World War end?', ca: 'En quin any va acabar la Segona Guerra Mundial?' },
    { es: ['1945', '1939', '1941', '1944'], en: ['1945', '1939', '1941', '1944'], ca: ['1945', '1939', '1941', '1944'] },
    { es: '1945', en: '1945', ca: '1945' },
    '🏳️',
    { es: 'La guerra terminó en 1945: Alemania se rindió en mayo y Japón en agosto, tras las bombas atómicas de Hiroshima y Nagasaki.', en: 'The war ended in 1945: Germany surrendered in May and Japan in August, after the atomic bombs on Hiroshima and Nagasaki.', ca: 'La guerra va acabar el 1945: Alemanya es va rendir al maig i el Japó a l\'agost, després de les bombes atòmiques d\'Hiroshima i Nagasaki.' }),

  // ── Bachillerato: causas, batallas del frente oriental y figuras adicionales ──
  q('wwii-09', 'bachillerato',
    { es: '¿Qué tratado de 1919 se señala como una de las causas de la guerra?', en: 'Which 1919 treaty is identified as one of the causes of the war?', ca: 'Quin tractat del 1919 s\'assenyala com una de les causes de la guerra?' },
    { es: ['El Tratado de Versalles', 'El Tratado de Múnich', 'El Pacto de Varsovia', 'El Tratado de Roma'], en: ['The Treaty of Versailles', 'The Munich Agreement', 'The Warsaw Pact', 'The Treaty of Rome'], ca: ['El Tractat de Versalles', 'L\'Acord de Munic', 'El Pacte de Varsòvia', 'El Tractat de Roma'] },
    { es: 'El Tratado de Versalles', en: 'The Treaty of Versailles', ca: 'El Tractat de Versalles' },
    '📜',
    { es: 'El Tratado de Versalles (1919), que impuso duras condiciones a Alemania tras la Primera Guerra Mundial, es señalado como germen del resentimiento que alimentó el ascenso del nazismo.', en: 'The Treaty of Versailles (1919), which imposed harsh terms on Germany after the First World War, is identified as the seed of the resentment that fuelled the rise of Nazism.', ca: 'El Tractat de Versalles (1919), que va imposar dures condicions a Alemanya després de la Primera Guerra Mundial, s\'assenyala com a germen del ressentiment que va alimentar l\'ascens del nazisme.' }),

  q('wwii-10', 'bachillerato',
    { es: '¿Cómo se llamó la invasión alemana de la URSS en 1941?', en: 'What was the 1941 German invasion of the USSR called?', ca: 'Com es va anomenar la invasió alemanya de l\'URSS el 1941?' },
    { es: ['Operación Barbarroja', 'Operación Overlord', 'Operación Torch', 'Operación Market Garden'], en: ['Operation Barbarossa', 'Operation Overlord', 'Operation Torch', 'Operation Market Garden'], ca: ['Operació Barbarroja', 'Operació Overlord', 'Operació Torch', 'Operació Market Garden'] },
    { es: 'Operación Barbarroja', en: 'Operation Barbarossa', ca: 'Operació Barbarroja' },
    '❄️',
    { es: 'La Operación Barbarroja (22 de junio de 1941) fue la invasión alemana de la Unión Soviética, el frente más grande y mortífero de toda la guerra.', en: 'Operation Barbarossa (22 June 1941) was the German invasion of the Soviet Union, the largest and deadliest front of the entire war.', ca: 'L\'Operació Barbarroja (22 de juny de 1941) va ser la invasió alemanya de la Unió Soviètica, el front més gran i mortífer de tota la guerra.' }),

  q('wwii-11', 'bachillerato',
    { es: '¿Qué batalla se considera el punto de inflexión del frente oriental?', en: 'Which battle is considered the turning point of the Eastern Front?', ca: 'Quina batalla es considera el punt d\'inflexió del front oriental?' },
    { es: ['Batalla de Stalingrado', 'Batalla de Kursk', 'Batalla de Berlín', 'Batalla de Moscú'], en: ['Battle of Stalingrad', 'Battle of Kursk', 'Battle of Berlin', 'Battle of Moscow'], ca: ['Batalla de Stalingrad', 'Batalla de Kursk', 'Batalla de Berlín', 'Batalla de Moscou'] },
    { es: 'Batalla de Stalingrado', en: 'Battle of Stalingrad', ca: 'Batalla de Stalingrad' },
    '🌨️',
    { es: 'La Batalla de Stalingrado (1942–43) supuso la primera gran derrota alemana y marcó el punto de inflexión que empezó a decantar la guerra a favor de los Aliados en el frente oriental.', en: 'The Battle of Stalingrad (1942–43) was Germany\'s first major defeat and marked the turning point that began tipping the war in the Allies\' favour on the Eastern Front.', ca: 'La Batalla de Stalingrad (1942–43) va suposar la primera gran derrota alemanya i va marcar el punt d\'inflexió que va començar a decantar la guerra a favor dels Aliats al front oriental.' }),

  q('wwii-12', 'bachillerato',
    { es: '¿Qué crisis económica de 1929 contribuyó al auge de los fascismos en Europa?', en: 'Which 1929 economic crisis helped fuel the rise of fascism in Europe?', ca: 'Quina crisi econòmica del 1929 va contribuir a l\'auge dels feixismes a Europa?' },
    { es: ['La Gran Depresión', 'La crisis del petróleo', 'La hiperinflación alemana de 1923', 'El Crac de 1907'], en: ['The Great Depression', 'The oil crisis', 'The 1923 German hyperinflation', 'The 1907 panic'], ca: ['La Gran Depressió', 'La crisi del petroli', 'La hiperinflació alemanya de 1923', 'El Crac de 1907'] },
    { es: 'La Gran Depresión', en: 'The Great Depression', ca: 'La Gran Depressió' },
    '📉',
    { es: 'La Gran Depresión de 1929 hundió las economías europeas y facilitó el ascenso de movimientos fascistas que prometían soluciones rápidas a la crisis.', en: 'The Great Depression of 1929 crippled European economies and paved the way for fascist movements promising quick fixes to the crisis.', ca: 'La Gran Depressió de 1929 va enfonsar les economies europees i va facilitar l\'ascens de moviments feixistes que prometien solucions ràpides a la crisi.' }),

  q('wwii-13', 'bachillerato',
    { es: '¿Cuáles eran los dos principales campos de exterminio nazis, además de Auschwitz?', en: 'Besides Auschwitz, what were two of the main Nazi extermination camps?', ca: 'Quins eren els dos principals camps d\'extermini nazis, a més d\'Auschwitz?' },
    { es: ['Treblinka y Sobibor', 'Dachau y Buchenwald', 'Mauthausen y Dora', 'Bergen-Belsen y Ravensbrück'], en: ['Treblinka and Sobibor', 'Dachau and Buchenwald', 'Mauthausen and Dora', 'Bergen-Belsen and Ravensbrück'], ca: ['Treblinka i Sobibor', 'Dachau i Buchenwald', 'Mauthausen i Dora', 'Bergen-Belsen i Ravensbrück'] },
    { es: 'Treblinka y Sobibor', en: 'Treblinka and Sobibor', ca: 'Treblinka i Sobibor' },
    '🕯️',
    { es: 'Auschwitz, Treblinka y Sobibor son los campos de exterminio nazis más nombrados: allí se ejecutó buena parte del asesinato sistemático de seis millones de judíos.', en: 'Auschwitz, Treblinka and Sobibor are the most commonly cited Nazi extermination camps: a large share of the systematic murder of six million Jews took place there.', ca: 'Auschwitz, Treblinka i Sobibor són els camps d\'extermini nazis més esmentats: allà es va executar bona part de l\'assassinat sistemàtic de sis milions de jueus.' }),

  q('wwii-14', 'bachillerato',
    { es: '¿Qué organismo internacional fracasó a la hora de evitar la guerra?', en: 'Which international body failed to prevent the war?', ca: 'Quin organisme internacional va fracassar a l\'hora d\'evitar la guerra?' },
    { es: ['La Sociedad de Naciones', 'La ONU', 'La OTAN', 'La Unión Europea'], en: ['The League of Nations', 'The UN', 'NATO', 'The European Union'], ca: ['La Societat de Nacions', 'L\'ONU', 'L\'OTAN', 'La Unió Europea'] },
    { es: 'La Sociedad de Naciones', en: 'The League of Nations', ca: 'La Societat de Nacions' },
    '🕊️',
    { es: 'La Sociedad de Naciones, creada tras la Primera Guerra Mundial para evitar nuevos conflictos, fracasó al no poder frenar el expansionismo de Alemania, Italia y Japón. Tras la guerra se creó la ONU en su lugar.', en: 'The League of Nations, created after the First World War to prevent new conflicts, failed to curb the expansionism of Germany, Italy and Japan. The UN was created in its place after the war.', ca: 'La Societat de Nacions, creada després de la Primera Guerra Mundial per evitar nous conflictes, va fracassar en no poder frenar l\'expansionisme d\'Alemanya, Itàlia i el Japó. Després de la guerra es va crear l\'ONU en el seu lloc.' }),
]

export const PREGUNTAS_ESO = PREGUNTAS.filter(p => p.nivel === 'eso')
export const PREGUNTAS_BACHILLERATO = PREGUNTAS
