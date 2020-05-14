import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class UserPermission {
    /* 1.Pedir permiso nativo para acceder a galeria (iOS y Android) */
    getPhotoPermission = async () => {
        if(Constants.platform.ios || Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
            if(status != "granted") {
                Alert.alert("La aplicación necesita permiso para acceder a tu Galería.")
            }
        }
    };
}



export default new UserPermission();