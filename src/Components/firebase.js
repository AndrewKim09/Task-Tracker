import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyBEtxZz4hcjAfrMlK9q4s4Iiu0rD57En78",
    authDomain: "task-t.firebaseapp.com",
    projectId: "task-t",
    storageBucket: "task-t.appspot.com",
    messagingSenderId: "275170997211",
    appId: "1:275170997211:web:945fbafca405c157d8adfe",
    measurementId: "G-J8QKDYET85"
  };
  

const app = initializeApp(firebaseConfig);
window.firebase = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);