import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';



export default Wed = () => {
  const[data,setData]=useState ( [
    { id: 1, txt: 'Welcoming Guest', isChecked: false },
    { id: 2, txt: 'Food and Drinks', isChecked: false},
    { id: 3, txt: 'Mehandi Ceremony', isChecked:false},
    { id: 4, txt: 'Sangeet ceremony', isChecked: false },
    { id: 5, txt: 'Reception', isChecked: false },
    
    
  ]);
  
  const [products, setProducts] = useState(data);
  const[event,setEvent]=useState('');
  const getData = async () => {
    const EventCeremonies= JSON.parse(await AsyncStorage.getItem("ListOfQuotation"));
    console.log("you can uodate the  cerwmonies ...",EventCeremonies.subEvents);

    EventCeremonies.subEvents.forEach(function(news, i){
      
      // console.log("........................",news);
        const index=data.findIndex(x=>x.txt==news);
        data[index].isChecked=!data[index].isChecked;
        console.log("........................",data[index].txt, data[index].isChecked);
        setData(data);
       
       });
  
 
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
  // await AsyncStorage.setItem("EventCeremonies", JSON.stringify(apiData));

  // console.log("APiDat is", apiData);
  // const auth_token = await AsyncStorage.getItem("auth-token");
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
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
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
   
    <View style={styles.container}>
      <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
      {selected.map((d)=>{

            s.push(d.txt);
      })}
      {console.log("Ceremonies array:",s)}
      {/* <Button title="Save" type="outline" color="#0d47a1"></Button> */}
      <TouchableOpacity onPress={handleChangeSave} style={{color:"black",borderRadius:10,borderWidth:1,width:150,textAlign:"center"
      ,height:40,backgroundColor:"#0d47a1",marginLeft:'20%',marginTop:'50%'}}>
          <Text  style={{color:"white",textAlign:"center",fontSize:20,marginBottom:15}}>Save</Text>
        </TouchableOpacity>
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
    
    width: 300,
    height: 50,
    padding: 10,
    marginBottom:10,
    borderRadius:10,
   
  },

  modalView: {
    margin: 20,
    
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