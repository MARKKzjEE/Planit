import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

import * as constants from '../constants/constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getRegionForCoordinates } from './HomeScreen';

import Fire from '../Fire';



export default function PostScreen({navigation}) {

    const [plan, setPlan] = useState({
      name: "",
      description: "",
      isPrivate : false,
      date: new Date(),
      location: {
      },
      planLocation: {
      }
    });

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          try {
            (async () => {
              let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
              const points = [{latitude:location.coords.latitude, longitude:location.coords.longitude}];
              setPlan({...plan, location: getRegionForCoordinates(points)});
            })();
          }
          catch(error){
            let status = Location.getProviderStatusAsync()
            if(!status.locationServicesEnabled) {
              Alert.alert('Activa el servicio de localización')
            }
          }
        });
        return unsubscribe;
    },[navigation]);

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

    const handleGroupType = () => {
      setPlan(previousState => ({...plan, isPrivate: !previousState.isPrivate}));
    }
    
    const auxiliariano = () => {
      console.log(plan);
    }

    const handleCreation = async () =>{
      await Fire.shared
            .createPlan(plan)
            .then( () => {
                console.log("Plan creado con éxito!");
                setPlan({
                  ...plan,
                  name:"",description:"",planLocation:{}
                })
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error)
            });
    }
    
    return (
      
      <View style={styles.container}>
        {console.log(plan)}
        <View style={styles.header}>
          <TouchableOpacity/>
          <Text style={styles.title}>Crea tu Plan!</Text>
          <TouchableOpacity onPress={handleCreation} style={{marginRight: 20}}>
                <Ionicons 
                    name="md-checkbox" 
                    size={30} 
                    color={constants.CORP_PINK}>
                </Ionicons>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          
          <View style={styles.containerInfo}>
            <Text style={styles.presetTextInputs}>Nombre:</Text>
            <View style={styles.nameInputView}>
              <TextInput style={styles.nameInput}
              autoCapitalize="sentences"
              maxLength={20}
              placeholder={"Dale un nombre a tu plan..."}
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

          <View style={{marginTop: 10, alignItems: "center"}}>
            <Text style={styles.textDateTime}>
                {
                  ""
                  + ("0" + plan.date.getDate()).slice(-2) 
                  + "/" 
                  + ("0"  + (plan.date.getMonth()+1)).slice(-2) 
                  + "/" 
                  + plan.date.getFullYear()
                  + " "
                }
                a las
                {
                  " "
                  + plan.date.getHours()
                  + ":"
                  + plan.date.getMinutes()
                  + "h!"
                }
            </Text>
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

          <View style={styles.containerSwitch}>
            <Text style={styles.presetTextInputs}>Haz tu plan privado: </Text>
            <Switch
                trackColor={{true:constants.CORP_PINK, false:"grey"}}
                thumbColor={plan.isPrivate ? constants.CORP_PINK : constants.CORP_GREY}
                onValueChange={handleGroupType}
                value={plan.isPrivate}
                style={{marginLeft: 20}}>
            </Switch>
          </View>

          <View style={{flex: 2, borderTopWidth: 1, borderTopColor: constants.CORP_GREY,marginBottom:20}}>
            <Text style={styles.presetTextInputs}>Selecciona una ubicación:</Text>
            {plan.location.latitude != undefined &&
              <MapView
                showsUserLocation={true}
                initialRegion={plan.location}
                onPress={(e) => setPlan({...plan,  planLocation: e.nativeEvent.coordinate })}
                style={styles.mapStyle}>
              {plan.planLocation.latitude != undefined &&
              <Marker
                coordinate={plan.planLocation}
                title={plan.name}
              />
              }
              </MapView>
            }
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
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
          marginTop: 20
        },
        title: {
          color: constants.CORP_PINK,
          fontSize: 25,
          fontWeight: "bold"
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
          flex: 2
        },
        descriptionInputView: {
          height: 100,
          backgroundColor: constants.CORP_GREY,
          borderRadius: 5,
        },
        descriptionInput: {
          marginHorizontal: 10
        },
        containerSwitch: {
          flexDirection: "row",
          flex: 2
        },
        mapStyle: {
          width:"100%",
          height: 350
        },
        textDateTime: {
          color: constants.CORP_PINK, 
          fontWeight: "bold",
        }
      });