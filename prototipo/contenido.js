/* =====================================================================
   CONTENIDO DE LA CAPACITACIÓN
   ---------------------------------------------------------------------
   Este archivo imita lo que después vivirá en Google Sheets.
   Para cambiar textos, lecciones, preguntas o imágenes, edita SOLO aquí.

   Tipos de bloque disponibles dentro de una pantalla:
     P(texto, destacado?)         → párrafo
     CITA(texto)                  → cita grande
     NOTA(título, texto)          → recuadro informativo
     VIDEO(título)                → espacio para video H5P
     IMG(ruta, alt, pie?)         → imagen (ruta dentro de /img)
     LINEA_TIEMPO()               → línea del tiempo interactiva
     DOS(tituloA, textoA, tituloB, textoB) → dos columnas
     PENDIENTE(texto)             → aviso de contenido en preparación
   ===================================================================== */

function P(t, destacado) { return { tipo: 'p', t: t, destacado: !!destacado }; }
function CITA(t) { return { tipo: 'cita', t: t }; }
function NOTA(titulo, t) { return { tipo: 'nota', titulo: titulo, t: t }; }
function VIDEO(t) { return { tipo: 'video', t: t }; }
function IMG(src, alt, pie) { return { tipo: 'img', src: src, alt: alt, pie: pie || '' }; }
function LINEA_TIEMPO() { return { tipo: 'linea' }; }
function DOS(a, b, c, d) { return { tipo: 'dos', at: a, ab: b, bt: c, bb: d }; }
function PENDIENTE(t) { return { tipo: 'pendiente', t: t }; }
function PREG(q, opciones, correcta, retro) { return { q: q, opts: opciones, ans: correcta, fb: retro }; }

const USUARIO = { nombre: 'Ana Martínez', area: 'Grupos Focalizados', centro: 'CAIPA Estatal', puesto: 'Psicóloga' };

const AJUSTES = { preguntasPorIntento: 8, minimoAprobatorio: 85, intentos: 2 };

/* Datos fijos de la constancia (RELLENO: emisor, firmante y cargo pendientes) */
const CONSTANCIA = {
  emisor: 'Lorem ipsum dolor sit amet',
  emisor2: 'consectetur adipiscing elit sed do eiusmod tempor incididunt',
  curso: 'Capacitación General del Modelo CAIPA',
  modalidad: 'Modalidad en línea a través de la Plataforma de Capacitación CAIPA',
  firmante: 'Lorem Ipsum Dolor',
  cargo: 'Lorem ipsum dolor sit amet',
  cargo2: 'consectetur adipiscing elit',
  ciudad: 'Monterrey, N.L.',
  logos: ['', '', ''],   // rutas de imagen, por ejemplo 'img/logos/caipa.png'
  firma: ''              // imagen de la firma escaneada (PNG con fondo transparente)
};

/* Ámbitos de la línea del tiempo y su color */
const AMBITOS = {
  'Internacional': { color: '#0E7C7B', suave: '#E0F2F1' },
  'Nacional':      { color: '#5B4B9A', suave: '#ECE9F6' },
  'Estatal':       { color: '#C25A0E', suave: '#FFE9D6' },
  'CAIPA':         { color: '#B0135A', suave: '#FCE4EF' }
};

