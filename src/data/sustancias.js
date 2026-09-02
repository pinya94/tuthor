// Sustancias con sus puntos de fusión y ebullición reales (°C a 1 atm), para
// el juego Cambio de Estado.
//
// El objetivo didáctico es romper la idea de que "sólido = frío" y
// "gas = caliente". El estado no depende de si una temperatura nos parece alta
// o baja a NOSOTROS, sino de dónde cae respecto a los puntos de esa sustancia
// concreta: el mercurio es líquido a 20 °C y el hierro sigue siendo sólido a
// 1000 °C. Por eso la lista mezcla a propósito metales, gases y líquidos
// cotidianos, y las preguntas eligen temperaturas que suenan contradictorias.
//
// Los valores están redondeados al grado, que es la precisión con la que se
// dan en cualquier libro de texto de la ESO.

const s = (id, nombre, fusion, ebullicion, nota) => ({ id, nombre, fusion, ebullicion, nota })

export const SUSTANCIAS = [
  s('agua', { es: 'Agua', en: 'Water', ca: 'Aigua' }, 0, 100,
    { es: 'Los 0 y los 100 °C del agua son la referencia de la escala Celsius: por eso los sabemos de memoria.', en: 'Water\'s 0 and 100 °C are the reference points of the Celsius scale, which is why we know them by heart.', ca: 'Els 0 i els 100 °C de l\'aigua són la referència de l\'escala Celsius.' }),

  s('mercurio', { es: 'Mercurio', en: 'Mercury', ca: 'Mercuri' }, -39, 357,
    { es: 'Es el único metal líquido a temperatura ambiente, y por eso se usaba en los termómetros antiguos.', en: 'The only metal that is liquid at room temperature, which is why it was used in old thermometers.', ca: 'És l\'únic metall líquid a temperatura ambient, i per això s\'usava als termòmetres antics.' }),

  s('hierro', { es: 'Hierro', en: 'Iron', ca: 'Ferro' }, 1538, 2862,
    { es: 'A 1000 °C el hierro está al rojo vivo, pero sigue siendo sólido: aún le faltan 500 grados para fundirse.', en: 'At 1000 °C iron is red hot but still solid: it is 500 degrees short of melting.', ca: 'A 1000 °C el ferro és roent, però encara és sòlid: li falten 500 graus per fondre\'s.' }),

  s('oxigeno', { es: 'Oxígeno', en: 'Oxygen', ca: 'Oxigen' }, -218, -183,
    { es: 'El aire que respiramos es gas porque estamos muy por encima de sus −183 °C. En un laboratorio se puede tener oxígeno líquido, azul pálido.', en: 'The air we breathe is gas because we are far above its −183 °C. In a lab you can have pale blue liquid oxygen.', ca: 'L\'aire que respirem és gas perquè som molt per sobre dels seus −183 °C.' }),

  s('nitrogeno', { es: 'Nitrógeno', en: 'Nitrogen', ca: 'Nitrogen' }, -210, -196,
    { es: 'El nitrógeno líquido hierve a −196 °C: por eso "hierve" a borbotones sobre una mesa, donde hace 200 grados de más para él.', en: 'Liquid nitrogen boils at −196 °C, which is why it bubbles furiously on a table 200 degrees too warm for it.', ca: 'El nitrogen líquid bull a −196 °C: per això bull a borbolls sobre una taula.' }),

  s('etanol', { es: 'Alcohol (etanol)', en: 'Alcohol (ethanol)', ca: 'Alcohol (etanol)' }, -114, 78,
    { es: 'Hierve a 78 °C, antes que el agua. En eso se basa la destilación: se calienta la mezcla y sale primero el alcohol.', en: 'It boils at 78 °C, before water. Distillation relies on this: heat the mixture and the alcohol comes off first.', ca: 'Bull a 78 °C, abans que l\'aigua. En això es basa la destil·lació.' }),

  s('oro', { es: 'Oro', en: 'Gold', ca: 'Or' }, 1064, 2856,
    { es: 'Se funde a 1064 °C, temperatura que ya se alcanzaba en hornos de la Antigüedad: por eso hay joyas de oro de hace milenios.', en: 'It melts at 1064 °C, a temperature ancient furnaces could already reach — hence gold jewellery thousands of years old.', ca: 'Es fon a 1064 °C, temperatura que ja s\'assolia en forns de l\'Antiguitat.' }),

  s('aluminio', { es: 'Aluminio', en: 'Aluminium', ca: 'Alumini' }, 660, 2470,
    { es: 'Se funde a 660 °C, mucho antes que el hierro. Por eso es tan fácil de reciclar: hace falta mucha menos energía.', en: 'It melts at 660 °C, far below iron. That is why it is so easy to recycle: it needs much less energy.', ca: 'Es fon a 660 °C, molt abans que el ferro. Per això és tan fàcil de reciclar.' }),

  s('plomo', { es: 'Plomo', en: 'Lead', ca: 'Plom' }, 327, 1749,
    { es: 'Con 327 °C se funde en una cocina potente. Es el metal más fácil de fundir de los comunes, y por eso se usó desde la Antigüedad.', en: 'At 327 °C it melts on a strong stove. The easiest common metal to melt, used since antiquity.', ca: 'Amb 327 °C es fon en una cuina potent: el metall comú més fàcil de fondre.' }),

  s('sal', { es: 'Sal común', en: 'Table salt', ca: 'Sal comuna' }, 801, 1465,
    { es: 'La sal se funde a 801 °C. En la cocina nunca la vemos líquida porque haría falta un horno industrial.', en: 'Salt melts at 801 °C. We never see it liquid in a kitchen: that needs an industrial furnace.', ca: 'La sal es fon a 801 °C: a la cuina no la veiem mai líquida.' }),

  s('cobre', { es: 'Cobre', en: 'Copper', ca: 'Coure' }, 1085, 2562,
    { es: 'Se funde a 1085 °C. Dominar esa temperatura fue lo que abrió la Edad de los Metales.', en: 'It melts at 1085 °C. Mastering that temperature is what opened the Metal Ages.', ca: 'Es fon a 1085 °C. Dominar aquesta temperatura va obrir l\'Edat dels Metalls.' }),

  s('helio', { es: 'Helio', en: 'Helium', ca: 'Heli' }, -272, -269,
    { es: 'Se licúa a −269 °C, a cuatro grados del cero absoluto. Es la sustancia más difícil de convertir en líquido que existe.', en: 'It liquefies at −269 °C, four degrees from absolute zero: the hardest substance in existence to turn into a liquid.', ca: 'Es liqua a −269 °C, a quatre graus del zero absolut.' }),

  s('cloro', { es: 'Cloro', en: 'Chlorine', ca: 'Clor' }, -101, -34,
    { es: 'A temperatura ambiente es un gas verdoso y tóxico. El de las piscinas no es cloro puro, sino un compuesto disuelto.', en: 'At room temperature it is a greenish toxic gas. Pool "chlorine" is not pure chlorine but a dissolved compound.', ca: 'A temperatura ambient és un gas verdós i tòxic.' }),

  s('butano', { es: 'Butano', en: 'Butane', ca: 'Butà' }, -138, -1,
    { es: 'Hierve a −1 °C, así que a temperatura ambiente sería gas. En la bombona está líquido porque va a presión, no por frío.', en: 'It boils at −1 °C, so at room temperature it would be gas. In the cylinder it is liquid because of pressure, not cold.', ca: 'Bull a −1 °C: a la bombona és líquid per la pressió, no pel fred.' }),
]

