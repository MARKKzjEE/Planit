import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, TouchableOpacityBase, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as constants from '../constants/constants';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const firebase = require("firebase");
require("@firebase/firestore");

export default function ProfileScreen({navigation, route})  {

    const [images, setImages] = useState([{
        id: "",
        url: ""
    }])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState("")

    const signOutUser = () => {
        firebase.auth().signOut();
    };

    const changeScreen = (estado) => {
        navigation.navigate('editProfile');
    };

    const refreshScreen = () => {
        loadInfo()
        loadImages()
        console.log("ELLA ME LLAMA")
    };
    
    /* 1. Cargar imágenes desde la DB */
    const loadImages = async () => {
        
        firebase.firestore()
            .collection('gallery').where('uid', '==', firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if(!snapshot.empty){
                    snapshot.forEach(doc => {
                        setImages(images => [...images, doc.data()])
                        setImagesId(imagesId => [...imagesId, doc.id])
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const loadInfo = async () => {
        firebase.firestore()
        .collection("users").doc(firebase.auth().currentUser.uid).get()
        .then(doc => {
            setName(doc.data().name)
            setDescription(doc.data().description)
            setAvatar(doc.data().avatar)
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    useEffect(() => {
        console.log("HOLA")
        console.log(navigation)
        loadInfo()
    }, []);
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container2}>
                <View style={styles.header}>
                    <TouchableOpacity>   
                    </TouchableOpacity>
                    <Text style={{fontWeight: "700"}}>Perfil</Text>
                    <TouchableOpacity onPress={changeScreen}>
                        <Ionicons name="md-brush" size={23} color={constants.CORP_PINK}></Ionicons>
                    </TouchableOpacity> 
                </View>
            </SafeAreaView>

            <View style={styles.personalContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.nameContainer}>{name}</Text>
                    <View style={styles.descriptionInputView}>
                        <Text style={{fontWeight: "700"}}>Sobre mí...</Text>
                        <Text style={styles.descriptionInput}
                            multiline={true}
                            numberOfLines={5}>
                            {description}
                        </Text>
                    </View>
                </View>
                <View style={styles.avatarContainer}>
                    {avatar !== "" &&
                    <Image source={{ uri: avatar }} style={styles.avatar}></Image>
                    }
                    <TouchableOpacity onPress={signOutUser} style={styles.editarAvatar}>
                        <Text style={{padding: 10, color: "white"}}>Desconectar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.imagesContainer}>
                {images.length > 0  && images.map(item => 
                    <Image style={styles.image} key={item.id} source={{uri: item.url}}></Image>
                && item.url != "")}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1
    },
    container2: {
      flex: 1,
      maxHeight: 75
    },
    header: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: constants.CORP_GREY,  
    },
    personalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        maxHeight: 200,
        marginHorizontal: 20,
        marginVertical: 20,
        marginLeft: 50
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: "column",
        height: 200,
    },
    nameContainer: {
        height: 50, 
        fontSize: 20, 
        fontWeight: "700",
    },
    avatarContainer: {
        marginTop: 10,
        alignItems: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 25,
    },
    editarAvatar: {
        justifyContent: "center",  
        textDecorationLine: "underline", 
        marginTop: 10,
        fontWeight: "700",
        height: 25,
        backgroundColor: "grey",
        borderRadius: 10
    },
    descriptionInputView: {
        borderWidth: 0,
        height: 125,
        width: 200,
        borderRadius: 20,
        borderColor: constants.CORP_GREY,
    },
    descriptionInput: {
        marginVertical: 10
    },

    imagesContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: "row"
    },
    image: {
        height: 125,
        width: 125,
        marginRight: 10
    },
    mdImages: {
        alignItems: "flex-end",
        marginHorizontal: 20,
        marginBottom: 20,
    }
})