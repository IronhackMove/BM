import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  ScrollView
} from "react-native";

import SvgUri from "react-native-svg-uri";
import ViewMoreText from "react-native-view-more-text";
import Tags from "react-native-tags";
import apiBack from "../../api/apiBack";
import call from "react-native-phone-call";

import email from "react-native-email";

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const sliderWidth = wp(100);

export default class ContactSelected extends Component {
  static navigationOptions = {
    header: null // !!! Hide Header
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      userToken: null,
      userId: null,
      contactId: this.props.navigation.state.params.idContact,
      contactSelected: null,
      note: "",
      tags: []
    };
  }

  componentDidMount() {
    this.loadAppInformation();
  }

  handleEmail = () => {
    const to = [this.state.contactSelected.emailAddress]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [], // string or array of email addresses
      bcc: [], // string or array of email addresses
      subject: `Nos conocimos en el evento ${
        this.props.navigation.state.params.meetup
      }`,
      body: `Hola ${this.state.contactSelected.firstName}`
    }).catch(console.error);
  };

  handlePhoneCall = () => {
    const args = {
      number: this.state.contactSelected.phoneNumber, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };

  AddContact() {
    apiBack
      .AddContactNote(
        this.state.userToken,
        this.state.contactId,
        this.state.note
      )
      .then(() => {
        Alert.alert("Note saved!");
      });
  }

  AddTag() {
    apiBack
      .AddTag(this.state.userToken, this.state.contactId, this.state.tags)
      .then(() => {
        this.props.navigation.state.params.list;
        Alert.alert("Tags saved!");
      });
  }

  loadAppInformation = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userProfile = await apiBack.GetUserProfile(token);
      const contactInfo = await apiBack.GetContactInfo(this.state.contactId);

      let note;

      if (userProfile.data.notes.length > 0) {
        noteFound = userProfile.data.notes.filter(
          note => note.idContact === this.state.contactId
        );

        if (noteFound.length > 0) {
          note = noteFound[0].note;
        } else {
          note = "";
        }
      } else {
        note: "";
      }

      tagsFound = userProfile.data.contacts.filter(
        contact => contact.contact === contactInfo.data._id
      );

      console.log("tags", tagsFound[0].tags);

      this.setState({
        ...this.state,
        userToken: token,
        contactSelected: contactInfo.data,
        userId: userProfile.data.id,
        note: userProfile.data.notes.length > 0 ? note : "",
        tags: tagsFound[0].tags
      });
    } catch (error) {
      console.log(error);
    }
  };

  chatPage = () => {
    this.props.navigation.navigate("ContactChat", {
      contactSelected: this.state.contactSelected,
      emitter: this.state.userId,
      receiver: this.state.contactId
    });
  };

  _goBack = () => {
    this.props.navigation.state.params.list();
    this.props.navigation.navigate("Contacts");
  };

  render() {
    console.log(this.state.contactId);

    return (
      <ScrollView style={{ backgroundColor: "black" }}>
        {this.state.contactSelected !== null && (
          <View style={styles.container}>
            <View style={styles.imagePerfil}>
              <Image
                style={{ width: 250, height: 250, position: "absolute" }}
                source={{
                  uri: this.state.contactSelected.pictureUrls.values[0]
                }}
              />
            </View>

            <TouchableHighlight onPress={() => this._goBack()}>
              <View style={styles.arrow}>
                <SvgUri
                  width="20"
                  height="20"
                  source={require("../../resources/svg/arrow.svg")}
                />
              </View>
            </TouchableHighlight>

            <View style={styles.boxTitle}>
              <View>
                <Text style={styles.textTitle}>
                  {this.state.contactSelected.firstName}
                </Text>
              </View>
              <View style={styles.margin}>
                <Text style={styles.textTitle}>
                  {this.state.contactSelected.lastName}
                </Text>
              </View>
            </View>

            <View style={styles.boxOption1}>
              <Text style={styles.text}>Madrid, España</Text>
            </View>
            <View style={styles.boxOption2}>
              <Text style={styles.text}>
                {this.state.contactSelected.headline}
              </Text>
            </View>

            <View style={styles.acordeon}>
              <ViewMoreText
                numberOfLines={2}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={{ textAlign: "left" }}
              >
                <Text style={styles.acordeon}>
                  {this.state.contactSelected.summary}
                </Text>
              </ViewMoreText>
            </View>

            <View
              style={[
                styles.add,
                {
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "white"
                }
              ]}
            >
              <View>
                <TouchableHighlight onPress={() => this.AddContact()}>
                  <SvgUri
                    width="30"
                    height="30"
                    source={require("../../resources/svg//iconAdd.svg")}
                  />
                </TouchableHighlight>
              </View>

              <View
                style={{ marginLeft: "5%", marginTop: "-1%", width: "100%" }}
              >
                <Text style={styles.text}>Add your notes</Text>
                <TextInput
                  placeholder="Add a note.."
                  placeholderTextColor="white"
                  multiline={true}
                  numberOfLines={4}
                  style={{
                    height: 100,
                    borderWidth: 1,
                    color: "white",
                    width: "100%"
                  }}
                  onChangeText={text =>
                    this.setState({ ...this.state, note: text })
                  }
                  value={this.state.note}
                />
              </View>
            </View>

            <View
              style={[,
                { borderBottomWidth: 1, borderBottomColor: "white", marginLeft: "6%", marginRight: "5%", height: 150, paddingTop: "3%"}
              ]}
            >
              <View style={{}}>
                <Text style={[styles.text]}>Tags</Text>
                <View
                  style={{
                    width: "80%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    marginLeft: "0%",
                    marginTop: "5%"
                  }}
                >
                  {this.state.contactSelected.tags.map(tag => (
                    <Text style={styles.tag}>{tag}</Text>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 80,
                width: "100%",
                marginTop: 40,
                marginBottom: 150
              }}
            >
              <TouchableHighlight
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.handleEmail}
              >
                <View>
                  <SvgUri
                    width="30"
                    height="20"
                    source={require("../../resources/svg/email.svg")}
                  />
                  <Text style={styles.button2}>eMail</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.handlePhoneCall}
              >
                <View>
                  <SvgUri
                    width="20"
                    height="20"
                    source={require("../../resources/svg/call.svg")}
                  />
                  <Text style={styles.button2}>Call</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.chatPage}
                style={{
                  borderColor: "white",
                  borderWidth: 1,
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View>
                  <SvgUri
                    width="40"
                    height="20"
                    source={require("../../resources/svg/chat.svg")}
                  />
                  <Text style={styles.button2}>Chat</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerContact: {
    flex: 1
  },
  container: {
    height: "300%",
    backgroundColor: "black",
    color: "white"
  },
  imagePerfil: {
    marginLeft: "43%"
  },
  arrow: {
    marginTop: "15%",
    marginLeft: "6%"
  },
  boxTitle: {
    marginTop: "12%",
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
    marginBottom: 20,
    marginLeft: "6%",
    marginRight: "6%"
  },
  acordeon: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 20,
    marginBottom: 20,
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
    marginTop: 20,
    marginLeft: "6%",
    marginRight: "6%",
    height: 100
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
  },
  tag: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    color: "black",
    backgroundColor: "white",
    padding: 5,
    height: 28,
    margin: 4
  }
});
