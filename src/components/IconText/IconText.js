import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native"

export default class IconText extends Component {

  constructor(props) {
      super(props)
      this.props=props
  }
  render() {
    return (
      <View>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    text: {
        color: "white"
    }
  });
  