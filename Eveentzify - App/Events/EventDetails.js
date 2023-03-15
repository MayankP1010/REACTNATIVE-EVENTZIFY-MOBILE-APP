  
import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Button,
  ScrollView,
  Platform,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Formik } from "formik";
import * as Yup from "yup";
import SearchableDropdown from 'react-native-searchable-dropdown';

import DateTimePicker from '@react-native-community/datetimepicker';



const EventDetails = ({navigation}) => {
  const [userName, setUserName] = useState('AboutReact');
  const [customerData,setCustomerData]=useState([]);
  const [date, setDate] = useState(new  Date());
  const [fulldate,setFulldate]=useState(0)
  const [hr,setHr]=useState('')
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dflag, setDflag] = useState(false);
  const [tflag, setTflag] = useState(false);
  const [event,setEvent]=useState('');
  const[derror,setDerror]=useState(false);
  const[terror,setTerror]=useState(false);
  const [Customers, setCustomers] = useState([]);
//   const Cutomers = [
//     {id: 1, name: 'Rupesh Sukhadia'},
// {id: 2, name: 'Aarati Kamble'},
// {id: 3, name: 'Namrata Gandhi'},
// {id: 4, name: 'Yogesh Sawarkar'},
// {id: 5, name: 'Atul Anand'},
// {id: 6, name: 'Pratiksha Patil'},
// {id: 7, name: 'Mayank Pendke'},
// {id: 8, name: 'Gayatri Patil'},
// {id: 9, name: 'Gouri Ahuja'},

// ];
  const [selectedItems, setSelectedItems] = useState()
  // console.log("App Executed")


  const getData = async () => {
    var WholeCustomers=[]
    
    console.log(selectedItems,"helooooooo")
    //setSelectedItems(selectedItems.name);
   

    const auth_token = await AsyncStorage.getItem("auth-token");
    fetch("https://eventz-test.herokuapp.com/event/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth_token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {

       
      
         
        responseJson.forEach(function(news, i){
        
          WholeCustomers.push({id: news._id, name:news.customerName});
         
         });
      
        setCustomers(WholeCustomers)
        setCustomerData(responseJson)
       
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //  console.log("customer Name.....................",selectedItems);
   

  const getCustomers = async () => {};

  useEffect(() => {
    getData();
  }, []);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    // setFulldate((currentDate.toString()).slice(0, 10));
    setFulldate(currentDate.getFullYear()+'/'+((currentDate.getMonth())+1)+'/'+currentDate.getDate())
    // setFulldate(currentDate.getFullYear()+'/'+((currentDate.getMonth())+1)+'/'+currentDate.getDate())
    // setFulldate(currentDate.getDate()+'/'+((currentDate.getMonth())+1)+'/'+currentDate.getFullYear())
    setHr(currentDate.getHours()<12?
    (currentDate.getHours().toString()+':'+(currentDate.getMinutes().toString())+' A.M'):
    ((currentDate.getHours()-12).toString()+':'+(currentDate.getMinutes().toString())+' P.M')
    )



  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setDflag(true)
    showMode('date');
  };

  const showTimepicker = () => {
    setTflag(true)
    showMode('time');
  };
  



  const validationSchema = Yup.object({
  attendees: Yup.number().required("Attendees is required"),
  event:Yup.string().required("select an event"),
  venue: Yup.string().required("Venue is required"),
  date:Yup.string().required("Date is required")
});

  const Ceremonies = [
    {
      label: "Wedding",
      value: "Wedding",
    },
    {
      label: "Birthday",
      value: "Birthday",
    },
    {
      label: "Anniversary",
      value: "Anniversary",
    },
  ];
  const Customer = [
    {
      label: "Aarti",
      value: "Aarti",
    },
    {
      label: "Namrata",
      value: "Namrata",
    },
    {
      label: "Gouri",
      value: "Gouri",
    },
  ];
  
  return (
     
      <ScrollView keyboardShouldPersistTaps="handled">
    <SafeAreaView style={{flex: 1}}>

    <KeyboardAvoidingView style={styles.container}>
    

  <Formik
      initialValues={{
        attendees: '',
        venue: '',
        date:' ',
        event:'',
      }}
      validationSchema={validationSchema}
      onSubmit={async values => {
        // console.log(values);
        setDerror(true);
        setTerror(true);
        await AsyncStorage.setItem("event",values.event)
        {!terror && !derror?null: navigation.navigate('EventCeremonies')}
      //  navigation.navigate('EventCeremonies')
      
      const index = customerData.findIndex(x => x._id ==selectedItems.id);
      console.log(customerData[index],'uuuu')
      await AsyncStorage.setItem("customerData", JSON.stringify(customerData[index]));

        const apiData={

          customerName:selectedItems.name ,
          numberOfAttendees: values.attendees,
          selectedEvent: values.event,
          eventDate: fulldate,
          eventTime: hr,
          eventVenue: values.venue
        }
        await AsyncStorage.setItem("EventDetails", JSON.stringify(apiData));
        // console.log("APiDat is", apiData);
        const auth_token = await AsyncStorage.getItem("auth-token");
        const response = await fetch(
          "https://eventz-test.herokuapp.com/event/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": auth_token,

            },
            body: JSON.stringify(apiData),
          }
        );
        const resdata = await response.json();
        // console.log(resdata,'Aarati.........');
        // if (rdata.message === "Event Created") {
        //   Toast.show("Data submitted ");
        //   // this.props.navigation.navigate("Login");
        // }
        // else if (response.status===400)
        // {
        //   Toast.show('Something went Wrong ! Try Again')
        // }
        // else if(rdata.message==="email already exists"){
        //   Toast.show('Email already Exit')
        // }

      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
      <View style={styles.container}>
        {/* This is a SearchingStarts */}
        <SearchableDropdown     
//On text change listner on the searchable input
// selectedItems={selectedItems}
onTextChange={(text) => console.log(text)}
//On text change listner on the searchable input
selectedItems={selectedItems}
onItemSelect={(Customers) => setSelectedItems(Customers)}

//onItemSelect called after the selection from the dropdown
containerStyle={{ padding: 5 }}
//suggestion container style
textInputStyle={{
  //inserted text style
  padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          width:300,
          color:"black"
}}
itemStyle={{
  //single dropdown item style

  padding: 10,
  marginTop: 2,
  
  borderColor: '#bbb',
  borderWidth: 1,
}}
itemTextStyle={{
  //text style of a single dropdown item
  color: '#222',
}}
itemsContainerStyle={{ maxHeight: 100 }}
items={Customers}
//mapping of item array

//default selected item index
placeholder="Select Customer"
placeholderTextColor="black"
//place holder for the search input
resetValue={false}
//reset textInput Value with true and false state
/>
{/* {console.log("selected Items",typeof(selectedItems.name))} */}






{/* This is a No. of Attendes */}
              <View style={styles.textstyle}>
                <TextInput
                  style={styles.attend}
                  type="text"
                  onChangeText={handleChange("attendees")}
                  value={values.attendees}
                  placeholder="No. of attendees"
                  placeholderTextColor="black"
                />

                <Text style={{ color: "red", textAlign: "center", margin: 10 }}>
                  {errors.attendees}
                </Text>
              </View>
      
      
     
{/* This is a DropDown */}

             <RNPickerSelect
              placeholder={{
                  label: 'Select an event',
                  value:'Select an event',
                  color:"black"
              }}
            
              value={values.event}
              items={Ceremonies}
              onValueChange={handleChange('event')}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 5,
                  right: 12
                }
              }}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColor: 'yellow' }}
              Icon={() => {
                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
              }}
            />
            {errors.event?
            <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>
             Select an event
            </Text>:<Text />}
            


