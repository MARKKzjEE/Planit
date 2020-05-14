import React, { useState, useEffect, useMemo } from 'react'

import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
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

/*1. Navegación inicial. Cargas y Control Usuario*/
const Stack = createStackNavigator();
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
/*------------------------------------------------------------------*/

/*2. Contenedor de Tabs y pilas de tabs*/
const AppContainer = createStackNavigator();
const AppContainerScreens = (navigation, route) => {
  
  return (
    <AppContainer.Navigator 
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: constants.CORP_PINK,
        }}>
      <AppContainer.Screen 
        name="Home" 
        component={MainTabScreens}
        options={({route}) => ({
          title:getHeaderTitle(route),
          headerShown: shouldHeaderBeShown(route),
        })}/>
    </AppContainer.Navigator>
    );
}
/*-------------------------------------------------------------------*/

/*3. Pantallas Tab flujo principal*/
const MainTab = createBottomTabNavigator();
const MainTabScreens = ({navigation, route}) => {
  return( 
    <MainTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon:({color,size}) => {
          let iconName
          if(route.name == 'Home'){
            iconName = 'ios-home'
          } 
          else if(route.name == 'ListPlans'){
            iconName = 'md-list-box'
          }
          else if(route.name == 'Post'){
            iconName = 'ios-add-circle'
            size = 48
          }
          else if(route.name == 'Profile'){
            iconName = 'ios-person'
          }
          else if(route.name == 'Settings'){
            iconName = 'ios-settings'
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        },
      })}
      tabBarOptions={{
        activeTintColor: constants.CORP_PINK,
        inactiveTintColor: constants.CORP_GREY,
        showLabel: false,
      }}>

      <MainTab.Screen name="Home" component={HomeScreen}/>
      <MainTab.Screen name="ListPlans" component={ListPlans}/>
      <MainTab.Screen name="Post" component={PostScreen}/>
      <MainTab.Screen name="Profile" component={ProfileStackScreens}/>
      <MainTab.Screen name="Settings" component={SettingsStackScreens}/>

    </MainTab.Navigator>
  );
};
/*---------------------------------------------------------------------*/
/*4. Pilas que salen de tabs*/

/*4.1 Pila Perfil Usuario*/
const ProfileStack = createStackNavigator();
const ProfileStackScreens = ({navigation, route}) => {
  
  if(route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0  ? false : true
    });
  }
  
  return(
    <ProfileStack.Navigator screenOptions={{
      headerTitleAlign: "center",
      headerTintColor: constants.CORP_PINK
    }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
      <ProfileStack.Screen  name="EditProfile" component={EditProfileScreen} options={{title:"Edita Mi Perfil"}}/>
    </ProfileStack.Navigator>
  )
};

/*4.2 Pila Configuración y notificaciones*/
const SettingsStack = createStackNavigator();
const SettingsStackScreens = ({navigation, route}) => {
  
  if(route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0  ? false : true
    });
  }
  
  return(
    <SettingsStack.Navigator screenOptions={{
      headerTitleAlign: "center",
      headerTintColor: constants.CORP_PINK
    }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
      <SettingsStack.Screen name="Notifications" component={NotificationsScreen} options={{title:'Notificaciones'}}/>
    </SettingsStack.Navigator>
  )
};
/*--------------------------------------------------------------------*/

function getHeaderTitle(route){
  const routeName = route.state? route.state.routes[route.state.index].name :'Home';
  switch(routeName){
    case 'Home':
      return 'Inicio';
    case 'ListPlans':
      return 'Planes Activos';
    case 'Post':
      return 'Crea tu Plan!';
    case 'Profile':
      return 'Perfil';
    case 'Settings':
      return 'Configuración';
    case 'EditProfile':
      return 'Edita Mi Perfil';
    case 'Notifications':
      return 'Notificaciones';
  };
};

function shouldHeaderBeShown(route) {
  const routeName = route.state? route.state.routes[route.state.index].name : 'Home';
  switch(routeName) {
    case "Home":
      return false;
    case "ListPlans":
      return false;
    case "Profile":
      return false;
    case "Settings":
      return false;
  } 
};

export default () => {
  return(
  <NavigationContainer>
  <Stack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Loading" component={LoadingScreen}/>
    <Stack.Screen name="Home" component={AppContainerScreens}/>
    <Stack.Screen name="Auth" component={AuthStackScreens}/>
  </Stack.Navigator>
  </NavigationContainer>
  );
};