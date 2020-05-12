import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, SafeAreaView,  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as firebase from 'firebase'

import * as constants from '../constants/constants'

export default class HomeScreen extends React.Component {
    
  state = {
    email: "",
    displayName: ""
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName});
  }

  componentWillUnmount(){
  }

  render(){

        LayoutAnimation.easeInEaseOut();

        return (
          <View style={styles.container}>
            <SafeAreaView style={styles.container2}>
              <View style={styles.header}>
                  <TouchableOpacity>   
                  </TouchableOpacity>
                  <Text style={{fontWeight: "700"}}>Inicio</Text>
                  <TouchableOpacity>
                  </TouchableOpacity>
              </View>
            </SafeAreaView>
          <View style={styles.container3}>
            <Text>Hola {this.state.email}!</Text>
          </View>
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
  container3: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
});