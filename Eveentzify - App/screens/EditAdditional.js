import * as React from "react";
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Toast from "react-native-simple-toast";

export default class EditAdditional extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Address: "Pune",
      city: "Pune",
      state: "Mahrashtra",
      country: "India",
      pinCode: "411018",
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
    await AsyncStorage.setItem("EditAdditional", JSON.stringify(data));

    Toast.show("EditAdditional details are saved");
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Input
          placeholder="Address"
          value={this.state.Address}
          onChangeText={(value) => this.setState({ Address: value })}
          leftIcon={<Icon name="home" size={18} color="gray" />}
        />

        <Input
          placeholder="State"
          value={this.state.state}
          onChangeText={(value) => this.setState({ state: value })}
          leftIcon={<Icon name="square" size={18} color="gray" />}
        />

        <Input
          placeholder="City"
          value={this.state.city}
          onChangeText={(value) => this.setState({ city: value })}
          leftIcon={<Icon name="square" size={18} color="gray" />}
        />

        <Input
          placeholder="Country"
          value={this.state.country}
          onChangeText={(value) => this.setState({ country: value })}
          leftIcon={<Icon name="flag" size={18} color="gray" />}
        />

        <Input
          placeholder="PinCode"
          value={this.state.pinCode}
          onChangeText={(value) => this.setState({ pinCode: value })}
          leftIcon={<Icon name="th" size={18} color="gray" />}
        />

        <Input
          placeholder="License Number"
          value={this.state.LisenceNo}
          onChangeText={(value) => this.setState({ LisenceNo: value })}
          leftIcon={<Icon name="barcode" size={18} color="gray" />}
        />

        <Input
          placeholder="GST Number"
          value={this.state.GSTNo}
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
