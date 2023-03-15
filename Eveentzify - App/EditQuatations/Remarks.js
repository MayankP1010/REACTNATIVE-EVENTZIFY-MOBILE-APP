import React,{useEffect,useState} from 'react';

import {SafeAreaView, StyleSheet, View, Text,AsyncStorage,ImageBackground,TextInput,TouchableOpacity,Button} from 'react-native';



const Remarks = () => {
  const[title,setTitle]=useState("");
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
    // console.log("this is save handle submit")
    const EventDetails = JSON.parse(await AsyncStorage.getItem("EventDetails"));
    // console.log("Edit event details......",EventDetails);
    //  console.log("EventDetails",EventDetails)
    const AddModal = JSON.parse(await AsyncStorage.getItem("AddModal"));
    // console.log("AddModal",AddModal)
    const EventCeremonies = JSON.parse(await AsyncStorage.getItem("EventCeremonies"));
    //  console.log("Edit event EventCeremonies.....",EventCeremonies)
    //  console.log("------------------------")
   

    const apiData={
      customerName: EventDetails.customerName,
      numberOfAttendees: EventDetails.numberOfAttendees,
      selectedEvent: EventDetails.selectedEvent,
      eventDate: EventDetails.eventDate,
      eventTime: EventDetails.eventTime,
      eventVenue: EventDetails.eventVenue,

      // name: EventCeremonies.name,
      events: EventCeremonies.events,

      StarterData:AddModal.StarterData,
      SaladData:AddModal.SaladData,
      SoupData:AddModal.SoupData,
      DessertData:AddModal.DessertData,
      MainCourseData: AddModal.MainCourseData,
      soupCount:AddModal.SoupCount,
      saladCount:AddModal.SaladCount,
      starterCount:AddModal.StarterCount,
      mainCourseCount:AddModal.MainCourseCount,
      dessertCount:AddModal.DessertCount,
      totalPrice:"1000",
      title:title,
      messageText:notes

    }
    console.log("Welcome Data", apiData);
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
      starterData:AddModal.StarterData,
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






  
    // console.log("Add Modals",AddModal)

    // const auth_token = await AsyncStorage.getItem("auth-token");
    // fetch("https://eventz-test.herokuapp.com/item/all", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": auth_token,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     Stage3.push(responseJson);
       
    //     console.log("Stage 1 data...............................", Stage3)
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    

    //   // Fteching data from Stage1

    //   // const auth_token = await AsyncStorage.getItem("auth-token");
    //   fetch("https://eventz-test.herokuapp.com/event/all", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": auth_token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       Stage1.push(responseJson);
         
    //       console.log("Stage 1 data.................................", Stage1)
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
        
    //     //Fetching data from Stage2
    //     fetch("https://eventz-test.herokuapp.com/ceremonies", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "auth-token": auth_token,
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((responseJson) => {
    //         Stage2.push(responseJson);
           
    //         console.log("Stage 2 data...................................", Stage2)
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    // const auth_token = await AsyncStorage.getItem("auth-token");
    // const response = await fetch(
    //   "https://eventz-test.herokuapp.com/order/update",
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": auth_token,

    //     },
    //     body: JSON.stringify(apiData),
    //   }
    // );
    // const resdata = await response.json();
    // console.log(resdata,'Record updated.........');



  }
const handlePublish=()=>{
  alert("wil publish");
} 

const getData = async () => {
     
  const data = JSON.parse(await AsyncStorage.getItem("ListOfQuotation"));
  console.log("type",data);
  console.log("..........data from APi",typeof(data));
  console.log(".....customer name",data.customerName);
  setTitle(data.title);
  setNotes(data.messageText);
 
  

  };
  console.log(" Title...........",title);
  console.log("Notes..........:",notes);
  
  
  



  
 useEffect(()=>
 {
    getData();
 },[])




  return (
  
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      

      <View style={styles.txtTitle}>
                <TextInput
                  style={styles.title}
                  type="text"
                  value={title}
                  onChangeText={(value)=>setTitle(value)}
                  placeholder="Enter title"
                  placeholderTextColor="black"
                />
                </View>


                <View style={styles.txtnotes}>
                <TextInput
                  multiline={true}
                  numberOfLines={7}
                  style={styles.notes}
                  type="text"
                  value={notes}
                  // onChangeText={setNotes}
                  onChangeText={(value)=>setNotes(value)}
                  placeholder="Notes"
                  placeholderTextColor="black"
                />
                </View>

                {/* {
                  Stage1.map((d)=>{
                    if(d.customerName=="Rupesh Sukhadia"){
                      return(
                        <>
                          <Text>hiiiiiiiiiiiiiii</Text>
                          <Text>{d.customerName}</Text>
                        </>
                      );
                    }
                   
                  })
                } */}

            
              
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