import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class PostScreen extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <Text> Post Screen</Text>
            </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
