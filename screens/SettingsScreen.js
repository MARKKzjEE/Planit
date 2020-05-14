import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as constants from '../constants/constants'

export default function SettingsScreen({navigation}) {

    const changeScreen = () => {
        navigation.push('Notifications');
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={changeScreen}>
                <Ionicons 
                    name="ios-notifications" 
                    size={30}
                    color={constants.CORP_PINK}>
                </Ionicons> 
            </TouchableOpacity> 
            <View style={styles.container2}>
                <Text>EN CONSTRUCCIÓN!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
    },
    icon: {
        position:"absolute",
        top:40,
        right:32,
        width:32,
        height:32,
        alignItems:"center",
        justifyContent:"center",
        
    },
    container2:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
