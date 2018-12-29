//

import React, { Component } from "react";
import io from "socket.io-client";
import { URL } from "../../utils/utils";
import { SearchBar } from "react-native-elements";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableHighlight
} from "react-native";

import apiBack from "../../api/apiBack";
import Accordion from "react-native-collapsible/Accordion";
import SvgUri from "react-native-svg-uri";

const _ = require("lodash");

export default class Contacts extends Component {
  static navigationOptions = {
    header: null // !!! Hide Header
  };

  componentDidMount() {
    this._updateList();
  }

  _updateList = () => {
    AsyncStorage.getItem("userToken")
      .then(token => apiBack.GetContactOfUsers(token))
      .then(user => {
        var meetups = _.uniq(_.map(user.contacts, "meetup"));
        console.log(meetups);
        this.setState({
          ...this.state,
          user: user,
          contacts: _.groupBy(user.contacts, "meetup"),
          headerMeetups: meetups
        });
      });
  };

  constructor() {
    super();
    this.state = {
      token: null,
      activeSections: [],
      user: null,
      contacts: [],
      headerMeetups: []
    };

    this.contacts = [];

    this.socket = io(URL);

    this.socket.on("updateContactList", newContactData => {
      console.log(newContactData);
      if (_.includes(newContactData, this.state.user.id)) {
        AsyncStorage.getItem("userToken").then(token => {
          console.log(token);
          apiBack.GetContactOfUsers(token).then(user => {
            apiBack
              .GetContactOfUsers(user.access_token)
              .then(userUpdated =>
                this.setState({ ...this.state, contacts: userUpdated.contacts })
              );
          });
        });
      }
    });
  }

  _renderHeader = item => {
    return (
      <View>
        <View style={styles.event}>
          <View style={styles.header}>
            <Text style={styles.headerEvent}>{item}</Text>
          </View>
          <View style={(width = "100%")}>
            <View style={{ marginRight: 20 }}>
              <SvgUri
                marginTop="30"
                width="20"
                height="20"
                source={require("../../resources/svg/arrow.svg")}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {this.state.contacts[item].map(contact =>
            this._renderContent(contact)
          )}
        </View>
      </View>
    );
  };
  _renderContent = item => {
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate("ContactSelected", {
            idContact: item.contact.id
          })
        }
      >
        <View style={styles.content}>
          <Image
            style={styles.avatar}
            source={{ uri: item.contact.pictureUrls.values[0] }}
          />
          <View style={styles.positionNameText}>
            <Text style={styles.name}>
              {item.contact.firstName} {item.contact.lastName}
            </Text>
            <Text style={styles.text}>{item.contact.headline}</Text>
            <View style={{ flexDirection: "row", marginLeft:"6%", marginTop:"5%" }}>
              <View style={{ marginRight: 10 }}>
                <Text style={styles.tag}>Auditoría</Text>
              </View>
              <View style={{ marginRight: 10 }}>
                <Text style={styles.tag}>Finanzas</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* <SearchBar
          onChangeText={() => {}}
          onClearText={() => {}}
          containerStyle={{marginTop:40}}
          placeholder="Type Here..."
        /> */}
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <View style={styles.arrow}>
              <SvgUri
                width="20"
                height="20"
                source={require("../../resources/svg/arrow.svg")}
              />
            </View>
          </TouchableHighlight>
          {this.state.contacts !== null && (
            <View>
              {Object.keys(this.state.contacts).map(meetup =>
                this._renderHeader(meetup)
              )}
            </View>
            // <Accordion
            //   sections={this.state.contacts}
            //   activeSections={this.state.activeSections}
            //   renderSectionTitle={this._renderSectionTitle}
            //   renderHeader={this._renderHeader}
            //   renderContent={this._renderContent}
            //   onChange={this._updateSections}
            // />
          )}
          {this.state.contacts.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <SvgUri
                width="150"
                height="150"
                source={require("../../resources/svg/qr.svg")}
              />
              <Text style={{ color: "white", marginTop: 20 }}>
                Escane a tu primer contacto!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "300%",
    backgroundColor: "black",
    color: "white"
  },
  section: {
    justifyContent: "center"
  },
  positionNameText: {
    marginTop: "5%",
    marginRight: "10%",
    marginBottom: "5%"
  },
  content: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginLeft: "5%",
  },
  avatar: {
    marginTop: "0%",
    marginLeft: "-5%",
    width: "28%",
    height: 150
  },
  header: {
    marginTop: "50%",
    width: 500
  },
  header1: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "5%",
    marginTop: "5%",
    marginRight: "10%"
  },
  event: {
    marginTop: "8%",
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerEvent: {
    width: 300,
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    textAlign: "left",
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "5%",
    marginRight: "10%"
  },
  arrow: {
    marginTop: "5%",
    marginBottom: "5%",
    marginLeft: "6%"
  },
  name: {
    fontSize: 13,
    letterSpacing: 1.2,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "3%",
    marginRight: "6%",
    color: "black",
    backgroundColor: "white",
    position: "absolute"
  },
  text: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "white",
    marginTop: "10%",
    marginLeft: "6%",
    marginRight: "20%"
  },
  header: {
    color: "white"
  },
  headerText: {
    fontSize: 13,
    letterSpacing: 1.2,
    color: "white",
    marginTop: 40,
    marginLeft: "6%",
    marginRight: "6%"
  },
  tag: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    color: "black",
    backgroundColor: "white",
    padding: 5
  }
});
