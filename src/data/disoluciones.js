// Disoluciones y concentración
//
// mezclasMateria.js, el banco vecino, cubre los MÉTODOS de separación
// (filtración, destilación, decantación, cromatografía) y los tipos de mezcla.
// Lo único que roza esto es una pregunta suelta sobre si el azúcar desaparece
// al disolverse. Lo que no estaba en ninguna parte es la disolución por dentro:
// soluto y disolvente, solubilidad, saturación, y sobre todo la concentración,
// que es la parte con números y la que de verdad se pregunta en un examen.
//
// Los enunciados con cuentas usan cifras que salen exactas para que la
// dificultad esté en plantear la división, no en hacerla. Comprobados uno a
// uno aparte antes de escribirlos.
function q(id, nivel, pregunta, opciones, correcta, emoji, explicacion) {
  return { id, nivel, pregunta, opciones, correcta, emoji, explicacion }
}

export const PREGUNTAS = [

  // ── SOLUTO Y DISOLVENTE ─────────────────────────────────────────────────
  q('ds-01', 'primaria',
    { es: 'En un vaso de agua con azúcar, ¿cuál es el soluto?', en: 'In a glass of sugary water, which is the solute?', ca: 'En un got d\'aigua amb sucre, quin és el solut?' },
    { es: ['El azúcar, que es lo que se disuelve', 'El agua', 'Los dos a la vez', 'El vaso'], en: ['The sugar, which is what dissolves', 'The water', 'Both at once', 'The glass'], ca: ['El sucre, que és el que es dissol', 'L\'aigua', 'Tots dos alhora', 'El got'] },
    { es: 'El azúcar, que es lo que se disuelve', en: 'The sugar, which is what dissolves', ca: 'El sucre, que és el que es dissol' },
    '🍬',
    { es: 'El soluto es lo que se disuelve y el disolvente aquello en lo que se disuelve, que suele ser lo que está en mayor cantidad. En una disolución de agua y azúcar, el agua es el disolvente.', en: 'The solute is what dissolves and the solvent is what it dissolves in, usually whatever there is more of.', ca: 'El solut és el que es dissol i el dissolvent allò en què es dissol.' }),

  q('ds-02', 'primaria',
    { es: '¿Qué tipo de mezcla es una disolución?', en: 'What kind of mixture is a solution?', ca: 'Quin tipus de mescla és una dissolució?' },
    { es: ['Homogénea: no se distinguen sus componentes', 'Heterogénea', 'No es una mezcla, es una sustancia pura', 'Depende del recipiente'], en: ['Homogeneous: its parts cannot be told apart', 'Heterogeneous', 'Not a mixture, a pure substance', 'It depends on the container'], ca: ['Homogènia: no es distingeixen els seus components', 'Heterogènia', 'No és una mescla, és una substància pura', 'Depèn del recipient'] },
    { es: 'Homogénea: no se distinguen sus componentes', en: 'Homogeneous: its parts cannot be told apart', ca: 'Homogènia: no es distingeixen els seus components' },
    '🥛',
    { es: 'Una disolución es transparente al reparto: por mucho que mires, no ves el azúcar. Y aun así sigue siendo una MEZCLA, no una sustancia pura, porque se puede separar de nuevo evaporando el agua.', en: 'A solution hides its parts: however hard you look, you cannot see the sugar. It is still a MIXTURE, because you can separate it again by evaporating.', ca: 'Una dissolució és transparent al repartiment, però segueix sent una MESCLA, no una substància pura.' }),

  q('ds-03', 'eso',
    { es: 'El aire es una disolución. ¿Cuál es su disolvente?', en: 'Air is a solution. What is its solvent?', ca: 'L\'aire és una dissolució. Quin és el seu dissolvent?' },
    { es: ['El nitrógeno, que es el gas más abundante', 'El oxígeno', 'El dióxido de carbono', 'El vapor de agua'], en: ['Nitrogen, the most abundant gas', 'Oxygen', 'Carbon dioxide', 'Water vapour'], ca: ['El nitrogen, que és el gas més abundant', 'L\'oxigen', 'El diòxid de carboni', 'El vapor d\'aigua'] },
    { es: 'El nitrógeno, que es el gas más abundante', en: 'Nitrogen, the most abundant gas', ca: 'El nitrogen, que és el gas més abundant' },
    '💨',
    { es: 'Una disolución no tiene por qué ser líquida: el aire es gas en gas y el bronce es sólido en sólido. El disolvente es siempre el componente mayoritario, y en el aire el nitrógeno es el 78 %.', en: 'A solution need not be liquid: air is gas in gas and bronze is solid in solid. The solvent is always the majority component.', ca: 'Una dissolució no ha de ser líquida: l\'aire és gas en gas i el bronze sòlid en sòlid.' }),

  q('ds-04', 'eso',
    { es: '¿Qué es una aleación como el bronce o el acero?', en: 'What is an alloy like bronze or steel?', ca: 'Què és un aliatge com el bronze o l\'acer?' },
    { es: ['Una disolución sólida de metales', 'Un compuesto químico puro', 'Una mezcla heterogénea', 'Un elemento de la tabla periódica'], en: ['A solid solution of metals', 'A pure chemical compound', 'A heterogeneous mixture', 'An element of the periodic table'], ca: ['Una dissolució sòlida de metalls', 'Un compost químic pur', 'Una mescla heterogènia', 'Un element de la taula periòdica'] },
    { es: 'Una disolución sólida de metales', en: 'A solid solution of metals', ca: 'Una dissolució sòlida de metalls' },
    '🥉',
    { es: 'El acero es hierro con algo de carbono y el bronce es cobre con estaño. No hay reacción química: los átomos se mezclan uniformemente, exactamente como el azúcar en el agua pero en sólido.', en: 'Steel is iron with some carbon, bronze is copper with tin. No chemical reaction: the atoms mix uniformly, just like sugar in water but solid.', ca: 'L\'acer és ferro amb una mica de carboni i el bronze és coure amb estany.' }),

  // ── SOLUBILIDAD Y SATURACIÓN ────────────────────────────────────────────
  q('ds-05', 'eso',
    { es: '¿Qué es una disolución saturada?', en: 'What is a saturated solution?', ca: 'Què és una dissolució saturada?' },
    { es: ['La que ya no admite más soluto a esa temperatura', 'La que tiene muy poco soluto', 'La que está muy caliente', 'La que tiene dos disolventes'], en: ['One that can take no more solute at that temperature', 'One with very little solute', 'One that is very hot', 'One with two solvents'], ca: ['La que ja no admet més solut a aquesta temperatura', 'La que té molt poc solut', 'La que està molt calenta', 'La que té dos dissolvents'] },
    { es: 'La que ya no admite más soluto a esa temperatura', en: 'One that can take no more solute at that temperature', ca: 'La que ja no admet més solut a aquesta temperatura' },
    '🧂',
    { es: 'A partir de ahí, todo el soluto que eches se queda en el fondo sin disolverse. El "a esa temperatura" es la clave: la misma disolución deja de estar saturada si la calientas.', en: 'From then on, any solute you add sits at the bottom. The "at that temperature" is the key: the same solution stops being saturated if you heat it.', ca: 'A partir d\'aquí, tot el solut que hi tiris es queda al fons sense dissoldre\'s.' }),

  q('ds-06', 'eso',
    { es: 'En general, ¿qué le pasa a la solubilidad de un sólido en agua al calentarla?', en: 'In general, what happens to a solid\'s solubility in water when you heat it?', ca: 'En general, què li passa a la solubilitat d\'un sòlid en aigua en escalfar-la?' },
    { es: ['Aumenta: se disuelve más cantidad', 'Disminuye', 'No cambia', 'Se hace cero'], en: ['It increases: more dissolves', 'It decreases', 'It does not change', 'It becomes zero'], ca: ['Augmenta: se\'n dissol més quantitat', 'Disminueix', 'No canvia', 'Es fa zero'] },
    { es: 'Aumenta: se disuelve más cantidad', en: 'It increases: more dissolves', ca: 'Augmenta: se\'n dissol més quantitat' },
    '☕',
    { es: 'Es lo que hace que el azúcar se disuelva al momento en un café caliente y cueste tanto en uno frío. Con los GASES pasa justo al revés, y por eso un refresco caliente pierde las burbujas.', en: 'It is why sugar dissolves instantly in hot coffee and struggles in cold. With GASES the opposite happens, which is why warm fizzy drinks go flat.', ca: 'És el que fa que el sucre es dissolgui al moment en un cafè calent.' }),

  q('ds-07', 'eso',
    { es: '¿Por qué un refresco pierde el gas más deprisa si está caliente?', en: 'Why does a fizzy drink go flat faster when warm?', ca: 'Per què un refresc perd el gas més de pressa si està calent?' },
    { es: ['Porque los gases se disuelven peor cuanto mayor es la temperatura', 'Porque el calor destruye el gas', 'Porque el azúcar se disuelve más', 'Porque la botella se dilata'], en: ['Because gases dissolve worse the higher the temperature', 'Because heat destroys the gas', 'Because more sugar dissolves', 'Because the bottle expands'], ca: ['Perquè els gasos es dissolen pitjor com més alta és la temperatura', 'Perquè la calor destrueix el gas', 'Perquè el sucre es dissol més', 'Perquè l\'ampolla es dilata'] },
    { es: 'Porque los gases se disuelven peor cuanto mayor es la temperatura', en: 'Because gases dissolve worse the higher the temperature', ca: 'Perquè els gasos es dissolen pitjor com més alta és la temperatura' },
    '🥤',
    { es: 'Los gases se comportan al revés que los sólidos. Tiene consecuencias serias fuera del vaso: un río más caliente retiene menos oxígeno disuelto, y por eso los peces se asfixian en las olas de calor.', en: 'Gases behave the opposite way to solids. It has serious consequences beyond the glass: a warmer river holds less dissolved oxygen.', ca: 'Els gasos es comporten a l\'inrevés que els sòlids: un riu més calent reté menys oxigen dissolt.' }),

  q('ds-08', 'eso',
    { es: '¿Qué pasa si dejas enfriar una disolución saturada en caliente?', en: 'What happens if you let a hot saturated solution cool?', ca: 'Què passa si deixes refredar una dissolució saturada en calent?' },
    { es: ['Parte del soluto se separa y cristaliza en el fondo', 'Se disuelve todavía más soluto', 'No pasa nada', 'El disolvente se evapora'], en: ['Some solute separates out and crystallises at the bottom', 'Even more solute dissolves', 'Nothing happens', 'The solvent evaporates'], ca: ['Part del solut se separa i cristal·litza al fons', 'Es dissol encara més solut', 'No passa res', 'El dissolvent s\'evapora'] },
    { es: 'Parte del soluto se separa y cristaliza en el fondo', en: 'Some solute separates out and crystallises at the bottom', ca: 'Part del solut se separa i cristal·litza al fons' },
    '💎',
    { es: 'Al enfriarse, el agua ya no puede sostener tanto soluto y lo suelta formando cristales. Es como se fabrican los cristales de azúcar cande y como se purifican muchas sustancias en el laboratorio.', en: 'On cooling, the water can no longer hold so much solute and lets it go as crystals. It is how rock candy is made.', ca: 'En refredar-se, l\'aigua ja no pot sostenir tant solut i el deixa anar formant cristalls.' }),

  q('ds-09', 'eso',
    { es: '¿Por qué el aceite no se disuelve en agua?', en: 'Why does oil not dissolve in water?', ca: 'Per què l\'oli no es dissol en aigua?' },
    { es: ['Porque son sustancias de naturaleza distinta y no se atraen entre sí', 'Porque el aceite pesa menos', 'Porque el agua está fría', 'Porque el aceite es un sólido'], en: ['Because they are different in nature and do not attract each other', 'Because oil is lighter', 'Because the water is cold', 'Because oil is a solid'], ca: ['Perquè són substàncies de naturalesa diferent i no s\'atrauen entre si', 'Perquè l\'oli pesa menys', 'Perquè l\'aigua és freda', 'Perquè l\'oli és un sòlid'] },
    { es: 'Porque son sustancias de naturaleza distinta y no se atraen entre sí', en: 'Because they are different in nature and do not attract each other', ca: 'Perquè són substàncies de naturalesa diferent i no s\'atrauen entre si' },
    '🍶',
    { es: 'La regla es "lo semejante disuelve a lo semejante". El agua disuelve sal y azúcar pero no grasa; la gasolina, al revés. Por eso el jabón funciona: tiene una parte que se lleva bien con cada uno.', en: 'The rule is "like dissolves like". Water dissolves salt and sugar but not fat; petrol is the other way round. That is why soap works.', ca: 'La regla és "el semblant dissol el semblant". Per això el sabó funciona.' }),

  q('ds-10', 'primaria',
    { es: 'Si remueves y calientas, ¿qué le pasa a la velocidad a la que se disuelve el azúcar?', en: 'If you stir and heat, what happens to how fast the sugar dissolves?', ca: 'Si remenes i escalfes, què li passa a la velocitat amb què es dissol el sucre?' },
    { es: ['Se disuelve más rápido', 'Se disuelve más lento', 'No cambia', 'Deja de disolverse'], en: ['It dissolves faster', 'It dissolves slower', 'No change', 'It stops dissolving'], ca: ['Es dissol més ràpid', 'Es dissol més lent', 'No canvia', 'Deixa de dissoldre\'s'] },
    { es: 'Se disuelve más rápido', en: 'It dissolves faster', ca: 'Es dissol més ràpid' },
    '🥄',
    { es: 'Remover, calentar y moler el soluto en trozos pequeños son las tres formas de acelerarlo. Ojo: aceleran, no aumentan el máximo — removiendo no cabe más azúcar del que cabía.', en: 'Stirring, heating and grinding the solute are the three ways to speed it up. Careful: they speed it up, they do not raise the maximum.', ca: 'Remenar, escalfar i moldre el solut són les tres formes d\'accelerar-ho, però no augmenten el màxim.' }),

  // ── CONCENTRACIÓN ───────────────────────────────────────────────────────
  q('ds-11', 'eso',
    { es: '¿Qué indica la concentración de una disolución?', en: 'What does a solution\'s concentration tell you?', ca: 'Què indica la concentració d\'una dissolució?' },
    { es: ['Cuánto soluto hay en una cantidad dada de disolución', 'Lo caliente que está', 'Cuánto pesa el disolvente', 'El color que tiene'], en: ['How much solute there is in a given amount of solution', 'How hot it is', 'How much the solvent weighs', 'Its colour'], ca: ['Quant solut hi ha en una quantitat donada de dissolució', 'Com de calenta està', 'Quant pesa el dissolvent', 'El color que té'] },
    { es: 'Cuánto soluto hay en una cantidad dada de disolución', en: 'How much solute there is in a given amount of solution', ca: 'Quant solut hi ha en una quantitat donada de dissolució' },
    '📊',
    { es: 'Es lo que distingue un café flojo de uno cargado usando el mismo café y la misma agua. "Mucho soluto" no significa nada por sí solo: importa cuánto soluto POR cuánta disolución.', en: 'It is what tells a weak coffee from a strong one with the same beans and water. "A lot of solute" means nothing alone: what matters is how much PER how much solution.', ca: 'És el que distingeix un cafè fluix d\'un de carregat amb el mateix cafè i la mateixa aigua.' }),

  q('ds-12', 'eso',
    { es: 'Se disuelven 20 g de sal en agua hasta obtener 2 litros de disolución. ¿Cuál es la concentración en g/L?', en: '20 g of salt is dissolved in water to make 2 litres of solution. What is the concentration in g/L?', ca: 'Es dissolen 20 g de sal en aigua fins a obtenir 2 litres de dissolució. Quina és la concentració en g/L?' },
    { es: ['10 g/L', '40 g/L', '20 g/L', '2 g/L'], en: ['10 g/L', '40 g/L', '20 g/L', '2 g/L'], ca: ['10 g/L', '40 g/L', '20 g/L', '2 g/L'] },
    { es: '10 g/L', en: '10 g/L', ca: '10 g/L' },
    '🔢',
    { es: 'Concentración = masa de soluto ÷ volumen de disolución = 20 ÷ 2 = 10 g/L. La barra de "g/L" ya dice qué hay que hacer: gramos ENTRE litros.', en: 'Concentration = mass of solute ÷ volume of solution = 20 ÷ 2 = 10 g/L. The slash in "g/L" tells you the operation: grams OVER litres.', ca: 'Concentració = massa de solut ÷ volum de dissolució = 20 ÷ 2 = 10 g/L.' }),

  q('ds-13', 'eso',
    { es: 'Una disolución tiene 15 g/L. ¿Cuánto soluto hay en medio litro?', en: 'A solution is 15 g/L. How much solute is there in half a litre?', ca: 'Una dissolució té 15 g/L. Quant solut hi ha en mig litre?' },
    { es: ['7,5 g', '30 g', '15 g', '7,5 L'], en: ['7.5 g', '30 g', '15 g', '7.5 L'], ca: ['7,5 g', '30 g', '15 g', '7,5 L'] },
    { es: '7,5 g', en: '7.5 g', ca: '7,5 g' },
    '⚗️',
    { es: '15 g/L × 0,5 L = 7,5 g. Al revés que antes: sabiendo la concentración y el volumen, se multiplica. Si sale un resultado en litros es que se ha operado al revés.', en: '15 g/L × 0.5 L = 7.5 g. The other way round from before: knowing concentration and volume, you multiply.', ca: '15 g/L × 0,5 L = 7,5 g.' }),

  q('ds-14', 'eso',
    { es: 'En 100 g de disolución hay 5 g de soluto. ¿Cuál es el porcentaje en masa?', en: '100 g of solution contains 5 g of solute. What is the mass percentage?', ca: 'En 100 g de dissolució hi ha 5 g de solut. Quin és el percentatge en massa?' },
    { es: ['5 %', '20 %', '0,5 %', '95 %'], en: ['5 %', '20 %', '0.5 %', '95 %'], ca: ['5 %', '20 %', '0,5 %', '95 %'] },
    { es: '5 %', en: '5 %', ca: '5 %' },
    '💯',
    { es: '5 de cada 100 es justo un 5 %. Fíjate en que el porcentaje se calcula sobre la DISOLUCIÓN entera, no sobre el disolvente: los 100 g incluyen los 5 g de soluto.', en: '5 out of every 100 is exactly 5 %. Note the percentage is over the whole SOLUTION, not the solvent: the 100 g includes the 5 g of solute.', ca: '5 de cada 100 és justament un 5 %. El percentatge es calcula sobre la DISSOLUCIÓ sencera.' }),

  q('ds-15', 'eso',
    { es: 'Se mezclan 30 g de azúcar con 170 g de agua. ¿Qué porcentaje en masa tiene la disolución?', en: '30 g of sugar is mixed with 170 g of water. What is the mass percentage?', ca: 'Es mesclen 30 g de sucre amb 170 g d\'aigua. Quin percentatge en massa té la dissolució?' },
    { es: ['15 %', '30 %', '17,6 %', '20 %'], en: ['15 %', '30 %', '17.6 %', '20 %'], ca: ['15 %', '30 %', '17,6 %', '20 %'] },
    { es: '15 %', en: '15 %', ca: '15 %' },
    '🍯',
    { es: 'La disolución pesa 30 + 170 = 200 g, y 30 ÷ 200 = 0,15, o sea el 15 %. El error clásico es dividir entre los 170 g del agua: hay que dividir entre el TOTAL.', en: 'The solution weighs 30 + 170 = 200 g, and 30 ÷ 200 = 0.15, i.e. 15 %. The classic slip is dividing by the water\'s 170 g: divide by the TOTAL.', ca: 'La dissolució pesa 30 + 170 = 200 g, i 30 ÷ 200 = 0,15, és a dir el 15 %.' }),

  q('ds-16', 'eso',
    { es: 'Añades agua a una disolución sin añadir soluto. ¿Qué le pasa a la concentración?', en: 'You add water to a solution without adding solute. What happens to the concentration?', ca: 'Afegeixes aigua a una dissolució sense afegir solut. Què li passa a la concentració?' },
    { es: ['Baja: es lo que se llama diluir', 'Sube', 'No cambia, porque el soluto es el mismo', 'Se hace cero'], en: ['It falls: this is called diluting', 'It rises', 'No change, since the solute is the same', 'It becomes zero'], ca: ['Baixa: és el que s\'anomena diluir', 'Puja', 'No canvia, perquè el solut és el mateix', 'Es fa zero'] },
    { es: 'Baja: es lo que se llama diluir', en: 'It falls: this is called diluting', ca: 'Baixa: és el que s\'anomena diluir' },
    '💧',
    { es: 'La misma cantidad de soluto repartida en más disolución da menos por litro. Es lo que haces al aguar un zumo concentrado, y el motivo de que la concentración no dependa solo del soluto.', en: 'The same solute spread through more solution gives less per litre. It is what you do when watering down concentrated juice.', ca: 'La mateixa quantitat de solut repartida en més dissolució dona menys per litre.' }),

  q('ds-17', 'eso',
    { es: 'Una disolución de 100 g/L se diluye hasta el doble de volumen. ¿Cuál es la nueva concentración?', en: 'A 100 g/L solution is diluted to twice its volume. What is the new concentration?', ca: 'Una dissolució de 100 g/L es dilueix fins al doble de volum. Quina és la nova concentració?' },
    { es: ['50 g/L', '200 g/L', '100 g/L', '25 g/L'], en: ['50 g/L', '200 g/L', '100 g/L', '25 g/L'], ca: ['50 g/L', '200 g/L', '100 g/L', '25 g/L'] },
    { es: '50 g/L', en: '50 g/L', ca: '50 g/L' },
    '📉',
    { es: 'El soluto sigue siendo el mismo y el volumen es el doble, así que la concentración es la mitad. Doblar el volumen SIEMPRE divide la concentración entre dos, sean los números que sean.', en: 'The solute is unchanged and the volume is doubled, so the concentration halves. Doubling the volume ALWAYS halves the concentration.', ca: 'El solut segueix sent el mateix i el volum és el doble, així que la concentració és la meitat.' }),

  q('ds-18', 'eso',
    { es: '¿Qué mide la molaridad de una disolución?', en: 'What does the molarity of a solution measure?', ca: 'Què mesura la molaritat d\'una dissolució?' },
    { es: ['Los moles de soluto por litro de disolución', 'Los gramos de soluto por litro', 'La masa total de la disolución', 'El número de moléculas de disolvente'], en: ['Moles of solute per litre of solution', 'Grams of solute per litre', 'The total mass of the solution', 'The number of solvent molecules'], ca: ['Els mols de solut per litre de dissolució', 'Els grams de solut per litre', 'La massa total de la dissolució', 'El nombre de molècules de dissolvent'] },
    { es: 'Los moles de soluto por litro de disolución', en: 'Moles of solute per litre of solution', ca: 'Els mols de solut per litre de dissolució' },
    '🧪',
    { es: 'Se escribe M: una disolución 2 M tiene 2 moles por litro. Se usa en vez de g/L porque en una reacción lo que importa es cuántas PARTÍCULAS hay, no cuánto pesan.', en: 'Written M: a 2 M solution has 2 moles per litre. It is used instead of g/L because in a reaction what matters is how many PARTICLES there are.', ca: 'S\'escriu M: una dissolució 2 M té 2 mols per litre.' }),

  q('ds-19', 'eso',
    { es: 'Hay 0,5 moles de soluto en 250 mL de disolución. ¿Cuál es la molaridad?', en: 'There are 0.5 moles of solute in 250 mL of solution. What is the molarity?', ca: 'Hi ha 0,5 mols de solut en 250 mL de dissolució. Quina és la molaritat?' },
    { es: ['2 M', '0,125 M', '0,5 M', '125 M'], en: ['2 M', '0.125 M', '0.5 M', '125 M'], ca: ['2 M', '0,125 M', '0,5 M', '125 M'] },
    { es: '2 M', en: '2 M', ca: '2 M' },
    '🔢',
    { es: '250 mL son 0,25 L, y 0,5 ÷ 0,25 = 2 M. El paso que más se olvida es convertir los mililitros a litros ANTES de dividir: si no, sale un número 1000 veces menor.', en: '250 mL is 0.25 L, and 0.5 ÷ 0.25 = 2 M. The step most often forgotten is converting millilitres to litres BEFORE dividing.', ca: '250 mL són 0,25 L, i 0,5 ÷ 0,25 = 2 M.' }),

  // ── EN LA VIDA DIARIA ───────────────────────────────────────────────────
  q('ds-20', 'primaria',
    { es: '¿Por qué el agua del mar no sirve para beber?', en: 'Why is sea water not drinkable?', ca: 'Per què l\'aigua del mar no serveix per beure?' },
    { es: ['Porque tiene una concentración de sales demasiado alta para el cuerpo', 'Porque está fría', 'Porque contiene peces', 'Porque no es una disolución'], en: ['Because its salt concentration is too high for the body', 'Because it is cold', 'Because it has fish in it', 'Because it is not a solution'], ca: ['Perquè té una concentració de sals massa alta per al cos', 'Perquè està freda', 'Perquè conté peixos', 'Perquè no és una dissolució'] },
    { es: 'Porque tiene una concentración de sales demasiado alta para el cuerpo', en: 'Because its salt concentration is too high for the body', ca: 'Perquè té una concentració de sals massa alta per al cos' },
    '🌊',
    { es: 'Unos 35 gramos de sal por litro. Beberla deshidrata en vez de hidratar, porque el riñón necesita más agua para expulsar tanta sal de la que le entra con el trago.', en: 'About 35 grams of salt per litre. Drinking it dehydrates you instead of hydrating, because the kidney needs more water to expel that much salt.', ca: 'Uns 35 grams de sal per litre. Beure-la deshidrata en comptes d\'hidratar.' }),

  q('ds-21', 'primaria',
    { es: 'En una bebida isotónica o un suero, ¿por qué importa la concentración exacta?', en: 'In a sports drink or a rehydration solution, why does the exact concentration matter?', ca: 'En una beguda isotònica o un sèrum, per què importa la concentració exacta?' },
    { es: ['Porque tiene que parecerse a la de los líquidos del cuerpo para absorberse bien', 'Porque así sabe mejor', 'Porque abarata el producto', 'Porque cambia el color'], en: ['Because it must match the body\'s own fluids to be absorbed properly', 'Because it tastes better', 'Because it is cheaper', 'Because it changes the colour'], ca: ['Perquè s\'ha d\'assemblar a la dels líquids del cos per absorbir-se bé', 'Perquè així té més bon gust', 'Perquè abarateix el producte', 'Perquè canvia el color'] },
    { es: 'Porque tiene que parecerse a la de los líquidos del cuerpo para absorberse bien', en: 'Because it must match the body\'s own fluids to be absorbed properly', ca: 'Perquè s\'ha d\'assemblar a la dels líquids del cos per absorbir-se bé' },
    '🧃',
    { es: '"Isotónica" significa exactamente eso: misma concentración. Es un caso donde la química deja de ser un ejercicio de clase — la OMS tiene una receta de suero con proporciones concretas que salva vidas.', en: '"Isotonic" means exactly that: same concentration. The WHO has a rehydration recipe with specific proportions that saves lives.', ca: '"Isotònica" significa exactament això: mateixa concentració.' }),

  q('ds-22', 'eso',
    { es: 'La lejía viene "diluida al 5 %". ¿Qué significa?', en: 'Bleach comes "diluted to 5 %". What does that mean?', ca: 'El lleixiu ve "diluït al 5 %". Què significa?' },
    { es: ['Que de cada 100 partes de producto, 5 son el compuesto activo', 'Que hay que echar 5 tapones', 'Que dura 5 días', 'Que se disuelve en 5 minutos'], en: ['That in every 100 parts of product, 5 are the active compound', 'That you must pour 5 capfuls', 'That it lasts 5 days', 'That it dissolves in 5 minutes'], ca: ['Que de cada 100 parts de producte, 5 són el compost actiu', 'Que cal tirar-hi 5 taps', 'Que dura 5 dies', 'Que es dissol en 5 minuts'] },
    { es: 'Que de cada 100 partes de producto, 5 son el compuesto activo', en: 'That in every 100 parts of product, 5 are the active compound', ca: 'Que de cada 100 parts de producte, 5 són el compost actiu' },
    '🧴',
    { es: 'Leer una etiqueta es leer una concentración. Es lo mismo que el porcentaje de alcohol de una bebida o la graduación de un desinfectante: la concentración es lo que hace que algo funcione o queme.', en: 'Reading a label is reading a concentration. Same as the alcohol percentage of a drink or the strength of a disinfectant.', ca: 'Llegir una etiqueta és llegir una concentració.' }),

  q('ds-23', 'eso',
    { es: '¿Por qué se echa sal a las carreteras cuando va a helar?', en: 'Why is salt spread on roads before a frost?', ca: 'Per què es tira sal a les carreteres quan gelarà?' },
    { es: ['Porque el agua salada se congela por debajo de 0 °C', 'Porque la sal calienta el asfalto', 'Porque la sal absorbe el agua', 'Porque hace la carretera más rugosa'], en: ['Because salt water freezes below 0 °C', 'Because salt warms the tarmac', 'Because salt absorbs the water', 'Because it roughens the road'], ca: ['Perquè l\'aigua salada es congela per sota de 0 °C', 'Perquè la sal escalfa l\'asfalt', 'Perquè la sal absorbeix l\'aigua', 'Perquè fa la carretera més rugosa'] },
    { es: 'Porque el agua salada se congela por debajo de 0 °C', en: 'Because salt water freezes below 0 °C', ca: 'Perquè l\'aigua salada es congela per sota de 0 °C' },
    '❄️',
    { es: 'Disolver algo en agua le baja el punto de congelación. Por eso el mar no se hiela con la misma facilidad que un lago, y por eso a partir de cierto frío la sal deja de servir: hay un límite.', en: 'Dissolving something in water lowers its freezing point. It is why the sea does not freeze as readily as a lake, and why below a certain cold salt stops working.', ca: 'Dissoldre alguna cosa a l\'aigua li baixa el punt de congelació.' }),

  q('ds-24', 'eso',
    { es: 'Al hacer una infusión, ¿qué papel tiene el agua caliente?', en: 'When making tea, what role does the hot water play?', ca: 'En fer una infusió, quin paper té l\'aigua calenta?' },
    { es: ['Es el disolvente, y en caliente extrae más deprisa las sustancias de la planta', 'Es el soluto', 'Solo sirve para calentar la taza', 'Impide que se disuelva nada'], en: ['It is the solvent, and hot it extracts the plant\'s substances faster', 'It is the solute', 'It only warms the cup', 'It stops anything dissolving'], ca: ['És el dissolvent, i en calent extreu més de pressa les substàncies de la planta', 'És el solut', 'Només serveix per escalfar la tassa', 'Impedeix que es dissolgui res'] },
    { es: 'Es el disolvente, y en caliente extrae más deprisa las sustancias de la planta', en: 'It is the solvent, and hot it extracts the plant\'s substances faster', ca: 'És el dissolvent, i en calent extreu més de pressa les substàncies de la planta' },
    '🍵',
    { es: 'Una infusión es una disolución hecha en casa: por eso el té frío tarda horas y el caliente, minutos. Y por eso el resultado cambia si te pasas de temperatura o de tiempo.', en: 'An infusion is a home-made solution: cold-brew tea takes hours and hot tea minutes. Which is why the result changes with temperature and time.', ca: 'Una infusió és una dissolució feta a casa: per això el te fred triga hores i el calent, minuts.' }),

  q('ds-25', 'eso',
    { es: 'Al preparar una disolución, ¿el volumen final es la suma exacta de los volúmenes que mezclas?', en: 'When preparing a solution, is the final volume the exact sum of the volumes you mix?', ca: 'En preparar una dissolució, el volum final és la suma exacta dels volums que mescles?' },
    { es: ['No siempre: las partículas se acomodan entre sí y el total puede ser algo menor', 'Sí, siempre exactamente', 'No, siempre es mayor', 'Depende del color del soluto'], en: ['Not always: the particles fit between each other and the total can be slightly less', 'Yes, always exactly', 'No, it is always greater', 'It depends on the solute\'s colour'], ca: ['No sempre: les partícules s\'acomoden entre si i el total pot ser una mica menor', 'Sí, sempre exactament', 'No, sempre és major', 'Depèn del color del solut'] },
    { es: 'No siempre: las partículas se acomodan entre sí y el total puede ser algo menor', en: 'Not always: the particles fit between each other and the total can be slightly less', ca: 'No sempre: les partícules s\'acomoden entre si i el total pot ser una mica menor' },
    '🧫',
    { es: 'Las partículas del soluto se meten en los huecos entre las del disolvente, como la arena entre las piedras. Por eso la concentración se define sobre el volumen de DISOLUCIÓN medido al final, no sobre la suma.', en: 'Solute particles slot into the gaps between solvent ones, like sand between stones. That is why concentration is defined over the SOLUTION volume measured at the end.', ca: 'Les partícules del solut es fiquen als buits entre les del dissolvent, com la sorra entre les pedres.' }),

]

export const PREGUNTAS_PRIMARIA = PREGUNTAS.filter(p => p.nivel === 'primaria')
// El nivel alto usa el banco ENTERO: quien va por ESO también responde las de
// primaria, y filtrando aquí el examen se quedaría en 20 preguntas.
export const PREGUNTAS_ESO = PREGUNTAS