/* img: ruta opcional dentro de /img (por ejemplo 'img/hitos/1989.jpg') */
const LINEA = [
  { fecha: '20/11/1989', anio: 1989, ambito: 'Internacional', clave: false, titulo: 'Convención sobre los Derechos del Niño', hito: 'La ONU adopta la Convención sobre los Derechos del Niño, que reconoce a niñas, niños y adolescentes como sujetos de derechos.' },
  { fecha: '14/12/1990', anio: 1990, ambito: 'Internacional', clave: false, titulo: 'Directrices de Riad', hito: 'Directrices de las Naciones Unidas para la Prevención de la Delincuencia Juvenil.' },
  { fecha: '24/12/1991', anio: 1991, ambito: 'Nacional', clave: false, titulo: 'Ley para el Tratamiento de Menores Infractores', hito: 'Ley para el Tratamiento de Menores Infractores para el Distrito Federal en materia común y para toda la República en materia federal.' },
  { fecha: '29/05/2000', anio: 2000, ambito: 'Nacional', clave: false, titulo: 'Ley de Protección de Derechos de NNA', hito: 'Ley para la Protección de los Derechos de Niñas, Niños y Adolescentes.' },
  { fecha: '12/12/2005', anio: 2005, ambito: 'Nacional', clave: true, titulo: 'Reforma al artículo 18 constitucional', hito: 'Reforma al artículo 18 constitucional en materia de derechos de niñas, niños y adolescentes: ordena crear sistemas especializados de justicia para adolescentes.' },
  { fecha: '10/09/2006', anio: 2006, ambito: 'Estatal', clave: true, titulo: 'Ley del Sistema Especial de Justicia para Adolescentes de N.L.', hito: 'Ley del Sistema Especial de Justicia para Adolescentes del Estado de Nuevo León.' },
  { fecha: '22/09/2008', anio: 2008, ambito: 'Estatal', clave: false, titulo: 'Ley de Seguridad Pública de N.L.', hito: 'Ley de Seguridad Pública para el Estado de Nuevo León (Sistema Especializado para la Atención Integral de Niñas, Niños y Adolescentes Infractores).' },
  { fecha: '27/01/2014', anio: 2014, ambito: 'CAIPA', clave: true, titulo: 'Inicia operaciones el CAIPA', hito: 'Inician operaciones el CAIPA Estatal y los CAIPA Municipales.' },
  { fecha: '16/06/2016', anio: 2016, ambito: 'Nacional', clave: true, titulo: 'Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes', hito: 'Se publica la ley que rige el sistema de justicia penal para adolescentes en todo el país.' },
  { fecha: '02/10/2021', anio: 2021, ambito: 'Estatal', clave: false, titulo: 'Ley Orgánica de la Administración Pública de N.L.', hito: 'Ley Orgánica de la Administración Pública para el Estado de Nuevo León (SSP-SII).' },
  { fecha: '26/01/2022', anio: 2022, ambito: 'Estatal', clave: false, titulo: 'Cambio de adscripción SSP-SII', hito: 'Cambio de adscripción SSP-SII, artículo 22 del Reglamento Interior.' }
];

function moduloVacio(corto, titulo, color, icono, titulos) {
  return {
    corto: corto, titulo: titulo, color: color, icono: icono,
    lecciones: titulos.map(function (t) {
      return { titulo: t, obj: '', dur: '', pantallas: [{ titulo: t, bloques: [PENDIENTE('El contenido de esta lección está en preparación. En el prototipo puedes continuar para ver cómo avanza la capacitación.')] }], ideas: [] };
    }),
    reflexion: [], banco: []
  };
}

