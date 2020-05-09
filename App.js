import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoadingScreen from  './screens/LoadingScreen'
import RegisterScreen from  './screens/RegisterScreen'
import HomeScreen from  './screens/HomeScreen'
import LoginScreen from  './screens/LoginScreen'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBHk2r2_fEb8QGo46aDRpvJKZB2cgIuC0E",
  authDomain: "planit-3e8a0.firebaseapp.com",
  databaseURL: "https://planit-3e8a0.firebaseio.com",
  projectId: "planit-3e8a0",
  storageBucket: "planit-3e8a0.appspot.com",
  messagingSenderId: "713573869363",
  appId: "1:713573869363:web:9c6a234b5be739d218c046",
  measurementId: "G-702P6PRH1S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: AppStack,
        Auth: AuthStack
      },
      {
        initialRouteName: "Loading"
      }
  )
)
