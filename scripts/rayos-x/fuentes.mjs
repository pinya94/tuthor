// Fuentes de las ilustraciones de Rayos X (public/rayos-x/). Cada fichero se
// comprobó a mano en su página de origen (licencia y autor) el 2026-11-28.
// Los originales NO van al repositorio: se guardan en .auditoria/rayos-x/fuentes
// (fuera de git) y construir.mjs los lee de ahí. `sha256` fija la versión exacta
// usada: si alguien vuelve a descargar un fichero distinto, el build avisa.

const SERVIER = { autor: 'Servier Medical Art (Servier)', licencia: 'CC BY 4.0', licenciaUrl: 'https://creativecommons.org/licenses/by/4.0/' }

export const FUENTES = {
  'skeleton_front_nolabels.svg': {
    titulo: 'Human skeleton front - no labels.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Human_skeleton_front_-_no_labels.svg',
    pagina: 'https://commons.wikimedia.org/wiki/File:Human_skeleton_front_-_no_labels.svg',
    autor: 'Mikael Häggström, a partir de «Human skeleton front en.svg» de LadyofHats (Mariana Ruiz Villarreal)',
    licencia: 'Dominio público', licenciaUrl: 'https://commons.wikimedia.org/wiki/File:Human_skeleton_front_-_no_labels.svg',
  },
  'muscles_front_and_back.svg': {
    titulo: 'Muscles front and back.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Muscles_front_and_back.svg',
    pagina: 'https://commons.wikimedia.org/wiki/File:Muscles_front_and_back.svg',
    autor: 'OpenStax, Tomáš Kebert y umimeto.org',
    licencia: 'CC BY-SA 4.0', licenciaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  'silhouette_neutral_front.svg': {
    titulo: 'Human silhouette gender neutral front.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Human_silhouette_gender_neutral_front.svg',
    pagina: 'https://commons.wikimedia.org/wiki/File:Human_silhouette_gender_neutral_front.svg',
    autor: 'Sebastian Wallroth',
    licencia: 'CC0 1.0', licenciaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  'respiratory_system_complete_en.svg': {
    titulo: 'Respiratory system complete en.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Respiratory_system_complete_en.svg',
    pagina: 'https://commons.wikimedia.org/wiki/File:Respiratory_system_complete_en.svg',
    autor: 'LadyofHats (Mariana Ruiz Villarreal) y Jmarchn',
    licencia: 'Dominio público', licenciaUrl: 'https://commons.wikimedia.org/wiki/File:Respiratory_system_complete_en.svg',
  },
  'poumons_01.png': { ...SERVIER, titulo: 'Lungs', url: 'https://smart.servier.com/wp-content/uploads/2016/10/poumons_01.png', pagina: 'https://smart.servier.com/smart_image/lungs-11/' },
  'Larynx.png': { ...SERVIER, titulo: 'Larynx front view', url: 'https://smart.servier.com/wp-content/uploads/2016/10/Larynx.png', pagina: 'https://smart.servier.com/smart_image/larynx-front-view/' },
  'coeur.png': { ...SERVIER, titulo: 'Heart', url: 'https://smart.servier.com/wp-content/uploads/2016/10/coeur.png', pagina: 'https://smart.servier.com/smart_image/heart/' },
  'foie.png': { ...SERVIER, titulo: 'Liver', url: 'https://smart.servier.com/wp-content/uploads/2016/10/foie.png', pagina: 'https://smart.servier.com/smart_image/liver/' },
  'estomac.png': { ...SERVIER, titulo: 'Stomach overview', url: 'https://smart.servier.com/wp-content/uploads/2016/10/estomac.png', pagina: 'https://smart.servier.com/smart_image/stomach-overview/' },
  'intestin.png': { ...SERVIER, titulo: 'Intestine overview', url: 'https://smart.servier.com/wp-content/uploads/2016/10/intestin.png', pagina: 'https://smart.servier.com/smart_image/intestine-overview/' },
  'colon.png': { ...SERVIER, titulo: 'Colon', url: 'https://smart.servier.com/wp-content/uploads/2016/10/colon.png', pagina: 'https://smart.servier.com/smart_image/colon/' },
  'App_urinaire_homme.png': { ...SERVIER, titulo: 'Urinary tract overview', url: 'https://smart.servier.com/wp-content/uploads/2016/10/App_urinaire_homme.png', pagina: 'https://smart.servier.com/smart_image/urinary-tract-overview/' },
  'vessie.png': { ...SERVIER, titulo: 'Bladder', url: 'https://smart.servier.com/wp-content/uploads/2016/10/vessie.png', pagina: 'https://smart.servier.com/smart_image/bladder/' },
  'cerveau_09.png': { ...SERVIER, titulo: 'Brain section (coronal)', url: 'https://smart.servier.com/wp-content/uploads/2016/10/cerveau_09.png', pagina: 'https://smart.servier.com/smart_image/smart-section-brain/' },
  'oeil_02.png': { ...SERVIER, titulo: 'Eye view', url: 'https://smart.servier.com/wp-content/uploads/2016/10/oeil_02.png', pagina: 'https://smart.servier.com/smart_image/eye-view/' },
  'oral-cavity.png': { ...SERVIER, titulo: 'Oral cavity', url: 'https://smart.servier.com/wp-content/uploads/2017/03/oral-cavity.png', pagina: 'https://smart.servier.com/smart_image/oral-cavity/' },
}
