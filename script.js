/* ============================================================
   Canarias Hoy — script.js
   Datos compartidos + lógica de la web pública
   ============================================================ */

const CAT_META = {
  festivos:    { label: 'Festivos',    emoji: '🎉', color: '#EF4444' },
  romerias:    { label: 'Romerías',    emoji: '🕯️', color: '#92400E' },
  carnavales:  { label: 'Carnavales',  emoji: '🎭', color: '#A855F7' },
  conciertos:  { label: 'Conciertos',  emoji: '🎵', color: '#0EA5E9' },
  mercadillos: { label: 'Mercadillos', emoji: '🛍️', color: '#22C55E' },
  deportes:    { label: 'Deportes',    emoji: '🏄', color: '#F97316' },
  orgullo:     { label: 'Orgullo',     emoji: '🏳️‍🌈', color: '#EC4899' },
};

const ISLA_META = {
  'Tenerife':      '🌋',
  'Gran Canaria':  '🏖️',
  'Lanzarote':     '🌋',
  'Fuerteventura': '🏜️',
  'La Palma':      '🌿',
  'La Gomera':     '🌲',
  'El Hierro':     '⚓',
};

/*
let eventos = [

  {
    id:1, nombre:'Gay Pride Maspalomas', isla:'Gran Canaria', cat:'orgullo',
    fecha:'2026-05-28', emoji:'🏳️‍🌈', color:'#EC4899', destacado:true,
    desc:'El mayor orgullo LGTBIQ+ de África y Canarias. Desfile, conciertos y días de fiesta en las dunas de Maspalomas. Una celebración única con más de 80.000 asistentes cada año.',
    ubicacion:'Dunas de Maspalomas, San Bartolomé de Tirajana', maps:'https://maps.google.com/?q=Dunas+de+Maspalomas',
    web:'https://maspalomaspride.com', entradas:'https://maspalomaspride.com/entradas',
    precio:'Gratuito (zona VIP desde 30€)', horario:'Del 28 mayo al 1 junio · Todo el día',
  },
  {
    id:2, nombre:'Noche de San Juan — Las Canteras', isla:'Gran Canaria', cat:'festivos',
    fecha:'2026-06-23', emoji:'🔥', color:'#EF4444', destacado:false,
    desc:'La noche más mágica del año. Hogueras, zambullidas en el mar y la tradición de pedir deseos en la playa de Las Canteras. Miles de personas se reúnen para celebrar el solsticio.',
    ubicacion:'Playa de Las Canteras, Las Palmas de Gran Canaria', maps:'https://maps.google.com/?q=Playa+Las+Canteras+Las+Palmas',
    web:'https://laspalmasgc.es', entradas:null,
    precio:'Gratuito', horario:'23 junio · 22:00h – amanecer',
  },
  {
    id:3, nombre:'Aitana — Gira Gran Canaria', isla:'Gran Canaria', cat:'conciertos',
    fecha:'2026-07-04', emoji:'🎤', color:'#0EA5E9', destacado:true,
    desc:'La artista más escuchada de España lleva su gira al Estadio de Gran Canaria. Una noche de pop inolvidable bajo las estrellas canarias con el mayor escenario de producción de su carrera.',
    ubicacion:'Estadio de Gran Canaria, Las Palmas de Gran Canaria', maps:'https://maps.google.com/?q=Estadio+Gran+Canaria',
    web:'https://livenation.es', entradas:'https://www.livenation.es/artist/aitana-tickets',
    precio:'Desde 45€', horario:'4 julio · Puertas 19:00h · Concierto 21:30h',
  },
  {
    id:4, nombre:'GRANCA Live Fest', isla:'Gran Canaria', cat:'conciertos',
    fecha:'2026-07-11', emoji:'🎸', color:'#0EA5E9', destacado:false,
    desc:'El festival multitudinario del verano canario. Artistas nacionales e internacionales en el sur de Gran Canaria con escenarios al aire libre, zona de food trucks y ambiente festivo de tres días.',
    ubicacion:'Recinto Ferial Sur, Maspalomas', maps:'https://maps.google.com/?q=Maspalomas+Gran+Canaria',
    web:'https://granclive.com', entradas:'https://granclive.com/entradas',
    precio:'Abono 3 días desde 85€', horario:'11–13 julio · 18:00h – 04:00h',
  },
  {
    id:5, nombre:'Bajada de la Rama — Agaete', isla:'Gran Canaria', cat:'romerias',
    fecha:'2026-08-04', emoji:'🌿', color:'#92400E', destacado:true,
    desc:'El ritual prehispánico más antiguo de Canarias. Miles de personas bajan al mar arrastrando ramas de pino al ritmo de los tambores guanche. Declarado Bien de Interés Cultural.',
    ubicacion:'Agaete, Gran Canaria', maps:'https://maps.google.com/?q=Agaete+Gran+Canaria',
    web:'https://agaete.es', entradas:null,
    precio:'Gratuito', horario:'4 agosto · Salida 10:00h desde el pinar',
  },
  {
    id:6, nombre:'Mercadillo Artesano de Teror', isla:'Gran Canaria', cat:'mercadillos',
    fecha:'2026-08-15', emoji:'🛍️', color:'#22C55E', destacado:false,
    desc:'El mercadillo más auténtico de Gran Canaria. Artesanía local, quesos, mojo, pan de Teror y el ambiente de pueblo más encantador. Coincide con la festividad de la Virgen del Pino.',
    ubicacion:'Casco histórico de Teror, Gran Canaria', maps:'https://maps.google.com/?q=Teror+Gran+Canaria',
    web:'https://teror.es', entradas:null,
    precio:'Gratuito', horario:'15 agosto · 09:00 – 21:00h',
  },
  {
    id:7, nombre:'Festival Womad Las Palmas', isla:'Gran Canaria', cat:'conciertos',
    fecha:'2026-10-30', emoji:'🌍', color:'#0EA5E9', destacado:true,
    desc:'El festival de músicas del mundo más importante de España llega a Las Palmas. Más de 30 artistas de 4 continentes en el incomparable marco del Parque Santa Catalina.',
    ubicacion:'Parque Santa Catalina, Las Palmas de Gran Canaria', maps:'https://maps.google.com/?q=Parque+Santa+Catalina+Las+Palmas',
    web:'https://womad.es', entradas:'https://womad.es/entradas',
    precio:'Abono desde 55€ · Días sueltos desde 20€', horario:'30 oct – 1 nov · 17:00h – 02:00h',
  },
  {
    id:8, nombre:'Carnaval de Las Palmas', isla:'Gran Canaria', cat:'carnavales',
    fecha:'2027-02-05', emoji:'🎭', color:'#A855F7', destacado:false,
    desc:'El segundo carnaval más importante de España. La Drag Queen, murgas, comparsas y el entierro de la sardina congregan a millones de personas en Las Palmas durante dos semanas.',
    ubicacion:'Las Palmas de Gran Canaria', maps:'https://maps.google.com/?q=Las+Palmas+de+Gran+Canaria',
    web:'https://laspalmasgc.es/carnaval', entradas:null,
    precio:'Gratuito', horario:'5–20 febrero · Varios actos diarios',
  },
  
  {
    id:9, nombre:'Día de Canarias — Tenerife', isla:'Tenerife', cat:'festivos',
    fecha:'2026-05-30', emoji:'🌴', color:'#EF4444', destacado:true,
    desc:'Fiesta nacional del Archipiélago. Actos institucionales, folklore canario, concurso de lucha canaria y gastronomía tradicional. El día más emotivo del año para los canarios.',
    ubicacion:'Santa Cruz de Tenerife', maps:'https://maps.google.com/?q=Santa+Cruz+de+Tenerife',
    web:'https://cabildodetenerife.es', entradas:null,
    precio:'Gratuito', horario:'30 mayo · Todo el día',
  },
  {
    id:10, nombre:'Fiestas del Cristo de La Laguna', isla:'Tenerife', cat:'festivos',
    fecha:'2026-09-14', emoji:'✝️', color:'#EF4444', destacado:false,
    desc:'La procesión más emotiva de Tenerife. El Cristo recorre La Laguna Patrimonio de la Humanidad rodeado de miles de fieles. Una de las manifestaciones de fe más importantes de Canarias.',
    ubicacion:'San Cristóbal de La Laguna, Tenerife', maps:'https://maps.google.com/?q=La+Laguna+Tenerife',
    web:'https://laguna.es', entradas:null,
    precio:'Gratuito', horario:'14 septiembre · Procesión 20:00h',
  },
  {
    id:11, nombre:'Carnaval de Santa Cruz de Tenerife', isla:'Tenerife', cat:'carnavales',
    fecha:'2027-02-13', emoji:'🎭', color:'#A855F7', destacado:true,
    desc:'El carnaval más grande de España y segundo del mundo tras Río de Janeiro. Comparsas, murgas, la elección de la Reina y la legendaria noche de fuego que cierra semanas de fiesta ininterrumpida.',
    ubicacion:'Santa Cruz de Tenerife', maps:'https://maps.google.com/?q=Santa+Cruz+de+Tenerife',
    web:'https://carnavaltenerife.es', entradas:'https://carnavaltenerife.es/entradas',
    precio:'Gratuito (tribuna desde 15€)', horario:'13–28 febrero · Varios actos diarios',
  },
  {
    id:12, nombre:'Festival Magma', isla:'Tenerife', cat:'conciertos',
    fecha:'2026-07-18', emoji:'🎵', color:'#0EA5E9', destacado:false,
    desc:'El festival de música electrónica y alternativa más destacado del sur de Tenerife. Artistas internacionales y nacionales en el espectacular entorno del Auditorio de Adeje.',
    ubicacion:'Auditorio de Adeje, Tenerife Sur', maps:'https://maps.google.com/?q=Adeje+Tenerife',
    web:'https://magmafest.es', entradas:'https://magmafest.es/tickets',
    precio:'Desde 35€', horario:'18–19 julio · 20:00h – 06:00h',
  },
  {
    id:13, nombre:'Romería de San Roque — Garachico', isla:'Tenerife', cat:'romerias',
    fecha:'2026-08-16', emoji:'🕯️', color:'#92400E', destacado:false,
    desc:'Una de las romerías más bonitas de Tenerife en el pueblo más auténtico de la isla. Trajes típicos canarios, carros de bueyes engalanados y procesión por las calles empedradas de Garachico.',
    ubicacion:'Garachico, Tenerife Norte', maps:'https://maps.google.com/?q=Garachico+Tenerife',
    web:'https://garachico.es', entradas:null,
    precio:'Gratuito', horario:'16 agosto · 10:00h – 22:00h',
  },
  {
    id:14, nombre:'Trail Teide Vertical', isla:'Tenerife', cat:'deportes',
    fecha:'2026-06-14', emoji:'🏔️', color:'#F97316', destacado:false,
    desc:'La carrera de montaña más espectacular de Canarias. Desde el Teide hasta la cumbre más alta de España, con vistas que quitan el aliento y un desnivel de más de 1.400 metros.',
    ubicacion:'Parque Nacional del Teide, Tenerife', maps:'https://maps.google.com/?q=Teide+Tenerife',
    web:'https://trailteide.com', entradas:'https://trailteide.com/inscripcion',
    precio:'Inscripción 60€', horario:'14 junio · Salida 07:00h',
  },
  {
    id:15, nombre:'Mercado Medieval de La Orotava', isla:'Tenerife', cat:'mercadillos',
    fecha:'2026-11-07', emoji:'⚔️', color:'#22C55E', destacado:false,
    desc:'El mercado medieval más popular de Tenerife llena las calles del casco histórico de La Orotava. Artesanía, gastronomía, espectáculos de fuego y ambiente de época en un escenario incomparable.',
    ubicacion:'Casco histórico de La Orotava, Tenerife', maps:'https://maps.google.com/?q=La+Orotava+Tenerife',
    web:'https://laorotava.es', entradas:null,
    precio:'Gratuito', horario:'7–9 noviembre · 11:00 – 22:00h',
  },
  {
    id:16, nombre:'Rammstein — Tenerife', isla:'Tenerife', cat:'conciertos',
    fecha:'2026-08-22', emoji:'🔥', color:'#0EA5E9', destacado:true,
    desc:'La banda alemana de metal industrial más famosa del mundo lleva su espectacular show de pirotecnia y efectos al Estadio Heliodoro Rodríguez López. Un concierto de otro planeta.',
    ubicacion:'Estadio Heliodoro Rodríguez López, Santa Cruz de Tenerife', maps:'https://maps.google.com/?q=Estadio+Heliodoro+Rodriguez+Lopez',
    web:'https://livenation.es', entradas:'https://www.livenation.es/artist/rammstein-tickets',
    precio:'Desde 75€', horario:'22 agosto · Puertas 18:00h · Concierto 21:00h',
  },
  {
    id:17, nombre:'Gay Pride — Puerto de la Cruz', isla:'Tenerife', cat:'orgullo',
    fecha:'2026-06-27', emoji:'🏳️‍🌈', color:'#EC4899', destacado:false,
    desc:'El orgullo del norte de Tenerife en el encantador Puerto de la Cruz. Desfile por el paseo marítimo, conciertos en la plaza y una noche de fiesta en la ciudad más cosmopolita del norte.',
    ubicacion:'Puerto de la Cruz, Tenerife Norte', maps:'https://maps.google.com/?q=Puerto+de+la+Cruz+Tenerife',
    web:'https://puertodelacruz.es', entradas:null,
    precio:'Gratuito', horario:'27–28 junio · Desfile 18:00h',
  },
  
  {
    id:18, nombre:'Sonidos Líquidos', isla:'Lanzarote', cat:'conciertos',
    fecha:'2026-06-06', emoji:'🎵', color:'#0EA5E9', destacado:true,
    desc:'Festival de música electrónica y ambient en los Jameos del Agua. Artistas internacionales en uno de los escenarios más únicos del mundo: una cueva volcánica con lago interior de agua salada.',
    ubicacion:'Jameos del Agua, Haría, Lanzarote', maps:'https://maps.google.com/?q=Jameos+del+Agua+Lanzarote',
    web:'https://sonidosliquidos.com', entradas:'https://sonidosliquidos.com/entradas',
    precio:'Desde 45€', horario:'6–7 junio · 21:00 – 03:00h',
  },
  {
    id:19, nombre:'Romería de San Marcos — Teguise', isla:'Lanzarote', cat:'romerias',
    fecha:'2026-04-25', emoji:'🕯️', color:'#92400E', destacado:false,
    desc:'Procesión tradicional en honor al patrón de Teguise. Trajes típicos, carros engalanados y la mejor gastronomía lanzaroteña en el pueblo más pintoresco de la isla.',
    ubicacion:'Teguise, Lanzarote', maps:'https://maps.google.com/?q=Teguise+Lanzarote',
    web:'https://teguise.es', entradas:null,
    precio:'Gratuito', horario:'25 abril · 10:00 – 20:00h',
  },
  {
    id:20, nombre:'Ironman Lanzarote', isla:'Lanzarote', cat:'deportes',
    fecha:'2026-05-17', emoji:'🏊', color:'#F97316', destacado:true,
    desc:'El triatlón de larga distancia más duro del mundo. 3,8 km de nado, 180 km en bici por la lava volcánica y 42 km corriendo bajo el sol canario. Solo para los más valientes del planeta.',
    ubicacion:'Puerto del Carmen, Lanzarote', maps:'https://maps.google.com/?q=Puerto+del+Carmen+Lanzarote',
    web:'https://ironmanlanzarote.com', entradas:'https://ironmanlanzarote.com/inscripcion',
    precio:'Inscripción 650€', horario:'17 mayo · Salida 07:00h',
  },
  {
    id:21, nombre:'Fiesta del Vino de La Geria', isla:'Lanzarote', cat:'festivos',
    fecha:'2026-09-05', emoji:'🍷', color:'#EF4444', destacado:false,
    desc:'Celebración de la vendimia en los únicos viñedos volcánicos del mundo. Bodegas abiertas, catas de malvasía volcánica, música folclórica y el paisaje lunar de La Geria como telón de fondo.',
    ubicacion:'La Geria, Lanzarote', maps:'https://maps.google.com/?q=La+Geria+Lanzarote',
    web:'https://lanzarote.es', entradas:null,
    precio:'Catas desde 10€', horario:'5–7 septiembre · 11:00 – 21:00h',
  },
  {
    id:22, nombre:'Mercado de Teguise', isla:'Lanzarote', cat:'mercadillos',
    fecha:'2026-05-24', emoji:'🛍️', color:'#22C55E', destacado:false,
    desc:'El mercadillo más famoso de Canarias se celebra todos los domingos en el casco histórico de Teguise. Artesanía, especias, ropa y productos locales en un ambiente medieval único.',
    ubicacion:'Teguise, Lanzarote', maps:'https://maps.google.com/?q=Teguise+Lanzarote',
    web:'https://mercadodeteguise.com', entradas:null,
    precio:'Gratuito', horario:'Todos los domingos · 09:00 – 14:00h',
  },
  {
    id:23, nombre:'Festival de Cine de Lanzarote', isla:'Lanzarote', cat:'festivos',
    fecha:'2026-10-10', emoji:'🎬', color:'#EF4444', destacado:false,
    desc:'El festival de cine más joven de Canarias, con proyecciones al aire libre en localizaciones únicas de la isla. Cortometrajes, largometrajes y encuentros con cineastas internacionales.',
    ubicacion:'Arrecife y La Geria, Lanzarote', maps:'https://maps.google.com/?q=Arrecife+Lanzarote',
    web:'https://festivalcinelanzarote.com', entradas:'https://festivalcinelanzarote.com/tickets',
    precio:'Entrada 8€ · Abono 25€', horario:'10–15 octubre · Desde 19:00h',
  },
  
  {
    id:24, nombre:'Festival Internacional de Kitesurf', isla:'Fuerteventura', cat:'deportes',
    fecha:'2026-07-24', emoji:'🪁', color:'#F97316', destacado:true,
    desc:'La mejor playa del mundo para el kitesurf acoge el campeonato del planeta. Atletas de 40 países compiten en Sotavento ante miles de espectadores. La prueba más esperada del circuito mundial.',
    ubicacion:'Playa de Sotavento, Pájara, Fuerteventura', maps:'https://maps.google.com/?q=Playa+Sotavento+Fuerteventura',
    web:'https://kitesurffuerteventura.com', entradas:null,
    precio:'Gratuito para espectadores', horario:'24–30 julio · 10:00 – 19:00h',
  },
  {
    id:25, nombre:'Carnaval de Puerto del Rosario', isla:'Fuerteventura', cat:'carnavales',
    fecha:'2027-02-19', emoji:'🎭', color:'#A855F7', destacado:false,
    desc:'El carnaval más animado de Fuerteventura llena las calles de la capital con comparsas, murgas y la elección de la Reina. Una celebración que mezcla tradición majorera con ritmos caribeños.',
    ubicacion:'Puerto del Rosario, Fuerteventura', maps:'https://maps.google.com/?q=Puerto+del+Rosario+Fuerteventura',
    web:'https://puertodelrosario.org', entradas:null,
    precio:'Gratuito', horario:'19 febrero – 2 marzo · Actos diarios',
  },
  {
    id:26, nombre:'Fiesta del Queso Majorero', isla:'Fuerteventura', cat:'festivos',
    fecha:'2026-03-22', emoji:'🧀', color:'#EF4444', destacado:false,
    desc:'La feria gastronómica del queso más famoso de Canarias. El Queso Majorero DOP protagoniza un día de catas, concursos y gastronomía majorera en el corazón de la isla.',
    ubicacion:'Antigua, Fuerteventura', maps:'https://maps.google.com/?q=Antigua+Fuerteventura',
    web:'https://antigua.es', entradas:null,
    precio:'Gratuito · Catas desde 5€', horario:'22 marzo · 10:00 – 20:00h',
  },
  {
    id:27, nombre:'Ultra Fuerteventura Trail', isla:'Fuerteventura', cat:'deportes',
    fecha:'2026-11-21', emoji:'🏃', color:'#F97316', destacado:false,
    desc:'La carrera de trail running más desafiante de Fuerteventura. Dunas, barrancos y costa volcánica en distintas distancias desde 15 km hasta la ultra de 80 km.',
    ubicacion:'Corralejo, Fuerteventura', maps:'https://maps.google.com/?q=Corralejo+Fuerteventura',
    web:'https://ultrafuerteventura.com', entradas:'https://ultrafuerteventura.com/inscripcion',
    precio:'Desde 40€', horario:'21 noviembre · Salidas desde 06:00h',
  },
  {
    id:28, nombre:'Fuertemusic Festival', isla:'Fuerteventura', cat:'conciertos',
    fecha:'2026-08-08', emoji:'🎶', color:'#0EA5E9', destacado:false,
    desc:'El festival de música al aire libre más relajante de las Canarias orientales. Artistas indie, folk y world music en el incomparable entorno del Parque Natural de Corralejo.',
    ubicacion:'Parque Natural de Corralejo, Fuerteventura', maps:'https://maps.google.com/?q=Corralejo+Fuerteventura',
    web:'https://fuertmusic.com', entradas:'https://fuertmusic.com/tickets',
    precio:'Abono desde 40€', horario:'8–9 agosto · 19:00 – 03:00h',
  },
  
  {
    id:29, nombre:'Festival de Música de Canarias — La Palma', isla:'La Palma', cat:'conciertos',
    fecha:'2026-02-07', emoji:'🎻', color:'#0EA5E9', destacado:false,
    desc:'El festival de música clásica más prestigioso de Canarias llega a La Palma con la Orquesta Filarmónica de Gran Canaria. Conciertos en espacios únicos de la isla más verde del archipiélago.',
    ubicacion:'Teatro Circo de Marte, Santa Cruz de La Palma', maps:'https://maps.google.com/?q=Santa+Cruz+de+La+Palma',
    web:'https://festivaldemusica.org', entradas:'https://festivaldemusica.org/entradas',
    precio:'Desde 15€', horario:'7 febrero · 20:30h',
  },
  {
    id:30, nombre:'Ruta de los Volcanes Trail', isla:'La Palma', cat:'deportes',
    fecha:'2026-10-17', emoji:'🌋', color:'#F97316', destacado:false,
    desc:'Carrera de montaña por la incomparable Ruta de los Volcanes. 70 km de senderos entre conos volcánicos, laurisilva y vistas al Teide. La prueba más fotogénica de Canarias.',
    ubicacion:'Fuencaliente, La Palma', maps:'https://maps.google.com/?q=Fuencaliente+La+Palma',
    web:'https://ultrapalma.com', entradas:'https://ultrapalma.com/inscripcion',
    precio:'Inscripción 55€', horario:'17 octubre · Salida 06:00h',
  },
  {
    id:31, nombre:'Fiesta de los Indianos', isla:'La Palma', cat:'carnavales',
    fecha:'2027-02-15', emoji:'🎩', color:'#A855F7', destacado:true,
    desc:'El carnaval más peculiar del mundo. Todo de blanco y una batalla de polvos de talco que convierte Santa Cruz de La Palma en una nube de fiesta. Homenaje a los emigrantes que volvieron de Cuba.',
    ubicacion:'Santa Cruz de La Palma', maps:'https://maps.google.com/?q=Santa+Cruz+de+La+Palma',
    web:'https://fiestadelosindianoslp.com', entradas:null,
    precio:'Gratuito', horario:'15 febrero · 12:00 – 20:00h',
  },
  {
    id:32, nombre:'Mercado Artesanal de Los Llanos', isla:'La Palma', cat:'mercadillos',
    fecha:'2026-06-06', emoji:'🌺', color:'#22C55E', destacado:false,
    desc:'El mercado de artesanía y productos locales más querido de La Palma. Flores, miel, quesos palmeros, bordados y artesanía volcánica en el centro de Los Llanos de Aridane.',
    ubicacion:'Los Llanos de Aridane, La Palma', maps:'https://maps.google.com/?q=Los+Llanos+de+Aridane+La+Palma',
    web:'https://losllanos.es', entradas:null,
    precio:'Gratuito', horario:'Primer sábado del mes · 09:00 – 14:00h',
  },
  
  {
    id:33, nombre:'Festival del Silbo Gomero', isla:'La Gomera', cat:'festivos',
    fecha:'2026-09-20', emoji:'🌬️', color:'#EF4444', destacado:false,
    desc:'Celebración del lenguaje silbado más antiguo del mundo, declarado Patrimonio Inmaterial de la Humanidad por la UNESCO. Demostraciones, talleres y actuaciones en Valle Gran Rey.',
    ubicacion:'Valle Gran Rey, La Gomera', maps:'https://maps.google.com/?q=Valle+Gran+Rey+La+Gomera',
    web:'https://lagomera.travel', entradas:null,
    precio:'Gratuito', horario:'20–21 septiembre · 10:00 – 20:00h',
  },
  {
    id:34, nombre:'Romería de la Virgen de Guadalupe', isla:'La Gomera', cat:'romerias',
    fecha:'2026-10-04', emoji:'🕯️', color:'#92400E', destacado:false,
    desc:'La romería más importante de La Gomera honra a la patrona de la isla. Una procesión que recorre los acantilados del sur de la isla con trajes típicos, gastronomía local y folclore gomero.',
    ubicacion:'Punta del Papagayo, San Sebastián de La Gomera', maps:'https://maps.google.com/?q=San+Sebastian+de+La+Gomera',
    web:'https://lagomera.travel', entradas:null,
    precio:'Gratuito', horario:'4 octubre · Todo el día',
  },
  {
    id:35, nombre:'TransGomera Trail', isla:'La Gomera', cat:'deportes',
    fecha:'2026-05-09', emoji:'🏃', color:'#F97316', destacado:false,
    desc:'La carrera más bonita de La Gomera recorre los senderos del Parque Nacional de Garajonay entre laurisilva centenaria. Niebla, musgo y un verde que no encontrarás en ningún otro lugar del mundo.',
    ubicacion:'Garajonay, La Gomera', maps:'https://maps.google.com/?q=Parque+Nacional+Garajonay',
    web:'https://transgomera.com', entradas:'https://transgomera.com/inscripcion',
    precio:'Desde 35€', horario:'9 mayo · Salida 08:00h',
  },
  {
    id:36, nombre:'Semana Cultural de La Gomera', isla:'La Gomera', cat:'festivos',
    fecha:'2026-07-03', emoji:'🌲', color:'#EF4444', destacado:false,
    desc:'Una semana que celebra la identidad única de La Gomera: gastronomía, folclore, artesanía en palma y los sonidos únicos del timple canario. El corazón cultural de la isla más íntima del archipiélago.',
    ubicacion:'San Sebastián de La Gomera', maps:'https://maps.google.com/?q=San+Sebastian+de+La+Gomera',
    web:'https://lagomera.travel', entradas:null,
    precio:'Gratuito', horario:'3–10 julio · Actos diarios',
  },
  
  {
    id:37, nombre:'Bajada de la Virgen de Los Reyes', isla:'El Hierro', cat:'romerias',
    fecha:'2025-07-05', emoji:'⚓', color:'#92400E', destacado:true,
    desc:'La fiesta más emotiva del Hierro. La imagen de la Virgen de Los Reyes baja desde su ermita hasta Valverde en un recorrido de 14 horas que une a toda la isla. Solo se celebra cada 4 años.',
    ubicacion:'Valverde, El Hierro', maps:'https://maps.google.com/?q=Valverde+El+Hierro',
    web:'https://elhierro.travel', entradas:null,
    precio:'Gratuito', horario:'5 julio · 04:00h – noche',
  },
  {
    id:38, nombre:'Festival de Gastronomía del Hierro', isla:'El Hierro', cat:'festivos',
    fecha:'2026-09-27', emoji:'🐟', color:'#EF4444', destacado:false,
    desc:'Una celebración de los sabores únicos de El Hierro: vieja guisada, lapas al mojo, queso herreño y el vino más antiguo de Canarias. Los mejores restaurantes de la isla muestran su cocina de raíz.',
    ubicacion:'Valverde, El Hierro', maps:'https://maps.google.com/?q=Valverde+El+Hierro',
    web:'https://elhierro.travel', entradas:null,
    precio:'Gratuito · Degustaciones desde 5€', horario:'27–28 septiembre · 12:00 – 22:00h',
  },
  {
    id:39, nombre:'El Hierro Blue Race', isla:'El Hierro', cat:'deportes',
    fecha:'2026-06-20', emoji:'🤿', color:'#F97316', destacado:false,
    desc:'La mayor prueba de natación en aguas abiertas de Canarias. 10 km en la Reserva de la Biosfera Marina más importante del Atlántico. Aguas cristalinas con hasta 50 metros de visibilidad.',
    ubicacion:'La Restinga, El Hierro', maps:'https://maps.google.com/?q=La+Restinga+El+Hierro',
    web:'https://elhierrobluerace.com', entradas:'https://elhierrobluerace.com/inscripcion',
    precio:'Inscripción 45€', horario:'20 junio · Salida 09:00h',
  },
  {
    id:40, nombre:'Semana Cultural Herreña', isla:'El Hierro', cat:'festivos',
    fecha:'2026-08-22', emoji:'🌿', color:'#EF4444', destacado:false,
    desc:'Una semana de actos culturales que celebran la identidad única de El Hierro. Folclore, gastronomía, artesanía y proyecciones sobre la historia y naturaleza de la isla más occidental de España.',
    ubicacion:'Valverde y La Frontera, El Hierro', maps:'https://maps.google.com/?q=El+Hierro',
    web:'https://elhierro.travel', entradas:null,
    precio:'Gratuito', horario:'22–29 agosto · Actos diarios',
  },
  {
    id:41, nombre:'Rally Fotográfico El Hierro', isla:'El Hierro', cat:'deportes',
    fecha:'2026-10-03', emoji:'📸', color:'#F97316', destacado:false,
    desc:'El concurso de fotografía naturaleza más bonito de Canarias. Participantes de toda España capturan la fauna, flora y paisajes únicos de la Reserva de la Biosfera de El Hierro en un solo día.',
    ubicacion:'El Hierro (toda la isla)', maps:'https://maps.google.com/?q=El+Hierro',
    web:'https://elhierro.travel', entradas:'https://elhierro.travel/rally-fotografico',
    precio:'Inscripción 20€', horario:'3 octubre · 07:00 – 20:00h',
  },
];
*/
let eventos = [
  {
    id: 1,
    nombre: 'Cook Music Fest Tenerife 2026',
    isla: 'Tenerife',
    cat: 'conciertos',
    fecha: '2026-07-16',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: true,
    desc: 'Tres días de música en vivo con los mejores artistas pop, urbanos y latinos frente al mar. El festival que fusiona gastronomía y conciertos en el Recinto Portuario de Santa Cruz de Tenerife.',
    ubicacion: 'Recinto Portuario, Santa Cruz de Tenerife',
    maps: 'https://maps.google.com/?q=Recinto+Portuario+Santa+Cruz+de+Tenerife',
    web: 'https://cookmusicfest.es/tenerife-cook-music-fest/',
    entradas: 'https://www.tomaticket.es/es-es/billet-cook-music-fest-tenerife',
    precio: 'Desde 35€',
    horario: 'Del 16 al 18 julio · Desde las 17:00h',
  },
  {
    id: 2,
    nombre: 'Sunblast Festival Tenerife',
    isla: 'Tenerife',
    cat: 'conciertos',
    fecha: '2026-08-08',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: true,
    desc: 'El festival electrónico más grande de Tenerife. Más de 9 horas de música con 6 escenarios en el sur de la isla. Una experiencia única de música electrónica con miles de asistentes bajo el sol canario.',
    ubicacion: 'Golf Costa Adeje, Adeje',
    maps: 'https://maps.google.com/?q=Golf+Costa+Adeje+Tenerife',
    web: 'https://www.farraworld.com',
    entradas: 'https://www.farraworld.com',
    precio: 'Desde 45€',
    horario: '8 agosto · 14:00h hasta madrugada',
  },
  {
    id: 3,
    nombre: 'Romería de San Benito Abad - La Laguna',
    isla: 'Tenerife',
    cat: 'romerias',
    fecha: '2026-07-12',
    emoji: '🕯️',
    color: '#92400E',
    destacado: true,
    desc: 'La romería más representativa de Canarias reúne tradiciones de todas las islas del archipiélago. Carretas, trajes típicos, música folclórica y el mejor ambiente popular en el corazón de La Laguna.',
    ubicacion: 'Centro histórico, San Cristóbal de La Laguna',
    maps: 'https://maps.google.com/?q=San+Cristobal+de+La+Laguna+Tenerife',
    web: 'https://www.aytolalaguna.es',
    entradas: 'https://www.aytolalaguna.es',
    precio: 'Gratuito',
    horario: '12 julio · Desde las 10:00h',
  },
  {
    id: 4,
    nombre: 'Romería de San Marcos - Tegueste',
    isla: 'Tenerife',
    cat: 'romerias',
    fecha: '2026-04-26',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Una de las romerías más auténticas de Canarias, famosa por sus carretas decoradas con granos y semillas. Abre oficialmente la temporada romera de Tenerife con un ambiente festivo y muy participativo.',
    ubicacion: 'Casco urbano, Tegueste',
    maps: 'https://maps.google.com/?q=Tegueste+Tenerife',
    web: 'https://www.aytotegueste.es',
    entradas: 'https://www.aytotegueste.es',
    precio: 'Gratuito',
    horario: '26 abril · Desde las 11:00h',
  },
  {
    id: 5,
    nombre: 'Romería de San Isidro - La Orotava',
    isla: 'Tenerife',
    cat: 'romerias',
    fecha: '2026-06-14',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería tradicional que precede a las famosas alfombras de flores del Corpus Christi. Trajes típicos canarios, carretas y música folclórica llenan las calles del casco histórico de La Orotava.',
    ubicacion: 'Casco histórico, La Orotava',
    maps: 'https://maps.google.com/?q=La+Orotava+Tenerife',
    web: 'https://www.laorotava.es',
    entradas: 'https://www.laorotava.es',
    precio: 'Gratuito',
    horario: '14 junio · Desde las 11:00h',
  },
  {
    id: 6,
    nombre: 'Fiestas de la Virgen de Candelaria',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-08-14',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'La festividad de la patrona de Canarias reúne a decenas de miles de devotos llegados desde toda España. Procesiones, actos religiosos y una emotiva vigilia nocturna en la Basílica de Candelaria junto al mar.',
    ubicacion: 'Basílica de Candelaria, Candelaria',
    maps: 'https://maps.google.com/?q=Basilica+Candelaria+Tenerife',
    web: 'https://www.ayuntamientodecandelaria.es',
    entradas: 'https://www.ayuntamientodecandelaria.es',
    precio: 'Gratuito',
    horario: 'Del 14 al 15 agosto · Todo el día',
  },
  {
    id: 7,
    nombre: 'Bajada de la Virgen del Socorro - Güímar',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-09-07',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Una de las celebraciones más antiguas de Tenerife, donde devoción y tradición se unen en el municipio de Güímar. La Virgen baja desde su santuario al pueblo en un ambiente de fervor popular único.',
    ubicacion: 'Santuario de El Socorro, Güímar',
    maps: 'https://maps.google.com/?q=Santuario+El+Socorro+Guimar+Tenerife',
    web: 'https://www.ayuntamientodeguimar.es',
    entradas: 'https://www.ayuntamientodeguimar.es',
    precio: 'Gratuito',
    horario: '7 septiembre · Desde las 10:00h',
  },
  {
    id: 8,
    nombre: 'Romería Barquera de El Médano',
    isla: 'Tenerife',
    cat: 'romerias',
    fecha: '2026-09-21',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería única en Canarias donde las barcas de pesca son las auténticas protagonistas. Una celebración marinera que mezcla tradición, devoción y el paisaje costero de El Médano en Granadilla de Abona.',
    ubicacion: 'Playa de El Médano, Granadilla de Abona',
    maps: 'https://maps.google.com/?q=Playa+El+Medano+Granadilla+Tenerife',
    web: 'https://www.granadilladeabona.org',
    entradas: 'https://www.granadilladeabona.org',
    precio: 'Gratuito',
    horario: '21 septiembre · Desde las 11:00h',
  },
  {
    id: 9,
    nombre: 'Noche de San Juan en Las Playas del Sur',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-06-23',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las playas de Adeje, Los Cristianos y El Médano se llenan de hogueras, música y baños nocturnos en la mágica noche del solsticio de verano. Una experiencia única que mezcla tradición canaria y ambiente festivo.',
    ubicacion: 'Playas de Los Cristianos, Arona',
    maps: 'https://maps.google.com/?q=Los+Cristianos+Arona+Tenerife',
    web: 'https://www.arona.org',
    entradas: 'https://www.arona.org',
    precio: 'Gratuito',
    horario: '23 junio · Desde las 20:00h',
  },
  {
    id: 10,
    nombre: 'Romería de Valle San Lorenzo - Arona',
    isla: 'Tenerife',
    cat: 'romerias',
    fecha: '2026-05-15',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería tradicional del sur de Tenerife en honor a la Virgen de Fátima. Trajes típicos canarios, carretas engalanadas y música folclórica en uno de los municipios más animados del sur de la isla.',
    ubicacion: 'Valle San Lorenzo, Arona',
    maps: 'https://maps.google.com/?q=Valle+San+Lorenzo+Arona+Tenerife',
    web: 'https://www.arona.org',
    entradas: 'https://www.arona.org',
    precio: 'Gratuito',
    horario: '15 mayo · Desde las 11:00h',
  },
  {
    id: 11,
    nombre: 'Romería de Guía de Isora',
    isla: 'Tenerife',
    cat: 'romerias',
    fecha: '2026-05-15',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Colorida romería en el municipio del suroeste de Tenerife con un ambiente muy familiar. Carretas, música de parrandas y trajes de mago protagonizan una jornada de tradición canaria en plena naturaleza.',
    ubicacion: 'Casco urbano, Guía de Isora',
    maps: 'https://maps.google.com/?q=Guia+de+Isora+Tenerife',
    web: 'https://www.guiadeisora.es',
    entradas: 'https://www.guiadeisora.es',
    precio: 'Gratuito',
    horario: '15 mayo · Desde las 11:00h',
  },
  {
    id: 12,
    nombre: 'Fiestas de San Cristóbal - La Laguna',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-07-10',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas patronales de La Laguna llenan el casco histórico Patrimonio de la Humanidad de conciertos, actividades culturales y verbenas. Una semana grande de celebración en la ciudad universitaria de Canarias.',
    ubicacion: 'Casco histórico, San Cristóbal de La Laguna',
    maps: 'https://maps.google.com/?q=San+Cristobal+de+La+Laguna+Tenerife',
    web: 'https://www.aytolalaguna.es',
    entradas: 'https://www.aytolalaguna.es',
    precio: 'Gratuito',
    horario: 'Del 10 al 15 julio · Desde las 18:00h',
  },
  {
    id: 13,
    nombre: 'Fiesta de San Benito - La Laguna',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-07-11',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Festividad patronal del municipio lagunero que combina actos religiosos con música, verbenas populares y una animada feria gastronómica. Ideal para conocer las tradiciones más profundas de Tenerife.',
    ubicacion: 'Plaza del Cristo, San Cristóbal de La Laguna',
    maps: 'https://maps.google.com/?q=Plaza+del+Cristo+La+Laguna+Tenerife',
    web: 'https://www.aytolalaguna.es',
    entradas: 'https://www.aytolalaguna.es',
    precio: 'Gratuito',
    horario: '11 julio · Desde las 10:00h',
  },
  {
    id: 14,
    nombre: 'Elrow XXL - Costa Adeje',
    isla: 'Tenerife',
    cat: 'conciertos',
    fecha: '2026-10-03',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: false,
    desc: 'La versión ampliada del reconocido formato Elrow llega a Tenerife con más de 20.000 asistentes, una producción visual espectacular y decorados únicos que convierten cada edición en una experiencia inmersiva e irrepetible.',
    ubicacion: 'Golf Costa Adeje, Adeje',
    maps: 'https://maps.google.com/?q=Golf+Costa+Adeje+Tenerife',
    web: 'https://www.farraworld.com',
    entradas: 'https://www.farraworld.com',
    precio: 'Desde 40€',
    horario: '3 octubre · Desde las 14:00h',
  },
  {
    id: 15,
    nombre: 'Romería de San Roque - Garachico',
    isla: 'Tenerife',
    cat: 'romerias',
    fecha: '2026-08-16',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Las calles del precioso pueblo de Garachico se llenan de romeros con trajes típicos en honor a San Roque. Un evento imprescindible para descubrir la tradición canaria en uno de los pueblos más bonitos de Tenerife.',
    ubicacion: 'Casco histórico, Garachico',
    maps: 'https://maps.google.com/?q=Garachico+Tenerife',
    web: 'https://www.garachico.es',
    entradas: 'https://www.garachico.es',
    precio: 'Gratuito',
    horario: '16 agosto · Desde las 11:00h',
  },
  {
    id: 16,
    nombre: 'Fiestas de San Miguel - San Miguel de Abona',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-09-21',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Festividades patronales del municipio del sur de Tenerife en honor a San Miguel Arcángel. Romería, conciertos, verbenas y gastronomía local protagonizan una semana grande de celebración en el sur de la isla.',
    ubicacion: 'Casco urbano, San Miguel de Abona',
    maps: 'https://maps.google.com/?q=San+Miguel+de+Abona+Tenerife',
    web: 'https://www.sanmigueldeabona.org',
    entradas: 'https://www.sanmigueldeabona.org',
    precio: 'Gratuito',
    horario: 'Del 21 al 27 septiembre · Desde las 18:00h',
  },
  {
    id: 17,
    nombre: 'Mercadillo del Agricultor y Artesano - La Laguna',
    isla: 'Tenerife',
    cat: 'mercadillos',
    fecha: '2026-06-06',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'Mercadillo semanal en el que agricultores y artesanos locales exhiben y venden sus productos directamente al público. Frutas, verduras, artesanía canaria y gastronomía típica en un ambiente muy auténtico.',
    ubicacion: 'Mercadillo Municipal, San Cristóbal de La Laguna',
    maps: 'https://maps.google.com/?q=Mercadillo+La+Laguna+Tenerife',
    web: 'https://www.aytolalaguna.es',
    entradas: 'https://www.aytolalaguna.es',
    precio: 'Entrada libre',
    horario: 'Sábados · 08:00 a 14:00h',
  },
  {
    id: 18,
    nombre: 'Día de Canarias en Tenerife',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-05-30',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La festividad autonómica de Canarias se celebra con actos institucionales, exhibiciones de folklore, deportes tradicionales canarios y actividades culturales en toda la isla. Una jornada de orgullo canario.',
    ubicacion: 'Parque García Sanabria, Santa Cruz de Tenerife',
    maps: 'https://maps.google.com/?q=Parque+Garcia+Sanabria+Santa+Cruz+Tenerife',
    web: 'https://www.santacruzdetenerife.es',
    entradas: 'https://www.santacruzdetenerife.es',
    precio: 'Gratuito',
    horario: '30 mayo · Todo el día',
  },
  {
    id: 19,
    nombre: 'Phe Festival - Puerto de la Cruz',
    isla: 'Tenerife',
    cat: 'conciertos',
    fecha: '2026-06-12',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: false,
    desc: 'Festival de perfil indie y electrónico que combina música en directo con cultura contemporánea en el Puerto de la Cruz. Dos días de conciertos frente al mar en la Explanada del Muelle, abriendo la temporada musical de verano.',
    ubicacion: 'Explanada del Muelle, Puerto de la Cruz',
    maps: 'https://maps.google.com/?q=Muelle+Puerto+de+la+Cruz+Tenerife',
    web: 'https://www.phefestival.com',
    entradas: 'https://www.phefestival.com',
    precio: 'Desde 25€',
    horario: '12 y 13 junio · Desde las 17:00h',
  },
  {
    id: 20,
    nombre: 'Fiestas de San Sebastián - Adeje',
    isla: 'Tenerife',
    cat: 'festivos',
    fecha: '2026-07-20',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas de verano de Adeje incluyen la esperada Fiesta del Agua, donde los asistentes disfrutan de actividades acuáticas y conciertos al aire libre. Un evento muy popular en el municipio turístico del sur de Tenerife.',
    ubicacion: 'Casco urbano, Adeje',
    maps: 'https://maps.google.com/?q=Adeje+Tenerife',
    web: 'https://www.adeje.es',
    entradas: 'https://www.adeje.es',
    precio: 'Gratuito',
    horario: 'Del 20 al 25 julio · Desde las 18:00h',
  },
  {
    id: 21,
    nombre: 'Maspalomas Pride by Freedom - 25 Aniversario',
    isla: 'Gran Canaria',
    cat: 'orgullo',
    fecha: '2026-05-04',
    emoji: '🏳️‍🌈',
    color: '#EC4899',
    destacado: true,
    desc: 'El Pride más internacional de Europa celebra su 25 aniversario con el lema Nuestra historia, su legado, nuestro orgullo. Una semana de fiestas, desfiles y reivindicación LGTBIQ+ en las dunas de Maspalomas con más de 80 nacionalidades.',
    ubicacion: 'Yumbo Centre y Dunas de Maspalomas, San Bartolomé de Tirajana',
    maps: 'https://maps.google.com/?q=Yumbo+Centre+Maspalomas+Gran+Canaria',
    web: 'https://maspalomaspridebyfreedom.com',
    entradas: 'https://maspalomaspridebyfreedom.com',
    precio: 'Eventos gratuitos y de pago',
    horario: 'Del 4 al 10 mayo · Todo el día',
  },
  {
    id: 22,
    nombre: 'Winter Pride Maspalomas',
    isla: 'Gran Canaria',
    cat: 'orgullo',
    fecha: '2026-11-02',
    emoji: '🏳️‍🌈',
    color: '#EC4899',
    destacado: true,
    desc: 'El orgullo LGTBIQ+ de otoño más importante de Europa convierte el sur de Gran Canaria en el destino gay de referencia en noviembre. Pool parties, desfiles y conciertos bajo el sol canario cuando el norte de Europa tirita de frío.',
    ubicacion: 'Maspalomas, San Bartolomé de Tirajana',
    maps: 'https://maps.google.com/?q=Maspalomas+Gran+Canaria',
    web: 'https://winterpridemaspalomas.com',
    entradas: 'https://winterpridemaspalomas.com',
    precio: 'Eventos gratuitos y de pago',
    horario: 'Del 2 al 8 noviembre · Todo el día',
  },
  {
    id: 23,
    nombre: 'Gran Canaria Surf Fest',
    isla: 'Gran Canaria',
    cat: 'deportes',
    fecha: '2026-06-12',
    emoji: '🏄',
    color: '#F97316',
    destacado: true,
    desc: 'La ola de La Cícer, en la playa de Las Canteras, acoge este espectacular festival de surf. Tres días de competición de surf, bodyboard, longboard y SUP con un ambiente inclusivo y actividades paralelas durante todo el fin de semana.',
    ubicacion: 'Playa de Las Canteras, Las Palmas de Gran Canaria',
    maps: 'https://maps.google.com/?q=Playa+Las+Canteras+Las+Palmas+Gran+Canaria',
    web: 'https://www.grancanariasurfest.com',
    entradas: 'https://www.grancanariasurfest.com',
    precio: 'Entrada libre',
    horario: 'Del 12 al 14 junio · Desde las 09:00h',
  },
  {
    id: 24,
    nombre: 'Romería de San Antonio el Chico - Mogán',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-06-06',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Una de las romerías más tradicionales de Gran Canaria, que se celebra en torno al día de San Antonio. Para participar en la romería es obligatorio el traje típico canario, lo que garantiza un ambiente de gran autenticidad.',
    ubicacion: 'Pueblo de Mogán, Mogán',
    maps: 'https://maps.google.com/?q=Mogan+Gran+Canaria',
    web: 'https://www.mogan.es',
    entradas: 'https://www.mogan.es',
    precio: 'Gratuito',
    horario: '6 junio · Desde las 11:00h',
  },
  {
    id: 25,
    nombre: 'Romería de Santa Brígida',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-08-01',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Desde 1957 esta romería es una de las más visitadas y queridas de Gran Canaria. El primer fin de semana de agosto el municipio de Santa Brígida celebra su fiesta grande con carretas, música y mucho folclore canario.',
    ubicacion: 'Casco urbano, Santa Brígida',
    maps: 'https://maps.google.com/?q=Santa+Brigida+Gran+Canaria',
    web: 'https://www.santabrigida.es',
    entradas: 'https://www.santabrigida.es',
    precio: 'Gratuito',
    horario: '1 y 2 agosto · Desde las 11:00h',
  },
  {
    id: 26,
    nombre: 'Procesión Marítima Virgen del Carmen - Mogán',
    isla: 'Gran Canaria',
    cat: 'festivos',
    fecha: '2026-07-19',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Emotiva procesión marítima que parte desde Arguineguín, hace una parada en la ermita-cueva de Santa Águeda y finaliza en la Playa de Mogán. Los pueblos pesqueros del suroeste de Gran Canaria rinden homenaje a la Virgen del Carmen.',
    ubicacion: 'Puerto de Arguineguín, Mogán',
    maps: 'https://maps.google.com/?q=Arguineguín+Mogan+Gran+Canaria',
    web: 'https://www.mogan.es',
    entradas: 'https://www.mogan.es',
    precio: 'Gratuito',
    horario: '19 julio · Desde las 11:00h',
  },
  {
    id: 27,
    nombre: 'Fiesta del Charco - La Aldea de San Nicolás',
    isla: 'Gran Canaria',
    cat: 'festivos',
    fecha: '2026-09-11',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'Fiesta aborigen única en el mundo donde cientos de personas se lanzan al charco para capturar peces con las manos, recreando técnicas de los antiguos canarios. Un espectáculo de agua, tradición y algarabía que no te puedes perder.',
    ubicacion: 'El Charco, La Aldea de San Nicolás',
    maps: 'https://maps.google.com/?q=La+Aldea+de+San+Nicolas+Gran+Canaria',
    web: 'https://www.laaldea.es',
    entradas: 'https://www.laaldea.es',
    precio: 'Gratuito',
    horario: '11 septiembre · Desde las 10:00h',
  },
  {
    id: 28,
    nombre: 'Fiesta de la Rama - Agaete',
    isla: 'Gran Canaria',
    cat: 'festivos',
    fecha: '2026-08-04',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'Fiesta de Interés Turístico Nacional de origen prehispánico donde los vecinos bajan desde el pinar con ramas de pino hasta la costa, sacudiendo las ramas al mar para pedir lluvia. Una de las fiestas más originales del archipiélago.',
    ubicacion: 'Puerto de Agaete, Agaete',
    maps: 'https://maps.google.com/?q=Puerto+de+Agaete+Gran+Canaria',
    web: 'https://www.agaete.es',
    entradas: 'https://www.agaete.es',
    precio: 'Gratuito',
    horario: '4 agosto · Desde las 10:00h',
  },
  {
    id: 29,
    nombre: 'Fiesta de Nuestra Señora del Pino - Teror',
    isla: 'Gran Canaria',
    cat: 'festivos',
    fecha: '2026-09-08',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'La patrona de Gran Canaria celebra su festividad en el pueblo de Teror con actos religiosos, mercadillo artesanal y conciertos. Miles de devotos y turistas llenan el precioso casco histórico colonial para honrar a la Virgen del Pino.',
    ubicacion: 'Basílica de Nuestra Señora del Pino, Teror',
    maps: 'https://maps.google.com/?q=Basilica+Nuestra+Señora+del+Pino+Teror+Gran+Canaria',
    web: 'https://www.teror.es',
    entradas: 'https://www.teror.es',
    precio: 'Gratuito',
    horario: '8 septiembre · Todo el día',
  },
  {
    id: 30,
    nombre: 'Romería de San Nicolás de Tolentino - La Aldea',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-09-10',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería que se celebra la víspera de la famosa Fiesta del Charco, con carretas decoradas y romeros con trajes típicos que recorren las calles de La Aldea. Un evento que reúne a toda la comunidad en un ambiente íntimo y auténtico.',
    ubicacion: 'La Aldea de San Nicolás, Gran Canaria',
    maps: 'https://maps.google.com/?q=La+Aldea+de+San+Nicolas+Gran+Canaria',
    web: 'https://www.laaldea.es',
    entradas: 'https://www.laaldea.es',
    precio: 'Gratuito',
    horario: '10 septiembre · Desde las 11:00h',
  },
  {
    id: 31,
    nombre: 'Romería de Santa Marías - Guía',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-09-19',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería popular de Guía que consta de dos actos: la Bajada de la Rama desde las medianías y el desfile romero por el centro histórico. Música, carretas y trajes típicos protagonizan este encuentro cultural del norte de Gran Canaria.',
    ubicacion: 'Santa María de Guía, Gran Canaria',
    maps: 'https://maps.google.com/?q=Santa+Maria+de+Guia+Gran+Canaria',
    web: 'https://www.guia.es',
    entradas: 'https://www.guia.es',
    precio: 'Gratuito',
    horario: '19 septiembre · Desde las 11:00h',
  },
  {
    id: 32,
    nombre: 'Romería de San Mateo - Vega de San Mateo',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-09-20',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería que siempre se celebra el 20 de septiembre, reuniendo a cientos de personas en el centro histórico de la Vega de San Mateo. Carretas, música folclórica y gastronomía local en el corazón del interior grancanario.',
    ubicacion: 'Centro histórico, Vega de San Mateo',
    maps: 'https://maps.google.com/?q=Vega+de+San+Mateo+Gran+Canaria',
    web: 'https://www.vegadesanmateo.es',
    entradas: 'https://www.vegadesanmateo.es',
    precio: 'Gratuito',
    horario: '20 septiembre · Desde las 11:00h',
  },
  {
    id: 33,
    nombre: 'Mercadillo de Teror',
    isla: 'Gran Canaria',
    cat: 'mercadillos',
    fecha: '2026-06-07',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'El mercadillo dominical de Teror es uno de los más tradicionales y visitados de Gran Canaria. Artesanía, productos agrícolas, morcilla de Teror, quesos y bisutería local en el entorno del precioso casco histórico colonial.',
    ubicacion: 'Casco histórico, Teror',
    maps: 'https://maps.google.com/?q=Mercadillo+Teror+Gran+Canaria',
    web: 'https://www.teror.es',
    entradas: 'https://www.teror.es',
    precio: 'Entrada libre',
    horario: 'Domingos · 08:00 a 14:00h',
  },
  {
    id: 34,
    nombre: 'Carnaval de Las Palmas de Gran Canaria 2026',
    isla: 'Gran Canaria',
    cat: 'carnavales',
    fecha: '2026-07-01',
    emoji: '🎭',
    color: '#A855F7',
    destacado: true,
    desc: 'Uno de los carnavales de verano más especiales de España, con la elección de la Reina del Carnaval de Las Palmas en julio. Espectáculos, comparsas y el ambiente festivo que hace de Las Palmas una capital del carnaval internacional.',
    ubicacion: 'Parque Santa Catalina, Las Palmas de Gran Canaria',
    maps: 'https://maps.google.com/?q=Parque+Santa+Catalina+Las+Palmas+Gran+Canaria',
    web: 'https://www.laspalmasgc.es',
    entradas: 'https://www.laspalmasgc.es',
    precio: 'Gratuito',
    horario: 'Del 1 al 5 julio · Desde las 20:00h',
  },
  {
    id: 35,
    nombre: 'Romería de San Lorenzo - Las Palmas',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-08-08',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Tradicional romería en el barrio de San Lorenzo de Las Palmas de Gran Canaria con carretas decoradas, trajes típicos y música folclórica. Uno de los eventos más participativos de la capital grancanaria.',
    ubicacion: 'Barrio de San Lorenzo, Las Palmas de Gran Canaria',
    maps: 'https://maps.google.com/?q=San+Lorenzo+Las+Palmas+Gran+Canaria',
    web: 'https://www.laspalmasgc.es',
    entradas: 'https://www.laspalmasgc.es',
    precio: 'Gratuito',
    horario: '8 agosto · Desde las 11:00h',
  },
  {
    id: 36,
    nombre: 'Romería de San Roque - Firgas',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-08-15',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Cada 15 de agosto el municipio de Firgas sale de romería y las carretas y romeros ocupan sus calles con ofrendas para San Roque. Un ambiente festivo y muy tradicional en uno de los pueblos más pintorescos del norte de Gran Canaria.',
    ubicacion: 'Casco urbano, Firgas',
    maps: 'https://maps.google.com/?q=Firgas+Gran+Canaria',
    web: 'https://www.firgas.es',
    entradas: 'https://www.firgas.es',
    precio: 'Gratuito',
    horario: '15 agosto · Desde las 11:00h',
  },
  {
    id: 37,
    nombre: 'Día de Canarias en Las Palmas',
    isla: 'Gran Canaria',
    cat: 'festivos',
    fecha: '2026-05-30',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La capital grancanaria celebra el Día de Canarias con actos institucionales, exhibiciones de lucha canaria, folklore y actividades culturales. Un día para conocer y disfrutar la rica identidad cultural del archipiélago.',
    ubicacion: 'Parque Doramas, Las Palmas de Gran Canaria',
    maps: 'https://maps.google.com/?q=Parque+Doramas+Las+Palmas+Gran+Canaria',
    web: 'https://www.laspalmasgc.es',
    entradas: 'https://www.laspalmasgc.es',
    precio: 'Gratuito',
    horario: '30 mayo · Todo el día',
  },
  {
    id: 38,
    nombre: 'Romería de San Juan - Agaete',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-06-24',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Colorida romería en el municipio de Agaete en honor a San Juan Bautista. Carretas decoradas, trajes típicos y música de cuatro y timple llenan las calles del pintoresco pueblo norteño de Gran Canaria.',
    ubicacion: 'Casco urbano, Agaete',
    maps: 'https://maps.google.com/?q=Agaete+Gran+Canaria',
    web: 'https://www.agaete.es',
    entradas: 'https://www.agaete.es',
    precio: 'Gratuito',
    horario: '24 junio · Desde las 11:00h',
  },
  {
    id: 39,
    nombre: 'Mercadillo Artesanal de Maspalomas',
    isla: 'Gran Canaria',
    cat: 'mercadillos',
    fecha: '2026-06-13',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'Mercadillo de artesanía y productos locales en el centro turístico de Maspalomas. Artesanos de Gran Canaria exhiben cerámica, tejidos, bisutería y productos gastronómicos en un mercado con ambiente festivo y familiar.',
    ubicacion: 'Centro Comercial Yumbo, Maspalomas',
    maps: 'https://maps.google.com/?q=Yumbo+Centre+Maspalomas+Gran+Canaria',
    web: 'https://www.grancanaria.com/turismo',
    entradas: 'https://www.grancanaria.com/turismo',
    precio: 'Entrada libre',
    horario: 'Fines de semana · 10:00 a 20:00h',
  },
  {
    id: 40,
    nombre: 'Romería de la Virgen del Buen Suceso - Ingenio',
    isla: 'Gran Canaria',
    cat: 'romerias',
    fecha: '2026-08-14',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería que siempre se celebra la víspera del 15 de agosto, día de la Asunción de la Virgen María. El municipio de Ingenio sale a las calles con carretas y trajes típicos en una de las romerías más constantes del calendario grancanario.',
    ubicacion: 'El Carrizal, Ingenio',
    maps: 'https://maps.google.com/?q=El+Carrizal+Ingenio+Gran+Canaria',
    web: 'https://www.ingenio.es',
    entradas: 'https://www.ingenio.es',
    precio: 'Gratuito',
    horario: '14 agosto · Desde las 11:00h',
  },
  {
    id: 41,
    nombre: 'Festividad de San Ginés - Arrecife',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-09-25',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'Las fiestas patronales de la capital de Lanzarote honran a San Ginés con conciertos, verbenas, procesiones y actos populares. Una semana de celebraciones en Arrecife que reúne a locales y turistas en el corazón de la isla.',
    ubicacion: 'Plaza de San Ginés, Arrecife',
    maps: 'https://maps.google.com/?q=Plaza+San+Gines+Arrecife+Lanzarote',
    web: 'https://www.arrecife.es',
    entradas: 'https://www.arrecife.es',
    precio: 'Gratuito',
    horario: 'Del 22 al 27 septiembre · Desde las 18:00h',
  },
  {
    id: 42,
    nombre: 'Lava Live Festival Arrecife - Edición Junio',
    isla: 'Lanzarote',
    cat: 'conciertos',
    fecha: '2026-06-20',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: true,
    desc: 'Uno de los grandes festivales musicales de Lanzarote, con artistas nacionales e internacionales en el escenario de Arrecife. El festival que combina conciertos en vivo, ambiente urbano y producción de primer nivel junto al mar.',
    ubicacion: 'Puerto de Arrecife, Arrecife',
    maps: 'https://maps.google.com/?q=Puerto+Arrecife+Lanzarote',
    web: 'https://www.lavalive.es',
    entradas: 'https://www.lavalive.es',
    precio: 'Desde 30€',
    horario: '20 y 21 junio · Desde las 18:00h',
  },
  {
    id: 43,
    nombre: 'Sonidos Líquidos - La Geria',
    isla: 'Lanzarote',
    cat: 'conciertos',
    fecha: '2026-06-06',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: true,
    desc: 'Festival boutique único en el mundo, celebrado entre los viñedos volcánicos de La Geria. Música indie y alternativa, gastronomía local con vinos lanzaroteños y una experiencia íntima ligada profundamente a la identidad volcánica de la isla.',
    ubicacion: 'Bodegas de La Geria, Yaiza',
    maps: 'https://maps.google.com/?q=La+Geria+Lanzarote',
    web: 'https://www.sonidosliquidos.com',
    entradas: 'https://www.sonidosliquidos.com',
    precio: 'Desde 20€',
    horario: '6 junio · Desde las 16:00h',
  },
  {
    id: 44,
    nombre: 'Festividad de Nuestra Señora de los Volcanes - Lanzarote',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-09-15',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Fiesta insular de Lanzarote y La Graciosa en honor a la patrona volcánica de la isla. Actos religiosos, procesiones y celebraciones populares que unen a todos los municipios lanzaroteños en un día de devoción e identidad isleña.',
    ubicacion: 'Mancha Blanca, Tinajo',
    maps: 'https://maps.google.com/?q=Mancha+Blanca+Tinajo+Lanzarote',
    web: 'https://www.tinajo.es',
    entradas: 'https://www.tinajo.es',
    precio: 'Gratuito',
    horario: '15 septiembre · Todo el día',
  },
  {
    id: 45,
    nombre: 'Romería de San Juan - Haría',
    isla: 'Lanzarote',
    cat: 'romerias',
    fecha: '2026-06-24',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería tradicional en el municipio más verde de Lanzarote, en el valle de los mil palmeras. Carretas decoradas, trajes típicos y folclore lanzaroteño se dan cita en Haría para honrar a San Juan Bautista con gran participación vecinal.',
    ubicacion: 'Casco urbano, Haría',
    maps: 'https://maps.google.com/?q=Haria+Lanzarote',
    web: 'https://www.haria.es',
    entradas: 'https://www.haria.es',
    precio: 'Gratuito',
    horario: '24 junio · Desde las 11:00h',
  },
  {
    id: 46,
    nombre: 'Festividad de Nuestra Señora del Carmen - Teguise',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-07-16',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La festividad de la Virgen del Carmen llena de vida la histórica Villa de Teguise, antigua capital de Lanzarote. Procesiones, música y ambiente festivo en un entorno de gran valor patrimonial en el corazón de la isla.',
    ubicacion: 'Villa de Teguise, Teguise',
    maps: 'https://maps.google.com/?q=Villa+Teguise+Lanzarote',
    web: 'https://www.teguise.es',
    entradas: 'https://www.teguise.es',
    precio: 'Gratuito',
    horario: '16 julio · Todo el día',
  },
  {
    id: 47,
    nombre: 'Mercadillo de Teguise',
    isla: 'Lanzarote',
    cat: 'mercadillos',
    fecha: '2026-06-07',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'El mercadillo dominical de Teguise es uno de los mercados artesanales más grandes y visitados de Canarias. Artesanía lanzaroteña, ropa vintage, productos locales y gastronomía típica en el entorno histórico de la antigua capital de la isla.',
    ubicacion: 'Villa de Teguise, Teguise',
    maps: 'https://maps.google.com/?q=Villa+Teguise+Lanzarote',
    web: 'https://www.teguise.es',
    entradas: 'https://www.teguise.es',
    precio: 'Entrada libre',
    horario: 'Domingos · 09:00 a 14:00h',
  },
  {
    id: 48,
    nombre: 'Lava Live Festival Arrecife - Edición Julio',
    isla: 'Lanzarote',
    cat: 'conciertos',
    fecha: '2026-07-11',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: false,
    desc: 'Segunda edición del verano del Lava Live Festival con nuevos artistas internacionales en el escenario portuario de Arrecife. Un fin de semana de música en vivo con el mar Atlántico de telón de fondo en la capital de Lanzarote.',
    ubicacion: 'Puerto de Arrecife, Arrecife',
    maps: 'https://maps.google.com/?q=Puerto+Arrecife+Lanzarote',
    web: 'https://www.lavalive.es',
    entradas: 'https://www.lavalive.es',
    precio: 'Desde 30€',
    horario: '11 y 12 julio · Desde las 18:00h',
  },
  {
    id: 49,
    nombre: 'Festividad de San Marcial del Rubicón - Yaiza',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-07-07',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Festividad del patrón del municipio de Yaiza, con actos religiosos, verbenas y el ambiente tradicional lanzaroteño en el pueblo blanco más bonito de la isla. Una celebración íntima y auténtica del sur de Lanzarote.',
    ubicacion: 'Yaiza, Lanzarote',
    maps: 'https://maps.google.com/?q=Yaiza+Lanzarote',
    web: 'https://www.yaiza.es',
    entradas: 'https://www.yaiza.es',
    precio: 'Gratuito',
    horario: '7 julio · Todo el día',
  },
  {
    id: 50,
    nombre: 'Festividad de Nuestra Señora de las Nieves - Teguise',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-08-05',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Festividad local de Teguise en honor a Nuestra Señora de las Nieves, con procesión, actos religiosos y celebraciones populares en la histórica villa. Música y convivencia vecinal en el municipio central de Lanzarote.',
    ubicacion: 'Villa de Teguise, Teguise',
    maps: 'https://maps.google.com/?q=Villa+Teguise+Lanzarote',
    web: 'https://www.teguise.es',
    entradas: 'https://www.teguise.es',
    precio: 'Gratuito',
    horario: '5 agosto · Todo el día',
  },
  {
    id: 51,
    nombre: 'Festividad de San Bartolomé - San Bartolomé',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-08-24',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas patronales del municipio de San Bartolomé celebran al santo con conciertos, verbenas y actividades para toda la familia. Un ambiente festivo y muy local en el municipio central de la isla del fuego.',
    ubicacion: 'Casco urbano, San Bartolomé',
    maps: 'https://maps.google.com/?q=San+Bartolome+Lanzarote',
    web: 'https://www.sanbartolome.es',
    entradas: 'https://www.sanbartolome.es',
    precio: 'Gratuito',
    horario: 'Del 22 al 25 agosto · Desde las 18:00h',
  },
  {
    id: 52,
    nombre: 'Festividad de Nuestra Señora de los Remedios - Yaiza',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-09-08',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Fiestas locales de Yaiza en honor a la Virgen de los Remedios con procesión, música y celebraciones en el pueblo blanco más fotogénico de Lanzarote. Una oportunidad única de vivir la cultura lanzaroteña más genuina.',
    ubicacion: 'Yaiza, Lanzarote',
    maps: 'https://maps.google.com/?q=Yaiza+Lanzarote',
    web: 'https://www.yaiza.es',
    entradas: 'https://www.yaiza.es',
    precio: 'Gratuito',
    horario: '8 septiembre · Todo el día',
  },
  {
    id: 53,
    nombre: 'Festividad de San Juan Bautista - Tinajo',
    isla: 'Lanzarote',
    cat: 'festivos',
    fecha: '2026-06-24',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Tinajo celebra su festividad local de San Juan Bautista con actos religiosos y populares. Un ambiente festivo y muy tradicional en el municipio que alberga el Parque Nacional de Timanfaya y la ermita de Los Volcanes.',
    ubicacion: 'Casco urbano, Tinajo',
    maps: 'https://maps.google.com/?q=Tinajo+Lanzarote',
    web: 'https://www.tinajo.es',
    entradas: 'https://www.tinajo.es',
    precio: 'Gratuito',
    horario: '24 junio · Todo el día',
  },
  {
    id: 54,
    nombre: 'Festividad de Nuestra Señora de la Peña - Fuerteventura',
    isla: 'Fuerteventura',
    cat: 'festivos',
    fecha: '2026-09-18',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'La patrona de Fuerteventura convoca a miles de fieles desde toda la isla hasta la ermita de La Peña en Vega de Río Palmas. Una festividad insular de gran devoción y arraigo popular que combina procesión, tradición y música majorera.',
    ubicacion: 'Ermita de La Peña, Betancuria',
    maps: 'https://maps.google.com/?q=Vega+de+Rio+Palmas+Betancuria+Fuerteventura',
    web: 'https://www.betancuria.es',
    entradas: 'https://www.betancuria.es',
    precio: 'Gratuito',
    horario: '18 septiembre · Todo el día',
  },
  {
    id: 55,
    nombre: 'Arena Negra Festival - Gran Tarajal',
    isla: 'Fuerteventura',
    cat: 'conciertos',
    fecha: '2026-11-07',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: true,
    desc: 'El festival de música con identidad propia de Fuerteventura regresa a Gran Tarajal con artistas de gran proyección nacional e internacional. Un evento único que combina playa de arena negra volcánica y música de primer nivel en el sur de la isla.',
    ubicacion: 'Playa de Gran Tarajal, Tuineje',
    maps: 'https://maps.google.com/?q=Gran+Tarajal+Fuerteventura',
    web: 'https://www.arenanegrafestival.com',
    entradas: 'https://www.arenanegrafestival.com',
    precio: 'Desde 25€',
    horario: '7 y 8 noviembre · Desde las 17:00h',
  },
  {
    id: 56,
    nombre: 'Fuerteventura en Música - El Cotillo',
    isla: 'Fuerteventura',
    cat: 'conciertos',
    fecha: '2026-07-18',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: false,
    desc: 'Festival de música indie y mestizaje en la playa de La Concha de El Cotillo, uno de los enclaves más espectaculares de Fuerteventura. Música en vivo con el océano Atlántico y las lagunas de aguas turquesas como escenario natural único.',
    ubicacion: 'Playa de La Concha, El Cotillo',
    maps: 'https://maps.google.com/?q=Playa+La+Concha+El+Cotillo+Fuerteventura',
    web: 'https://www.cabildofuer.es',
    entradas: 'https://www.cabildofuer.es',
    precio: 'Entrada libre',
    horario: '18 y 19 julio · Desde las 17:00h',
  },
  {
    id: 57,
    nombre: 'Festividad de Nuestra Señora de Antigua',
    isla: 'Fuerteventura',
    cat: 'festivos',
    fecha: '2026-09-08',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas patronales de Antigua reúnen a vecinos de toda la isla en la ermita de Nuestra Señora de Antigua. Procesiones, verbenas, música y gastronomía majorera en el municipio más central de la isla.',
    ubicacion: 'Ermita de Antigua, Antigua',
    maps: 'https://maps.google.com/?q=Antigua+Fuerteventura',
    web: 'https://www.antigua.es',
    entradas: 'https://www.antigua.es',
    precio: 'Gratuito',
    horario: '8 septiembre · Todo el día',
  },
  {
    id: 58,
    nombre: 'Festividad de San Buenaventura - Betancuria',
    isla: 'Fuerteventura',
    cat: 'festivos',
    fecha: '2026-07-14',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La antigua capital de Fuerteventura celebra a su patrón San Buenaventura con actos religiosos y populares en el entorno de la catedral más antigua de Canarias. Historia, tradición y devoción majorera en un paraje de gran belleza.',
    ubicacion: 'Catedral de Betancuria, Betancuria',
    maps: 'https://maps.google.com/?q=Betancuria+Fuerteventura',
    web: 'https://www.betancuria.es',
    entradas: 'https://www.betancuria.es',
    precio: 'Gratuito',
    horario: '14 julio · Todo el día',
  },
  {
    id: 59,
    nombre: 'Festividad de Nuestra Señora del Carmen - La Oliva',
    isla: 'Fuerteventura',
    cat: 'festivos',
    fecha: '2026-07-16',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'El municipio del norte de Fuerteventura celebra la festividad de la Virgen del Carmen con procesión, verbenas y conciertos. Un ambiente festivo y muy participativo en el entorno del Monumento Natural de los Jameos del Corralejo.',
    ubicacion: 'La Oliva, Fuerteventura',
    maps: 'https://maps.google.com/?q=La+Oliva+Fuerteventura',
    web: 'https://www.laoliva.es',
    entradas: 'https://www.laoliva.es',
    precio: 'Gratuito',
    horario: '16 julio · Todo el día',
  },
  {
    id: 60,
    nombre: 'Romería del Valle de Santa Inés - Betancuria',
    isla: 'Fuerteventura',
    cat: 'romerias',
    fecha: '2026-07-18',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería tradicional del interior de Fuerteventura que recorre el pintoresco Valle de Santa Inés. Trajes típicos majoreros, carretas decoradas y música popular en uno de los paisajes más fotogénicos y recónditos de la isla.',
    ubicacion: 'Valle de Santa Inés, Betancuria',
    maps: 'https://maps.google.com/?q=Santa+Ines+Betancuria+Fuerteventura',
    web: 'https://www.betancuria.es',
    entradas: 'https://www.betancuria.es',
    precio: 'Gratuito',
    horario: '18 julio · Desde las 11:00h',
  },
  {
    id: 61,
    nombre: 'Festividad de San Bartolomé - Betancuria',
    isla: 'Fuerteventura',
    cat: 'festivos',
    fecha: '2026-08-24',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La antigua capital de Fuerteventura celebra a San Bartolomé con actos religiosos, música majorera y actividades populares. Una festividad con mucho encanto en el casco histórico más auténtico de la isla.',
    ubicacion: 'Casco histórico, Betancuria',
    maps: 'https://maps.google.com/?q=Betancuria+Fuerteventura',
    web: 'https://www.betancuria.es',
    entradas: 'https://www.betancuria.es',
    precio: 'Gratuito',
    horario: '24 agosto · Todo el día',
  },
  {
    id: 62,
    nombre: 'Mercadillo Artesanal de Corralejo',
    isla: 'Fuerteventura',
    cat: 'mercadillos',
    fecha: '2026-06-06',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'El mercadillo más animado del norte de Fuerteventura reúne artesanos y productores locales en Corralejo. Artesanía majorera, productos naturales, bisutería y ropa de surf en el ambiente colorido del pueblo más turístico de la isla.',
    ubicacion: 'Plaza Grandes Playas, Corralejo',
    maps: 'https://maps.google.com/?q=Corralejo+Fuerteventura',
    web: 'https://www.laoliva.es',
    entradas: 'https://www.laoliva.es',
    precio: 'Entrada libre',
    horario: 'Viernes y sábados · 09:00 a 14:00h',
  },
  {
    id: 63,
    nombre: 'Festividad de San Bartolomé - Puerto del Rosario',
    isla: 'Fuerteventura',
    cat: 'festivos',
    fecha: '2026-08-05',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La capital de Fuerteventura celebra sus fiestas de verano con conciertos gratuitos, verbenas y actividades culturales en el paseo marítimo de Puerto del Rosario. Una semana de celebraciones en el corazón administrativo de la isla.',
    ubicacion: 'Paseo Marítimo, Puerto del Rosario',
    maps: 'https://maps.google.com/?q=Puerto+del+Rosario+Fuerteventura',
    web: 'https://www.puertodelrosario.org',
    entradas: 'https://www.puertodelrosario.org',
    precio: 'Gratuito',
    horario: 'Del 3 al 8 agosto · Desde las 18:00h',
  },
  {
    id: 64,
    nombre: 'Fiestas de San Juan - Pájara',
    isla: 'Fuerteventura',
    cat: 'festivos',
    fecha: '2026-07-02',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'El municipio de Pájara celebra sus fiestas de verano con música, verbenas y actividades tradicionales. Una localidad tranquila del suroeste de Fuerteventura que se anima en julio con su celebración más importante del año.',
    ubicacion: 'Casco urbano, Pájara',
    maps: 'https://maps.google.com/?q=Pajara+Fuerteventura',
    web: 'https://www.pajara.es',
    entradas: 'https://www.pajara.es',
    precio: 'Gratuito',
    horario: 'Del 2 al 5 julio · Desde las 18:00h',
  },
  {
    id: 65,
    nombre: 'Festividad de Nuestra Señora de las Nieves - La Palma',
    isla: 'La Palma',
    cat: 'festivos',
    fecha: '2026-08-05',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'La fiesta patrona insular de La Palma convoca a miles de devotos en Santa Cruz de La Palma. Procesión, actos religiosos y celebraciones populares en la capital palmera en honor a la Virgen de las Nieves, patrona de la isla.',
    ubicacion: 'Santuario de las Nieves, Santa Cruz de La Palma',
    maps: 'https://maps.google.com/?q=Santuario+Nieves+Santa+Cruz+La+Palma',
    web: 'https://www.santacruzdelapalma.es',
    entradas: 'https://www.santacruzdelapalma.es',
    precio: 'Gratuito',
    horario: '5 agosto · Todo el día',
  },
  {
    id: 66,
    nombre: 'Fiestas Lustrales de La Palma - Preactividades',
    isla: 'La Palma',
    cat: 'festivos',
    fecha: '2026-07-01',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'Las afamadas Fiestas Lustrales de La Palma, declaradas de Interés Turístico Internacional, se celebran cada cinco años. Danzas históricas, el Baile de la Enanos, el Minué y un impresionante cortejo procesional llenan de color Santa Cruz de La Palma.',
    ubicacion: 'Casco histórico, Santa Cruz de La Palma',
    maps: 'https://maps.google.com/?q=Santa+Cruz+de+La+Palma',
    web: 'https://www.santacruzdelapalma.es',
    entradas: 'https://www.santacruzdelapalma.es',
    precio: 'Gratuito',
    horario: 'Julio y agosto 2026 · Múltiples actos',
  },
  {
    id: 67,
    nombre: 'Concierto Pablo Alborán - La Palma',
    isla: 'La Palma',
    cat: 'conciertos',
    fecha: '2026-08-22',
    emoji: '🎵',
    color: '#0EA5E9',
    destacado: true,
    desc: 'Uno de los conciertos más esperados del año en Canarias, con Pablo Alborán como gran protagonista en La Palma. Una cita muy especial dentro de la agenda musical del archipiélago en la Isla Bonita.',
    ubicacion: 'Recinto ferial, Santa Cruz de La Palma',
    maps: 'https://maps.google.com/?q=Santa+Cruz+de+La+Palma',
    web: 'https://www.santacruzdelapalma.es',
    entradas: 'https://www.entradas.com',
    precio: 'Desde 35€',
    horario: '22 agosto · 21:00h',
  },
  {
    id: 68,
    nombre: 'Fiesta de San Andrés - Vinos de La Palma',
    isla: 'La Palma',
    cat: 'festivos',
    fecha: '2026-11-28',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La noche de San Andrés marca la apertura de los vinos nuevos en La Palma, con la tradicional subida del vino desde las bodegas. Degustaciones, música, hogueras y el ambiente festivo de la vendimia palmera en los municipios del norte.',
    ubicacion: 'Los Llanos de Aridane y municipios del norte',
    maps: 'https://maps.google.com/?q=Los+Llanos+de+Aridane+La+Palma',
    web: 'https://www.losllanosdearidane.es',
    entradas: 'https://www.losllanosdearidane.es',
    precio: 'Gratuito',
    horario: '28 noviembre · Desde las 20:00h',
  },
  {
    id: 69,
    nombre: 'Fiestas de El Paso - La Palma',
    isla: 'La Palma',
    cat: 'festivos',
    fecha: '2026-07-25',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas patronales de El Paso celebran a Santiago Apóstol con verbenas, conciertos y actividades para toda la familia. El municipio sericicultural de La Palma, conocido por sus artesanos del telar, se engalana para la fiesta.',
    ubicacion: 'Casco urbano, El Paso',
    maps: 'https://maps.google.com/?q=El+Paso+La+Palma',
    web: 'https://www.elpaso.es',
    entradas: 'https://www.elpaso.es',
    precio: 'Gratuito',
    horario: 'Del 25 al 30 julio · Desde las 18:00h',
  },
  {
    id: 70,
    nombre: 'Romería de Puntagorda - La Palma',
    isla: 'La Palma',
    cat: 'romerias',
    fecha: '2026-06-20',
    emoji: '🕯️',
    color: '#92400E',
    destacado: false,
    desc: 'Romería tradicional en el municipio del norte de La Palma, rodeado de almendros y pinos. Trajes típicos palmeros, música folclórica y carretas en un entorno natural de gran belleza entre el Parque Natural de Cumbre Vieja y el océano.',
    ubicacion: 'Casco urbano, Puntagorda',
    maps: 'https://maps.google.com/?q=Puntagorda+La+Palma',
    web: 'https://www.puntagorda.es',
    entradas: 'https://www.puntagorda.es',
    precio: 'Gratuito',
    horario: '20 junio · Desde las 11:00h',
  },
  {
    id: 71,
    nombre: 'Fiestas de Fuencaliente - Vendimia',
    isla: 'La Palma',
    cat: 'festivos',
    fecha: '2026-09-05',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas de Fuencaliente combinan la celebración patronal con la fiesta de la vendimia en los viñedos volcánicos del municipio. Música, degustación de vinos locales y actividades culturales en el entorno del volcán San Antonio.',
    ubicacion: 'Casco urbano, Fuencaliente',
    maps: 'https://maps.google.com/?q=Fuencaliente+La+Palma',
    web: 'https://www.fuencaliente.es',
    entradas: 'https://www.fuencaliente.es',
    precio: 'Gratuito',
    horario: 'Del 5 al 8 septiembre · Desde las 18:00h',
  },
  {
    id: 72,
    nombre: 'Mercadillo Artesanal de Los Llanos de Aridane',
    isla: 'La Palma',
    cat: 'mercadillos',
    fecha: '2026-06-06',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'Mercadillo semanal en la ciudad más poblada de La Palma con productos de artesanía local, textiles artesanales, cerámica palmera y agricultura ecológica. El lugar ideal para comprar souvenirs auténticos y conocer la economía local.',
    ubicacion: 'Plaza de España, Los Llanos de Aridane',
    maps: 'https://maps.google.com/?q=Los+Llanos+de+Aridane+La+Palma',
    web: 'https://www.losllanosdearidane.es',
    entradas: 'https://www.losllanosdearidane.es',
    precio: 'Entrada libre',
    horario: 'Sábados · 09:00 a 14:00h',
  },
  {
    id: 73,
    nombre: 'Fiestas de Barlovento',
    isla: 'La Palma',
    cat: 'festivos',
    fecha: '2026-09-08',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas patronales de Barlovento, municipio lluvioso y verde del norte de La Palma, con verbenas, conciertos y actividades tradicionales. Una celebración íntima y auténtica en uno de los municipios más tranquilos y naturales de la isla.',
    ubicacion: 'Casco urbano, Barlovento',
    maps: 'https://maps.google.com/?q=Barlovento+La+Palma',
    web: 'https://www.barlovento.es',
    entradas: 'https://www.barlovento.es',
    precio: 'Gratuito',
    horario: 'Del 7 al 10 septiembre · Desde las 18:00h',
  },
  {
    id: 74,
    nombre: 'Fiestas de Santiago Apóstol - Playa de Santiago',
    isla: 'La Gomera',
    cat: 'festivos',
    fecha: '2026-07-25',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas de Playa de Santiago en honor a Santiago Apóstol incluyen torneos, verbenas y festivales infantiles. Las chácaras y tambores acompañan la procesión, llenando de emoción y tradición el pequeño puerto del sur de La Gomera.',
    ubicacion: 'Playa de Santiago, Alajeró',
    maps: 'https://maps.google.com/?q=Playa+de+Santiago+Alajeró+La+Gomera',
    web: 'https://www.alajerogomera.es',
    entradas: 'https://www.alajerogomera.es',
    precio: 'Gratuito',
    horario: 'Del 25 al 28 julio · Desde las 18:00h',
  },
  {
    id: 75,
    nombre: 'Fiestas Colombinas - San Sebastián de La Gomera',
    isla: 'La Gomera',
    cat: 'festivos',
    fecha: '2026-09-06',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'Fiestas que conmemoran la partida de Cristóbal Colón desde La Gomera hacia el Nuevo Mundo. Exposiciones, conciertos, teatro y eventos deportivos llenan la capital insular durante días de celebración histórica y cultural.',
    ubicacion: 'San Sebastián de La Gomera',
    maps: 'https://maps.google.com/?q=San+Sebastian+de+La+Gomera',
    web: 'https://www.lagomera.es',
    entradas: 'https://www.lagomera.es',
    precio: 'Gratuito',
    horario: 'Del 6 al 12 septiembre · Todo el día',
  },
  {
    id: 76,
    nombre: 'Fiesta de Las Rosas - Vallehermoso',
    isla: 'La Gomera',
    cat: 'mercadillos',
    fecha: '2026-08-08',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'Fiestas del barrio de Las Rosas en Vallehermoso con mercadillo artesanal donde encontrar cerámica gomera única y productos elaborados con miel de palma. Un punto de encuentro para vecinos de toda la isla con música y baile tradicional.',
    ubicacion: 'Barrio de Las Rosas, Vallehermoso',
    maps: 'https://maps.google.com/?q=Las+Rosas+Vallehermoso+La+Gomera',
    web: 'https://www.vallehermoso.es',
    entradas: 'https://www.vallehermoso.es',
    precio: 'Entrada libre',
    horario: '8 y 9 agosto · Todo el día',
  },
  {
    id: 77,
    nombre: 'Fiestas de la Candelaria - Chipude',
    isla: 'La Gomera',
    cat: 'festivos',
    fecha: '2026-08-15',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Tradición gomera única donde los chácaras y tambores suenan sin parar mientras se cantan romances a la Virgen. El encuentro más importante de música y baile tradicional de La Gomera, con los mejores tocadores de la isla.',
    ubicacion: 'Chipude, Vallehermoso',
    maps: 'https://maps.google.com/?q=Chipude+Vallehermoso+La+Gomera',
    web: 'https://www.vallehermoso.es',
    entradas: 'https://www.vallehermoso.es',
    precio: 'Gratuito',
    horario: '15 agosto · Todo el día',
  },
  {
    id: 78,
    nombre: 'Fiestas de El Cedro - Parque de Garajonay',
    isla: 'La Gomera',
    cat: 'festivos',
    fecha: '2026-08-22',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Festejo único en la ermita de El Cedro, en el corazón del bosque de laurisilva del Parque Nacional de Garajonay. La Virgen de Lourdes sale en procesión a través del bosque mágico entre tambores y chácaras en un entorno irrepetible.',
    ubicacion: 'Ermita de El Cedro, Hermigua',
    maps: 'https://maps.google.com/?q=El+Cedro+Garajonay+La+Gomera',
    web: 'https://www.hermigua.es',
    entradas: 'https://www.hermigua.es',
    precio: 'Gratuito',
    horario: '22 agosto · Desde las 10:00h',
  },
  {
    id: 79,
    nombre: 'Baile de Magos de Valle Gran Rey',
    isla: 'La Gomera',
    cat: 'festivos',
    fecha: '2026-05-30',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'El Baile de Magos del Día de Canarias en Valle Gran Rey celebra la identidad canaria con música folclórica, trajes típicos y el ambiente único del famoso municipio costero de La Gomera. Un espectáculo de color y tradición junto al mar.',
    ubicacion: 'Valle Gran Rey, La Gomera',
    maps: 'https://maps.google.com/?q=Valle+Gran+Rey+La+Gomera',
    web: 'https://www.vallegranrey.es',
    entradas: 'https://www.vallegranrey.es',
    precio: 'Gratuito',
    horario: '30 mayo · Desde las 11:00h',
  },
  {
    id: 80,
    nombre: 'Fiestas Patronales de San Sebastián - La Gomera',
    isla: 'La Gomera',
    cat: 'festivos',
    fecha: '2026-07-11',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas patronales de San Sebastián de La Gomera llenan la capital insular de verbenas, conciertos y actividades. La ciudad que vio partir a Colón celebra su fiesta grande de verano con mucho ambiente local y turístico.',
    ubicacion: 'San Sebastián de La Gomera',
    maps: 'https://maps.google.com/?q=San+Sebastian+de+La+Gomera',
    web: 'https://www.lagomera.es',
    entradas: 'https://www.lagomera.es',
    precio: 'Gratuito',
    horario: 'Del 11 al 17 julio · Desde las 18:00h',
  },
  {
    id: 81,
    nombre: 'Fiestas de San Juan - Valle Gran Rey',
    isla: 'La Gomera',
    cat: 'festivos',
    fecha: '2026-06-24',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'El precioso Valle Gran Rey celebra la festividad de San Juan con hogueras en la playa, música y el ambiente festivo propio del municipio más cosmopolita de La Gomera. Una noche mágica entre barrancos y océano.',
    ubicacion: 'Valle Gran Rey, La Gomera',
    maps: 'https://maps.google.com/?q=Valle+Gran+Rey+La+Gomera',
    web: 'https://www.vallegranrey.es',
    entradas: 'https://www.vallegranrey.es',
    precio: 'Gratuito',
    horario: '23 y 24 junio · Desde las 20:00h',
  },
  {
    id: 82,
    nombre: 'Bajada de la Virgen de los Reyes - El Hierro',
    isla: 'El Hierro',
    cat: 'festivos',
    fecha: '2026-07-04',
    emoji: '🎉',
    color: '#EF4444',
    destacado: true,
    desc: 'La fiesta por excelencia de El Hierro se celebra cada cuatro años. La patrona de la isla es llevada en procesión 28 kilómetros desde su ermita hasta Valverde entre bailarines de blanco, chácaras y tambores. Declarada Fiesta de Interés Turístico Nacional.',
    ubicacion: 'Ermita de los Reyes hasta Valverde, El Hierro',
    maps: 'https://maps.google.com/?q=Ermita+de+Los+Reyes+El+Hierro',
    web: 'https://www.elhierro.es',
    entradas: 'https://www.elhierro.es',
    precio: 'Gratuito',
    horario: '4 julio · Todo el día',
  },
  {
    id: 83,
    nombre: 'Festividad de Nuestra Señora de los Reyes - El Hierro',
    isla: 'El Hierro',
    cat: 'festivos',
    fecha: '2026-09-24',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La festividad insular de El Hierro en honor a la patrona de la isla, con actos religiosos y culturales que celebran la devoción herreña. Una jornada de identidad insular en la isla más occidental y prístina del archipiélago.',
    ubicacion: 'Valverde, El Hierro',
    maps: 'https://maps.google.com/?q=Valverde+El+Hierro',
    web: 'https://www.elhierro.es',
    entradas: 'https://www.elhierro.es',
    precio: 'Gratuito',
    horario: '24 septiembre · Todo el día',
  },
  {
    id: 84,
    nombre: 'Canary Surf Film Festival - El Hierro',
    isla: 'El Hierro',
    cat: 'deportes',
    fecha: '2026-08-22',
    emoji: '🏄',
    color: '#F97316',
    destacado: false,
    desc: 'El itinerante festival de cine de surf de Canarias recala en la salvaje Playa de Timijiraque en El Hierro. Proyecciones de las mejores películas de surf del mundo, actuaciones musicales y un ambiente único en la isla más occidental de Europa.',
    ubicacion: 'Playa de Timijiraque, Valverde',
    maps: 'https://maps.google.com/?q=Playa+Timijiraque+El+Hierro',
    web: 'https://www.csff.es',
    entradas: 'https://www.csff.es',
    precio: 'Entrada libre',
    horario: '22 y 23 agosto · Desde las 18:00h',
  },
  {
    id: 85,
    nombre: 'Baile de Magos de San Isidro - Valverde',
    isla: 'El Hierro',
    cat: 'festivos',
    fecha: '2026-05-16',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'El Baile de Magos más importante de El Hierro reúne a los herreños en la capital insular para celebrar la festividad de San Isidro con trajes típicos, música folclórica y un ambiente de gran participación comunitaria.',
    ubicacion: 'Valverde, El Hierro',
    maps: 'https://maps.google.com/?q=Valverde+El+Hierro',
    web: 'https://www.elhierro.es',
    entradas: 'https://www.elhierro.es',
    precio: 'Gratuito',
    horario: '16 mayo · Desde las 11:00h',
  },
  {
    id: 86,
    nombre: 'Fiestas de la Frontera - La Frontera',
    isla: 'El Hierro',
    cat: 'festivos',
    fecha: '2026-08-01',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'Las fiestas patronales del municipio más poblado de El Hierro, con actos en honor al patrón local, conciertos, verbenas y actividades culturales. El municipio del Valle del Golfo, uno de los paisajes más espectaculares de Canarias, se viste de fiesta.',
    ubicacion: 'La Frontera, El Hierro',
    maps: 'https://maps.google.com/?q=La+Frontera+El+Hierro',
    web: 'https://www.fronttera.es',
    entradas: 'https://www.fronttera.es',
    precio: 'Gratuito',
    horario: 'Del 1 al 5 agosto · Desde las 18:00h',
  },
  {
    id: 87,
    nombre: 'Fiestas de San Juan - El Pinar',
    isla: 'El Hierro',
    cat: 'festivos',
    fecha: '2026-06-24',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'El municipio de El Pinar en el sur de El Hierro celebra la noche de San Juan con hogueras, música herreña y una convivencia vecinal muy especial. Una noche mágica en la isla más pequeña del archipiélago con un ambiente muy íntimo.',
    ubicacion: 'El Pinar, El Hierro',
    maps: 'https://maps.google.com/?q=El+Pinar+El+Hierro',
    web: 'https://www.elhierro.es',
    entradas: 'https://www.elhierro.es',
    precio: 'Gratuito',
    horario: '23 y 24 junio · Desde las 20:00h',
  },
  {
    id: 88,
    nombre: 'Día de Canarias en El Hierro',
    isla: 'El Hierro',
    cat: 'festivos',
    fecha: '2026-05-30',
    emoji: '🎉',
    color: '#EF4444',
    destacado: false,
    desc: 'La isla más pequeña y prístina de Canarias celebra el Día de Canarias con exhibiciones de folklore herreño, deportes tradicionales, música de chácaras y tambores, y gastronomía local. Orgullo insular en la isla de la Reserva de la Biosfera.',
    ubicacion: 'Valverde, El Hierro',
    maps: 'https://maps.google.com/?q=Valverde+El+Hierro',
    web: 'https://www.elhierro.es',
    entradas: 'https://www.elhierro.es',
    precio: 'Gratuito',
    horario: '30 mayo · Todo el día',
  },
  {
    id: 89,
    nombre: 'Mercadillo Artesanal de Valverde',
    isla: 'El Hierro',
    cat: 'mercadillos',
    fecha: '2026-07-11',
    emoji: '🛍️',
    color: '#22C55E',
    destacado: false,
    desc: 'Mercadillo de artesanía herreña en la capital insular con productos únicos como los vinos DO El Hierro, quesos artesanales, cerámica local y tejidos tradicionales. Una oportunidad rara de descubrir la artesanía de la isla menos masificada de Canarias.',
    ubicacion: 'Valverde, El Hierro',
    maps: 'https://maps.google.com/?q=Valverde+El+Hierro',
    web: 'https://www.elhierro.es',
    entradas: 'https://www.elhierro.es',
    precio: 'Entrada libre',
    horario: 'Sábados · 09:00 a 13:00h',
  },
];
/* ============================================================
   COORDENADAS POR UBICACIÓN (para Leaflet)
   ============================================================ */

