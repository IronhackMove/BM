import React, { Component } from "react";

export const URL = "https://app-bm.herokuapp.com";

export const BMCards = [
  require("../resources/images/BMCard/qr1.jpg"),
  require("../resources/images/BMCard/qr2.jpg"),
  require("../resources/images/BMCard/qr3.jpg")
];

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

export const appColors = [
  "#f08ff1",
  "#2574fc",
  "#60fadd",
  "#537895",
  "#f33b47",
  "#f9d423"
];

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
    name: "HACKSHOW | Web + UX + Data ",
    rsvp_limit: 100,
    status: "upcoming",
    time: 1545321600000,
    local_date: "2019-01-18",
    local_time: "18:00 - 20:00",
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
    description: `Ha llegado el día!!!
  
El Hackshow es el "Demoday" que se lleva acabo al final de cada bootcamp. Durante las ultimas semanas, nuestros ironhackers trabajan sobre sus propios proyectos! Entre todos los proyectazos, hemos hecho una selección y te los presentarán ellos mismos!
    
Al final, se votará cual ha sido el mejor proyecto, nos tomaremos unas cerves y celebraremos el fin del bootcamp!
    
En esta ocasión contaremos con estudiantes de las ediciones de Web Development, UX/UI y Data Analytics.
    
Nos vemos allí!`,
    visibility: "public",
    image: require("../resources/images/hack.png")
  }
];
