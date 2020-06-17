import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YellowBox } from 'react-native';

import * as constants from '../constants/constants';

const firebase = require("firebase");
require("@firebase/firestore");

import Fire from '../Fire';
import { PlaneDetection } from 'expo/build/AR';



export default function ProfileUserPlanScreen({navigation, route})  {

    YellowBox.ignoreWarnings([
        'Non-serializable values were found in the navigation state',
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'
    ]);

    const [plan, setPlan] = useState(route.params.plan);
    const [creator, setCreator] = useState({});
    const [user, setUser] = useState({});
    const [userJoined, setJoined] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadCreator();
            loadUser();
            isParticipating();
          });
        return unsubscribe;
    },[navigation]);

    const loadCreator = async () => {
        await firebase.firestore()
            .collection('users').doc(plan.uid).get()
            .then((doc) => {
                setCreator(doc.data());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadUser = async () => {
        await firebase.firestore()
            .collection('users').doc(firebase.auth().currentUser.uid).get()
            .then((doc) => {
                setUser(doc.data());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const isParticipating = async () => {
        await firebase.firestore()
            .collection('plans').doc(plan.id).get()
            .then((doc) => {
                for(var i = 0; i < doc.data().plan.participants.length; i++) {
                    if (doc.data().plan.participants[i].uid == firebase.auth().currentUser.uid) {
                        setJoined(true);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleJoin = async () => {
        await Fire.shared
            .joinPublicPlan(plan,creator,user)
            .then( () => {
                console.log("Usuario añadido con éxito!");
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error)
            });
    };



    const ListUsers = () => {
        if(plan.plan.participants.length > 0) {
            return(
                <View style={{paddingVertical: 5,borderColor:constants.CORP_PINK,borderWidth:2,backgroundColor:"white",marginTop: 10}}>
                    {plan.plan.participants && (plan.plan.participants.map((item, i) => 
                        <View key={i} style={{marginBottom:10,borderBottomWidth:2,borderColor:constants.CORP_GREY,marginHorizontal: 10,flexDirection: "row"}}>
                            <Image style={{width: 50, height: 50, borderRadius: 18,}} source={{uri: item.image}}></Image>
                            <Text style={{marginLeft: 20,color: "grey"}} key={i}>{item.name}</Text>
                        </View>
                        )
                    )}
                </View>
            );
        } else {
            return (
                <View style={{borderBottomWidth: 2, borderColor:constants.CORP_GREY,}}>
                    <Text style={{color:"grey"}}>Todavía no hay participantes.</Text>
                </View>
            );
        }
    };

    const ButtonToJoin = () => {
        if(!userJoined) {
            return(
                <View style={{alignItems:"center",marginVertical:40}}>
                        {plan.plan.isPrivate ? (
                            <TouchableOpacity style={{borderRadius:5,paddingHorizontal:20,paddingVertical:10,backgroundColor:constants.CORP_PINK,marginRight: 20}}>
                                <Text style={{color:"white", fontWeight:"bold",fontSize:15}}>Solicitar</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleJoin} style={{borderRadius:5,paddingHorizontal:20,paddingVertical:10,backgroundColor:constants.CORP_PINK,marginRight: 20}}>
                                <Text style={{color:"white", fontWeight:"bold",fontSize:15}}>Únete</Text>
                            </TouchableOpacity>
                        )}         
                </View>
            );
        } else {
            return null;
        }
    };
    
    return (
        
        <View style={styles.container}>
            <View style={styles.userCreation}>
                <View>
                    <Text style={styles.headersWhiteBig}>{plan.plan.name}</Text>
                    <Image source={{uri: creator.avatar}} style={styles.avatar}></Image>
                    <Text style={{alignSelf: "center", fontWeight: "bold", color: "white", fontSize: 12}}>Creado por {creator.name}</Text>
                </View>
            </View>

            <ScrollView style={styles.infocontainer}>
                <View style={{marginHorizontal:15}}>
                    <View style={styles.infoBottomWidth}>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="ios-book" color={constants.CORP_PINK} size={25} style={{marginRight:15}}></Ionicons>
                            <Text style={{color:"grey", fontWeight: "bold"}}>Información adicional:</Text>
                        </View>
                        <Text style={{color:"grey"}}>{plan.plan.description}</Text>
                    </View>
                    <View style={styles.infoBottomWidth}>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="md-calendar" color={constants.CORP_PINK} size={25} style={{marginRight:15}}></Ionicons>
                            <Text style={{color:"grey", fontWeight: "bold"}}>El plan empieza:</Text>
                        </View>
                        <Text style={{color: "grey"}}>
                        El
                        {
                            " "
                            + ("0" + new Date(plan.plan.date.toDate()).getDate()).slice(-2) 
                            + "/" 
                            + ("0"  + (new Date(plan.plan.date.toDate()).getMonth()+1)).slice(-2) 
                            + "/" 
                            + new Date(plan.plan.date.toDate()).getFullYear()
                            + " "
                        }
                        a las
                        {
                            " "
                            + ("0" + new Date(plan.plan.date.toDate()).getHours()).slice(-2)
                            + ":"
                            + ("0" + new Date(plan.plan.date.toDate()).getMinutes()).slice(-2)
                            + "h."
                        }
                        </Text>
                    </View>
                    
                    <View style={styles.infoBottomWidth}>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="ios-lock" color={constants.CORP_PINK} size={25} style={{marginRight:15}}></Ionicons>
                            <Text style={{color:"grey", fontWeight: "bold"}}>Privacidad del plan:</Text>
                        </View>
                    
                        {plan.plan.isPrivate ? (
                            <Text style={{color:"grey"}}>El creador controla quién se une al plan. </Text>
                            ) : (
                            <Text style={{color:"grey"}}>Este plan es de acceso público, el creador limita el número de participantes. </Text>
                        )}
                    </View>
                    

                    <View style={styles.listUsers}>
                        <View style={{flexDirection:"row"}}>
                            <Ionicons name="ios-people" color={constants.CORP_PINK} size={25} style={{marginRight:15}}></Ionicons>
                            <Text style={{color:"grey", fontWeight: "bold"}}>Participantes:</Text>
                        </View>
                        
                        <ListUsers/>
                    </View>

                    <ButtonToJoin/>
                </View>
            </ScrollView>
        </View>
        
    );
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
    },
    userCreation: {
        backgroundColor: constants.CORP_LIGHT_PINK,
        width: "100%",
        height: 150,
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "white",
    },
    infocontainer: {
        width: "100%",
        marginBottom: 10,
    },
    headersWhiteBig: {
        fontWeight: "bold",
        color: "white",
        fontSize: 25,
        alignSelf: "center",
    },
    headersWhiteMed: {
        fontWeight: "bold",
        color: "white",
        fontSize: 15
    },
    infoBottomWidth: {
        borderBottomWidth: 2, 
        borderColor:constants.CORP_GREY,
        marginBottom: 15,
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: "white",
        alignSelf: "center",
        marginVertical: 7,
        backgroundColor: "white"
    },
    listUsers: {
        maxWidth: "100%",
    },
})