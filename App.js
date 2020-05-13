import React, { useState, useEffect } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons } from '@expo/vector-icons'

import LoadingScreen from  './screens/LoadingScreen'
import RegisterScreen from  './screens/RegisterScreen'
import HomeScreen from  './screens/HomeScreen'
import LoginScreen from  './screens/LoginScreen'
import MessageScreen from './screens/MessageScreen'
import NotificationScreen from './screens/NotificationScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
import EditProfileScreen from './screens/EditProfileScreen'

import * as constants from './constants/constants'
import Fire from './Fire'
import Firetimerbug from './firetimerbug'
import firebase from 'firebase';



const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}>
    </AuthStack.Screen>
    <AuthStack.Screen
      name="Register"
      component={RegisterScreen}>
    </AuthStack.Screen>
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreens = (isUser) => (
  
  <RootStack.Navigator headerMode="none">
    {console.log(isUser) && isUser ? (
      <RootStack.Screen name="App" component={HomeScreen}/>
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreens}/>
    )}
  </RootStack.Navigator>
);

const ProfileStack = createStackNavigator();

const MainTab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isUser, setUser] = useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          setUser(true)
        }
      })
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen/>
      ) : (
        <RootStackScreens isUser={isUser}/>
      )}
    </NavigationContainer>
  );
};