import React from 'react';
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
        image: null
    }

    componentDidMount() {
        this.getPhotoPermission();
    }

    componentWillUnmount() {}

    getPhotoPermission = async () => {
        if(Constants.platform.ios || Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status != "granted") {
                alert("La aplicación necesita permiso para acceder a tu Galería.")
            }
        }
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if(!result.cancelled) {
            Fire.shared
                .addPost(result.uri)
            .then( () => {
                Alert.alert("Imagen subida");
                this.setState({ image: result.uri});
            })
            .catch((error) => {
                Alert.alert("Error al subir la imagen")
                console.log(error)
            });
        }
    };

    render(){
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container2}>
                    <View style={styles.header}>
                        <TouchableOpacity>   
                        </TouchableOpacity>
                        <Text style={{fontWeight: "700"}}>Perfil</Text>
                        <TouchableOpacity>
                            <Text style={{color: constants.CORP_PINK, fontWeight: "700"}}>Editar</Text>
                        </TouchableOpacity> 
                    </View>
                </SafeAreaView>

                <View style={styles.personalContainer}>
                    <Text style={{fontSize: 20, fontWeight: "700"}}>Marc Gallego Gines</Text>
                    <Image 
                        source={ require("../assets/tempAvatar.jpg")} 
                        style={styles.avatar}>
                    </Image>
                </View>

                <View style={styles.imagesContainer}>
                    <Image source={{uri: this.state.image}} style={{height:100, width: 100}}></Image>
                </View>

                <TouchableOpacity onPress={this.pickImage} style={styles.mdImages}>
                    <Ionicons 
                        name="md-images" 
                        size={45} 
                        color={constants.CORP_PINK}>
                    </Ionicons>
                </TouchableOpacity>
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
        margin: 32,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 25,
    },
    imagesContainer: {
        flex: 1,
        marginHorizontal: 32,
        marginBottom: 20,
        height: 150
    },
    mdImages: {
        alignItems: "flex-end",
        marginHorizontal: 40,
        marginBottom: 20,
    }
})
