import axios from "axios";
import apiBack from "../api/apiBack";

const baseURL = "https://api.meetup.com/";
const API_KEY = "451b5834803d6053331e38337c60192b";
const moment = require('moment');
const endDate = moment().add(5, 'days').format("YYYY-MM-DDTHH:MM:SS")

const apiMeetups = {

  GetCategories: () => {
    return axios
      .get(`${baseURL}2/categories?&sign=true&photo-host=public&key=${API_KEY}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  },

 async GetCloseMeetups (user, locations) {

   let arrayMeetups = []
   user.data.selectedCategories
   .map(category => category)
   .forEach(category => {
     arrayMeetups.push(axios
      .get(
        `${baseURL}find/upcoming_events?&sign=true&photo-host=public&lon=${
          locations.coords.longitude
        }&end_date_range=${endDate}.&topic_category=${category.id}&radius=7&lat=${
          locations.coords.latitude
        }&key=${API_KEY}`
      ))
   }) 

  return Promise.all(arrayMeetups)
   .then(response => {
     return response
     .map(categoryEvents => categoryEvents)
   })
   .catch(err => console.log("ha habido un error"))
  }
};

export default apiMeetups;