const COORD_MAP = {
  // Gran Canaria
  'Dunas de Maspalomas': [27.7408, -15.5846],
  'Maspalomas': [27.7408, -15.5846],
  'Las Canteras': [28.1367, -15.4391],
  'Las Palmas de Gran Canaria': [28.1248, -15.4300],
  'Estadio de Gran Canaria': [28.1007, -15.4593],
  'Agaete': [28.0994, -15.7021],
  'Teror': [28.0588, -15.5476],
  'Parque Santa Catalina': [28.1376, -15.4270],
  // Tenerife
  'Santa Cruz de Tenerife': [28.4636, -16.2518],
  'La Laguna': [28.4892, -16.3159],
  'Adeje': [28.1227, -16.7259],
  'Garachico': [28.3726, -16.7604],
  'Teide': [28.2723, -16.6421],
  'La Orotava': [28.3908, -16.5228],
  'Puerto de la Cruz': [28.4130, -16.5487],
  // Lanzarote
  'Jameos del Agua': [29.1600, -13.4420],
  'Teguise': [29.0614, -13.5603],
  'Puerto del Carmen': [28.9197, -13.6613],
  'La Geria': [28.9820, -13.6330],
  'Arrecife': [28.9636, -13.5477],
  // Fuerteventura
  'Playa de Sotavento': [28.1548, -14.2156],
  'Puerto del Rosario': [28.4995, -13.8634],
  'Antigua': [28.4260, -14.0110],
  'Corralejo': [28.7285, -13.8677],
  // La Palma
  'Santa Cruz de La Palma': [28.6835, -17.7642],
  'Los Llanos de Aridane': [28.6586, -17.9174],
  'Fuencaliente': [28.4800, -17.8370],
  // La Gomera
  'San Sebastián de La Gomera': [28.0916, -17.1132],
  'Valle Gran Rey': [28.0830, -17.3280],
  // El Hierro
  'Valverde': [27.8088, -17.9139],
  'El Hierro': [27.7390, -18.0300],
};

