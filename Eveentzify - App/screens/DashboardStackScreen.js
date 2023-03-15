import * as React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import Constants from "expo-constants";

// You can import from local files

import Tiles from "./Tiles";
// or any pure javascript modules available in npm

import Customers from "./Customers";

import Quotations from "../screens/Quotations";


import EventTabNavigation from '../Events/EventTabNavigation';
import Birthday from '../Events/Birthday';
import EditQuatations from '../EditQuatations/EventTabNavigation'
import { createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackground } from "react-navigation-stack";
import SearchProduct from "./SearchProduct";
import EditProduct from './EditProduct';
import ListOfQuotation from '../EditQuatations/ListOfQuotation';

import Recent from "./Recent";
import Settings from "./Settings";
import SearchProduct1 from "./SearchProduct1";
import Products from "./Products";
import AddCustomer from "./AddCustomer";
import EditTab from "./EditTab";
import EditCustomer from "./EditCustomer";
import { Icon } from "react-native-elements";
import Login from '../Registration/Login';

export default function DashboardStackScreen({ navigation }) {
  return <AppContainer />;
}









const Navigator = createStackNavigator(
  {
    Dashboard: {
      screen: Tiles,
      navigationOptions: {
        title: "Dashboard",
        headerRight: (
          <View style={{marginRight:30}}>
            <Icon name="logout" color="white" 
              onPress={() => {alert("Logged out Successfully")}}/> 
          </View>
        ),
      },
      
    },
    Customers: {
      screen: Customers,
      navigationOptions: {
        title: "List of Customers",
      },
    },
    AddCustomer: {
      screen: AddCustomer,
      navigationOptions: {
        title: "Add Customer",
      },
    },
    Logout:{
      screen: Login,
    },
    ListOfQuotation:{
      screen:ListOfQuotation
    },
    SearchProduct: {
      screen: SearchProduct1,
      navigationOptions: {
        title: "Search Product",
      },
    },
    AddProduct: {
      screen: Products,
      navigationOptions: {
        title: "Add Product",
      },
    },
    EditCustomer: {
      screen: EditCustomer,
    },
    EditProduct: {
      screen: EditProduct,
    },
    EditQuatations: {
      screen:  EditQuatations,
    },
    ListOfQuotation:{
      screen:ListOfQuotation,
    },
    Quotations: {
      screen: Quotations,
    },
    Profile: {
      screen: EditTab,
    },
    Recent: {
      screen: Recent,
    },
    Settings: {
      screen: Settings,
    },
    Event: {
      screen: EventTabNavigation,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerStyle: { backgroundColor: "#0d47a1" },
      headerTitleStyle: { color: "white" },
      fontweight: "bold",
      headerLeft: (
        <Image
          style={{ width: 40, height: 40, marginLeft: 15, borderRadius: 20 }}
          source={require("../assets/logo.png")}
          resizeMode="cover"
        />
      ),
    }),
  }
);

const AppContainer = createAppContainer(Navigator);


