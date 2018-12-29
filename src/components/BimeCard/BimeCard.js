import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import apiBack from "../api/apiBack";
import ButtonCamera from "../ButtonCamera";
import { BMCards } from "../utils/utils";

export default class BimeCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      user: null,
      idUser: null
    };
  }

  componentDidMount() {
    this.loadDataApp();
  }

  loadDataApp = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userProfile = await apiBack.GetUserProfile(token);

      this.setState({
        ...this.state,
        user: userProfile.data,
        idUser: userProfile.data.id
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image styles={{width: 500}} source={BMCards[0]} />
        <View style={styles.qrcode}>
          {this.state.idUser !== null && <QRCode value={this.state.idUser} />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  qrcode: {
    position: "absolute",
    padding: 0,
    borderColor: "white",
    borderWidth: 20,
    borderRadius:10,
    // top: 0,
    // left: 0,
    // width: '100%',
    // height: '100%',
  }
});
