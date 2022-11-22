import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderBackButton} from '@react-navigation/elements';
import {
  StyleSheet,
  Button,
  View,
  Text
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './screens/LoginScreen'
import CreatePostScreen from './screens/CreatePostScreen';
import PostsScreen from './screens/PostsScreen';
import PostInfo from './screens/PostInfo';
import ManageScreen from './screens/ManageScreen';
import EditScreen from './screens/EditScreen';
import auth from '@react-native-firebase/auth';

import { Menu, MenuItem, MenuDivider, MenuTrigger, MenuOptions, MenuOption, MenuProvider } from 'react-native-material-menu';
import Header from './funct/header';

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {

  const logOut = (navigation) =>{
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));

  navigation.navigate("Login")
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} options={({navigation})=>({
          title: 'Posts',
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {logOut(navigation)
              }}
            />)
         
          
          
        })} />
        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{
          title: 'Post your sell order',
          headerBackTitle: "Back to Posts",
          headerStyle: {
            backgroundColor: 'purple',
          },
      headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="PostInfo" component={PostInfo} options={{
          title: 'Info',
          headerBackTitle: "Back to Posts",
          headerStyle: {
            backgroundColor: 'purple',
          },
      headerTitleAlign: 'center'
        }}  ></Stack.Screen>
        <Stack.Screen name="EditScreen" component={EditScreen} options={{
          title: 'Edit',
          headerBackTitle: "Back to your posts",
          headerStyle: {
            backgroundColor: 'purple',
          },
      headerTitleAlign: 'center'
        }}  ></Stack.Screen>
        <Stack.Screen name="ManageScreen" component={ManageScreen} options={{
          title: 'Your posts',
          headerBackTitle: "Back to Posts",
          headerStyle: {
            backgroundColor: 'purple',
          },
      headerTitleAlign: 'center'
        }} 
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  btn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#CC00CC",
    
  }
  
});