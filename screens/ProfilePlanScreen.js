import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import * as constants from '../constants/constants';

const firebase = require("firebase");
require("@firebase/firestore");

import Fire from '../Fire';

export default function ProfilePlanScreen({navigation, route})  {

    navigation.setOptions({
        headerRight:() => (
            <TouchableOpacity style={{marginRight: 20}}>
                <Ionicons 
                    name="ios-trash" 
                    size={30} 
                    color={constants.CORP_PINK}
                    onPress={alertDelete}
                    >
                </Ionicons>
            </TouchableOpacity>
        ),
    }, []);

    const [plan, setPlan] = useState(route.params.plan);

    const alertDelete = () => {
        Alert.alert(
            'Aviso',
            '¿Estás seguro que deseas eliminar el plan?',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              { text: 'Sí', onPress: handleDelete },
            ],
            { cancelable: false }
          );
    };

    const handleDelete = async () => {
        await Fire.shared
            .deletePlan(plan.id)
            .then( () => {
                console.log("Plan eliminado")
                navigation.goBack()
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
                        <View key={i} style={{borderBottomWidth:2,borderColor:constants.CORP_GREY,marginHorizontal: 10,flexDirection: "row"}}>
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
    
    return (
        
        <View style={styles.container}>
            {console.log(route) && console.log(navigation)}
            <View style={styles.userCreation}>
                <View>
                    <Text style={styles.headersWhiteBig}>{plan.plan.name}</Text>
                    <Image source={{uri: firebase.auth().currentUser.photoURL}} style={styles.avatar}></Image>
                    <Text style={{alignSelf: "center", fontWeight: "bold", color: "white", fontSize: 12}}>Creado por ti</Text>
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
                            <Text style={{color:"grey", fontWeight: "bold"}}>Tu plan empieza:</Text>
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