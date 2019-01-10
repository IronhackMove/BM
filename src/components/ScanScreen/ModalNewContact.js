import React, { Component } from "react";
import apiBack from "../api/apiBack";
import io from "socket.io-client";
import { URL } from "../utils/utils";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  shadowColor
} from "react-native";

import SvgUri from "react-native-svg-uri";
import SelectInput from "react-native-select-input-ios";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MARGIN_SMALL = 8;
const MARGIN_LARGE = 16;

export default class ModalNewContact extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.socket = io(URL);
    this.state = {
      activeSections: [],
      valueSmall0: 0,
      meetups: null
    };
  }

  onSubmitEditingSmall0(value) {
    this.setState({
      valueSmall0: value
    })
  }


  _saveContact = () => {

    apiBack.CheckIfContactSaved(this.props.userId, this.props.contactUserId)
    .then(response => {
      if (response !== null) {
        Alert.alert(
          response.message,
        );
      } else {
        
        objContact = {

          userId: this.props.userId,
          contactUserId: this.props.contactUserId,
          meetups: this.props.meetups[this.state.valueSmall0].label
        }
    
        this.socket.emit("updateContact", objContact);
        this.props.closeModal();
      }
    })



  }

  render() {

    return (
      <View style={styles.modal}>
        <View style={styles.container}>
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: "40%", height: "120%" }}>
                <Image
                  style={styles.avatar}
                  source={{ uri: this.props.contact.pictureUrls.values[0] }}
                />
              </View>
              <View style={{ width: "60%", marginTop: "5%" }}>
                <View>
                  <Text style={styles.textName}>
                    {this.props.contact.firstName}
                  </Text>
                  <Text style={styles.textSubname}>
                    {this.props.contact.lastName}
                  </Text>
                </View>

                <View style={{ position: "absolute", marginTop: "35%" }}>
                  <Text style={styles.text}>{this.props.contact.headline}</Text>
                </View>
              </View>
            </View>
            <View style={styles.push}>
              <SelectInput
                value={this.state.valueSmall0}
                options={this.props.meetups}
                onSubmitEditing={this.onSubmitEditingSmall0.bind(this)}
                style={[styles.selectInput, styles.selectInputSmall]}
              />
              <View style={styles.down}>
                <SvgUri
                  width="20"
                  height="20"
                  source={require("../resources/svg/arrow.svg")}
                />
              </View>
            </View>
            <View style={styles.button}>
              <View style={{ marginRight: "15%", marginBottom: "5%" }}>
                <Text style={styles.text} onPress={this._saveContact}>
                  Save
                </Text>
              </View>
              <View>
                <Text style={styles.text} onPress={this.props.closeModal}>
                  Close
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View />
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    height: "45%",
    width: "100%",
    backgroundColor: "black",

    shadowColor: "#ededed",
    alignItems: "center"
  },
  textName: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    textAlign: "left",
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute"
  },
  textSubname: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    textAlign: "left",
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    marginTop: "15%"
  },
  text: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 13,
    textAlign: "left",
    margin: 1.5,
    color: "white"
  },
  avatar: {
    width: "80%",
    height: "90%"
  },
  selectInput: {
    flexDirection: "row",
    height: 35,
    borderWidth: 1,
    padding: MARGIN_SMALL,
    marginTop: MARGIN_LARGE,
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  selectInputSmall: {
    width: SCREEN_WIDTH * 0.80 - MARGIN_LARGE * 2
  },
  push: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
	marginTop: "10%",
	marginLeft: "6%",
  },
  down: {
    marginRight: "5%",
    marginTop: "8%"
  },
  button: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "15%"
  }
});
