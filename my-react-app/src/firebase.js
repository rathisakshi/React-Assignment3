import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCI9WSy_Vo5DYbvp7NNml9hQ28wJeTa64Y",
    authDomain: "react-assignment3-ec939.firebaseapp.com",
    projectId: "react-assignment3-ec939",
    storageBucket: "react-assignment3-ec939.appspot.com",
    messagingSenderId: "273318719445",
    appId: "1:273318719445:web:f7aca9f55e9f1fc5a5d75c",
    measurementId: "G-BG5YWSDGF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth};
