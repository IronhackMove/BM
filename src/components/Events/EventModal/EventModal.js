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
  TouchableHighlight
} from "react-native";

import SvgUri from "react-native-svg-uri";

import { Days } from "../../utils/utils";

var moment = require("moment");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const sliderWidth = wp(100);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      modalVisible: null
    };
  }
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
              <View style={{marginBottom: 100}} />
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
  }
});
