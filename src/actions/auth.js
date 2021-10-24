import { 
    getAuth, 
    app, 
    googleAuthProvider, 
    signInWithPopup, 
    auth, 
    createUserWithEmailAndPassword,
    updateProfile
} from "../firebase/firebaseConfig";
import { types } from "../types/types";

export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        setTimeout(() => {
            
            dispatch( login(123, 'Pedro') );

        }, 3500);

    }
}


export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) => {

                // Actualizar nombre de usuario
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
                
                dispatch(
                    login( user.uid, user.displayName )
                );  

            })
            .catch( err => {
                console.log(err);
            })
    }

}


// Autenticación con Google
export const startGoogleLogin = () => {
    return ( dispatch ) => {
        signInWithPopup(auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
    
})

/* Forma larga del Return

export const login = (uid, displayName) => {
//  return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}
*/