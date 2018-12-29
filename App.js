import React, { Component } from "react";
import { createSwitchNavigator,createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import AuthLoadingScreen from "./src/components/AuthLoadingScreen";
import Home from "./src/components/Home";
import BimeCard from "./src/components/BimeCard";
import Contacts from "./src/components/CatactsStack"
import ScanScreen from "./src/components/ScanScreen";
import Categories from "./src/components/Categories";
import Profile from "./src/components/Profile";
import Login from "./src/components/Login";
import ButtonCamera from "./src/components/ButtonCamera";
import IconText from "./src/components/IconText";

console.disableYellowBox = true;


// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const AppStack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "",
      tabBarIcon: <IconText text={"EVENTS"}/> 
    }
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      title: "",
      tabBarIcon: <IconText text={"CONTACTS"}/> 
    }
  },
  Adding: {
    screen: ScanScreen,
    // Empty screen
    navigationOptions: () => ({
        title: "",
        tabBarIcon: <ButtonCamera /> // Plus button component
    })
},
  BimeCard: {
    screen: BimeCard,
    navigationOptions: {
      title: "",
      tabBarIcon: <IconText text={"QR"}/> 
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "",
      tabBarIcon: <IconText text={"PROFILE"}/>
    }
  }
},{
  lazy: false,
  tabBarOptions: {
      showLabel: false,
      labelStyle: {
        color: "white",
        margin: 0,
        paddingBottom: 20,
    },
   
    style: {
          color: "white",
          alignItems: "center",
          backgroundColor: 'black', // TabBar background
      }
  }
});


const CategoriesStack = createStackNavigator({Categories: Categories});
const ProfileStack = createStackNavigator({ Profile: Profile });
const ScanStack = createStackNavigator({ ScanScreen: ScanScreen });
const AuthStack = createStackNavigator({ Login: Login });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Category: CategoriesStack,
      Prof: ProfileStack,
      App: AppStack,
      Scan: ScanStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading",
      navigationOptions: {
        headerVisible: false
      }
    }
  )
);
