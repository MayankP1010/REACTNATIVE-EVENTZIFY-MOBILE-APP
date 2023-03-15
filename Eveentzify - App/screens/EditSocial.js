import * as React from "react";
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Toast from "react-native-simple-toast";

export default class EditSocial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      WhatsAppBusinessNumber: "9823450674",
      FacebookURL: "",
      InstagramURL: "",
      TwitterURL: "",
      LinkedInURL: "",
      YoutubeURL: "",
    };
  }

  
  componentWillMount(){
    this.getData();
    // getData();
  }

      
  getData = async () =>{
    console.log("Profile", JSON.parse(await AsyncStorage.getItem("Profile1")))
    console.log("Additional", JSON.parse(await AsyncStorage.getItem("Additional")))
    console.log("Social", JSON.parse(await AsyncStorage.getItem("Social")))
  }

  onSignUp = async () => {
    const data = {
      whatsappBusinessNumber: this.state.WhatsAppBusinessNumber,
      fbPageUrl: this.state.FacebookURL,
      instagramPageUrl: this.state.InstagramURL,
      linkedinPageUrl: this.state.LinkedInURL,
      twitterPageUrl: this.state.TwitterURL,
      youtubePageUrl: this.state.YoutubeURL,
    };
    await AsyncStorage.setItem("EditSocial", JSON.stringify(data));
    Toast.show("All details are updated");
    const EditProfile = JSON.parse(await AsyncStorage.getItem("Profile1"));
    const EditAdditional = JSON.parse(await AsyncStorage.getItem("Additional"));
    const EditSocial = JSON.parse(await AsyncStorage.getItem("Social"));
    console.log(EditProfile);
    const ApiData = {
      companyName: EditProfile.companyName,
      ownerFirstName: EditProfile.ownerFirstName,
      ownerLastName: EditProfile.ownerLastName,
      email: EditProfile.email,
      password: EditProfile.password,
      phoneNumber: EditProfile.phoneNumber,

      address: EditAdditional.address,
      city: EditAdditional.city,
      state: EditAdditional.state,
      country: EditAdditional.country,
      pinCode: EditAdditional.pinCode,
      refNumber: EditAdditional.refNumber,
      gstNumber: EditAdditional.gstNumber,

      whatsappBusinessNumber: EditSocial.whatsappBusinessNumber,
      fbPageUrl: EditSocial.fbPageUrl,
      instagramPageUrl: EditSocial.instagramPageUrl,
      linkedinPageUrl: EditSocial.linkedinPageUrl,
      twitterPageUrl: EditSocial.twitterPageUrl,
      youtubePageUrl: EditSocial.youtubePageUrl,
    };

    console.log("Welcome Data", ApiData);
    const response = await fetch(
      "https://eventz-test.herokuapp.com/manager/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ApiData),
      }
    );

    const rdata = await response.json();

    console.log(rdata,'Mayank');
    if (rdata.message === "registration successful") {
      Toast.show("You are successfully registered.");
      this.props.navigation.navigate("Login");
    }
    else if (response.status===400)
    {
      Toast.show('Something went Wrong ! Try Again')
    }
    else if(rdata.message==="email already exists"){
      Toast.show('Email already Exit')
    }
  
};

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Input
          placeholder="Whatsapp Business Number"
          value={this.state.WhatsAppBusinessNumber}
          onChangeText={(value) =>
            this.setState({ WhatsAppBusinessNumber: value })
          }
          leftIcon={<Icon name="whatsapp" size={20} color="green" />}
        />
        <Input
          placeholder="Facebook"
          onChangeText={(value) => this.setState({ FacebookURL: value })}
          leftIcon={<Icon name="facebook" size={18} color="blue" />}
        />
        <Input
          placeholder="Instagram"
          onChangeText={(value) => this.setState({ InstagramURL: value })}
          leftIcon={<Icon name="instagram" size={18} color="magenta" />}
        />
        <Input
          placeholder="Twitter"
          onChangeText={(value) => this.setState({ TwitterURL: value })}
          leftIcon={<Icon name="twitter" size={18} color="skyblue" />}
        />

        <Input
          placeholder="Linkedin"
          onChangeText={(value) => this.setState({ LinkedInURL: value })}
          leftIcon={<Icon name="linkedin" size={18} color="blue" />}
        />
        <Input
          placeholder="YouTube"
          onChangeText={(value) => this.setState({ YoutubeURL: value })}
          leftIcon={<Icon name="youtube" size={18} color="red" />}
        />

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
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
              Update
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