const MODULOS = [
  {
    corto: 'Antecedentes y fundamentos', titulo: 'Antecedentes y fundamentos del Modelo CAIPA', color: '#D96D16', icono: 'balanza',
    lecciones: [
      {
        titulo: 'Contexto y problemática que da origen a la estrategia',
        obj: 'explicar por qué surge el CAIPA y qué tipo de estrategia de prevención es.', dur: '10 min',
        pantallas: [
          { titulo: '¿Por qué surge el CAIPA?', bloques: [
            P('No es una ocurrencia. No es un proyecto político.', true),
            P('El CAIPA surge como la respuesta del Estado ante las lagunas que se generaron con el cambio al Sistema de Justicia de Adolescentes en 2006.'),
            IMG('', 'Fotografía de adolescentes en una actividad del CAIPA', 'Espacio para fotografía institucional (agrégala en /img y escribe la ruta en contenido.js).')
          ] },
          { titulo: '¿Qué tipo de estrategia es?', bloques: [
            P('Se trata de una estrategia de prevención secundaria y terciaria para coadyuvar con los Sistemas de Justicia Cívica y Penal para Adolescentes.'),
            P('Es una acción enfocada a promover el desarrollo integral de las personas adolescentes y evitar su escalamiento delictivo.', true),
            NOTA('Para relacionar', 'La prevención secundaria se dirige a adolescentes en situación de riesgo; la prevención terciaria, a adolescentes que ya tuvieron contacto con la ley, para evitar que su conducta escale. Estos dos grupos corresponden a la población que atiende el CAIPA, que se revisa en la Lección 2.4, Fuentes de canalización.')
          ] },
          { titulo: 'Video: contexto y problemática', bloques: [VIDEO('Contexto y problemática que da origen a la estrategia')] }
        ],
        ideas: [
          'El CAIPA es una respuesta del Estado a las lagunas que dejó el cambio al Sistema de Justicia de Adolescentes en 2006.',
          'Es una estrategia de prevención secundaria y terciaria.',
          'Coadyuva con los Sistemas de Justicia Cívica y Penal para Adolescentes.',
          'Su propósito es promover el desarrollo integral de las personas adolescentes y evitar su escalamiento delictivo.'
        ]
      },
      {
        titulo: 'Línea del tiempo del marco jurídico',
        obj: 'identificar los principales instrumentos internacionales, nacionales y estatales que dieron origen al CAIPA, en orden cronológico.', dur: '10 min',
        pantallas: [
          { titulo: 'Más de tres décadas de cambios', bloques: [
            P('La creación del CAIPA es el resultado de una serie de instrumentos internacionales, reformas nacionales y leyes estatales que, a lo largo de más de tres décadas, reconocieron a niñas, niños y adolescentes como sujetos de derechos y establecieron sistemas especializados de justicia para adolescentes.'),
            P('En la siguiente pantalla recorre la línea del tiempo para conocer cada hito.', true)
          ] },
          { titulo: 'Línea del tiempo del marco jurídico', bloques: [LINEA_TIEMPO()] }
        ],
        ideas: [
          'Los antecedentes internacionales son la Convención sobre los Derechos del Niño (1989) y las Directrices de Riad (1990).',
          'La reforma al artículo 18 constitucional (2005) ordenó crear sistemas especializados de justicia para adolescentes.',
          'En Nuevo León, el sistema especial se establece con la ley estatal de 2006.',
          'El CAIPA Estatal y los CAIPA Municipales iniciaron operaciones el 27 de enero de 2014.',
          'Desde 2016, la Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes rige este sistema en todo el país.'
        ]
      },
      {
        titulo: 'Objetivo, misión y visión',
        obj: 'describir el objetivo, la misión y la visión del CAIPA y relacionarlos con tu función.', dur: '5 min',
        pantallas: [
          { titulo: 'Objetivo del Centro de Atención Integral para Adolescentes', bloques: [
            CITA('Incrementar los factores de protección a nivel personal y familiar en adolescentes de 12 a 18 años del Estado de Nuevo León, que se encuentren en situación de riesgo o que hayan sido referidos por la comisión de una falta administrativa o conducta delictiva, para promover su desarrollo integral y prevenir el contacto con los Sistemas de Justicia Penal y de Justicia Cívica.')
          ] },
          { titulo: 'Misión y visión', bloques: [
            DOS('Misión', 'Brindar una intervención especializada e integral que favorezca el fortalecimiento de los factores de protección de las y los adolescentes y sus familias, disminuyendo los factores de propensión a la violencia, generando agentes de cambio.',
                'Visión', 'Ser un Centro único con un modelo especializado en atención a las adolescencias en riesgo y contacto con la ley a nivel nacional, con perspectiva de juventud, de género y derechos humanos, que coadyuve al bienestar, reintegración y a la transformación de las y los adolescentes.')
          ] }
        ],
        ideas: [
          'El CAIPA atiende a adolescentes de 12 a 18 años de Nuevo León, en situación de riesgo o referidos por una falta administrativa o conducta delictiva.',
          'Su objetivo es incrementar los factores de protección a nivel personal y familiar.',
          'Su misión es brindar una intervención especializada e integral, que disminuya los factores de propensión a la violencia y genere agentes de cambio.',
          'Su visión incorpora las perspectivas de juventud, de género y de derechos humanos.'
        ]
      }
    ],
    reflexion: [
      '¿Por qué es importante entender el CAIPA como una respuesta del Estado y no como un proyecto político?',
      'De los hitos de la línea del tiempo, ¿cuál consideras que tuvo mayor impacto en la forma en que hoy se atiende a las personas adolescentes? ¿Por qué?',
      '¿Cómo se relaciona tu función dentro del CAIPA con el objetivo de incrementar los factores de protección a nivel personal y familiar?'
    ],
    banco: [
      PREG('¿A qué responde la creación del CAIPA?', ['A una iniciativa impulsada por un partido político.', 'A las lagunas que se generaron con el cambio al Sistema de Justicia de Adolescentes en 2006.', 'A la entrada en vigor de la Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes.', 'A la necesidad de sustituir a los centros de internamiento.'], 1, 'El CAIPA surge como respuesta del Estado ante las lagunas que dejó el cambio al Sistema de Justicia de Adolescentes en 2006. No es una ocurrencia ni un proyecto político.'),
      PREG('¿Qué tipo de estrategia de prevención es el CAIPA?', ['Primaria.', 'Primaria y secundaria.', 'Secundaria y terciaria.', 'Únicamente terciaria.'], 2, 'El CAIPA es una estrategia de prevención secundaria y terciaria: atiende tanto a adolescentes en riesgo como a quienes ya tuvieron contacto con la ley.'),
      PREG('¿Con qué sistemas coadyuva el CAIPA?', ['Con los Sistemas de Justicia Cívica y Penal para Adolescentes.', 'Con el Sistema Penitenciario para personas adultas.', 'Con el Sistema Estatal de Salud.', 'Con el Sistema Educativo Estatal.'], 0, 'El CAIPA coadyuva con los Sistemas de Justicia Cívica y Penal para Adolescentes.'),
      PREG('Además de prevenir, ¿qué busca la acción del CAIPA?', ['Sancionar las faltas administrativas de las personas adolescentes.', 'Promover el desarrollo integral de las personas adolescentes y evitar su escalamiento delictivo.', 'Sustituir la intervención de los juzgados especializados.', 'Dar seguimiento a las medidas de internamiento.'], 1, 'El CAIPA es una acción enfocada a promover el desarrollo integral de las personas adolescentes y evitar su escalamiento delictivo.'),
      PREG('¿Qué reforma constitucional ordenó la creación de sistemas especializados de justicia para adolescentes?', ['La reforma al artículo 1.º constitucional.', 'La reforma al artículo 4.º constitucional.', 'La reforma al artículo 18 constitucional.', 'La reforma al artículo 21 constitucional.'], 2, 'La reforma al artículo 18 constitucional, del 12 de diciembre de 2005, dio origen a los sistemas especializados de justicia para adolescentes.'),
      PREG('¿En qué año iniciaron operaciones el CAIPA Estatal y los CAIPA Municipales?', ['2006', '2008', '2014', '2016'], 2, 'El CAIPA Estatal y los CAIPA Municipales iniciaron operaciones el 27 de enero de 2014.'),
      PREG('¿Qué instrumento de las Naciones Unidas está enfocado en la prevención de la delincuencia juvenil?', ['La Convención sobre los Derechos del Niño.', 'Las Directrices de Riad.', 'La Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes.', 'La Ley para el Tratamiento de Menores Infractores.'], 1, 'Las Directrices de Riad (1990) son las Directrices de las Naciones Unidas para la Prevención de la Delincuencia Juvenil.'),
      PREG('¿Qué ley se publicó en 2016 y rige el sistema de justicia penal para adolescentes en todo el país?', ['La Ley para la Protección de los Derechos de Niñas, Niños y Adolescentes.', 'La Ley del Sistema Especial de Justicia para Adolescentes del Estado de Nuevo León.', 'La Ley de Seguridad Pública para el Estado de Nuevo León.', 'La Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes.'], 3, 'La Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes se publicó el 16 de junio de 2016.'),
      PREG('Según su objetivo, ¿a qué rango de edad dirige su atención el CAIPA?', ['De 10 a 17 años.', 'De 12 a 18 años.', 'De 12 a 21 años.', 'De 14 a 18 años.'], 1, 'El objetivo del CAIPA se dirige a adolescentes de 12 a 18 años del Estado de Nuevo León.'),
      PREG('¿Qué busca incrementar el CAIPA, según su objetivo?', ['La cobertura de los programas sociales del Estado.', 'Los factores de protección a nivel personal y familiar.', 'La aplicación de medidas sancionadoras.', 'El número de canalizaciones a servicios de salud.'], 1, 'El objetivo del CAIPA es incrementar los factores de protección a nivel personal y familiar, para promover el desarrollo integral y prevenir el contacto con los Sistemas de Justicia Penal y de Justicia Cívica.'),
      PREG('¿Qué perspectivas incorpora la visión del CAIPA?', ['De juventud, de género y de derechos humanos.', 'De salud pública, de seguridad y de género.', 'De derechos humanos, de justicia restaurativa y de salud.', 'De juventud, de seguridad pública y de familia.'], 0, 'La visión del CAIPA incorpora las perspectivas de juventud, de género y de derechos humanos.'),
      PREG('Según su misión, ¿qué factores busca disminuir la intervención del CAIPA?', ['Los factores de protección familiar.', 'Los factores de propensión a la violencia.', 'Los factores socioeconómicos del entorno.', 'Los factores de exclusión escolar.'], 1, 'La misión del CAIPA es fortalecer los factores de protección de las y los adolescentes y sus familias, disminuyendo los factores de propensión a la violencia.')
    ]
  },
  moduloVacio('Perfil y criterios de atención', 'Perfil de adolescentes y criterios de atención', '#B0135A', 'persona', ['Perspectiva de análisis de los y las adolescentes como sujetos vulnerables', 'Factores asociados al riesgo y factores de protección', 'Criterios de ingreso, derivación y canalización', 'Fuentes de canalización']),
  moduloVacio('Metodología del modelo', 'Metodología del modelo CAIPA', '#0E7C7B', 'capas', ['¿Qué es un modelo basado en evidencia?', 'Modelo RNR como fundamentación teórica', 'Teoría de cambio', 'Instrumentos de evaluación', 'Atención focalizada por niveles de riesgo']),
  moduloVacio('Proceso de atención y operación', 'Proceso de atención y operación del modelo CAIPA', '#5B4B9A', 'flujo', ['Flujograma de atención', 'Áreas de atención', 'Manuales generales de operatividad'])
];

/* Lista definitiva según la hoja DECISIONES (#12) */
const AREAS = [
  { nombre: 'Grupos Focalizados', icono: 'grupo' },
  { nombre: 'Bienestar y Familia', icono: 'corazon' },
  { nombre: 'Educación y Capacitación para la Vida', icono: 'birrete' },
  { nombre: 'Coordinación', icono: 'brujula' },
  { nombre: 'Informes', icono: 'documento' }
];
