import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import * as constants from '../constants/constants'

import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ListPlansScreen({navigation, route}) {

  const [plans, setPlans] = useState([]);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
          (async () => {
            loadMyPlans();
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

    const loadMyPlans = async () => {
      let auxPlans = [];
      let auxMerge = {};
      await firebase.firestore()
          .collection('plans').where('uid', '==', firebase.auth().currentUser.uid).get()
          .then((snapshot) => {
              if(!snapshot.empty){
                  snapshot.forEach(doc => {
                    auxMerge = {...doc.data(), id: doc.id};
                    auxPlans.push(auxMerge);
                  });
                  setPlans(auxPlans);
              }
          })
          .catch((error) => {
              console.log(error);
          });
    };

    //item.id para pasarle al boton la id del doc que debera mostrar por pantalla cuando se navegue
    const renderPlans = item => {
      return(
        <View style={styles.feedItem}>
            <View style={styles.firstLine}>
              <Image source={{uri: firebase.auth().currentUser.photoURL}} style={styles.avatar}></Image>
              <Text style={{color: constants.CORP_PINK, fontWeight: "bold", fontSize: 20}}>{item.plan.name}</Text>
              {item.plan.isPrivate ? (
                <Text style={{color: "grey", fontWeight: "bold"}}>Privado</Text>
                ) : (
                <Text style={{color: "grey", fontWeight: "bold"}}>Público</Text>
              )}
            </View>
            <View style={styles.secondLine}>
                <Text style={{width: "80%"}}>{item.plan.description}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                        navigation.push('ProfilePlanScreen', {
                            plan: item
                        });
                }}>
                  <Ionicons name="ios-search" size={20} color="white"></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={styles.thirdLine}>
                <Text style={{color: "grey", fontWeight: "bold"}}>
                  Tu plan empieza el
                  {
                    " "
                    + ("0" + new Date(item.plan.date.toDate()).getDate()).slice(-2) 
                    + "/" 
                    + ("0"  + (new Date(item.plan.date.toDate()).getMonth()+1)).slice(-2) 
                    + "/" 
                    + new Date(item.plan.date.toDate()).getFullYear()
                    + " "
                  }
                  a las
                  {
                    " "
                    + new Date(item.plan.date.toDate()).getHours()
                    + ":"
                    + new Date(item.plan.date.toDate()).getMinutes()
                    + "h!"
                  }
                </Text>
            </View>
        </View>
      );
    };

    return (
        <View style={styles.container}>
          {console.log(plans)}
          <FlatList
            style={styles.feed}
            data={plans}
            renderItem={ ({item}) => renderPlans(item) } 
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator= {false}>
          </FlatList>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      feed: {
        marginVertical: 60,
        marginHorizontal: 8,
      },
      feedItem: {
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 10,
        minHeight: 150,
      },
      firstLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        marginHorizontal: 10
      },
      secondLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10
      },
      thirdLine: {
        alignItems: "center",
        marginTop: 10
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 18,
      },
      editButton: {
        backgroundColor: constants.CORP_PINK,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        width: 30
      }
    });
