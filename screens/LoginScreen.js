import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

  state={
    email:"",
    password:"",
    errorMessage: null
  }

  changeScreen = () => {
    this.props.navigation.navigate('Register');
  }

  handleLogin = () => {
    const {email, password} = this.state

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({errorMessage: error.message}));
  }

    render(){
        return (
          <View style={styles.container}>
            
            <Text style={styles.logo}>PLANIT</Text>

            <View style={styles.errorMsg}>
              {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>
            
            <View style={styles.inputView}>
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

            <TouchableOpacity>
              <Text style={{color:"#fa526c", fontSize:15}}>Olvidaste la constraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.LoginBtn} onPress={this.handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity> 
            
            <TouchableOpacity style={{alignSelf:"center", marginTop:25}} onPress={this.changeScreen}>
              <Text style={{color:"grey", fontSize:15}}>
                Nuevo en Planit? <Text style={{fontWeight:"500", color:"#fa526c"}}> Regístrate</Text> 
              </Text>
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
logo: {
  fontWeight:"bold",
  fontSize:50,
  color: '#fa526c',
},
errorMsg: {
  height:50,
  marginHorizontal:30
},
error: {
  fontWeight:"600",
  fontSize:13,
  color: "red",
  textDecorationLine: 'underline'
},
inputView: {
  width: "85%",
  marginBottom: 25
},
inputText: {
  height: 50,
  color: 'grey',
  borderBottomColor: 'black',
  borderBottomWidth: StyleSheet.hairlineWidth,
  fontSize: 17,
  marginBottom: 15
},
LoginBtn: {
  width: "75%",
  backgroundColor: '#fa526c',
  borderRadius:4,
  height:50,
  alignItems:"center",
  justifyContent:"center",
  marginTop:40
},
buttonText: {
  color: "white"
},
buttonsView: {
  flexDirection: 'row',
  justifyContent: 'space-between'
}
});