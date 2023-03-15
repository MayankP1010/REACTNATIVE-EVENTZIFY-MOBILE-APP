import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Additonal from "./Additional";
import Social from "./Social";
import React, { Component } from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import Profile1 from "./Profile1";

const Tabs = createMaterialTopTabNavigator(
  {
    Profile1: {
      screen: Profile1,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <View style={styles.iconCOntainer}>
            <Icon name="ios-person" color={tintColor} size={22} />
            <Text style={{ color: tintColor }}>Personal</Text>
          </View>
        ),
      },
    },

    Home: {
      screen: Additonal,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <View style={styles.iconCOntainer}>
            <Icon name="ios-home" color={tintColor} size={22} />
            <Text style={{ color: tintColor }}>Additional</Text>
          </View>
        ),
      },
    },

    Social: {
      screen: Social,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <View style={styles.iconCOntainer}>
            <Icon name="ios-share" color={tintColor} size={22} />
            <Text style={{ color: tintColor }}>Social</Text>
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: "Profile1",
    lazyLoad: true,
    tabBarPosition: "top",
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        height: 70,
        backgroundColor: "#0d47a1",
        paddingBottom: 3,
        paddingTop: 3,
      },
      indicatorStyle: {
        backgroundColor: "#fff",
        elevation: 10,
      },
      activeTintColor: "#fff",
      inactiveTintColor: "gray",
    },
  }
);

const MainScreenNavigator = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      title: "Eventzify",
      headerLeft: <Image
      style={{width:40,height:40,marginLeft:15,borderRadius:20}}
      source={require('../assets/logo.png')}
      resizeMode="cover"
    />,
      headerStyle: {
        backgroundColor: "#0d47a1",
      },
      headerTitleStyle: {
        color: "#fff",
        marginLeft:0
      },
    },
  },
});

export default createAppContainer(MainScreenNavigator);

const styles = StyleSheet.create({
  iconCOntainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
