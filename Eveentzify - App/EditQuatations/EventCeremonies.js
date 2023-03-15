

import React,{useEffect,useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, View, Text,AsyncStorage,ImageBackground} from 'react-native';
import Birthday from './Birthday';

import Wed from './Wed';

import Aniversary from './Aniversary';



const EventCeremonies = ({route}) => {
  const isFocused=useIsFocused();
  const[event,setEvent]=useState('');
 const getData = async () => {
  
  const data = (await AsyncStorage.getItem("event"));
  setEvent(data)
  // console.log(data,"HEloooooooo this is event");
  };

  
 useEffect(()=>
 {
    getData();
 },[isFocused])
 
  return (
   
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>
            {event}     
        </Text>
        {event=="Birthday" && <Birthday/>}
        {event=="Wedding" && <Wed/>}
        {event=="Anniversary" && <Aniversary/>}
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
    fontSize: 30,
    fontWeight:'bold',
    marginVertical: 10,
  },
});
