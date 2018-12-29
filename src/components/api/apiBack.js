import axios from "axios";
import { AsyncStorage } from "react-native";
import {URL} from "../utils/utils"

const apiBack = {

  SaveUserDB: userLinkedInInfo => {
    console.log(userLinkedInInfo);
    return axios
      .post(`${baseURL}/auth/saveUsereData/`, userLinkedInInfo)
      .then(response => {
        // AsyncStorage.setItem("userToken", userLinkedInInfo.access_token)
        if (response.firstSignup === true) {
          this.props.navigation.navigate("Categories");
        } else {
          this.props.navigation.navigate("Home");
        }
      });
  },

  async GetCategories() {
    return await axios.get(`${URL}/auth/getCategories/`)
  },
  
 async GetUserProfile(token) {
    const response = await axios.get(`${URL}/auth/getUserProfile/${token}`)
    return response;
  },

  async GetUserMeetups(token) {
    const response = await axios.get(`${URL}/auth/getUserMeetups/${token}`)
    return response;
  },

  async SaveMeetups(token, meetups) {
    const response = await axios.post(`${URL}/auth/saveMeetups/${token}`, {meetups: meetups})
    return response;
  },

  async GetContactInfo(linkedIn) {
    const response = await axios.post(`${URL}/auth/getUserProfile/${linkedIn}`)
    return response;
  },

  AddContactNote: (token, idContact , note) => {
    return axios
      .post(`${URL}/auth/addContactNote/`, {token: token, idContact: idContact, note: note})
      .then(response => response.data);
  },

  AddTag: (token, idContact , tags) => {
    return axios
    .post(`${URL}/auth/addTags/`, {token: token, idContact: idContact, tags: tags})
      .then(response => response.data);
  },

  GetContactNote: (idContact) => {
    return axios
    .get(`${URL}/auth/getContactNote/${idContact}`)
    .then(response => response.data)
  },

  UpdateCategories: (token, selectedCategories) => {
    return axios
      .post(`${URL}/auth/saveCategories/${token}`, {
        selectedCategories: selectedCategories
      })
      .then(response => response.data);
  },

  UpdateUserProfile: (token, email, phone) => {
    return axios
      .post(`${URL}/auth/updateUserProfile/${token}`, {
        email: email,
        phone: phone
      })
      .then(response => response.data);
  },


  SaveUserContact: (userId, contactId, meetup) => {
    var ids = [userId, contactId];
    console.log(ids);
    return axios
      .post(`${URL}/auth/saveContact/`, { ids: ids, meetup: meetup })
      .then(response => response.data);
  },

  GetContactOfUsers: token => {
    return axios
      .get(`${URL}/auth/getContactsUser/${token}`)
      .then(response => response.data);
  },

  SaveUserMessage: (emitterId, recevierId, message) => {
    return axios
    .post(`${URL}/auth/saveUserMessage/`, {emitter: emitterId, receiver: recevierId, message: message})
  },

  async GetChatMessages(chatId) {
    return response = await axios.get(`${URL}/auth/getChatMessages/${chatId}`)
  },

  async FindChatId(userId, contactId) {
    return response = await axios.post(`${URL}/auth/getCommonChat/`,{userId: userId, contactId: contactId})
  }

};

export default apiBack;
