import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { YellowBox } from 'react-native';

import * as constants from '../constants/constants';

const firebase = require("firebase");
require("@firebase/firestore");

import Fire from '../Fire';



export default function ProfileUserPlanScreen({navigation, route})  {

    YellowBox.ignoreWarnings([
        'Non-serializable values were found in the navigation state',
    ]);

    const [plan, setPlan] = useState(route.params.plan);
    const [users, setUsers] = useState(["id1","id2","id3","id4","id5","id6","id7","id8","id9","id10"]);
    const [creator, setCreator] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadUserPart();
          });
        return unsubscribe;
    },[navigation]);

    const renderUsers = item => {
        return (
            <View>
            <Text>USUARIO</Text>
        </View>
        );  
    };

    const loadUserPart = async () => {
        await firebase.firestore()
            .collection('users').doc(plan.uid).get()
            .then((doc) => {
                setCreator(doc.data());
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
        
        <View style={styles.container}>
            <View style={styles.userCreation}>
                <View>
                    <Text style={styles.headersWhiteBig}>{plan.plan.name}</Text>
                    <Image source={{uri: creator.avatar}} style={styles.avatar}></Image>
                    <Text style={{alignSelf: "center", fontWeight: "bold", color: "white", fontSize: 12}}>Creado por {creator.name}</Text>
                </View>
            </View>

            <View style={styles.infocontainer}>
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
                        <View style={styles.containerFeed}>
                            <FlatList
                                style={styles.feed}
                                data={users}
                                renderItem={ ({item}) => renderUsers(item) } 
                                keyExtractor={item => item}
                                showsVerticalScrollIndicator= {true}>
                            </FlatList>
                        </View>
                        
                    </View>
                    
                </View>
            </View>
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
        alignItems: "center"
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
        marginVertical: 7
    },
    listUsers: {
        maxWidth: "100%",
        height: 150,
    },
})