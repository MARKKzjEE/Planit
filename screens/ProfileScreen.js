import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, TouchableOpacityBase, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as constants from '../constants/constants';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import Fire from '../Fire';

const firebase = require("firebase");
require("@firebase/firestore");

export default class PostScreen extends React.Component {

    state = {
        images: []
    }

    changeScreen = () => {
        this.props.navigation.navigate('editProfile');
      }

    componentDidMount() {
        this.loadImages();
    }
    
    /* 1. Cargar imágenes desde la DB */
    loadImages = async () => {
        firebase.firestore()
            .collection('posts').where('uid', '==', firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    this.setState({
                        images: this.state.images.concat([{url: doc.data().image, idImg: doc.id}])
                    });
                });
            })
    };

    render(){

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container2}>
                    <View style={styles.header}>
                        <TouchableOpacity>   
                        </TouchableOpacity>
                        <Text style={{fontWeight: "700"}}>Perfil</Text>
                        <TouchableOpacity onPress={this.changeScreen}>
                            <Ionicons name="md-brush" size={23} color={constants.CORP_PINK}></Ionicons>
                        </TouchableOpacity> 
                    </View>
                </SafeAreaView>

                <View style={styles.personalContainer}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.nameContainer}>Marc Gallego Gines</Text>
                        <View style={styles.descriptionInputView}>
                            <Text style={{fontWeight: "700"}}>Sobre mí...</Text>
                            <Text>HOLAHOLAHOLA</Text>
                            </View>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={ require("../assets/tempAvatar.jpg")} 
                            style={styles.avatar}>
                        </Image>
                    </View>
                </View>

                <View style={styles.imagesContainer}>
                    {this.state.images  && this.state.images.map(item => 
                        <Image style={styles.image} key={item.idImg} source={{uri: item.url}}></Image>
                    )}
                </View>
            </View>
      );
    }
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
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 25,
    },
    descriptionInputView: {
        borderWidth: 0,
        height: 125,
        width: 250,
        borderRadius: 20,
        borderColor: constants.CORP_GREY,
    },
    descriptionInput: {
        marginHorizontal: 20,
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