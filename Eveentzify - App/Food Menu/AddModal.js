import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions,
    TextInput,AsyncStorage
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import DropDownPicker from 'react-native-dropdown-picker'
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Starter from '../data/Starter';
import MainCourse from '../data/MainCourse';
import Dessert from '../data/Dessert';
import Soup from '../data/Soup';
import Salad from '../data/Salad';



import ModalSelector from 'react-native-modal-selector-searchable'
var screen = Dimensions.get('window');
const sports = [
  {
    label: 'Starter',
    value: 'Starter',
  },
  {
    label: 'MainCourse',
    value: 'MainCourse',
  },
   {
    label: 'Salad',
    value: 'Salad',
  },
  {
    label: 'Dessert',
    value: 'Dessert',
  },
  {
    label: 'Soup',
    value: 'Soup',
  },
];
export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newFoodName: '',
            newFoodDescription: '',
             textInputValue: '',
            getData:[],
             data:[ ],
             Starter:[],
             Soup:[],
             Dessert:[],
             MainCourse:[],
             Salad:[],
             pid:[],
             uniqueValue: 1,
             StarterPrice:0,
             food:[],
             
        
        };
        
    }
    
    showAddModal = async() => {
   var wholeProducts=[]
      const auth_token = await AsyncStorage.getItem("auth-token");
      fetch("https://eventz-test.herokuapp.com/product/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson,"response")
         this.setState({getData : responseJson})
         
         responseJson.forEach(function(news, i){
         
           wholeProducts.push({key:i++,label:news.productName,category:news.productCategory});
          
          });
        // console.log(wholeProducts,"Gouri")
         this.setState({data:wholeProducts})
  
         
         
        })
        .catch((error) => {
          console.error(error);
        });
        this.refs.myModal.open();
      
    }
    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});        
    }
    
    forceRemount = () => {
      this.setState(({ uniqueValue }) => ({
        uniqueValue: uniqueValue + 1
      }));
    }
    render() {
    
      // console.log(this.state.getData,"getdata")
      // console.log(this.state.getData.productCategory,"categry")
      // console.log(this.state.getData.priceRange,"Range")
      // console.log(this.state.data.category,"data")
       const placeholder = {
      label: 'Select Cateory',
      value: null,
      color: 'black',
    };
    

        return (
          
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                  
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280,
                    borderRadius:10
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >
                <Text style={{
                     fontSize: 16,
                     fontWeight: 'bold',
                     textAlign: 'center',
                     marginTop: 1
                }}>Add Item</Text>
           
          {/* and iOS onUpArrow/onDownArrow toggle example */}
               
              
          <ModalSelector
                    data={this.state.data}
                    initValue="Select Food Item!"
                    supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({textInputValue:option.label })
                    this.setState({pid:option.key })
                  
                  } 
                    
                  }
                    
                    
                    >

                    <TextInput
                        style={{width:200,marginLeft:20, borderRadius:10, color:"black", padding: 10, height: 40 ,fontSize:15,borderColor:"black"}}
                        editable={false}
                        placeholder="Select food item"
                        placeholderTextColor="grey"
                        value={this.state.textInputValue}
                       selectStyle={{borderColor: "black"}}
                        selectTextStyle={{color: "blue"}}
                        editable={false}
                        placeholder="Select food item"
                        
                        value={this.state.textInputValue}
                        
                         />
                        

                </ModalSelector>

               
                  <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            onValueChange={value => {
              this.setState({
                favSport0: value,
              });
            }}
           
            style={pickerSelectStyles}
            value={this.state.favSport0}
           
          />
       
         
             
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                      padding: 8,
                      marginLeft: 70,
                      marginRight: 70,
                      height: 40,
                      borderRadius: 6,
                      backgroundColor: "#0d47a1"
                    }}
                    onPress={async() => {
                         if (this.state.textInputValue.length == 0 || this.state.favSport0.length == 0) {
                            alert("You must enter food's name and description");
                            return;
                        } 
                      
                        // (this.state.food.findIndex(x=>x.name === apidata[items.name]))=== -1?
                        //  this.state.food.push(apidata);
                        
                         
                       
                        // const auth_token = await AsyncStorage.getItem("auth-token");
                        // const response = await fetch(
                        //   "https://eventz-test.herokuapp.com/item/insert",
                        //   {
                        //     method: "POST",
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //       "auth-token": auth_token,
                
                        //     },
                        //     body: JSON.stringify(apidata),
                        //   }
                        // );
                        // const resdata = await response.json();
                        // console.log(resdata,'This is add model.........');
                      
                        {this.state.favSport0==="Starter" &&   
                        (Starter.findIndex(x => x._id ===this.state.getData[this.state.pid]._id)) ===-1 ?
                        Starter.push({
                              ...this.state.getData[this.state.pid],
                               cat:"Starter",

                             }) :null 
     this.setState({StarterPrice:this.state.StarterPrice+(this.state.getData[this.state.pid].priceRange.range1)})
                             
                            }
                            
                            
                        {this.state.favSport0==="MainCourse" && 
                        (MainCourse.findIndex(x => x._id ===this.state.getData[this.state.pid]._id)) ===-1 ?
                        MainCourse.push({
                          ...this.state.getData[this.state.pid],
                           cat:"MainCourse"
                         })
                        //  this.state.food.push(  ...this.state.getData[this.state.pid])
                         :null }
                        {this.state.favSport0==="Dessert" &&
                        (Dessert.findIndex(x => x._id ===this.state.getData[this.state.pid]._id)) ===-1 ?
                        Dessert.push({
                          ...this.state.getData[this.state.pid],
                           cat:"Dessert"
                         }) :null }
                        {this.state.favSport0==="Soup" &&
                        (Soup.findIndex(x => x._id ===this.state.getData[this.state.pid]._id)) ===-1 ?
                        Soup.push({
                          ...this.state.getData[this.state.pid],
                           cat:"Soup"
                         }) :null }
                        {this.state.favSport0==="Salad" && 
                        (Salad.findIndex(x => x._id ===this.state.getData[this.state.pid]._id)) ===-1 ?
                        Salad.push({
                          ...this.state.getData[this.state.pid],
                           cat:"Salad"
                         })  :null}

                     console.log("sp",this.state.StarterPrice)
                    //  const apidata={
                    //   items:[
                    //    name=this.state.textInputValue,
                    //     price=this.state.getData[this.state.pid].priceRange.range1,
                    //     category=this.state.favSport0
                    //   ]                         
                    // };
                    // this.state.food.push(apidata);
                    // await AsyncStorage.setItem("AddModal", JSON.stringify(this.state.food));
                    // console.log("items data ",apidata);
                 
                        //console.log("Starter",await AsyncStorage.getItem("SC"));

                            // console.log("Dessert",this.state.Salad) 
                            // console.log("Soup",this.state.Soup) 
                            // console.log("Salad",this.state.Dessert) 
                            // console.log("MainCourse",this.state.MainCourse)                      
                            // 
                            this.forceRemount();
                        this.refs.myModal.close();  
                        
                       
                        
                    }}>
                    Add
                </Button>
            </Modal>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({

  inputAndroid: {
    
    fontSize: 12,
    padding:20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 200,
    color: "black",  
    marginTop:20,
    marginBottom:20,
    marginLeft:20,
    borderBottomWidth:1,
    borderBottomColor:"black",
    height:30

    
   

  },
});