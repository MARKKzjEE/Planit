import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, Alert } from 'react-native';
import MapView, { Callout } from 'react-native-maps'
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps'

import { Ionicons } from '@expo/vector-icons'

import * as constants from '../constants/constants'
import firebase from 'firebase'

export function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
  };
}

export default function HomeScreen({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isReady, setReady] = useState(false);
  const [isReady1, setReady1] = useState(false);
  const [region, setRegion] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
          (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Acceso denegado');
            }
            let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
            setLocation(location);
            loadPlans();
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

  if(location && !isReady){
    setReady(true)
    const points = [{ latitude: location.coords.latitude, longitude: location.coords.longitude}]
    setRegion(getRegionForCoordinates(points));
  }

  const loadPlans = async () => {
    let auxPlans = [];
    let auxMerge = {};
    await firebase.firestore()
        .collection('plans').get()
        .then((snapshot) => {
            if(!snapshot.empty){
                snapshot.forEach(doc => {
                  if(doc.data().uid !== firebase.auth().currentUser.uid){
                    auxMerge = {...doc.data(), id: doc.id};
                    auxPlans.push(auxMerge);
                  }
                });
                setPlans(auxPlans);
                setReady1(true);
            }
        })
        .catch((error) => {
            console.log(error);
        });
  };

  let text = 'Cargando Ubicación..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.containerHeader}>
            <TouchableOpacity>
            </TouchableOpacity>
            <Text style={styles.title}>Únete a un plan</Text>
            <TouchableOpacity>
            </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {isReady &&
        <MapView
          showsUserLocation={true}
          initialRegion={region}
          followsUserLocation
          style={styles.mapStyle}>
          {plans.map((item, i) =>
            <Marker
              coordinate={item.plan.planLocation}
              key={i}>
              <Callout onPress={() => {
                        navigation.push('ProfileUserPlanScreen', {
                            plan: item
                        });
                }}>
                <View>
                  <View style={{flexDirection:"row", justifyContent:"space-evenly", marginBottom: 15}}>
                    <Text style={{fontWeight:"bold"}}>{item.plan.name}</Text>
                    {item.plan.isPrivate ? (
                      <Ionicons name="ios-lock" size={25} color={constants.CORP_PINK}></Ionicons>
                    ) : (
                      <Ionicons name="ios-unlock" size={25} color={constants.CORP_PINK}></Ionicons>
                    )}
                  </View>
                  <View style={{alignItems:"center",width:250,marginBottom:25,marginHorizontal:5}}>
                    <Text style={{color:"grey"}}>{item.plan.description}</Text>
                  </View>
                  <View style={{alignItems:"center",marginBottom:15}}>
                    <TouchableOpacity style={{width:90, height:20, backgroundColor:constants.CORP_PINK, borderRadius:3, justifyContent:"center", alignItems:"center"}}>
                      <Text style={{color:"white",fontWeight:"bold"}}>Saber más</Text>
                    </TouchableOpacity>
                  </View>
              
                </View>
                
              </Callout>
            </Marker>
          )}
        </MapView>
        }
      </View>
      
   </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight:50,
    marginTop: 30,
    flex: 1,
  },
  title: {
    color: constants.CORP_PINK,
    fontSize: 25,
    fontWeight: "bold"
  },
  mapStyle: {
    height: "100%",
    width: "100%"
  },
  containerFooter: {
    flex: 1,
    maxHeight: 60,
  },
});