import { useRoute, } from '@react-navigation/native';
import { Button, View, Text, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import RNBounceable from "@freakycoder/react-native-bounceable";
import React, { } from 'react';
import auth from '@react-native-firebase/auth';

import storage from '@react-native-firebase/storage';



const PostsScreen = ({ navigation }, props) => {


    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [filter, setFilter] = useState('Start')
    const [isLoading, setIsLoading] = useState(false)

    async function fetchSubjects() {    
        if (filter == 'Mine') {
            setIsLoading(true);
            userdata = []
            const querySnapshot = await firestore().collection("post").get();
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                userdata.push({
                    phone_model: doc.data().phone_model,
                    company: doc.data().company,
                    additional_info: doc.data().additional_info,
                    photo: doc.data().photo,
                    user: doc.data().user,
                    wear: doc.data().wear,
                    id: doc.id
                });
            });

            setPosts(userdata);
            setIsLoading(false)
        }
        else if (filter == 'All') {
            setIsLoading(true);
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
            setMyPosts(userdata);
            setIsLoading(false)
        }
        else if (filter == 'Start') {
            setIsLoading(true);
            userdata = []
            const querySnapshot = await firestore().collection("post").get();
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                userdata.push({
                    phone_model: doc.data().phone_model,
                    company: doc.data().company,
                    additional_info: doc.data().additional_info,
                    photo: doc.data().photo,
                    user: doc.data().user,
                    wear: doc.data().wear,
                    id: doc.id
                });
            });
            setFilter("All")
            setPosts(userdata);
            setIsLoading(false)
        }
    }

    useEffect(() => { fetchSubjects() }, [])



    const filterHandler = () => {

        if (filter == 'Mine') {
            console.log("test")
            setFilter("All")
            fetchSubjects()
        }
        else if (filter == 'All') {
            console.log("testa")
            setFilter("Mine")
            fetchSubjects()
        }


    }
    const manageHandler = (navigation, posts) => {
        navigation.navigate('ManageScreen', {
          allData: posts
      
        })
      }

    const pressHandler = (navigation) => {
        navigation.navigate('CreatePostScreen')
    }
    const pressPostHandler = (item, navigation) => {
        navigation.navigate('PostInfo', {
            info: item

        })
    }
    if (isLoading == true){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><ActivityIndicator/></View>
        )
    }

    return (
        <View style={{ height: "100%", paddingTop: 10}}>
            <ScrollView>

                {posts.map(item =>
                    <View style={styles.container}>
                        <Image source={{uri: item.photo}} resizeMode='contain' style={styles.previewImage} />
                        
                        <Text style={styles.baseText} 
                            onPress={() => pressPostHandler(item, navigation)}
                             >
                            {item.phone_model}
                        </Text>
                    </View>
                )}

            </ScrollView>
            <RNBounceable style={styles.addBtn} onPress={() => pressHandler(navigation)}>
                <Text style={styles.btnText}>+</Text>
            </RNBounceable>
            <RNBounceable style={styles.filterBtn} onPress={() => filterHandler()}>
                <Text style={styles.filterbtnText}>{filter}</Text>
            </RNBounceable>
            <RNBounceable style={styles.manageBtn} onPress={() => manageHandler(navigation, myPosts)}>
                <Text style={styles.filterbtnText}>Edit</Text>
            </RNBounceable>
        </View>
    );
}

export default PostsScreen

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
        width: 70,
        borderRadius: 100,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        marginRight: 20,
        top: "17%",
        left: "80%"


    },
    filterBtn: {
        position: "absolute",
        width: 70,
        borderRadius: 100,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        marginRight: 20,
        top: "5%",
        left: "80%"


    },
    manageBtn: {
        position: "absolute",
        width: 70,
        borderRadius: 100,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        marginRight: 20,
        top: "29%",
        left: "80%"


    },
    btnText: {
        fontSize: 50,
        fontWeight: "bold"
    },
    filterbtnText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    previewImage: {
        width: '80%',
        height: '80%',
        
      }

});