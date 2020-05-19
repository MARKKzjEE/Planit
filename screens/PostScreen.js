import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as constants from '../constants/constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PostScreen() {

    const [plan, setPlan] = useState({
      name: "",
      description: "",
      private : false,
      date: new Date(),
      location: {
        latitude: null,
        longitude: null
      }
    });

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || plan.date;
      setShow(false);
      setPlan({ ...plan, date: currentDate});
    };

    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      setShow(true);
      showMode('date');
    };

    const showTimepicker = () => {
      setShow(true);
      showMode('time');
    };
    /*
    const auxiliariano = () => {
      console.log(plan);
    }
    <TouchableOpacity onPress={auxiliariano}>
          <Text>HOHOHOHO</Text>
    </TouchableOpacity>
    */

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          
          <View style={styles.containerInfo}>
            <Text style={styles.presetTextInputs}>Nombre:</Text>
            <View style={styles.nameInputView}>
              <TextInput style={styles.nameInput}
              autoCapitalize="sentences"
              maxLength={20}
              placeholder={"Escribe el nombre aquí..."}
              placeholderTextColor={"grey"}
              onChangeText={name => setPlan({...plan, name})}
              value={plan.name}>
              </TextInput>
            </View>
          </View>
          <View>
            <Text style={styles.presetTextInputs}>Selecciona fecha y hora de inicio:</Text>
          </View>
          
          <View style={styles.containerDateTime}>
            <TouchableOpacity onPress={showDatepicker} style={styles.dateButtons}>
              <Ionicons size={30} color={"white"} name="md-calendar"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimepicker} style={styles.dateButtons}>
              <Ionicons size={30} color={"white"} name="md-clock"/>
            </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={plan.date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}/>
                )}
          </View>

          <View style={styles.containerDescription}>
            <Text style={styles.presetTextInputs}>Cuéntanos más:</Text>
            <View style={styles.descriptionInputView}>
              <TextInput style={styles.descriptionInput}
                autoCapitalize="none"
                maxLength={100}
                multiline={true}
                placeholder={"Describe el plan aquí... (máximo 150 carácteres)"}
                placeholderTextColor={"grey"}
                numberOfLines={3}
                onChangeText={description => setPlan({...plan, description})}
                value={plan.description}>
              </TextInput>
            </View>
          </View>
          
        </ScrollView>
      </View>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: 20,
          marginHorizontal: 20
        },
        scrollView: {
          flex: 1
        },
        containerInfo: {
          borderTopWidth: 1,
          borderTopColor: constants.CORP_GREY,
          flex: 2,
        },
        presetTextInputs: {
          marginVertical: 20,
          fontWeight: "bold",
          color: "grey",
          fontSize: 15
        },
        containerDateTime: {
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-around"
        },
        dateButtons: {
          paddingVertical: 5,
          paddingHorizontal: 40,
          backgroundColor: constants.CORP_PINK,
          borderRadius: 10,
        },
        nameInputView: {
          height: 40,
          backgroundColor: constants.CORP_GREY,
          borderRadius: 5
        },
        nameInput: {
          marginHorizontal: 10,
          marginVertical: 5
        },
        containerDescription: {
        },
        descriptionInputView: {
          height: 100,
          backgroundColor: constants.CORP_GREY,
          borderRadius: 5,
        },
        descriptionInput: {
          marginHorizontal: 10
        },
      });