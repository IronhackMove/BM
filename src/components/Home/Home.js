import React from "react";
import apiBack from "../api/apiBack";
import apiMeetups from "../api/apiMeetups";
import SvgUri from "react-native-svg-uri";
import Carousel from "react-native-snap-carousel";
import { CategoryImages } from "../utils/utils";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Dimensions
} from "react-native";
import { Text, Button } from "react-native-elements";
import EventModal from "../Events/EventModal/EventModal";
import { Days, meetupsIfError } from "../utils/utils";

const _ = require("lodash");

var moment = require("moment");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const iron = {
  created: 1544383542000,
  duration: 10800000,
  id: "257084100",
  name: "HACKSHOW | Web + UX + Data ",
  rsvp_limit: 100,
  status: "upcoming",
  time: 1545321600000,
  local_date: "2019-01-18",
  local_time: "18:00 - 20:00",
  updated: 1544466020000,
  utc_offset: 3600000,
  waitlist_count: 0,
  yes_rsvp_count: 95,
  venue: {
    id: 25615553,
    name: "GoMadrid",
    lat: 40.420101165771484,
    lon: -3.705322027206421,
    repinned: true,
    address_1: "Paseo de la Chopera, 14",
    address_2: "Planta 2",
    city: "Madrid",
    country: "es",
    localized_country_name: "España"
  },
  group: {
    created: 1495125612000,
    name: "Cryptoinvest (Inversión en criptomonedas)",
    id: 23847260,
    join_mode: "open",
    lat: 40.41999816894531,
    lon: -3.7100000381469727,
    urlname: "Cryptoinvest",
    who: "Criptoinversores",
    localized_location: "Madrid, España",
    state: "",
    country: "es",
    region: "es",
    timezone: "Europe/Madrid"
  },
  link: "https://www.meetup.com/es/Cryptoinvest/events/257084100/",
  description: `Ha llegado el día!!!

  El Hackshow es el "Demoday" que se lleva acabo al final de cada bootcamp. Durante las ultimas semanas, nuestros ironhackers trabajan sobre sus propios proyectos! Entre todos los proyectazos, hemos hecho una selección y te los presentarán ellos mismos!
  
  Al final, se votará cual ha sido el mejor proyecto, nos tomaremos unas cerves y celebraremos el fin del bootcamp!
  
  En esta ocasión contaremos con estudiantes de las ediciones de Web Development, UX/UI y Data Analytics.
  
  Nos vemos allí!`,
  visibility: "public",
  image: require("../resources/images/hack.png")
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const slideHeight = wp(30);
const sliderWidth = wp(100);
const itemWidth = wp(85);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      token: null,
      user: null,
      events: null,
      location: null,
      modalVisible: false,
      eventSelected: null,
      loadingContent: true
    };
  }

  componentWillMount() {
    this.loadPosition();
  }

  setModalVisible = async (visible, event) => {
    let parti = false;
    const participation = await apiBack.GetParticipationStatus(
      event,
      this.state.user._id
    );

    const participantsMeetup = await apiBack.GetParticipantsMeetup(event);

    if (participantsMeetup !== null) {
      trueParticipants = _.groupBy(participantsMeetup.participants, "participation");
    }

    if (participation !== null) {

      parti = _.filter(participation.participants, [
        "contact._id",
        this.state.user._id
      ])[0].participation;

      this.setState({
        ...this.state,
        eventParticipation: parti,
        modalVisible: visible,
        eventSelected: event,
        trueParticipants: trueParticipants
      });
    } else {

      this.setState({
        ...this.state,
        eventParticipation: parti,
        modalVisible: visible,
        eventSelected: event,
        trueParticipants: trueParticipants !== null ? trueParticipants : []
      });
    }
  };

  closeModal = visible => {
    this.setState({
      ...this.state,
      modalVisible: visible
    });
  };

  _showCategoriesMeetups() {
    apiMeetups.GetCategories();
  }

  loadPosition = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      // const position = await this.getCurrentPosition();
      const userProfile = await apiBack.GetUserProfile(token);
      // const categories = userProfile.data.selectedCategories;

      // const closeMeetups = await apiMeetups.GetCloseMeetups(
      //   userProfile,
      //   position
      // );

      // const meetups = closeMeetups
      //   .map(meetups => meetups.data)
      //   .map(events => events.events.slice(0, 2));

      // categories.forEach((category, i) => {
      //   meetups[i].forEach(meet => {
      //     meet.image =
      //       CategoryImages[category.shortname][
      //         parseInt(
      //           Math.random() * CategoryImages[category.shortname].length
      //         )
      //       ];
      //   });
      // });

      joinMeetups = [];

      // meetups.forEach((meetup, i) => {
      //   meetup.forEach(meet => {
      //     joinMeetups.push(meet);
      //   });
      // });

      joinMeetups.unshift(iron);
      const meets = await apiBack.SaveMeetups(token, joinMeetups);
      joinMeetups.unshift({});

      this.setState({
        ...this.state,
        token: token,
        location: position.coords,
        user: userProfile.data,
        events: joinMeetups,
        loadingContent: false
      });
    } catch (error) {
      const token = await AsyncStorage.getItem("userToken");
      const userProfile = await apiBack.GetUserProfile(token);
      const arrayOfMeetups = meetupsIfError;
      const meets = await apiBack.SaveMeetups(token, arrayOfMeetups);
      this.setState({
        loadingContent: false,
        events: meetupsIfError,
        user: userProfile.data
      });
    }
  };

  getCurrentPosition = (
    options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  ) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  _getParticipation = evento => {
    const participation = apiBack.GetParticipationStatus(this.state.eventId, this.state.userId)
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item, index }) => {
    return (
      <View>
        {item.name ? (
          <TouchableHighlight
            onPress={() => {
              if (item.name) {
                this.setModalVisible(true, item);
              }
            }}
          >
            <View style={styles.slide}>
              <View>
                <View>
                  {item.local_date ? (
                    <View style={styles.eventDate}>
                      <View style={styles.eventDay}>
                        <Text style={styles.text}>
                          {Days[moment(item.local_date).day()]}
                        </Text>
                        <Text style={styles.text}>
                          {item.local_date ? item.local_date : ""}
                        </Text>
                      </View>
                      <View style={styles.eventHour}>
                        <Text style={styles.text}>Hour</Text>
                        <Text style={styles.text}>
                          {item.local_time ? item.local_time : ""}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View />
                  )}
                </View>

                <Image
                  style={{ width: wp(85), height: wp(120) }}
                  source={item.image}
                />

                {item.venue ? (
                  <View>
                    <Text style={styles.text}>
                      {item.venue ? item.venue.address_1 : "No adress"}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}

                {item.name ? (
                  <View style={styles.eventName}>
                    <Text style={styles.nameevent}>
                      {item.name ? item.name : ""}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </TouchableHighlight>
        ) : (
          <View />
        )}
      </View>
    );
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <SvgUri
            width="80"
            height="80"
            source={require("../resources/svg/logo.svg")}
          />
          <Text style={{ color: "wihte" }}>Hola</Text>

          <View style={styles.claim}>
            <Text style={styles.text}>Bussines Meeting,</Text>
            <Text style={styles.text}>your contacts interesting</Text>
            <Text style={styles.text}>in your hand.</Text>
          </View>

          <View style={styles.slidesContainer}>
            {this.state.loadingContent === true && (
              <View>
                {/* <Button onPress={this._signOutAsync}></Button> */}
                <Text style={styles.text}>Buscando meetups...</Text>
              </View>
            )}

            {this.state.user !== null &&
              this.state.eventParticipation !== null && (
                <EventModal
                  userId={this.state.user._id}
                  eventParticipation={this.state.eventParticipation}
                  eventSelected={this.state.eventSelected}
                  closeModal={this.closeModal}
                  visible={this.state.modalVisible}
                  trueParticipants={this.state.trueParticipants}
                />
              )}

            {this.state.loadingContent === false && (
              <View style={{ position: "absolute", left: 150 }}>
                <Image
                  source={require("../resources/images/animationHand.gif")}
                />
              </View>
            )}
            {this.state.events !== null && (
              <Carousel
                layout={"default"}
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.events}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                itemHeight={slideHeight}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    color: "white"
  },
  slidesContainer: {
    position: "absolute",
    top: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "380%"
  },
  logo: {
    marginTop: 80,
    marginLeft: 25
  },

  claim: {
    marginTop: 25
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
    justifyContent: "space-between",
    backgroundColor: "black"
  },
  eventName: {
    backgroundColor: "white",
    position: "absolute",
    left: -10,
    bottom: "15%",
    paddingLeft: 10,
    paddingRight: 10
  },
  nameevent: {
    fontSize: 18
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
    height: 400
  }
});
