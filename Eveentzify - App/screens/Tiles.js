import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";


export default class Tiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (     
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Customers");
            }}
          >
          <Icon name="people-circle-outline" size={102} color="#444913" />
         
            <Text style={styles.text}>Customers</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("SearchProduct");
            }}
          >
             <Icon name="cart-outline" size={102} color="brown" />

            <Text style={styles.text}>Products</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ListOfQuotation");
            }}
          >
             <Icon name="document-outline" size={102} color="orange" />

            <Text style={styles.text}>Quotations</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Recent");
            }}
          >
             <Icon name="time-outline" size={102} color="#185adb" />
            <Text style={styles.text}>Recent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          >
             <Icon name="person-outline" size={102} color="tomato" />
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Settings");
            }}
          >
             <Icon name="settings-outline" size={102} color="purple" />
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
        </View>

        <ActionButton buttonColor="#0d47a1">
          <ActionButton.Item
            style={styles.actionbutton}
            buttonColor="#9b59b6"
            title="Add New Task"
            onPress={() => {
              this.props.navigation.navigate("Event");
            }}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  card: {
    width: 140,
    height: 160,
    marginLeft: 20,
    margin: 15,
    backgroundColor: "white",
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: 0,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 20,
  },
  // img_logo1: {
  //   width: "62%",
  //   height: "60%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginLeft: 30,
  //   borderRadius: 15,
  //   marginTop: 20,
  // },
  // img_logo2: {
  //   width: "60%",
  //   height: "55%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginLeft: 25,
  //   borderRadius: 15,
  //   marginTop: 25,
  // },
  // img_logo3: {
  //   width: "50%",
  //   height: "55%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginLeft: 35,
  //   borderRadius: 15,
  //   marginTop: 30,
  // },
  // img_logo4: {
  //   width: "65%",
  //   height: "65%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginLeft: 25,
  //   borderRadius: 15,
  //   marginTop: 20,
  // },
  // img_logo5: {
  //   width: "60%",
  //   height: "60%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginLeft: 30,
  //   borderRadius: 15,
  //   marginTop: 25,
  // },
  // img_logo6: {
  //   width: "60%",
  //   height: "60%",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginLeft: 30,
  //   borderRadius: 15,
  //   marginTop: 25,
  // },
  text: {
    fontSize: 19,
    color: "black",
    textAlign: "center",
    fontWeight: 'bold'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  actionbutton: {
    backgroundColor: "pink",
    color: "tomato",
  },
});
