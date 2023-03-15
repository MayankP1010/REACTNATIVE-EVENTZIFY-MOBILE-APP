import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from "expo-constants";
import EventDetails from './EventDetails';
import EventCeremonies from './EventCeremonies';
import BasicFlatList from '../Food Menu/BasicFlatList';
import Remarks from '../Food Menu/Remarks';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();

export default function EventTabNavigation() {
  return (
    <View style={{flex:1}} > 
    
        <StatusBar  
                    backgroundColor='black'  
                    barStyle='light-content'  
                />  
<View style={styles.header}></View>
<NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Customer') {
              return (
              
                <Ionicons
                  name={
                    focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  }
                  size={size}
                  color={color}
                  
                />
              );
            } else if (route.name === 'Ceremony') {
              return (
                <Ionicons
                  name={focused ? 'ios-list-box' : 'ios-list'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Menu') {
              return (
                <Ionicons
                  name={focused ? 'ios-list-box' : 'ios-list'}
                  size={size}
                  color={color}
                />
              );
            }
            else if (route.name === 'Summary') {
              return (
                <Ionicons
                  name={focused ? 'ios-list-box' : 'ios-list'}
                  size={size}
                  color={color}
                />
              );
            }
            
          },
          
          
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Customer" component={EventDetails} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Ceremony" component={EventCeremonies} />
        <Tab.Screen name="Menu" component={BasicFlatList} />
        <Tab.Screen name="Summary" component={Remarks} />
     
      </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "blue",

    // marginTop:Constants.statusBarHeight
  },
});