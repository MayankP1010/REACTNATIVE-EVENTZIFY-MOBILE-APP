

import React,{useEffect,useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, View, Text,AsyncStorage,ImageBackground} from 'react-native';




const EventCeremonies = ({route}) => {
  const isFocused=useIsFocused();
  const[ceremonies,setCeremonies]=useState('');
 const getData = async () => {
  setEvent(await AsyncStorage.getItem("selected"))
 
  };

  
 useEffect(()=>
 {
    getData();
 },[isFocused])

  return (
  
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Text>{selected}</Text>
  </View>
    </SafeAreaView>
   
  );
};

export default EventCeremonies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
});
