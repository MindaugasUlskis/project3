
import React, { useState, useEffect, } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
} from "react-native";
import { useRoute, } from '@react-navigation/native';
import { PrivateValueStore } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePick from '../funct/ImagePick';





const EditScreen = ({ navigation }) => {
    const route = useRoute();
    const [model, setModel] = useState(route.params.info.phone_model);
    const [company, setCompany] = useState(route.params.info.company);
    const [wear, setWear] = useState(route.params.info.wear);
    const [additional_info, setAdditional_info] = useState(route.params.info.additional_info);


    const [uploading, setUploading] = useState(false);

    const [images, setImages] = useState();
    const [imagePicked, setImagePicked] = useState(0)

    const selectImage = () => {

        let options = {
            maxWidth: 800,
            maxHeight: 800,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
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
                setImagePicked(1)
            }
        });

    };


    const upload = async () => {
        if (imagePicked == 1) {
            const uri = images;
            const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;
            firestore()
                .collection('post')
                .doc(route.params.info.id)
                .update({
                    phone_model: model,
                    company: company,
                    wear: wear,
                    additional_info: additional_info,
                    photo: uploadUri,
                })
                .then(() => {
                    console.log('Post updated!');
                });

        }
        else {
            firestore()
                .collection('post')
                .doc(route.params.info.id)
                .update({
                    phone_model: model,
                    company: company,
                    wear: wear,
                    additional_info: additional_info,
                })
                .then(() => {
                    console.log('Post updated!');
                });
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ isStatic: true, uri: 'file///data/user/0/com.project3_v2/cache/rn_image_picker_lib_temp_0ac760b7-106c-4300-88a4-e526ba92ef22.jpg' }} resizeMode='contain' style={styles.previewImage} />
            </View>



            <RNBounceable style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={route.params.info.phone_model}
                    placeholderTextColor="#003f5c"
                    onChangeText={(value) => setModel(value)}
                />
            </RNBounceable>

            <RNBounceable style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={route.params.info.company}
                    placeholderTextColor="#003f5c"

                    onChangeText={(value) => setCompany(value)}
                />
            </RNBounceable>
            <RNBounceable style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={route.params.info.wear}
                    placeholderTextColor="#003f5c"

                    onChangeText={(value) => setWear(value)}
                />
            </RNBounceable>
            <RNBounceable style={styles.inputViewField}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={route.params.info.additional_info}
                    placeholderTextColor="#003f5c"

                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(value) => setAdditional_info(value)}
                />

            </RNBounceable>
            <RNBounceable style={styles.addBtn} onPress={selectImage}>
                <Text style={styles.loginText}>Add a photo!</Text>
            </RNBounceable>
            <RNBounceable style={styles.addBtn} onPress={() => upload()}>
                <Text >POST!</Text>
            </RNBounceable>



        </View>

    );



}
export default EditScreen





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
        backgroundColor: "#CC00CC",
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
        borderColor: "#CC00CC",
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
        backgroundColor: "#CC00CC",

    },
    imageContainer: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 130,
        marginHorizontal: '10%',
        marginBottom: 20


    },
    previewImage: {
        width: '100%',
        height: '100%',
    }

});