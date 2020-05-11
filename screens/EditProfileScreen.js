import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
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
        image: null,
        description: "",
        age: null,
        city: ""
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
                <SafeAreaView style={styles.headerContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <Ionicons 
                                name="md-arrow-back" 
                                size={23} 
                                color={constants.CORP_PINK} 
                                onPress={ () => this.props.navigation.goBack() }>
                            </Ionicons>   
                        </TouchableOpacity>
                        <Text style={{fontWeight: "700"}}>Editar Perfil</Text>
                        <TouchableOpacity>
                            <Ionicons name="md-checkbox" size={23} color={constants.CORP_PINK}></Ionicons>
                        </TouchableOpacity> 
                    </View>
                </SafeAreaView>

                <View style={styles.personalContainer}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.nameContainer}>Marc Gallego Gines</Text>
                        <View style={styles.descriptionInputView}>
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Descríbete como quieras que te vean..."
                                placeholderTextColor= "grey"
                                onChangeText={description => this.setState({ description })}
                                value={this.state.description}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={100}
                                >
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image 
                            source={ require("../assets/tempAvatar.jpg")} 
                            style={styles.avatar}>
                        </Image>
                        <Text style={{color: constants.CORP_PINK, textDecorationLine: "underline", marginTop: 10}}>
                            Editar Avatar
                        </Text>
                    </View>
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
    headerContainer: {
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
        marginVertical: 20
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
        marginLeft: 25
    },
    avatarContainer: {
        justifyContent: "flex-start"
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 25,
    },
    descriptionInputView: {
        borderWidth: 1,
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
        marginBottom: 20
    },
    mdImages: {
        alignItems: "flex-end",
        marginHorizontal: 20,
        marginBottom: 20,
    }
})