export const porId = id => SUSTANCIAS.find(x => x.id === id)

// Los seis cambios de estado con su nombre. La pareja sólido↔gas es la que
// más se olvida y la que más aparece en los exámenes.
export const CAMBIOS = [
  { id: 'fusion', de: 'solido', a: 'liquido',
    nombre: { es: 'Fusión', en: 'Melting', ca: 'Fusió' },
    ejemplo: { es: 'El hielo de un vaso se derrite.', en: 'Ice in a glass melts.', ca: 'El gel d\'un got es fon.' } },
  { id: 'solidificacion', de: 'liquido', a: 'solido',
    nombre: { es: 'Solidificación', en: 'Freezing', ca: 'Solidificació' },
    ejemplo: { es: 'El agua de la cubitera se congela.', en: 'Water in the ice tray freezes.', ca: 'L\'aigua de la cubitera es congela.' } },
  { id: 'vaporizacion', de: 'liquido', a: 'gas',
    nombre: { es: 'Vaporización', en: 'Vaporisation', ca: 'Vaporització' },
    ejemplo: { es: 'El agua de la olla hierve y sale vapor.', en: 'Water in the pot boils and steam comes off.', ca: 'L\'aigua de l\'olla bull i en surt vapor.' } },
  { id: 'condensacion', de: 'gas', a: 'liquido',
    nombre: { es: 'Condensación', en: 'Condensation', ca: 'Condensació' },
    ejemplo: { es: 'Se empañan los cristales en invierno.', en: 'Windows fog up in winter.', ca: 'Els vidres s\'entelen a l\'hivern.' } },
  { id: 'sublimacion', de: 'solido', a: 'gas',
    nombre: { es: 'Sublimación', en: 'Sublimation', ca: 'Sublimació' },
    ejemplo: { es: 'El hielo seco pasa a gas sin mojar nada.', en: 'Dry ice turns to gas without wetting anything.', ca: 'El gel sec passa a gas sense mullar res.' } },
  { id: 'sublimacion-inversa', de: 'gas', a: 'solido',
    nombre: { es: 'Sublimación inversa', en: 'Deposition', ca: 'Sublimació inversa' },
    ejemplo: { es: 'Se forma escarcha directamente sobre la hierba.', en: 'Frost forms straight onto the grass.', ca: 'Es forma gebre directament sobre l\'herba.' } },
]

export const ESTADOS = {
  solido: { label: { es: 'Sólido', en: 'Solid', ca: 'Sòlid' }, emoji: '🧊' },
  liquido: { label: { es: 'Líquido', en: 'Liquid', ca: 'Líquid' }, emoji: '💧' },
  gas: { label: { es: 'Gas', en: 'Gas', ca: 'Gas' }, emoji: '💨' },
}
