//

import React, { Component } from "react";
import io from "socket.io-client";
import { URL, appColors } from "../../utils/utils";
import { SearchBar, ButtonGroup } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import { Badge } from "react-native-elements";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableHighlight,
  Dimensions
} from "react-native";

import apiBack from "../../api/apiBack";
import Accordion from "react-native-collapsible/Accordion";
import SvgUri from "react-native-svg-uri";

const _ = require("lodash");

export default class Contacts extends Component {
  static navigationOptions = {
    header: null // !!! Hide Header
  };

  constructor() {
    super();
    this.state = {
      token: null,
      activeSections: [],
      user: null,
      contacts: [],
      filteredContacts: [],
      index: 0,
      dataInfo: false,
      dataChart: [],
      allTags: []
    };

    this.contacts = [];
    this.handleChange = this.handleChange.bind(this);
    this.socket = io(URL);

    this.socket.on("updateContactList", newContactData => {
      if (_.includes(newContactData, this.state.user.id)) {
        AsyncStorage.getItem("userToken").then(token => {
          apiBack.GetContactOfUsers(token).then(user => {
            apiBack.GetContactOfUsers(user.access_token).then(userUpdated =>
              this.setState({
                ...this.state,
                contacts: _.groupBy(userUpdated.contacts, "meetup")
              })
            );
          });
        });
      }
    });
  }

  componentDidMount() {
    this._updateList();
  }

  _updateIndex = index => {
    this.setState({ index, contacts: this.state.filteredContacts });
  };

  _updateList = () => {
    AsyncStorage.getItem("userToken")
      .then(token => apiBack.GetContactOfUsers(token))
      .then(user => {
        var result = _(user.contacts)
          .groupBy("meetup")
          .map((items, name) => {
            var randomNumber = this.getRandomArbitrary(89, 255);

            return {
              label: name,
              value: items.length,
              color: `rgba(${randomNumber}, ${randomNumber},${randomNumber} , 1)`
            };
          })
          .value();
        const allTags = [];
        _(user.contacts).forEach(contact => {
          allTags.push(...contact.contact.tags);
        });

        const resultTags = _.values(_.groupBy(allTags)).map(d => {
          let color;

          switch (d.length) {
            case 1:
              color = "white";
              break;
            case 2:
              color = appColors[1];
              break;
            case 3:
              color = appColors[2];
              break;
            case 4:
              color = appColors[3];
              break;
            default:
              color = appColors[4];
          }

          return {
            name: d[0],
            count: d.length,
            badgeColor: color,
            textColor: d.length === 1 ? "black" : "white",
            fontSize: d.length === 1 ? 13 : 13 * (d.length / 1.5)
          };
        });

        this.setState({
          ...this.state,
          user: user,
          contacts: _.groupBy(user.contacts, "meetup"),
          filteredContacts: _.groupBy(user.contacts, "meetup"),
          dataChart: result,
          allTags: resultTags
        });
      });
  };

  _list = () => {
    this._updateList();
  };

  getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  _renderHeader = item => {
    return (
      <View key={item}>
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
            this._renderContent(contact, item)
          )}
        </View>
      </View>
    );
  };

  _renderContent = item => {
    return (
      <TouchableHighlight
        key={item.contact.id}
        onPress={() =>
          this.props.navigation.navigate("ContactSelected", {
            idContact: item.contact.id,
            list: this._list,
            meetup: item.meetup
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
            <View
              style={{
                width: "75%",
                flexDirection: "row",
                flexWrap: "wrap",
                marginLeft: "6%",
                marginTop: "5%"
              }}
            >
              {item.contact.tags.map((tag, i) => (
                <View key={i} style={{ marginRight: 10, marginBottom: 10 }}>
                  <Text style={styles.tag}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  _searchTag(tag) {
    this.handleChange(tag);
  }

  handleChange(e) {
    // Variable to hold the original version of the list
    let currentContacts = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];
    let meetups = [];
    let filteredMeetups = [];
    let updatedList;

    // If the search bar isn't empty
    if (e !== "") {
      // Assign the original list to currentContacts
      currentContacts = this.state.contacts;

      meetups = Object.keys(currentContacts);

      meetups.forEach(meetup => {
        currentContacts[meetup].forEach(meet => {
          let filter = meet.contact.tags.filter(tag => {
            const lc = tag.toLowerCase();
            const filter = e.toLowerCase();
            if (lc.includes(filter)) {
              filteredMeetups.push(meet);
            }
          });
        });
      });

      updatedList = _.groupBy(
        _.uniqBy(filteredMeetups, "contact.id"),
        "meetup"
      );
      this.setState({ contacts: updatedList, index: 0 });
    } else {
      this.setState({ contacts: this.state.filteredContacts, index: 0 });
    }
  }

  render() {
    console.log("Contactos", Object.keys(this.state.contacts).length);
    return (
      <React.Fragment>
        <View style={{ backgroundColor: "black", margin: 0 }}>
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
        </View>
        <ButtonGroup
          containerStyle={{
            height: 60,
            marginBottom: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0
          }}
          selectedBackgroundColor="pink"
          onPress={this._updateIndex}
          selectedIndex={this.state.index}
          buttons={["Contacts", "Skills Map"]}
          innerBorderStyle={{ borderColor: "black" }}
          buttonStyle={{ backgroundColor: "black", margin: 0, padding: 0 }}
          selectedButtonStyle={{
            backgroundColor: "black"
          }}
          selectedTextStyle={[
            {
              color: "white",
              textDecorationLine: "underline",
              fontWeight: "bold",
              paddingBottom: 3,
              fontSize: 21,
              letterSpacing: 1.2,
              fontFamily: "Helvetica",
              fontWeight: "normal"
            }
          ]}
          textStyle={{
            color: "white",
            textDecorationLine: "none",
            fontSize: 13,
            letterSpacing: 1.2,
            fontFamily: "Helvetica",
            fontWeight: "normal"
          }}
        />
        {this.state.index === 0 && (
          <SearchBar
            onChangeText={this.handleChange}
            onClearText={() => {}}
            containerStyle={{
              marginTop: 0,
              backgroundColor: "black",
              height: 60,
              justifyContent: "center"
            }}
            leftIconContainerStyle={{
              color: "white",
              alignItems: "center",
              justifyContent: "center"
            }}
            inputStyle={{
              backgroundColor: "black",
              color: "white",
              marginLeft: 20
            }}
            placeholder="Busca un contacto..."
            lightTheme
          />
        )}

        {this.state.index === 0 && (
          <ScrollView style={{ backgroundColor: "black" }}>
            <View style={styles.container}>
              {this.state.contacts !== null && (
                <View>
                  {Object.keys(this.state.contacts).map(meetup =>
                    this._renderHeader(meetup)
                  )}
                </View>
              )}
              {(Object.keys(this.state.contacts).length === 0 ) && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    marginTop: "35%",
                    alignItems: "center"
                  }}
                >
                  <SvgUri
                    width="150"
                    height="150"
                    source={require("../../resources/svg/qr.svg")}
                  />
                  <Text style={{ color: "white", marginTop: "1%"}}>
                    Escane a tu primer contacto!
                  </Text>
                </View>
              )}
              {Object.keys(this.state.contacts).length === 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 50
                  }}
                >
                  <SvgUri
                    width="150"
                    height="150"
                    source={require("../../resources/svg/qr.svg")}
                  />
                  <Text style={{ color: "white", marginTop: 20 }}>
                    No se han encontrado coincidencias..
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        {this.state.index === 1 && (
          <ScrollView style={{ backgroundColor: "black" }}>
            <View
              style={{
                height: "100%",
                width: "100%",
                flex: 1,
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center",
                  padding: 10,
                  marginTop: 100
                }}
              >
                {this.state.allTags.map(tag => (
                  <TouchableHighlight onPress={() => this._searchTag(tag.name)}>
                    <Badge
                      containerStyle={{
                        backgroundColor: tag.badgeColor,
                        margin: 5,
                        borderRadius: 0
                      }}
                    >
                      <Text
                        style={[
                          styles.tags,
                          { color: tag.textColor, fontSize: tag.fontSize }
                        ]}
                      >
                        {tag.name}
                      </Text>
                    </Badge>
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    color: "white",
    height: 2000
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
    marginLeft: "5%"
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
    height: 50,
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
    fontSize: 13,
    letterSpacing: 1.2,
    paddingLeft: 10,
    paddingRight: 10,
    color: "black",
    backgroundColor: "white"
  },
  tags: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    paddingLeft: 10,
    paddingRight: 10
  }
});
