// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmrSF61jNCtTHFy9zH7nZ2NWs_KpOVzAo",
authDomain: "mauth-f1e90.firebaseapp.com",
  projectId: "mauth-f1e90",
storageBucket: "mauth-f1e90.appspot.com",
  messagingSenderId: "612066436234",
  appId: "1:612066436234:web:659834260a1fc941a2b973",
  measurementId: "G-Y7NX04ET86"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);