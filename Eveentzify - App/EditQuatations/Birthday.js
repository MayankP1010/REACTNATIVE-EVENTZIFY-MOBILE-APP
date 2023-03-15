import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';


// const data=[

//   { id: 1, txt: 'Welcoming Guest', isChecked: false },
//   { id: 2, txt: 'Magic Show', isChecked: false},
//   { id: 3, txt: 'Music', isChecked: false },
//   { id: 4, txt: 'Decoration', isChecked: false },
//   { id: 5, txt: 'Food', isChecked: false },
// ]



export default Birthday = () => {
  const[data,setData]=useState([

    { id: 1, txt: 'Welcoming Guest', isChecked: false },
    { id: 2, txt: 'Magic Show', isChecked: false},
    { id: 3, txt: 'Music', isChecked: false },
    { id: 4, txt: 'Decoration', isChecked: false },
    { id: 5, txt: 'Food', isChecked: false },
  ]);
 
  const [products, setProducts] = useState(data);
  
  
  const getData = async () => {
  
    const EventCeremonies= JSON.parse(await AsyncStorage.getItem("ListOfQuotation"));
  // console.log("you can uodate the  cerwmonies ...",EventCeremonies.subEvents);
  
  EventCeremonies.subEvents.forEach(function(news, i){
      
  console.log("........................",news);
    const index=data.findIndex(x=>x.txt==news);
    data[index].isChecked=!data[index].isChecked;
    console.log("........................",data[index].txt);
     // setData(data);
   
   });
  //  const index=data.findIndex(x=>x.name==news);
  //  data[index].checked=!data[index].checked;
  // setData(data);

  // data.map((d)=>{
  //   if(d.txt==)
  // })
  

 
  };
  useEffect(()=>
  {
     getData();
  },[])
 const  handleChangeSave =async()=>
{
  const apiData={
      name:event,
      events:s
   
  }
  
  // console.log("APiDat is", apiData);
  // const auth_token = await AsyncStorage.getItem("auth-token");
  // await AsyncStorage.setItem("EventCeremonies", JSON.stringify(apiData));
  // const response = await fetch(
  //   "https://eventz-test.herokuapp.com/ceremonies/add",
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
  // console.log(resdata,'Aarati.........');


}
  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked 
        };
       
      }
      return product;
      // console.log("data",temp)
    });
    setProducts(temp);
  };

  let selected = products.filter((product) => product.isChecked);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
    
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex:1,
                  justifyContent:"space-between"
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChange(item.id);
                  }}
                />
                <Text style={{marginLeft:40,textAlign:"center",position:"absolute",fontSize:17}}>{item.txt}</Text>
              </View>
            </View>
          
        )}
      />
    );
  };
let s=[];
  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
      <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
      {/* <View style={{ flex: 1 }}>{renderFlatList(selected)}</View> */}


      {selected.map((d)=>{

        s.push(d.txt);
      })}



{/* {console.log("Ceremonies array:",s)} */}
      {/* <Button style={{borderRadius:10}}title="Save" type="outline" color="#0d47a1" onClick={handleSave}></Button> */}
    
       <TouchableOpacity onPress={handleChangeSave} style={{color:"black",borderRadius:10,borderWidth:1,width:150,textAlign:"center"
      ,height:40,backgroundColor:"#0d47a1",marginLeft:'20%',marginTop:'50%'}}>
          <Text  style={{color:"white",textAlign:"center",fontSize:20,marginBottom:25}}>Save</Text>
        </TouchableOpacity>
       
    
    </View>
    {/* <TouchableOpacity style={{color:"black",borderRadius:10,borderWidth:1,width:150,textAlign:"center"
      ,height:40,backgroundColor:"#e77878"}}>
          <Text  style={{color:"white",textAlign:"center",fontSize:20,marginBottom:25}}>Save</Text>
        </TouchableOpacity>
     */}
     </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   
    padding: 8,
  },

 
 card: {
    borderRadius: 3,
    
    width: 250,
    height: 30,
    padding: 10,
    marginBottom:20,
    borderRadius:10,
   
  },

  modalView: {
    margin: 10,
    
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});