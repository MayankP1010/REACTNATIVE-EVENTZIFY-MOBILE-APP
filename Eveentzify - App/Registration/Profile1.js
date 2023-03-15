import React, { Component } from "react";
import {
  TextInput,
  Text,
  Button,
  Alert,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { ScrollView } from "react-native";
import Toast from "react-native-simple-toast";

export default class Profile1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            Companyname: "",
            Firstname: "",
            Lastname: "",
            Emailid: "",
            Password: "",
            Confirmpassword: "",
            Phonenumber: "",
          }}
          onSubmit={async (values) => {
            const state = {
              companyName: values.Companyname,
              ownerFirstName: values.Firstname,
              ownerLastName: values.Lastname,
              email: values.Emailid,
              password: values.Password,

              phoneNumber: values.Phonenumber,
            };
            await AsyncStorage.setItem("Profile1", JSON.stringify(state));

            Toast.show("Personal details are saved");
          }}
          validationSchema={yup.object().shape({
            Companyname: yup

              .string()

              .required("Please, provide your Company name!"),
            Firstname: yup
              .string()

              .required("Please, provide your First name!"),
            Lastname: yup.string().required("Please, provide your Last name!"),

            Emailid: yup
              .string()
              .email("Please enter valid email")
              .required("Please, provide your Email!"),

            Password: yup
              .string()
              .matches(/\w*[a-z]\w*/, "Password must have a small letter")
              .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
              .matches(/\d/, "Password must have a number")
              .matches(
                /[!@#$%^&*()\-_"=+{}; :,<.>]/,
                "Password must have a special character"
              )
              .min(4)
              .max(50, "Password should not be less than 4 characters.")
              .required(),
            Confirmpassword: yup
              .string()
              .oneOf([yup.ref("Password")], "Passwords do not match")
              .required("Confirm password is required"),
            Phonenumber: yup
              .string()

              .required("Phone number is required"),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <View>
              <Input
                placeholder="Company Name"
                onChangeText={handleChange("Companyname")}
                leftIcon={<Icon name="building" size={18} color="gray" />}
              />
              {touched.Companyname && errors.Companyname && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Companyname}
                </Text>
              )}

              <Input
                placeholder="First Name"
                onChangeText={handleChange("Firstname")}
                leftIcon={<Icon name="user" size={18} color="gray" />}
              />
              {touched.Firstname && errors.Firstname && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Firstname}
                </Text>
              )}
              <Input
                placeholder="Last Name"
                onChangeText={handleChange("Lastname")}
                leftIcon={<Icon name="user" size={18} color="gray" />}
              />
              {touched.Lastname && errors.Lastname && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Lastname}
                </Text>
              )}
              <Input
                placeholder="Email"
                onChangeText={handleChange("Emailid")}
                leftIcon={<Icon name="envelope" size={18} color="gray" />}
              />
              {touched.Emailid && errors.Emailid && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Emailid}
                </Text>
              )}

              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={handleChange("Password")}
                leftIcon={<Icon name="lock" size={18} color="gray" />}
              />

              {touched.Password && errors.Password && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Password}
                </Text>
              )}

              <Input
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={handleChange("Confirmpassword")}
                leftIcon={<Icon name="lock" size={18} color="gray" />}
              />
              {touched.Confirmpassword && errors.Confirmpassword && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Confirmpassword}
                </Text>
              )}
              <Input
                placeholder="Phone Number"
                onChangeText={handleChange("Phonenumber")}
                leftIcon={<Icon name="phone" size={18} color="gray" />}
              />

              {touched.Phonenumber && errors.Phonenumber && (
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                  {errors.Phonenumber}
                </Text>
              )}
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={handleSubmit}
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
                  <Text
                    style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    margin: 0,
    paddingHorizontal: 20,
  },
});