/** Devuelve [lat, lng] para un evento, buscando en COORD_MAP por ubicación o isla */
function getCoords(ev) {
  if (ev.lat && ev.lng) return [ev.lat, ev.lng];
  const loc = ev.ubicacion || '';
  for (const [key, coords] of Object.entries(COORD_MAP)) {
    if (loc.includes(key)) return coords;
  }
  // Fallback: capital de isla
  const islaFallback = {
    'Gran Canaria':  [28.1248, -15.4300],
    'Tenerife':      [28.4636, -16.2518],
    'Lanzarote':     [28.9636, -13.5477],
    'Fuerteventura': [28.4995, -13.8634],
    'La Palma':      [28.6835, -17.7642],
    'La Gomera':     [28.0916, -17.1132],
    'El Hierro':     [27.7390, -18.0300],
  };
  return islaFallback[ev.isla] || [28.2916, -16.6291];
}

/* ============================================================
   LOCALSTORE — Sincronización panel ↔ index
   ============================================================ */

const LS_EVENTOS_KEY = 'ch_eventos_v1';

/** Carga eventos: primero mira localStorage, si no usa los predeterminados */
function loadEventos() {
  try {
    const raw = localStorage.getItem(LS_EVENTOS_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length > 0) return saved;
    }
  } catch {}
  return eventos; // fallback a datos del JS
}

