import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import firebase from 'firebase'

export default function LoadingScreen() {
  
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