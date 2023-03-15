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
import BasicFlatList from './BasicFlatList';
import Remarks from './Remarks';
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
      // tabBarOptions={{
			// 	activeTintColor: "#50d3a7",
			// 	inactiveTintColor: "gray",
			// 	labelStyle: {
			// 		fontSize: 15,
			// 	},
			// }}
      
      //tabStyle={{ width: 100 }}
     
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size}) => {
            if (route.name === 'Customer') {
              return (
              
                <Ionicons
                  name={
                    focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  }
                  fontSize="50"
                  size="300"
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
