import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as constants from '../constants/constants'

export default function NotificationScreen() {

    return (
        <View style={styles.container}>
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
    container2:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
