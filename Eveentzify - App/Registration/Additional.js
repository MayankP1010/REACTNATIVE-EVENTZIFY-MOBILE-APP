import * as React from "react";
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Toast from "react-native-simple-toast";

export default class Additional extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      LisenceNo: "",
      GSTNo: "",
    };
  }

  onSignUp = async () => {
    const data = {
      address: this.state.Address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      pinCode: this.state.pinCode,
      refNumber: this.state.LisenceNo,
      gstNumber: this.state.GSTNo,
    };
    await AsyncStorage.setItem("Additional", JSON.stringify(data));

    Toast.show("Additional details are saved");
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Input
          placeholder="Address"
          onChangeText={(value) => this.setState({ Address: value })}
          leftIcon={<Icon name="home" size={18} color="gray" />}
        />

        <Input
          placeholder="State"
          onChangeText={(value) => this.setState({ state: value })}
          leftIcon={<Icon name="square" size={18} color="gray" />}
        />

        <Input
          placeholder="City"
          onChangeText={(value) => this.setState({ city: value })}
          leftIcon={<Icon name="square" size={18} color="gray" />}
        />

        <Input
          placeholder="Country"
          onChangeText={(value) => this.setState({ country: value })}
          leftIcon={<Icon name="flag" size={18} color="gray" />}
        />

        <Input
          placeholder="PinCode"
          onChangeText={(value) => this.setState({ pinCode: value })}
          leftIcon={<Icon name="th" size={18} color="gray" />}
        />

        <Input
          placeholder="License Number"
          onChangeText={(value) => this.setState({ LisenceNo: value })}
          leftIcon={<Icon name="barcode" size={18} color="gray" />}
        />

        <Input
          placeholder="GST Number"
          onChangeText={(value) => this.setState({ GSTNo: value })}
          leftIcon={<Icon name="tag" size={18} color="gray" />}
        />

        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {this.state.errMsg}
        </Text>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => this.onSignUp()}
            style={{
              width: 200,
              backgroundColor: "#0d47a1",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
              marginTop: 0,
            }}
          >
            <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
});
