import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, TouchableOpacityBase, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as constants from '../constants/constants';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const firebase = require("firebase");
require("@firebase/firestore");

export default function ProfileScreen({navigation, route})  {

    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState("")

    useEffect(() => {
        //refreshScreen();
        loadInfo();
        loadImages();
    },[]);

    const signOutUser = () => {
        setName("")
        setDescription("")
        setAvatar("")
        setImages(null)
        firebase.auth().signOut();
    };

    const refreshScreen = () => {
        loadInfo()
        loadImages()
    };
    
    /* 1. Cargar imágenes desde la DB */
    const loadImages = async () => {
        setImages([]);
        firebase.firestore()
            .collection('gallery').where('uid', '==', firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if(!snapshot.empty){
                    snapshot.forEach(doc => {
                        setImages([...images, doc.data()])
                    });
                }
                console.log("Query imagenes: ", images);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const loadInfo = async () => {
        firebase.firestore()
        .collection("users").doc(firebase.auth().currentUser.uid).get()
        .then(doc => {
            setName(doc.data().name);
            setDescription(doc.data().description);
            setAvatar(doc.data().avatar);
            console.log("UID :", firebase.auth().currentUser.uid);
            console.log("Query doc: ", doc.data());
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={() => {
                        navigation.push('EditProfile', {
                            name1: name,
                            description1: description,
                            avatar1: avatar
                        });
            }}>
                <Ionicons name="md-brush" size={30} color={constants.CORP_PINK}></Ionicons>
            </TouchableOpacity> 

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
                    <TouchableOpacity onPress={signOutUser} style={styles.desconectar}>
                        <Text style={{padding: 10, color: "white"}}>Desconectar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.imagesContainer}>
                {images && images.map((item, i) => 
                    <Image style={styles.image} key={i} source={{uri: item.image}}></Image>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1
    },
    icon: {
        position:"absolute",
        top:40,
        right:32,
        width:32,
        height:32,
        alignItems:"center",
        justifyContent:"center",
        
    },
    personalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        maxHeight: 200,
        marginTop: 80
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: "column",
        height: 200,
        marginLeft: 30,
    },
    nameContainer: {
        height: 50, 
        fontSize: 20, 
        fontWeight: "700",
    },
    avatarContainer: {
        marginTop: 10,
        alignItems: "center",
        marginHorizontal: 20,
        marginRight: 50
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 25,
    },
    desconectar: {
        justifyContent: "center",  
        marginTop: 10,
        fontWeight: "700",
        height: 25,
        borderRadius: 10,
        backgroundColor: constants.CORP_GREY
    },
    descriptionInputView: {
        height: "100%",
        width: 200,
        borderRadius: 20,
        flex: 1
    },
    descriptionInput: {
        marginVertical: 10,
        height: "100%",
        flex: 1
    },

    imagesContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: "row",
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