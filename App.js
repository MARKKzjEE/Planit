import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import LoadingScreen from  './screens/LoadingScreen'
import RegisterScreen from  './screens/RegisterScreen'
import HomeScreen from  './screens/HomeScreen'
import LoginScreen from  './screens/LoginScreen'
import MessageScreen from './screens/MessageScreen'
import NotificationScreen from './screens/NotificationScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'


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

// Inicializamos firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
    }
  },
  Message: {
    screen: MessageScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor}></Ionicons>
    }
  },
  Post: {
    screen: PostScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => 
        <Ionicons 
          name="ios-add-circle" 
          size={48} 
          color={tintColor}
          style={{
            shadowOffset: { width: 0, height: 0},
            shadowRadius: 10,
            shadowOpacity: 0.3
          }}>
        </Ionicons>
    }
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor}></Ionicons>
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
    }
  }
},
{
  tabBarOptions: {
    activeTintColor: "#fa526c",
    showLabel: false,
    style: {
      borderTopWidth: 1
    }
  }
}

)

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: '',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }
    }
  }
})

export default createAppContainer(
  createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: AppTabNavigator,
        Auth: AuthStack
      },
      {
        initialRouteName: "Loading"
      }
  )
)
