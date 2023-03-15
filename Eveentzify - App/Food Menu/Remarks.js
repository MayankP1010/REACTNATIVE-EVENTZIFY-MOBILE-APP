import React,{useEffect,useState} from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import Share from './Share';

import {SafeAreaView, StyleSheet, View, Text,AsyncStorage,ImageBackground,TextInput,TouchableOpacity,ScrollView,Linking} from 'react-native';
// import { nanoid } from 'nanoid';
import uuid from 'react-native-uuid';


const Remarks = () => {
  const[title,setTitle]=useState("");
  const [genId, setGenId]=useState([])
  const[notes,setNotes]=useState("");
  const[msg,setMsg]=useState("");
  const[stage1,setStage1]=useState([]);
 const handlePreview=()=>
  {
    alert("preview");
    
  }
  var Stage1=[];
  var Stage3=[];
  var Stage2=[];
  const handleSave= async()=>
  {
    console.log("hi this function");
    console.log("this is save handle submit")
    const EventDetails = JSON.parse(await AsyncStorage.getItem("EventDetails"));
    console.log("EventDetails",EventDetails.customerName)
    const AddModal = JSON.parse(await AsyncStorage.getItem("AddModal"));
    console.log("AddModal",AddModal)
    const EventCeremonies = JSON.parse(await AsyncStorage.getItem("EventCeremonies"));
    console.log("EventCeremonies",EventCeremonies)
    const customerData = JSON.parse(await AsyncStorage.getItem("customerData"));

    console.log("------------------------")
   

    const apiData={
      customerName: EventDetails.customerName,
      numberOfAttendees: EventDetails.numberOfAttendees,
      selectedEvent: EventDetails.selectedEvent,
      eventDate: EventDetails.eventDate,
      eventTime: EventDetails.eventTime,
      eventVenue: EventDetails.eventVenue,
      subEvents: EventCeremonies.events,
      starterData: AddModal.StarterData,
      saladData:AddModal.SaladData,
      soupData:AddModal.SoupData,
      dessertData:AddModal.DessertData,
      mainCourseData: AddModal.MainCourseData,
      soupCount:AddModal.SoupCount,
      saladCount:AddModal.SaladCount,
      starterCount:AddModal.StarterCount,
      mainCourseCount:AddModal.MainCourseCount,
      dessertCount:AddModal.DessertCount,
      totalPrice:"1000",
      title:title,
      messageText:notes



    }
    console.log("Welcome Data......", apiData);
    console.log("--------------------------------------------------------------")
    
    const auth_token = await AsyncStorage.getItem("auth-token");
    const response = await fetch(
      "https://eventz-test.herokuapp.com/order/insert",
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
    console.log(resdata,'Aarati...............');
    
// await AsyncStorage.clear()
var key=[];
key.push(uuid.v4())
// key=await AsyncStorage.setItem(uuid.v4())
console.log('key',key[key.length-1])
    const apiDataPut={
      previewId:key[key.length-1],

      customerName: EventDetails.customerName,
      numberOfAttendees: EventDetails.numberOfAttendees,
      selectedEvent: EventDetails.selectedEvent,
      eventDate: EventDetails.eventDate,
      eventTime: EventDetails.eventTime,
      eventVenue: EventDetails.eventVenue,
      subEvents: EventCeremonies.events,
      starterData: {starter:AddModal.StarterData,customerData:customerData},
      starterData: AddModal.StarterData,

      saladData:AddModal.SaladData,
      soupData:AddModal.SoupData,
      dessertData:AddModal.DessertData,
      mainCourseData: AddModal.MainCourseData,
      soupCount:AddModal.SoupCount,
      saladCount:AddModal.SaladCount,
      starterCount:AddModal.StarterCount,
      mainCourseCount:AddModal.MainCourseCount,
      dessertCount:AddModal.DessertCount,
      totalPrice:"1000",
      title:title,
      messageText:notes



    }
    console.log("Welcome Priview Data......", apiDataPut);
    console.log("--------------------------------------------------------------")
    

    const response1 = await fetch(
      "https://eventz-test.herokuapp.com/preview/insert",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth_token,

        },
        body: JSON.stringify(apiDataPut),
      }
    );
    const resdatapreview = await response1.json();
    console.log(resdatapreview,'Preview inserted....................................');
    genId.push({oId:resdata.orderId,uId:apiData.previewId})
    Linking.openURL(`https://eventzify.herokuapp.com/${key[key.length-1]}`);






  }
const handlePublish=()=>{
  
  alert("hiiii");
  // <Share/>
  
} 
// const validationSchema = Yup.object({
//   title: Yup.string().required("Title is required"),
//   notes: Yup.string().required("Notes are required")
  
// });


  return (
  
    <SafeAreaView style={{flex: 1}}>
     
{/* 
                <Formik
          initialValues={{
            title: '',
            notes:'',
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            handleSave();
          }}>
           {({ handleSubmit, handleChange, values, errors }) => ( */}
    
    <View style={styles.container}>
      <View style={styles.txtTitle}>
                <TextInput
                  style={styles.title}
                  type="text"
                  value={title}
                   onChangeText={setTitle}
                  //onChangeText={handleChange("title")}
                  placeholder="Title"
                  placeholderTextColor="black"
                />
                </View>
                {/* <Text style={{ color: "red", textAlign: "center", margin: 10 }}>
                  {errors.title}
                </Text> */}

                <View style={styles.txtnotes}>
                <TextInput
                  multiline={true}
                  numberOfLines={7}
                  style={styles.notes}
                  type="text"
                  value={notes}
                 onChangeText={setNotes}
                 // onChangeText={handleChange("notes")}
                  placeholder="Notes"
                  placeholderTextColor="black"
                />
                </View>
                {/* <Text style={{ color: "red", textAlign: "center", margin: 10 }}>
                  {errors.notes}
                </Text> */}
               
            
              
                {/* <TouchableOpacity  style={styles.previewBtn}
      onPress={()=>{handlePreview()}}><Text style={styles.preview}>Preview</Text></TouchableOpacity> */}

<View style={{flexDirection:"row",margin:20}}>
                <TouchableOpacity style={styles.previewBtn} onPress={()=>{handleSave()}}><Text style={styles.preview}>Save and Preview</Text></TouchableOpacity>
                <TouchableOpacity style={styles.previewBtn1} onPress={()=>{handlePublish()}}><Text style={styles.preview}>Save and Share</Text></TouchableOpacity>
                </View>
                </View>
           {/* )}
         
  </Formik>              
  */}
    </SafeAreaView>
   
  );
  
  
};

export default Remarks;

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
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  title:{
    width: 300,
    paddingLeft: 20,
    paddingRight: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop:30
  },
  notes:{
    width: 300,
    paddingLeft: 20,
    paddingRight: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop:30
  },
  preview:{
    color:"white",
    textAlign:"center",
    fontSize:14,
    marginBottom:25
  
  },
  previewBtn:{
    marginTop:20,
    margin:30,
    color:"black",
    borderRadius:10,
    borderWidth:1,
    width:100,
    textAlign:"center",
    height:50,
    backgroundColor:"#0d47a1",
    padding:5
  },
  previewBtn1:{
    marginTop:20,
    margin:30,
    color:"black",
    borderRadius:10,
    borderWidth:1,
    width:100,
    textAlign:"center",
    height:50,
    backgroundColor:"#0d47a1",
    padding:5
  }


});