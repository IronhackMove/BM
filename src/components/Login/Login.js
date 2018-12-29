import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';

import SvgUri from 'react-native-svg-uri';

import axios from "axios";
import fetch from "node-fetch";

import LinkedInModal from "react-native-linkedin";
import apiBack from "../api/apiBack";
import {URL} from "../utils/utils"

export default class App extends Component {

    static navigationOptions = {
    header: null // !!! Hide Header
  }

	constructor() {
    super();
    this.baseURL = URL
    this.state = {
     
    }
  }

_sayHello = async () => {
    await axios.get(`${this.baseURL}/auth/sayHello/`)
    .then((response) => console.log(response))
}

_sendDataToBack(data)  {
  axios
    .post(`${this.baseURL}/auth/saveUsereData/`, data)
    .then((user) => {
      console.log(user.data)
      AsyncStorage.setItem("userToken", data.access_token);
      if (user.data.firstSignup === true ) {
        this.props.navigation.navigate('Categories', {access_token: data.access_token});
      } else {
        this.props.navigation.navigate('App');
      }
  
    });
};
  
  async getUser({ access_token }) {

    const baseApi = "https://api.linkedin.com/v1/people/";
    const qs = { format: "json" };
    const params = [
      "id",
      "first-name",
      "last-name",
      "summary",
      "specialties",
      "positions",
      "industry",
      "picture-url",
      "picture-urls::(original)",
      "headline",
      "email-address",
      "public-profile-url"
    ];

    const response = await fetch(
      `${baseApi}~:(${params.join(",")})?format=json`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const payload = await response.json();
    const userInfo = { ...payload, access_token: access_token };
    console.log(userInfo)
    this._sendDataToBack(userInfo)
  }



	render() {

		return (
			<View style={styles.container}>
				<View style={styles.logo}>
					<SvgUri width="80" height="80" source={require('../resources/svg/logo.svg')} />
					<View style={styles.claim}>
						<Text style={styles.text}>Bussines Meeting,</Text>
						<Text style={styles.text}>your contacts interesting</Text>
						<Text style={styles.text}>in your hand.</Text>
					</View>
				</View>
				<View>
        <LinkedInModal
          style={{marginTop:10}}
          clientID="77c7dguhn2k24m"
          clientSecret="M4bawEQmMYtEZPxM"
          redirectUri="https://127.0.0.1:3000/"
          linkText={<Text style={styles.login}>Login with linkedin</Text>}
          onSuccess={data => {
            this.getUser(data);
          }}
        />
				</View>
			</View>
		);
  }
  
    async getUser({ access_token }) {

    const baseApi = "https://api.linkedin.com/v1/people/";
    const qs = { format: "json" };
    const params = [
      "id",
      "first-name",
      "last-name",
      "summary",
      "specialties",
      "positions",
      "industry",
      "picture-url",
      "picture-urls::(original)",
      "headline",
      "email-address",
      "public-profile-url"
    ];

    const response = await fetch(
      `${baseApi}~:(${params.join(",")})?format=json`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const payload = await response.json();
    const userInfo = { ...payload, access_token: access_token };
    console.log(userInfo)
    this._sendDataToBack(userInfo)
  }

}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: 'black',
		color: 'white',
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
    marginLeft: 25,
    marginTop:30,
    marginBottom: 220,
	},

	claim: {
		marginTop: 25
	},
	text: {
		fontFamily: 'Helvetica',
		fontWeight: 'normal',
		letterSpacing: 1.2,
		fontSize: 13,
		textAlign: 'left',
		margin: 1.5,
		color: 'white'
	},
	login:{
    fontFamily: 'Helvetica',
    marginTop: 10,
		fontWeight: 'normal',
		letterSpacing: 1.2,
		fontSize: 15,
		textAlign: 'left',
		margin: 1.5,
		color: 'white',
		marginTop:'50%',
		textDecorationLine: 'underline'
	},
	slide: {
		height: 500
	}
});