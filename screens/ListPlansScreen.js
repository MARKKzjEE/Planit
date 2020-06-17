import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { YellowBox } from 'react-native';

import * as constants from '../constants/constants'

import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ListPlansScreen({navigation, route}) {

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

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
              else {
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
              <Text style={{color: constants.CORP_PINK, fontWeight: "bold", fontSize: 18}}>{item.plan.name}</Text>
              {item.plan.isPrivate ? (
                <Ionicons name="ios-lock" size={25} color={constants.CORP_PINK} style={styles.avatar}></Ionicons>
                ) : (
                <Ionicons name="ios-unlock" size={25} color={constants.CORP_PINK} style={styles.avatar}></Ionicons>
              )}
            </View>

            <View style={styles.secondLine}>
                <Text style={{width: "90%"}}>{item.plan.description}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                        navigation.push('ProfilePlanScreen', { plan: item }
                        );
                        //{ onGoBack: () => loadMyPlans() }
                }}>
                  <Ionicons name="ios-search" size={20} color="white"></Ionicons>
                </TouchableOpacity>
            </View>

            <View style={styles.thirdLine}>
                <Text style={{color: constants.CORP_PINK}}>
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
                    + ("0" + new Date(item.plan.date.toDate()).getHours()).slice(-2)
                    + ":"
                    + ("0" + new Date(item.plan.date.toDate()).getMinutes()).slice(-2)
                    + "h!"
                  }
                </Text>
            </View>
        </View>
      );
    };

    return (
        <View style={styles.container}>
          { plans.length > 0 ? (
            <FlatList
              style={styles.feed}
              data={plans}
              renderItem={ ({item}) => renderPlans(item) } 
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator= {false}>
            </FlatList>
          ) : (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Text style={{fontSize:20,fontWeight:"bold", color:constants.CORP_PINK}}>No tienes ningún plan creado!</Text>
            </View>
          )}
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      feed: {
        marginVertical: 20,
        marginHorizontal: 8,
      },
      feedItem: {
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 10,
        minHeight: 150,
      },
      firstLine: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical: 10,
        marginHorizontal: 10,
      },
      privacity: {
        alignItems: "center",
        marginBottom:10
      },
      secondLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom:10
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
