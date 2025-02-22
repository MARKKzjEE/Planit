import firebase from 'firebase';
import '@firebase/firestore';
import { Alert } from 'react-native';

var DB_CONFIG = {
    apiKey: "AIzaSyBHk2r2_fEb8QGo46aDRpvJKZB2cgIuC0E",
    authDomain: "planit-3e8a0.firebaseapp.com",
    databaseURL: "https://planit-3e8a0.firebaseio.com",
    projectId: "planit-3e8a0",
    storageBucket: "planit-3e8a0.appspot.com",
    messagingSenderId: "713573869363",
    appId: "1:713573869363:web:9c6a234b5be739d218c046",
    measurementId: "G-702P6PRH1S"
};

class Fire {
    constructor(){
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(DB_CONFIG);
            }
        }
        catch(error) {
            console.log(error);
        }  
    }
    /*1. Foto cargada en Firebase Storage*/
    uploadPhotoAsync = async (uri, filename) => {

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();
            
            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);
            
            upload.on(
                "state_changed",
                snapshot => {},
                err =>  {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url); 
                }
            )
        });
    };

    /*2. Imagen galeria usuario cargada en Firebase Firestore*/
    addImage = async (localUri) => {
        //subir imagen a BD
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${firebase.auth().currentUser.uid}/${Date.now()}`);
        
        //guardar uri en la tabla
        return new Promise((res, rej) => {
            firebase.firestore()
                .collection("gallery")
                .add({
                    uid: firebase.auth().currentUser.uid,
                    timestamp: Date.now(),
                    image: remoteUri
                })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                });
        });
    };

    /*2.1 Imagen galeria usuario cargada en Firebase Firestore*/
    createUser = async (regUser) => {

        try {

            await firebase.auth().createUserWithEmailAndPassword(regUser.email, regUser.password);

            let db = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
            db.set({
                name: regUser.name,
                email: regUser.email,
                avatar: null,
            });

            if(regUser.avatar){
                await this.uploadPhotoAsync(regUser.avatar, `avatars/${firebase.auth().currentUser.uid}/${Date.now()}`)
                            .then((remoteUri) => {
                                db.set({ avatar: remoteUri}, {merge: true})
                            })
                            .catch((error) => {
                                console.log(error)
                            });
            }
            else {
                firebase.storage()
                    .ref('avatars/')
                    .child('defaultAvatar.png')
                    .getDownloadURL()
                    .then((remoteUri) => {
                        db.set({ avatar: remoteUri}, {merge: true})
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
            
        }
        catch(error) {
            Alert.alert("Error: ", error.message);
        }
    };

    /*3. Información Editada del Perfil cargada en Firebase Firestore*/
    updateAvatarAndInfo = async (pickAvatar, localUri, description) => {

        console.log("DIME SI ENTRO");
        console.log("Avatar: ",localUri);
        console.log("Descripcion: ",description);
        if(description){
            let db = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
            db.set({description: description}, {merge:true});
        }
        if(pickAvatar){
            await this.uploadPhotoAsync(localUri, `avatars/${firebase.auth().currentUser.uid}/${Date.now()}`)
                .then((remoteUri) => {
                    db.update({ avatar: remoteUri })
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    };
}

Fire.shared = new Fire()
export default Fire;

