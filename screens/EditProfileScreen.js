import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as constants from '../constants/constants';

import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker';

import Fire from '../Fire';

export default function EditProfileScreen({navigation, route}) {

    navigation.setOptions({
        headerRight:() => (
            <TouchableOpacity style={{marginRight: 20}}>
                <Ionicons 
                    name="md-checkbox" 
                    size={30} 
                    color={constants.CORP_PINK}
                    onPress={handleEdit}>
                </Ionicons>
            </TouchableOpacity>
        ),
    }, []);

    const [name, setName] = useState(route.params.name)
    const [avatar, setAvatar] = useState(route.params.avatar)
    const [avatarChange, setAvatarChange] = useState(false)
    const [description, setDescription] = useState(route.params.description)

    /* 2.Escoger imagen de galería nativa y cargarla en la DB */
    const pickImage = async () => {
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
                })
                .catch((error) => {
                    Alert.alert("Error al subir la imagen. Intentálo de nuevo.")
                    console.log(error)
                });
        }
    };

    /* 3.Escoger imagen de galería nativa */
    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });
        
        if(!result.cancelled) {
            setAvatar(result.uri)
            setAvatarChange(true)
        }
    };

    /* 4.Actualizar información editada en la base de datos.*/
    const handleEdit = () => {
        Fire.shared
            .updateAvatarAndInfo(avatarChange, avatar, description)
            .then( () => {
                console.log("Perfil actualizado")
                navigation.goBack()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <View style={styles.container}>
            {console.log("RENDERIZO EDITPROFILE")}
            <View style={styles.personalContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.nameContainer}>{name}</Text>
                    <View style={styles.descriptionInputView}>
                        <TextInput
                            style={styles.descriptionInput}
                            placeholder="Descríbete como quieras que te vean..."
                            placeholderTextColor= "grey"
                            onChangeText={description => setDescription(description)}
                            value={description}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={100}
                            >
                        </TextInput>
                    </View>
                </View>
                <TouchableOpacity onPress={pickAvatar} style={styles.avatarContainer}>
                    {avatar !== "" &&
                        <Image source={{ uri: avatar }} style={styles.avatar}></Image>
                    }
                    <Text style={styles.editarAvatar}>
                        Cambiar
                    </Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={pickImage} style={styles.mdImages}>
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

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
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
        width: "90%",
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
