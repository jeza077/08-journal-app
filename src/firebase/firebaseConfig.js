// import firebase from 'firebase/app';
// import { initializeApp } from "firebase/app";
// import 'firebase/firestore';
// import 'firebase/auth';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtSZJcKbMXiqQpLaF78eMvrO8qvjF64E0",
    authDomain: "journal-app-67db3.firebaseapp.com",
    projectId: "journal-app-67db3",
    storageBucket: "journal-app-67db3.appspot.com",
    messagingSenderId: "899736009612",
    appId: "1:899736009612:web:57ab848a003cd8871134a9"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db = firebase.firestore();
const db = getFirestore();
const auth = getAuth();


// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    app,
    signInWithPopup,
    auth,
    createUserWithEmailAndPassword,
    updateProfile
}