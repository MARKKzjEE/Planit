import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation } from 'react-native';

import * as firebase from 'firebase'

export default class HomeScreen extends React.Component {
    
  state = {
    email: "",
    displayName: ""
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName});
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };
  
  componentWillUnmount(){}

  render(){

        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
              <Text>Hola {this.state.email}!</Text>

              <TouchableOpacity style={{marginTop:32}} onPress={this.signOutUser}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});