/** Guarda la lista completa en localStorage (llamado desde panel.js) */
function saveEventos(list) {
  try { localStorage.setItem(LS_EVENTOS_KEY, JSON.stringify(list)); } catch {}
}

// Sustituye el array base con lo que haya en localStorage
eventos = loadEventos();

/* ============================================================
   HELPERS
   ============================================================ */

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isFuture(dateStr) {
  return new Date(dateStr + 'T00:00:00') >= new Date(new Date().toDateString());
}

function isToday(dateStr) {
  return new Date(dateStr + 'T00:00:00').toDateString() === new Date().toDateString();
}

function isThisWeek(dateStr) {
  const now = new Date();
  const d   = new Date(dateStr + 'T00:00:00');
  const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  mon.setHours(0,0,0,0);
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6); sun.setHours(23,59,59,999);
  return d >= mon && d <= sun;
}

function isThisMonth(dateStr) {
  const d = new Date(dateStr + 'T00:00:00'), n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
}

/* ============================================================
   STATE
   ============================================================ */

let activeCategory = 'todos';
let activeIsland   = 'todas';
let activeDateFilter = 'todos';
let activeTab      = 'todos'; // 'todos' | 'favoritos'
let searchQuery    = '';

/* ── Favourites (localStorage) ───────────────────────────── */
const FAV_KEY = 'ch_favourites';

