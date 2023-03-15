import React from 'react';
import {Text, View} from 'react-native';

export default class Settings extends React.Component{
  render(){
    return(
        <View style={{alignItems: 'center', flex:1, justifyContent: 'center'}}>
            <Text>This is Settings Screen</Text>
        </View>
    );
  }
}