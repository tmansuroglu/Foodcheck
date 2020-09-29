import * as firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD5GMpRDshSEE__VVzLuADmZtw1P5RV_0w",
    authDomain: "diet-app-d7a3a.firebaseapp.com",
    databaseURL: "https://diet-app-d7a3a.firebaseio.com",
    projectId: "diet-app-d7a3a",
    storageBucket: "diet-app-d7a3a.appspot.com",
    messagingSenderId: "287283597605",
    appId: "1:287283597605:web:b1c62c86888b85c0298acc"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();