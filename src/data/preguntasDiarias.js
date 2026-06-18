// Una pregunta diferente cada día (rota por día del año)
export const PREGUNTAS_DIARIAS = [
  { id: 1, pregunta: '¿En qué año comenzó la Guerra Civil Española?', opciones: ['1934', '1936', '1939', '1931'], correcta: '1936', categoria: 'Historia · ESO', explicacion: 'El 18 de julio de 1936 tuvo lugar el golpe de estado que desencadenó la Guerra Civil.' },
  { id: 2, pregunta: '¿Cuántos continentes tiene la Tierra?', opciones: ['5', '6', '7', '8'], correcta: '7', categoria: 'Geografía · Primaria', explicacion: 'Los 7 continentes son: África, América, Antártida, Asia, Europa, Oceanía y el Ártico (según el modelo más extendido son 6 o 7 según la convención).' },
  { id: 3, pregunta: '¿Quién pintó La Gioconda?', opciones: ['Miguel Ángel', 'Rafael', 'Leonardo da Vinci', 'Botticelli'], correcta: 'Leonardo da Vinci', categoria: 'Arte · ESO', explicacion: 'Leonardo da Vinci pintó La Gioconda (también conocida como Mona Lisa) entre 1503 y 1519 aproximadamente.' },
  { id: 4, pregunta: '¿En qué año llegó el hombre a la Luna?', opciones: ['1965', '1967', '1969', '1971'], correcta: '1969', categoria: 'Historia · Bachillerato', explicacion: 'El 20 de julio de 1969, Neil Armstrong se convirtió en el primer ser humano en pisar la Luna durante la misión Apollo 11.' },
  { id: 5, pregunta: '¿Cuál es el río más largo del mundo?', opciones: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'], correcta: 'Nilo', categoria: 'Geografía · Primaria', explicacion: 'El Nilo, con aproximadamente 6.650 km, es considerado el río más largo del mundo, aunque hay debate con el Amazonas.' },
  { id: 6, pregunta: '¿En qué año cayó el Muro de Berlín?', opciones: ['1987', '1989', '1991', '1993'], correcta: '1989', categoria: 'Historia · ESO', explicacion: 'El Muro de Berlín cayó el 9 de noviembre de 1989, simbolizando el fin de la Guerra Fría.' },
  { id: 7, pregunta: '¿Cuántos huesos tiene el cuerpo humano adulto?', opciones: ['186', '206', '226', '246'], correcta: '206', categoria: 'Ciencias · ESO', explicacion: 'El cuerpo humano adulto tiene 206 huesos. Los bebés nacen con unos 270 que se fusionan con el tiempo.' },
  { id: 8, pregunta: '¿Cuál es el planeta más grande del Sistema Solar?', opciones: ['Saturno', 'Urano', 'Júpiter', 'Neptuno'], correcta: 'Júpiter', categoria: 'Ciencias · Primaria', explicacion: 'Júpiter es el planeta más grande del Sistema Solar, con una masa que supera la de todos los demás planetas juntos.' },
  { id: 9, pregunta: '¿Qué civilización construyó las pirámides de Giza?', opciones: ['Mesopotámica', 'Griega', 'Romana', 'Egipcia'], correcta: 'Egipcia', categoria: 'Historia · Primaria', explicacion: 'Las pirámides de Giza fueron construidas por los antiguos egipcios alrededor del año 2500 a.C. como tumbas para los faraones.' },
  { id: 10, pregunta: '¿En qué año comenzó la Primera Guerra Mundial?', opciones: ['1912', '1914', '1916', '1918'], correcta: '1914', categoria: 'Historia · ESO', explicacion: 'La Primera Guerra Mundial comenzó el 28 de julio de 1914, tras el asesinato del archiduque Francisco Fernando.' },
  { id: 11, pregunta: '¿Cuál es el elemento químico más abundante en el universo?', opciones: ['Oxígeno', 'Carbono', 'Helio', 'Hidrógeno'], correcta: 'Hidrógeno', categoria: 'Ciencias · Bachillerato', explicacion: 'El hidrógeno es el elemento más abundante del universo, constituyendo aproximadamente el 75% de toda la materia ordinaria.' },
  { id: 12, pregunta: '¿Cuál es la capital de Australia?', opciones: ['Sídney', 'Melbourne', 'Canberra', 'Brisbane'], correcta: 'Canberra', categoria: 'Geografía · ESO', explicacion: 'Canberra es la capital de Australia. Muchos creen que es Sídney, pero Canberra fue construida específicamente para ser la capital.' },
  { id: 13, pregunta: '¿En qué año se descubrió América?', opciones: ['1488', '1490', '1492', '1498'], correcta: '1492', categoria: 'Historia · Primaria', explicacion: 'Cristóbal Colón llegó a América el 12 de octubre de 1492, aunque él creía haber llegado a Asia.' },
  { id: 14, pregunta: '¿Quién escribió Don Quijote de la Mancha?', opciones: ['Lope de Vega', 'Góngora', 'Quevedo', 'Cervantes'], correcta: 'Cervantes', categoria: 'Lengua · ESO', explicacion: 'Miguel de Cervantes Saavedra publicó el Quijote en dos partes: 1605 y 1615. Es considerada la primera novela moderna.' },
  { id: 15, pregunta: '¿Cuántos lados tiene un hexágono?', opciones: ['5', '6', '7', '8'], correcta: '6', categoria: 'Matemáticas · Primaria', explicacion: 'Un hexágono tiene 6 lados y 6 ángulos. La palabra viene del griego "hex" (seis) y "gonia" (ángulo).' },
  { id: 16, pregunta: '¿Cuál es el océano más grande del mundo?', opciones: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'], correcta: 'Pacífico', categoria: 'Geografía · Primaria', explicacion: 'El Océano Pacífico es el más grande y profundo del mundo, cubriendo más de un tercio de la superficie terrestre.' },
  { id: 17, pregunta: '¿En qué año terminó la Segunda Guerra Mundial?', opciones: ['1943', '1944', '1945', '1946'], correcta: '1945', categoria: 'Historia · ESO', explicacion: 'La Segunda Guerra Mundial terminó en 1945: en Europa el 8 de mayo y en el Pacífico el 2 de septiembre.' },
  { id: 18, pregunta: '¿Cuál es la fórmula química del agua?', opciones: ['HO', 'H₂O', 'H₃O', 'OH₂'], correcta: 'H₂O', categoria: 'Ciencias · Primaria', explicacion: 'El agua está formada por dos átomos de hidrógeno y uno de oxígeno, de ahí su fórmula H₂O.' },
  { id: 19, pregunta: '¿Qué país tiene más habitantes del mundo?', opciones: ['Estados Unidos', 'India', 'China', 'Indonesia'], correcta: 'India', categoria: 'Geografía · ESO', explicacion: 'India superó a China en 2023 como el país más poblado del mundo, con más de 1.400 millones de habitantes.' },
  { id: 20, pregunta: '¿En qué año se fundó Roma, según la tradición?', opciones: ['853 a.C.', '753 a.C.', '653 a.C.', '553 a.C.'], correcta: '753 a.C.', categoria: 'Historia · ESO', explicacion: 'Según la tradición, Roma fue fundada el 21 de abril del 753 a.C. por Rómulo, quien se convertiría en su primer rey.' },
  { id: 21, pregunta: '¿Cuál es el metal más ligero?', opciones: ['Aluminio', 'Titanio', 'Litio', 'Magnesio'], correcta: 'Litio', categoria: 'Ciencias · Bachillerato', explicacion: 'El litio es el metal más ligero de todos, con una densidad de solo 0,534 g/cm³, incluso menor que el agua.' },
  { id: 22, pregunta: '¿Quién fue el primer presidente de los Estados Unidos?', opciones: ['Abraham Lincoln', 'Thomas Jefferson', 'Benjamin Franklin', 'George Washington'], correcta: 'George Washington', categoria: 'Historia · ESO', explicacion: 'George Washington fue el primer presidente de los Estados Unidos (1789-1797) y uno de los Padres Fundadores de la nación.' },
  { id: 23, pregunta: '¿En qué continente se encuentra Egipto?', opciones: ['Asia', 'Europa', 'África', 'Oriente Medio'], correcta: 'África', categoria: 'Geografía · Primaria', explicacion: 'Egipto se encuentra en el noreste de África, aunque el Sinaí está geográficamente en Asia. Su capital es El Cairo.' },
  { id: 24, pregunta: '¿Cuántos planetas tiene el Sistema Solar?', opciones: ['7', '8', '9', '10'], correcta: '8', categoria: 'Ciencias · Primaria', explicacion: 'Desde 2006 el Sistema Solar tiene 8 planetas: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Plutón fue reclasificado.' },
  { id: 25, pregunta: '¿Cuál es la montaña más alta del mundo?', opciones: ['K2', 'Kangchenjunga', 'Everest', 'Makalu'], correcta: 'Everest', categoria: 'Geografía · Primaria', explicacion: 'El monte Everest, en los Himalayas, es la montaña más alta del mundo con 8.849 metros sobre el nivel del mar.' },
  { id: 26, pregunta: '¿En qué año comenzó la Revolución Francesa?', opciones: ['1785', '1787', '1789', '1791'], correcta: '1789', categoria: 'Historia · Bachillerato', explicacion: 'La Revolución Francesa comenzó en 1789, con la toma de la Bastilla el 14 de julio como símbolo del inicio del proceso revolucionario.' },
  { id: 27, pregunta: '¿Cuál es el país más grande del mundo por superficie?', opciones: ['China', 'Canadá', 'Estados Unidos', 'Rusia'], correcta: 'Rusia', categoria: 'Geografía · Primaria', explicacion: 'Rusia es el país más grande del mundo con 17,1 millones de km², abarcando Europa y Asia.' },
  { id: 28, pregunta: '¿Cuántos cromosomas tiene una célula humana normal?', opciones: ['23', '44', '46', '48'], correcta: '46', categoria: 'Ciencias · Bachillerato', explicacion: 'Las células humanas normales tienen 46 cromosomas (23 pares). Los gametos (espermatozoide y óvulo) tienen 23.' },
  { id: 29, pregunta: '¿Qué idioma tiene más hablantes nativos en el mundo?', opciones: ['Inglés', 'Español', 'Mandarín', 'Hindi'], correcta: 'Mandarín', categoria: 'Lengua · Bachillerato', explicacion: 'El chino mandarín es el idioma con más hablantes nativos del mundo, con más de 900 millones de personas.' },
  { id: 30, pregunta: '¿En qué año se abolió la esclavitud en España y sus colonias?', opciones: ['1870', '1880', '1886', '1898'], correcta: '1886', categoria: 'Historia · Bachillerato', explicacion: 'La esclavitud fue abolida definitivamente en Cuba (última colonia española) en 1886 mediante la Ley de Abolición de la Esclavitud.' },
]

import { EVENTOS_HISTORIA, eventosToPreguntas } from './historiaEvents'
import { MODO_IDS, GRADO_IDS, GRADOS, MODOS, dayOfYear } from '../lib/mathEngine'
import { PORTADAS } from './portadas'

const PREGUNTAS_AUTO = eventosToPreguntas(EVENTOS_HISTORIA)

export const POOL_DIARIO = [...PREGUNTAS_DIARIAS, ...PREGUNTAS_AUTO]

const PORTADAS_DIARIAS = PORTADAS.filter(p => p.temas?.includes('primaria'))

export function getPreguntaDeHoy() {
  const dia = dayOfYear()
  return POOL_DIARIO[dia % POOL_DIARIO.length]
}

export function getPortadaDeHoy() {
  const dia = dayOfYear()
  return PORTADAS_DIARIAS[dia % PORTADAS_DIARIAS.length]
}

// Rota entre trivia, cálculo mental y portada histórica (cada 3 días)
export function getDesafioDeHoy() {
  const dia = dayOfYear()
  const tipo3 = dia % 3
  if (tipo3 === 0) {
    return { tipo: 'trivia', pregunta: getPreguntaDeHoy() }
  }
  if (tipo3 === 1) {
    const modoId  = MODO_IDS[dia % MODO_IDS.length]
    const nivelId = GRADO_IDS[Math.floor(dia / 5) % GRADO_IDS.length]
    return { tipo: 'matematicas', modo: MODOS[modoId], grado: GRADOS[nivelId] }
  }
  return { tipo: 'portada', portada: getPortadaDeHoy() }
}
