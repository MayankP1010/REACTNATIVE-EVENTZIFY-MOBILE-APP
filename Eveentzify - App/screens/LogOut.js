import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { Icon } from "react-native-elements";


export default function LogOut({navigation}) {
    return (
        <View style={{marginRight:30}}>
            <Icon name="logout" color="white" 
            onPress={() => {navigation.navigate("Login");}}/> 
          </View>
    )
}
