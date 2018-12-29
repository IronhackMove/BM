import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native"

export default class EventCard extends Component {

  constructor(props) {
    super()
    this.props=props
  } 

  render() {
    return (
      <View style={styles.eventsCard}>
        <Text style={{ color: "white" }}>{this.props.city}</Text>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../resources/images/tech.jpg")}
        />
        <Text style={styles.name}>{this.props.item.name}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

    image: {
      width: "100%"
    },
    eventsCard: {
      marginRight: 20,
      marginLeft: 20,
      width: 200,
      height: 400,
    },
    name: {
      backgroundColor: "white",
      color: "black"
    }
  });
  