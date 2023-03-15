import * as React from "react";
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Toast from "react-native-simple-toast";

export default class Social extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      WhatsAppBusinessNumber: "",
      FacebookURL: "",
      InstagramURL: "",
      TwitterURL: "",
      LinkedInURL: "",
      YoutubeURL: "",
    };
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
    await AsyncStorage.setItem("Social", JSON.stringify(data));

    const Profile1 = JSON.parse(await AsyncStorage.getItem("Profile1"));
    const Additional = JSON.parse(await AsyncStorage.getItem("Additional"));
    const Social = JSON.parse(await AsyncStorage.getItem("Social"));

    const ApiData = {
      companyName: Profile1.companyName,
      ownerFirstName: Profile1.ownerFirstName,
      ownerLastName: Profile1.ownerLastName,
      email: Profile1.email,
      password: Profile1.password,
      phoneNumber: Profile1.phoneNumber,

      address: Additional.address,
      city: Additional.city,
      state: Additional.state,
      country: Additional.country,
      pinCode: Additional.pinCode,
      refNumber: Additional.refNumber,
      gstNumber: Additional.gstNumber,

      whatsappBusinessNumber: Social.whatsappBusinessNumber,
      fbPageUrl: Social.fbPageUrl,
      instagramPageUrl: Social.instagramPageUrl,
      linkedinPageUrl: Social.linkedinPageUrl,
      twitterPageUrl: Social.twitterPageUrl,
      youtubePageUrl: Social.youtubePageUrl,
    };

    console.log("Welcome Data", ApiData);
    const response = await fetch(
      "https://eventz-test.herokuapp.com/auth/manager/register",
      {
        method: "POST",
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
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                        style={{ width: 150, backgroundColor: '#0d47a1', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginTop: 10 }}
                    >
                        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16 }}>Login</Text></TouchableOpacity>

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
