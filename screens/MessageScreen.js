import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as constants from '../constants/constants'

export default class MessageScreen extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container2}>
                    <View style={styles.header}>
                        <TouchableOpacity>   
                        </TouchableOpacity>
                        <Text style={{fontWeight: "700"}}>Chat</Text>
                        <TouchableOpacity>
                            <Ionicons 
                                name="ios-notifications" 
                                size={25} 
                                color={constants.CORP_PINK}
                            ></Ionicons> 
                        </TouchableOpacity> 
                    </View>
                </SafeAreaView>
            </View>
      );
    }
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1
    },
    container2: {
      flex: 1,
      maxHeight: 75
    },
    header: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: constants.CORP_GREY,
  
    }
})
