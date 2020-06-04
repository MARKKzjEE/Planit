import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as constants from '../constants/constants';

const firebase = require("firebase");
require("@firebase/firestore");

const {width} = Dimensions.get("window");
const height = width * 0.65;

export default function ProfileScreen({navigation, route})  {

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [avatar, setAvatar] = useState("");
    const [active, setActive] = useState(0);
    const [stats1, setStats1] = useState(0);
    
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadInfo();
            loadImages();
            loadStats();
          });
        return unsubscribe;
    },[navigation]);

    const signOutUser = () => {
        setName("")
        setDescription("");
        setAvatar("");
        setImages([]);
        navigation.navigate('Loading');
        firebase.auth().signOut();
        
    };
    
    const loadImages = async () => {
        let auxArr = []
        await firebase.firestore()
            .collection('gallery').where('uid', '==', firebase.auth().currentUser.uid).get()
            .then((snapshot) => {
                if(!snapshot.empty){
                    snapshot.forEach(doc => {
                        auxArr.push(doc.data())
                    });
                    setImages(auxArr);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadInfo = async () => {
        await firebase.firestore()
        .collection("users").doc(firebase.auth().currentUser.uid).get()
        .then(doc => {
            setName(doc.data().name);
            setDescription(doc.data().description);
            setAvatar(doc.data().avatar);
        })
        .catch((error) => {
            console.log(error)
        });
    };

    const loadStats = async () => {
        let count = 0
        await firebase.firestore()
        .collection("plans").where("uid","==",firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            setStats1(snapshot.size)
        })
        .catch((error) => {
            console.log(error)
        });
    };

    const changeActivePage = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== active){
            setActive(slide);
        }
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={() => {
                        navigation.push('EditProfile', {
                            name: name,
                            description: description,
                            avatar: avatar
                        });
            }}>
                <Ionicons name="md-brush" size={30} color={constants.CORP_PINK}></Ionicons>
            </TouchableOpacity> 

            <View style={styles.personalContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.nameContainer}>{name}</Text>
                    <View style={styles.descriptionInputView}>
                        <Text style={{fontWeight: "700"}}>Sobre mí...</Text>
                        <Text style={styles.descriptionInput}
                            multiline={true}
                            numberOfLines={5}>
                            {description}
                        </Text>
                    </View>
                </View>
                <View style={styles.avatarContainer}>
                    {avatar !== "" &&
                    <Image source={{ uri: avatar }} style={styles.avatar}></Image>
                    }
                    <TouchableOpacity onPress={signOutUser} style={styles.desconectar}>
                        <Text style={{padding: 10, color: "white"}}>Desconectar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{width:"100%",flexDirection:"row", justifyContent:"space-evenly"}}>
                <Text style={{color:"grey",fontWeight:"bold"}}>Planes creados: <Text style={{color:constants.CORP_PINK}}>{stats1}</Text></Text>
                <Text style={{color:"grey",fontWeight:"bold"}}>Planes participados: <Text style={{color:constants.CORP_PINK}}>{"0"}</Text></Text>
            </View>
            
            <View style={styles.imagesContainer}>
                <ScrollView 
                    pagingEnabled 
                    horizontal 
                    onScroll={changeActivePage}
                    showsHorizontalScrollIndicator={false}
                    style={styles.swiper}>
                    {images && (images.map((item, i) => 
                        <Image style={styles.image} key={i} source={{uri: item.image}}></Image>
                        )
                    )}
                </ScrollView>
                <View style={styles.pagination}>
                    {images && (images.map((item, i) => 
                        <Text key={i} style={i==active ? styles.activePage : styles.nextPage}>●</Text>
                        )
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
    },
    icon: {
        position:"absolute",
        top:40,
        right:32,
        width:32,
        height:32,
        alignItems:"center",
        justifyContent:"center",
        
    },
    personalContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        maxHeight: 200,
        marginTop: 80,
    },
    descriptionContainer: {
        flexDirection: "column",
        height: 200,
        marginLeft: 30,
    },
    nameContainer: {
        height: 50, 
        fontSize: 20, 
        fontWeight: "700",
    },
    avatarContainer: {
        marginTop: 10,
        alignItems: "center",
        marginHorizontal: 20,
        marginRight: 50,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 25,
    },
    desconectar: {
        justifyContent: "center",  
        marginTop: 10,
        fontWeight: "700",
        height: 25,
        borderRadius: 10,
        backgroundColor: constants.CORP_PINK
    },
    descriptionInputView: {
        height: "100%",
        width: 200,
        borderRadius: 20,
    },
    descriptionInput: {
        marginVertical: 10,
        height: "100%",
    },
    imagesContainer: {
        marginVertical: 20,
        width,
        height,
    },
    swiper: {
        width,
        height,
    },
    image: {
        height,
        width,
        resizeMode: "cover"
    },
    pagination: {
        flexDirection: "row",
        position:"absolute",
        bottom: 0,
        alignSelf: "center"
    },
    nextPage: {
        color: "#888",
        margin: 3,
        fontSize: 25
    },
    activePage: {
        color: "white",
        fontSize: 30,
        margin: 3,
        fontSize: 25
    }
})