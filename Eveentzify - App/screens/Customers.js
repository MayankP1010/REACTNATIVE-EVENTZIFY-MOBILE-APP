import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Picker,
  Button,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Avatar } from "react-native-paper";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import EditCustomer from './EditCustomer';
import { Searchbar } from "react-native-paper";

// import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';
import Products from "./Products";

const Customers = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [productCategory, setSelectedValue1] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const SearchItem = async () => {
    const auth_token = await AsyncStorage.getItem("auth-token");
    fetch("https://eventz-test.herokuapp.com/customer/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth_token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        //console.log("In search", masterDataSource)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    SearchItem();
  }, [filteredDataSource]);

  const searchData = filteredDataSource.filter((d) =>
  d.firstName.toLowerCase().includes(searchQuery.toLowerCase())
);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank

    if (text) {
      //   const newData = masterDataSource.filter(d => d.productName.toLowerCase()
      //   .includes(text.toLowerCase())
      //  );

      const newData = masterDataSource.filter(function (item) {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    }
  };

  const deleteData = async (del) => {
    //console.log("delete method")

    const auth_token = await AsyncStorage.getItem("auth-token");
    const response = await fetch(
      "https://eventz-test.herokuapp.com/customer/remove",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
        body: JSON.stringify({
          customerId: del,
        }),
      }
    );
    const data = await response.json();
    alert(`Delete success`);
    // now do whatever you want with the data
    console.log(data);
  };
  //deleteData();

  const ItemView = ({ item }) => {
    //console.log("Item is:", item._id);
    return (
      // Flat List Item
      <View
        style={{
          flexDirection: "row",
          flex: 2,
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: 5,
          padding: 10,
          marginHorizontal: 5,
        }}
      >
        <View style={{ flexDirection: "row", flex: 2, width: "60%" }}>
          <Image
             source={require('../assets/usericon.png')}
            style={{ width: 100, height: 100 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 15, fontWeight:'bold' }} onPress={() => getItem(item)}>
              {item.firstName.toUpperCase()}
              {" "}
              <Text style={{ fontSize: 15}} onPress={() => getItem(item)}>
              {item.lastName.toUpperCase()}
            </Text>
            </Text>
            <Text style={{ fontSize: 13}} onPress={() => getItem(item)}>
            📧 {item.email}
            </Text>
            <Text style={{ fontSize: 13}} onPress={() => getItem(item)}>
            📞 {item.phoneNumber}
            </Text>
            

            
            
          </View>
        </View>

        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <View style={{ marginRight: 5 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditCustomer", { edit: item });
              }}
            >
              <Avatar.Image
                size={30}
                source={require("../assets/editicon1.png")}
                style={styles.edit_icon}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 5 }}>
            <TouchableOpacity
              onPress={() => {
                deleteData(item._id);
              }}
            >
              <Avatar.Image
                size={30}
                source={require("../assets/delete2.jpg")}
                style={styles.edit_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert(
      " FirstName : " +
        item.firstName +
        "\n " +
        "LastName : " +
        item.lastName
    );
    // return (
    //   <View style={{flex: 1}}>
    //     <Button title={item.productName} onPress={toggleModal} />

    //     <Modal isVisible={isModalVisible}>
    //       <View style={{flex: 1}}>
    //         <Text>{item.productName}</Text>

    //         <Button title="Hide modal" onPress={toggleModal} />
    //       </View>
    //     </Modal>
    //   </View>
    // );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const actions = [
    {
      text: "Add New Customer",
      name: "bt_accessibility",
      icon: require("../assets/edicon.png"),
      position: 1,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Type Here..."
          value={search}
        /> */}
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />


        <FlatList
          data={searchData}
         // extraData={filteredDataSource}
          keyExtractor={(item, index) => index + item._id.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          // animationType={AnimationType.Fade}
          // animationDuration={1000}
          //  focused={focused}
        />

        <ActionButton buttonColor="#0d47a1">
          <ActionButton.Item
            style={styles.actionbutton}
            buttonColor="#9b59b6"
            title="Add New Customer"
            onPress={() => {
              navigation.navigate("AddCustomer");
            }}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemStyle: {},
  floatingaction: {
    marginTop: 100,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 18,
    color: "white",
  },
  actionbutton: {
    backgroundColor: "pink",
    color: "tomato",
  },
});

export default Customers;
