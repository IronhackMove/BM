import React, { Component } from "react";

export const URL = "https://app-bm.herokuapp.com";

export const BMCards = [
  require("../resources/images/BMCard/qr1.jpg"),
  require("../resources/images/BMCard/qr2.jpg"),
  require("../resources/images/BMCard/qr3.jpg"),
]

export const CategoryImages = {
  Tech: [
    require("../resources/images/Tec/Tec1.jpg"),
    require("../resources/images/Tec/Tec2.jpg"),
    require("../resources/images/Tec/Tec3.jpg"),
    require("../resources/images/Tec/Tec4.jpg")
  ],
  Business: [
    require("../resources/images/Bussines/Bussines1.jpg"),
    require("../resources/images/Bussines/Bussines2.jpg"),
    require("../resources/images/Bussines/Bussines3.jpg"),
    require("../resources/images/Bussines/Bussines4.jpg")
  ],
  Education: [
    require("../resources/images/Education/Education1.jpg"),
    require("../resources/images/Education/Education2.jpg"),
    require("../resources/images/Education/Education3.jpg"),
    require("../resources/images/Education/Education4.jpg")
  ],
  Community: [
    require("../resources/images/Community/Community1.jpg"),
    require("../resources/images/Community/Community2.jpg"),
    require("../resources/images/Community/Community3.jpg"),
    require("../resources/images/Community/Community4.jpg")
  ],
  Movements: [
    require("../resources/images/Politic/Politic1.jpg"),
    require("../resources/images/Politic/Politic2.jpg"),
    require("../resources/images/Politic/Politic3.jpg"),
    require("../resources/images/Politic/Politic4.jpg")
  ],
  Support: [
    require("../resources/images/Support/Support1.jpg"),
    require("../resources/images/Support/Support2.jpg"),
    require("../resources/images/Support/Support3.jpg"),
    require("../resources/images/Support/Support4.jpg")
  ]
};

