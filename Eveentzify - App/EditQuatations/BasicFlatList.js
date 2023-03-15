import React, { Component } from "react";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Button,
  AsyncStorage
} from "react-native";
import flatListData from "../data/flatListData";
import Starter from "../data/Starter";
import Dessert from "../data/Dessert";
import Soup from "../data/Soup";
import MainCourse from "../data/MainCourse";
import Swipeout from "react-native-swipeout";
import { SearchBar } from "react-native-elements";
import AddModal from "./AddModal";
import { useIsFocused } from '@react-navigation/native';
import Salad from "../data/Salad";
import { List, Checkbox, Avatar } from "react-native-paper";
import ThemedDialog from "react-native-elements/dist/dialog/Dialog";

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      numberOfRefresh: 0,
      num: 0,
    };
  }
  refreshFlatListItem = () => {
    this.setState((prevState) => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1,
        num: Starter.length + 1,
      };
    });
  };

  
  render() {
    // // console.log(this.props);
    // console.log(Starter,"this is starter")
   
    const swipeSettings = {
     
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        // console.log("Items",this.props.item._id)
        this.setState({ activeRowKey: this.props.item._id });
      
      },
      right: [
        
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            // console.log(deletingRow,"deleterow")
            Alert.alert(
              "Alert",
              "Are you sure you want to delete ?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    // console.log(this.props.item.cat,"cat")
                  

                      // console.log(index,"thisis  category");
                      switch( this.props.item.cat){
                        case "Starter":
                          index = Starter.findIndex(x => x._id ==deletingRow);
                          Starter.splice(index,1);

                          break;
                        case "Soup":
                          index = Soup.findIndex(x => x._id ==deletingRow);
                          Soup.splice(index,1);

                          break;
                        case "Salad":
                            index = Salad.findIndex(x => x._id ==deletingRow);
                            Salad.splice(index,1);
  
                            break;

                          case "MainCourse":
                              index = MainCourse.findIndex(x => x._id ==deletingRow);
                              MainCourse.splice(index,1);
    
                              break;
                            case "Dessert":
                                index = Soup.findIndex(x => x._id ==deletingRow);
                                Dessert.splice(index,1);
      
                                break;
                                default:
                                  console.log("Enter Correct category");
                                  break;
      

                      }

           
                  
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                  },
                },
              ],
              { cancelable: true }
            );
          },
          text: "Delete",
          type: "delete",
        },
      ],
      rowId: this.props.index,
      sectionId: 1,
    };
    return (
      <>
        <Swipeout {...swipeSettings}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
                backgroundColor: "white",
              }}
            >
              <Image
                source={{ uri: this.props.item.productImgUrl }}
                style={{ width: 100, height: 100, margin: 5 }}
              ></Image>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  height: 100,
                }}
              >
                <Text style={styles.flatListItem}>{this.props.item.productName}</Text>
               
               
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  height: 100,
                }}
              >
                <Text style={{ color: "black", padding: 10, fontSize: 15 }}>
                  ₹  {this.props.item.priceRange.range1}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: "white",
              }}
            ></View>
          </View>
        </Swipeout>
      </>
    );
  }
}
const styles = StyleSheet.create({
  flatListItem: {
    color: "black",
    padding: 10,
    fontSize: 16,
  },
});

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null,
      dish: " ",
      Starter:Starter,
      uniqueValue: 1,
      StarterP:Starter,
      flag:false,
      allData:[],
      StarterCount:"",
      SaladCount:"",
      SoupCount:"",
      DessertCount:"",
      MainCourse:"",
      price:"",
      venue:"",
      MainCoursed:" ",
      Starterd:" ",
      Saladd:" ",
      Soupd:" ",
      Dessertd: " ",


    };
    this._onPressAdd = this._onPressAdd.bind(this);
  }
  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: activeKey,
      };
    });
  };
  _onPressAdd() {
    this.setState({flag:true})
    this.forceRemount();
    this.refs.addModal.showAddModal();
    
  }
  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1
    }));
  }
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = flatListData.filter((item) => {
      const itemData = `${item.name.toUpperCase()} ${item.foodDescription.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });

    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type..."
        value={this.state.value}
        onChangeText={(text) => this.searchFilterFunction(text)}
      />
    );
  };
 
 
  
  
  
  getdata=async()=>{
    const data = JSON.parse(await AsyncStorage.getItem("ListOfQuotation"));

  this.setState({MainCoursed:data.mainCourseData})
  this.setState({Starterd:data.starterData})
  this.setState({Saladd:data.saladData})
  this.setState({Soupd:data.soupData})
  this.setState({Dessertd:data.dessertData})

  console.log("MainCoused..................................",this.state.MainCoursed)
  console.log("Starterd..................................",this.state.Starterd)
  console.log("Soupd..................................",this.state.Soupd)
  console.log("saladd..................................",this.state.Saladd)
  console.log("dessertd..................................",this.state.Dessertd)
  console.log("Name...........................................................................",this.state.MainCoursed.productName)
  
   console.log("Food MEnuuuuuu.........................",data.starterCount);
   console.log("soupCount.............................",data.soupCount);
   console.log("saladCount...........................",data.saladCount);
   console.log("mainCourseCount......................",data.mainCourseCount);
   console.log("dessertCount.........................",data.dessertCount);
   console.log("MainCourse Data......................",data.mainCourseData);
   console.log("Starter Data.........................",data.starterData);
   console.log("Soup Data.............................",data.soupData);
   console.log("Salad Data............................",data.saladData);
   console.log("Dessert Data..........................",data.dessertData);

  
   MainCourse.push(this.state.MainCoursed);
   console.log("-----------------------------------------------------------",MainCourse);
  //  Starter.push(data.starterData);
  //  Salad.push(data.mainCourseData);
  //  Soup.push(data.saladData);
  //  Dessert.push(data.dessertData);
 
    // this.setState({venue:data.eventVenue})
   
    }
    
  componentWillMount(){
    this.forceRemount();
    
    this.getdata();
    // conosle.log("-----------------------------------",data.eventVenue);
}


   render() {
    // console.log(Starter.length,"Starter Dish1");
    const getAddModalData=async()=>{
      const CategoryData = {
        // StarterData:Starter,
        // SaladData:Salad,
        // SoupData:Soup,
        // DessertData:Dessert,
        // MainCourseData: MainCourse,
        // SoupCount:Soup.length,
        // SaladCount:Salad.length,
        // StarterCount:Starter.length,
        // MainCourseCount:MainCourse.length,
        // DessertCount:Dessert.length


        StarterData:this.state.Starterd,
        SaladData:this.state.Saladd,
        SoupData:this.state.Soupd,
        DessertData:this.state.Dessertd,
        MainCourseData: this.state.MainCoursed,
        SoupCount:Soup.length,
        SaladCount:Salad.length,
        StarterCount:Starter.length,
        MainCourseCount:MainCourse.length,
        DessertCount:Dessert.length
        
      }

      // const auth_token = await AsyncStorage.getItem("auth-token");
      //                   const response = await fetch(
      //                     "https://eventz-test.herokuapp.com/item/insert",
      //                     {
      //                       method: "POST",
      //                       headers: {
      //                         "Content-Type": "application/json",
      //                         "auth-token": auth_token,
                
      //                       },
      //                       body: JSON.stringify(CategoryData),
      //                     }
      //                   );
      //                   const resdata = await response.json();
      //                   console.log(resdata,'This is add model.........');


      await AsyncStorage.setItem("AddModal", JSON.stringify(CategoryData));
        // console.log(await AsyncStorage.getItem("AddModal"))
  }
   

    return (
      <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 34 : 0 }}>
    
          <View
            style={{
              backgroundColor: "#0d47a1",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              height: 64,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                justifyContent: "center",
                margin: 120,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Menu
            </Text>
            <TouchableHighlight
              style={{ marginRight: 10 }}
              underlayColor="#0d47a1"
              onPress={this._onPressAdd}
            >
              <Image
                style={{ width: 35, height: 35 }}
                source={require("../icons/icons-add.png")}
              />
            </TouchableHighlight>
          </View>

          <ScrollView contentContainerStyle={{flexGrow:1}}>

            <Button 
            title="Save"
            onPress={getAddModalData}
            ></Button>
            <List.Accordion
              title={"Soup"}
             
              titleStyle="TextStyleProp"
              Theme="Theme"
            >

             
              <FlatList
                ref={"Soup"}
                data={this.state.Soupd}
                keyExtractor={(item,index) => item+index}
                renderItem={({ item, index}) => {                  
                  
                  
                  return (
                    <FlatListItem
                      item={item}
                      index={index}
                      
                      parentFlatList={this}
                      // onAdd={() => this.onAdd(item, index)}
                    ></FlatListItem>
                  );
                }}
              ></FlatList>
            </List.Accordion>
            <List.Accordion 
            
            title={"Salad"}
            >
              <FlatList
                ref={"Salad"}
                data={this.state.Saladd}
                keyExtractor={(item,index) => item+index}
                renderItem={({ item, index }) => {
                  //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                  return (
                    <FlatListItem
                      item={item}
                      index={index}
                      parentFlatList={this}
                    ></FlatListItem>
                  );
                }}
              ></FlatList>
            </List.Accordion>
            <List.Accordion
            //  title={ "Starter ("  + Starter.length + ")"}   icon="equal"
            title={"Starter"}
             >
              {/* {Starter.length===0 ?  <Text>Count:{Starter.length}</Text> :  <Text>Count:{Starter.length+1}</Text> } */}
             

              <FlatList
                ref={"Starter"}
                data={this.state.Starterd}
                scrollEnabled={false}
                keyExtractor={(item,index) => item+index}
                renderItem={({ item, index }) => {
                  //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                  return (
                    <FlatListItem
                      item={item}
                      index={index}
                      parentFlatList={this}
                      
                    ></FlatListItem>
                  );
                }}
              ></FlatList>
            </List.Accordion>

            <List.Accordion
            //  title={ "MainCourse ("  + MainCourse.length + ")"}
             title={"MainCourse"}
             >
              <FlatList
                ref={"MainCourse"}
                data={this.state.MainCoursed}
                keyExtractor={(item,index) => item+index}
                renderItem={({ item, index }) => {
                  //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                  return (
                    <FlatListItem
                      item={item}
                      index={index}
                      parentFlatList={this}
                    ></FlatListItem>
                  );
                }}
              ></FlatList>
            </List.Accordion>

            <List.Accordion 
            // title={ "Dessert ("  + Dessert.length + ")"}
            title={"Dessert"}
            >
          
         
              <FlatList
                ref={"Dessert"}
                data={this.state.Dessertd}
                keyExtractor={(item,index) => item+index}
                renderItem={({ item, index }) => {
                  //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                  return (
                    <FlatListItem
                      item={item}
                      index={index}
                      parentFlatList={this}
                    ></FlatListItem>
                  );
                }}
              ></FlatList>
            </List.Accordion>

            
{this.state.flag && 
            <AddModal ref={"addModal"} desssert={this.state.Dessertd} parentFlatList={this}></AddModal>}

           
          </ScrollView>
          
      </View>
    );
  }
}
