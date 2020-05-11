import firebase from 'firebase';
import '@firebase/firestore';

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

    addPost = async (localUri) => {
        //subir imagen a BD
        const remoteUri = await this.uploadPhotoAsync(localUri);
        
        //guardar uri en la tabla
        return new Promise((res, rej) => {
            firebase.firestore()
                .collection("posts")
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

    uploadPhotoAsync = async (uri) => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();
            
            let upload = firebase
                .storage()
                .ref(path)
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
}

Fire.shared = new Fire()
export default Fire;