function getFavs() {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
  catch { return new Set(); }
}

function saveFavs(set) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify([...set])); } catch {}
}

function toggleFav(id) {
  const favs = getFavs();
  if (favs.has(id)) favs.delete(id); else favs.add(id);
  saveFavs(favs);
  updateFavCounts();
  return favs.has(id);
}

function isFav(id) { return getFavs().has(id); }

function updateFavCounts() {
  const n = getFavs().size;
  const countEl  = document.getElementById('headerFavCount');
  const badgeEl  = document.getElementById('tabFavBadge');
  if (countEl) { countEl.hidden = n === 0; countEl.textContent = n; }
  if (badgeEl) { badgeEl.hidden = n === 0; badgeEl.textContent = n; }
  const btn = document.getElementById('headerFavBtn');
  if (btn) btn.classList.toggle('has-favs', n > 0);
}

/* ============================================================
   RENDER HELPERS
   ============================================================ */

function catBadge(cat) {
  const m = CAT_META[cat] || { label: cat, emoji: '📅', color: '#F97316' };
  return `<span class="cat-badge" style="--bc:${m.color}">${m.emoji} ${m.label}</span>`;
}

function buildCard(ev, featured = false) {
  const meta      = CAT_META[ev.cat] || { label: ev.cat, emoji: '📅', color: '#F97316' };
  const islaEmoji = ISLA_META[ev.isla] || '🏝️';
  const future    = isFuture(ev.fecha);
  const fav       = isFav(ev.id);

  if (featured) {
    return `
    <article class="feat-card" data-id="${ev.id}" role="button" tabindex="0" aria-label="Ver detalles de ${ev.nombre}">
      <div class="feat-card__visual" style="background:${ev.color}22; border-color:${ev.color}44">
        <span class="feat-card__emoji">${ev.emoji}</span>
        ${future ? '<span class="badge-soon">Próximo</span>' : ''}
        <button class="fav-btn${fav ? ' active' : ''}" data-id="${ev.id}" aria-label="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}" title="${fav ? 'Quitar favorito' : 'Guardar favorito'}">
          <svg viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="feat-card__body">
        ${catBadge(ev.cat)}
        <h3 class="feat-card__name">${ev.nombre}</h3>
        <p class="feat-card__desc">${ev.desc}</p>
        <div class="feat-card__meta">
          <span class="feat-card__isla">${islaEmoji} ${ev.isla}</span>
          <span class="feat-card__date">${formatDate(ev.fecha)}</span>
        </div>
        <span class="feat-card__cta">Ver detalles →</span>
      </div>
    </article>`;
  }

  return `
  <article class="ev-card anim-entry" data-id="${ev.id}" data-cat="${ev.cat}" data-isla="${ev.isla}" role="button" tabindex="0" aria-label="Ver detalles de ${ev.nombre}">
    <div class="ev-card__thumb" style="background:${ev.color}22; border-color:${ev.color}55">
      <span class="ev-card__emoji">${ev.emoji}</span>
    </div>
    <div class="ev-card__body">
      ${catBadge(ev.cat)}
      <h3 class="ev-card__name">${ev.nombre}</h3>
      <p class="ev-card__desc">${ev.desc}</p>
      <div class="ev-card__footer">
        <span class="ev-card__isla">${islaEmoji} ${ev.isla}</span>
        <span class="ev-card__date">${formatDate(ev.fecha)}</span>
      </div>
      <span class="ev-card__cta">Ver detalles →</span>
    </div>
    <button class="fav-btn fav-btn--card${fav ? ' active' : ''}" data-id="${ev.id}" aria-label="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}">
      <svg viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    </button>
  </article>`;
}