export const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const meetupsIfError = [
  {},
  {
    created: 1544383542000,
    duration: 10800000,
    id: "257084100",
    name: "Ironhack, pon un programador en tu vida",
    rsvp_limit: 100,
    status: "upcoming",
    time: 1545321600000,
    local_date: "2018-12-21",
    local_time: "15:30 - 18:30",
    updated: 1544466020000,
    utc_offset: 3600000,
    waitlist_count: 0,
    yes_rsvp_count: 95,
    venue: {
      id: 25615553,
      name: "GoMadrid",
      lat: 40.420101165771484,
      lon: -3.705322027206421,
      repinned: true,
      address_1: "Paseo de la Chopera, 14",
      address_2: "Planta 2",
      city: "Madrid",
      country: "es",
      localized_country_name: "España"
    },
    group: {
      created: 1495125612000,
      name: "Cryptoinvest (Inversión en criptomonedas)",
      id: 23847260,
      join_mode: "open",
      lat: 40.41999816894531,
      lon: -3.7100000381469727,
      urlname: "Cryptoinvest",
      who: "Criptoinversores",
      localized_location: "Madrid, España",
      state: "",
      country: "es",
      region: "es",
      timezone: "Europe/Madrid"
    },
    link: "https://www.meetup.com/es/Cryptoinvest/events/257084100/",
    description:
      `Disfruta este Viernes 20 de diciembre de la presentación del Bootcamp de Web.

      Una convivencia de 9 semanas aplicando diferentes lenguajes de programación dan como resultado aplicaciones visuales de gran calibre, listas para la implantación en empresas.`,
    visibility: "public",
    image: require("../resources/images/Tec/Tec1.jpg")
  },
  {
    created: 1544792288000,
    duration: 3600000,
    id: "257213200",
    name: "WEBINAR: Principal Component Analysis (PCA) Made Easy",
    status: "upcoming",
    time: 1545328800000,
    local_date: "2018-12-20",
    local_time: "19:00",
    updated: 1544792374000,
    utc_offset: 3600000,
    waitlist_count: 0,
    yes_rsvp_count: 14,
    group: {
      created: 1463756085000,
      name: "Machine Learning Madrid",
      id: 19975590,
      join_mode: "open",
      lat: 40.41999816894531,
      lon: -3.7100000381469727,
      urlname: "Machine-Learning-Madrid",
      who: "MLMADers",
      localized_location: "Madrid, España",
      state: "",
      country: "es",
      region: "es",
      timezone: "Europe/Madrid"
    },
    link: "https://www.meetup.com/es/Machine-Learning-Madrid/events/257213200/",
    description:
      '<p>IMPORTANT: Attendance is free, but you need to reserve your spot using the link below to gain access:</p> <p><a href="https://register.gotowebinar.com/register/2890674738679632130" class="linkified">https://register.gotowebinar.com/register/2890674738679632130</a></p> <p>Join us on Thursday, December 20, 2018, at 07:00 PM CET for a FREE live webinar to learn about Principal Component Analysis (PCA), a key unsupervised Machine Learning technique used to transform a given dataset in order to yield uncorrelated features and reduce dimensionality. PCA is most commonly applied in fields with high dimensional data including bioinformatics, quantitative finance, and signal processing, among others.</p> <p>BigML PCA is distinct from other implementations of the PCA algorithm, BigML\'s Machine Learning platform lets you transform many different data types in an automatic fashion that does not require you to configure it manually. This unique approach can handle numeric and non-numeric data types, including text, categorical, items fields, as well as combinations of different data types.</p> <p>Note: the event will be presented in English.</p> <p>Looking forward to seeing you at the webinar!</p> ',
    visibility: "public",
    image:  require("../resources/images/Bussines/Bussines1.jpg")
  },
  {
    created: 1538759027000,
    duration: 93600000,
    fee: {
      accepts: "cash",
      amount: 30,
      currency: "EUR",
      description: "por persona",
      label: "Precio",
      required: false
    },
    id: "spnrhqyxqbdc",
    name: "¡Aprende a volar drones!",
    rsvp_limit: 8,
    status: "upcoming",
    time: 1545471000000,
    local_date: "2018-12-22",
    local_time: "10:30",
    updated: 1538759027000,
    utc_offset: 3600000,
    waitlist_count: 0,
    yes_rsvp_count: 1,
    venue: {
      id: 25800562,
      name: "UCM Facultad de Derecho",
      lat: 40.452720642089844,
      lon: -3.729556083679199,
      repinned: true,
      address_1: "Pl. Menéndez Pelayo, 4",
      city: "Madrid",
      country: "es",
      localized_country_name: "España"
    },
    group: {
      created: 1517754604000,
      name: "Meetup de Robótica y Tecnología en Madrid",
      id: 27376924,
      join_mode: "open",
      lat: 40.41999816894531,
      lon: -3.7100000381469727,
      urlname: "campustecnologicomadrid",
      who: "Miembros",
      localized_location: "Madrid, España",
      state: "",
      country: "es",
      region: "es",
      timezone: "Europe/Madrid"
    },
    link:
      "https://www.meetup.com/es/campustecnologicomadrid/events/spnrhqyxqbdc/",
    description:
      '<p>ATENCIÓN: ESTE MEETUP ES DE PAGO. CONSULTA TODAS LAS CONDICIONES EN <a href="http://www.campustecnologicomadrid.com/vuelo-con-drones/" class="linkified">http://www.campustecnologicomadrid.com/vuelo-con-drones/</a></p> <p>ES IMPRESCINDIBLE PARA LA ASISTENCIA RELLENAR EL FORMULARIO QUE SE ENCUENTRA EN <a href="http://www.campustecnologicomadrid.com/vuelo-con-drones/" class="linkified">http://www.campustecnologicomadrid.com/vuelo-con-drones/</a></p> <p>LAS PERSONAS QUE SE INSCRIBAN A TRAVÉS DE MEETUP NO SE CONSIDERARÁN INSCRITAS, HAY QUE HACERLO A TRAVÉS DE LA WEB</p> <p>Dirigidos a adultos y a niños.</p> ',
    how_to_find_us:
      "Quedaremos para la actividad en el campo deportivo norte de Ciudad Universitaria, junto al paraninfo de la Universidad Complutense",
    visibility: "public",
    image: require("../resources/images/Community/Community1.jpg")
  },
  {
    created: 1535227418000,
    duration: 10800000,
    fee: {
      accepts: "cash",
      amount: 355,
      currency: "EUR",
      description: "por persona",
      label: "Precio",
      required: false
    },
    id: "cgcldqyxqbdc",
    name: "Curso de Robótica para adultos",
    rsvp_limit: 6,
    status: "upcoming",
    time: 1545471000000,
    local_date: "2018-12-22",
    local_time: "10:30",
    updated: 1535227419000,
    utc_offset: 3600000,
    waitlist_count: 0,
    yes_rsvp_count: 1,
    venue: {
      id: 25810382,
      name: "Campus Tecnológico Madrid",
      lat: 40.41619873046875,
      lon: -3.6719839572906494,
      repinned: false,
      address_1: "C/ Doce de Octubre 42",
      city: "Madrid",
      country: "es",
      localized_country_name: "España"
    },
    group: {
      created: 1517754604000,
      name: "Meetup de Robótica y Tecnología en Madrid",
      id: 27376924,
      join_mode: "open",
      lat: 40.41999816894531,
      lon: -3.7100000381469727,
      urlname: "campustecnologicomadrid",
      who: "Miembros",
      localized_location: "Madrid, España",
      state: "",
      country: "es",
      region: "es",
      timezone: "Europe/Madrid"
    },
    link:
      "https://www.meetup.com/es/campustecnologicomadrid/events/cgcldqyxqbdc/",
    description:
      '<p>ATENCIÓN: ESTE CURSO ES DE PAGO. DURA 3 MESES.<br/>IMPRESCINDIBLE INSCRIBIRSE A TRAVÉS DEL FORMULARIO EN: <a href="http://www.campustecnologicomadrid.com/curso-robotica/" class="linkified">http://www.campustecnologicomadrid.com/curso-robotica/</a></p> <p>Resumen:<br/>La Robótica es un área multidisciplinar que incluye diversas ramas de ingeniería, como son la mecánica, la electrónica, la programación, etc. En este curso veremos todo lo que rodea a la Robótica desde un punto de vista práctico.</p> <p>Además, hay una edición para adultos y otra para niños, cada una adaptada al grupo de edad correspondiente.</p> <p>Descripción completa:<br/>A través de este curso se proporciona la formación necesaria para que se puedan adquirir los conocimientos y las habilidades de la Robótica.</p> <p>No se requieren conocimientos previos y el nivel se adaptará al de los asistentes. Es un curso eminentemente práctico, ya que, a pesar de tratar algunos aspectos teóricos imprescindibles, cada participante construirá un brazo robótico, con toda su mecánica, electrónica, y lo programaremos para que realice distintas tareas.</p> <p>Los puntos principales del programa son:</p> <p>Introducción.<br/>Fundamentos de la Robótica.<br/>Disciplinas.<br/>Tipos de robots.<br/>Aplicaciones.<br/>Background.<br/>Nociones de mecánica.<br/>Nociones de impresión 3D.<br/>Nociones de electrónica.<br/>Nociones de programación y distintos lenguajes para robótica.<br/>Simulación robótica con distintos programas.<br/>Construcción.<br/>Creación del brazo robótico con impresora 3D.<br/>Ensamblaje.<br/>Electrónica.<br/>Programación.<br/>Al final del curso, el asistente tendrá una idea muy clara de lo que es la robótica y las disciplinas que giran alrededor de ellas.</p> <p>Además, tendrán la posibilidad de adquirir el robot que han construido para poder continuar el aprendizaje una vez finalice el curso.</p> <p>Detalles:<br/>Duración: 3 meses (3 horas semanales).<br/>Horario: según disponibilidad, varias opciones:<br/>Adultos:<br/>Entre semana:<br/>Lunes y miércoles de 12:00 a 13:30.<br/>Martes y jueves de 12:00 a 13:30.<br/>Lunes y miércoles de 19:45 a 21:15.<br/>Martes y jueves de 19:45 a 21:15.<br/>Intensivo fin de semana: sábados de 10:30 a 13:30.<br/>Precio adultos:<br/>Solo curso: 355€ (curso completo).<br/>Curso + estructura 3D del robot: 390€.<br/>Curso + robot completo (incluye la estructura, los motores, el procesador, la electrónica y la programación): 480€.<br/>Niños:<br/>Intensivo fin de semana: domingos de 16:30 a 19:30.<br/>Precio niños:<br/>Solo curso: 255€ (curso completo).<br/>Curso + estructura 3D del robot: 290€.<br/>Curso + robot completo (incluye la estructura, los motores, el procesador, la electrónica y la programación): 380€.<br/>Fechas:<br/>Próximo curso: del 22 de septiembre al 15 de diciembre.<br/>Edades: a partir de 18 años.<br/>Conocimientos previos necesarios: ninguno.<br/>Condiciones:<br/>El pago se puede hacer con tarjeta, por transferencia bancaria o en efectivo.<br/>Este se realizará por completo antes de comenzar el curso, y en caso de causar baja, no se reintegrará cantidad alguna.</p> ',
    visibility: "public",
    image: require("../resources/images/Support/Support4.jpg")
  },
 ];
