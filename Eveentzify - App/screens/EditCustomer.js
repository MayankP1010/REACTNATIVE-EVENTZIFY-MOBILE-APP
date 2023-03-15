import React, { useState, useEffect } from "react";
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
  firstName: yup.string().required(" First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Id is required"),
  phoneNumber: yup.number().integer().required("Phone number is required"),
});


export default function AddCustomer(props) {

  const [edit, editItem] = useState(props.navigation.state.params.edit);
  console.log("Edit:", edit);
  const [firstName, setFname] = useState(edit.firstName);
  const [lastName, setLname] = useState(edit.lastName);
  const [email, setEmail] = useState(edit.email);
  const [phoneNumber, setPhone] = useState(edit.phoneNumber.toString());
  const customerId = edit._id;
  const [addressLine1, setAddress1] = useState(edit.addressLine1);
  const [addressLine2, setAddress2] = useState(edit.addressLine2);
  const [city, setCity] = useState(edit.city);
  const [state, setStates] = useState(edit.state);
  const [country, setCountry] = useState(edit.country);


  const handleCustomer = async (value) => {
    //alert("Hello");
    console.log("Value", value)
    const auth_token = await AsyncStorage.getItem("auth-token");
    const phone = parseInt(value.phoneNumber);
    //console.log("Phone:", phone + 1, "Hello");
    const response = await fetch(
      "https://eventz-test.herokuapp.com/customer/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
        body: JSON.stringify({
          customerId: customerId,
          lastName: value.firstName,
          firstName: value.lastName,
          email: value.email,
          phoneNumber: phone,
          addressLine1: value.addressLine1,
          addressLine2: value.addressLine2,
          city: value.city,
          state: value.state,
          country: value.country,
        }),
      }
    );
    const data = await response.json();
    console.log("Product", response);
    if (data.message == "updated..") {

      Toast.show("Customer Updated Successfully!");
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
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                state: state,
                country: country,
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
                        name="firstName"
                        placeholder="First name"
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
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
                        name="lastName"
                        placeholder="Last name"
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="envelope"
                        size={35}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="email"
                        placeholder="Email Id"
                        value={values.email}
                        onChangeText={handleChange('email')}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="phone"
                        size={40}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="home"
                        size={38}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="addressLine1"
                        placeholder="Address Line1"
                        value={values.addressLine1}
                        onChangeText={handleChange('addressLine1')}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="home"
                        size={38}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="addressLine2"
                        placeholder="Address Line2"
                        value={values.addressLine2}
                        onChangeText={handleChange('addressLine2')}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="building"
                        size={36}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="city"
                        placeholder="City"
                        value={values.city}
                        onChangeText={handleChange('city')}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="square"
                        size={36}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="state"
                        placeholder="State"
                        value={values.state}
                        onChangeText={handleChange('state')}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginRight: 140 }}>
                      <Icon
                        name="flag"
                        size={32}
                        color="#0d47a1"
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                      <Field
                        inputStyle={{ width: "50%", height: "50%" }}
                        component={Custom1}
                        name="country"
                        placeholder="Country"
                        value={values.country}
                        onChangeText={handleChange('country')}
                      />
                    </View>

                    <View>
                      <TouchableOpacity
                        style={{
                          width: 100,
                          backgroundColor: "#0d47a1",
                          padding: 10,
                          height: 30,
                          marginTop: 15,
                          marginHorizontal: 150,
                          borderRadius: 5,
                          marginBottom: 10,
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