/* ============================================================
   FILTER LOGIC
   ============================================================ */

function applyFilters(list) {
  return list.filter(ev => {
    // category
    if (activeCategory !== 'todos' && ev.cat !== activeCategory) return false;
    // island
    if (activeIsland !== 'todas' && ev.isla !== activeIsland) return false;
    // date
    if (activeDateFilter === 'hoy'     && !isToday(ev.fecha))    return false;
    if (activeDateFilter === 'semana'  && !isThisWeek(ev.fecha)) return false;
    if (activeDateFilter === 'mes'     && !isThisMonth(ev.fecha)) return false;
    if (activeDateFilter === 'proximos' && !isFuture(ev.fecha))  return false;
    // search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = `${ev.nombre} ${ev.isla} ${ev.desc} ${ev.cat} ${ev.ubicacion || ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  }).sort((a,b) => new Date(a.fecha) - new Date(b.fecha));
}

/* ============================================================
   RENDER FEATURED
   ============================================================ */

function renderFeatured() {
  const grid = document.getElementById('featGrid');
  if (!grid) return;
  const featured = eventos.filter(e => e.destacado && isFuture(e.fecha))
    .sort((a,b) => new Date(a.fecha) - new Date(b.fecha)).slice(0, 4);
  const list = featured.length ? featured
    : eventos.filter(e => isFuture(e.fecha)).sort((a,b) => new Date(a.fecha)-new Date(b.fecha)).slice(0,4);
  grid.innerHTML = list.map(e => buildCard(e, true)).join('');
  bindGridEvents(grid);
}

/* ============================================================
   RENDER MAIN GRID
   ============================================================ */

function renderGrid() {
  const grid    = document.getElementById('evGrid');
  const counter = document.getElementById('evCounter');
  if (!grid) return;

  let source = activeTab === 'favoritos'
    ? eventos.filter(ev => isFav(ev.id))
    : eventos;

  const filtered = applyFilters(source);

  if (!filtered.length) {
    const msg = activeTab === 'favoritos'
      ? '❤️ Aún no tienes favoritos. Pulsa el corazón en cualquier evento para guardarlo.'
      : '🔍 No hay eventos con ese filtro. ¡Prueba otra combinación!';
    grid.innerHTML = `<p class="no-results">${msg}</p>`;
    if (counter) counter.textContent = 0;
    return;
  }

  grid.innerHTML = filtered.map(e => buildCard(e)).join('');
  if (counter) counter.textContent = filtered.length;
  initObserver();
  bindGridEvents(grid);
}

function bindGridEvents(container) {
  container.querySelectorAll('[data-id]').forEach(card => {
    const id = parseInt(card.dataset.id);
    // open modal on card click (not on fav button)
    card.addEventListener('click', e => {
      if (e.target.closest('.fav-btn')) return;
      openEventModal(id);
    });
    card.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.fav-btn')) openEventModal(id);
    });
  });
  // favourite buttons
  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const isNowFav = toggleFav(id);
      btn.classList.toggle('active', isNowFav);
      btn.querySelector('svg').setAttribute('fill', isNowFav ? 'currentColor' : 'none');
      btn.setAttribute('aria-label', isNowFav ? 'Quitar de favoritos' : 'Añadir a favoritos');
      showToast(isNowFav ? '❤️ Guardado en favoritos' : '🤍 Eliminado de favoritos', 'success');
      if (activeTab === 'favoritos') renderGrid();
    });
  });
}

