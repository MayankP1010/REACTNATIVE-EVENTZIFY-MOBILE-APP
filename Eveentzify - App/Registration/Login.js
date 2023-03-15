import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ErrorMessage,
  StatusBar,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Icon from "react-native-vector-icons/FontAwesome";
import { StackNavigator } from "react-navigation";
import { Input } from "react-native-elements";
import Toast from "react-native-simple-toast";
import { ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    const loginValidationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Please enter valid email")
        .required("Email Address is Required"),
      password: yup
        .string()
        .required("Password is required")
        .min(4, "Password must be atleast 4 character")
        .max(50),
    });
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://c0.wallpaperflare.com/preview/936/292/949/rock-band-on-stage.jpg",
          }}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View style={styles.inner_view}>
            <Image
              style={styles.tinyLogo}
              source={require("../assets/backg1.png")}
            />

            <Formik
              validateOnMount={true}
              validationSchema={loginValidationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                //  alert('LoggedIn')

                const response = await fetch(
                  "https://eventz-test.herokuapp.com/auth/manager/login",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: values.email,
                      password: values.password,
                    }),
                  }
                );

                const data = await response.json();
                const auth_token = data["auth-token"];
                //console.log("Login :",data)
                if (response.status === 200) {
                  await AsyncStorage.setItem("auth-token", auth_token);
                  Toast.show("Login Successful!");
                  this.props.navigation.navigate("DashboardStackScreen");
                } else {
                  Toast.show("Invalid Credentials!");
                }

                console.log(response.status);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <View style={styles.input}>
                    <Input
                      placeholder="Email"
                      placeholderTextColor="white"
                      inputStyle={{ color: "white", paddingLeft: 10 }}
                      style={styles.textInput}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      name="email"
                      leftIcon={
                        <Icon name="envelope" size={20} color="white" />
                      }
                    />

                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <Input
                      name="password"
                      placeholder="Password"
                      placeholderTextColor="white"
                      inputStyle={{ color: "white", paddingLeft: 10 }}
                      style={styles.textInput}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry
                      leftIcon={<Icon name="lock" size={24} color="white" />}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>


                  <View style={styles.button}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                      <Text style={{ color: "white", fontSize: 20 }}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      textAlign: "center",
                      margin: 15,
                    }}
                  >
                    New User?{" "}
                    <Text
                      onPress={() => this.props.navigation.navigate("Router")}
                      style={{ color: "lightblue" }}
                    >
                      SignUp
                    </Text>
                  </Text>
                </>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },

  inner_view: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#000000a0",
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },

  input: {
    color: "red",
    marginRight: 40,
    marginLeft: 20,
    paddingLeft: 10,

    marginBottom: 10,
  },
  button: {
    width: "100%",
    alignContent: "center",
    textAlign: "center",

    alignItems: "center",
  },
  btn: {
    backgroundColor: "#fd7e14",
    width: "80%",
    height: 40,
    padding: 5,

    letterSpacing: 2,
    borderRadius: 5,
    alignItems: "center",
  },

  tinyLogo: {
    width: 140,
    height: 140,
    borderRadius: 20,
    marginBottom: 20,

    marginLeft: 140,
  },
});

export default Login;
