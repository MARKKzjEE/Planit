import React, { useState, useEffect, useMemo } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons } from '@expo/vector-icons'

import LoadingScreen from  './screens/LoadingScreen'
import RegisterScreen from  './screens/RegisterScreen'
import HomeScreen from  './screens/HomeScreen'
import LoginScreen from  './screens/LoginScreen'
import ListPlans from './screens/ListPlans'
import NotificationsScreen from './screens/NotificationScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
import EditProfileScreen from './screens/EditProfileScreen'

import * as constants from './constants/constants'
import Fire from './Fire'
import Firetimerbug from './firetimerbug'
import firebase from 'firebase';

const RootStack = createStackNavigator();

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

const AppContainer = createStackNavigator();
const AppContainerScreens = () => (
  <AppContainer.Navigator headerMode="none">
    <AppContainer.Screen name="Home" component={MainTabScreens}/>
  </AppContainer.Navigator>
);

const ProfileStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const MainTabScreens = () => (
  <MainTab.Navigator initialRouteName="Home">
    <MainTab.Screen
      name="Home" 
      component={HomeScreen} 
      options={{tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>}}>
    </MainTab.Screen>
    <MainTab.Screen
      name="ListPlans" 
      component={ListPlans} 
      options={{tabBarIcon: ({ tintColor }) => <Ionicons name="md-hourglass" size={24} color={tintColor}></Ionicons>}}>
    </MainTab.Screen>
    <MainTab.Screen
      name="Post" 
      component={PostScreen} 
      options={{tabBarIcon: ({ tintColor }) => 
        <Ionicons 
          name="ios-add-circle" 
          size={48} 
          color={tintColor} 
          style={{shadowOffset: {width:0, height:0}}}>
        </Ionicons>}}>
    </MainTab.Screen>
    <MainTab.Screen
      name="Profile" 
      component={ProfileScreen} 
      options={{tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>}}>
    </MainTab.Screen>
    <MainTab.Screen
      name="Settings" 
      component={SettingsScreen} 
      options={{tabBarIcon: ({ tintColor }) => <Ionicons name="md-settings" size={24} color={tintColor}></Ionicons>}}>
    </MainTab.Screen>
  </MainTab.Navigator>
);

export default () => {
  return(
  <NavigationContainer>
  <RootStack.Navigator headerMode="none" initialRouteName="Loading">
    <RootStack.Screen name="Loading" component={LoadingScreen}/>
    <RootStack.Screen name="App" component={AppContainerScreens}/>
    <RootStack.Screen name="Auth" component={AuthStackScreens}/>
  </RootStack.Navigator>
  </NavigationContainer>
  );
};