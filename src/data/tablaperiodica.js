// Elementos de la tabla periódica
// nivel: qué cursos trabajan este elemento (primaria / eso / bachillerato)
// tipo: categoría del elemento (para color y pista)

export const TIPOS = {
  'gas-noble':            { label: 'Gas noble',             labelEn: 'Noble gas',          labelCa: 'Gas noble',            color: 'from-violet-600 to-purple-700' },
  'halogeno':             { label: 'Halógeno',              labelEn: 'Halogen',             labelCa: 'Halogen',              color: 'from-green-600 to-emerald-700' },
  'no-metal':             { label: 'No metal',              labelEn: 'Non-metal',           labelCa: 'No metall',            color: 'from-teal-600 to-cyan-700'     },
  'semimetal':            { label: 'Semimetal',             labelEn: 'Metalloid',           labelCa: 'Semimetall',           color: 'from-lime-600 to-green-700'    },
  'metal-alcalino':       { label: 'Metal alcalino',        labelEn: 'Alkali metal',        labelCa: 'Metall alcalí',        color: 'from-orange-600 to-red-700'    },
  'metal-alcalinotérreo': { label: 'Metal alcalinotérreo',  labelEn: 'Alkaline earth metal',labelCa: 'Metall alcalinoterri', color: 'from-amber-500 to-orange-600'  },
  'metal-transicion':     { label: 'Metal de transición',   labelEn: 'Transition metal',    labelCa: 'Metall de transició',  color: 'from-blue-600 to-indigo-700'   },
  'otro-metal':           { label: 'Metal del grupo p',     labelEn: 'Post-transition metal',labelCa: 'Metall del grup p',   color: 'from-slate-500 to-gray-700'    },
}

