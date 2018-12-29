import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Picker,
  Image,
  AsyncStorage,
  TouchableHighlight,
  ScrollView
} from "react-native";

import { Avatar, Badge, Text } from "react-native-elements";
import Button from "react-native-button";

import apiBack from "../api/apiBack";

const colorCategories = {
  Tech: "#f08ff1",
  Business: "#2574fc",
  Community: "#60fadd",
  Support: "#537895",
  Education: "#f33b47",
  Movements: "#f9d423"
};

export default class Categories extends Component {
  static navigationOptions = {
    header: null // !!! Hide Header
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      token: null,
      lenguage: null,
      categories: null,
      selectedCategories: []
    };
  }

  componentDidMount() {
    this._loadInitialInfo()
  }

  _loadInitialInfo = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const categories = await apiBack.GetCategories()
    this.setState({...this.state, token: token, categories: categories.data})
  } 

  _handleButton(category) {
    var arraySelectedCategories = this.state.selectedCategories;
    let foundCategory = {
      found: false,
      id: null
    };
    if (arraySelectedCategories.length > 0) {
      arraySelectedCategories.map((selectedCategory, i) => {
        if (selectedCategory.shortname === category.shortname) {
          foundCategory.found = true;
          foundCategory.id = i;
        }
      });

      if (foundCategory.found === false) {
        arraySelectedCategories.push(category);
        this.setState({
          ...this.state,
          selectedCategories: arraySelectedCategories
        });
      } else {
        arraySelectedCategories.splice(foundCategory.id, 1);
        this.setState({
          ...this.state,
          selectedCategories: arraySelectedCategories
        });
      }
    } else {
      arraySelectedCategories.push(category);
      this.setState({
        ...this.state,
        selectedCategories: arraySelectedCategories
      });
    }
  }

  _saveCategories() {
    apiBack.UpdateCategories(this.state.token, this.state.selectedCategories);
    this.props.navigation.navigate("Profile", {
      access_token: this.state.token
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.selectedCategories !== null && (
          <View style={styles.selectedCategories}>
            {this.state.selectedCategories.map(selectedCategory => (
              <Badge
                key={selectedCategory._id}
                containerStyle={{
                  backgroundColor: colorCategories[selectedCategory.shortname],
                  marginBottom: 20,
                  borderRadius: 3,
                  marginLeft: 10
                }}
              >
                <Text style={{ color: "black", fontSize: 21 }}>
                  {selectedCategory.shortname}
                </Text>
              </Badge>
            ))}
          </View>
        )}
        <Text style={styles.text} onPress={() => {}}>Select your favorit event</Text>
        {this.state.categories !== null && (
          <View style={styles.categories}>
            {this.state.categories.map(category => (
              <Badge
                key={category.id}
                containerStyle={{
                  backgroundColor: colorCategories[category.shortname],
                  marginBottom: 20,
                  width: "100%",
                  borderRadius: 3,
                  opacity: 0.8
                }}
                onPress={() => this._handleButton(category)}
              >
                <Text style={{ color: "black", fontSize: 21 }}>
                  {category.shortname}
                </Text>
              </Badge>
            ))}
          </View>
        )}
        <View style={styles.save}>
          <TouchableHighlight onPress={() => this._saveCategories()}>
            <Text style={{ color: "white", textDecorationLine: "underline", letterSpacing: 1.2, fontSize: 13 }}>
              Save
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // width: "100%",
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedCategories: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: "80%"
  },
  categories: {
    flex: 1
  },
  save: {
    flex: 1,
    marginTop: 100
  },
  buttonSection: {
    flex: 1
  },
  textName: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 21,
    color: "black",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    height: 25,
    marginTop: 20
  },
  buttons: {
    width: 400,
    marginTop: 10,
    alignItems: "center"
  },
  text: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    letterSpacing: 1.2,
    fontSize: 13,
    margin: 1.5,
    color: "white", 
    marginBottom: 20
  }
});
