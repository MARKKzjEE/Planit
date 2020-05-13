import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, LayoutAnimation, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import * as constants from '../constants/constants'

import * as firebase from 'firebase';
import Fire from '../Fire'

import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker';

export default function RegisterScreen({navigation}) {

  const [regUser, setRegUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null
  })

  const handlePickAvatar = async () => {

    UserPermissions.getPhotoPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    }); 
    if(!result.cancelled) {
        setRegUser({ regUser: {...regUser, avatar: result.uri }});
    }
  }

  const handleSignUp = () => {
    Fire.shared.createUser(regUser)
  }

  LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <StatusBar hidden></StatusBar>
        <TouchableOpacity style={styles.back} onPress={ () => navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" size={32} color={constants.CORP_PINK}></Ionicons>
        </TouchableOpacity>
        
        <View style={{position:"absolute", top:80, alignItems:"center", width: "100%"}}>
          <Text style={styles.logo}>Regístrate para empezar!</Text>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={handlePickAvatar}>
            <Image source={{uri: regUser.avatar}} style={styles.avatar}></Image>
            <Ionicons
              name="ios-add"
              size={75}
              color="white">
            </Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.inputView}>
        <TextInput
            style={styles.inputText}
            placeholder="Nombre Completo..."
            autoCapitalize="none"
            placeholderTextColor= "grey"
            onChangeText={name => setRegUser({...regUser, name})}
            value={regUser.name}>
          </TextInput>

          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            autoCapitalize="none"
            placeholderTextColor= "grey"
            onChangeText={email => setRegUser({...regUser, email})}
            value={regUser.email}>
          </TextInput>

          <TextInput
            secureTextEntry
            autoCapitalize="none"
            style={styles.inputText}
            placeholder="Contraseña..."
            placeholderTextColor= "grey"
            onChangeText={password => setRegUser({...regUser, password})}
            value={regUser.password}>
          </TextInput>
        </View>

        <TouchableOpacity style={styles.LoginBtn} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Completar</Text>
        </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: "white"
},
back: {
  position:"absolute",
  top:30,
  left:32,
  width:32,
  height:32,
  alignItems:"center",
  justifyContent:"center"
},
avatarPlaceholder: {
  width:100,
  height:100,
  borderRadius:50,
  backgroundColor:constants.CORP_GREY,
  marginTop: 15,
  justifyContent:"center",
  alignItems:"center"
},
avatar: {
  position: "absolute",
  width:100,
  height:100,
  borderRadius:50,
},
logo: {
  fontWeight:"bold",
  fontSize:25,
  color: constants.CORP_PINK,
},
inputView: {
  width: "85%",
  marginBottom: 30,
  marginTop: 100
},
inputText: {
  height: 50,
  color: 'grey',
  borderBottomColor: 'black',
  borderBottomWidth: StyleSheet.hairlineWidth,
  fontSize: 17,
  marginBottom: 15,
  borderBottomWidth: 1,
  borderBottomColor: constants.CORP_GREY
},
LoginBtn: {
  width: "75%",
  backgroundColor: '#fa526c',
  borderRadius:4,
  height:50,
  alignItems:"center",
  justifyContent:"center"
},
buttonText: {
  color: "white"
},
buttonsView: {
  flexDirection: 'row',
  justifyContent: 'space-between'
}
});