/* ============================================================
   EVENT DETAIL MODAL
   ============================================================ */

function openEventModal(id) {
  const ev = eventos.find(e => e.id === id);
  if (!ev) return;
  const meta   = CAT_META[ev.cat] || { label: ev.cat, emoji: '📅', color: '#F97316' };
  const islaEm = ISLA_META[ev.isla] || '🏝️';
  const future = isFuture(ev.fecha);
  const fav    = isFav(id);

  const content = document.getElementById('evDetailContent');
  content.innerHTML = `
    <div class="evd-hero" style="background:linear-gradient(135deg,${ev.color}2a 0%,${ev.color}0d 100%);border-bottom:1px solid ${ev.color}33">
      <div class="evd-top-row">
        <div class="evd-emoji-wrap" style="background:${ev.color}22;border:2px solid ${ev.color}55">
          <span class="evd-emoji">${ev.emoji}</span>
        </div>
        <div class="evd-badges">
          <span class="cat-badge" style="--bc:${meta.color}">${meta.emoji} ${meta.label}</span>
          ${future ? '<span class="evd-badge-prox">🟢 Próximo</span>' : '<span class="evd-badge-past">✓ Pasado</span>'}
        </div>
        <button class="evd-fav-btn${fav ? ' active' : ''}" id="evdFavBtn" data-id="${id}" aria-label="${fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}">
          <svg viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>${fav ? 'Guardado' : 'Guardar'}</span>
        </button>
      </div>
      <h2 class="evd-title" id="evDetailTitle">${ev.nombre}</h2>
      <p class="evd-isla-date">${islaEm} ${ev.isla} &nbsp;·&nbsp; <span class="evd-date-mono">${formatDate(ev.fecha)}</span></p>
    </div>
    <div class="evd-body">
      <p class="evd-desc">${ev.desc}</p>
      <div class="evd-info-grid">
        ${ev.ubicacion ? `<div class="evd-info-item"><span class="evd-info-icon">📍</span><div><p class="evd-info-label">Ubicación</p><p class="evd-info-value">${ev.ubicacion}</p></div></div>` : ''}
        ${ev.horario   ? `<div class="evd-info-item"><span class="evd-info-icon">🕐</span><div><p class="evd-info-label">Horario</p><p class="evd-info-value">${ev.horario}</p></div></div>` : ''}
        ${ev.precio    ? `<div class="evd-info-item"><span class="evd-info-icon">🎟️</span><div><p class="evd-info-label">Precio</p><p class="evd-info-value">${ev.precio}</p></div></div>` : ''}
      </div>
      <div class="evd-actions">
        ${ev.maps     ? `<a href="${ev.maps}"     target="_blank" rel="noopener" class="evd-btn evd-btn--map">📍 Cómo llegar</a>` : ''}
        ${ev.web      ? `<a href="${ev.web}"      target="_blank" rel="noopener" class="evd-btn evd-btn--web">🌐 Web oficial</a>` : ''}
        ${ev.entradas ? `<a href="${ev.entradas}" target="_blank" rel="noopener" class="evd-btn evd-btn--tickets">🎟️ Comprar entradas</a>` : ''}
        <button class="evd-btn evd-btn--cal" id="evdCalBtn" data-id="${id}">📅 Añadir al calendario</button>
        <button class="evd-btn evd-btn--share" id="evdShareBtn" data-id="${id}">📤 Compartir</button>
      </div>
      ${ev.ubicacion ? `<div class="evd-map-wrap"><div id="evdLeafletMap" class="evd-leaflet-map"></div></div>` : ''}
      
    </div>
  `;

  const modal = document.getElementById('evDetailModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // ── Leaflet map ───────────────────────────────────────────
  if (ev.ubicacion && typeof L !== 'undefined') {
    requestAnimationFrame(() => {
      const mapEl = document.getElementById('evdLeafletMap');
      if (!mapEl || mapEl._leaflet_id) return;
      const coords = getCoords(ev);
      const map = L.map('evdLeafletMap', { zoomControl: true, scrollWheelZoom: false }).setView(coords, 14);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd', maxZoom: 19,
      }).addTo(map);
      const icon = L.divIcon({
        html: `<div style="background:${ev.color};width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 12px ${ev.color}88;border:2px solid #fff3">${ev.emoji}</div>`,
        className: '', iconSize: [36, 36], iconAnchor: [18, 18],
      });
      L.marker(coords, { icon }).addTo(map).bindPopup(`<b>${ev.nombre}</b><br>${ev.ubicacion}`);
    });
  }

  // Fav button in modal
  document.getElementById('evdFavBtn')?.addEventListener('click', () => {
    const isNowFav = toggleFav(id);
    const btn = document.getElementById('evdFavBtn');
    if (!btn) return;
    btn.classList.toggle('active', isNowFav);
    btn.querySelector('svg').setAttribute('fill', isNowFav ? 'currentColor' : 'none');
    btn.querySelector('span').textContent = isNowFav ? 'Guardado' : 'Guardar';
    btn.setAttribute('aria-label', isNowFav ? 'Quitar de favoritos' : 'Guardar en favoritos');
    showToast(isNowFav ? '❤️ Guardado en favoritos' : '🤍 Eliminado de favoritos', 'success');
    // refresh grid in background
    renderGrid();
    renderFeatured();
  });

  // Calendar button
  document.getElementById('evdCalBtn')?.addEventListener('click', () => addToCalendar(id));

  // Share button
  document.getElementById('evdShareBtn')?.addEventListener('click', () => shareEvent(id));
}

