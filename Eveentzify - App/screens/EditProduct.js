import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  View,
  Button,
  Platform,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { Card, Chip } from "react-native-paper";

export default function Products(props) {
  //console.log("Props passed in edit",props.navigation.state.params.edit)

  const [edit, editItem] = useState(props.navigation.state.params.edit);
  const [productImgUrl, setImage] = useState(edit.productImgUrl);
  const [quantity, setSelectedValue] = useState(edit.measuredIn);
  const [productCategory, setSelectedValue1] = useState();
  const [productName, setPname] = useState(edit.productName);
  const [productCode, setPcode] = useState(edit.productCode);
  const [measuredIn, setPunit] = useState(edit.quantity);
  const [categories, setCategories] = React.useState([
    "Soup",
    "Startar",
    "Salad",
    "Maincourse",
    "Dessert",
  ]);
  const [selectedCategories, setSelectedCategories] = React.useState(
    edit.productCategory
  );

  const [range1, priceRange1] = useState(edit.priceRange.range1);
  const [range2, priceRange2] = useState(edit.priceRange.range2);
  const [range3, priceRange3] = useState(edit.priceRange.range3);
  const [range4, priceRange4] = useState(edit.priceRange.range4);
  const [range5, priceRange5] = useState(edit.priceRange.range5);

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

  const handleSubmit = async (value) => {
    const range = {
      range1: range1,
      range2: range2,
      range3: range3,
      range4: range4,
      range5: range5,
    };
    //console.log("Price range:",range)
    const auth_token = await AsyncStorage.getItem("auth-token");
    const response = await fetch(
      "https://eventz-test.herokuapp.com/product/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
        body: JSON.stringify({
          productName: productName,
          productCode: productCode,
          productImgUrl: productImgUrl,
          quantity: measuredIn,
          measuredIn: quantity,
          productCategory: selectedCategories,
          priceRange: range,
        }),
      }
    );
    const data = await response.json();
    console.log("Product", data);
    if (data.message == "updated..") {
      Toast.show("Product Updated Successfully!");
    } else {
      Toast.show("Something went wrong. Please try again!");
    }
  };
  // const handleSubmit = async (value) => {
  //   const ApiData = {
  //     productName: Product.productName,
  //     productCode: Product.productCode,
  //     productImgUrl: Product.productImgUrl,
  //     quantity: Product.quantity,
  //     measuredIn: Product.measuredIn,
  //     productCategory: Product.productCategory,
  //     priceRange: Product.priceRange,
  //   };

  //   const response = await fetch(
  //     "https://eventz-test.herokuapp.com/product/insert",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json" ,
  //       },
  //       body: JSON.stringify(ApiData),
  //     }
  //   );

  //   const rdata = await response.json();
  //   console.log(rdata);

  //   //console.log('Data added successfully');
  //   // evt.preventDefault();

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.pdt_name}>
          <Input
            placeholder="Product Name"
            inputStyle={{ width: "50%", height: "50%" }}
            leftIcon={<Icon name="square" size={18} color="gray" />}
            value={productName}
            onChangeText={(value) => setPname(value)}
          />

          <Input
            placeholder="Product Code"
            inputStyle={{ width: "50%", height: "50%" }}
            leftIcon={<Icon name="barcode" size={18} color="gray" />}
            value={productCode}
            onChangeText={(value) => setPcode(value)}
          />
        </View>

        {productImgUrl && (
          <Image
            source={{ uri: productImgUrl }}
            style={{
              width: "35%",
              height: "16%",
              //backgroundColor: '#0d47a1',
              marginLeft: 253,
              position: "absolute",
              marginTop: 10,
              overflow: "visible",
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
              backgroundColor: "#fff",
              height: 55,
              flexDirection: "row",
              padding: 10,
              marginTop: "3%",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
            }}
          >
            {selectedCategories.length === 0 ? (
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  justifyContent: "space-around",
                }}
              >
                No Category Selected
              </Text>
            ) : (
              selectedCategories.map((product, index) => (
                <Chip
                  style={{
                    backgroundColor: "#0d47a1",
                    marginLeft: 2,
                    justifyContent: "space-evenly",
                  }}
                  onClose={() => removeCategory(index)}
                >
                  <Text style={{ color: "#fff" }}>{product}</Text>
                </Chip>
              ))
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: "4%",
              marginBottom: "2%",
            }}
          >
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
            selectedValue={quantity}
            onValueChange={(quantity, itemPosition) =>
              setSelectedValue(quantity)
            }
          >
            <Picker.Item label="Select Quantity" value="0" />
            <Picker.Item label="g" value="g" />
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="l" value="l" />
            <Picker.Item label="ml" value="ml" />
          </Picker>
        </View>
        <View style={{ marginTop: "1.5%" }}>
          <Input
            style={{ width: 50, height: 50 }}
            placeholder="Unit"
            value={measuredIn}
            onChangeText={(value) => setPunit(value)}
            leftIcon={<Icon name="tag" size={18} color="gray" />}
          />
        </View>

        <View style={styles.table}>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>For upto 50 people</DataTable.Cell>
              <DataTable.Cell numeric>
                <Input
                  placeholder="Price"
                  inputStyle={{ width: 50, height: 30 }}
                  //style={{marginRight:30}}
                  leftIcon={
                    <Icon name="rupee" size={18} color="gray" marginTop="20" />
                  }
                  value={range1}
                  onChangeText={(value) => priceRange1(value)}
                />
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>For upto 100 people</DataTable.Cell>

              <DataTable.Cell numeric>
                <Input
                  placeholder="Price"
                  inputStyle={{ width: 50, height: 0 }}
                  leftIcon={<Icon name="rupee" size={18} color="gray" />}
                  value={range2}
                  onChangeText={(value) => priceRange2(value)}
                />
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>For upto 250 people</DataTable.Cell>

              <DataTable.Cell numeric>
                <Input
                  placeholder="Price"
                  inputStyle={{ width: 50, height: 30 }}
                  leftIcon={<Icon name="rupee" size={18} color="gray" />}
                  value={range3}
                  onChangeText={(value) => priceRange3(value)}
                />
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>For upto 500 people</DataTable.Cell>

              <DataTable.Cell numeric>
                <Input
                  placeholder="Price"
                  inputStyle={{ width: 50, height: 30 }}
                  leftIcon={<Icon name="rupee" size={18} color="gray" />}
                  value={range4}
                  onChangeText={(value) => priceRange4(value)}
                />
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>For above 1000 people</DataTable.Cell>

              <DataTable.Cell numeric>
                <Input
                  placeholder="Price"
                  inputStyle={{ width: 50, height: 30 }}
                  leftIcon={<Icon name="rupee" size={18} color="gray" />}
                  value={range5}
                  onChangeText={(value) => priceRange5(value)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: 100,
              backgroundColor: "#0d47a1",
              padding: 10,
              paddingBottom: 30,
              height: 30,
              marginTop: 20,
              marginHorizontal: 150,
              marginBottom: 20,
              borderRadius: 5,
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
              }}
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  table: {
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  upload_button: {
    width: 140,
    height: 30,
    marginLeft: 255,
    marginBottom: 10,
  },
  pdt_name: {
    marginTop: 10,
    marginRight: 160,
  },

  pickerStyle: {
    height: 45,
    width: "100%",
    color: "#344953",
    marginLeft: 10,
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 5,
  },
  dropdown1: {
    marginTop: 10,
  },
});
