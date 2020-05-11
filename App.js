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
import SettingsScreen from './screens/SettingsScreen'
import EditProfileScreen from './screens/EditProfileScreen'

import * as constants from './constants/constants'

import Fire from './Fire'

import Firetimerbug from './firetimerbug'

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator({
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
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
        }
      },
      Notification: {
        screen: SettingsScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Ionicons name="md-settings" size={24} color={tintColor}></Ionicons>
        }
      }
      
    },
    {
      defaultNavigationOptions: {
        tabBarOnPress: ({navigation, defaultHandler}) => {
          if(navigation.state.key === "Post"){
            navigation.navigate("postModal")
          }
          else {
            defaultHandler()
          }
        }
      },
      tabBarOptions: {
        activeTintColor: constants.CORP_PINK,
        showLabel: false,
        style: {
          borderTopWidth: 1
        }
      }
    }),
    postModal: {
      screen: PostScreen
    },
    
    editProfile: {
      screen: EditProfileScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
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
      headerShown: false
    }
  }
})

export default createAppContainer(
  createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: AppContainer,
        Auth: AuthStack
      },
      {
        initialRouteName: "Loading"
      }
  )
)