function closeEventModal() {
  document.getElementById('evDetailModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function initEventModal() {
  document.getElementById('closeEvDetail')?.addEventListener('click', closeEventModal);
  document.getElementById('evDetailModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('evDetailModal')) closeEventModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeEventModal(); });
}

/* ============================================================
   ADD TO CALENDAR (.ics)
   ============================================================ */

function toIcsDate(dateStr) {
  // YYYYMMDD
  return dateStr.replace(/-/g, '');
}

function addToCalendar(id) {
  const ev = eventos.find(e => e.id === id);
  if (!ev) return;

  const start = toIcsDate(ev.fecha);
  // End = next day (all-day event)
  const endDate = new Date(ev.fecha + 'T00:00:00');
  endDate.setDate(endDate.getDate() + 1);
  const end = toIcsDate(endDate.toISOString().split('T')[0]);

  const desc = (ev.desc || '').replace(/\n/g, '\\n');
  const loc  = ev.ubicacion || ev.isla;
  const url  = ev.web || 'https://canariashoy.es';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Canarias Hoy//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:ch-event-${ev.id}@canariashoy.es`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${ev.nombre}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    `URL:${url}`,
    `CATEGORIES:${CAT_META[ev.cat]?.label || ev.cat}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${ev.nombre.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  showToast('📅 Archivo .ics descargado. ¡Ábrelo para añadir el evento!', 'success');
}

/* ============================================================
   WEB SHARE API
   ============================================================ */

async function shareEvent(id) {
  const ev = eventos.find(e => e.id === id);
  if (!ev) return;

  const shareData = {
    title: ev.nombre,
    text: `${ev.emoji} ${ev.nombre} — ${ev.isla}, ${formatDate(ev.fecha)}\n\n${ev.desc}`,
    url: ev.web || 'https://canariashoy.es',
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') fallbackShare(shareData);
    }
  } else {
    fallbackShare(shareData);
  }
}

function fallbackShare(data) {
  const text = `${data.text}\n${data.url}`;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast('📋 Copiado al portapapeles. ¡Pégalo donde quieras!', 'success'));
  } else {
    // textarea fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('📋 Copiado al portapapeles.', 'success');
  }
}

/* ============================================================
   JSON-LD (Schema.org Events — dynamic)
   ============================================================ */

function injectJsonLd() {
  const el = document.getElementById('jsonLdEvents');
  if (!el) return;
  const upcoming = eventos.filter(e => isFuture(e.fecha)).slice(0, 10);
  const schema = upcoming.map(ev => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: ev.nombre,
    startDate: ev.fecha,
    description: ev.desc,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: ev.ubicacion || ev.isla,
      address: { '@type': 'PostalAddress', addressRegion: ev.isla, addressCountry: 'ES' },
    },
    organizer: { '@type': 'Organization', name: 'Canarias Hoy', url: 'https://canariashoy.es' },
    ...(ev.web ? { url: ev.web } : {}),
    ...(ev.precio ? { offers: { '@type': 'Offer', price: ev.precio, priceCurrency: 'EUR' } } : {}),
  }));
  el.textContent = JSON.stringify(schema);
}

/* ============================================================
   FILTERS
   ============================================================ */

function initFilters() {
  // Category
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filter;
      renderGrid();
    });
  });
  // Island select
  document.getElementById('islandSelect')?.addEventListener('change', e => {
    activeIsland = e.target.value;
    renderGrid();
  });
  // Date filters
  document.querySelectorAll('[data-date]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-date]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDateFilter = btn.dataset.date;
      renderGrid();
    });
  });
}

/* ── Search ──────────────────────────────────────────────── */
function initSearch() {
  const input    = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  if (!input) return;
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      searchQuery = input.value.trim();
      clearBtn.hidden = !searchQuery;
      renderGrid();
      if (searchQuery) document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);
  });
  clearBtn?.addEventListener('click', () => {
    input.value = ''; searchQuery = ''; clearBtn.hidden = true;
    renderGrid(); input.focus();
  });
}

/* ── Tabs (Todos / Favoritos) ────────────────────────────── */
function initTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(b => {
        b.classList.remove('active'); b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      activeTab = btn.dataset.tab;
      renderGrid();
    });
  });
  // Header heart button → switch to favourites tab
  document.getElementById('headerFavBtn')?.addEventListener('click', () => {
    activeTab = 'favoritos';
    document.querySelectorAll('[data-tab]').forEach(b => {
      const isFavsTab = b.dataset.tab === 'favoritos';
      b.classList.toggle('active', isFavsTab);
      b.setAttribute('aria-selected', String(isFavsTab));
    });
    renderGrid();
    document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ── Island chips ────────────────────────────────────────── */
function initIslandChips() {
  document.querySelectorAll('[data-isla-chip]').forEach(chip => {
    chip.addEventListener('click', () => {
      const isla = chip.dataset.islaChip;
      const sel  = document.getElementById('islandSelect');
      if (sel) { sel.value = isla; activeIsland = isla; }
      renderGrid();
      document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ============================================================
   ANIMATIONS
   ============================================================ */

function initObserver() {
  const cards = document.querySelectorAll('.anim-entry');
  if (!('IntersectionObserver' in window)) { cards.forEach(c => c.classList.add('visible')); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 55);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  cards.forEach(c => obs.observe(c));
}

function animateCounter(el, target, duration = 1400) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initHeroCounters() {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, parseInt(el.dataset.count) || 0));
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  const hero = document.querySelector('.hero');
  if (hero) obs.observe(hero);
}

/* ============================================================
   NEWSLETTER FORM
   ============================================================ */

function initNewsletter() {
  const form = document.getElementById('nlForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('nlEmail')?.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Por favor, introduce un email válido.', 'error');
      return;
    }
    const btn = form.querySelector('button[type=submit]');
    const originalText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '6c446794-e7cb-4ffd-a252-5ee8405b987f',
          subject: 'Nueva suscripción newsletter — Canarias Hoy',
          from_name: 'Canarias Hoy Newsletter',
          email: email,
          message: `Nueva suscripción al newsletter de Canarias Hoy.\nEmail: ${email}`,
          botcheck: '',
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('📬 ¡Suscrito! Recibirás los eventos cada viernes.', 'success');
        form.reset();
      } else {
        showToast('Algo salió mal. Inténtalo de nuevo.', 'error');
      }
    } catch {
      showToast('Error de conexión. Comprueba tu internet.', 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
    }
  });
}

/* ============================================================
   SUBMIT EVENT MODAL
   ============================================================ */

function initModal() {
  const openBtn = document.getElementById('openModal');
  const closeBtn = document.getElementById('closeModal');
  const modal   = document.getElementById('eventModal');
  const form    = document.getElementById('eventForm');
  const navLink = document.querySelector('[href="#enviar"]');
  const open  = () => { modal?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { modal?.classList.remove('open'); document.body.style.overflow = ''; };
  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  navLink?.addEventListener('click', e => { e.preventDefault(); open(); });
  modal?.addEventListener('click', e => { if (e.target === modal) close(); });
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    if (!form.nombre?.value.trim() || !form.email?.value.trim()) {
      showToast('Por favor, rellena todos los campos obligatorios.', 'error'); return;
    }
    btn.disabled = true; btn.textContent = 'Enviando…';
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json();
      if (json.success) { showToast('🌴 ¡Evento enviado! Lo revisaremos pronto.', 'success'); form.reset(); setTimeout(close, 1800); }
      else showToast('Algo salió mal. Inténtalo de nuevo.', 'error');
    } catch { showToast('Error de conexión. Comprueba tu internet.', 'error'); }
    finally  { btn.disabled = false; btn.textContent = 'Enviar evento'; }
  });
}

/* ============================================================
   TOAST
   ============================================================ */

function showToast(msg, type = 'success') {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3800);
}

/* ============================================================
   MOBILE MENU
   ============================================================ */

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    if (a.getAttribute('href') === '#enviar') return;
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

/* ============================================================
   PWA — Service Worker + Install Banner
   ============================================================ */

let deferredPrompt = null;

function initPWA() {
  // Register SW
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  // Install banner
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('pwaBanner');
    if (banner && !localStorage.getItem('ch_pwa_dismissed')) {
      setTimeout(() => { banner.hidden = false; }, 3000);
    }
  });

  document.getElementById('pwaInstallBtn')?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.getElementById('pwaBanner').hidden = true;
    if (outcome === 'accepted') showToast('🎉 ¡Canarias Hoy instalada!', 'success');
  });

  document.getElementById('pwaDismissBtn')?.addEventListener('click', () => {
    document.getElementById('pwaBanner').hidden = true;
    localStorage.setItem('ch_pwa_dismissed', '1');
  });

  window.addEventListener('appinstalled', () => {
    document.getElementById('pwaBanner').hidden = true;
    showToast('🎉 App instalada correctamente.', 'success');
  });
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  updateFavCounts();
  renderFeatured();
  renderGrid();
  initFilters();
  initSearch();
  initTabs();
  initIslandChips();
  initObserver();
  initHeroCounters();
  initModal();
  initEventModal();
  initNewsletter();
  initMobileMenu();
  initSmoothScroll();
  injectJsonLd();
  initPWA();

  // Handle URL params (e.g. ?tab=favoritos from PWA shortcuts)
  const params = new URLSearchParams(location.search);
  if (params.get('tab') === 'favoritos') {
    activeTab = 'favoritos';
    document.getElementById('tabFavs')?.click();
  }
});
