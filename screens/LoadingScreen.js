import React from 'react';
import { StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import firebase from 'firebase';
import Fire from '../Fire'

export default class LoadingScreen extends React.Component {

  state = {
    isReady: false,
    isReady2: false,
  };

 componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "App" : "Auth")
    })
  }

  render(){
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      ); 
    }
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

  async _cacheResourcesAsync() {
    const images = [require('../assets/splash.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }
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