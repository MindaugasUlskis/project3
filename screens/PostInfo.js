import { useRoute, } from '@react-navigation/native';
import { Button, View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import RNBounceable from "@freakycoder/react-native-bounceable";
import React, { } from 'react';
import storage from '@react-native-firebase/storage';
const PostInfo = ({ navigation }, props) => {

    const [url, setUrl] = useState('ec822383-5edd-44de-89c1-879d34aa2320');
    const route = useRoute();
    


    
    return (
        <View style={styles.container}>
          
    
          <Image source={{uri: route.params.info.photo}} resizeMode='contain' style={styles.previewImage} />

        
          <Text style={styles.largeTxt}>{route.params.info.phone_model} </Text>

        <View style={styles.line}/>
        
        
          <Text style={styles.infoText}>company:   {route.params.info.company} </Text>
          <View style={styles.thinLine}/>
        
          <Text style={styles.infoText}>Device wear:   {route.params.info.wear} </Text>
        <View style={styles.ViewField}>
          <Text >{route.params.info.additional_info} </Text>
        </View>
    
        
        
        
        
      </View>

      );

  

}
export default PostInfo





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: "5%",
    padding: 20
  },
  ViewField: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "100%",
    height: "20%",
    marginBottom: 20,
    borderWidth: 6,
    borderColor: "#CC00CC",
    paddingLeft: 20,
    paddingTop: 5
},
  inputView: {
    backgroundColor: "#CC00CC",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",

  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 130,
    marginHorizontal:'10%',
 
    
  },
  previewImage: {
    width: '100%',
    height: '20%',
    marginBottom:20
  },
  largeTxt:{
    fontWeight: "bold",
    color: "black",
    fontSize: 24
  },
  line:{
    borderBottomColor: "#CC00CC",
    borderBottomWidth: 8,
    width:"100%",
    borderRadius:50,
    marginBottom: 5
  },
  infoText:{
    fontWeight: "bold",
    color: "grey",
    fontSize: 18,
    marginBottom: 10
  },
  thinLine:{
    borderBottomColor: "#CC00CC",
    borderBottomWidth: 3,
    width:"100%",
    borderRadius:50,
    marginBottom: 5
  }
  
});