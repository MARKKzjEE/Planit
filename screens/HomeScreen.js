import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as constants from '../constants/constants'
import firebase from 'firebase'

export default function HomeScreen() {
  
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")

  /*
  <SafeAreaView style={styles.container2}>
          <View style={styles.header}>
              <TouchableOpacity>   
              </TouchableOpacity>
              <Text style={{fontWeight: "700"}}>Inicio</Text>
              <TouchableOpacity>
              </TouchableOpacity>
          </View>
        </SafeAreaView>
    */

  LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        
      <View style={styles.container3}>
        <Text>HOLA</Text>
        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text>ADIOS</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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