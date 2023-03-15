import React from 'react';
import {Text, View} from 'react-native';

export default class Recent extends React.Component{
  render(){
    return(
        <View style={{alignItems: 'center', flex:1, justifyContent: 'center'}}> 
            <Text>This is Recent Screen</Text>
        </View>
    );
  }
}