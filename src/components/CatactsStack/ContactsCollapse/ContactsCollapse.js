import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";

import Accordion from "react-native-collapsible/Accordion";

const SECTIONS = [
  {
    title: "First",
    content: "Lorem ipsum...",
    image: "https://www.mundodeportivo.com/r/GODO/MD/p5/ContraPortada/Imagenes/2018/12/18/Recortada/img_pmorata_20171217-213327_imagenes_md_propias_pmorata_depor5-037-kcfE-U453634812061vHE-980x554@MundoDeportivo-Web.JPG"
  },
  {
    title: "Second",
    content: "Lorem ipsumfasdfdsafasdf f asdf adsf asdf asd fasd fasd f asdf asdf asdf asdfasdfsafasdf asf asdfasdfasd fas f asdf asdf asd fas dfa sdf asdf asdf asd fasd fas df asdf asd fasd fas fasdfasdfasdfasdfasdfas df asdf asdf asd...",
    image: "https://www.mundodeportivo.com/r/GODO/MD/p5/ContraPortada/Imagenes/2018/12/18/Recortada/img_pmorata_20171217-213327_imagenes_md_propias_pmorata_depor5-037-kcfE-U453634812061vHE-980x554@MundoDeportivo-Web.JPG"

  }
];

export default class ContactsCollapse extends Component {
  constructor() {
    super();
    this.state = {
      activeSections: []
    };
  }

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: `${section.image}`}}
        />
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  }
});
