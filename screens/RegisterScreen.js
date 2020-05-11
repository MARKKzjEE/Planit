import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import * as constants from '../constants/constants'
import * as firebase from 'firebase';

export default class RegisterScreen extends React.Component {

  state={
    name: "",
    email:"",
    password:"",
    errorMessage: null
  }

  changeScreen = () => {
    this.props.navigation.navigate('Register');
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name
        });
      })
      .catch(error => this.setState({errorMessage: error.message}));
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
              <TouchableOpacity style={styles.avatar}>
                <Ionicons
                  name="ios-add"
                  size={75}
                  color="white">
                </Ionicons>
              </TouchableOpacity>
            </View>

            <View style={styles.errorMsg}>
              {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                placeholder="Nombre Completo..."
                autoCapitalize="none"
                placeholderTextColor= "grey"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}>
              </TextInput>

              <TextInput
                style={styles.inputText}
                placeholder="Email..."
                autoCapitalize="none"
                placeholderTextColor= "grey"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}>
              </TextInput>

              <TextInput
                secureTextEntry
                autoCapitalize="none"
                style={styles.inputText}
                placeholder="Contraseña..."
                placeholderTextColor= "grey"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}>
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
  borderRadius:16,
  backgroundColor:constants.CORP_GREY,
  alignItems:"center",
  justifyContent:"center"
},
avatar: {
  width:100,
  height:100,
  borderRadius:50,
  backgroundColor:constants.CORP_GREY,
  marginTop: 15,
  justifyContent:"center",
  alignItems:"center"
},
logo: {
  fontWeight:"bold",
  fontSize:25,
  color: constants.CORP_PINK,
},
errorMsg: {
  height:50,
  marginHorizontal:30,
  marginTop: 120,
},
error: {
  fontWeight:"600",
  fontSize:13,
  color: "red",
  textDecorationLine: 'underline'
},
inputView: {
  width: "85%",
  marginBottom: 30,
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
  justifyContent:"center",
},
buttonText: {
  color: "white"
},
buttonsView: {
  flexDirection: 'row',
  justifyContent: 'space-between'
}
});