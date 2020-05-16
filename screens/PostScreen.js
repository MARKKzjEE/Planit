import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';

import * as constants from '../constants/constants'

export default function PostScreen() {

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
              <TextInput style={styles.name}>

              </TextInput>
              <TextInput style={styles.description}>

              </TextInput>
            
          </ScrollView>
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: Constants.statusBarHeight,
        },
        scrollView: {
          marginHorizontal: 20,
        },
        text: {
          fontSize: 42,
        },
      });