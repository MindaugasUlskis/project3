
import React, { useState , useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import auth from '@react-native-firebase/auth';
import { PrivateValueStore } from '@react-navigation/native';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";


import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '899655908881-edpb7sfvpa95b4iar63c5ld4phas8t9g.apps.googleusercontent.com',
});


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [checkboxState, setCheckboxState] = React.useState(false);
 
    return (
        <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(value) => setEmail(value)}
          />
        </View>
    
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
    
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <BouncyCheckbox
        size={25}
        fillColor="#CC00CC"
        unfillColor="#FFFFFF"
        text="Remember me!"
        iconStyle={{ borderColor: "#CC00CC" }}
        innerIconStyle={{ borderWidth: 4 }}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={() => setCheckboxState(!checkboxState)}
/>

        <RNBounceable style={styles.loginBtn} onPress={() =>login_register(email, password, navigation)}>
          <Text style={styles.loginText}>Login</Text>
        </RNBounceable>


      <RNBounceable style={styles.loginBtn} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
      <Text style={styles.loginText}>Google Sign-In</Text>
    </RNBounceable>

      </View>
      );
}
export default LoginScreen

async function onGoogleButtonPress() {

  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const { idToken } = await GoogleSignin.signIn();


  const googleCredential = auth.GoogleAuthProvider.credential(idToken);


  return auth().signInWithCredential(googleCredential);
}
const login_register = (em, pas, navigation) =>{
    auth()
  .createUserWithEmailAndPassword(em, pas)
  .then(() => {
    console.log('User account created & signed in!');
    navigation.navigate("Posts")
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
        auth().signInWithEmailAndPassword(em, pas)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate("Posts")
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#CC00CC",
    borderRadius: 30,
    width: "65%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
  
});