import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as constants from '../constants/constants';

import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker';

import Fire from '../Fire';

const firebase = require("firebase");
require("@firebase/firestore");

export default class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            name: this.props.navigation.state.params.name,
            pickAvatar: false,
            avatar: this.props.navigation.state.params.avatar,
            description: this.props.navigation.state.params.description
        }
    }

    componentDidMount() {
        UserPermissions.getPhotoPermission();
    }

    componentWillUnmount() {}

    /* 2.Escoger imagen de galería nativa y cargarla en la DB */
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        if(!result.cancelled) {
            Fire.shared
                .addImage(result.uri)
                .then( () => {
                    Alert.alert("Imagen subida. Confirma los cambios.");
                    //this.setState({ image: result.uri});
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
            this.setState({pickAvatar: true, avatar: result.uri})
        }
    };

    /* 4.Actualizar información editada en la base de datos.*/
    handleEdit = () => {
        Fire.shared
            .updateAvatarAndInfo(this.state.pickAvatar, this.state.avatar, this.state.description)
            .then( () => {
                console.log("Perfil actualizado")
                this.props.navigation.goBack()
            })
            .catch((error) => {
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
                                onPress={this.handleEdit}>
                                </Ionicons>
                        </TouchableOpacity> 
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={styles.personalContainer}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.nameContainer}>{this.state.name}</Text>
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
                        <Image source={{uri: this.state.avatar}} style={styles.avatar}></Image>
                        <Text style={styles.editarAvatar}>
                            Cambiar
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
        color: constants.CORP_PINK, 
        textDecorationLine: "underline", 
        marginTop: 10,
        fontWeight: "700"
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
        borderRadius: 20,
    }
})
