import React, { Component } from "react";
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableHighlight
} from "react-native";

import { ListItem, Avatar } from "react-native-elements";

import { Calendar, Permissions } from "expo";

import Icon from "react-native-vector-icons/Ionicons";
import SvgUri from "react-native-svg-uri";

import { Days } from "../../utils/utils";
import apiBack from "../../api/apiBack";

var moment = require("moment");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function strip_html_tags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/<[^>]*>/g, "");
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const _ = require("lodash");

const sliderWidth = wp(100);

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      modalVisible: this.props.visible,
      updateMode: true,
      eventId: this.props.eventSelected,
      userId: this.props.userId,
      part: [],
      participation: null,
      updatedParticipation: false
    };
  }

  componentDidMount() {

  }


  _handleIconState = async state => {
    console.log(this.props.eventSelected.id);

    const updatePart = await apiBack.AddParticipationMeetup(
      this.props.eventSelected.id,
      this.props.userId,
      state
    );
    console.log(updatePart);

    const participantsMeetup = await apiBack.GetParticipantsMeetup(
      this.props.eventSelected
    );
    console.log(_.groupBy(participantsMeetup.participants, "participation"));

    Alert.alert("Participación actualizada");
    this.setState({
      ...this.state,
      participation: state,
      part: _.groupBy(participantsMeetup.participants, "participation"),
      updatedParticipation: true
    });
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        {this.props.eventSelected !== null && (
          <ScrollView style={styles.container}>
            <View style={styles.imagePerfil}>
              <Image
                style={{ width: 250, height: 420, position: "absolute" }}
                source={this.props.eventSelected.image}
              />
            </View>
            <TouchableHighlight
              onPress={() => {
                this.props.closeModal(false);
                this.setState({
                  ...this.state,
                  participation: null,
                  updatedParticipation: false
                });
              }}
            >
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
                  {this.props.eventSelected.name}
                </Text>
              </View>
            </View>

            {this.props.eventSelected.venue ? (
              <View style={styles.boxOption1}>
                <Text style={styles.text}>
                  {this.props.eventSelected.venue.city}
                </Text>
                <Text style={styles.text}>
                  {this.props.eventSelected.venue.address_1}
                </Text>
              </View>
            ) : (
              <View style={{ marginBottom: 100 }} />
            )}

            <View style={styles.boxOption2}>
              <Text style={styles.text}>
                {Days[moment(this.props.eventSelected.local_date).day()]}
              </Text>
              <Text style={styles.text}>
                {this.props.eventSelected.local_date}
              </Text>
            </View>
            <View style={styles.boxOption2}>
              <Text style={styles.text}>HORA</Text>
              <Text style={styles.text}>
                {this.props.eventSelected.local_time}
              </Text>
            </View>

            <View style={styles.boxOption1}>
              <Text style={styles.text}>
                {strip_html_tags(this.props.eventSelected.description)}
              </Text>
            </View>

            <View style={styles.boxOption3}>
              <TouchableHighlight onPress={() => this._handleIconState(true)}>
                <Icon
                  name={
                    this.state.participation !== null
                      ? this.state.participation
                        ? "ios-checkmark-circle"
                        : "ios-checkmark-circle-outline"
                      : this.props.eventParticipation
                      ? "ios-checkmark-circle"
                      : "ios-checkmark-circle-outline"
                  }
                  color="white"
                  size={60}
                  style={{ padding: 10 }}
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this._handleIconState(false)}>
                <Icon
                  name={
                    this.state.participation !== null
                      ? this.state.participation
                        ? "ios-close-circle-outline"
                        : "ios-close-circle"
                      : this.props.eventParticipation
                      ? "ios-close-circle-outline"
                      : "ios-close-circle"
                  }
                  color="white"
                  size={60}
                  style={{ padding: 10 }}
                />
              </TouchableHighlight>
            </View>
            {this.props.trueParticipants["true"] !== undefined &&
              this.state.updatedParticipation === false && (
                <View style={styles.listParticipants}>
                  {this.props.trueParticipants["true"].map((participant, i) => (
                    <View style={styles.partBox}>
                      <View style={styles.partImage}>
                        <Avatar
                          size="large"
                          source={{
                            uri: participant.contact.pictureUrls.values[0]
                          }}
                        />
                      </View>
                      <View style={styles.partInfo}>
                        <Text style={styles.partName}>
                          {participant.contact.firstName +
                            " " +
                            participant.contact.lastName}
                        </Text>
                        <Text style={styles.partHeadline}>
                          {participant.contact.headline}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            {this.props.trueParticipants["true"] !== undefined &&
              this.state.updatedParticipation === true && (
                <View style={styles.listParticipants}>
                  {this.state.part["true"].map((participant, i) => (
                    <View style={styles.partBox}>
                      <View style={styles.partImage}>
                        <Avatar
                          size="large"
                          source={{
                            uri: participant.contact.pictureUrls.values[0]
                          }}
                        />
                      </View>
                      <View style={styles.partInfo}>
                        <Text style={styles.partName}>
                          {participant.contact.firstName +
                            " " +
                            participant.contact.lastName}
                        </Text>
                        <Text style={styles.partHeadline}>
                          {participant.contact.headline}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            {this.props.trueParticipants["true"] === undefined &&
              this.state.updatedParticipation === true && (
                <View
                  style={{
                    padding: 10,
                    marginBottom: 30,
                    flex: 1,
                    justifyContent: "center"
                  }}
                >
                  <Text style={[styles.text, { textAlign: "center" }]}>
                    Nadie ha confirmado su participación por ahora..
                  </Text>
                </View>
              )}
          </ScrollView>
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    color: "white"
  },
  icon: {
    fontSize: 30
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
    marginRight: "6%",
    marginBottom: 20
  },
  boxOption2: {
    marginTop: 30,
    marginLeft: "6%",
    marginRight: "6%"
  },
  boxOption3: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "6%",
    marginRight: "6%"
  },
  listParticipants: {
    marginBottom: 50
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
  partBox: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderBottomColor: "white"
  },
  partImage: {
    marginRight: 10
  },
  partName: {
    color: "white",
    fontSize: 18,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    letterSpacing: 1.2
  },
  partHeadline: {
    color: "grey",
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    width: 350
  }
});
