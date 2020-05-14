import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as constants from '../constants/constants'
import firebase from 'firebase'

export default function HomeScreen() {
  
  return (
    <View style={styles.container}>
      <Text>EN CONSTRUCCIÓN!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});