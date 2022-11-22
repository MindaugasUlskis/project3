
import React, { useState , useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Image
} from "react-native";

import { PrivateValueStore } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePick from '../funct/ImagePick';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';



const CreatePostScreen = ({navigation}) => {

  const [model, setModel] = useState('');
      const [company, setCompany] = useState('');
      const [wear, setWear] = useState('');
      const [additional_info, setAdditional_info] = useState('');
      
    
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [images, setImages] = useState();
    

    const selectImage = () => {

      let options = {
        maxWidth: 800,
        maxHeight: 800,
        storageOptions: {
          skipBackup: true,
          path: 'images',
          
        },
        includeBase64: false
      };
  launchImageLibrary(options, response => {
    console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.assets[0].uri };

          console.log(source.uri);


          setImages(source.uri);

        }
      });
      
    };
  
  
    const upload = async () => {

      if(model.length && company.length && wear.length && additional_info.length > 0){

      photoID = uuid.v4();
      const  uri  = images;

     

      let filename = uri.substring(uri.lastIndexOf('/' + 1));


      try {
        await storage().ref(photoID).putFile(filename)
      }catch(e){
        console.log(e)
      }

      const url = await storage().ref(photoID).getDownloadURL();
      

      const data = {
        phone_model: model,
        company: company,
        wear: wear,
        additional_info: additional_info,
        photo: url,
        userID: auth().currentUser.uid,
      };

      
      firestore().collection('post').add(data)
    }};

    

    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
        <Image source={{uri:images}} resizeMode='contain' style={styles.previewImage} />
      </View>
    


        <RNBounceable style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Phone Model"
            placeholderTextColor="black"
            onChangeText={(value) => setModel(value)}
          />
        </RNBounceable>
    
        <RNBounceable style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Company"
            placeholderTextColor="black"

            onChangeText={(value) => setCompany(value)}
          />
        </RNBounceable>
        <RNBounceable style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Wear"
            placeholderTextColor="black"

            onChangeText={(value) => setWear(value)}
          />
        </RNBounceable>
        <RNBounceable style={styles.inputViewField}>
          <TextInput
            style={styles.TextInput}
            placeholder="Additional information"
            placeholderTextColor="black"

            multiline={true}
            numberOfLines={6}
            onChangeText={(value) => setAdditional_info(value)}
          />
        
          </RNBounceable>
          <RNBounceable style={styles.addBtn} onPress={selectImage}>
          <Text style={styles.loginText}>Add a photo!</Text>
        </RNBounceable>
        <RNBounceable style={styles.addBtn} onPress={() =>upload()}>
          <Text >POST!</Text>
        </RNBounceable>
        
        
        
      </View>

      );

  

}
export default CreatePostScreen





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: "5%",
    padding: 20,

  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "purple",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",

  },
  inputViewField: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "100%",
    height: "20%",
    marginBottom: 20,
    borderWidth: 6,
    borderColor:"purple",
    alignItems: "center",
  },
 
  TextInput: {
    height: 45,
    flex: 1,
    padding: 10,
    marginLeft: 0,
    width: "80%",
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "purple"
  },
  
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "purple",
    
  
  },
  addBtn: {
    width: "40%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "purple",

  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 130,
    marginHorizontal:'10%',
    marginBottom:20
 
    
  },
  previewImage: {
    width: '100%',
    height: '100%',
  }
  
});