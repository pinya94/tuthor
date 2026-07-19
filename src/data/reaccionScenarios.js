// ── Escenarios de "Reacción" (primeros auxilios) ────────────────────────────
// Cada escenario es una secuencia lineal de pasos (no un árbol): los pasos
// 'orden' se mezclan y hay que arrastrarlos a su posiciónCorrecta; los pasos
// 'decision' aparecen fijos en su posiciónEnSecuencia y bloquean el avance
// hasta elegir una opción. Las opciones no derivan a ramas distintas — cada
// una solo se marca esCorrecta/esPeligrosa para el resumen final.
//
// TODO(revisión sanitaria): el contenido sigue el protocolo estándar de SVB
// (Cruz Roja / European Resuscitation Council) tal y como lo conoce un no
// sanitario. Antes de publicar, que lo revise alguien con formación oficial
// en primeros auxilios — esto es material educativo, no un sustituto.

export const DISCLAIMER = {
  es: 'Este juego es educativo y no sustituye una formación oficial en primeros auxilios.',
  en: 'This game is educational and does not replace official first-aid training.',
  ca: 'Aquest joc és educatiu i no substitueix una formació oficial en primers auxilis.',
}

export const SCENARIOS = [
  {
    id: 'atragantamiento',
    titulo: { es: 'Atragantamiento', en: 'Choking', ca: 'Ennuegament' },
    situacionInicial: {
      texto: {
        es: 'Estás comiendo con un amigo. De repente se lleva las manos al cuello: no puede hablar ni toser, y hace gestos de ahogo.',
        en: 'You are eating with a friend. Suddenly they grab their throat: they cannot speak or cough, and gesture that they are choking.',
        ca: 'Estàs menjant amb un amic. De sobte es porta les mans al coll: no pot parlar ni tossir, i fa gestos d\'ofec.',
      },
      icono: '🫷',
    },
    pasos: [
      {
        id: 'p1', tipo: 'orden', posicionCorrecta: 1,
        texto: {
          es: 'Confirma en voz alta: "¿Te estás atragantando? ¿Puedes toser?"',
          en: 'Confirm out loud: "Are you choking? Can you cough?"',
          ca: 'Confirma en veu alta: "T\'estàs ennuegant? Pots tossir?"',
        },
      },
      {
        id: 'd1', tipo: 'decision', posicionEnSecuencia: 2,
        opciones: [
          {
            texto: { es: 'No puede toser, hablar ni respirar: actúa de inmediato', en: 'Cannot cough, speak or breathe: act immediately', ca: 'No pot tossir, parlar ni respirar: actua de seguida' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Sin tos ni entrada de aire es una obstrucción total: hay que actuar ya, no esperar.',
              en: 'No cough and no air movement means total obstruction: act now, don\'t wait.',
              ca: 'Sense tos ni entrada d\'aire és una obstrucció total: cal actuar ja, no esperar.',
            },
          },
          {
            texto: { es: 'Dale un vaso de agua para que la trague', en: 'Give them a glass of water to swallow', ca: 'Dona\'ls un got d\'aigua perquè el s\'empassin' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'El agua puede desplazar el objeto y agravar la obstrucción de la vía aérea. Nunca se ofrece líquido durante un atragantamiento.',
              en: 'Water can shift the object and worsen the airway obstruction. Never offer liquid during choking.',
              ca: 'L\'aigua pot desplaçar l\'objecte i agreujar l\'obstrucció de la via aèria. Mai s\'ofereix líquid durant un ennuegament.',
            },
          },
          {
            texto: { es: 'Espera un poco a ver si se le pasa solo', en: 'Wait a bit to see if it passes on its own', ca: 'Espera una mica a veure si se li passa sol' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'Con obstrucción total, cada segundo cuenta: esperar retrasa la maniobra de desobstrucción.',
              en: 'With total obstruction, every second counts: waiting delays the maneuver that clears the airway.',
              ca: 'Amb obstrucció total, cada segon compta: esperar retarda la maniobra de desobstrucció.',
            },
          },
        ],
      },
      {
        id: 'p2', tipo: 'orden', posicionCorrecta: 3,
        texto: {
          es: 'Colócate a su lado, inclínale el tronco hacia delante',
          en: 'Stand to their side, lean their torso forward',
          ca: 'Col·loca\'t al seu costat, inclina-li el tronc cap endavant',
        },
      },
      {
        id: 'p3', tipo: 'orden', posicionCorrecta: 4,
        texto: {
          es: 'Dale hasta 5 golpes secos entre los omóplatos con el talón de la mano',
          en: 'Give up to 5 sharp blows between the shoulder blades with the heel of your hand',
          ca: 'Dona-li fins a 5 cops secs entre els omòplats amb el taló de la mà',
        },
      },
      {
        id: 'd2', tipo: 'decision', posicionEnSecuencia: 5,
        opciones: [
          {
            texto: { es: 'Sigue sin respirar: pasa a las compresiones abdominales (Heimlich)', en: 'Still not breathing: move to abdominal thrusts (Heimlich)', ca: 'Segueix sense respirar: passa a les compressions abdominals (Heimlich)' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Si los golpes en la espalda no liberan la vía aérea, el protocolo pasa a compresiones abdominales.',
              en: 'If back blows don\'t clear the airway, the protocol moves on to abdominal thrusts.',
              ca: 'Si els cops a l\'esquena no alliberen la via aèria, el protocol passa a compressions abdominals.',
            },
          },
          {
            texto: { es: 'Métele los dedos en la boca a ciegas para sacar el objeto', en: 'Blindly sweep the mouth with your fingers to grab the object', ca: 'Fica-li els dits a la boca a cegues per treure l\'objecte' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Buscar el objeto a ciegas con los dedos puede empujarlo más adentro y bloquear aún más la vía aérea.',
              en: 'Blindly fishing for the object can push it further in and block the airway even more.',
              ca: 'Buscar l\'objecte a cegues amb els dits el pot empènyer més endins i bloquejar encara més la via aèria.',
            },
          },
          {
            texto: { es: 'Repite los golpes en la espalda otras 5 veces antes de probar otra cosa', en: 'Repeat back blows 5 more times before trying anything else', ca: 'Repeteix els cops a l\'esquena 5 vegades més abans de provar una altra cosa' },
            esCorrecta: false, esPeligrosa: false,
            explicacion: {
              es: 'El protocolo alterna 5 golpes y 5 compresiones, no repite solo golpes indefinidamente.',
              en: 'The protocol alternates 5 blows and 5 thrusts, not blows on repeat indefinitely.',
              ca: 'El protocol alterna 5 cops i 5 compressions, no repeteix només cops indefinidament.',
            },
          },
        ],
      },
      {
        id: 'p4', tipo: 'orden', posicionCorrecta: 6,
        texto: {
          es: 'Rodea su abdomen por detrás y haz hasta 5 compresiones hacia dentro y arriba (maniobra de Heimlich)',
          en: 'Wrap your arms around their abdomen from behind and give up to 5 inward-and-upward thrusts (Heimlich maneuver)',
          ca: 'Envolta el seu abdomen per darrere i fes fins a 5 compressions cap endins i amunt (maniobra de Heimlich)',
        },
      },
      {
        id: 'd3', tipo: 'decision', posicionEnSecuencia: 7,
        opciones: [
          {
            texto: { es: 'Si pierde el conocimiento: túmbale en el suelo, llama al 112 e inicia RCP', en: 'If they lose consciousness: lay them on the ground, call emergency services and start CPR', ca: 'Si perd el coneixement: estira\'l a terra, truca al 112 i inicia la RCP' },
            esCorrecta: true, esPeligrosa: false,
            explicacion: {
              es: 'Ante la pérdida de conciencia, el protocolo es avisar a emergencias e iniciar reanimación cardiopulmonar.',
              en: 'When consciousness is lost, the protocol is to alert emergency services and start CPR.',
              ca: 'Davant la pèrdua de coneixement, el protocol és avisar emergències i iniciar la reanimació cardiopulmonar.',
            },
          },
          {
            texto: { es: 'Si pierde el conocimiento, sigue haciendo compresiones abdominales de pie', en: 'If they lose consciousness, keep doing abdominal thrusts standing up', ca: 'Si perd el coneixement, segueix fent compressions abdominals dret' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Las compresiones abdominales de pie no tienen sentido ni son seguras con la persona inconsciente; hay que tumbarla y pasar a RCP.',
              en: 'Standing abdominal thrusts make no sense and aren\'t safe once the person is unconscious; lay them down and switch to CPR.',
              ca: 'Les compressions abdominals dret no tenen sentit ni són segures amb la persona inconscient; cal estirar-la i passar a RCP.',
            },
          },
          {
            texto: { es: 'Espera a que reaccione antes de llamar al 112', en: 'Wait for them to come round before calling emergency services', ca: 'Espera que reaccioni abans de trucar al 112' },
            esCorrecta: false, esPeligrosa: true,
            explicacion: {
              es: 'Ante una pérdida de conciencia por atragantamiento hay que llamar a emergencias de inmediato, no esperar.',
              en: 'When someone loses consciousness from choking you call emergency services immediately, not wait.',
              ca: 'Davant una pèrdua de coneixement per ennuegament cal trucar a emergències de seguida, no esperar.',
            },
          },
        ],
      },
    ],
  },

  // TODO: escenarios pendientes de contenido (misma estructura que arriba,
  // revisar protocolo con alguien con formación sanitaria antes de publicar):
  //   - Quemadura (qué NO hacer: pomadas caseras, hielo directo)
  //   - Desmayo / pérdida de conciencia (PLS, cuándo no mover a alguien)
  //   - Corte con sangrado (presión directa, cuándo un torniquete es excesivo)
  //   - Picadura / alergia (cuándo es una emergencia real vs leve)
]