{/* This is a DatePickerStarts */}

<View style={{flexDirection:'row',justifyContent:'center',padding:5}}>
        
        {/* <Foundation style={{flex:2}} onPress={showDatepicker} name='calendar' size={45} color='green' /> */}

        <Text style={{ width: 300,
paddingLeft: 15,
paddingRight: 30,
padding: 13,
borderWidth: 1,
borderColor: "black",
borderRadius: 10,
}}
        onPress={showDatepicker}
         >
         
        {!dflag ?
        <Text style={{textAlign:"center",justifyContent:"center",padding:20,marginTop:30,marginRight:10}}>Select Date </Text>
        
        : <Text style={{textAlign:"center",justifyContent:"center"}}>{fulldate} </Text>
        }
        </Text>
     </View>
     
     {!dflag&&derror?<Text style={{ color: 'red', textAlign: 'center' }}>Select Date</Text>:null}
    
<View style={{flexDirection:'row',justifyContent:'center',padding:15,marginTop:5}}>
       {/* <Entypo style={{flex:2}}   name='back-in-time' size={40} color="green" /> */}
        <Text style={{width: 300,
paddingLeft:20,
paddingRight: 30,
padding: 13,
borderWidth: 1,
borderColor: "black",
borderRadius: 10,
}} 
         onPress={showTimepicker} >
 
        {!tflag ?  <Text>Select Time </Text>:<Text>{hr}</Text> }
       

        </Text>
     </View>
     
       {!tflag&&terror?<Text style={{ color: 'red', textAlign: 'center' }}>Select Time</Text>:null}

     {show && (
       <DateTimePicker
         testID="dateTimePicker"
         value={date}
         mode={mode}
        minDate={new Date()}
         
        
         is24Hour={false}
         display="default"
         onChange={onChange}
       />
     )}


{/* This is a VenueStarts */}
                <View style={styles.txtstyle}>
                    <TextInput
                        style={styles.venue}
                        type="text"
                        onChangeText={handleChange("venue")}
                        value={values.venue}
                        placeholder="Venue"
                        placeholderTextColor="black"
                />

                <Text style={{ color: "red", textAlign: "center", margin: 10 }}>
                  {errors.venue}
                </Text>
              </View>

        <TouchableOpacity
        onPress={handleSubmit}
        style={{color:"black",borderRadius:10,borderWidth:1,width:150,textAlign:"center"
      ,height:40,backgroundColor:"#0d47a1",padding:5}}
        
        >

          <Text  style={{color:"white",textAlign:"center",fontSize:20,marginBottom:25}}>Next</Text>
        </TouchableOpacity>

        {/* <Button
          title="Go Next"
          style={{color:"black",padding:10}}
          onPress={() =>{
          handleSubmit();
          }
        
            
          }
          
        /> */}
      </View>
      
        )}
    
    </Formik>
     
     
    </KeyboardAvoidingView>
    </SafeAreaView>
    </ScrollView>
  
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10,
  },
  textStyle: {
    // textAlign: 'center',
    // fontSize: 16,
    // marginVertical: 10,
    justifyContent: "center",
    textAlign: "center",
    padding:20
  },
  txtstyle: {
   
    justifyContent: "center",
    textAlign: "center",
    padding:20
  },
  picker: {
    width: "90%",
    height: 45,
  
    justifyContent: "center",
    textAlign: "center",
    //borderRadius: 20,
  },
  attend: {
    width: 300,
    paddingLeft: 20,
    paddingRight: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop:30
  },
  venue: {
    width: 300,
    paddingLeft: 20,
    paddingRight: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    
  },
 
});


const pickerSelectStyles = StyleSheet.create({

  inputAndroid: {
    
    fontSize: 14,
    padding:20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 300,
    color: "black",
    
   

  },
});