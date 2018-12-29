import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View, Image } from "react-native";
import SvgUri from "react-native-svg-uri";

export default class ButtonCamera extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View style={{marginLeft:25}}>
       <Image source={require('../resources/images/photo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