export const ELEMENTOS = [
  // Z=1–10
  { symbol:'H',  nombre:'Hidrógeno',  nombreEn:'Hydrogen',   nombreCa:'Hidrogen',    z:1,  grupo:1,  periodo:1, tipo:'no-metal',             niveles:['primaria','eso','bachillerato'] },
  { symbol:'He', nombre:'Helio',      nombreEn:'Helium',     nombreCa:'Heli',        z:2,  grupo:18, periodo:1, tipo:'gas-noble',             niveles:['primaria','eso','bachillerato'] },
  { symbol:'Li', nombre:'Litio',      nombreEn:'Lithium',    nombreCa:'Liti',        z:3,  grupo:1,  periodo:2, tipo:'metal-alcalino',        niveles:['eso','bachillerato'] },
  { symbol:'Be', nombre:'Berilio',    nombreEn:'Beryllium',  nombreCa:"Beril·li",    z:4,  grupo:2,  periodo:2, tipo:'metal-alcalinotérreo',  niveles:['bachillerato'] },
  { symbol:'B',  nombre:'Boro',       nombreEn:'Boron',      nombreCa:'Bor',         z:5,  grupo:13, periodo:2, tipo:'semimetal',             niveles:['eso','bachillerato'] },
  { symbol:'C',  nombre:'Carbono',    nombreEn:'Carbon',     nombreCa:'Carboni',     z:6,  grupo:14, periodo:2, tipo:'no-metal',             niveles:['primaria','eso','bachillerato'] },
  { symbol:'N',  nombre:'Nitrógeno',  nombreEn:'Nitrogen',   nombreCa:'Nitrogen',    z:7,  grupo:15, periodo:2, tipo:'no-metal',             niveles:['primaria','eso','bachillerato'] },
  { symbol:'O',  nombre:'Oxígeno',    nombreEn:'Oxygen',     nombreCa:'Oxigen',      z:8,  grupo:16, periodo:2, tipo:'no-metal',             niveles:['primaria','eso','bachillerato'] },
  { symbol:'F',  nombre:'Flúor',      nombreEn:'Fluorine',   nombreCa:'Fluor',       z:9,  grupo:17, periodo:2, tipo:'halogeno',             niveles:['eso','bachillerato'] },
  { symbol:'Ne', nombre:'Neón',       nombreEn:'Neon',       nombreCa:'Neó',         z:10, grupo:18, periodo:2, tipo:'gas-noble',             niveles:['eso','bachillerato'] },
  // Z=11–20
  { symbol:'Na', nombre:'Sodio',      nombreEn:'Sodium',     nombreCa:'Sodi',        z:11, grupo:1,  periodo:3, tipo:'metal-alcalino',        niveles:['primaria','eso','bachillerato'] },
  { symbol:'Mg', nombre:'Magnesio',   nombreEn:'Magnesium',  nombreCa:'Magnesi',     z:12, grupo:2,  periodo:3, tipo:'metal-alcalinotérreo',  niveles:['eso','bachillerato'] },
  { symbol:'Al', nombre:'Aluminio',   nombreEn:'Aluminum',   nombreCa:'Alumini',     z:13, grupo:13, periodo:3, tipo:'otro-metal',            niveles:['primaria','eso','bachillerato'] },
  { symbol:'Si', nombre:'Silicio',    nombreEn:'Silicon',    nombreCa:'Silici',      z:14, grupo:14, periodo:3, tipo:'semimetal',             niveles:['eso','bachillerato'] },
  { symbol:'P',  nombre:'Fósforo',    nombreEn:'Phosphorus', nombreCa:'Fòsfor',      z:15, grupo:15, periodo:3, tipo:'no-metal',             niveles:['eso','bachillerato'] },
  { symbol:'S',  nombre:'Azufre',     nombreEn:'Sulfur',     nombreCa:'Sofre',       z:16, grupo:16, periodo:3, tipo:'no-metal',             niveles:['eso','bachillerato'] },
  { symbol:'Cl', nombre:'Cloro',      nombreEn:'Chlorine',   nombreCa:'Clor',        z:17, grupo:17, periodo:3, tipo:'halogeno',             niveles:['eso','bachillerato'] },
  { symbol:'Ar', nombre:'Argón',      nombreEn:'Argon',      nombreCa:'Argó',        z:18, grupo:18, periodo:3, tipo:'gas-noble',             niveles:['eso','bachillerato'] },
  { symbol:'K',  nombre:'Potasio',    nombreEn:'Potassium',  nombreCa:'Potassi',     z:19, grupo:1,  periodo:4, tipo:'metal-alcalino',        niveles:['eso','bachillerato'] },
  { symbol:'Ca', nombre:'Calcio',     nombreEn:'Calcium',    nombreCa:'Calci',       z:20, grupo:2,  periodo:4, tipo:'metal-alcalinotérreo',  niveles:['primaria','eso','bachillerato'] },
  // Metales de transición comunes
  { symbol:'Ti', nombre:'Titanio',    nombreEn:'Titanium',   nombreCa:'Titani',      z:22, grupo:4,  periodo:4, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Cr', nombre:'Cromo',      nombreEn:'Chromium',   nombreCa:'Crom',        z:24, grupo:6,  periodo:4, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Mn', nombre:'Manganeso',  nombreEn:'Manganese',  nombreCa:'Manganès',    z:25, grupo:7,  periodo:4, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Fe', nombre:'Hierro',     nombreEn:'Iron',       nombreCa:'Ferro',       z:26, grupo:8,  periodo:4, tipo:'metal-transicion',      niveles:['primaria','eso','bachillerato'] },
  { symbol:'Co', nombre:'Cobalto',    nombreEn:'Cobalt',     nombreCa:'Cobalt',      z:27, grupo:9,  periodo:4, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Ni', nombre:'Níquel',     nombreEn:'Nickel',     nombreCa:'Níquel',      z:28, grupo:10, periodo:4, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Cu', nombre:'Cobre',      nombreEn:'Copper',     nombreCa:'Coure',       z:29, grupo:11, periodo:4, tipo:'metal-transicion',      niveles:['primaria','eso','bachillerato'] },
  { symbol:'Zn', nombre:'Zinc',       nombreEn:'Zinc',       nombreCa:'Zinc',        z:30, grupo:12, periodo:4, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  // Otros importantes
  { symbol:'Br', nombre:'Bromo',      nombreEn:'Bromine',    nombreCa:'Brom',        z:35, grupo:17, periodo:4, tipo:'halogeno',             niveles:['eso','bachillerato'] },
  { symbol:'Ag', nombre:'Plata',      nombreEn:'Silver',     nombreCa:'Plata',       z:47, grupo:11, periodo:5, tipo:'metal-transicion',      niveles:['primaria','eso','bachillerato'] },
  { symbol:'Sn', nombre:'Estaño',     nombreEn:'Tin',        nombreCa:'Estany',      z:50, grupo:14, periodo:5, tipo:'otro-metal',            niveles:['eso','bachillerato'] },
  { symbol:'I',  nombre:'Yodo',       nombreEn:'Iodine',     nombreCa:'Iode',        z:53, grupo:17, periodo:5, tipo:'halogeno',             niveles:['eso','bachillerato'] },
  { symbol:'Ba', nombre:'Bario',      nombreEn:'Barium',     nombreCa:'Bari',        z:56, grupo:2,  periodo:6, tipo:'metal-alcalinotérreo',  niveles:['eso','bachillerato'] },
  { symbol:'Au', nombre:'Oro',        nombreEn:'Gold',       nombreCa:'Or',          z:79, grupo:11, periodo:6, tipo:'metal-transicion',      niveles:['primaria','eso','bachillerato'] },
  { symbol:'Hg', nombre:'Mercurio',   nombreEn:'Mercury',    nombreCa:'Mercuri',     z:80, grupo:12, periodo:6, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Pb', nombre:'Plomo',      nombreEn:'Lead',       nombreCa:'Plom',        z:82, grupo:14, periodo:6, tipo:'otro-metal',            niveles:['eso','bachillerato'] },

  // Resto de los periodos 4-6, para que Encuentra el Elemento (juego de
  // tabla periódica) enseñe la tabla completa hasta el Radón (Z=86) en vez
  // de dejar huecos donde SÍ hay elemento real — el bloque f (lantánidos
  // 57-71 y actínidos 89-103) se queda fuera a propósito, simplificado
  // como en cualquier tabla periódica de instituto (ver TablaPeriodicaGrid.jsx,
  // celda especial en grupo 3 · periodo 6). Ninguno de estos entra en
  // `niveles: primaria` — el pool de Primaria se queda igual que antes (12
  // elementos cotidianos); estos son ESO/Bachillerato.
  // Periodo 4 (huecos: Sc, V, Ga, Ge, As, Se, Kr)
  { symbol:'Sc', nombre:'Escandio',   nombreEn:'Scandium',   nombreCa:'Escandi',     z:21, grupo:3,  periodo:4, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'V',  nombre:'Vanadio',    nombreEn:'Vanadium',   nombreCa:'Vanadi',      z:23, grupo:5,  periodo:4, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Ga', nombre:'Galio',      nombreEn:'Gallium',    nombreCa:'Gal·li',      z:31, grupo:13, periodo:4, tipo:'otro-metal',            niveles:['bachillerato'] },
  { symbol:'Ge', nombre:'Germanio',   nombreEn:'Germanium',  nombreCa:'Germani',     z:32, grupo:14, periodo:4, tipo:'semimetal',             niveles:['bachillerato'] },
  { symbol:'As', nombre:'Arsénico',   nombreEn:'Arsenic',    nombreCa:'Arsènic',     z:33, grupo:15, periodo:4, tipo:'semimetal',             niveles:['eso','bachillerato'] },
  { symbol:'Se', nombre:'Selenio',    nombreEn:'Selenium',   nombreCa:'Seleni',      z:34, grupo:16, periodo:4, tipo:'no-metal',              niveles:['bachillerato'] },
  { symbol:'Kr', nombre:'Kriptón',    nombreEn:'Krypton',    nombreCa:'Kriptó',      z:36, grupo:18, periodo:4, tipo:'gas-noble',             niveles:['eso','bachillerato'] },
  // Periodo 5 (completo salvo Ag/Sn/I, ya en la tabla)
  { symbol:'Rb', nombre:'Rubidio',    nombreEn:'Rubidium',   nombreCa:'Rubidi',      z:37, grupo:1,  periodo:5, tipo:'metal-alcalino',        niveles:['bachillerato'] },
  { symbol:'Sr', nombre:'Estroncio',  nombreEn:'Strontium',  nombreCa:'Estronci',    z:38, grupo:2,  periodo:5, tipo:'metal-alcalinotérreo',  niveles:['bachillerato'] },
  { symbol:'Y',  nombre:'Itrio',      nombreEn:'Yttrium',    nombreCa:'Itri',        z:39, grupo:3,  periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Zr', nombre:'Circonio',   nombreEn:'Zirconium',  nombreCa:'Zirconi',     z:40, grupo:4,  periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Nb', nombre:'Niobio',     nombreEn:'Niobium',    nombreCa:'Niobi',       z:41, grupo:5,  periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Mo', nombre:'Molibdeno',  nombreEn:'Molybdenum', nombreCa:'Molibdè',     z:42, grupo:6,  periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Tc', nombre:'Tecnecio',   nombreEn:'Technetium', nombreCa:'Tecneci',     z:43, grupo:7,  periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Ru', nombre:'Rutenio',    nombreEn:'Ruthenium',  nombreCa:'Ruteni',      z:44, grupo:8,  periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Rh', nombre:'Rodio',      nombreEn:'Rhodium',    nombreCa:'Rodi',        z:45, grupo:9,  periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Pd', nombre:'Paladio',    nombreEn:'Palladium',  nombreCa:'Pal·ladi',    z:46, grupo:10, periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Cd', nombre:'Cadmio',     nombreEn:'Cadmium',    nombreCa:'Cadmi',       z:48, grupo:12, periodo:5, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'In', nombre:'Indio',      nombreEn:'Indium',     nombreCa:'Indi',        z:49, grupo:13, periodo:5, tipo:'otro-metal',            niveles:['bachillerato'] },
  { symbol:'Sb', nombre:'Antimonio',  nombreEn:'Antimony',   nombreCa:'Antimoni',    z:51, grupo:15, periodo:5, tipo:'semimetal',             niveles:['bachillerato'] },
  { symbol:'Te', nombre:'Telurio',    nombreEn:'Tellurium',  nombreCa:'Tel·luri',    z:52, grupo:16, periodo:5, tipo:'semimetal',             niveles:['bachillerato'] },
  { symbol:'Xe', nombre:'Xenón',      nombreEn:'Xenon',      nombreCa:'Xenó',        z:54, grupo:18, periodo:5, tipo:'gas-noble',             niveles:['eso','bachillerato'] },
  // Periodo 6 (completo salvo Ba/Au/Hg/Pb, ya en la tabla; grupo 3 es el
  // hueco de los lantánidos, sin dato — ver la celda especial del grid)
  { symbol:'Cs', nombre:'Cesio',      nombreEn:'Cesium',     nombreCa:'Cesi',        z:55, grupo:1,  periodo:6, tipo:'metal-alcalino',        niveles:['bachillerato'] },
  { symbol:'Hf', nombre:'Hafnio',     nombreEn:'Hafnium',    nombreCa:'Hafni',       z:72, grupo:4,  periodo:6, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Ta', nombre:'Tántalo',    nombreEn:'Tantalum',   nombreCa:'Tàntal',      z:73, grupo:5,  periodo:6, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'W',  nombre:'Wolframio',  nombreEn:'Tungsten',   nombreCa:'Wolfram',     z:74, grupo:6,  periodo:6, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Re', nombre:'Renio',      nombreEn:'Rhenium',    nombreCa:'Reni',        z:75, grupo:7,  periodo:6, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Os', nombre:'Osmio',      nombreEn:'Osmium',     nombreCa:'Osmi',        z:76, grupo:8,  periodo:6, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Ir', nombre:'Iridio',     nombreEn:'Iridium',    nombreCa:'Iridi',       z:77, grupo:9,  periodo:6, tipo:'metal-transicion',      niveles:['bachillerato'] },
  { symbol:'Pt', nombre:'Platino',    nombreEn:'Platinum',   nombreCa:'Platí',       z:78, grupo:10, periodo:6, tipo:'metal-transicion',      niveles:['eso','bachillerato'] },
  { symbol:'Tl', nombre:'Talio',      nombreEn:'Thallium',   nombreCa:'Tal·li',      z:81, grupo:13, periodo:6, tipo:'otro-metal',            niveles:['bachillerato'] },
  { symbol:'Bi', nombre:'Bismuto',    nombreEn:'Bismuth',    nombreCa:'Bismut',      z:83, grupo:15, periodo:6, tipo:'otro-metal',            niveles:['bachillerato'] },
  { symbol:'Po', nombre:'Polonio',    nombreEn:'Polonium',   nombreCa:'Poloni',      z:84, grupo:16, periodo:6, tipo:'otro-metal',            niveles:['bachillerato'] },
  { symbol:'At', nombre:'Astato',     nombreEn:'Astatine',   nombreCa:'Àstat',       z:85, grupo:17, periodo:6, tipo:'halogeno',             niveles:['bachillerato'] },
  { symbol:'Rn', nombre:'Radón',      nombreEn:'Radon',      nombreCa:'Radó',        z:86, grupo:18, periodo:6, tipo:'gas-noble',             niveles:['eso','bachillerato'] },
]

export const NOMBRES_ELEMENTOS    = ELEMENTOS.map(e => e.nombre)
export const NOMBRES_ELEMENTOS_EN = ELEMENTOS.map(e => e.nombreEn)
export const NOMBRES_ELEMENTOS_CA = ELEMENTOS.map(e => e.nombreCa)
