import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";

import SvgUri from "react-native-svg-uri";
import apiBack from "../api/apiBack";

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const sliderWidth = wp(100);

export default class App extends Component {
  static navigationOptions = {
    header: null // !!! Hide Header
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      token: null,
      userProfile: null,
      emailAddress: null,
      phoneNumber: ""
    };
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      const userProfile = apiBack.GetUserProfile(token);
      console.log(userProfile);
      userProfile.then(userProfile =>
        this.setState({
          ...this.state,
          userProfile: userProfile.data,
          emailAddress: userProfile.data.emailAddress,
          phoneNumber: userProfile.data.phoneNumber,
          token: token
        })
      );
    });
  }

  _updateProfile = () => {
    apiBack
      .UpdateUserProfile(
        this.state.userProfile.access_token,
        this.state.emailAddress,
        this.state.phoneNumber
      )
      .then(() => this.props.navigation.navigate("Home"));
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView style={styles.container}>
          {this.state.userProfile !== null && (
            <React.Fragment>
              <View style={styles.imagePerfil}>
                <Image
                  style={{ width: 250, height: 250, position: "absolute" }}
                  source={{
                    uri: `${this.state.userProfile.pictureUrls.values[0]}`
                  }}
                />
              </View>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <View style={styles.arrow}>
                  <SvgUri
                    width="20"
                    height="20"
                    source={require("../resources/svg/arrow.svg")}
                  />
                </View>
              </TouchableHighlight>
              <View style={styles.boxTitle}>
                <View>
                  <Text style={styles.textTitle}>
                    {this.state.userProfile.firstName}
                  </Text>
                </View>
                <View style={styles.margin}>
                  <Text style={styles.textTitle}>
                    {this.state.userProfile.lastName}
                  </Text>
                </View>
              </View>

              <View style={styles.boxOption1}>
                <Text style={styles.text}>Madrid, España</Text>
              </View>
              <View style={styles.boxOption2}>
                <Text style={styles.text}>
                  {this.state.userProfile.headline}
                </Text>
              </View>
              <View style={styles.acordeon}>
                <Text style={styles.text}>
                  {this.state.userProfile.summary}
                </Text>
              </View>
              <View style={styles.add}>
                <View>
                  <SvgUri
                    width="30"
                    height="30"
                    source={require("../resources/svg/edit.svg")}
                  />
                </View>
                <View style={{ marginLeft: "5%", marginTop: "-1%" }}>
                  <Text style={styles.text}>EMAIL</Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      color: "white",
                      width: "100%"
                    }}
                    onChangeText={text =>
                      this.setState({ ...this.state, emailAddress: text })
                    }
                    value={this.state.emailAddress}
                  />
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: 2,
                  width: "90%",
                  marginLeft: "5%",
                  marginTop: "3%"
                }}
              />
              <View style={styles.add}>
                <TouchableHighlight onPress={this._updateProfile}>
                  <View>
                    <SvgUri
                      width="30"
                      height="30"
                      source={require("../resources/svg/edit.svg")}
                    />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._updateProfile}>
                  <View style={{ marginLeft: "15%", marginTop: "-1%" }}>
                    <Text style={styles.text}>PHONE</Text>
                    <TextInput
                      style={{
                        height: 40,
                        borderWidth: 1,
                        color: "white",
                        width: "100%"
                      }}
                      onChangeText={text =>
                        this.setState({ ...this.state, phoneNumber: text })
                      }
                      value={this.state.phoneNumber}
                    />
                  </View>
                </TouchableHighlight>
              </View>

              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: 2,
                  width: "90%",
                  marginLeft: "5%",
                  marginTop: "3%"
                }}
              />
              <View style={styles.add}>
                <TouchableHighlight onPress={()=>this.props.navigation.navigate("Categories")}>
                  <View>
                    <SvgUri
                      width="30"
                      height="30"
                      source={require("../resources/svg/iconAdd.svg")}
                    />
                  </View>
                </TouchableHighlight>

                <View style={{ marginLeft: "5%", marginTop: "-1%" }}>
                  <View>
                    <Text style={styles.text}>CATEGORY</Text>
                    <Text style={styles.text}>
                      Add your category events or delete
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "70%",
                  flexWrap: "wrap",
                  marginLeft: "19%"
                }}
              >
                {this.state.userProfile.selectedCategories.map(category => (
                  <Text style={styles.category}>{category.shortname}</Text>
                ))}
              </View>
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: 2,
                  width: "90%",
                  marginLeft: "5%",
                  marginTop: "3%",
                  marginBottom: 50
                }}
              />
              <TouchableHighlight onPress={this._signOutAsync}>
                <Text
                  style={{
                    color: "white",
                    textDecorationLine: "underline",
                    marginBottom: 20
                  }}
                >
                  Logout
                </Text>
              </TouchableHighlight>
            </React.Fragment>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    color: "white"
  },
  imagePerfil: {
    marginLeft: "43%"
  },
  arrow: {
    marginTop: "23%",
    marginLeft: "6%"
  },
  boxTitle: {
    marginTop: "7%",
    marginLeft: "4%"
  },
  margin: {
    marginTop: "9%"
  },
  boxOption1: {
    marginTop: 60,
    marginLeft: "6%",
    marginRight: "6%"
  },
  boxOption2: {
    marginTop: 30,
    marginLeft: "6%",
    marginRight: "6%"
  },
  acordeon: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 40,
    marginLeft: "6%",
    marginRight: "6%"
  },
  button: {
    fontSize: 15,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 10,
    textDecorationLine: "underline"
  },

  button2: {
    fontSize: 15,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 10,
    textAlign: "center"
  },
  add: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 40,
    marginLeft: "6%",
    marginRight: "6%"
  },
  title: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 13,
    textAlign: "left",
    marginBottom: 1.5,
    color: "black"
  },
  category: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 16,
    textAlign: "left",
    color: "white",
    marginRight: "5%"
  },
  eventDate: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  eventName: {
    backgroundColor: "white",
    position: "absolute",
    left: -10,
    bottom: "-5%",
    paddingLeft: 10,
    paddingRight: 10
  },
  textTitle: {
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
  text: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 13,
    textAlign: "left",
    margin: 1.5,
    color: "white"
  },
  slide: {
    height: 500
  }
});
