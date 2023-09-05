// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider}  from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd6OFeBT_z-xGCB0wD4M1vjdAGHpX78oA",
  authDomain: "chatapp-7796d.firebaseapp.com",
  projectId: "chatapp-7796d",
  storageBucket: "chatapp-7796d.appspot.com",
  messagingSenderId: "365005873311",
  appId: "1:365005873311:web:e6d24bc3179d0c05c902aa",
  measurementId: "G-SK8W49HY1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);