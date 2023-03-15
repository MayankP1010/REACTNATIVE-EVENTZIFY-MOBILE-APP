import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
} from "react-native";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Custom1 from "./Custom1";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";

const CustomerValidationSchema = yup.object().shape({
  fname: yup.string().required(" First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Id is required"),
  phone: yup.number().integer().required("Phone number is required"),
});

const signUpValidationSchema = yup.object().shape({
  fname: yup.string().required(" First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Id is required"),
  phone: yup.number().integer().required("Phone number is required"),
  addressLine1: yup.string().required("Address1 is required"),
  addressLine2: yup
    .string()
    .required("Address2 is required"),
});

const AddCustomer = () => {
  
  const handleCustomer = async (value) => {
    alert("Hello");
    console.log("Price range:", value);
    const auth_token = await AsyncStorage.getItem("auth-token");
    const response = await fetch(
      "https://eventz-test.herokuapp.com/customer/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
        body: JSON.stringify({
          firstName: value.fname,
          lastName: value.lname,
          email: value.email,
          phoneNumber: value.phone,
          addressLine1: value.addressLine1,
          addressLine2: value.addressLine2,
          city: value.city,
          state: value.state,
          country: value.country,
        }),
      }
    );
    const data = await response.json();
    console.log("Product", data);
    if (data.message == "customer added") {

      Toast.show("Customer Added Successfully!");
    } else {
      Toast.show("Something went wrong. Please try again!");
    }
  };

  return (
    <ScrollView>
      <>
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>
            <Formik
              initialValues={{
                fname: "",
                lname: "",
                email: "",
                phone: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "",
              }}
              validationSchema={CustomerValidationSchema}
              onSubmit={(values) => handleCustomer(values)}
            >
              {({ handleSubmit, handleChange, isValid, values }) => (
                <>
                  <View style={styles.pdt_name}>
                   
                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="user"
                        size={40}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="fname"
                        placeholder="First name"
                        value={values.fname}
                        onChangeText={handleChange("fname")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="user"
                        size={40}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="lname"
                        placeholder="Last name"
                        value={values.lname}
                        onChangeText={handleChange("lname")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="envelope"
                        size={30}
                        color="#0d47a1"
                        style={{ marginTop: 13, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="email"
                        placeholder="Email Id"
                        value={values.email}
                        onChangeText={handleChange("email")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="phone"
                        size={36}
                        color="#0d47a1"
                        style={{ marginTop: 12, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="phone"
                        placeholder="Phone number"
                        value={values.phone}
                        onChangeText={handleChange("phone")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="home"
                        size={34}
                        color="#0d47a1"
                        style={{ marginTop: 13, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="addressLine1"
                        placeholder="Address Line1"
                        value={values.addressLine1}
                        onChangeText={handleChange("addressLine1")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="home"
                        size={34}
                        color="#0d47a1"
                        style={{ marginTop: 13, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="addressLine2"
                        placeholder="Address Line2"
                        value={values.addressLine2}
                        onChangeText={handleChange("addressLine2")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="building"
                        size={36}
                        color="#0d47a1"
                        style={{ marginTop: 12, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="city"
                        placeholder="City"
                        value={values.city}
                        onChangeText={handleChange("city")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="square"
                        size={36}
                        color="#0d47a1"
                        style={{ marginTop: 12, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="state"
                        placeholder="State"
                        value={values.state}
                        onChangeText={handleChange("state")}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="flag"
                        size={32}
                        color="#0d47a1"
                        style={{ marginTop: 12, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="country"
                        placeholder="Country"
                        value={values.country}
                        onChangeText={handleChange("country")}
                      />
                    </View>

                    <View>
                      <TouchableOpacity
                        style={{
                          width: 100,
                          backgroundColor: "#0d47a1",
                          padding: 10,
                          height: 40,
                          marginTop: 15,
                          marginHorizontal: 150,
                          borderRadius: 5,
                          marginBottom: 150,
                        }}
                        onPress={handleSubmit}
                      >
                        <Text
                          style={{
                            width: 135,
                            height: 30,
                            color: "#fff",
                            marginLeft: 22,
                            justifyContent: "center",
                            fontWeight: "bold",
                            paddingBottom: 10,
                          }}
                        >
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },

  upload_button: {
    width: 135,
    height: 30,
    marginLeft: 250,
    marginBottom: 10,
  },
  textinput: {
    height: 40,

    backgroundColor: "white",
    width: 275,
    marginVertical: 10,
    //fontWeight:"bold",
    borderColor: "grey",
    // borderLeftWidth:15,
    // borderRightWidth:15,

    color: "gray",
  },
  pdt_name: {
    marginTop: 10,
    marginRight: 160,
  },
  pickerStyle: {
    height: 40,
    width: "100%",
    color: "#344953",
  },

  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default AddCustomer;
