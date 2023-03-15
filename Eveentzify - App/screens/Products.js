

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
import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Custom from "./Custom";
import { Image, Platform, Picker, CheckBox } from "react-native";
import { Card, Chip } from "react-native-paper";
import MIcon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";

const ProductsValidationSchema = yup.object().shape({
  pname: yup.string().required(" Name is required"),
  pcode: yup.string().required("SKU Code is required"),
  punit: yup.string().required("Unit is required"),
  range1: yup.number().integer().required(" Base Price required"),
  range2: yup.number().integer().lessThan(yup.ref("range1")),
  range3: yup.number().integer().lessThan(yup.ref("range2")),
  range4: yup.number().integer().lessThan(yup.ref("range3")),
  range5: yup.number().integer().lessThan(yup.ref("range4")),
});

const Products = () => {
  //const [image, setImage] = useState();
  const [itemValue, setSelectedDrop] = useState();
  // const [itemValue1, setSelectedValue1] = useState();
  const [itemValue2, setSelectedValue2] = useState();
  const [productImgUrl, setImage] = useState();
  const [quantity, setSelectedValue] = useState();
  const [productCategory, setSelectedValue1] = useState();
  const [productName, setPname] = useState("");
  const [productCode, setPcode] = useState("");
  const [measuredIn, setPunit] = useState("");

  //const [selectedCategories, setSelectedCategories] = React.useState([]);

  const [range1, priceRange1] = useState();
  const [range2, priceRange2] = useState();
  const [range3, priceRange3] = useState();
  const [range4, priceRange4] = useState();
  const [range5, priceRange5] = useState();

  const [categories, setCategories] = React.useState([
    "Soup",
    "Startar",
    "Salad",
    "Maincourse",
    "Dessert",
  ]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }

      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleProduct = async (value) => {
    const range = {
      range1: value.range1,
      range2: value.range2,
      range3: value.range3,
      range4: value.range4,
      range5: value.range5,
    };
    //console.log("Price range:",range)
    const auth_token = await AsyncStorage.getItem("auth-token");
    const response = await fetch(
      "https://eventz-test.herokuapp.com/product/insert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
        body: JSON.stringify({
          productName: value.pname,
          productCode: value.pcode,
          productImgUrl: productImgUrl,
          quantity: value.punit,
          measuredIn: itemValue,
          productCategory: selectedCategories,
          priceRange: range,
        }),
      }
    );
    const data = await response.json();
    //console.log("Product", data);
    if (data.Message == "Product Added") {
      // setPname("");
      // setPcode("");
      // setSelectedValue("");
      // setImage("");
      // setSelectedCategories("");
      // setPunit("");

      Toast.show("Product Added Successfully!");
    } else {
      Toast.show("Something went wrong. Please try again!");
    }
  };

  const checkIsExists = (name) => {
    const isExists = selectedCategories.some(function (product) {
      return product === name;
    });
    return isExists;
  };

  const addCategory = (name) => {
    let isExists = checkIsExists(name);
    if (!isExists) {
      setSelectedCategories([...selectedCategories, name]);
    }
  };

  const removeCategory = (index) => {
    let temp_cat = [...selectedCategories];

    temp_cat.splice(index, 1);
    console.log(temp_cat);
    setSelectedCategories(temp_cat);
  };

  const priceRange = (e) => {
    if (e.price1 < e.price2) {
      alert(`Enter price properly`);
    }
  };
  return (
    <ScrollView>
      <>
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>
            <Formik
              initialValues={{
                pname: "",
                pcode: "",
                punit: "",
                range1: "",
                range2: "",
                range3: "",
                range4: "",
                range5: "",
              }}
              validationSchema={ProductsValidationSchema}
              onSubmit={(values) => handleProduct(values)}
            >
              {({ handleSubmit, handleChange, isValid, values }) => (
                <>
                  <View style={styles.pdt_name}>
                    <Field
                      inputStyle={{ width: "50%", height: "50%" }}
                      component={Custom}
                      name="pname"
                      placeholder="Product name"
                      value={values.pname}
                      onChangeText={handleChange("pname")}
                    />
                  </View>

                  <View style={styles.pdt_name}>
                    <Field
                      inputStyle={{ width: "50%", height: "50%" }}
                      component={Custom}
                      name="pcode"
                      placeholder="SKU Code"
                      placeholderTextColor="gray"
                      value={values.pcode}
                      onChangeText={handleChange("pcode")}
                    />
                  </View>

                  {productImgUrl && (
                    <Image
                      source={{ uri: productImgUrl }}
                      style={{
                        width: "35%",
                        height: "16%",
                        //backgroundColor: '#0d47a1',
                        marginLeft: 250,
                        position: "absolute",
                        marginTop: 10,
                      }}
                    />
                  )}

                  <View style={styles.upload_button}>
                    <FontAwesome.Button
                      name="upload"
                      backgroundColor="#0d47a1"
                      onPress={pickImage}
                    >
                      Upload Image
                    </FontAwesome.Button>
                  </View>

                  <View style={styles.container}>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        flexDirection: "row",
                        padding: 10,                       
                        borderRadius: 5,
                        borderWidth: 1,
                        borderRadius: 10,
                       
                      }}
                    >
                      {selectedCategories.length === 0 ? (
                        <Text style={{color:'gray'}}>No Category Selected</Text>
                      ) : (
                        selectedCategories.map((product, index) => (
                          <Chip
                            style={{ backgroundColor: "#0d47a1" }}
                            onClose={() => removeCategory(index)}
                          >
                            <Text style={{ color: "#fff" }}>{product}</Text>
                          </Chip>
                        ))
                      )}
                    </View>

                    <View style={{ flexDirection: "row", marginTop: "10%" }}>
                      {categories.map((cat, index) => (
                        <Chip
                          style={{ backgroundColor: "#0d47a1" }}
                          onPress={() => addCategory(cat)}
                          mode="outlined"
                        >
                          <Text style={{ color: "#fff" }}>{cat}</Text>
                        </Chip>
                      ))}
                    </View>
                  </View>

                  <View style={styles.dropdown}>
                    <Picker
                      style={styles.pickerStyle}
                      selectedValue={itemValue}
                      onValueChange={(itemValue, itemPosition) =>
                        setSelectedDrop(itemValue)
                      }
                    >
                      <Picker.Item label="Select Quantity" value="0"/>
                      <Picker.Item label="g" value="1" />
                      <Picker.Item label="kg" value="2" />
                      <Picker.Item label="l" value="3" />
                      <Picker.Item label="ml" value="4" />
                    </Picker>
                  </View>

                  <View style={styles.pdt_name}>
                    <Field
                      inputStyle={{ width: "50%", height: "50%" }}
                      component={Custom}
                      name="punit"
                      placeholder="Product Unit"
                      placeholderTextColor="gray"
                      value={values.punit}
                      onChangeText={handleChange("punit")}
                    />
                  </View>

                  <View>
                    <View
                      style={{
                        width: "30%",
                        marginLeft: 20,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ marginTop: 16, marginRight: 40 }}>
                        For upto 50 people
                      </Text>
                      <Field
                        onValueChange={priceRange}
                        component={Custom}
                        name="range1"
                        placeholder="Price"
                        inputStyle={{ width: 20, height: 30 }}
                        value={values.range1}
                        onChangeText={handleChange("range1")}
                        leftIcon={<Icon name="rupee" size={18} color="gray" />}
                      />
                    </View>

                    <View
                      style={{
                        width: "30%",
                        marginLeft: 20,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ marginTop: 16, marginRight: 10 }}>
                        For upto 100 people
                      </Text>
                      <Field
                        name="range2"
                        placeholder="Price"
                        inputStyle={{ width: 40, height: 30 }}
                        value={values.range2}
                        onChangeText={handleChange("range2")}
                        leftIcon={<Icon name="rupee" size={18} color="gray" />}
                        component={Custom}
                      />
                    </View>

                    <View
                      style={{
                        width: "30%",
                        marginLeft: 20,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ marginTop: 16, marginRight: 10 }}>
                        For upto 200 people
                      </Text>
                      <Field
                        name="range3"
                        placeholder="Price"
                        inputStyle={{ width: 40, height: 30 }}
                        value={values.range3}
                        onChangeText={handleChange("range3")}
                        leftIcon={<Icon name="rupee" size={18} color="gray" />}
                        component={Custom}
                      />
                    </View>

                    <View
                      style={{
                        width: "30%",
                        marginLeft: 20,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ marginTop: 16, marginRight: 10 }}>
                        For upto 500 people
                      </Text>
                      <Field
                        name="range4"
                        placeholder="Price"
                        inputStyle={{ width: 40, height: 30 }}
                        value={values.range4}
                        onChangeText={handleChange("range4")}
                        leftIcon={<Icon name="rupee" size={18} color="gray" />}
                        component={Custom}
                      />
                    </View>

                    <View
                      style={{
                        width: "30%",
                        marginLeft: 20,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ marginTop: 16 }}>
                        For upto 1000 people
                      </Text>
                      <Field
                        name="range5"
                        placeholder="Price"
                        inputStyle={{ width: 50, height: 30 }}
                        value={values.range5}
                        onChangeText={handleChange("range5")}
                        leftIcon={<Icon name="rupee" size={18} color="gray" />}
                        component={Custom}
                      />
                    </View>
                  </View>

                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity
                      style={{
                        width: 120,
                        backgroundColor: "#0d47a1",
                        padding: 10,
                        height: 40,
                        marginTop: 15,                       
                        borderRadius: 5,
                        marginBottom: 10,
                        elevation:6,
                      }}
                      onPress={handleSubmit}
                    >
                      <Text
                        style={{                         
                          color: "#fff",
                         textAlign:'center',
                          fontWeight: "bold",                                                
                        }}
                      >
                        SAVE
                      </Text>
                    </TouchableOpacity>
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
    marginLeft:10,
    marginRight:10
  },
});

export default Products;
