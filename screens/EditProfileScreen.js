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
        description: "",
        age: null,
        city: "",
        avatar : ""
    }

    componentDidMount() {
        this.getPhotoPermission();
    }

    componentWillUnmount() {}

    /* 1.Pedir permiso nativo para acceder a galeria (iOS y Android) */
    getPhotoPermission = async () => {
        if(Constants.platform.ios || Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status != "granted") {
                Alert.alert("La aplicación necesita permiso para acceder a tu Galería.")
            }
        }
    };

    /* 2.Escoger imagen de galería nativa y cargarla en la DB */
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if(!result.cancelled) {
            Fire.shared
                .addImage(result.uri, 'photos')
                .then( () => {
                    Alert.alert("Imagen subida. Confirma los cambios.");
                    this.setState({ image: result.uri});
                })
                .catch((error) => {
                    Alert.alert("Error al subir la imagen. Intentálo de nuevo.")
                    console.log(error)
                });
        }
    };

    /* 3.Escoger imagen de galería nativa */
    pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        
        if(!result.cancelled) {
            this.setState({avatar: result.uri})
        }
    };

    /* 4.Actualizar información editada en la base de datos.*/
    handleEdit = () => {
        Fire.shared
            .updateAvatarAndInfo(this.state.avatar, this.state.description, 'avatars')
            .then( () => {
                Alert.alert("Avatar actualizado");
            })
            .catch((error) => {
                Alert.alert("Error al actualizar el avatar")
                console.log(error)
            });
    }

    render(){
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.headerContainer}>
                    <TouchableOpacity onPress={this.pickAvatar} style={styles.header}>
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
                            <Ionicons 
                                name="md-checkbox" 
                                size={23} 
                                color={constants.CORP_PINK}
                                onPress={ () => this.props.navigation.goBack() }>
                                </Ionicons>
                        </TouchableOpacity> 
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress={this.pickAvatar} style={styles.avatarContainer}>
                            <Image
                                source={{uri: this.state.avatar}} 
                                style={styles.avatar}>
                            </Image>
                        
                        <Text style={{color: constants.CORP_PINK, textDecorationLine: "underline", marginTop: 10}}>
                            Editar Avatar
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.pickImage} style={styles.mdImages}>
                    <Ionicons 
                        name="md-images" 
                        size={80} 
                        color={constants.CORP_PINK}>
                    </Ionicons>
                    <Text style={{fontWeight:"700",color:constants.CORP_PINK}}>Añade las fotos que más te gusten!</Text>
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
        marginTop: 10
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
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 50,
        borderWidth: 1,
        borderColor: constants.CORP_GREY,
        borderRadius: 20
    }
})
