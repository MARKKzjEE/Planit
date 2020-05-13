import React from 'react';
import { StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
import { useEffect } from 'react';

export default function LoadingScreen({navigation}) {

  React.useEffect(() => {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        navigation.navigate(user ? "App" : "Auth")
      })
    }, 1000)
  }, []);

  return (
    <ImageBackground
      style={styles.splashIMG}
      source={require('../assets/splash.png')}>
        <ActivityIndicator
          size="large"
          color="white"
          style={{marginTop:350}}>
        </ActivityIndicator>  
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashIMG: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  }
});