import { useRoute, } from '@react-navigation/native';
import { Button, View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import  firestore from '@react-native-firebase/firestore';
import RNBounceable from "@freakycoder/react-native-bounceable";
import React, { } from 'react';
import auth from '@react-native-firebase/auth';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';


const ManageScreen = ({ navigation }, props) => {




    const [posts, setPosts] = useState([]);



    

    const deletePress = (id) => {

        console.log(id)
        firestore()
  .collection('post')
  .doc(id)
  .delete()
  .then(() => {
    console.log('User deleted!');
  });
  fetchSubjects()
    }


    const pressHandler = (item, navigation) => {
        navigation.navigate('EditScreen', {
            info: item

        })
    }
    const pressPostHandler = (item, navigation) => {
        navigation.navigate('PostInfo', {
            info: item

        })
    }

   
    const route = useRoute();

    async function fetchSubjects() {


                userdata = []
            const querySnapshot = await firestore().collection("post").get();
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                if (doc.data().userID == auth().currentUser.uid) {
                    userdata.push({
                        phone_model: doc.data().phone_model,
                        company: doc.data().company,
                        additional_info: doc.data().additional_info,
                        photo: doc.data().photo,
                        user: doc.data().user,
                        wear: doc.data().wear,
                        id: doc.id
                    })
                };
            });

            setPosts(userdata);

    }

    useEffect(() => { fetchSubjects() }, [])

    return (
        <View style={{ height: "100%", paddingTop: 10}}>
            <ScrollView>

                {posts.map(item =>
                    <View style={styles.container}>
                        <Image source={{uri: item.photo}} resizeMode='contain' style={styles.previewImage} />
                        
                        <RNBounceable style={styles.addBtn} onPress={() => deletePress(item.id)}>
                            <Text style={styles.btnText}>Delete</Text>
                        </RNBounceable>
                        <RNBounceable style={styles.filterBtn} onPress={() => pressHandler(item, navigation)}>
                            <Text style={styles.btnText}>edit</Text>
                        </RNBounceable>

                        <Text style={styles.baseText}
                            onPress={() => pressPostHandler(item, navigation)} >
                            {item.phone_model}
                        </Text>
                    </View>
                )}

            </ScrollView>
        </View>
    );
}

export default ManageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 20,
        flexDirection: "column",
        borderWidth: 9,
        borderColor: "purple",
        borderRadius: 30,
        marginBottom: "5%",
        height: 180

    },
    item: {
        flexDirection: 'column',
        marginTop: 24,
        padding: 30,
        fontSize: 24

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,

    },
    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: 'green',
        fontSize: 24
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: "black"
    },
    photo: {
        width: 124,
        height: 100,
    },
    addBtn: {
        position: "absolute",
        width: 55,
        borderRadius: 10,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        marginRight: 20,
        left: "85%",
        marginTop: 20


    },
    filterBtn: {
        position: "absolute",
        width: 55,
        borderRadius: 10,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        marginRight: 20,
        left: "85%",
        marginTop: 65

    },
    btnText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    previewImage: {
        width: '80%',
        height: '80%',
        
      }


});