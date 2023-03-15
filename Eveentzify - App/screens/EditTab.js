import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/Ionicons";
import EditProfile from './EditProfile';
import EditAdditonal from './EditAdditional';
import EditSocial from './EditSocial';
import React, { Component } from "react";
import { View, Text, StyleSheet,Image } from "react-native";


const Tabs = createMaterialTopTabNavigator(
  {
    Profile: {
      screen: EditProfile,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <View style={styles.iconCOntainer}>
            <Icon name="ios-person" color={tintColor} size={22} />
            <Text style={{ color: tintColor }}>Personal</Text>
          </View>
        ),
      },
    },

    Additional: {
      screen: EditAdditonal,
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
      screen: EditSocial,
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
    initialRouteName: "Profile",
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
      headerShown: false
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
