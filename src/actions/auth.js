import Swal from 'sweetalert2';

import { signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { 
    // getAuth, 
    // app, 
    googleAuthProvider, 
    signInWithPopup, 
    auth, 
    createUserWithEmailAndPassword,
    updateProfile
} from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";



export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch( startLoading() );

        signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {                
                dispatch( login( user.uid, user.displayName ) );  

                dispatch( finishLoading() );

            })
            .catch( err => {
                dispatch( finishLoading() );
                Swal.fire(
                    'Error', 
                    'There is no user record corresponding to this identifier. The user may have been deleted.', 
                    'error');
            })

        // dispatch( login(123, 'Pedro') );

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
                // console.log(err);
                Swal.fire(
                    'Error', 
                    'There is no user record corresponding to this identifier. The user may have been deleted.', 
                    'error');
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

export const startLogout = () => {
    return async(dispatch) => {
        await signOut(auth);

        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})