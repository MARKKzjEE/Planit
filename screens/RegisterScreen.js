import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, LayoutAnimation, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import * as constants from '../constants/constants'

import * as firebase from 'firebase';
import Fire from '../Fire'

import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker';

export default class RegisterScreen extends React.Component {

  state={
    regUser: {
      name: "",
      email:"",
      password:"",
      avatar: null
    }
  }

  handlePickAvatar = async () => {

    UserPermissions.getPhotoPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    }); 
    if(!result.cancelled) {
        this.setState({ regUser: {...this.state.regUser, avatar: result.uri }});
    }
  }

  handleSignUp = () => {
    Fire.shared.createUser(this.state.regUser)
  }

    render(){
      LayoutAnimation.easeInEaseOut();
        return (
          <View style={styles.container}>
            <StatusBar hidden></StatusBar>
            <TouchableOpacity style={styles.back} onPress={ () => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-round-back" size={32} color={constants.CORP_PINK}></Ionicons>
            </TouchableOpacity>
            
            <View style={{position:"absolute", top:80, alignItems:"center", width: "100%"}}>
              <Text style={styles.logo}>Regístrate para empezar!</Text>
              <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                <Image source={{uri: this.state.regUser.avatar}} style={styles.avatar}></Image>
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
                onChangeText={name => this.setState({ regUser: {...this.state.regUser, name} })}
                value={this.state.regUser.name}>
              </TextInput>

              <TextInput
                style={styles.inputText}
                placeholder="Email..."
                autoCapitalize="none"
                placeholderTextColor= "grey"
                onChangeText={email => this.setState({ regUser: {...this.state.regUser, email} })}
                value={this.state.regUser.email}>
              </TextInput>

              <TextInput
                secureTextEntry
                autoCapitalize="none"
                style={styles.inputText}
                placeholder="Contraseña..."
                placeholderTextColor= "grey"
                onChangeText={password => this.setState({ regUser: {...this.state.regUser, password} })}
                value={this.state.regUser.password}>
              </TextInput>
            </View>

            <TouchableOpacity style={styles.LoginBtn} onPress={this.handleSignUp}>
              <Text style={styles.buttonText}>Completar</Text>
            </TouchableOpacity> 
        </View>
      );
  }
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