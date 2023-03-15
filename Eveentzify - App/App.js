import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Router from './Registration/Router1';
import Login from './Registration/Login';
import DashboardStackScreen from './screens/DashboardStackScreen';
import { createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackground } from "react-navigation-stack";
import Products from './screens/Products';
import SearchProduct from "./screens/SearchProduct";


export default function App() {
        return (
            <AppContainer />);
    }

const Navigator = createStackNavigator({
    
  Login: {
    screen: Login,
  },
  Router: {
    screen: Router,
  },
DashboardStackScreen:{
  screen:DashboardStackScreen,
},
},
{
  headerMode:"none"
}
);


const AppContainer = createAppContainer(Navigator);

const styles = StyleSheet.create({
    
});
